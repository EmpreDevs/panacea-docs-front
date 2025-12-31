import { Plan } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { PlanResponseDto } from './plan-response.dto'

export class PlanMapper implements IMapper<Plan, PlanResponseDto> {
	toModel(data: PlanResponseDto): Plan {
		return {
			id: data.id,
			name: data.name,
			cost: data.cost,
			frequency: data.frequency,
			stripeProductId: data.stripeProductId,
		}
	}

	toDto(data: Plan): PlanResponseDto {
		return {
			id: data.id,
			name: data.name,
			cost: data.cost,
			frequency: data.frequency,
			stripeProductId: data.stripeProductId,
		}
	}
}
