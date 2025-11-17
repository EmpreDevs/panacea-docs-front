import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { HealthProviderScheduleRepository } from "@domain/repositories";
import { HealthProviderScheduleAdapter } from "@infra/adapters/health-provider-schedule.adapter";
import { HealthProviderSchedule } from "@domain/models/health-provider-schedule.model";

@Injectable()
export class HealthProviderScheduleImpRepository extends BaseImpRepository<HealthProviderSchedule> implements HealthProviderScheduleRepository {
  constructor(private readonly adapter: HealthProviderScheduleAdapter) {
    super(adapter)
  }
}