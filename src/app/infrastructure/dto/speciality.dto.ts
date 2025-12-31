import { Speciality } from '@domain/models'

import { CreateDto, UpdateDto } from './common'

export type CreateSpecialityDto = CreateDto<Speciality>

export type UpdateSpecialityDto = UpdateDto<Speciality>
