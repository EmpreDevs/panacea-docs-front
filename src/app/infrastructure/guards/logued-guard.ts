import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthFacade } from '@infra/store/facades'

export const loguedGuard: CanActivateFn = (route, state) => {
	const authFacade = inject(AuthFacade)
	const router = inject(Router)
	const isLoggedIn = authFacade.isAuthenticated()
	console.log('logued guard ejecutado')
	console.log(route.toString())

	if (isLoggedIn()) {
		return true
	}

	router.navigate(['/auth'])

	return false
}
