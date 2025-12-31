import { inject } from '@angular/core'

import { environment } from '@envs/environment'

import { BaseModel } from '@domain/models/common/base.model'
import { CrudRepository } from '@domain/repositories/common/crud.repository'

import { CreateDto, IMapper, UpdateDto } from '@infra/dto'
import { HttpClient } from '@infra/http/http.client'
import { PwaService } from '@infra/pwa/services'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

export abstract class BaseAdapter<T extends BaseModel, D = any> implements CrudRepository<T> {
	private API = environment.apiUrl
	private urlAPI: string
	private pwaService = inject(PwaService)

	constructor(
		private readonly httpClient: HttpClient,
		private readonly path: string,
		private readonly db: OfflineDBService,
		private readonly mapper: IMapper<T, D>,
	) {
		this.urlAPI = `${this.API}/${path}`
	}

	async create(body: CreateDto<T>): Promise<T> {
		const payload = this.mapper.toDto(body as any)
		if (!this.pwaService.isOnline()) {
			// Crear ID temporal
			const tempId = `temp_${Date.now()}`

			// Guardar en IDB para sincronizar después
			await this.db.addPendingOperation(this.path, 'create', payload, {
				tempId,
				//userId: this.getUserId() // Si tienes autenticación
			})

			return {
				...body,
				id: tempId,
				_syncPending: true,
			} as T
		}

		try {
			const response = await this.httpClient.post<D>(this.urlAPI).body(payload).execute()
			return this.mapper.toModel(response.data)
		} catch (error) {
			// Si falla, guardar en IDB como fallback
			console.error('❌ Error en red, guardando para sincronización:', error)

			await this.db.addPendingOperation(this.path, 'create', payload)

			throw error
		}
	}
	async findById(id: string): Promise<T> {
		const cacheKey = `${this.path}_${id}`

		// Si está offline, buscar en cache
		if (!this.pwaService.isOnline()) {
			const cached = await this.db.getFromCache<T>(cacheKey)
			if (cached) {
				return cached
			}
			throw new Error('No disponible offline')
		}

		// Si hay conexión
		try {
			const url = `${this.urlAPI}/${id}`
			const response = await this.httpClient.get<D>(url).execute()

			// Guardar en cache
			await this.db.saveToCache(
				this.path,
				cacheKey,
				response.data,
				60 * 60 * 1000, // 1 hora
			)

			return this.mapper.toModel(response.data)
		} catch (error) {
			// Intentar cache como fallback
			const cached = await this.db.getFromCache<D>(cacheKey)
			if (cached) {
				return this.mapper.toModel(cached)
			}
			throw error
		}
	}
	async findAll(filters: any): Promise<T[]> {
		const cacheKey = `${this.path}_all_${JSON.stringify(filters || {})}`

		// Si está offline, buscar en cache IDB
		if (!this.pwaService.isOnline()) {
			console.log('📵 Offline - Buscando en cache IDB')

			const cached = await this.db.getFromCache<D[]>(cacheKey)
			if (cached) {
				console.log('✅ Datos obtenidos del cache IDB')
				return cached.map(item => this.mapper.toModel(item))
			}

			console.warn('⚠️ No hay datos en cache')
			return []
		}

		// Si hay conexión, buscar en API
		try {
			const response = await this.httpClient.get<D[]>(this.urlAPI).filters(filters).execute()

			// Guardar en cache IDB
			await this.db.saveToCache(
				this.path,
				cacheKey,
				response.data,
				24 * 60 * 60 * 1000, // 24 horas
			)

			return response.data.map(item => this.mapper.toModel(item))
		} catch (error) {
			// Si falla, intentar cache IDB
			console.error('❌ Error de red, intentando cache:', error)

			const cached = await this.db.getFromCache<D[]>(cacheKey)
			if (cached) {
				console.log('✅ Usando cache IDB como fallback')
				return cached.map(item => this.mapper.toModel(item))
			}

			throw error
		}
	}
	// UPDATE con cola de sincronización
	async update(body: UpdateDto<T>, id: string): Promise<T> {
		const payload = this.mapper.toDto(body as any)
		// Si no hay conexión, guardar en IDB
		if (!this.pwaService.isOnline()) {
			console.log('📵 Offline - Guardando actualización en cola')

			await this.db.addPendingOperation(this.path, 'update', payload, { originalId: id })

			// Actualizar cache local si existe
			const cacheKey = `${this.path}_${id}`
			const cached = await this.db.getFromCache<D>(cacheKey)
			if (cached) {
				const updated = { ...cached, ...payload }
				await this.db.saveToCache(this.path, cacheKey, updated)
				return this.mapper.toModel(updated)
			}

			return { ...body, id, _syncPending: true } as T
		}

		// Si hay conexión
		try {
			const url = `${this.urlAPI}/${id}`
			const response = await this.httpClient.put<D>(url).body(payload).execute()

			// Actualizar cache
			const cacheKey = `${this.path}_${id}`
			await this.db.saveToCache(this.path, cacheKey, response.data)

			return this.mapper.toModel(response.data)
		} catch (error) {
			// Guardar para sincronización si falla
			await this.db.addPendingOperation(this.path, 'update', payload, { originalId: id })
			throw error
		}
	}

	// DELETE con cola de sincronización
	async delete(id: string): Promise<T> {
		// Si no hay conexión, guardar en IDB
		if (!this.pwaService.isOnline()) {
			console.log('📵 Offline - Guardando eliminación en cola')

			await this.db.addPendingOperation(this.path, 'delete', {}, { originalId: id })

			// Eliminar de cache
			const cacheKey = `${this.path}_${id}`
			// No podemos eliminar de IDB directamente, marcar como eliminado

			return { id, _deleted: true, _syncPending: true } as T
		}

		// Si hay conexión
		try {
			const url = `${this.urlAPI}/${id}`
			const response = await this.httpClient.delete<D>(url).execute()

			// Limpiar cache relacionado
			// await this.db.clearEntityCache(this.path);

			return this.mapper.toModel(response.data)
		} catch (error) {
			// Guardar para sincronización si falla
			await this.db.addPendingOperation(this.path, 'delete', {}, { originalId: id })
			throw error
		}
	}

	private getUserId(): string | undefined {
		// autenticación
		return localStorage.getItem('userId') || undefined
	}
}
