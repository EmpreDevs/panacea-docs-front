import { inject, Injectable } from "@angular/core";
import { Payment } from "@domain/models/payment.model";
import { PaymentRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class PaymentAdapter extends BaseAdapter<Payment> implements PaymentRepository{
  private readonly apiUrl = `${environment.apiUrl}/payments`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'payments', dbService)
  }
}