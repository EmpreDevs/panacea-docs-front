import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { Subscription } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class SubscriptionState extends BaseState<Subscription> {

  constructor() {
    super({ storable: true, storageKey: 'subscription'})
  }
}