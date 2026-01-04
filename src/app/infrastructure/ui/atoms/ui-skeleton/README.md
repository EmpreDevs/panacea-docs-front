# UI Skeleton Loader Component

Componente skeleton loader altamente flexible y reutilizable para mostrar estados de carga.

## Características

- ✅ **Dumb Component**: Componente puro sin lógica de negocio
- ✅ **Altamente Configurable**: Múltiples opciones para personalizar filas, columnas y tipos
- ✅ **Presets Predefinidos**: 7 presets listos para usar (card, avatar, list, table, form, article, comment)
- ✅ **Grid System**: Soporte para layouts con múltiples columnas (1-12)
- ✅ **Animación Shimmer**: Animación suave de carga con soporte dark mode
- ✅ **Tipos Múltiples**: text, circle, rectangle, square, avatar, card, line
- ✅ **Responsive**: Adaptable a diferentes tamaños de pantalla
- ✅ **Dark Mode**: Soporte completo para modo oscuro
- ✅ **Customizable**: Filas personalizadas con configuración individual

## Instalación

El componente ya está instalado y exportado desde `@ui/atoms`.

## Uso Básico

### Skeleton Simple

```typescript
import { Component } from '@angular/core'
import { UiSkeleton } from '@ui/atoms'

@Component({
  selector: 'app-example',
  imports: [UiSkeleton],
  template: `
    <!-- Skeleton básico con 3 filas de texto -->
    <app-ui-skeleton />
  `
})
export class ExampleComponent {}
```

### Con Configuración de Filas y Columnas

```typescript
<app-ui-skeleton
  [rows]="5"
  [columns]="1"
  type="text"
  height="1rem"
  rowGap="0.75rem"
/>
```

### Skeleton con Grid de Columnas

```typescript
<app-ui-skeleton
  [rows]="4"
  [columns]="3"
  type="rectangle"
  height="8rem"
  rowGap="1rem"
  columnGap="1rem"
/>
```

## Presets Predefinidos

### Card Preset

```typescript
<app-ui-skeleton preset="card" />
```

Genera un skeleton para una tarjeta con:
- Imagen rectangular (200px)
- Título (80% ancho)
- Subtítulo (60% ancho)
- Descripción (90% ancho)

### Avatar Preset

```typescript
<app-ui-skeleton preset="avatar" [rows]="3" />
```

Genera un skeleton con avatar circular y texto.

### List Preset

```typescript
<app-ui-skeleton preset="list" />
```

Genera un skeleton para listas con 5 items de 3 columnas.

### Table Preset

```typescript
<app-ui-skeleton preset="table" />
```

Genera un skeleton para tablas con 4 columnas y 6 filas.

### Form Preset

```typescript
<app-ui-skeleton preset="form" />
```

Genera un skeleton para formularios con labels e inputs.

### Article Preset

```typescript
<app-ui-skeleton preset="article" />
```

Genera un skeleton para artículos/posts con:
- Título
- Metadata
- Imagen
- Múltiples párrafos

### Comment Preset

```typescript
<app-ui-skeleton preset="comment" [rows]="5" />
```

Genera un skeleton para comentarios con avatar y texto.

## Configuración Avanzada

### Filas Personalizadas (customRows)

```typescript
import { Component } from '@angular/core'
import { UiSkeleton } from '@ui/atoms'
import { SkeletonRow } from '@ui/atoms/ui-skeleton/skeleton.interface'

@Component({
  selector: 'app-custom-skeleton',
  imports: [UiSkeleton],
  template: `
    <app-ui-skeleton [customRows]="customRows" />
  `
})
export class CustomSkeletonComponent {
  customRows: SkeletonRow[] = [
    { type: 'circle', height: '4rem', width: '4rem' },
    { type: 'text', height: '1.5rem', width: '60%' },
    { type: 'text', height: '1rem', width: '40%' },
    { type: 'rectangle', height: '300px', width: '100%' },
    { type: 'text', height: '1rem', width: '100%', columns: 2, gap: '1rem' },
  ]
}
```

### Configuración con Objeto Options

```typescript
import { SkeletonOptions } from '@ui/atoms/ui-skeleton/skeleton.interface'

customOptions: Partial<SkeletonOptions> = {
  rows: 5,
  type: 'text',
  height: '1.25rem',
  rowGap: '1rem',
  animate: true,
  rounded: 'lg'
}
```

```html
<app-ui-skeleton [options]="customOptions" />
```

## Inputs Disponibles

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `type` | `SkeletonType` | `'text'` | Tipo de skeleton (text, circle, rectangle, square, avatar, card, line) |
| `rows` | `number` | `3` | Número de filas |
| `columns` | `number` | `1` | Número de columnas por fila (1-12) |
| `height` | `string` | `'1rem'` | Altura de cada elemento |
| `width` | `string` | `'100%'` | Ancho del skeleton |
| `rowGap` | `string` | `'0.75rem'` | Espacio entre filas |
| `columnGap` | `string` | `'1rem'` | Espacio entre columnas |
| `customRows` | `SkeletonRow[]` | - | Configuración personalizada de filas |
| `animate` | `boolean` | `true` | Si debe mostrar animación shimmer |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border radius |
| `className` | `string` | - | Clase CSS adicional |
| `preset` | `PresetKey` | - | Preset predefinido |
| `options` | `Partial<SkeletonOptions>` | - | Objeto de configuración completo |

## Tipos de Skeleton

### text
Líneas de texto horizontales (default).

```typescript
<app-ui-skeleton type="text" [rows]="3" />
```

### circle
Círculos perfectos (aspect ratio 1:1).

```typescript
<app-ui-skeleton type="circle" height="4rem" [rows]="3" [columns]="4" />
```

### rectangle
Rectángulos de ancho completo.

```typescript
<app-ui-skeleton type="rectangle" height="200px" [rows]="2" />
```

### square
Cuadrados perfectos (aspect ratio 1:1).

```typescript
<app-ui-skeleton type="square" height="10rem" [columns]="3" />
```

### avatar
Igual que circle, específico para avatares.

```typescript
<app-ui-skeleton type="avatar" height="3rem" [columns]="5" />
```

### card
Tarjetas con altura mínima de 10rem.

```typescript
<app-ui-skeleton type="card" [rows]="2" />
```

### line
Líneas delgadas (0.75rem).

```typescript
<app-ui-skeleton type="line" [rows]="5" />
```

## Ejemplos de Uso Real

### Lista de Pacientes (Cargando)

```typescript
@Component({
  selector: 'app-patients-list',
  imports: [UiSkeleton, NgIf, NgFor],
  template: `
    <div *ngIf="loading; else content">
      <app-ui-skeleton preset="list" />
    </div>

    <ng-template #content>
      <div *ngFor="let patient of patients">
        {{ patient.name }}
      </div>
    </ng-template>
  `
})
export class PatientsListComponent {
  loading = true
  patients: Patient[] = []

  ngOnInit() {
    this.loadPatients()
  }

  async loadPatients() {
    this.loading = true
    this.patients = await this.patientService.getAll()
    this.loading = false
  }
}
```

### Detalle de Cita (Cargando)

```typescript
@Component({
  selector: 'app-appointment-detail',
  imports: [UiSkeleton, NgIf],
  template: `
    <div *ngIf="loading; else detail">
      <app-ui-skeleton [customRows]="appointmentSkeleton" />
    </div>

    <ng-template #detail>
      <h1>{{ appointment.title }}</h1>
      <p>{{ appointment.description }}</p>
    </ng-template>
  `
})
export class AppointmentDetailComponent {
  loading = true
  appointment: Appointment | null = null

  appointmentSkeleton: SkeletonRow[] = [
    { type: 'text', height: '2rem', width: '60%' }, // Título
    { type: 'text', height: '1rem', width: '40%' }, // Fecha
    { type: 'rectangle', height: '1px', width: '100%' }, // Divider
    { type: 'text', height: '1rem', width: '100%' }, // Descripción
    { type: 'text', height: '1rem', width: '90%' },
    { type: 'text', height: '1rem', width: '95%' },
  ]
}
```

### Tabla de Métricas (Cargando)

```typescript
<div *ngIf="loading; else table">
  <app-ui-skeleton
    preset="table"
    [rows]="10"
  />
</div>

<ng-template #table>
  <table>
    <!-- Tabla real -->
  </table>
</ng-template>
```

### Grid de Cards (Cargando)

```typescript
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div *ngIf="loading">
    <app-ui-skeleton preset="card" />
  </div>
  <div *ngIf="loading">
    <app-ui-skeleton preset="card" />
  </div>
  <div *ngIf="loading">
    <app-ui-skeleton preset="card" />
  </div>
</div>
```

### Formulario (Cargando)

```typescript
<div *ngIf="loading; else form">
  <app-ui-skeleton preset="form" />
</div>

<ng-template #form>
  <form [formGroup]="myForm">
    <!-- Formulario real -->
  </form>
</ng-template>
```

## Skeleton con Estados Condicionales

```typescript
@Component({
  selector: 'app-data-view',
  imports: [UiSkeleton, NgIf],
  template: `
    <div [ngSwitch]="state">
      <!-- Loading -->
      <div *ngSwitchCase="'loading'">
        <app-ui-skeleton preset="card" [rows]="3" />
      </div>

      <!-- Error -->
      <div *ngSwitchCase="'error'">
        <p>Error al cargar los datos</p>
      </div>

      <!-- Success -->
      <div *ngSwitchCase="'success'">
        {{ data }}
      </div>

      <!-- Empty -->
      <div *ngSwitchDefault>
        <p>No hay datos disponibles</p>
      </div>
    </div>
  `
})
export class DataViewComponent {
  state: 'loading' | 'error' | 'success' | 'empty' = 'loading'
  data: any = null
}
```

## Personalización de Estilos

### Sin Animación

```typescript
<app-ui-skeleton [animate]="false" />
```

### Con Clase Personalizada

```typescript
<app-ui-skeleton
  className="my-custom-skeleton"
  [rows]="3"
/>
```

```css
.my-custom-skeleton .skeleton-item {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}
```

### Diferentes Border Radius

```typescript
<app-ui-skeleton rounded="none" />    <!-- Sin bordes redondeados -->
<app-ui-skeleton rounded="sm" />      <!-- Bordes pequeños -->
<app-ui-skeleton rounded="md" />      <!-- Bordes medianos (default) -->
<app-ui-skeleton rounded="lg" />      <!-- Bordes grandes -->
<app-ui-skeleton rounded="full" />    <!-- Bordes completamente redondeados -->
```

## Interface SkeletonRow

```typescript
interface SkeletonRow {
  type?: SkeletonType           // Tipo de skeleton para esta fila
  columns?: number              // Número de columnas (1-12)
  height?: string               // Altura personalizada
  width?: string                // Ancho personalizado
  gap?: string                  // Espacio entre columnas
  fullWidth?: boolean           // Si debe ocupar todo el ancho
}
```

## Presets Disponibles

```typescript
type PresetKey = 'card' | 'avatar' | 'list' | 'table' | 'form' | 'article' | 'comment'
```

## Tips y Mejores Prácticas

1. **Usa presets cuando sea posible**: Son configuraciones probadas y optimizadas
2. **Combina con NgIf**: Muestra el skeleton solo durante la carga
3. **Mantén la coherencia**: El skeleton debe parecerse al contenido final
4. **Evita skeletons muy complejos**: Mantén la simplicidad
5. **Usa las mismas dimensiones**: El skeleton debe tener las mismas dimensiones que el contenido real para evitar layout shifts
6. **Dark mode automático**: El componente ya soporta dark mode, no necesitas configuración adicional

## Notas Importantes

- El componente es **dumb**, no maneja estado de carga
- Soporta grid de hasta 12 columnas
- La animación shimmer está optimizada para performance
- Responsive por defecto (en móvil, grids se convierten en una columna)
- Compatible con Tailwind CSS

## Troubleshooting

### El skeleton no se muestra

Verifica que hayas importado el componente:

```typescript
import { UiSkeleton } from '@ui/atoms'
```

### La animación no funciona

Asegúrate de que `animate` esté en `true`:

```typescript
<app-ui-skeleton [animate]="true" />
```

### El grid no se ve bien en móvil

El componente es responsive por defecto. En pantallas pequeñas (<640px), los grids se convierten automáticamente en una sola columna.

### Quiero un skeleton más grande

Ajusta `height` y `width`:

```typescript
<app-ui-skeleton
  height="5rem"
  width="100%"
  [rows]="3"
/>
```
