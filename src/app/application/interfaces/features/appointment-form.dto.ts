export interface AppointmentFormDto {
	startDate: Date
	endDate: Date
	estimation: number
	patientId: string
	healthProviderId: string
	tenantId: string
	title: string
	properties?: Record<string, any>
}
