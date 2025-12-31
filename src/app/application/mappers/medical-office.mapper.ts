import { MedicalOfficeFormDto } from '@app/interfaces/features'

import { CreateMedicalOfficeDto, UpdateMedicalOfficeDto } from '@infra/dto'

export class MedicalOfficeMapper {
	static toCreateDto(form: MedicalOfficeFormDto): CreateMedicalOfficeDto {
		return {
			name: form.name,
			address: form.address,
			phone: form.phone,
		}
	}

	static toUpdateDto(form: MedicalOfficeFormDto): UpdateMedicalOfficeDto {
		return {
			name: form.name,
			address: form.address,
			phone: form.phone,
		}
	}
}
