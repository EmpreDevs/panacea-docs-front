import { inject, Injectable } from "@angular/core";
import { Schedule } from "@domain/models/schedule.model";
import { ScheduleRepository } from "@domain/repositories";
import { BaseAdapter } from "./common/base.adapter";
import { HttpClient } from "@infra/http/http.client";
import { environment } from "@envs/environment";

@Injectable({ providedIn: 'root' })
export class ScheduleAdapter extends BaseAdapter<Schedule> implements ScheduleRepository{
  private readonly apiUrl = `${environment.apiUrl}/schedules`

  constructor(private readonly http: HttpClient) {
    super(http, 'schedules')
  }
}