// components/install-pwa/install-pwa.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaService } from '@infra/pwa/services';

@Component({
  selector: 'app-install-pwa',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      *ngIf="canInstall() && !isInstalled"
      class="install-button"
      (click)="installApp()"
      aria-label="Instalar aplicación">
      <span class="install-icon">📱</span>
      <span>Instalar App</span>
    </button>
  `,
  styles: [`
    .install-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
      z-index: 1000;
    }
    
    .install-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
  `]
})
export class InstallPwaComponent {
  private pwaService = inject(PwaService);
  
  canInstall = this.pwaService.canInstall;
  isInstalled = this.pwaService.isAppInstalled();
  
  async installApp() {
    await this.pwaService.installPwa();
    this.isInstalled = true;
  }
}