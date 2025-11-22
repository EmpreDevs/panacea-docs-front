import { inject, Injectable } from "@angular/core";
import { Patient } from "@domain/models/patient.model";
import { PatientRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class PatientAdapter extends BaseAdapter<Patient> implements PatientRepository{
  private readonly apiUrl = `${environment.apiUrl}/patients`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'patients', dbService)
  }
}