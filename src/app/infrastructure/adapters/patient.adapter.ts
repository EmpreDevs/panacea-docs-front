import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { Patient } from '@domain/models/patient.model'
import { PatientRepository } from '@domain/repositories'

import { PatientMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class PatientAdapter extends BaseAdapter<Patient> implements PatientRepository {
	private readonly apiUrl = `${environment.apiUrl}/patients`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'patients', dbService, new PatientMapper())
	}
}
