import { CrudRepository } from "@domain/repositories/common/crud.repository";

export abstract class FindAllUseCase<T> {
  constructor(private _repository: CrudRepository<T>) {}
  execute(filters: any): Promise<T[]> {
    return this._repository.findAll(filters)
  }
}