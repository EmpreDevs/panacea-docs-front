import { MedicalMetricsFormDto } from '@app/interfaces/features'

import { CreateMedicalMetricsDto, UpdateMedicalMetricsDto } from '@infra/dto'

export class MedicalMetricsMapper {
	static toCreateDto(form: MedicalMetricsFormDto): CreateMedicalMetricsDto {
		return {
			weight: form.weight,
			temperature: form.temperature,
			arterialPressure: form.arterialPressure,
			height: form.height,
			heartRate: form.heartRate,
			patientId: form.patientId,
		}
	}

	static toUpdateDto(form: MedicalMetricsFormDto): UpdateMedicalMetricsDto {
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
