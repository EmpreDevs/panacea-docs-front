// services/pwa.service.ts
import { Injectable, ApplicationRef, inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, interval, Observable, fromEvent, merge, of } from 'rxjs';
import { first, map, tap, filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class PwaService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly appRef = inject(ApplicationRef);
  
  // Estado de conexión como signal
  readonly isOnline = toSignal(
    merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ),
    { initialValue: navigator.onLine }
  );
  
  // Estado de instalación
  private deferredPrompt: any;
  readonly canInstall = toSignal(
    fromEvent(window, 'beforeinstallprompt').pipe(
      tap(e => {
        e.preventDefault();
        this.deferredPrompt = e;
      }),
      map(() => true)
    ),
    { initialValue: false }
  );
  
  constructor() {
    if (this.swUpdate.isEnabled) {
      this.initializeUpdateCheck();
    }
  }
  
  private initializeUpdateCheck(): void {
    // Verificar actualizaciones cuando la app esté estable
    const appIsStable$ = this.appRef.isStable.pipe(
      first(isStable => isStable === true)
    );
    
    // Verificar cada 6 horas
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    
    // Verificar actualizaciones
    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.swUpdate.checkForUpdate();
        console.log(updateFound ? 'Nueva versión encontrada' : 'Ya estás en la última versión');
      } catch (err) {
        console.error('Error al verificar actualizaciones:', err);
      }
    });
    
    // Manejar cuando una nueva versión esté lista
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe(evt => {
        this.promptUserToUpdate();
      });
  }
  
  private promptUserToUpdate(): void {
    if (confirm('Nueva versión disponible. ¿Desea actualizar?')) {
      window.location.reload();
    }
  }
  
  // Instalar PWA
  async installPwa(): Promise<void> {
    if (!this.deferredPrompt) {
      return;
    }
    
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    console.log(`User response to install prompt: ${outcome}`);
    this.deferredPrompt = null;
  }
  
  // Verificar si la app está instalada
  isAppInstalled(): boolean {
    // Para iOS
    if ('standalone' in window.navigator) {
      return (window.navigator as any).standalone;
    }
    
    // Para Android/Desktop
    return window.matchMedia('(display-mode: standalone)').matches;
  }
}