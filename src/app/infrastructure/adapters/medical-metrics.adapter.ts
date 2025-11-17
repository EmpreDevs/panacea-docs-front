import { inject, Injectable } from "@angular/core";
import { MedicalMetrics } from "@domain/models/medical-metrics.model";
import { MedicalMetricsRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";

@Injectable({ providedIn: 'root' })
export class MedicalMetricsAdapter extends BaseAdapter<MedicalMetrics> implements MedicalMetricsRepository{
  private readonly apiUrl = `${environment.apiUrl}/medical-metrics`

  constructor(private readonly http: HttpClient) {
    super(http, 'medical-metrics')
  }
}