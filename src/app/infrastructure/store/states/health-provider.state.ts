import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { HealthProvider } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class HealthProviderState extends BaseState<HealthProvider> {

  constructor() {
    super({ storable: true, storageKey: 'health-provider'})
  }
}