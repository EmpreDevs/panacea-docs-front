import { Injectable } from '@angular/core'

import { Note } from '@domain/models'
import { NotesRepository } from '@domain/repositories'

import { NotesAdapter } from '@infra/adapters/notes.adapter'

import { BaseImpRepository } from './common/base.imp-repository'

@Injectable()
export class NotesImpRepository extends BaseImpRepository<Note> implements NotesRepository {
	constructor(private readonly adapter: NotesAdapter) {
		super(adapter)
	}
}
