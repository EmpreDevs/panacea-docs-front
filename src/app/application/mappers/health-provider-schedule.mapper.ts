import { HealthProviderScheduleFormDto } from '@app/interfaces/features'

import { CreateHealthProviderScheduleDto, UpdateHealthProviderScheduleDto } from '@infra/dto'

export class HealthProviderScheduleMapper {
	static toCreateDto(form: HealthProviderScheduleFormDto): CreateHealthProviderScheduleDto {
		return {
			healthProviderId: form.healthProviderId,
			day: form.day,
			start: form.start,
			end: form.end,
		}
	}

	static toUpdateDto(form: HealthProviderScheduleFormDto): UpdateHealthProviderScheduleDto {
		return {
			healthProviderId: form.healthProviderId,
			day: form.day,
			start: form.start,
			end: form.end,
		}
	}
}
