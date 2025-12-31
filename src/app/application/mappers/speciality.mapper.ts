import { ISpecialityFormDto } from '@app/interfaces/features'

import { CreateSpecialityDto, UpdateSpecialityDto } from '@infra/dto'

export class SpecialityMapper {
	toCreateDto(form: ISpecialityFormDto): CreateSpecialityDto {
		return {
			name: form.name,
			description: form.description,
		}
	}

	toUpdateDto(form: ISpecialityFormDto): UpdateSpecialityDto {
		return {
			name: form.name,
			description: form.description,
		}
	}
}
