import { InjectionToken } from "@angular/core";
import { PaymentRepository } from "@domain/repositories";

export const paymentToken = new InjectionToken<PaymentRepository>('PAYMENT_TOKEN')