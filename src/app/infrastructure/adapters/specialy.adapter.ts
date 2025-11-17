import { inject, Injectable } from "@angular/core";
import { Speciality } from "@domain/models/speciality.model";
import { SpecialtyRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";

@Injectable({ providedIn: 'root' })
export class SpecialtyAdapter extends BaseAdapter<Speciality> implements SpecialtyRepository{
  private readonly apiUrl = `${environment.apiUrl}/specialties`

  constructor(private readonly http: HttpClient) {
    super(http, 'specialties')
  }
}