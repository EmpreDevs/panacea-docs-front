export const PATIENT_PATHS = {
	ROOT: 'patients',
	DETAIL_RAW: 'detail/:id',
	NEW: 'new',
	toDetail: (id: string | number) => ['detail', id],
}
