import { Component } from '@angular/core'

@Component({
	selector: 'app-ui-h2',
	imports: [],
	template: `<h2 class="text-base/7 font-semibold">
		<ng-content></ng-content>
	</h2>`,
	styles: ``,
})
export class UiH2 {}
