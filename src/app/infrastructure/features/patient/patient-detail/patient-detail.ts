import { Component, input } from '@angular/core'

import { Patient } from '@domain/models'

@Component({
	selector: 'app-patient-detail',
	imports: [],
	templateUrl: './patient-detail.html',
	styles: ``,
})
export class PatientDetail {
	Patient = input<Patient>()
}
