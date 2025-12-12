import { Component } from '@angular/core'
import { UiButton, UiCard } from '@infra/ui/atoms'
import { LucideAngularModule, PencilIcon } from 'lucide-angular'

@Component({
	selector: 'app-tenant-detail-page',
	imports: [UiCard, UiButton, LucideAngularModule],
	templateUrl: './tenant-detail-page.html',
	styles: ``,
})
export class TenantDetailPage {
	pencil = PencilIcon
}
