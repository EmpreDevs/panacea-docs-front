import { DatePipe } from '@angular/common'
import { Component, input, output } from '@angular/core'

import { Appointment } from '@domain/models'

import { UiLoadingError, UiSkeleton } from '@infra/ui/atoms'

@Component({
	selector: 'app-appointment-detail',
	imports: [DatePipe, UiSkeleton, UiLoadingError],
	templateUrl: './appointment-detail.html',
	styles: ``,
})
export class AppointmentDetail {
	appointment = input<Appointment | null | undefined>(undefined)
	launchView = input<boolean>(false)

	closeView = output<void>()

	closeModal() {
		this.closeView.emit()
	}
}
