import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { ScheduleRepository } from "@domain/repositories";
import { ScheduleAdapter } from "@infra/adapters/schedule.adapter";
import { Schedule } from "@domain/models/schedule.model";

@Injectable()
export class ScheduleImpRepository extends BaseImpRepository<Schedule> implements ScheduleRepository {
  constructor(private readonly adapter: ScheduleAdapter) {
    super(adapter)
  }
}