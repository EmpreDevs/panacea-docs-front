import { inject, Injectable } from "@angular/core";
import { ForgotPasswordUseCase, LoginUseCase, LogoutUseCase, RefreshTokenUseCase, RegisterUseCase, ResetPasswordUseCase } from "@app/use-cases";
import { User } from "@domain/models";
import { AuthState } from "../states/auth.state";

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly forgoPasswordUC = inject(ForgotPasswordUseCase)
  private readonly loginUC = inject(LoginUseCase)
  private readonly logoutUC = inject(LogoutUseCase)
  private readonly refreshTokenUC = inject(RefreshTokenUseCase)
  private readonly registerUC = inject(RegisterUseCase)
  private readonly resetPasswordUC = inject(ResetPasswordUseCase)
  private readonly authState = inject(AuthState)

  async login(email: string, password: string) {
    const auth = await this.loginUC.execute(email, password)
    this.authState.saveUserData(auth)
    this.authState.saveAccessToken(auth.token)
    this.authState.saveRefreshToken(auth.refreshToken)
  }
  forgotPassword(email: string) {
    return this.forgoPasswordUC.execute(email)
  }
  logout() {
    return this.logoutUC.execute()
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
}