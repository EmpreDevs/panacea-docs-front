import { Inject, Injectable } from "@angular/core";
import { FindByIdUseCase } from "../common";
import { HealthProviderSchedule } from "@domain/models/health-provider-schedule.model";
import { healthProviderScheduleToken } from "@infra/di/tokens";
import { HealthProviderScheduleRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindHealthProviderScheduleByIdUseCase extends FindByIdUseCase<HealthProviderSchedule> {
  constructor(
    @Inject(healthProviderScheduleToken) 
    private readonly repository: HealthProviderScheduleRepository) {
    super(repository)
  }
}