import { Component } from '@angular/core'
import { ResetPassword } from '@infra/features/auth'

@Component({
	selector: 'app-reset-password-page',
	imports: [ResetPassword],
	templateUrl: './reset-password-page.html',
})
export class ResetPasswordPage {}
