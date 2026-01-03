import { Component } from '@angular/core'

import { UiCard, UiH2, UiIcon } from '@infra/ui/atoms'
import { UiAccordion } from '@infra/ui/molecules'

@Component({
	selector: 'app-patient-vitals-list-page',
	imports: [UiCard, UiAccordion, UiIcon, UiH2],
	templateUrl: './patient-vitals-list-page.html',
	styles: ``,
})
export class PatientVitalsListPage {}
