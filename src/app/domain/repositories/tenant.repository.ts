import { Tenant } from "@domain/models/tenant.model";
import { CrudRepository } from "./common/crud.repository";

export interface TenantRepository extends CrudRepository<Tenant> {}
