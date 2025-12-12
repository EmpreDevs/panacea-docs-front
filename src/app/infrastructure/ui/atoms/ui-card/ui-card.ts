import { Component, input } from '@angular/core'

@Component({
	selector: 'app-ui-card',
	imports: [],
	templateUrl: './ui-card.html',
	styles: ``,
})
export class UiCard {
	shadow = input<boolean>(false)
	rounded = input<'3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | ''>('3xl')
	class = input<string>('')
}
