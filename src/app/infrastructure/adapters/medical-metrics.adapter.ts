import { inject, Injectable } from "@angular/core";
import { MedicalMetrics } from "@domain/models/medical-metrics.model";
import { MedicalMetricsRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class MedicalMetricsAdapter extends BaseAdapter<MedicalMetrics> implements MedicalMetricsRepository{
  private readonly apiUrl = `${environment.apiUrl}/medical-metrics`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'medical-metrics', dbService)
  }
}