import { Component, computed, inject, input, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { Appointment, Patient } from '@domain/models'

import { CreateAppointmentDto, UpdateAppointmentDto } from '@infra/dto'
import { PatientSearch } from '@infra/pages/private/patients/components/patient-search/patient-search'
import { UiButton } from '@infra/ui/atoms'
import { UiInput, UiModalBody, UiModalFooter } from '@infra/ui/molecules'
import { UiModal } from '@infra/ui/organism'

@Component({
	selector: 'app-appointment-form',
	imports: [UiModal, UiModalBody, ReactiveFormsModule, UiModalFooter, PatientSearch, UiButton, UiInput],
	templateUrl: './appointment-form.html',
	styles: ``,
})
export class AppointmentForm {
	fb = inject(FormBuilder)

	appointment = input<Appointment | null>(null)
	startEvent = input<Date | null>(null)
	healthProviderId = input<string>()
	tenantId = input<string>()
	launchForm = input<boolean>(false)

	closeForm = output<void>()
	formSubmit = output<CreateAppointmentDto | UpdateAppointmentDto>()

	form = this.fb.nonNullable.group({
		startDate: [new Date(), Validators.required],
		endDate: [new Date(), Validators.required],
		estimation: [0, Validators.required],
		patientId: ['', Validators.required],
		healthProviderId: [this.healthProviderId(), Validators.required],
		tenantId: [this.tenantId(), Validators.required],
		title: ['', Validators.required],
		properties: [{}],
	})

	mode = computed(() => (this.appointment() ? 'edit' : 'create'))

	ngOnInit() {
		this.fillForm()
	}

	fillForm() {
		if (this.appointment()) {
		}
		if (this.startEvent() !== null) {
			this.form.patchValue({
				startDate: this.startEvent()!,
				endDate: this.startEvent()!,
			})
		}
	}

	closeModal() {
		this.closeForm.emit()
	}

	onSubmit() {
		console.log(this.form.value)

		if (!this.form.valid) {
			this.form.markAllAsTouched()
			return
		}
		const value = this.form.getRawValue()
		this.formSubmit.emit(value)
	}

	onPatientSelected(patient: Patient) {
		console.log(patient)
		this.form.patchValue({
			patientId: patient.id,
		})
	}
}
