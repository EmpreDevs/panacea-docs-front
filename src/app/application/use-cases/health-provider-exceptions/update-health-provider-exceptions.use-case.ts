import { Inject, Injectable } from "@angular/core";
import { UpdateUseCase } from "../common";
import { HealthProviderExceptions } from "@domain/models/health-provider-exceptions.model";
import { healthProviderExceptionsToken } from "@infra/di/tokens";
import { HealthProviderExceptionsRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateHealthProviderExceptionsUseCase extends UpdateUseCase<HealthProviderExceptions> {
  constructor(
    @Inject(healthProviderExceptionsToken) 
    private readonly repository: HealthProviderExceptionsRepository) {
    super(repository)
  }
}