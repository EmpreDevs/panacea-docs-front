import { InjectionToken } from "@angular/core";
import { HealthProviderExceptionsRepository } from "@domain/repositories";

export const healthProviderExceptionsToken = new InjectionToken<HealthProviderExceptionsRepository>('HEALTH_PROVIDER_EXCEPTIONS_TOKEN')