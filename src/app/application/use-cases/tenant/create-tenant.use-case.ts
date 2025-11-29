import { Inject, Injectable } from "@angular/core";
import { CreateUseCase } from "../common";
import { Tenant } from "@domain/models/tenant.model";
import { tenantToken } from "@infra/di/tokens";
import { TenantRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class CreateTenantUseCase extends CreateUseCase<Tenant> {
  constructor(
    @Inject(tenantToken)
    private readonly repository: TenantRepository) {
    super(repository)
  }
}
