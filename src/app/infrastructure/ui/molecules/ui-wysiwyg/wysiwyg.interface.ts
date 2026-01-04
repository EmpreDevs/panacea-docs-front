/**
 * Configuración de los módulos del editor WYSIWYG
 */
export interface WysiwygModules {
	toolbar?: WysiwygToolbarConfig | boolean
	clipboard?: WysiwygClipboardConfig
	history?: {
		delay?: number
		maxStack?: number
		userOnly?: boolean
	}
	keyboard?: {
		bindings?: Record<string, any>
	}
}

/**
 * Configuración de la toolbar del editor
 */
export type WysiwygToolbarConfig =
	| string[][]
	| {
			container: string[][]
			handlers?: Record<string, any>
	  }

/**
 * Configuración del portapapeles
 */
export interface WysiwygClipboardConfig {
	matchVisual?: boolean
	allowed?: {
		tags?: string[]
		attributes?: string[]
	}
}

/**
 * Formatos permitidos en el editor
 */
export type WysiwygFormat =
	| 'bold'
	| 'italic'
	| 'underline'
	| 'strike'
	| 'blockquote'
	| 'code-block'
	| 'header'
	| 'list'
	| 'script'
	| 'indent'
	| 'direction'
	| 'size'
	| 'color'
	| 'background'
	| 'font'
	| 'align'
	| 'link'
	| 'image'
	| 'video'
	| 'clean'
	| 'table'

/**
 * Opciones de configuración del componente WYSIWYG
 */
export interface WysiwygOptions {
	/**
	 * Tema del editor (snow: con toolbar, bubble: toolbar flotante)
	 */
	theme?: 'snow' | 'bubble'

	/**
	 * Placeholder del editor
	 */
	placeholder?: string

	/**
	 * Si el editor está en modo solo lectura
	 */
	readOnly?: boolean

	/**
	 * Módulos de Quill a habilitar
	 */
	modules?: WysiwygModules

	/**
	 * Formatos permitidos
	 */
	formats?: WysiwygFormat[]

	/**
	 * Si mostrar el contador de caracteres
	 */
	showCounter?: boolean

	/**
	 * Límite de caracteres (0 = sin límite)
	 */
	maxLength?: number
}

/**
 * Configuración por defecto del editor
 */
export const defaultWysiwygOptions: WysiwygOptions = {
	theme: 'snow',
	placeholder: 'Escribe algo...',
	readOnly: false,
	showCounter: false,
	maxLength: 0,
	modules: {
		toolbar: [
			//[{ header: [1, 2, 3, 4, 5, 6] }],
			//[{ size: ['small', 'large', 'huge'] }],
			['bold', 'italic', 'underline', 'strike'],
			//[{ color: [] }, { background: [] }],
			//[{ script: 'sub' }, { script: 'super' }],
			//[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
			//[{ indent: '-1' }, { indent: '+1' }],
			//[{ align: [] }],
			['blockquote', 'code-block'],
			['link'],
			['clean'],
		],
		clipboard: {
			matchVisual: false,
		},
		history: {
			delay: 1000,
			maxStack: 50,
			userOnly: true,
		},
	},
	formats: [
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'code-block',
		'header',
		'list',
		'script',
		'indent',
		'direction',
		'size',
		'color',
		'background',
		'font',
		'align',
		'link',
	],
}
