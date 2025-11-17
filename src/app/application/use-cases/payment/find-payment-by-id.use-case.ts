import { Inject, Injectable } from "@angular/core";
import { FindByIdUseCase } from "../common";
import { Payment } from "@domain/models/payment.model";
import { paymentToken } from "@infra/di/tokens";
import { PaymentRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindPaymentByIdUseCase extends FindByIdUseCase<Payment> {
  constructor(
    @Inject(paymentToken) 
    private readonly repository: PaymentRepository) {
    super(repository)
  }
}