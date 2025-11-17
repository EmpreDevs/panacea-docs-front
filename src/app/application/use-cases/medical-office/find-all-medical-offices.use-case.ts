import { Inject, Injectable } from "@angular/core";
import { FindAllUseCase } from "../common";
import { MedicalOffice } from "@domain/models/medical-office.model";
import { medicalOfficeToken } from "@infra/di/tokens";
import { MedicalOfficeRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindAllMedicalOfficesUseCase extends FindAllUseCase<MedicalOffice> {
  constructor(
    @Inject(medicalOfficeToken) 
    private readonly repository: MedicalOfficeRepository) {
    super(repository)
  }
}