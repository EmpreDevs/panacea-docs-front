import { Speciality } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { SpecialityResponseDto } from './speciality-response.dto'

export class SpecialityMapper implements IMapper<Speciality, SpecialityResponseDto> {
	toModel(data: SpecialityResponseDto): Speciality {
		return new Speciality({
			id: data.id,
			name: data.name,
			description: data.description,
		})
	}

	toDto(data: Speciality): SpecialityResponseDto {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
		}
	}
}
