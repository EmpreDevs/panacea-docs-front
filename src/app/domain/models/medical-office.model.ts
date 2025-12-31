import { BaseModel } from './common/base.model'

export class MedicalOffice extends BaseModel {
	name!: string
	address!: string
	phone!: string

	constructor(data: Partial<MedicalOffice>) {
		super(data)
		Object.assign(this, data)
	}
}
