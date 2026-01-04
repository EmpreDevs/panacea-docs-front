import { Component, input } from '@angular/core'

import { UiIcon } from '@infra/ui/atoms'

@Component({
	selector: 'app-ui-loading-error',
	imports: [UiIcon],
	template: `<p class="text-gray-500 font-light text-sm flex items-center gap-2 justify-center">
		<app-ui-icon name="triangle-alert" [size]="18" />
		{{ message() }}
	</p> `,
	styles: ``,
})
export class UiLoadingError {
	message = input<string>('Hubo un error al cargar la información')
}
