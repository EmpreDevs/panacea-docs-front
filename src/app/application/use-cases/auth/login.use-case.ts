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

		return this.repository.login(email, password)
	}

	validEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}
	validPassword(password: string): boolean {
		return true
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		return passwordRegex.test(password)
	}
}
