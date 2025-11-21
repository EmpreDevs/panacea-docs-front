import { Injectable } from "@angular/core";
import { BaseFacade } from "./common/base.facade";
import { MedicalMetrics } from "@domain/models";
import { CreateMedicalMetricsUseCase, DeleteMedicalMetricsUseCase, FindAllMedicalMetricsUseCase, FindMedicalMetricsByIdUseCase, UpdateMedicalMetricsUseCase } from "@app/use-cases";
import { MedicalMetricsState } from "../states";

@Injectable({ providedIn: 'root' })
export class MedicalMetricsFacade extends BaseFacade<MedicalMetrics>{
  constructor(
    createUseCase: CreateMedicalMetricsUseCase,
    findOneUseCase: FindMedicalMetricsByIdUseCase,
    findAllUseCase: FindAllMedicalMetricsUseCase,
    updateUseCase: UpdateMedicalMetricsUseCase,
    deleteUseCase: DeleteMedicalMetricsUseCase,
    private readonly state: MedicalMetricsState,
  ){
    super(createUseCase, findOneUseCase, findAllUseCase, updateUseCase, deleteUseCase, state)
  }
}