# M — PROGRESS

**Status board.** M is **planning-only at open** (authored 2026-06-04 from a two-wave 12-agent
post-L deep audit). M.W1–M.W9 are IMPL, **hard-blocked on explicit user ratification** of this
charter + the supersede-K decision (§0 of `M.md`). No M wave dispatches until ratified.

## Wave status

| Wave | Disposition | Kind | Status | Gate |
|---|---|---|---|---|
| **M.W0** — Charter | DEV | — | **AUTHORED 2026-06-04** | `M.md` + `audit/{fold-ledger,prompt-coverage,wave1-2-synthesis}.md` committed; awaits ratification |
| **M.W1** — Precept remediation + publisher compliance | IMPL | unilateral | **PLANNED** | delete `development` key; mechanism-C (dist-resolution + build:watch); retire 4 band-aids; reka single-install; `vue-tsc` 0 vs fresh dist; `proof:resolution`-clean |
| **M.W2** — Hardening (desktop-P0 + WithId) | IMPL | unilateral | **PLANNED** | `@source` directive (desktop panes in-viewport); 25 `as <Model> & {_id}` casts → 0 (all 4 models, not Palette-only); api `tsc` 0 + suites |
| **M.W3** — Elegance transpositions | IMPL | unilateral | **PLANNED** | 2 color-resolvers → 1; parseCSSColor typed (9-cast delete); PRM hole gated |
| **M.W4** — value.js 0.11.0 publish | IMPL | unilateral (spine head) | **PLANNED** | `npm publish` 0.11.0 (unblocks glass-ui 3.3.0) |
| **M.W5** — Aurora consummation (C2 + VAL-1) | IMPL | semi-unilateral | **PLANNED** | aurora palette-derived (π); VAL-1 ship-or-KILL |
| **M.W6** — Modern-web + router 4→5 | IMPL | unilateral (vue 3.5 satisfies router 5) | **PLANNED** | router 5; VIEW_MAP single-source; dispatch.ts decomposed |
| **M.W7** — glass-ui 3.3.0 cohort (blob C3 + dock C1) | IMPL | **COHORT** | **PLANNED** | glass-ui 3.3.0 published; demo blob dirs deleted; dock e2e green |
| **M.W8** — Infra convergence | IMPL | unilateral | **PLANNED** | Ask 3 (N1-fix) + Ask 5 (CF-Pages) + inv-22-color vhost |
| **M.W9** — v1.0.0 close + π + reconciliation | DEV | unilateral | **PLANNED** | π green; v1.0.0 published; all invariants verified; `FINAL.md` |

## The acyclic publish-spine (binding order)

`value.js 0.11.0 (PUBLISH)` → `glass-ui 3.3.0 (PUBLISH, value.js-peer bumped ^0.10.0→^0.11.0, cut against 0.11.0)` → `value.js demo consume + v1.0.0`.
value.js is the pure SINK — both `glass-ui(lib) → value.js(lib)` (OKLab dedup) and `keyframes(lib) → value.js(lib)` (`^0.10.0`, direct) point INTO it; the only `value.js → glass-ui` edge is demo-only + unpublished, so no cycle. keyframes 3.0.0 already shipped (no further publish); it does NOT gate the router (vue-router has no keyframes edge — vue 3.5 is the router-5 precondition, satisfied).

## Unilateral vs cohort (the dispatch split)

- **Unilateral (dispatch on ratification, no cross-repo wait):** W1, W2, W3, W4, W6, W8.
- **Semi-unilateral (consume an already-shipped producer — `deriveAurora` in glass-ui 3.2.0):** W5.
- **Cohort-gated (needs glass-ui 3.3.0, glass-ui's arm authors it):** W7.
- **Close:** W9.

## Invariant ledger (structural — no proof scripts)

| Invariant | Statement | Lands |
|---|---|---|
| inv-M-1 | zero exports-map precept violation (no `development`/source-resolution key; `proof:resolution`-clean) | M.W1 |
| inv-M-2 | WithId completeness (0 `as <Model> & {_id}` across all 4 models; `WithId<T>` flows from the repo boundary) | M.W2 |
| inv-M-3 | one color-resolution path (library-backed, no divergent DOM duplicate) | M.W3 |
| inv-M-4 | PRM-complete (every shipped continuous render loop gates prefers-reduced-motion) | M.W3 |
| inv-M-5 | no bespoke design-system facility in demo/ (goo-blob + watercolor-dot live in glass-ui) | M.W7 |
| inv-M-6 | registry consumption (glass-ui + keyframes by published version, not file:) | M.W9 (v1.0.0) |

## Dispatch gate (the IMPL precondition)

**Gate**: explicit user ratification of the charter + supersede-K. **Status**: **OPEN** (awaiting
ratification). On ratification, M.W1 dispatches first (clean resolution is the substrate for all
downstream work); W4 (publish) gates W7 (the cohort cut).
