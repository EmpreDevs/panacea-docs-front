import { Routes } from '@angular/router'

import { AccountDetailPage } from './pages/account-detail-page/account-detail-page'
import { BillingDetailPage } from './pages/billing-detail-page/billing-detail-page'
import { MedicalOfficeDetailPage } from './pages/medical-office-detail-page/medical-office-detail-page'
import { PlanDetailPage } from './pages/plan-detail-page/plan-detail-page'
import { TenantDetailPage } from './pages/tenant-detail-page/tenant-detail-page'
import { UsersDetailPage } from './pages/users-detail-page/users-detail-page'
import { SettingsPage } from './settings-page'

export const settingsRoutes: Routes = [
	{
		path: '',
		component: SettingsPage,
		data: {
			breadcrumb: 'Settings',
		},
		children: [
			{ path: '', redirectTo: 'medical-office', pathMatch: 'full' },
			{ path: 'tenant', component: TenantDetailPage },
			{ path: 'profile', component: AccountDetailPage },
			{ path: 'users', component: UsersDetailPage },
			{ path: 'billing', component: BillingDetailPage },
			{ path: 'plan', component: PlanDetailPage },
			{ path: 'medical-office', component: MedicalOfficeDetailPage },
		],
	},
]
