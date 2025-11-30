import { NgClass } from '@angular/common'
import { Component, computed, inject, signal } from '@angular/core'
import {
	CalendarCheckIcon,
	CalendarIcon,
	LucideIconData,
	SettingsIcon,
	UsersIcon,
	LucideAngularModule,
} from 'lucide-angular'
import { Logo, UiIsotipo, UiDarkmode } from '@infra/ui/atoms'
import { BreadcrumbService } from '@app/services'
import { UiBreadcrumbs } from '@infra/ui/molecules'

interface NavItem {
	name: string
	icon: string
	view: string
}

@Component({
	selector: 'app-ui-layout-app',
	imports: [NgClass, LucideAngularModule, UiIsotipo, Logo, UiDarkmode, UiBreadcrumbs],
	templateUrl: './ui-layout-app.html',
	styles: ``,
})
export class UiLayoutApp {
	breadcrumbService = inject(BreadcrumbService)
	// Estado para la vista activa, usando Angular Signals
	activeView = signal<string>('citasHoy')

	// Definición de los elementos de navegación (Lucide Icons)
	navItems: NavItem[] = [
		{
			name: 'Hoy',
			icon: 'calendar-check',
			view: 'citasHoy',
		},
		{
			name: 'Agenda',
			icon: 'calendar',
			view: 'agenda',
		},
		{
			name: 'Pacientes',
			icon: 'users',
			view: 'pacientes',
		},
		{
			name: 'Configuración',
			icon: 'settings',
			view: 'configuracion',
		},
	]

	// Señal calculada para obtener el título de la vista actual
	currentViewTitle = computed(() => {
		const activeItem = this.navItems.find(item => item.view === this.activeView())
		return activeItem ? activeItem.name : 'Vista Desconocida'
	})

	/**
	 * Actualiza la vista activa al hacer clic en un elemento del menú.
	 * @param view La clave de la vista a activar.
	 */
	setActiveView(view: string) {
		this.activeView.set(view)
	}

	/**
	 * Genera el SVG del icono de Lucide correspondiente.
	 * En una aplicación real, usarías un componente de iconos.
	 * Aquí usamos SVG en línea para mantenerlo en un solo archivo.
	 * @param iconName El nombre del icono.
	 * @returns El string SVG.
	 */
	getIcon(iconName: string): LucideIconData {
		const icons: { [key: string]: LucideIconData } = {
			'calendar-check': CalendarCheckIcon,
			calendar: CalendarIcon,
			users: UsersIcon,
			settings: SettingsIcon,
		}
		return icons[iconName] || '' // Devuelve un string vacío si el icono no existe
	}
}
