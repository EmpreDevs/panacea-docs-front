export const getAppPath = (...segments: string[]): string => {
	return ['/app', ...segments].join('/')
}

export const getAuthPath = (...segments: string[]): string => {
	return ['auth', ...segments].join('/')
}
