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

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| D.W0 HEADLINE — open + precept advance + coord refresh | **closed** | 2026-05-19 | 2026-05-19 | `11abd86`, `afdfe77` |
| D.W1 — contract-v2 alignment + library barrel + tests + lint + Color flatten | **closed** | 2026-05-19 | 2026-05-19 | `73fdabc`, `14d35fa`, `6ca2046`, `059cf72` |
| D.W2 — backend (api/) refactor — god module split + service/repo + fail-explicit | planned | — | — | — |
| D.W3 — frontend cohesion — PaletteDialog split + facade completion + codemod | planned | — | — | — |
| D.W4 — styling + design-idiom catalog | planned | — | — | — |
| D.W5 — Playwright coverage — 3 → ~20 specs across 3 projects | planned | — | — | — |
| D.W6 HEADLINE close — FINAL.md, doc drift, coord state | planned | — | — | — |

## Open dependencies

- **None on the critical path** — D's value.js-only scope is fully unblocked.
- D.W0 Lane 0 advances `docs/precepts` `3c32fae → 68d9b20` (the contract-v2 codification SHA). This is verified-before-bump: D.W0 reads the precepts repo to confirm `68d9b20` exists and codifies contract-v2.
- The aurora derive-from-color and the blob extirpation are precept-§10 blocked on glass-ui ships (`coordination/Q.md §3` rows 1+2+3); both have named successor destinations and are out of D's waves.
- keyframes.js's precept-pin convergence is filed (`coordination/Q.md §9`); value.js cannot write keyframes.js. No D block.
