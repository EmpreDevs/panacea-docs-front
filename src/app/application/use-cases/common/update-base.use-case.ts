import { CrudRepository } from "@domain/repositories/common/crud.repository";

export abstract class UpdateUseCase<T> {
  constructor(private _repository: CrudRepository<T>) {}
  execute(payload: Partial<T>, id: string): Promise<T> {
    return this._repository.update(payload, id)
  }
}