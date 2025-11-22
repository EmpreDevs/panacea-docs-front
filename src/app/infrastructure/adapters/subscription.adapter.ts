import { inject, Injectable } from "@angular/core";
import { Subscription } from "@domain/models/subscription.model";
import { SubscriptionRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";
import { OfflineDBService } from "@infra/pwa/services/offline-db.service";

@Injectable({ providedIn: 'root' })
export class SubscriptionAdapter extends BaseAdapter<Subscription> implements SubscriptionRepository{
  private readonly apiUrl = `${environment.apiUrl}/subscriptions`

  constructor(
    private readonly http: HttpClient,
    private readonly dbService: OfflineDBService,
  ) {
    super(http, 'subscriptions', dbService)
  }
}