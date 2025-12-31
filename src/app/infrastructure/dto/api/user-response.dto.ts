export interface UserResponseDto {
	id: string
	username: string
	name: string
	email: string
	roleId: string
	roleName: string
	avatar?: string
	preferences?: any
}
