import { Component } from '@angular/core'
import { KeyRoundIcon, LogIn, LucideAngularModule, MailIcon } from 'lucide-angular'
import { UiButton } from '@infra/ui/atoms'
import { UiInput } from '@infra/ui/molecules'
import { RouterLink } from '@angular/router'

@Component({
	selector: 'app-forgot-password',
	imports: [UiInput, UiButton, LucideAngularModule, RouterLink],
	templateUrl: './forgot-password.html',
	styles: ``,
})
export class ForgotPassword {
	readonly MailIcon = MailIcon
	readonly KeyRoundIcon = KeyRoundIcon
	readonly LogIn = LogIn
}
