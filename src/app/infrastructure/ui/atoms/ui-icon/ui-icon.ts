import { Component, computed, input } from '@angular/core'

import {
	ChevronDownIcon,
	FrownIcon,
	LoaderCircleIcon,
	LucideAngularModule,
	PencilIcon,
	PlusIcon,
	SaveIcon,
	SearchIcon,
	Trash2Icon,
	XIcon,
} from 'lucide-angular'

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
			pencil: PencilIcon,
			save: SaveIcon,
			trash: Trash2Icon,
			plus: PlusIcon,
		}

		return icons[this.name()]
	})
}
