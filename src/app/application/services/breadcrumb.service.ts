import { inject, Injectable } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { filter, distinctUntilChanged, map } from 'rxjs/operators'

export interface Breadcrumb {
	label: string
	url: string
}

@Injectable({
	providedIn: 'root',
})
export class BreadcrumbService {
	router = inject(Router)
	activatedRoute = inject(ActivatedRoute)

	private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([])
	breadcrumbs$ = this.breadcrumbsSubject.asObservable()

	constructor() {
		this.startBreadcrumbs()
	}

	startBreadcrumbs() {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				distinctUntilChanged(),
				map(() => this.buildBreadcrumbs(this.activatedRoute.root)),
			)
			.subscribe(breadcrumbs => {
				this.breadcrumbsSubject.next(breadcrumbs)
			})

		const initialBreadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root)
		this.breadcrumbsSubject.next(initialBreadcrumbs)
	}

	private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
		const children: ActivatedRoute[] = route.children

		if (children.length === 0) {
			return breadcrumbs
		}

		for (const child of children) {
			// Skip if snapshot is not yet initialized
			if (!child.snapshot) {
				continue
			}

			const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/')

			if (routeURL) {
				url += `/${routeURL}`
			}

			const label = child.snapshot.data['breadcrumb']
			if (label) {
				breadcrumbs.push({ label, url })
			}

			return this.buildBreadcrumbs(child, url, breadcrumbs)
		}

		return breadcrumbs
	}
}
