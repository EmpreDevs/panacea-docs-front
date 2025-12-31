import { IScheduleFormDto } from '@app/interfaces/features'

import { CreateScheduleDto, UpdateScheduleDto } from '@infra/dto'

export class ScheduleMapper {
	toCreateDto(form: IScheduleFormDto): CreateScheduleDto {
		return {
			start: form.start,
			end: form.end,
			title: form.title,
			healthProviderId: form.healthProviderId,
		}
	}

	toUpdateDto(form: IScheduleFormDto): UpdateScheduleDto {
		return {
			start: form.start,
			end: form.end,
			title: form.title,
			healthProviderId: form.healthProviderId,
		}
	}
}
