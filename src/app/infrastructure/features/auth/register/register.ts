import { Component } from '@angular/core'
import { UiButton } from '@infra/ui/atoms'
import { UiInput } from '@infra/ui/molecules'

@Component({
	selector: 'app-register',
	imports: [UiInput, UiButton],
	templateUrl: './register.html',
	styles: ``,
})
export class Register {}
