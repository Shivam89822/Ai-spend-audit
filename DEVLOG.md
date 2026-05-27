# DEVLOG.md

## 2026-05-21 — Project Planning & Initial Backend Setup

### Goals

* Understand assignment requirements
* Finalize project architecture
* Setup backend foundation

### Work Completed

* Reviewed assignment requirements and scoring criteria
* Finalized React + TypeScript frontend stack
* Selected Express + MongoDB backend architecture
* Created initial folder structure for frontend and backend
* Configured TypeScript backend setup
* Connected MongoDB database

### Problems Encountered

Initially installed some backend dependencies in the root project folder instead of the server directory, which caused module resolution confusion.

### Decisions Made

Separated frontend and backend environments properly to maintain cleaner architecture and easier deployment.

### Next Steps

* Configure backend middleware
* Create audit models
* Start pricing engine architecture

---

## 2026-05-22 — Backend Security & Audit Engine Design

### Goals

* Improve backend security
* Design audit recommendation architecture

### Work Completed

* Added Helmet, CORS, and rate limiting
* Configured Express middleware
* Designed embedded audit document structure
* Created pricing type definitions
* Started recommendation engine planning

### Problems Encountered

Faced CommonJS vs ES module issues while running the TypeScript backend with ts-node-dev.

### Decisions Made

Standardized backend configuration to avoid runtime import inconsistencies during development.

### Next Steps

* Build pricing datasets
* Implement recommendation logic
* Add savings calculation utilities

---

## 2026-05-23 — Pricing Architecture & Recommendation Logic

### Goals

* Build pricing engine
* Create financially defensible recommendation logic

### Work Completed

* Created pricing metadata structures
* Added supported AI tools and plan datasets
* Built recommendation engine
* Implemented annual and monthly savings calculations
* Added confidence scoring system

### Problems Encountered

AI-generated pricing datasets occasionally contained outdated or inconsistent plan names across tools.

### Decisions Made

Manually verified pricing structures against official vendor pricing pages instead of relying completely on generated datasets.

### Next Steps

* Build frontend pages
* Design onboarding flow
* Connect frontend with backend APIs

---

## 2026-05-25 — Frontend Development & Product UX

### Goals

* Build polished frontend experience
* Create premium AI SaaS feel

### Work Completed

* Designed animated landing page
* Built multi-step audit onboarding flow
* Added dynamic tool cards
* Implemented React Router navigation
* Added responsive layouts and glassmorphism UI styling

### Problems Encountered

Initial frontend versions felt too generic and resembled dashboard templates rather than a real startup product.

### Decisions Made

Shifted design direction toward a modern AI SaaS aesthetic inspired by products like Vercel, Linear, and Perplexity.

### Next Steps

* Connect frontend to backend APIs
* Build results dashboard
* Improve recommendation presentation

---

## 2026-05-27 — Full Stack Integration, Dashboard & Documentation

### Goals

* Connect complete audit flow
* Finalize dashboard and project documentation

### Work Completed

* Connected frontend audit form to backend APIs
* Persisted audit results in MongoDB
* Added shareable audit report flow
* Created analytics-style results dashboard
* Improved recommendation card presentation
* Added README, architecture documentation, and API documentation

### Problems Encountered

Frontend plan naming occasionally mismatched backend pricing data, causing recommendation validation failures for certain tools.

### Decisions Made

Centralized plan naming conventions and removed fake frontend-generated savings metrics in favor of backend-driven calculations.

### Final Reflection

The most challenging part of the project was balancing realistic financial recommendation logic with product UX polish under tight time constraints. Building deterministic recommendation rules turned out to be significantly more difficult than generating frontend UI components.
