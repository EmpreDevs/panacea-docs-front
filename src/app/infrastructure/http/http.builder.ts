import { HTTPResponse, ResponseDTO } from "../dto/api/response.dto";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export class HTTPBuilder<T> {
  private _url = '';
  private _method: Method = 'GET';
  private _body?: Record<string, any>;
  private _filters?: Record<string, string>;
  private tokenValue?: string;

  constructor(
		private notification: any,
	) {}


  url(url: string): this {
    this._url = url;
    return this;
  }

  method(method: Method): this {
    this._method = method;
    return this;
  }

  body(body: Record<string, any>): this {
    this._body = body;
    return this;
  }

  filters(filters: Record<string, string>): this {
    this._filters = filters;
    return this;
  }

  token(token: string): this {
    this.tokenValue = token;
    return this;
  }

  async excecute(): Promise<ResponseDTO<T>> {
		const url = new URL(this._url)

		//Query params
		if (this.filters) {
			Object.keys(this.filters).forEach(key => {
				url.searchParams.set(key, this._filters![key])
			})
		}

		//headers
		const headers = new Headers()
		headers.set('Content-Type', 'application/json')
		if (this.tokenValue) {
			headers.set('Authorization', `Bearer ${this.tokenValue}`)
		}

		const options: RequestInit = {
			method: this._method,
			headers: headers,
		}
		if (this._body && ['POST', 'PUT', 'PATCH'].includes(this._method)) {
			options.body = JSON.stringify(this._body)
		}
		try {
			const response = await fetch(url, options)
			const resp = await response.json()
			if (response.ok) {
				this.notification.showSuccess(resp.http.message)
			} else {
				this.errors(resp.http)
			}
			return resp
		} catch (error) {
			// En caso de error
			this.notification.showError('Error de red')
			throw error
		}
	}
	private errors(http: HTTPResponse) {
		this.notification.showError('error de red')
	}
}