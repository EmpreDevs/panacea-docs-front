import { Notes } from '@domain/models'

import { IMapper } from '@infra/dto/common/mapper.interface'

import { NotesResponseDto } from './notes-response.dto'

export class NotesMapper implements IMapper<Notes, NotesResponseDto> {
	toModel(data: NotesResponseDto): Notes {
		return new Notes({
			id: data.id,
			date: data.date,
			observations: data.observations,
			content: data.content,
			patientId: data.patientId,
		})
	}

	toDto(data: Notes): NotesResponseDto {
		return {
			id: data.id,
			date: data.date,
			observations: data.observations,
			content: data.content,
			patientId: data.patientId,
		}
	}
}
