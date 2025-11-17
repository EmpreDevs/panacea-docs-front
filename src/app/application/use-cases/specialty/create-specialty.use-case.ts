import { Inject, Injectable } from "@angular/core";
import { CreateUseCase } from "../common";
import { Speciality } from "@domain/models/speciality.model";
import { specialityToken } from "@infra/di/tokens";
import { SpecialtyRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class CreateSpecialityUseCase extends CreateUseCase<Speciality> {
  constructor(
    @Inject(specialityToken) 
    private readonly repository: SpecialtyRepository) {
    super(repository)
  }
}