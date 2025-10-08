# AI-Powered Travel Recommendation MVP

## Overview

This is an AI-first travel recommendation application that helps users discover personalized destinations, stays, and experiences. The application integrates AI-powered recommendations into a traditional travel booking platform, providing intelligent suggestions based on user preferences, historical data, and contextual information. Users can interact with destinations through like/skip actions, view detailed destination information with activity recommendations, and explore locations through interactive map views.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing with a single main route (`/`) serving the AI Recommendations page.

**UI Component System**: shadcn/ui (New York style) built on Radix UI primitives with custom Tailwind CSS configuration. The design follows a reference-based approach inspired by Airbnb's aspirational travel aesthetic, Pinterest's discovery patterns, and Booking.com's trustworthy UI.

**State Management**: 
- TanStack Query (React Query) for server state management and data fetching
- React hooks for local component state
- Context API for theme management

**Styling Approach**:
- Tailwind CSS with custom design tokens
- CSS variables for theming (light/dark mode support)
- Custom color palette focused on travel and AI visualization
- Inter font family for UI, with heavier weights for headlines

**Key Design Decisions**:
- Component-based architecture with reusable UI primitives
- Separation of concerns with dedicated components for AI chat, destination cards, maps, and modals
- Responsive design with mobile-first approach
- Accessibility-first using Radix UI primitives

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js.

**API Structure**: RESTful API design with routes prefixed under `/api`. Currently uses a minimal route setup prepared for expansion.

**Data Storage**: 
- Primary: In-memory storage (`MemStorage` class) implementing the `IStorage` interface
- Prepared for: PostgreSQL via Drizzle ORM (configuration exists but not yet connected)
- Session storage: Designed for `connect-pg-simple` for PostgreSQL-backed sessions

**Development Tools**:
- Hot module replacement (HMR) via Vite in development
- Custom logging middleware for API request monitoring
- Error handling middleware for consistent error responses

**Key Design Decisions**:
- Storage abstraction layer allows easy migration from in-memory to persistent database
- Middleware-first architecture for cross-cutting concerns (logging, error handling)
- Separation of Vite development server from production static file serving

### Data Models

**Database Schema** (defined but not yet migrated):

1. **Users Table**:
   - id (UUID, primary key)
   - username (text, unique)
   - password (text)

2. **Destinations Table**:
   - id (UUID, primary key)
   - name, location, imageUrl (text)
   - duration (text)
   - price (integer)
   - category (text)
   - aiReason (text) - AI-generated personalization reason
   - description (text, optional)

3. **User Interactions Table**:
   - id (UUID, primary key)
   - userId (UUID, foreign key)
   - destinationId (UUID, foreign key)
   - action (text) - tracks like/skip/view actions

**Frontend-only Models** (currently hardcoded):
- Activities with location coordinates, vibes, ratings
- Vibe zones for destination mapping
- Weather and transportation mock data

**Rationale**: The schema supports personalization tracking while keeping the initial MVP simple. The AI reasoning field stores human-readable explanations for recommendations.

### Key Features

1. **AI Chat Bar**: Natural language search interface with quick prompt suggestions for different travel preferences (beach, mountain, luxury, budget).

2. **Destination Discovery Feed**: Card-based interface showing personalized destinations with AI-generated reasoning, like/skip interactions, and "View Stays" action.

3. **Interactive Map Views**: 
   - Regional map showing all recommended destinations with weather and transportation info
   - Detailed destination maps with activity markers and vibe zones
   - Visual representation of different activity types and vibes using color-coded zones

4. **Destination Detail Modal**: Deep-dive view featuring:
   - Split view between map and activity list
   - Filterable activities by vibe type
   - Activity selection and highlighting on map

5. **Theme System**: Complete light/dark mode support with custom color tokens optimized for travel content and AI visualization.

### Project Structure Rationale

- **`/client`**: All frontend code, separate from server to enable independent deployment
- **`/server`**: Backend API and server configuration
- **`/shared`**: Code shared between frontend and backend (schemas, types)
- **`/attached_assets`**: Static assets like images and product documentation
- **Path aliases**: TypeScript path mapping for clean imports (`@/`, `@shared/`, `@assets/`)

This structure enables:
- Clear separation of concerns
- Independent scaling of frontend and backend
- Type safety across the full stack
- Easy code sharing for validation schemas

## External Dependencies

### Frontend Libraries

- **@radix-ui/\***: Unstyled, accessible component primitives for building the UI system
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management for components
- **lucide-react**: Icon library
- **date-fns**: Date manipulation and formatting

### Backend Libraries

- **express**: Web application framework
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: CLI for database migrations
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **connect-pg-simple**: PostgreSQL session store for Express

### Build Tools

- **vite**: Frontend build tool and dev server with HMR
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds
- **@replit/vite-plugin-\***: Replit-specific development plugins (cartographer, runtime error modal, dev banner)

### Development Dependencies

- **typescript**: Type checking and compilation
- **@types/\***: TypeScript type definitions
- **postcss**: CSS processing with autoprefixer

### Database

- **PostgreSQL**: Configured via Drizzle with Neon serverless driver (DATABASE_URL environment variable required)
- **Migration system**: Drizzle Kit managing schema migrations in `/migrations` directory

### Font Resources

- **Google Fonts**: Inter font family loaded via CDN for consistent typography

### Key Integration Points

1. **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
2. **Session Management**: Prepared for PostgreSQL-backed sessions but currently using in-memory storage
3. **Asset Management**: Static images stored in `/attached_assets/stock_images/`
4. **Development Environment**: Replit-specific plugins for enhanced DX when running on Replit platform