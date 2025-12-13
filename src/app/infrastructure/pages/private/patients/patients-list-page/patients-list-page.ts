import { Component } from '@angular/core'
import { UiButton, UiCard } from '@infra/ui/atoms'
import { LucideAngularModule, SearchIcon } from 'lucide-angular'

@Component({
	selector: 'app-patients-list-page',
	imports: [UiCard, UiButton, LucideAngularModule],
	templateUrl: './patients-list-page.html',
	styles: ``,
})
export class PatientsListPage {
	search = SearchIcon
}
