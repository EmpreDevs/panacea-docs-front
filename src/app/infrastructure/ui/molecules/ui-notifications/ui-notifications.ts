import { Component } from '@angular/core'
import { BellIcon, LucideAngularModule } from 'lucide-angular'

@Component({
	selector: 'app-ui-notifications',
	imports: [LucideAngularModule],
	templateUrl: './ui-notifications.html',
	styles: ``,
})
export class UiNotifications {
	notification = BellIcon
}
