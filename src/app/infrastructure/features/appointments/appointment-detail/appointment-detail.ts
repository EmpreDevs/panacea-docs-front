import { DatePipe } from '@angular/common'
import { Component, input, output } from '@angular/core'

import { Appointment } from '@domain/models'

@Component({
	selector: 'app-appointment-detail',
	imports: [DatePipe],
	templateUrl: './appointment-detail.html',
	styles: ``,
})
export class AppointmentDetail {
	appointment = input<Appointment | null>(null)
	launchView = input<boolean>(false)

	closeView = output<void>()

	closeModal() {
		this.closeView.emit()
	}
}
