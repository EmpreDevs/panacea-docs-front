import { Schedule } from "@domain/models/schedule.model";
import { CrudRepository } from "./common/crud.repository";

export interface ScheduleRepository extends CrudRepository<Schedule> {}