import { BaseModel } from './common/base.model'

export class HealthProviderSchedule extends BaseModel {
	healthProviderId!: string
	day!: string
	start!: string
	end!: string

	constructor(data: Partial<HealthProviderSchedule>) {
		super(data)
		Object.assign(this, data)
	}
}
