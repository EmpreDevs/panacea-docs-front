export const PATIENT_PATHS = {
	ROOT: 'patients',
	DETAIL: 'detail/:id',
	NEW: 'new',
	toDetail: (id: string) => `detail/${id}`,
}
