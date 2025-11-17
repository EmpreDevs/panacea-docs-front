import { Inject, Injectable } from "@angular/core";
import { FindByIdUseCase } from "../common";
import { MedicalOffice } from "@domain/models/medical-office.model";
import { medicalOfficeToken } from "@infra/di/tokens";
import { MedicalOfficeRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindMedicalOfficeByIdUseCase extends FindByIdUseCase<MedicalOffice> {
  constructor(
    @Inject(medicalOfficeToken) 
    private readonly repository: MedicalOfficeRepository) {
    super(repository)
  }
}