import { Provider } from "@angular/core";
import { authToken } from "./tokens/auth.token";
import { AuthImpRepository } from "@infra/repositories/auth.imp-repository";
import { specialityToken } from "./tokens/speciality.token";
import { SpecialityImpRepository } from "@infra/repositories/speciality.imp-repository";
import { healthProviderToken } from "./tokens/health-provider.token";
import { HealthProviderImpRepository } from "@infra/repositories/health-provider.imp-repository";
import { medicalOfficeToken } from "./tokens/medical-office.token";
import { MedicalOfficeImpRepository } from "@infra/repositories/medical-office.imp-repository";
import { scheduleToken } from "./tokens/schedule.token";
import { ScheduleImpRepository } from "@infra/repositories/schedule.imp-repository";
import { patientToken } from "./tokens/patient.token";
import { PatientImpRepository } from "@infra/repositories/patient.imp-repository";
import { notesToken } from "./tokens/notes.token";
import { NotesImpRepository } from "@infra/repositories/notes.imp-repository";
import { medicalMetricsToken } from "./tokens/medical-metrics.token";
import { MedicalMetricsImpRepository } from "@infra/repositories/medical-metrics.imp-repository";

export const diProvider: Provider[] = [
  { provide: authToken, useClass: AuthImpRepository },
  { provide: specialityToken, useClass: SpecialityImpRepository },
  { provide: healthProviderToken, useClass: HealthProviderImpRepository },
  { provide: medicalOfficeToken, useClass: MedicalOfficeImpRepository },
  { provide: scheduleToken, useClass: ScheduleImpRepository },
  { provide: patientToken, useClass: PatientImpRepository },
  { provide: notesToken, useClass: NotesImpRepository },
  { provide: medicalMetricsToken, useClass: MedicalMetricsImpRepository }
]