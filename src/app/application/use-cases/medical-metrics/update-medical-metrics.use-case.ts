import { Inject, Injectable } from "@angular/core";
import { UpdateUseCase } from "../common";
import { MedicalMetrics } from "@domain/models/medical-metrics.model";
import { medicalMetricsToken } from "@infra/di/tokens";
import { MedicalMetricsRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateMedicalMetricsUseCase extends UpdateUseCase<MedicalMetrics> {
  constructor(
    @Inject(medicalMetricsToken) 
    private readonly repository: MedicalMetricsRepository) {
    super(repository)
  }
}