import { Routes } from '@angular/router'

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
]
