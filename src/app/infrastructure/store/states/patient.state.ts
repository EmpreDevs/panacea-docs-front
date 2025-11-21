import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { Patient } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class PatientState extends BaseState<Patient> {

  constructor() {
    super({ storable: true, storageKey: 'patient'})
  }
}