import { Component } from '@angular/core'
import { UiLayoutApp } from '@infra/ui/layouts'
import { RouterOutlet } from '@angular/router'
import { INavItem } from '@app/interfaces'
import {
	SettingsIcon,
	FingerprintPatternIcon,
	BoxIcon,
	CreditCardIcon,
	UsersIcon,
	LucideAngularModule,
	ShieldUserIcon,
} from 'lucide-angular'
import { UiLink } from '@infra/ui/atoms'

@Component({
	selector: 'app-settings-page',
	imports: [UiLayoutApp, RouterOutlet, LucideAngularModule, UiLink],
	templateUrl: './settings-page.html',
	styles: ``,
})
export class SettingsPage {
	navItems: INavItem[] = [
		{
			name: 'General',
			view: 'medical-office',
			icon: SettingsIcon,
		},
		{
			name: 'Perfil',
			view: 'profile',
			icon: FingerprintPatternIcon,
		},
		{
			name: 'Plan',
			view: 'plan',
			icon: BoxIcon,
		},
		{
			name: 'Facturación',
			view: 'tenant',
			icon: ShieldUserIcon,
		},
		{
			name: 'Pagos',
			view: 'billing',
			icon: CreditCardIcon,
		},
		{
			name: 'Usuarios',
			view: 'users',
			icon: UsersIcon,
		},
	]
}
