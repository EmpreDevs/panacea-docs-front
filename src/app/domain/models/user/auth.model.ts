import { User } from './user.model'

export interface Auth {
	accessToken: string
	user: User
}
