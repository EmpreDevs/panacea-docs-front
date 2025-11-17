import { Inject, Injectable } from "@angular/core";
import { UpdateUseCase } from "../common";
import { Notes } from "@domain/models/notes.model";
import { notesToken } from "@infra/di/tokens";
import { NotesRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateNotesUseCase extends UpdateUseCase<Notes> {
  constructor(
    @Inject(notesToken) 
    private readonly repository: NotesRepository) {
    super(repository)
  }
}