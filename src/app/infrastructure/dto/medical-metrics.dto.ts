import { MedicalMetrics } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateMedicalMetricsDto = CreateDto<MedicalMetrics>

export type UpdateMedicalMetricsDto = UpdateDto<MedicalMetrics>
