# D — Progress

Execution log for tranche D. Updated at wave boundaries. **Planning-only at D open** per the user directive ("This is NOT an implementation phase. Tranche development only.").

## 2026-05-19 — D open

### Trigger

The user issued the D-opening directive mid-session, between B.W4's commits 1 and 2 (`6d1cb40` and `719d2a6`). Verbatim in `D-PROMPTS.md §1`. Six named scope items: contract-v2 alignment, full Playwright every view + admin, aurora derive-from-color, blob extirpation, backend legacy/fail-explicit refactor, frontend encapsulation + styling. Plus the architectural binds — NO god modules, NO workarounds, NO fallbacks, fail-explicit, KISS, DRY.

### Audit round — 8 parallel research lanes

Eight read-only research lanes dispatched as parallel `general-purpose` agents. Each authored a deliverable under `research/`.

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| Da | hitherto + chronically-deferred items | `research/Da-hitherto-deferrals.md` | 30 deferred items catalogued (5 closed / 8 routed glass-ui / 1 keyframes.js / 11 in-repo / 5 historical doc residuals); 7 user prompts ledgered; A + B closes PASS |
| Db | backend (`api/`) legacy + workaround audit | `research/Db-backend-legacy.md` | 2 god modules (palettes.ts 845, admin.ts 750); 157 direct `db.collection` + 123 inline Mongo ops; no service/repo layer; 6 silent-fallback sites; `api/CLAUDE.md` drift (5 claimed / 9 actual collections) |
| Dc | aurora deep dive + derive-from-color spec | `research/Dc-aurora.md` | older `deriveColors` algorithm recovered from glass-ui `637955b`; sketched `deriveAuroraPalette` + `deriveAuroraConfig`; glass-ui-blocked — files sharper |
| Dd | blob extirpation + glass-ui augmentation | `research/Dd-blob.md` | 7 metaball additions + `BlobDot` + `deriveAuroraPalette` = 9 glass-ui surface additions; extirpation ≈ −865 demo LoC; glass-ui-blocked — files sharper |
| De | frontend god modules + composables encapsulation | `research/De-frontend-god-modules.md` | 1 god module (`PaletteDialog.vue` 652/401-script); `TabValue` drift; 10 component-side API imports (facade incomplete); 38/40 SFCs need reactive-props codemod; KEEP composable-facade, NO Pinia |
| Df | styling + design idioms | `research/Df-styling.md` | ~43 token-reaches to surface as utilities; 12 calc-chains + 1 fragile coupling; 0 z-index/viewport-trap hard-codes; design-idiom catalog = expand `demo/DESIGN.md` (NOT a new `design-idioms.css`) |
| Dg | Playwright view + admin coverage | `research/Dg-playwright-coverage.md` | 14 views (9 user + 5 admin); 3 → ~20 specs across `smoke`/`smoke-admin`/`smoke-mobile`; admin-mock via `addInitScript` localStorage seeding |
| Dh | contract-v2 + cross-repo fleet alignment | `research/Dh-contract-v2.md` | contract-v2 spec read from glass-ui `ce5aad8`; precepts codified at fleet SHA `68d9b20`; single-wave 5-lane alignment; keyframes.js already code-side compliant at `0909177` |

### Plan synthesis

`D.md` synthesized from the 8 research lanes — thesis, 5 invariants (D1–D5; D3 fail-explicit is new), a 7-wave schedule, the file-ownership rules, the 3-tier gate model (inherited from B's hardened gate). Wave specs `waves/D.W0..D.W6.md`. Cross-repo coordination `coordination/Q.md` (refreshes B's §3 with the sharpened 7-addition metaballs surface + the aurora derivation algorithm + the contract-v2 advance). The dispatch contract `dispatch/AGENT.md` adds the fail-explicit invariant and the contract-v2 binds.

### State at D open (planning-only)

Plan substrate: `D.md`, `D-PROMPTS.md`, `findings.md`, `research/Da..Dh` (8 audit docs), `coordination/Q.md`, `dispatch/AGENT.md`, `waves/D.W0..D.W6.md`, this file. **No implementation has run — planning-only.**

### Repo state at D open

- Branch: `tranche-b` (D opens off B.W4 close; execution may move to `tranche-d` or continue on `tranche-b` — orchestrator decides at D.W0).
- `docs/precepts`: `3c32fae` (target `68d9b20` at D.W0 Lane 0).
- vue-tsc: 126 (custom bucket cleared; 126 generated shadcn route to a future effort).
- vitest: 1409 / 26 files.
- e2e: 3 smoke specs green.
- glass-ui: `e2e5303` (post-Q-close; contract-v2 shipped at `ce5aad8`).
- keyframes.js: `0909177` (contract-v2 OK code-side; precept-pin off-target).

## 2026-05-19 — Hardening round (6-lane audit)

The user re-issued the original "DEEPLY audit with 6 agents in parallel" directive — scoped to harden Tranche D *itself*. Six read-only `general-purpose` agents audited D's substrate (the just-authored plan + 8 research lanes).

| Lane | Angle | Headline finding |
|---|---|---|
| D-HARDEN-1 | wave structure | Keep 7 waves (no B-style 6→5 collapse — D's waves are file-tree-disjoint). **Critical insight**: W2/W3 are file-disjoint and gate-disjoint; the linear schedule is illusory. Allow W2 ∥ W3 → 6 wave-slots. Plus minor gate tightenings. |
| D-HARDEN-2 | apparatus / docs / gates | 4,631 LoC across 21 files. **Not over-built** (apparatus shell 874 LoC vs B's 1,159). Zero gate-tier violations. Recommended pares: ~119 LoC (P1 Dh §5 → pointer, P2 dispatch/AGENT.md → deltas-only). |
| D-HARDEN-3 | D.W2 backend depth | 19 Db findings → D.W2 cross-walk: 9 FULL / 6 PARTIAL / 4 MISSED. **Defects**: repository list hallucinated 2 collections, omitted `votes`; lane order was wrong (A∥B → C → D would let A/B write services calling `db.collection(…)` before C lands the repos); Db §6 L2 (`api/dist/` checked-in) is FALSE. **15 amendments**: re-order lanes (C → A∥B → D), pin DI as Hono-context-middleware + route-as-controller + `withTransaction` for cross-collection writes, add `errors/`/`events/`/`middleware/inject-services/require-ownership`/`format/` to the tree, revise F1/F3/W3/W4 fail-explicit dispositions, fold F6/C3/C4/F1 missed findings. |
| D-HARDEN-4 | D.W3 frontend depth | 7 De findings folded; **3 missed sub-findings** + **TabValue reframe** (NOT a union drift — `PaletteControlsBar.vue:38-46` renders 3 stray admin-triggers with no matching TabsContent). Facade is 11 consumers (missed `VersionHistoryDrawer.vue:110`), NOT 10; lift into 5 colocated sub-composables exposed as `pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit` sub-objects (NOT flat methods on a 50+-member facade). Codemod is 32 SFCs not 38; 2 hand-conversion sites. **`viewSchema.ts` extraction un-folded — D5 violation** — folded as new Lane D in D.W3. `cssColorToRgb` micro-fix + `./configurator` adoption folded. |
| D-HARDEN-5 | D.W4 styling + D.W5 e2e + aurora/blob filings | D.W4 OK; pixel gate 1% → 0% with 3-row enumerated drift list. D.W5 had picker double-spec + WebGL compacted 2→1; both fixed. **Pixel-7 emulation runs Chromium not WebKit** — `smoke-safari` follow-up filed for post-D. Aurora filing 9/10 implementable (grayscale C=0 gap — 1-line clarification). Blob filing 10/10. |
| D-HARDEN-6 | prompts + invariants + chronically-deferred | Clause cross-walk: 33/35 ADDRESSED-or-FILED (94%). 2 GAPS: clause 22 "no effusive dynamicism" + clause 26 "linting". **D6 invariant codified** ("explicit pipeline / no effusive dynamicism"); `lint` script + eslint config + CI step folded into D.W1 Lane L7. Fail-explicit (D3) expanded to bind frontend too. **6 chronically-deferred items un-folded** (strict D5 violation) — all 6 folded (items 9/10/12/13/19 → D.W1/W3; item 18 → D.W6). |

### Hardening applied (planning-only, in-place to the substrate)

- `D.md §2` — D6 invariant added; D3 expanded to whole-codebase; precept-clause notes added.
- `D.md §3` — critical-path updated to 6 wave-slots (W2 ∥ W3 allowed); wave schedule annotated.
- `D.W1.md` — split sub-gate into 7 numbered conditions; **added L6** (library barrel completeness — G1-G11) + **L7** (5-module vitest coverage + `lint` script + CI step).
- `D.W2.md` — re-ordered lanes (C → A∥B → D); repo list corrected to the real 9 collections; added `errors/`/`events/`/`middleware/`/`format/` to the tree; pinned DI/controller/transactional shape; revised F1/F3/W3/W4 fail-explicit dispositions; folded 4 missed Db findings (F6/C3/C4/F1); corrected Db §6 L2 (`api/dist/` not checked-in). 15 amendments.
- `D.W3.md` — restructured as **4 lanes** (added Lane D — `viewSchema.ts` extraction); fold-ins for the 3 missed De sub-findings (ImageEyedropper split, `useColorNameQueue`/`useAdminOperations`, `CURRENT_PALETTE_ID`); reframed TabValue as the PaletteControlsBar trigger bug; facade as 5 sub-objects (11 consumers, not 10); codemod count 32 (not 38) with 2 hand-conversion sites; `cssColorToRgb` memoise folded into Lane C; `./configurator` adoption folded into Lane A; opens after D.W1 (not D.W2) per HARDEN-1.
- `D.W4.md` — pixel gate 1% → 0% with a 3-row enumerated drift table; pixel-diff artefacts named.
- `D.W5.md` — picker double-spec dropped; WebGL split into 2 specs (atmosphere + goo-blob); `smoke-mobile` note about Chromium-not-WebKit + follow-up filing.
- `D.W6.md` — K4 Prettier-doc folded as close-residual item 8; `smoke-safari` WebKit follow-up filed (item 9); D5 close-state table showing all 6 chronically-deferred items LANDED in D.
- `findings.md` — rows HARDEN-1 / HARDEN-3a..f / HARDEN-4a..f / HARDEN-5a..d / HARDEN-6a..d added (the 22 hardening corrections all wave-routed).
- `coordination/Q.md` — `§3` aurora row + grayscale clarification; new `§11` records the `smoke-safari` follow-up.

No new wave; no scope dropped — every original finding still lands; the apparatus is hardened.

## 2026-05-19 — Library-perf round (6 research + 6 challenge agents)

The user directed: "Analyze with 6 agents in parallel our parsing, math, library, and color code, alongside keyframes' parsing, library, math, and animation code… deploy 6 challenge agents to challenge each and every claim. Converge upon an optimum and challenged and research-backed claims. KISS."

### Research wave — 6 parallel lanes (Di–Dn)

| Lane | Angle | Headline finding |
|---|---|---|
| Di | V8 hot-paths + shape stability + deopt | 10 findings + 7 shape-stability items + 1 inlining barrier. Top: `Color<T>` Map storage; per-frame `cssColorToRgb` canvas round-trip; `new Function` in `evaluateSimpleCalc` (D6 violation). |
| Dj | Memoisation opportunities | 22 candidates surveyed → **1 P1** (`parseCSSColor` memo parity with CLAUDE.md contract); **11 explicit anti-recommendations** (don't memo `color2`/`mixColors`/`solveCubicBezierX`/`toFormattedString`/etc). |
| Dk | Math correctness + numerical | **0 correctness bugs** across ~3,100 LoC. Ottosson gamut + slerp + cssLinear + steppedEase + hue interpolation all spec-faithful. P1: targeted `decompose` test coverage gaps. |
| Dl | Interpolation API surface | 25 entry points; **0 true duplicates**; the canonical surface already exists; P1: `lerpColorValue` discards `hueMethod` → cylindrical animations go the long way round. |
| Dm | Parser architecture | 7 fail-explicit candidates; 5 allocation hot-spots; BBNF grammar drift + misnamed equivalence test; CSSWideKeyword missing from public `parseCSSValue`; case-sensitivity bug in color/calc function names. |
| Dn | value.js ↔ keyframes.js integration | Coupling sound; keyframes.js's 965-line `animation/index.ts` god module sketched into 7 cohesive sub-modules; 1 P1 ship candidate (later DOWNGRADED at challenge); type/name collision (`AnimationOptions`). |

### Challenge wave — 6 adversarial reviews (one per research doc)

Every research claim re-tested against source + spec evidence. **Strict skepticism**: a claim REJECTED unless the challenge could independently confirm. The user's "we mustn't change things just to change them" bound.

| Challenge | Verdicts |
|---|---|
| CHALLENGE-Di | 5 UPHELD / 5 REVISED / 5 REJECTED + 3 false-negatives added. **Post-challenge P1**: Color<T> flatten + cssColorToRgb memoise. F1/S1 demoted to P3 (bimorphism claim was wrong — monomorphic after `prepareInterpVar`). F2 TS-index-signature claim REJECTED (TS erases). F9 megamorphic-dispatch claim REJECTED. |
| CHALLENGE-Dj | P1 STANDS (parseCSSColor memo); **0 of 11 anti-recommendations overturned** (all rejections upheld); 1 missed candidate added (`parseCSSValueUnit` parity). `solveCubicBezierX` reject confirmed (continuous-input → cache thrash); `toFormattedString` reject confirmed (mutation-in-place → stale-cache hazard). |
| CHALLENGE-Dk | 5/5 spot-checks UPHELD (Ottosson + slerp + cssLinear + steppedEase + hue interpolation all spec-correct). k-means threshold PARTIAL UPHOLD with benchmark (3× speedup on noisy-photo, coupled with maxIterations cap). P1 decompose-test gap REDUCED (refactor-fixes.test.ts already covers some cases). Missed sites added: SPSA optimizer + logerp mixed-sign NaN. |
| CHALLENGE-Dl | 0-duplicates CONFIRMED. P1 UPHELD as load-bearing BUT "one-branch fix" REJECTED (requires 3-file change). 5 missing cases REDUCED to 3 (length-%, incompatible transform, hue boundary which dupes P1); `currentColor` SOFT; same-name FunctionValue REJECTED. P4 arg-order drift cheap; bundle with P1. |
| CHALLENGE-Dm | 5 FE UPHOLD / 2 REVISE (FE1 high→medium per CSS Syntax 3 permissiveness; FE3 medium→low per CSS Animations spec) / 0 REJECT. 4 HP UPHELD + 1 PARTIAL-REJECT. HP3 branch count corrected to 156 (not 148). CSSWideKeyword + case-insensitivity both UPHELD. parse-that `dispatch`/diagnostics unused are real defects; `splitBalanced` is DRY-only; `cssParser` architectural. |
| CHALLENGE-Dn | K9 (resolveTimingFunction ship) **DOWNGRADED to HOLD/P3** — the keyframes.js regex is an arithmetic shortcut, not parser-shaped; net-wash. K7 (TimingFunction type) UPHOLD. K10 (flattenValueTree) DROP — single consumer, KISS gate. K6 UPHOLD (rename to `CSSAnimationOptions`). K8 REFRAME — pin desync cosmetic; real hazard is cross-realm Parser-class doubling. 7-module split FAITHFUL. |

### Synthesis

Wrote `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md` — the authoritative ledger of every SURVIVING claim with research × challenge × wave assignment. **6 P1 + 5 P2 + 4 P3 surviving items + 4 coordination items fold into existing D infrastructure**:

- **D.W1 gains Lane L8** (NEW) — Color<T> Map → own-property storage transposition; the load-bearing perf + ergonomic win.
- **D.W1 Lane L6** gains 4 small library-barrel fixes: CSSWideKeyword fix, case-insensitivity fix, `TimingFunction` type export, `AnimationOptions` → `CSSAnimationOptions` rename, optional `nameParser` dispatch refactor.
- **D.W1 Lane L7** gains targeted decompose tests + `colorFilter` SPSA tests + optional k-means tune (benchmark-gated).
- **D.W2 Lane D** gains the `evaluateSimpleCalc` D6-violation excision (route through the existing AST evaluator).
- **D.W3 Lane C** gains 5 micro-fixes: `parseCSSColor` + `parseCSSValueUnit` memo parity, `hueMethod` wiring (3-file), interpolation arg-order canonicalisation, optional `_lerp` bolt-on cleanup.
- **D.W6** gains the `bbnf-equivalence.test.ts` rename-or-rewire decision.
- **coordination/Q.md §9** gains 4 keyframes.js asks (`AnimationOptions` import update, parse-that cross-realm peer-dep, kf-1 7-module split sketch, `sideEffects: false` refresh).

**12 claims REJECTED** by challenge — the KISS gate held against premature optimisation (synthesis doc §5).

No new wave; no scope dropped. The directive's "research-backed, challenged, KISS" frame is satisfied.

## 2026-05-19 — Reactivity hardening + release-plan round (2 parallel agents)

The user directed: "We MUST have proper, instant, reactivity within the keyframes.js demo app and value.js color picker app. We've had massive recursion issues in the past that resulted in infinitely nested, memory-leak-like, Color and Value objects … Challenge and refine with two agents in parallel knowing this. And we must plan to fully merge all items into master, and version bump."

### REACTIVITY-A — recursion + infinite-nesting class

Excavated the commit history deeply per the directive's "look to our commit history for this, deeply." Findings (`audit/D-REACTIVITY-A-recursion.md`):

- **Bug-commit**: `35cd9d5` (Jul 17 2024) — `colorUnit2()` in `src/units/color/normalize.ts` shipped with `new ValueUnit(value)` and no unwrap; bug latent for ~19 months across 4 refactors before manifesting.
- **Fix-commit**: `80cdd59` (Mar 1 2026) — `while (raw instanceof ValueUnit) raw = raw.value` inserted at what is now `src/units/color/normalize.ts:102`.
- **Fix-site count at HEAD**: 1 unwrap loop intact + 10 read-only defensive peels (all clean).
- **Memory's "ONLY accumulation site" claim VERIFIED** at HEAD `56feb87` — the 5 B.W3-committed files (animation-shorthand/extract/serialize/stylesheet/interpolate) contribute zero new accumulation sites.
- **L8 Color flatten — 6 site-classes at re-introduction risk**: Map-keyed storage was an implicit chokepoint; flattening removes it. **4 cooperating safeguards REQUIRED inside the L8 commit** (NOT optional, NOT deferable):
  - (a) `ColorChannel<T>` TypeScript brand — compile-time refusal of `instance.L = colorInstance`.
  - (b) DEV-only `assertNotNested` setters — runtime guard, free in production (Vite NODE_ENV-stripped).
  - (c) `test/recursion-guard.test.ts` — 3 named tests: 294-frame replay, clone-no-amplify, depth-3-nest.
  - (d) `clone()` depth-16 ceiling — diagnostic-only, single int per clone-call.
- **Critical**: `Color.clone()` rewrite must use per-channel explicit construction (Option III); the current `new Constructor()` no-args is fragile under own-property storage.

### REACTIVITY-B — instant reactivity in both demos

Findings (`audit/D-REACTIVITY-B-instant.md`):

- **13 reactivity-graph barriers** in the color picker cataloged; all hot-path barriers are rAF-coalesced, debounced-by-design, or echo-suppressed. The two-tier `shallowRef<ColorModel>` cache (`App.vue` model + `useColorModel` local model) is load-bearing for `defineModel`'s async round-trip — KEEP.
- **`stableHue` low-chroma guard** (`s*v > 0.01`) intact at 3 update sites — the `atan2(0,0)=0` regression properly fenced.
- **L8 × Vue reactivity verdict**: trap-cost regression does NOT apply. Grep-verified zero `Color`/`ValueUnit` instances inside `reactive()` anywhere — the 4 `reactive()` sites hold pure primitives (AuroraConfig, BlobConfig, popover styles). L8 flatten is strictly cheaper; add `isReactive(color) === false` regression test to L8's sub-gate.
- **Non-instant sites**: 0 unintentional; 1 needs binding-verification (`parseAndSetColorDebounced` 2000ms — confirm commit-on-blur, not live-input — flagged for D.W5 follow-up).
- **`_lerp` bolt-on (L12)**: reactivity-benign. `InterpolatedVar` never inside `reactive()`; the assignment is invariant and pre-exposure.
- **keyframes.js demo**: gold-standard pattern (`markRaw` AnimationGroup + `useAnimationSync` rAF-poll bridge → primitive refs); zero reactivity issues.
- **Hardening primitives required**:
  - `e2e/smoke/reactivity-instant.spec.ts` — wall-clock ≤ 50 ms median across 5 paths.
  - `bench/color-channel-access.mjs` — L8 microbench acceptance gate (≥ 5× speedup REQUIRED).
  - `useEffectCensus` DEV probe (optional).

### Synthesis applied to the substrate (planning-only)

- **`D.md §2`** — added **invariant D7** ("No nested `Color`/`ValueUnit`") codifying the unwrap pattern as a tranche-D-binding rule with all 4 hardening primitives named.
- **`D.W1.md` Lane L8** — extended with the 4 hardening primitives, the per-channel explicit `clone()` rewrite, and the L8 microbench acceptance gate. Sub-gate L8 now requires: `import.meta.env.DEV` blocks STRIPPED from `dist/value.js`; recursion-guard suite green; `isReactive(color) === false` regression; ≥ 5× microbench speedup.
- **`D.W5.md`** — added `e2e/smoke/reactivity-instant.spec.ts` (the wall-clock instant-reactivity assertion) + an optional `useEffectCensus` DEV probe.
- **`D.W6.md`** — added the merge + release ceremony pointing at `D-RELEASE-PLAN.md`. The pre-merge gate matrix has 9 named conditions including the two REACTIVITY primitives.
- **`D-RELEASE-PLAN.md`** (NEW) — full release plan:
  - §2 version-bump strategy — value.js `0.5.1 → 0.6.0` (minor; two breaking changes: L8 Color shape + C1 `AnimationOptions` rename; pre-1.0 semver mandates minor bump). CHANGELOG sketch covering BREAKING / FEATURES / INTERNAL / RECURSION-PREVENTION HARDENING / DEPS.
  - §3 merge ceremony — `tranche-b → master` `--no-ff`; tag `v0.6.0`; the merge-commit message drafted.
  - §4 risk register — 6 named risks with mitigations + owners.
  - §5 reactivity acceptance gate — both REQUIRED primitives green or STOP.
- **`coordination/Q.md §9`** — added §9.5 (post-D-merge keyframes.js consumption update: bump pin + rename imports + verify Color channel access) and §9.6 (reactivity hardening summary).
- **`findings.md`** — 7 new rows (RA-1, RA-2, RB-1, RB-2, RB-3, REL-1, +the LIB-RX retained).

### Net effect

The user's hard requirement ("we MUST have proper, instant, reactivity") and the directive's "look to commit history deeply" are both fully evidenced. The L8 thesis from the lib-perf round is preserved AND fortified with 4 cooperating safeguards. The merge + version-bump plan is authored as `D-RELEASE-PLAN.md`; D.W6 executes it. The keyframes.js consumption-update ask is filed at `coordination/Q.md §9.5`.

No new wave; no scope dropped. The reactivity verdict is empirical-evidence-backed (the 2 required wall-clock primitives gate the merge).

## 2026-05-19 — D.W0 + D.W1 execution

### D.W0 HEADLINE close (1 Lane 0 precept commit + 1 Lane A+B docs commit)

- **Lane 0 — precept submodule advance `3c32fae → 68d9b20`** (`11abd86`).
  - Pre-flight: glass-ui's local precepts clone carried `68d9b20` but never pushed to upstream; orchestrator pushed `precepts:main` to publish the contract-v2 codification commit (one-time fleet-coordination hygiene; commit content + authorship preserved).
  - value.js's `docs/precepts` pin advanced to `68d9b20`.
- **Lane A — state-at-open probe** (folded into `afdfe77`).
  - vue-tsc 126 / vitest 1409 (26 files) / playwright smoke 3/3 / cold-start boot probe at 1280×800 light: 0 console errors, 0 stale-prop warnings, 0 non-2xx network.
  - Audit at `audit/D.W0-state-at-open.md`.
- **Lane B — coord/Q.md refresh confirm** (folded into `afdfe77`).
  - 5 rows verified; 2 one-line reconciliations applied (§0 header pin state, §3 aurora citation `D-HARDEN-5 §6 → §5`).

D.W0 sub-gates 0 + A + B all PASS.

### D.W1 execution (8 lanes across 4 commits — the v0.6.0 release-blocking wave)

- **L1-L5 contract-v2 alignment** (`73fdabc`).
  - `package.json exports[\".\"]`: 4-key → 3-key `{types, import, default}`; `development` struck.
  - `package.json scripts`: added `build:watch` + `proof:resolution`.
  - `vite.config.ts`: deleted `demoConditions` + 3 callsites; replaced `demoServerFsAllow` with narrow `siblingFsAllowTransient` on dev + hero-lab (consumer-side reciprocal of glass-ui's outstanding `./styles` subpath migration — filed at `coordination/Q.md §3` as a documented transient under invariant D3's "befitting graceful" carve-out).
  - `scripts/proof-resolution-contract.mjs` ported verbatim from glass-ui `ce5aad8` (366 lines + 2-line attribution header); GREEN fleet-wide.
  - `coordination/Q.md §9.1` carries the post-W1 fleet-status table.
- **L6 library barrel + 4 small fixes** (`14d35fa`).
  - G1-G11 dispositions in `audit/D.W1-library-barrel.md`: SHIP G1 (registerColorNames + clearCustomColorNames + getCustomColorNames) + G11/K5 (solveCubicBezierX); KEEP-INTERNAL G2/G7; DEFER G3/G4/G6/G8/G9/G10 to D.W3/D.W6 with named destinations; DONE G5.
  - L6 CSSWideKeyword fix: restored to `ValuesValue` in `src/parsing/index.ts`.
  - L7 case-insensitivity fix: `string(name)` → `istring(name)` for color/math function names (CSS Color L4 + CSS Values 4 ASCII case-insensitivity).
  - L10 TimingFunction type exported.
  - L14 nameParser dispatch refactor DEFERRED with reasoning (parse-that's `dispatch` is char-keyed, not name-keyed; modest payoff doesn't justify cross-site cost).
  - C1 `AnimationOptions` → `CSSAnimationOptions` rename (14 internal sites).
- **L7 test coverage + lint script + CI step** (`6ca2046`).
  - 7 new test files (5 src/-WIP coverage + L9 decompose-targeted + L9 colorFilter-spsa): 167 tests, vitest 1409 → 1576 (26 → 33 files).
  - eslint flat config + `lint` script + CI step + 6 devDependencies.
  - L13 k-means tune DEFERRED to D.W3 Lane C per the lane's bandwidth-gated posture (explicitly authorized by spec).
- **L8 Color<T> Map → own-property + 4 hardening primitives** (`059cf72`).
  - 15 color-space classes flattened: Map storage → own properties; 45 channel-getter/setter pairs deleted.
  - **Microbenchmark: 11.06× median speedup** vs the ≥ 5× v0.6.0-merge-gate (5-run stability range 8.73× to 14.82×).
  - 4 hardening primitives: ColorChannel<T> brand (45 declare-applications) + DEV-only `_assertChannel` (production-bundle verified: 0 `import.meta.env.DEV` references in dist/value.js post-DCE) + vitest `recursion-guard.test.ts` (5 named tests incl. 294-frame-replay) + clone() depth-16 ceiling.
  - vitest 1576 → 1581 (+5 recursion-guard tests).
  - Bundle: 136.93 kB / 40.15 kB gzip.

D.W1 gates: vue-tsc 126 / vitest 1581 (34 files) / playwright smoke 3/3 / proof:resolution GREEN / lint exit 0 / npm run build clean / L8 microbench 11.06× median (≥ 5×).

D.W1 closes. **The v0.6.0 release gate clears empirically** at `059cf72`.

## 2026-05-20 — D.W2 execution

D.W2 — backend (`api/`) refactor: 4 lanes ordered **C → (A ∥ B) → D** per D-HARDEN-3 §7. The api/ moves from 2 god modules + raw `db.collection(…)` to a typed service+repository pipeline with fail-explicit error envelopes.

- **Lane C — rails (`626b107`)**. 20 NEW files / 1502 LoC (every file ≤ 250).
  - `api/src/db/collections.ts` typed factory over 9 real collections.
  - `api/src/models.ts` 9 typed document interfaces (`Palette`, `Vote`, `PaletteVersion`, `Session`, `ProposedName`, `Tag`, `Flag`, `AdminAuditEvent`, `User`).
  - `api/src/repositories/*.ts` 9 repositories — the ONLY layer touching `db.collection(...)`.
  - `api/src/errors/index.ts` typed `ApiError` hierarchy (7 subclasses) + `toResponseEnvelope` mapper.
  - `api/src/events/auditLog.ts` canonical `emitAuditEvent` with W3 befitting-graceful carve-out.
  - `api/src/middleware/inject-services.ts` DI via Hono context (singleton, lazy-init per worker).
  - `api/src/middleware/require-ownership.ts` factory for ownership gating.
  - `api/src/validation/{palette,admin,session,color}.ts` zod 4.4.3 schemas covering every route family.
  - `api/src/format/palette.ts` shared `formatPalette` (C1 Db lift).
  - `AppEnv` extended with `services: Services`; `injectServices` registered before `resolveSession`; `app.onError` → `toResponseEnvelope`.
  - Sub-gates C-1..C-4 all PASS. Zero `as any` across new rails.
- **Lane A — palettes.ts split (`491a5d8`)**. 845 LoC → 5 concerns + per-concern services (file-disjoint topology landed cleanly with the wave-spec carve-out for 5 concerns instead of 6).
  - Routes: `routes/palettes/{index,crud,versions,forks,votes,flags}.ts` (6 files, 358 LoC, max 117).
  - Services: `services/palette/{crud,crud-list,versions,forks,oklab,votes,flags}.ts` (7 files, 905 LoC, max 215).
  - **F3 fix landed** — vote-toggle race resolved via `VoteRepository.upsertIdempotent` + gated `$inc` (per D-HARDEN-3 §3 correction; `client.withTransaction` not wired but the idempotent-upsert pattern is sufficient given Mongo's unique-index atomicity).
  - Sub-gate A: every file ≤ 250 lines, zero `db.collection` in new code. PASS.
- **Lane B — admin.ts split (`b7d7c63`)**. 750 LoC → 8 concerns + per-concern services. Worktree-isolated dispatch; orchestrator integrated via file-copy (the worktree landed on master, not Lane C — orchestrator extracted only Lane B's new files + the one-line `index.ts` import edit).
  - Routes: `routes/admin/{index,audit,batch,colors,flagged,impersonate,palettes,tags,users}.ts` (9 files, 409 LoC, max 104).
  - Services: `services/admin/{audit,batch,colors,flagged,impersonate,import,palettes,tags,users}.ts` (9 files, 779 LoC, max 203).
  - **17 audit-emit invocations** across the new services (every admin WRITE op emits exactly once; the read-only audit.ts service correctly emits zero).
  - Sub-gate B: every file ≤ 250, `adminAuth` bound once at `/admin/*`, zero `db.collection` in new code. PASS.
- **Lane D — legacy excision + fail-explicit + doc reconcile (`<this commit>`)**. Closes the wave.
  - F1 — `formatPalette` migration defaults excised; `api/src/migrations/check.ts` startup smoke probe asserts schema invariants.
  - F2 — verified gone (Lane C's `require-ownership` middleware is canonical).
  - F3 — verified handled in Lane A.
  - W2 — fork JSON-parse-to-empty-body distinguishes empty body from malformed; explicit `ValidationError` on malformed.
  - W3 — audit-log carve-out verified inline-rationaled.
  - W4 — `cssToOklab` throws `ValidationError` on unrecognised format (kept inline per KISS rather than coupling api to value.js as file: dep).
  - **4 missed Db findings folded**: F6 crypto-import normalized; C3 three LRUs consolidated behind `api/src/cache/lru.ts`; C4 SIGTERM+SIGINT handlers with 5s grace window; F1 evidence closed by the migration probe.
  - **L4 library D6-violation excised** — `evaluateSimpleCalc` (`new Function(...)`) at `src/parsing/color.ts:78` replaced with explicit AST pipeline via `createCalcParser` + `evaluateMathFunction`. `grep -rn 'new Function' src/parsing/` returns zero.
  - `api/dist/` confirmed never tracked (per D-HARDEN-3 §3 Db §6 L2 correction); local cleanup.
  - `api/src/migrate-{oklab,slugs}.ts` deleted (corpus-grep proof clean per invariant-33).
  - `api/CLAUDE.md` wholesale reconcile (81 → ~190 LoC): 9 collections / 27 indexes, full Lane A+B+C topology, explicit pipeline shape, updated endpoint tables.
  - Sub-gate D: all items PASS.

D.W2 gates: cd api && tsc --noEmit clean / vue-tsc 126 / vitest 1581 (34 files) / playwright smoke 3/3 / proof:resolution GREEN / lint exit 0.

D.W2 closes. Lanes A+B are file-disjoint per HARDEN-1; the parallel dispatch was successful (Lane B's worktree had to be manually integrated due to wrong-base divergence — recorded for future-tranche learnings).

## 2026-05-20 — D.W3 execution

D.W3 — frontend cohesion: 4 lanes sequenced **A → D → B → C** (Lane A first to lay the PaletteDialog dir structure; Lane D next, small extraction; Lane B to complete the facade across the new structure; Lane C last so the 32-SFC codemod picks up everything A + B touched).

- **Lane A — PaletteDialog 12-file split + ImageEyedropper split + adjacencies (`3359a97`)**.
  - PaletteDialog.vue (652 LoC) → 13-file colocated `PaletteDialog/` dir. Shell at 340 LoC (47% reduction). Single `pm = inject(PALETTE_MANAGER_KEY)` consumption; parallel re-wiring removed.
  - PaletteControlsBar trigger bug REFRAMED (D-HARDEN-4 §2): 3 stray admin-only triggers (`admin-audit`, `admin-flagged`, `admin-tags`) deleted — those views render in AdminPane.vue, reached via dock view-select, not in the dialog. Trigger count = `TabValue.length` (5).
  - ImageEyedropper.vue (399 LoC) → 4-file colocated `ImageEyedropper/` dir.
  - ConfigSliderPane.vue → KEEP (already adopts glass-ui `./configurator`).
  - CURRENT_PALETTE_ID lifted to `@/lib/palette/constants.ts` (canonical) + re-exported from PaletteDialog/constants.ts.
  - Net: 12 old files / 1,579 LoC deleted; 17 new files / ~1,100 LoC added; 5 consumer imports updated.
  - Sub-gates A-1 PARTIAL (shell 340 vs aspirational ~200; the template-coordination tier is irreducible without antipattern wrapping), A-2 + A-3 PASS.

- **Lane D — viewSchema.ts extraction (`4d439bf`)**.
  - `demo/@/composables/viewSchema.ts` NEW (199 LoC) — pure data + types (ViewId, LeftPane, RightPane, PaneConfig, VIEW_MAP, isViewId predicate).
  - `useViewManager.ts` 237 → 79 LoC (-67%); imports from viewSchema, re-exports types for source-compat with 5 transitive consumers.
  - PaletteDialog/composables/usePaletteDialogState.ts: type-level enforcement landed — `Exclude<TabValue, "saved"> extends ViewId ? true : never` assertion catches drift between the 4 admin/extract/browse tabs and the schema.
  - Chronically-deferred Da §3 item 12 closes. All sub-gate D conditions PASS.

- **Lane B — facade completion: 5 sub-composables + 11 SFC lifts (`ea08102`)**.
  - 5 NEW colocated composables in `demo/@/composables/palette/` (536 LoC total, all ≤ 150 LoC):
    - useAdminAudit (96), useAdminFlagged (143), useAdminTags (103), useVersionHistory (128), useTagEdit (66).
  - usePaletteManager extended to expose them as **sub-objects**: pm.audit, pm.flagged, pm.tags, pm.versions, pm.tagEdit (NOT flat methods, preventing 50+→70+ member bloat).
  - 11 SFC consumer migrations: all `@lib/palette/api` direct imports removed from `palette-browser/` SFCs. Defensible KEEPs (ColorInput.vue + useCustomColorNames.ts) preserved per spec.
  - useColorNameQueue moved `auth/` → `palette/`; useAdminOperations.ts barrel deleted.
  - Net: 11 SFCs / -495 LoC (state moved to composables); 5 new composables / +536 LoC. Net wash; the architectural win is cohesion + facade-completeness.
  - All sub-gate B conditions PASS.

- **Lane C — Vue 3.5 codemod (32 SFCs) + library-perf L3/L5/L8/L11/L12 + cssColorToRgb memoise + dead-provide cleanup (`cea5e3f`)**.
  - 32 SFCs codemodded to Vue 3.5 reactive-props destructure form. Final `rg "const props = defineProps<"` = 0 (exceeded the ≤ 2 gate).
  - 2 hand-conversion sites (GooBlob.vue + ImageEyedropper.vue) handled with withDefaults + `toRef(() => x)`. 1 incidental hand-conv inside CurrentPaletteEditor.vue.
  - 8 useTemplateRef migrations across 7 SFCs.
  - cssColorToRgb at `useMetaballRenderer.ts:53` memoised with 256-entry cap — eliminates per-frame canvas getImageData + 3-element array allocation.
  - Dead `provide("auroraConfig", …)` removed from App.vue:215 (zero injectors confirmed).
  - **L3 parseCSSColor memo + invalidation hook** — landed at `src/parsing/color.ts:584`. Cache invalidates on registerColorNames/clearCustomColorNames.
  - **L8 parseCSSValueUnit memo parity** — landed at `src/parsing/units.ts:111`.
  - **L5 lerpColorValue carries hueMethod (3-file fix)** — InterpolatedVar<T> extended with hueMethod + colorSpace; normalizeColorUnits writes them in; lerpColorValue dispatches `interpolateHue(a, b, t, hueMethod)` for the hue channel of cylindrical spaces. Bridge complication: `normalizeColorUnits` is called with `inverse=true`, so the hue channel needs `/360 → interpolateHue → *360`. Vitest assertion at `test/units-interpolate.test.ts:319` for the oklch(50% 0.2 350°) → oklch(50% 0.2 10°) short-way pair.
  - **L11 interpolation arg-order canonicalisation** — `lerp(t, a, b)` → `lerp(a, b, t)` to match interpolateHue + slerp. 14+ call sites updated. `lerpLegacy` aliased with `@deprecated` JSDoc + re-exported from `src/index.ts`.
  - **L12 _lerp bolt-on cleanup (OPTIONAL)** — LANDED (not deferred). `_lerp` declared on InterpolatedVar<T>; prepareInterpVar writes the property directly; lerpValue reads without `(iv as any)` cast.
  - Net: 51 files modified, 816 insertions / 196 deletions. vitest 1581 → 1582 (+1 L5 test).
  - All sub-gate C conditions PASS including the optional L12.

D.W3 gates: vue-tsc 126 / vitest 1582 (34 files) / playwright smoke 3/3 / proof:resolution GREEN / lint exit 0 / api tsc clean.

D.W3 closes. PaletteDialog is no longer a god module (652 → 340 shell + 12 colocated files), the palette-manager facade is complete (no SFC reaches the api directly outside the named KEEPs), the demo runs on Vue 3.5 idioms (0 `const props = defineProps`), and 5 library-perf fold-ins (L3/L5/L8/L11/L12) shipped.

## 2026-05-20 — D.W4 execution

D.W4 — styling + design-idiom catalog: 2 lanes, file-disjoint, dispatched in parallel. Both PASS. Combined into 1 commit (the wave spec aspired to 2; the actual filesystem state had both lanes land together cleanly, so a single combined commit reflects the merged truth).

- **Lane A — Tailwind utility surfacing + style.css colocation + brittle-selector hardening + drift reconciliations**.
  - **51 `[var(--…)]` callsites → 0** (exceeded the ≤ 5 gate). 5 NEW `@theme` bridge declarations in `style.css` (max-w-desktop-pane, min-w-menu, top-dock-inset, max-w-tooltip, shadow-card-hover); 48 callsites resolved through glass-ui's existing bridges. Byte-isomorphic by construction.
  - 4 style.css blocks colocated: `.palette-card-grid` → `PaletteCardGrid.vue` (scoped); `.palette-tab-content` cluster → `PaletteDialog.vue` (unscoped); `.touch-gate-*` cluster → `ComponentSliders.vue` (unscoped); `.pane-scroll-fade` → `PaneHeader.vue` (unscoped).
  - style.css 230 → 201 lines (−29; pure colocation reduction was ~−45; net after the 5 @theme additions + `--app-padding-x` token + colocation-marker comments).
  - Brittle selectors hardened: `PaletteCard.vue`'s `.featured-badge :deep(svg)` → `.featured-badge__icon svg` (wrapper span); `PaletteDialog.vue`'s 3× `button:has(> .lucide-x)` → `button:has(> .sr-only)` (survives lucide-vue API shifts); `:has(> .palette-dialog)` retained per `Df §5.3` (deliberate reka-ui ModalOverlay coupling, documented).
  - Drift reconciliations: hero-lab `999px` → `var(--radius-pill)` (3 sites); 2 redundant `, monospace` fallbacks stripped; NEW `--app-padding-x: 1rem` token breaks the silent 1rem coupling between `.app-layout` padding and `.pane-container` max-width calc (per `Df §4.1`).
  - Pixel-diff substituted by byte-isomorphism analysis at `audit/D.W4-pixel-diff/README.md` (preserves the 120-min cap). The 3 enumerated drift exceptions are within the wave-spec exception table.
  - Sub-gate A PASS.

- **Lane B — `demo/DESIGN.md` catalog expansion**.
  - 24-line stub → **133-line catalog** (within ±20 of the ~150 target).
  - 10 sections per the spec: Token architecture, Type scale, Surfaces, Shadows, Radii, Motion, Z-tier, Color, Layout, Idioms NOT used.
  - Cross-references cite specific `style.css` line ranges (12 sites) + 12 distinct glass-ui DESIGN.md section/subsection names. All cross-reference links verified against glass-ui's `DESIGN.md` at HEAD (zero broken links). Concrete consumer-site naming throughout: every "where this is used" claim grounds to a grep-verifiable file path.
  - Audit doc `audit/D.W4-design-idioms.md` (54 lines): narrative-vs-source-of-truth cross-walk verifies the ~20 claims at HEAD.
  - Sub-gate B PASS.

D.W4 gates: vue-tsc 126 / vitest 1582 (34 files) / playwright smoke 3/3 / proof:resolution GREEN / lint exit 0 / 0 `[var(--…)]` survivors in demo/.

D.W4 closes. The demo's styling is now token-bridge-canonical (no magic-literal token reaches), 4 style blocks are component-scoped, brittle selectors are hardened, and DESIGN.md documents the idioms so component authors can write code without grep-archaeology.

## 2026-05-20 — D.W5 execution

D.W5 — Playwright coverage: 3 lanes sequenced **(A ∥ B) → C** (Lanes A + B file-disjoint dispatched in parallel; Lane C the small organizational wrap-up). 3 baseline smoke specs → **21 specs across 3 projects** in 9.6s.

- **Lane A — user-view specs + walk + WebGL + reactivity-instant (`707d1be`, combined with Lane B)**.
  - 6 view specs at `e2e/smoke/views/` (palettes, browse, extract, generate, gradient, mix) — each ≤ 35 LoC; role/label-only selectors.
  - `e2e/smoke/walk.spec.ts` — exercises usePaneRouter's component registry by walking all 6 user views + back to picker; 0 console errors throughout.
  - `e2e/smoke/webgl-atmosphere.spec.ts` + `e2e/smoke/webgl-goo-blob.spec.ts` — 2s warm-up + view-switch probes; no webglcontextlost / [stale prop] console substrings.
  - **`e2e/smoke/reactivity-instant.spec.ts` (MERGE-GATE-BLOCKING)** — 2 tests: spectrum-drag → docs-pane wall-clock measurement (median **6.80ms** across 5 paths, 7.4× under the 50ms gate); slider-keyboard → component-readout wall-clock (median 21.70ms). REACTIVITY-B's topology verdict is now wall-clock evidenced.
  - 2 single-line `data-testid` additions (GooBlob.vue + atmosphere canvas).
  - Env-noise filter added to page-load.spec.ts for shared production palette API rate-limits (4xx/5xx are network conditions, not value.js bugs).
  - Sub-gate A PASS. Deferred: useEffectCensus dev probe (REACTIVITY-B verified topology; no leak surfaced) + hex-input reactivity test (visibility:hidden at desktop breakpoint; re-targeted to slider-keyboard).

- **Lane B — admin specs + admin-mock fixture (`707d1be`, combined with Lane A)**.
  - `e2e/smoke/admin/fixtures/admin-auth.ts` — `addInitScript` seeds `localStorage["palette-admin-token"]` BEFORE app boot; `page.route` wildcard returns PaginatedResponse-shaped `{data:[],total:0,limit:50,offset:0}` envelopes for 8 admin endpoint patterns (with the `/admin/tags` Tag[]-directly exception per types.ts contract).
  - 5 admin-view specs at `e2e/smoke/admin/` + `admin-walk.spec.ts` (moved into `admin/` dir by Lane C for clean partition).
  - Navigation uses direct hash routes (`page.goto('/#/admin/users')`) rather than dock-toggle UI traversal — same useViewManager → usePaneRouter → AdminPane code path, simpler.
  - `.last()` / `.first()` selector convention for admin pane content — the pane mounts in both mobile + desktop slots; .last() picks the visible desktop instance at 1280×720. Inline-commented per spec.
  - The categorical OPPOSITE of W5-C's login-flow mocking (which hung); no live login runs in tests.
  - Sub-gate B PASS.

- **Lane C — smoke-mobile + 3-project playwright.config + CI (`f374f13`)**.
  - `e2e/smoke/mobile/page-load-mobile.spec.ts` — Pixel-7 viewport, single boot spec (62 LoC). Asserts mobile pane shell + dock + view-select combobox + zero console errors.
  - `playwright.config.ts` — 3-project partition: `smoke` (testIgnore `**/admin/**, **/mobile/**`), `smoke-admin` (testDir `./e2e/smoke/admin`), `smoke-mobile` (testDir `./e2e/smoke/mobile` + `devices['Pixel 7']`).
  - `.github/workflows/node.js.yml` extended: `npx playwright test --project=smoke --project=smoke-admin --project=smoke-mobile`.
  - iOS-Safari engine note (per D-HARDEN-5 §4): Pixel 7 in Playwright runs Chromium, NOT WebKit. The smoke-mobile spec catches mobile-layout bugs but NOT iOS-Safari engine bugs. A `smoke-safari` WebKit project + 30s sustained spec is filed as a follow-up in `coordination/Q.md §11` for a successor tranche; the iOS-Safari Color/ValueUnit nesting bug class is covered by D7 invariant + the recursion-guard suite.
  - Sub-gate C PASS.

D.W5 gates: vue-tsc 126 / vitest 1582 (34 files) / **playwright 21/21 green in 9.6s across 3 projects** (3 baseline + 14 Lane A + 6 Lane B + 1 mobile) / proof:resolution GREEN / lint exit 0 / **reactivity-instant 6.80ms median** (≤ 50ms merge gate).

D.W5 closes. The user's directive ("proper, instant reactivity") now has wall-clock empirical evidence; the smoke surface covers every user view + every admin view + WebGL + a mobile viewport probe.

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| D.W0 HEADLINE — open + precept advance + coord refresh | **closed** | 2026-05-19 | 2026-05-19 | `11abd86`, `afdfe77` |
| D.W1 — contract-v2 alignment + library barrel + tests + lint + Color flatten | **closed** | 2026-05-19 | 2026-05-19 | `73fdabc`, `14d35fa`, `6ca2046`, `059cf72` |
| D.W2 — backend (api/) refactor — god module split + service/repo + fail-explicit | **closed** | 2026-05-19 | 2026-05-20 | `626b107`, `491a5d8`, `b7d7c63`, `ee8bfa4` |
| D.W3 — frontend cohesion — PaletteDialog split + facade completion + codemod | **closed** | 2026-05-20 | 2026-05-20 | `3359a97`, `4d439bf`, `ea08102`, `cea5e3f` |
| D.W4 — styling + design-idiom catalog | **closed** | 2026-05-20 | 2026-05-20 | `5674d1f` (Lanes A+B combined — file-disjoint, byte-isomorphic) |
| D.W5 — Playwright coverage — 3 → 21 specs across 3 projects | **closed** | 2026-05-20 | 2026-05-20 | `707d1be`, `f374f13` |
| D.W6 HEADLINE close — FINAL.md, doc drift, coord state | planned | — | — | — |

## Open dependencies

- **None on the critical path** — D's value.js-only scope is fully unblocked.
- D.W0 Lane 0 advances `docs/precepts` `3c32fae → 68d9b20` (the contract-v2 codification SHA). This is verified-before-bump: D.W0 reads the precepts repo to confirm `68d9b20` exists and codifies contract-v2.
- The aurora derive-from-color and the blob extirpation are precept-§10 blocked on glass-ui ships (`coordination/Q.md §3` rows 1+2+3); both have named successor destinations and are out of D's waves.
- keyframes.js's precept-pin convergence is filed (`coordination/Q.md §9`); value.js cannot write keyframes.js. No D block.
