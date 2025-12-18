import { inject, Injectable } from "@angular/core";
import { Appointment } from "@domain/models/appointment.model";
import { AppointmentRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class AppointmentAdapter extends BaseAdapter<Appointment> implements AppointmentRepository {
  private readonly apiUrl = `${environment.apiUrl}/appointments`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'appointments', dbService)
  }
}
