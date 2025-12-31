import { ScheduleFormDto } from '@app/interfaces/features'

import { CreateScheduleDto, UpdateScheduleDto } from '@infra/dto'

export class ScheduleMapper {
	static toCreateDto(form: ScheduleFormDto): CreateScheduleDto {
		return {
			start: form.start,
			end: form.end,
			title: form.title,
			healthProviderId: form.healthProviderId,
		}
	}

	static toUpdateDto(form: ScheduleFormDto): UpdateScheduleDto {
		return {
			start: form.start,
			end: form.end,
			title: form.title,
			healthProviderId: form.healthProviderId,
		}
	}
}
