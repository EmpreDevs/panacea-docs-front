import { Component, computed, input } from '@angular/core'

@Component({
	selector: 'app-ui-avatar',
	imports: [],
	templateUrl: './ui-avatar.html',
	styles: ``,
})
export class UiAvatar {
	src = input<string | null>(null)
	alt = input<string | null>(null)
	legend = input<string | null>(null)
	rounded = input<boolean>(false)
	color = input<string | null>(null)

	capitalize = computed(() => {
		const legend = this.legend()
		if (!legend) return ''

		const words = legend.trim().split(/\s+/)
		if (words.length === 0) return ''

		const firstWord = words[0]
		let firstLetter = firstWord.charAt(0).toUpperCase()

		let secondLetter = ''
		if (words.length > 1) {
			secondLetter = words[1].charAt(0).toUpperCase()
		} else if (firstWord.length > 1) {
			secondLetter = firstWord.charAt(1).toUpperCase()
		}

		return secondLetter ? `${firstLetter}${secondLetter}` : firstLetter
	})

	classes = computed(() => {
		const classes = ['w-10 h-10']
		if (this.rounded()) {
			classes.push('rounded-full')
		} else {
			classes.push('rounded-base')
		}
		if (this.color()) {
			classes.push(`${this.color()}`)
		}
		return classes.join(' ')
	})
}
