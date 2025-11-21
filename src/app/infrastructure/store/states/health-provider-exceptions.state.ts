import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { HealthProviderExceptions } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class HealthProviderExceptionsState extends BaseState<HealthProviderExceptions> {

  constructor() {
    super({ storable: true, storageKey: 'health-provider-exceptions'})
  }
}