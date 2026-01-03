export const PATIENT_PATHS = {
	ROOT: 'patients',
	DETAIL_RAW: 'detail/:id',
	DETAIL_NOTES: 'notes',
	DETAIL_NOTES_NEW: 'notes/new',
	DETAIL_NOTES_DETAIL: 'notes/:noteId',
	DETAIL_APPOINTMENTS: 'appointments',
	DETAIL_VITALS: 'vitals',
	NEW: 'new',

	toDetail: (id: string) => `detail/${id}`,
	toNotes: (id: string) => `detail/${id}/notes`,
	toNotesNew: (id: string) => `detail/${id}/notes/new`,
	toNotesDetail: (id: string, noteId: string) => `detail/${id}/notes/${noteId}`,
	toAppointments: (id: string) => `detail/${id}/appointments`,
	toVitals: (id: string) => `detail/${id}/vitals`,
}
