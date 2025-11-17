import { MedicalMetrics } from "@domain/models/medical-metrics.model";
import { CrudRepository } from "./common/crud.repository";

export interface MedicalMetricsRepository extends CrudRepository<MedicalMetrics> {}