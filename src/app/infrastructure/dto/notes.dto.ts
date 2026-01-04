import { Note } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateNotesDto = CreateDto<Note>

export type UpdateNotesDto = UpdateDto<Note>
