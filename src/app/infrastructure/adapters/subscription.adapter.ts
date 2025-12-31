import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { Subscription } from '@domain/models/subscription.model'
import { SubscriptionRepository } from '@domain/repositories'

import { SubscriptionMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class SubscriptionAdapter extends BaseAdapter<Subscription> implements SubscriptionRepository {
	private readonly apiUrl = `${environment.apiUrl}/subscriptions`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'subscriptions', dbService, new SubscriptionMapper())
	}
}
