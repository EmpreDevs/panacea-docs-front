import { BaseModel } from '@domain/models/common/base.model'
import { CrudRepository } from '@domain/repositories/common/crud.repository'

import { UpdateDto } from '@infra/dto'

export abstract class UpdateUseCase<T extends BaseModel> {
	constructor(private _repository: CrudRepository<T>) {}
	execute(payload: UpdateDto<T>, id: string): Promise<T> {
		return this._repository.update(payload, id)
	}
}
