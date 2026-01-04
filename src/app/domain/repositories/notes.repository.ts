import { Note } from '@domain/models/notes.model'

import { CrudRepository } from './common/crud.repository'

export interface NotesRepository extends CrudRepository<Note> {}
