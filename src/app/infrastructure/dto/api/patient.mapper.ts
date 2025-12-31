import { Patient } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { PatientResponseDto } from './patient-response.dto'

export class PatientMapper implements IMapper<Patient, PatientResponseDto> {
	toModel(data: PatientResponseDto): Patient {
		return {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			address: data.address,
			dateBirth: data.dateBirth,
			healthProviderId: data.healthProviderId,
			gender: data.gender,
		}
	}

	toDto(data: Patient): PatientResponseDto {
		return {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			address: data.address,
			dateBirth: data.dateBirth,
			healthProviderId: data.healthProviderId,
			gender: data.gender,
		}
	}
}
