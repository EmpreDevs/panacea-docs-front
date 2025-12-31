import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { HealthProvider } from '@domain/models/health-provider.model'
import { HealthProviderRepository } from '@domain/repositories'

import { HealthProviderMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class HealthProviderAdapter extends BaseAdapter<HealthProvider> implements HealthProviderRepository {
	private readonly apiUrl = `${environment.apiUrl}/health-providers`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'health-providers', dbService, new HealthProviderMapper())
	}
}
