import { Auth } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { AuthResponseDto } from './auth-response.dto'
import { UserMapper } from './user.mapper'

export class AuthMapper implements IMapper<Auth, AuthResponseDto> {
	private userMapper = new UserMapper()

	toModel(data: AuthResponseDto): Auth {
		return {
			accessToken: data.accessToken,
			user: this.userMapper.toModel(data.user),
		}
	}

	toDto(data: Auth): AuthResponseDto {
		return {
			accessToken: data.accessToken,
			user: this.userMapper.toDto(data.user),
		}
	}
}
