import { Injectable } from '@angular/core'
import { INavItem } from '@app/interfaces'
import {
	CalendarCheckIcon,
	CalendarCogIcon,
	CalendarIcon,
	CalendarX2Icon,
	HouseIcon,
	HousePlusIcon,
	SettingsIcon,
	UsersIcon,
} from 'lucide-angular'

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	baseMenuItems: INavItem[] = [
		{
			name: 'Dashboard',
			icon: HouseIcon,
			view: '/app/dashboard',
		},
		{
			name: 'Hoy',
			icon: CalendarCheckIcon,
			view: '/app/appointments/today',
		},
		{
			name: 'Agenda',
			icon: CalendarIcon,
			view: '/app/appointments',
		},
		{
			name: 'Pacientes',
			icon: UsersIcon,
			view: '/app/patients',
		},
	]
	secondaryMenuItems: INavItem[] = [
		{
			name: 'Bloqueos de citas',
			icon: CalendarX2Icon,
			view: '/app/block-appointments',
		},
		{
			name: 'Horario de medico',
			icon: CalendarCogIcon,
			view: '/app/doctor-schedule',
		},
	]

	mobileMenuItems: INavItem[] = [
		{
			name: 'Hoy',
			icon: CalendarCheckIcon,
			view: '/app/appointments/today',
		},
		{
			name: 'Agenda',
			icon: CalendarIcon,
			view: '/app/appointments',
		},
		{
			name: 'Pacientes',
			icon: UsersIcon,
			view: '/app/patients',
		},
		{
			name: 'Configuración',
			icon: SettingsIcon,
			view: '/app/patients',
		},
	]

	getMobileMenuItems(): INavItem[] {
		return this.mobileMenuItems
	}
}
