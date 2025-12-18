import { Appointment } from "@domain/models/appointment.model";
import { FindByIdUseCase } from "../common";
import { Inject, Injectable } from "@angular/core";
import { appointmentToken } from "@infra/di/tokens/appointment.token";
import { AppointmentRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindAppointmentByIdUseCase extends FindByIdUseCase<Appointment> {
  constructor(
    @Inject(appointmentToken)
    private readonly repository: AppointmentRepository) {
    super(repository)
  }
}
