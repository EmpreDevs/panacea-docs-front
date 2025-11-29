import { inject, Injectable } from "@angular/core";
import { Tenant } from "@domain/models/tenant.model";
import { TenantRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class TenantAdapter extends BaseAdapter<Tenant> implements TenantRepository{
  private readonly apiUrl = `${environment.apiUrl}/tenants`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'tenants', dbService)
  }
}
