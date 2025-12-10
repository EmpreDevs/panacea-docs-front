import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthFacade } from '@infra/store/facades'

@Component({
	selector: 'app-logout-page',
	imports: [],
	templateUrl: './logout-page.html',
	styles: ``,
})
export class LogoutPage {
	authFacade = inject(AuthFacade)
	router = inject(Router)

	ngOnInit(): void {
		this.authFacade.logout()
		this.router.navigate(['/'])
	}
}
