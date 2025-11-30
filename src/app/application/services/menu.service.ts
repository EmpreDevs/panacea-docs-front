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
			view: '/dashboard',
		},
		{
			name: 'Hoy',
			icon: CalendarCheckIcon,
			view: '/today',
		},
		{
			name: 'Agenda',
			icon: CalendarIcon,
			view: '/appointments',
		},
		{
			name: 'Pacientes',
			icon: UsersIcon,
			view: '/patients',
		},
	]
	secondaryMenuItems: INavItem[] = [
		{
			name: 'Info. consultorio',
			icon: HousePlusIcon,
			view: '/medical-office',
		},
		{
			name: 'Bloqueos de citas',
			icon: CalendarX2Icon,
			view: '/block-appointments',
		},
		{
			name: 'Horario de medico',
			icon: CalendarCogIcon,
			view: '/doctor-schedule',
		},
	]

	mobileMenuItems: INavItem[] = [
		{
			name: 'Hoy',
			icon: CalendarCheckIcon,
			view: '/today',
		},
		{
			name: 'Agenda',
			icon: CalendarIcon,
			view: '/today',
		},
		{
			name: 'Pacientes',
			icon: UsersIcon,
			view: '/patients',
		},
		{
			name: 'Configuración',
			icon: SettingsIcon,
			view: '/patients',
		},
	]

	getMobileMenuItems(): INavItem[] {
		return this.mobileMenuItems
	}
}
