import { BaseModel } from './common/base.model'

export class Notes extends BaseModel {
	date!: Date
	observations!: string
	content!: string
	patientId!: string

	constructor(data: Partial<Notes>) {
		super(data)
		Object.assign(this, data)
	}
}
