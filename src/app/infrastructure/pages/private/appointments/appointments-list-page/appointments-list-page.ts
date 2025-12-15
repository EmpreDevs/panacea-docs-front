import { Component } from '@angular/core'
import { CalendarOptions } from '@fullcalendar/core'
import { FullCalendarModule } from '@fullcalendar/angular'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import { UiCard } from '@infra/ui/atoms'
import esLocale from '@fullcalendar/core/locales/es'

@Component({
	selector: 'app-appointments-list-page',
	imports: [FullCalendarModule, UiCard],
	templateUrl: './appointments-list-page.html',
	styles: ``,
})
export class AppointmentsListPage {
	calendarOptions: CalendarOptions = {
		initialView: 'listWeek',
		hiddenDays: [0],
		slotDuration: '00:10:00',
		scrollTime: '08:00',
		businessHours: [
			{
				daysOfWeek: [1, 2, 3], // Monday, Tuesday, Wednesday
				startTime: '08:00', // 8am
				endTime: '18:00', // 6pm
			},
			{
				daysOfWeek: [4, 5, 6], // Thursday, Friday
				startTime: '10:00', // 10am
				endTime: '16:00', // 4pm
			},
		],
		themeSystem: 'bootstrap5',
		locale: esLocale,
		plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin, listPlugin],
		droppable: true,
		editable: true,
		selectable: true,
		height: 'calc(100vh - 250px)',
		headerToolbar: {
			left: 'prev,next,listWeek',
			center: 'title',
			right: 'timeGridDay,timeGridWeek,dayGridMonth', // user can switch between the two
		},
		navLinks: true,
		events: [
			{ title: 'event 1', date: '2025-12-12', description: 'description for All Day Event' },
			{ title: 'event 2', date: '2025-12-13' },
			{ title: 'event 2', date: '2026-01-14' },
			{ title: 'event 2', date: '2026-02-15' },
			{ title: 'event 2', date: '2026-03-16' },
			{ title: 'event 2', date: '2026-04-17' },
		],
		eventDisplay: 'block',
		eventColor: '#378006',
		eventBackgroundColor: '#378006',
		eventTextColor: '#fff',
		eventClick: arg => {
			console.log(arg)
		},
		eventDrop: arg => {
			console.log(arg)
		},
		eventResize: arg => {
			console.log(arg)
		},
		select: arg => {
			console.log(arg)
		},
	}

	handleDateClick(arg: any) {
		alert('date click! ' + arg.dateStr)
	}
}
