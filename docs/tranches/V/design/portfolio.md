# V — ROUND-ZERO PORTFOLIO (the ground survey + the approach-family portfolio)

**Pass 0 · minted 2026-07-13 · author: round-zero portfolio minter (Fable-orchestrated campaign).**
This document is the survey of record (Act 1) + the minted approach families (Act 2). It seeds
every later pass. The registry lives in `DESIGN-CAMPAIGN.md §3`; this doc carries the reasoning.

---

# PART A — THE GROUND SURVEY (Act 1, quantified)

## A1 · demo/ (D1 surface) — the ACTUAL tree shape

- **Scale**: 214 non-vendored source files (124 `.ts`, 90 `.vue`, 7 `.css`); ~29.9k LoC. Vendored
  shadcn-vue tree (`demo/@/components/ui/`) = **21 files, FENCED** (excluded from god-module + colocation rules).
- **The `demo/@/` root** holds 6 dirs: `components/ composables/ lib/ router/ styles/ utils/`. The
  `@` is a physical directory *and* an alias root — this is the abrogation target.
- **Depth profile** (dirs below `demo/`): most mass at depth 4–5; **2 dirs at depth 7** (the deepest
  colocation already exists, e.g. `color-picker/controls/ComponentSliders/composables/`).
- **Colocation is PARTIALLY landed already**: many components ARE feature-dirs with local
  `composables/` (gradient/, dock/, image-palette-extractor/, palette-browser/card/, ComponentSliders/,
  SpectrumCanvas/). The edict is ~60% satisfied at the leaf; the failure is at the **globals**.

### Alias / `@` census (the abrogation blast radius)

| alias | tsconfig.demo path | import sites (demo) |
|---|---|---|
| `@components/*` | `demo/@/components/*` | 152 |
| `@lib/*` | `demo/@/lib/*` | 85 |
| `@composables/*` | `demo/@/composables/*` | 78 |
| `@utils/*` | `demo/@/utils/*` | 6 |
| `@styles/*` | `demo/@/styles/*` | (CSS `@import` + a few) |
| `@assets/*` | `assets/*` | few |
| `@src` | `src/` (SURVIVES — vitest + `?source` snippets only; T.W1 retired `@src/*` demo imports) | 0 demo product imports |
| `@mkbabb/value.js[/subpath]` | `dist/*.d.ts` (8-key closed set) | 253 (incl. vueuse/lucide) |

Runtime aliases mirror tsconfig in `vite.config.ts` (array-form `@rollup/plugin-alias`). Net **~321
`@components|@lib|@composables|@utils` import sites** to rewrite for full `@` abrogation.

### Concrete colocation violations (globals that should colocate — 8 exemplars)

`demo/@/composables/color/` (18 files) is the worst offender: it is a global bucket, but per-file
consumer analysis shows most files serve ONE feature. Placement should be **derived from consumer set**:

| composable (global today) | consumers (feature areas) | verdict |
|---|---|---|
| `keys.ts` | 6 areas (color-picker, dock, image-palette, markdown, palette-browser, panes) | STAYS global (kernel) |
| `useContrastSafeColor.ts` (376 LoC) | 6 areas | STAYS global (kernel) |
| `ink.ts` | 4 areas | STAYS global-ish |
| `aurora-atoms.ts` | 1 (panes) | → colocate into panes/ |
| `view-accent.ts` | 1 | → colocate |
| `useColorPersistence.ts` | 1 (lib/palette) | → colocate |
| `generate-color.ts` | generate/ only | → colocate into generate/ |
| `useColorPipeline.ts` (373 LoC) / `useColorParsing.ts` / `valueDomain.ts` | color-picker cluster | → colocate into color-picker/ |

Same pattern: `composables/palette/` (12 files) — `usePaletteManager` (21 consumers) is a true global;
`usePaletteExport`/`usePaletteStore` are near-global. `styles/` (5 files incl. **`style.css` @ 55 KB**,
a god-sheet) is a global cascade home — glass-ui's law says single-owner sheets colocate, cross-family
registers stay global; `style.css` needs a cohesion carve.

### demo god-modules / long dirs
- Files ≥400 LoC (soft-cap breaches): `GradientStopEditor.vue` (438), `ColorPicker.vue` (420),
  `Markdown.vue` (408). None over the 500 hard ceiling — demo is disciplined at the file level.
- **`panes/` = 16 flat files, 2009 LoC** — the exemplar "long dir must break into common modules"
  (BrowsePane/GeneratePane/GradientPane/… each a pane; `PaneHeader`/`PaneSlot`/`PaneSegmentedControl`
  are the shared chassis → a `panes/chassis/` sub-module).

## A2 · api/src (D2 surface) — ALREADY the exemplar

**Finding: api/ is ~90% aligned to the edict already.** It is **vertically module-sliced** (NOT
horizontally layered): `api/src/modules/{palette,session,admin,color,meta}/{routes,service,repository,__tests__}`
+ `api/src/platform/{db,http,cache,migrations,text}` (the infra ring). Tests are **colocated** in each
module's `__tests__/`. 110 files, ~10.8k LoC. Largest file 325 LoC (`palette/service/crud-list.ts`) —
**no file breaches the 350-LoC L-tranche ceiling.**

Boundary discipline **holds by measurement**: `0` routes import repositories directly; `0` ad-hoc
`c.json({ error })` (all typed `ApiError`). This IS glass-ui's "domain package named by domain, by-purpose
segments" law — already realized.

### Structural frictions (4 exemplars — the only D2 work)
1. **Segment vocabulary divergence**: value.js uses `routes/ service/ repository/`; glass-ui's backend
   law uses `api/ model/ lib/`. Constellation-alignment forces a decision (rename vs keep the L-tranche
   layering — see Family CONSTELLATION-CONFORM failure mode).
2. **`platform/` vs glass-ui `core/`/`integrations/`**: naming of the infra ring differs.
3. **Thin modules**: `color/` (146 LoC across 3 dirs), `meta/` (274) may be over-segmented for their
   substance (the T4 "segment appears only with real members" test).
4. **`__tests__/` naming**: constellation convention may prefer `*.test.ts` root-siblings vs `__tests__/`.

## A3 · src/ (D3 surface) — the library complexity centers

### Per-dir file count + LoC
| dir | files | LoC | note |
|---|---|---|---|
| `src/` (root) | 5 | 1507 | index/math/easing/utils/vite-env |
| `parsing/` | 6 | 2364 | + 3 clustered subdirs |
| `parsing/color/` | 4 | 1020 | `color.ts` = 754 (largest file in repo) |
| `parsing/stylesheet/` | 5 | 1380 | |
| `parsing/timeline/` | 3 | 1025 | `scroll-timeline.ts` = 658 |
| `units/` | 8 | 2868 | |
| **`units/color/`** | 13 | 3998 | **the complexity center** |
| `units/color/conversions/` | 12 | 1800 | 10 `{from}2{to}` modules + matrices + barrel |
| `units/color/gamut/` | 5 | 1576 | gamut/raytrace/boundary/okhsl |
| `transform/` | 2 | 1165 | decompose (603) + path (562) |
| `quantize/` | 3 | 597 | |
| `subpaths/` | 7 | 516 | the 7 tree-shake barrels |
| **TOTAL** | **73** | **19,816** | |

### The complexity centers
- **The color system** (`units/color/**` = ~7.4k LoC across 3 clusters + `parsing/color/` 1020) is the
  gravitational mass: 17 spaces, `conversions/` (10 focused modules, 19 DIRECT_PATHS in `dispatch.ts`),
  `gamut/` (Ottosson analytical + raytrace + boundary + okhsl). Owner's "grown dramatically" lives here.
- **Parsing** (`parsing/**` = ~5.8k LoC): 6 core + 3 clusters. `parsing/color/color.ts` (754) is the
  single largest file.

### God-modules (>500 raw LoC — glass-ui's hard ceiling) across src/
14 files breach: `parsing/color/color.ts` (754), `parsing/timeline/scroll-timeline.ts` (658),
`parsing/index.ts` (644), `parsing/stylesheet/stylesheet.ts` (643), `easing.ts` (643),
`units/style-names.ts` (641, pure-data-manifest → exempt class), `units/color/gamut/boundary.ts` (604),
`transform/decompose.ts` (603), `parsing/utils.ts` (603), `units/utils.ts` (601), `transform/path.ts`
(562), `units/color/dispatch.ts` (558), `parsing/math.ts` (536), `units/color/gamut/gamut.ts` (526).

### Barrel-purity violations (the highest-value glass-ui-law finding)
`src/**/index.ts` audited for own-exports mixed with re-exports (glass-ui §2.1: barrels are
PURE RE-EXPORT-ONLY; own runtime → kind-named sibling):

| barrel | own exports | re-exports | LoC | verdict |
|---|---|---|---|---|
| `src/index.ts` | 23 | 36 | 492 | MIXED + near-god — carve own defs to siblings |
| `src/parsing/index.ts` | 11 | 0 | 644 | **NOT a barrel — a god-impl-file named index.ts** |
| `src/units/index.ts` | 5 | 0 | 451 | **impl-file (ValueUnit/FunctionValue/ValueArray) named index.ts** |
| `src/parsing/stylesheet/index.ts` | 2 | 2 | 39 | MIXED |
| `src/units/color/index.ts` | 3 | 4 | 75 | MIXED |
| `subpaths/*.ts` (7) | 0 | pure | — | CLEAN (the model) |

`sideEffects` is declared array-form (`["./demo/**","**/*.css"]`) — good. The subpath barrels are
already pure; the internal `index.ts` files are the divergence.

### D3 parsing-VALIDATION surface (from keyframes.js — the "buggies & goblins", see A6)
The library's parse surface is **partially hardened**: VJ-Q1/Q2/Q3/Q4/Q6/Q7/Q8/Q9, VJ-L3, VJ-F1/F2/F4/F6
have landed. But:
- **No grammar-fuzz gate** exists (only `proof-serialize-fidelity` + `proof-lib-correctness` cover a
  fixed corpus).
- **Diagnostics plumbing (VJ-F2) landed in `parsing/utils.ts`** (`ParseDiagnostic`, `OnParseError`,
  `enableDiagnostics`) but **`parseCSSValue`/`parseCSSStylesheet` do NOT thread it to their public
  signatures** — so kf's `parseable:true` false-positive (bug #9) is still effectively open at the
  public API.
- **`PropertyDescriptor` type-name collision (#11)** still OPEN (`stylesheet-types.ts:33` still exports
  `PropertyDescriptor`, colliding with the DOM/TS-lib global; clean-break rename to `CSSPropertyDescriptor`).

## A4 · repo hygiene (D4 surface) — the litter census

| item | finding | owner disposition |
|---|---|---|
| **root PNG litter** | **39 loose `*.png`, ~20 MB, ALL UNTRACKED** (gitignored/unadded) | DELETE (pure litter) |
| `.lighthouseci/` | untracked artifact dir | DELETE/gitignore |
| **stale worktrees** | `git worktree list` = 2: main + `.claude/worktrees/wf_c072f8ee-d1e-3` (a U.W-PERF workflow tree) | prune the finished workflow tree |
| **`plugins/`** | 2 files: `vite-defer-glass-fonts.ts`, `vite-source-export.ts` | owner: DELETE ENTIRELY — but BOTH are live vite plugins wired in `vite.config.ts` (`sourceExportPlugin`, font-defer). **NOT worthless — verify wiring before delete; likely relocate into `scripts/` or inline, not a bare `plugins/` dir.** |
| **`scripts/`** | `ci/ deploy/ dev/ fonts/ gates/ .dev/` | owner: dev + deploy.sh survive; classify rest below |
| **`bench/`** | 11 `.mjs` benches, mtimes May–Jul; several stale (color-channel-access May 20, color2-direct-paths May 26) | owner: "most out of date/spec" — re-anchor or delete per-bench |
| **`docs/`** | `.DS_Store` present; `colors/ frontend-design/ instructions/ precepts/ tranches/(A..V)` | prune `.DS_Store`; audit staleness (A..U closed tranches are records, keep) |

### scripts/ classification
- **SURVIVE (owner-named)**: `scripts/dev/dev.sh` (the full-stack boot), `scripts/deploy/deploy.sh`
  (+ `deploy-hook.sh` — verify still used).
- **`scripts/ci/`**: `boot-smoke.mjs` (KEEP — inv-N-1 boot-truth, 5 CI refs), `abrogation-sweep.mjs`
  (KEEP-conditionally — glass-ui-pin drift guard), `css-emission-probe.mjs` (2 CI refs — evaluate),
  `oracle-slate-teeth.mjs` (G-ORACLE-1 CI-config assertion — **overfit candidate**, T-era artifact).
- **`scripts/fonts/build-fraunces-tnum.py`**: a one-shot font-build tool — relocate/document or delete.
- **`scripts/.dev/logs/`**: dev log scratch — gitignore/delete.

### Gates classification (owner: "vast majority overfit nonsense")
`test:dist` currently chains **10** gates (Q13 retained 5 behavioral; the set has RE-GROWN to 10):

| gate | in test:dist | verdict | reason |
|---|---|---|---|
| `proof-css-parity` | ✓ | **KEEP** | Q13-retained behavioral (browser CSS parity) |
| `proof-round-trip-idempotent` | ✓ | **KEEP** | Q13-retained (parse→toString) |
| `proof-perf-target` | ✓ | **KEEP** | Q13-retained (frame budget) |
| `proof-serialize-fidelity` | ✓ | **KEEP** | Q13-retained (+ covers kf bug corpus) |
| `proof-subpath-budget` | ✓ | **KEEP** | Q13-retained (parse-that-free/bundle floor) |
| `proof-lib-correctness` | ✓ | KEEP-ish | broad correctness — may absorb others |
| `proof-dts-surface` | ✓ | evaluate | U-F43 `.d.ts` surface (recent) |
| `proof-barrel-parity` | ✓ | **OVERFIT candidate** | barrel/subpath regression guard — narrow |
| `proof-pack-manifest` | ✓ | evaluate | tarball ships lib-not-demo (thin, cheap) |
| `proof-close-ledger` | ✓ | **OVERFIT candidate** | 300 LoC "zero-silent-drop CLOSE contract" — tranche-ceremony, not correctness |
| `proof-size-graph` | (CI only) | evaluate | standing size-budget regression |

Net D4-gates read: **5 behavioral KEEP (Q13), 2 clear OVERFIT candidates (`barrel-parity`,
`close-ledger`), 3 to evaluate.** A `proof:grammar-fuzz` may be the ONE gate D3 wants to ADD (the
owner's cull is against overfit ceremony, not against a real correctness corpus).

## A5 · CROSS-CUT — glass-ui BH/BI: the constellation convention — CODIFIED + AUTHORITATIVE, PARTIALLY EXECUTED (READ-ONLY)

**Corrected framing (verified against disk).** glass-ui's convention is **codified and authoritative**
but only **partially executed** — it is a standard value.js can adopt NOW, not a fully-landed tree to copy.

- **demo/ restructure LANDED at 5.0.0**: `App.vue` / `main.ts` / `router.ts` + `shell/` `chassis/`
  `configurator/` `eggs/` + `stories/<category>/<id>/index.vue`. This IS the real landed referent for D1.
- **src/ flatten NOT landed**: `components/` still splits `ui/` + `custom/`; `subpaths/` + `api/` + the
  7 flat feature-module barrels (`carousel.ts`, `motion.ts`, `sidebar.ts`, …) coexist with the un-flattened
  component tree. The pure-flat **91-peer namespace** target rides glass-ui's BI as a **5.1.0** cut. So on
  src-class surfaces glass-ui has SPECIFIED but not EXECUTED — value.js aligns to the SPEC, not a tree.
- **There was NEVER a physical `@` dir in glass-ui**: `@glass` was a tsconfig/vite/vitest **ALIAS** added
  as a transitional depth-decoupler (the **B2.0 codemod, 719 rewrites**), then SUPERSEDED by pure-relative
  imports (`dropSegment`) + gate **G10 `proof:no-glass-in-dist`** banning alias leakage into dist `.d.ts`.
  **Contrast with value.js**: value.js's `@` is a PHYSICAL directory (`demo/@/`) AND an alias root — so
  value.js's abrogation is HEAVIER (physical `git mv` + alias removal), where glass-ui's was alias-removal
  only. glass-ui's mechanism (alias → codemod → pure-relative → leak-ban gate) is the template.

### The codified law — `glass-ui/docs/tranches/BH/spec-structure/STRUCTURE-SPEC.md` (§0–§6 = LAW)
- **§0.1** — ONE standard for component/module structure covering BOTH frontend and backend, whole constellation.
- **§0.2** — "Aristotelian proportion is the divining rod" (needless encapsulation AND god-modules are both vices).
- **§0.3** — "**Colocation, recursively.** A component lives WITH its sub-components, composables,
  skeletons, constants, styles, shaders, README — recursing for nested components. Only truly
  module/global-level kin live in a shared home."
- **§0.4** — "Long-running dirs ALWAYS break into common modules, encapsulated befittingly."
- **§0.5 quick-reference (the whole law)**: (1) the unit is the component/domain FOLDER with an
  `index.ts` barrel; (2) colocate by default, promote to shared home only when EARNED (≥2 UNRELATED
  families — T3); (3) **>500 raw lines = god-module** (~300 soft), only shader-literal + pure-data-manifest
  exempt; (4) a segment dir holds files not other segment dirs, appears only with ≥2 members OR a
  genuinely separable concern (T4); (5) a nested sub-component with its own `index.ts` RESETS the depth
  budget (≤5 dirs below nearest feature root — T2); (6) cross-family imports go through the BARREL,
  never into another component's guts; barrels are **PURE RE-EXPORT-ONLY**; (7) the divining rod runs
  both ways — FOLD an over-abstracted single-owner leaf, PROMOTE a buried multi-family primitive OUT;
  (8) location and publish-surface are ORTHOGONAL.
- **The own-runtime-sibling rule (§2.1)**: when a barrel would mix an own runtime export with
  re-exports, the own export moves to a **kind-named sibling** re-exported via `export * from`:
  CVA→`variants.ts`, Pinia→`store.ts`, bare consts→`constants.ts`, any other own-runtime cluster→`runtime.ts`.
- **Backend law (§5.1)**: domain/feature PACKAGE named by DOMAIN not layer; by-PURPOSE segments
  `api/ model/ lib/`; "**Reject layer-by-type of DOMAIN LOGIC**" (a routes/services/repositories scatter
  → born-RED; a data/type/schema registry → WARN only); no `utils.ts`/`helpers.ts` grab-bags;
  `pipelines/` (orchestration) ≠ `core/` (infra) ≠ `integrations/` (external adapters).
- **Enforcement idiom (§0.5.12)**: every structural gate is a device-free `proof:*` born-RED script
  with self-test bites, NEVER ESLint.

### The BH proof:* gate battery (the enforcement value.js can mirror)
`proof-backend-structure`, `proof-barrel-cycle`, `proof-colocation-globality`,
`proof-css-colocation-golden`, `proof-css-ownership`, `proof-depth`, `proof-import-boundaries`,
`proof-no-tier-literal`. + the three reusable dispatch prompts: **`RESTRUCTURE-FRONTEND.md`**,
**`RESTRUCTURE-BACKEND.md`**, **`LEGACY-EXCISION.md`**.

### The spec of record + the gate set
- **Plan of record**: `BH/spec-structure/STRUCTURE-TRANCHE-PLAN.md` + `STRUCTURE-SPEC.md` at **round-6**,
  which OVERRODE the earlier "keep `ui/`+`custom/` split" recommendation → a **pure-flat 91-peer
  namespace** target. Additional binding rules: the **T4 earned-dir rule** (the 2nd artifact of a kind
  earns the dir — a lone helper stays a root sibling), **colocate-iff-single-owner styles**, **generated
  fail-CLOSED exports** (the exports map is derived from disk, never hand-curated), and the **500-raw-line
  god-module ceiling**.
- **The born-RED structural gate set G1–G10** (device-free `proof:*` scripts, NEVER ESLint), incl.
  **G10 `proof:no-glass-in-dist`** (alias-leak ban). This is the enforcement battery value.js can mirror.

### BH vs BI scope
- **BH** = authored the standard (STRUCTURE-SPEC → precepts) + the cleanup toolkit + the G1–G10 gates +
  the `RESTRUCTURE-FRONTEND/BACKEND` + `LEGACY-EXCISION` prompts; its own bands did the 5.0.0 cleanup +
  the demo restructure + the `@glass` alias→relative migration.
- **BI** = "the reformation" — carries the src/ flatten + export-reshape as a **5.1.0** minor (the
  deferred program). Most of BI's ~90 waves are design/visual; structure is one band.

### A5.1 · plan-vs-execution divergences (5 documented; biggest first)
1. **The src/ flatten + export-reshape was DELIBERATELY DEFERRED off the 5.0.0 cut** — the
   atomic-transaction-vs-publish risk (a mass export-surface reshape can't be both atomic and
   safely-published in one cut). This is the load-bearing divergence: the standard is proven on demo/,
   NOT yet on src-class surfaces. (Directly informs Family 1's leverage/hazard poles.)
2. `@glass` alias planned as the end-state → SUPERSEDED by pure-relative + the G10 leak-ban gate (the
   alias was transitional, not terminal).
3. round-6 OVERRODE the round-≤5 "keep ui/+custom/ split" → pure-flat 91-peer (the plan changed mid-flight).
4–5. [additional two divergences documented in BH; consume the survey sub-agent's transcript for the
   exact pair — not load-bearing for the portfolio's centers.]

### Inbox / coordination dirs (EXIST — value.js must NOT write there)
`glass-ui/docs/tranches/BH/coordination/` + `glass-ui/docs/tranches/BI/coordination/` hold the live
value.js inbox letters. value.js writes only its own tranche coordination dir + path-scoped single-file
relays; this survey wrote nothing.

## A6 · keyframes.js parseCSSValue bug catalog (the D3 "buggies & goblins" corpus)

The most recent kf tranches (U > T > Q) track value.js parse defects under a `VJ-*` namespace (the
`KF-TO-VALUEJS-{P,Q,T,U}.md` dispatch letters). The enumerated classes — the D3 regression corpus:

| # | class (VJ id) | trigger input | status in value.js |
|---|---|---|---|
| 1 | **parseCSSValue multi-fn truncation** (VJ-L3) | `scale(2) rotate(45deg)` drops `rotate` | FunctionArgs-first landed (VJ-L3) — verify |
| 2 | **serialize round-trip infidelity** (VJ-Q9) | `oklch(0.6 none 200)`→`NaN`; `color(display-p3 1 0 0)`→wrapper-loss | VJ-Q9 landed — verify corpus in gate |
| 3 | **@function colon-split + self-consistent-garbage round-trip** (KF-1) | `--x <length>: 0px` mis-split; serializer mirrors garbage so idempotence looks GREEN | fixed @2.0.0 |
| 4 | **dashed-function call rejection** (VJ-Q6) | `--double(2)` not a FunctionValue (`scanIdentFast` rejects `--`) | VJ-Q6 landed — verify |
| 5 | **if() multibranch lossy collapse** (VJ-Q7) | 3-branch `if()` → 2 branches | VJ-Q7 landed — verify |
| 6 | **contrast-color() opaque passthrough + dead grammar stub** (VJ-Q1) | `contrast-color(red)` unresolved | FIXED (eager resolve at `color.ts:398`) |
| 7 | **flattenObject provenance drop** (VJ-Q4/L1) | `FunctionValue.name` lost on flatten → wrong identity-element lerp | VJ-Q4 landed — verify clone preserves |
| 8 | **unflatten ValueUnit array-boxing → NaN** | unitless `1.5` arrives as `ValueUnit[]` | kf-U finding — verify seam |
| 9 | **NO diagnostics channel → `parseable:true` false-positive** | malformed decl partially parses, reported valid | **plumbing landed (VJ-F2) but NOT wired to public `parseCSSValue`/`parseCSSStylesheet`** — effectively OPEN |
| 10 | spring `linear()` serialize asymmetry (VJ-L2) | synthetic flat-comma form parser never re-consumes | fixed @3.1.0 |
| 11 | **`PropertyDescriptor` type-name collision** (KF-7) | collides with DOM/TS-lib global → API-Extractor mangles | **OPEN** (`stylesheet-types.ts:33`) |

**The D3 validation blueprint kf recommends**: (1) diagnostics-bearing parse (`{ast, diagnostics}` or
`onParseError` on the PUBLIC surface); (2) round-trip idempotence gate against a browser/spec oracle NOT
self-consistency (the KF-1 lesson — a self-consistent garbage loop looks green); (3) a **grammar-fuzz
corpus** seeded with the exact known-broken inputs as auto-flipping tripwires; (4) per-invariant born-RED
gates keyed to a concrete probe; (5) FunctionArgs-first composition; (6) narrow `any` seams so `tsc`
catches misuse. **Key insight (EN-a)**: a self-round-trip oracle is BLIND to spec-invalidity — only a
browser-actuated parse catches a browser-dead emission.

---

# PART B — THE APPROACH-FAMILY PORTFOLIO (Act 2)

Six genuinely-orthogonal families, each a full stance on the WHOLE problem (D1..D4), each with a distinct
architectural CENTER / substrate / decomposition. The primary orthogonality axis is **"what the structure
is DERIVED FROM"** (external-convention / import-graph / feature-ownership / type-ontology / cost-function);
two families are distinguished on the **execution-style axis** (strangler-by-gate vs big-bang-codemod),
which the charter names explicitly. Where families compose (a shape-family × an execution-family), that is
noted honestly — but each stands alone as a complete answer.

---

## Family 1 — CONSTELLATION-CONFORM (adopt glass-ui's landed STRUCTURE-SPEC as the value.js standard)

**Center / substrate**: an EXTERNAL RATIFIED CONVENTION. value.js does not invent a structure — it
imports glass-ui's landed `STRUCTURE-SPEC.md` (§0–§6) as its own law, ports the applicable subset of the
`proof-*` structural gates, and runs the `RESTRUCTURE-FRONTEND/BACKEND` + `LEGACY-EXCISION` dispatch
prompts. Structure is derived from what the constellation already agreed.

- **D1**: kill `@` via glass-ui's mechanism (alias→codemod→pure-relative + a G10-style dist-leak-ban
  gate) — but note value.js's `@` is a PHYSICAL dir, so D1 is a `git mv` flatten + import rewrite, heavier
  than glass-ui's alias-only drop. Target the 5.0.0-landed demo shape (`App.vue`/`main.ts`/`router.ts` +
  `shell/`/`chassis/`/`stories/<cat>/<id>/`); apply `RESTRUCTURE-FRONTEND` + `proof-colocation-globality`.
- **D2**: apply `RESTRUCTURE-BACKEND`. **Tension**: glass-ui's backend segments are `api/ model/ lib/`;
  value.js's are `routes/ service/ repository/` (the clean L-tranche boundary). Conforming means either
  renaming to glass-ui's vocabulary OR ratifying value.js's as an accepted per-language variant.
- **D3**: adopt the 500-line ceiling + the PURE-RE-EXPORT-ONLY barrel rule + own-runtime-sibling
  convention (carve `src/index.ts`/`parsing/index.ts`/`units/index.ts`); port `proof-barrel-cycle`,
  `proof-depth`. Parsing validation via the born-RED `proof:*` idiom.
- **D4**: mirror glass-ui's cull (lane-alpha junk / lane-beta legacy categories); port `proof:*` gate
  discipline (device-free born-RED, never ESLint).
- **Severest failure mode**: **convention mis-fit / conformance-for-its-own-sake.** glass-ui is a Vue
  component library; value.js is a pure TS parsing/color library with NO `.vue`. Whole sections of the
  frontend law (`views/`, SFC colocation, CVA `variants.ts`, `store.ts`) are inapplicable. Forcing
  glass-ui's `api/model/lib` over value.js's proven `routes/service/repository` boundary could DAMAGE a
  clean, measured-passing boundary to satisfy a cosmetic vocabulary match.
- **Pass-1 research**: (a) which glass-ui `proof-*` gates are library-applicable vs UI-only; (b) is
  `api/model/lib` strictly better than `routes/service/repository` for a 9-collection Hono API, or is the
  L-boundary a ratified variant; (c) does the STRUCTURE-SPEC name a "library" profile distinct from
  "component library"; (d) exact cull-category list from lane-alpha/beta.
- **The partially-unexecuted-referent poles (must be stated)**: glass-ui's standard is proven on demo/
  but its src/ flatten + export-reshape was **deliberately deferred** to BI/5.1.0 (atomic-transaction-vs-
  publish risk). So value.js adopting it on src-class surfaces means **executing the constellation standard
  FIRST** where glass-ui itself has not. **LEVERAGE**: value.js becomes the proving ground and feeds a
  library profile back to the constellation. **HAZARD**: value.js inherits the exact risk glass-ui deferred
  for — a mass export-surface reshape of the 8-key `exports` map that cannot be both atomic and safely
  published in one cut; the standard is UNPROVEN on a pure-library/src surface. Name both when this family
  is scored.
- **BH/BI relationship**: **IS the alignment family** (the charter-mandated one). Aligns to the CODIFIED
  standard by construction; the open questions are (i) the applicability BOUNDARY (UI-law vs library-law)
  and (ii) whether to lead or follow glass-ui's own deferred src-execution.

## Family 2 — GRAPH-PROJECTION (structure = the measured import DAG; placement computed, not decreed)

**Center / substrate**: the static import dependency graph (madge / dependency-cruiser). The physical
tree is a PROJECTION of measured coupling: a single-consumer module colocates INTO its consumer; a
multi-consumer module floats to the nearest common ancestor; cycles are the enemy; 0-reachability =
dead code = deleted. Placement is a computed output, not a human decree.

- **D1**: demo colocation decided by the exact per-file consumer analysis (A1) — `aurora-atoms`→panes,
  `keys`/`useContrastSafeColor` stay at LCA (global). The 18-file `composables/color` bucket dissolves
  algorithmically.
- **D2**: verify api module DAG is acyclic; the boundary (routes→service→repository) IS a DAG assertion.
- **D3**: library complexity = cycle count + fan-in/out hotspots. Split a god-module where the graph
  shows two independent clusters (e.g. does `parsing/index.ts`'s 11 defs form 2 clusters?). `dispatch.ts`
  fan-in is the color-system hub.
- **D4**: dead-code culled by reachability (candidate 0-consumer files flagged in A1); litter is
  graph-invisible → delete.
- **Severest failure mode**: **graph-blindness to CONCEPTUAL cohesion.** The import edge is not the
  concept: a util imported everywhere floats to root and becomes a god-grab-bag (the exact anti-pattern
  glass-ui bans); two files that ARE one concept but share no edge get scattered. Also churns placement
  on every refactor (structure isn't stable).
- **Pass-1 research**: (a) does madge/dependency-cruiser give reliable single-consumer detection across
  the `@`-alias + subpath graph; (b) the true dead-code census (A1 flagged several 0-consumer
  composables — confirm via graph, not grep); (c) the cycle inventory in src/ and demo/; (d) fan-in
  ranking to name god-module carve lines.
- **BH/BI relationship**: **complements** the gates (glass-ui's `proof-barrel-cycle` IS a graph
  assertion) but **diverges on authority** — glass-ui decrees placement by human "divining rod" judgment;
  this family computes it. Risk: the computed answer contradicts the T3 "≥2 UNRELATED families" earned-
  promotion rule (graph counts edges, not family-relatedness).

## Family 3 — FEATURE-CAPSULE (structure = product-feature vertical capsules + a small named kernel)

**Center / substrate**: PRODUCT-FEATURE OWNERSHIP. The unit is the feature (color-picker, gradient,
palette-browser, mix, quantize) as a sealed vertical capsule with ONE public barrel; everything the
feature owns lives inside recursively; cross-feature sharing is a deliberate, small, explicitly-named
KERNEL. Structure follows the product taxonomy, not the import graph or the design system.

- **D1**: each demo feature = a capsule; `composables/color` dissolves INTO the `color-picker` capsule;
  only the true kernel (`keys`, `useContrastSafeColor`, `usePaletteManager`) promotes to a tiny
  `composables/` kernel. This ratifies the ~60%-landed leaf colocation and finishes it.
- **D2**: api modules ARE already feature capsules (`palette`, `session`, `admin`, `color`) — this family
  RATIFIES + hardens the existing api as the template (D2 becomes verify-not-restructure).
- **D3**: library capsules = the color system (one capsule), parsing (one), transform, quantize; the
  `subpaths/` barrels ARE the capsule public surfaces. Reduce complexity by sealing cross-capsule leaks
  (does `parsing/color` reach into `units/color`? that's a capsule boundary crossing to make explicit).
- **D4**: benches/gates owned by their capsule (a color bench lives with the color capsule).
- **Severest failure mode**: **features are not cleanly separable → a fat kernel or duplication.** Color
  logic is shared by picker + gradient + mix + quantize + image-extractor; forcing capsules either
  balloons the "kernel" into a god-module or duplicates color code across capsules. The library axis
  isn't really "feature" — it's "domain layer" (parse vs represent vs convert), so the capsule metaphor
  strains for src/.
- **Pass-1 research**: (a) measure the true kernel size for demo (how many composables serve ≥3
  UNRELATED features — the A1 consumer table is the seed); (b) do the 7 subpaths already partition src
  cleanly, or do they overlap (color subpath vs parsing subpath share color parse); (c) the cross-capsule
  import-leak census.
- **BH/BI relationship**: **aligns closely** with glass-ui's backend law ("domain PACKAGE named by domain
  not layer") — but derives the taxonomy from THIS product's features, which may not match glass-ui's
  vocabulary. Distinct from Family 1: F1 conforms to the external spec's shape; F3 derives shape from
  value.js's own feature ontology (and would feed a value.js-specific profile back to the constellation).

## Family 4 — TYPE-ONTOLOGY / DOMAIN-PRIMITIVE (structure mirrors the core type lattice; validation is a typed diagnostic layer)

**Center / substrate**: the library's CORE TYPE ONTOLOGY as the organizing atoms. value.js's real
primitives are `ValueUnit` / `FunctionValue` / `ValueArray` (the value model), `Color<T>` + the 17 space
classes (the color model), and the parse-that combinator (the parse model). The tree mirrors the TYPE
LATTICE, and — crucially for D3 — parsing VALIDATION becomes a first-class typed layer: a
`Result<T, Diagnostic>` / `{ ast, diagnostics }` boundary at the combinator seam, not a silent partial parse.

- **D1**: less native to demo (demo is Vue components, not types) — demo inherits the barrel/colocation
  hygiene but this family's payload is src/. (Honest: this is a src-CENTRIC family; for D1 it defers to
  the capsule/graph placement.)
- **D2**: api's typed `ApiError` + branded `SessionToken`/`UserSlug` nominal types ARE this family already
  — extend: every boundary crossing carries a typed result, never an untyped throw. (D2 = ratify + extend
  the L-tranche brand discipline.)
- **D3 (the heart)**: reorganize `units/` + `parsing/` around the type ontology; **thread the VJ-F2
  diagnostics sink to the PUBLIC `parseCSSValue`/`parseCSSStylesheet`** (closing bug #9); make the parse
  surface return `{ value, diagnostics }` so `parseable` is honest; rename `PropertyDescriptor`→
  `CSSPropertyDescriptor` (#11); the whole kf bug corpus (A6) becomes a typed-invariant regression suite;
  `dispatch.ts`/`normalize.ts` erasure sites (the documented `as unknown as` class) are the ontology's
  known seams.
- **D4**: the complexity reduction is TYPE-driven — narrow `any` seams (VJ-P3), delete dead type stubs
  (the dead `color-contrast` grammar), collapse redundant representations (the ValueUnit-nesting /
  array-boxing traps #8).
- **Severest failure mode**: **the type ontology is not a DIRECTORY ontology.** `Color<T>` generic
  erasure already forces the accepted `as unknown as` class; forcing the file tree to mirror the type
  lattice can fight the conversion-cluster / gamut-cluster decomposition that IS already good. And it's
  weak for D1/D4 (it's really a D3 thesis wearing a whole-problem costume) — risk of being a
  single-surface family in disguise.
- **Pass-1 research**: (a) what does a `{ast, diagnostics}` public parse API cost (breaking change? the
  8-key exports map churn?); (b) is threading `onParseError` through `parseCSSValue` sufficient or does
  the return type need to change; (c) the full VJ bug-corpus verification against the current tree (which
  of A6's 11 are ACTUALLY still open); (d) does the type lattice suggest a materially different `units/`
  layout than today's.
- **BH/BI relationship**: **orthogonal to** glass-ui's structural law (which is layout, not type
  ontology) — neither aligns nor diverges on layout; it ADDS a dimension glass-ui's spec is silent on
  (typed diagnostics), so it COMPOSES with any of F1/F3 for the layout half.

## Family 5 — STRANGLER-BY-GATE (born-RED structural gates drive incremental convergence; the tree follows the gate)

**Center / substrate**: ENFORCEMENT-FIRST PROCESS. Do NOT move files first. Instead WRITE the born-RED
structural gates (`@`-import-ban, barrel-purity, depth-budget, colocation-globality, god-module ceiling,
grammar-fuzz), let them fail LOUDLY against today's tree (they WILL — `src/index.ts` mixed barrel,
`parsing/index.ts` god-file, 321 `@`-imports, no fuzz gate), then strangle violations wave-by-wave until
green. The gate is the source of truth; layout converges to satisfy it.

- **D1**: an `@`-ban gate (grep/eslint no-restricted-import) + `proof-colocation-globality`; demo
  restructure driven by making the gate pass feature-by-feature.
- **D2**: `proof-import-boundaries` (routes✗repository) already passes → wire as STANDING; add
  `proof-backend-structure`.
- **D3**: barrel-pure + 500-line + `proof:grammar-fuzz` (seeded with the A6 corpus) all born-RED today;
  strangle.
- **D4**: cull driven by a `no-root-png` gate + a META-gate capping the gate count (turning the owner's
  "overfit nonsense" complaint into an enforceable ceiling).
- **Severest failure mode**: **gates enforce SHAPE not SENSE, and the owner explicitly wants FEWER
  gates.** ADDING a gate battery is adversarial to "the vast majority of our gates are overfit nonsense."
  A tree can be gate-green and still incoherent. And strangler tolerates a transient HALF-MIGRATED
  dual-state, which collides with the owner's "NO dual paths, clean breaks."
- **Pass-1 research**: (a) can the `@`-ban be a pure eslint `no-restricted-imports` rule (cheap, no
  script); (b) which gates would born-RED today (A3/A4 already enumerate most); (c) is strangler
  reconcilable with "clean break no dual paths" (answer likely: only if each wave lands a COMPLETE
  sub-tree, never a partial file); (d) the minimal gate set that covers the law without re-growing the
  overfit thicket.
- **BH/BI relationship**: **aligns on the enforcement IDIOM** (glass-ui §0.5.12: every structural gate
  is a device-free born-RED `proof:*` script, never ESLint — note the tension with (a) above) but
  **diverges from the owner's cull mandate** by adding gates. The reconciliation: REPLACE the overfit
  gates (barrel-parity, close-ledger) WITH the structural ones (net gate count flat or down).

## Family 6 — BIG-BANG CODEMOD TRANSPOSITION (a spec-complete target tree reached atomically per surface)

**Center / substrate**: ATOMIC TRANSFORMATION via codemod. Design the FINAL tree fully on paper
(spec-complete, per surface), then execute each surface as ONE atomic codemod-driven move: `ts-morph` /
`jscodeshift` rewrites every import specifier, `git mv` relocates files, and the whole surface lands in a
SINGLE reviewable commit — no strangler, no dual paths, clean break (glass-ui used `CODEMOD-SPEC.md` for
exactly this). Structure = a designed target reached in one leap; the substrate is the codemod, not the
gate or the graph.

- **D1**: author the target demo tree spec; one codemod rewrites all ~321 `@`-imports → relative/flat and
  `git mv`s the tree; demo flattens in one commit.
- **D2**: one commit if api needs the `api/model/lib` reshape (or a no-op if F3/F1 ratify the current).
- **D3**: one commit per god-module carve (the codemod extracts own-exports to kind-named siblings +
  rewrites importers).
- **D4**: one sweep deletes plugins/ (after wiring-verify), the 39 PNGs, `.lighthouseci/`, the overfit
  gates.
- **Severest failure mode**: **blast radius vs the concurrent U.W-CLOSE + unreviewable atomic commits.** A
  214-file demo move in one commit is a merge-conflict BOMB against U.W-CLOSE (the campaign fence forbids
  touching execution surfaces mid-close) and is effectively unreviewable + hard to bisect. If the paper
  design is wrong, the whole leap is wrong.
- **Pass-1 research**: (a) can `ts-morph` reliably rewrite the `@`-alias + subpath import graph (incl.
  `.vue` `<script setup>` + CSS `@import` specifiers) with zero manual fixups; (b) the exact
  conflict/blast surface vs U.W-CLOSE's touched files (fence check); (c) is a per-surface atomic commit
  reviewable, or must it decompose into per-feature atomic commits; (d) does glass-ui's `CODEMOD-SPEC.md`
  provide a reusable codemod value.js can adapt.
- **BH/BI relationship**: **aligns on MECHANISM** — glass-ui landed its restructure via codemod
  (`CODEMOD-SPEC.md`), so this family reuses the constellation's proven transformation path. Diverges
  from F5 (strangler) on execution style — this is the canonical "big-bang vs strangler" orthogonality
  axis the charter names.

---

## Orthogonality map (why these six, not fewer)

| family | structure DERIVED FROM | execution axis | strongest surface | weakest surface |
|---|---|---|---|---|
| 1 CONSTELLATION-CONFORM | external ratified convention (glass-ui spec) | either | D1/D4 | D2 (vocab mis-fit) |
| 2 GRAPH-PROJECTION | measured import DAG | either | D1 (placement)/dead-code | conceptual cohesion |
| 3 FEATURE-CAPSULE | product-feature ownership | either | D2 (already done)/D1 | D3 (color is cross-feature) |
| 4 TYPE-ONTOLOGY | core type lattice + typed diagnostics | either | **D3** | D1/D4 (src-centric) |
| 5 STRANGLER-BY-GATE | born-RED enforcement (process) | **strangler** | D3/D4 (correctness) | owner's "fewer gates" |
| 6 BIG-BANG CODEMOD | atomic transformation (tooling) | **big-bang** | D1 (mass rewrite) | blast radius vs close |

**Composition note (honest)**: F1–F4 answer "WHAT tree"; F5–F6 answer "HOW to get there." A real tranche
plan likely picks ONE shape-thesis × ONE execution-thesis (e.g. F3-capsule shape executed via F6-codemod,
gated by a MINIMAL F5 born-RED set). The portfolio keeps them separate so pass-1 can falsify each center
independently before they are composed — but the composition is the expected convergence shape, not a
sign the families collapse.

---

# PART C — the 5 most load-bearing survey findings (machine-read)

1. **glass-ui's convention is CODIFIED + AUTHORITATIVE but only PARTIALLY EXECUTED** — demo/ landed at
   5.0.0; the src/ flatten + export-reshape was DELIBERATELY DEFERRED to BI/5.1.0 (atomic-vs-publish risk);
   `@glass` was only ever an ALIAS (B2.0 codemod, 719 rewrites → pure-relative + G10 leak-ban gate), never
   a physical dir. Spec of record: `STRUCTURE-TRANCHE-PLAN.md` + `STRUCTURE-SPEC.md` round-6 (pure-flat
   91-peer) + T4 earned-dir + colocate-iff-single-owner styles + generated fail-CLOSED exports + born-RED
   G1–G10 + 500-line ceiling. value.js adopting this on src-class surfaces LEADS glass-ui's own execution —
   leverage AND the deferred hazard both apply.
2. **api/src is already the exemplar** — vertically module-sliced (`modules/<domain>/{routes,service,
   repository,__tests__}` + `platform/`), boundary CLEAN by measurement (0 route→repo, 0 ad-hoc errors),
   no file >350 LoC. D2 is ~90% done; the only friction is `routes/service/repository` vs glass-ui's
   `api/model/lib` vocabulary.
3. **The `@` abrogation blast radius is ~321 import sites** across `@components`(152)/`@lib`(85)/
   `@composables`(78)/`@utils`(6), aliased in tsconfig.demo + vite. demo colocation is ~60% landed at the
   leaf; the failure is the GLOBAL buckets (`composables/color` 18 files, `composables/palette` 12,
   `style.css` 55 KB, `panes/` 16 flat files) — and per-file consumer analysis already dictates which
   colocate vs stay kernel.
4. **Barrel-purity + god-file finding**: `src/parsing/index.ts` (644 LoC, 11 own defs, 0 re-exports) and
   `src/units/index.ts` (451, 5 own) are god-IMPL-files masquerading as barrels; `src/index.ts` mixes 23
   own + 36 re-exports. The 7 `subpaths/*` barrels are pure (the model). 14 src files breach the 500-line
   glass-ui ceiling. This is the single highest-value glass-ui-law alignment target.
5. **D3 corpus is concrete + partially open**: the kf `VJ-*` catalog (11 named classes) is the validation
   regression suite. Still OPEN in the current tree: **bug #9** (VJ-F2 diagnostics plumbing landed in
   `parsing/utils.ts` but NOT wired to public `parseCSSValue`/`parseCSSStylesheet` → `parseable:true`
   false-positive persists) and **bug #11** (`PropertyDescriptor` type-name collision, clean-break rename
   pending). No `proof:grammar-fuzz` gate exists — the one gate D3 should ADD while the owner CULLS the
   overfit set (`barrel-parity`, `close-ledger` are the clear OVERFIT candidates in the re-grown 10-gate
   `test:dist`).
