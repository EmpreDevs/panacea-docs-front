export interface NotesResponseDto {
	id: string
	date: Date
	note_type: string
	content: string
	patientId: string
	appointmentId: string
}
