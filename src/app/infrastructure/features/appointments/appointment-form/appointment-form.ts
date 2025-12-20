import { Component, computed, effect, inject, input, output } from '@angular/core'
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
		estimation: [10, [Validators.required, Validators.min(10)]],
		patientId: ['', Validators.required],
		healthProviderId: [this.healthProviderId(), Validators.required],
		tenantId: [this.tenantId(), Validators.required],
		title: ['', Validators.required],
		properties: this.fb.control<Record<string, any> | undefined>(undefined),
	})

	mode = computed(() => (this.appointment() ? 'edit' : 'create'))

	constructor() {
		// Effect para actualizar el formulario cuando cambie startEvent o appointment
		effect(() => {
			const startDate = this.startEvent()
			const appointment = this.appointment()
			this.form.reset()

			// Si hay un appointment, rellenar el formulario con sus datos
			if (appointment) {
				this.form.patchValue({
					startDate: appointment.startDate,
					endDate: appointment.endDate,
					estimation: appointment.estimation,
					patientId: appointment.patientId,
					healthProviderId: appointment.healthProviderId,
					tenantId: appointment.tenantId,
					title: appointment.title,
					//properties: appointment.properties || {},
				})
			}
			// Si no hay appointment pero hay startEvent, actualizar las fechas
			else if (startDate !== null) {
				this.form.patchValue({
					startDate: startDate,
					endDate: startDate,
				})
			}
		})
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
		// Convertir null a undefined para properties si es necesario
		const formData = {
			...value,
			properties: value.properties ?? undefined,
		}
		this.formSubmit.emit(formData)
	}

	onPatientSelected(patient: Patient) {
		console.log(patient)
		this.form.patchValue({
			patientId: patient.id,
		})
	}
}
