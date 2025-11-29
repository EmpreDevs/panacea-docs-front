import { Injectable, Renderer2, RendererFactory2 } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private renderer: Renderer2
	private readonly STORAGE_KEY = 'themeMode'

	constructor(rendererFactory: RendererFactory2) {
		this.renderer = rendererFactory.createRenderer(null, null)
		this.initializeTheme() // Llamada al método inicial
	}

	/**
	 * 🌙 Inicializa el tema:
	 * 1. Prioriza la preferencia guardada en localStorage.
	 * 2. Si no hay preferencia guardada, usa la configuración del sistema.
	 * 3. Por defecto es 'light'.
	 */
	private initializeTheme(): void {
		// 1. Preferencia Guardada (Prioridad Máxima)
		const savedTheme = localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark' | null

		let initialTheme: 'light' | 'dark'

		if (savedTheme) {
			initialTheme = savedTheme
		} else {
			// 2. Preferencia del Sistema (si no hay nada guardado)
			const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
			initialTheme = prefersDark ? 'dark' : 'light'
		}

		// 3. Aplica el tema.
		// **Importante:** Al inicio, no guardamos la preferencia del sistema en localStorage
		// automáticamente, solo la aplicamos. Se guardará solo cuando el usuario use el switch.
		this.applyTheme(initialTheme)
	}

	// ... (El resto del código del servicio es similar, con un pequeño ajuste)

	/**
	 * 💡 Aplica el tema al <html> sin guardar en localStorage.
	 * Útil para la inicialización.
	 * @param themeMode 'light' o 'dark'
	 */
	private applyTheme(themeMode: 'light' | 'dark'): void {
		const htmlElement = this.renderer.selectRootElement('html', true)

		if (themeMode === 'dark') {
			this.renderer.addClass(htmlElement, 'dark')
		} else {
			this.renderer.removeClass(htmlElement, 'dark')
		}
	}

	/**
	 * 💡 Establece el tema y lo aplica al <html> Y lo guarda.
	 * @param themeMode 'light' o 'dark'
	 */
	public setTheme(themeMode: 'light' | 'dark'): void {
		this.applyTheme(themeMode) // Aplica la clase
		// Guardar la preferencia
		localStorage.setItem(this.STORAGE_KEY, themeMode)
	}

	/**
	 * 🔄 Cambia el tema entre 'light' y 'dark' (Este método llama a setTheme, que guarda)
	 */
	public toggleTheme(): void {
		const currentTheme = this.getCurrentTheme()
		const newTheme = currentTheme === 'light' ? 'dark' : 'light'
		this.setTheme(newTheme)
	}

	/**
	 * 🔎 Devuelve el tema actual basándose en la clase en <html>
	 */
	public getCurrentTheme(): 'light' | 'dark' {
		const htmlElement = this.renderer.selectRootElement('html', true)
		return htmlElement.classList.contains('dark') ? 'dark' : 'light'
	}
}
