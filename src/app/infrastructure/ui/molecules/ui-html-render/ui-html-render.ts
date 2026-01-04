import { Component, computed, inject, input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
	selector: 'app-ui-html-render',
	imports: [],
	template: `<div [innerHTML]="htmlContent()"></div>`,
	styles: ``,
})
export class UiHtmlRender {
	sanitize = inject(DomSanitizer)
	content = input<string>('')

	htmlContent = computed(() => this.sanitize.bypassSecurityTrustHtml(this.content()))
}
