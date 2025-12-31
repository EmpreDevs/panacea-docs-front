import { User } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateUserDto = CreateDto<User>

export type UpdateUserDto = UpdateDto<User>
