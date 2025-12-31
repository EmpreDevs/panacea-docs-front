import { IUserFormDto } from '@app/interfaces/features'

import { CreateUserDto, UpdateUserDto } from '@infra/dto'

export class UserMapper {
	toCreateDto(form: IUserFormDto): CreateUserDto {
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

	toUpdateDto(form: IUserFormDto): UpdateUserDto {
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
