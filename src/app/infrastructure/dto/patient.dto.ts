import { Patient } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreatePatientDto = CreateDto<Patient>

export type UpdatePatientDto = UpdateDto<Patient>
