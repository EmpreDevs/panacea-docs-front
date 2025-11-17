import { CrudRepository } from "@domain/repositories/common/crud.repository";

export abstract class FindById<T>{
  constructor(private _repository: CrudRepository<T>) {}
  execute(id: string) {
    return this._repository.findById(id)
  }
}