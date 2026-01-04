import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { Appointment } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class AppointmentState extends BaseState<Appointment> {

  constructor() {
    super({ storable: true, storageKey: 'appointment'})
  }
}
