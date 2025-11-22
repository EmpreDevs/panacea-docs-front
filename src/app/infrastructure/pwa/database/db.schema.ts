import { DBSchema } from "idb"

export type OperationType = 'create' | 'update' | 'delete' | 'patch'
export type SyncStatus = 'pending' | 'syncing' | 'success' | 'failed'

export interface PendingOperation {
  id?: number;                    // Auto-generado por IDB
  uuid: string;                    // UUID único para la operación
  entity: string;                  // Nombre de la entidad
  operation: OperationType;        // Tipo de operación
  payload: any;                    // Datos a enviar
  status: SyncStatus;             // Estado actual
  attempts: number;                // Número de intentos
  createdAt: Date;                // Cuándo se creó
  lastAttempt?: Date;             // Último intento de sincronización
  error?: string;                 // Último error si falló
  metadata?: {                    // Metadata adicional
    userId?: string;
    deviceId?: string;
    originalId?: string;          // ID original si es update/delete
  };
}

export interface CachedData {
  id?: number;
  entity: string;                  // Nombre de la entidad
  key: string;                    // Clave única (ej: 'health_provider_all')
  data: any;                      // Datos cacheados
  timestamp: Date;                // Cuándo se cacheó
  expiresAt: Date;               // Cuándo expira
  metadata?: {
    filters?: any;                // Filtros aplicados
    version?: number;             // Versión del cache
  };
}

export interface SyncConfig {
  id?: number;
  key: string;
  value: any;
  updatedAt: Date;
}

// ESQUEMA COMPLETO DE LA BASE DE DATOS
export interface AppDatabase extends DBSchema {
  // STORE 1: OPERACIONES PENDIENTES
  pendingOperations: {
    key: number;
    value: PendingOperation;
    indexes: {
      'by-status': SyncStatus;
      'by-entity': string;
      'by-date': Date;
      'by-uuid': string;
    };
  };
  
  // STORE 2: CACHE DE DATOS
  cache: {
    key: number;
    value: CachedData;
    indexes: {
      'by-entity': string;
      'by-key': string;
      'by-expiry': Date;
    };
  };
  
  // STORE 3: CONFIGURACIÓN
  syncConfig: {
    key: number;
    value: SyncConfig;
    indexes: {
      'by-key': string;
    };
  };
}

// CONSTANTES DE CONFIGURACIÓN
export const DB_NAME = 'AgendaMedicaDB';
export const DB_VERSION = 1;

// CONFIGURACIÓN DE REINTENTOS
export const SYNC_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 5000,              // 5 segundos
  BATCH_SIZE: 10,                 // Sincronizar de a 10 operaciones
  CACHE_DEFAULT_TTL: 24 * 60 * 60 * 1000  // 24 horas
};