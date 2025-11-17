import { BaseModel } from "./common/base.model";

export interface Plan extends BaseModel {
  name: string
  cost: number
  frequency: string
  stripeProductId: string
}