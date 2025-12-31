import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { Schedule } from '@domain/models/schedule.model'
import { ScheduleRepository } from '@domain/repositories'

import { ScheduleMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class ScheduleAdapter extends BaseAdapter<Schedule> implements ScheduleRepository {
	private readonly apiUrl = `${environment.apiUrl}/schedules`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'schedules', dbService, new ScheduleMapper())
	}
}
