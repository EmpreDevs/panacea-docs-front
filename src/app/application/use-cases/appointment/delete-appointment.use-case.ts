import { Appointment } from "@domain/models/appointment.model";
import { DeleteUseCase } from "../common";
import { Inject, Injectable } from "@angular/core";
import { appointmentToken } from "@infra/di/tokens/appointment.token";
import { AppointmentRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteAppointmentUseCase extends DeleteUseCase<Appointment> {
  constructor(
    @Inject(appointmentToken)
    private readonly repository: AppointmentRepository) {
    super(repository)
  }
}
