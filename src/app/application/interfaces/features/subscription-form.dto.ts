export interface ISubscriptionFormDto {
	startDate: Date
	endDate: Date
	status: string
	nextBillingDate: Date
	autoCharge: boolean
	healthProviderId: string
	planId: string
	stripeSubscriptionId: string
}
