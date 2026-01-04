import { Injectable } from '@angular/core'

import {
	CreateAppointmentUseCase,
	DeleteAppointmentUseCase,
	FindAllAppointmentsUseCase,
	FindAppointmentByIdUseCase,
	UpdateAppointmentUseCase,
} from '@app/use-cases'

import { Appointment } from '@domain/models'

import { AppointmentState } from '../states/appointment.state'
import { BaseFacade } from './common/base.facade'

@Injectable({ providedIn: 'root' })
export class AppointmentFacade extends BaseFacade<Appointment> {
	constructor(
		createUseCase: CreateAppointmentUseCase,
		findOneUseCase: FindAppointmentByIdUseCase,
		updateUseCase: UpdateAppointmentUseCase,
		deleteUseCase: DeleteAppointmentUseCase,
		private readonly findAllUseCase: FindAllAppointmentsUseCase,
		private readonly state: AppointmentState,
	) {
		super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
	}

	getAppointmentById(id: string) {
		return new Appointment({
			id,
			patientId: '',
			startDate: new Date(),
			endDate: new Date(),
			title: 'Ejemplo de cita',
		})
	}
}
