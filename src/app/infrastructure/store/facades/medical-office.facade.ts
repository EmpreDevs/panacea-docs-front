import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { MedicalOffice } from "@domain/models";
import { CreateMedicalOfficeUseCase, DeleteMedicalOfficeUseCase, FindAllMedicalOfficesUseCase, FindMedicalOfficeByIdUseCase, UpdateMedicalOfficeUseCase } from "@app/use-cases";
import { MedicalOfficeState } from "../states";

@Injectable({ providedIn: 'root' })
export class MedicalOfficeFacade extends BaseFacade<MedicalOffice>{
  constructor(
    createUseCase: CreateMedicalOfficeUseCase,
    findOneUseCase: FindMedicalOfficeByIdUseCase,
    findAllUseCase: FindAllMedicalOfficesUseCase,
    updateUseCase: UpdateMedicalOfficeUseCase,
    deleteUseCase: DeleteMedicalOfficeUseCase,
    private readonly state: MedicalOfficeState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}