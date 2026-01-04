import { NgClass, NgStyle } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'

import {
	SkeletonOptions,
	SkeletonRow,
	SkeletonType,
	defaultSkeletonOptions,
	skeletonPresets,
} from './skeleton.interface'

@Component({
	selector: 'app-ui-skeleton',
	imports: [NgClass, NgStyle],
	templateUrl: './ui-skeleton.html',
})
export class UiSkeleton implements OnInit {
	/**
	 * Tipo de skeleton (usado cuando no se especifica preset o customRows)
	 */
	@Input() type: SkeletonType = 'text'

	/**
	 * Número de filas
	 */
	@Input() rows: number = 3

	/**
	 * Número de columnas por fila
	 */
	@Input() columns: number = 1

	/**
	 * Altura de cada elemento
	 */
	@Input() height?: string

	/**
	 * Ancho del skeleton
	 */
	@Input() width?: string

	/**
	 * Espacio entre filas
	 */
	@Input() rowGap?: string

	/**
	 * Espacio entre columnas
	 */
	@Input() columnGap?: string

	/**
	 * Configuración personalizada de filas
	 */
	@Input() customRows?: SkeletonRow[]

	/**
	 * Si debe mostrar animación
	 */
	@Input() animate: boolean = true

	/**
	 * Border radius
	 */
	@Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md'

	/**
	 * Clase CSS adicional
	 */
	@Input() className?: string

	/**
	 * Preset predefinido (card, avatar, list, table, form, article, comment)
	 */
	@Input() preset?: keyof typeof skeletonPresets

	/**
	 * Opciones completas (sobrescribe todos los inputs individuales)
	 */
	@Input() options?: Partial<SkeletonOptions>

	// Configuración procesada
	config: SkeletonOptions = defaultSkeletonOptions

	// Array de filas para el template
	rowsArray: SkeletonRow[] = []

	ngOnInit(): void {
		this.buildConfiguration()
		this.generateRows()
	}

	/**
	 * Construye la configuración final del skeleton
	 */
	private buildConfiguration(): void {
		let baseConfig: Partial<SkeletonOptions> = { ...defaultSkeletonOptions }

		// 1. Aplicar preset si existe
		if (this.preset && skeletonPresets[this.preset]) {
			baseConfig = { ...baseConfig, ...skeletonPresets[this.preset] }
		}

		// 2. Aplicar opciones del objeto options
		if (this.options) {
			baseConfig = { ...baseConfig, ...this.options }
		}

		// 3. Aplicar inputs individuales (tienen mayor prioridad)
		this.config = {
			...baseConfig,
			type: this.type || baseConfig.type || 'text',
			rows: this.rows || baseConfig.rows || 3,
			columns: this.columns || baseConfig.columns || 1,
			height: this.height || baseConfig.height,
			width: this.width || baseConfig.width,
			rowGap: this.rowGap || baseConfig.rowGap,
			columnGap: this.columnGap || baseConfig.columnGap,
			customRows: this.customRows || baseConfig.customRows,
			animate: this.animate !== undefined ? this.animate : baseConfig.animate || true,
			rounded: this.rounded || baseConfig.rounded || 'md',
			className: this.className || baseConfig.className || '',
		}
	}

	/**
	 * Genera el array de filas según la configuración
	 */
	private generateRows(): void {
		// Si hay customRows, usarlas
		if (this.config.customRows && this.config.customRows.length > 0) {
			// Repetir las customRows según el número de rows especificado
			const rowsToRepeat = this.config.rows || 1
			this.rowsArray = []

			for (let i = 0; i < rowsToRepeat; i++) {
				this.rowsArray.push(...this.config.customRows)
			}
		} else {
			// Generar filas simples
			this.rowsArray = Array.from({ length: this.config.rows || 3 }, () => ({
				type: this.config.type,
				columns: this.config.columns,
				height: this.config.height,
				width: this.config.width,
				gap: this.config.columnGap,
			}))
		}
	}

	/**
	 * Obtiene las clases CSS para el contenedor de una fila
	 */
	getRowClasses(row: SkeletonRow): string {
		const classes: string[] = ['skeleton-row']

		// Grid si tiene columnas
		if (row.columns && row.columns > 1) {
			classes.push('grid')
			classes.push(`grid-cols-${Math.min(row.columns, 12)}`)
		}

		return classes.join(' ')
	}

	/**
	 * Obtiene los estilos CSS para el contenedor de una fila
	 */
	getRowStyles(row: SkeletonRow): Record<string, string> {
		const styles: Record<string, string> = {}

		if (row.gap) {
			styles['gap'] = row.gap
		}

		return styles
	}

	/**
	 * Obtiene las clases CSS para un elemento skeleton individual
	 */
	getSkeletonClasses(row: SkeletonRow): string {
		const classes: string[] = ['skeleton-item']

		// Tipo de skeleton
		const skeletonType = row.type || this.config.type || 'text'
		classes.push(`skeleton-${skeletonType}`)

		// Animación
		if (this.config.animate) {
			classes.push('skeleton-animate')
		}

		// Rounded
		const roundedClass = this.getRoundedClass(skeletonType)
		if (roundedClass) {
			classes.push(roundedClass)
		}

		return classes.join(' ')
	}

	/**
	 * Obtiene la clase de border radius según el tipo
	 */
	private getRoundedClass(type: SkeletonType): string {
		if (type === 'circle' || type === 'avatar') {
			return 'rounded-full'
		}

		const roundedMap = {
			none: '',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
			full: 'rounded-full',
		}

		return roundedMap[this.config.rounded || 'md']
	}

	/**
	 * Obtiene los estilos CSS para un elemento skeleton individual
	 */
	getSkeletonStyles(row: SkeletonRow): Record<string, string> {
		const styles: Record<string, string> = {}
		const skeletonType = row.type || this.config.type || 'text'

		// Altura
		const height = row.height || this.config.height
		if (height) {
			styles['height'] = height
		}

		// Ancho
		const width = row.width || (row.fullWidth ? '100%' : this.config.width)
		if (width) {
			styles['width'] = width
		}

		// Para círculos y avatares, asegurar aspect ratio 1:1
		if (skeletonType === 'circle' || skeletonType === 'avatar') {
			if (height && !width) {
				styles['width'] = height
			} else if (width && !height) {
				styles['height'] = width
			}
		}

		return styles
	}

	/**
	 * Genera un array para iterar en las columnas
	 */
	getColumnsArray(row: SkeletonRow): number[] {
		const columns = row.columns || 1
		return Array.from({ length: columns }, (_, i) => i)
	}

	/**
	 * Obtiene las clases del contenedor principal
	 */
	getContainerClasses(): string {
		const classes: string[] = ['skeleton-container']

		if (this.config.className) {
			classes.push(this.config.className)
		}

		return classes.join(' ')
	}

	/**
	 * Obtiene los estilos del contenedor principal
	 */
	getContainerStyles(): Record<string, string> {
		const styles: Record<string, string> = {}

		if (this.config.rowGap) {
			styles['gap'] = this.config.rowGap
		}

		return styles
	}
}
