import { Component, input, output } from '@angular/core'
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core'
import { FullCalendarModule } from '@fullcalendar/angular'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es'
import { BusinessHours, CalendarView } from './calendar.types'
import { CalendarMapper } from './calendar.mapper'
import { Appointment } from '@domain/models'
import { EventClickArg, EventDropArg } from '@fullcalendar/core'

@Component({
	selector: 'app-ui-calendar',
	imports: [FullCalendarModule],
	templateUrl: './ui-calendar.html',
	styles: ``,
})
export class UiCalendar {
	// inputs
	view = input<CalendarView>('listWeek')
	slotDuration = input<string>('00:10:00')
	scrollTime = input<string>('08:00')
	hiddenDays = input<number[]>([0])
	businessHours = input<BusinessHours[]>([])
	events = input<Appointment[]>([])

	// outputs
	eventClick = output<EventClickArg>()
	eventDrop = output<EventDropArg>()
	select = output<DateSelectArg>()

	calendarOptions: CalendarOptions = {
		hiddenDays: [0],
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
		events: [],
		eventDisplay: 'block',
		eventColor: '#378006',
		eventBackgroundColor: '#378006',
		eventTextColor: '#fff',
		eventClick: arg => {
			this.eventClick.emit(arg)
		},
		eventDrop: arg => {
			this.eventDrop.emit(arg)
		},
		eventResize: arg => {},
		select: arg => {
			this.select.emit(arg)
		},
	}

	ngOnInit(): void {
		const calendarMapper = new CalendarMapper()
		this.calendarOptions.events = calendarMapper.mapEvents(this.events())
		this.calendarOptions.businessHours = this.businessHours()
		this.calendarOptions.hiddenDays = this.hiddenDays()
		this.calendarOptions.slotDuration = this.slotDuration()
		this.calendarOptions.scrollTime = this.scrollTime()
		this.calendarOptions.initialView = this.view()
	}
}
