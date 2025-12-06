import { inject, Injectable } from '@angular/core'
import {
	ForgotPasswordUseCase,
	LoginUseCase,
	LogoutUseCase,
	RefreshTokenUseCase,
	RegisterUseCase,
	ResetPasswordUseCase,
} from '@app/use-cases'
import { User } from '@domain/models'
import { AuthState } from '../states/auth.state'

@Injectable({ providedIn: 'root' })
export class AuthFacade {
	private readonly forgoPasswordUC = inject(ForgotPasswordUseCase)
	private readonly loginUC = inject(LoginUseCase)
	private readonly logoutUC = inject(LogoutUseCase)
	private readonly refreshTokenUC = inject(RefreshTokenUseCase)
	private readonly registerUC = inject(RegisterUseCase)
	private readonly resetPasswordUC = inject(ResetPasswordUseCase)
	private readonly authState = inject(AuthState)

	async login(email: string, password: string): Promise<boolean> {
		try {
			this.authState.setLoading(true)
			const auth = await this.loginUC.execute(email, password)
			await Promise.all([
				this.authState.saveUserData(auth.user),
				this.authState.saveAccessToken(auth.token),
				this.authState.saveRefreshToken(auth.refreshToken),
			])
			this.authState.setLoading(false)
			return this.authState.isAuthenticated()
		} catch (error: any) {
			let errorMessage: string = 'Ocurrió un error desconocido.'
			if (error instanceof Error) {
				errorMessage = error.message
			}
			this.authState.setError(errorMessage)
			this.authState.setLoading(false)
			return false
		}
	}
	forgotPassword(email: string) {
		return this.forgoPasswordUC.execute(email)
	}
	async logout() {
		this.authState.setLoading(true)
		const response = await this.logoutUC.execute()
		this.authState.setLoading(false)
		this.authState.logout()
		return response
	}
	register(user: User) {
		return this.registerUC.execute(user)
	}
	resetPassword(email: string, password: string, token: string) {
		return this.resetPasswordUC.execute(email, password, token)
	}

	getUserData() {
		return this.authState.user
	}

	isAuthenticated() {
		return this.authState.isAuthenticated
	}
	loading() {
		return this.authState.isLoading
	}
	errors() {
		return this.authState.error
	}
}
