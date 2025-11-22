import { inject, Injectable } from "@angular/core";
import { HealthProviderSchedule } from "@domain/models/health-provider-schedule.model";
import { HealthProviderScheduleRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class HealthProviderScheduleAdapter extends BaseAdapter<HealthProviderSchedule> implements HealthProviderScheduleRepository{
  private readonly apiUrl = `${environment.apiUrl}/health-provider-schedules`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'health-provider-schedules', dbService)
  }
}