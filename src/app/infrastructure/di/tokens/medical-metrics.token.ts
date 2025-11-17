import { InjectionToken } from "@angular/core";
import { MedicalMetricsRepository } from "@domain/repositories";

export const medicalMetricsToken = new InjectionToken<MedicalMetricsRepository>('MEDICAL_METRICS_TOKEN')