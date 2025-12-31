import { BaseModel } from '@domain/models/common/base.model'
import { CrudRepository } from '@domain/repositories/common/crud.repository'

export abstract class DeleteUseCase<T extends BaseModel> {
	constructor(private _repository: CrudRepository<T>) {}
	execute(id: string): Promise<T> {
		return this._repository.delete(id)
	}
}
