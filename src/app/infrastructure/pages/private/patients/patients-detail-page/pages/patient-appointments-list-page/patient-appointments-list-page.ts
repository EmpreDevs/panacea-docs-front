import { Component, computed, inject } from '@angular/core'

import { ScreenSizeService } from '@app/services'

import { AppointmentForm, AppointmentList } from '@infra/features/appointments'
import { UiCard, UiH2 } from '@infra/ui/atoms'
import { UiAccordion } from '@infra/ui/molecules'

@Component({
	selector: 'app-patient-appointments-list-page',
	imports: [AppointmentList, UiAccordion, AppointmentForm, UiCard, UiH2],
	templateUrl: './patient-appointments-list-page.html',
	styles: ``,
})
export class PatientAppointmentsListPage {
	screenService = inject(ScreenSizeService)

	isMobile = computed(() => this.screenService.isMobile)
}
