import { Component, ElementRef, forwardRef, inject, Injector, Input, signal, ViewChild } from '@angular/core'
import { distinctUntilChanged, fromEvent, map, Subject, takeUntil } from 'rxjs'
import { InputType } from './input.type'
import { LucideIconData, LucideAngularModule, XIcon, CheckIcon, CircleAlertIcon } from 'lucide-angular'
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms'
import { NgClass } from '@angular/common'

@Component({
	selector: 'app-ui-input',
	imports: [LucideAngularModule, NgClass],
	templateUrl: './ui-input.html',
})
export class UiInput {
	private injector = inject(Injector)
	public ngControl: NgControl | null = null

	@ViewChild('UIInput') input!: ElementRef<HTMLInputElement>

	@Input() type: InputType = 'text'
	@Input({ required: true }) id = ''
	@Input({ required: true }) name = ''
	@Input() required = false
	@Input() autocomplete: 'on' | 'off' = 'off'
	@Input() placeholder = ''
	@Input() isDisabled = false
	@Input() readonly = false
	@Input() label = ''
	@Input() icon?: LucideIconData
	@Input() hint?: string
	@Input() returnDateObject = false // Si true, emite Date objects en lugar de strings para date/datetime-local/time

	public valueChanges = new Subject<string>()
	public destroy$ = new Subject<void>()

	touched = signal<boolean>(false)
	currentValue = signal<string>('')

	iconX = XIcon
	iconCheck = CheckIcon
	iconAlert = CircleAlertIcon

	ngOnInit(): void {
		// Obtener NgControl de forma diferida
		try {
			this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true })
			if (this.ngControl) {
				// Vincular este componente como valueAccessor
				this.ngControl.valueAccessor = this
			}
		} catch (e) {
			// NgControl no disponible
		}
	}

	ngAfterViewInit(): void {
		this.updateInputValue(this.currentValue())
		// Configura el observable de cambios
		this.setupValueChanges()
	}
	setupValueChanges(): void {
		fromEvent(this.input.nativeElement, 'input')
			.pipe(
				map((event: Event) => (event.target as HTMLInputElement).value),
				distinctUntilChanged(),
				takeUntil(this.destroy$),
			)
			.subscribe(value => {
				this.currentValue.set(value)
				this.valueChanges.next(value)

				// Convertir a Date si es necesario
				const parsedValue = this.parseOutputValue(value)
				this._onChange(parsedValue)
			})
	}
	private updateInputValue(value: any): void {
		if (this.input && this.input.nativeElement) {
			// Convertir Date a string si es necesario
			const stringValue = this.parseInputValue(value)
			this.input.nativeElement.value = stringValue
		}
	}

	/**
	 * Convierte el valor de entrada (puede ser Date o string) al formato correcto para el input HTML
	 */
	private parseInputValue(value: any): string {
		if (!value) return ''

		// Si es un Date object, convertir al formato correcto según el tipo
		if (value instanceof Date) {
			return this.formatDateForInput(value, this.type)
		}

		// Si ya es string, devolverlo tal cual
		return String(value)
	}

	/**
	 * Convierte el valor de salida (string del input) a Date si es necesario
	 */
	private parseOutputValue(value: string): any {
		if (!value || !this.returnDateObject) return value

		// Convertir a Date solo si el tipo es de fecha/hora
		if (this.isDateTimeType()) {
			return this.parseStringToDate(value, this.type)
		}

		return value
	}

	/**
	 * Verifica si el tipo de input es de fecha/hora
	 */
	private isDateTimeType(): boolean {
		return ['date', 'datetime-local', 'time', 'month', 'week'].includes(this.type)
	}

	/**
	 * Formatea un Date al formato correcto según el tipo de input
	 */
	private formatDateForInput(date: Date, type: InputType): string {
		if (!(date instanceof Date) || isNaN(date.getTime())) {
			return ''
		}

		switch (type) {
			case 'date':
				return this.formatDate(date)

			case 'datetime-local':
				return this.formatDateTime(date)

			case 'time':
				return this.formatTime(date)

			case 'month':
				return this.formatMonth(date)

			case 'week':
				return this.formatWeek(date)

			default:
				return date.toISOString()
		}
	}

	/**
	 * Parsea un string del input a Date según el tipo
	 */
	private parseStringToDate(value: string, type: InputType): Date | null {
		if (!value) return null

		try {
			switch (type) {
				case 'date':
					// value: "2025-12-18"
					return new Date(value + 'T00:00:00')

				case 'datetime-local':
					// value: "2025-12-18T10:30"
					return new Date(value)

				case 'time':
					// value: "10:30"
					const today = new Date()
					const [hours, minutes] = value.split(':')
					today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0)
					return today

				case 'month':
					// value: "2025-12"
					const [year, month] = value.split('-')
					return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1)

				case 'week':
					// value: "2025-W50" (ISO week format)
					const [weekYear, weekNum] = value.split('-W')
					return this.getDateFromWeek(parseInt(weekYear, 10), parseInt(weekNum, 10))

				default:
					return new Date(value)
			}
		} catch (error) {
			console.error('Error parsing date:', error)
			return null
		}
	}

	/**
	 * Formatea Date a YYYY-MM-DD
	 */
	private formatDate(date: Date): string {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	/**
	 * Formatea Date a YYYY-MM-DDTHH:mm
	 */
	private formatDateTime(date: Date): string {
		const datePart = this.formatDate(date)
		const timePart = this.formatTime(date)
		return `${datePart}T${timePart}`
	}

	/**
	 * Formatea Date a HH:mm
	 */
	private formatTime(date: Date): string {
		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')
		return `${hours}:${minutes}`
	}

	/**
	 * Formatea Date a YYYY-MM (month)
	 */
	private formatMonth(date: Date): string {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		return `${year}-${month}`
	}

	/**
	 * Formatea Date a YYYY-Www (week)
	 */
	private formatWeek(date: Date): string {
		const year = date.getFullYear()
		const week = this.getWeekNumber(date)
		return `${year}-W${String(week).padStart(2, '0')}`
	}

	/**
	 * Obtiene el número de semana ISO de una fecha
	 */
	private getWeekNumber(date: Date): number {
		const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
		const dayNum = d.getUTCDay() || 7
		d.setUTCDate(d.getUTCDate() + 4 - dayNum)
		const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
		return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
	}

	/**
	 * Obtiene una fecha desde el año y número de semana ISO
	 */
	private getDateFromWeek(year: number, week: number): Date {
		const simple = new Date(year, 0, 1 + (week - 1) * 7)
		const dow = simple.getDay()
		const ISOweekStart = simple
		if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
		else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
		return ISOweekStart
	}

	// Métodos para obtener estado de validación
	get isInvalid(): boolean {
		return !!(this.ngControl?.invalid && this.ngControl?.touched)
	}

	get isValid(): boolean {
		return !!(this.ngControl?.valid && this.ngControl?.touched && this.currentValue())
	}

	get errorMessage(): string | null {
		if (!this.ngControl?.errors || !this.ngControl?.touched) {
			return null
		}

		const errors = this.ngControl.errors

		// Mensajes personalizados según el tipo de error
		if (errors['required']) {
			return `${this.label || 'Este campo'} es requerido`
		}
		if (errors['email']) {
			return 'Ingresa un email válido'
		}
		if (errors['minlength']) {
			return `Mínimo ${errors['minlength'].requiredLength} caracteres`
		}
		if (errors['maxlength']) {
			return `Máximo ${errors['maxlength'].requiredLength} caracteres`
		}
		if (errors['pattern']) {
			return 'Formato inválido'
		}
		if (errors['min']) {
			return `El valor mínimo es ${errors['min'].min}`
		}
		if (errors['max']) {
			return `El valor máximo es ${errors['max'].max}`
		}

		// Error genérico para validaciones custom
		return 'Campo inválido'
	}

	//ControlValueAccessor
	_onChange: (value: string) => void = () => {}
	_onTouched: () => void = () => {}

	writeValue(value: any): void {
		// Convertir el valor al formato correcto
		const stringValue = this.parseInputValue(value)
		this.currentValue.set(stringValue)
		this.updateInputValue(value)
	}

	registerOnChange(fn: (value: string) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled
		if (this.input && this.input.nativeElement) {
			this.input.nativeElement.disabled = isDisabled
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
		this.valueChanges.complete()
		this.currentValue.set('')
	}
}
