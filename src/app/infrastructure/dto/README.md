# DTOs (Data Transfer Objects)

Esta carpeta contiene los DTOs (Data Transfer Objects) que se usan para transferir datos entre capas de la aplicación.

## Estructura

```
dto/
├── common/              # DTOs base y tipos genéricos
│   ├── base.dto.ts     # CreateDto<T> y UpdateDto<T> genéricos
│   └── index.ts
├── api/                # DTOs de respuestas de API
│   └── response.dto.ts
├── appointment.dto.ts  # DTOs específicos de Appointment
└── index.ts           # Exporta todos los DTOs
```

## Tipos Genéricos Base

### `CreateDto<T>`
Omite los campos de `BaseModel` (id, _syncPending, _deleted) para operaciones de creación.

```typescript
// Ejemplo de uso
type CreateAppointmentDto = CreateDto<Appointment>;
// Resultado: Appointment sin id, _syncPending, _deleted
```

### `UpdateDto<T>`
Hace todos los campos opcionales y omite los campos de `BaseModel` para operaciones de actualización.

```typescript
// Ejemplo de uso
type UpdateAppointmentDto = UpdateDto<Appointment>;
// Resultado: Partial<Appointment> sin id, _syncPending, _deleted
```

## Convención para Crear DTOs

Cada entidad debe tener sus propios DTOs:

### 1. CreateDto
Para crear nuevos registros (sin ID):

```typescript
export interface CreateAppointmentDto extends CreateDto<Appointment> {
  startDate: Date;
  endDate: Date;
  estimation: number;
  patientId: string;
  healthProviderId: string;
  tenantId: string;
  title: string;
  properties?: Record<string, any>;
}
```

### 2. UpdateDto
Para actualizar registros existentes (campos opcionales):

```typescript
export interface UpdateAppointmentDto extends UpdateDto<Appointment> {
  startDate?: Date;
  endDate?: Date;
  estimation?: number;
  patientId?: string;
  healthProviderId?: string;
  tenantId?: string;
  title?: string;
  properties?: Record<string, any>;
}
```

## Uso en Casos de Uso

Los casos de uso deben usar los DTOs apropiados:

```typescript
@Injectable({providedIn: 'root'})
export class CreateAppointmentUseCase {
  constructor(
    @Inject(appointmentToken)
    private readonly repository: AppointmentRepository) {}

  execute(payload: CreateAppointmentDto): Promise<Appointment> {
    return this.repository.create(payload);
  }
}
```

## Beneficios

✅ **Type Safety**: TypeScript previene errores en tiempo de compilación
✅ **Claridad**: Separa datos de entrada de modelos de dominio
✅ **Validación**: El IDE ayuda con autocompletado
✅ **Prevención de errores**: No se puede enviar el ID al crear
✅ **Mantenibilidad**: Cambios en el modelo se reflejan en los DTOs

## Ejemplos

Ver archivos `*.example.ts` para ejemplos de uso completos.
