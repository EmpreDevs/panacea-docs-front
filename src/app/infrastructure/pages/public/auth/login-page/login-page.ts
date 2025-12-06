import { Component, inject } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { Login } from '@infra/features/auth'
import { NotificacionLib } from '@infra/libraries'
import { AuthFacade } from '@infra/store/facades'
import { UiLink } from '@infra/ui/atoms'

@Component({
	selector: 'app-login-page',
	imports: [Login, UiLink],
	templateUrl: './login-page.html',
})
export class LoginPage {
	readonly router = inject(Router)
	authFacade = inject(AuthFacade)
	$loading = this.authFacade.loading()
	$error = this.authFacade.errors()
	notifications = inject(NotificacionLib)

	async Login(form: FormGroup) {
		const { email, password } = form.value
		const isAuthenticated = await this.authFacade.login(email, password)
		console.log(isAuthenticated)

		if (isAuthenticated) {
			this.notifications.success('Bienvenido')
			this.router.navigate(['/app'])
		}
	}
}
