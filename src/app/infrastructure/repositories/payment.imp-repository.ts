import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { PaymentRepository } from "@domain/repositories";
import { PaymentAdapter } from "@infra/adapters/payment.adapter";
import { Payment } from "@domain/models/payment.model";

@Injectable()
export class PaymentImpRepository extends BaseImpRepository<Payment> implements PaymentRepository {
  constructor(private readonly adapter: PaymentAdapter) {
    super(adapter)
  }
}