import { Injectable } from "@angular/core";
import { openDB, IDBPDatabase} from 'idb'
import { AppDatabase, CachedData, DB_NAME, DB_VERSION, OperationType, PendingOperation, SYNC_CONFIG, SyncConfig, SyncStatus } from "../database/db.schema";

@Injectable({ providedIn: 'root' })
export class OfflineDBService {
  private db: IDBPDatabase<AppDatabase> | null = null

  constructor(
  ){
    this.initDB()
  }

  private async initDB() {
    try{
      this.db = await openDB<AppDatabase>(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion, newVersion, transaction) {
          console.log(`Actualizando DB de v${oldVersion} a v${newVersion}`);
          if(!db.objectStoreNames.contains('pendingOperations')) {
            const pendingOperations = db.createObjectStore('pendingOperations', {
              keyPath: 'id',
              autoIncrement: true
            })
            pendingOperations.createIndex('by-status', 'status');
            pendingOperations.createIndex('by-entity', 'entity');
            pendingOperations.createIndex('by-date', 'createdAt');
            pendingOperations.createIndex('by-uuid', 'uuid');
            console.log('Store pendingOperations creado');
          }
          if(!db.objectStoreNames.contains('cache')) {
            const cacheStore = db.createObjectStore('cache', {
              keyPath: 'id',
              autoIncrement: true
            });
            
            cacheStore.createIndex('by-entity', 'entity');
            cacheStore.createIndex('by-key', 'key');
            cacheStore.createIndex('by-expiry', 'expiresAt');
            
            console.log('Store cache creado');
          }
          if (!db.objectStoreNames.contains('syncConfig')) {
            const configStore = db.createObjectStore('syncConfig', {
              keyPath: 'id',
              autoIncrement: true
            });
            
            configStore.createIndex('by-key', 'key');
            
            console.log('Store syncConfig creado');
          }
        },
        blocked() {
          console.warn('⚠️ DB bloqueada - cierra otras pestañas');
        },
        
        blocking() {
          console.warn('⚠️ Esta pestaña está bloqueando la actualización');
        },
        
        terminated() {
          console.error('❌ DB terminada inesperadamente');
        }
      })
      console.log('✅ IndexedDB inicializada correctamente');
      
      // Limpiar cache expirado al iniciar
      await this.cleanExpiredCache();
    } catch(e){
      console.error('❌ Error inicializando IndexedDB:', e);
      throw e;
    }
  }
  private async ensureDb(): Promise<IDBPDatabase<AppDatabase>> {
    if (!this.db) {
      await this.initDB();
    }
    if (!this.db) {
      throw new Error('No se pudo inicializar la base de datos');
    }
    return this.db;
  }
  async addPendingOperation(
    entity: string,
    operation: OperationType,
    payload: any,
    metadata?: any
  ): Promise<number> {
    const db = await this.ensureDb();
    
    const pendingOp: PendingOperation = {
      uuid: this.generateUUID(),
      entity,
      operation,
      payload,
      status: 'pending',
      attempts: 0,
      createdAt: new Date(),
      metadata
    };
    
    const id = await db.add('pendingOperations', pendingOp);
    console.log(`✅ Operación pendiente agregada: ${id}`);
    
    return id;
  }
  // OBTENER OPERACIONES PENDIENTES
  async getPendingOperations(
    status: SyncStatus = 'pending',
    limit?: number
  ): Promise<PendingOperation[]> {
    const db = await this.ensureDb();
    
    let operations = await db.getAllFromIndex(
      'pendingOperations',
      'by-status',
      status
    );
    
    // Aplicar límite si se especifica
    if (limit) {
      operations = operations.slice(0, limit);
    }
    
    return operations;
  }
  
  // OBTENER OPERACIÓN POR UUID
  async getOperationByUUID(uuid: string): Promise<PendingOperation | undefined> {
    const db = await this.ensureDb();
    
    return await db.getFromIndex(
      'pendingOperations',
      'by-uuid',
      uuid
    );
  }
  
  // ACTUALIZAR ESTADO DE OPERACIÓN
  async updateOperationStatus(
    id: number,
    status: SyncStatus,
    error?: string
  ): Promise<void> {
    const db = await this.ensureDb();
    
    const operation = await db.get('pendingOperations', id);
    if (!operation) {
      throw new Error(`Operación ${id} no encontrada`);
    }
    
    operation.status = status;
    operation.lastAttempt = new Date();
    operation.attempts += 1;
    
    if (error) {
      operation.error = error;
    }
    
    await db.put('pendingOperations', operation);
    console.log(`📝 Operación ${id} actualizada a ${status}`);
  }
  
  // ELIMINAR OPERACIÓN COMPLETADA
  async deleteOperation(id: number): Promise<void> {
    const db = await this.ensureDb();
    await db.delete('pendingOperations', id);
    console.log(`🗑️ Operación ${id} eliminada`);
  }
  
  // OBTENER OPERACIONES POR ENTIDAD
  async getOperationsByEntity(entity: string): Promise<PendingOperation[]> {
    const db = await this.ensureDb();
    
    return await db.getAllFromIndex(
      'pendingOperations',
      'by-entity',
      entity
    );
  }
  
  // LIMPIAR OPERACIONES ANTIGUAS
  async cleanOldOperations(daysOld: number = 7): Promise<void> {
    const db = await this.ensureDb();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const tx = db.transaction('pendingOperations', 'readwrite');
    const store = tx.objectStore('pendingOperations');
    
    for await (const cursor of store.iterate()) {
      if (cursor.value.createdAt < cutoffDate && 
          cursor.value.status === 'success') {
        await cursor.delete();
      }
    }
    
    await tx.done;
    console.log(`🧹 Operaciones antiguas limpiadas`);
  }
  
  // =====================================
  // 💾 CACHE
  // =====================================
  
  // GUARDAR EN CACHE
  async saveToCache(
    entity: string,
    key: string,
    data: any,
    ttlMs?: number
  ): Promise<void> {
    const db = await this.ensureDb();
    
    const ttl = ttlMs || SYNC_CONFIG.CACHE_DEFAULT_TTL;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttl);
    
    // Buscar si ya existe
    const existing = await db.getFromIndex('cache', 'by-key', key);
    
    const cacheEntry: CachedData = {
      id: existing?.id, // Mantener ID si existe
      entity,
      key,
      data,
      timestamp: now,
      expiresAt
    };
    
    if (existing) {
      await db.put('cache', cacheEntry);
      console.log(`📝 Cache actualizado: ${key}`);
    } else {
      await db.add('cache', cacheEntry);
      console.log(`✅ Cache guardado: ${key}`);
    }
  }
  
  // obtener cache
  async getFromCache<T>(key: string): Promise<T | null> {
    const db = await this.ensureDb();
    
    const cached = await db.getFromIndex('cache', 'by-key', key);
    
    if (!cached) {
      console.log(`❌ Cache no encontrado: ${key}`);
      return null;
    }
    
    // Verificar si expiró
    if (new Date() > cached.expiresAt) {
      console.log(`⏰ Cache expirado: ${key}`);
      await db.delete('cache', cached.id!);
      return null;
    }
    
    console.log(`✅ Cache encontrado: ${key}`);
    return cached.data as T;
  }
  
  // limpiar cahe por expiracion
  async cleanExpiredCache(): Promise<void> {
    const db = await this.ensureDb();
    const now = new Date();
    
    const tx = db.transaction('cache', 'readwrite');
    const store = tx.objectStore('cache');
    
    let deletedCount = 0;
    
    for await (const cursor of store.iterate()) {
      if (cursor.value.expiresAt < now) {
        await cursor.delete();
        deletedCount++;
      }
    }
    
    await tx.done;
    
    if (deletedCount > 0) {
      console.log(`🧹 ${deletedCount} entradas de cache expiradas eliminadas`);
    }
  }
  
  // limpiar cache de una entidad
  async clearEntityCache(entity: string): Promise<void> {
    const db = await this.ensureDb();
    
    const tx = db.transaction('cache', 'readwrite');
    const index = tx.objectStore('cache').index('by-entity');
    
    for await (const cursor of index.iterate(entity)) {
      await cursor.delete();
    }
    
    await tx.done;
    console.log(`🧹 Cache limpiado para entidad: ${entity}`);
  }
  
  // guardar configuracion
  async setSyncConfig(key: string, value: any): Promise<void> {
    const db = await this.ensureDb();
    
    const existing = await db.getFromIndex('syncConfig', 'by-key', key);
    
    const config: SyncConfig = {
      id: existing?.id,
      key,
      value,
      updatedAt: new Date()
    };
    
    if (existing) {
      await db.put('syncConfig', config);
    } else {
      await db.add('syncConfig', config);
    }
  }
  
  // cobtener onfiguracion
  async getSyncConfig<T>(key: string): Promise<T | null> {
    const db = await this.ensureDb();
    
    const config = await db.getFromIndex('syncConfig', 'by-key', key);
    return config ? config.value as T : null;
  }
  
  // uuid
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  // stadisticas
  async getStats(): Promise<{
    pendingOperations: number;
    failedOperations: number;
    cacheSize: number;
    oldestPending?: Date;
  }> {
    const db = await this.ensureDb();
    
    const pending = await db.getAllFromIndex(
      'pendingOperations', 
      'by-status', 
      'pending'
    );
    
    const failed = await db.getAllFromIndex(
      'pendingOperations', 
      'by-status', 
      'failed'
    );
    
    const cache = await db.getAll('cache');
    
    return {
      pendingOperations: pending.length,
      failedOperations: failed.length,
      cacheSize: cache.length,
      oldestPending: pending[0]?.createdAt
    };
  }
  
  // limpiar db
  async clearAll(): Promise<void> {
    const db = await this.ensureDb();
    
    await db.clear('pendingOperations');
    await db.clear('cache');
    await db.clear('syncConfig');
    
    console.log('🧹 Base de datos limpiada completamente');
  }
  
  // cerrar conexion
  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log('🔒 Conexión a DB cerrada');
    }
  }

}