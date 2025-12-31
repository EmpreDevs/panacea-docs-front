import { Notes } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateNotesDto = CreateDto<Notes>

export type UpdateNotesDto = UpdateDto<Notes>
