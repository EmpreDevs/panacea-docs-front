import { Component, inject } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular'
import { BreadcrumbService } from '@app/services'
import { UiBreadcrumbs } from '@infra/ui/molecules'
import { LyAside } from './components/ly-aside/ly-aside'
import { LyMenuMobile } from './components/ly-menu-mobile/ly-menu-mobile'
import { LyHeader } from './components/ly-header/ly-header'

@Component({
	selector: 'app-ui-layout-app',
	imports: [LucideAngularModule, UiBreadcrumbs, LyAside, LyMenuMobile, LyHeader],
	templateUrl: './ui-layout-app.html',
	styles: ``,
})
export class UiLayoutApp {
	breadcrumbService = inject(BreadcrumbService)
}
