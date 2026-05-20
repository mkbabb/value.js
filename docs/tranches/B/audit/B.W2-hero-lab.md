# B.W2 Lane B — hero-lab audit

`demo/hero-lab/` pass: type-clean it, guard its RAF loops against `prefers-reduced-motion`,
and resolve the DESIGN.md "exemplary visual hierarchy reference" claim.

## vue-tsc error counts

Command: `npx vue-tsc --noEmit 2>&1 | grep 'demo/hero-lab/' | grep -c 'error TS'`

| File | Before | After |
|------|-------:|------:|
| `demo/hero-lab/App.vue` | 4 | 0 |
| `demo/hero-lab/components/CanvasAtmosphereHero.vue` | 4 | 0 |
| `demo/hero-lab/components/HeroControls.vue` | 23 | 0 |
| **hero-lab total** | **31** | **0** |

Repo-wide: **243 → 212** error count — dropped by exactly 31, no regressions
elsewhere (`npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'`).

### Fixes applied

- **`lib/types.ts`** — added a `kind` discriminant (`"tile"` / `"atmosphere"`) to
  `TileHeroConfig` and `AtmosphereHeroConfig`, turning the union into a proper
  discriminated union. Added a `HeroConfig` alias.
- **`App.vue:121,144`** — the `tileConfigs` / `atmosphereConfigs` reactive maps were
  typed `Record<string, …>`, so index access yielded `… | undefined` under
  `noUncheckedIndexedAccess` (the 4 `App.vue` errors). Narrowed the key type to
  `Record<"webgl" | "canvas", …>` (the `css` entries were dead — never referenced by
  any `<HeroPanel>`); literal-keyed access no longer produces `undefined`. Added the
  `kind` field to each config literal.
- **`HeroControls.vue:21-30`** — replaced the un-narrowable `config` computed access of
  tile-/atmosphere-only fields with two `kind`-discriminated computeds, `tileConfig`
  (`TileHeroConfig | null`) and `atmosphereConfig` (`AtmosphereHeroConfig | null`).
  Template `v-if="tileConfig"` / `v-if="atmosphereConfig"` blocks (`<template>` wrappers)
  narrow the binding so tile/atmosphere fields are accessed type-safely.
- **`HeroControls.vue:33-37`** — `updateConfig`'s patch param was
  `Partial<TileHeroConfig & AtmosphereHeroConfig>`; after adding `kind` the two literal
  types intersect to `never`, collapsing the whole intersection to `never`. Changed to
  `Partial<Omit<TileHeroConfig,"kind"> & Omit<AtmosphereHeroConfig,"kind">>` — the patch
  never carries `kind`, so the intersection stays valid.
- **`HeroControls.vue`** — Slider `@update:model-value` callbacks: `value` is
  `number[] | undefined`; changed `value[0]` → `value?.[0] ?? fallback` (the 18048
  errors).
- **`CanvasAtmosphereHero.vue:73`** — `colors[index % colors.length]` on the 4-tuple
  `atmosphereStops` is `string | undefined`; changed to `… ?? colors[0]` (tuple index 0
  is always defined → `string`), clearing the 4 `rgba()` argument errors.

### Non-null assertions retained (genuinely unavoidable)

`HeroControls.vue` — inside the `@update:model-value` arrow callbacks within the
`v-if="tileConfig"` / `v-if="atmosphereConfig"` blocks, the fallback expressions use
`tileConfig!` / `atmosphereConfig!`. Vue's template `v-if` narrowing applies to
rendered bindings, but the SFC compiler does not propagate that narrowing into
event-handler arrow-function bodies. The handler can only fire while its block is
rendered (i.e. while the ref is non-null), so the `!` is sound. No `as` casts were used.

## Card migration

`grep -rn 'variant="pane"|variant=.pane|flush=' demo/hero-lab/` → **no matches.**
hero-lab consumes shadcn-vue's `@components/ui/card` (`App.vue:105`,
`HeroPanel.vue:5`), not glass-ui's `<Card>` — so glass-ui invariant 31's stale-prop
warning does not apply. **No stale Card sites; nothing to migrate.**

## prefers-reduced-motion RAF guards

The goo-blob pattern (`useMetaballRenderer.ts:74-76`) was adopted in all four RAF
components: read `window.matchMedia("(prefers-reduced-motion: reduce)").matches` once
at setup; when reduced, the first frame still renders, but the render loop does not
reschedule `requestAnimationFrame`.

| File | `prefersReducedMotion` const | guarded reschedule |
|------|------------------------------|--------------------|
| `CanvasAtmosphereHero.vue` | line 19-21 | render loop line ~99 (`if (!prefersReducedMotion)`) |
| `CanvasTileHero.vue` | line 27-29 | render loop line ~115 |
| `WebGLTileHero.vue` | line 18-20 | render loop line ~250 |
| `WebGLAtmosphereHero.vue` | line 18-20 | render loop line ~180 |

Each component's `mountScene()` still issues the initial `requestAnimationFrame(render)`,
so one frame paints; the guard sits on the *re-schedule* inside `render`, matching the
goo-blob behaviour (render once, no further frames).

## DESIGN.md decision

`demo/DESIGN.md:13-17` calls `hero-lab.css` an "exemplary visual hierarchy reference"
and `:24` carried an open TODO to document it as such.

**Verdict: claim honoured (not retracted).** After this pass `demo/hero-lab/` is
type-clean (0 vue-tsc errors) and all four RAF loops honour `prefers-reduced-motion`,
so the exemplar claim is now accurate. Updated `DESIGN.md:17` with a one-line
rationale and checked off the TODO at `DESIGN.md:24`.

## Sub-gate B

> "vue-tsc --noEmit | grep -c 'demo/hero-lab/' returns 0; the 4 RAF files honour
> prefers-reduced-motion; DESIGN.md TODO resolved."

All three conditions met.
