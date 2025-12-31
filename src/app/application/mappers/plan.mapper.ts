import { PlanFormDto } from '@app/interfaces/features'

import { CreatePlanDto, UpdatePlanDto } from '@infra/dto'

export class PlanMapper {
	static toCreateDto(form: PlanFormDto): CreatePlanDto {
		return {
			name: form.name,
			cost: form.cost,
			frequency: form.frequency,
			stripeProductId: form.stripeProductId,
		}
	}

	static toUpdateDto(form: PlanFormDto): UpdatePlanDto {
		return {
			name: form.name,
			cost: form.cost,
			frequency: form.frequency,
			stripeProductId: form.stripeProductId,
		}
	}
}
