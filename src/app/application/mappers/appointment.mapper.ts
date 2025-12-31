import { AppointmentFormDto } from '@app/interfaces/features'

import { CreateAppointmentDto, UpdateAppointmentDto } from '@infra/dto'

export class AppointmentMapper {
	static toCreateDto(form: AppointmentFormDto): CreateAppointmentDto {
		return {
			startDate: form.startDate,
			endDate: form.endDate,
			estimation: form.estimation,
			patientId: form.patientId,
			healthProviderId: form.healthProviderId,
			tenantId: form.tenantId,
			title: form.title,
			properties: form.properties,
		}
	}

	static toUpdateDto(form: AppointmentFormDto): UpdateAppointmentDto {
		return {
			startDate: form.startDate,
			endDate: form.endDate,
			estimation: form.estimation,
			patientId: form.patientId,
			healthProviderId: form.healthProviderId,
			tenantId: form.tenantId,
			title: form.title,
			properties: form.properties,
		}
	}
}
