import { BaseModel } from './common/base.model'

export interface Appointment extends BaseModel {
	startDate: Date
	endDate: Date
	estimation: number
	patientId: string
	healthProviderId: string
	tenantId: string
	title: string
	properties?: Record<string, any>
}
