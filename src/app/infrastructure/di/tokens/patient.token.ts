import { InjectionToken } from "@angular/core";
import { PatientRepository } from "@domain/repositories";

export const patientToken = new InjectionToken<PatientRepository>('PATIENT_TOKEN')