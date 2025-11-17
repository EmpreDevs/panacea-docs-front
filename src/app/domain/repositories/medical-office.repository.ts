import { MedicalOffice } from "@domain/models/medical-office.model";
import { CrudRepository } from "./common/crud.repository";

export interface MedicalOfficeRepository extends CrudRepository<MedicalOffice> {}