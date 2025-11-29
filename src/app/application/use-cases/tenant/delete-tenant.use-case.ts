import { Tenant } from "@domain/models/tenant.model";
import { DeleteUseCase } from "../common";
import { Inject, Injectable } from "@angular/core";
import { tenantToken } from "@infra/di/tokens";
import { TenantRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteTenantUseCase extends DeleteUseCase<Tenant> {
  constructor(
    @Inject(tenantToken)
    private readonly repository: TenantRepository) {
    super(repository)
  }
}
