import { BaseModel } from "./common/base.model";

export interface Payment extends BaseModel {
  healthProviderId: string
  amount: number
  stripeProductId: string
  stripeSubscriptionId: string
  stripeInvoiceId: string
}