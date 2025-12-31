import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'

import { getAppPath } from '@app/helpers/route-builder'
import { PatientFormDto } from '@app/interfaces/features'
import { PatientMapper } from '@app/mappers'
import { APP_ROUTES } from '@shared/constants'

import { CreatePatientDto } from '@infra/dto'
import { PatientForm } from '@infra/features/patient'
import { PatientFacade } from '@infra/store/facades'
import { UiCard } from '@infra/ui/atoms'

@Component({
	selector: 'app-patient-create-page',
	imports: [UiCard, PatientForm],
	templateUrl: './patient-create-page.html',
	styles: ``,
})
export class PatientCreatePage {
	private readonly patienFacade = inject(PatientFacade)
	private readonly router = inject(Router)
	private readonly rootPath = getAppPath(APP_ROUTES.patients.root)

	loading$ = this.patienFacade.loading$()

	async savePatient(dto: PatientFormDto) {
		const payload: CreatePatientDto = PatientMapper.toCreateDto(dto)
		const patient = await this.patienFacade.create(payload)
		this.router.navigate([this.rootPath, APP_ROUTES.patients.details(patient.id)])
	}
}
