import { HealthProviderSchedule } from "@domain/models/health-provider-schedule.model";
import { CrudRepository } from "./common/crud.repository";

export interface HealthProviderScheduleRepository extends CrudRepository<HealthProviderSchedule> {}