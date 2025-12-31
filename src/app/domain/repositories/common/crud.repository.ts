import { BaseModel } from '@domain/models/common/base.model'

import { CreateDto, UpdateDto } from '@infra/dto'

export interface CrudRepository<T extends BaseModel> {
	create(payload: CreateDto<T>): Promise<T>
	findById(id: string): Promise<T>
	findAll(filters: any): Promise<T[]>
	update(payload: UpdateDto<T>, id: string): Promise<T>
	delete(id: string): Promise<T>
}
