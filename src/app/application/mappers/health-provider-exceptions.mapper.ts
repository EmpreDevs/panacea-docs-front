import { IHealthProviderExceptionsFormDto } from '@app/interfaces/features'

import { CreateHealthProviderExceptionsDto, UpdateHealthProviderExceptionsDto } from '@infra/dto'

export class HealthProviderExceptionsMapper {
	toCreateDto(form: IHealthProviderExceptionsFormDto): CreateHealthProviderExceptionsDto {
		return {
			startDate: form.startDate,
			endDate: form.endDate,
			description: form.description,
			healthProviderId: form.healthProviderId,
		}
	}

	toUpdateDto(form: IHealthProviderExceptionsFormDto): UpdateHealthProviderExceptionsDto {
		return {
			startDate: form.startDate,
			endDate: form.endDate,
			description: form.description,
			healthProviderId: form.healthProviderId,
		}
	}
}
