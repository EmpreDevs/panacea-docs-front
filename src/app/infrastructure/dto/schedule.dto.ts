import { Schedule } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateScheduleDto = CreateDto<Schedule>

export type UpdateScheduleDto = UpdateDto<Schedule>
