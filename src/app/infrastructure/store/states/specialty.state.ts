import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { Specialty } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class SpecialtyState extends BaseState<Specialty> {

  constructor() {
    super({ storable: true, storageKey: 'specialty'})
  }
}