import { Inject, Injectable } from "@angular/core";
import { UpdateUseCase } from "../common";
import { Subscription } from "@domain/models/subscription.model";
import { subscriptionToken } from "@infra/di/tokens";
import { SubscriptionRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateSubscriptionUseCase extends UpdateUseCase<Subscription> {
  constructor(
    @Inject(subscriptionToken) 
    private readonly repository: SubscriptionRepository) {
    super(repository)
  }
}