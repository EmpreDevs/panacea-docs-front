import { Component, signal, HostListener } from '@angular/core'
import { NgClass } from '@angular/common'
import { ChevronDownIcon, ChevronUpIcon, LucideAngularModule } from 'lucide-angular'

@Component({
	selector: 'app-ui-user-dropdown',
	imports: [NgClass, LucideAngularModule],
	templateUrl: './ui-user-dropdown.html',
	styles: ``,
})
export class UiUserDropdown {
	isOpen = signal(false)
	chevronDown = ChevronDownIcon
	chevronUp = ChevronUpIcon

	toggleDropdown() {
		this.isOpen.set(!this.isOpen())
	}

	closeDropdown() {
		this.isOpen.set(false)
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent) {
		const target = event.target as HTMLElement
		const dropdown = document.querySelector('.user-dropdown-container')

		if (dropdown && !dropdown.contains(target)) {
			this.closeDropdown()
		}
	}
}
