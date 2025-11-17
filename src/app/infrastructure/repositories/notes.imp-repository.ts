import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { NotesRepository } from "@domain/repositories";
import { NotesAdapter } from "@infra/adapters/notes.adapter";
import { Notes } from "@domain/models/notes.model";

@Injectable()
export class NotesImpRepository extends BaseImpRepository<Notes> implements NotesRepository {
  constructor(private readonly adapter: NotesAdapter) {
    super(adapter)
  }
}