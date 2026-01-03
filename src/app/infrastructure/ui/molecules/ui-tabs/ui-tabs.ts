import { Component, EventEmitter, Input, Output, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

import { UiIcon } from '@infra/ui/atoms'

import { Tab } from './tab.type'

@Component({
	selector: 'app-ui-tabs',
	imports: [UiIcon, RouterLink, RouterLinkActive],
	templateUrl: './ui-tabs.html',
	styles: ``,
})
export class UiTabs {
	@Input({ required: true }) tabs: Tab[] = []
	@Input() type: 'button' | 'link' = 'button'
	@Input() defaultActive?: string

	@Output() tabChange = new EventEmitter<string>()

	activeTab = signal<string>('')

	ngOnInit() {
		if (this.defaultActive) {
			this.activeTab.set(this.defaultActive)
		} else if (this.tabs.length > 0) {
			this.activeTab.set(this.tabs[0].value)
		}
	}

	selectTab(tab: Tab) {
		if (tab.disabled) return

		this.activeTab.set(tab.value)
		this.tabChange.emit(tab.value)
	}

	isActive(value: string): boolean {
		return this.activeTab() === value
	}
}
