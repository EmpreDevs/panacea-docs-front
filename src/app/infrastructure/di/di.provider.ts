import { Provider } from "@angular/core";
import { authToken } from "./tokens/auth.token";
import { AuthImpRepository } from "@infra/repositories/auth.imp-repository";
import { specialityToken } from "./tokens/speciality.token";
import { SpecialityImpRepository } from "@infra/repositories/speciality.imp-repository";
import { healthProviderToken } from "./tokens/health-provider.token";
import { HealthProviderImpRepository } from "@infra/repositories/health-provider.imp-repository";

export const diProvider: Provider[] = [
  { provide: authToken, useClass: AuthImpRepository },
  { provide: specialityToken, useClass: SpecialityImpRepository },
  { provide: healthProviderToken, useClass: HealthProviderImpRepository }
]