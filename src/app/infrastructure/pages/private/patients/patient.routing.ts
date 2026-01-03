import { Routes } from '@angular/router'

import { PatientCreatePage } from './patient-create-page/patient-create-page'
import { PATIENT_PATHS } from './patient-paths'
import { PatientsDetailPage } from './patients-detail-page/patients-detail-page'
import { patientsDetailRoutes } from './patients-detail-page/patients-detail.routing'
import { PatientsListPage } from './patients-list-page/patients-list-page'

export const patientsRoutes: Routes = [
	{
		path: '',
		data: {
			breadcrumb: 'Pacientes',
		},
		children: [
			{
				path: '',
				component: PatientsListPage,
			},
			{
				path: PATIENT_PATHS.DETAIL_RAW,
				component: PatientsDetailPage,
				data: {
					breadcrumb: 'Detalle',
				},
				children: patientsDetailRoutes,
			},
			{
				path: PATIENT_PATHS.NEW,
				component: PatientCreatePage,
				data: {
					breadcrumb: 'Nuevo',
				},
			},
		],
	},
]
