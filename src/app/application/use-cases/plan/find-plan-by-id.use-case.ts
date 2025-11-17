import { Inject, Injectable } from "@angular/core";
import { FindByIdUseCase } from "../common";
import { Plan } from "@domain/models/plan.model";
import { planToken } from "@infra/di/tokens";
import { PlanRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindPlanByIdUseCase extends FindByIdUseCase<Plan> {
  constructor(
    @Inject(planToken) 
    private readonly repository: PlanRepository) {
    super(repository)
  }
}