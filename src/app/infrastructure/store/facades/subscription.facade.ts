import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { Subscription } from "@domain/models";
import { CreateSubscriptionUseCase, DeleteSubscriptionUseCase, FindAllSubscriptionsUseCase, FindSubscriptionByIdUseCase, UpdateSubscriptionUseCase } from "@app/use-cases";
import { SubscriptionState } from "../states";

@Injectable({ providedIn: 'root' })
export class SubscriptionFacade extends BaseFacade<Subscription>{
  constructor(
    createUseCase: CreateSubscriptionUseCase,
    findOneUseCase: FindSubscriptionByIdUseCase,
    findAllUseCase: FindAllSubscriptionsUseCase,
    updateUseCase: UpdateSubscriptionUseCase,
    deleteUseCase: DeleteSubscriptionUseCase,
    private readonly state: SubscriptionState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}