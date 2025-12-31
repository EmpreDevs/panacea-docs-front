import { Appointment } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { AppointmentResponseDto } from './appointment-response.dto'

export class AppointmentMapper implements IMapper<Appointment, AppointmentResponseDto> {
	toModel(data: AppointmentResponseDto): Appointment {
		return {
			id: data.id,
			startDate: data.startDate,
			endDate: data.endDate,
			estimation: data.estimation,
			patientId: data.patientId,
			healthProviderId: data.healthProviderId,
			tenantId: data.tenantId,
			title: data.title,
			properties: data.properties,
		}
	}

	toDto(data: Appointment): AppointmentResponseDto {
		return {
			id: data.id,
			startDate: data.startDate,
			endDate: data.endDate,
			estimation: data.estimation,
			patientId: data.patientId,
			healthProviderId: data.healthProviderId,
			tenantId: data.tenantId,
			title: data.title,
			properties: data.properties,
		}
	}
}
