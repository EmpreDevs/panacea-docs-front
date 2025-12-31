export abstract class BaseModel {
	id!: string
	_syncPending?: boolean
	_deleted?: boolean

	constructor(data?: Partial<BaseModel>) {
		Object.assign(this, data)
	}
}
