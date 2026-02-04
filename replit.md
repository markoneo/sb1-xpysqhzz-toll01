# EU Toll Calculator

## Overview
A web application that helps travelers estimate toll and vignette costs for European road trips. The app calculates motorway tolls, tunnel fees, and vignette requirements across multiple European countries including Austria, Switzerland, Slovenia, Italy, France, and more.

## Current State
- **Status**: Fully migrated from Bolt to Replit environment
- **Last Updated**: February 4, 2026

## Project Architecture

### Frontend (React + Vite)
- Located in `/src`
- Multi-step wizard interface for:
  1. Vehicle selection (car, van, truck)
  2. Route planning with Google Maps integration
  3. Date selection for trip duration
  4. Results display with cost breakdown

### Backend (Express)
- Located in `/server`
- API endpoints:
  - `GET /api/config` - Returns Google Maps API key for frontend
  - `POST /api/detect-tunnels` - AI-powered tunnel detection using OpenAI

### Key Files
- `src/App.tsx` - Main application component
- `src/services/routeService.ts` - Google Maps route calculation
- `src/services/tunnelDetectionService.ts` - Tunnel detection API client
- `src/utils/calculator.ts` - Toll cost calculation logic
- `src/data/countryRules.ts` - Toll/vignette data for each country
- `server/routes.ts` - Express API routes
- `server/index.ts` - Server entry point

## Environment Variables Required
- `GOOGLE_MAPS_API_KEY` - Google Maps API key with Places and Geometry APIs enabled
- `OPENAI_API_KEY` - OpenAI API key for AI-powered tunnel detection (optional, app works without it)

## Running the Project
The workflow "Start application" runs `npm run dev` which starts the Express server with Vite middleware on port 5000.

## Features
- Route calculation using Google Maps Directions API
- Country detection along route
- Vignette cost calculation based on trip duration
- Distance-based toll calculation
- Special toll handling (tunnels, bridges, passes)
- One-way and return trip support
- AI-powered tunnel detection for Alpine routes

## Recent Changes
- Migrated from Bolt/Supabase to Replit environment
- Ported Supabase Edge Functions to Express server routes
- Updated frontend to fetch config from server API
- Removed Supabase dependency
