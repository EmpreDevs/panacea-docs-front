import { Component } from '@angular/core'
import { Logo, UiDarkmode, UiCard } from '@infra/ui/atoms'
import { LucideAngularModule, FingerprintPatternIcon, ShieldCheckIcon } from 'lucide-angular'
import { RouterOutlet } from '@angular/router'

@Component({
	selector: 'app-auth-page',
	imports: [Logo, RouterOutlet, LucideAngularModule, UiDarkmode, UiCard],
	templateUrl: './auth-page.html',
})
export class AuthPage {
	fingerprint = FingerprintPatternIcon
	shieldCheck = ShieldCheckIcon
}
