import { inject, Injectable } from "@angular/core";
import { Plan } from "@domain/models/plan.model";
import { PlanRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class PlanAdapter extends BaseAdapter<Plan> implements PlanRepository{
  private readonly apiUrl = `${environment.apiUrl}/plans`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'plans', dbService)
  }
}