import { InjectionToken } from "@angular/core";
import { MedicalOfficeRepository } from "@domain/repositories";

export const medicalOfficeToken = new InjectionToken<MedicalOfficeRepository>('MEDICAL_OFFICE_TOKEN')