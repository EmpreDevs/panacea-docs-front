import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { HealthProviderSchedule } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class HealthProviderScheduleState extends BaseState<HealthProviderSchedule> {

  constructor() {
    super({ storable: true, storageKey: 'health-provider-schedule'})
  }
}