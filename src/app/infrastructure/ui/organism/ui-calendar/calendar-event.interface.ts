import { EventInput } from '@fullcalendar/core/index.js'

export interface CalendarEvent extends EventInput {
	// 1. **Propiedades de Identificación y Contenido Requeridas**
	id?: string // Un ID único para el evento. Útil para CRUD (Crear, Leer, Actualizar, Eliminar).
	groupId?: string // ID para agrupar eventos relacionados (e.g., para arrastrar varios a la vez).
	title: string // El texto principal que aparece en el calendario.

	// 2. **Propiedades de Tiempo**
	start: Date | string // La fecha y/o hora de inicio del evento. Puede ser un objeto Date o un string ISO 8601.
	end?: Date | string // La fecha y/o hora de finalización del evento (opcional).

	// 3. **Propiedades de Todo el Día (All-Day)**
	allDay?: boolean // Si es true, el evento aparece como un evento de día completo. Por defecto es false.

	// 4. **Propiedades de Estilismo y Presentación**
	url?: string // Una URL a la que se navegará al hacer clic en el evento (si lo soporta la vista).
	classNames?: string[] | string // Clases CSS que se aplicarán al elemento del evento.

	backgroundColor?: string // Color de fondo del evento (anula el 'color').
	borderColor?: string // Color del borde del evento (anula el 'color').
	textColor?: string // Color del texto del evento (anula el 'color').
	color?: string // Color general (establece backgroundColor y borderColor).

	// 5. **Propiedades de Interacción**
	editable?: boolean // Permite arrastrar, redimensionar o editar el evento.
	startEditable?: boolean // Permite cambiar el inicio del evento.
	durationEditable?: boolean // Permite redimensionar la duración del evento.
	resourceEditable?: boolean // Permite mover el evento a otro recurso (si usas Resource View).
	display?: 'auto' | 'block' | 'list-item' | 'background' | 'inverse-background' | 'none' // Cómo se renderiza el evento.

	// 6. **Propiedades para Datos Personalizados**
	extendedProps?: {
		// Un objeto para almacenar cualquier dato extra que necesites.
		[key: string]: any // Por ejemplo: { tipoReunion: 'Junta', notas: 'Puntos a discutir...' }
	}

	// 7. **Propiedades de Renderizado (Render Hooks)**
	// Podrías necesitar tipar propiedades que FullCalendar agrega internamente,
	// pero para la DATA que le pasas, las anteriores son las más importantes.
}
