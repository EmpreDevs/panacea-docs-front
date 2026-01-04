import { Injectable } from '@angular/core'

import { Note } from '@domain/models'

import { BaseState } from './common/base.state'

@Injectable({ providedIn: 'root' })
export class NotesState extends BaseState<Note> {
	constructor() {
		super({ storable: true, storageKey: 'notes' })
	}
}
