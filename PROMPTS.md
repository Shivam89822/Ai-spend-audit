# PROMPTS.md

## Overview

AI tools were used throughout development primarily for:

* UI ideation
* frontend component scaffolding
* backend architecture planning
* debugging TypeScript issues
* improving audit recommendation logic
* refining UX copy and dashboard presentation

AI was intentionally not trusted for:

* pricing validation
* audit savings calculations
* financial recommendation reasoning
* final business logic decisions

All pricing data and recommendation logic were manually reviewed and adjusted.

---

# 1. Frontend Landing Page Prompt

## Goal

Generate a premium AI SaaS landing page with a modern startup aesthetic.

## Prompt Summary

* Build a responsive landing page using React + TypeScript
* Use dark futuristic UI with glassmorphism and animated gradients
* Include sections:

  * Hero
  * Features
  * Tool integrations
  * Savings showcase
  * CTA
* Design inspiration:

  * Vercel
  * Stripe
  * Linear
  * Perplexity
* Use Framer Motion for subtle animations
* Avoid template/dashboard appearance

## Why This Prompt Was Written This Way

The landing page was intended to feel like a real startup product rather than a college project. The prompt focused heavily on visual polish and interaction quality because the assignment emphasized product thinking and presentation.

---

# 2. Audit Page Prompt

## Goal

Create a multi-step onboarding-style audit experience.

## Prompt Summary

* Build an interactive AI audit form page
* Match landing page visual style
* Include:

  * use case selector
  * team size input
  * dynamic AI tool cards
  * live spend preview
  * generate audit CTA
* Add animations and glassmorphism cards
* Make the experience feel like a premium SaaS onboarding flow

## Why This Prompt Was Written This Way

The goal was to make the form itself feel intelligent and interactive rather than a basic CRUD form. UX quality was treated as a major differentiator.

---

# 3. Recommendation Engine Prompt

## Goal

Design financially defensible audit recommendations.

## Prompt Summary

* Create recommendation logic for AI spend optimization
* Compare current plan vs cheaper alternatives
* Evaluate:

  * team size fit
  * collaboration requirements
  * pricing tiers
  * usage appropriateness
* Generate:

  * monthly savings
  * annual savings
  * confidence score
  * reasoning
* Avoid unrealistic downgrade recommendations

## Why This Prompt Was Written This Way

The assignment specifically emphasized defensible financial reasoning rather than generic AI-generated advice. The logic was intentionally rule-based instead of LLM-generated.

---

# 4. Pricing Data Prompt

## Goal

Create structured pricing datasets for supported AI tools.

## Prompt Summary

* Build pricing metadata structures in TypeScript
* Include:

  * plan names
  * pricing
  * enterprise flags
  * team size recommendations
  * pricing URLs
* Cover:

  * Cursor
  * Claude
  * ChatGPT
  * GitHub Copilot
  * Gemini
  * Windsurf

## Why This Prompt Was Written This Way

The pricing layer was designed to separate business data from recommendation logic for maintainability and easier future updates.

---

# 5. Results Dashboard Prompt

## Goal

Build a visually impressive audit analytics dashboard.

## Prompt Summary

* Display:

  * annual savings
  * monthly spend
  * recommendations
  * optimization insights
  * confidence levels
* Use premium analytics dashboard styling
* Keep same design language as landing page
* Focus on screenshot/share quality

## Why This Prompt Was Written This Way

The results page was treated as the “shareable moment” of the product and therefore prioritized visual clarity and impact.

---

# 6. AI Summary Generation Prompt

## Goal

Generate personalized audit summaries using LLMs.

## Prompt Summary

* Summarize:

  * current stack
  * overspending patterns
  * optimization opportunities
  * estimated savings
* Keep summaries:

  * concise
  * professional
  * non-hyperbolic
* Include graceful fallback when API fails

## Why This Prompt Was Written This Way

LLMs were used only for narrative summaries, not for financial logic. This separation improved reliability and predictability of audit results.

---

# What Did Not Work Well

## Issues Encountered

* AI-generated pricing data occasionally contained outdated plan names
* One-shot generation of entire pages produced bloated components
* Some generated UI copy sounded unrealistic or overly futuristic
* AI occasionally recommended financially incorrect downgrade paths

## Adjustments Made

* Pricing was manually verified against official vendor pages
* Large components were refactored into smaller reusable sections
* Recommendation logic was manually tuned and constrained
* Business reasoning was kept deterministic instead of AI-driven
