import { BaseModel } from './common/base.model'

export class Subscription extends BaseModel {
	startDate!: Date
	endDate!: Date
	status!: string
	nextBillingDate!: Date
	autoCharge!: boolean
	healthProviderId!: string
	planId!: string
	stripeSubscriptionId!: string

	constructor(data: Partial<Subscription>) {
		super(data)
		Object.assign(this, data)
	}
}
