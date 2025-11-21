import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { SpecialtyState } from "../states";
import { CreateSpecialityUseCase, DeleteSpecialityUseCase, FindAllSpecialitiesUseCase, FindSpecialityByIdUseCase, UpdateSpecialityUseCase } from "@app/use-cases";
import { Speciality } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class SpecialtyFacade extends BaseFacade<Speciality>{
  constructor(
    createUseCase: CreateSpecialityUseCase,
    findOneUseCase: FindSpecialityByIdUseCase,
    findAllUseCase: FindAllSpecialitiesUseCase,
    updateUseCase: UpdateSpecialityUseCase,
    deleteUseCase: DeleteSpecialityUseCase,
    private readonly state: SpecialtyState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}