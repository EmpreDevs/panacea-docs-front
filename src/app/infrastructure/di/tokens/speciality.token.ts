import { InjectionToken } from "@angular/core";
import { SpecialtyRepository } from "@domain/repositories";

export const specialityToken = new InjectionToken<SpecialtyRepository>('SPECIALITY_TOKEN')