import { Plan } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreatePlanDto = CreateDto<Plan>

export type UpdatePlanDto = UpdateDto<Plan>
