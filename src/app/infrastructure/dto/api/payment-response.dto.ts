export interface PaymentResponseDto {
	id: string
	healthProviderId: string
	amount: number
	stripeProductId: string
	stripeSubscriptionId: string
	stripeInvoiceId: string
}
