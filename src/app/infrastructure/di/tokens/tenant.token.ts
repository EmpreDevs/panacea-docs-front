import { InjectionToken } from "@angular/core";
import { TenantRepository } from "@domain/repositories";

export const tenantToken = new InjectionToken<TenantRepository>('TENANT_TOKEN')
