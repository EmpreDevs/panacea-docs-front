import { HealthProviderExceptionsFormDto } from '@app/interfaces/features'

import { CreateHealthProviderExceptionsDto, UpdateHealthProviderExceptionsDto } from '@infra/dto'

export class HealthProviderExceptionsMapper {
	static toCreateDto(form: HealthProviderExceptionsFormDto): CreateHealthProviderExceptionsDto {
		return {
			startDate: form.startDate,
			endDate: form.endDate,
			description: form.description,
			healthProviderId: form.healthProviderId,
		}
	}

	static toUpdateDto(form: HealthProviderExceptionsFormDto): UpdateHealthProviderExceptionsDto {
		return {
			startDate: form.startDate,
			endDate: form.endDate,
			description: form.description,
			healthProviderId: form.healthProviderId,
		}
	}
}
