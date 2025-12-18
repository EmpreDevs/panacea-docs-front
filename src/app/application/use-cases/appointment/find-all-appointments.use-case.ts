import { Appointment } from "@domain/models/appointment.model";
import { FindAllUseCase } from "../common";
import { Inject, Injectable } from "@angular/core";
import { appointmentToken } from "@infra/di/tokens/appointment.token";
import { AppointmentRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindAllAppointmentsUseCase extends FindAllUseCase<Appointment> {
  constructor(
    @Inject(appointmentToken)
    private readonly repository: AppointmentRepository) {
    super(repository)
  }
}
