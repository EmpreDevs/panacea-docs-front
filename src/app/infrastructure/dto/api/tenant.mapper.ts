import { Tenant } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { TenantResponseDto } from './tenant-response.dto'

export class TenantMapper implements IMapper<Tenant, TenantResponseDto> {
	toModel(data: TenantResponseDto): Tenant {
		return {
			id: data.id,
			type: data.type,
			phone: data.phone,
			billingName: data.billingName,
			billingRfc: data.billingRfc,
			billingAddress: data.billingAddress,
			billingPostalCode: data.billingPostalCode,
			billingCountry: data.billingCountry,
			email: data.email,
		}
	}

	toDto(data: Tenant): TenantResponseDto {
		return {
			id: data.id,
			type: data.type,
			phone: data.phone,
			billingName: data.billingName,
			billingRfc: data.billingRfc,
			billingAddress: data.billingAddress,
			billingPostalCode: data.billingPostalCode,
			billingCountry: data.billingCountry,
			email: data.email,
		}
	}
}
