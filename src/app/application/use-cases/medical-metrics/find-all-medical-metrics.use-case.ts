import { Inject, Injectable } from "@angular/core";
import { FindAllUseCase } from "../common";
import { MedicalMetrics } from "@domain/models/medical-metrics.model";
import { medicalMetricsToken } from "@infra/di/tokens";
import { MedicalMetricsRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindAllMedicalMetricsUseCase extends FindAllUseCase<MedicalMetrics> {
  constructor(
    @Inject(medicalMetricsToken) 
    private readonly repository: MedicalMetricsRepository) {
    super(repository)
  }
}