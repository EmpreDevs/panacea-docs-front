// sync-monitor.component.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OfflineDBService } from '@infra/pwa/services/offline-db.service';
import { SyncService } from '@infra/pwa/services/sync.service';
import { PwaService } from '@infra/pwa/services';

@Component({
  selector: 'app-sync-monitor',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (showMonitor) {
    <div class="sync-monitor">
      <div class="sync-header">
        <span class="sync-title">Estado de Sincronización</span>
        <button class="close-btn" (click)="showMonitor = false">✕</button>
      </div>
      
      <div class="sync-stats">
        <div class="stat-item">
          <span class="stat-label">Pendientes:</span>
          <span class="stat-value" [class.has-pending]="stats.pendingOperations > 0">
            {{ stats.pendingOperations }}
          </span>
        </div>
        
        <div class="stat-item">
          <span class="stat-label">Fallidas:</span>
          <span class="stat-value" [class.has-failed]="stats.failedOperations > 0">
            {{ stats.failedOperations }}
          </span>
        </div>
        
        <div class="stat-item">
          <span class="stat-label">Cache:</span>
          <span class="stat-value">{{ stats.cacheSize }}</span>
        </div>
        
        <div class="stat-item">
          <span class="stat-label">Estado:</span>
          <span class="stat-value" [class.online]="isOnline()" [class.offline]="!isOnline()">
            {{ isOnline() ? 'En línea' : 'Sin conexión' }}
          </span>
        </div>
      </div>
      
      <div class="sync-actions">
        <button 
          class="sync-btn"
          (click)="forceSync()"
          [disabled]="!isOnline() || syncing">
          {{ syncing ? 'Sincronizando...' : 'Sincronizar Ahora' }}
        </button>
        
        <button 
          class="clear-btn"
          (click)="clearCache()">
          Limpiar Cache
        </button>
      </div>
      
      <div class="sync-info" *ngIf="stats.oldestPending">
        <small>Operación más antigua: {{ formatDate(stats.oldestPending) }}</small>
      </div>
    </div>
  }
    
  @if(!showMonitor && (stats.pendingOperations > 0 || stats.failedOperations > 0)){
    <button 
      class="sync-fab"
      (click)="showMonitor = true">
      <span class="fab-badge">{{ stats.pendingOperations + stats.failedOperations }}</span>
      🔄
    </button>
  }
  `,
  styles: [`
    .sync-monitor {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      padding: 16px;
      width: 320px;
      z-index: 1000;
      animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .sync-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .sync-title {
      font-weight: 600;
      font-size: 16px;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #666;
    }
    
    .sync-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
      padding: 8px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    
    .stat-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }
    
    .stat-value {
      font-size: 20px;
      font-weight: 600;
    }
    
    .stat-value.has-pending {
      color: #ff9800;
    }
    
    .stat-value.has-failed {
      color: #f44336;
    }
    
    .stat-value.online {
      color: #4caf50;
    }
    
    .stat-value.offline {
      color: #f44336;
    }
    
    .sync-actions {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    
    .sync-btn, .clear-btn {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .sync-btn {
      background: #1976d2;
      color: white;
    }
    
    .sync-btn:hover:not(:disabled) {
      background: #1565c0;
    }
    
    .sync-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .clear-btn {
      background: #ff5722;
      color: white;
    }
    
    .clear-btn:hover {
      background: #f4511e;
    }
    
    .sync-info {
      text-align: center;
      color: #666;
    }
    
    .sync-fab {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #ff9800;
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 999;
      position: relative;
    }
    
    .fab-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #f44336;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }
  `]
})
export class SyncMonitorComponent implements OnInit, OnDestroy {
  private db = inject(OfflineDBService);
  private sync = inject(SyncService);
  private pwa = inject(PwaService);
  
  private destroy$ = new Subject<void>();
  
  showMonitor = false;
  syncing = false;
  isOnline = this.pwa.isOnline;
  
  stats = {
    pendingOperations: 0,
    failedOperations: 0,
    cacheSize: 0,
    oldestPending: null as Date | null
  };
  
  ngOnInit() {
    // Actualizar estadísticas cada 5 segundos
    this.updateStats();
    
    interval(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateStats());
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  async updateStats() {
    const stats = await this.db.getStats();
    this.stats = {
      pendingOperations: stats.pendingOperations,
      failedOperations: stats.failedOperations,
      cacheSize: stats.cacheSize,
      oldestPending: stats.oldestPending || null
    };
  }
  
  async forceSync() {
    this.syncing = true;
    try {
      await this.sync.forceSync();
      await this.updateStats();
    } finally {
      this.syncing = false;
    }
  }
  
  async clearCache() {
    if (confirm('¿Estás seguro de limpiar todo el cache?')) {
      await this.db.clearAll();
      await this.updateStats();
    }
  }
  
  formatDate(date: Date): string {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }
}