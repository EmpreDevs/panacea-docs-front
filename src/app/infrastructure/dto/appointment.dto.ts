import { Appointment } from '@domain/models'
import { CreateDto, UpdateDto } from './common'

export type CreateAppointmentDto = CreateDto<Appointment>
export type UpdateAppointmentDto = UpdateDto<Appointment>
