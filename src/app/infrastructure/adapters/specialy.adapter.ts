import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { Speciality } from '@domain/models/speciality.model'
import { SpecialtyRepository } from '@domain/repositories'

import { SpecialityMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class SpecialtyAdapter extends BaseAdapter<Speciality> implements SpecialtyRepository {
	private readonly apiUrl = `${environment.apiUrl}/specialties`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'specialties', dbService, new SpecialityMapper())
	}
}
