import { User } from "./user.model";

export interface Auth {
  token: string;
  refreshToken: string;
  user: User
}