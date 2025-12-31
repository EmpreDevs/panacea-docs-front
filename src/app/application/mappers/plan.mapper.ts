import { IPlanFormDto } from '@app/interfaces/features'

import { CreatePlanDto, UpdatePlanDto } from '@infra/dto'

export class PlanMapper {
	toCreateDto(form: IPlanFormDto): CreatePlanDto {
		return {
			name: form.name,
			cost: form.cost,
			frequency: form.frequency,
			stripeProductId: form.stripeProductId,
		}
	}

	toUpdateDto(form: IPlanFormDto): UpdatePlanDto {
		return {
			name: form.name,
			cost: form.cost,
			frequency: form.frequency,
			stripeProductId: form.stripeProductId,
		}
	}
}
