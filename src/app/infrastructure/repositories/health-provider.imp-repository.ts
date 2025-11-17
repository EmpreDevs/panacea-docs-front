import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { HealthProviderRepository } from "@domain/repositories";
import { HealthProviderAdapter } from "@infra/adapters/health-provider.adapter";
import { HealthProvider } from "@domain/models/health-provider.model";

@Injectable()
export class HealthProviderImpRepository extends BaseImpRepository<HealthProvider> implements HealthProviderRepository {
  constructor(private readonly adapter: HealthProviderAdapter) {
    super(adapter)
  }
}