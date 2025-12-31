import { PaymentFormDto } from '@app/interfaces/features'

import { CreatePaymentDto, UpdatePaymentDto } from '@infra/dto'

export class PaymentMapper {
	static toCreateDto(form: PaymentFormDto): CreatePaymentDto {
		return {
			healthProviderId: form.healthProviderId,
			amount: form.amount,
			stripeProductId: form.stripeProductId,
			stripeSubscriptionId: form.stripeSubscriptionId,
			stripeInvoiceId: form.stripeInvoiceId,
		}
	}

	static toUpdateDto(form: PaymentFormDto): UpdatePaymentDto {
		return {
			healthProviderId: form.healthProviderId,
			amount: form.amount,
			stripeProductId: form.stripeProductId,
			stripeSubscriptionId: form.stripeSubscriptionId,
			stripeInvoiceId: form.stripeInvoiceId,
		}
	}
}
