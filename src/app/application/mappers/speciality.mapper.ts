import { SpecialityFormDto } from '@app/interfaces/features'

import { CreateSpecialityDto, UpdateSpecialityDto } from '@infra/dto'

export class SpecialityMapper {
	static toCreateDto(form: SpecialityFormDto): CreateSpecialityDto {
		return {
			name: form.name,
			description: form.description,
		}
	}

	static toUpdateDto(form: SpecialityFormDto): UpdateSpecialityDto {
		return {
			name: form.name,
			description: form.description,
		}
	}
}
