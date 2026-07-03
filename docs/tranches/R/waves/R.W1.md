# R.W1 — GAMUT + PERCEPTUAL (library; the U10 head; the 2.0.0 cut)

**Name**: W1 — Gamut + perceptual (the 2.0.0 cut)
**Opens after**: R.W0 (runs parallel with R.W2 / R.W6). R.W3 requires this wave — the overlay consumes the *published* boundary API atop the *settled* gamut policy.
**Spec of record**: `SYNTHESIS-v2.md §3 R.W1` (items 1–7) + `§9` (the kf/parse-that slate) · `PASS3-VERDICT.md §1` (the KF-1 **5-file** head-truth amendment).
**Status**: DISPATCHABLE (RATIFIED-2026-07-03 — Q7 ratified at **α=1.0** (item 1 is now a decision record, not a head); Q12's R-3 tightening RATIFIED (item 4 lands)).

---

## §Goal criterion

The library ships one honest major: the washed-out gamut mapping is cured at its constant (U10), the `parseFunctionParameters` grammar bug dies with its rename (KF-1 — kf's `normalizeParam` shim becomes fully deletable), the gamut-boundary sampler becomes public API so the R.W3 instrument consumes a registry export rather than forked math, and the perceptual slate (OKHSL/OKHSV, ΔE-2000/ΔE-ITP, K-DISP) lands. 2.0.0 publishes with both dispatch letters written.

## §Completion criterion

The §Hard gate below: every named test suite green at head, goldens locked post-α, 2.0.0 on the registry, letters authored.

---

## §Ordering (LOAD-BEARING — do not reorder)

The α change (item 1) moves `gamutMapOKLab`'s OOG output, which **moves the JND locus**; the boundary goldens (item 5) must be generated **after** it. Order within the wave: **α-tune → items 2–4 + 6 (any order) → boundary module → golden generation → publish (item 7)**. (`boundary-api.md §7`; `SYNTHESIS-v2.md §13` residual-5: the sequencing rule covers either Q7 outcome.)

## §Items

### 1 · U10 gamut policy — **DECISION RECORD (Q7 RATIFIED 2026-07-03): `GAMUT_ALPHA = 1.0`**, then one constant

**Q7 RATIFIED at α=1.0 — the genuine cure.** The α-tune family won on the extended 164-color corpus: hue held **0.000° mean AND max**; MINDE §13.2 rejected (34.7° max hue drift + ≈6.5× cost — survives as *test oracle* only); gamut-relative rejected (c1 const-L clip = 27% retention, worse than the 34% defect; c2 byte-identical to full-cusp, ΔL max 0.405). The ratified setting (`gamut-bound.md §7`):

**`GAMUT_ALPHA = 1.0`** — oracle-vivid pink `lab(92% 88.8 20)` → `rgb(255,167,180)` (39% retention — the U10 "land between"); hue-exact; cost ≈1.0× (free); always 4.9× under full-cusp's collateral. Tiered bound: worst-case ΔL **0.050** at realistic chroma (C≤0.32), **0.083** at authored super-gamut chroma (C≥0.37 dark-L — above any real gamut's cusp).

**Rejected gate-strict alternative (recorded)**: `GAMUT_ALPHA = 0.35` held ΔL <0.05 everywhere but under-cured — pink landed at 30% (`rgb(255,185,194)`), weakly satisfying the U10 oracle, on the steep part of the return curve. Rejected at the 2026-07-03 ratification in favor of the genuine cure.

The exact change: **`src/units/color/gamut.ts:242`** (`GAMUT_ALPHA`) + the two doc strings (**`gamut.ts:5-6`**, **`:246`** — pass-1's `:247` was off-by-one). Ship the **tiered bound**, never "<0.05"; the pass-1 "natural knee" claim is refuted — it is a diminishing-returns **elbow** (light-retention climbs monotonically through α=2.0). An L-asymmetric α stays rejected as contrivance (recorded, `SYNTHESIS-v2.md §2.4`).

**Test additions**: the §13.2 MINDE **oracle suite** vs browser refs; a far-OOG light-pink/yellow/cyan regression corpus; a mid/dark `C∈{0.37,0.40}` guard row asserting worst-case ΔL **`< 0.09`** (the tiered bound as a lock, not the false `<0.05`).

### 2 · KF-1 grammar fix + rename — the 5-FILE change (per PASS3-VERDICT §1)

Apply the preserved seed **`audit/pass2/seeds/kf1.patch`** (4 files, +141/−30, prototyped green) **plus the 5th-file assertion sweep** the stale worktree could not see:

| File | Change |
|---|---|
| `src/parsing/stylesheet.ts` | type rename `CustomFunctionParameter.type→syntax`, `defaultValue→default` (`:44-48`); `topLevelColonIndex` (depth-0, string-safe) + rewritten `parseFunctionParameters` (`:637-706`) — first-whitespace splits name from `<css-type>`, the single top-level colon introduces the default, per CSS Functions & Mixins L1 §3.1 |
| `src/parsing/serialize.ts` | mirror serializer fix (`:132-140`): emit `name <syntax>: <default>` — whitespace before the css-type, colon before the default |
| `test/grammar-2026-atrules.test.ts` | rewritten off the buggy canon (the old assertions had codified the garbage as canon); +6 adversarial vectors (31→37) |
| `test/round-trip.test.ts` | comparison helper re-keyed `type→syntax`, `defaultValue→default` (`:124-126`) |
| **`test/parsing-extract-functions.test.ts:36`** | **the 5th file (head-only, added `23d1a91`)**: the `.type` read on the buggy-canon input `--x: <number>` — becomes `.default === "<number>"` (under the corrected grammar, colon introduces the default) **or** correct the input to the spec form `--x <number>` and assert `.syntax === "<number>"` |

**Carry to head (M2)**: the patch applies cleanly at `e80b359` — the 4 touched files are byte-identical across `15b0382..e80b359` (verified twice). Head-measured (`kf1-grammar.md §4`): clean head **1934/51 files**; patched **1939 passed / 1 failed / 1940** — the single failure IS the 5th file, so the complete 5-file change lands **1940/1940**. `tsc -p tsconfig.lib.json` exit 0; `demo/`+`api/` reference neither renamed field (grepped).

**Gate vector (binding)**: `--x <length>: 0px` → `{name:"--x", syntax:"<length>", default:"0px"}`.

The pass-1 "record `{type,defaultValue}` as canonical" fallback is **struck** (it would canonize a spec-violating parse). Q5 = defect fix; Q6 = bundle into one 2.0.0 — both closed on the record.

### 3 · `extractFunctions` fresh-build `.d.ts` regression assertion (M1 — trivial)

The symbol is in source since 1.1.0 (`23d1a91`): `src/parsing/extract.ts:124`, re-exported at `src/index.ts:291` + `src/subpaths/parsing.ts:47`; a fresh build **keeps** it — nothing to restore (the pass-2 "dist-only" finding was a stale-worktree artifact). Land a **trivial assertion** that the walker is present in the published `.d.ts` — a cheap lock against future barrel drift, rideable on any R.W1 test pass. NOT blocking the KF-1 letter.

### 4 · `bezierPresets` rows (easing-disposition riders; the R.W4 migration's numeric floor)

- **R-2 (required)**: add `"smooth-step-3": [1/3, 0, 2/3, 1]` to `bezierPresets` (`src/easing.ts:334-373`) — **EXACT** (maxΔ 0.0000 over 2001 samples; the Hermite ⅓-handle identity); completes **24/24** name preservation for the R.W4 EasingPicker consume. One line; flows into the picker's preset menu through the externalized import with zero glass-ui work.
- **R-3 — Q12 RATIFIED 2026-07-03** (rides this wave): tighten the 15 approximated rows to the easings.net + exact-⅓-handle table (`easing-disposition.md §1.4` right column) — converts the R.W4 migration's worst case from **2.9× JND to sub-JND** (0.1923→0.0387 max deviation); 4 rows become exact. Blast radius: no in-tree consumer reads the changed rows (`timingFunctions` reads only the unchanged `ease`×4 + `back`×3, `easing.ts:495-501`; kf does not import `bezierPresets`; bbnf-buddy reads name-membership only and is semver-fenced at `^0.10.0`). Behavior-visible on a published export → **rides this major**. Declining leaves a recorded 2.9×-JND worst case on circ/expo.

(Q12's R-4 half — steps mode in gradient intervals — is R.W4's, RATIFIED same row; it costs nothing here.)

### 5 · Boundary API (`boundary-api.md`, verbatim — the R.W3 instrument's math)

New **`src/units/color/boundary.ts`** (~190 LoC) exporting exactly two functions + four types:

```ts
export type GamutBoundaryTarget = "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020";
export type GamutBoundaryMode = "jnd" /* default — the perceptual ΔE>JND locus */ | "raw";
export interface SampleGamutBoundaryOptions { columns?: number /* int ≥2, default 96 */; mode?: GamutBoundaryMode; }
export interface GamutBoundary { points: Float64Array /* interleaved [s,v] unit-square polyline */; count: number /* 0 ⇔ plate-clear */; oogTopFrac: number; }
export function sampleGamutBoundary(hueDeg: number, target: GamutBoundaryTarget, options?: SampleGamutBoundaryOptions): GamutBoundary;
export function sampleGamutBoundaryInto(hueDeg: number, target: GamutBoundaryTarget, out: GamutBoundary, options?: SampleGamutBoundaryOptions): GamutBoundary;
```

- **Into discipline**: `sampleGamutBoundaryInto` = **0 allocations/call** (the `color2Into`/`mixColorsInto` idiom); the allocating form performs exactly 2 (result object + Float64Array) and is a 4-line veneer. Requires `out.points.length ≥ 2·(columns+2)` — RangeError otherwise.
- **Two `gamut.ts` companions**: `srgbToOKLabInto`, `gamutMapOKLabInto` (module-scoped cusp scratch; byte-identical math; no signature churn on existing exports) — **kept out of the barrels** until a public consumer is named.
- **Matrix visibility**: the per-space RGB↔XYZ matrices become **package-internal exports** of `conversions/xyz-extended.ts` (`XYZ_RGB_MATRIX:52`, `DISPLAY_P3_XYZ_MATRIX:88`, `ADOBE_RGB_XYZ_MATRIX:96`, `PROPHOTO_XYZ_D50_MATRIX:104`, `REC2020_XYZ_MATRIX:112`) — in **no barrel**. `conversions/index.ts` uses explicit named exports (verified at pass 3 — the leak risk is closed by inspection, `SYNTHESIS-v2.md §13` residual-2).
- **Edge semantics**: non-finite `hueDeg` → empty boundary (defined, not accidental); `count = 0` ⇔ plate-clear, **no NaN sentinels**; finite hues wrap mod 360; `columns` non-integer or <2 → RangeError.
- **Perf contract**: mean **0.20–0.25 ms** at 96/jnd/display-p3; p95 ≤ 0.4 ms; **contract ceiling 0.5 ms**; 4× CPU throttle stays inside the <2 ms overlay budget. Bench entry **`bench/gamut-boundary.mjs`**; the number goes in R/FINAL.md — **no standing threshold script** (the retired-`proof:*` discipline).
- **Test plan** (`test/gamut-boundary.test.ts`, per `boundary-api.md §8`): goldens **seeded** from the α=0.05 F3 fractions with ±0.03 tolerance, **regenerated post-α, then locked at 1e-3** (display-p3 h0 ≈0.747 / h300 ≈0.827 / h60 ≈0.219 / h240 count=0; rec2020 rows; a98+prophoto net-new); the 8-point property suite (shape · root truth · consistency · monotonicity bound · Into/allocating parity · companion parity over a 500-sample deep-OOG corpus · edges incl. the jnd-empty/raw-non-empty pair at display-p3/240 · barrel/subpath resolution with matrices/companions **absent** from the export set).
- **Barrels**: the two functions + four types ride `src/subpaths/color.ts` + `src/index.ts`.

### 6 · The perceptual slate (each independent; any order after item 1)

- **OKHSL/OKHSV** — fixes the documented HSV low-chroma hue drift; reuses `gamut.ts` cusp math.
- **ΔE-2000 + ΔE-ITP** — pure functions; unblocks quantize dedup (ΔE-ITP shares math with the deferred R-6 Jzazbz/ICtCp spaces).
- **K-DISP** — `dispatch.ts` hue-cluster → `src/units/color/mix.ts` real decomposition (the chronic K→M→N.W6→R modern-web carry, library-structural half).
- **`/easing` export-stability guard** — a test asserting the 5 exports glass-ui's `/easing` composes: `CSSCubicBezier` (`src/easing.ts:164`), `steppedEase` (`:293`), `bezierPresets` (`:334`), `jumpTerms` (`:266`), `parseSteps` (`src/parsing/easing.ts:133`). (KF-3.)
- **`Color.try()`** — only if trivial; else BOOK it (books-never-gates).
- **R8-24 `<syntax>` validator row** — verified shipped in 1.2.0; **closed**, no work (recorded here for zero-drop traceability).

### 7 · Publish 2.0.0 + dispatch the two letters

The major is carried by the **field rename** (unambiguous BC break on a published descriptor) + the **gamut-policy output change** + the **preset-row tightening** — semver honesty (the keyframes-2.2.0 lesson): one clean major, not euphemistic minors dragging a lingering shim. Then:

- **The kf KF-1 letter** (`SYNTHESIS-v2.md §9`): kf deletes `normalizeParam` + `NormalizedParam` + `VJS_PARAM_BUG_MAX` (every recovery arm maps to a direct field read — `kf1-grammar.md §5`'s case map), simplifies `coerceArg`'s bug arm, re-pins `^2.0.0`, reads `.name`/`.syntax`/`.default` directly. The S7 lifecycle completes.
- **The glass-ui peer-floor note** (`§8.6`): glass-ui's peerDependencies floor is currently `^1.0.0` (verified) and must ride to `^2.0.0` at this cut; RECORD the `/easing` 5-export contract (guarded here by item 6's test); note `bezierPresets` gains a row + 15 tightened rows that flow into `EasingPicker` through the externalized import with zero glass-ui work.

---

## §Hard gate (verbatim per SYNTHESIS-v2 §3 R.W1)

§13.2 oracle suite green vs browser refs; tiered-bound guard row green (`ΔL < 0.09` on the `C∈{0.37,0.40}` corpus); KF-1 gate vector green (`--x <length>: 0px` → `{name:"--x", syntax:"<length>", default:"0px"}`); `extractFunctions` present in a **fresh-build** `.d.ts`; boundary goldens locked post-α; full vitest green (head expectation: **1940+/1940+** — the 5-file KF-1 lands clean); 2.0.0 published; both dispatch letters written.

## §BOOKS opened/serviced by this wave (books-never-gates)

- **parse-that `^1.0.0` re-pin** — fires on kf S.H2's cut; do not pre-pin (KF-2).
- **S.H3 Pratt consume-edge** — design review when parse-that presents the sketch; `math.ts` calc() is the ratifying consume-edge (KF-6).
- **`Color.try()`** — if item 6 finds it non-trivial.
- KF-5 (parse-that S.H1 packrat) — no action; transparent win at the next re-pin.

## §Evidence packets consumed

`audit/pass2/gamut-bound.md` (the Q7 costing + probe-v2) · `audit/pass2/kf1-grammar.md` (the fix + head re-run + kf case map) · `audit/pass2/seeds/kf1.patch` · `audit/pass2/boundary-api.md` (the verbatim API packet) · `audit/pass2/easing-disposition.md` (§1.4 table + riders) · `PASS3-VERDICT.md §1` (the 5-file amendment).

## §Hand-off

R.W3 consumes the published `sampleGamutBoundary`/`Into` from `@mkbabb/value.js/color` (the demo owns paint, never math). R.W4 consumes the preset rows via glass-ui's `EasingPicker` (externalized import). kf consumes the KF-1 letter (kf-owned; the re-pin is kf's act). glass-ui consumes the peer-floor note at its next manifest touch.
