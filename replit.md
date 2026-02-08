# EU Toll Calculator

## Overview
A web application (tollcalculator.eu) that helps travelers estimate toll and vignette costs for European road trips. The app calculates motorway tolls, tunnel fees, and vignette requirements across multiple European countries including Austria, Switzerland, Slovenia, Italy, France, and more.

## Current State
- **Status**: Fully operational with AdSense-compliant content
- **Last Updated**: February 8, 2026

## Project Architecture

### Frontend (React + Vite + Wouter)
- Located in `/src`
- Multi-page app with wouter routing
- Main page: Multi-step wizard calculator + informational content + FAQ
- Legal pages: Privacy, Cookies, Terms, About, Contact

### Backend (Express)
- Located in `/server`
- API endpoints:
  - `GET /api/config` - Returns Google Maps API key for frontend
  - `POST /api/detect-tunnels` - AI-powered tunnel detection using OpenAI

### Key Files
- `src/App.tsx` - Main app with routing (wouter), HomePage calculator, ScrollToTop
- `src/components/InfoContent.tsx` - Long-form informational content (tolls, vignettes, tunnels, example routes)
- `src/components/FAQSection.tsx` - Accordion FAQ with 8 questions
- `src/components/Footer.tsx` - Persistent footer with legal page links
- `src/pages/PrivacyPolicy.tsx` - Privacy policy (GDPR, AdSense, Analytics)
- `src/pages/CookiePolicy.tsx` - Cookie policy
- `src/pages/TermsConditions.tsx` - Terms & conditions
- `src/pages/AboutUs.tsx` - About page
- `src/pages/Contact.tsx` - Contact page (email, country, website)
- `src/services/routeService.ts` - Google Maps route calculation + highway detection
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
- Distance-based toll calculation (highway-only detection)
- Special toll handling (tunnels, bridges, passes)
- One-way and return trip support
- AI-powered tunnel detection for Alpine routes
- Google Analytics (G-3PQE0YHJ68)
- Google AdSense ready (ca-pub-7696212092320435)

## Recent Changes
- **February 8, 2026: AdSense compliance & content additions**
  - Added wouter routing for multi-page support
  - Added long-form informational content (tolls, vignettes, tunnels, how calculator works, example routes)
  - Added FAQ section with 8 expandable questions
  - Created legal pages: Privacy Policy, Cookie Policy, Terms & Conditions, About Us, Contact
  - Added persistent footer with links to all legal/trust pages
  - Updated H1 to "European Toll, Vignette & Tunnel Cost Calculator"
  - Per-page SEO titles via document.title
  - No calculation logic was modified
- **February 8, 2026: Highway detection improvements**
  - Improved highway state detection to correctly handle highway-to-highway transitions
  - "Take the exit onto A4/E70" now correctly stays as highway
  - Fixed address autocomplete truncation bug (controlled→uncontrolled input)
- **February 5, 2026: Highway-only toll calculation fix**
  - Fixed bug where toll calculation assumed 100% of distance was on toll roads
  - Added highway segment detection in routeService.ts using road name patterns
  - Now only charges tolls for actual highway/motorway distance
  - Applies to Italy, France, Spain, Croatia, Poland, Portugal, Greece, Serbia
- Mobile-friendly improvements (PWA meta tags, responsive layouts, touch-friendly)

## User Preferences
- Do NOT change, refactor, or touch any calculation logic
- Calculator behavior must remain identical
- Use neutral, informative language (no marketing/sales language)
