import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { HealthProviderExceptions } from '@domain/models/health-provider-exceptions.model'
import { HealthProviderExceptionsRepository } from '@domain/repositories'

import { HealthProviderExceptionsMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class HealthProviderExceptionsAdapter
	extends BaseAdapter<HealthProviderExceptions>
	implements HealthProviderExceptionsRepository
{
	private readonly apiUrl = `${environment.apiUrl}/health-provider-exceptions`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'health-provider-exceptions', dbService, new HealthProviderExceptionsMapper())
	}
}
