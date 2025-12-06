import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
	isDevMode,
} from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideServiceWorker } from '@angular/service-worker'
import { diProvider } from '@infra/di/di.provider'
import { provideToastr } from 'ngx-toastr'

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimations(),
		...diProvider,
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000',
		}),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000',
		}),

		provideToastr({
			timeOut: 3000,
			positionClass: 'toast-top-right',
			preventDuplicates: true,
			progressBar: true,
		}),
	],
}
