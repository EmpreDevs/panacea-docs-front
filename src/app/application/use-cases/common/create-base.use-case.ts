import { CrudRepository } from "@domain/repositories/common/crud.repository";

export abstract class CreateUseCase<T> {
  constructor(private _repository: CrudRepository<T>){}

  execute(payload: Partial<T>): Promise<T> {
    return this._repository.create(payload)
  }
}