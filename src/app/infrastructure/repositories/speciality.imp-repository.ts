import { Injectable } from "@angular/core";
import { BaseImpRepository } from "./common/base.imp-repository";
import { SpecialtyRepository } from "@domain/repositories";
import { SpecialtyAdapter } from "@infra/adapters/specialy.adapter";
import { Speciality } from "@domain/models/speciality.model";

@Injectable()
export class SpecialityImpRepository extends BaseImpRepository<Speciality> implements SpecialtyRepository {
  constructor(private readonly adapter: SpecialtyAdapter) {
    super(adapter)
  }
}