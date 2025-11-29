import { Routes } from '@angular/router'
import { AuthPage } from './auth-page/auth-page'
import { LoginPage } from './login-page/login-page'
import { RegisterPage } from './register-page/register-page'
import { ValidateEmailPage } from './validate-email-page/validate-email-page'
import { ResetPasswordPage } from './reset-password-page/reset-password-page'
import { ForgotPasswordPage } from './forgot-password-page/forgot-password-page'

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
	},
]
