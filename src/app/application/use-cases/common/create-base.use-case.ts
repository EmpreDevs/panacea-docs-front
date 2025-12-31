import { BaseModel } from '@domain/models/common/base.model'
import { CrudRepository } from '@domain/repositories/common/crud.repository'

import { CreateDto } from '@infra/dto'

export abstract class CreateUseCase<T extends BaseModel> {
	constructor(private _repository: CrudRepository<T>) {}

	execute(payload: CreateDto<T>): Promise<T> {
		return this._repository.create(payload)
	}
}
