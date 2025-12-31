import { IPaymentFormDto } from '@app/interfaces/features'

import { CreatePaymentDto, UpdatePaymentDto } from '@infra/dto'

export class PaymentMapper {
	toCreateDto(form: IPaymentFormDto): CreatePaymentDto {
		return {
			healthProviderId: form.healthProviderId,
			amount: form.amount,
			stripeProductId: form.stripeProductId,
			stripeSubscriptionId: form.stripeSubscriptionId,
			stripeInvoiceId: form.stripeInvoiceId,
		}
	}

	toUpdateDto(form: IPaymentFormDto): UpdatePaymentDto {
		return {
			healthProviderId: form.healthProviderId,
			amount: form.amount,
			stripeProductId: form.stripeProductId,
			stripeSubscriptionId: form.stripeSubscriptionId,
			stripeInvoiceId: form.stripeInvoiceId,
		}
	}
}
