import { BaseModel } from "@domain/models/common/base.model";

/**
 * DTO para crear una entidad
 * Omite los campos del BaseModel (id, _syncPending, _deleted) que son generados automáticamente
 */
export type CreateDto<T extends BaseModel> = Omit<T, keyof BaseModel>;

/**
 * DTO para actualizar una entidad
 * Omite los campos del BaseModel y hace todos los campos opcionales
 */
export type UpdateDto<T extends BaseModel> = Partial<Omit<T, keyof BaseModel>>;
