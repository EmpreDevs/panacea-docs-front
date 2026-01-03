import { DatePipe } from '@angular/common'
import { Component, input, output } from '@angular/core'

import { DateTime } from 'luxon'

import { Appointment } from '@domain/models'

import { UiIcon } from '@infra/ui/atoms'

@Component({
	selector: 'app-appointment-list',
	imports: [UiIcon, DatePipe],
	templateUrl: './appointment-list.html',
	styles: ``,
})
export class AppointmentList {
	appointments = input<Appointment[]>([])

	Selected = output<Appointment>()

	selected(appointment: Appointment) {
		this.Selected.emit(appointment)
	}
	isPendding(appointment: Appointment) {
		const now = DateTime.now()
		return now < DateTime.fromJSDate(appointment.startDate)
	}
}
