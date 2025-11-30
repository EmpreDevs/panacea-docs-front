import { Component } from '@angular/core'
import { ForgotPassword } from '@infra/features/auth'
import { UiLink } from '@infra/ui/atoms'

@Component({
	selector: 'app-forgot-password-page',
	imports: [ForgotPassword, UiLink],
	templateUrl: './forgot-password-page.html',
})
export class ForgotPasswordPage {}
