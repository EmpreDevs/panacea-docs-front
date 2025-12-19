import { Component, computed, input } from '@angular/core'

import { ChevronDownIcon, FrownIcon, LoaderCircleIcon, LucideAngularModule, SearchIcon, XIcon } from 'lucide-angular'

import { IconName } from './icon.type'

@Component({
	selector: 'app-ui-icon',
	imports: [LucideAngularModule],
	template: ` <lucide-angular [img]="icon()" [size]="size()" /> `,
})
export class UiIcon {
	name = input<IconName>('close')
	size = input<number>(24)

	icon = computed(() => {
		const icons: Record<string, any> = {
			close: XIcon,
			'loader-circle': LoaderCircleIcon,
			search: SearchIcon,
			'chevron-down': ChevronDownIcon,
			frown: FrownIcon,
		}

		return icons[this.name()]
	})
}
