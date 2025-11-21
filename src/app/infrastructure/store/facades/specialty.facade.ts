import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { Specialty } from "@domain/models";
import { CreateSpecialtyUseCase, DeleteSpecialtyUseCase, FindAllSpecialtiesUseCase, FindSpecialtyByIdUseCase, UpdateSpecialtyUseCase } from "@app/use-cases";
import { SpecialtyState } from "../states";

@Injectable({ providedIn: 'root' })
export class SpecialtyFacade extends BaseFacade<Specialty>{
  constructor(
    createUseCase: CreateSpecialtyUseCase,
    findOneUseCase: FindSpecialtyByIdUseCase,
    findAllUseCase: FindAllSpecialtiesUseCase,
    updateUseCase: UpdateSpecialtyUseCase,
    deleteUseCase: DeleteSpecialtyUseCase,
    private readonly state: SpecialtyState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}