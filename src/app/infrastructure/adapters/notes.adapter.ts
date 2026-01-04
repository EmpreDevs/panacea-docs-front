import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { Note } from '@domain/models'
import { NotesRepository } from '@domain/repositories'

import { NotesMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class NotesAdapter extends BaseAdapter<Note> implements NotesRepository {
	private readonly apiUrl = `${environment.apiUrl}/notes`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'notes', dbService, new NotesMapper())
	}
}
