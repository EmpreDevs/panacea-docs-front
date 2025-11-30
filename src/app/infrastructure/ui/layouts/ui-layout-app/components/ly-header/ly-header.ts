import { Component } from '@angular/core'
import { UiDarkmode, UiIsotipo } from '@infra/ui/atoms'
import { UiNotifications, UiUserDropdown } from '@infra/ui/molecules'

@Component({
	selector: 'app-ly-header',
	imports: [UiIsotipo, UiDarkmode, UiNotifications, UiUserDropdown],
	templateUrl: './ly-header.html',
	styles: ``,
})
export class LyHeader {}
