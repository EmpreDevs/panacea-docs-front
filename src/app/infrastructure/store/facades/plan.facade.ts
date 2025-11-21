import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { Plan } from "@domain/models";
import { CreatePlanUseCase, DeletePlanUseCase, FindAllPlansUseCase, FindPlanByIdUseCase, UpdatePlanUseCase } from "@app/use-cases";
import { PlanState } from "../states";

@Injectable({ providedIn: 'root' })
export class PlanFacade extends BaseFacade<Plan>{
  constructor(
    createUseCase: CreatePlanUseCase,
    findOneUseCase: FindPlanByIdUseCase,
    findAllUseCase: FindAllPlansUseCase,
    updateUseCase: UpdatePlanUseCase,
    deleteUseCase: DeletePlanUseCase,
    private readonly state: PlanState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}