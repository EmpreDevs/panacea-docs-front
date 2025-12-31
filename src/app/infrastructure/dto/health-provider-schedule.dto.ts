import { HealthProviderSchedule } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateHealthProviderScheduleDto = CreateDto<HealthProviderSchedule>

export type UpdateHealthProviderScheduleDto = UpdateDto<HealthProviderSchedule>
