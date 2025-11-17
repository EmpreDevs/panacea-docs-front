import { InjectionToken } from "@angular/core";
import { SubscriptionRepository } from "@domain/repositories";

export const subscriptionToken = new InjectionToken<SubscriptionRepository>('SUBSCRIPTION_TOKEN')