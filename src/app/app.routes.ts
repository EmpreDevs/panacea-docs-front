import { Routes } from '@angular/router'
import { AppPage } from '@infra/pages/private/app-page/app-page'

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth', // Ejemplo: Redirigir a la ruta de autenticación
		pathMatch: 'full',
	},
	{
		path: 'auth',
		loadChildren: () => import('./infrastructure/pages/public/auth/auth.routing').then(m => m.authRoutes),
	},
	{
		path: 'app',
		component: AppPage,
	},
]
