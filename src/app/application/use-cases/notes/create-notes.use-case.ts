import { Inject, Injectable } from '@angular/core'

import { Note } from '@domain/models/notes.model'
import { NotesRepository } from '@domain/repositories'

import { notesToken } from '@infra/di/tokens'

import { CreateUseCase } from '../common'

@Injectable({ providedIn: 'root' })
export class CreateNotesUseCase extends CreateUseCase<Note> {
	constructor(
		@Inject(notesToken)
		private readonly repository: NotesRepository,
	) {
		super(repository)
	}
}
