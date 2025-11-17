import { inject, Injectable } from "@angular/core";
import { User } from "@domain/models";
import { AuthRepository } from "@domain/repositories";
import { authToken } from "@infra/di/tokens/auth.token";

@Injectable({ providedIn: 'root'})
export class ChangePasswordUseCase{
  private repository: AuthRepository = inject(authToken)

  execute(user: Partial<User>, userId: string) {
    return this.repository.changePassword(user, userId)
  }
}