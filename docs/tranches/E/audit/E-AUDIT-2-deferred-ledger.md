# E-AUDIT-2 — Full Deferred-Items + Chronically-Deferred Ledger

**Tranche**: E (value.js's fourth tranche). **Audit lane**: E-AUDIT-2.
**Posture**: read-only research. No git mutation. No `src/` edits. This document is the sole artefact.
**Repo HEAD at audit**: `eae8afc` on `master` (D close merge — v0.6.0). Branch `tranche-e` (just opened).
**Date**: 2026-05-20.

**Binding invariant (the user's E-opening directive)**: *"Delineate any chronically deferred items AND any deferred items and fold them into this new tranche."* — interpreted strictly: E's scope ABSORBS the open ledger unless there is a hard external block.

---

## §1 — Methodology

### Grep patterns scanned (across all `docs/tranches/A/**/*.md`, `B/**/*.md`, `D/**/*.md`, plus `docs/precepts/`, `CHANGELOG.md`):

- `\bDEFER\b` / `\bDEFERRED\b` / `\bdefer(red)?\b`
- `routed to` / `routes to` / `named destination`
- `successor tranche` / `future tranche` / `glass-ui successor`
- `filed (in|at|for)` / `filed sharper`
- `\bSTANDS\b` / `\bOPEN\b` / `\bRETIRED\b`
- `chronically deferred`
- `not folded` / `out of scope` / `glass-ui-blocked` / `precept-§10`
- `next pass` / `not D's to`
- `KEEP-INTERNAL` (the B.W3 + D.W1 Lane L6 disposition lexicon)

### Sources scanned

- `docs/tranches/A/` — 8 wave docs, 30 audit docs (W0–W7 + HARDEN-1..6), 5 research letters (Aa..Ae), `FINAL.md`, `findings.md`, `coordination/Q.md`, `A.md`.
- `docs/tranches/B/` — 5 wave docs, 14 audit docs (B.W1..B.W4 + B.W3-library-gap / B.W3-typecheck), 8 research letters (Ba..Bz), `FINAL.md`, `findings.md`, `coordination/Q.md`, `B.md`, `B-PROMPTS.md`.
- `docs/tranches/D/` — 7 wave docs, 24 audit docs (D.W0..D.W6 + D-HARDEN-1..6 + D-LIB-OPTIMIZATION-SYNTHESIS + D-REACTIVITY-A/B), 14 research letters (Da..Dn + Di/Dj/Dk/Dl/Dm/Dn CHALLENGE variants), `FINAL.md`, `findings.md`, `coordination/Q.md`, `D.md`, `D-PROMPTS.md`, `D-RELEASE-PLAN.md`.
- `CHANGELOG.md` (v0.6.0 release notes).
- `docs/tranches/C/` — touched lightly (C is the palette-CRUD/fourier tranche, scoped out of A/B/D inheritance).
- `docs/precepts/instructions/LESSONS-LEARNED.md` + `docs/precepts/cross-repo-dev-resolution.md` (constellation invariants).

### Verification

- Glass-ui's post-D ship state: `git -C /Users/mkbabb/Programming/glass-ui log ce5aad8..HEAD --oneline` returns 4 commits since contract-v2 (`e2e5303` Safari fix; `9275584` `./styles.css` SFC-scoped surface — partially closes contract-v2 §2.1 keystone gap; `0124a8b` motion-duration tokens; `66e9b8f` chart-token swap). **None of the 7 standing glass-ui §3 primitive/blob gaps shipped.** Grep `positionSource|deriveAuroraPalette|BlobDot|icon-sm|clampLabel` across glass-ui's `src/` returns zero hits in component code (matches only token-CSS strings).

---

## §2 — Full ledger (table form)

**Total items**: 38 (incl. the 30 items in Da §3 + 6 D-introduced + 2 newly surfaced).
**ID convention**: items use the originating-tranche prefix (A-* / B-* / D-*) plus the originating audit doc.

| ID | Item | First deferred (tranche/wave/doc) | Named destination | Status at master HEAD | Chronic indicator | Systemic cause |
|---|---|---|---|---|---|---|
| **A-01** | metaballs `positionSource` + pointer + per-blob opacity + HSV perturbation + WebGL context-loss recovery (now sharpened to 7 additions: G1–G7 incl. `MetaballCanvas mode="layout"` G6 + `pauseOnHidden` G7) | A `research/Ae` Ae-10 → `A/audit/W6-deferred.md` → `A/coordination/Q.md §3` | glass-ui primitive-ship successor tranche | OPEN — re-verified STANDS at D close (`D/coordination/Q.md §3` table row 1); surface SHARPENED to 7 items in D | **3-tranche chronic** (A→B→D, surface grew over time) | glass-ui-blocked: writer is glass-ui repo |
| **A-02** | Aurora `deriveAuroraPalette(baseColor, opts)` + `deriveAuroraConfig(baseColor, opts)` + grayscale-C=0 carve | A `research/Ae` Ae-11 → `A/audit/W6-deferred.md` | glass-ui primitive-ship successor tranche; value.js demo-abstraction post-ship | OPEN — STANDS at D close (algorithm sketch + grayscale carve preserved in `D/research/Dc-aurora.md §3 + §3.2`) | **3-tranche chronic** (A→B→D, algorithm sharpened) | glass-ui-blocked + precept-§10 (wire-before-retire) |
| **A-03** | `BlobDot` organic-dot primitive | A `research/Ae` Ae-13 → `A/coordination/Q.md §3` | glass-ui primitive-ship successor; value.js extirpation tranche post-ship | OPEN — STANDS; 11 `WatercolorDot` consumers (16 instance sites — corrected at `D/research/Dd-blob.md §6`) | **3-tranche chronic** | glass-ui-blocked |
| **A-04** | `SelectTrigger size` prop (`sm` = `h-9`) | A `research/Ad` Ad-16 → `A/coordination/Q.md §3` | glass-ui successor (`<SelectTrigger>` API surface) | OPEN — STANDS; 11 demo `<SelectTrigger class="h-9">` callsites + marker comments | **3-tranche chronic** (A→B→D, marker-only) | glass-ui-blocked |
| **A-05** | `DockSelectTrigger`/`SelectTrigger clampLabel` prop | A `research/Ad` Ad-18 → `A/coordination/Q.md §3` | glass-ui successor | OPEN — STANDS; `[&>span]:line-clamp-none` child-selector hack survives at `DockViewSelect.vue:41-43` | **3-tranche chronic** | glass-ui-blocked |
| **A-06** | `TooltipContent variant="mono"` | A `research/Ad` Ad-17 → `A/coordination/Q.md §3` | glass-ui successor | OPEN — STANDS; 7 of 8 tooltips re-specify a mono recipe | **3-tranche chronic** | glass-ui-blocked |
| **A-07** | `Button size="icon-sm"` rung | A `research/Ad` Ad-5 → `A/coordination/Q.md §3` | glass-ui successor | OPEN — STANDS; ~7 inline icon buttons re-implement `Button ghost icon` | **3-tranche chronic** | glass-ui-blocked |
| **A-08** | `Card` props fail-explicit | A `research/Aa` A-key-4 → `A/coordination/Q.md §3` | glass-ui Q (Q-card-2) | **RETIRED** — A.W1 consumed Q.W2 (`cab7258` glass-ui v1.8.7) | 1-tranche (RETIRED at B.W0) | — |
| **A-09** | `<Tabs variant="underline">` on the provider family (the REAL ask after glass-ui shipped header-only `<UnderlineTabs>`) | A `research/Ab` Ab-10 → B re-filed sharper at `B/audit/B.W2-underline-tabs.md` | glass-ui successor tranche | OPEN — STANDS at D close; demo's `.underline-tabs` reka override stays (a live, documented override) | **3-tranche chronic** (A→B sharpened→D STANDS) | glass-ui-blocked: glass-ui shipped wrong shape (header-only), so the demo still cannot adopt |
| **A-10** | `useMetaballRenderer.ts` (333 LoC) demo-side abstraction — delete the lifecycle half + route through glass-ui hook + picker-derived atmosphere | A `audit/W6-deferred.md` | a value.js demo-abstraction tranche, opened once glass-ui ships A-01/A-02/A-03 | OPEN — pure inheritance from A-01..A-03; no demo-side action possible until upstream ships | **3-tranche chronic** (derivative) | glass-ui-blocked + precept-§10 |
| **A-11** | `ConfigSliderPane` → glass-ui `./configurator` adoption (the one piece NOT glass-ui-blocked; the `./configurator` surface ships) | A `audit/W6-deferred.md` | a value.js demo-abstraction tranche (small, unblocked follow-up) | OPEN — NOT glass-ui-blocked. B.W0 noted "partly done" via ConfiguratorRow per Bγ. **No D.W3 lane scheduled or landed this.** | **3-tranche chronic, unblocked** | orchestrator-bandwidth: every tranche A/B/D triaged it as "small, follow-up" without binding it to a wave |
| **A-12** | `cssColorToRgb` per-frame hot-spot at `useMetaballRenderer.ts:174` (1×1 canvas-2D round-trip every frame) | A `audit/W7-performance.md`; re-confirmed at B `audit/B.W4-performance.md §3` | a future demo-abstraction follow-up | **PARTIALLY LANDED** — D.W3 Lane C memoised with 256-entry LRU cap at `useMetaballRenderer.ts:53` (commit `cea5e3f`). The hot-spot is now mitigated; the canvas-2D resolver itself remains | LANDED at D.W3 (closed) | — (was orchestrator-bandwidth; D closed it) |
| **A-13** | A.W6 fallback inheritance — `useMetaballRenderer.ts` (333 lines) stays in full; `WatercolorDot` demo-local; `AuroraPane` "under rework"; atmosphere keeps W0's static `AuroraConfig` | A `audit/W6-deferred.md` | — (derivative of A-01..A-03) | OPEN — pure inheritance; tracked via §"Named successors" | **3-tranche chronic** (derivative) | glass-ui-blocked |
| **A-14** | `findings.md` (A) header still reads "glass-ui HEAD `d244dd5`" — outlier vintage | A `audit/W7-doc-drift.md` item 8 → B.W4-doc-drift §1 row 8 STILL-VALID → Da §2 Δ1 | D.W6 close-ceremony (optional sweep) | OPEN-RESIDUAL — historical A-vintage doc, never edited by B.W4 close (which fixed only B-vintage docs + A.md §8) | **3-tranche chronic** | doc-drift convention: historical-frozen docs left intact |
| **A-15** | `A/findings.md §intro` stale "Mode: tranche development only" line | A `audit/W7-doc-drift.md` item 9 → Da §2 Δ2 | optional D-sweep | OPEN-RESIDUAL — same provenance as A-14 | **3-tranche chronic** | same |
| **A-16** | `A/coordination/Q.md §intro` phantom `SPEC §"Document Set"` citation | A `audit/W7-doc-drift.md` item 11 → Da §2 Δ3 | optional D-sweep | OPEN-RESIDUAL — historical | **3-tranche chronic** | same |
| **A-17** | `A/dispatch/AGENT.md` phantom `STYLE.md` citation | A `audit/W7-doc-drift.md` item 13 → Da §2 Δ4 | optional D-sweep | OPEN-RESIDUAL — historical | **3-tranche chronic** | same |
| **A-18** | `A/waves/W7.md` phantom "dual ceiling" + stale `3310a8c` header | B `audit/B.W4-doc-drift.md` §1 item 14 | optional D-sweep | OPEN-RESIDUAL — historical A-vintage wave spec | **2-tranche chronic** | same |
| **A-19** | `gh-pages` `dist/` housekeeping (stale `postcss-BrHISTov.js`, `standalone-*.js` chunks lingering) | A `audit/W7-performance.md` → confirmed B `audit/B.W4-performance.md §1` STILL STANDS → Da §3 Δ6 | D doc-drift/housekeeping (optional) | OPEN-MINOR | **3-tranche chronic** | orchestrator-bandwidth |
| **B-01** | 290-error vue-tsc demo backlog (now 126 after B.W3 cleared the custom-bucket 86 errors) — ~126 in generated shadcn-vue (`ui/auto-form/` 104 + `ui/button/` + `ui/form/` + `ui/chart/`) | B `audit/B.W3-typecheck.md` → `B/FINAL.md §3` | "a generator-update or vendoring-policy effort" | OPEN — vue-tsc 126 at D.W6 close (`D/FINAL.md §6` gate 1); no movement across D | **2-tranche chronic** (B→D) | generator-not-built: requires regenerating `auto-form/`/`chart/`/etc. against current shadcn-vue + a vendor-policy decision |
| **B-02** | 11 value.js `src/` library gaps (G1–G11) | B `audit/B.W3-library-gap.md §2` | "a value.js library-maintenance effort" | **MOSTLY LANDED at D.W1 L6** — G1 (registerColorNames family) SHIPPED; G11/K5 (solveCubicBezierX) SHIPPED; G2/G7 KEEP-INTERNAL; G5 DONE; **G3/G4/G6/G8/G9/G10 DEFER with named destinations** (per `D.W1-library-barrel.md`) | PARTIAL — 4 of 11 still open | orchestrator-bandwidth + KISS (G6/G9 have no consumer) |
| **B-03** | Invariant-30 contract-v2 staleness (value.js pinned `3c32fae`; glass-ui shipped contract-v2 at `ce5aad8` v1.9.3) | B `audit/B.W3-library-gap.md §4.2-§4.3` → Da §3 item 11 | "a single targeted wave" | **LANDED at D.W1 Step 1** (`73fdabc` + L1-L5; precept submodule advanced `3c32fae → 68d9b20` at D.W0 Lane 0 `11abd86`) | LANDED (closed) | — |
| **B-04** | `viewSchema.ts` extraction (separate `ViewId`/`PaneConfig`/`VIEW_MAP` schema from `useViewManager.ts` runtime state) | B `audit/B.W3-library-gap.md §3` (routed-from-B.W2 cleanup verdict) → Da §3 item 12 | candidate D wave | **LANDED at D.W3 Lane D** (`4d439bf` — viewSchema.ts NEW 199 LoC; useViewManager.ts 237 → 79 LoC) | LANDED (closed) | — |
| **B-05** | `--menu-min-w` exception sites (3 locations: `GenerateControls.vue:91,114` + `DockViewSelect.vue:57`) | B.W1 markers → Da §3 item 14 | D should leave unless a `--menu-min-w-wide` token is introduced | RESOLVED-BY-DESIGN — documented per-instance override; no further action expected | not a defer (documented design choice) | — |
| **B-06** | Substrate-without-consumer: 5 B.W3 library modules (`src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts`) have 0 in-repo test/demo consumers | B `audit/B.W4-substrate-without-consumer.md §"Note"` → Da §3 item 19 | "STRONG CANDIDATE — small, library-only, mechanical" | **LANDED at D.W1 L7** — 7 new test files; vitest 1409 → 1576 (167 new tests); the WIP is properly retired | LANDED (closed) | — |
| **B-07** | Generator-update / vendoring-policy decision for `ui/auto-form/`, `ui/chart/`, etc. (the policy layer, distinct from the error count) | B `audit/B.W3-typecheck.md` → Da §3 item 20 | could pair with B-01 | OPEN at D close — no movement | **2-tranche chronic** | vendor-policy not formalised; orchestrator-bandwidth |
| **B-08** | K4 keyframes.js Prettier-doc gap | B `findings.md §2 M` ("K4 → B.W4") → Da §3 item 18 | "re-confirm K4 disposition; either close it or re-file" | OPEN — D.W6 close filed it as named-destination ("future library-doc tranche if formatting-policy unification pursued"), no D action beyond record | **2-tranche chronic** (B→D, never bound) | orchestrator-bandwidth + no formatting-policy unification effort opened |
| **B-09** | 6 keyframes.js-side parity gaps (kf-1 965-line god module, kf-3 missing `"sideEffects": false`, kf-2 inconsistent `import type`, kf-4 fleet-divergent `dts({rollupTypes:true})`, kf-5 demo hand-rolled clipboard, kf-6 no tranche methodology) | B `research/B-keyframes-parity.md` → B `coordination/Q.md §9` → Da §3 item 16 | keyframes.js own schedule | OPEN — D refreshed at `D/coordination/Q.md §9.1-§9.5`; the 6-item maintainability inventory routes to keyframes.js's own maintenance schedule; D added C1 + C5 (split sketch) | **2-tranche chronic** (B→D, refreshed/sharpened) | keyframes.js-blocked: writer is keyframes.js repo |
| **B-10** | keyframes.js precept-pin convergence (`458c2d1 → 68d9b20`) | B `coordination/Q.md §9` → D refreshed at `coordination/Q.md §9.1` | keyframes.js's own schedule | OPEN — STANDS at D close; one-line submodule bump filed | **2-tranche chronic** | keyframes.js-blocked (precept-pin only; not on critical path) |
| **B-11** | A↔Q contested boundary (Q.W1-C + Q.W2-B contested lanes) | B `coordination/Q.md §4`, B `FINAL.md §6` | — | **MOOT-RETIRED** — Q closed without writing value.js; Q's own round-4 audit retired the contested lanes (`4b16de7`) | 1-tranche (RETIRED at B.W0) | — |
| **B-12** | Ab-16 PointerDebugOverlay hardcoded colors (dev-only) | A.md §8 retire-rationale (added by B.W4 close-residuals `719d2a6`) | RETIRED-WITH-RATIONALE — dev-only debugging surface | **RETIRED-WITH-RATIONALE** | 1-tranche (retired at B.W4) | — |
| **B-13** | Ad-20 SelectContent `min-w-*`/`max-h-*` per-instance literals | A.md §8 retire-rationale | RETIRED-WITH-RATIONALE | **RETIRED-WITH-RATIONALE** | 1-tranche (retired at B.W4) | — |
| **B-14** | Ae-12 Aurora cursor seam | A.md §8 retire-rationale | RETIRED-WITH-RATIONALE — cosmetic seam | **RETIRED-WITH-RATIONALE** | 1-tranche (retired at B.W4) | — |
| **D-01** | Contract-v2 §2.1 keystone gap on glass-ui's `./styles` Tailwind-source subpath (filed at D.W1 Step 1) | D `audit/D.W1-contract-v2.md §4` → `D/coordination/Q.md §3` (added row) | glass-ui's next subpath-surface wave or AG-GU fleet-migration | **STILL OPEN, partially mitigated externally** — glass-ui shipped `./styles.css` → `dist/glass-ui.css` at `9275584` (SFC-scoped compiled surface), making the two CSS-distribution concerns "honestly distinct." The original `./styles` subpath remains Tailwind-source (still violates §2.1 strictly). value.js's `vite.config.ts:siblingFsAllowTransient` retains the narrow carve-out | **1-tranche, externally partially-mitigated** | glass-ui-blocked: structural choice — Tailwind-source vs. compiled CSS; `9275584` ships the compiled half but not the source-subpath rework |
| **D-02** | keyframes.js post-v0.6.0 consumption update — bump `^0.6.0` pin + rename `AnimationOptions → CSSAnimationOptions` imports + verify `Color.components.get` → own-property migration | D `coordination/Q.md §9.5` | keyframes.js's own schedule | OPEN — STANDS at D close | **1-tranche** (D filed; routes forward) | keyframes.js-blocked |
| **D-03** | smoke-safari WebKit follow-up — Pixel-7 in Playwright runs Chromium (not WebKit); iOS-Safari engine-specific bugs uncaught | D `audit/D-HARDEN-5 §4`, D.W5 Lane C, D `coordination/Q.md §11` | "a value.js testing-hardening tranche post-D (or the next pass after D close)" | OPEN — STANDS at D close | **1-tranche** (D filed) | orchestrator-bandwidth + new project scaffolding (Playwright `smoke-safari` project + 30s sustained spec) |
| **D-04** | L14 — `parse-that` `dispatch(map)` adoption for nameParser's 147-branch `any()` (`src/parsing/color.ts:473-486`) | D `audit/D.W1-library-barrel.md §L14` | "D.W6 close-residuals or a future P3 perf wave when `parse-that` ships a name-keyed `dispatch` variant" | OPEN — DEFERRED with detailed reasoning; depends on `parse-that` upstream feature | **1-tranche** (D filed) | upstream-blocked (`parse-that` does not yet ship a name-keyed `dispatch` variant) + cold path low priority |
| **D-05** | L13 — k-means tune (`maxIterations` + JND threshold) — optional benchmark-gated optimisation | D `audit/D.W1-test-coverage-lint.md` → D.W3 Lane C bandwidth-gate | "D.W3 Lane C per L13's bandwidth-gated posture" | OPEN — D.W1 Lane L7 DEFERRED; not picked up at D.W3 either | **1-tranche** (D filed → D-bandwidth-gated → not picked up) | orchestrator-bandwidth (bandwidth-gated, OPTIONAL) |
| **D-06** | BBNF grammars wiring to runtime equivalence check (the `parser-snapshot.test.ts` rename retired the `bbnf-equivalence.test.ts` misnomer; the grammars themselves remain documentation-only) | D `audit/D.W6-doc-drift.md` (BBNF decision) | "named-routed via `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §3 L15` if pursued" | OPEN — KISS default; deferred unless pursued | **1-tranche** (D filed) | orchestrator-bandwidth + KISS gate (larger engineering effort) |
| **D-07** | api/ runtime perf measurement (the D.W2 service+repository indirection) — DEFERRED with structural-no-regression argument | D `audit/D.W6-performance.md §"Backend"` | "structural-no-regression argument; measurement DEFERRED" | OPEN-WITH-ARGUMENT — no local MongoDB; structural no-regression-by-construction asserted | **1-tranche** (D filed) | external-dep: no local MongoDB instance configured |

---

## §3 — A-CHRONIC bucket (items first deferred in A that survived B + D)

**Count**: 13 items (A-01..A-19, excluding A-08 RETIRED, A-12 LANDED-at-D, and intermediate retirements).

| ID | Item | E disposition recommendation |
|---|---|---|
| A-01 | metaballs API additions (7) | **ROUTE-FORWARD** — glass-ui-blocked. No glass-ui ship in D's window. E cannot author. Re-verify at E open whether glass-ui has shipped; if so, FOLD-INTO-E the consumer migration. |
| A-02 | `deriveAuroraPalette` + grayscale carve | **ROUTE-FORWARD** — glass-ui-blocked. Same as A-01. Algorithm sketch preserved in `D/research/Dc-aurora.md §3 + §3.2` ready for the demo-abstraction tranche. |
| A-03 | `BlobDot` primitive | **ROUTE-FORWARD** — glass-ui-blocked. |
| A-04 | `SelectTrigger size` | **ROUTE-FORWARD** — glass-ui-blocked. |
| A-05 | `clampLabel` | **ROUTE-FORWARD** — glass-ui-blocked. |
| A-06 | `TooltipContent variant="mono"` | **ROUTE-FORWARD** — glass-ui-blocked. |
| A-07 | `Button size="icon-sm"` | **ROUTE-FORWARD** — glass-ui-blocked. |
| A-09 | `<Tabs variant="underline">` provider family | **ROUTE-FORWARD** — glass-ui-blocked. glass-ui shipped wrong shape; the demo's `.underline-tabs` reka override is the documented carve-out. |
| A-10 | `useMetaballRenderer.ts` demo-side abstraction | **ROUTE-FORWARD** — derivative of A-01..A-03; precept-§10 (wire-before-retire) forbids deletion ahead of replacement. |
| A-11 | `ConfigSliderPane` → `./configurator` adoption | **FOLD-INTO-E** — NOT glass-ui-blocked. The `./configurator` surface ships. This is the **single A-CHRONIC item with no external block**. 3 tranches (A→B→D) triaged it as "small, follow-up" without binding it to a wave. E should bind it to a small wave. |
| A-13 | A.W6 fallback inheritance | **ROUTE-FORWARD** — derivative of A-01..A-03. Tracks the named successors automatically. |
| A-14..A-18 | 5 historical A-vintage doc-drift residuals (`findings.md` HEAD/Mode lines, `Q.md` phantom SPEC cite, `dispatch/AGENT.md` STYLE.md cite, `W7.md` "dual ceiling") | **FOLD-INTO-E** as a single low-cost doc-drift sweep lane (mechanical edits; 5 files; ~30 min lane). The "historical-frozen" rationale held through B and D; E can either honor it again with one explicit decision, or sweep it. Recommend sweep — E is supposed to absorb the open ledger. |
| A-19 | `gh-pages` `dist/` housekeeping (stale chunks) | **FOLD-INTO-E** — one-line `rm -rf dist/ && npm run gh-pages` orchestrator action. Trivial. Surfaced in 3 tranches; E should close. |

**A-CHRONIC summary**: 9 ROUTE-FORWARD (all glass-ui-blocked), 7 FOLD-INTO-E (A-11 `./configurator` + 5 historical doc-drift + 1 `gh-pages` housekeeping).

---

## §4 — B-CHRONIC bucket (items first deferred in B that survived D)

**Count**: 5 items (B-01, B-02 partial, B-07, B-08, B-09, B-10 — B-03/B-04/B-06 landed at D; B-05/B-11/B-12/B-13/B-14 retired).

| ID | Item | E disposition recommendation |
|---|---|---|
| B-01 | ~126 generated shadcn-vue typecheck cluster | **FOLD-INTO-E** (with vendoring-policy lane, see §7). Move from "filed" → "addressed". |
| B-02 | 4 remaining of 11 library gaps (G3 deep `@src/...` imports, G4 `InterpolatedVar._lerp` typing, G6 docs, G8 gradient-stop helper, G9 `recomposeMatrix2D` asymmetry, G10 `QUANTIZE_DEFAULTS` export) | **FOLD-INTO-E (selective)**: G3 + G10 are mechanical low-cost; G4 was bundled with D.W3 L5/L11 hueMethod work (verify it landed there; if not, fold); G6 docs is doc-only; G8/G9 KEEP-INTERNAL/KISS-rejection unless a consumer materialises. Recommend a small library-completeness lane covering G3 + G4 verification + G10. |
| B-07 | Generator-update / vendoring-policy decision (policy layer) | **FOLD-INTO-E** as the companion lane to B-01. Decision: regenerate against current shadcn-vue / freeze + suppress / remove unused / custom-fork. Without the policy decision, B-01 stays open indefinitely. |
| B-08 | K4 keyframes.js Prettier-doc gap | **RETIRE-OR-FOLD** — D.W6 filed it as "future library-doc tranche if formatting-policy unification pursued". E either opens such a unification or retires this with explicit "no formatting-policy unification planned" rationale. **Recommend RETIRE** — 2 tranches of bandwidth-gating signal this is not load-bearing. |
| B-09 | 6 keyframes.js-side parity gaps | **ROUTE-FORWARD** — keyframes.js-blocked. Filed asks; keyframes.js bumps on own schedule. Re-verify at E open. |
| B-10 | keyframes.js precept-pin convergence | **ROUTE-FORWARD** — keyframes.js-blocked, documentation-only (does not affect the runtime gate). |

**B-CHRONIC summary**: 3 FOLD-INTO-E (B-01 generated cluster + B-02 selective + B-07 vendoring policy), 1 RETIRE candidate (B-08), 2 ROUTE-FORWARD keyframes.js (B-09, B-10).

---

## §5 — D-CHRONIC bucket (items deferred at D close)

**Count**: 7 items (D-01..D-07).

| ID | Item | E disposition recommendation |
|---|---|---|
| D-01 | Contract-v2 §2.1 keystone gap on `./styles` Tailwind-source subpath | **REASSESS-AT-E-OPEN** — glass-ui's `9275584` (`./styles.css` → `dist/glass-ui.css`) ships the compiled half. E should verify whether value.js can adopt the dual `./styles` (Tailwind-source) + `./styles.css` (compiled) pattern and retire its `siblingFsAllowTransient` carve-out. If yes → **FOLD-INTO-E** (small consumer-migration). If no → ROUTE-FORWARD. |
| D-02 | keyframes.js post-v0.6.0 consumption update | **ROUTE-FORWARD** — keyframes.js-blocked. value.js cannot write keyframes.js. |
| D-03 | smoke-safari WebKit follow-up | **FOLD-INTO-E (recommended)** — a new Playwright project (`smoke-safari`) + a 30s sustained spec is well-defined, value.js-owned scope. E should pick this up as a single testing-hardening lane (mirrors D.W5 Lane C's `smoke-mobile` shape). |
| D-04 | L14 — `parse-that` `dispatch(map)` for nameParser | **ROUTE-FORWARD** — upstream-blocked (`parse-that` doesn't yet ship a name-keyed `dispatch` variant). Cold path; low priority. E may re-check upstream and act if shipped. |
| D-05 | L13 — k-means tune (`maxIterations` + JND threshold) | **FOLD-INTO-E (optional)** — bandwidth-gated across D.W1 + D.W3; benchmark-gated optimisation; ~15-30 min lane per the original spec. E can either fold it as a small perf lane or **RETIRE** as never-load-bearing. |
| D-06 | BBNF grammars runtime-equivalence wiring | **RETIRE** — KISS default; 2 tranches of bandwidth-gating; no consumer of the wiring. Recommend explicit retire-with-rationale ("documentation artefacts only; runtime equivalence wiring not pursued"). |
| D-07 | api/ runtime perf measurement (backend) | **FOLD-INTO-E or RETIRE** — depends on whether E configures local MongoDB. If yes, fold a 30-min benchmark lane; if no, retire with structural-no-regression argument re-asserted. |

**D-CHRONIC summary**: 2 FOLD-INTO-E recommended (D-03 smoke-safari + D-05 k-means optional), 1 REASSESS (D-01 contract-v2 §2.1 now externally-mitigated), 1 retire candidate (D-06), 2 ROUTE-FORWARD (D-02 keyframes.js, D-04 upstream-blocked), 1 conditional (D-07 backend perf).

---

## §6 — Glass-ui-blocked bucket

**Items**: A-01, A-02, A-03, A-04, A-05, A-06, A-07, A-09, A-10, A-13, D-01.

### Glass-ui's ship state in D's window (`ce5aad8..HEAD`)

```
66e9b8f  fix(tokens)/AH.W2-C: swap --chart-jitter and --chart-upload
0124a8b  feat(tokens)/AH.W5-e: --motion-duration-* + --motion-delay-* canon
9275584  feat(exports): add ./styles.css → dist/glass-ui.css for SFC-scoped surface
e2e5303  fix(aurora): double-rAF the Safari post-paint fallback
```

### Per-item disposition

| Item | Prerequisite | Shipped in D's window? | Disposition |
|---|---|---|---|
| A-01 (metaballs 7 additions) | `positionSource`/`pointerUniform`/`perBlobOpacity`/HSV-perturb in glass-ui `src/` | NO — grep returns 0 in component code | **STILL BLOCKED**; route forward |
| A-02 (`deriveAuroraPalette`) | `deriveAuroraPalette` export in glass-ui | NO | **STILL BLOCKED** |
| A-03 (`BlobDot`) | `BlobDot` primitive in glass-ui | NO | **STILL BLOCKED** |
| A-04 (`SelectTrigger size`) | `size` prop on `SelectTrigger` | NO | **STILL BLOCKED** |
| A-05 (`clampLabel`) | `clampLabel` prop on `DockSelectTrigger`/`SelectTrigger` | NO | **STILL BLOCKED** |
| A-06 (`TooltipContent variant="mono"`) | `variant="mono"` variant | NO | **STILL BLOCKED** |
| A-07 (`Button size="icon-sm"`) | `icon-sm` size rung | NO | **STILL BLOCKED** |
| A-09 (`<Tabs variant="underline">` provider family) | underline as a variant within `<Tabs>` provider (preserving `<TabsContent>` + `data-state` + ARIA) | NO — glass-ui still ships header-only `<UnderlineTabs>` standalone | **STILL BLOCKED** |
| A-10 (`useMetaballRenderer.ts` extirpation) | A-01 ship | NO | **STILL BLOCKED** (derivative) |
| A-13 (A.W6 inheritance) | A-01/A-02/A-03 ship | NO | **STILL BLOCKED** (derivative) |
| D-01 (contract-v2 §2.1 `./styles` Tailwind-source) | glass-ui ships a contract-v2-compliant Tailwind-source distribution | **PARTIALLY** — `9275584` ships the compiled SFC-scoped `./styles.css`; the original `./styles` subpath remains Tailwind-source (still violates §2.1 strictly per precept text). value.js's `siblingFsAllowTransient` is still the documented consumer-side reciprocal | **PARTIALLY MITIGATED**; E should re-assess whether value.js can adopt the dual-export pattern and retire its carve-out. |

**Glass-ui's most recent ship**: `66e9b8f` (token swap). No primitive/blob/aurora ship in the entire D window. The systemic blocker has NOT lifted.

**E disposition for glass-ui-blocked bucket**: ALL 10 stay ROUTE-FORWARD to a glass-ui primitive-ship successor tranche (`D/FINAL.md §9` row 1). The one partial mitigation (D-01) is a candidate for FOLD-INTO-E if E confirms the dual-export pattern works.

---

## §7 — Generator-update bucket

**Item**: B-01 (~126 generated shadcn-vue typecheck cluster) + B-07 (vendoring policy).

### Movement during D's window

- D did NOT pick up B-01 or B-07. vue-tsc count is 126 at D.W6 close — same as at B close (`D/FINAL.md §6` gate 1 GREEN at 126; `B/FINAL.md §3` row H).
- D's L1-L8 typecheck work focused on the LIBRARY-side (the `src/` 5 WIP modules + Color flatten + recursion-guard); the demo-side `ui/auto-form/`/`ui/chart/` generated cluster is unchanged.
- D added a `lint` script + eslint flat config at D.W1 L7 (`6ca2046`), but lint is distinct from vue-tsc and does not address the generated cluster.

### Systemic cause

**Generator-not-built**: The cluster originates from `npx shadcn-vue add auto-form` (and similar) generated against an older shadcn-vue version. Fixing requires either:
1. **Regenerate** against the current shadcn-vue (potentially introducing new behavioural changes the demo doesn't want).
2. **Freeze + suppress** — formally tag the directory as vendor-frozen and suppress vue-tsc on it (`tsconfig.json` exclude or `// @ts-nocheck`).
3. **Remove unused** — `ui/auto-form/`, `ui/chart/`, `ui/calendar/` may not have demo consumers; corpus-grep would establish whether they can be deleted entirely.
4. **Custom-fork** — keep the generated shape but TypeScript-fix the specific 126 errors.

### E recommendation: **OPEN A VENDOR-POLICY LANE**

The cluster has chronic-deferred across 2 tranches purely because no tranche has opened a vendor-policy lane. The lane has 3 deliverables:
1. Corpus-grep each generated `ui/*` directory for in-demo consumers (`grep -rn 'from "@/components/ui/auto-form"'` etc.) — establishes which directories can be deleted.
2. For surviving directories, formal decision: regenerate (re-run `npx shadcn-vue add`) OR freeze (tag + suppress) OR custom-fork (TS-fix in place).
3. Apply the decision; verify vue-tsc count moves; lint stays green.

Estimated effort: 1 wave with 2 lanes (audit + apply). **FOLD-INTO-E.**

---

## §8 — Smoke-safari bucket

**Item**: D-03 (smoke-safari WebKit follow-up, filed at `D/coordination/Q.md §11` and `D/audit/D-HARDEN-5 §4`).

### Filing details

- **What**: a `smoke-safari` Playwright project + a single 30-second sustained spec exercising the picker + a view switch.
- **Why it matters**: Pixel-7 in Playwright runs Chromium (not WebKit). iOS-Safari engine-specific bugs (the W5-vintage `_data-driver` bug class — sub-pixel-layout reflow timing, the `100vh` family, scroll-snap quirks, font-rendering) are uncaught by `smoke-mobile`. The Mar-2026 `colorUnit2` nesting bug (`80cdd59` fix) only manifested on iOS Safari because of its smaller call-stack — the smaller engine-specific surface area is real and known-impactful.
- **Routing**: "a value.js testing-hardening tranche post-D (or the next pass after D close)".

### E suitability

**Highly suitable for E to pick up.** Reasons:

1. **Scope is well-defined**: mirror D.W5 Lane C's `smoke-mobile` shape — a 3rd Playwright project + a single sustained spec. D shipped the apparatus (`playwright.config.ts` 3-project partition), so adding a 4th project is mechanical.
2. **value.js-owned**: no cross-repo block. The work is `playwright.config.ts` + `e2e/smoke-safari/sustained.spec.ts` + CI step.
3. **Carries real-world value**: catches iOS Safari engine bugs that have empirically hit value.js before (the `colorUnit2` 294-frame stack bug).
4. **Bounded effort**: one wave, one lane, ~1-2 hours including CI verification.

**E recommendation: FOLD-INTO-E** as a single testing-hardening lane. Companion to D.W5 Lane C.

---

## §9 — Recommendations for E's wave allocation

### Summary counts

- **FOLD-INTO-E recommended**: 10 items
- **ROUTE-FORWARD (still appropriately deferred)**: 14 items (all external-blocked)
- **RETIRE (no longer applicable / never load-bearing)**: 3 items
- **REASSESS-AT-E-OPEN (re-check externally-mitigated)**: 1 item
- **CONDITIONAL on E setup choices**: 1 item (D-07 backend perf)

### Per-bucket E disposition

#### FOLD-INTO-E (10 items)

| ID | Item | Suggested E lane |
|---|---|---|
| A-11 | `ConfigSliderPane` → `./configurator` adoption | E small frontend-cohesion wave (single lane) |
| A-14..A-18 | 5 historical A-vintage doc-drift residuals | E close-residuals doc-drift sweep |
| A-19 | `gh-pages` `dist/` housekeeping | E close-residuals doc-drift sweep (combine with A-14..A-18) |
| B-01 | ~126 generated shadcn-vue typecheck cluster | E vendor-policy wave (Lane B) |
| B-02 | 4 of 11 library gaps (G3 + G4 verify + G10 selective) | E library-completeness lane |
| B-07 | Vendoring-policy decision | E vendor-policy wave (Lane A) |
| D-03 | smoke-safari WebKit project + sustained spec | E testing-hardening wave (mirror D.W5 Lane C) |
| D-05 | L13 k-means tune (optional perf) | E optional micro-perf lane (or RETIRE) |

**Wave allocation suggestion**:
- **E.W0** — open + state-at-open + coord refresh (mirror D.W0)
- **E.W1** — close-residuals + ConfigSliderPane (A-11 + A-14..A-18 + A-19); small, mechanical, 1 day
- **E.W2** — library completeness (B-02 selective); 1 day
- **E.W3** — vendor-policy wave (B-01 + B-07); 1-2 days (audit + apply)
- **E.W4** — testing-hardening (D-03 + optionally D-05); 1 day
- **E.W5** — close ceremony (mirror D.W6)

#### ROUTE-FORWARD (14 items, all external-blocked)

- **glass-ui-blocked** (10): A-01, A-02, A-03, A-04, A-05, A-06, A-07, A-09, A-10, A-13 — all route to glass-ui primitive-ship successor tranche. E re-verifies at E open whether glass-ui has shipped (orchestrator should check `git -C ../glass-ui log` at E open).
- **keyframes.js-blocked** (3): B-09, B-10, D-02 — route to keyframes.js own schedule. value.js cannot write.
- **upstream-blocked** (1): D-04 — `parse-that` `dispatch(map)` not yet shipped; route forward.

#### RETIRE (3 items)

| ID | Item | Rationale |
|---|---|---|
| B-08 | K4 keyframes.js Prettier-doc gap | 2 tranches of bandwidth-gating; no formatting-policy unification effort opened; not load-bearing |
| D-06 | BBNF grammars runtime-equivalence wiring | KISS default; no consumer; documentation artefacts only |
| D-05 | L13 k-means tune (optional) | Alternative to FOLD-INTO-E above; if not picked up, retire as never-load-bearing |

#### REASSESS-AT-E-OPEN (1 item)

| ID | Item | Action |
|---|---|---|
| D-01 | Contract-v2 §2.1 `./styles` subpath | Glass-ui shipped `./styles.css` compiled surface at `9275584`. Verify value.js can adopt the dual `./styles` (Tailwind-source) + `./styles.css` (compiled) pattern; if yes → retire the `siblingFsAllowTransient` consumer-side carve-out. **Spike at E open** (5-10 min check). |

#### CONDITIONAL (1 item)

| ID | Item | Condition |
|---|---|---|
| D-07 | api/ runtime perf measurement | If E configures local MongoDB → FOLD as a small benchmark lane. Else → re-assert structural-no-regression argument and RETIRE. |

### Strict interpretation of E's binding invariant

The user's E-opening directive — *"Delineate any chronically deferred items AND any deferred items and fold them into this new tranche"* — strictly interpreted means E should ABSORB the 10 FOLD-INTO-E items + RETIRE the 3 + REASSESS the 1 + leave only the 14 external-blocked items as ROUTE-FORWARD (with explicit rationale that the systemic blocker has not lifted).

**Total E absorption**: 14 items reach a terminal state (10 fold + 3 retire + 1 reassess-then-fold-or-retire). The 14 external-blocked items get explicit per-item ROUTE-FORWARD rationale (NOT silent deferral; D5/B5/A5 invariant honored).

---

## §10 — Authority

This ledger was assembled from the following sources (in chronological order of authoring):

### A-vintage
- `docs/tranches/A/research/Aa-runtime-keystone.md` (A-key-1..4)
- `docs/tranches/A/research/Ab-styling-resilience.md` (Ab-10 underline tabs)
- `docs/tranches/A/research/Ac-design-tokens-hierarchy.md`
- `docs/tranches/A/research/Ad-interactive-states.md` (Ad-5/16/17/18/20)
- `docs/tranches/A/research/Ae-structure-blob-aurora.md` (Ae-10/11/12/13)
- `docs/tranches/A/audit/W6-deferred.md` — the formal A.W6 re-scope with Named Successors table (lines 67-73)
- `docs/tranches/A/audit/W7-doc-drift.md` — 14 doc-drift items
- `docs/tranches/A/audit/W7-performance.md` — `cssColorToRgb` hot-spot + `gh-pages` housekeeping
- `docs/tranches/A/coordination/Q.md` — original 7 standing glass-ui §3 gaps
- `docs/tranches/A/FINAL.md` — mandate disposition table (§3) and close-honesty checklist (§5)

### B-vintage
- `docs/tranches/B/research/Ba-deferred-ledger.md` — the 51-item Bα master ledger (the predecessor pattern for this E-AUDIT-2)
- `docs/tranches/B/research/B-keyframes-parity.md` — kf-1..kf-6 maintainability inventory
- `docs/tranches/B/audit/B.W3-library-gap.md` — G1..G11 disposition + invariant-30 contract-v2 staleness + viewSchema.ts extraction
- `docs/tranches/B/audit/B.W3-typecheck.md` — the 290→126 vue-tsc backlog + generator-update routing
- `docs/tranches/B/audit/B.W4-substrate-without-consumer.md` — the 5-module substrate-WIP note
- `docs/tranches/B/audit/B.W4-performance.md` — `cssColorToRgb` still-stands + `gh-pages` still-stands
- `docs/tranches/B/audit/B.W4-doc-drift.md` — 14+9 doc-drift items
- `docs/tranches/B/coordination/Q.md` — refreshed 7 standing gaps + the re-filed `<Tabs variant="underline">` row
- `docs/tranches/B/FINAL.md` — finding disposition (§3) + the 4 routed-onward bullets (§3 closing)

### D-vintage
- `docs/tranches/D/research/Da-hitherto-deferrals.md` — the 30-item Da §3 catalogue (this document's primary input)
- `docs/tranches/D/research/Dc-aurora.md` — aurora algorithm sketch
- `docs/tranches/D/research/Dd-blob.md` — 7-addition metaballs surface sketch
- `docs/tranches/D/research/Dh-contract-v2.md` — contract-v2 spec
- `docs/tranches/D/audit/D-HARDEN-1..6.md` — 22 hardening corrections (some surfaced new defers)
- `docs/tranches/D/audit/D-LIB-OPTIMIZATION-SYNTHESIS.md` — L1..C2 library-perf items
- `docs/tranches/D/audit/D.W1-library-barrel.md` — G1..G11 disposition (SHIP/KEEP-INTERNAL/DEFER) + L14 deferred-with-reasoning
- `docs/tranches/D/audit/D.W1-contract-v2.md` — contract-v2 §2.1 keystone gap row
- `docs/tranches/D/audit/D.W1-test-coverage-lint.md` — L13 k-means defer
- `docs/tranches/D/audit/D.W6-doc-drift.md` — K4 named-destination + BBNF KISS rename
- `docs/tranches/D/audit/D.W6-performance.md` — backend-perf DEFERRED
- `docs/tranches/D/coordination/Q.md` — D close final cross-repo state table (§12)
- `docs/tranches/D/D-RELEASE-PLAN.md` — merge sequence + version-bump
- `docs/tranches/D/FINAL.md` — finding disposition (§4) + open dependencies at close (§7) + cross-tranche debt (§8) + successor destinations (§9)

### Cross-cutting
- `CHANGELOG.md` (v0.6.0 release notes)
- `docs/precepts/instructions/LESSONS-LEARNED.md` + `docs/precepts/cross-repo-dev-resolution.md`
- glass-ui repo state via `git -C /Users/mkbabb/Programming/glass-ui log --oneline ce5aad8..HEAD` + `grep -rln 'positionSource|deriveAuroraPalette|BlobDot|icon-sm|clampLabel' /Users/mkbabb/Programming/glass-ui/src` (zero hits in component code)

---

**End of E-AUDIT-2.** 38 deferred items catalogued across 4 tranches (A→B→D→E-open). 10 FOLD-INTO-E recommended; 14 ROUTE-FORWARD (all with explicit external-blocker rationale); 3 RETIRE candidates; 1 REASSESS (externally-partially-mitigated); 1 CONDITIONAL. The E-binding invariant ("fold them into this new tranche") strictly interpreted dispatches 14 items to terminal states (fold/retire/reassess-then-fold-or-retire); the remaining 14 are appropriately external-blocked and route forward with explicit rationale. Suggested wave allocation: 6 waves (E.W0 open, E.W1 close-residuals + A-11, E.W2 library completeness, E.W3 vendor-policy, E.W4 testing-hardening, E.W5 close).
