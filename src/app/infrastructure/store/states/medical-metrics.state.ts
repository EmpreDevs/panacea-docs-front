import { Injectable } from "@angular/core";
import { BaseState } from "./common/base.state";
import { MedicalMetrics } from "@domain/models";

@Injectable({ providedIn: 'root' })
export class MedicalMetricsState extends BaseState<MedicalMetrics> {

  constructor() {
    super({ storable: true, storageKey: 'medical-metrics'})
  }
}