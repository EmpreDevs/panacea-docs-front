import { Injectable, Renderer2, RendererFactory2 } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private renderer: Renderer2
	private readonly STORAGE_KEY = 'themeMode'

	constructor(rendererFactory: RendererFactory2) {
		this.renderer = rendererFactory.createRenderer(null, null)
		this.initializeTheme()
	}
	private initializeTheme(): void {
		// 1. Preferencia Guardada (Prioridad Máxima)
		const savedTheme = localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark' | null

		let initialTheme: 'light' | 'dark'

		if (savedTheme) {
			initialTheme = savedTheme
		} else {
			const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
			initialTheme = prefersDark ? 'dark' : 'light'
		}
		this.applyTheme(initialTheme)
	}

	private applyTheme(themeMode: 'light' | 'dark'): void {
		const htmlElement = this.renderer.selectRootElement('html', true)

		if (themeMode === 'dark') {
			this.renderer.addClass(htmlElement, 'dark')
		} else {
			this.renderer.removeClass(htmlElement, 'dark')
		}
	}

	public setTheme(themeMode: 'light' | 'dark'): void {
		this.applyTheme(themeMode)
		localStorage.setItem(this.STORAGE_KEY, themeMode)
	}

	public toggleTheme(): void {
		const currentTheme = this.getCurrentTheme()
		const newTheme = currentTheme === 'light' ? 'dark' : 'light'
		this.setTheme(newTheme)
	}

	public getCurrentTheme(): 'light' | 'dark' {
		const htmlElement = this.renderer.selectRootElement('html', true)
		return htmlElement.classList.contains('dark') ? 'dark' : 'light'
	}
}
