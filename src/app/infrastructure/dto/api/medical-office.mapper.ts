import { MedicalOffice } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { MedicalOfficeResponseDto } from './medical-office-response.dto'

export class MedicalOfficeMapper implements IMapper<MedicalOffice, MedicalOfficeResponseDto> {
	toModel(data: MedicalOfficeResponseDto): MedicalOffice {
		return {
			id: data.id,
			name: data.name,
			address: data.address,
			phone: data.phone,
		}
	}

	toDto(data: MedicalOffice): MedicalOfficeResponseDto {
		return {
			id: data.id,
			name: data.name,
			address: data.address,
			phone: data.phone,
		}
	}
}
