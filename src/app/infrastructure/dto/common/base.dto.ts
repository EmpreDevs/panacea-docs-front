import { BaseModel } from '@domain/models/common/base.model'

type CalculateKeys = 'id' | '_syncPending' | '_deleted' | 'fullName' | 'age' | 'bodySurface'

export type CreateDto<T extends BaseModel> = Omit<T, CalculateKeys>

export type UpdateDto<T extends BaseModel> = Partial<Omit<T, CalculateKeys>>
