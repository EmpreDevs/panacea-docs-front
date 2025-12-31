import { Component } from '@angular/core'

import { PatientForm } from '@infra/features/patient'
import { UiCard } from '@infra/ui/atoms'

@Component({
	selector: 'app-patient-create-page',
	imports: [UiCard, PatientForm],
	templateUrl: './patient-create-page.html',
	styles: ``,
})
export class PatientCreatePage {}
