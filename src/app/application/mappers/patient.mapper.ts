import { PatientFormDto } from '@app/interfaces/features'

import { CreatePatientDto, UpdatePatientDto } from '@infra/dto'

export class PatientMapper {
	static toCreateDto(form: PatientFormDto, healthProviderId: string): CreatePatientDto {
		return {
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			phone: form.phone,
			address: form.address,
			dateBirth: form.dateBirth,
			gender: form.gender,
			healthProviderId: healthProviderId,
		}
	}

	static toUpdateDto(form: PatientFormDto): UpdatePatientDto {
		return {
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			phone: form.phone,
			address: form.address,
			dateBirth: form.dateBirth,
			gender: form.gender,
		}
	}
}
