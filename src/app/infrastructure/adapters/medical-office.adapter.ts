import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { MedicalOffice } from '@domain/models/medical-office.model'
import { MedicalOfficeRepository } from '@domain/repositories'

import { MedicalOfficeMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class MedicalOfficeAdapter extends BaseAdapter<MedicalOffice> implements MedicalOfficeRepository {
	private readonly apiUrl = `${environment.apiUrl}/medical-offices`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'medical-offices', dbService, new MedicalOfficeMapper())
	}
}
