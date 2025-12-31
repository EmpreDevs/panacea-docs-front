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
	},
} as const
