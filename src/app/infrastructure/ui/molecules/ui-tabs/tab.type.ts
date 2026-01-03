import { IconName } from '@infra/ui/atoms/ui-icon/icon.type'

export interface Tab {
	label: string
	value: string
	icon?: IconName
	link?: string
	disabled?: boolean
}
