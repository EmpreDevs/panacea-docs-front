import { Inject, Injectable } from "@angular/core";
import { FindByIdUseCase } from "../common";
import { Patient } from "@domain/models/patient.model";
import { patientToken } from "@infra/di/tokens";
import { PatientRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindPatientByIdUseCase extends FindByIdUseCase<Patient> {
  constructor(
    @Inject(patientToken) 
    private readonly repository: PatientRepository) {
    super(repository)
  }
}