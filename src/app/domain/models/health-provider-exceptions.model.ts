import { BaseModel } from "./common/base.model";

export interface HealthProviderExceptions extends BaseModel {
  startDate: Date
  endDate: Date
  description: string
  healthProviderId: string
}