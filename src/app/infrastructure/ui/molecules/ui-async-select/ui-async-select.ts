import { CommonModule } from '@angular/common'
import { Component, ElementRef, effect, input, output, signal, viewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { UiIcon } from '@infra/ui/atoms'

export interface AsyncSelectItem {
	[key: string]: any
}

/**
 * Función para formatear cómo se muestra cada item
 */
export type DisplayFormatter<T = AsyncSelectItem> = (item: T) => string

@Component({
	selector: 'app-ui-async-select',
	imports: [CommonModule, FormsModule, UiIcon],
	templateUrl: './ui-async-select.html',
	styles: ``,
})
export class UiAsyncSelect {
	// ViewChild para el input
	searchInput = viewChild<ElementRef>('searchInput')

	// Inputs
	items = input<AsyncSelectItem[]>([])
	loading = input<boolean>(false)
	placeholder = input<string>('Buscar...')

	// Display options - tres formas de configurar cómo mostrar los items
	displayKey = input<string>('name') // Opción 1: Una sola propiedad (simple)
	displayKeys = input<string[]>([]) // Opción 2: Múltiples propiedades ['firstName', 'lastName']
	displaySeparator = input<string>(' ') // Separador para displayKeys (ej: ' ', ', ', ' - ')
	displayFormatter = input<DisplayFormatter | null>(null) // Opción 3: Función personalizada

	valueKey = input<string>('id') // Propiedad del valor
	disabled = input<boolean>(false)
	clearable = input<boolean>(true)
	selectedValue = input<any>(null)
	emptyMessage = input<string>('No se encontraron resultados')
	minChars = input<number>(2) // Mínimo de caracteres para buscar
	debounceTime = input<number>(300) // Tiempo de debounce en ms

	// Outputs
	search = output<string>()
	select = output<any>()
	clear = output<void>()

	// Estado interno
	isOpen = signal<boolean>(false)
	searchTerm = signal<string>('')
	selectedItem = signal<AsyncSelectItem | null>(null)
	highlightedIndex = signal<number>(-1)

	private debounceTimer: any

	constructor() {
		// Effect para sincronizar el valor seleccionado externo
		effect(() => {
			const value = this.selectedValue()
			const items = this.items()

			if (value && items.length > 0) {
				const found = items.find(item => item[this.valueKey()] === value)
				if (found) {
					this.selectedItem.set(found)
					this.searchTerm.set(this.getDisplayValue(found))
				}
			} else if (value === null) {
				this.selectedItem.set(null)
				//this.searchTerm.set('')
			}
		})

		// Effect para abrir el dropdown cuando llegan items de la API
		effect(() => {
			const items = this.items()
			const term = this.searchTerm()
			const loading = this.loading()
			const hasSelection = this.selectedItem()

			// Abrir dropdown si:
			// - Hay items disponibles
			// - El término de búsqueda cumple con minChars
			// - No está cargando
			// - No hay un item seleccionado (para evitar abrir al hacer click)
			if (items.length > 0 && term.length >= this.minChars() && !loading && !hasSelection) {
				this.isOpen.set(true)
			}

			// Si no hay items y no está cargando, mostrar mensaje vacío
			if (items.length === 0 && !loading && term.length >= this.minChars() && !hasSelection) {
				this.isOpen.set(true)
			}
		})
	}

	onSearchChange(event: Event): void {
		const value = (event.target as HTMLInputElement).value

		this.searchTerm.set(value)

		// Limpiar timer anterior
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer)
		}

		// Si hay un item seleccionado y se borra el texto, limpiar selección
		if (!value && this.selectedItem()) {
			this.selectedItem.set(null)
			this.clear.emit()
		}

		// Cerrar dropdown si no cumple con minChars
		if (value.length < this.minChars()) {
			this.isOpen.set(false)
		}

		// Debounce de la búsqueda
		if (value.length >= this.minChars()) {
			this.debounceTimer = setTimeout(() => {
				this.search.emit(value)
				// El dropdown se abrirá automáticamente cuando items cambie (via effect)
			}, this.debounceTime())
		}
	}

	onInputFocus(): void {
		const term = this.searchTerm()
		if (term.length >= this.minChars() && this.items().length > 0) {
			this.isOpen.set(true)
		}
	}

	onInputClick(): void {
		// Si hay un item seleccionado, limpiar para permitir nueva búsqueda
		if (this.selectedItem()) {
			this.searchTerm.set('')
			this.selectedItem.set(null)
			this.search.emit('')
		}
		this.searchInput()?.nativeElement.focus()
	}

	selectItem(item: AsyncSelectItem): void {
		this.selectedItem.set(item)
		this.searchTerm.set(this.getDisplayValue(item))
		this.isOpen.set(false)
		this.select.emit(item[this.valueKey()])
	}

	clearSelection(): void {
		this.selectedItem.set(null)
		this.searchTerm.set('')
		this.isOpen.set(false)
		this.clear.emit()
		this.searchInput()?.nativeElement.focus()
	}

	closeDropdown(): void {
		setTimeout(() => {
			this.isOpen.set(false)
			this.highlightedIndex.set(-1)
		}, 200)
	}

	// Navegación con teclado
	onKeyDown(event: KeyboardEvent): void {
		const items = this.items()
		const isOpenValue = this.isOpen()

		if (!isOpenValue || items.length === 0) {
			return
		}

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault()
				this.highlightedIndex.update(val => (val < items.length - 1 ? val + 1 : val))
				break

			case 'ArrowUp':
				event.preventDefault()
				this.highlightedIndex.update(val => (val > 0 ? val - 1 : 0))
				break

			case 'Enter':
				event.preventDefault()
				const index = this.highlightedIndex()
				if (index >= 0 && index < items.length) {
					this.selectItem(items[index])
				}
				break

			case 'Escape':
				event.preventDefault()
				this.isOpen.set(false)
				this.highlightedIndex.set(-1)
				break
		}
	}

	/**
	 * Obtiene el valor a mostrar del item
	 * Soporta tres modos:
	 * 1. displayFormatter: función personalizada (máxima flexibilidad)
	 * 2. displayKeys: múltiples propiedades unidas por separator
	 * 3. displayKey: una sola propiedad (default)
	 */
	getDisplayValue(item: AsyncSelectItem): string {
		// Opción 1: Formatter personalizado (máxima prioridad)
		const formatter = this.displayFormatter()
		if (formatter) {
			return formatter(item)
		}

		// Opción 2: Múltiples keys
		const keys = this.displayKeys()
		if (keys && keys.length > 0) {
			const separator = this.displaySeparator()
			return keys
				.map(key => item[key])
				.filter(val => val !== null && val !== undefined && val !== '')
				.join(separator)
		}

		// Opción 3: Single key (default)
		return item[this.displayKey()] || ''
	}

	trackByFn(index: number, item: AsyncSelectItem): any {
		return item[this.valueKey()] || index
	}

	toggleDropdown(): void {
		this.isOpen.update(val => !val)
	}
}
