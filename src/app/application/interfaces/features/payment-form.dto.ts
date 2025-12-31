export interface IPaymentFormDto {
	healthProviderId: string
	amount: number
	stripeProductId: string
	stripeSubscriptionId: string
	stripeInvoiceId: string
}
