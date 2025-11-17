import { Inject, Injectable } from "@angular/core";
import { DeleteUseCase } from "../common";
import { Payment } from "@domain/models/payment.model";
import { paymentToken } from "@infra/di/tokens";
import { PaymentRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class DeletePaymentUseCase extends DeleteUseCase<Payment> {
  constructor(
    @Inject(paymentToken) 
    private readonly repository: PaymentRepository) {
    super(repository)
  }
}