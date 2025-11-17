import { inject, Injectable } from "@angular/core";
import { Payment } from "@domain/models/payment.model";
import { PaymentRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";

@Injectable({ providedIn: 'root' })
export class PaymentAdapter extends BaseAdapter<Payment> implements PaymentRepository{
  private readonly apiUrl = `${environment.apiUrl}/payments`

  constructor(private readonly http: HttpClient) {
    super(http, 'payments')
  }
}