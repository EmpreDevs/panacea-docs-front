import { Component, inject, resource } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'

import { NoteDetail } from '@infra/features/notes'
import { NoteFacade } from '@infra/store/facades'
import { UiCard, UiH2 } from '@infra/ui/atoms'

@Component({
	selector: 'app-patient-note-detail-page',
	imports: [NoteDetail, UiCard, UiH2],
	templateUrl: './patient-note-detail-page.html',
	styles: ``,
})
export class PatientNoteDetailPage {
	route = inject(ActivatedRoute)
	noteFacade = inject(NoteFacade)

	private params = toSignal(this.route.params)
	private noteId = this.params()?.['noteId']

	noteResource = resource({
		loader: async () => {
			const id = this.noteId
			return this.noteFacade.getCurrentNote(id)
		},
	})
}
