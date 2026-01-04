import { Inject, Injectable } from '@angular/core'

import { Note } from '@domain/models/notes.model'
import { NotesRepository } from '@domain/repositories'

import { notesToken } from '@infra/di/tokens'

import { FindAllUseCase } from '../common'

@Injectable({ providedIn: 'root' })
export class FindAllNotesUseCase extends FindAllUseCase<Note> {
	constructor(
		@Inject(notesToken)
		private readonly repository: NotesRepository,
	) {
		super(repository)
	}
}
