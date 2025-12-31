import { BaseModel } from '../common/base.model'

export class User extends BaseModel {
	username!: string
	name!: string
	email!: string
	roleId!: string
	roleName!: string
	avatar?: string
	preferences?: any

	constructor(data: Partial<User>) {
		super(data)
		Object.assign(this, data)
	}
}
