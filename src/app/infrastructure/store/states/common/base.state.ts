import { signal, computed, Signal, WritableSignal } from '@angular/core';

export interface StateConfig {
  storable?: boolean;
  storageKey: string;
  pluralKey?: string;
}

export interface BaseStateInterface<T> {
  item: Signal<T | null>;
  items: Signal<T[]>;
  loading: Signal<boolean>;
  error: Signal<string | null>;
}

export abstract class BaseState<T> implements BaseStateInterface<T> {
  // Signals privados (WritableSignal para poder modificarlos)
  private readonly _item: WritableSignal<T | null>;
  private readonly _items: WritableSignal<T[]>;
  private readonly _loading: WritableSignal<boolean>;
  private readonly _error: WritableSignal<string | null>;
  private readonly _success: WritableSignal<boolean>;
  
  // Señales públicas de solo lectura (Signal)
  public readonly item: Signal<T | null>;
  public readonly items: Signal<T[]>;
  public readonly loading: Signal<boolean>;
  public readonly error: Signal<string | null>;
  public readonly success: Signal<boolean>;
  
  // Computed signals útiles
  public readonly hasError = computed(() => this.error() !== null);
  public readonly isEmpty = computed(() => this.items().length === 0);
  public readonly hasItem = computed(() => this.item() !== null);
  public readonly itemCount = computed(() => this.items().length);
  public readonly isReady = computed(() => !this.loading() && !this.hasError());
  
  private readonly storageKey: string;
  private readonly storageKeyPlural: string;
  
  constructor(
    private readonly config: StateConfig
  ) {
    // Inicializar signals
    this._item = signal<T | null>(null);
    this._items = signal<T[]>([]);
    this._loading = signal<boolean>(false);
    this._error = signal<string | null>(null);
    this._success = signal<boolean>(false);
    
    // Exponer como signals de solo lectura
    this.item = this._item.asReadonly();
    this.items = this._items.asReadonly();
    this.loading = this._loading.asReadonly();
    this.error = this._error.asReadonly();
    this.success = this._success.asReadonly();
    
    // Configurar keys de storage
    this.storageKey = config.storageKey
    this.storageKeyPlural = config.pluralKey || this.pluralize(config.storageKey);
    
    // Cargar desde localStorage si está habilitado
    if (config.storable) {
      this.loadFromStorage();
    }
  }
  
  // Métodos públicos para modificar el estado
  public setItem(item: T | null): void {
    this._item.set(item);
    if (this.config.storable && item) {
      this.saveToStorage(this.storageKey, item);
    }
  }
  
  public setItems(items: T[]): void {
    this._items.set(items);
    if (this.config.storable) {
      this.saveToStorage(this.storageKeyPlural, items);
    }
  }
  
  public addItem(item: T): void {
    this._items.update(items => [...items, item]);
    if (this.config.storable) {
      this.saveToStorage(this.storageKeyPlural, this._items());
    }
  }
  
  public removeItem(predicate: (item: T) => boolean): void {
    this._items.update(items => items.filter(item => !predicate(item)));
    if (this.config.storable) {
      this.saveToStorage(this.storageKeyPlural, this._items());
    }
  }
  
  public updateItem(predicate: (item: T) => boolean, updates: Partial<T>): void {
    this._items.update(items => 
      items.map(item => 
        predicate(item) ? { ...item, ...updates } : item
      )
    );
    if (this.config.storable) {
      this.saveToStorage(this.storageKeyPlural, this._items());
    }
  }
  
  public setLoading(loading: boolean): void {
    this._loading.set(loading);
  }
  
  public setError(error: string | null): void {
    this._error.set(error);
  }
  
  public clearError(): void {
    this._error.set(null);
  }
  
  public reset(): void {
    this._item.set(null);
    this._items.set([]);
    this._loading.set(false);
    this._error.set(null);
    
    if (this.config.storable) {
      this.clearStorage();
    }
  }

  public setSuccess(message: boolean = true): void {
    this._success.set(message);
    this.clearError();
  }
  
  // Métodos de storage
  private loadFromStorage(): void {
    try {
      // Cargar item singular
      const itemData = localStorage.getItem(this.storageKey);
      if (itemData) {
        this._item.set(JSON.parse(itemData));
      }
      
      // Cargar items plural
      const itemsData = localStorage.getItem(this.storageKeyPlural);
      if (itemsData) {
        this._items.set(JSON.parse(itemsData));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      this.setError('Error al cargar datos guardados');
    }
  }
  
  private saveToStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      this.setError('Error al guardar datos');
    }
  }
  
  private clearStorage(): void {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.storageKeyPlural);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
  
  // Utilidad para pluralizar (mejorable según necesidad)
  private pluralize(word: string): string {
    const rules: Record<string, string> = {
      'y': 'ies',
      's': 'ses',
      'x': 'xes',
      'z': 'zes',
      'ch': 'ches',
      'sh': 'shes'
    };
    
    for (const [ending, plural] of Object.entries(rules)) {
      if (word.endsWith(ending)) {
        if (ending === 'y' && this.isVowel(word[word.length - 2])) {
          return word + 's';
        }
        return word.slice(0, -ending.length) + plural;
      }
    }
    
    return word + 's';
  }
  
  private isVowel(char: string): boolean {
    return 'aeiouAEIOU'.includes(char);
  }
}