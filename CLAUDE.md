# Panacea Docs - Agenda Médica

Sistema de gestión de agenda médica desarrollado con Angular y arquitectura limpia.

## Stack Tecnológico

- **Framework**: Angular 20
- **Lenguaje**: TypeScript 5.9
- **Estado**: NgXs (State Management)
- **HTTP**: Cliente HTTP personalizado con patrón Builder
- **Autenticación**: JWT
- **PWA**: Service Worker + IndexedDB (idb)
- **Seguridad**: Crypto-js para encriptación
- **UI**: Tailwind CSS + Lucide Icons

## Arquitectura del Proyecto

El proyecto sigue **Clean Architecture** con estricta separación de capas:

```
src/app/
├── domain/              # Capa de Dominio (Entidades y Contratos)
│   ├── models/         # 17 modelos de negocio
│   └── repositories/   # 17 interfaces de repositorios
├── application/        # Capa de Aplicación (Lógica de Negocio)
│   ├── use-cases/     # 100+ casos de uso (CRUD + custom)
│   ├── services/      # 4 servicios de aplicación
│   └── interfaces/    # Interfaces de aplicación
├── infrastructure/     # Capa de Infraestructura (Implementación)
│   ├── repositories/  # 16 implementaciones de repositorios
│   ├── adapters/      # 16 adaptadores DTO <-> Model
│   ├── http/         # Cliente HTTP + Builder
│   ├── store/        # NgXs (15 facades + 15 states)
│   ├── guards/       # 2 guards (logued, guest)
│   ├── di/           # Dependency Injection (16 tokens)
│   ├── dto/          # Data Transfer Objects
│   ├── pages/        # Páginas (públicas y privadas)
│   ├── ui/           # Sistema de componentes UI
│   ├── features/     # Features (Auth, Patient, Appointments, Tenant)
│   ├── pwa/          # PWA (offline, sync)
│   └── libraries/    # Librerías reutilizables
└── shared/           # Utilidades compartidas
```

## Entidades del Dominio (17 modelos)

### Modelos Base
- `base.model.ts` - Modelo base con campos comunes (id, createdAt, updatedAt)

### Modelos de Usuario
- `user.model.ts` - Usuarios del sistema
- `auth.model.ts` - Autenticación y tokens

### Modelos de Negocio
- `patient.model.ts` - Pacientes
- `appointment.model.ts` - Citas médicas
- `health-provider.model.ts` - Profesionales de salud
- `health-provider-schedule.model.ts` - Horarios de profesionales
- `health-provider-exceptions.model.ts` - Excepciones de horarios (bloqueos)
- `medical-office.model.ts` - Consultorios médicos
- `medical-metrics.model.ts` - Métricas médicas (presión, peso, etc.)
- `speciality.model.ts` - Especialidades médicas
- `schedule.model.ts` - Horarios generales
- `notes.model.ts` - Notas clínicas
- `payment.model.ts` - Pagos
- `plan.model.ts` - Planes de suscripción
- `subscription.model.ts` - Suscripciones
- `tenant.model.ts` - Tenants (multi-tenancy)

## Repositorios

Todos los repositorios implementan el patrón Repository con operaciones CRUD base:

### Repositorio Base (CRUD)
- `crud.repository.ts` - Interfaz genérica con: `findAll()`, `findById()`, `create()`, `update()`, `delete()`

### Repositorios por Entidad (17 repositorios)
- Interfaz: `domain/repositories/*.repository.ts`
- Implementación: `infrastructure/repositories/*.imp-repository.ts`

## Use Cases (100+ casos de uso)

### Casos de Uso Base (Template Pattern)
- `create-base.use-case.ts`
- `find-all-base.use-case.ts`
- `findById-base.use-case.ts`
- `update-base.use-case.ts`
- `delete-base.use-case.ts`

### Casos de Uso por Entidad
Cada entidad tiene sus 6 casos de uso CRUD básicos:
- Auth (9 casos de uso: login, register, logout, forgot-password, reset-password, verify-email, change-password, refresh-token)
- Appointment (6 casos de uso)
- Patient (6 casos de uso)
- Health Provider (6 casos de uso)
- Health Provider Schedule (6 casos de uso)
- Health Provider Exceptions (6 casos de uso)
- Medical Office (6 casos de uso)
- Medical Metrics (6 casos de uso)
- Specialty (6 casos de uso)
- Schedule (6 casos de uso)
- Notes (6 casos de uso)
- Payment (6 casos de uso)
- Plan (6 casos de uso)
- Subscription (6 casos de uso)
- Tenant (6 casos de uso)

## Store (NgXs)

### States (15 states)
Cada entidad tiene su state con:
- Lista de entidades
- Entidad seleccionada
- Loading state
- Error state

### Facades (15 facades)
Cada facade expone:
- Observables del estado
- Métodos para disparar acciones
- Selectores tipados

## Sistema de Componentes UI

### Atomic Design Pattern

#### Átomos (Base Components)
- `ui-button` - Botón con variantes (primary, secondary, outline, ghost, danger)
- `ui-link` - Enlaces con estilos consistentes
- `ui-icon` - Wrapper para Lucide icons
- `ui-card` - Tarjetas reutilizables
- `ui-darkmode` - Toggle de modo oscuro
- `logo` - Logo de la aplicación
- `ui-isotipo` - Isotipo de la aplicación

#### Moléculas (Composed Components)
- `ui-input` - Input con validaciones, iconos, estados (válido/inválido), hints
- `ui-select` - Select con validaciones, iconos, estados (válido/inválido), hints
- `ui-async-select` - Select asíncrono con búsqueda
- `ui-form-group` - Grupo de formulario con label y validaciones
- `ui-breadcrumbs` - Breadcrumbs para navegación
- `ui-notifications` - Sistema de notificaciones
- `ui-user-dropdown` - Dropdown de usuario
- `ui-modal-footer` - Footer de modal
- `ui-modal-body` - Body de modal
- `network-status` - Indicador de estado de red

#### Organismos (Complex Components)
- `ui-calendar` - Calendario completo con eventos
  - `calendar.mapper.ts` - Mapeo de datos
  - `calendar.types.ts` - Tipos del calendario
  - `calendar-event.interface.ts` - Interfaz de eventos
- `ui-modal` - Modal reutilizable

#### Layouts
- `ui-layout-app` - Layout principal de la aplicación
  - `ly-aside` - Sidebar
  - `ly-header` - Header
  - `ly-menu-mobile` - Menú móvil

## Páginas

### Páginas Públicas (Authentication)

**Auth Flow:**
- `auth-page` - Página principal de autenticación
  - `login-page` - Login
  - `forgot-password-page` - Recuperar contraseña
  - `reset-password-page` - Restablecer contraseña
  - `validate-email-page` - Validar email

**Register Flow:**
- `register-page` - Página principal de registro
  - `register-plan-selection-page` - Selección de plan
  - `register-tenant-page` - Registro de tenant
  - `register-user-page` - Registro de usuario

### Páginas Privadas

**Dashboard & Core:**
- `app-page` - Página principal de la app (wrapper)
- `dashboard-page` - Dashboard principal
- `logout-page` - Página de logout

**Gestión de Pacientes:**
- `patients-list-page` - Lista de pacientes
- `patients-detail-page` - Detalle de paciente
- `patient-create-page` - Crear paciente
- Componentes: `patient-search` - Búsqueda de pacientes

**Gestión de Citas:**
- `appointments-list-page` - Lista de citas

**Gestión de Horarios y Bloqueos:**
- `doctor-schedule-page` - Horarios de médicos
- `block-appointments-page` - Bloqueo de citas

**Configuración:**
- `settings-page` - Página principal de configuración
  - `account-detail-page` - Detalles de cuenta
  - `billing-detail-page` - Facturación
  - `medical-office-detail-page` - Oficinas médicas
  - `plan-detail-page` - Plan actual
  - `tenant-detail-page` - Configuración de tenant
  - `users-detail-page` - Gestión de usuarios

## Features (Módulos de Funcionalidad)

### Auth Feature
- `login` - Componente de login
- `register` - Componente de registro
- `forgot-password` - Recuperar contraseña
- `reset-password` - Restablecer contraseña
- `validate-email` - Validar email

### Tenant Feature
- `form-tenant` - Formulario de tenant
- `create-tenant` - Acción de crear tenant

### Appointments Feature
- `appointment-list` - Lista de citas
- `appointment-detail` - Detalle de cita
- `appointment-actions` - Acciones sobre citas
- `appointment-sidebar` - Sidebar de citas
- `appointment-form` - Formulario de cita

### Patient Feature
- `patient-form` - Formulario de paciente

## DTOs (Data Transfer Objects)

- `response.dto.ts` - DTO de respuesta API
- `appointment.dto.ts` - DTO de citas
- `patient.dto.ts` - DTO de pacientes
- `base.dto.ts` - DTO base

## Guards

- `logued-guard.ts` - Verifica usuario autenticado
- `guest-guard.ts` - Verifica usuario NO autenticado

## Cliente HTTP Personalizado

### HttpClient
- Wrapper sobre Angular HttpClient
- Inyección automática de JWT token
- Manejo centralizado de errores
- Interceptores personalizables

### HttpBuilder (Patrón Builder)
- Construcción fluida de peticiones HTTP
- Métodos: `get()`, `post()`, `put()`, `patch()`, `delete()`
- Configuración de headers, params, body
- Gestión de autenticación automática

## PWA (Progressive Web App)

### Componentes PWA
- `install-pwa` - Botón de instalación PWA
- `sync-monitor` - Monitor de sincronización

### Servicios PWA
- `pwa.service.ts` - Gestión de PWA
- `offline-db.service.ts` - Base de datos offline (IndexedDB)
- `sync.service.ts` - Sincronización de datos

### Database Schema
- `db.schema.ts` - Esquema de IndexedDB

## Servicios de Aplicación

- `breadcrumb.service.ts` - Gestión de breadcrumbs
- `theme.service.ts` - Gestión de tema (dark mode)
- `screen-size.service.ts` - Detección de tamaño de pantalla
- `menu.service.ts` - Gestión del menú

## Librerías

- `notificacion.lib.ts` - Sistema de notificaciones
- Interfaces: `notification.interface.ts`

## Dependency Injection

### DI Provider
- `di.provider.ts` - Configuración centralizada de DI

### DI Tokens (16 tokens)
Tokens de inyección para cada entidad:
- `auth.token.ts`
- `appointment.token.ts`
- `patient.token.ts`
- `health-provider.token.ts`
- `health-provider-schedule.token.ts`
- `health-provider-exceptions.token.ts`
- `medical-office.token.ts`
- `medical-metrics.token.ts`
- `speciality.token.ts`
- `schedule.token.ts`
- `notes.token.ts`
- `payment.token.ts`
- `plan.token.ts`
- `subscription.token.ts`
- `tenant.token.ts`

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve

# Build de producción
ng build

# Tests
ng test

# Linting
ng lint

# Generar iconos PWA
npm run generate:icons
```

## Convenciones de Código

### Nomenclatura de Archivos
- Modelos: `*.model.ts`
- Use Cases: `*.use-case.ts`
- Repositorios (Interfaces): `*.repository.ts`
- Repositorios (Implementaciones): `*.imp-repository.ts`
- Adapters: `*.adapter.ts`
- DTOs: `*.dto.ts`
- States: `*.state.ts`
- Facades: `*.facade.ts`
- Tokens: `*.token.ts`

### Patrones de Diseño
- **Repository Pattern** - Abstracción de datos
- **Use Case Pattern** - Casos de uso
- **Builder Pattern** - Cliente HTTP
- **Adapter Pattern** - Mapeo DTO <-> Model
- **Facade Pattern** - Simplificación de NgXs
- **Dependency Injection** - Inversión de control
- **Template Method Pattern** - Base use cases

## Características Principales

1. ✅ Arquitectura Clean Architecture
2. ✅ Sistema de autenticación JWT completo
3. ✅ Gestión de citas médicas con calendario
4. ✅ Gestión de pacientes (CRUD completo)
5. ✅ Gestión de profesionales de salud
6. ✅ Gestión de horarios y excepciones
7. ✅ Gestión de consultorios médicos
8. ✅ Sistema de planes y suscripciones
9. ✅ Sistema de pagos
10. ✅ Notas clínicas
11. ✅ Métricas médicas
12. ✅ PWA con soporte offline
13. ✅ State Management con NgXs
14. ✅ Cliente HTTP personalizado
15. ✅ Sistema de notificaciones
16. ✅ Tema oscuro (dark mode)
17. ✅ Diseño responsive
18. ✅ Sistema de componentes UI reutilizables
19. ✅ Multi-tenancy (Tenants)

## Notas Importantes para Claude

- El proyecto sigue ESTRICTAMENTE Clean Architecture
- NUNCA mezclar capas (Domain no debe conocer Infrastructure)
- Los repositorios en Domain son INTERFACES, las implementaciones van en Infrastructure
- Los Use Cases SOLO deben usar interfaces de repositorios, no implementaciones
- Los DTOs se usan SOLO en la capa de Infrastructure
- Los Models se usan en Domain y Application
- Los Adapters convierten DTO <-> Model
- Todos los componentes UI siguen Atomic Design
- El estado se maneja con NgXs (no usar servicios con estado mutable)
- Usar el HttpBuilder para todas las peticiones HTTP
- Seguir las convenciones de nomenclatura de archivos
- Los componentes de UI deben implementar ControlValueAccessor cuando son inputs de formulario
- Usar FormControl y ReactiveFormsModule para formularios
- El sistema de validaciones de UI está estandarizado (ui-input, ui-select)
