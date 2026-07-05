# S.W3 — PERFORMANCE (S-9/S-23): budgets as gates

**Name**: W3 — Performance (the §6.2 budget regime)
**Opens after**: S.W1 + S.W2 (round 2; runs parallel with S.W4). Round-2 single-writer law: W4-2's `ColorPicker.vue` header re-composition lands FIRST; W3-4 rebases its pane-swap hunks atop it.
**Spec of record**: `audit/SYNTHESIS.md §3.5` (items W3-1..W3-9) · §6.2 budgets (transcribed below) · §6.1 P1 oracle rows (frame-budget specs land with this wave).
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the S.md charter clause, restated here so the rule is self-evident in-file).
**Agents**: ≤4 parallel (fan-out+blob / shell-payload+motion / mix / CSS-diet), path-disjoint per §File bounds.
**Hard gate**: composite (§Hard gate) — the §6.2 budgets green on the built bundle: drag p50 ≤20ms · view-switch first frame ≤100ms · JS eager ≤280KB gzip · render-blocking CSS ≤120KB gzip · 0 ungated idle rAF · π before/after motion captures archived.
**Status**: PENDING-RATIFICATION.

---

## §Goal criterion

Every color interaction and view swap lands inside the §6.2 budgets on real hardware.
(SYNTHESIS §3.5 Goal, verbatim.)

## §Completion criterion

The frame-budget e2e specs (W0-2's floor + this wave's 3 transition-family specs) green at the
§6.2 numbers; the eager-shell re-measure shows JS ≤280KB gzip eager (W3-2) AND render-blocking
CSS ≤120KB gzip (W3-9) — the two owned gates that replace the former ≤420KB composite; π
before/after motion captures archived. (SYNTHESIS §3.5 Completion, verbatim.)

---

## §Scope (SYNTHESIS §3.5 item table, transcribed verbatim — anchors + evidence lanes intact)

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W3-1 | **rAF-coalesce the color fan-out** (the tranche's #1 perf fix; lands with/atop W2's pipeline sink): one derive per frame for aurora seed + blob palette + `--accent-live`; last color of a frame wins. Coalescing does not break S-18 — the seed still tracks | `useAtmosphere.ts:84-95,108-122`; `App.vue:158-164` | perf-transitions P0-1 |
| W3-2 | **Eager-shell deferral, JS half** (S-23 anchor): FIRST task = a per-chunk gzip census of the eager graph (the gate's arithmetic must be owned, not assumed — the 78KB cut from 358KB has to name its chunks); then HeroBlob / aurora canvas behind idle-callback/first-interaction (`scheduleAfterFirstPaint` idiom already demonstrated in glass-ui `useAurora.ts:79-108`) + whatever the census names next. PointerDebugOverlay is dev-only tooling with zero end-user exposure (motion-animation-inventory:181) — its deferral is DX hygiene worth ~0 production bytes, NOT a budget lever. Gate: JS ≤280KB gzip eager; the CSS half is W3-9's | `App.vue:1-60`; perf-general §2 | perf-general P0 |
| W3-3 | **Blob idle-gate (demo half)**: drive the renderer's existing `paused` flag on inactivity; single-frame repaint on color/pointer wake (producer per-frame CPU profile = letter L5). The idle threshold N is stated in the spec file, and the §6.1 frame-budget spec's sampling window MUST exceed N — else the ≤13ms idle gate fails on correct true-idle behavior | `useMetaballRenderer.ts:158,413` (consume side) | perf-transitions P0-2 |
| W3-4 | **Pane-swap payload**: defer heavy in-pane content one frame past enter (KEEP simultaneous mode — the `fceed47` cure stands); kill the layout-property transitions (`height/margin/padding` on `.pane-wrapper`, `margin` on `.pane-shell`); `will-change:transform` scoped to `*-active` only; `content-visibility:auto` on parked panes; right-size `KeepAlive :max` to the non-admin view count | `App.vue:269-273,64`; `ColorPicker.vue:314-318` | perf-transitions P1-1/-2/-3; motion §6 |
| W3-5 | **Motion retunes**: view-swap spring → ~0.3s; dock hover-morph off `--duration-panel` onto its own ~0.2-0.25s token (one token currently serves two very different jobs); Tailwind `@theme` `--default-transition-duration/timing` aliased to the house tokens (21-file bare-utility census inherits at the root); orchestrated-open trim to ~0.7-0.9s (design call inside the wave) | motion-animation-inventory §9 | motion-animation-inventory |
| W3-6 | **Mix clock + Safari-true pour**: ONE authored clock (phase machine reads the canvas's own duration constants, or completion events); `ctx.filter` (unsupported on WebKit) replaced with Safari-true primitives; total ≤1.2s per Q10; reveal lands AT the result plate; generic spinner rows deleted (the animation IS the progress) | `useMixingState.ts:86-104`; `useMixingAnimation.ts:65-68,114` | motion §3 P0-M; design-extract-mix F6 |
| W3-7 | **Hue-sweep invalidation scoping**: retire the `:root`-inherited `--view-hue-shift` transition tax once W7-4's JS-side per-view tokens land (sequenced note; the mechanism decision is here, the consume is W7) | `style.css:175-177` | design-dock-shell P1-7 |
| W3-8 | **RAF-loop discipline**: `useMixingAnimation`/`useInertiaGesture` onto glass-ui `useRAFLoop` (`pauseWhenHidden`+PRM free); the one stray `matchMedia` PRM call → `useBreakpoint` | god-module §2.3/2.4 | god-module-dry-census |
| W3-9 | **CSS critical-path diet** (S-23's CSS half — OWNED here, no longer an ambiguous rider): (a) consume glass-ui's already-published critical/deferred style split — `/styles/critical` (render-blocking early: tokens + glass ladder + typography + theme, ~46% of the producer monolith gzip) + `/styles/deferred` (non-blocking tail), union byte-complete off the producer's SOLE `src/styles/critical-partition.mjs` manifest (cut at glass-ui BC.W-CSS-CRITICAL) — in place of the wholesale `@import` at `style.css:52-58`; (b) the one-time Tailwind coverage/cssnano unused-rule pass perf-general §5 itself names actionable — quantify then purge the shadcn-vue vendor residue vs glass-ui vs live demo CSS. Gate: render-blocking CSS ≤120KB gzip; any producer-owned remainder the coverage pass exposes routes to the letter (an L16-adjacent ask), never a silent miss | `demo/@/styles/style.css:1-66`; glass-ui `src/styles/critical-partition.mjs` | perf-general §5 P2 (promoted); glass-ui BC.W-CSS-CRITICAL |

### §6.2 Perf budgets (SYNTHESIS §6.2, transcribed verbatim — enforced at this wave's close, re-run at S.W9)

| Metric | Baseline (measured) | Gate | Lane |
|---|---|---|---|
| Slider-drag frame p50 (color fan-out) | 49.8ms (~20fps, 31/44 janked) | **≤20ms**, 0 long tasks >50ms in-drag | perf-transitions |
| Idle picker frame p50 (blob mounted) | 18.6ms (54fps) | **≤13ms** (the blob-off floor is 11.5) | perf-transitions |
| View-switch first post-click frame | 254.7ms | **≤100ms** | design-dock-shell |
| View-switch long task | 183ms | **≤50ms** | perf-transitions |
| Eager cold-load (JS+CSS gzip) | ≈543KB (358 JS + 184 CSS) | Two owned gates (the former ≤420KB composite is RETIRED as unowned arithmetic): JS eager **≤280KB** (W3-2) · render-blocking CSS **≤120KB** (W3-9); total transferred is measured + recorded, not gated | perf-general |
| Idle rAF loops, ungated | 2 (watercolor zombie ~50Hz; blob ~100Hz) | **0** un-gated (producer L3 + W3-3) | perf-general |
| Parse-cache bound | `Infinity` ×7 | `maxCacheSize` set ×7 (landed W1-5; re-verified here) | perf-general |
| Pane-swap spring / dock hover | 0.45s / 0.55s | ~0.3s / ≤0.25s | motion; perf-transitions |
| Mix choreography wall clock | 2.9s (with mid-growth jump-cuts) | ≤1.2s, one clock | motion §3; Q10 |

Numbers were captured at dpr=1 on an M5 Max dev build — retina doubles fragment work and the
release build changes constants; **gates are re-measured on the built bundle at wave close, and
any gate re-baselining is recorded, never silent** (R lesson 3).

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any `src/` write (the library halves landed at W1); any `../glass-ui`
  write (the watercolor zombie L3, the aurora idle idiom, the critical-partition manifest are
  ALL producer surfaces — consume or letter, never patch);
- **non-local gate failures**: the per-chunk census showing the ≤280KB JS gate unreachable by
  deferral alone (the gate's arithmetic must be re-owned on the record — a re-baseline event,
  never a silent miss); the coalesce breaking S-18 seed-tracking (premise says it cannot — if it
  does, the pipeline graph is mis-modeled); `/styles/critical` union proving byte-incomplete
  against the manifest (producer letter, L16-adjacent);
- **loop halt**: the third iteration of any frame-profiling diagnostic loop halts and routes.

## §File bounds · disjointness · worktrees

| Unit | Files | Access |
|---|---|---|
| fan-out + blob (W3-1, W3-3) | `demo/@/composables/color/useAtmosphere.ts` · `App.vue:158-164` · `useMetaballRenderer.ts` (consume flags) | modify |
| shell payload + motion (W3-2, W3-4, W3-5, W3-7, W3-8) | `App.vue` · `ColorPicker.vue:314-318` (rebased atop W4-2) · `demo/@/styles/style.css` · motion token homes · `useMixingAnimation.ts`/`useInertiaGesture.ts` (RAF discipline) | modify |
| mix (W3-6) | `useMixingState.ts` · `useMixingAnimation.ts` · the mix canvas modules | modify |
| CSS diet (W3-9) | `demo/@/styles/style.css:1-66` · the coverage-pass artefact | modify/create |
| oracle specs | `e2e/smoke/` — 3 transition-family frame-budget specs + the census/measure scripts | create |

Do NOT touch: `src/`, `api/`, `../glass-ui`, `docs/precepts/`. `useMixingAnimation.ts` is shared
by the mix and RAF-discipline units — fold or sequence, never parallel. `ColorPicker.vue`:
W4-2 lands FIRST (round-2 single-writer law); W3-4 rebases.

## §Hard gate (verbatim-faithful to SYNTHESIS §3.5 + §6.2)

1. The 3 transition-family frame-budget e2e specs green at the §6.2 numbers (numeric p95
   assertions), measured on the **built bundle**.
2. Per-chunk gzip census artefact exists; JS eager **≤280KB gzip**; render-blocking CSS
   **≤120KB gzip**; total transferred measured + recorded.
3. 0 un-gated idle rAF loops (demo half; the producer zombie is letter L3 — its persistence is
   recorded as a producer-gap row, never shimmed).
4. Mix: one clock, ≤1.2s wall, Safari-true primitives (no `ctx.filter`), reveal at the result
   plate — verified on `smoke-safari`.
5. W3-3's idle threshold N stated in the spec file; the idle-budget sampling window > N.
6. π before/after motion captures archived.
7. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · e2e 5-project green.

## §No-workaround prohibitions (binding)

- **Do NOT pre-bundle glass-ui** (the K.W2.5 lesson — dev fan-out is informational).
- **PointerDebugOverlay is NOT a budget lever** (dev-only, ~0 production bytes — the honesty
  clause is part of the spec).
- **No silent re-baselining** — any gate re-baseline is an on-record event.
- **No producer patches** — L3/L5/L16-class remainders route to the letter.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each unit batch and before close;
`npm run gh-pages` (built-bundle measure) after W3-2/W3-9 and at close; `npx playwright test`
(incl. the new frame-budget specs + smoke-safari) before close.

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the per-chunk gzip census (before/after); the
frame-budget spec outputs (p50/p95 tables against the §6.2 baselines); the coverage-pass
quantification (shadcn residue vs glass-ui vs live demo CSS); **π before/after motion captures**
(the paired archive — drag, view-switch, mix); per-unit commit hashes.

## §Commit plan

W3-2 census FIRST (own commit — the owned arithmetic); W3-1 coalesce; W3-3 idle-gate; W3-4
pane-swap payload (rebased atop W4-2); W3-5 retunes; W3-6 mix re-author (Q10, commit with body);
W3-8 RAF discipline; W3-9 CSS diet (consume + purge, commit with body); the frame-budget specs;
a status commit at close.

## §Dependencies

- **Depends on**: S.W1 + S.W2 (the coalesced sink lands with/atop W2's pipeline; W1-5's cache
  bounds re-verified here).
- **Blocks**: S.W5 + S.W6 (round 3) and S.W7 (consumes W3-4's deferral mechanics + W3-7's
  mechanism decision).

## §BOOKS opened/serviced (books-never-gates)

- **L3 watercolor-zombie / L5 blob-profile producer halves** — letter items; a miss in-window
  is recorded as a producer-gap row + re-verified at W8.
- **W3-7 → W7-4 sequenced consume** — the mechanism decision recorded here; the consume is W7's.

## §Evidence packets consumed

`audit/lanes/perf-transitions.md` · `audit/lanes/perf-general.md` ·
`audit/lanes/motion-animation-inventory.md` · `audit/lanes/god-module-dry-census.md` §2.3/2.4 ·
`audit/lanes/design-dock-shell.md` P1-6/P1-7 · `audit/lanes/design-extract-mix-generate.md` F6 ·
glass-ui `src/styles/critical-partition.mjs` (read-only; BC.W-CSS-CRITICAL provenance).

## §Hand-off

Round 3 (W5 ∥ W6) opens on this wave (+W4): W5's loading grammar and W6's atmosphere land
against real budgets. W7-5 consumes W3-4's deferral mechanics; W7-4's per-view tokens retire the
W3-7 tax. S.W9 re-runs the §6.2 gates at tranche close.
