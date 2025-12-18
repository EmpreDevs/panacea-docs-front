import { Appointment } from "@domain/models";
import { CreateDto, UpdateDto } from "./common";

/**
 * DTO para crear un nuevo Appointment
 * Omite el id y los campos internos de BaseModel
 */
export interface CreateAppointmentDto extends CreateDto<Appointment> {
  startDate: Date;
  endDate: Date;
  estimation: number;
  patientId: string;
  healthProviderId: string;
  tenantId: string;
  title: string;
  properties?: Record<string, any>;
}

/**
 * DTO para actualizar un Appointment existente
 * Todos los campos son opcionales
 */
export interface UpdateAppointmentDto extends UpdateDto<Appointment> {
  startDate?: Date;
  endDate?: Date;
  estimation?: number;
  patientId?: string;
  healthProviderId?: string;
  tenantId?: string;
  title?: string;
  properties?: Record<string, any>;
}
