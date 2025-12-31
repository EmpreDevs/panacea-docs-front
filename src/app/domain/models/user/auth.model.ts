export class Auth {
	accessToken!: string
	id!: string
	username!: string
	name!: string
	email!: string
	active!: boolean
	roleId!: string
	roleName!: string

	constructor(data: Partial<Auth>) {
		Object.assign(this, data)
	}
}
