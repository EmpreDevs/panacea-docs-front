import { DatePipe } from '@angular/common'
import { Component, input, output } from '@angular/core'

import { Note } from '@domain/models'

import { UiLink } from '@infra/ui/atoms'

@Component({
	selector: 'app-note-table',
	imports: [UiLink, DatePipe],
	templateUrl: './note-table.html',
	styles: ``,
})
export class NoteTable {
	notes = input<Note[]>([])
	emit = input<boolean>(false)
	linkToDetail = input<(id: string, appointmentId: string) => string[]>(() => [])

	Selected = output<Note>()

	noteSelected(note: Note) {
		this.Selected.emit(note)
	}
}
