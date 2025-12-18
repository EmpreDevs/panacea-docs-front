import { Inject, Injectable } from "@angular/core";
import { Appointment } from "@domain/models/appointment.model";
import { appointmentToken } from "@infra/di/tokens/appointment.token";
import { AppointmentRepository } from "@domain/repositories";
import { CreateAppointmentDto } from "@infra/dto";

@Injectable({providedIn: 'root'})
export class CreateAppointmentUseCase {
  constructor(
    @Inject(appointmentToken)
    private readonly repository: AppointmentRepository) {}

  execute(payload: CreateAppointmentDto): Promise<Appointment> {
    return this.repository.create(payload);
  }
}
