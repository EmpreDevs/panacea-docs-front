export interface AuthResponseDto {
	accessToken: string
	user: {
		id: string
		username: string
		name: string
		email: string
		active: boolean
		roleId: string
		roleName: string
	}
}
