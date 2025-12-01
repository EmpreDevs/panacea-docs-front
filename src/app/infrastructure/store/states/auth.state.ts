import { Injectable, signal, WritableSignal, computed, OnDestroy } from '@angular/core'
import { Auth, User } from '@domain/models'
import { DBSchema, IDBPDatabase, openDB } from 'idb'
import * as CryptoJS from 'crypto-js'

interface AuthDB extends DBSchema {
	auth: {
		key: string
		value: {
			key: string
			value: string
			expiresAt: Date
		}
	}
}

@Injectable({ providedIn: 'root' })
export class AuthState implements OnDestroy {
	private readonly isLogued$ = signal<boolean>(false)
	private readonly user$ = signal<User | null>(null)
	private readonly isLoading$ = signal<boolean>(false)
	private readonly error$ = signal<string | null>(null)

	readonly isLogued = this.isLogued$.asReadonly()
	readonly user = this.user$.asReadonly()
	readonly isLoading = this.isLoading$.asReadonly()
	readonly error = this.error$.asReadonly()

	readonly isAuthenticated = computed(() => this.isLogued$() && this.user$() !== null)
	readonly userName = computed(() => this.user$()?.name ?? 'Guest')
	readonly userRole = computed(() => this.user$()?.role ?? null)

	private db!: IDBPDatabase<AuthDB>
	private dbReady: Promise<void>
	private readonly ENCRYPTION_KEY: string
	private refreshTimer?: number

	constructor() {
		this.ENCRYPTION_KEY = this.getOrCreateEncryptionKey()
		this.dbReady = this.initDB()
		this.initializeAuthState()
	}

	ngOnDestroy(): void {
		// Limpiar timers y cerrar conexiones
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer)
		}
		if (this.db) {
			this.db.close()
		}
	}

	setError(error: string) {
		this.error$.set(error)
	}
	setLoading(isLoading: boolean) {
		this.isLoading$.set(isLoading)
	}

	// 🔒 INICIALIZAR BASE DE DATOS SEGURA
	private async initDB(): Promise<void> {
		try {
			this.db = await openDB<AuthDB>('SecureAuthDB', 1, {
				upgrade(db) {
					if (!db.objectStoreNames.contains('auth')) {
						db.createObjectStore('auth', { keyPath: 'key' })
					}
				},
			})
		} catch (error) {
			console.error('Failed to initialize database:', error)
			this.error$.set('Database initialization failed')
			throw error
		}
	}

	// 🚀 INICIALIZAR ESTADO DE AUTENTICACIÓN
	private async initializeAuthState(): Promise<void> {
		try {
			console.log('iniciando manejador de estado')

			this.isLoading$.set(true)

			// Verificar si hay una sesión válida
			const hasSession = await this.hasValidSession()

			if (hasSession) {
				// Cargar datos del usuario desde el almacenamiento
				const userData = await this.loadUserData()
				if (userData) {
					this.user$.set(userData)
					this.isLogued$.set(true)

					// Configurar auto-refresh de tokens
					await this.setupTokenRefresh()
				}
			}
		} catch (error) {
			console.error('Failed to initialize auth state:', error)
			this.error$.set('Failed to restore session')
		} finally {
			this.isLoading$.set(false)
		}
	}

	// 🔑 ESTRATEGIA 1: TOKENS DE ACCESO (corta duración)
	async saveAccessToken(token: string): Promise<void> {
		try {
			await this.dbReady // Asegurar que la DB esté lista
			const encrypted = this.encrypt(token)
			await this.saveToIDB('access_token', encrypted, 30 * 60 * 1000) // 30 min

			// Actualizar estado
			this.isLogued$.set(true)
			this.error$.set(null)

			// Configurar auto-refresh
			await this.setupTokenRefresh()
		} catch (error) {
			console.error('Error saving access token:', error)
			this.error$.set('Failed to save access token')

			// Fallback a sessionStorage si IDB falla
			try {
				sessionStorage.setItem('fallback_token', this.encrypt(token))
			} catch (fallbackError) {
				console.error('Fallback storage also failed:', fallbackError)
			}
			throw error
		}
	}

	// 🔄 ESTRATEGIA 2: REFRESH TOKEN (larga duración)
	async saveRefreshToken(token: string): Promise<void> {
		try {
			await this.dbReady
			const encrypted = this.encrypt(token)
			await this.saveToIDB('refresh_token', encrypted, 7 * 24 * 60 * 60 * 1000) // 7 días
			this.error$.set(null)
		} catch (error) {
			console.error('Error saving refresh token:', error)
			this.error$.set('Failed to save refresh token')
			throw error
		}
	}

	// 👤 ESTRATEGIA 3: DATOS DE USUARIO (no sensibles)
	async saveUserData(userData: User): Promise<void> {
		try {
			await this.dbReady

			// Datos no sensibles pueden ir en localStorage
			const publicData = {
				id: userData.id,
				name: userData.name,
				email: userData.email,
				role: userData.role,
				avatar: userData.avatar,
				preferences: userData.preferences,
			}

			// Guardar en IDB para mejor performance
			await this.saveToIDB('user_data', JSON.stringify(publicData), 24 * 60 * 60 * 1000)

			// Backup en localStorage para acceso rápido
			localStorage.setItem('user_public_data', JSON.stringify(publicData))

			// Actualizar signal
			this.user$.set(publicData as User)
			this.error$.set(null)
		} catch (error) {
			console.error('Error saving user data:', error)
			this.error$.set('Failed to save user data')
			throw error
		}
	}

	// 📖 CARGAR DATOS DE USUARIO
	private async loadUserData(): Promise<User | null> {
		try {
			await this.dbReady

			// Intentar cargar desde IDB primero
			const idbData = await this.getFromIDB('user_data')
			if (idbData) {
				return JSON.parse(idbData)
			}

			// Fallback a localStorage
			const localData = localStorage.getItem('user_public_data')
			if (localData) {
				return JSON.parse(localData)
			}

			return null
		} catch (error) {
			console.error('Error loading user data:', error)
			return null
		}
	}

	// 🔐 ENCRIPTACIÓN
	private encrypt(text: string): string {
		try {
			return CryptoJS.AES.encrypt(text, this.ENCRYPTION_KEY).toString()
		} catch (error) {
			console.error('Encryption failed:', error)
			throw new Error('Encryption failed')
		}
	}

	private decrypt(ciphertext: string): string {
		try {
			const bytes = CryptoJS.AES.decrypt(ciphertext, this.ENCRYPTION_KEY)
			return bytes.toString(CryptoJS.enc.Utf8)
		} catch (error) {
			console.error('Decryption failed:', error)
			throw new Error('Decryption failed')
		}
	}

	// 🔑 GENERAR/OBTENER CLAVE DE ENCRIPTACIÓN MEJORADA
	private getOrCreateEncryptionKey(): string {
		// Intentar obtener de sessionStorage primero
		const stored = sessionStorage.getItem('app_ek')
		if (stored) return stored

		// Generar nueva clave usando Web Crypto API
		const key = this.generateSecureKey()
		sessionStorage.setItem('app_ek', key)
		return key
	}

	private generateSecureKey(): string {
		// Usar Web Crypto API para mejor seguridad
		const array = new Uint8Array(32)
		crypto.getRandomValues(array)

		// Agregar timestamp y fingerprint del navegador para mayor entropía
		const timestamp = Date.now().toString()
		const fingerprint = this.generateBrowserFingerprint()

		// Combinar todo para crear una clave única
		const combinedData =
			Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('') + timestamp + fingerprint

		// Hash final para longitud consistente
		return CryptoJS.SHA256(combinedData).toString()
	}

	private generateBrowserFingerprint(): string {
		// Crear un fingerprint único basado en características del navegador
		const features = [
			navigator.userAgent,
			navigator.language,
			screen.colorDepth,
			screen.width + 'x' + screen.height,
			new Date().getTimezoneOffset(),
			navigator.hardwareConcurrency || 0,
			navigator.platform,
		]

		return CryptoJS.MD5(features.join('|')).toString()
	}

	// 💾 GUARDAR EN IDB CON MANEJO DE ERRORES
	private async saveToIDB(key: string, value: string, ttlMs: number): Promise<void> {
		try {
			await this.dbReady
			const expiresAt = new Date(Date.now() + ttlMs)
			await this.db.put('auth', { key, value, expiresAt })
		} catch (error) {
			console.error(`Failed to save ${key} to IDB:`, error)
			throw error
		}
	}

	// 📖 LEER DE IDB CON MANEJO DE ERRORES
	async getFromIDB(key: string): Promise<string | null> {
		try {
			await this.dbReady
			const data = await this.db.get('auth', key)

			if (!data) return null

			// Verificar expiración
			if (new Date() > data.expiresAt) {
				await this.db.delete('auth', key)
				return null
			}

			return data.value
		} catch (error) {
			console.error(`Failed to get ${key} from IDB:`, error)

			// Fallback para access token
			if (key === 'access_token') {
				const fallback = sessionStorage.getItem('fallback_token')
				return fallback || null
			}

			return null
		}
	}

	// 🔄 AUTO-REFRESH DE TOKENS
	private async setupTokenRefresh(): Promise<void> {
		try {
			// Cancelar timer existente si hay uno
			if (this.refreshTimer) {
				clearTimeout(this.refreshTimer)
			}

			const accessToken = await this.getFromIDB('access_token')
			if (!accessToken) return

			const decrypted = this.decrypt(accessToken)
			const decoded = this.decodeToken(decrypted)

			if (!decoded || !decoded.exp) return

			// Programar refresh 5 minutos antes de expirar
			const refreshTime = decoded.exp * 1000 - 5 * 60 * 1000
			const timeUntilRefresh = refreshTime - Date.now()

			if (timeUntilRefresh > 0) {
				this.refreshTimer = window.setTimeout(() => {
					this.refreshAccessToken()
				}, timeUntilRefresh)
			} else {
				// Si ya está por expirar, refrescar inmediatamente
				await this.refreshAccessToken()
			}
		} catch (error) {
			console.error('Failed to setup token refresh:', error)
		}
	}

	// 🔄 REFRESCAR ACCESS TOKEN
	private async refreshAccessToken(): Promise<void> {
		try {
			this.isLoading$.set(true)

			const refreshToken = await this.getFromIDB('refresh_token')
			if (!refreshToken) {
				throw new Error('No refresh token available')
			}

			const decrypted = this.decrypt(refreshToken)

			// Llamar al endpoint de refresh (implementar según tu backend)
			const response = await fetch('/api/auth/refresh', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ refreshToken: decrypted }),
				credentials: 'include',
			})

			if (!response.ok) {
				throw new Error('Failed to refresh token')
			}

			const data = await response.json()
			await this.saveAccessToken(data.accessToken)

			if (data.refreshToken) {
				await this.saveRefreshToken(data.refreshToken)
			}

			this.error$.set(null)
		} catch (error) {
			console.error('Failed to refresh access token:', error)
			this.error$.set('Session expired. Please login again.')
			await this.clearSession()
		} finally {
			this.isLoading$.set(false)
		}
	}

	// 🔍 DECODIFICAR TOKEN JWT
	private decodeToken(token: string): any {
		try {
			const payload = token.split('.')[1]
			if (!payload) return null

			const decoded = atob(payload)
			return JSON.parse(decoded)
		} catch (error) {
			console.error('Failed to decode token:', error)
			return null
		}
	}

	// 🧹 LIMPIAR SESIÓN
	async clearSession(): Promise<void> {
		try {
			this.isLoading$.set(true)

			// Cancelar timer de refresh
			if (this.refreshTimer) {
				clearTimeout(this.refreshTimer)
				this.refreshTimer = undefined
			}

			// Limpiar IDB
			await this.dbReady
			await this.db.clear('auth')

			// Limpiar localStorage
			localStorage.removeItem('user_public_data')

			// Limpiar sessionStorage
			sessionStorage.clear()

			// Actualizar signals
			this.isLogued$.set(false)
			this.user$.set(null)
			this.error$.set(null)

			// Llamar al endpoint de logout para limpiar cookies HttpOnly
			try {
				await fetch('/api/auth/logout', {
					method: 'POST',
					credentials: 'include',
				})
			} catch (error) {
				console.error('Failed to call logout endpoint:', error)
			}
		} catch (error) {
			console.error('Failed to clear session:', error)
			this.error$.set('Failed to clear session')
		} finally {
			this.isLoading$.set(false)
		}
	}

	// 🔄 VERIFICAR SI HAY SESIÓN VÁLIDA
	async hasValidSession(): Promise<boolean> {
		try {
			// Verificar token en IDB (para offline)
			const token = await this.getFromIDB('access_token')

			if (token) {
				// Verificar si el token no ha expirado
				const isValid = this.isTokenValid(this.decrypt(token))
				if (isValid) {
					return true
				}
			}

			// Si no hay token válido en IDB, verificar con el servidor
			return await this.checkServerSession()
		} catch (error) {
			console.error('Failed to check session validity:', error)
			return false
		}
	}

	private isTokenValid(token: string): boolean {
		if (!token) return false

		try {
			const decoded = this.decodeToken(token)
			if (!decoded || !decoded.exp) return false

			const exp = decoded.exp * 1000 // Convertir a millisegundos
			return Date.now() < exp
		} catch {
			return false
		}
	}

	// 🌐 VERIFICAR SESIÓN CON EL SERVIDOR
	private async checkServerSession(): Promise<boolean> {
		try {
			// TODO: Implementar verificación de sesión con el servidor
			return true
		} catch (error) {
			console.error('Failed to verify server session:', error)
			return false
		}
	}

	// 🔐 MÉTODOS PÚBLICOS DE AUTENTICACIÓN
	async login(credentials: { email: string; password: string }): Promise<void> {
		try {
			this.isLoading$.set(true)
			this.error$.set(null)

			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
				credentials: 'include',
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.message || 'Login failed')
			}

			const data = await response.json()

			// Guardar tokens
			if (data.accessToken) {
				await this.saveAccessToken(data.accessToken)
			}

			if (data.refreshToken) {
				await this.saveRefreshToken(data.refreshToken)
			}

			// Guardar datos del usuario
			if (data.user) {
				await this.saveUserData(data.user)
			}

			this.isLogued$.set(true)
		} catch (error: any) {
			console.error('Login failed:', error)
			this.error$.set(error.message || 'Login failed')
			throw error
		} finally {
			this.isLoading$.set(false)
		}
	}

	async logout(): Promise<void> {
		await this.clearSession()
	}

	// 🔄 SINCRONIZACIÓN ENTRE PESTAÑAS
	setupTabSync(): void {
		// Escuchar cambios en localStorage para sincronizar entre pestañas
		window.addEventListener('storage', event => {
			if (event.key === 'auth_sync' && event.newValue) {
				const data = JSON.parse(event.newValue)

				switch (data.action) {
					case 'login':
						this.isLogued$.set(true)
						if (data.user) {
							this.user$.set(data.user)
						}
						break

					case 'logout':
						this.clearSession()
						break

					case 'update_user':
						if (data.user) {
							this.user$.set(data.user)
						}
						break
				}
			}
		})
	}

	// Emitir eventos para sincronización
	private emitAuthEvent(action: string, data?: any): void {
		const event = {
			action,
			timestamp: Date.now(),
			...data,
		}

		localStorage.setItem('auth_sync', JSON.stringify(event))

		// Limpiar después de emitir
		setTimeout(() => {
			localStorage.removeItem('auth_sync')
		}, 100)
	}

	// 📊 MÉTODOS DE UTILIDAD PÚBLICA
	async getAccessToken(): Promise<string | null> {
		try {
			const encrypted = await this.getFromIDB('access_token')
			if (!encrypted) return null

			const token = this.decrypt(encrypted)

			// Verificar si el token es válido antes de devolverlo
			if (!this.isTokenValid(token)) {
				// Intentar refrescar
				await this.refreshAccessToken()

				// Obtener el nuevo token
				const newEncrypted = await this.getFromIDB('access_token')
				return newEncrypted ? this.decrypt(newEncrypted) : null
			}

			return token
		} catch (error) {
			console.error('Failed to get access token:', error)
			return null
		}
	}

	// Método para actualizar datos del usuario
	updateUserData(updates: Partial<User>): void {
		const currentUser = this.user$()
		if (currentUser) {
			const updatedUser = { ...currentUser, ...updates }
			this.user$.set(updatedUser)
			this.saveUserData(updatedUser)

			// Sincronizar con otras pestañas
			this.emitAuthEvent('update_user', { user: updatedUser })
		}
	}
}
