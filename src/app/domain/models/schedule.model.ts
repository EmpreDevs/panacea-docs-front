import { BaseModel } from './common/base.model'

export class Schedule extends BaseModel {
	start!: Date
	end!: Date
	title!: string
	healthProviderId!: string

	constructor(data: Partial<Schedule>) {
		super(data)
		Object.assign(this, data)
	}
}
