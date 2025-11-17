import { Inject, Injectable } from "@angular/core";
import { FindAllUseCase } from "../common";
import { Schedule } from "@domain/models/schedule.model";
import { scheduleToken } from "@infra/di/tokens";
import { ScheduleRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindAllSchedulesUseCase extends FindAllUseCase<Schedule> {
  constructor(
    @Inject(scheduleToken) 
    private readonly repository: ScheduleRepository) {
    super(repository)
  }
}