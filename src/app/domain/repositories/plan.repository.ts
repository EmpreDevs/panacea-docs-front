import { Plan } from "@domain/models/plan.model";
import { CrudRepository } from "./common/crud.repository";

export interface PlanRepository extends CrudRepository<Plan> {}