import { Component, DestroyRef, effect, inject, signal, untracked } from '@angular/core'
import { CheckIcon, LucideAngularModule } from 'lucide-angular'
import { NgClass } from '@angular/common'
import { RouterOutlet, RouterLinkWithHref, ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { Logo } from '@infra/ui/atoms'
import { filter } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

type Step = {
	index: number
	label: string
	path: string
	completed: boolean
	current: boolean
}

@Component({
	selector: 'app-register-page',
	imports: [Logo, RouterOutlet, RouterLinkWithHref, LucideAngularModule, NgClass],
	templateUrl: './register-page.html',
})
export class RegisterPage {
	route = inject(ActivatedRoute)
	router = inject(Router)
	private destroyRef = inject(DestroyRef)
	check = CheckIcon

	steps = signal<Step[]>([
		{
			index: 0,
			label: 'Información fiscal',
			path: 'tenant',
			completed: false,
			current: false,
		},
		{
			index: 1,
			label: 'Información de usuario',
			path: 'user',
			completed: false,
			current: false,
		},
		{
			index: 2,
			label: 'Selección de plan',
			path: 'plan-selection',
			completed: false,
			current: false,
		},
	])

	constructor() {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => {
				const path: string = this.route.children[0].snapshot.url[0].path
				const iStep = this.steps().findIndex(step => step.path === path)

				this.steps.update(steps => {
					return steps.map((step, index) => ({
						...step,
						index: index,
						completed: index < iStep,
						current: index === iStep,
					}))
				})
			})
	}
}
