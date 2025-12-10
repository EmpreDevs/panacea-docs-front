import { BaseModel } from '../common/base.model'

export interface User extends BaseModel {
	username: string
	name: string
	email: string
	roleId: string
	roleName: string
	avatar?: string
	preferences?: any
}
