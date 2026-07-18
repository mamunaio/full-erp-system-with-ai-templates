# Dashboard Redesign — AI-Hero Masonry Layout

**Date:** 2026-07-19  
**Theme:** Obsidian & Gold · Glassmorphic · AI-First  
**Approach:** A — AI-Hero Masonry

---

## 1. Layout Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│  Glass Sidebar (56px fixed)    │       Glass Header (fixed top)       │
│  ┌─────────────────────────────┼──────────────────────────────────────┤
│  │                             │                                      │
│  │    icon (gold)              │   ┌── AI HERO COMMAND BAR ──────────┐│
│  │    ● nav (active=gold)      │   │  ✦  [Ask AI anything...]       ││
│  │    ○ nav                    │   │  [Revenue] [Anomalies] [Forecast]││
│  │    ○ nav                    │   └─────────────────────────────────┘│
│  │    ○ nav                    │                                      │
│  │    ○ nav                    │   ┌──── Masonry Grid (3 columns) ──┐│
│  │                             │   │  ┌──────┐ ┌──────┐ ┌────────┐ ││
│  │                             │   │  │KPI 1 │ │KPI 2 │ │SMART   │ ││
│  │                             │   │  ├──────┤ ├──────┤ │ALERTS  │ ││
│  │                             │   │  │KPI 3 │ │REV   │ │(tall)  │ ││
│  │                             │   │  └──────┘ │CHART │ │        │ ││
│  │                             │   │           │(wide)│ │        │ ││
│  │                             │   │  ┌──────┐ └──────┘ │        │ ││
│  │                             │   │  │QUICK │ ┌──────┐ │        │ ││
│  │                             │   │  │ACTIONS│ │ACTIVE│ │        │ ││
│  │                             │   │  └──────┘ │TASKS │ └────────┘ ││
│  │                             │   │           └──────┘            ││
│  │                             │   └───────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

### 1.1 Shell Components (already redesigned in Phase 1)

- **Sidebar** (`components/layout/Sidebar.tsx`): 56px thin glass sidebar, gold active indicators, gold-gradient logo
- **Header** (`components/layout/Header.tsx`): Glass header, gold theme toggle, gold badge avatar

### 1.2 Content Area

- Left offset for sidebar, top offset for header
- Content has `gap-6 p-6` spacing
- Masonry uses CSS `columns-3` with `break-inside-avoid` on cards — no JS library

---

## 2. AI Hero Command Bar

**File:** `components/dashboard/AICommandBar.tsx` (refactor existing)

### 2.1 Container
- Full-width glass card: `bg-card/40 backdrop-blur-2xl rounded-2xl border border-gold-500/20`
- Subtle gold glow shadow: `shadow-[0_0_30px_rgba(201,149,46,0.1)]`
- Gold gradient top border accent via pseudo-element
- `p-6` padding

### 2.2 Input Row
- Gold sparkle icon (✦) on the left
- Large unstyled input: `text-lg placeholder:text-muted-foreground/50 flex-1 bg-transparent border-none outline-none`
- Gold focus ring on the container: `focus-within:border-gold-500/40 focus-within:shadow-[0_0_20px_rgba(201,149,46,0.15)]`
- Placeholder: "Ask AI anything about your business..."

### 2.3 Suggestion Pills
- Horizontal scrollable row below input: `flex gap-2 overflow-x-auto scrollbar-thin`
- Each pill: `px-3 py-1.5 rounded-full border border-gold-500/20 text-xs text-gold-400 hover:bg-gold-500/10 cursor-pointer whitespace-nowrap`
- Suggestions: "Revenue analysis", "Anomaly detection", "Top opportunities", "Forecast", "Inventory status"

### 2.4 Response Panel (expandable)
- Slides open below with framer-motion `AnimatePresence`
- Glass inner card: `bg-card/40 rounded-xl border border-white/5 p-4 mt-4`
- Gold accent on numbers: `<span class="text-gold-400 font-semibold">`
- Markdown rendering for AI responses
- Loading state: gold gradient shimmer (`animate-pulse bg-gold-500/10`)
- Empty state: just pills visible
- Error state: amber/gold tones with retry button

---

## 3. Masonry Grid Widgets

### 3.1 Smart Alerts Feed (Tall Card)
**File:** `components/dashboard/SmartAlerts.tsx`

- Size: spans tallest column area (~2x height)
- Header: "AI-Priority Alerts" with gold dot indicator
- Alert items with severity:
  - **Critical** (red/gold): `border-l-2 border-red-500/50 bg-red-500/5`
  - **Warning** (amber): `border-l-2 border-amber-500/50 bg-amber-500/5`
  - **Info** (blue): `border-l-2 border-blue-500/50 bg-blue-500/5`
- Each alert: icon + title + description + timestamp
- "Mark as read" hover action
- Auto-refresh indicator in header
- Empty state: "No alerts — all systems nominal" with green checkmark

### 3.2 KPI Stats (3 Small Cards)
**File:** `components/dashboard/KPICard.tsx` (refactor existing)

- `bg-card/60 backdrop-blur-xl rounded-xl border border-white/5 p-5 hover:border-gold-500/20`
- Animated counter (framer-motion `useSpring` or simple count-up)
- Gold number: `text-2xl font-bold text-gold-400 font-heading`
- Label: `text-sm text-muted-foreground`
- Mini sparkline chart (recharts `AreaChart`): gold gradient fill, no axes/grid
- Delta indicator: green arrow up / red arrow down
- Three KPIs: **Revenue** ($128.4K, +12.4%), **Active Users** (1,842, +8.1%), **System Health** (99.2%, +0.3%)

### 3.3 Revenue Trend Chart (Wide Card)
**File:** `components/dashboard/RevenueChart.tsx` (refactor existing)

- `bg-card/60 backdrop-blur-xl rounded-xl border border-white/5 p-5 hover:border-gold-500/20`
- Header: "Revenue Trend" + range toggle pills `[7D] [1M] [3M] [1Y]`
- Recharts `AreaChart` with gold gradient fill (`url(#goldGradient)`)
- Dark grid lines: `stroke-white/5`
- Tooltip: glass-styled (`bg-card/90 backdrop-blur-xl border border-white/10`)
- Y-axis: compact notation ($)
- X-axis: date labels
- Responsive container

### 3.4 Quick Actions (Small Card)
**File:** `components/dashboard/QuickActions.tsx` (refactor existing)

- `bg-card/60 backdrop-blur-xl rounded-xl border border-white/5 p-5`
- 2x2 grid of action buttons
- Each: gold icon in a circle + label
- Actions: Send Invoice, Add Employee, New Order, Run Report
- Glass button style: `bg-gold-500/10 hover:bg-gold-500/20 rounded-lg p-3 text-center transition-colors`
- Gold hover scale effect: `hover:scale-105`

### 3.5 Active Tasks (Small Card)
**File:** `components/dashboard/TaskWidget.tsx` (refactor existing)

- `bg-card/60 backdrop-blur-xl rounded-xl border border-white/5 p-5`
- Header: "Active Tasks" + count badge (gold)
- 3-4 task items with:
  - Priority dot: gold (high), amber (medium), slate (low)
  - Task title (truncated)
  - Due time (relative: "2h left")
  - Mini avatar for assignee
- No tasks: "All tasks completed ✦" with gold checkmark

---

## 4. Data Fetching & State

### APIs (existing)
- `GET /api/dashboard/stats` — KPI data, chart data, alerts
- `GET /api/ai/dashboard-insights` — AI insights feed
- AI command bar queries → existing AI endpoint

### Loading Pattern
- Skeleton loaders: glass-style (`bg-card/40 rounded-xl animate-pulse`)
- Each widget loads independently (no blocking waterfall)
- Error state: inline retry per widget, not a full-page error

---

## 5. Animations

- **Page enter**: staggered framer-motion with `staggerChildren: 0.08`
- **Cards**: fade up + slight scale (`initial={{ opacity: 0, y: 20 }}`)
- **AI response**: slide down + fade in
- **KPI counters**: spring-animated numbers
- **Sparklines**: recharts default animation
- **Alerts**: new alert slides in from top with gold glow
- **Hover**: cards lift slightly (`hover:-translate-y-0.5`) with gold border glow

---

## 6. Responsive Behavior

| Breakpoint | Columns | Layout Changes |
|------------|---------|----------------|
| `xl` (1280+) | 3 | Full masonry |
| `lg` (1024) | 2 | AI bar full width, 2-col masonry |
| `md` (768) | 1 | Single column, sidebar collapses |
| `sm` (640) | 1 | Compact padding, smaller text |

---

## 7. Files to Create/Modify

| File | Action |
|------|--------|
| `app/(dashboard)/dashboard/page.tsx` | Rewrite — import widgets, masonry layout, AI hero |
| `components/dashboard/AICommandBar.tsx` | Refactor — gold glass theme, rounded-2xl, pills |
| `components/dashboard/SmartAlerts.tsx` | **New** — AI-priority alerts feed |
| `components/dashboard/KPICard.tsx` | Refactor — gold counters, glass card |
| `components/dashboard/RevenueChart.tsx` | Refactor — gold gradient, glass card |
| `components/dashboard/QuickActions.tsx` | Refactor — gold glass grid |
| `components/dashboard/TaskWidget.tsx` | Refactor — gold accents, glass card |
| `app/globals.css` | Add `.gold-sparkle` animation for AI icon |
