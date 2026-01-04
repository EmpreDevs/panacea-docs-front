import { DatePipe } from '@angular/common'
import { Component, input, output } from '@angular/core'

import { Note } from '@domain/models'

import { UiLink, UiLoadingError, UiSkeleton } from '@infra/ui/atoms'

@Component({
	selector: 'app-note-table',
	imports: [UiLink, DatePipe, UiSkeleton, UiLoadingError],
	templateUrl: './note-table.html',
	styles: ``,
})
export class NoteTable {
	notes = input<Note[] | null | undefined>(undefined)
	emit = input<boolean>(false)
	linkToDetail = input<(id: string, appointmentId: string) => string[]>(() => [])

	Selected = output<Note>()

	noteSelected(note: Note) {
		this.Selected.emit(note)
	}
}
