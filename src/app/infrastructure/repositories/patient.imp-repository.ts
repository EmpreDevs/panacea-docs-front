import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { PatientRepository } from "@domain/repositories";
import { PatientAdapter } from "@infra/adapters/patient.adapter";
import { Patient } from "@domain/models/patient.model";

@Injectable()
export class PatientImpRepository extends BaseImpRepository<Patient> implements PatientRepository {
  constructor(private readonly adapter: PatientAdapter) {
    super(adapter)
  }
}