export interface IMapper<Domain, DTO> {
	toModel(data: DTO): Domain
	toDto(data: Domain): DTO
}
