import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { Schedule } from "@domain/models";
import { CreateScheduleUseCase, DeleteScheduleUseCase, FindAllSchedulesUseCase, FindScheduleByIdUseCase, UpdateScheduleUseCase } from "@app/use-cases";
import { ScheduleState } from "../states";

@Injectable({ providedIn: 'root' })
export class ScheduleFacade extends BaseFacade<Schedule>{
  constructor(
    createUseCase: CreateScheduleUseCase,
    findOneUseCase: FindScheduleByIdUseCase,
    findAllUseCase: FindAllSchedulesUseCase,
    updateUseCase: UpdateScheduleUseCase,
    deleteUseCase: DeleteScheduleUseCase,
    private readonly state: ScheduleState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}