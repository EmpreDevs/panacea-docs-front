import { Component } from '@angular/core'
import { UiButton, UiCard } from '@infra/ui/atoms'
import { LucideAngularModule, PlusIcon } from 'lucide-angular'

@Component({
	selector: 'app-users-detail-page',
	imports: [UiCard, UiButton, LucideAngularModule],
	templateUrl: './users-detail-page.html',
	styles: ``,
})
export class UsersDetailPage {
	plus = PlusIcon
}
