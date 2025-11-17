import { Inject, Injectable } from "@angular/core";
import { CreateUseCase } from "../common";
import { MedicalMetrics } from "@domain/models/medical-metrics.model";
import { medicalMetricsToken } from "@infra/di/tokens";
import { MedicalMetricsRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class CreateMedicalMetricsUseCase extends CreateUseCase<MedicalMetrics> {
  constructor(
    @Inject(medicalMetricsToken) 
    private readonly repository: MedicalMetricsRepository) {
    super(repository)
  }
}