import { Component, computed, inject, signal } from '@angular/core'
import { NgClass } from '@angular/common'
import {
	CalendarCheckIcon,
	CalendarIcon,
	LucideAngularModule,
	LucideIconData,
	SettingsIcon,
	UsersIcon,
} from 'lucide-angular'
import { INavItem } from '@app/interfaces'
import { MenuService } from '@app/services'

@Component({
	selector: 'app-ly-menu-mobile',
	imports: [NgClass, LucideAngularModule],
	templateUrl: './ly-menu-mobile.html',
	styles: ``,
})
export class LyMenuMobile {
	private menuService = inject(MenuService)
	navItems: INavItem[] = []

	activeView = signal<string>('citasHoy')

	// Definición de los elementos de navegación (Lucide Icons)

	// Señal calculada para obtener el título de la vista actual
	currentViewTitle = computed(() => {
		const activeItem = this.navItems.find(item => item.view === this.activeView())
		return activeItem ? activeItem.name : 'Vista Desconocida'
	})

	ngOnInit(): void {
		this.navItems = this.menuService.getMobileMenuItems()
	}

	/**
	 * Actualiza la vista activa al hacer clic en un elemento del menú.
	 * @param view La clave de la vista a activar.
	 */
	setActiveView(view: string) {
		this.activeView.set(view)
	}
}
