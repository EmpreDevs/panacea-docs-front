import { Component } from '@angular/core'
import { UiCard, UiButton } from '@infra/ui/atoms'
import { LucideAngularModule, PencilIcon } from 'lucide-angular'

@Component({
	selector: 'app-medical-office-detail-page',
	imports: [UiCard, UiButton, LucideAngularModule],
	templateUrl: './medical-office-detail-page.html',
	styles: ``,
})
export class MedicalOfficeDetailPage {
	pencil = PencilIcon
}
