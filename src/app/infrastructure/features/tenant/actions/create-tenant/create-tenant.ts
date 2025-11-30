import { Component, output } from '@angular/core'
import { Tenant } from '@domain/models'
import { FormTenant } from '../../components'

@Component({
	selector: 'app-create-tenant',
	imports: [FormTenant],
	templateUrl: './create-tenant.html',
	styles: ``,
})
export class CreateTenant {
	tenantFields = output<Tenant>()

	emitTenantFields(tenant: Tenant) {
		this.tenantFields.emit(tenant)
	}
}
