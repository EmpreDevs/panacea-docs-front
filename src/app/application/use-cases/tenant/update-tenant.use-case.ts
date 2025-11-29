import { Inject, Injectable } from "@angular/core";
import { UpdateUseCase } from "../common";
import { Tenant } from "@domain/models/tenant.model";
import { tenantToken } from "@infra/di/tokens";
import { TenantRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateTenantUseCase extends UpdateUseCase<Tenant> {
  constructor(
    @Inject(tenantToken)
    private readonly repository: TenantRepository) {
    super(repository)
  }
}
