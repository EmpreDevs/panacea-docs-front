import { HealthProviderFormDto } from '@app/interfaces/features'

import { CreateHealthProviderDto, UpdateHealthProviderDto } from '@infra/dto'

export class HealthProviderMapper {
	static toCreateDto(form: HealthProviderFormDto): CreateHealthProviderDto {
		return {
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			phone: form.phone,
			title: form.title,
		}
	}

	static toUpdateDto(form: HealthProviderFormDto): UpdateHealthProviderDto {
		return {
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			phone: form.phone,
			title: form.title,
		}
	}
}
