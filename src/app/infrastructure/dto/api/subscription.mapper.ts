import { Subscription } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { SubscriptionResponseDto } from './subscription-response.dto'

export class SubscriptionMapper implements IMapper<Subscription, SubscriptionResponseDto> {
	toModel(data: SubscriptionResponseDto): Subscription {
		return new Subscription({
			id: data.id,
			startDate: data.startDate,
			endDate: data.endDate,
			status: data.status,
			nextBillingDate: data.nextBillingDate,
			autoCharge: data.autoCharge,
			healthProviderId: data.healthProviderId,
			planId: data.planId,
			stripeSubscriptionId: data.stripeSubscriptionId,
		})
	}

	toDto(data: Subscription): SubscriptionResponseDto {
		return {
			id: data.id,
			startDate: data.startDate,
			endDate: data.endDate,
			status: data.status,
			nextBillingDate: data.nextBillingDate,
			autoCharge: data.autoCharge,
			healthProviderId: data.healthProviderId,
			planId: data.planId,
			stripeSubscriptionId: data.stripeSubscriptionId,
		}
	}
}
