import { BaseModel } from './common/base.model'

export class Tenant extends BaseModel {
	type!: string
	phone!: string
	billingName!: string
	billingRfc!: string
	billingAddress!: string
	billingPostalCode!: string
	billingCountry!: string
	email!: string

	constructor(data: Partial<Tenant>) {
		super(data)
		Object.assign(this, data)
	}
}
