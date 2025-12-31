import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable, debounceTime, fromEvent } from 'rxjs'

export enum ScreenSize {
	MOBILE = 'mobile',
	TABLET = 'tablet',
	DESKTOP = 'desktop',
	LARGE_DESKTOP = 'large-desktop',
}

@Injectable({
	providedIn: 'root',
})
export class ScreenSizeService {
	// Breakpoints de Tailwind CSS
	private readonly breakpoints = {
		mobile: 640, // sm
		tablet: 768, // md
		desktop: 1024, // lg
		largeDesktop: 1280, // xl
	}
	private screenSizeSubject = new BehaviorSubject<ScreenSize>(this.getScreenSize())
	private widthSubject = new BehaviorSubject<number>(window.innerWidth)

	public screenSize$: Observable<ScreenSize> = this.screenSizeSubject.asObservable()
	public width$: Observable<number> = this.widthSubject.asObservable()

	constructor() {
		this.initResizeListener()
	}

	private initResizeListener(): void {
		fromEvent(window, 'resize')
			.pipe(debounceTime(200)) // Evita llamadas excesivas
			.subscribe(() => {
				this.updateScreenSize()
			})

		// Inicialización
		this.updateScreenSize()
	}

	private updateScreenSize(): void {
		const width = window.innerWidth
		const size = this.getScreenSize()

		this.widthSubject.next(width)
		this.screenSizeSubject.next(size)
	}

	private getScreenSize(): ScreenSize {
		const width = window.innerWidth

		if (width < this.breakpoints.mobile) {
			return ScreenSize.MOBILE
		} else if (width < this.breakpoints.tablet) {
			return ScreenSize.TABLET
		} else if (width < this.breakpoints.largeDesktop) {
			return ScreenSize.DESKTOP
		} else {
			return ScreenSize.LARGE_DESKTOP
		}
	}

	// Getters síncronos para uso directo
	get currentSize(): ScreenSize {
		return this.screenSizeSubject.value
	}

	get currentWidth(): number {
		return this.widthSubject.value
	}

	// Helpers booleanos
	get isMobile(): boolean {
		return this.currentSize === ScreenSize.MOBILE
	}

	get isTablet(): boolean {
		return this.currentSize === ScreenSize.TABLET
	}

	get isDesktop(): boolean {
		return this.currentSize === ScreenSize.DESKTOP
	}

	get isLargeDesktop(): boolean {
		return this.currentSize === ScreenSize.LARGE_DESKTOP
	}

	// Helpers combinados
	get isMobileOrTablet(): boolean {
		return this.isMobile || this.isTablet
	}

	get isDesktopOrLarger(): boolean {
		return this.isDesktop || this.isLargeDesktop
	}
}
