import { Inject, Injectable } from "@angular/core";
import { UpdateUseCase } from "../common";
import { HealthProvider } from "@domain/models/health-provider.model";
import { healthProviderToken } from "@infra/di/tokens";
import { HealthProviderRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateHealthProviderUseCase extends UpdateUseCase<HealthProvider> {
  constructor(
    @Inject(healthProviderToken) 
    private readonly repository: HealthProviderRepository) {
    super(repository)
  }
}