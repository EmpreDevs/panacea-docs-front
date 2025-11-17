import { BaseModel } from "./common/base.model";

export interface MedicalMetrics extends BaseModel {
  weight: number
  temperature: number
  arterialPressure: string
  height: number
  heartRate: number
  patientId: string
}