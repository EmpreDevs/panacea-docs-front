import { Component, computed, input } from '@angular/core'

import {
	ActivityIcon,
	CalendarClockIcon,
	CalendarIcon,
	CalendarPlusIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	FrownIcon,
	HeartPulseIcon,
	LoaderCircleIcon,
	LucideAngularModule,
	Maximize2Icon,
	NotebookPenIcon,
	PencilIcon,
	PlusIcon,
	SaveIcon,
	SearchIcon,
	Trash2Icon,
	TriangleAlertIcon,
	WeightIcon,
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
			check: CheckIcon,
			'calendar-clock': CalendarClockIcon,
			'chevron-up': ChevronUpIcon,
			'calendar-plus': CalendarPlusIcon,
			'notebook-pen': NotebookPenIcon,
			calendar: CalendarIcon,
			'heart-pulse': HeartPulseIcon,
			activity: ActivityIcon,
			weight: WeightIcon,
			'maximize-2': Maximize2Icon,
			'triangle-alert': TriangleAlertIcon,
		}

		return icons[this.name()]
	})
}
