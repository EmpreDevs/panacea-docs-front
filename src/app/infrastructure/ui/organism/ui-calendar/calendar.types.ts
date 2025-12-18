export type CalendarView = 'listWeek' | 'timeGridDay' | 'timeGridWeek' | 'dayGridMonth'
export interface BusinessHours {
	daysOfWeek: number[]
	startTime: string
	endTime: string
}
