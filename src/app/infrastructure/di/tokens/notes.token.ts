import { InjectionToken } from "@angular/core";
import { NotesRepository } from "@domain/repositories";

export const notesToken = new InjectionToken<NotesRepository>('NOTES_TOKEN')