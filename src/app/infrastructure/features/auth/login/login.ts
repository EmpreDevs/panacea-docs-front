import { Component, inject, input, output } from '@angular/core'
import { KeyRoundIcon, LogIn, LucideAngularModule, MailIcon } from 'lucide-angular'
import { UiButton, UiLink } from '@infra/ui/atoms'
import { UiInput } from '@infra/ui/molecules'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NotificacionLib } from '@infra/libraries'

@Component({
	selector: 'app-login',
	imports: [LucideAngularModule, UiInput, UiButton, UiLink, ReactiveFormsModule],
	templateUrl: './login.html',
	styles: ``,
})
export class Login {
	readonly fb = inject(FormBuilder)
	readonly notification = inject(NotificacionLib)

	loading = input<boolean>(false)
	formSubmited = output<FormGroup>()

	readonly MailIcon = MailIcon
	readonly KeyRoundIcon = KeyRoundIcon
	readonly LogIn = LogIn

	authForm: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	})

	Login() {
		if (this.authForm.valid) {
			this.formSubmited.emit(this.authForm)
		} else {
			this.authForm.markAllAsTouched()
		}
	}
}
