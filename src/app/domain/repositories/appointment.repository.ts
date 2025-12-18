import { Appointment } from "@domain/models/appointment.model";
import { CrudRepository } from "./common/crud.repository";

export interface AppointmentRepository extends CrudRepository<Appointment> {}
