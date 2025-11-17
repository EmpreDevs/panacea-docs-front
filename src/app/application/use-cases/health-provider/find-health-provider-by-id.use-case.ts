import { Inject, Injectable } from "@angular/core";
import { HealthProvider } from "@domain/models/health-provider.model";
import { healthProviderToken } from "@infra/di/tokens";
import { HealthProviderRepository } from "@domain/repositories";
import { FindByIdUseCase } from "../common";

@Injectable({providedIn: 'root'})
export class FindHealthProviderByIdUseCase extends FindByIdUseCase<HealthProvider> {
  constructor(
    @Inject(healthProviderToken) 
    private readonly repository: HealthProviderRepository) {
    super(repository)
  }
}