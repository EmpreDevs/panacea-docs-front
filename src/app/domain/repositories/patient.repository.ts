import { Patient } from "@domain/models/patient.model";
import { CrudRepository } from "./common/crud.repository";

export interface PatientRepository extends CrudRepository<Patient> {}