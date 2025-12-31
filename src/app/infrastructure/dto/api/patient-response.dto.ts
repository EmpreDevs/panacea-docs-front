export interface PatientResponseDto {
	id: string
	firstName: string
	lastName: string
	email?: string
	phone: string
	address: string
	dateBirth: Date
	healthProviderId: string
	gender: string
}
