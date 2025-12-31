import { BaseModel } from './common/base.model'

export class HealthProvider extends BaseModel {
	firstName!: string
	lastName!: string
	email!: string
	phone!: string
	title!: string

	constructor(data: Partial<HealthProvider>) {
		super(data)
		Object.assign(this, data)
	}
}
