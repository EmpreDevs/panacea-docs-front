import { Component } from '@angular/core'
import { Login } from '@infra/features/auth'
import { UiLink } from '@infra/ui/atoms'

@Component({
	selector: 'app-login-page',
	imports: [Login, UiLink],
	templateUrl: './login-page.html',
})
export class LoginPage {}
