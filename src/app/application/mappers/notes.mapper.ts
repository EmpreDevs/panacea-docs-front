import { NoteFormDto } from '@app/interfaces/features'

import { CreateNotesDto, UpdateNotesDto } from '@infra/dto'

export class NotesMapper {
	static toCreateDto(form: NoteFormDto, patientId: string, appointmentId: string): CreateNotesDto {
		return {
			date: form.date,
			type: form.type,
			content: form.content,
			patientId: patientId,
			appointmentId: appointmentId,
		}
	}

	static toUpdateDto(form: NoteFormDto): UpdateNotesDto {
		return {
			date: form.date,
			type: form.type,
			content: form.content,
		}
	}
}
