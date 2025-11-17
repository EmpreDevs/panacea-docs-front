import { Speciality } from "@domain/models/speciality.model";
import { CrudRepository } from "./common/crud.repository";

export interface SpecialtyRepository extends CrudRepository<Speciality> {}