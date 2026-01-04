import { Inject, Injectable } from "@angular/core";
import { Appointment } from "@domain/models/appointment.model";
import { AppointmentRepository } from "@domain/repositories";
import { appointmentToken } from "@infra/di/tokens/appointment.token";
import { UpdateUseCase } from "../common";

@Injectable({providedIn: 'root'})
export class UpdateAppointmentUseCase extends UpdateUseCase<Appointment> {
  constructor(
    @Inject(appointmentToken)
    private readonly repository: AppointmentRepository) {
      super(repository)
    }
}
