import { BaseModel } from '@domain/models/common/base.model'
import { CrudRepository } from '@domain/repositories/common/crud.repository'

export abstract class FindByIdUseCase<T extends BaseModel> {
	constructor(private _repository: CrudRepository<T>) {}
	execute(id: string) {
		return this._repository.findById(id)
	}
}
