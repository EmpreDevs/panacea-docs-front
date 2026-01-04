import { Inject, Injectable } from '@angular/core'

import { Note } from '@domain/models/notes.model'
import { NotesRepository } from '@domain/repositories'

import { notesToken } from '@infra/di/tokens'

import { DeleteUseCase } from '../common'

@Injectable({ providedIn: 'root' })
export class DeleteNotesUseCase extends DeleteUseCase<Note> {
	constructor(
		@Inject(notesToken)
		private readonly repository: NotesRepository,
	) {
		super(repository)
	}
}
