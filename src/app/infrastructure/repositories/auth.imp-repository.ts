import { inject, Injectable } from "@angular/core";
import { Auth, User } from "@domain/models";
import { AuthRepository } from "@domain/repositories";
import { AuthAdapter } from "@infra/adapters/auth/auth.adapter";

@Injectable()
export class AuthImpRepository implements AuthRepository {
  private readonly authAdapter = inject(AuthAdapter);

  login(email: string, password: string): Promise<Auth> {
    return this.authAdapter.login(email, password);
  }
  register(user: User): Promise<Auth> {
    return this.authAdapter.register(user);
  }
  changePassword(body: Partial<User>, userId: string): Promise<void> {
    return this.authAdapter.changePassword(body, userId);
  }
  forgotPassword(email: string): Promise<void> {
    return this.authAdapter.forgotPassword(email);
  }
  resetPassword(email: string, password: string, token: string): Promise<void> {
    return this.authAdapter.resetPassword(email, password, token);
  }
  verifyEmail(email: string, token: string): Promise<void> {
    return this.authAdapter.verifyEmail(email, token);
  }
  logout(): Promise<void> {
    return this.authAdapter.logout();
  }
  refreshToken(): Promise<string> {
    return this.authAdapter.refreshToken();
  }
}