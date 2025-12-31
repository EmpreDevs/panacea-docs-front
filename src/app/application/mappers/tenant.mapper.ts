import { TenantFormDto } from '@app/interfaces/features'

import { CreateTenantDto, UpdateTenantDto } from '@infra/dto'

export class TenantMapper {
	static toCreateDto(form: TenantFormDto): CreateTenantDto {
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

	static toUpdateDto(form: TenantFormDto): UpdateTenantDto {
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
