# GrowYour Platform - AI Coding Agent Instructions

## Project Overview

**GrowYour Need** is a comprehensive multi-tenant SaaS platform providing an integrated "digital operating system" for educational institutions and individuals. Built with React + TypeScript and Vite, it features:

- **Multi-Dashboard System**: Role-based dashboards (Owner, School Admin, Teacher, Parent, Student, Individual)
- **Marketing Website**: Public-facing pages for company promotion
- **Authentication System**: Login, signup, registration, password reset flows
- **Overlay App System**: 13+ launchable applications (Studio, Media, Market, Events, etc.)

The platform serves both B2B (schools) and B2C (individuals) customers with a unified codebase that adapts based on user role and tenant context.

## System Architecture

### Multi-Dashboard Role-Based System

The platform has **6 separate role-based dashboards**, each with its own navigation and content:

- **Owner Dashboard** (separate): Platform-wide analytics, tenant management, system health monitoring
- **School Admin Dashboard** (separate): School management, academics, finance, staff/student management
- **Teacher Dashboard** (separate): Classroom management, lesson planning, gradebook, student analytics
- **Parent Dashboard** (separate): Child monitoring, grades, attendance, communication with teachers
- **Student Dashboard** (separate): Course hub, AI study tools, assignments, wellness tracking
- **Individual Dashboard** (separate): Project management, creative workspace, personal productivity

**Important**: Each dashboard is a completely separate implementation, but they ALL share the **exact same layout structure** (Header, Footer, Right Sidebar, Left SubNav) with role-specific navigation and content.

**Key Pattern**: Navigation configured via `NAVIGATION_MAP` in `src/lib/constants.ts` defines right sidebar → header tabs → left subnav hierarchy for each role.

**Critical Design Principle**: The current dashboard design (currently implemented for Owner) is the MASTER TEMPLATE for ALL role dashboards. Every role dashboard (School Admin, Teacher, Parent, Student, Individual) MUST use:

- **Same layout structure**: Identical positioning of Header, Footer, Right Sidebar, Left SubNav
- **Same component design**: All UI components (buttons, cards, navigation elements) styled identically
- **Same interactions**: Hover states, animations, transitions work the same way
- **Same spacing & dimensions**: Padding, margins, border radius, shadows remain consistent
- **ONLY differences allowed**: Button labels, navigation items, and content displayed - the visual design stays identical

**Important**: Every role uses the same design system and UI shell. Only the navigation items and content differ based on role permissions.

### App Launcher System (Core Pattern)

The platform uses **overlay-based windowing** managed by `AppLauncherContext`:

- Main dashboard displays when no app is active
- Apps launch as full-screen overlays via `AppManager` component
- Each app has minimize/restore/close window controls
- `openApps`, `minimizedApps`, and `activeAppId` track window states

**App Launcher Access**:

- **All roles** have access to the App Launcher (Studio, Media, Market, Events, etc.)
- **Settings Backend** (overlay-setting) is **ONLY visible to the Owner role** - this controls platform-wide backend configurations
- Other roles see the standard Settings app for their personal/tenant-specific settings

**Key files**: `src/context/AppLauncherContext.tsx`, `src/app/app-launcher/AppManager.tsx`

### Navigation Hierarchy (Triple-Layer)

Navigation flows through **three interconnected levels**:

1. **Right Sidebar**: Top-level sections (`dashboard`, `students`, `staff`, `academics`, `finance`)
2. **Header Tabs**: Secondary navigation (e.g., Dashboard → Overview/Analytics/Reports)
3. **Left Sidebar**: Tertiary navigation (e.g., Students → All Students → Grade 9/10/11)

Navigation state managed by `useNavigationState` hook, configured via `NAVIGATION_MAP` in `src/lib/constants.ts`.

**Pattern**: Right nav selection → auto-loads first header tab → auto-loads first subnav item.

### App Structure

Each launchable app follows this pattern:

```tsx
// src/app/app-launcher/{app-name}/{AppName}App.tsx
- AppHeader (top tabs)
- AppSubNavLeft (left sidebar with title)
- Content area (dynamic based on activeSubItem)
```

**Constants file**: Each app has `constants.ts` defining `HEADER_ITEMS` and `NAV_MAP` for navigation.

## Design System

### Color Tokens

All colors use custom CSS variables with `gyn-` prefix in `src/app/global.css`:

- Backgrounds: `gyn-bg-{primary|secondary|tertiary}-{light|dark}`
- Text: `gyn-text-{primary|secondary}-{light|dark}`
- Borders: `gyn-border-primary-{light|dark}`
- Accents: `gyn-accent-{light|dark}`, `gyn-orange`, `gyn-tan`
- Sidebar: `gyn-sidebar-{light|dark}`, `gyn-sidebar-text-{light|dark}`

**Usage**: `bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark` (always provide light/dark pairs)

**Dark Mode Design Philosophy - Cutting-Edge Visual Approach**:

**Core Principle**: Create a multi-layered, high-contrast dark mode that feels premium, spatial, and innovative—NOT a flat black interface.

**Visual Hierarchy Through Light**:

- **Primary Interactive Elements**: Keep bright/white (`bg-white dark:bg-white`, `bg-white/95 dark:bg-white/95`)
  - Header navigation buttons, Primary action buttons, Active states and selections
- **Secondary Elements**: Use light grays and semi-transparent whites (`bg-white/10`, `bg-gray-100/5`)
  - Cards with `backdrop-blur-xl` for frosted glass effect, Elevated surfaces with subtle `shadow-2xl`
- **Tertiary Elements**: Medium dark tones (`bg-gray-800/50`, `bg-gray-900/40`) for background panels

**Depth & Dimensionality**:

- **Glassmorphism**: `backdrop-blur-xl` + `bg-white/5` + `border border-white/10` for floating glass panels
- **Elevation System**: Level 0: `bg-gray-950/95`, Level 1: `bg-white/5` with `shadow-lg`, Level 2: `bg-white/10` with `shadow-2xl`
- **Glow Effects**: `shadow-[0_0_30px_rgba(59,130,246,0.3)]` on interactive elements for ambient glow
- **Border Illumination**: `border-t border-white/20` on top edges to simulate light reflection

**Color Accents in Darkness**:

- **Vibrant Highlights**: Saturated accent colors (`bg-blue-500`, `bg-purple-500`) for CTAs
- **Subtle Color Tints**: Colored shadows (`shadow-blue-500/20`) for atmospheric depth
- **Gradient Overlays**: `bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5`

**Micro-Interactions & Motion**:

- **Hover Glow**: `hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]` on cards
- **Active Pulse**: `scale-[0.98]` + increased glow on click
- **Smooth Transitions**: `transition-all duration-300 ease-out`
- **Animated Borders**: Gradient borders using `@keyframes` for premium feel

**Advanced Techniques**:

- **Mesh Gradients**: CSS mesh gradients as card backgrounds for organic patterns
- **Noise Texture**: Subtle noise overlay (`bg-[url('/noise.svg')]`) for tactile feel
- **Perspective Effects**: `transform-style: preserve-3d` for 3D card tilts on hover
- **Light Leaks**: Thin colored lines (`border-l-2 border-blue-400/30`) simulating light bleeding

**Right Sidebar Contrast**: Lighter background (`bg-gray-800` vs `bg-gray-950`), icon buttons with white: `bg-white dark:bg-white/90`

**Typography in Dark Mode**: Headings: `text-white`, Body: `text-gray-300`, Secondary: `text-gray-500`, Increase font weight for readability

**Goal**: Create a dark mode like a high-end desktop app—spatial, layered, with intelligent light sources and depth cues that guide the eye naturally.

### Aurora Gradient Background

Animated gradient wrapper: `bg-aurora-gradient bg-[length:200%_200%] animate-aurora`

### Modern Visual Design System

**Bento Grid Layout**: Use responsive bento grid system for content organization:

```tsx
<div className="grid h-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 lg:grid-rows-6 gap-4">
  {/* Responsive grid items */}
</div>
```

**Grid System Rules**:

- **Desktop (lg)**: 12 columns (`grid-cols-12`)
- **iPad/Tablet (md)**: 8-10 columns (`grid-cols-8` or `grid-cols-10`)
- **Mobile**:
  - 4 columns (`grid-cols-4`) for 4×4 layouts
  - 3 columns (`grid-cols-3`) for 3×3 layouts
  - 2 columns (`grid-cols-2`) for 2×2 layouts

Cards should span appropriate column widths at each breakpoint to fill viewport precisely without scrolling.

**Card Components**: Implement cutting-edge, elegant card designs:

- Glassmorphism effects with `backdrop-blur-xl` and semi-transparent backgrounds
- Subtle shadows: `shadow-custom`, `shadow-md`, `shadow-lg`
- Smooth hover transitions and animations
- Border radius: `rounded-lg`, `rounded-xl` for modern aesthetic

**Custom SVG Backgrounds**: Enhance user experience with real-world SVG backgrounds:

- Abstract geometric patterns
- Subtle texture overlays
- Animated gradient meshes
- Context-aware illustrations that match content theme

**Modern UI Patterns**:

- Bento box layouts for dashboard views
- Asymmetric grid arrangements for visual interest
- Card stacking and layering effects
- Micro-interactions on hover/click states

## Development Commands

```bash
pnpm dev          # Start dev server on port 3040
pnpm build        # Production build
pnpm preview      # Preview production build
```

## Authentication & User Management

### Authentication System

**CRITICAL**: Use established, production-ready open-source authentication solutions. Do NOT build custom auth from scratch.

**Recommended Options**:

- **NextAuth.js / Auth.js** - Industry standard for Next.js/React apps
- **Clerk** - Complete user management with built-in UI components
- **Supabase Auth** - Open-source Firebase alternative with built-in auth
- **Auth0** - Enterprise-grade authentication service

**Required Flows**:

- Login (email/password, social OAuth)
- Signup/Registration (with email verification)
- Password reset/forgot password
- Multi-factor authentication (2FA)
- Session management with JWT/cookies
- Role-based access control (RBAC)

**User Registration Patterns**:

- **Individual Users (B2C)**: Self-register through the public website marketing pages. Create their own account and get immediate access to the Individual Dashboard.
- **School Users (B2B)**: School Admin creates accounts for Teachers, Parents, and Students within their tenant. These users receive login credentials but do NOT self-register.
- **School Admin**: Registered by the Platform Owner when a school subscribes to the platform.

**Implementation Priority**: Integrate auth solution FIRST before building custom features. This saves significant development time and ensures security best practices.

### Marketing Website Pages

Public pages for company promotion (separate from authenticated dashboards):

- WHO.we.ARE (company overview, value proposition)
- OuR.FEATURES page (platform capabilities)
- WHO.we.ARE page (subscription plans for schools/individuals)
- About page (company mission, team)
- OuR.CONTACT page (sales inquiries, support)

**Pattern**: Marketing pages are public routes; dashboards require authentication.

## Environment Setup

Create `.env.local` with:

```
GEMINI_API_KEY=your_api_key_here
# Auth provider credentials (NextAuth, Clerk, etc.)
DATABASE_URL=your_database_connection_string
```

Vite exposes env vars as `process.env.{VAR_NAME}` via config.

## Path Aliases

Import using `@/` prefix for root: `import { NAVIGATION_MAP } from '@/src/lib/constants'`

## Key Conventions

### Component Patterns

- **Shared components**: `src/components/` (dashboard-level, reusable)
- **App-specific components**: `src/components/app-launcher/{app-name}/`
- **Shared app components**: `src/components/app-launcher/shared/` (AppHeader, AppSubNavLeft, AppContent)

### Type Definitions

Central types in `src/types/index.ts`:

- `NavItem` - Generic nav item with id/label/icon
- `RightNavItem` - Right sidebar items (typed IDs)
- `AppItem` - Launchable app metadata
- `AppState` - Open app window state
- `AppHeaderItem`, `AppNavItem` - App-specific navigation

### State Management

- Global app state: `AppLauncherContext` (overlay windows)
- Navigation state: `useNavigationState` hook (dashboard navigation)
- Theme: `ThemeContext` (light/dark mode)

### API Layer

API functions in `src/app/api/{section}/`:

- Most are placeholder files (future backend integration)
- Settings app has detailed API implementations (calendarApi.ts, etc.)
- Pattern: `async` functions returning typed data

### Multi-Tenancy Architecture

The platform supports isolated tenant environments:

- **School Tenants**: Each school is a separate tenant with isolated data (students, staff, curriculum)
- **Individual Tenants**: Personal workspaces for creators/learners
- **Tenant Scoping**: All data queries filtered by tenant ID from authenticated user context
- **Feature Flags**: Per-tenant feature enablement via subscription plans

**Implementation**: Tenant context passed via React Context or database queries scoped by `tenantId`.

## Layout Specifications

### Fixed Component Dimensions (MUST MAINTAIN ACROSS ALL BREAKPOINTS)

Preserve these exact dimensions on desktop, iPad, and mobile to maintain design integrity:

- **Top Header Bar**: `h-20` (5rem / 80px) - contains logo, search, notifications, profile
- **Right Sidebar**: `w-16` (4rem / 64px) when visible - primary navigation icons
- **Left Sidebar**: `w-64` (16rem / 256px) when expanded - secondary navigation with labels
- **Footer**: `h-16` (4rem / 64px) - bottom bar with status/controls
- **Header Tabs** (secondary nav): `h-12` (3rem / 48px) - navigation tabs below/in top bar

**Critical**: Do NOT adjust these heights/widths when implementing responsive features. These are core design constants.

### Scrolling Behavior

**IMPORTANT - No Scrollbars on Shell Components**:

- **Header**: NO vertical or horizontal scrolling - content must fit within fixed `h-20` height
- **Right Sidebar**: NO vertical or horizontal scrolling - all navigation icons must be visible without scroll
- **Left SubNav**: NO vertical or horizontal scrolling - navigation items must fit within the fixed dimensions
- **Footer**: NO vertical or horizontal scrolling - controls remain fixed

**Content Area Scrolling Rules**:

- **Desktop & iPad**: NO vertical or horizontal scrolling - content must fit precisely within viewport using responsive grid layouts
- **Mobile ONLY**: Vertical scrolling allowed when content exceeds viewport height
- Use bento grid system and responsive card layouts to ensure content fits without scrolling on larger screens

Shell components (Header, Sidebars, Footer) are always fixed and non-scrollable across all breakpoints.

### Responsive Behavior Patterns

- **Desktop (>767px)**:
  - Header tabs in top bar (center)
  - Left sidebar vertical, collapsible
  - Right sidebar always visible
- **iPad/Tablet (768px-1023px)**:
  - Same layout as desktop
  - Maintain all fixed dimensions
  - Adjust content area padding/spacing only
- **Mobile (≤767px)**:
  - Header tabs move below top bar (`h-12` horizontal scroll)
  - Right sidebar toggleable via footer button
  - Left sidebar overlay or drawer
  - **Fixed dimensions still apply**

### Breakpoint System

Use this complete 9-point breakpoint system for responsive design:

```javascript
screens: {
  'xxs': '320px',   // iPhone SE minimum
  'xs': '375px',    // iPhone standard (CRITICAL)
  'xsm': '380px',   // Android phones
  'sm': '640px',    // Large phones/landscape
  'md': '768px',    // Tablets (CRITICAL)
  'lg': '1024px',   // Laptops (CRITICAL)
  'xl': '1280px',   // Desktops (CRITICAL)
  '2xl': '1536px',  // Large monitors
  '3xl': '1920px',  // Ultra-wide
}
```

### Breakpoint Detection

```tsx
const isMobile = useMediaQuery("(max-width: 767px)");
const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
```

### Sidebar State Management

- Sidebars collapse/expand with `isLeftSidebarCollapsed`, `isRightSidebarCollapsed`
- Mobile: Sidebars overlay content when open (use `absolute` positioning)
- Desktop/iPad: Sidebars inline with content (use `flex` layout)

## Adding New Features

### New Launchable App

1. Create `src/app/app-launcher/{app-id}/{AppName}App.tsx`
2. Add to `LAUNCHER_APPS` in `src/lib/constants.ts`
3. Register component in `appComponents` map in `AppManager.tsx`
4. Create `constants.ts` with `HEADER_ITEMS` and `NAV_MAP`

### New Dashboard Section

1. Add to `RIGHT_NAV_ITEMS` in `src/lib/constants.ts`
2. Define navigation structure in `NAVIGATION_MAP`
3. Update `MainContent.tsx` switch statement for content rendering

### New View Component

Follow grid layout pattern:

```tsx
<div className="grid h-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 lg:grid-rows-6 gap-4">
  {/* Responsive grid items */}
</div>
```

## Styling Guidelines

- Use Tailwind utilities with design system tokens
- Always provide light/dark mode variants: `dark:bg-gyn-*`
- Animations: `animate-fadeInUp`, `animate-scaleIn`, `animate-scaleOut` (duration: 300ms)
- Borders: Use `/50` or `/20` opacity for subtle effects
- Backdrop blur: `backdrop-blur-xl` on translucent containers

### Responsive Layout Rules

- **DO NOT change fixed component dimensions** (`h-20`, `h-16`, `h-12`, `w-16`, `w-64`) across breakpoints
- **DO adjust**: content padding, grid columns, font sizes, spacing between elements
- **DO maintain**: aspect ratios, component hierarchies, z-index layering
- Use responsive grid: `grid-cols-4 md:grid-cols-8 lg:grid-cols-12` for content areas
- Test all changes on desktop (1920px), iPad (1024px), and mobile (375px) viewports

## Common Pitfalls

- **Missing imports**: Always import `NAVIGATION_MAP` when referencing nav structure
- **Type mismatches**: Use specific types (`RightNavItemId`) not generic strings
- **Navigation sync**: When adding right nav items, update all three layers (right→header→subnav)
- **Window management**: Apps auto-minimize when `activeAppId` changes, restore brings back
- **CSS variables**: Always use `rgb(var(--gyn-color))` format, not direct var()
- **Layout dimensions**: NEVER modify fixed heights/widths (`h-20`, `h-16`, `h-12`, `w-16`, `w-64`) across responsive breakpoints
- **Responsive changes**: Only adjust content area, padding, and grid layouts—keep shell components unchanged
