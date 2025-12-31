import { NotesFormDto } from '@app/interfaces/features'

import { CreateNotesDto, UpdateNotesDto } from '@infra/dto'

export class NotesMapper {
	static toCreateDto(form: NotesFormDto): CreateNotesDto {
		return {
			date: form.date,
			observations: form.observations,
			content: form.content,
			patientId: form.patientId,
		}
	}

	static toUpdateDto(form: NotesFormDto): UpdateNotesDto {
		return {
			date: form.date,
			observations: form.observations,
			content: form.content,
			patientId: form.patientId,
		}
	}
}
