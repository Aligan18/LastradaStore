# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing an e-commerce admin panel built with React, TypeScript, Vite, and Supabase. The project manages products, purchases, sales (realizations), and deliveries with messaging integrations for WhatsApp and Instagram.

## Development Commands

### Admin Panel
```bash
# Start development server
npm run dev-admin
# or from Admin directory
cd Admin && npm run dev

# Build for production
cd Admin && npm run build

# Lint code
cd Admin && npm run lint

# Preview production build
cd Admin && npm run preview
```

### Type Generation
```bash
# Generate TypeScript types from Supabase schema
npm run gen:types
```

This command:
1. Fetches the latest database schema from Supabase
2. Generates types in `supabase.types.ts` at the root
3. Copies types to `Admin/src/shared/types/supabase.types.ts` via `scripts/copy-types.js`

## Architecture

### Monorepo Structure
- **Root**: Contains shared Supabase types and scripts
- **Admin/**: Full admin panel application

### Admin Panel Architecture

The application follows Feature-Sliced Design principles with a layered architecture:

**Layers (ordered by dependency hierarchy):**
1. **app/** - Application initialization and providers
   - `App.tsx` - Root component with routing
   - `providers/` - Context providers (Store, Theme, Layout, Router)
   - `routes/` - Centralized route configuration via `routeMap.tsx`
2. **pages/** - Route-level components (RealizationPage, PurchasePage, DeliveryPage, RealizationHistoryPage)
3. **widgets/** - Composite UI blocks combining multiple modules
4. **modules/** - Business logic domains (client, product, purchase, realization)
5. **components/** - Feature-specific components
6. **shared/** - Reusable utilities, UI components, configs, constants

### Path Aliases

TypeScript path aliases are configured in `tsconfig.app.json`:
```typescript
"@app"        → "src/app"
"@pages"      → "src/pages"
"@widgets"    → "src/widgets"
"@modules"    → "src/modules"
"@components" → "src/components"
"@shared"     → "src/shared"
```

### State Management

Uses Redux Toolkit with RTK Query for API state:
- **Store configuration**: `app/providers/store/store.ts`
- **API slices**: Each domain has its own RTK Query API (`clientApi`, `productApi`, `purchaseApi`, `realizationApi`)
- **Local state**: `realizationSlice` for realization modal and form state

### Database & API

**Supabase** is used as the backend (PostgreSQL + REST API):
- Client initialization: `shared/configs/database/supabaseClient.ts`
- Environment variables required:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- RTK Query uses a custom `baseQueryWithAdapter` for Supabase integration
- Types are auto-generated from database schema

### Routing System

Routes are centrally managed in `app/routes/`:
- `routeMap.tsx` - Single source of truth mapping paths to components and menu items
- `routeItems.tsx` - Generates React Router route configs
- `menuItems.tsx` - Generates sidebar menu items (only routes with `menuLabel`)
- Routes and menus stay synchronized automatically

### Module Pattern

Each domain module (`modules/*`) typically contains:
- `api/` - RTK Query endpoints and API logic
- `store/` - Redux slices and selectors (if needed)
- `ui/` - Module-specific UI components
- `utils/` - Module-specific utilities

### Shared Layer Organization

- `configs/` - Third-party library configs (Ant Design, Supabase)
- `constants/` - Application constants (pagination, methods, reducer paths)
- `hooks/` - Reusable React hooks
- `ui/` - Generic UI components (CustomTable, CustomModal, CustomSelect, etc.)
- `utils/` - Generic utilities including API helpers and messaging integrations
- `types/` - Shared TypeScript types including Supabase types

### Messaging Integration

The app can send messages to customers via:
- **WhatsApp**: `shared/utils/sendMessage/messengers/sendToWhatsApp.ts`
- **Instagram**: `shared/utils/sendMessage/messengers/sendToInstagram.ts`
- Unified interface: `shared/utils/sendMessage/sendToMessenger.ts`

### UI Framework

- **Ant Design v6** for component library
- **SCSS** for styling
- Custom theme configuration in `app/providers/theme/ThemeProvider.tsx`
- Ant Design config customizations in `shared/configs/antd/`

## Code Style

- **ESLint**: Configured with TypeScript, React Hooks, and Prettier integration
- **Prettier**: Configured with custom import order (check `.prettierrc.json`)
- **Strict TypeScript**: Enabled in tsconfig with strict mode
- **No semicolons**: Project uses semicolon-free style
- **Import order**: Custom order defined in Prettier config (local → app → pages → widgets → modules → components → shared)

## Environment Setup

Required environment files:
- **Root `.env`**: Contains `SUPABASE_PROJECT_REF` for type generation
- **Admin `.env.local`**: Contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for runtime

## Key Technical Patterns

**Supabase Query Builder:**
The app uses a custom `createSelectRequest` utility (`shared/utils/api/createSelectRequest.ts`) to build type-safe Supabase select queries with nested relations.

**RTK Query Integration:**
Each domain API extends from a base API with Supabase adapter and includes tag-based cache invalidation.

**Route Configuration:**
Use `createRoute` helper to define routes with both React Router config and menu properties in one place.
