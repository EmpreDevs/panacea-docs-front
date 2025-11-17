import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { HealthProviderExceptionsRepository } from "@domain/repositories";
import { HealthProviderExceptionsAdapter } from "@infra/adapters/health-provider-exceptions.adapter";
import { HealthProviderExceptions } from "@domain/models/health-provider-exceptions.model";

@Injectable()
export class HealthProviderExceptionsImpRepository extends BaseImpRepository<HealthProviderExceptions> implements HealthProviderExceptionsRepository {
  constructor(private readonly adapter: HealthProviderExceptionsAdapter) {
    super(adapter)
  }
}