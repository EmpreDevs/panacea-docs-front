import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { PlanRepository } from "@domain/repositories";
import { PlanAdapter } from "@infra/adapters/plan.adapter";
import { Plan } from "@domain/models/plan.model";

@Injectable()
export class PlanImpRepository extends BaseImpRepository<Plan> implements PlanRepository {
  constructor(private readonly adapter: PlanAdapter) {
    super(adapter)
  }
}