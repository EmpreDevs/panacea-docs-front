import { SubscriptionFormDto } from '@app/interfaces/features'

import { CreateSubscriptionDto, UpdateSubscriptionDto } from '@infra/dto'

export class SubscriptionMapper {
	static toCreateDto(form: SubscriptionFormDto): CreateSubscriptionDto {
		return {
			startDate: form.startDate,
			endDate: form.endDate,
			status: form.status,
			nextBillingDate: form.nextBillingDate,
			autoCharge: form.autoCharge,
			healthProviderId: form.healthProviderId,
			planId: form.planId,
			stripeSubscriptionId: form.stripeSubscriptionId,
		}
	}

	static toUpdateDto(form: SubscriptionFormDto): UpdateSubscriptionDto {
		return {
			startDate: form.startDate,
			endDate: form.endDate,
			status: form.status,
			nextBillingDate: form.nextBillingDate,
			autoCharge: form.autoCharge,
			healthProviderId: form.healthProviderId,
			planId: form.planId,
			stripeSubscriptionId: form.stripeSubscriptionId,
		}
	}
}
