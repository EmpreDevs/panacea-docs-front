import { Inject, Injectable } from "@angular/core";
import { FindById } from "../common";
import { Speciality } from "@domain/models/speciality.model";
import { specialityToken } from "@infra/di/tokens";
import { SpecialtyRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class FindSpecialityByIdUseCase extends FindById<Speciality> {
  constructor(
    @Inject(specialityToken) 
    private readonly repository: SpecialtyRepository) {
    super(repository)
  }
}