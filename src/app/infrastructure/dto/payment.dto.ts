import { Payment } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreatePaymentDto = CreateDto<Payment>

export type UpdatePaymentDto = UpdateDto<Payment>
