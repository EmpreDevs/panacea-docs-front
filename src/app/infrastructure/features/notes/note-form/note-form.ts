import { Component, inject, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'

import { NoteFormDto } from '@app/interfaces/features'

import { UiSelect } from '@infra/ui/molecules'
import { SelectOption } from '@infra/ui/molecules/ui-select/select.type'

@Component({
	selector: 'app-note-form',
	imports: [ReactiveFormsModule, UiSelect],
	templateUrl: './note-form.html',
	styles: ``,
})
export class NoteForm {
	private fb = inject(FormBuilder)

	Submit = output<NoteFormDto>()

	form = this.fb.nonNullable.group({
		date: [new Date()],
		type: [''],
		content: [''],
	})
	noteTypes: SelectOption[] = [
		{ value: 'Cirugía', label: 'Cirugía' },
		{ value: 'Consulta', label: 'Consulta' },
		{ value: 'Diagnóstico', label: 'Diagnóstico' },
		{ value: 'Evolución', label: 'Evolución' },
		{ value: 'Examen', label: 'Examen' },
		{ value: 'Post operación', label: 'Post operación' },
		{ value: 'Revisión', label: 'Revisión' },
		{ value: 'Tratamiento', label: 'Tratamiento' },
		{ value: 'Urgencia', label: 'Urgencia' },
	]

	submit() {
		if (!this.form.valid) {
			this.form.markAllAsTouched()
			return
		}
		this.Submit.emit(this.form.getRawValue())
	}
}
