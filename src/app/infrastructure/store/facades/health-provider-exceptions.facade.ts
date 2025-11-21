import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { HealthProviderExceptions } from "@domain/models";
import { CreateHealthProviderExceptionsUseCase, DeleteHealthProviderExceptionsUseCase, FindAllHealthProviderExceptionsUseCase, FindHealthProviderExceptionsByIdUseCase, UpdateHealthProviderExceptionsUseCase } from "@app/use-cases";
import { HealthProviderExceptionsState } from "../states";

@Injectable({ providedIn: 'root' })
export class HealthProviderExceptionsFacade extends BaseFacade<HealthProviderExceptions>{
  constructor(
    createUseCase: CreateHealthProviderExceptionsUseCase,
    findOneUseCase: FindHealthProviderExceptionsByIdUseCase,
    findAllUseCase: FindAllHealthProviderExceptionsUseCase,
    updateUseCase: UpdateHealthProviderExceptionsUseCase,
    deleteUseCase: DeleteHealthProviderExceptionsUseCase,
    private readonly state: HealthProviderExceptionsState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}