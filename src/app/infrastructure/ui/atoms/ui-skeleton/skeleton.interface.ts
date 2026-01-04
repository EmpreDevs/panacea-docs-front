/**
 * Tipos de skeleton disponibles
 */
export type SkeletonType = 'text' | 'circle' | 'rectangle' | 'square' | 'avatar' | 'card' | 'line'

/**
 * Tamaños predefinidos para el skeleton
 */
export type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Configuración de una fila del skeleton
 */
export interface SkeletonRow {
	/**
	 * Tipo de skeleton para esta fila
	 */
	type?: SkeletonType

	/**
	 * Número de columnas en esta fila (1-12)
	 */
	columns?: number

	/**
	 * Altura personalizada (ej: '20px', '2rem', '100%')
	 */
	height?: string

	/**
	 * Ancho personalizado (ej: '50%', '200px', '100%')
	 */
	width?: string

	/**
	 * Espacio entre columnas (gap)
	 */
	gap?: string

	/**
	 * Si las columnas deben ocupar el ancho completo
	 */
	fullWidth?: boolean
}

/**
 * Opciones de configuración del skeleton loader
 */
export interface SkeletonOptions {
	/**
	 * Tipo de skeleton (usado cuando no se especifican filas personalizadas)
	 */
	type?: SkeletonType

	/**
	 * Número de filas a mostrar
	 */
	rows?: number

	/**
	 * Número de columnas por fila
	 */
	columns?: number

	/**
	 * Altura de cada fila
	 */
	height?: string

	/**
	 * Ancho del skeleton
	 */
	width?: string

	/**
	 * Espacio entre filas
	 */
	rowGap?: string

	/**
	 * Espacio entre columnas
	 */
	columnGap?: string

	/**
	 * Configuración personalizada de filas
	 */
	customRows?: SkeletonRow[]

	/**
	 * Si debe mostrar la animación de shimmer
	 */
	animate?: boolean

	/**
	 * Border radius
	 */
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'

	/**
	 * Clase CSS adicional
	 */
	className?: string
}

/**
 * Configuración por defecto del skeleton
 */
export const defaultSkeletonOptions: SkeletonOptions = {
	type: 'text',
	rows: 3,
	columns: 1,
	height: '1rem',
	width: '100%',
	rowGap: '0.75rem',
	columnGap: '1rem',
	animate: true,
	rounded: 'md',
	className: '',
}

/**
 * Presets comunes para diferentes tipos de contenido
 */
export const skeletonPresets = {
	/**
	 * Preset para una tarjeta con imagen y texto
	 */
	card: {
		customRows: [
			{ type: 'rectangle' as SkeletonType, height: '200px', columns: 1 },
			{ type: 'text' as SkeletonType, height: '1.5rem', width: '80%' },
			{ type: 'text' as SkeletonType, height: '1rem', width: '60%' },
			{ type: 'text' as SkeletonType, height: '1rem', width: '90%' },
		],
		rowGap: '1rem',
	} as Partial<SkeletonOptions>,

	/**
	 * Preset para un avatar con nombre
	 */
	avatar: {
		customRows: [
			{
				type: 'avatar' as SkeletonType,
				columns: 2,
				gap: '1rem',
				height: '3rem',
			},
		],
	} as Partial<SkeletonOptions>,

	/**
	 * Preset para una lista de items
	 */
	list: {
		rows: 5,
		customRows: [
			{
				type: 'text' as SkeletonType,
				columns: 3,
				gap: '1rem',
				height: '3rem',
			},
		],
	} as Partial<SkeletonOptions>,

	/**
	 * Preset para una tabla
	 */
	table: {
		customRows: [
			{
				type: 'rectangle' as SkeletonType,
				columns: 4,
				gap: '0.5rem',
				height: '2.5rem',
			},
		],
		rows: 6,
		rowGap: '0.5rem',
	} as Partial<SkeletonOptions>,

	/**
	 * Preset para un formulario
	 */
	form: {
		customRows: [
			{ type: 'text' as SkeletonType, height: '1rem', width: '30%' },
			{ type: 'rectangle' as SkeletonType, height: '2.5rem', width: '100%' },
			{ type: 'text' as SkeletonType, height: '1rem', width: '30%' },
			{ type: 'rectangle' as SkeletonType, height: '2.5rem', width: '100%' },
			{ type: 'text' as SkeletonType, height: '1rem', width: '30%' },
			{ type: 'rectangle' as SkeletonType, height: '6rem', width: '100%' },
		],
		rowGap: '0.5rem',
	} as Partial<SkeletonOptions>,

	/**
	 * Preset para un artículo/post
	 */
	article: {
		customRows: [
			{ type: 'text' as SkeletonType, height: '2rem', width: '70%' }, // Título
			{ type: 'text' as SkeletonType, height: '0.875rem', width: '40%' }, // Metadata
			{ type: 'rectangle' as SkeletonType, height: '300px', width: '100%' }, // Imagen
			{ type: 'text' as SkeletonType, height: '1rem', width: '100%' }, // Párrafo 1
			{ type: 'text' as SkeletonType, height: '1rem', width: '95%' },
			{ type: 'text' as SkeletonType, height: '1rem', width: '100%' }, // Párrafo 2
			{ type: 'text' as SkeletonType, height: '1rem', width: '85%' },
		],
		rowGap: '1rem',
	} as Partial<SkeletonOptions>,

	/**
	 * Preset para comentarios
	 */
	comment: {
		customRows: [
			{
				type: 'avatar' as SkeletonType,
				columns: 1,
				height: '2.5rem',
				width: '2.5rem',
			},
			{ type: 'text' as SkeletonType, height: '1rem', width: '100%' },
			{ type: 'text' as SkeletonType, height: '1rem', width: '80%' },
		],
		rows: 3,
		rowGap: '0.5rem',
	} as Partial<SkeletonOptions>,
}
