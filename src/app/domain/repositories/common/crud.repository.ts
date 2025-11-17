export interface CrudRepository<T> {
  create(payload: Partial<T>): Promise<T>
  findById(id: string): Promise<T>
  findAll(filters: any): Promise<T[]>
  update(payload: Partial<T>, id: string): Promise<T>
  delete(id: string): Promise<T>
}