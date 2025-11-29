import { Component, computed, input } from '@angular/core'
import { FileStack, LucideAngularModule } from 'lucide-angular'
import { NgClass } from '@angular/common'

@Component({
	selector: 'app-ui-isotipo',
	imports: [LucideAngularModule, NgClass],
	templateUrl: './ui-isotipo.html',
	styles: ``,
})
export class UiIsotipo {
	light = input<boolean>(false)
	size = input<'md' | 'lg'>('lg')
	LogoPanacea = FileStack

	sizeIcon = computed(() => {
		switch (this.size()) {
			case 'md':
				return 18
			case 'lg':
				return 32
		}
	})

	clasesContainer = computed(() => {
		switch (this.size()) {
			case 'md':
				return 'w-8 h-8 rounded'
			case 'lg':
				return 'w-12 h-12 rounded-2xl'
		}
	})
}
