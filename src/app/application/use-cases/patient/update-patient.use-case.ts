import { Inject, Injectable } from "@angular/core";
import { UpdateUseCase } from "../common";
import { Patient } from "@domain/models/patient.model";
import { patientToken } from "@infra/di/tokens";
import { PatientRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdatePatientUseCase extends UpdateUseCase<Patient> {
  constructor(
    @Inject(patientToken) 
    private readonly repository: PatientRepository) {
    super(repository)
  }
}