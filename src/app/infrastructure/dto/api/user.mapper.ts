import { User } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { UserResponseDto } from './user-response.dto'

export class UserMapper implements IMapper<User, UserResponseDto> {
	toModel(data: UserResponseDto): User {
		return new User({
			id: data.id,
			username: data.username,
			name: data.name,
			email: data.email,
			roleId: data.roleId,
			roleName: data.roleName,
			avatar: data.avatar,
			preferences: data.preferences,
		})
	}

	toDto(data: User): UserResponseDto {
		return {
			id: data.id,
			username: data.username,
			name: data.name,
			email: data.email,
			roleId: data.roleId,
			roleName: data.roleName,
			avatar: data.avatar,
			preferences: data.preferences,
		}
	}
}
