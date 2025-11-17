import { inject, Injectable } from "@angular/core";
import { AuthRepository } from "@domain/repositories";
import { authToken } from "@infra/di/tokens/auth.token";

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  private repository: AuthRepository = inject(authToken)

  execute() {
    this.repository.logout()
  }
}