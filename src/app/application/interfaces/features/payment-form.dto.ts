export interface PaymentFormDto {
	healthProviderId: string
	amount: number
	stripeProductId: string
	stripeSubscriptionId: string
	stripeInvoiceId: string
}
