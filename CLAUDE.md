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

### Current Data Model

The backend currently has a `Todo` model with:
- `content` (string)
- Authorization: Guest access allowed (identityPool mode)

### Backend Configuration

- Path aliases: `$amplify/*` maps to `.amplify/generated/*` (Amplify-generated code)
- Generated outputs: `amplify_outputs.json` contains deployed resource IDs and endpoints (gitignored)
- TypeScript config: `amplify/tsconfig.json` uses ES2022 target with bundler resolution

### Working with Amplify

When modifying backend resources:
1. Edit resource files in `amplify/` directory
2. Changes deploy automatically in sandbox mode
3. Generated client types available via `amplify/data/resource.ts` exports
4. Frontend connects using `generateClient<Schema>()` from `aws-amplify/data`

## Frontend Architecture

- Framework: Next.js 15 with App Router
- Styling: Tailwind CSS 4 with custom Geist fonts
- Path aliases: `@/*` maps to project root
- TypeScript strict mode enabled
- React Server Components by default

### Project Structure

- `app/` - Next.js app directory with routes and layouts
  - `app/layout.tsx` - Root layout with fonts and metadata
  - `app/page.tsx` - Home page component
  - `app/globals.css` - Global styles with Tailwind

## AWS Configuration

The app uses:
- AWS Cognito for authentication (user pool + identity pool)
- AWS AppSync for GraphQL API
- DynamoDB for data storage (via Amplify Data)
- Region: us-east-1

Unauthenticated identities are enabled for guest access.
