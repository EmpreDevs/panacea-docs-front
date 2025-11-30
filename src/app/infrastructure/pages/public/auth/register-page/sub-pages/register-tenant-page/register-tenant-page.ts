import { Component } from '@angular/core'
import { CreateTenant } from '@infra/features/tenant/actions'

@Component({
	selector: 'app-register-tenant-page',
	imports: [CreateTenant],
	templateUrl: './register-tenant-page.html',
	styles: ``,
})
export class RegisterTenantPage {}
