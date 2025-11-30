import { Component, computed, signal, effect, PLATFORM_ID, inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { LucideAngularModule, LucideIconData, MoonStarIcon, SunIcon } from 'lucide-angular'
import { ThemeService } from '@app/services'

@Component({
	selector: 'app-ui-darkmode',
	imports: [LucideAngularModule],
	templateUrl: './ui-darkmode.html',
})
export class UiDarkmode {
	private readonly themeService = inject(ThemeService)
	theme = signal<'light' | 'dark'>('light')
	icon = signal<LucideIconData>(SunIcon)

	constructor() {
		effect(() => {
			const currentTheme = this.themeService.getTheme()
			this.icon.set(currentTheme === 'light' ? MoonStarIcon : SunIcon)
		})
		effect(() => {
			this.theme.set(this.themeService.getTheme())
		})
	}

	toggleDarkMode(): void {
		this.themeService.toggleTheme()
	}
}
