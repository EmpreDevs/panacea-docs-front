import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { MedicalMetricsRepository } from "@domain/repositories";
import { MedicalMetricsAdapter } from "@infra/adapters/medical-metrics.adapter";
import { MedicalMetrics } from "@domain/models/medical-metrics.model";

@Injectable()
export class MedicalMetricsImpRepository extends BaseImpRepository<MedicalMetrics> implements MedicalMetricsRepository {
  constructor(private readonly adapter: MedicalMetricsAdapter) {
    super(adapter)
  }
}