import { Component, inject, OnInit } from '@angular/core'
import { ChevronRightIcon, LucideAngularModule } from 'lucide-angular'
import { HouseIcon } from 'lucide-angular'
import { Breadcrumb, BreadcrumbService } from '@app/services'
import { UiLink } from '@infra/ui/atoms'

@Component({
	selector: 'app-ui-breadcrumbs',
	imports: [LucideAngularModule, UiLink],
	templateUrl: './ui-breadcrumbs.html',
	styles: ``,
})
export class UiBreadcrumbs implements OnInit {
	breadcrumbService = inject(BreadcrumbService)
	breadcrumbs: Breadcrumb[] = []
	home = HouseIcon
	chevronRight = ChevronRightIcon

	ngOnInit(): void {
		this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
			this.breadcrumbs = breadcrumbs
		})
	}
}
