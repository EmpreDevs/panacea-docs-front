import { Routes } from '@angular/router'

export const authRoutes: Routes = [
	{ path: 'settings', loadChildren: () => import('./settings-page/settings.routing').then(m => m.authRoutes) },
]
