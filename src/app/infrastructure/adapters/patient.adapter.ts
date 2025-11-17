import { inject, Injectable } from "@angular/core";
import { Patient } from "@domain/models/patient.model";
import { PatientRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";

@Injectable({ providedIn: 'root' })
export class PatientAdapter extends BaseAdapter<Patient> implements PatientRepository{
  private readonly apiUrl = `${environment.apiUrl}/patients`

  constructor(private readonly http: HttpClient) {
    super(http, 'patients')
  }
}