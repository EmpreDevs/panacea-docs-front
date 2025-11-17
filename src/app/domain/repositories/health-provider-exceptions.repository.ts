import { HealthProviderExceptions } from "@domain/models/health-provider-exceptions.model";
import { CrudRepository } from "./common/crud.repository";

export interface HealthProviderExceptionsRepository extends CrudRepository<HealthProviderExceptions> {}