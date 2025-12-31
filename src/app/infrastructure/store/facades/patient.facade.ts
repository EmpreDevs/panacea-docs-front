import { Injectable } from '@angular/core'

import {
	CreatePatientUseCase,
	DeletePatientUseCase,
	FindAllPatientsUseCase,
	FindPatientByIdUseCase,
	UpdatePatientUseCase,
} from '@app/use-cases'

import { Patient } from '@domain/models'

import { PatientState } from '../states'
import { BaseFacade } from './common/base.facade'

@Injectable({ providedIn: 'root' })
export class PatientFacade extends BaseFacade<Patient> {
	constructor(
		createUseCase: CreatePatientUseCase,
		findOneUseCase: FindPatientByIdUseCase,
		updateUseCase: UpdatePatientUseCase,
		deleteUseCase: DeletePatientUseCase,
		private readonly findAllUseCase: FindAllPatientsUseCase,
		private readonly state: PatientState,
	) {
		super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
	}

	async searchPatients(searchTerm: string, healthProviderId: string): Promise<Patient[]> {
		const filters = {
			name: searchTerm,
			healthProviderId,
		}
		this.state.setLoading(true)
		//const patients = await this.findAllUseCase.execute(filters)
		this.state.setLoading(false)
		const PATIENTS_EXAMPLE: Patient[] = [
			new Patient({
				id: '7b2a1-45c8',
				firstName: 'Juan',
				lastName: 'Pérez',
				email: 'juan.perez@email.com',
				phone: '+52 55 1234 5678',
				address: 'Av. Reforma 123, Ciudad de México',
				dateBirth: new Date(1985, 4, 15), // 15 de Mayo de 1985
				healthProviderId: '1',
				gender: 'male',
			}),
			new Patient({
				id: '3f9d2-98b1',
				firstName: 'María',
				lastName: 'García',
				email: 'm.garcia@email.com',
				phone: '+52 55 8765 4321',
				address: 'Calle Juárez 456, Guadalajara',
				dateBirth: new Date(1992, 10, 22), // 22 de Noviembre de 1992
				healthProviderId: '1',
				gender: 'female',
			}),
		]

		return PATIENTS_EXAMPLE.filter(patient => patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
	}
}
