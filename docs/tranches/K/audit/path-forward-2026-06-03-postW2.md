# K — Path forward (post-K.W2): the resolution transposition + the re-specced waves

> **Mode: TRANCHE DEVELOPMENT (planning only). NO implementation.** This document
> is the synthesis of a three-wave, 6-agent-per-wave deep audit run 2026-06-03
> over the **executed** K.W2 substrate + the remaining K plan + the live cohort
> (glass-ui, keyframes). It supersedes the mechanism choice of
> `design/K.W1-cross-repo-topology.md §4` and amends `K.md §2/§3/§7`. The binding
> per-wave specs are `design/K.W2.5-resolution-transposition.md` +
> `coordination/cohort-glassui-3.2.0-keyframes-3.0.0.md` + the re-spec drafts under
> `design/`.

---

## §0 — How this was derived (the calculated wave pipeline)

Three workflow-waves, each 6 agents in parallel, each **calculated from the prior**:

| Wave | Output | Run |
|---|---|---|
| **W1 — diagnostic audit** | prompt-recap · K.W2-execution · resolution-arch · remaining-K · cohort · deferred/precept | unanimous verdict (below) |
| **W2 — solution design** | 6 full grounded design specs on the contract-v2-clean foundation | `/design/K.W2.5*`, `/coordination/*`, re-spec drafts |
| **W3 — adversarial grounding + cross-consistency** | DAG/overlap reconciliation · resolution feasibility · publish-ordering · lift/shader risk · completeness · precept/overfit | the corrections in §3 |

W4 (ratification) was assessed unnecessary — W3's six lanes each returned
`needs-reconciliation` (sound designs, reconciled in-wave), not `has-issues`.

---

## §1 — The verdict (W1, unanimous, gate-grounded)

**K.W2's `inv-K-4` mechanism-A is a precept violation, and it is the root cause of
the dual-instance fragility.** Grounded by *running glass-ui's own gate*:

- K.W2 added a `development → src/` export condition to **all 68 glass-ui exports**
  (cohort commit `6d3e151`) and to **value.js's own exports** (`c4c5842:27`). This
  is the exact condition the constellation's **contract-v2** precept
  (`docs/precepts/cross-repo-dev-resolution.md` §2.1) *strikes* and §4 invariant-30
  *forbids* — a condition the **user himself directed abrogated**. glass-ui's
  `proof:resolution` gate (`FORBIDDEN_EXPORT_KEY = "development"`) **FAILS on both
  repos** (agents ran it; glass-ui CI `ci.yml:64` + `release.yml:45` are RED).
- Root cause: a **K.W1 documentation read-miss** — `K.W1-cross-repo-topology.md §4`
  mislabeled the abrogated *contract-v1* condition as "glass-ui's own contract-v2
  pattern extended to source" (the inverse of the precept).
- The source-resolution it introduced **caused** the dual-instance fragility: a
  dual-Vue Teleport `insertBefore` crash, band-aided by the `resolve.dedupe`
  `@vue/*`+reka-ui expansion (`vite.config.ts:49-56`), a **precept-§2.4-forbidden**
  `@mkbabb/value.js→src` self-alias (`vite.config.ts:37`), the `check-types.mjs`
  foreign-error filter, and the `fs.allow` widening. The booked dock-Select
  blocker (16 e2e specs) is downstream of the same posture.
- The reka-ui "skew" is a **single stale 2.8.2 install** (value.js declares
  `^2.9.7` but never re-installed), **not** two instances — fix is `npm install` +
  a lockfile-drift guard.

**The gestalt — mechanism-C, by DELETION:** restore contract-v2 dist-resolution kept
fresh by `build:watch`. Delete the `development` condition (both repos) → gate
green; resolve glass-ui's **dist** in the demo → single externalized vue/reka
instance → the dual-instance class is gone *by construction*; retire all four
band-aids; restore a plain `vue-tsc -p` typecheck. The **`tsconfig.lib/demo` split
(inv-K-1) STAYS** — it is precept-clean and survives unchanged; only the demo's
glass-ui resolution flips source→dist.

**Tranche identity: CONTINUATION of K.** A mechanism swap, not a re-founding. A new
corrective lane **K.W2.5** lands first; then W3–W6 re-spec on the clean substrate.
The K.W2 dedup (inv-K-2), the tsconfig split (inv-K-1), the api-lane, the dispatch
hygiene, and the CI/CD are **sound and stand**.

---

## §2 — The canonical wave schedule + dependency DAG (W3 lane-1, reconciled)

The single authoritative schedule across **value.js (K)**, **glass-ui (AS)**,
**keyframes.js (A)**. **No cycle** — the only cross-repo edge is
`glass-ui → value.js(lib)` (aurora's inv-K-2 color core); the `tsconfig.lib` split
makes the reverse structurally unrepresentable.

| # | Wave | Repo | Keyframes-gate | Publish/consume |
|---|------|------|---------------|-----------------|
| 1 | **K.W2.5** — resolution transposition (mechanism-C by deletion) | value.js + glass-ui | none | glass-ui exports-revert lands FIRST; value.js flips to dist |
| 2 | **glass-ui AS.W2 / W-A** — contract-v2 restoration | glass-ui | none | the cohort half of #1; `proof:resolution` GREEN |
| 3 | **keyframes A — 3.0.0** | keyframes.js | *is* the gate | registry-publish; SIBLING, not a value.js blocker except the router anchor |
| 4 | **K.W3a** — glass-ui-side authoring (lifts + asks + derive-producer) | glass-ui (AS.W5) | none | authors into 3.2.0 |
| 5 | **value.js Part-B** — `parseCSSColor` tighten + `parseColorUnitToRgb01` | value.js (lib, rides K.W3) | none | value.js **publishes 0.11.0** (glass-ui consumes from registry) |
| 6 | **glass-ui AS.W6** — the single 3.2.0 publish | glass-ui | none | `3.1.1→3.2.0` cut **against Part-B value.js**; carries W-A+W-D+W-LIFT+W-DERIVE\*+W-ASKS+aurora-cast-delete |
| 7 | **K.W3b** — value.js consume-from-dist | value.js | none | bump `@mkbabb/glass-ui ^3.2.0`; delete blob files + 9 casts; fold J.W3 PaletteDiff |
| 8 | **K.W4** — aurora-derive + VAL-1 ship-or-kill | value.js + glass-ui | at-close green | consume `deriveAuroraPalette` from 3.2.0 dist; π re-tint gate |
| 9 | **K.W5** — modern-web + router + type-hardening | value.js | **router 4→5 ONLY** | most levers dispatch NOW on the W2.5 substrate |
| 10 | **K.W6** — close + v1.0.0 + hardened release-gate | value.js + cohort | full-cohort green | v1.0.0; binding π (C1/C2/C3); `proof:resolution`-green release gate |
| 11 | **L** — api excision | value.js→L | — | re-preconditioned on **K.W2.5-green** (was K.W2-green) |

\* `deriveAuroraPalette` ships in 3.2.0 **only if** K.W4 commits a live consumer
(VAL-1 ≥2 gate); else VAL-1 KILL per the J kill-date.

**The load-bearing publish spine (serial):**
`value.js 0.11.0 (Part-B)` → `glass-ui 3.2.0 (cut against it)` →
`value.js K.W3b/K.W4 consume 3.2.0 dist`. No mid-edit source consumption at any
hop; `dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)` gives dist-freshness during
co-development.

---

## §3 — W3 grounding corrections (folded into the specs)

1. **KEYSTONE — dts-freshness mechanism.** glass-ui `build:watch` = `vite build
   --watch` is **JS-only** (`package.json:571`); `.d.ts` emission is a *separate*
   `emit-types` step (`vue-tsc --project tsconfig.build.json`, `:581`). So
   "build:watch keeps dist `.d.ts` fresh" is **ungrounded** — the current dts is
   fresh by accident, not by mechanism. **Decision:** the cohort must make the
   watch emit dts — either glass-ui adds a combined `build:watch` (JS + dts) or
   value.js `dev.sh` spawns *both* the JS watch and a `vue-tsc --watch` dts watch.
   K.W2.5's "vue-tsc green against fresh dist" gate depends on this. *(Folded into
   K.W2.5 + glass-ui AS.W2.)*
2. **Dock fix = `:inert`-predicate realignment, NOT new CSS.** The `pointer-events:
   none + visibility:hidden` already ships (`glass-ui dock.css:420-424`). The real
   bug: `:inert` is keyed on raw `expanded` (`GlassDock.vue:332,338`) while
   `.layer-active` is keyed on `visualExpanded` (`:149`) — they diverge in
   always-expanded mode. Fix = realign `:inert` to `visualExpanded` + gate
   `layersVtStyle` (`:181-188`) behind reduced-motion + non-headless + no-op the
   FLIP under PRM. *(Glass-ui W-D, in 3.2.0.)*
3. **`parseCSSColor` typing → K.W3, value.js-owned.** It must precede glass-ui 3.2.0
   so the aurora `cssToOklch` cast (`color.ts:122`) deletes in the *same* publish.
   The tighten is **safe** (traced: every branch routes through
   `createColorValueUnit`, throws on failure — distinct from the `Palette.id`
   lie). Canonical form = annotate the memoize callback return type (a single
   library-internal `as`-narrowing mirroring `resolveToPlainColor` — budget
   IMPROVES). Full surface: 9 explicit demo casts (7 files) + 1 glass-ui +
   4 untyped consumers.
4. **Demo `Palette` union → SIMPLIFY.** The discriminated union is **over-engineered**
   vs the real defect (`utils.ts:24`, already guarded by `getPaletteKind`). Use
   `id?: string` + guards unless L-brand symmetry becomes a standing mandate.
5. **Lockfile guard = CI `npm ls` step, not a bespoke script** (avoid re-creating the
   retired proof:* idiom; the guard is a legitimate structural check).
6. **The dock 16-spec GREEN gate moves to K.W3** (the GlassDock W-D fix ships in
   3.2.0, which lands after K.W2.5). K.W2.5 close proves only that the Teleport
   *crash* is gone (single instance); the full-suite green is a K.W3 gate.
7. **keyframes 3.0.0-ii (WAAPI `linear()`) is already SHIPPED** (`waapi.ts:171` +
   `springTimingFunction.ts:117`) — keyframes 3.0.0 is the **semver correction** +
   CF-Pages migration + the router-5 anchor, NOT new spring work. VAL-9 stays KILLED.

---

## §4 — The consolidated fold-ledger (every item → wave → trigger)

**Chronic (3+ tranches), all folded:**
- aurora-derived-from-color (A-1 m.13, 7+ tranches) → **K.W4** (`deriveAuroraPalette`
  + AuroraPane + picker wiring; VAL-1 2nd-consumer).
- blob-facility extirpation (A-1 m.13, 7+ tranches) → **K.W3** (goo-blob→Metaballs,
  WatercolorDot→BlobDot, lifted to glass-ui, consumed from 3.2.0 dist).
- 8→4 net-new glass-ui asks (A→I) → **K.W3a** (glass-ui).
- VAL-1 OKLab-LUT → **K.W4** ship-or-kill (no re-book per J kill-date).

**New this-session deferrals, all folded:**
- the resolution transposition → **K.W2.5**; the dts-watch seam → **K.W2.5 + glass-ui**.
- reka-ui stale-install + lockfile guard → **K.W2.5**.
- dock-Select blocker → **K.W2.5** (reka dissolves) + **glass-ui W-D** (focus); green
  re-verify → **K.W3**.
- `parseCSSColor` typing root-fix → **K.W3** (value.js 0.11.0).
- demo `Palette` id-honesty → **K.W5** (simplified to `id?:` + guards).
- inv-K-5 demo-API-resilience (typed degraded-backend; delete the `VITE_API_URL`
  same-origin hack + the CORS env-noise clause) → **K.W5**.
- `dispatch.ts` hue-cluster extraction to `mix.ts` (the *real* decomposition vs the
  K.W2e comment-condensation) → **K.W5**.
- idempotency store honesty (rename to burst-dedup OR Mongo-TTL) → **L**.

**Doc-reconciliations (W6 γ + K.W2.5 doc-pass):**
- VAL-9 KILLED — **strike** the re-bookings in `K.md §7` + `L.md §10`.
- J.W3 `PaletteDiff.vue` (fired-trigger orphan; `/diff` route shipped+green) →
  **re-home to K.W3**; add to the carry-forward ledger.
- the dirty `docs/precepts` submodule → **commit + record the contract-v2 lesson in
  LESSONS-LEARNED.md** (no K wave closes on a dirty submodule).

**Booked monitors (unchanged):** WebMCP/`fetchLater`/Summarizer/passkeys; cron-txn;
bench-script; the library `Palette` domain type — all re-checked per their triggers.

---

## §5 — Precept-conformance verdict (W3 lane-6)

The plan conforms to no-legacy / no-workaround / KISS / one-path:
- `parseColorUnitToRgb01` is the **KISS root-fix** (not scope-creep) — it kills a
  10+-site cast surface at the source.
- the lockfile guard is a **legitimate `npm ls` structural check** (NOT the retired
  grep-class proof idiom).
- deleting `check-types.mjs` + restoring plain `vue-tsc -p` is **fully conformant**
  (no residual filter; a real `.d.ts` trust boundary under dist-resolution).
- the demo `Palette` union must **simplify** before authoring (the one over-engineering
  flag — folded into §3.4).
- K.W2.5 itself is **deletion-based** (it removes a mechanism, smuggles none).

---

## §6 — Prompt-coverage (the "recap ALL prompts" mandate)

Every arc + session request is addressed or folded with a named wave:
- **arc-1 m.13** ("glass-ui for ALL styling; the AND-gap; playwright the blob+aurora,
  abstract them idiomatically; aurora from a singular color") → glass-ui-first
  consummation (K.W3) + aurora-derive (K.W4) + the π visual-runtime lane (K.W6).
- **"Execute K.W2 now; gate vue-tsc 0 + Playwright green vs no backend"** → K.W2
  delivered, with the honest correction that "Playwright green" was a *narrowed*
  gate (page-load only); the full suite goes green at K.W3 after the dock W-D fix.
- **CI/deploy = babb.dev spine, api.color.babb.dev, git-pull DEC-9, unified ci.yml +
  lighthouse/axe** → delivered in K.W2.
- **this audit** ("ameliorate all issues — dock, derive-aurora — in calculated
  workflow-waves; full wave specification; no implementation; fold deferred; glass-ui
  + keyframes complete wave spec too") → **this document + the per-wave specs**.

---

## §7 — The glass-ui-session coordination (resolved)

**STRIP, surgically:** revert only the `development`-condition exports-half of
`6d3e151` (the 68 keys) — **keep** the inv-K-2 OKLab-dedup half (the `color.ts`
refactor + the 6/6 equivalence canary). glass-ui's `proof:resolution` goes green;
3.2.0 ships contract-v2-clean. **Do not Reconcile** (loosening the gate would
entrench the abrogated fossil). **No tug-of-war:** value.js is *revoking* mechanism-A
as a confirmed mistake (this audit ran glass-ui's gate and proved it) and transposing
to mechanism-C — value.js needs **no** `development` condition from glass-ui. The
glass-ui exports-revert lands **first** in the cohort lockstep; value.js flips to dist
+ retires the four band-aids in the same K.W2.5 wave.

---

## §8 — Mode + authority

Planning-only. Authors no code. The IMPL dispatch of K.W2.5 (and the re-specced
W3–W6) is gated on user ratification of this synthesis + the per-wave specs (inv-G1).
L's dispatch-gate is amended to "after **K.W2.5**-green." Authority: the 2026-06-03
audit mandate ("6-agent deep audit; ameliorate all issues in calculated
workflow-waves; full wave specification; fold deferred; no implementation").

---

## §9 — Visual-round addendum (2026-06-04) — the screenshot session + its findings

A second audit round (per the "screenshot session of every page, now not deferred"
mandate) ran **two serial 6-agent workflows** over an **84-capture instrumented
screenshot session** (every view × 3 viewports × light/dark —
`audit/visual-evidence-2026-06-04/DELTA.md`). It confirmed the doc-only verdict and
**found a P0 only the pixels + a live CSSOM reproduction could reveal.**

**The headline new finding — desktop view-switching is fundamentally broken (P0).**
Every secondary view (browse/extract/generate/gradient/mix/palettes/admin-users) at
desktop 1280 renders its content panel **off-screen-left** (a ~40px sliver) and at
1440 fully **blank**, while *mobile renders perfectly*. **Root cause, live-reproduced
(booted the dev server, drove Playwright, walked the CSSOM):** a **Tailwind v4
`@source`-scan emission gap** — `App.vue`'s `lg:flex`/`lg:block`/`lg:hidden` pane-
visibility utilities are **never generated** (App.vue is a sibling subtree outside
Tailwind v4's auto-detected source root), so base `hidden` wins → `display:none` on
the desktop panes while the mobile slot leaks. It is the **same class as the
grand-audit's P9**, now confirmed in the app shell. **Proven:** injecting the 3
missing rules restores the centered dual-pane. Fix = an explicit `@source` directive
(the idiomatic Tailwind-v4 close, not a per-class hack) + a defense-in-depth media-
query hardening + a CI emission-probe. **New lane: `design/K.W2.6-desktop-pane-
visibility.md`** — lands **after K.W2.5, before K.W3**, so all downstream visual gates
run on a correct layout.

**Visual confirmations (the chronic mandates, now pixel-grounded):**
- **C2 aurora palette-blindness — CONFIRMED.** Static blue "Sky", identical in all 84
  captures, while the color is pink. The aurora-from-color chronic is *visibly* open
  → **K.W4** (`design/K.W4-aurora-derive-visual-refinement.md`). The glass-ui session
  has **already authored `deriveAurora`** (a different name+signature than the spec's
  `deriveAuroraPalette` — the K.W4 refinement reconciles to the shipped one). The
  `/atmosphere` stub footer "the background atmosphere itself is live" is **provably
  false** → corrected in the K.W4 AuroraPane rebuild.
- **C3 blob footprint — CONFIRMED** (desktop speck / mobile clip; the satellite is
  visible — the "0×0" doc-fear is **refuted**). The real defect is the
  footprint==render-resolution contract (a two-file size split + ambiguous grid
  intrinsic width + absolute-overflow detach) → **K.W3**
  (`design/K.W3-blob-footprint-refinement.md`).
- **C1 dock — refined:** not "absent" at desktop, **collapsed** (`Dock.vue:93
  :start-collapsed="isDesktop"`; capture-missed). The headless-open bug stands →
  glass-ui W-D; green re-verify at K.W3.
- **D6 view-routing fallthrough** (palettes/mix ≡ picker) is partly expected (shared
  left pane) and compounded by the D5 clip → covered by **K.W5** VIEW_MAP single-source.

**Strengths to guard at close (the positive π baseline):** distinctive Fraunces
typography (not generic-AI), faithful dark-mode chrome parity, the correct inv-K-5
degraded-backend surface, and a banding-free spectrum (inv-K-2 intact).

**The π visual-runtime lane is now SPECCED + grounded** in these captures
(`design/K.W6-pi-visual-runtime.md`): the 84 captures are the **K-open baseline**; the
14-view affected-page set supersedes the 5-slug placeholder; the binding K.W6 close
assertions are the aurora re-tint `readPixels` hue-shift (C2), the blob
present/positioned/rasterized probe (C3), the **desktop-panel-in-viewport** probe
(D5), the distinct-view-content probe (D6), the dock focus-reachability (D7), and
WCAG-AA panel-text-over-aurora contrast; `/tmp/capture.mjs` is promoted to
`scripts/capture-visual-runtime.mjs`.

**Wave schedule amendment:** the §2 DAG shape is **unchanged** (acyclic; serial
publish spine intact). Additions: **K.W2.6** (the new desktop-pane lane, between
K.W2.5 and K.W3); the K.W3/K.W4 visual refinements above; the K.W6 π lane is now
binding with the desktop-centering + distinct-view-content + dock-present assertions.
The screenshot-session mandate is **SATISFIED**.
