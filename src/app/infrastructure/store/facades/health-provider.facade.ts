import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { HealthProvider } from "@domain/models";
import { CreateHealthProviderUseCase, DeleteHealthProviderUseCase, FindAllHealthProvidersUseCase, FindHealthProviderByIdUseCase, UpdateHealthProviderUseCase } from "@app/use-cases";
import { HealthProviderState } from "../states";

@Injectable({ providedIn: 'root' })
export class HealthProviderFacade extends BaseFacade<HealthProvider>{
  constructor(
    createUseCase: CreateHealthProviderUseCase,
    findOneUseCase: FindHealthProviderByIdUseCase,
    findAllUseCase: FindAllHealthProvidersUseCase,
    updateUseCase: UpdateHealthProviderUseCase,
    deleteUseCase: DeleteHealthProviderUseCase,
    private readonly state: HealthProviderState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}