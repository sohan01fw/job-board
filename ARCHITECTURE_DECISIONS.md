# 🧠 Architecture & Design Decisions

This document tracks the key technical decisions made for the **JobBoard** project. It serves as a living record to explain the "Why" behind the code, helping you justify architectural choices to future employers, founders, or team members.

> **How to use this file:**
>
> - Update this file whenever you introduce a new major technology or change a core pattern.
> - Use the "Rationale" sections to quickly refresh your memory before an interview.

---

## 1. Core Framework

### **Next.js 15 (App Router)**

- **Decision:** Use the latest Next.js 15 with App Router and Turbopack.
- **Rationale:**
  - **Performance:** Leverages React Server Components (RSC) to minimize client-side JavaScript, resulting in faster initial page loads.
  - **Future-Proofing:** Adopts the modern standard for React development (Server Actions, Suspense) rather than the legacy Pages router.
  - **Developer Experience:** Turbopack offers near-instant HMR (Hot Module Replacement), which speeds up the development loop significantly.

### **Bun Runtime**

- **Decision:** Use `bun` instead of `npm` or `yarn`.
- **Rationale:**
  - **Speed:** Bun is significantly faster at installing dependencies and running scripts/tests compared to Node.js.
  - **All-in-One:** Reduces tooling bloat by acting as a runtime, package manager, and bundler in one.

---

## 2. Backend & Database

### **Supabase (Auth & Postgres)**

- **Decision:** Use Supabase for Authentication and as the hosted PostgreSQL provider.
- **Rationale:**
  - **Time-to-Market:** providing built-in Auth (OAuth, Email) and database management saves weeks of boilerplate setup.
  - **Scalability:** It runs on standard Postgres, so we avoid "vendor lock-in" on the data layer (unlike Firebase's NoSQL).

### **Prisma ORM**

- **Decision:** Use Prisma to interact with the database.
- **Rationale:**
  - **Type Safety:** Auto-generates TypeScript types based on the schema, virtually eliminating runtime database errors.
  - **Schema Management:** The `schema.prisma` file serves as a single source of truth for the data model, making it easy to visualize relationships (e.g., Users <-> Jobs).

### **PostgreSQL Enums**

- **Decision:** Use native Enums (e.g., `WorkType`, `JobType`) in the database schema.
- **Rationale:**
  - **Data Integrity:** Strictly enforces allowed values at the database level, preventing invalid data states better than application-level validation alone.

### **Upstash Redis**

- **Decision:** Use Redis for caching and possibly rate limiting.
- **Rationale:**
  - **Performance:** Offloads high-frequency read operations (like session checks or feed data) from the primary Postgres database.
  - **Serverless Friendly:** Upstash is HTTP-based, making it connection-friendly for serverless environments (like Vercel).

---

## 3. Artificial Intelligence

### **Google Generative AI**

- **Decision:** Use Google's SDK (`@ai-sdk/google`) for AI features.
- **Rationale:**
  - **Cost/Performance Balance:** Google's models often offer a competitive free tier and high context windows suitable for analyzing job descriptions and resumes.
  - **Integration:** The `ai` SDK abstracts the complexity, allowing us to swap providers later if needed with minimal code changes.

### **Vector Embeddings (`pgvector`)**

- **Decision:** Store embeddings (`Float[]`) in Postgres for Jobs and Users.
- **Rationale:**
  - **Smart Matching:** Allows for "Semantic Search" (matching intent/meaning) rather than just keyword matching. This enables recommending a "Frontend Dev" job to a "React Engineer" user even if the exact keywords differ.

---

## 4. Realtime Features

### **Pusher**

- **Decision:** Use Pusher for real-time notifications and chat.
- **Rationale:**
  - **Reliability:** Managing raw WebSockets in a serverless environment (Next.js) is famously difficult/flaky. Pusher creates a dedicated, persistent connection layer that just works.

---

## 5. UI & Styling

### **Tailwind CSS + Radix UI**

- **Decision:** Use utility-first CSS (Tailwind) with headless components (Radix).
- **Rationale:**
  - **Accessibility:** Radix provides the unstyled, accessible logic (keyboard navigation, screen reader support) for complex components like Dialogs and Dropdowns.
  - **Design Speed:** Tailwind allows for rapid iteration of the visual design without fighting specificity wars or managing massive CSS files.
  - **Themeability:** `next-themes` integration allows for easy Dark/Light mode switching (User Rule: "Use Rich Aesthetics").

---

## 6. Code Structure

### **Feature-Based Architecture (`/features`)**

- **Decision:** Group code by "Feature" (e.g., `/features/job-board`, `/features/auth`) rather than by type (e.g., `/components`, `/hooks`).
- **Rationale:**
  - **Maintainability:** When working on "Auth", all relevant actions, components, and logic are in one folder. As the app grows, this prevents the codebase from becoming a tangled mess.

---

## 📝 Change Log & New Decisions

_Add new decisions below as you build:_

- **[Date] Decision Name:** Description of potential future change (e.g., "Moving from Supabase Auth to Better Auth for more control...").
