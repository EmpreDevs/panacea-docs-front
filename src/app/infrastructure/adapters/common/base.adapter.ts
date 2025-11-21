import { inject } from "@angular/core";
import { CrudRepository } from "@domain/repositories/common/crud.repository";
import { environment } from "@envs/environment";
import { HttpClient } from "@infra/http/http.client";
import { PwaService } from "@infra/pwa/services";

export abstract class BaseAdapter<T extends { id: string }> implements CrudRepository<T> {
  private API = environment.apiUrl
  private urlAPI: string
  private pwaService = inject(PwaService);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly path: string
  ){
    this.urlAPI = `${this.API}/${path}`
  }

  async create(payload: Partial<T>): Promise<T> {
    if (!this.pwaService.isOnline()) {
      this.saveForSync('create', payload);
      throw new Error('Sin conexión. Los datos se sincronizarán cuando se restablezca la conexión.');
    }
    
    const response = await this.httpClient.post<T>(this.urlAPI)
      .body(payload)
      .execute();
    return response.data;
  }
  async findById(id: string): Promise<T > {
    if(!this.pwaService.isOnline()) {
      const allItems = this.getFromCache()
      const item = allItems.find(i => i.id === id)
      if(!item) {
        throw new Error('Sin conexión. El elemento no existe en memoria');
      }
      return item
    }
    const url = `${this.urlAPI}/${id}`
    const response = await this.httpClient.get<T>(url)
      .execute()
    return response.data
  }
  async findAll(filters: any): Promise<T[]> {
    if (!this.pwaService.isOnline()) {
      return this.getFromCache();
    }
    
    const response = await this.httpClient.get<T[]>(this.urlAPI)
      .filters(filters)
      .execute();
    this.saveToCache(response.data);
    return response.data;
  }
  async update(payload: Partial<T>, id: string): Promise<T> {
    const url = `${this.urlAPI}/${id}`
    if(!this.pwaService.isOnline()) {
      this.saveForSync('update', payload)
      throw new Error('Sin conexión. Los datos se sincronizarán cuando se restablezca la conexión.');
    }
    const response = await this.httpClient.put<T>(url)
      .body(payload)
      .execute()
    
    return response.data
  }
  async delete(id: string): Promise<T> {
    const url = `${this.urlAPI}/${id}`
    if(!this.pwaService.isOnline()) {
      this.saveForSync('delete', id)
      throw new Error('Sin conexión. Los datos se sincronizarán cuando se restablezca la conexión.');
    }
    const response = await this.httpClient.delete<T>(url)
      .execute()
    
    return response.data
  }

  private saveForSync(operation: string, data: any): void {
    const pendingSync = JSON.parse(localStorage.getItem('pendingSync') || '[]');
    pendingSync.push({
      operation,
      data,
      timestamp: new Date().toISOString(),
      entity: this.path
    });
    localStorage.setItem('pendingSync', JSON.stringify(pendingSync));
  }

  private saveToCache(data: T[]): void {
    localStorage.setItem(`cache_${this.path}`, JSON.stringify({
      data,
      timestamp: new Date().toISOString()
    }));
  }
  
  private getFromCache(): T[] {
    const cached = localStorage.getItem(`cache_${this.path}`);
    if (cached) {
      const { data } = JSON.parse(cached);
      return data;
    }
    return [];
  }

}