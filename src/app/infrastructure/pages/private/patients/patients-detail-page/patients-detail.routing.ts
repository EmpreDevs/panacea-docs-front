import { Routes } from '@angular/router'

import { PATIENT_PATHS } from '../patient-paths'
import { PatientAppointmentsDetailPage } from './pages/patient-appointments-detail-page/patient-appointments-detail-page'
import { PatientAppointmentsListPage } from './pages/patient-appointments-list-page/patient-appointments-list-page'
import { PatientNoteCreatePage } from './pages/patient-note-create-page/patient-note-create-page'
import { PatientNoteDetailPage } from './pages/patient-note-detail-page/patient-note-detail-page'
import { PatientNoteListPage } from './pages/patient-note-list-page/patient-note-list-page'
import { PatientVitalsListPage } from './pages/patient-vitals-list-page/patient-vitals-list-page'

export const patientsDetailRoutes: Routes = [
	{
		path: '',
		redirectTo: PATIENT_PATHS.DETAIL_VITALS,
		pathMatch: 'full',
	},
	{
		path: PATIENT_PATHS.DETAIL_NOTES,
		component: PatientNoteListPage,
	},
	{
		path: PATIENT_PATHS.DETAIL_VITALS,
		component: PatientVitalsListPage,
	},
	{
		path: PATIENT_PATHS.DETAIL_APPOINTMENTS,
		component: PatientAppointmentsListPage,
	},
	{
		path: PATIENT_PATHS.DETAIL_APPOINTMENTS_DETAIL,
		component: PatientAppointmentsDetailPage,
		children: [
			{
				path: PATIENT_PATHS.DETAIL_NOTES_NEW,
				component: PatientNoteCreatePage,
			},
			{
				path: PATIENT_PATHS.DETAIL_NOTES_DETAIL,
				component: PatientNoteDetailPage,
			},
		],
	},
]
