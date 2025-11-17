import { inject, Injectable } from "@angular/core";
import { AuthRepository } from "@domain/repositories";
import { authToken } from "@infra/di/tokens/auth.token";

@Injectable({ providedIn: 'root' })
export class ResetPasswordUseCase{
  private repository: AuthRepository = inject(authToken)

  execute(email: string, password: string, token: string) {
    return this.repository.resetPassword(email, password, token)
  }
}