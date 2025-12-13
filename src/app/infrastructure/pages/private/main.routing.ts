import { Routes } from '@angular/router'
import { AppPage } from './app-page/app-page'
import { PatientsDetailPage, PatientsListPage } from './patients'
import { AppointmentsListPage, AppointmentsTodayListPage } from './appointments'
import { DashboardPage } from './dashboard-page/dashboard-page'
import { DoctorSchedulePage } from './doctor-schedule-page/doctor-schedule-page'
import { BlockAppointmentsPage } from './block-appointments-page/block-appointments-page'

export const authRoutes: Routes = [
	{
		path: '',
		component: AppPage,
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardPage },
			{
				path: 'patients',
				children: [
					{ path: '', component: PatientsListPage },
					{ path: ':id', component: PatientsDetailPage },
				],
			},
			{
				path: 'appointments',
				children: [
					{ path: '', component: AppointmentsListPage },
					{ path: 'today', component: AppointmentsTodayListPage },
				],
			},
			{ path: 'doctor-schedule', component: DoctorSchedulePage },
			{ path: 'block-appointments', component: BlockAppointmentsPage },
		],
	},
	{ path: 'settings', loadChildren: () => import('./settings-page/settings.routing').then(m => m.authRoutes) },
]
