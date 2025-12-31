import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { Appointment } from '@domain/models/appointment.model'
import { AppointmentRepository } from '@domain/repositories'

import { AppointmentMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class AppointmentAdapter extends BaseAdapter<Appointment> implements AppointmentRepository {
	private readonly apiUrl = `${environment.apiUrl}/appointments`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'appointments', dbService, new AppointmentMapper())
	}
}
