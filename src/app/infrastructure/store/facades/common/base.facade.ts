import { Injectable, Signal } from '@angular/core'

import { CreateUseCase, DeleteUseCase, FindAllUseCase, FindByIdUseCase, UpdateUseCase } from '@app/use-cases'

import { BaseModel } from '@domain/models/common/base.model'

import { CreateDto, UpdateDto } from '@infra/dto'
import { BaseState } from '@infra/store/states/common/base.state'

export interface FacadeError {
	message: string
	code?: string
	details?: any
}

@Injectable()
export abstract class BaseFacade<T extends BaseModel> {
	get item$(): Signal<T | null> {
		return this._state.item
	}

	get items$(): Signal<T[]> {
		return this._state.items
	}

	get loading$(): Signal<boolean> {
		return this._state.loading
	}

	get error$(): Signal<string | null> {
		return this._state.error
	}

	get success$(): Signal<boolean> {
		return this._state.success
	}

	get isEmpty$(): Signal<boolean> {
		return this._state.isEmpty
	}

	get itemCount$(): Signal<number> {
		return this._state.itemCount
	}

	get hasError$(): Signal<boolean> {
		return this._state.hasError
	}

	get isReady$(): Signal<boolean> {
		return this._state.isReady
	}

	constructor(
		private readonly _create: CreateUseCase<T>,
		private readonly _findOne: FindByIdUseCase<T>,
		private readonly _findAll: FindAllUseCase<T>,
		private readonly _update: UpdateUseCase<T>,
		private readonly _deleteUseCase: DeleteUseCase<T>,
		private readonly _state: BaseState<T>,
	) {}

	async create(payload: CreateDto<T>): Promise<T> {
		this._state.setLoading(true)
		const result = await this._create.execute(payload)
		this._state.setLoading(false)
		return result
	}

	async findOne(id: string): Promise<T> {
		this._state.setLoading(true)
		const result = await this._findOne.execute(id)
		this._state.setLoading(false)
		return result
	}

	async findAll(filters: any): Promise<T[]> {
		this._state.setLoading(true)
		const result = await this._findAll.execute(filters)
		this._state.setLoading(false)
		return result
	}

	async update(payload: UpdateDto<T>, id: string): Promise<T> {
		this._state.setLoading(true)
		const result = await this._update.execute(payload, id)
		this._state.setLoading(false)
		return result
	}

	async delete(id: string): Promise<T> {
		this._state.setLoading(true)
		const result = await this._deleteUseCase.execute(id)
		this._state.setLoading(false)
		return result
	}
}
