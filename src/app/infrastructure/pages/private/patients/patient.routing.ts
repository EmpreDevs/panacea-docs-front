import { Routes } from '@angular/router'

import { PatientCreatePage } from './patient-create-page/patient-create-page'
import { PatientsDetailPage } from './patients-detail-page/patients-detail-page'
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
				path: 'detail/:id',
				component: PatientsDetailPage,
				data: {
					breadcrumb: 'Detalle',
				},
			},
			{
				path: 'new',
				component: PatientCreatePage,
				data: {
					breadcrumb: 'Nuevo',
				},
			},
		],
	},
]
