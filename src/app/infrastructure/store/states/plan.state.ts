import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { Plan } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class PlanState extends BaseState<Plan> {

  constructor() {
    super({ storable: true, storageKey: 'plan'})
  }
}