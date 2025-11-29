import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { TenantRepository } from "@domain/repositories";
import { TenantAdapter } from "@infra/adapters/tenant.adapter";
import { Tenant } from "@domain/models/tenant.model";

@Injectable()
export class TenantImpRepository extends BaseImpRepository<Tenant> implements TenantRepository {
  constructor(private readonly adapter: TenantAdapter) {
    super(adapter)
  }
}
