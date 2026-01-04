import { Component, input } from '@angular/core'

import { Note } from '@domain/models'

import { UiLoadingError, UiSkeleton } from '@infra/ui/atoms'
import { UiHtmlRender } from '@infra/ui/molecules'

@Component({
	selector: 'app-note-detail',
	imports: [UiHtmlRender, UiLoadingError, UiSkeleton],
	templateUrl: './note-detail.html',
	styles: ``,
})
export class NoteDetail {
	note = input<Note | null | undefined>(undefined)
}
