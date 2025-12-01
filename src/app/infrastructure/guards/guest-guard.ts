import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router'
import { AuthFacade } from '@infra/store/facades'

export const guestGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	const authFacade = inject(AuthFacade)
	const router = inject(Router)
	const isAuthenticated = authFacade.isAuthenticated()

	console.log('guest guard ejecutado')

	if (!isAuthenticated()) {
		return true
	}
	router.navigate(['/app'])

	return false
}
