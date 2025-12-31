import { IAppointmentFormDto } from '@app/interfaces/features'

import { CreateAppointmentDto, UpdateAppointmentDto } from '@infra/dto'

export class AppointmentMapper {
	toCreateDto(form: IAppointmentFormDto): CreateAppointmentDto {
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

	toUpdateDto(form: IAppointmentFormDto): UpdateAppointmentDto {
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
