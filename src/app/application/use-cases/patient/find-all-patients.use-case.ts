import { Inject, Injectable } from "@angular/core";
import { FindAllUseCase } from "../common";
import { Patient } from "@domain/models/patient.model";
import { patientToken } from "@infra/di/tokens";
import { PatientRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindAllPatientsUseCase extends FindAllUseCase<Patient> {
  constructor(
    @Inject(patientToken) 
    private readonly repository: PatientRepository) {
    super(repository)
  }
}