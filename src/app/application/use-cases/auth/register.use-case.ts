import { inject, Injectable } from "@angular/core";
import { User } from "@domain/models";
import { AuthRepository } from "@domain/repositories";
import { authToken } from "@infra/di/tokens/auth.token";

@Injectable({providedIn: 'root'})
export class RegisterUseCase {
  private repository: AuthRepository = inject(authToken)

  async execute(user: User) {
    return this.repository.register(user)
  }
}