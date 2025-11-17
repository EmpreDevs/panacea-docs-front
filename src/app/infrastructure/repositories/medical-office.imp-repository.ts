import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { MedicalOfficeRepository } from "@domain/repositories";
import { MedicalOfficeAdapter } from "@infra/adapters/medical-office.adapter";
import { MedicalOffice } from "@domain/models/medical-office.model";

@Injectable()
export class MedicalOfficeImpRepository extends BaseImpRepository<MedicalOffice> implements MedicalOfficeRepository {
  constructor(private readonly adapter: MedicalOfficeAdapter) {
    super(adapter)
  }
}