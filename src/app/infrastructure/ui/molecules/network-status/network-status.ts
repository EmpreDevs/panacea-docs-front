// components/network-status/network-status.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaService } from '@infra/pwa/services';

@Component({
  selector: 'app-network-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="network-status" [class.offline]="!isOnline()">
      @if( !isOnline() ){
      <div class="status-bar">
        <span class="status-icon">⚠️</span>
        <span class="status-text">Sin conexión - Modo offline</span>
      </div>
      }
    </div>
  `,
  styles: [`
    .network-status {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      transition: transform 0.3s ease;
    }
    
    .status-bar {
      background: #ff9800;
      color: white;
      padding: 8px;
      text-align: center;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .offline .status-bar {
      background: #f44336;
    }
  `]
})
export class NetworkStatusComponent {
  private pwaService = inject(PwaService);
  isOnline = this.pwaService.isOnline;
}