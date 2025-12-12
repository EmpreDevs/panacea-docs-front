import { Routes } from '@angular/router'
import { SettingsPage } from './settings-page'
import { TenantDetailPage } from './pages/tenant-detail-page/tenant-detail-page'
import { AccountDetailPage } from './pages/account-detail-page/account-detail-page'
import { UsersDetailPage } from './pages/users-detail-page/users-detail-page'
import { BillingDetailPage } from './pages/billing-detail-page/billing-detail-page'
import { PlanDetailPage } from './pages/plan-detail-page/plan-detail-page'
import { MedicalOfficeDetailPage } from './pages/medical-office-detail-page/medical-office-detail-page'

export const authRoutes: Routes = [
	{
		path: '',
		component: SettingsPage,
		data: {
			breadcrumb: 'Settings',
		},
		children: [
			{ path: '', redirectTo: 'tenant-detail', pathMatch: 'full' },
			{ path: 'tenant', component: TenantDetailPage },
			{ path: 'profile', component: AccountDetailPage },
			{ path: 'users', component: UsersDetailPage },
			{ path: 'billing', component: BillingDetailPage },
			{ path: 'plan', component: PlanDetailPage },
			{ path: 'medical-office', component: MedicalOfficeDetailPage },
		],
	},
]
