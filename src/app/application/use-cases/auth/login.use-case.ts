import { inject, Injectable } from '@angular/core'
import { Auth } from '@domain/models'
import { authToken } from '@infra/di/tokens/auth.token'

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
	private repository = inject(authToken)

	async execute(email: string, password: string): Promise<Auth> {
		if (!this.validEmail(email)) {
			throw new Error('Email inválido')
		}
		if (!this.validPassword(password)) {
			throw new Error('Contraseña inválida')
		}

		// Simular login para credenciales de prueba
		if (email === 'admin@example.com' && password === 'Dracka911*') {
			return await this.simulate()
		}

		// Login real con el repositorio
		return this.repository.login(email, password)
	}

	validEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}
	validPassword(password: string): boolean {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		return passwordRegex.test(password)
	}

	simulate(): Promise<Auth> {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({
					user: {
						id: '1',
						name: 'John Doe',
						email: 'john.doe@example.com',
						role: 'admin',
						avatar: 'https://example.com/avatar.jpg',
						preferences: {},
						password: '*******',
					},
					token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNzk2MTAwODQ4fQ.0VoSUsIvbzqWrchXvuFLpVoMEc1rcjGdEvTkEQ77CUQ',
					refreshToken:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNzk2MTAwODQ4fQ.0VoSUsIvbzqWrchXvuFLpVoMEc1rcjGdEvTkEQ77CUQ',
				})
			}, 2000)
		})
	}
}
