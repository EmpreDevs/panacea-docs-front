import { Inject, Injectable } from "@angular/core";
import { CreateUseCase } from "../common";
import { Payment } from "@domain/models/payment.model";
import { paymentToken } from "@infra/di/tokens";
import { PaymentRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class CreatePaymentUseCase extends CreateUseCase<Payment> {
  constructor(
    @Inject(paymentToken) 
    private readonly repository: PaymentRepository) {
    super(repository)
  }
}