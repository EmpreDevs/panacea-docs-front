import { IPatientFormDto } from '@app/interfaces/features'

import { CreatePatientDto, UpdatePatientDto } from '@infra/dto'

export class PatientMapper {
	toCreateDto(form: IPatientFormDto): CreatePatientDto {
		return {
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			phone: form.phone,
			address: form.address,
			dateBirth: form.dateBirth,
			gender: form.gender,
			healthProviderId: form.healthProviderId,
		}
	}

	toUpdateDto(form: IPatientFormDto): UpdatePatientDto {
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
