import { InjectionToken } from "@angular/core";
import { AppointmentRepository } from "@domain/repositories";

export const appointmentToken = new InjectionToken<AppointmentRepository>('APPOINTMENT_TOKEN')
