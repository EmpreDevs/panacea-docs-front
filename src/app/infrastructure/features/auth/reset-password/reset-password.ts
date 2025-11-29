import { Component, signal, computed } from '@angular/core'
import { UiButton } from '@infra/ui/atoms'
import { UiInput } from '@infra/ui/molecules'
import { KeyRoundIcon, LogIn, MailIcon, CheckCircle2Icon, XCircleIcon, LoaderCircleIcon } from 'lucide-angular'
import { LucideAngularModule } from 'lucide-angular'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

type ValidationStatus = 'idle' | 'validating' | 'valid' | 'invalid'

@Component({
	selector: 'app-reset-password',
	imports: [UiInput, UiButton, LucideAngularModule, CommonModule, ReactiveFormsModule],
	templateUrl: './reset-password.html',
	styles: ``,
})
export class ResetPassword {
	readonly MailIcon = MailIcon
	readonly KeyRoundIcon = KeyRoundIcon
	readonly LogIn = LogIn
}
