import { Component, inject } from '@angular/core'

import { getAppPath } from '@app/helpers/route-builder'
import { APP_ROUTES } from '@shared/constants'
import { LucideAngularModule } from 'lucide-angular'

import { Patient } from '@domain/models'

import { PatientList } from '@infra/features/patient'
import { PatientFacade } from '@infra/store/facades'
import { UiCard, UiIcon, UiLink } from '@infra/ui/atoms'
import { UiSearchQuery } from '@infra/ui/molecules'

@Component({
	selector: 'app-patients-list-page',
	imports: [UiCard, LucideAngularModule, PatientList, UiSearchQuery, UiLink, UiIcon],
	templateUrl: './patients-list-page.html',
	styles: ``,
})
export class PatientsListPage {
	patienFacade = inject(PatientFacade)

	patients: Patient[] = []
	routeDetails = (id: string) => [getAppPath(APP_ROUTES.patients.root, APP_ROUTES.patients.details(id))]
	routeCreate = [getAppPath(APP_ROUTES.patients.root, APP_ROUTES.patients.create)]

	async ngOnInit() {
		this.patients = await this.patienFacade.searchPatients('', '')
	}
}
