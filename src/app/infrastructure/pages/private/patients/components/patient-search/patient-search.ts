import { Component, computed, inject, input, output, signal } from '@angular/core'

import { Patient } from '@domain/models'

import { PatientFacade } from '@infra/store/facades'
import { UiAsyncSelect } from '@infra/ui/molecules'

@Component({
	selector: 'app-patient-search',
	imports: [UiAsyncSelect],
	templateUrl: './patient-search.html',
	styles: ``,
})
export class PatientSearch {
	private readonly patientFacade = inject(PatientFacade)

	tenantId = input<string>('')

	patientSelected = output<Patient>()

	isLoading = computed(() => this.patientFacade.loading$())
	patients = signal<Patient[]>([])
	selectedPatientId = signal<string | null>(null)

	async onSearch(searchTerm: string) {
		this.patients.set([])
		this.selectedPatientId.set(null)
		const patients = await this.patientFacade.searchPatients(searchTerm, this.tenantId())
		this.patients.set(patients)
	}

	onSelectPatient(patientId: string) {
		this.selectedPatientId.set(patientId)
		const patient = this.patients().find(patient => patient.id === patientId)
		if (patient) {
			this.patientSelected.emit(patient)
		}
	}

	onClearPatient() {
		this.selectedPatientId.set(null)
	}
}
