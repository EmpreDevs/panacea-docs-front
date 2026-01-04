import {
	Component,
	Input,
	inject,
	Injector,
	signal,
	OnInit,
	OnDestroy,
	AfterViewInit,
	ViewChild,
} from '@angular/core'
import { NgControl } from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'
import { QuillEditorComponent, QuillModule } from 'ngx-quill'
import { NgClass, NgIf } from '@angular/common'
import { WysiwygOptions, defaultWysiwygOptions } from './wysiwyg.interface'
import { CircleAlertIcon, LucideAngularModule, XIcon, CheckIcon } from 'lucide-angular'

@Component({
	selector: 'app-ui-wysiwyg',
	imports: [QuillModule, NgClass, NgIf, LucideAngularModule],
	templateUrl: './ui-wysiwyg.html',
})
export class UiWysiwyg implements OnInit, AfterViewInit, OnDestroy {
	private injector = inject(Injector)
	public ngControl: NgControl | null = null

	@ViewChild('editor') editor?: QuillEditorComponent

	@Input({ required: true }) id = ''
	@Input({ required: true }) name = ''
	@Input() label = ''
	@Input() hint?: string
	@Input() required = false
	@Input() isDisabled = false
	@Input() options: Partial<WysiwygOptions> = {}

	// Iconos
	iconX = XIcon
	iconCheck = CheckIcon
	iconAlert = CircleAlertIcon

	// Estado
	touched = signal<boolean>(false)
	currentValue = signal<string>('')
	characterCount = signal<number>(0)
	destroy$ = new Subject<void>()

	// Configuración del editor
	editorConfig: WysiwygOptions = defaultWysiwygOptions

	ngOnInit(): void {
		// Obtener NgControl de forma diferida
		try {
			this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true })
			if (this.ngControl) {
				this.ngControl.valueAccessor = this
			}
		} catch (e) {
			// NgControl no disponible
		}

		// Merge de opciones con las opciones por defecto
		this.editorConfig = {
			...defaultWysiwygOptions,
			...this.options,
			modules: {
				...defaultWysiwygOptions.modules,
				...this.options.modules,
				toolbar:
					this.options.modules?.toolbar !== undefined
						? this.options.modules.toolbar
						: defaultWysiwygOptions.modules?.toolbar,
			},
		}
	}

	ngAfterViewInit(): void {
		if (this.editor) {
			// Escuchar cambios en el contenido
			this.editor.onContentChanged.pipe(takeUntil(this.destroy$)).subscribe(event => {
				const content = event.html || ''
				this.currentValue.set(content)
				this.updateCharacterCount(event.text || '')
				this._onChange(content)
			})

			// Marcar como touched cuando el editor pierde el foco
			this.editor.onBlur.pipe(takeUntil(this.destroy$)).subscribe(() => {
				this.touched.set(true)
				this._onTouched()
			})
		}
	}

	/**
	 * Actualiza el contador de caracteres
	 */
	private updateCharacterCount(text: string): void {
		// Eliminar saltos de línea y espacios extra para el conteo
		const cleanText = text.trim()
		this.characterCount.set(cleanText.length)
	}

	/**
	 * Verifica si se alcanzó el límite de caracteres
	 */
	get isMaxLengthReached(): boolean {
		if (!this.editorConfig.maxLength || this.editorConfig.maxLength === 0) {
			return false
		}
		return this.characterCount() >= this.editorConfig.maxLength
	}

	/**
	 * Obtiene el texto del contador
	 */
	get counterText(): string {
		if (!this.editorConfig.maxLength || this.editorConfig.maxLength === 0) {
			return `${this.characterCount()} caracteres`
		}
		return `${this.characterCount()} / ${this.editorConfig.maxLength}`
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

		if (errors['required']) {
			return `${this.label || 'Este campo'} es requerido`
		}
		if (errors['minlength']) {
			return `Mínimo ${errors['minlength'].requiredLength} caracteres`
		}
		if (errors['maxlength']) {
			return `Máximo ${errors['maxlength'].requiredLength} caracteres`
		}

		return 'Campo inválido'
	}

	// ControlValueAccessor
	_onChange: (value: string) => void = () => {}
	_onTouched: () => void = () => {}

	writeValue(value: string): void {
		this.currentValue.set(value || '')
		if (this.editor && this.editor.quillEditor) {
			// Actualizar el contenido del editor
			const delta = this.editor.quillEditor.clipboard.convert({ html: value || '' })
			this.editor.quillEditor.setContents(delta, 'silent')
		}
	}

	registerOnChange(fn: (value: string) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled
		if (this.editor && this.editor.quillEditor) {
			this.editor.quillEditor.enable(!isDisabled)
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
	}
}
