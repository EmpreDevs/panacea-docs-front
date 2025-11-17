import { Inject, Injectable } from "@angular/core";
import { UpdateUseCase } from "../common";
import { MedicalOffice } from "@domain/models/medical-office.model";
import { medicalOfficeToken } from "@infra/di/tokens";
import { MedicalOfficeRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateMedicalOfficeUseCase extends UpdateUseCase<MedicalOffice> {
  constructor(
    @Inject(medicalOfficeToken) 
    private readonly repository: MedicalOfficeRepository) {
    super(repository)
  }
}