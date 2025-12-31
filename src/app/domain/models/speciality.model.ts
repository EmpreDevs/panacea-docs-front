import { BaseModel } from './common/base.model'

export class Speciality extends BaseModel {
	name!: string
	description!: string

	constructor(data: Partial<Speciality>) {
		super(data)
		Object.assign(this, data)
	}
}
