import { Component, inject } from '@angular/core'
import { INavItem } from '@app/interfaces'
import { MenuService } from '@app/services'
import { Logo, UiLink } from '@infra/ui/atoms'
import { LucideAngularModule, SettingsIcon } from 'lucide-angular'

@Component({
	selector: 'app-ly-aside',
	imports: [Logo, LucideAngularModule, UiLink],
	templateUrl: './ly-aside.html',
	styles: ``,
})
export class LyAside {
	private menuService = inject(MenuService)
	settingsIcon = SettingsIcon
	mainMenu: INavItem[] = []
	additionalMenu: INavItem[] = []

	ngOnInit(): void {
		this.mainMenu = this.menuService.baseMenuItems
		this.additionalMenu = this.menuService.secondaryMenuItems
	}
}
