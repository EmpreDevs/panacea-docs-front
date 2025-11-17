import { BaseModel } from "./common/base.model";

export interface HealthProviderSchedule extends BaseModel {
  healthProviderId: string
  day: string
  start: string
  end: string
}