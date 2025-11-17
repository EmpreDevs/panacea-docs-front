import { Auth, User } from "../../models";

export interface AuthRepository {
  login(email: string, password: string): Promise<Auth>;
  register(user: User): Promise<Auth>;
  changePassword(body: Partial<User>, userId: string): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(email: string, password: string, token: string): Promise<void>;
  verifyEmail(email: string, token: string): Promise<void>;
  logout(): Promise<void>;
  refreshToken(): Promise<string>;
}