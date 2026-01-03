import { PATIENT_PATHS } from '@infra/pages/private/patients'

export const APP_ROUTES = {
	auth: {
		root: 'auth',
		login: 'login',
		register: 'register',
	},
	patients: {
		root: PATIENT_PATHS.ROOT,
		details: PATIENT_PATHS.toDetail,
		create: PATIENT_PATHS.NEW,
		notes: PATIENT_PATHS.toNotes,
		notesNew: PATIENT_PATHS.toNotesNew,
		notesDetail: PATIENT_PATHS.toNotesDetail,
		appointments: PATIENT_PATHS.toAppointments,
		vitals: PATIENT_PATHS.toVitals,
	},
} as const
