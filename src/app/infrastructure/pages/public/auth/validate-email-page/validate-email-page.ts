import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ValidateEmail } from '@infra/features/auth'

@Component({
	selector: 'app-validate-email-page',
	imports: [RouterLink, ValidateEmail],
	templateUrl: './validate-email-page.html',
})
export class ValidateEmailPage {}
