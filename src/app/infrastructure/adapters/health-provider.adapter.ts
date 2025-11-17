import { inject, Injectable } from "@angular/core";
import { HealthProvider } from "@domain/models/health-provider.model";
import { HealthProviderRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";

@Injectable({ providedIn: 'root' })
export class HealthProviderAdapter extends BaseAdapter<HealthProvider> implements HealthProviderRepository{
  private readonly apiUrl = `${environment.apiUrl}/health-providers`

  constructor(private readonly http: HttpClient) {
    super(http, 'health-providers')
  }
}