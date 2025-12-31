import { Component, signal } from '@angular/core'

import { UiButton, UiIcon } from '@infra/ui/atoms'

@Component({
	selector: 'app-ui-search-query',
	imports: [UiButton, UiIcon],
	templateUrl: './ui-search-query.html',
	styles: ``,
})
export class UiSearchQuery {
	openSearch = signal(false)

	toggleSearch() {
		this.openSearch.update(open => !open)
	}
}
