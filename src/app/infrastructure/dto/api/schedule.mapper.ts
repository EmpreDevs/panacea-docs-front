import { Schedule } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { ScheduleResponseDto } from './schedule-response.dto'

export class ScheduleMapper implements IMapper<Schedule, ScheduleResponseDto> {
	toModel(data: ScheduleResponseDto): Schedule {
		return {
			id: data.id,
			start: data.start,
			end: data.end,
			title: data.title,
			healthProviderId: data.healthProviderId,
		}
	}

	toDto(data: Schedule): ScheduleResponseDto {
		return {
			id: data.id,
			start: data.start,
			end: data.end,
			title: data.title,
			healthProviderId: data.healthProviderId,
		}
	}
}
