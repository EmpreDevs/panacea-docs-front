import { Provider } from "@angular/core";
import { authToken } from "./tokens/auth.token";
import { AuthImpRepository } from "@infra/repositories/auth.imp-repository";

export const diProvider: Provider[] = [
  { provide: authToken, useClass: AuthImpRepository }
]