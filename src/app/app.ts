import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'
import { SyncService } from '@infra/pwa/services/sync.service'

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
})
export class App {
	private db = inject(OfflineDBService)
	private syncService = inject(SyncService)

	async ngOnInit() {
		console.log('🚀 PWA con IndexedDB iniciada')

		// Limpiar datos antiguos al inicio
		await this.syncService.cleanup()
	}
}
