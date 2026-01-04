import { NotesFormDto } from '@app/interfaces/features'

import { CreateNotesDto, UpdateNotesDto } from '@infra/dto'

export class NotesMapper {
	static toCreateDto(form: NotesFormDto, patientId: string, appointmentId: string): CreateNotesDto {
		return {
			date: form.date,
			type: form.type,
			content: form.content,
			patientId: patientId,
			appointmentId: appointmentId,
		}
	}

	static toUpdateDto(form: NotesFormDto): UpdateNotesDto {
		return {
			date: form.date,
			type: form.type,
			content: form.content,
		}
	}
}
