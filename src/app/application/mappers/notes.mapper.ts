import { INotesFormDto } from '@app/interfaces/features'

import { CreateNotesDto, UpdateNotesDto } from '@infra/dto'

export class NotesMapper {
	toCreateDto(form: INotesFormDto): CreateNotesDto {
		return {
			date: form.date,
			observations: form.observations,
			content: form.content,
			patientId: form.patientId,
		}
	}

	toUpdateDto(form: INotesFormDto): UpdateNotesDto {
		return {
			date: form.date,
			observations: form.observations,
			content: form.content,
			patientId: form.patientId,
		}
	}
}
