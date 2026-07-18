# Obsidian & Gold — Injaazh ERP Visual Redesign

## Design Direction
Premium & Luxurious — deep dark theme with warm gold accents, glassmorphism, and elegant typography.

## Color System

### Dark Mode (Primary)
| Token | Value | Usage |
|-------|-------|-------|
| background | #0C0C0E | Page background |
| surface/card | #151519 | Card, sidebar surfaces |
| surface-elevated | #1C1C22 | Modal, dropdown, popover |
| border | #2A2A33 | Borders, dividers |
| primary | #D4A853 | Gold — primary actions |
| primary-foreground | #0C0C0E | Text on primary |
| gold-light | #E8C97A | Hover/highlight |
| gold-dark | #A67C2E | Active/pressed |
| foreground | #F5F5F0 | Main text |
| muted | #8A8A95 | Secondary text |

### Light Mode (Secondary)
| Token | Value | Usage |
|-------|-------|-------|
| background | #F8F6F1 | Warm off-white |
| surface/card | #FFFFFF | Card surface |
| primary | #B8862D | Darker gold for contrast |
| foreground | #1C1C1E | Main text |

## Typography
- **Headings**: Playfair Display (600/700 weight)
- **Body**: Inter (400/500 weight, tabular-nums for data)
- **Scale**: xs(12) → sm(13) → base(14) → lg(16) → xl(20) → 2xl(24) → 3xl(32)

## Component Style — Glassmorphic Premium
- Border radius: 16px cards, 20px modals, 10px buttons/inputs
- Glass effect: `rgba(21,21,25,0.6) + backdrop-filter: blur(20px) + border: 1px solid rgba(42,42,51,0.5)`
- Layer system: page bg → card glass → sidebar glass → modal glass → tooltip glass

## Layout
- Glassmorphic sidebar with backdrop-blur, content overlay
- Dark-first mode, light mode as secondary
