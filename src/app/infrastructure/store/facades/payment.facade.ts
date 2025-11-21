import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { Payment } from "@domain/models";
import { CreatePaymentUseCase, DeletePaymentUseCase, FindAllPaymentsUseCase, FindPaymentByIdUseCase, UpdatePaymentUseCase } from "@app/use-cases";
import { PaymentState } from "../states";

@Injectable({ providedIn: 'root' })
export class PaymentFacade extends BaseFacade<Payment>{
  constructor(
    createUseCase: CreatePaymentUseCase,
    findOneUseCase: FindPaymentByIdUseCase,
    findAllUseCase: FindAllPaymentsUseCase,
    updateUseCase: UpdatePaymentUseCase,
    deleteUseCase: DeletePaymentUseCase,
    private readonly state: PaymentState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}