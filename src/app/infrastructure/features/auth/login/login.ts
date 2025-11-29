import { Component } from '@angular/core'
import { KeyRoundIcon, LogIn, LucideAngularModule, MailIcon } from 'lucide-angular'
import { UiButton } from '@infra/ui/atoms'
import { UiInput } from '@infra/ui/molecules'
import { RouterLink } from '@angular/router'

@Component({
	selector: 'app-login',
	imports: [LucideAngularModule, UiInput, UiButton, RouterLink],
	templateUrl: './login.html',
	styles: ``,
})
export class Login {
	readonly MailIcon = MailIcon
	readonly KeyRoundIcon = KeyRoundIcon
	readonly LogIn = LogIn
}
