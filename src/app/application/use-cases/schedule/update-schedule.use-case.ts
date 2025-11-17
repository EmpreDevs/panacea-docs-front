import { Inject, Injectable } from "@angular/core";
import { UpdateUseCase } from "../common";
import { Schedule } from "@domain/models/schedule.model";
import { scheduleToken } from "@infra/di/tokens";
import { ScheduleRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateScheduleUseCase extends UpdateUseCase<Schedule> {
  constructor(
    @Inject(scheduleToken) 
    private readonly repository: ScheduleRepository) {
    super(repository)
  }
}