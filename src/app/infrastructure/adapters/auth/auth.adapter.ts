import { Injectable, inject } from '@angular/core'

import { environment } from '@envs/environment'

import { Auth, User } from '@domain/models'
import { AuthRepository } from '@domain/repositories'

import { AuthMapper, AuthResponseDto } from '@infra/dto'
import { HttpClient } from '@infra/http/http.client'

@Injectable({ providedIn: 'root' })
export class AuthAdapter implements AuthRepository {
	private readonly apiUrl = `${environment.apiUrl}/auth`
	private readonly http = inject(HttpClient)

	async login(email: string, password: string): Promise<Auth> {
		const response = await this.http
			.post<AuthResponseDto>(`${this.apiUrl}/login`)
			.body({ email, password })
			.execute()

		const auth = response.data
		return AuthMapper.toModel(auth)
	}
	//TODO REVISAR RESPUESTA DEL BACKEND
	async register(user: User): Promise<Auth> {
		const response = await this.http.post<Auth>(`${this.apiUrl}/register`).body(user).execute()

		return response.data
	}
	async changePassword(body: Partial<User>, userId: string): Promise<void> {
		const response = await this.http.put<void>(`${this.apiUrl}/change-password/${userId}`).body(body).execute()

		return
	}
	async forgotPassword(email: string): Promise<void> {
		const response = await this.http.post<void>(`${this.apiUrl}/forgot-password`).body({ email }).execute()

		return
	}
	async resetPassword(email: string, password: string, token: string): Promise<void> {
		const response = await this.http
			.post<void>(`${this.apiUrl}/reset-password`)
			.body({ email, password, token })
			.execute()

		return
	}
	async verifyEmail(email: string, token: string): Promise<void> {
		const response = await this.http.post<void>(`${this.apiUrl}/verify-email`).body({ email, token }).execute()

		return
	}
	async logout(): Promise<void> {
		const response = await this.http.post<void>(`${this.apiUrl}/logout`).execute()

		return
	}
	async refreshToken(): Promise<string> {
		const token = ''
		const response = await this.http.post<string>(`${this.apiUrl}/refresh-token`).token(token).execute()

		return response.data
	}
}
