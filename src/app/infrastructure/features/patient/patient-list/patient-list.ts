import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Patient } from '@domain/models'

import { UiAvatar } from '@infra/ui/atoms'

@Component({
	selector: 'app-patient-list',
	imports: [UiAvatar, RouterLink],
	templateUrl: './patient-list.html',
	styles: ``,
})
export class PatientList {
	patients = input<Patient[]>([])
	linkdetails = input<(id: string) => any[]>(() => [])
}
