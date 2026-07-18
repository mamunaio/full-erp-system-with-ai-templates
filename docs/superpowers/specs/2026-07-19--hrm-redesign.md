# HRM Module Page Redesign — Obsidian & Gold

## Overview
Redesign the HRM module overview page (`app/(dashboard)/hrm/page.tsx`) to match the Obsidian & Gold theme with glassmorphic masonry layout, following the same pattern established in the main dashboard redesign.

## Current State
- **File**: `app/(dashboard)/hrm/page.tsx` (208 lines, server component)
- **Structure**: Server component with inline Prisma data fetching. Blue-focused color scheme with color-coded module cards (blue, emerald, amber, rose). No shared dashboard components used.
- **Local components** (11 files): `DepartmentChart.tsx`, `HRMStats.tsx`, `HRMQuickActions.tsx`, `BirthdaysCard.tsx`, `DashboardEventReminder.tsx`, `EmployeeTable.tsx`, `EmployeeForm.tsx`, `PayrollTable.tsx`, `LeaveRequestForm.tsx`, `DepartmentChart.tsx`, `AttendanceCalendar.tsx`, `AttendanceList.tsx`
- **Layout**: Structured grid with header → AI banner → 4 module cards → 2/3 + 1/3 bottom grid

## Design

### Layout Architecture
Follow the main dashboard pattern:
```
┌─────────────────────────────────────────────┐
│  Gold Glass Hero Header (welcome + CTA)      │  ← outside masonry
├─────────────────────────────────────────────┤
│  AI Command Bar (HR-focused suggestions)     │  ← outside masonry
├─────────────────────────────────────────────┤
│  4x KPICard grid                             │  ← outside masonry
├──────────────┬──────────────┬────────────────┤
│  Department  │  SmartAlerts │  Birthdays     │  ← columns-3 masonry
│  Chart       │  (HR alerts) │  Card          │
│  (donut)     │              │                │
├──────────────┤              ├────────────────┤
│  HRMQuick    │              │  Compliance    │
│  Actions     │              │  Status Card   │
├──────────────┴──────────────┴────────────────┤
│  Module Cards row (Employees, Attendance,    │  ← optional bottom row
│   Payroll, Leave)                             │
└──────────────────────────────────────────────┘
```

### Key Changes
1. **Convert to client component** — Fetches data client-side via API or embeds data passed from layout. Matches dashboard pattern.
2. **Replace blue/color-coded accents** — All widgets use gold (`gold-400/500`) and glass styling. Remove per-module color maps.
3. **Use shared components** — `AICommandBar`, `KPICard`, `SmartAlerts` from `components/dashboard/`
4. **CSS columns-3 masonry** — `columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid`
5. **framer-motion** — Stagger/fade-up animations on mount, gold loading spinner
6. **Light + Dark mode** — All colors via CSS variables (`hsl(var(--card))`, `border-border`, etc.)

### Widgets

#### 1. Hero Header (new, inline)
- Gold glass card (`bg-card/40 backdrop-blur-2xl`)
- "Human Resources" heading with `font-heading`
- Active now badge (emerald pulse dot)
- "Recruit Talent" gold CTA button
- Same pattern as dashboard page hero

#### 2. AI Command Bar (shared, reuse)
- Import from `@/components/dashboard/AICommandBar`
- Currently has generic suggestions; replace with HR-specific: "Workforce analysis", "Leave trends", "Hiring forecast", "Department health"
- **Needs**: Accept a `suggestions` prop to pass HR-focused suggestions

#### 3. KPICard x4 (shared, reuse)
- Import from `@/components/dashboard/KPICard`
- Metrics: Total Workforce, Active Employees, Departments, Open Positions
- Sparkline data generated client-side
- Gold counters with animated count-up

#### 4. DepartmentChart (existing, refit)
- File: `app/(dashboard)/hrm/components/DepartmentChart.tsx` (43 lines)
- Currently: Recharts donut with hardcoded department data, blue/colorful palette
- Changes:
  - Wrap in gold glass card (`bg-card/40 backdrop-blur-xl border border-border rounded-xl p-5`)
  - Add gold-styled header "Department Distribution"
  - Use gold-adjacent color palette for pie segments
  - Keep Recharts, add themed tooltip

#### 5. SmartAlerts (shared, reuse)
- Import from `@/components/dashboard/SmartAlerts`
- HR-specific alerts: pending leave requests, compliance reminders, upcoming reviews
- **Needs**: Accept a `data` prop for HR-specific alerts

#### 6. BirthdaysCard (existing, refit)
- File: `app/(dashboard)/hrm/components/BirthdaysCard.tsx` (177 lines)
- Currently: Standard Card, `injaazh-600` colors, blue/rose accents
- Changes:
  - Wrap in gold glass card
  - Replace `injaazh-600` → `gold-500`, `injaazh-50` → `gold-500/10`
  - Keep all functionality (AI wish generation, dialog, etc.)
  - Gold CTA button "View Calendar"

#### 7. ComplianceCard (extract from inline, new widget)
- Currently inline in `page.tsx` (lines 154-167), dark card with `ShieldCheck` icon
- Changes:
  - Extract to `app/(dashboard)/hrm/components/ComplianceCard.tsx`
  - Gold glass card wrapper
  - "100% SECURE" → keep the compliance messaging
  - Gold CTA "System Audit" button

#### 8. HRMQuickActions (existing, refit)
- File: `app/(dashboard)/hrm/components/HRMQuickActions.tsx` (137 lines)
- Currently: Uses `injaazh-600` colors, blue/outline styling, Sheet for AI insight display
- Changes:
  - Replace `injaazh-600` → `gold-500`, `injaazh-100` → `gold-500/10`
  - Gold glass card wrapper
  - Keep all AI quick action functionality
  - Gold-styled sheet trigger buttons

#### 9. Module Cards (refactor)
- 4 navigation cards (Employees, Attendance, Payroll, Leave) currently rendered inline via `ModuleCard` function
- Changes:
  - Wrap in gold glass card container with "Quick Navigation" header
  - Replace color maps with gold accents
  - Each card: gold icon container (`bg-gold-500/10`), gold hover effects
  - Keep existing href links and trend badges

### Components to Modify

| Component | Action |
|-----------|--------|
| `app/(dashboard)/hrm/page.tsx` | Rewrite: client component, masonry layout, shared imports |
| `components/dashboard/AICommandBar.tsx` | Add optional `suggestions` prop for HR context |
| `components/dashboard/SmartAlerts.tsx` | Add optional `data` prop for HR-specific alerts |
| `app/(dashboard)/hrm/components/DepartmentChart.tsx` | Refit: gold glass card, gold palette |
| `app/(dashboard)/hrm/components/BirthdaysCard.tsx` | Refit: gold glass, replace injaazh colors |
| `app/(dashboard)/hrm/components/HRMQuickActions.tsx` | Refit: gold glass, replace injaazh colors |
| `app/(dashboard)/hrm/components/DashboardEventReminder.tsx` | Refit: gold glass, replace injaazh colors |
| NEW: `app/(dashboard)/hrm/components/ComplianceCard.tsx` | Create from inline compliance section |

### Architecture Notes
- **Data flow**: Since converting to client component, initial data (employee counts) is hardcoded/mock for now, matching how the main dashboard uses static data. The API integration for real data is a future concern across all modules.
- **No new dependencies**: Uses existing Recharts, framer-motion, lucide-react, tailwind css
- **Theme consistency**: All border colors use `border-border` (CSS variable), all backgrounds use `bg-card/40 backdrop-blur-xl`

### Out of Scope
- Sub-pages (/hrm/employees, /hrm/attendance, etc.) — not redesigned
- Real API data integration — mock data matching main dashboard pattern
- The 8 remaining local HRM components (EmployeeTable, EmployeeForm, etc.) — not modified
