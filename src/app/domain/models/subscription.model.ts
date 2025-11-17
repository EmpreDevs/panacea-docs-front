import { BaseModel } from "./common/base.model";

export interface Subscription extends BaseModel {
  startDate: Date
  endDate: Date
  status: string
  nextBillingDate: Date
  autoCharge: boolean
  healthProviderId: string
  planId: string
  stripeSubscriptionId: string
}