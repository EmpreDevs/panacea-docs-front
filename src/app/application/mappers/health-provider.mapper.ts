import { IHealthProviderFormDto } from '@app/interfaces/features'

import { CreateHealthProviderDto, UpdateHealthProviderDto } from '@infra/dto'

export class HealthProviderMapper {
	toCreateDto(form: IHealthProviderFormDto): CreateHealthProviderDto {
		return {
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			phone: form.phone,
			title: form.title,
		}
	}

	toUpdateDto(form: IHealthProviderFormDto): UpdateHealthProviderDto {
		return {
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			phone: form.phone,
			title: form.title,
		}
	}
}
