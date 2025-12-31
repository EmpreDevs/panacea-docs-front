import { IMedicalMetricsFormDto } from '@app/interfaces/features'

import { CreateMedicalMetricsDto, UpdateMedicalMetricsDto } from '@infra/dto'

export class MedicalMetricsMapper {
	toCreateDto(form: IMedicalMetricsFormDto): CreateMedicalMetricsDto {
		return {
			weight: form.weight,
			temperature: form.temperature,
			arterialPressure: form.arterialPressure,
			height: form.height,
			heartRate: form.heartRate,
			patientId: form.patientId,
		}
	}

	toUpdateDto(form: IMedicalMetricsFormDto): UpdateMedicalMetricsDto {
		return {
			weight: form.weight,
			temperature: form.temperature,
			arterialPressure: form.arterialPressure,
			height: form.height,
			heartRate: form.heartRate,
			patientId: form.patientId,
		}
	}
}
