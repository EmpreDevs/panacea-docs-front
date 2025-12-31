import { inject } from '@angular/core'

import { environment } from '@envs/environment'

import { BaseModel } from '@domain/models/common/base.model'
import { CrudRepository } from '@domain/repositories/common/crud.repository'

import { CreateDto, UpdateDto } from '@infra/dto'
import { HttpClient } from '@infra/http/http.client'
import { PwaService } from '@infra/pwa/services'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

export abstract class BaseAdapter<T extends BaseModel> implements CrudRepository<T> {
	private API = environment.apiUrl
	private urlAPI: string
	private pwaService = inject(PwaService)

	constructor(
		private readonly httpClient: HttpClient,
		private readonly path: string,
		private readonly db: OfflineDBService,
	) {
		this.urlAPI = `${this.API}/${path}`
	}

	async create(payload: CreateDto<T>): Promise<T> {
		if (!this.pwaService.isOnline()) {
			// Crear ID temporal
			const tempId = `temp_${Date.now()}`

			// Guardar en IDB para sincronizar después
			await this.db.addPendingOperation(this.path, 'create', payload, {
				tempId,
				//userId: this.getUserId() // Si tienes autenticación
			})

			return {
				...payload,
				id: tempId,
				_syncPending: true,
			} as T
		}

		try {
			const response = await this.httpClient.post<T>(this.urlAPI).body(payload).execute()
			return response.data
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
			const response = await this.httpClient.get<T>(url).execute()

			// Guardar en cache
			await this.db.saveToCache(
				this.path,
				cacheKey,
				response.data,
				60 * 60 * 1000, // 1 hora
			)

			return response.data
		} catch (error) {
			// Intentar cache como fallback
			const cached = await this.db.getFromCache<T>(cacheKey)
			if (cached) {
				return cached
			}
			throw error
		}
	}
	async findAll(filters: any): Promise<T[]> {
		const cacheKey = `${this.path}_all_${JSON.stringify(filters || {})}`

		// Si está offline, buscar en cache IDB
		if (!this.pwaService.isOnline()) {
			console.log('📵 Offline - Buscando en cache IDB')

			const cached = await this.db.getFromCache<T[]>(cacheKey)
			if (cached) {
				console.log('✅ Datos obtenidos del cache IDB')
				return cached
			}

			console.warn('⚠️ No hay datos en cache')
			return []
		}

		// Si hay conexión, buscar en API
		try {
			const response = await this.httpClient.get<T[]>(this.urlAPI).filters(filters).execute()

			// Guardar en cache IDB
			await this.db.saveToCache(
				this.path,
				cacheKey,
				response.data,
				24 * 60 * 60 * 1000, // 24 horas
			)

			return response.data
		} catch (error) {
			// Si falla, intentar cache IDB
			console.error('❌ Error de red, intentando cache:', error)

			const cached = await this.db.getFromCache<T[]>(cacheKey)
			if (cached) {
				console.log('✅ Usando cache IDB como fallback')
				return cached
			}

			throw error
		}
	}
	// UPDATE con cola de sincronización
	async update(payload: UpdateDto<T>, id: string): Promise<T> {
		// Si no hay conexión, guardar en IDB
		if (!this.pwaService.isOnline()) {
			console.log('📵 Offline - Guardando actualización en cola')

			await this.db.addPendingOperation(this.path, 'update', payload, { originalId: id })

			// Actualizar cache local si existe
			const cacheKey = `${this.path}_${id}`
			const cached = await this.db.getFromCache<T>(cacheKey)
			if (cached) {
				const updated = { ...cached, ...payload }
				await this.db.saveToCache(this.path, cacheKey, updated)
				return updated
			}

			return { ...payload, id, _syncPending: true } as T
		}

		// Si hay conexión
		try {
			const url = `${this.urlAPI}/${id}`
			const response = await this.httpClient.put<T>(url).body(payload).execute()

			// Actualizar cache
			const cacheKey = `${this.path}_${id}`
			await this.db.saveToCache(this.path, cacheKey, response.data)

			return response.data
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
			const response = await this.httpClient.delete<T>(url).execute()

			// Limpiar cache relacionado
			// await this.db.clearEntityCache(this.path);

			return response.data
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
