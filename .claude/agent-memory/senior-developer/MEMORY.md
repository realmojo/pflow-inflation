# PFlow Inflation - Agent Memory

## Project Structure
- Next.js 16.1.6 with Turbopack, Tailwind CSS v4 (oklch colors), Recharts 3
- Deployed on Cloudflare Pages (Edge Runtime required: `export const runtime = "edge"`)
- Path alias `@/*` maps to project root

## Key Files
- `lib/macro-data.ts` - Static Korean economic data (MINIMUM_WAGE, CPI_RATE, GDP_GROWTH, EMPLOYMENT, AVG_MONTHLY_WAGE)
- `lib/inflation-items.ts` - KOSIS inflation items with CATEGORIES, CATEGORY_LIST exports
- `lib/slug.ts` - toSlug/fromSlug helpers (space<->hyphen)
- `lib/utils.ts` - cn() for Tailwind class merging
- `components/Footer.tsx` - Shared footer component

## Patterns
- Pages: Server component (page.tsx) wraps Client component (XxxClient.tsx)
- Search UI: CATEGORIES/CATEGORY_LIST filtering with searchQuery state, outside-click handler
- Navigation: `<a>` tags (not Next.js `<Link>`) for page navigation
- Layout wrapper: `min-h-screen bg-background text-foreground` > `mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8`

## Recharts Typing (Important)
- Recharts 3 Tooltip `formatter` expects `value: number | undefined`, not `value: number`
- Project convention: use `(value: any)` for Tooltip formatter params (matches ItemPageClient)
- Legend `formatter` also needs `(value: any)` not `(value: string)`
- See `app/[category]/[name]/ItemPageClient.tsx` line 491 for the established pattern

## Chart Color Constants
- Green bars: `oklch(0.70 0.15 162)`
- Green lines: `oklch(0.85 0.13 165)`
- Grid: `oklch(0.269 0 0)`
- Axis: `oklch(0.556 0 0)`
- Tooltip bg: `oklch(0.145 0 0)`, border: `oklch(0.269 0 0)`, text: `oklch(0.985 0 0)`

## Pages Created
- `/statistics` - Korean economic indicators dashboard (6 charts, 4 stat cards, insights section)
