import { Speciality } from "@domain/models/speciality.model";
import { FindAllUseCase } from "../common";
import { Inject, Injectable } from "@angular/core";
import { specialityToken } from "@infra/di/tokens";
import { SpecialtyRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindAllSpecialitiesUseCase extends FindAllUseCase<Speciality> {
  constructor(
    @Inject(specialityToken) 
    private readonly repository: SpecialtyRepository) {
    super(repository)
  }
}