import { Subscription } from "@domain/models/subscription.model";
import { CrudRepository } from "./common/crud.repository";

export interface SubscriptionRepository extends CrudRepository<Subscription> {}