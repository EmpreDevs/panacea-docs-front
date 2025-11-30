import { Component, computed, input, Input } from '@angular/core'
import { ButtonColor, ButtonType, ButtonVariant } from './button.type'
import { NgClass } from '@angular/common'

@Component({
	selector: 'app-ui-button',
	imports: [NgClass],
	templateUrl: './ui-button.html',
})
export class UiButton {
	@Input({ required: true }) type: ButtonType = 'submit'
	@Input() disabled = false
	variant = input<ButtonVariant>('solid')
	color = input<ButtonColor>('health')

	clasesBtn = computed(() => {
		// Clases base comunes a todos los botones
		const baseClasses =
			'flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer'

		if (this.variant() === 'solid') {
			switch (this.color()) {
				case 'health':
					return `${baseClasses} bg-health-600 text-white hover:bg-health-700 focus:ring-health-500`
				case 'indigo':
					return `${baseClasses} bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500`
				case 'error':
					return `${baseClasses} bg-error-500 text-white hover:bg-error-600 focus:ring-error-500`
				case 'warning':
					return `${baseClasses} bg-warning-500 text-white hover:bg-warning-600 focus:ring-warning-500`
				case 'info':
					return `${baseClasses} bg-info-500 text-white hover:bg-info-600 focus:ring-info-500`
				case 'neutral':
					return `${baseClasses} bg-neutral-200 text-neutral-800 dark:bg-neutral-600 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 focus:ring-neutral-500`
				default:
					return `${baseClasses} bg-health-600 text-white hover:bg-health-700 focus:ring-health-500`
			}
		} else if (this.variant() === 'outline') {
			switch (this.color()) {
				case 'health':
					return `${baseClasses} border-2 border-health-500 text-health-500 bg-transparent hover:bg-health-50 dark:hover:bg-health-900 focus:ring-health-500`
				case 'indigo':
					return `${baseClasses} border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900 focus:ring-primary-500`
				case 'error':
					return `${baseClasses} border-2 border-error-500 text-error-500 bg-transparent hover:bg-error-50 dark:hover:bg-error-900 focus:ring-error-500`
				case 'warning':
					return `${baseClasses} border-2 border-warning-500 text-warning-500 bg-transparent hover:bg-warning-50 dark:hover:bg-warning-900 focus:ring-warning-500`
				case 'info':
					return `${baseClasses} border-2 border-info-500 text-info-500 bg-transparent hover:bg-info-50 dark:hover:bg-info-900 focus:ring-info-500`
				case 'neutral':
					return `${baseClasses} border-2 border-neutral-400 text-neutral-600 dark:border-neutral-500 dark:text-neutral-400 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-neutral-500`
				default:
					return `${baseClasses} border-2 border-health-500 text-health-500 bg-transparent hover:bg-health-50 dark:hover:bg-health-900 focus:ring-health-500`
			}
		} else if (this.variant() === 'link') {
			switch (this.color()) {
				case 'health':
					return `${baseClasses} text-health-500 bg-transparent underline-offset-4 hover:underline`
				case 'indigo':
					return `${baseClasses} text-primary-500 bg-transparent underline-offset-4 hover:underline`
				case 'error':
					return `${baseClasses} text-error-500 bg-transparent underline-offset-4 hover:underline`
				case 'warning':
					return `${baseClasses} text-warning-500 bg-transparent underline-offset-4 hover:underline`
				case 'info':
					return `${baseClasses} text-info-500 bg-transparent underline-offset-4 hover:underline`
				case 'neutral':
					return `${baseClasses} text-neutral-500 dark:text-neutral-400 bg-transparent underline-offset-4 hover:underline`
				default:
					return `${baseClasses} text-health-500 bg-transparent underline-offset-4 hover:underline`
			}
		}

		return baseClasses
	})
}
