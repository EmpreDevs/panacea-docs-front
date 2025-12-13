import { Component } from '@angular/core'
import { UiLayoutApp } from '@infra/ui/layouts'
import { RouterOutlet } from '@angular/router'

@Component({
	selector: 'app-app-page',
	imports: [UiLayoutApp, RouterOutlet],
	templateUrl: './app-page.html',
	styles: ``,
})
export class AppPage {}
