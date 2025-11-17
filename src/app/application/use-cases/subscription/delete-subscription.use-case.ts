import { Inject, Injectable } from "@angular/core";
import { DeleteUseCase } from "../common";
import { Subscription } from "@domain/models/subscription.model";
import { subscriptionToken } from "@infra/di/tokens";
import { SubscriptionRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteSubscriptionUseCase extends DeleteUseCase<Subscription> {
  constructor(
    @Inject(subscriptionToken) 
    private readonly repository: SubscriptionRepository) {
    super(repository)
  }
}