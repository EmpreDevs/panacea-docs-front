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
				this._onChange(value)
			})
	}
	private updateInputValue(value: any): void {
		if (this.input && this.input.nativeElement) {
			this.input.nativeElement.value = value
		}
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

	writeValue(value: string): void {
		this.currentValue.set(value)
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
