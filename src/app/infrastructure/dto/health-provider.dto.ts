import { HealthProvider } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateHealthProviderDto = CreateDto<HealthProvider>

export type UpdateHealthProviderDto = UpdateDto<HealthProvider>
