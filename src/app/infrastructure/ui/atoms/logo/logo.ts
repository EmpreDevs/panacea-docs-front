import { Component, input } from '@angular/core'
import { UiIsotipo } from '../ui-isotipo/ui-isotipo'

@Component({
	selector: 'app-logo',
	imports: [UiIsotipo],
	template: ` <div class="flex items-center space-x-3 breathe">
		<div class="relative">
			<app-ui-isotipo />
		</div>
		<div>
			<h2 class="font-sora text-2xl font-bold text-slate-800 dark:text-white">Panacea Docs</h2>
		</div>
	</div>`,
})
export class Logo {}
