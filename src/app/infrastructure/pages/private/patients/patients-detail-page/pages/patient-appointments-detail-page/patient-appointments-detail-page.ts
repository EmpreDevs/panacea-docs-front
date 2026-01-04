import { Component, computed, inject, resource } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterOutlet } from '@angular/router'

import { getAppPath } from '@app/helpers/route-builder'
import { ScreenSizeService } from '@app/services'
import { APP_ROUTES } from '@shared/constants'

import { AppointmentDetail } from '@infra/features/appointments'
import { NoteTable } from '@infra/features/notes'
import { AppointmentFacade, NoteFacade } from '@infra/store/facades'
import { UiIcon, UiLink } from '@infra/ui/atoms'
import { UiAccordion } from '@infra/ui/molecules'

@Component({
	selector: 'app-patient-appointments-detail-page',
	imports: [AppointmentDetail, NoteTable, UiAccordion, UiLink, UiIcon, RouterOutlet],
	templateUrl: './patient-appointments-detail-page.html',
	styles: ``,
})
export class PatientAppointmentsDetailPage {
	private screenService = inject(ScreenSizeService)
	private route = inject(ActivatedRoute)
	private noteFacade = inject(NoteFacade)
	private appointmentFacade = inject(AppointmentFacade)

	private params = toSignal(this.route.params)

	private appointmentId = computed(() => this.params()?.['appointmentId'])
	private noteId = computed(() => this.params()?.['noteId'])
	private patientId = computed(() => this.params()?.['id'])
	newNoteLink = computed(() =>
		getAppPath(APP_ROUTES.patients.root, APP_ROUTES.patients.notesNew(this.patientId(), this.appointmentId())),
	)
	detailNoteLink = (id: string, appointmentId: string) => [
		getAppPath(APP_ROUTES.patients.root, APP_ROUTES.patients.notesDetail(this.patientId(), appointmentId, id)),
	]

	appointmentResource = resource({
		loader: async () => {
			const id = this.appointmentId()
			if (!id) return null
			return this.appointmentFacade.getAppointmentById(id)
		},
	})
	notesResource = resource({
		loader: async () => {
			const id = this.appointmentId()
			if (!id) return null
			return this.noteFacade.getNotesByAppointmentId(id)
		},
	})

	isMobile = computed(() => this.screenService.isMobile)
}
