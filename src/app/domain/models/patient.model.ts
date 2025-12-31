import { DateTime } from 'luxon'

import { BaseModel } from './common/base.model'

export class Patient extends BaseModel {
	firstName!: string
	lastName!: string
	email?: string
	phone!: string
	address!: string
	dateBirth!: Date
	healthProviderId!: string
	gender!: string

	constructor(data: Partial<Patient>) {
		super(data)
		Object.assign(this, data)
	}

	get age(): number {
		return DateTime.now().diff(DateTime.fromJSDate(this.dateBirth), 'years').years
	}

	get fullName(): string {
		return `${this.firstName} ${this.lastName}`
	}
}
