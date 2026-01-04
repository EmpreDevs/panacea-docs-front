import { Component } from '@angular/core'

import { NoteForm } from '@infra/features/notes'
import { UiCard, UiH2 } from '@infra/ui/atoms'

@Component({
	selector: 'app-patient-note-create-page',
	imports: [UiCard, NoteForm, UiH2],
	templateUrl: './patient-note-create-page.html',
	styles: ``,
})
export class PatientNoteCreatePage {}
