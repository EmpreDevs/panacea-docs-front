import { Auth } from '@domain/models'

import { AuthResponseDto } from './auth-response.dto'

export class AuthMapper {
	static toModel(data: AuthResponseDto): Auth {
		return new Auth({
			accessToken: data.accessToken,
			id: data.user.id,
			username: data.user.username,
			name: data.user.name,
			email: data.user.email,
			active: data.user.active,
			roleId: data.user.roleId,
			roleName: data.user.roleName,
		})
	}
}
