import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Login } from '@infra/features/auth'

@Component({
	selector: 'app-login-page',
	imports: [RouterLink, Login],
	templateUrl: './login-page.html',
})
export class LoginPage {}
