import { BaseModel } from "./common/base.model";

export interface MedicalOffice extends BaseModel {
  name: string
  address: string
  phone: string
}