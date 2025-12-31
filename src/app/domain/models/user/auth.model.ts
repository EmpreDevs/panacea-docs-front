import { User } from './user.model'

export class Auth {
	accessToken!: string
	user!: User

	constructor(data: Partial<Auth>) {
		Object.assign(this, data)
	}
}
