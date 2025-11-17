import { InjectionToken } from "@angular/core";
import { HealthProviderRepository } from "@domain/repositories";

export const healthProviderToken = new InjectionToken<HealthProviderRepository>('HEALTH_PROVIDER_TOKEN')