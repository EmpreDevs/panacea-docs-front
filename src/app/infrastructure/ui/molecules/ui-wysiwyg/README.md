# UI WYSIWYG Component

Componente WYSIWYG (What You See Is What You Get) basado en Quill.js para edición de texto enriquecido.

## Características

- ✅ **Dumb Component**: Implementa `ControlValueAccessor` para integración con Angular Forms
- ✅ **Formato de texto**: Negrita, cursiva, subrayado, tachado
- ✅ **Estilos de fuente**: Tipos de fuente, tamaños, colores
- ✅ **Enlaces**: Inserción de links
- ✅ **Listas**: Ordenadas, desordenadas y checklist
- ✅ **Headings**: H1-H6
- ✅ **Alineación**: Izquierda, centro, derecha, justificado
- ✅ **Código**: Bloques de código y código inline
- ✅ **Validaciones**: Estados válido/inválido con mensajes de error
- ✅ **Dark Mode**: Soporte completo para modo oscuro
- ✅ **Contador de caracteres**: Opcional con límite configurable
- ✅ **Personalizable**: Configuración completa de toolbar y módulos

## Instalación

El componente ya está instalado y exportado desde `@ui/molecules`.

## Uso Básico

### Template-Driven Forms

\`\`\`typescript
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { UiWysiwyg } from '@ui/molecules'

@Component({
  selector: 'app-example',
  imports: [FormsModule, UiWysiwyg],
  template: \`
    <app-ui-wysiwyg
      id="description"
      name="description"
      label="Descripción"
      [(ngModel)]="description"
      [required]="true"
      hint="Escribe una descripción detallada"
    />
  \`
})
export class ExampleComponent {
  description = ''
}
\`\`\`

### Reactive Forms

\`\`\`typescript
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { UiWysiwyg } from '@ui/molecules'

@Component({
  selector: 'app-example',
  imports: [ReactiveFormsModule, UiWysiwyg],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <app-ui-wysiwyg
        id="content"
        name="content"
        label="Contenido"
        formControlName="content"
        [required]="true"
        hint="Contenido del artículo"
      />

      <button type="submit" [disabled]="form.invalid">
        Guardar
      </button>
    </form>
  \`
})
export class ExampleComponent {
  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('HTML Content:', this.form.value.content)
    }
  }
}
\`\`\`

## Configuración Avanzada

### Con Contador de Caracteres

\`\`\`typescript
<app-ui-wysiwyg
  id="notes"
  name="notes"
  label="Notas Clínicas"
  formControlName="notes"
  [options]="{
    showCounter: true,
    maxLength: 5000,
    placeholder: 'Ingrese las notas del paciente...'
  }"
/>
\`\`\`

### Toolbar Personalizada

\`\`\`typescript
import { WysiwygOptions } from '@ui/molecules'

customOptions: Partial<WysiwygOptions> = {
  theme: 'snow',
  placeholder: 'Escribe algo increíble...',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean']
    ]
  }
}
\`\`\`

\`\`\`html
<app-ui-wysiwyg
  id="content"
  name="content"
  label="Contenido"
  formControlName="content"
  [options]="customOptions"
/>
\`\`\`

### Toolbar Completa (por defecto)

La configuración por defecto incluye:
- Headers (H1-H6)
- Tipos de fuente
- Tamaños de fuente
- Negrita, cursiva, subrayado, tachado
- Colores de texto y fondo
- Superíndice y subíndice
- Listas (ordenadas, desordenadas, checklist)
- Indentación
- Alineación
- Blockquotes y bloques de código
- Enlaces
- Limpiar formato

### Solo Lectura

\`\`\`typescript
<app-ui-wysiwyg
  id="preview"
  name="preview"
  label="Vista Previa"
  [formControlName]="content"
  [options]="{ readOnly: true }"
/>
\`\`\`

## API

### Inputs

| Input | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | `string` | Sí | - | ID único del editor |
| `name` | `string` | Sí | - | Nombre del campo |
| `label` | `string` | No | `''` | Etiqueta del campo |
| `hint` | `string` | No | - | Texto de ayuda |
| `required` | `boolean` | No | `false` | Si el campo es requerido |
| `isDisabled` | `boolean` | No | `false` | Si el campo está deshabilitado |
| `options` | `Partial<WysiwygOptions>` | No | Ver abajo | Opciones de configuración |

### WysiwygOptions

\`\`\`typescript
interface WysiwygOptions {
  // Tema del editor
  theme?: 'snow' | 'bubble'

  // Placeholder
  placeholder?: string

  // Modo solo lectura
  readOnly?: boolean

  // Módulos de Quill
  modules?: WysiwygModules

  // Formatos permitidos
  formats?: WysiwygFormat[]

  // Mostrar contador de caracteres
  showCounter?: boolean

  // Límite de caracteres (0 = sin límite)
  maxLength?: number
}
\`\`\`

### Estados de Validación

El componente muestra automáticamente:
- ✅ Icono de éxito cuando el campo es válido y ha sido tocado
- ❌ Icono de error con mensaje cuando el campo es inválido y ha sido tocado
- 💡 Hint cuando no hay errores

Los mensajes de error son automáticos según el tipo de validación:
- `required`: "Este campo es requerido"
- `minlength`: "Mínimo X caracteres"
- `maxlength`: "Máximo X caracteres"

## Uso en Notas Clínicas (Ejemplo Real)

\`\`\`typescript
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { UiWysiwyg } from '@ui/molecules'

@Component({
  selector: 'app-clinical-notes-form',
  imports: [ReactiveFormsModule, UiWysiwyg],
  template: \`
    <form [formGroup]="notesForm" (ngSubmit)="saveNotes()">
      <app-ui-wysiwyg
        id="clinicalNotes"
        name="clinicalNotes"
        label="Notas Clínicas del Paciente"
        formControlName="content"
        [required]="true"
        [options]="{
          showCounter: true,
          maxLength: 10000,
          placeholder: 'Ingrese observaciones, diagnósticos, tratamientos...'
        }"
        hint="Máximo 10,000 caracteres. Puede incluir listas y formato"
      />

      <button type="submit" [disabled]="notesForm.invalid">
        Guardar Notas
      </button>
    </form>
  \`
})
export class ClinicalNotesFormComponent {
  notesForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.notesForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  saveNotes() {
    if (this.notesForm.valid) {
      const htmlContent = this.notesForm.value.content
      // Guardar en el backend
      console.log('Saving notes:', htmlContent)
    }
  }
}
\`\`\`

## Estilos y Personalización

El componente usa Tailwind CSS y está completamente integrado con el dark mode del proyecto.

### Personalización de Estilos

Si necesitas personalizar los estilos, puedes hacerlo en `src/styles.css` modificando las clases:

\`\`\`css
/* Personalizar toolbar */
.wysiwyg-editor .ql-toolbar {
  @apply bg-primary-50 dark:bg-primary-900;
}

/* Personalizar altura mínima del editor */
.wysiwyg-editor .ql-editor {
  @apply min-h-[300px];
}
\`\`\`

## Métodos Disponibles

El componente implementa `ControlValueAccessor`:

- `writeValue(value: string)`: Establece el contenido HTML
- `registerOnChange(fn)`: Registra callback de cambios
- `registerOnTouched(fn)`: Registra callback de touched
- `setDisabledState(isDisabled)`: Habilita/deshabilita el editor

## Formatos Soportados

El editor soporta los siguientes formatos:

- `bold`, `italic`, `underline`, `strike`
- `blockquote`, `code-block`
- `header` (1-6)
- `list` (ordered, bullet, check)
- `script` (super, sub)
- `indent`
- `direction`
- `size`
- `color`, `background`
- `font`
- `align`
- `link`

## Notas Importantes

1. El componente devuelve **HTML string**, no texto plano
2. Para renderizar el HTML, usa el componente `ui-html-render` o `[innerHTML]` con DomSanitizer
3. El contador de caracteres cuenta el texto sin tags HTML
4. El componente es **dumb**, toda la lógica de negocio debe estar en el componente padre

## Troubleshooting

### El contenido no se muestra al cargar

Asegúrate de que estás pasando HTML válido al FormControl:

\`\`\`typescript
this.form.patchValue({
  content: '<p>Contenido inicial</p>'
})
\`\`\`

### Estilos no se aplican en dark mode

Asegúrate de que la clase `dark` esté en el elemento `<html>` o en un contenedor padre.
