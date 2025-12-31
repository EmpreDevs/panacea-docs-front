import { Component, computed, input, output } from '@angular/core'

import { Appointment } from '@domain/models'

import { UiModalBody, UiModalFooter } from '@infra/ui/molecules'
import { UiModal } from '@infra/ui/organism'

import { AppointmentActions } from '../appointment-actions/appointment-actions'
import { AppointmentDetail } from '../appointment-detail/appointment-detail'
import { AppointmentForm } from '../appointment-form/appointment-form'

export enum AppointmentSidebarView {
	None = 'none',
	Form = 'form',
	Detail = 'detail',
	Edit = 'edit',
}

@Component({
	selector: 'app-appointment-sidebar',
	imports: [AppointmentDetail, AppointmentActions, UiModal, UiModalBody, UiModalFooter, AppointmentForm],
	templateUrl: './appointment-sidebar.html',
	styles: ``,
})
export class AppointmentSidebar {
	viewSelect = input<AppointmentSidebarView>(AppointmentSidebarView.None)
	appointmentSelected = input<Appointment | null>(null)
	isMobile = input<boolean>(false)
	healthProviderId = input<string>('')
	tenantId = input<string>('')
	patientId = input<string>('')
	date = input<Date>(new Date())
	canCreateOnTablet = input<boolean>(false)

	Close = output<void>()
	Edit = output<void>()
	Delete = output<void>()

	view = AppointmentSidebarView
	modalVisible = computed(() => this.viewSelect() === this.view.Detail || this.viewSelect() === this.view.Form)
	titleSidebar = computed(() => {
		return this.viewSelect() === this.view.Detail ? 'Detalle de Cita' : 'Nueva Cita'
	})

	close() {
		this.Close.emit()
	}
}
