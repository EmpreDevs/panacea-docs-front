import { Component } from '@angular/core'

import { UiCard, UiH2, UiIcon } from '@infra/ui/atoms'
import { UiAccordion } from '@infra/ui/molecules'
import { UiChart } from '@infra/ui/molecules/ui-chart/ui-chart'

@Component({
	selector: 'app-patient-vitals-list-page',
	imports: [UiCard, UiAccordion, UiIcon, UiH2, UiChart],
	templateUrl: './patient-vitals-list-page.html',
	styles: ``,
})
export class PatientVitalsListPage {}
