import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { Speciality } from "@domain/models";


@Injectable({ providedIn: 'root' })
export class SpecialtyState extends BaseState<Speciality> {

  constructor() {
    super({ storable: true, storageKey: 'specialty'})
  }
}