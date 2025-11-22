// services/sync.service.ts
import { Injectable, inject } from '@angular/core';
import { PwaService } from './pwa.service';
import { fromEvent, interval, Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { OfflineDBService } from './offline-db.service';
import { SYNC_CONFIG } from '../database/db.schema';
import { HttpClient } from '@infra/http/http.client';
import { environment } from '@envs/environment';
import { ResponseDTO } from '@infra/dto/api/response.dto';

@Injectable({ providedIn: 'root' })
export class SyncService {
  private pwa = inject(PwaService)
  private db = inject(OfflineDBService)
  private http = inject(HttpClient)

  private syncInProgress = false;
  private syncSubject = new Subject<void>();
  
  constructor() {
    this.initializeAutoSync();
  }
  
  // 🚀 INICIALIZAR SINCRONIZACIÓN AUTOMÁTICA
  private initializeAutoSync(): void {
    // 1. Sincronizar cuando vuelva la conexión
    fromEvent(window, 'online')
      .pipe(debounceTime(2000)) // Esperar 2s para estabilizar
      .subscribe(() => {
        console.log('🌐 Conexión restaurada - iniciando sincronización');
        this.sync();
      });
    
    // 2. Sincronización periódica cada 5 minutos
    interval(5 * 60 * 1000)
      .pipe(filter(() => this.pwa.isOnline()))
      .subscribe(() => {
        console.log('⏰ Sincronización periódica');
        this.sync();
      });
    
    // 3. Sincronizar al inicio si hay conexión
    setTimeout(() => {
      if (this.pwa.isOnline()) {
        this.sync();
      }
    }, 5000); // Esperar 5s después del inicio
  }
  
  // 🔄 SINCRONIZAR OPERACIONES PENDIENTES
  async sync(): Promise<void> {
    // Evitar sincronizaciones simultáneas
    if (this.syncInProgress) {
      console.log('⏸️ Sincronización ya en progreso');
      return;
    }
    
    if (!this.pwa.isOnline()) {
      console.log('📵 Sin conexión - no se puede sincronizar');
      return;
    }
    
    this.syncInProgress = true;
    
    try {
      // Obtener estadísticas
      const stats = await this.db.getStats();
      
      if (stats.pendingOperations === 0) {
        console.log('✅ No hay operaciones pendientes');
        return;
      }
      
      console.log(`📤 Sincronizando ${stats.pendingOperations} operaciones...`);
      
      // Obtener operaciones pendientes en lotes
      const operations = await this.db.getPendingOperations(
        'pending',
        SYNC_CONFIG.BATCH_SIZE
      );
      
      let successCount = 0;
      let failureCount = 0;
      
      // Procesar cada operación
      for (const operation of operations) {
        try {
          // Marcar como sincronizando
          await this.db.updateOperationStatus(
            operation.id!,
            'syncing'
          );
          
          // Ejecutar la operación
          await this.executeOperation(operation);
          
          // Marcar como exitosa
          await this.db.updateOperationStatus(
            operation.id!,
            'success'
          );
          
          // Opcional: eliminar después del éxito
          await this.db.deleteOperation(operation.id!);
          
          successCount++;
          
        } catch (error: any) {
          failureCount++;
          
          // Si alcanzó el máximo de reintentos, marcar como fallida
          if (operation.attempts >= SYNC_CONFIG.MAX_RETRIES) {
            await this.db.updateOperationStatus(
              operation.id!,
              'failed',
              error.message
            );
            console.error(`❌ Operación ${operation.id} falló definitivamente:`, error);
          } else {
            // Volver a pending para reintentar después
            await this.db.updateOperationStatus(
              operation.id!,
              'pending',
              error.message
            );
            console.warn(`⚠️ Operación ${operation.id} falló, se reintentará:`, error);
          }
        }
      }
      
      console.log(`✅ Sincronización completada: ${successCount} exitosas, ${failureCount} fallidas`);
      
      // Si quedan más operaciones, programar otra sincronización
      const remaining = await this.db.getPendingOperations('pending', 1);
      if (remaining.length > 0) {
        setTimeout(() => this.sync(), SYNC_CONFIG.RETRY_DELAY);
      }
      
    } catch (error) {
      console.error('❌ Error en sincronización:', error);
    } finally {
      this.syncInProgress = false;
      this.syncSubject.next();
    }
  }
  
  // 🔧 EJECUTAR UNA OPERACIÓN ESPECÍFICA
  private async executeOperation(operation: any): Promise<void> {
    // Aquí deberías inyectar tu servicio HTTP o usar el HttpClient
    // Este es un ejemplo genérico
    
    const baseUrl = environment.apiUrl;
    const url = `${baseUrl}/${operation.entity}`;
    
    let response: ResponseDTO<any>;
    
    switch (operation.operation) {
      case 'create':
      response  = await this.http.post(url)
                          .body(operation.payload)
                          .execute()
        break;
        
      case 'update':
        const updateUrl = `${url}/${operation.metadata?.originalId}`;
        response = await this.http.put(updateUrl)
                      .body(operation.payload)
                      .execute()
        break;
        
      case 'delete':
        const deleteUrl = `${url}/${operation.metadata?.originalId}`;
        response = await this.http.delete(deleteUrl)
                      .execute()
        break;
        
      default:
        throw new Error(`Operación no soportada: ${operation.operation}`);
    }
    
    if (!response) {
      //const error = await response.text();
      //throw new Error(`HTTP ${response.status}: ${error}`);
    }
    
    return response.data;
  }
  
  // 📊 OBTENER ESTADO DE SINCRONIZACIÓN
  async getSyncStatus() {
    return await this.db.getStats();
  }
  
  // 🔄 FORZAR SINCRONIZACIÓN MANUAL
  async forceSync(): Promise<void> {
    console.log('🔄 Sincronización manual solicitada');
    await this.sync();
  }
  
  // 🧹 LIMPIAR OPERACIONES ANTIGUAS
  async cleanup(): Promise<void> {
    await this.db.cleanOldOperations(7); // 7 días
    await this.db.cleanExpiredCache();
  }
}