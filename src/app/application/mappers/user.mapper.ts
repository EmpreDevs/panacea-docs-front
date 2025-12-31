import { UserFormDto } from '@app/interfaces/features'

import { CreateUserDto, UpdateUserDto } from '@infra/dto'

export class UserMapper {
	static toCreateDto(form: UserFormDto): CreateUserDto {
		return {
			username: form.username,
			name: form.name,
			email: form.email,
			roleId: form.roleId,
			roleName: form.roleName,
			avatar: form.avatar,
			preferences: form.preferences,
		}
	}

	static toUpdateDto(form: UserFormDto): UpdateUserDto {
		return {
			username: form.username,
			name: form.name,
			email: form.email,
			roleId: form.roleId,
			roleName: form.roleName,
			avatar: form.avatar,
			preferences: form.preferences,
		}
	}
}
