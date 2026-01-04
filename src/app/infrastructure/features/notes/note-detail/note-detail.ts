import { Component, input } from '@angular/core'

import { Note } from '@domain/models'

import { UiHtmlRender } from '@infra/ui/molecules'

@Component({
	selector: 'app-note-detail',
	imports: [UiHtmlRender],
	templateUrl: './note-detail.html',
	styles: ``,
})
export class NoteDetail {
	note = input<Note | null>()
}
