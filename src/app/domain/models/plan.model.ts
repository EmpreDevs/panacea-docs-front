import { BaseModel } from './common/base.model'

export class Plan extends BaseModel {
	name!: string
	cost!: number
	frequency!: string
	stripeProductId!: string

	constructor(data: Partial<Plan>) {
		super(data)
		Object.assign(this, data)
	}
}
