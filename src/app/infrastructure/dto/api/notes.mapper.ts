import { Note } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { NotesResponseDto } from './notes-response.dto'

export class NotesMapper implements IMapper<Note, NotesResponseDto> {
	toModel(data: NotesResponseDto): Note {
		return new Note({
			id: data.id,
			date: data.date,
			type: data.note_type,
			content: data.content,
			patientId: data.patientId,
			appointmentId: data.appointmentId,
		})
	}

	toDto(data: Note): NotesResponseDto {
		return {
			id: data.id,
			date: data.date,
			note_type: data.type,
			content: data.content,
			patientId: data.patientId,
			appointmentId: data.appointmentId,
		}
	}
}
