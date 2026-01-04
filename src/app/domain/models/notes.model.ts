import { BaseModel } from './common/base.model'

export class Note extends BaseModel {
	date!: Date
	type!: string
	content!: string
	patientId!: string
	appointmentId!: string

	constructor(data: Partial<Note>) {
		super(data)
		Object.assign(this, data)
	}
}
