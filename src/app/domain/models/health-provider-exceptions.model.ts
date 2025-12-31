import { BaseModel } from './common/base.model'

export class HealthProviderExceptions extends BaseModel {
	startDate!: Date
	endDate!: Date
	description!: string
	healthProviderId!: string

	constructor(data: Partial<HealthProviderExceptions>) {
		super(data)
		Object.assign(this, data)
	}
}
