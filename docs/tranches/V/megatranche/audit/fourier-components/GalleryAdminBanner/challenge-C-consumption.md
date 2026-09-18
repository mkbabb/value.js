claude-opus-5[1m] (served model id)

# CHALLENGE — `GalleryAdminBanner.vue` · axis **C** (CONSUMPTION)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryAdminBanner.vue` (107 lines, read whole).
**Axis.** How this leaf consumes value.js `0.13.0`, keyframes.js `4.3.0`, glass-ui `^4.0.0`, and the 45-operation fourier API; props/emits contract quality; integration seams.
**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Every row below carries severity · `file:line` · a falsifier, and **the falsifier was run** — three candidate findings died against theirs and are recorded in §5 (Killed) so they are not re-invented.
**Law.** fourier-analysis, glass-ui dist, and the corpus are READ-ONLY evidence. No browser tooling was used; livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.

## §0 — Import surface (the whole consumption footprint)

| Line | Specifier | Producer | Kind |
|---|---|---|---|
| 2 | `@/lib/types` (`AdminStats`) | app-local, **hand-mirrors** `api/models/gallery.py:31-38` | wire type |
| 3 | `lucide-vue-next` (`Shield`, `LogOut`) | dev-dep `^1.0.0` | icons |
| 4 | `@mkbabb/glass-ui/button` | glass-ui 4.0.0 | subpath, **survives** 7.0.0 |
| 5 | `@mkbabb/glass-ui/metric-badge` | glass-ui 4.0.0 | subpath, **DEFINITION-ABSENT at 7.0.0** |
| — | `@mkbabb/value.js` | — | **absent** (see S-5) |
| — | `@mkbabb/keyframes.js` | — | **absent** (see §5 K-3) |

Six `<MetricBadge>` element instances (45, 52, 60, 68, 75, 82) — **6 of the repo's 12**, verified `grep -rc "<MetricBadge" web/src/components/` → `GalleryAdminBanner 7` (6 elements + the prose mention at :96), all six other consumers 1 each. This file is the single largest MetricBadge concentration in fourier.

Tally: **16 defects (2 BLOCKER · 5 MAJOR · 5 MINOR · 4 INFO) · 6 superlatives · 3 killed candidates.**

---

## §1 — BLOCKER

### C-1 · The admin telemetry has no error channel and blanks unrecoverably — BLOCKER

**Claim.** The props contract is `{ stats: AdminStats | null; loading: boolean }` (`GalleryAdminBanner.vue:7-10`) and the grid gate is `v-if="stats && !loading"` (`:44`). Two booleans cannot distinguish **never-fetched** / **in-flight** / **failed**. The producing store swallows every failure whole:

```
web/src/stores/gallery.ts:123-134
async function refreshAdminStats() {
    const token = useAuthStore().getAdminToken();
    if (!token) return;
    adminStatsLoading.value = true;                    // :126
    try { adminStats.value = await api.getAdminStats(token); }
    catch { /* ignore */ }                             // :129-131 — the only bare catch in the file
    finally { adminStatsLoading.value = false; }       // :131-133
}
```

Every other failure path in that same store toasts (`gallery.ts:78`, `:99`, `:110`, `:113`, `:146`, `:158`). This one call site alone is silent.

**Failure scenario (concrete).** An admin's bearer token expires mid-session. `adminFetch` (`web/src/lib/api.ts:245-256`) throws on the 401; `refreshAdminStats` ignores it; `adminStats` stays `null`; the banner renders the header row and **nothing below it, forever** — no message, no placeholder, no retry. Meanwhile `gallery.adminMode` is still `true` (only `deactivateAdmin` clears it, `gallery.ts:117-121`), so the whole admin surface downstream stays enabled against a dead token: the tier buttons (`GalleryView.vue:134`), the batch bar (`:309`), the users/flagged/audit tabs (`:375-385`). The banner is the one surface that could have signalled the dead credential and it is contractually incapable of doing so.

**Falsifier.** Any of: (a) a third prop/state expressing error; (b) the store toasting on this path; (c) a sibling surface reporting admin-fetch failure. **Run:** `grep -n "error\|Error" GalleryAdminBanner.vue` → 0 hits; the store's catch is bare; `grep -rn "adminStats" web/src` → 6 sites, none error-bearing. **The falsifier fails; the claim stands.**

**Why BLOCKER not MAJOR.** Criterion (a) of this file: *produces a wrong or blank user-visible state with no recovery path, and the leaf's own contract makes it uncurable in place.* Both halves hold — fixing this requires widening the props contract, i.e. it is a wave item, not a patch.

---

### C-2 · `./metric-badge` is DEFINITION-ABSENT at producer glass-ui 7.0.0 — BLOCKER (wave-blocking)

**Claim.** `GalleryAdminBanner.vue:5` imports `@mkbabb/glass-ui/metric-badge`. The installed export map has it (`web/node_modules/@mkbabb/glass-ui/package.json` `exports["./metric-badge"] → dist/metric-badge.js`, version 4.0.0 — verified), but the corpus's measured export-map diff records it in the **21 removed** at 7.0.0, re-pointed to `./metric` (`Metric`): `formation/fourier/lane-frontend.md:472` — *"`./metric-badge` removed | **7 imports / 6 files** … `GalleryAdminBanner.vue:5` … → `./metric` (`Metric`). Note the WT diff already did `amount=` → `value=` for the 3.1→4.0 hop (9 lines); another prop pass is due."*

**Failure scenario.** The corpus's **RESOLUTION DEADLOCK** (`lane-frontend.md` §5) proves `glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0` is **one atomic transaction** (keyframes 4.3.0 optional-depends `glass-ui: ~4.0.0`; glass-ui 7 peers keyframes `^6.0.0`; keyframes 6.0.0 pins value.js `4.0.0` exactly). On the day F.W2/F.W3 executes that transaction, this file fails to resolve at module load — and it is the heaviest single site: **6 of 12** repo-wide instances, each carrying `label` + `label-position` + `size` + (2 of 6) `color`, i.e. the largest prop-pass surface of the seven doomed imports. The other five files carry one instance each.

**Falsifier.** (a) `./metric-badge` still exported at producer HEAD; (b) a back-compat alias; (c) this file not among the seven. **Run:** `lane-frontend.md:472` enumerates the seven imports and names `GalleryAdminBanner.vue:5` explicitly; the glass-ui `dock/index.ts` precedent quoted in the same table is *"the five legacy SFCs are DEFINITION-ABSENT — clean break, no alias"*. Producer `src/components/custom/metric*` was probed from this session and returned nothing to contradict the corpus. **Falsifier fails on (b) and (c); (a) rests on corpus authority, so this row is CORPUS-DERIVED, not independently re-measured at producer HEAD** — flagged honestly, and it does not change the disposition because (c) alone makes this a named migration site.

**Note (contradiction check).** Nothing in the live tree disagrees with `lane-frontend.md:472`; the only correction is arithmetic — the table says "7 imports / 6 files", and the live tree confirms 7 import statements across 6 files (this file 1, the other five 1 each, `EquationView.vue:10` +`InfoCard.vue:4` being two of the six). Consistent.

---

## §2 — MAJOR

### C-3 · The "tile projection" is incomplete: the glass-pill chrome survives underneath — MAJOR

**Claim.** The scoped comment at `:96-98` declares the intent: *"we project the surrounding `p-1.5 rounded bg-foreground/[0.03]` tile via the consumer-side host class."* `.admin-stat` (`:99-106`) declares exactly six properties — `padding`, `border-radius`, `background`, `display`, `flex-direction`, `align-items`. Vue scoped styles compile **unlayered**, so they beat glass-ui's `@layer components` rules regardless of specificity — those five land. **Everything else the pill declares survives**:

| Surviving declaration | Provenance | Consequence on a static stat tile |
|---|---|---|
| `border: 1px solid var(--glass-border-quiet)` | `glass-ui/dist/styles/utilities/components.css:29` — resolves to `color-mix(in srgb, var(--foreground) 13%, transparent)` (`tokens/glass.css:160`) | a **13%-foreground border** wraps a tile whose own fill is **3%** foreground (`:102`) — the border is 4.3× the plate it frames |
| `backdrop-filter: var(--glass-blur-quiet)` | `components.css:32` → `blur(calc(…)) saturate(1.05) brightness(1.02)` (`tokens/glass.css:75`) | **six** backdrop-filter layers in one banner; each creates a containing block + stacking context |
| `box-shadow: … , var(--glass-highlight)` | `components.css:33` | glass specular on a flat tile |
| `transition: background/border-color/box-shadow/scale` | `components.css:34-38` | see C-4 |

**Failure scenario.** The rendered artifact is not the `bg-foreground/[0.03]` tile the comment promises; it is a glass pill with a tile-coloured fill — a fourth visual register in a panel the D-audit already flagged for register proliferation (`fourier docs/audits/runs/2026-05-27-D-audit/design/DA-design-A3-gallery-admin.md` finding 6: "Four card-width regimes"). Worse, its immediate sibling in the same panel consumes the same primitive **unmodified** as a pill (`GalleryDraftsSection.vue:58`, `<MetricBadge :value="sortedDrafts.length" size="sm" />`, whose scoped block is `@reference "tailwindcss";` and nothing else) — so the gallery column renders MetricBadge in two mutually inconsistent registers.

**Falsifier.** (a) `.admin-stat` also neutralising border/backdrop-filter/box-shadow; (b) the pill rules not applying (e.g. `@layer` losing to nothing, or the CSS never delivered); (c) `--glass-blur-quiet` resolving to `none`. **Run:** (a) the block declares six properties, read whole — no such declarations. (b) delivery verified end-to-end: `web/src/style.css:3` `@import "@mkbabb/glass-ui/styles"` → `exports["./styles"] → dist/styles/index.css` → `index.css:165` `@import "./utilities.css"` → `utilities/components.css`; and the render-function's utility classes are reached by `index.css:222` `@source "../*.js"` (= `dist/*.js`, where `MetricBadge-BpC0R_Ec.js` lives) plus the build-independent `index.css:201 @import "./components.css"` P9 path. (c) is the live caveat: `tokens/glass.css:74` documents a reduced-transparency arm that can set `--glass-blur-quiet: none`, and `--glass-level` can zero the radius. **So: border/box-shadow/transition survive unconditionally (CONFIRMED, source-derived); the six-blur-layer sub-claim holds only when `--glass-level > 0` and the reduced-transparency arm is inactive — `UNPROVEN-NEEDS-LIVE` for the default theme (SS-13).**

### C-4 · Six non-interactive tiles ship a full interactive affordance — MAJOR

**Claim.** The MetricBadge root class list is unconditional:

```
web/node_modules/@mkbabb/glass-ui/dist/MetricBadge-BpC0R_Ec.js:55
class: l(p(e)("metric-badge cursor-pointer",
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
  n.labelPosition && `metric-badge--label-${n.labelPosition}`, t.$props.class))
```

plus, from the layered CSS the consumer does not override: `:hover { scale: 1.02 }` (`components.css:50-57`), `:active { scale: 0.96 }` (`:59-61`), `:focus-visible { box-shadow: var(--focus-ring-shadow) }` (`:63-66`). The banner attaches **no `@click`, no `tabindex`, no `role`** to any of the six (`:45-88`).

**Failure scenario.** Six tiles present `cursor: pointer`, lift 2% on hover and press 4% on click — the exact affordance vocabulary of the *actually clickable* glass controls one component away (`GalleryCard.vue:144-172` admin overlay buttons, per the D-audit design note). An admin hovers "featured 12", gets pointer + lift, clicks expecting a filter-by-featured, and nothing happens. The `focus-visible` ring is dead code in this consumption: no element is focusable, so the ring can never paint.

Note the cascade asymmetry that makes this worse than a plain leftover: `.admin-stat`'s unlayered `background` **does** beat `:hover`'s layered `background`, so the hover state changes border-colour, shadow and scale but *not* fill — a half-hover, which reads as a rendering bug rather than an intentional affordance.

**Falsifier.** (a) a click handler or `tabindex` on any badge; (b) `cursor-pointer` never emitted by the consumer's Tailwind build (the classic v4 node_modules-not-scanned hazard); (c) `.admin-stat` setting `cursor`. **Run:** (a) `:45-88` read whole — none. (b) killed: `index.css:222 @source "../*.js"` explicitly targets `dist/*.js` and the header comment at `index.css:186-221` documents this as the deliberate cure for exactly that hazard (*"the compiled render-functions live FLAT at `dist/*.js`"*); the app also uses `cursor-pointer` in 8 of its own files, so the utility is emitted twice over. (c) `:99-106` sets no `cursor`. **All three fail; CONFIRMED.** (Perceptual magnitude of the 2% lift: `UNPROVEN-NEEDS-LIVE`.)

### C-5 · The `unit` prop is bypassed; the banner ships two number registers in one row — MAJOR

**Claim.** `formatBytes` (`:16-21`) returns `"12.3 MB"` — value **and** unit concatenated — and that string is fed to `:value` (`:83`). MetricBadge ships a first-class `unit` prop with distinct typography (`metric-badge__unit font-mono text-muted-foreground` at `text-caption`, `MetricBadge-BpC0R_Ec.js:55` render branch) and a wrapper built *specifically* for this pairing:

```
glass-ui/dist/styles/utilities/components.css:107-116
/* T.W2.T2 — stacked variant pairs amount + unit on a single row (row 2)
   below the label (row 1). The `.metric-badge__row` wrapper baseline-
   aligns the value and unit so the quantity reads as one phrase … */
.metric-badge--label-stacked .metric-badge__row { display: inline-flex; align-items: baseline; gap: … }
```

**Failure scenario.** `"12.3 MB"` renders inside the *amount* span, so " MB" inherits `font-semibold tabular-nums tracking-snug` and the mono-caption size — it is typeset as a numeral, not as a unit, and the baseline-alignment machinery the design system built for it is inert. Compounding: the five numeric badges pass raw `number`s and `coalesceMetric` does `String(e)` with no grouping (`dist/coalesceMetric-5qIeZnTx.js`), so `total_views` renders `128473` beside a storage badge that *is* formatted — **two number registers in one 6-tile row**.

**Falsifier.** (a) MetricBadge having no `unit` prop at 4.0.0; (b) no in-repo precedent for `unit=`; (c) `coalesceMetric` grouping numbers. **Run:** (a) `dist/components/custom/metric-badge/MetricBadge.vue.d.ts` declares `unit?: string`, and `utils/coalesceMetric.d.ts` documents it as *"Unit suffix appended after the value (e.g. `Mbps`, `ms`)"*. (b) four sibling callsites use it — `AnimationControls.vue:75` (`unit="×"`), `EquationPanel.vue:79` (`unit="%"`), `EquationView.vue:294`, `InfoCard.vue:33` (`unit="% energy…"`). **This file is the sole `unit`-bypassing MetricBadge consumer in fourier.** (c) `coalesceMetric` is 6 lines: `String(e)`, no `Intl`. **All fail; CONFIRMED.**

### C-6 · The stat grid is destroyed and rebuilt on every refresh — MAJOR (third audit, unremediated)

**Claim.** `v-if="stats && !loading"` (`:44`) unmounts the entire grid whenever a refresh is in flight, even though `stats` still holds the previous values. `refreshAdminStats` is fired after every admin mutation: `GalleryView.vue:134` (each tier change) and `:194` (each batch action), plus `gallery.ts:111` (activation).

**Failure scenario.** An admin features an entry → `setTier` → `refreshAdminStats` → `adminStatsLoading = true` → the six tiles vanish → the banner collapses by the full stacked-tile height (`min-height: 2.625rem` per `components.css:103`, plus the `gap-2` row) → the entire gallery column below it jumps up, then jumps back on resolve. Every tier click, every batch action. There is no skeleton, no `min-height` reservation, and no transition (`v-if`, not `v-show`; no `<Transition>`).

**Provenance of recurrence — this is the third audit to file it.** `fourier docs/audits/runs/2026-05-18-fourier-tranche/f-design-math-functionality.md:221` — *"`GalleryAdminBanner` stat grid vanishes (no skeleton) during `loading` | Low | `GalleryAdminBanner.vue:36`"*; re-pinned at `docs/audits/runs/2026-05-19-refinement-assay/r2-fourier-A-refinement.md:214` — *"W5.a scope mentions `Skeleton` adoption via W3, but doesn't pin this site. Name `GalleryAdminBanner.vue` explicitly in W5.a's sub-gate."* The line has moved 36 → 44; the defect has not moved at all. **I contradict the original severity: "Low" understated it** — the earlier reads treated it as a cosmetic skeleton gap, before `refreshAdminStats` was wired to *every* mutation at `GalleryView.vue:134,194`. At one-blank-per-admin-action it is a MAJOR.

**Falsifier.** (a) a skeleton/`v-show`/height reservation; (b) `loading` never true while `stats` is non-null. **Run:** (a) the template is read whole — none. (b) `gallery.ts:126` sets `adminStatsLoading = true` *without* clearing `adminStats`, so the `stats && loading` state is reachable and is in fact the normal refresh state. **CONFIRMED** (exact collapse height: `UNPROVEN-NEEDS-LIVE`).

### C-7 · The wire contract is hand-mirrored, and drift degrades **silently** into six em-dashes — MAJOR

**Claim.** `AdminStats` (`web/src/lib/types.ts:110-118`) hand-mirrors `AdminStatsResponse` (`api/models/gallery.py:31-38`) field-for-field, snake_case, with no generated client. The banner reads six of those fields directly off the wire object (`:46,53,61,69,76,83`) with no adapter, no projection, no runtime validation.

**Failure scenario — and the specific reason this is worse here than at a normal callsite.** If the backend renames a field (say `total_views` → `views_total` at `api/routers/admin.py:149-157`), `types.ts` still typechecks green, `vue-tsc -b` passes, the fetch succeeds with HTTP 200, and `stats.total_views` is `undefined`. `coalesceMetric(undefined)` returns `{ display: "—", isEmpty: true }` (`utils/coalesceMetric.d.ts`), so the badge paints the canonical em-dash and drops its colour. **A total wire-shape break renders as six tidy em-dashes** — a state visually indistinguishable from "the database is empty". There is no console error, no toast (C-1 swallows it anyway), and no test (C-16).

**Corpus fold.** This is the leaf-side instance of the coupling the intake lane adjudicated: **R6-8** (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md:142`, TRUE, ADOPT-AS-FACT + CARRY → F.W5) — *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam … the shared-provenance contract must keep operation identity independent of client identity."* Here the seam is not merely inseparable, it is **undeclared**: the join between `operation:GET:/api/admin/stats` and `client:getAdminStats` (`web/src/lib/api.ts:495-497`) exists only as two hand-typed structs that no artifact relates. `X-3` (`:154`) places this operation inside the admin arm — *"45 total / 30 public-non-admin / 13 admin … The security gate (R3-7b) is `0 of 45`, so the admin arm is inside the defect"* — and **R3-7b** (`:80`) confirms zero of the 45 operations declare OpenAPI security. fourier's own `docs/audits/runs/2026-05-28-E-audit/EA5-architectural-transpositions.md:47` names this exact class: *"`web/src/lib/api.ts` and `web/src/lib/types.ts` hand-mirror the backend Pydantic shapes (… `AdminStats` …). FastAPI already publishes the canonical schema at `/openapi.json` — the user-mandated single source of truth."*

**Falsifier.** (a) a codegen step producing `types.ts`; (b) runtime validation on the response; (c) the em-dash degradation being loud somewhere. **Run:** (a) `web/package.json` scripts are `dev / build / preview / test:e2e / test:e2e:ui` — no codegen. (b) `adminFetch` → `coreFetch` returns `res.json()` unvalidated (`api.ts:245-256`). (c) `coalesceMetric` is silent by construction. **All fail; CONFIRMED.**

---

## §3 — MINOR

### C-8 · Dead, light-arm-only hex fallbacks that F.W2 is about to orphan — MINOR
`color="var(--tier-featured, #fbbf24)"` (`:57`) and `var(--tier-saved, #60a5fa)` (`:65`). Both tokens **are** defined by the installed producer — `glass-ui/dist/styles/tokens/color-radius.css:270-271` (`oklch(0.841 0.173 84.2)` / `oklch(0.676 0.176 252.3)`) with a distinct dark arm at `tokens/dark-arm.css:141-142` (`oklch(0.867 0.165 88.7)` / `oklch(0.748 0.135 250.1)`) — so the fallbacks are unreachable in normal operation, and if they ever *did* fire (token removal at 7.0.0) they would pin a **light-arm-only sRGB approximation** that cannot follow the dark arm: the banner would go amber-on-dark permanently. Both literals are also verbatim members of `web/src/lib/colors.ts:14-15` `STATIC.rainbow`, the file the census schedules for arm-deletion (`CENSUS-2026-08-03.md:187-188`, *"F.W2 · … delete the `colors.ts` hand-rolled arms"*), so the duplication outlives its source. Already filed once and unremediated: `fourier docs/audits/runs/2026-06-17-M-critique-audit/raw-findings.json:3175`. **Falsifier:** the tokens being undefined (then the fallbacks are load-bearing, not dead) — run: both grep positive in `color-radius.css` and `dark-arm.css`, and are bridged to Tailwind at `theme/bridges.css:198-199`. Fails.

### C-9 · The banner is the one amber surface that never got the app's contrast carry — MINOR
`border-amber-500/30 bg-amber-500/[0.04]` (`:26`) and `text-amber-400` (`:30`) are raw Tailwind palette. The app maintains a *calibrated* amber for exactly this reason — `web/src/style.css:112-128`: *"D.W4.d — light-mode `--viz-amber` darken (axe contrast carry). glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 against `--background` — fails WCAG AA … The override darkens to `hsl(35 76% 35%)` ≈ 4.6:1."* This component bypasses that token entirely; `amber-400` resolves to `oklch(82.8% 0.189 84.429)` (`glass-ui/dist/styles/components.css` `:root`), i.e. **lighter than the value the project explicitly rejected**, on the light arm. **Falsifier:** the icon being decorative, exempting it from WCAG 1.4.11 — partly true (`aria-hidden="true"`, `:30`), which is why this is MINOR and not MAJOR; the `bg-amber-500/[0.04]` plate (4% alpha) and the token bypass stand on their own. Light-arm legibility: `UNPROVEN-NEEDS-LIVE`.

### C-10 · The scoped comment mis-states the upstream contract it is compensating for — MINOR
`:96-98` asserts *"`<MetricBadge>` ships its own tabular-nums + stacked geometry."* It does — `components.css:96-105` sets `flex-direction: column; align-items: flex-start; justify-content: center; gap; max-width: none; text-align: left; min-height: 2.625rem; padding-block`. Therefore `.admin-stat`'s `display: flex; flex-direction: column` (`:103-104`) is **redundant with the rule the comment just credited**, while `align-items: center` (`:105`) **silently overrides the design system's documented `flex-start`** — an undeclared divergence from the primitive's spec, sitting two lines under a comment that says the primitive's geometry is being respected. A reader is told "we only add the tile"; the code also re-specifies and contradicts the geometry. **Falsifier:** the stacked rule not shipping (then the re-declaration is load-bearing, not redundant) — run: `grep -n "metric-badge--label-stacked {" components.css` → line 96, present. Fails.

### C-11 · One of seven wire fields is fetched and never rendered — MINOR
`AdminStats.normal` (`types.ts:114`, produced at `api/routers/admin.py:153`) has zero readers. The banner shows `total_entries / featured / saved / views / likes / storage` — the admin can see two of the three tiers but never the `normal` count, despite `normal` being a first-class filter value one component away (`gallery.ts:33` `tierFilter: "all" | "featured" | "saved" | "normal"`; `GallerySearchBar` exposes it). It is derivable (`total − featured − saved`) but nothing derives it. **Falsifier:** any other consumer of `.normal` — run: `grep -rn "\.normal" web/src` → no hit outside the type declaration. Fails.

### C-12 · The stats request shares an abort key with itself, producing a double flicker — MINOR
`getAdminStats` → `adminFetch(path, token)` → `coreFetch<T>(path, /* abortKey */ path, …)` (`api.ts:245-256`), and `abortable` aborts the previous in-flight request under the same key (`api.ts:54-59`). Two admin mutations in quick succession (two tier clicks — `GalleryView.vue:134`) therefore abort refresh **A** with refresh **B** still open; A's rejection is eaten by C-1's bare catch and **A's `finally` flips `adminStatsLoading` to `false` while B is still in flight** (`gallery.ts:131-133`), so the grid re-mounts, then unmounts again when nothing changes it and finally settles on B — compounding C-6 into a double blink. **Falsifier:** the store guarding re-entrancy the way `fetchNextPage` does (`gallery.ts:61` `if (!hasMore.value || loadingMore.value) return;`) — run: `refreshAdminStats` has no such guard. Fails. Requires the two calls to overlap: `UNPROVEN-NEEDS-LIVE` for the visible blink count.

---

## §4 — INFO

- **C-13 ·** `size="md"` is repeated six times (`:49,56,64,72,79,86`) and is the primitive's **default** (`MetricBadge-BpC0R_Ec.js` `props.size: { default: "md" }`; `MetricBadge.vue.d.ts` *"Typographic scale. Defaults to `md`"*). Six inert props on a 107-line file. Falsifier: a non-`md` default — fails.
- **C-14 ·** `@reference "tailwindcss";` (`:94`) with no `@apply` and no `theme()` anywhere in the block — an inert directive that still costs a theme parse per SFC. Repo-wide pattern, at its purest in `GalleryDraftsSection.vue`, whose entire scoped block *is* the reference and nothing else. Falsifier: any `@apply`/`theme()` in `:93-107` — none.
- **C-15 ·** `formatBytes` (`:16-21`) divides by 1024 but labels `KB/MB/GB` (SI names for binary quantities; `KiB/MiB/GiB` or /1000 would be exact). It is otherwise correct and, notably, **not duplicated** anywhere in the repo (`grep -rn "formatBytes" web/src` → this file only) and has no glass-ui counterpart (`dist/utils/index.d.ts` exports `cn`, `coalesceMetric`, `moveBefore`, `platformSupport`, `prng` — no formatter). Falsifier for the non-duplication half: a second byte formatter — none found.
- **C-16 ·** **The admin arm has no automated coverage at all.** `web/e2e/` holds 8 specs; `grep -rln "admin" web/e2e/` → **zero files**. There is no unit-test runner in `web/package.json`. So the 13-operation admin arm (`X-3`, `lane-fourier-r3-r6.md:154`) — whose OpenAPI security is `0 of 45` (`R3-7b`, `:80`) — is exercised by nothing, and every finding above (especially C-7's silent em-dash degradation) is un-gated. Falsifier: any admin spec or component test — none.

---

## §5 — KILLED CANDIDATES (falsifier ran, claim died — do not re-invent)

- **K-1 · "The `metric-badge` utility classes never paint (Tailwind v4 does not scan node_modules)."** *Killed.* `glass-ui/dist/styles/index.css:222` ships `@source "../*.js"`, which in the *shipped* context resolves to `dist/*.js` — exactly where the compiled render-function `MetricBadge-BpC0R_Ec.js` lives — and `index.css:186-221` documents this as the deliberate cure for a prior dead `../components` glob. A second, build-independent path (`index.css:201 @import "./components.css"`, the P9 emission) ships the component-utility rules outright. Both paths verified present.
- **K-2 · "The SFC-scoped CSS (`data-v-1657dbc5`) is never delivered, so `label-position` is inert."** *Killed.* `index.css:197 @import "../glass-ui.css"` folds the SFC bundle into the `./styles` entry the app imports at `web/src/style.css:3`. Verified: `grep -rl 1657dbc5 dist/` → `MetricBadge-BpC0R_Ec.js` + `glass-ui.css`, and `glass-ui.css` is on the app's import path.
- **K-3 · "The banner consumes zero keyframes.js while the app pins 4.3 — a motion-parity defect."** *Killed as a defect, retained as context.* Nothing in this component should animate through a JS engine; the one motion gap that matters (the grid's abrupt `v-if` swap) is correctly a CSS/`<Transition>` problem and is already filed as C-6. Fabricating a keyframes dependency here would be the opposite of KISS. The genuine keyframes exposure is elsewhere (`useFourierMorph.ts:14`, per `lane-frontend.md` §5).
- *(Also checked and clean: `color="var(--tier-featured, …)"` as a **string** prop reaching `:style="{ color: … }"` — CSSOM accepts a `var()`-bearing value for a standard property, so the token does resolve; `variant`/`size` on `<Button>` are both inside 4.0.0's `buttonVariants` union; `max-width: 8rem` does **not** clip the tiles because the stacked rule relaxes it to `none` (`components.css:101`).)*

---

## §6 — SUPERLATIVES (L-18 runs both ways; each survived its own falsifier)

- **S-1 · The value.js posture is exactly right, and this file is F.W2-INERT.** Zero `@mkbabb/value.js` imports; the colour work is done where it belongs — `color-mix(in srgb, var(--foreground) 3%, transparent)` in CSS (`:102`) and design-system custom properties (`:57,65`). The census fixes fourier's live value.js surface at *"5 import statements / 4 files / 6 symbols, easing-only"* (`CENSUS-2026-08-03.md:38`) and F.W2's job as re-pointing those five to `/easing` (`:187-188`); this component adds **nothing** to that budget and would not have been improved by doing so. **Falsifier:** any value.js import, or a colour computation that CSS cannot express — `grep -n "value.js" GalleryAdminBanner.vue` → 0; `color-mix` covers the one blend. Survives.
- **S-2 · The a11y hole that three prior audits measured across the admin files is closed *here* — and here first.** `docs/audits/runs/2026-05-18-tranche-harden/h3-A-W4-W5-W6.md:80` measured *"0 `aria-*` / `role=` attributes across all three admin files"*, and `f-design-math-functionality.md:220` filed it Medium. Today: `aria-label="Admin mode banner"` on the landmark (`:27`), `aria-label="Log out of admin mode"` on the icon+text control (`:36`), `aria-hidden="true"` on **both** decorative glyphs (`:30,39`) — the correct pairing, not the `title=` anti-pattern the same audit called out in the siblings. **Falsifier:** the remediation being repo-wide rather than notable — run: `AdminAuditLog.vue` still has `aria=0 role=0`. This file did it; a sibling still has not. Survives.
- **S-3 · The 3.1.0 → 4.0.0 `amount` → `value` break is fully discharged at this site.** The M-audit measured the debt with line precision: *"`GalleryAdminBanner.vue:46+53+61+69+76+83` (6 usages)"* and warned it *"will silently render nothing for a valid 0 value (the documented hazard)"* (`docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:519,2620`). Live tree: `grep -c ":amount=" GalleryAdminBanner.vue` → **0**; all six are `:value=` at those same lines. The heaviest MetricBadge consumer in the repo carries **zero** residual rename debt — and the 0-value hazard is now handled correctly upstream (`coalesceMetric(0)` → `{display:"0", isEmpty:false}`). **Falsifier:** any surviving `:amount=` — none. Survives.
- **S-4 · The typography is consumed from the design system, not re-declared.** `cm-serif` (`:31`) is a real glass-ui utility (`dist/styles/typography/utilities.css:60`, *"the Computer-Modern math/serif voice"*), not an orphan class — this file never hand-rolls a font stack. **Falsifier:** the utility being undefined (which would make it dead markup) — run: defined at `typography/utilities.css:60` and reachable via `web/src/style.css:3`. Survives. *(The M-audit's separate note that the literal `cm-serif text-sm font-semibold tracking-tight` recurs across 6 files is a glass-ui `Section`-tone gap, not this leaf's defect.)*
- **S-5 · The props/emits contract is minimal, typed, and store-agnostic.** Two props (`:7-10`), one payload-free typed emit (`:12-14`, tuple syntax), `emit` referenced exactly once (`:37`). The component imports **no** pinia store and touches **no** module-level state — it is a pure projection of two refs the parent owns (`GalleryView.vue:243-248`), which makes it the most isolable component in the gallery cluster. **Falsifier:** any store/composable import, or an emit whose payload could drift — `grep -n "useGalleryStore\|useAuthStore\|pinia" GalleryAdminBanner.vue` → 0 hits; `logout: []` has no payload to drift. Survives. *(This is what makes C-1 a contract-widening wave item rather than a mess: the seam is clean, it is merely too narrow.)*
- **S-6 · Both glass-ui subpath specifiers are bare and correct at the pin.** `@mkbabb/glass-ui/button` and `@mkbabb/glass-ui/metric-badge` (`:4-5`) are per-component subpath imports — no deep `dist/` reach-through, no barrel import of the 80-key root — and `variant="outline"` + `size="sm"` (`:33-34`) are both members of the shipped `buttonVariants` union (`dist/components/ui/button/index.d.ts`). At the pinned version this file's specifier hygiene is exemplary; C-2 is a *producer* break, not a consumer error. **Falsifier:** a deep import or an out-of-union variant — none; `vue-tsc -b` would flag the latter. Survives.

---

## §7 — Verdict

The seam is **clean but too narrow** (S-5), the specifier hygiene is **exemplary at the pin** (S-6), the value.js posture is **correct by omission** (S-1), and two historical debts are **genuinely discharged** (S-2, S-3). Against that: the component cannot express failure at all (**C-1**), it will not resolve after the atomic tri-package uplift and is the heaviest single migration site (**C-2**), it consumes an interactive glass primitive as a static tile and neuters only half of it (**C-3/C-4**), it bypasses the primitive's own `unit` slot that four siblings use correctly (**C-5**), it blanks on every admin action for the third audit running (**C-6**), and its wire contract degrades into six silent em-dashes with no test anywhere to catch it (**C-7/C-16**).

**Consumption axis: DEFECTIVE.** The dominant pattern is *partial consumption* — the primitive's contract is half-read (`label-position` yes, `unit` no; the stacked rule credited in a comment yet re-declared and contradicted in code; the pill's chrome overridden in three properties and inherited in four) — and *contract narrowness* at the API seam, where a hand-mirrored struct meets a two-boolean props contract with a bare `catch {}` in between.

**Carries.** C-2 → F.W3 (with the six other `./metric-badge` sites). C-7/C-16 → F.W5 (folds into R3-7b / R3-7c / R6-8; the generated-client ask is EA5's). C-8 → F.W2 (the `colors.ts` arm deletion orphans the duplicated literals). C-1/C-6 → the component wave, as one contract-widening edit.
