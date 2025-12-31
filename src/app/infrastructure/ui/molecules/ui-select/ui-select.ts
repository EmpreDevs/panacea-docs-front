import { Component, ElementRef, inject, Injector, Input, signal, ViewChild } from '@angular/core'
import { distinctUntilChanged, fromEvent, map, Subject, takeUntil } from 'rxjs'
import { SelectOption } from './select.type'
import { LucideIconData, LucideAngularModule, XIcon, CheckIcon, CircleAlertIcon } from 'lucide-angular'
import { NgControl } from '@angular/forms'
import { NgClass } from '@angular/common'

@Component({
	selector: 'app-ui-select',
	imports: [LucideAngularModule, NgClass],
	templateUrl: './ui-select.html',
})
export class UiSelect {
	private injector = inject(Injector)
	public ngControl: NgControl | null = null

	@ViewChild('UISelect') select!: ElementRef<HTMLSelectElement>

	@Input({ required: true }) id = ''
	@Input({ required: true }) name = ''
	@Input() required = false
	@Input() placeholder = 'Selecciona una opción'
	@Input() isDisabled = false
	@Input() label = ''
	@Input() icon?: LucideIconData
	@Input() hint?: string
	@Input() options: SelectOption[] = []

	public valueChanges = new Subject<any>()
	public destroy$ = new Subject<void>()

	touched = signal<boolean>(false)
	currentValue = signal<any>('')

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
		this.updateSelectValue(this.currentValue())
		// Configura el observable de cambios
		this.setupValueChanges()
	}

	setupValueChanges(): void {
		fromEvent(this.select.nativeElement, 'change')
			.pipe(
				map((event: Event) => (event.target as HTMLSelectElement).value),
				distinctUntilChanged(),
				takeUntil(this.destroy$),
			)
			.subscribe(value => {
				this.currentValue.set(value)
				this.valueChanges.next(value)
				this._onChange(value)
			})
	}

	private updateSelectValue(value: any): void {
		if (this.select && this.select.nativeElement) {
			this.select.nativeElement.value = value ?? ''
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

		// Error genérico para validaciones custom
		return 'Campo inválido'
	}

	//ControlValueAccessor
	_onChange: (value: any) => void = () => {}
	_onTouched: () => void = () => {}

	writeValue(value: any): void {
		this.currentValue.set(value ?? '')
		this.updateSelectValue(value)
	}

	registerOnChange(fn: (value: any) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled
		if (this.select && this.select.nativeElement) {
			this.select.nativeElement.disabled = isDisabled
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
		this.valueChanges.complete()
		this.currentValue.set('')
	}
}
