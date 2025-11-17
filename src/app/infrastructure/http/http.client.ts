import { Injectable } from "@angular/core";
import { HTTPBuilder } from "./http.builder";

@Injectable({ providedIn: 'root' })
export class HttpClient {
  notification: any;

  get<T>(url: string): HTTPBuilder<T> {
    return new HTTPBuilder<T>(this.notification).url(url).method('GET');
  }
  post<T>(url: string): HTTPBuilder<T> {
    return new HTTPBuilder<T>(this.notification).url(url).method('POST');
  }
  put<T>(url: string): HTTPBuilder<T> {
    return new HTTPBuilder<T>(this.notification).url(url).method('PUT');
  }
  delete<T>(url: string): HTTPBuilder<T> {
    return new HTTPBuilder<T>(this.notification).url(url).method('DELETE');
  }
  patch<T>(url: string): HTTPBuilder<T> {
    return new HTTPBuilder<T>(this.notification).url(url).method('PATCH');
  }
}