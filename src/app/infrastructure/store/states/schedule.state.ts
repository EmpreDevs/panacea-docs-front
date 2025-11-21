import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { Schedule } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class ScheduleState extends BaseState<Schedule> {

  constructor() {
    super({ storable: true, storageKey: 'schedule'})
  }
}