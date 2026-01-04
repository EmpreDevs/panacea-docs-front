export const PATIENT_PATHS = {
	ROOT: 'patients',
	DETAIL_RAW: 'detail/:id',
	DETAIL_NOTES: 'notes',
	DETAIL_NOTES_NEW: 'note/new',
	DETAIL_NOTES_DETAIL: 'note/details/:noteId',
	DETAIL_APPOINTMENTS: 'appointments',
	DETAIL_APPOINTMENTS_DETAIL: 'appointments/:appointmentId',

	DETAIL_VITALS: 'vitals',
	NEW: 'new',

	toDetail: (id: string) => `detail/${id}`,
	toNotes: (id: string) => `detail/${id}/notes`,
	toNotesNew: (id: string, appointmentId: string) => `detail/${id}/appointments/${appointmentId}/note/new`,
	toNotesDetail: (id: string, appointmentId: string, noteId: string) =>
		`detail/${id}/appointments/${appointmentId}/note/details/${noteId}`,
	toAppointments: (id: string) => `detail/${id}/appointments`,
	toAppointmentsDetail: (id: string, appointmentId: string) => `detail/${id}/appointments/${appointmentId}`,
	toVitals: (id: string) => `detail/${id}/vitals`,
}
