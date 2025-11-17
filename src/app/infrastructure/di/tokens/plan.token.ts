import { InjectionToken } from "@angular/core";
import { PlanRepository } from "@domain/repositories";

export const planToken = new InjectionToken<PlanRepository>('PLAN_TOKEN')