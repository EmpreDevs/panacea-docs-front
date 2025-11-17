import { Inject, Injectable } from "@angular/core";
import { FindAllUseCase } from "../common";
import { HealthProviderExceptions } from "@domain/models/health-provider-exceptions.model";
import { healthProviderExceptionsToken } from "@infra/di/tokens";
import { HealthProviderExceptionsRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindAllHealthProviderExceptionsUseCase extends FindAllUseCase<HealthProviderExceptions> {
  constructor(
    @Inject(healthProviderExceptionsToken) 
    private readonly repository: HealthProviderExceptionsRepository) {
    super(repository)
  }
}