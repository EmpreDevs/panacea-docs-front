import { inject, Injectable } from "@angular/core";
import { AuthRepository } from "@domain/repositories";
import { authToken } from "@infra/di/tokens/auth.token";

@Injectable({ providedIn: 'root' })
export class VerifyEmailUseCase{
  private repository: AuthRepository = inject(authToken)

  execute(email: string, token: string){
    return this.repository.verifyEmail(email, token)
  }
}