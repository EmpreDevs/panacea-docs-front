// services/sync.service.ts
import { Injectable, inject } from '@angular/core';
import { PwaService } from './pwa.service';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SyncService {
  private pwaService = inject(PwaService);
  
  constructor() {
    this.initializeSync();
  }
  
  private initializeSync(): void {
    // Escuchar cuando vuelva la conexión
    fromEvent(window, 'online')
      .pipe(filter(() => this.hasPendingSync()))
      .subscribe(() => this.syncPendingData());
  }
  
  private hasPendingSync(): boolean {
    const pending = localStorage.getItem('pendingSync');
    return pending ? JSON.parse(pending).length > 0 : false;
  }
  
  private async syncPendingData(): Promise<void> {
    const pendingSync = JSON.parse(localStorage.getItem('pendingSync') || '[]');
    
    for (const item of pendingSync) {
      try {
        // Aquí llamarías a tu API según la operación
        await this.processSyncItem(item);
      } catch (error) {
        console.error('Error sincronizando:', error);
      }
    }
    
    // Limpiar después de sincronizar
    localStorage.removeItem('pendingSync');
  }
  
  private async processSyncItem(item: any): Promise<void> {
    // Implementar lógica de sincronización según la operación
    switch (item.operation) {
      case 'create':
        // Llamar al servicio correspondiente
        break;
      case 'update':
        // Llamar al servicio correspondiente
        break;
      case 'delete':
        // Llamar al servicio correspondiente
        break;
    }
  }
}