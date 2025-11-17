import { Inject, Injectable } from "@angular/core";
import { FindAllUseCase } from "../common";
import { Plan } from "@domain/models/plan.model";
import { planToken } from "@infra/di/tokens";
import { PlanRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindAllPlansUseCase extends FindAllUseCase<Plan> {
  constructor(
    @Inject(planToken) 
    private readonly repository: PlanRepository) {
    super(repository)
  }
}