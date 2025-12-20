import { Component } from '@angular/core'

@Component({
	selector: 'app-ui-form-group',
	imports: [],
	template: `
		<div class="flex flex-col gap-2 w-full mb-2">
			<ng-content></ng-content>
		</div>
	`,
	styles: ``,
})
export class UiFormGroup {}
