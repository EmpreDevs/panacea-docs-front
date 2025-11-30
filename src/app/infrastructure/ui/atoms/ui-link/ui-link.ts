import { Component, computed, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LinkColor, LinkVariant } from './link.type'

@Component({
	selector: 'app-ui-link',
	imports: [RouterLink],
	templateUrl: './ui-link.html',
	styles: ``,
})
export class UiLink {
	link = input<string[]>([])
	variant = input<LinkVariant>('link')
	color = input<LinkColor>('primary')

	linkClasses = computed(() => {
		// Clases base comunes a todos los botones
		const baseClasses =
			this.variant() !== 'link'
				? 'flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer'
				: ''

		if (this.variant() === 'button') {
			switch (this.color()) {
				case 'health':
					return `${baseClasses} bg-health-600 text-white hover:bg-health-700 focus:ring-health-500`
				case 'primary':
					return `${baseClasses} bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500`
				case 'secondary':
					return `${baseClasses} bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500`
				case 'accent':
					return `${baseClasses} bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500`
				case 'success':
					return `${baseClasses} bg-success-500 text-white hover:bg-success-600 focus:ring-success-500`
				case 'error':
					return `${baseClasses} bg-error-500 text-white hover:bg-error-600 focus:ring-error-500`
				case 'warning':
					return `${baseClasses} bg-warning-500 text-white hover:bg-warning-600 focus:ring-warning-500`
				case 'info':
					return `${baseClasses} bg-primary-300 text-white hover:bg-primary-500 focus:ring-primary-500`
				case 'neutral':
					return `${baseClasses} bg-neutral-200 text-neutral-800 dark:bg-neutral-600 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 focus:ring-neutral-500`
				default:
					return `${baseClasses} bg-health-600 text-white hover:bg-health-700 focus:ring-health-500`
			}
		} else if (this.variant() === 'button-outline') {
			switch (this.color()) {
				case 'health':
					return `${baseClasses} border-2 border-health-500 text-health-500 bg-transparent hover:bg-health-50 dark:hover:bg-health-900 focus:ring-health-500`
				case 'primary':
					return `${baseClasses} border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900 focus:ring-primary-500`
				case 'secondary':
					return `${baseClasses} border-2 border-secondary-500 text-secondary-500 bg-transparent hover:bg-secondary-50 dark:hover:bg-secondary-900 focus:ring-secondary-500`
				case 'accent':
					return `${baseClasses} border-2 border-accent-500 text-accent-500 bg-transparent hover:bg-accent-50 dark:hover:bg-accent-900 focus:ring-accent-500`
				case 'success':
					return `${baseClasses} border-2 border-success-500 text-success-500 bg-transparent hover:bg-success-50 dark:hover:bg-success-900 focus:ring-success-500`
				case 'error':
					return `${baseClasses} border-2 border-error-500 text-error-500 bg-transparent hover:bg-error-50 dark:hover:bg-error-900 focus:ring-error-500`
				case 'warning':
					return `${baseClasses} border-2 border-warning-500 text-warning-500 bg-transparent hover:bg-warning-50 dark:hover:bg-warning-900 focus:ring-warning-500`
				case 'info':
					return `${baseClasses} border-2 border-primary-300 text-primary-400 bg-transparent hover:bg-primary-500 dark:hover:bg-primary-900 focus:ring-primary-500`
				case 'neutral':
					return `${baseClasses} border-2 border-neutral-400 text-neutral-600 dark:border-neutral-500 dark:text-neutral-400 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-neutral-500`
				default:
					return `${baseClasses} border-2 border-health-500 text-health-500 bg-transparent hover:bg-health-50 dark:hover:bg-health-900 focus:ring-health-500`
			}
		} else if (this.variant() === 'link') {
			switch (this.color()) {
				case 'health':
					return `${baseClasses} text-health-600 bg-transparent underline-offset-4 hover:underline`
				case 'primary':
					return `${baseClasses} text-primary-600 bg-transparent underline-offset-4 hover:underline`
				case 'secondary':
					return `${baseClasses} text-secondary-600 bg-transparent underline-offset-4 hover:underline`
				case 'accent':
					return `${baseClasses} text-accent-500 bg-transparent underline-offset-4 hover:underline`
				case 'success':
					return `${baseClasses} text-success-500 bg-transparent underline-offset-4 hover:underline`
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
