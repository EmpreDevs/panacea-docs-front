import { Component, input } from '@angular/core'
import { FileStack, LucideAngularModule } from 'lucide-angular'

@Component({
	selector: 'app-ui-isotipo',
	imports: [LucideAngularModule],
	templateUrl: './ui-isotipo.html',
	styles: ``,
})
export class UiIsotipo {
	light = input<boolean>(false)
	LogoPanacea = FileStack
}
