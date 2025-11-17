import { InjectionToken } from "@angular/core";
import { ScheduleRepository } from "@domain/repositories";

export const scheduleToken = new InjectionToken<ScheduleRepository>('SCHEDULE_TOKEN')