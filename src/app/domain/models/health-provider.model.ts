import { BaseModel } from "./common/base.model";

export interface HealthProvider extends BaseModel {
  firstName: string
  lastName: string
  email: string
  phone: string
  title: string
}