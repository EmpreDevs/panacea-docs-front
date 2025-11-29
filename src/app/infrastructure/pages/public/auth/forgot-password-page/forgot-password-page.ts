import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ForgotPassword } from '@infra/features/auth'

@Component({
	selector: 'app-forgot-password-page',
	imports: [RouterLink, ForgotPassword],
	templateUrl: './forgot-password-page.html',
})
export class ForgotPasswordPage {}
