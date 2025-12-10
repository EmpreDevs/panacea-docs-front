import { Routes } from '@angular/router'
import { AuthPage } from './auth-page/auth-page'
import { LoginPage } from './auth-page/subpages/login-page/login-page'
import { RegisterPage } from './register-page/register-page'
import { ValidateEmailPage } from './auth-page/subpages/validate-email-page/validate-email-page'
import { ResetPasswordPage } from './auth-page/subpages/reset-password-page/reset-password-page'
import { ForgotPasswordPage } from './auth-page/subpages/forgot-password-page/forgot-password-page'
import { RegisterPlanSelectionPage } from './register-page/sub-pages/register-plan-selection-page/register-plan-selection-page'
import { RegisterTenantPage } from './register-page/sub-pages/register-tenant-page/register-tenant-page'
import { RegisterUserPage } from './register-page/sub-pages/register-user-page/register-user-page'

export const authRoutes: Routes = [
	{
		path: '',
		component: AuthPage,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full',
			},
			{
				path: 'login',
				component: LoginPage,
			},
			{
				path: 'validate-email',
				component: ValidateEmailPage,
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordPage,
			},
			{
				path: 'reset-password',
				component: ResetPasswordPage,
			},
		],
	},
	{
		path: 'register',
		component: RegisterPage,
		children: [
			{
				path: '',
				redirectTo: 'tenant',
				pathMatch: 'full',
			},
			{
				path: 'plan-selection',
				component: RegisterPlanSelectionPage,
			},
			{
				path: 'tenant',
				component: RegisterTenantPage,
			},
			{
				path: 'user',
				component: RegisterUserPage,
			},
		],
	},
]
