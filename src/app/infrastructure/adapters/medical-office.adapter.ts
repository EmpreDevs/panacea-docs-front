import { inject, Injectable } from "@angular/core";
import { MedicalOffice } from "@domain/models/medical-office.model";
import { MedicalOfficeRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";

@Injectable({ providedIn: 'root' })
export class MedicalOfficeAdapter extends BaseAdapter<MedicalOffice> implements MedicalOfficeRepository{
  private readonly apiUrl = `${environment.apiUrl}/medical-offices`

  constructor(private readonly http: HttpClient) {
    super(http, 'medical-offices')
  }
}