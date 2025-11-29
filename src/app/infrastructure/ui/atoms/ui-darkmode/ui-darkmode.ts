import { Component, computed, signal, effect, PLATFORM_ID, inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { LucideAngularModule, MoonStarIcon, SunIcon } from 'lucide-angular'

@Component({
	selector: 'app-ui-darkmode',
	imports: [LucideAngularModule],
	templateUrl: './ui-darkmode.html',
})
export class UiDarkmode {
	private readonly storageKey = 'theme-preference'
	private readonly platformId = inject(PLATFORM_ID)

	// Signal reactivo para el tema
	theme = signal<'light' | 'dark'>('light')

	// Computed para el ícono basado en el tema
	icon = computed(() => (this.theme() === 'light' ? MoonStarIcon : SunIcon))

	constructor() {
		// Solo ejecutar en el navegador (SSR safe)
		if (isPlatformBrowser(this.platformId)) {
			this.initializeTheme()

			// Effect para aplicar cambios automáticamente cuando cambia el tema
			effect(() => {
				const currentTheme = this.theme()
				this.applyTheme(currentTheme)
			})
		}
	}

	private initializeTheme(): void {
		// Obtener tema guardado o usar preferencia del sistema
		const savedTheme = localStorage.getItem(this.storageKey) as 'light' | 'dark' | null
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')

		this.theme.set(initialTheme)
	}

	private applyTheme(theme: 'light' | 'dark'): void {
		const htmlElement = document.documentElement

		if (theme === 'dark') {
			htmlElement.classList.add('dark')
		} else {
			htmlElement.classList.remove('dark')
		}

		// Guardar preferencia
		localStorage.setItem(this.storageKey, theme)
	}

	toggleDarkMode(): void {
		const html = document.documentElement
		html.classList.toggle('dark')
		localStorage.setItem(this.storageKey, html.classList.contains('dark') ? 'dark' : 'light')
	}
}
