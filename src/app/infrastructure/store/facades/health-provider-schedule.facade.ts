import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { HealthProviderSchedule } from "@domain/models";
import { CreateHealthProviderScheduleUseCase, DeleteHealthProviderScheduleUseCase, FindAllHealthProviderSchedulesUseCase, FindHealthProviderScheduleByIdUseCase, UpdateHealthProviderScheduleUseCase } from "@app/use-cases";
import { HealthProviderScheduleState } from "../states";

@Injectable({ providedIn: 'root' })
export class HealthProviderScheduleFacade extends BaseFacade<HealthProviderSchedule>{
  constructor(
    createUseCase: CreateHealthProviderScheduleUseCase,
    findOneUseCase: FindHealthProviderScheduleByIdUseCase,
    findAllUseCase: FindAllHealthProviderSchedulesUseCase,
    updateUseCase: UpdateHealthProviderScheduleUseCase,
    deleteUseCase: DeleteHealthProviderScheduleUseCase,
    private readonly state: HealthProviderScheduleState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}