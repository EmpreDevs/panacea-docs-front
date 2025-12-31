import { ISubscriptionFormDto } from '@app/interfaces/features'

import { CreateSubscriptionDto, UpdateSubscriptionDto } from '@infra/dto'

export class SubscriptionMapper {
	toCreateDto(form: ISubscriptionFormDto): CreateSubscriptionDto {
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

	toUpdateDto(form: ISubscriptionFormDto): UpdateSubscriptionDto {
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
