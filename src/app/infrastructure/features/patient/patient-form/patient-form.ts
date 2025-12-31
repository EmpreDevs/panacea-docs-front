import { Component, effect, inject, input, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { CreatePatientDto, UpdatePatientDto } from '@infra/dto'
import { UiButton, UiIcon } from '@infra/ui/atoms'
import { UiFormGroup, UiInput, UiSelect } from '@infra/ui/molecules'

@Component({
	selector: 'app-patient-form',
	imports: [ReactiveFormsModule, UiFormGroup, UiInput, UiFormGroup, UiSelect, UiButton, UiIcon],
	templateUrl: './patient-form.html',
	styles: ``,
})
export class PatientForm {
	fb = inject(FormBuilder)
	healthProviderId = input<string>('')

	formSubmit = output<CreatePatientDto | UpdatePatientDto>()

	form = this.fb.nonNullable.group({
		firstName: ['', [Validators.required]],
		lastName: ['', [Validators.required]],
		email: ['', [Validators.email]],
		phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
		address: ['', [Validators.required]],
		dateBirth: [new Date(), [Validators.required]],
		gender: ['', [Validators.required]],
		healthProviderId: [''],
	})

	genderOptions = [
		{ label: 'Masculino', value: 'male' },
		{ label: 'Femenino', value: 'female' },
		{ label: 'Otro', value: 'other' },
	]

	constructor() {
		effect(() => {
			this.form.patchValue({ healthProviderId: this.healthProviderId() })
		})
	}

	submit() {
		if (!this.form.valid) {
			this.form.markAllAsTouched()
			return
		}
		const value = this.form.getRawValue()
		this.formSubmit.emit(value)
	}
}
