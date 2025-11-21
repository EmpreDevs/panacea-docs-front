import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { Notes } from "@domain/models";
import { CreateNotesUseCase, DeleteNotesUseCase, FindAllNotesUseCase, FindNotesByIdUseCase, UpdateNotesUseCase } from "@app/use-cases";
import { NotesState } from "../states";

@Injectable({ providedIn: 'root' })
export class NotesFacade extends BaseFacade<Notes>{
  constructor(
    createUseCase: CreateNotesUseCase,
    findOneUseCase: FindNotesByIdUseCase,
    findAllUseCase: FindAllNotesUseCase,
    updateUseCase: UpdateNotesUseCase,
    deleteUseCase: DeleteNotesUseCase,
    private readonly state: NotesState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}