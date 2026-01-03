import { Component, Input, signal } from '@angular/core'

import { UiIcon } from '@infra/ui/atoms'

@Component({
	selector: 'app-ui-accordion',
	imports: [UiIcon],
	templateUrl: './ui-accordion.html',
})
export class UiAccordion {
	@Input({ required: true }) title = ''
	@Input() defaultOpen = false

	isOpen = signal(false)

	ngOnInit() {
		this.isOpen.set(this.defaultOpen)
	}

	toggle() {
		this.isOpen.update(open => !open)
	}
}
