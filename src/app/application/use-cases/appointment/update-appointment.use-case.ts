import { Appointment } from "@domain/models/appointment.model";
import { Inject, Injectable } from "@angular/core";
import { appointmentToken } from "@infra/di/tokens/appointment.token";
import { AppointmentRepository } from "@domain/repositories";
import { UpdateAppointmentDto } from "@infra/dto";

@Injectable({providedIn: 'root'})
export class UpdateAppointmentUseCase {
  constructor(
    @Inject(appointmentToken)
    private readonly repository: AppointmentRepository) {}

  execute(payload: UpdateAppointmentDto, id: string): Promise<Appointment> {
    return this.repository.update(payload, id);
  }
}
