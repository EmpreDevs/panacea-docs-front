import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { MedicalOffice } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class MedicalOfficeState extends BaseState<MedicalOffice> {

  constructor() {
    super({ storable: true, storageKey: 'medical-office'})
  }
}