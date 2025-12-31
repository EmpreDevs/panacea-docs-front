import { HealthProviderSchedule } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { HealthProviderScheduleResponseDto } from './health-provider-schedule-response.dto'

export class HealthProviderScheduleMapper implements IMapper<HealthProviderSchedule, HealthProviderScheduleResponseDto> {
	toModel(data: HealthProviderScheduleResponseDto): HealthProviderSchedule {
		return {
			id: data.id,
			healthProviderId: data.healthProviderId,
			day: data.day,
			start: data.start,
			end: data.end,
		}
	}

	toDto(data: HealthProviderSchedule): HealthProviderScheduleResponseDto {
		return {
			id: data.id,
			healthProviderId: data.healthProviderId,
			day: data.day,
			start: data.start,
			end: data.end,
		}
	}
}
