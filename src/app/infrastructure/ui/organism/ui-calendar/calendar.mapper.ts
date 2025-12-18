import { Appointment } from '@domain/models'
import { CalendarEvent } from './calendar-event.interface'

export class CalendarMapper {
	/**
	 * Mapea un único objeto de evento de la fuente al formato de FullCalendar.
	 * @param sourceEvent El objeto de evento recibido de la API.
	 * @returns Un objeto CalendarEvent listo para FullCalendar.
	 */
	private mapSingleEvent(sourceEvent: Appointment): CalendarEvent {
		const { startDate, endDate, title, properties } = sourceEvent

		const mappedEvent: CalendarEvent = {
			id: sourceEvent.id,
			title: title,
			start: startDate,
			end: endDate,
		}

		for (const key in properties) {
			if (properties.hasOwnProperty(key)) {
				if (key in mappedEvent) {
					;(mappedEvent as any)[key] = properties[key]
				} else {
					mappedEvent.extendedProps = mappedEvent.extendedProps || {}
					mappedEvent.extendedProps[key] = properties[key]
				}
			}
		}

		return mappedEvent
	}

	/**
	 * Mapea un array de eventos de la fuente a un array de eventos de FullCalendar.
	 * @param Appointment El array de eventos de la API.
	 * @returns El array de CalendarEvent.
	 */
	mapEvents(sourceEvents: Appointment[]): CalendarEvent[] {
		if (!sourceEvents || sourceEvents.length === 0) {
			return []
		}
		return sourceEvents.map(event => this.mapSingleEvent(event))
	}
}
