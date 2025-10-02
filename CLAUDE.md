# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ValorHomes is a Next.js 15 application with AWS Amplify Gen2 backend integration. The app helps users find homes financed with VA loans to assume low interest rates. Built with React 19, TypeScript, and Tailwind CSS 4.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens at http://localhost:3000)
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## AWS Amplify Backend Architecture

The backend is defined in the `amplify/` directory using AWS Amplify Gen2:

### Backend Structure

- `amplify/backend.ts` - Main backend definition that imports and configures all resources
- `amplify/auth/resource.ts` - Authentication configuration (email-based login via Cognito)
- `amplify/data/resource.ts` - GraphQL API schema and data models (AppSync + DynamoDB)

### Current Data Models

**User Model:**
- email, firstName, lastName (required)
- phoneNumber, profilePhotoUrl (optional)
- Relationship: hasMany Listings
- Authorization: Owner can manage own profile, authenticated users can read

**Listing Model:**
- Basic Info: slug, address, city, state, zipCode
- Pricing: price, beds, baths, sqft
- Financial: assumableRate, loanBalance, equity
- Details: description, schoolDistrict, hoaFees, amenities (array)
- Images: primaryImageUrl, imageUrls (array)
- Metadata: listingDate, status (enum: active/pending/sold/archived)
- Owner: userId (relationship to User)
- Authorization: Authenticated users can read all, only owner can create/update/delete

### Backend Configuration

- Path aliases: `$amplify/*` maps to `.amplify/generated/*` (Amplify-generated code)
- Generated outputs: `amplify_outputs.json` contains deployed resource IDs and endpoints (gitignored)
- TypeScript config: `amplify/tsconfig.json` uses ES2022 target with bundler resolution
- Authorization Mode: userPool (authenticated users required)
- Auto-confirm users: Enabled for development (see auth/resource.ts triggers)

### Storage Configuration

S3 buckets configured in `amplify/storage/resource.ts`:
- `properties/{property_id}/*` - Property listing photos (read: guest, write: authenticated)
- `profiles/{entity_id}/*` - User profile pictures (read/write: owner only)
- `public/*` - Public assets (read: all)

### Working with Amplify

When modifying backend resources:
1. Edit resource files in `amplify/` directory
2. Run `npx ampx sandbox` to deploy changes
3. Generated client types available via `amplify/data/resource.ts` exports
4. Frontend connects using `generateClient<Schema>()` from `aws-amplify/data`

**Important**: Use client components (`'use client'`) for data fetching. Server-side data fetching with Amplify requires special configuration.

## Frontend Architecture

- Framework: Next.js 15 with App Router
- Styling: Tailwind CSS 4 with custom Geist fonts and Headless UI
- Path aliases: `@/*` maps to project root
- TypeScript strict mode enabled
- Client Components for Amplify data fetching

### Project Structure

- `app/(auth)/` - Authentication routes (login, signup)
- `app/(marketing)/` - Public marketing pages
- `app/(app)/` - Authenticated app routes
  - `app/(app)/layout.tsx` - App layout with auth guard
  - `app/(app)/components/` - Shared components (Header, Menu)
  - `app/(app)/listings/` - Listings pages
    - `page.tsx` - Listings list page
    - `ListingsList.tsx` - Client component fetching listings
    - `ListingItem.tsx` - Individual listing card
    - `[slug]/page.tsx` - Listing detail page
  - `app/(app)/favorites/` - User favorites
  - `app/(app)/dashboard/` - User dashboard
  - `app/(app)/seed-data/` - Database seeding page (dev only)
- `app/components/` - Global components (AuthProvider, ConfigureAmplifyClientSide)
- `scripts/` - Utility scripts (seed-listings.ts, seed-simple.ts)
- `utils/` - Utility functions (amplify-server-utils.ts)

## AWS Configuration

The app uses:
- AWS Cognito for authentication (user pool + identity pool)
- AWS AppSync for GraphQL API
- DynamoDB for data storage (via Amplify Data)
- S3 for file storage (property images, profile photos)
- Region: us-east-1

**Authentication:**
- Email-based login (no username)
- Auto-confirm enabled for development
- Authenticated users only (no guest access to listings)

## Development Workflow

### Seeding Data

To populate the database with sample listings:
1. Visit `/seed-data` while logged in
2. Click "Seed Database" button
3. Creates 10 sample listings under your account

Alternative: Run `npm run seed` (requires browser session)

### Key Features

- **Listings View**: Browse all active VA loan assumable properties
- **Listing Details**: Full property information including:
  - Financial breakdown (loan balance, equity required, assumable rate)
  - Monthly payment comparison (market rate vs VA rate)
  - Property details (beds, baths, sqft, amenities, school district, HOA)
  - Multiple property images
- **User Ownership**: Users can only edit/delete their own listings
- **Filter/Search**: Price, listing age, and state filters (UI implemented)
