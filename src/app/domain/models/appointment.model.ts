import { BaseModel } from './common/base.model'

export class Appointment extends BaseModel {
	startDate!: Date
	endDate!: Date
	estimation!: number
	patientId!: string
	healthProviderId!: string
	tenantId!: string
	title!: string
	properties?: Record<string, any>

	constructor(data: Partial<Appointment>) {
		super(data)
		Object.assign(this, data)
	}
}
