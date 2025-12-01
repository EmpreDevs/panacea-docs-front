import { Routes } from '@angular/router'
import { guestGuard, loguedGuard } from '@infra/guards'
import { AppPage } from '@infra/pages/private/app-page/app-page'

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
	{
		path: 'auth',
		loadChildren: () => import('./infrastructure/pages/public/auth/auth.routing').then(m => m.authRoutes),
		canActivate: [guestGuard],
	},
	{
		path: 'app',
		component: AppPage,
		canActivate: [loguedGuard],
	},
]
