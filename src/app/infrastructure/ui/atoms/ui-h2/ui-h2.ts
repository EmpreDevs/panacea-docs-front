import { NgClass } from '@angular/common'
import { Component, input } from '@angular/core'

@Component({
	selector: 'app-ui-h2',
	imports: [NgClass],
	template: `<h2 class="text-base/7 font-semibold" [ngClass]="className()">
		<ng-content></ng-content>
	</h2>`,
	styles: ``,
})
export class UiH2 {
	className = input<string>('')
}
