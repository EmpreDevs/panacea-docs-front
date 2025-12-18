import { DatePipe } from '@angular/common'
import { Component, input, output } from '@angular/core'
import { Appointment } from '@domain/models'
import { UiModalFooter, UiModalBody } from '@infra/ui/molecules'
import { UiModal } from '@infra/ui/organism'

@Component({
	selector: 'app-appointment-detail',
	imports: [UiModal, UiModalBody, DatePipe],
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
