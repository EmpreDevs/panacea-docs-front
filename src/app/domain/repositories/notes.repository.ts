import { Notes } from "@domain/models/notes.model";
import { CrudRepository } from "./common/crud.repository";

export interface NotesRepository extends CrudRepository<Notes> {}