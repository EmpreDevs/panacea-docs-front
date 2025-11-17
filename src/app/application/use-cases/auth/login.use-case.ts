import { inject, Injectable } from "@angular/core";
import { Auth } from "@domain/models";
import { authToken } from "@infra/di/tokens/auth.token";

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private repository = inject(authToken)

  async execute(email: string, password: string): Promise<Auth> {
    return this.repository.login(email, password);
  }
}