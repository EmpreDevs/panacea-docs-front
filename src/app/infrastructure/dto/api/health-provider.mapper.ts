import { HealthProvider } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { HealthProviderResponseDto } from './health-provider-response.dto'

export class HealthProviderMapper implements IMapper<HealthProvider, HealthProviderResponseDto> {
	toModel(data: HealthProviderResponseDto): HealthProvider {
		return new HealthProvider({
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			title: data.title,
		})
	}

	toDto(data: HealthProvider): HealthProviderResponseDto {
		return {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			title: data.title,
		}
	}
}
