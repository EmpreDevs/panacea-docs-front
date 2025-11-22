import { inject, Injectable } from "@angular/core";
import { Speciality } from "@domain/models/speciality.model";
import { SpecialtyRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class SpecialtyAdapter extends BaseAdapter<Speciality> implements SpecialtyRepository{
  private readonly apiUrl = `${environment.apiUrl}/specialties`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'specialties', dbService)
  }
}