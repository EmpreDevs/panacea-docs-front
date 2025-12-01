import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthState } from '@infra/store/states/auth.state'
import { toObservable } from '@angular/core/rxjs-interop'
import { filter, map, take } from 'rxjs'

export const loguedGuard: CanActivateFn = (route, state) => {
	const authState = inject(AuthState)
	const router = inject(Router)
	const isLoading$ = toObservable(authState.isLoading)

	// 2. Esperar a que la carga inicial termine (isLoading se vuelva false)
	return isLoading$.pipe(
		filter(isLoading => isLoading === false), // Espera hasta que isLoading sea false
		take(1), // Solo necesitamos el primer valor después de la carga
		map(() => {
			// 3. Evaluar el estado de autenticación SÓLO después de la carga
			const isAuthenticated = authState.isAuthenticated()

			if (isAuthenticated) {
				return true
			}

			router.navigate(['/auth'])
			return false
		}),
	)
}
