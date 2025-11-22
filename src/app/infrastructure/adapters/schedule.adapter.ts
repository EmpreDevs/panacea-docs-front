import { inject, Injectable } from "@angular/core";
import { Schedule } from "@domain/models/schedule.model";
import { ScheduleRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class ScheduleAdapter extends BaseAdapter<Schedule> implements ScheduleRepository{
  private readonly apiUrl = `${environment.apiUrl}/schedules`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'schedules', dbService)
  }
}