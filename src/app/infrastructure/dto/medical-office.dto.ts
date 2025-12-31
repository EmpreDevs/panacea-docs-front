import { MedicalOffice } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateMedicalOfficeDto = CreateDto<MedicalOffice>

export type UpdateMedicalOfficeDto = UpdateDto<MedicalOffice>
