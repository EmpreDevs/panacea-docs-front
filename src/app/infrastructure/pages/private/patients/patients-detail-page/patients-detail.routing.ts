import { Routes } from '@angular/router'

import { PatientCreatePage } from '../patient-create-page/patient-create-page'
import { PATIENT_PATHS } from '../patient-paths'
import { PatientAppointmentsListPage } from './pages/patient-appointments-list-page/patient-appointments-list-page'
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
		children: [
			{
				path: '',
				component: PatientNoteListPage,
			},
			{
				path: PATIENT_PATHS.DETAIL_NOTES_NEW,
				component: PatientCreatePage,
			},
			{
				path: PATIENT_PATHS.DETAIL_NOTES_DETAIL,
				component: PatientNoteDetailPage,
			},
		],
	},
	{
		path: PATIENT_PATHS.DETAIL_VITALS,
		component: PatientVitalsListPage,
	},
	{
		path: PATIENT_PATHS.DETAIL_APPOINTMENTS,
		component: PatientAppointmentsListPage,
	},
]
