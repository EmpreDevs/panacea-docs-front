import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { HealthProviderSchedule } from '@domain/models/health-provider-schedule.model'
import { HealthProviderScheduleRepository } from '@domain/repositories'

import { HealthProviderScheduleMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class HealthProviderScheduleAdapter
	extends BaseAdapter<HealthProviderSchedule>
	implements HealthProviderScheduleRepository
{
	private readonly apiUrl = `${environment.apiUrl}/health-provider-schedules`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'health-provider-schedules', dbService, new HealthProviderScheduleMapper())
	}
}
