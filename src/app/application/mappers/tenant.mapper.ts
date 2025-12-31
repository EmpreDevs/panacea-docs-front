import { ITenantFormDto } from '@app/interfaces/features'

import { CreateTenantDto, UpdateTenantDto } from '@infra/dto'

export class TenantMapper {
	toCreateDto(form: ITenantFormDto): CreateTenantDto {
		return {
			type: form.type,
			phone: form.phone,
			billingName: form.billingName,
			billingRfc: form.billingRfc,
			billingAddress: form.billingAddress,
			billingPostalCode: form.billingPostalCode,
			billingCountry: form.billingCountry,
			email: form.email,
		}
	}

	toUpdateDto(form: ITenantFormDto): UpdateTenantDto {
		return {
			type: form.type,
			phone: form.phone,
			billingName: form.billingName,
			billingRfc: form.billingRfc,
			billingAddress: form.billingAddress,
			billingPostalCode: form.billingPostalCode,
			billingCountry: form.billingCountry,
			email: form.email,
		}
	}
}
