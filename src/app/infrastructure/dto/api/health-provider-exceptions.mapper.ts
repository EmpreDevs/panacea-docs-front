import { HealthProviderExceptions } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { HealthProviderExceptionsResponseDto } from './health-provider-exceptions-response.dto'

export class HealthProviderExceptionsMapper implements IMapper<HealthProviderExceptions, HealthProviderExceptionsResponseDto> {
	toModel(data: HealthProviderExceptionsResponseDto): HealthProviderExceptions {
		return {
			id: data.id,
			startDate: data.startDate,
			endDate: data.endDate,
			description: data.description,
			healthProviderId: data.healthProviderId,
		}
	}

	toDto(data: HealthProviderExceptions): HealthProviderExceptionsResponseDto {
		return {
			id: data.id,
			startDate: data.startDate,
			endDate: data.endDate,
			description: data.description,
			healthProviderId: data.healthProviderId,
		}
	}
}
