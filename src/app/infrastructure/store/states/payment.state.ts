import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { Payment } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class PaymentState extends BaseState<Payment> {

  constructor() {
    super({ storable: true, storageKey: 'payment'})
  }
}