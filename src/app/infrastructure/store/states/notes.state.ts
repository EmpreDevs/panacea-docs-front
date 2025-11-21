import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { Notes } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class NotesState extends BaseState<Notes> {

  constructor() {
    super({ storable: true, storageKey: 'notes'})
  }
}