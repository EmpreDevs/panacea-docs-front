import { BaseModel } from './common/base.model'

export class Payment extends BaseModel {
	healthProviderId!: string
	amount!: number
	stripeProductId!: string
	stripeSubscriptionId!: string
	stripeInvoiceId!: string

	constructor(data: Partial<Payment>) {
		super(data)
		Object.assign(this, data)
	}
}
