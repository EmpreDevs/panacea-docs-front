import { Speciality } from "@domain/models/speciality.model";
import { DeleteUseCase } from "../common";
import { Inject, Injectable } from "@angular/core";
import { specialityToken } from "@infra/di/tokens";
import { SpecialtyRepository } from "@domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteSpecialityUseCase extends DeleteUseCase<Speciality> {
  constructor(
    @Inject(specialityToken) 
    private readonly repository: SpecialtyRepository) {
    super(repository)
  }
}