# Zamok Expert Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive Next.js landing page for emergency lock opening service "Замок Эксперт" in Sevastopol.

**Architecture:** Use a single App Router page backed by typed content data in `src/data/landing.ts`. Keep visual sections in focused React components within the page, using TailwindCSS for styling and Framer Motion for section transitions.

**Tech Stack:** Next.js, React, TypeScript, TailwindCSS, Framer Motion, Vitest.

---

### Task 1: Project Scaffold And Content Contract

**Files:**
- Create: `package.json`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `tests/landing-content.test.ts`

- [x] **Step 1: Write failing content test**

Create `tests/landing-content.test.ts` to assert brand, city, contacts, service list, price list, and SEO metadata.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm.cmd test`

Expected: FAIL because `src/data/landing.ts` does not exist yet.

### Task 2: Landing Data And App Shell

**Files:**
- Create: `src/data/landing.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Implement typed landing content**

Create typed arrays for services, prices, advantages, workflow, reviews, FAQ, and image paths.

- [ ] **Step 2: Build landing page**

Create the full landing page with Hero, Services, Prices, Why Choose Us, Workflow, Reviews, FAQ, Contacts, sticky mobile call button, and fixed desktop CTA.

- [ ] **Step 3: Run tests and production build**

Run: `npm.cmd test` and `npm.cmd run build`

Expected: PASS and successful Next.js production build.
