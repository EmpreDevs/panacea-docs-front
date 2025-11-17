import { inject, Injectable } from "@angular/core";
import { Auth, User } from "@domain/models";
import { AuthRepository } from "@domain/repositories";
import { environment } from "@envs/environment";
import { HttpClient } from "@infra/http/http.client";

@Injectable({ providedIn: 'root' })
export class AuthAdapter implements AuthRepository {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly http = inject(HttpClient);

  async login(email: string, password: string): Promise<Auth> {
    const response = await this.http.post<Auth>(`${this.apiUrl}/login`).body({ email, password }).excecute();

    return response.data;
  }
  async register(user: User): Promise<Auth> {
    const response = await this.http.post<Auth>(`${this.apiUrl}/register`).body(user).excecute();

    return response.data;
  }
  async changePassword(body: Partial<User>, userId: string): Promise<void> {
    const response = await this.http.put<void>(`${this.apiUrl}/change-password/${userId}`).body(body).excecute();

    return
  }
  async forgotPassword(email: string): Promise<void> {
    const response = await this.http.post<void>(`${this.apiUrl}/forgot-password`).body({ email }).excecute();

    return;
  }
  async resetPassword(email: string, password: string, token: string): Promise<void> {
    const response = await this.http.post<void>(`${this.apiUrl}/reset-password`).body({ email, password, token }).excecute();

    return;
    
  }
  async verifyEmail(email: string, token: string): Promise<void> {
    const response = await this.http.post<void>(`${this.apiUrl}/verify-email`).body({ email, token }).excecute();

    return;
    
  }
  async logout(): Promise<void> {
    const response = await this.http.post<void>(`${this.apiUrl}/logout`).excecute();

    return;
  }
  async refreshToken(): Promise<string> {
     const token = ''
    const response = await this.http.post<string>(`${this.apiUrl}/refresh-token`).token(token).excecute();

    return response.data;
  }

}