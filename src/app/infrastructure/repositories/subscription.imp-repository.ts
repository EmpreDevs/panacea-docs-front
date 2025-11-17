import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { SubscriptionRepository } from "@domain/repositories";
import { SubscriptionAdapter } from "@infra/adapters/subscription.adapter";
import { Subscription } from "@domain/models/subscription.model";

@Injectable()
export class SubscriptionImpRepository extends BaseImpRepository<Subscription> implements SubscriptionRepository {
  constructor(private readonly adapter: SubscriptionAdapter) {
    super(adapter)
  }
}