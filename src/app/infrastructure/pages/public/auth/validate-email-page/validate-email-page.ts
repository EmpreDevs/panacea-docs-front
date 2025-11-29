import { Component } from '@angular/core'
import { ValidateEmail } from '@infra/features/auth'

@Component({
	selector: 'app-validate-email-page',
	imports: [ValidateEmail],
	templateUrl: './validate-email-page.html',
})
export class ValidateEmailPage {}
