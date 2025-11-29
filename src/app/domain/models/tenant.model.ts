import { BaseModel } from "./common/base.model";

export interface Tenant extends BaseModel {
  type: string
  phone: string
  billingName: string
  billingRfc: string
  billingAddress: string
  billingPostalCode: string
  billingCountry: string
  email: string
}
