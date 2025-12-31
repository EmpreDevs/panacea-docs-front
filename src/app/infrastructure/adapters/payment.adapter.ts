import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { Payment } from '@domain/models/payment.model'
import { PaymentRepository } from '@domain/repositories'

import { PaymentMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class PaymentAdapter extends BaseAdapter<Payment> implements PaymentRepository {
	private readonly apiUrl = `${environment.apiUrl}/payments`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'payments', dbService, new PaymentMapper())
	}
}
