import { BaseModel } from "./common/base.model";

export interface Schedule extends BaseModel {
  start: Date
  end: Date
  title: string
  healthProviderId: string
}