import { Provider } from "@angular/core";
import { authToken } from "./tokens/auth.token";
import { AuthImpRepository } from "@infra/repositories/auth.imp-repository";
import { specialityToken } from "./tokens/speciality.token";
import { SpecialityImpRepository } from "@infra/repositories/speciality.imp-repository";

export const diProvider: Provider[] = [
  { provide: authToken, useClass: AuthImpRepository },
  { provide: specialityToken, useClass: SpecialityImpRepository }
]