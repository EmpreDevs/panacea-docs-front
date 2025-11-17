import { inject, Injectable } from "@angular/core";
import { Notes } from "@domain/models/notes.model";
import { NotesRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";

@Injectable({ providedIn: 'root' })
export class NotesAdapter extends BaseAdapter<Notes> implements NotesRepository{
  private readonly apiUrl = `${environment.apiUrl}/notes`

  constructor(private readonly http: HttpClient) {
    super(http, 'notes')
  }
}