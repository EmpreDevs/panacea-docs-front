export interface AppointmentResponseDto {
	id: string
	startDate: Date
	endDate: Date
	estimation: number
	patientId: string
	healthProviderId: string
	tenantId: string
	title: string
	properties?: Record<string, any>
}
