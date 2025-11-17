import { Inject, Injectable } from "@angular/core";
import { DeleteUseCase } from "../common";
import { Patient } from "@domain/models/patient.model";
import { patientToken } from "@infra/di/tokens";
import { PatientRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class DeletePatientUseCase extends DeleteUseCase<Patient> {
  constructor(
    @Inject(patientToken) 
    private readonly repository: PatientRepository) {
    super(repository)
  }
}