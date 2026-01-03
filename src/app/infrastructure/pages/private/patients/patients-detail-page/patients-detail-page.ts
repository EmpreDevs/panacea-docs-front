import { Component, inject, input } from '@angular/core'
import { ActivatedRoute, RouterOutlet } from '@angular/router'

import { getAppPath } from '@app/helpers/route-builder'
import { APP_ROUTES } from '@shared/constants'
import { filter, map } from 'rxjs'

import { Patient } from '@domain/models'

import { PatientDetail } from '@infra/features/patient'
import { PatientFacade } from '@infra/store/facades'
import { UiButton, UiCard, UiH2, UiIcon } from '@infra/ui/atoms'
import { UiModalBody } from '@infra/ui/molecules'
import { Tab } from '@infra/ui/molecules/ui-tabs/tab.type'
import { UiTabs } from '@infra/ui/molecules/ui-tabs/ui-tabs'
import { UiModal } from '@infra/ui/organism'

@Component({
	selector: 'app-patients-detail-page',
	imports: [UiCard, UiH2, PatientDetail, UiButton, UiIcon, UiTabs, UiModal, UiModalBody, RouterOutlet],
	templateUrl: './patients-detail-page.html',
	styles: ``,
})
export class PatientsDetailPage {
	patientFacade = inject(PatientFacade)
	route = inject(ActivatedRoute)

	id = ''

	tabs: Tab[] = [
		{
			label: 'Notas',
			value: 'notes',
			icon: 'notebook-pen',
			link: getAppPath(APP_ROUTES.patients.root, this.id),
		},
		{
			label: 'Citas',
			value: 'appointments',
			icon: 'calendar',
			link: getAppPath(APP_ROUTES.patients.root),
		},
		{
			label: 'Signos Vitales',
			value: 'vitals',
			icon: 'heart-pulse',
			link: getAppPath(APP_ROUTES.patients.root),
		},
	]

	Patient = input<Patient>(
		new Patient({
			id: '7b2a1-45c8',
			firstName: 'Juan',
			lastName: 'Pérez',
			email: 'juan.perez@email.com',
			phone: '+52 55 1234 5678',
			address: 'Av. Reforma 123, Ciudad de México',
			dateBirth: new Date(1985, 4, 15), // 15 de Mayo de 1985
			healthProviderId: '1',
			gender: 'male',
		}),
	)

	constructor() {
		this.route.paramMap
			.pipe(
				map(params => params.get('id')),
				filter(id => !!id),
			)
			.subscribe(id => {
				this.id = id ?? ''
				this.loadTabs()
			})
	}

	loadTabs() {
		this.tabs = [
			{
				label: 'Notas',
				value: 'notes',
				icon: 'notebook-pen',
				link: getAppPath(APP_ROUTES.patients.root, APP_ROUTES.patients.notes(this.id)),
			},
			{
				label: 'Citas',
				value: 'appointments',
				icon: 'calendar',
				link: getAppPath(APP_ROUTES.patients.root, APP_ROUTES.patients.appointments(this.id)),
			},
			{
				label: 'Signos Vitales',
				value: 'vitals',
				icon: 'heart-pulse',
				link: getAppPath(APP_ROUTES.patients.root, APP_ROUTES.patients.vitals(this.id)),
			},
		]
	}
}
