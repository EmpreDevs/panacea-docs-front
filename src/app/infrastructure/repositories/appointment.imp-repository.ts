import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { AppointmentRepository } from "@domain/repositories";
import { AppointmentAdapter } from "@infra/adapters/appointment.adapter";
import { Appointment } from "@domain/models/appointment.model";

@Injectable()
export class AppointmentImpRepository extends BaseImpRepository<Appointment> implements AppointmentRepository {
  constructor(private readonly adapter: AppointmentAdapter) {
    super(adapter)
  }
}
