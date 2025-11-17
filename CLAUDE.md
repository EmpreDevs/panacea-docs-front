# Agenda Médica - Medical Appointment Scheduling App

This is an Angular-based medical appointment scheduling application built with clean architecture principles.

## Project Structure

- **Domain Layer**: Contains business models, entities, and repository interfaces
- **Application Layer**: Houses use cases and business logic
- **Infrastructure Layer**: Implements adapters, repositories, and external dependencies
- **Shared Layer**: Common interfaces and utilities

## Key Technologies

- **Framework**: Angular
- **Architecture**: Clean Architecture with DI (Dependency Injection)
- **Authentication**: JWT-based auth system
- **HTTP Client**: Custom HTTP client with builder pattern

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Run linting
ng lint

# Run type checking
ng build --configuration=production
```

## Current Features

- ✅ Authentication system (login, register, password reset, etc.)
- ✅ Specialty management (CRUD operations)
- ✅ Clean architecture implementation
- ✅ HTTP client with builder pattern
- ✅ Environment configuration

## Architecture Notes

The application follows clean architecture with clear separation of concerns:

1. **Domain**: Business entities and repository contracts
2. **Application**: Use cases implementing business logic
3. **Infrastructure**: Technical implementations and external adapters
4. **Dependency Injection**: Centralized DI configuration

## File Naming Conventions

- Models: `*.model.ts`
- Use Cases: `*.use-case.ts`
- Repositories: `*.repository.ts` (interfaces), `*.imp-repository.ts` (implementations)
- Adapters: `*.adapter.ts`
- DTOs: `*.dto.ts`