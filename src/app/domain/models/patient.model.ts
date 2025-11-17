import { BaseModel } from "./common/base.model";

export interface Patient extends BaseModel {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  dateBirth: Date
  healthProviderId: string
}