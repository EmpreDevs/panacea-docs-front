import { Injectable } from '@angular/core';
import { HTTPResponse, ResponseDTO } from "../dto/api/response.dto";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface HTTPError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export class HTTPBuilder<T> {
  private _url = '';
  private _method: Method = 'GET';
  private _body?: Record<string, any>;
  private _filters?: Record<string, string>;
  private tokenValue?: string;
  
  constructor(
    private notification: any, // Considerar tipar esto
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
  
  async execute(): Promise<ResponseDTO<T>> { 
    const url = new URL(this._url);
    
    // Query params
    if (this._filters) {
      Object.keys(this._filters).forEach(key => {
        url.searchParams.set(key, this._filters![key]);
      });
    }
    
    // Headers
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    
    if (this.tokenValue) {
      headers.set('Authorization', `Bearer ${this.tokenValue}`);
    }
    
    const options: RequestInit = {
      method: this._method,
      headers: headers,
    };
    
    if (this._body && ['POST', 'PUT', 'PATCH'].includes(this._method)) {
      options.body = JSON.stringify(this._body);
    }
    
    try {
      const response = await fetch(url, options);
      const resp = await response.json();
      
      if (response.ok) {
        // Solo mostrar notificación en operaciones de escritura
        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(this._method)) {
          this.notification.showSuccess(resp.http?.message || 'Operación exitosa');
        }
        return resp;
      } else {
        // Lanzar error para que sea capturado por el adapter
        const error: HTTPError = {
          message: resp.http?.message || 'Error en la operación',
          status: response.status,
          code: resp.http?.code,
          details: resp.http?.details
        };
        
        this.handleHTTPError(error);
        throw error;
      }
    } catch (error) {
      // Si es un error de red o parsing
      if (!(error as HTTPError).status) {
        const networkError: HTTPError = {
          message: 'Error de conexión con el servidor',
          status: 0,
          code: 'NETWORK_ERROR'
        };
        
        this.notification.showError(networkError.message);
        throw networkError;
      }
      
      // Si ya es un HTTPError, simplemente re-lanzarlo
      throw error;
    }
  }
  
  private handleHTTPError(error: HTTPError): void {
    // Personalizar mensajes según el código de estado
    switch (error.status) {
      case 400:
        this.notification.showError(error.message || 'Datos inválidos');
        break;
      case 401:
        this.notification.showError('No autorizado. Por favor, inicia sesión nuevamente');
        break;
      case 403:
        this.notification.showError('No tienes permisos para realizar esta acción');
        break;
      case 404:
        this.notification.showError('Recurso no encontrado');
        break;
      case 409:
        this.notification.showError(error.message || 'Conflicto con el estado actual');
        break;
      case 422:
        this.notification.showError('Datos de entrada no válidos');
        break;
      case 500:
        this.notification.showError('Error interno del servidor');
        break;
      default:
        this.notification.showError(error.message || 'Error en la operación');
    }
  }
}