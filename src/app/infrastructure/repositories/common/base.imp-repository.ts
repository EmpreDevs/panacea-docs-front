import { BaseModel } from "@domain/models/common/base.model";
import { CrudRepository } from "@domain/repositories/common/crud.repository";
import { BaseAdapter } from "@infra/adapters/common/base.adapter";

export abstract class BaseImpRepository<T extends BaseModel> implements CrudRepository<T> {
  constructor(private readonly _adapter: BaseAdapter<T>) {}

  create(payload: Partial<T>): Promise<T> {
    return this._adapter.create(payload)
  }
  findById(id: string): Promise<T> {
    return this._adapter.findById(id)
  }
  findAll(filters: any): Promise<T[]> {
    return this._adapter.findAll(filters)
  }
  update(payload: Partial<T>, id: string): Promise<T> {
    return this._adapter.update(payload, id)
  }
  delete(id: string): Promise<T> {
    return this._adapter.delete(id)
  }

}