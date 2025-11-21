import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { Patient } from "@domain/models";
import { CreatePatientUseCase, DeletePatientUseCase, FindAllPatientsUseCase, FindPatientByIdUseCase, UpdatePatientUseCase } from "@app/use-cases";
import { PatientState } from "../states";

@Injectable({ providedIn: 'root' })
export class PatientFacade extends BaseFacade<Patient>{
  constructor(
    createUseCase: CreatePatientUseCase,
    findOneUseCase: FindPatientByIdUseCase,
    findAllUseCase: FindAllPatientsUseCase,
    updateUseCase: UpdatePatientUseCase,
    deleteUseCase: DeletePatientUseCase,
    private readonly state: PatientState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}