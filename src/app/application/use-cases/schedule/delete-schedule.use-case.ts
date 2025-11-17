import { Inject, Injectable } from "@angular/core";
import { DeleteUseCase } from "../common";
import { Schedule } from "@domain/models/schedule.model";
import { scheduleToken } from "@infra/di/tokens";
import { ScheduleRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteScheduleUseCase extends DeleteUseCase<Schedule> {
  constructor(
    @Inject(scheduleToken) 
    private readonly repository: ScheduleRepository) {
    super(repository)
  }
}