import { IHealthProviderScheduleFormDto } from '@app/interfaces/features'

import { CreateHealthProviderScheduleDto, UpdateHealthProviderScheduleDto } from '@infra/dto'

export class HealthProviderScheduleMapper {
	toCreateDto(form: IHealthProviderScheduleFormDto): CreateHealthProviderScheduleDto {
		return {
			healthProviderId: form.healthProviderId,
			day: form.day,
			start: form.start,
			end: form.end,
		}
	}

	toUpdateDto(form: IHealthProviderScheduleFormDto): UpdateHealthProviderScheduleDto {
		return {
			healthProviderId: form.healthProviderId,
			day: form.day,
			start: form.start,
			end: form.end,
		}
	}
}
