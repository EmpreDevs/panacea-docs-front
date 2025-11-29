import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { CheckIcon, LoaderCircleIcon, LucideAngularModule, ServerCrashIcon } from 'lucide-angular'

type VerificationStatus = 'verifying' | 'verified' | 'unverifiable'

@Component({
	selector: 'app-validate-email',
	imports: [LucideAngularModule, RouterLink],
	templateUrl: './validate-email.html',
	styles: ``,
})
export class ValidateEmail {
	public status: VerificationStatus = 'verifying'
	loader = LoaderCircleIcon
	statusIcon = signal(CheckIcon)

	ngOnInit(): void {
		this.simulateVerificationProcess()
	}

	simulateVerificationProcess(): void {
		setTimeout(() => {
			this.success()
		}, 3000) // 3000ms = 3 segundos
	}
	error() {
		this.statusIcon.set(ServerCrashIcon)
		this.status = 'unverifiable'
	}
	success() {
		this.statusIcon.set(CheckIcon)
		this.status = 'verified'
	}
}
