import { HealthProvider } from "@domain/models/health-provider.model";
import { CrudRepository } from "./common/crud.repository";

export interface HealthProviderRepository extends CrudRepository<HealthProvider> {}