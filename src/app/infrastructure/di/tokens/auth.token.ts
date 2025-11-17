import { InjectionToken } from "@angular/core";
import { AuthRepository } from "@domain/repositories";

export const authToken = new InjectionToken<AuthRepository>('AUTH_TOKEN');