import { Component, output } from '@angular/core'

import { UiButton, UiIcon } from '@infra/ui/atoms'

@Component({
	selector: 'app-appointment-actions',
	imports: [UiButton, UiIcon],
	templateUrl: './appointment-actions.html',
	styles: ``,
})
export class AppointmentActions {
	Cancel = output<void>()
	Edit = output<void>()
	Delete = output<void>()

	closeView() {
		this.Cancel.emit()
	}

	editView() {
		this.Edit.emit()
	}

	deleteView() {
		this.Delete.emit()
	}
}
