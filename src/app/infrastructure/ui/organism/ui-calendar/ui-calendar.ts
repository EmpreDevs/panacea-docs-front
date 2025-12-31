import { Component, computed, effect, inject, input, output } from '@angular/core'

import { ScreenSize, ScreenSizeService } from '@app/services'
import { FullCalendarModule } from '@fullcalendar/angular'
import { CalendarOptions, DateSelectArg, EventClickArg, EventDropArg, FormatterInput } from '@fullcalendar/core'
import esLocale from '@fullcalendar/core/locales/es'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'

import { Appointment } from '@domain/models'

import { CalendarMapper } from './calendar.mapper'
import { BusinessHours, CalendarView } from './calendar.types'

@Component({
	selector: 'app-ui-calendar',
	imports: [FullCalendarModule],
	templateUrl: './ui-calendar.html',
	styles: ``,
})
export class UiCalendar {
	sizeService = inject(ScreenSizeService)

	titleFormat = computed<FormatterInput>(() => {
		return this.sizeService.isMobile
			? { day: 'numeric', month: 'short', year: '2-digit' }
			: { month: 'long', year: 'numeric' }
	})
	sizeView = computed<CalendarView>(() => {
		return this.sizeService.isMobile ? 'listWeek' : this.view()
	})
	sizeViewport = computed(() => {
		return this.sizeService.currentSize
	})
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
		titleFormat: this.titleFormat(),
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
	constructor() {
		effect(() => {
			this.calendarOptions.headerToolbar =
				this.sizeViewport() === ScreenSize.MOBILE
					? {
							left: 'prev,next',
							right: 'title',
						}
					: this.sizeViewport() === ScreenSize.DESKTOP
						? {
								left: 'prev,next',
								center: 'title',
								right: 'timeGridDay,timeGridWeek,dayGridMonth', // user can switch between the two
							}
						: {
								left: 'prev,next,listWeek',
								center: 'title',
								right: 'timeGridDay,timeGridWeek,dayGridMonth', // user can switch between the two
							}
		})
	}

	ngOnInit(): void {
		const calendarMapper = new CalendarMapper()
		this.calendarOptions.events = calendarMapper.mapEvents(this.events())
		this.calendarOptions.businessHours = this.businessHours()
		this.calendarOptions.hiddenDays = this.hiddenDays()
		this.calendarOptions.slotDuration = this.slotDuration()
		this.calendarOptions.scrollTime = this.scrollTime()
		this.calendarOptions.initialView = this.sizeView()
	}
}
