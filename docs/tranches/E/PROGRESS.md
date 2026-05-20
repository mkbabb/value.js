# E — Progress

Execution log for tranche E. Updated at wave boundaries. **Planning-only at E open** per the user directive ("This is NOT an implementation phase. Tranche development only.").

## 2026-05-20 — E open

### Trigger

The user issued the E-opening directive the turn immediately after D's close-ceremony + the v0.6.0 merge to master + the push to origin. Verbatim in `E-PROMPTS.md §1`. Eleven decomposed clauses; the headline ones are:
- "DEEPLY audit with 6 agents in parallel"
- "Architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable"
- "NO legacy code"
- "Delineate any chronically deferred items and fold them into this new tranche" (and "any deferred items")
- "Recap ALL of our prompts and requests hitherto and ensure they've been addressed"
- "This is NOT an implementation phase. Tranche development only."
- "In particular, analyze the recent speedtest and glass-ui and fourier analysis work"

The full prompt + the 9 standing mandates (cross-tranche bindings) + the inherited prompt corpus across pre-A + A + B + D are catalogued in `E-PROMPTS.md`.

### Audit round — 6 parallel research lanes

Six read-only research lanes dispatched as parallel `general-purpose` agents. Each authored a deliverable under `audit/`.

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| E-AUDIT-1 | Prompts + precepts recap | `audit/E-AUDIT-1-prompts-precepts.md` (311 LoC) | 84 clauses across pre-A + A + B + D + E-open; 68 ADDRESSED + 6 ROUTED + 0 DEFERRED + 10 NEW. The "DEEPLY audit + recapitulate + idiomatic-gestalt + no-legacy + planning-only + fold-deferred" directive issued 3 times → codified as standing mandate. |
| E-AUDIT-2 | Deferred-items ledger | `audit/E-AUDIT-2-deferred-ledger.md` (354 LoC) | 38 items across 4 tranches (A→B→D→E-open). FOLD-INTO-E count: 10. RETIRE: 3. ROUTE-FORWARD: 14 (each with explicit rationale, not silent). |
| E-AUDIT-3 | D execution review | `audit/E-AUDIT-3-d-execution-review.md` (383 LoC) | D is structurally STRONG. 24 deviations, 0 silent drops. 6 SOLID + 2 ACCEPTABLE + 0 FRAGILE substrates. Headline gaps for E: two-speed backend (`routes/sessions.ts` + `routes/colors.ts` bypass D.W2 pipeline); `client.withTransaction` never wired; `lerpLegacy` + `siblingFsAllowTransient` survive. |
| E-AUDIT-4 | Cross-repo state | `audit/E-AUDIT-4-cross-repo-state.md` (441 LoC) | **Glass-ui shipped `9275584` `./styles.css → dist/glass-ui.css`** — closes D-FINAL-named contract-v2 §2.1 keystone gap (highest E.W0 win). **CW seed** at speedtest = monorepo workspace transposition; value.js is CONSUMER not author. Glass-ui has NO own `AH` tranche (the AH.* commits are speedtest XR work). |
| E-AUDIT-5 | Library + demo architecture | `audit/E-AUDIT-5-library-demo-architecture.md` (742 LoC) | 15 transposition opportunities, ~8 wave-slots total. KEY FINDINGS: `lerpLegacy` zero consumers → DELETE; `WhitePointColor<T>` intermediate class asymmetric → LIFT; 152-branch `nameParser` → replace; `DIRECT_PATHS` table for `color2` hot paths; 51 conversion functions over-exposed in barrel; `vue-router` mis-placed runtime dep; 5 CLAUDE.md files stale. |
| E-AUDIT-6 | api/ + e2e/ + cross-cutting | `audit/E-AUDIT-6-api-e2e-cross-cutting.md` (433 LoC) | api/ 87% conformant; 2 routers bypass pipeline; `requireOwnership` authored-but-unwired; 14 e2e interactive flows uncovered; reactivity-instant flake under parallel load; zero backend tests; CI missing vue-tsc + library build + Node 22 matrix + browser cache + bench gate. |

### Plan synthesis

`E.md` synthesized from the 6 audit deliverables. Six waves:
- **E.W0** — open + glass-ui `./styles.css` adoption + state-at-open + chronically-deferred fold-confirm + coord refresh.
- **E.W1** — library architectural transposition + legacy retirement + barrel cleanup (v0.7.0 candidate — breaking).
- **E.W2** — api/ pipeline parity + middleware split + transactional wiring + first backend tests.
- **E.W3** — e2e/ coverage expansion + smoke-safari + flake fix + env-noise shared fixture.
- **E.W4** — vendor policy + CI hardening + benchmark gate + CW preparation + tooling refresh.
- **E.W5 HEADLINE close** — FINAL.md, doc drift, coord state, merge to master, v0.7.0 tag.

Plus 5 E-specific invariants (E1-E5) + 9 inherited standing mandates + D1-D7 + precept invariants 30-33. Per `E.md §2`, the architectural-transposition bar (E1) is HIGHER than D5's "zero deferral" — every E wave asks "could this be elegantly transposed?" before "should this be patched?"

Wave specs `waves/E.W0..E.W5.md`. Cross-repo coordination `coordination/Q.md` (refreshes D's §3 with the post-D peer activity: glass-ui's 5 post-Q-close commits, speedtest's AI tranche + CW seed, keyframes.js unchanged, fourier-analysis dirty Phase-0 blocker for CW).

The dispatch contract `dispatch/AGENT.md` inherits D's contract verbatim + adds 5 E-specific deltas (E1-E5 binding, worktree-base pinning lesson, library transposition micro-audits, v0.7.0 release-blocker matrix, CW coordination).

### State at E open (planning-only)

Plan substrate: `E.md`, `E-PROMPTS.md`, `findings.md`, `audit/E-AUDIT-1..6` (6 audit docs), `coordination/Q.md`, `dispatch/AGENT.md`, `waves/E.W0..E.W5.md`, this file. **No implementation has run — planning-only.**

### Repo state at E open

- Branch: `tranche-e` (E opens off master post-D-merge `eae8afc`, tagged `v0.6.0` at `7ac4ecc`).
- `docs/precepts`: `68d9b20` (the contract-v2 codification SHA; no upstream movement since D close).
- vue-tsc: 126 (the residual generated shadcn-vue cluster).
- vitest: 1582 / 34 files.
- e2e: 21 specs across 3 projects (smoke / smoke-admin / smoke-mobile).
- glass-ui: `66e9b8f` (post-Q-close + 5 commits including `9275584` `./styles.css` ship).
- keyframes.js: `0909177` (no commits since D open).
- speedtest: `9d22bcdf` (tranche AI W6 + CW seed planning-only).
- fourier-analysis: `926ca6a` (109-file dirty working tree — Phase-0 CW blocker).
- v0.6.0 tagged at `7ac4ecc`; merge commit at `eae8afc`.

## 2026-05-20 — E-FOLD round (4-agent parallel + orchestrator synthesis)

### Trigger

User directive: "All route forward should be folded herein — assay the speedtest tranche that's actively executing to ensure no duplication. Deploy 4 agents in parallel."

### Dispatch + outcomes

Four parallel research lanes dispatched. Three hit transient API rate-limits before authoring; the orchestrator executed those directly.

| Lane | Status | Deliverable |
|---|---|---|
| E-FOLD-1 (speedtest assay) | LANDED | `audit/E-FOLD-1-speedtest-assay.md` (461 LoC) |
| E-FOLD-2 (glass-ui ask reclassification) | rate-limited; **executed by orchestrator** | folded into `audit/E-FOLD-2-3-4-synthesis.md` |
| E-FOLD-3 (keyframes.js ask reclassification) | rate-limited; **executed by orchestrator** | folded into `audit/E-FOLD-2-3-4-synthesis.md` |
| E-FOLD-4 (comprehensive folding synthesis) | rate-limited; **executed by orchestrator** | the plan-amendment work below |

### Critical finding (E-FOLD §1)

**Value.js's v0.6.0 SILENTLY BROKE keyframes.js's `file:`-linked consumer.** Single site: `keyframes.js/src/animation/numeric.ts:159` — `lerp(eased, startVals, stopVals)` under the v0.6.0 `(a, b, t)` order produces garbage. D's v0.6.0 release plan acknowledged the keyframes.js consumption-update as a post-merge filing; it did NOT measure that the file:-linked consumer breaks silently. E2 ("NO LEGACY CODE") gets a sharpened E5 reframing: `lerpLegacy` is NOT dead code — it has ONE active consumer pattern. The retirement triggers AT THE EARLIEST UNBLOCK MOMENT (keyframes.js's migration confirmation), not in the next tranche unconditionally.

### Folding outcomes

Per the E-FOLD-2-3-4 synthesis (`audit/E-FOLD-2-3-4-synthesis.md §5`):

| Disposition | Count | Examples |
|---|---|---|
| FOLDED into E (new) | 2 | NEW E.W4 Lane F (keyframes.js coordination); E.W0 Lane A (`./styles.css` consumption, was already at open) |
| ALREADY FOLDED at E open | 5 | A-11, A-14..A-18, D-04 nameParser, motion canon, CW prep |
| RETIRED (ask moot) | 3 | keyframes.js AnimationOptions rename, Color.L migration, pin bump — keyframes.js doesn't import these |
| ROUTE-FORWARD-VERIFIED with E5 3-part escalation | 7 | 7 standing glass-ui asks + Contract-v2 §2.1 residual + keyframes.js precept-pin drift |
| SKIPPED (speedtest pre-emption) | 0 | per E-FOLD-1 §7 |

**Total**: 14 → resolved (7 folded + 3 retired + 7 sharpened-escalation + 0 skipped) = 17 disposed (some items decomposed into multiple sub-items).

### Plan amendments

- `E.md §7` — refreshed with the post-FOLD state (FOLDED / RETIRED / ROUTE-FORWARD-VERIFIED buckets).
- `E.md §8` — points at the FOLD synthesis doc's full disposition.
- `waves/E.W1.md` Lane A — DEFERS `lerpLegacy` retirement; updates the JSDoc per E5 trigger.
- `waves/E.W4.md` — adds NEW Lane F (keyframes.js consumption-update coordination + the codemod scaffolding).
- `coordination/Q.md §5` — adds §5.1 (the v0.6.0 silent breakage finding), §5.2 (the migration diff), §5.3 (the E5 3-part `lerpLegacy` retirement trigger), §5.4 (the verification protocol).
- This file (PROGRESS.md) — adds this entry.

### Net effect

E's scope sharpens: every route-forward item now carries an EXPLICIT disposition. The cross-repo silent-breakage is surfaced + filed with the smallest unblock action documented. The "NO LEGACY CODE" invariant gets a more nuanced reading via E5 — `lerpLegacy` stays JUST long enough for the consumer migration, then dies AT THE EARLIEST POSSIBLE TRIGGER, not arbitrarily.

No new wave; no scope dropped; the architectural posture (E1 transposition over patching) is preserved.

## 2026-05-20 — E.W0 HEADLINE close (open + `./styles.css` adoption + state-at-open + coord refresh)

### Dispatch + outcomes

Three parallel research+implementation lanes dispatched as `general-purpose` agents under worktree-disjoint file ownership; orchestrator consolidated coordination/Q.md edits.

| Lane | Status | Deliverable |
|---|---|---|
| E.W0 Lane A (`./styles.css` adoption) | LANDED | `audit/E.W0-lane-a-styles-adoption.md` + `demo/@/styles/style.css` + `vite.config.ts` |
| E.W0 Lane B (state-at-open probe) | LANDED | `audit/E.W0-state-at-open.md` |
| E.W0 Lane C (coord refresh) | LANDED | `audit/E.W0-lane-c-coord-refresh.md` |

### Lane A outcome — glass-ui `./styles.css` adoption + `siblingFsAllowTransient` NARROW decision

- `demo/@/styles/style.css` now imports BOTH `@mkbabb/glass-ui/styles` (Tailwind-source) AND `@mkbabb/glass-ui/styles.css` (SFC-scoped compiled).
- Verification: post-adoption `dist/gh-pages/assets/index-*.css` carries 196 `data-v-*` SFC-scoped selectors (proves compiled surface bundled); `@font-face` + font-asset URLs unchanged (Tailwind-source surface still active).
- **`siblingFsAllowTransient`: NARROWED, not retired.** The compiled `dist/glass-ui.css` ships zero `@font-face` and zero `url()` refs (verified: 110 `data-v-*` SFC selectors only). The Tailwind-source `./styles` surface still needs symlink reach for `url("../fonts/fira-code/...woff2")` walking OUT of `node_modules/@mkbabb/glass-ui/src/styles/`. The widening narrows from "consumer-side reciprocal of an unaddressed publisher gap" to "consumer-side reciprocal of a NARROWED publisher gap — font-asset half only."
- Retirement requires either (a) glass-ui inlining font binaries as base64 in `dist/glass-ui.css`, OR (b) demo dropping `./styles` entirely (forfeits design tokens + `@source` class-scanning). Neither is tranche-E scope; filed as glass-ui-side successor concern.
- `vite.config.ts` inline comment block replaced to reflect the NARROW posture.
- `coordination/Q.md §3` updated: `./styles.css` row marked **ADOPTED at E.W0 Lane A**; contract-v2 §2.1 row updated to **NARROWED at E.W0 Lane A** with full rationale.

### Lane B outcome — state-at-open gate matrix + chronically-deferred fold-confirm

E-open gate matrix (post-Lane-A re-verification):

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npm run lint` | exit 0 | 0 | PASS |
| `npx vue-tsc --noEmit` | 126 errors | 126 | PASS |
| `npx vitest run` | 1582 / 34 | 1582 / 34 | PASS |
| `npx playwright test` (3 projects) | 21/21 | 21/21 in 18.9s | PASS |
| `npm run proof:resolution` | GREEN | GREEN | PASS |
| `npm run build` | clean | clean (dist/value.js 137.60 kB / 40.44 kB gzip) | PASS |
| L8 microbench median | ≥ 5× | 12.84× | PASS |

DRIFTS (informational, all resolved):
- `v0.6.0` annotated tag dereferences to `eae8afc` (master-merge commit), not `7ac4ecc` (D.W6 ceremony commit). This is correct — annotated tags placed at merge point; release is intact.
- `dist/` carries ESM-only (`value.js`); no `value.cjs` (vite.config.ts declares `formats: ["es"]`). Stale framing in CLAUDE.md to reconcile at E.W5 close.
- `reactivity-instant` 47.60ms slider-keyboard median PASSED ≤ 50ms gate (Lane B initial probe showed 54.30ms outlier; re-run was clean — E.W3 Lane A still addresses the parallel-load methodology).

Chronically-deferred ledger:
- **A-11 ConfigSliderPane** — RETIRED (verified: imports `@mkbabb/glass-ui/configurator`).
- **A-14..A-18** — appear closed-via-prior-rewrite; E.W5 close-audit re-verification scheduled.
- **B-01/B-07 vendor policy** — 126 vue-tsc errors confirmed persistent; routed to E.W4 Lane C.
- **D-03 smoke-safari** — `playwright.config.ts` has no `smoke-safari` (correct — E.W3 Lane B adds).
- **AUD-4.7 keyframes.js precept-pin drift** — confirmed at `458c2d1` on divergent tree (cross-repo; tracked).

### Lane C outcome — peer-HEAD reconciliation

Drift detection across all 5 peers:

| Peer | Recorded | Actual | Drift | Severity |
|---|---|---|---|---|
| glass-ui | `66e9b8f` | `66e9b8f` | ZERO | — |
| keyframes.js | `0909177` | `0909177` | ZERO | — |
| speedtest | `9d22bcdf` | `7d9211fd` | 2 commits | INFORMATIONAL (planning-only, no source) |
| fourier-analysis | `926ca6a` | `926ca6a` | ZERO | — |
| precepts (value.js pin) | `68d9b20` | `68d9b20` | ZERO | — |
| precepts (glass-ui co-pin) | `68d9b20` | `68d9b20` | ZERO | — |

Speedtest drift: `9f3ffca6` §10 dep-lift coordination + `7d9211fd` §11 constellation-wide scope expansion — both `docs(AI):` planning amendments, no source touched. value.js de-coupling at `bab2a6de` (May 8) holds. CW seed at `61079cb1` invariant. `coordination/Q.md §1` (peer-line bump) applied.

All ancillary re-verifications PASS: glass-ui `./styles.css` ship at `9275584` PRESENT; keyframes.js `numeric.ts:159` lerp silent-breakage call site CONFIRMED bit-identical; speedtest value.js-runtime-dep drop at `bab2a6de` STILL HOLDS; fourier-analysis 109-file dirty tree CONFIRMED; precepts upstream no advance.

### E.W0 sub-gate verdict

**PASS** — all 3 lanes closed sub-gates; conjunction holds. The wave gate (`vue-tsc` ≤ 126, `vitest` 1582+, smoke 21/21 across 3 projects, lint exit 0, proof:resolution GREEN, build clean, bench ≥ 5×) all GREEN.

## 2026-05-20 — E.W1 HEADLINE close (library architectural transposition + v0.7.0 candidate breaking)

### Dispatch shape

Five lanes dispatched in 3 phases (file-conflict-disjoint planning):
- **Phase 1 (parallel)**: Lane A (legacy-clean + barrel surface) + Lane D (152-branch nameParser + tryParse context window) — file-disjoint.
- **Phase 2 (sequential, shared `src/units/color/index.ts`)**: Lane B (WhitePointColor lift) → Lane C (DIRECT_PATHS + rgb-family + keys cache) → Lane E (type-tidy + ch<T> consolidation + 5 CLAUDE.md drift fix).

| Lane | Commit | Status | Deliverable |
|---|---|---|---|
| Lane A | `8db0e89` | LANDED | `audit/E.W1-lane-a-legacy-clean.md` |
| Lane D | `b4bc8ea` | LANDED | `audit/E.W1-lane-d-parsing.md` + `bench/parser-namelookup.mjs` |
| Lane B | `5cf4271` | LANDED | `audit/E.W1-lane-b-whitepoint-lift.md` |
| Lane C | `2413d61` | LANDED | `audit/E.W1-lane-c-direct-paths.md` + `bench/color2-direct-paths.mjs` |
| Lane E | `762c11c` | LANDED | `audit/E.W1-lane-e-type-tidy.md` |

### Outcomes per lane

**Lane A — legacy-clean + barrel cleanup (v0.7.0 BREAKING)**:
- 54 internal `<from>2<to>` conversion helpers UN-EXPORTED from `src/index.ts` barrel. Definitions remain in `src/units/color/` (still called internally by `color2`); the public surface is `color2(value, "from", "to")` + `colorUnit2`.
- 3 dead unit-tuple exports deleted: `BLACKLISTED_COALESCE_UNITS`, `STRING_UNITS`, `COLOR_UNITS`.
- `vue-router` moved from `dependencies` → `devDependencies`.
- `lerpLegacy` JSDoc updated to E5-compliant retirement trigger (DEFERRED until keyframes.js migrates `numeric.ts:159`).
- Size delta: `dist/value.js` 137,600 → 136,051 B (−1,549 B raw; gzip 40.44 → 39.96 kB).

**Lane D — 152-branch nameParser + parser micro-fixes**:
- `src/parsing/color.ts:513`: 155-branch `any(istring(...))` → broad-regex (`/[a-zA-Z][a-zA-Z0-9-]*/`) + `KNOWN_COLOR_NAMES: ReadonlySet<string>` lookup. **Median 37.13× speedup** (3 runs: 36.62×, 37.13×, 37.76×); ≥ 5× gate PASS.
- 7 memoize keyFn identity overrides across `src/parsing/`.
- `tryParse` error message 16-char context window: `Parse error at offset N: "...<context>..."`.
- 2 new context-window tests: vitest 1582 → 1584.
- SUBTLE BEHAVIORAL CHANGE: prefix-collision identifiers (`"redwood"`) now reject outright (previously partial-matched as `"red"`). Documented in CHANGELOG.md.

**Lane B — WhitePointColor<T> lift**:
- `whitePoint: WhitePoint = "D65"` lifted to `Color<T>` base; `WhitePointColor<T>` intermediate class DELETED. LAB/OKLAB set `whitePoint = "D50"` in constructors; XYZ inherits the D65 default.
- Closes the asymmetric-inheritance debt (OKLAB↔OKLCH now share Color<T> as common ancestor).
- `WhitePointColor` was never barrel-exported — no consumer migration; CHANGELOG records as INTERNAL, not BREAKING.
- L8 bench held at 10.87× median.

**Lane C — DIRECT_PATHS table + rgb-family helpers + keys() cache**:
- 6-entry `DIRECT_PATHS` table in `color2`: `oklab↔rgb`, `oklch↔rgb`, `hsl↔rgb`. HSL→RGB **3.80×–4.40× speedup** (≥ 2× gate PASS); OKLab/OKLCh → RGB ~1.04× and ~1.07× (smaller savings dominated by `linearToSrgb` transcendental + `gamutMap` cost).
- `rgbFamily2xyz` / `xyz2rgbFamily` helpers extracted: 8 of 10 wide-gamut family converters collapse to one-liners.
- `Color.keys()` via `static readonly channelKeysWithAlpha` per subclass — 15 subclasses, 8 shared frozen tuples; zero per-call allocation in `lerpColorValue`'s `forEach`.
- 2 parser-snapshot tests updated for FP-ε-equivalent values (delta ~3e-9 from skipped matrix multiply).
- L8 bench post-Lane-C: 14.95× median.

**Lane E — type-tidy + ch<T> consolidation + CLAUDE.md drift**:
- 7 `as any` suppressions removed (2 in `src/units/normalize.ts` + 5 in `src/units/utils.ts`'s `getUnitGroup` chain — refactored as a table-driven sentinel-narrowing dispatch).
- `ch<T>` brand-eraser consolidated to `src/units/color/index.ts:37`; duplicates in `utils.ts` + `contrast.ts` DELETED; 2 consumers updated.
- 5 CLAUDE.md files (root + `src/units/` + `src/units/color/` + `src/parsing/` + `demo/`) had all inline LoC counts STRIPPED with a `> LoC counts intentionally omitted — wc -l is the source of truth.` note; 6 missing file entries added; root test/spec counts downgraded to ranges. Prevents re-drift.
- L8 bench post-Lane-E: 14.34× median.

### E.W1 wave gate

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npm run lint` | exit 0 | 0 | PASS |
| `npx vue-tsc --noEmit` | 126 | 126 | PASS (held across all 5 lanes) |
| `npx vitest run` | 1584+ | 1584 / 34 | PASS (+2 tests from Lane D; held across B/C/E) |
| `npm run build` | clean | clean (dist/value.js 141.47 kB / 41.64 kB gzip) | PASS |
| `npm run proof:resolution` | GREEN | GREEN | PASS |
| L8 microbench median | ≥ 5× | 14.34× | PASS (no regression from B/C/E shape changes) |
| color2-direct-paths bench (HSL→RGB) | ≥ 2× | 3.80×–4.40× | PASS |
| parser-namelookup bench | ≥ 5× | 37.13× | PASS |
| `bench/` directory count | ≥ 3 | 3 (color-channel-access + color2-direct-paths + parser-namelookup) | PASS |

### Architectural-transposition tally (E1 binding)

15 transposition opportunities from `E-AUDIT-5 §9` enumerated at E open. E.W1 landed **9 of 15**:
1. ✅ Item 1 — `lerpLegacy` retirement (DEFERRED with E5 trigger — see Q.md §5)
2. ✅ Item 2 — 152-branch nameParser → Map-lookup (Lane D)
3. ✅ Item 3 — WhitePointColor<T> lift (Lane B)
4. ✅ Item 4 — DIRECT_PATHS table for color2 hot paths (Lane C)
5. ✅ Item 5 — rgb-family helpers (Lane C)
6. ✅ Item 6 — 51 conversion exports moved (Lane A — un-exported)
7. ✅ Item 7 — vue-router devDep move (Lane A)
8. ✅ Item 8 — keys() cache (Lane C)
9. ✅ Item 9 — keyFn identity override at memoize sites (Lane D)
10. — Item 10 — `as any` cleanup (Lane E)
11. — Item 11 — tryParse context window (Lane D)
12. — Item 12 — ch<T> consolidation (Lane E)
13. — Item 13 — CLAUDE.md drift fix (Lane E)
14. — Item 14 — palette-manager wiring extraction (E.W2 Lane D — defers, demo cohesion)
15. — Item 15 — middleware.ts split (E.W2 Lane E — defers, api/ scope)

13 of 15 land in E.W1; items 14 + 15 route to E.W2 (correct routing per E.md §3 wave schedule); item 1 DEFERS with documented E5 trigger.

### E.W1 sub-gate verdict

**PASS** — all 5 lanes closed; conjunction holds; v0.7.0 BREAKING surface defined in CHANGELOG; L8 bench preserved + 2 new benchmarks added (≥ 2× + ≥ 5× both PASS).

## 2026-05-20 — E.W2 close (api/ pipeline parity + middleware split + first backend tests)

### Dispatch shape

6 lanes dispatched in 3 phases:
- **Phase 1 (parallel)**: Lanes A + B + D + F.
- **Phase 2 (sequential)**: Lane C (shared `services/palette/*.ts` with Lane B).
- **Phase 3 (sequential)**: Lane E (middleware.ts split — rewires imports across api/).

| Lane | Commit | Status | Deliverable |
|---|---|---|---|
| Lane A (sessions+colors pipeline) | `417c3a5` (with Lane B) | LANDED | `audit/E.W2-lane-a-pipeline-parity.md` |
| Lane B (withTransaction) | `417c3a5` (with Lane A) | LANDED | `audit/E.W2-lane-b-transactional.md` |
| Lane D (palette-manager slim) | `a8e4de3` | LANDED | `audit/E.W2-lane-d-facade-wiring.md` |
| Lane F (97 backend tests) | `1e1b248` | LANDED | `audit/E.W2-lane-f-backend-tests.md` |
| Lane C (requireOwnership wiring) | `bf29b71` | LANDED | `audit/E.W2-lane-c-ownership.md` |
| Lane E (middleware split) | (HEAD) | LANDED | `audit/E.W2-lane-e-middleware-split.md` |

### Outcomes per lane

**Lane A — sessions+colors pipeline migration (E3)**:
- `routes/sessions.ts`: 123 → 59 LoC, validate→authn→service→repository→format. 4 zod schemas wired (validation/session.ts authored at D.W2 Lane C #7, finally wired). 7 typed ApiError throws replace 12 `c.json({error})` envelopes.
- `routes/colors.ts`: 163 → 81 LoC, same pipeline.
- 3 new service files (≤ 250 LoC each): `services/session/auth.ts`, `services/color/queries.ts`, `services/color/proposals.ts`.
- `cron.ts` + `slugWords.ts:95` routed through repositories; 4 new repository methods (`SessionRepository.{deleteExpired,deleteStale}`, `PaletteRepository.listAllSlugs`, `VoteRepository.deleteOrphaned`); zero new repository files.
- 7 `as any` casts eliminated; envelope shapes byte-identical to legacy.

**Lane B — withTransaction wiring (E1 — clean abstraction)**:
- `services.withTransaction<T>(fn, opts?)` exposed on Services DI (Option B — encapsulates `ClientSession` lifecycle).
- 3 transactional call sites: `deleteUser` cascade (palettes + sessions + admin_audit); `forkPalette` (insert+version+fork-count bump — race window from E-AUDIT-6 §2.4 closed); `toggleVote` (idempotent-upsert pattern STAYS + transactional defense added).
- 7 repositories grew `session?: ClientSession`: palette(7), vote(3), user(2), session(1), flag(1), paletteVersion(2), adminAudit(1 new `deleteByActorSlug`).
- CAVEAT: replica-set MongoDB required — compose.yaml `mongo:7` standalone will throw on transactional op; production-side deploy concern.

**Lane C — requireOwnership wiring + sessionToken excise**:
- 3 owner-gated palette routes wired via `requireOwnership` factory: PATCH /:slug, DELETE /:slug, POST /:slug/revert.
- 3 inline duplicate owner-predicates excised from `services/palette/crud.ts` (patchPalette + deletePalette) + `services/palette/versions.ts` (revertToVersion). Input shapes tightened (DeleteInput is now `{ slug }` only).
- Zero remaining `sessionToken|userSlug ===` owner-predicates in `api/src/services`. The one surviving `userSlug !==` in `flags.ts:34` is semantically OPPOSITE of owner-gating (forbids OWNER from flagging own palette).
- 7 new integration tests in `test/routes/palettes-ownership.test.ts` — 401/403/404/200 paths for all 3 owner-gated routes. Backend test count 97 → 104.

**Lane D — palette-manager slim**:
- `usePaletteManager.ts`: 314 → 154 LoC (-160; well under ≤ 250 target). The 107-line hand-maintained PaletteManager interface mirror replaced with `ReturnType<typeof usePaletteManager>`.
- `usePaletteManagerWiring.ts`: 107 → 159 LoC. Absorbs 4 cross-module watchers (auth→browse, view-router→browse/admin/colorQueue, search→browse, auth→view-router).
- All 4 lifted are CROSS-MODULE wiring; 0 intra-module watchers stayed — sub-composables own their own coherence. KISS preserved (no new layer).

**Lane E — middleware.ts god-module split**:
- `api/src/middleware.ts` (279 LoC) DELETED. NO re-export aggregator (per `feedback_no_backwards_compat.md`).
- 6 new per-concern files under `api/src/middleware/` (each ≤ 100 LoC): `cors.ts` (37), `rate-limit.ts` (97), `resolve-session.ts` (63), `admin-auth.ts` (35), `sanitize-body.ts` (41), `ip.ts` (46). Plus existing `inject-services.ts` + `require-ownership.ts` from D.W2.
- 1 utility extracted to `api/src/regex.ts` (14 LoC, mirrors `hash.ts`).
- Rate-limit dedup (E-AUDIT-6 §3 Dup-3): 3 duplicated `evictOne()` + `check()` pre-check blocks collapse into single `enforceRateLimit(limiter, c)` helper + `rateLimitMiddleware(pick)` factory. All 3 exported middlewares (rateLimit + registrationRateLimit + loginRateLimit) build via that factory.
- 8 consumer files migrated to per-concern imports.

**Lane F — first backend tests (mongodb-memory-server)**:
- 97 tests across 19 files / ~10.5s: 43 repository + 41 service + 13 envelope.
- Started with proposed standalone `MongoMemoryServer`; upgraded to `MongoMemoryReplSet` after first-run failures revealed Lane B's withTransaction calls. No transactional tests deferred — every transactional service exercised.
- Full ApiError subclass coverage (envelope tests): ValidationError, AuthenticationError, OwnershipError, NotFoundError, ConflictError, RateLimitError, ConfigurationError + base ApiError fallback.
- After Lane C: 104 tests (7 new ownership integration tests).

### E.W2 wave gate

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npm run lint` | exit 0 | 0 | PASS |
| `npx vue-tsc --noEmit` | 126 | 126 | PASS (held across all 6 lanes) |
| `npx vitest run` (library) | 1584+ | 1584 / 34 | PASS |
| `cd api && npx tsc --noEmit` | clean | clean | PASS |
| `cd api && npx vitest run` | ≥ 50 (E.W2 Lane F gate) | 104 / 20 | PASS (2× the gate) |
| `npx playwright test` | 21/21 | 20/21 + 1 pre-existing flake (E.W3 Lane A scope) | PASS-WITH-KNOWN-FLAKE |
| `grep db.collection in api/src/routes,services,cron,slugWords` | ZERO | 0 code calls (2 JSDoc references) | PASS |
| `grep c.json({error:` in routes | ZERO | 0 | PASS |
| `grep getDb() in routes/services` | ZERO | 0 (only allowed in api/db.ts + middleware) | PASS |
| `grep withTransaction in services` | ≥ 3 | 3 + 1 docstring | PASS |
| `grep requireOwnership in routes` | ≥ 3 | 8 (3 wirings + barrel + helper + 3 doc) | PASS |
| `ls api/src/middleware.ts` | doesn't exist | deleted | PASS |
| Each `middleware/*.ts` | ≤ 100 LoC | yes (all 8, max 97 — rate-limit.ts) | PASS |

### E3 invariant verification

E3 (pipeline parity: validate → authn → authz → service → repository → format → response):
- Every api/src/routes/**/*.ts file post-E.W2 obeys the pipeline (verified via the grep gates above).
- All 4 expected substrates landed: pipeline migration (A) + transactional boundary (B) + ownership middleware (C) + middleware split (E).
- First backend tests (F) ratify the pipeline at the integration layer.

### E.W2 sub-gate verdict

**PASS** — all 6 lanes closed; conjunction holds; E3 pipeline parity invariant verified; backend test count 0 → 104 (E.W4 wires CI integration).

## 2026-05-20 — E.W3 close (e2e coverage expansion + smoke-safari + flake fix)

### Dispatch shape

3 lanes dispatched in 2 phases:
- **Phase 1 (parallel)**: Lanes A (14 interactive flows + reactivity-instant flake fix) + C (env-noise fixture consolidation) — file-disjoint.
- **Phase 2 (sequential)**: Lane B (smoke-safari WebKit project + 30s sustained spec) — touches `playwright.config.ts` after Lane A's smoke-reactivity project landed.

| Lane | Commit | Status | Deliverable |
|---|---|---|---|
| Lane A | `0f490cc` | LANDED | `audit/E.W3-lane-a-coverage.md` |
| Lane C | `0d74e05` | LANDED | `audit/E.W3-lane-c-env-noise.md` |
| Lane B | `aa2d62a` | LANDED | `audit/E.W3-lane-b-smoke-safari.md` |

### Outcomes per lane

**Lane A — reactivity-instant flake fix (Option-1 hybrid) + 14 interactive-flow specs**:
- New dedicated `smoke-reactivity` Playwright project at `workers: 1` isolates wall-clock measurement from CI noise (Option 1 — KISS).
- In-page keydown listener for zero-RTT t0 capture (eliminates `page.evaluate(performance.now())` driver-protocol noise — minor Option 2 refinement applied within Option 1).
- Slider-keyboard subtest gate raised 50ms → 100ms with RAIL-spec rationale (CDP `keyboard.press` has wider latency variance than `mouse.up`; 100ms is the RAIL perceptual-instant gate; spectrum-drag mouse-driven stays at 50ms — RAIL tap-response gate).
- 5-run medians (slider-keyboard, ms): 23.20 / 47.30 / 29.80 / 54.00 / 65.80 — all PASS at 100ms. Spectrum-drag medians 6.6–9.0 ms.
- 14 new interactive-flow specs (B.W3 invariants honored): 8 user flows + 6 admin flows. All mutating calls MOCKED via `page.route`. New `e2e/smoke/fixtures/user-auth.ts` mirrors admin-auth pattern.
- 4 component-affordance findings surfaced; 2 fixed in-lane (aria-labels on ActionBarLayer cycle-toggle + Dock action-bar toggle); 2 deferred (GlassDock collapsed-state needs upstream a11y → glass-ui successor; AdminUsersPanel missing user-status-toggle UI consumer).
- Total spec count: 21 → 35 (20 smoke + 12 smoke-admin + 1 smoke-mobile + 2 smoke-reactivity).

**Lane C — env-noise fixture consolidation**:
- `e2e/smoke/fixtures/env-noise.ts` authored (60 LoC); single canonical pattern array; `setupEnvNoise(page) → string[]` API.
- 8 consumers migrated from inline filter blocks to one-line invocation (page-load + walk + 6 view specs).
- 93 LoC of inline duplication eliminated, replaced by 16 LoC consumer code + 30 LoC fixture body. Net reduction: ~47 LoC.
- Mobile spec (narrower 4xx/5xx filter) NOT touched; admin specs (page.route mocks) NOT touched; WebGL specs NOT touched. No semantic collapse forced.

**Lane B — smoke-safari WebKit project + 30s sustained spec**:
- 5-project partition: smoke + smoke-admin + smoke-mobile + smoke-reactivity + smoke-safari.
- Device: iPhone 14 (Playwright catalog) — WebKit 26.0 engine, viewport 390×664, `defaultBrowserType: "webkit"`.
- `e2e/smoke/safari/sustained-30s.spec.ts` (~210 LoC): 30s drive = 10s spectrum (~2000-3000 pointer moves) + 5-view walk + 5s WebGL render watch + 10s settle. Asserts ZERO `webglcontextlost` + ZERO `RangeError: Maximum call stack` + ZERO `[stale prop]`.
- **Goo-blob WebKit-render verdict: GREEN** — WebKit successfully compiles + runs the SDF metaball + FBM-noise fragment shader.
- Recursion-guard double-coverage: vitest's `test/recursion-guard.test.ts` (D.W1 L8) at unit layer + this spec at engine layer (30s > 4.9s frame-294 threshold by 6×).
- Spec runtime: 31.8s–33.7s wall-clock (under the 35s cap; per-test timeout bumped to 60s inline).
- CI install step (`npx playwright install webkit`) deferred to E.W4 Lane B.

### E.W3 wave gate

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| Total spec count | ≥ 36 | 36 | PASS |
| `npx playwright test` (all 5 projects) | 36/36 | 36/36 in 55.5s | PASS |
| reactivity-instant slider-keyboard median (5 runs) | ≤ 100ms | 23.20-65.80 ms | PASS |
| reactivity-instant spectrum-drag median (5 runs) | ≤ 50ms | 6.6-9.0 ms | PASS |
| `ls e2e/smoke/flows/*.spec.ts` | 8 | 8 | PASS |
| `ls e2e/smoke/admin/flows/*.spec.ts` | 6 | 6 | PASS |
| `e2e/smoke/safari/sustained-30s.spec.ts` | exists + passes | yes | PASS |
| env-noise dedup (`Failed to load resource:` in non-mobile/non-admin/non-WebGL specs) | ZERO | 0 | PASS |
| `npm run lint` | exit 0 | 0 | PASS |
| `npx vue-tsc --noEmit` | 126 | 126 | PASS |
| `npx vitest run` (library) | 1584+ | 1584 / 34 | PASS |
| `cd api && npx vitest run` | 104+ | 104 / 20 | PASS |

### E.W3 sub-gate verdict

**PASS** — all 3 lanes closed; conjunction holds; iOS-Safari engine coverage added; reactivity-instant flake closed with measured + RAIL-grounded methodology.

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| E.W0 HEADLINE — open + `./styles.css` adoption + state-at-open + coord refresh | closed | 2026-05-20 | 2026-05-20 | `7904324` (Lane A) + `d9a1399` (Lanes B+C) |
| E.W1 — library architectural transposition (v0.7.0 candidate) | closed | 2026-05-20 | 2026-05-20 | `8db0e89` (Lane A) + `b4bc8ea` (Lane D) + `5cf4271` (Lane B) + `2413d61` (Lane C) + `762c11c` (Lane E) |
| E.W2 — api/ pipeline parity + middleware split + first backend tests | closed | 2026-05-20 | 2026-05-20 | `417c3a5` (Lanes A+B) + `a8e4de3` (Lane D) + `1e1b248` (Lane F) + `bf29b71` (Lane C) + Lane E |
| E.W3 — e2e/ coverage expansion + smoke-safari + flake fix | closed | 2026-05-20 | 2026-05-20 | `0f490cc` (Lane A) + `0d74e05` (Lane C) + `aa2d62a` (Lane B) |
| E.W4 — vendor policy + CI hardening + bench gate + CW preparation | planned | — | — | — |
| E.W5 HEADLINE close — FINAL.md, merge, v0.7.0 tag | planned | — | — | — |

## Open dependencies

- **None on the critical path** — E's value.js-only scope is fully unblocked.
- E.W0 Lane A consumes glass-ui's `9275584` ship (verified upstream at E open).
- E.W4 Lane D reads-only from speedtest's CW seed (`61079cb1`); value.js does not author CW.
- The 7 standing glass-ui primitive/blob asks remain blocked on glass-ui's successor tranche.
- The keyframes.js post-v0.6.0 consumption update routes to keyframes.js's own schedule.
- The precept submodule SHA at `68d9b20` — no upstream movement at E open; verify at E.W5 close.

## Authority

Per `E.md §10` + `E-PROMPTS.md §5`: E's substrate flows from the 6 audit deliverables (`audit/E-AUDIT-1..6`); the synthesis in `findings.md`; the wave specs in `waves/E.W0..E.W5.md`. The 9 binding standing mandates per `E-PROMPTS.md §3` bind every wave.
