import { inject, Injectable } from '@angular/core'
import { HTTPBuilder } from './http.builder'
import { NotificacionLib } from '@infra/libraries'

@Injectable({ providedIn: 'root' })
export class HttpClient {
	notification = inject(NotificacionLib)

	get<T>(url: string): HTTPBuilder<T> {
		return new HTTPBuilder<T>(this.notification).url(url).method('GET')
	}
	post<T>(url: string): HTTPBuilder<T> {
		return new HTTPBuilder<T>(this.notification).url(url).method('POST')
	}
	put<T>(url: string): HTTPBuilder<T> {
		return new HTTPBuilder<T>(this.notification).url(url).method('PUT')
	}
	delete<T>(url: string): HTTPBuilder<T> {
		return new HTTPBuilder<T>(this.notification).url(url).method('DELETE')
	}
	patch<T>(url: string): HTTPBuilder<T> {
		return new HTTPBuilder<T>(this.notification).url(url).method('PATCH')
	}
}
