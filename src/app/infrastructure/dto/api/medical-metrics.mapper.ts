import { MedicalMetrics } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { MedicalMetricsResponseDto } from './medical-metrics-response.dto'

export class MedicalMetricsMapper implements IMapper<MedicalMetrics, MedicalMetricsResponseDto> {
	toModel(data: MedicalMetricsResponseDto): MedicalMetrics {
		return {
			id: data.id,
			weight: data.weight,
			temperature: data.temperature,
			arterialPressure: data.arterialPressure,
			height: data.height,
			heartRate: data.heartRate,
			patientId: data.patientId,
		}
	}

	toDto(data: MedicalMetrics): MedicalMetricsResponseDto {
		return {
			id: data.id,
			weight: data.weight,
			temperature: data.temperature,
			arterialPressure: data.arterialPressure,
			height: data.height,
			heartRate: data.heartRate,
			patientId: data.patientId,
		}
	}
}
