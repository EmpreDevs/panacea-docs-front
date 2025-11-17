import { inject, Injectable } from "@angular/core";
import { Plan } from "@domain/models/plan.model";
import { PlanRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";

@Injectable({ providedIn: 'root' })
export class PlanAdapter extends BaseAdapter<Plan> implements PlanRepository{
  private readonly apiUrl = `${environment.apiUrl}/plans`

  constructor(private readonly http: HttpClient) {
    super(http, 'plans')
  }
}