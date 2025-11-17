import { BaseModel } from "./common/base.model";

export interface Notes extends BaseModel {
  date: Date
  observations: string
  content: string
  patientId: string
}