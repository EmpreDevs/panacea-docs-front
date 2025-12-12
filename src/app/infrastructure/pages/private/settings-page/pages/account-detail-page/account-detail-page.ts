import { Component } from '@angular/core'
import { UiCard, UiButton } from '@infra/ui/atoms'
import { LucideAngularModule, PencilIcon } from 'lucide-angular'

@Component({
	selector: 'app-account-detail-page',
	imports: [UiCard, UiButton, LucideAngularModule],
	templateUrl: './account-detail-page.html',
	styles: ``,
})
export class AccountDetailPage {
	pencil = PencilIcon
}
