import { Component } from '@angular/core'
import { Register } from '@infra/features/auth'

@Component({
	selector: 'app-register-user-page',
	imports: [Register],
	templateUrl: './register-user-page.html',
	styles: ``,
})
export class RegisterUserPage {}
