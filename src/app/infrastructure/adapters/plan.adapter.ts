import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { Plan } from '@domain/models/plan.model'
import { PlanRepository } from '@domain/repositories'

import { PlanMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class PlanAdapter extends BaseAdapter<Plan> implements PlanRepository {
	private readonly apiUrl = `${environment.apiUrl}/plans`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'plans', dbService, new PlanMapper())
	}
}
