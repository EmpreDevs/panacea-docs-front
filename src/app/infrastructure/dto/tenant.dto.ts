import { Tenant } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateTenantDto = CreateDto<Tenant>

export type UpdateTenantDto = UpdateDto<Tenant>
