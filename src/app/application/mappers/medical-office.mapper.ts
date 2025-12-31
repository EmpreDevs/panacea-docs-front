import { IMedicalOfficeFormDto } from '@app/interfaces/features'

import { CreateMedicalOfficeDto, UpdateMedicalOfficeDto } from '@infra/dto'

export class MedicalOfficeMapper {
	toCreateDto(form: IMedicalOfficeFormDto): CreateMedicalOfficeDto {
		return {
			name: form.name,
			address: form.address,
			phone: form.phone,
		}
	}

	toUpdateDto(form: IMedicalOfficeFormDto): UpdateMedicalOfficeDto {
		return {
			name: form.name,
			address: form.address,
			phone: form.phone,
		}
	}
}
