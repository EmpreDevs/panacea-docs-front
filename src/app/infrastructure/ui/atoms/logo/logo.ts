import { Component, computed, Input, input } from '@angular/core'
import { UiIsotipo } from '../ui-isotipo/ui-isotipo'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-logo',
	imports: [UiIsotipo, CommonModule],
	template: ` <div class="flex items-center space-x-3">
		<div class="relative">
			<app-ui-isotipo [size]="size()" />
		</div>
		<div>
			<h2 [ngClass]="clases()" class="font-sora text-2xl font-bold text-slate-800 dark:text-white">
				Panacea Docs
			</h2>
		</div>
	</div>`,
})
export class Logo {
	size = input<'md' | 'lg'>('lg')

	clases = computed(() => {
		switch (this.size()) {
			case 'md':
				return 'text-base'
			case 'lg':
				return 'text-3xl'
		}
	})
}
