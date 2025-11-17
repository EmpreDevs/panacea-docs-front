import { CrudRepository } from "@domain/repositories/common/crud.repository";
import { environment } from "@envs/environment";
import { HttpClient } from "@infra/http/http.client";

export abstract class BaseAdapter<T> implements CrudRepository<T> {
  private API = environment.apiUrl
  private urlAPI: string
  constructor(
    private readonly httpClient: HttpClient,
    private readonly path: string
  ){
    this.urlAPI = `${this.API}/${path}`
  }

  async create(payload: Partial<T>): Promise<T> {
    const response = await this.httpClient.post<T>(this.urlAPI)
      .body(payload)
      .excecute()
    return response.data
  }
  async findById(id: string): Promise<T> {
    const url = `${this.urlAPI}/${id}`
    const response = await this.httpClient.get<T>(url)
      .excecute()
    return response.data
  }
  async findAll(filters: any): Promise<T[]> {
    const response = await this.httpClient.get<T[]>(this.urlAPI)
      .filters(filters)
      .excecute()

    return response.data
  }
  async update(payload: Partial<T>, id: string): Promise<T> {
    const url = `${this.urlAPI}/${id}`
    const response = await this.httpClient.put<T>(url)
      .body(payload)
      .excecute()
    
    return response.data
  }
  async delete(id: string): Promise<T> {
    const url = `${this.urlAPI}/${id}`
    const response = await this.httpClient.delete<T>(url)
      .excecute()
    
    return response.data
  }

}