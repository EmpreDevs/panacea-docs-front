import { Payment } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { PaymentResponseDto } from './payment-response.dto'

export class PaymentMapper implements IMapper<Payment, PaymentResponseDto> {
	toModel(data: PaymentResponseDto): Payment {
		return {
			id: data.id,
			healthProviderId: data.healthProviderId,
			amount: data.amount,
			stripeProductId: data.stripeProductId,
			stripeSubscriptionId: data.stripeSubscriptionId,
			stripeInvoiceId: data.stripeInvoiceId,
		}
	}

	toDto(data: Payment): PaymentResponseDto {
		return {
			id: data.id,
			healthProviderId: data.healthProviderId,
			amount: data.amount,
			stripeProductId: data.stripeProductId,
			stripeSubscriptionId: data.stripeSubscriptionId,
			stripeInvoiceId: data.stripeInvoiceId,
		}
	}
}
