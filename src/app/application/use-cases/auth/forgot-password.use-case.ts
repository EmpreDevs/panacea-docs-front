import { inject, Injectable } from "@angular/core";
import { AuthRepository } from "@domain/repositories";
import { authToken } from "@infra/di/tokens/auth.token";

@Injectable({ providedIn: 'root' })
export class ForgotPasswordUseCase {
  private repository: AuthRepository = inject(authToken)

  async execute(email: string) {
    return this.repository.forgotPassword(email)
  }
}