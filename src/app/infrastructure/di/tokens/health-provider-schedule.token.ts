import { InjectionToken } from "@angular/core";
import { HealthProviderScheduleRepository } from "@domain/repositories";

export const healthProviderScheduleToken = new InjectionToken<HealthProviderScheduleRepository>('HEALTH_PROVIDER_SCHEDULE_TOKEN')