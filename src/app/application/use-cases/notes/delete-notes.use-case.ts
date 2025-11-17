import { Inject, Injectable } from "@angular/core";
import { DeleteUseCase } from "../common";
import { Notes } from "@domain/models/notes.model";
import { notesToken } from "@infra/di/tokens";
import { NotesRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteNotesUseCase extends DeleteUseCase<Notes> {
  constructor(
    @Inject(notesToken) 
    private readonly repository: NotesRepository) {
    super(repository)
  }
}