import { Component, input, output } from '@angular/core'
import { Appointment } from '@domain/models'
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core/index.js'
import { UiCalendar } from '@infra/ui/organism'

@Component({
	selector: 'app-appointment-list',
	imports: [UiCalendar],
	templateUrl: './appointment-list.html',
	styles: ``,
})
export class AppointmentList {
	events = input<Appointment[]>([])

	eventDrop = output<Appointment>()
	eventClick = output<Appointment>()
	createEvent = output<Date>()

	clickOnEvent(arg: EventClickArg) {
		const appointment = this.findEventById(arg.event.id)
		if (!appointment) {
			return
		}
		this.eventClick.emit(appointment)
	}
	dropEvent(arg: EventDropArg) {
		const appointment = this.findEventById(arg.event.id)
		if (!appointment) {
			return
		}
		const startDate = arg.event.start
		const endDate = arg.event.end
		if (startDate && endDate) {
			appointment.startDate = startDate
			appointment.endDate = endDate
		}

		this.eventDrop.emit(appointment)
	}
	selectEvent(arg: DateSelectArg) {
		this.createEvent.emit(arg.start)
	}
	findEventById(id: string): Appointment | undefined {
		return this.events().find(appointment => appointment.id === id)
	}
}
