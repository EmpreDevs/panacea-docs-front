import { Subscription } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateSubscriptionDto = CreateDto<Subscription>

export type UpdateSubscriptionDto = UpdateDto<Subscription>
