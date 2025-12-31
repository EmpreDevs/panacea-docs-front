import { Injectable } from '@angular/core'

import { environment } from '@envs/environment'

import { Tenant } from '@domain/models/tenant.model'
import { TenantRepository } from '@domain/repositories'

import { TenantMapper } from '@infra/dto/api'
import { HttpClient } from '@infra/http/http.client'
import { OfflineDBService } from '@infra/pwa/services/offline-db.service'

import { BaseAdapter } from './common/base.adapter'

@Injectable({ providedIn: 'root' })
export class TenantAdapter extends BaseAdapter<Tenant> implements TenantRepository {
	private readonly apiUrl = `${environment.apiUrl}/tenants`

	constructor(
		private readonly http: HttpClient,
		private readonly dbService: OfflineDBService,
	) {
		super(http, 'tenants', dbService, new TenantMapper())
	}
}
