import { Component, computed, inject, input, output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Appointment } from '@domain/models'

@Component({
	selector: 'app-appointment-form',
	imports: [],
	templateUrl: './appointment-form.html',
	styles: ``,
})
export class AppointmentForm {
	fb = inject(FormBuilder)

	appointment = input<Appointment | null>(null)
	startEvent = input<Date>()
	healthProviderId = input<string>()
	tenantId = input<string>()
	launchView = input<boolean>(false)

	closeView = output<void>()
	formSubmit = output<Appointment>()

	form = this.fb.nonNullable.group({
		title: ['', [Validators.required]],
		startDate: [this.startEvent(), [Validators.required]],
		endDate: [this.startEvent(), [Validators.required]],
		estimation: ['', [Validators.required]],
		patientId: ['', [Validators.required]],
		healthProviderId: [this.healthProviderId(), [Validators.required]],
		tenantId: [this.tenantId(), [Validators.required]],
		properties: ['', [Validators.required]],
	})

	mode = computed(() => (this.appointment() ? 'edit' : 'create'))

	closeModal() {
		this.closeView.emit()
	}

	onSubmit() {
		if (!this.form.valid) {
			this.form.markAllAsTouched()
			return
		}

		const data: Appointment = {
			id: '',
			...this.form.getRawValue(),
		}

		if (this.mode() === 'edit') {
			this.formSubmit.emit({
				...data,
				id: this.appointment()!.id,
			})
		} else {
			this.formSubmit.emit(data)
		}
	}
}
