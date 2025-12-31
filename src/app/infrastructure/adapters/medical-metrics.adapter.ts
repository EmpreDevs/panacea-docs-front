import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { MedicalMetrics } from '@domain/models/medical-metrics.model'
import { MedicalMetricsRepository } from '@domain/repositories'

import { MedicalMetricsMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class MedicalMetricsAdapter extends BaseAdapter<MedicalMetrics> implements MedicalMetricsRepository {
	private readonly apiUrl = `${environment.apiUrl}/medical-metrics`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'medical-metrics', dbService, new MedicalMetricsMapper())
	}
}
