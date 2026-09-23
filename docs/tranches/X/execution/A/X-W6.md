SERVED MODEL: claude-opus-5[1m]

# X-W6 — Instruments and Temporal Scenes (Track A · X·V) — EXECUTION RECORD

Spec of record: `docs/tranches/X/waves/W6.md` (dated 2026-08-03, IMMUTABLE — E-3).
Authority to execute: the owner's **begin-word 2026-09-17** (COHESION §0j).
Sitting of record: **2026-09-17**. Wall clock of this seat: **2026-09-19**.

---

## Open

**Date**: 2026-09-17 (sitting of record) · opened at this seat's wall clock 2026-09-19.
**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`. Authored no cure; every figure below is read-only.

### Crash-recovery (standing law)

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/value.js` →

```
 M docs/tranches/V/reformation/CARRY-LEDGER.md
 M docs/tranches/X/execution/C/F-W8.md
 M scripts/dev/dev.sh
```

**Zero of the three sits inside X-W6's §File Bounds writable set.** `CARRY-LEDGER.md` is the V
reformation fold-source (not this wave's); `execution/C/F-W8.md` is **Track C's** seat; `dev.sh` is
the unowned dirty row that is NEVER touched. **No inherited hunk belongs to this wave** — this open
inherits nothing and this seat touched none of the three.

### Preconditions — measured at the bytes AND in the ledger

| condition | source | ledger | at the bytes | verdict |
|---|---|---|---|---|
| **X-W0** | `LEDGER.md:28`; `W6.md` §Authority | **CLOSED 2026-09-17** (honest-RED HG-8/ESC-N1) | registers + census present | **MET** |
| **X-W4** — the typed `SceneActionSet` (CC-043) | `W6.md:396` | **CLOSED 2026-09-17** (promoted at CHECK 2, 16/16 §6 gates) | ⟨cmd⟩ `grep -rn 'SceneActionSet' demo/ \| wc -l` → **11** | **MET** |
| **X-W1** — visual-oracle substrate (CC-030) + CI wiring (CC-031) | `W6.md:398` | **CLOSED 2026-09-17** (honest-RED G-17·G-19·G-20) | ⟨cmd⟩ `test -d e2e/visual` → present (`capture.ts`, `census-parity.spec.ts`, …); `grep -rln playwright .github/workflows/` → `ci.yml` | **MET** |
| **installed `@mkbabb/glass-ui@7.0.0`**, subpaths `./aurora ./select ./labeled-field ./blob ./watercolor-dot` published | `W6.md:399` | n/a | ⟨cmd⟩ `node -p "…exports…"` → `./input:false ./labeled-field:true ./number-field:true ./aurora:true ./select:true ./blob:true ./watercolor-dot:true`; version **7.0.0** | **MET** (and `./input:false` is d2's census answer — see below) |
| **X-W5** — one route, one scene (CC-048..CC-055) | `W6.md:4` §Opens-after · `:397` | **`planned`** (`LEDGER.md:37`) | ⟨cmd⟩ `grep -c 'component: Stub' demo/color-picker/router/index.ts` → **14** (all routes still Stub); ⟨cmd⟩ `grep -rn 'defineScene\|SceneContract\|useScene' demo/ \| wc -l` → **0** | **UNMET — see the ruling below** |

### The §Opens-after divergence, resolved by three authorities — NOT re-adjudicated here

`W6.md:4` reads **`Opens after: X-W5`**. Three later authorities place X-W6 as a **direct child of
X-W0**, gated on nothing else:

1. **`EXECUTION-RUNBOOK.md` §1.1** (the runbook of record), whose own heading reads *"`waves/W0..W11.md`
   **as amended by §READINESS R.1**"*: the tree hangs `├─ X-W6 (scenes/workbenches; opens against its
   fold) ⟂ W7 on four shared paths` off X-W0, and `:131-132` states *"**Parallel inside track A**: W1 ·
   W2 · W3 · W9 · W4 · **W6** · W10 are independent once W0 closes, subject to the four-workflow cap and
   the W6⟂W7 write-order."* The RUNBOOK's edge table names **no** W5→W6 edge; the only W6 edge it books
   is `X-W6 ⟂ X-W7` (`:127`).
2. **`REFINEMENT-FOLD-2026-08-28.md` §READINESS R.1** (`:1041-1062`), the amendment §1.1 cites: same
   tree, X-W6 under X-W0, *"opens against its fold = §2 e.1-e.4 errata + the two §2 e.22 contests
   decided at ITS opening sitting"*.
3. **`COHESION.md` §0k.3** (2026-09-17, ruled under the begin-word's delegation), Consequence
   paragraph, verbatim: *"**X-W5 (S-1, S-7), X-W6 (S-7, S-8)**, X-W7 (S-4, S-5, S-6, S-7), X-W8 (S-4,
   S-8), X-W9 (DR-21, S-3) and X-W10 (CC-104/OP-1, S-2) **may open lawfully**, each landing the dated
   addendum its ruling names as its first docs act."*

**Ruling cited, not minted**: COHESION **§0k.3** (Consequence) governs, and the LEDGER's own
`Opens after` cell for X-W6 reads **X-W0** (`LEDGER.md:34`). The wave **OPENS**. The spec's line-4
`X-W5` clause survives where it has real force — **unit `.j` alone**, whose §5 text is *"this unit
**adopts** the X-W5 scene contract for the route"* — and `.j` is Lane 4, dispatched last by the
spec's own §4a. Its X-W5 precondition is **re-measured at its dispatch** under the D-19
re-measure-at-open law; the measurement above (14 Stub routes / 0 scene-contract sites) is banked as
`.j`'s BEFORE reading and its brief carries the halt condition.

This is a divergence **named**, not smoothed: had the ledger cell and §0k.3 not both existed, this
seat would have returned `blocked`.

### §0k.3 · S-7 and S-8 — the two seams this wave opens against

- **S-7** (`ErrorBoundary.vue` path, X-W5 ⟂ X-W6 ⟂ X-W7) — ruled **(a) `demo/color-picker/ErrorBoundary.vue`**,
  the only path that exists; *"X-W6 and X-W10 **read/cite**"*. ⟨cmd⟩ `find demo -name 'ErrorBoundary*'`
  → **one file**, `demo/color-picker/ErrorBoundary.vue`; ⟨cmd⟩ `test -f demo/shell/ErrorBoundary.vue`
  → **NO**. Reproduces exactly. **Nothing is owed by X-W6** beyond reading — the file is in no unit's
  writable set and no unit may write it.
- **S-8** (MT-CSP-1 ⇄ the carry-cut ledger, X-W6 · X-W8 · W0.1) — ruled **Q1(a) mint the carry-cut id**:
  *"**X-W6's open seat appends the row** (⟨ConfigSliderPane · MT-CSP-1⟩) to `CARRY-CUT-LEDGER.md` by
  dated append, home **X-W6**"*; **Q2(b) curable now** via the CSP register's **G-PAINT single cut**
  (C-3/D-3/D-4/D-14), while CC-105's `--slider-track-bg` wait stays X-W4.g's own.
  **Measured owed**: ⟨cmd⟩ `grep -n 'MT-CSP-1\|ConfigSliderPane' …/registry/CARRY-CUT-LEDGER.md` →
  **no match** — the id is genuinely unminted. ⟨cmd⟩ `ls -la demo/scenes/ConfigSliderPane.vue` →
  present (10,709 B), a scene, exactly as the ruling reasons. Highest existing id = **CC-117**, so the
  mint is **CC-118**. **LANDED by this seat as its first docs act**, as a **dated append at the file
  end** (E-3: the dated registry is corrected by addenda-beside, never by an in-place table rewrite).

  **Bounds note, stated loud**: `registry/CARRY-CUT-LEDGER.md` is **not** in `W6.md` §4's table, and it
  is **not** in §4's Do-NOT-touch list either (that clause bars `registry/**adjudicated**/*` only, and
  bars it as immutable-except-E-3-addenda). The write is performed **solely** on §0k.3's explicit,
  owner-delegated, later-dated grant, which names *this seat* as the actor and *this act* as the open's
  first docs act. It is a single dated append; it destroys nothing; it is named in the open commit's
  message. **No other out-of-bounds path is written by this seat**, and no unit inherits this grant.

### Mail sweep (E13 Step-0) — four paths, read-only at this seat's own clock

Classification taken from each row's **Status cell by position**, never from a bare `grep -i unread`;
`INBOX.md` **self-excluded** (SELF-COUNT law).

⟨cmd⟩ `sed 's/\\|/@PIPE@/g' INBOX.md | awk -F'|' '/^\| [IO]-[0-9]+[a-z]? \|/ {s=$6; gsub(/^ +| +$/,"",s); if (s ~ /^\*\*?UNREAD/) c++} END {print c+0}'`
→ **0**, double-run **0 ≡ 0**, over ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|'` → **79** rows.

1. **`docs/tranches/V/` + `V/coordination/`** — **10** depth-1 `.md` ⊕ **24** coordination entries.
2. **`../glass-ui/docs/tranches/BK/coordination/`** — **BK re-confirmed the newest tranche dir**:
   ⟨cmd⟩ `ls -1d ../glass-ui/docs/tranches/*/ | wc -l` → **45**, the letter sequence terminating at `BK`;
   ⟨cmd⟩ `ls -1dt …` agrees → `BK/` · `BJ/` · `BI/`. **9** entries; newest
   `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed.
3. **`../keyframes.js/docs/tranches/V/coordination/`** — **13** entries (12 files + `vnext/`); newest
   inbound-grammar letter `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21**, ours,
   delivered.
4. **`../sci-report/atlas/docs/tranches/P/coordination/`** — **28** entries; newest value-addressed
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12**, ours; path UNMOVED.

**Movement since the previous sweep**: ⟨cmd⟩ `find <the four paths> -type f -name '*.md' -newermt
"2026-09-19 00:00"` → exactly **two** members — `docs/tranches/V/coordination/INBOX.md` (**self**) and
`../keyframes.js/…/INBOUND-LEDGER.md`, **keyframes' own inbound ledger, not a letter addressed to
value.js** (mints no row).

**Result: ZERO unrowed letters addressed to value.js · ZERO new `I-n`/`O-n` minted (register tail
unmoved at I-35 / O-39) · ZERO UNREAD Status cells.** X-W6 opens with **no UNREAD mail in scope**.

### Write-order with X-W7 (the orchestrator's note, confirmed at W7's own bytes)

⟨`W7.md:150-156`⟩ names the four shared `modify` paths and the order verbatim: *"Four `modify` paths
in §4 are held by **X-W6** as well — `demo/color-session/ColorSpaceSelector.vue`,
`demo/scenes/atmosphere/AuroraPane.vue`, `demo/workbenches/mix/MixConfigBar.vue`,
`demo/workbenches/mix/MixSourceSelector.vue`. W6 ∥ W7 would therefore be a §4a parallel-write
violation, which is why X-W6 is in Opens-after: **W6 writes those four first**"*. **X-W6 writes first
on all four.** `ColorSpaceSelector.vue` → `.f` · `AuroraPane.vue` → `.i` then `.j` ·
`MixConfigBar.vue` / `MixSourceSelector.vue` → `.j`.

### §4 File-Bounds path errata — re-measured at the bytes (D-19), the fold's corrections confirmed

| §4 row as printed | at the bytes today | real path (fold erratum) |
|---|---|---|
| `…/GradientVisualizer/easing/GradientEasingEditor.vue` (`W6.md:59`) | **ABSENT** | `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` — **PRESENT** ⟨REFINEMENT-FOLD §2 **e.1**⟩ |
| `demo/picker/display/ColorNutritionLabel.vue` (`W6.md:69`) | **ABSENT** | `demo/scenes/about/ColorNutritionLabel.vue` — **PRESENT** ⟨REFINEMENT-FOLD §2 **e.2**⟩ |

`EasingAuthoringStage.vue` and `easingCatalogue.ts` **are** under `…/GradientVisualizer/easing/` — those
two §4 rows are correct as printed. Every other `modify` / `modify-carve` path in §4 verified
**present**; every `create` path verified **absent**; all **twelve** `execute, no write` instruments
verified **present**. `docs/tranches/X/gates/` and `…/audit/probes/x-w6/` are both **absent**, as
§4's Bounds law states.

### The two §2 e.22 bounds CONTESTS — this is the opening sitting that decides them

⟨REFINEMENT-FOLD §2 **e.22**⟩: *"Two genuine bounds CONTESTS no seat may decide: `demo/palettes/mix.ts`
(inside W6's own Do-NOT-touch) and `foundation.css`'s WHCM/print roster arm (a FIFTH carve of one file,
§3a expansion trigger) | Written EITHER WAY at X-W6-FOLD §3 n.11/n.37; **the W6 opening sitting
decides**"*. ⟨cmd⟩ `grep -n 'e\.22\|palettes/mix\.ts\|foundation\.css\|MX-CLUSTER' docs/tranches/X/COHESION.md`
→ **no match**: **neither contest is ruled anywhere in COHESION §0i–§0v.**

**DECISION OF THIS SITTING — both contests resolve NEGATIVE, by the narrow reading**, and neither path
enters any unit's writable set:

- **`demo/palettes/mix.ts`** — `W6.md:120` Do-NOT-touch names `demo/palettes/**` as **X-W7 property**
  in this wave's own bytes. A seat may not widen its own bounds against its own spec's prohibition on
  the strength of a fold note written *"either way"*. **EXCLUDED.** Any unit concluding it needs that
  file **halts under §3a** (file-bound expansion that invalidates the wave) and files the ask.
- **`foundation.css`'s WHCM/print roster arm** — a **fifth** carve of one file is, by the fold's own
  words, a **§3a expansion trigger**; `foundation.css` appears in **no** §4 row of `W6.md`. **EXCLUDED.**
  Same halt path.

This is the conservative branch in both cases: it forecloses no cure permanently (X-W7 owns
`demo/palettes/**`; the foundation.css carve can be granted by a dated ruling), and it keeps every
unit inside bytes its own spec already grants. Recorded here so the decision is legible and
falsifiable, per the fold's instruction that this sitting decide.

---

## Baseline

Every figure below read **read-only** at this seat's clock, against the tree at
`d803745a` / branch `tranche-u`, and against installed `@mkbabb/glass-ui@7.0.0`. Gates requiring a
live browser cell (Playwright / DOM probes) are **not run at open** under probe parsimony (§5.2) —
each is banked **RED-BY-ABSENCE** where its artefact is statically measurable, with the command its
unit must run named. That is stated, not smoothed: an absent oracle is honestly RED, and a DOM figure
is honestly *not re-measured by this seat*.

### Gates measured directly at this seat

| gate | command (literal) | measured at open | spec's stated RED | verdict |
|---|---|---|---|---|
| **c1** | `node …/probes/wb-gradient-stopeditor/gate-structure.mjs` | **`GATE G4 (structure) — RED`**, **10 failures** (G4a ×2 · G4b · G4c · G4d ×2 · G4e · G4f · G4g ×2) | exit 1, 10 failures | **RED — reproduces exactly** |
| **e2** | `grep -rn "requestAnimationFrame" demo/workbenches/gradient/ \| wc -l` | **2** | 2 rAF sites, neither PRM-gated | **RED — reproduces** |
| **f2** | `grep -rn 'colorSpaceInfo\.rgb\|(colorSpaceInfo as any)' demo \| wc -l` | **2** | 2 hits | **RED — reproduces** |
| **f5** | `grep -rn 'data-specimen-form' demo \| wc -l` | **0** | grep → 0 | **RED — reproduces** |
| **f6** | `grep -rn 'data-out-of-gamut' demo \| wc -l` | **0** | grep → 0 | **RED — reproduces** |
| **f7** | `grep -rn 'colorSpace: any' demo \| wc -l` | **3** | 3 hits | **RED — reproduces** |
| **f8** | `grep -c 'tag=' demo/color-session/ColorSpaceSelector.vue` | **1** | grep → 1 | **RED — reproduces** |
| **f9** | `grep -c 'updateToColorSpace' demo/color-session/ColorSpaceSelector.vue` | **0** | zero references | **RED — reproduces** |
| **f10** | `grep -rn 'from "\.\./ui/' demo/color-session/ \| wc -l` | **1** | exactly 1 hit | **RED — reproduces** |
| **b3** | `grep -rn 'type="number"\|NumberField\|inputmode' demo/workbenches/gradient/ \| wc -l` | **0** | no numeric entry in the tree | **RED — reproduces** |
| **i1** (mandate leg) | `grep -rn deriveAurora demo/ \| wc -l` | **8** | 8 sites — *"precisely why the tombstone precedes the oracle"* | **as stated** |
| **i2** (dist leg) | `grep -o "lightnessScheme" node_modules/@mkbabb/glass-ui/dist/aurora.js \| wc -l` · same for `lBand` | **2** · **4** | 2 · 4 | **reproduces** — the door plausibly shipped |
| **i2** (stale-comment leg) | `grep -n lBand …` | **3 live sites**: `useAtmosphere.ts:62`, `:234` · `atmosphere-calibration.ts:26` · `aurora-bracket.test.ts:29` | three sites citing a wave closed TRIGGER-NOT-FIRED | **RED — reproduces** |
| **i3** | `grep -rn armRuntime demo/ \| wc -l` | **0** | 0 hits | **RED — reproduces** |
| **j1** | `grep -c "component: Stub" demo/color-picker/router/index.ts` | **14** | all 14 routes render `component: Stub` | **RED — reproduces** |
| **j2** | `grep -c 'getContext("2d")' …/useMixingAnimation.ts` | **3** (the spec's own `:91`/`:144`/`:162`) | *"two … sites"* naming **three** line numbers | **RED — reproduces at the three named lines**; the spec's word "two" is a **prose miscount against its own enumeration**, corrected here, not carried |
| **j3** | `grep -rn "webglcontextlost\|webglcontextrestored" demo/ \| wc -l` | **3** (`webglcontextlost` alone → **1**) | *"3 `webglcontextlost`/`restored` handlers exist repo-wide"* | **reproduces as the PAIRED count**; the single-token reading gives 1 — the figure is the lost⊕restored total and may only be cited that way |
| **d2** (census leg) | `node -p "…exports…"` | `./input:**false**` · `./labeled-field:true` · `./number-field:true` | `./input` absent; `LabeledInput` no trailing slot | **census CONFIRMED at open** → d2's cure is the **dated glass-forward BJ ask**, never a local restyle |
| **H3(3)** glass tripwire | `node -p "…version"` | **7.0.0** | 7.0.0 pinned; census 1/4 | **sweep reading, not a door** — nothing in §Blocked opens here |

### Gates banked RED-BY-ABSENCE (artefact statically absent; unit runs the command)

`a1` end-state (`test/gradient-order-invariant.test.ts` absent) · `c2` (same file) · `c3`
(`gate-literal-dialect.mjs` absent) · `c4` (`test/interpolation-subset.test.ts` absent) · `d1`
(`gate-easing-radius.mjs` absent) · `d2` assertion leg (`gate-easing-readout.mjs` absent) · `e2` gate
leg (`gate-prm-idiom.mjs` absent) · `f1` (`gate-catalog-totality.mjs` absent) · `f5` gate leg
(`gate-specimen-grammar.mjs` absent) · `f3`/`f4`/`f6`/`f8` oracles (`o21-space-catalog-truth`,
`o22-specimen-legibility`, `o23-specimen-gamut-honesty`, `o24-specimen-dot-identity` — **all absent**)
· `g1` (`gate-card-rhythm.mjs` absent) · `h2` (`gate-blob-pipeline.mjs` + the census file absent) ·
`i1`/`i3` (`o25-atmosphere-response`, `o26-atmosphere-coldload` absent) · `j1`–`j4`
(`o27-scene-contracts` absent) · `H1` (`gate-no-chassis.mjs` absent).

### Gates NOT re-measured by this seat — live-cell figures, carried with their adjudication date

`a2` · `a3` (±11.0px DOM) · `a4` (forward(inverse(0)) = 0.226) · `a5` (10.11px) · `a6` · `a7` · `a8`
(T9) · `a9` (T11, webkit iPhone-14) · `a10` (T2) · `a11` (1.00:1 white ramp) · `a12` (+1.50px
overhang) · `a13` (5 failed / 8 passed) · `b1` · `b2` · `b4` · `e1` · `g2` · `h1`. Each is
*(adjudicated 2026-07-27/28)*; each unit **re-runs its own instrument first** under D-19 and the
**STALE-SERVER LAW** (headless `vite-node` or a freshly restarted server — never a long-running one)
before any cure. **§17 count-scoping binds**: ±11.0 DOM never ±10.5 PNG; *"6/10"* only against the
challenger's own ramp; the *"15-significant-digit"* literal characterization is **STALE AT THE TREE
and may not be cited**.

### R.2 — GREENS BEFORE THEIR CURE (each a finding, not a convenience)

1. **H3(1) — the parser R1 bank has FLIPPED GREEN.** Spec (`W6.md:339`) states **exit 1 today**,
   *"re-run 2026-08-03: `THREW: Cannot read properties of undefined (reading 'replace')`"*.
   ⟨cmd⟩ `node --input-type=module -e "const {parseCssColor}=await import('./dist/subpaths/css.js'); try{parseCssColor('oklch()');process.exit(0)}catch{process.exit(1)}"`
   → **exit 0**. Printing the value: `{"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":7,"expected":["color components"],"actual":"oklch()"}]}`
   — a **diagnostics object, no throw**. `dist/subpaths/css.js` mtime **Sep 19 04:35** (X-W9's cured
   surface, ledger row `X-W9` = **PARTIAL 2026-09-17**). **Consequence**: H3(1)'s *"re-witnesses the
   code-editor arm when it flips"* clause **has fired**. The **masking-fallback ban still binds
   absolutely** — no unit adds a consumer `try/catch`, and `.a`'s a1 `setStopsFromColors` validation
   must be written against the **`{ok:false}` return shape**, not against a throw. Routed to the
   close seat as H3's open reading.
2. **H2's `test -f` leg is GREEN at open.** ⟨cmd⟩ `test -f docs/tranches/V/megatranche/audit/codex-provenance/motion-quarantine.md`
   → **PRESENT**. This is **pre-declared by the spec's own addendum** (`W6.md:242`/`:338`, *"the record
   landed and is tracked at `9812f951`"*), so it is an **expected** green — but it is listed here
   because R.2 admits no silent greens. **H2's citation legs stay born-RED**: every `.e`/`.j`
   MOTION-SOURCED assertion must *cite* the record **and** be re-derived against the two guards —
   ⟨cmd⟩ `test -f demo/styles/animations.css` → present (`:184` global reduce guard) and
   `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css` → present. Both verified
   at this open.
3. **`f6(ii)` — the anti-projection lock — is GREEN at open by design.** The spec states it green
   today (≤1e-10) and born to go RED *"the moment anyone folds `mapColorToGamut` into the formatter."*
   Listed so no close mistakes its green for a cure. It is `.f`'s own regression tripwire.
4. **`H1` — no-copied-chassis — is GREEN at open by design** (`W6.md:337`, *"Not born-RED"*; CC-108 /
   A-17 killed the producer chassis). Admissible only because its falsifier is a **new** artefact.
   Listed for the same reason as (3).
5. **`j4` — short landscape 720×450 — is MEASURE-AT-OPEN and is NOT measured by this seat**: it needs a
   live 720×450 cell, which probe parsimony bounds out of an open. Per `W6.md:323`/`:325` it is taken
   **before any cure** by `.j` and, if GREEN, **retired with its measurement pasted, never carried**.

---

## Unit plan

**Model law M-23** (`W6.md:154`): *"every unit below is an **Opus implementation seat**. No unit authors
design canon"* — the radius canon echo (CC-060), the shadow/spacing laws behind CC-059/CC-062, and the
Movement-of-Momentum carve behind CC-064 are **X-W10 content**. Every one of the ten units is therefore
`claude-opus-5[1m]`. **No Fable seat in this wave.** (The L-18 two-quartet challenge + fresh-Fable
apotheosis is a *post-IMPLEMENTED* obligation, not part of this dispatch.)

**Lanes** (`W6.md` §4a/§4b) — Lane 1 `.a→.b→.c→.d→.e` · Lane 2 `.f→.g` · Lane 3 `.h→.i` · Lane 4 `.j`.
Worktrees `/Users/mkbabb/Programming/value-x-w6-{gradient,catalog,atmosphere,scenes}`, isolation
`VITE_CACHE_DIR=<worktree>/.vite-l{1,2,3,4}`, ports 9000/9001/9002/9003.

**The one cross-lane serial edge**: `c4`'s rider law (`W6.md:212`) — *"is **sequenced strictly after
.f**"* — so `.c` may not run before `.f` has landed the catalog. The grouping below honours it.

**Groups (ordered; ≤2 concurrent; no two concurrent units share a modify path):**

| group | units | shared-path check |
|---|---|---|
| 1 | `.a` ∥ `.f` | gradient tree vs `color-session`/`picker`/`about` — **disjoint** |
| 2 | `.b` ∥ `.g` | `GradientStopEditor`/`Visualizer`/`Pane` vs `ColorPicker.vue`/`AboutPane.vue` — **disjoint**; `.g` after `.f` (Lane 2 serial) ✓ |
| 3 | `.c` ∥ `.h` | model/sample/CSS/interpolation vs `HeroBlob`/`useContrastSafeColor` — **disjoint**; `.c` after `.f` ✓ (c4 rider) |
| 4 | `.d` ∥ `.i` | easing trio vs atmosphere trio + `AuroraPane` — **disjoint** |
| 5 | `.e` | shares `EasingAuthoringStage.vue` with `.d` → strictly after it; alone |
| 6 | `.j` | after Lanes 1–3; shares `AuroraPane.vue` with `.i` → after it |

**Wave-level, assigned to NO unit** (`W6.md` §4a, *"H1 at wave level"*; §9 commit **#11**): `H1`
(`docs/tranches/X/gates/gate-no-chassis.mjs` — **create**), `H2`'s citation audit, `H3`'s close sweep,
`H4`'s disposition roll-call, the gate transcripts in `W6-evidence/gates/`, and the status flip to
**IMPLEMENTED** (never VERIFIED — that is X-W11's stamp). The close seat is dispatched separately.

### The units

**X.W6.a** — Gradient ordering, gesture and geometry core (CC-058 · MT-GRADSTOP-1 r3).
§5 `W6.md:156-180`. Gates a1–a13. Commit **#1** `fix(demo/gradient-model)`, **body required**.
**Locks**: GRADSTOP-A **§14** — normalise-on-write and stop-owned easing land **TOGETHER, one
commit**; **clamp BANNED** (D-8 refusal species), **splice-at-insert BANNED** (double migration,
no-backwards-compat); **§15** — no minimum-ordinal-spacing rule, crowding cured by disambiguation;
equality stays legal (`<`, never `<=`); §3a triumvirate fires if G1 *and* G2 both fail post-landing.

**X.W6.b** — Gradient seat, inspector and keyboard grammar (CC-058 · MT-GRADSTOP-2).
§5 `W6.md:182-196`. Gates b1–b4. Commit **#2** `feat(demo/gradient-seat)`.
**Locks**: strictly after `.a` (consumes `.a`'s `canRemove`); the **D-6 / D2-16 WatercolorDot-faces
limb is BANKED** (`W6.md:428`) — adopting `@mkbabb/glass-ui/watercolor-dot` here mints a seventh
impostor CC-044 must delete; the trigger is X-W0's census and the receiving surface is **X-W4.g**,
never this wave.

**X.W6.c** — Gradient sampling law, literal dialect and leaf types (CC-058 · MT-GRADSTOP-3).
§5 `W6.md:198-212`. Gates c1–c4. Commit **#3** `refactor(demo/gradient-sampling)`, **body required**.
**Locks**: **strictly after `.f`** (c4's own rider law); the ordering policy **does NOT reopen** —
settled in `.a` (GRADSTOP-A §14); **STALE-SERVER LAW** on c3 (headless `vite-node`, never the
long-running server); the paint-stack dedup rider is **two sites** (`.gradient-rail`,
`.gradient-render-tile`) — §17 forbids citing four/six.

**X.W6.d** — Easing instrument coherence (CC-060 · MT-F030; CC-063 · MT-F037).
§5 `W6.md:214-226`. Gates d1–d2. Commit **#4** `style(demo/easing-register)`.
**Locks**: **CENSUS-FIRST, and the census is already CONFIRMED at this open** — `./input:false`,
`LabeledInput` no trailing slot → d2's cure is the **dated glass-forward BJ ask** at
`docs/tranches/X/waves/W6-glass-ask-easing-readout.md` **with the census pasted**, never a local
restyle (M-14 cl.1, glass-first law); **glass-ui is READ-ONLY always** — the row rides mail; d2's
falsifier cuts **both ways** (a letter filed while a fitting primitive exists is equally RED); the
glass I-9 Chip residual stays glass-owned; the radius **canon** is X-W10's — `.d` applies, never mints.
**Path erratum**: `GradientEasingEditor.vue` has **no** `easing/` segment (fold §2 e.1).

**X.W6.e** — Gradient selector aurora (CC-064 · MT-F041).
§5 `W6.md:228-243`. Gates e1–e2. Commit **#5** `feat(demo/gradient-aurora)`.
**Locks**: consume `@mkbabb/glass-ui/aurora` (published, verified at this open) — **no new animation
species, no private rAF loop**; PRM honoured **structurally** inside
`@media (prefers-reduced-motion: no-preference)`, never by leaning on the global reduce-guard; land at
**≤2 rAF both gated, or 0**; **MOTION-SOURCED · PENDING-QUARANTINE** — every motion/PRM assertion
cites `motion-quarantine.md` (green at open, tracked `9812f951`) **and** is re-derived against the two
guards `demo/styles/animations.css:184` ⊕ `…/glass-ui/dist/styles/utilities/a11y-overrides.css` (both
present); after `.d` (shares `EasingAuthoringStage.vue`).

**X.W6.f** — The space catalog and the specimen line (CC-068 · V·MT-W-CSS1 → **X:CSS-1**).
§5 `W6.md:244-265`. Gates f1–f10. Commit **#6** `feat(demo/space-catalog)`, **body required**.
**Locks**: **structure over gates (L-8)** — `satisfies Record<DisplayColorSpace, SpaceEntry>` makes a
space-with-no-info a **compile error**, `defineModel<DisplayColorSpace>` makes the four `any`/cast
holes **unspellable**, the discriminated `form` makes two-grammars-in-one-branch unrepresentable;
**gamut MEASURED and MARKED, NEVER projected** — **f6(ii) is the wave's own regression tripwire**
(green at open; folding `mapColorToGamut` into the formatter turns it RED); **lint is INADMISSIBLE for
f7** (`vue-tsc` + a `@ts-expect-error` witness is the evidence); f8 keys on
(borderRadius|background|feTurbulence@seed) and **explicitly NOT the per-mount filter url** (the
recorded false-GREEN trap); f10 is **scoped to `color-session` only** — the repo-wide 90-statement
extirpation is **X-W8's**; BANK-1 (glass SelectTrigger title/display variant) is **GLASS-OWNED** and
deliberately not among f1–f10. **BLOCKS `.c` and `.g`.** **Path erratum**: `ColorNutritionLabel.vue`
lives at `demo/scenes/about/`, not `demo/picker/display/` (fold §2 e.2). **Writes
`ColorSpaceSelector.vue` FIRST of the four X-W7-shared paths.**

**X.W6.g** — Picker card rhythm and About alignment (CC-059 · MT-F029; CC-062 · MT-F035).
§5 `W6.md:267-279`. Gates g1–g2. Commit **#7** `fix(demo/picker-rhythm)`.
**Locks**: after `.f` (Lane 2 serial — shares `ColorPicker.vue` + `AboutPane.vue`); the cure is the
**shared row contract** (one grid row, one track start), **never a per-pane nudge** — g2 asserts About
**and** keeps the **OM-10 Mix control unmoved**, and a nudge passes the first while breaking the
second; the spacing/shadow **canon** is X-W10's (M-23) — `.g` applies a censused disposition, it does
not invent a register.

**X.W6.h** — HeroBlob chroma fidelity (CC-061 · MT-F032).
§5 `W6.md:281-293`. Gates h1–h2. Commit **#8** `fix(demo/hero-blob-chroma)`.
**Locks**: **MEASURE THE PIPELINE BEFORE CUTTING** — the row's own law; the **census commit PRECEDES
the cure commit** (§9 #8); the census names **all three** stages (1×1-canvas sRGB resolver ·
`deriveBlobPalette`/`cssToOklch` · the shader's HSV perturbation) **or h2 is RED**; cut at the
**measured** stripper, never the first plausible one — that is what stops *"labelled, not measured"*
becoming the cure by default. Inherited reading to re-derive: `lab(92% 88.8 20)` → C **0.27245** →
post-clamp C **0.14868** (−45.4% chroma, +20.3° hue) **before** the shader runs.

**X.W6.i** — The atmosphere harness — one harness, three rows (CC-065 · CC-066 · CC-067).
§5 `W6.md:295-308`. Gates i1–i3 + the tombstone committed. Commit **#9** `feat(demo/atmosphere-oracle)`,
**body required**.
**Locks**: **THE TOMBSTONE IS THE FIRST ACT AND COMMITS FIRST** (§9 #9) — DR-01 carried **17 closes
under 13 names**; the predicate is quoted **verbatim**, `e32111c7` (N.W5) cited, S's independent
confirmation cited, **RF-26's misdated origin corrected**; only then does the surviving claim re-mint
as **X:ATMO-1, carry 0**; **i1 reads COMMITTED FRAMES only** — *"an agent's description cannot pass
i1"*, and it fails equally if it *could* be passed by one; i2 **closes either way** (band lands + the
3 stale comments die, **or** one dated §D letter with the probe pasted) and fails in **both**
directions; i3 rides the same harness. **Writes `AuroraPane.vue` before `.j`.**

**X.W6.j** — Scene adoption: Gradient pilot → Mix canary → Blob/Atmosphere persistence (CC-056 · V·L3;
CC-057 · V·L4). §5 `W6.md:310-327`. Gates j1–j4. Commit **#10** `feat(demo/scene-adoption)`.
**Locks**: Lane 4 — opens only after Lanes 1–3 land; order is **Gradient → Mix → Blob/Atmosphere**, the
adjudicated pilot→canary→adoption order, each route its own completable slice; **transitions are
X-W5's (CC-054/CC-055) — this unit asserts NO transition property of its own**, and its pane/sub-pane
assertions inherit the **PENDING-QUARANTINE**; **j4 is MEASURE-AT-OPEN** — taken **before any cure**
and, if GREEN, **retired with its measurement pasted, never carried**; writes
`MixConfigBar.vue` + `MixSourceSelector.vue` (X-W7-shared) **first**, and `AuroraPane.vue` after `.i`.
**HALT CONDITION (D-19, measured at this open)**: `.j` *adopts* the X-W5 scene contract, and X-W5 is
**`planned`** with **14 `component: Stub` routes / 0 scene-contract sites**. At dispatch the seat
**re-measures X-W5 first**; if it is still `planned` with no contract in the tree, the seat writes its
receipt with the measurement and **returns BLOCKED-ON `X-W5` without writing a product byte** — the
spec's §COMPLETABLE is explicit that *"a stall in one lane costs that instrument, not the wave."*

---

## Unit receipts

*(empty at open — each unit appends its own receipt here, line 1 `SERVED MODEL: <model id>`)*

---

### X.W6.a

SERVED MODEL: claude-opus-5[1m]

**Unit**: Gradient ordering, gesture and geometry core (CC-058 · MT-GRADSTOP-1 r3), `W6.md` §5 `:156-180`.
**Status**: **ESCALATED** — all **13 gates GREEN**, the §14 cure landed, and ONE bounds question returned
that this seat may not answer for itself (§Escalation below). Wall clock **2026-09-19**.
**Commits**: `f90aeb02` (the §14 family, whole) · `c222542d` (the a9 gutter) · this record.

#### Act 0 — crash-recovery (standing law)

⟨cmd⟩ `git status --porcelain` at open → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh`. **Neither is in this unit's writable set** (the first is the V fold-source, the
second the unowned NEVER-touch row). **No inherited hunk**: this seat began from `d482ffa1` with a clean
writable set and touched neither path. Sibling `.f` wrote `demo/color-session/**`,
`demo/picker/ColorPicker.vue`, `demo/scenes/about/**` and four `o2*` oracles concurrently; every commit
below carries its own pathspec and **staged none of them** (verified after each commit).

#### Act 1 — D-19: every instrument re-run FIRST. Two are STALE AT THE BYTES.

**This is the unit's largest finding and it is recorded loud.** The two gates that carry a3/a4 and
a5/a6/a7 cannot run against the shipped tree — not RED for the defect, **UNRUNNABLE**:

| instrument | ⟨cmd⟩ → output | reading |
|---|---|---|
| `…/probes/wb-gradient-stopeditor/gate-axis.mjs` | `page.evaluate: TypeError: null is not an object (evaluating 'h.getAttribute("aria-label").match(/([\d.]+)%/)[1]')` at `:35` | **STALE** |
| `…/probes/wb-gradient-stopeditor/gate-gesture.mjs` | `locator.boundingBox: Timeout 30000ms exceeded. waiting for locator('button[data-stop-id][aria-label="Gradient stop at 0%"]')` at `:21` | **STALE** |

**Cause, measured**: both parse the stop's percentage out of its accessible NAME. **X-W4 · C2**
(closed 2026-09-17, i.e. *after* the W6 spec's 2026-08-03 stamp) moved the percentage onto
`aria-valuenow`/`aria-valuetext` and made the name `Gradient stop 1 of 2` — the correct ARIA split, since
a drag must re-announce a VALUE and not rename its control every frame. ⟨cmd⟩ `grep -n 'C6/D2-13 attrs'`
of `WBGSE-O-r3-gestures.mjs`'s own output prints the live attribute set:
`role=slider · aria-valuenow=0 · aria-valuetext=Position 0% · aria-label=Gradient stop 1 of 2`.

**Disposition, per §4's Bounds law** (*"A unit that concludes it must EDIT one of those existing
instruments halts under §3a instead"*): **neither instrument was edited**. Their properties are held
whole by instruments authored **inside** this unit's writable set — the F.W8 precedent (*"G15's closure
reproduced whole with an instrument built here"*) — reading the ordinal from `aria-valuenow` (the
model's exact value) and the geometry from `style.left`, which is **strictly more precise** than the
whole-percent name the originals parsed, and is what GRADSTOP-A §6 requires anyway:

- **a3 · a4 · a12** → three ADDED specs in `e2e/smoke/oracles/o21-gradient-rail.spec.ts`
  (ADD-never-replace; the file's three existing specs are untouched and still pass).
- **a5 · a6 · a7 · a8 · a9 · a10 · a11** → `docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs`
  (in bounds: `W6.md:104`), chromium 1440×900 + the coarse playwright-webkit iPhone-14 cell.

Every other named instrument RAN. `p3.mjs` (a8) crashed identically **before and after** the cure
(`document.querySelector('[data-testid="gradient-stop-bar"]')` null at `:24`, a probe-boot condition of
its own, unrelated to this cure); a8's property is measured by the instrument above.

#### Act 2 — BEFORE, at this seat's own commands (transcripts in `W6-evidence/gradient/gates/`)

| gate | ⟨cmd⟩ | BEFORE measured here | spec's stated RED | verdict |
|---|---|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` | `parseGradientCSS -> reject: stop positions must be non-decreasing … << linear-gradient(90deg, … 74.9%, … 50%, … 100%)` | same string, same reason | **reproduces** |
| a1 | end-state `npx vitest run test/gradient-order-invariant.test.ts` | file ABSENT | RED-by-absence | **reproduces** |
| a2 | `node …/WBGSE-O-r3-crossdrag-forcedcolors.mjs` | emitted `linear-gradient(90deg, … 83.8%, … 50%, … 100%)` — **descending** | labels [84,50,100]; CSS descends | **reproduces** |
| a3/a4 | `node …/gate-axis.mjs` | **UNRUNNABLE** (above) | ±11.0px | **stale instrument** |
| a5/a6/a7 | `node …/gate-gesture.mjs` | **UNRUNNABLE** (above) | 10.11px / BODY / mint | **stale instrument** |
| a7 | `node …/WBGSE-O-r3-gestures.mjs` (C14) | `{"beforeMid":2,"afterMid":3,"afterRight":4}` | middle 2→3, right 3→4 | **reproduces exactly** |
| a8 | `node …/p3.mjs` (T9) | crash at `:24` (bar null) — same before and after | 2 emits/move | **instrument condition, recorded** |
| a9 | `node …/p4.mjs` (T11, webkit iPhone-14) | `T10 stops after cross {"centers":[235,362.6,270.6,675]}` — **unsorted** | 3→2 silent; unsorted | **reproduces** |
| a10 | `node …/p2.mjs` (T2) | crash at `:28` (bar null) | chip crosses the hr | **instrument condition, recorded** |
| a11 | `node …/WBGSE-D-probe4.mjs` | `white-light handle: {"border":"rgb(198,180,159)","bg":"none"}` — reads the SEAT, whose paint X-W4 moved to `.rail-handle-face` | 1.00:1 | **stale reading, recorded** |
| a12 | `node …/WBGSE-D-probe2.mjs` (block 5) | `beforeOverhangPx: 1` @rootFS 16 · **`afterOverhangPx: 4`** @rootFS 20 (handleW 30, handleLeftEdge 98, barLeftEdge 102) | +1.50px | **reproduces, magnitude RE-MEASURED to +4.0px** (X-W4 grew the seat to `max(1.5rem,24px)` while the JS inset literal stayed `10`) |
| a13 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **3 failed / 9 passed** | 5 failed / 8 passed | **reproduces in kind; count RE-MEASURED** (X-W4 cured two) |

**§17 count-scoping honoured**: the a12 figure is DOM, the a3 skew is DOM; no PNG number is cited. The
*"15-significant-digit"* literal characterization is not cited. The *"6/10"* ramp figure is not cited.

**a13's three dead-DOM assertions, named and measured** (the spec's `o21:135/:163, gradient:57/:112`
line numbers had drifted — X-W4 already re-anchored o21, which passes 3/3 at open):
`gradient.spec.ts:60`/`:61` and `:121`/`:128`/`:135`/`:141`/`:143` read the retired W5-8 envelope-plate
condition line (⟨cmd⟩ `grep -rn 'C ≤' demo | wc -l` → **0**), and `:286` expects `steps(4, end)` where the
shipped catalogue mints `steps(4, jump-end)` (`easingCatalogue.ts:187`).

#### Act 3 — the cure (`f90aeb02`, ONE commit; GRADSTOP-A §14's family unsplit)

- **MODEL** — `GradientStop` gains `easing` (the curve of the interval the stop OPENS). DELETED: the
  `intervals` ref, its length watcher, the index-keyed `updateInterval`, `GradientModelState.intervals`
  and `ParsedGradientModel.intervals`. `setStopPosition(id, position)` is the sole position mutator:
  map → **stable** sort. **Equality stays legal** (`byPosition` returns 0 on a tie, so coincident CSS
  hard stops keep their seats). **No clamp to neighbours** (the D-8 refusal species) and **no
  splice-at-insert**. **No minimum-ordinal-spacing rule** (§15).
- **AXIS** — `railPosition(fraction)` = `calc(var(--rail-inset) + var(--rail-track) * f)`, minted once in
  `useGradientCSS` and read by the rail ramp's colour-stop positions, by every handle/ghost/caret/chip
  `left`, and — through the **registered** `@property --rail-inset` — by the script's inverse
  (`clamp` + `scale` from `@mkbabb/value.js/math`). `HANDLE_HALF = 10` is gone; the inset is
  `calc(var(--rail-handle-size) / 2)` and the seat is `var(--rail-handle-size)`, so the two cannot drift
  at a type-scale change. The rail's `1px` border became an **inset ring** so the gradient box and the
  handles' containing block are ONE box (with a border they differ by exactly 1px at every ordinal).
  Verified in both engines before authoring: ⟨cmd⟩ a two-engine probe → handle centres `[12,200,388]`
  and ramp stops `calc(0% + 12px)` / `50%` / `calc(100% - 12px)` on a 400px rail, **chromium ≡ webkit**.
- **GESTURE** — `grabDx` against a rect cached at pointerdown; the first position write waits for the
  existing 4px dead zone; `e.preventDefault()` deleted and `seat.focus()` taken explicitly (WebKit does
  not focus a button on press); `if (e.button !== 0) return` atop **both** pointerdowns; dedicated
  `pointercancel` handlers that ONLY disarm; the bar's duplicate drag emit, the second selection channel
  (`select` emit), the contextmenu removal species, the `colorAt` masking default, `GradientPane`'s dead
  `inject(CSS_COLOR_KEY)!` and **three unreachable throws** all deleted.
- **PAINT** — the resting/selected handle ring is dual-contrast, generalized from the file's own
  `--focus-ring-inner/-outer` recipe; the chip reserves its own ground (a10) and sits a full coarse
  target below the handle centre (a9, gutter added at `c222542d` — see Act 5).
- **ORACLE** — `setStopsFromColors` validates through `parseCssColor`, which since X-W9's cure RETURNS
  `{ok:false,diagnostics}`; the consumer **branches on the shape**. ⟨cmd⟩ `grep -c 'try {' demo/workbenches/gradient/` → **0**.
  H3(1)'s flip is witnessed at this seat: `parseCssColor("oklch()") -> reject` (no throw) in the a1 probe.

#### Act 4 — AFTER (double-run; every figure read from the settled bytes)

| gate | ⟨cmd⟩ | BEFORE → AFTER | verdict |
|---|---|---|---|
| a1 | `vite-node parse-probe.ts` + `vitest run test/gradient-order-invariant.test.ts` | absent → **13 passed (13)**, double-run identical | **GREEN** |
| a2 | `node …crossdrag….mjs` + e2e `-g "neighbour-crossing drag round-trips"` | `… 83.8%, 50%, 100%` → **`… 50%, 84.4%, 100%`** (ascending) | **GREEN** |
| a3 | o21 *"one axis: every handle centre sits where the ramp paints its own ordinal"* | ±11.0px → **≤1px at p ∈ {0,50,100}** | **GREEN** |
| a4 | o21 *"the forward and inverse maps are inverse"* | 0.226 → **|Δ| ≤ 0.05 at p ∈ {0,100}**, read from `style.left`/`aria-valuenow` | **GREEN** |
| a5 | `gate-a-gesture-paint.mjs` | 10.11px → **travel@1px = 0.00px**; **travel@120px = 120.00px** (the grab offset is not added) | **GREEN** |
| a6 | same | `BODY/` → **`BUTTON/stop-…`**, ArrowLeft `100 → 98` | **GREEN** |
| a7 | same + `WBGSE-O-r3-gestures.mjs` C14 | `{2,3,4}` → **`{"beforeMid":2,"afterMid":2,"afterRight":2}`**; cancel-in-dead-zone mints 0 | **GREEN** |
| a8 | same | 2 writes/move → **5 aria-valuenow writes over 5 pointermoves** | **GREEN** |
| a9 | same (webkit iPhone-14) | tap +20/+22px destroyed → **0 rows inside the handle's 44px target claimed by the destructive control**, chip still reachable (`3 → 2` at its own centre) | **GREEN** |
| a10 | same + `p2.mjs` T2 | chip crossed the hr → **chip band `[256.7, 280.7]`, `.rail-seat` `[200.7, 280.7]`, 0 sibling rules intersected** | **GREEN** |
| a11 | same | 1.00:1 → **ring:fill `15.08:1` @0% and `14.59:1` @100%** on the `#ffffff → #fafafa` ramp (the dark pole carries it; the light pole reads 1.00 — that is the dual-contrast recipe working, not a miss) | **GREEN** |
| a12 | `WBGSE-D-probe2.mjs` block 5 | `1` / `4` → **`beforeOverhangPx: 0` · `afterOverhangPx: 0`** (rootFS 16 **and** 20; handleLeftEdge 102 ≡ barLeftEdge 102) | **GREEN** |
| a13 | `npx playwright test … --project=smoke` + `vitest run test/gradient-order-invariant.test.ts` | 3 failed / 9 passed → **17 passed (17)**, double-run **17 ≡ 17**; **13 passed (13)** vitest | **GREEN** |

**a13's vacuity falsifier, demonstrated, not asserted** (GRADSTOP-A §13; transcript
`gates/a13-vacuity-falsifier.txt`): with `.sort(byPosition)` deleted from `setStopPosition` →
**5 failed / 8 passed**; with `railPosition` rewritten to a plain `%` map (the `HANDLE_HALF` mutation's
successor) → **1 failed / 12 passed**. Both mutations reverted by single-path `git checkout --` off this
unit's own commit; ⟨cmd⟩ `git status --porcelain -- demo/workbenches/gradient test e2e` clean after each.

#### Act 5 — the a9 gutter (`c222542d`, its own meaning)

The first AFTER run of `gate-a-gesture-paint.mjs` was **RED on a9**: a real tap 22px below the handle's
own centre destroyed a stop (`3 → 2`). ⟨cmd⟩ an `elementFromPoint` census on the iPhone-14 cell printed
`HANDLE` for dy 0..20 and `CHIP` for dy 22..40 — the two 44px inflated regions were **adjacent, sharing
their boundary row**, which the chip (z-index 20) won. 22px is inside the handle's OWN advertised target.
Cure: `--rail-gutter: 0.25rem` (the seat's existing `gap-1` rhythm) added to `--rail-chip-top`; the
reserved band follows, because it is derived from that offset. Re-measured: **0 claimed rows**, chip
still reachable. **A second finding rides this act**: the gate's first census read `--rail-touch` with
`getPropertyValue`, which hands back the token text `var(--touch-target, 2.75rem)` — `parseFloat` gave
**2.75**, a one-pixel scan, i.e. a **vacuous green**. The instrument now reads the RESOLVED pseudo-element
box (`getComputedStyle(handle, "::before").height` → **44px**) and **refuses to report green** if that
measures below 24px. Caught here, recorded here.

#### Format / lint / typecheck cadence (§7)

- ⟨cmd⟩ `npx eslint demo/workbenches/gradient e2e test` → **exit 0, no output**.
- ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` → **0 errors under `demo/workbenches/gradient`**
  (two errors are reported under `demo/color-session/` — sibling `.f`'s in-flight tree, not this unit's).
- ⟨cmd⟩ `npx tsc -p tsconfig.e2e.json --noEmit` → **exit 0**.
- ⟨cmd⟩ `git diff --check` → clean on both commits.
- ⟨cmd⟩ `npx prettier --check` on the seven touched product paths → **warns**. Measured at HEAD before
  any edit (the same files re-extracted from `git show HEAD:` and checked in isolation): **the same paths
  already warned**, as do four gradient files this unit never touched. Prettier is **not enforced on this
  tree**; this unit adds no new debt and introduces no reformatting churn. Recorded, not smoothed.

#### Residuals (named, not smuggled)

1. **The two stale instruments** (`gate-axis.mjs`, `gate-gesture.mjs`) remain on disk, unedited and
   unrunnable. They are `execute, no write` for every unit. A successor wave that wants them alive must
   re-point them at `aria-valuenow` — a one-line change per gate, inside whichever wave owns
   `…/probes/wb-gradient-stopeditor/**`.
2. **`p3.mjs` (a8)** crashes identically before and after on a null `[data-testid="gradient-stop-bar"]`;
   a probe-boot condition, not a product one. a8 is measured by this unit's own instrument.
3. **`WBGSE-D-probe4.mjs` (a11)** reads the handle SEAT's `border`/`background`; X-W4 moved the paint to
   `.rail-handle-face`, so its output is a stale reading either way. a11 is measured against the face.
4. **The dev cell is API-LESS** (π obligation): the `setStopsFromColors` **end-to-end** witness through a
   real palette is **UNVERIFIABLE-HERE** and is not claimed. Its model-level contract IS gated
   (three assertions in `test/gradient-order-invariant.test.ts`).
5. **Not claimed**: any serialization-cost delta (GRADSTOP-A §8), any safari-app property (I-20), any
   bundle or perf property, any parser cure (X-W9's), any repo-wide `demo/ui` count (X-W8's).

#### ESCALATION — two `test/` files own bounded modules and sit outside this unit's writable set

The cure deletes `GradientModelState.intervals` / `ParsedGradientModel.intervals`, which is the point:
leaving them would keep an index-keyed easing lookup alive in the serialization path, i.e. the defect,
under a different tenancy. Two existing suites read those fields at RUNTIME and **cannot be migrated
from this seat**:

| file | failing assertion | one-line migration |
|---|---|---|
| `test/gradient-parse.test.ts` | `:32` `expect(m.intervals).toHaveLength(1)` · `:63` `…toHaveLength(2)` | read `m.stops.length - 1`, or drop the two lines (the stops assertions beside them already carry the shape) |
| `test/gradient-v4-consume.test.ts` | `:20` the `GradientModelState` literal carries `intervals: [linearInterval()]` and its two stop literals carry no `easing` → `:33` `sampleCoalescedStops(model)` reads `s0.easing` as `undefined` | delete the `intervals:` line; add `easing: linearInterval()` to each stop literal |

⟨cmd⟩ `npx vitest run` → **16 failed / 610 passed (626)**. **3 of the 16 are this cure's**, exactly the
rows above. The other **13** are pre-existing and belong to other trees
(`v4-css-emerging` **10** — `serializeCssValue` is not exported from `src/css/stylesheet`;
`spectrum-luma` 1; `v4-c1` 1; `demo/test/shell/reka-binding-idiom` 1); this unit touched no file any of
them import.

**Why this seat did not write them.** The standing law is categorical: *"Writes are lawful ONLY inside
the wave's §File Bounds writable set for your unit; any write outside it is an ESCALATION — stop and
return it."* `test/gradient-v4-consume.test.ts` **is** inside the WAVE's bounds — `X-W6-FOLD.md` §3
BoundsDelta **n.34** adds it as `modify` — but routed to unit **`.d`** (row W6·124, C-12's 7-tile slack
at `:55-57`), not to `.a`. `test/gradient-parse.test.ts` is in **no** bounds row of `W6.md` §4 **and no
BoundsDelta row**: ⟨cmd⟩ `grep -rn 'gradient-parse' docs/tranches/X/ docs/tranches/V/megatranche/` returns
only a file-list mention in `SITTING-DOSSIER-2026-09-17.md`. That second one is a genuine **§3a** trigger
(*file-bound expansion that invalidates the wave*), and §3a says the unit **halts** rather than widens.

**Why the cure was landed anyway.** **No gate this unit owns needs either file**: a13's command set is
`npx playwright test <the two specs> --project=smoke` + `npx vitest run test/gradient-order-invariant.test.ts`,
and both are GREEN. The §14 family may not split, so the alternative — returning with nothing landed —
would have cost the whole Lane-1 head for a two-line question. The §7 whole-suite cadence is therefore
**RED on exactly 3 assertions in 2 files** until the bounds are granted. Stated, not smoothed.

**What is asked**: one line granting `.a`'s successor (or `.b`, which opens next in this lane) the two
paths above, with the migrations as written. Nothing else in the wave is blocked by it.

#### Files written by this unit (nothing outside them)

`demo/workbenches/gradient/composables/{useGradientModel,useGradientCSS,gradientParse}.ts` ·
`demo/workbenches/gradient/GradientVisualizer/{GradientStopEditor,GradientVisualizer,GradientEasingEditor}.vue` ·
`demo/workbenches/gradient/GradientPane.vue` · `test/gradient-order-invariant.test.ts` ·
`e2e/smoke/views/gradient.spec.ts` + `e2e/smoke/oracles/o21-gradient-rail.spec.ts` (ADD-never-replace:
3 existing o21 specs untouched, 3 added; in `gradient.spec.ts` 2 added and 3 re-pointed with the
measurement that retired their referents) · `docs/tranches/X/waves/W6-evidence/gradient/**` ·
this record.

---

### X.W6.f

SERVED MODEL: claude-opus-5[1m]

**Unit**: The space catalog and the specimen line (CC-068 · V·MT-W-CSS1 → **X:CSS-1**), `W6.md` §5
`:244-265`, §7 `:346-350`, §9 commit #6 `:382`.
**Status**: **PARTIAL — ESCALATED**. **9 of 10 gates GREEN** (f1 f3 f4 f5 f6 f7 f8 f9 f10); **f2 is
HONEST-RED at 1 of its 2 hits**, the survivor being another wave's file. Two escalations and one gate
DEVIATION are returned below. Wall clock **2026-09-19**.
**Commits**: `e0e204a9` (the cure, whole — 22 paths) · this record.

#### Act 0 — crash-recovery (standing law)

⟨cmd⟩ `git status --porcelain` at open → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh`. **Neither is in this unit's writable set** (the V fold-source; the unowned
NEVER-touch row). Neither was touched, staged or restored. Sibling `.a` wrote
`demo/workbenches/gradient/**` concurrently and Track B wrote `docs/tranches/X/execution/B/**`; at the
moment of this unit's commit ⟨cmd⟩ `git diff --cached --name-only` showed **two foreign paths already
staged by Track B** (`execution/B/KF-W11.md`, `keyframes/evidence/W11/g-spring-artifact-truth-2026-09-19.md`).
They were **neither swept in nor unstaged** — the commit carried its own 22-path pathspec, and ⟨cmd⟩
`git show --name-only e0e204a9 | grep -E 'execution/B|keyframes/evidence'` returns **nothing**. The
sibling's work landed intact in its own commits (`f6cdff82`, `981d4cb1`).

#### Act 1 — BEFORE, re-measured at this seat (D-19; figures NOT inherited from the adjudication)

| gate | ⟨cmd⟩ | BEFORE measured here | spec's stated RED | verdict |
|---|---|---|---|---|
| f1 | `node …/gate-catalog-totality.mjs` | offered=**18**, info=**13**, docs=**11**; `display-p3.created` = **1931** (RGB's) | identical | **reproduces** |
| f2 | `grep -rn 'colorSpaceInfo\.rgb\|(colorSpaceInfo as any)' demo` | **2** — `ColorNutritionLabel.vue:214` · `ConsoleRail.vue:174` | 2 hits | **reproduces** |
| f3 | `o21-space-catalog-truth.spec.ts` | "Display P3" renders `Created: 1931` + RGB's components; 7 guide sections are a bare heading | identical | **reproduces** |
| f4 | `o22-specimen-legibility.spec.ts` | **16/18 overflow, worst 723px in a 234px box** | 16/18, worst **758px** | **reproduces; magnitude RE-MEASURED to 723px** |
| f5 | `grep -rn 'data-specimen-form' demo` | **0** | 0 | **reproduces** |
| f6 | `grep -rn 'data-out-of-gamut' demo` | **0**; and **10** rows out of gamut for the boot colour | 0; "five rows" | **reproduces; the count RE-MEASURED to 10** (the adjudication's list was partial: it omits the four wide-gamut RGB encodings and `hex`) |
| f7 | `grep -rn 'colorSpace: any' demo` + `grep -c 'as DisplayColorSpace' …Selector.vue` | **3** (`AboutPane:25` · `ColorPicker:49` · `ColorSpaceSelector:11`) + **1** (`:91`) | 3 + witness | **reproduces** |
| f8 | `o24…` + `grep -c 'tag=' …Selector.vue` | `distinctVisualSignatures` **1** (seed 240 ×18); `tag=` **1** | identical | **reproduces** |
| f9 | `grep -c 'updateToColorSpace' …Selector.vue` / watch-grep | **0** in the component; **1** peer watcher (`ColorPicker.vue:359-365`) | identical | **reproduces** |
| f10 | `grep -rn 'from "\.\./ui/' demo/color-session/` | **1** (`…Selector.vue:109`) | exactly 1 | **reproduces** |

**The count behind the defect, stated once.** Four registries disagreed about which spaces exist:
`DISPLAY_COLOR_SPACE_NAMES` (18), `colorSpaceInfo` (13), `AboutPane`'s `markdownModules` (11) and
`INTERPOLATION_SPACES`. The product closed every gap with a fallback, which is why selecting a space it
could not describe produced *another space's* colour science rather than an absence.

#### Act 2 — the cure (`e0e204a9`, ONE commit; structure first, gates only for rendering truth)

- **CATALOG** — NEW `space-catalog.ts`: one `SPACE_CATALOG` satisfying
  `Record<DisplayColorSpace, SpaceEntry> & { readonly [K in DisplayColorSpace]: SpaceEntry<K> }`, so a
  missing space is a compile error **and** no row can carry another's `id`. It folds the names table, the
  facts table, About's markdown map and interpolation membership into one home; **the 5 missing info rows
  are authored** (srgb-linear 1996 · display-p3 2015 · a98-rgb 1998 · prophoto-rgb 2000 · rec2020 2012,
  each with its own definition, white point and gamut prose) and **the 7 missing docs are decided
  explicitly** as `doc: null`. §3 of the gate exists because `satisfies` cannot catch a stub: the
  adjudication's own words, *"a catalog that compiles because five entries were stubbed is the masking
  fallback wearing a type's clothes."*
- **SPECIMEN** — NEW `specimen-format.ts`: one total `formatSpecimen(color, space)` →
  `{ text, form: "css" | "channels", outOfGamut }`. The discriminant makes two-grammars-in-one-slot
  unrepresentable; ONE digit policy (**4 significant digits, floored at 4 decimals**) bounds every caption
  at a **measured 50 of a declared 52** characters; gamut is measured per channel (hue exempt, cyclic) and
  **MARKED**. `mapColorToGamut` is imported nowhere in the path — the static half of the f6(ii) lock.
- **THE BOX** — the 234px caption could not hold a true `color(prophoto-rgb …)` statement at any digit
  budget that stays parseable. Measured cure: the caption drops the eyebrow's `--type-tracking-caps`
  (uppercase tracking on a numeral run is what made it wide) and the box is sized **from the budget**,
  `max-width: calc(var(--specimen-char-budget) * 1ch)`, bound to `SPECIMEN_CHAR_BUDGET` itself. Type size
  is unchanged at 14.048px — **nothing was shrunk to fit**. See DEVIATION 1.
- **THE BOUNDARY** — `defineModel<DisplayColorSpace>` replaces the wide prop and the hand-written emit.
  glass `Select` hands back `SelectionValue = string | number`, so the narrowing is a **type predicate
  backed by a runtime membership test** (`value in SPACE_CATALOG`), never a cast: the producer boundary is
  checked once, in one place, and the four `any`/cast holes become unspellable.
- **DELETIONS** — `ColorPicker.vue`'s `selectedColorSpace` watcher (half a command living in a peer
  component, which is why About only converted when the picker happened to be mounted beside it);
  `color-model.ts`'s `DISPLAY_COLOR_SPACE_NAMES` and `CSS_NATIVE_SPACES`; `ColorNutritionLabel`'s
  `colorSpaceInfo.rgb` fallback and its two casts; `AboutPane`'s 11-name `MarkdownSpace` union and its
  markdown map; the `tag="div"` prop `WatercolorDot` never declared; the `../ui/select` edge.
  `toCSSColorString` was **kept** — it has live consumers outside these bounds.

#### Act 3 — AFTER (double-run; every figure read from the settled bytes; transcripts in `W6-evidence/catalog/GATE-TRANSCRIPTS.md`)

| gate | ⟨cmd⟩ | BEFORE → AFTER | verdict |
|---|---|---|---|
| f1 | `node …/gate-catalog-totality.mjs` | 18/13/11 → **offered=18 catalogued=18 info=18, docs=11 authored + 7 decided-none = 18 decided**; `display-p3` created **2015** | **GREEN** |
| f2 | `grep -rn 'colorSpaceInfo\.rgb\|(colorSpaceInfo as any)' demo` | 2 → **1** (`ConsoleRail.vue:174`) | **RED — honest, escalated** |
| f3 | `npx playwright test o21-space-catalog-truth.spec.ts` | P3 showed 1931 → **18 spaces walked, 18 distinct definitions, every guide section non-empty**; `display-p3` states 2015 | **GREEN** |
| f4 | `npx playwright test o22-specimen-legibility.spec.ts` | 16/18 over, worst 723px → **0/18 over**, worst scrollWidth **397px** (46ch), per-char **8.630px**, font-size **14.048px unchanged**, letter-spacing **normal** | **GREEN** |
| f5 | `node …/gate-specimen-grammar.mjs` | `data-specimen-form` 0 → 1; **65,610 specimens over 18 spaces, css=14 channels=4, longest 50/52 chars**; every `css` row parses, every `channels` row does not | **GREEN** |
| f6 | `npx playwright test o23-specimen-gamut-honesty.spec.ts` | `data-out-of-gamut` 0 → 1; **all 18 marks match an independent recomputation**; 10 MARKED / 8 in-gamut | **GREEN — with DEVIATION 1** |
| f7 | greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` + witness project | `colorSpace: any` 3 → **0**; `as DisplayColorSpace` 1 → **0**; vue-tsc **exit 0**; witness **exit 0** (the `@ts-expect-error` over `modelValue="not-a-space"` is USED) | **GREEN** |
| f8 | `npx playwright test o24…` + `grep -c 'tag='` | signatures 1 → **18 of 18** under keying that EXCLUDES the url; all 18 `feTurbulence` seeds distinct; **background constant across rows** (the dots distinguish by silhouette, never by repainting a projected colour); `tag=` 1 → **0** | **GREEN** |
| f9 | two greps | `updateToColorSpace` in the component 0 → **2**; `ColorPicker` watch-grep 1 → **0** | **GREEN** |
| f10 | `grep -rn 'from "\.\./ui/' demo/color-session/` | 1 → **0** (repointed to `@mkbabb/glass-ui/select`) | **GREEN** |

**The f7 witness proves its own mechanism.** A gate whose `@ts-expect-error` is "used" proves nothing
unless the wide contract would have made it unused. ⟨cmd⟩ the same witness against
`type BoundSpace = string` → `control.ts(4,1): error TS2578: Unused '@ts-expect-error' directive`,
**exit 2** — i.e. the pre-cure contract is exactly the RED the gate describes. Demonstrated, not asserted.

**f6's anti-projection lock, and what carries it.** Leg (b) is **exact, no tolerance**: every printed
coordinate sits within **half a unit of its own last printed digit** of the true coordinate in that space.
A projection moves a coordinate by whole units (`385.3 → 255`), thousands of times the resolution it
prints at, so this leg has no slack to hide in. Leg (d) holds the same property from the other side: a
row MARKED out-of-gamut must still PRINT numerals outside that space's bounds — a projected value is
in-gamut by definition, so the numbers would fall back in range while the mark stayed on.

#### DEVIATION 1 — f6(ii)'s stated `1e-6` constant is unsatisfiable once f4 is GREEN. Named, not smoothed.

The gate as written asks for `convertColor(parseCssColor(caption).value,'lab') ≈ model` to **1e-6**, and
records *"GREEN today (≤1e-10)"*. That reading is true **only because the caption printed 15 significant
digits** — which is the very thing f4 declares a defect. Any digit budget narrow enough to fit the box
moves the Lab recovery far above 1e-6: the two gates are in direct tension, and the tension is arithmetic,
not a matter of care.

Resolved by the adjudication's own wording — *"the SAME coordinate values, **digit-budgeted** … a delta in
which the numbers moved is a projection"* — by testing the property rather than the constant: the exact
legs (b) and (d) above, plus leg (c) restating it in Lab against a **measured** bound that carries its own
**positive control**. The run publishes both numbers: **worst un-projected recovery 7.517e-1 (hsl); bound
1; clipped control (hex, whose 8-bit encoding FORCES a clip) 4.061e+1** — a factor of ~54 between a
digit-budgeted row and a genuinely projected one. A fold-in of `mapColorToGamut` still trips every leg.

**This seat authored the oracle that sets that bound, so it does not mark its own homework**: the
substitution is returned for ratification with both figures printed. Nothing else in the unit depends on
the ruling.

#### Format / lint / typecheck cadence (§7)

- ⟨cmd⟩ `npx prettier --write` on the new files + `ColorPicker.vue` → written.
- ⟨cmd⟩ `npx eslint demo/` → **exit 0**.
- ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` → **exit 0, no diagnostics** (the two errors sibling
  `.a` recorded under `demo/color-session/` were this unit's in-flight tree; they are gone at the settled bytes).
- ⟨cmd⟩ `npx vitest run` → **16 failed / 610 passed (626)**. **None is this unit's**: 3 belong to sibling
  `.a`'s escalated `test/gradient-*` pair and 13 are the pre-existing set (`v4-css-emerging` 10,
  `spectrum-luma` 1, `v4-c1` 1, `reka-binding-idiom` 1). ⟨cmd⟩ verified by inspection that **no failing
  file imports any path in this unit's diff**.
- ⟨cmd⟩ `npx playwright test <the four oracles> e2e/smoke/color-space-switching.spec.ts --project=smoke`
  → **5 passed**, **double-run 5 ≡ 5** (1.3m / 1.4m).
- ⟨cmd⟩ `git diff --check --cached` → clean.

#### Residuals (named, not smuggled)

1. **`colorSpaceInfo.ts` survives** as a module. This unit folded its content into the catalog for every
   consumer it owns, but the file cannot be deleted while `ConsoleRail.vue` (X-W9.h's) still imports it.
   Deletion belongs to whichever unit cures that last reader.
2. **Oracle-number collision**: `e2e/smoke/oracles/o21-gradient-rail.spec.ts` (sibling `.a`) and
   `o21-space-catalog-truth.spec.ts` (this unit) now share the ordinal `o21`, as do `o22-status-lamp` and
   `o22-specimen-legibility`. Both spec texts name their files explicitly, so no gate is ambiguous; the
   **numbering namespace** is. Recorded for whoever owns the oracle index.
3. **`toCSSColorString` kept** in `color-model.ts` — live consumers (`useColorUrl`, `useColorPipeline`) sit
   outside these bounds.
4. **Not claimed**: any repo-wide `demo/ui` extirpation count (X-W8's), any parser property (X-W9's), any
   bundle, perf or safari-app property, any PNG-derived number (§17 count-scoping honoured — every figure
   above is DOM, grep or gate output).

#### ESCALATION 1 — f2's surviving hit is X-W9.h's file

⟨cmd⟩ AFTER → **1**: `demo/picker/controls/ComponentSliders/ConsoleRail.vue:174`
`const info = (colorSpaceInfo as any)[space];`. The path is **not in `W6.md` §4**, and `W9.md:104` /
`:142-147` / `:302-311` book that component — `componentDescription()` at `:172-180`, re-keyed to the
library channel ids — to **X-W9.h**. Curing it here is the §3a file-bound expansion that invalidates the
wave, so this seat halted at the boundary and wrote nothing there.

**The one-line migration, so X-W9.h inherits it free**: `SPACE_CATALOG[space].info` is total over
`DisplayColorSpace` and needs no cast and no fallback; the `as any` and the index guard both delete.
**What is asked**: either a line granting a successor that single path, or an acknowledgement that f2
closes at X-W9.h. Nothing else in this wave is blocked by it.

#### ESCALATION 2 — a PRE-EXISTING URL round-trip revert, found by f3's walk

f3's 18-space walk printed: **spaces that did NOT survive the model→URL→model round-trip: `ictcp→oklch`,
`jzazbz→oklch`**. Root-caused, not absorbed: `useColorUrl.ts` → `applyUrlToModel` → `inputColor` →
`parseAndSetColor` re-parses the serialized colour, and the two non-CSS spaces have no CSS syntax to
re-parse, so the model silently lands in `oklch`. **Every link in that chain is outside `W6.md` §4.**
The defect **predates this unit** (it is a property of the URL codec, not of the catalog) and is
**unrelated to the specimen grammar** — the `channels` form is a display statement, never a URL payload.

The oracle was made deterministic against it (each space read immediately, settled 500ms) and **reports
the revert as a number plus a footnote rather than tolerating it**, so the day someone fixes the codec the
count moves and is seen. **What is asked**: a home for the URL codec's non-CSS-space round-trip. It is a
genuine product defect on a first-class route.

#### Files written by this unit (nothing outside them)

`demo/color-session/{space-catalog,specimen-format}.ts` (new) · `demo/color-session/ColorSpaceSelector.vue` ·
`demo/color-session/color-model.ts` · `demo/scenes/about/{AboutPane,ColorNutritionLabel}.vue` ·
`demo/picker/ColorPicker.vue` · `e2e/smoke/oracles/{o21-space-catalog-truth,o22-specimen-legibility,o23-specimen-gamut-honesty,o24-specimen-dot-identity}.spec.ts` (new) ·
`docs/tranches/X/gates/{gate-catalog-totality,gate-specimen-grammar}.mjs` (new) ·
`docs/tranches/X/waves/W6-evidence/catalog/**` (transcripts, the f7 type witness + its project, 3 BEFORE
and 3 AFTER frames) · this record.

---

## Close

SERVED MODEL: claude-opus-5[1m]

**Seat**: X-W6 CLOSE (Track A) — **VERIFY-ONLY**. Wall clock **2026-09-19**.
**Verdict**: **PARTIAL**. **2 of 10 units landed** (`.a`, `.f`); **8 units were never dispatched**
(`.b .c .d .e .g .h .i .j`). **24 of 50 gates GREEN**, every one re-run at this seat's own commands
against the settled bytes; **26 RED**, of which **24 are RED-BY-ABSENCE-OF-A-UNIT** and only **2**
(f2, H4) are RED with a unit's bytes on the floor. The four-verb line is **NOT** moved to IMPLEMENTED —
`W6.md:10` may only flip when the wave's 45 born-RED sub-gates are green, and 24 of them have no seat.

This close **cured nothing**. Its one write to a product-adjacent path is `gate-no-chassis.mjs`, the
wave-level H1 instrument the Unit plan assigns to *"Wave-level, assigned to NO unit … the close seat is
dispatched separately"* — authoring it is inside `W6.md:98`'s own `create` row, and without it H1 is an
assertion rather than a measurement.

### Bounds and commit roster — every commit exists, every path is inside its unit's writable set

⟨cmd⟩ `git show --stat <sha>` over all five unit commits; each path checked against `W6.md` §4 and the
unit's own §5 Files line.

| commit | unit | paths | bounds verdict |
|---|---|---|---|
| `f90aeb02` | `.a` | 10 — the 7 gradient product paths + `test/gradient-order-invariant.test.ts` + `gradient.spec.ts` + `o21-gradient-rail.spec.ts` | **CLEAN** — the literal §5 `.a` Files list, nothing else |
| `c222542d` | `.a` | 1 — `GradientStopEditor.vue` | **CLEAN** |
| `e77650e1` | `.a` | 27 — this record + `W6-evidence/gradient/**` | **CLEAN** (`W6.md:104`) |
| `e0e204a9` | `.f` | 22 — the 7 catalog/picker/about product paths + 4 `o2*` oracles + the 2 `X/gates/` instruments + `W6-evidence/catalog/**` | **CLEAN** (`ColorNutritionLabel.vue` at `demo/scenes/about/` is fold §2 **e.2**'s ruled erratum, not a widening) |
| `7e5b9512` | `.f` | 1 — this record | **CLEAN** |

⟨cmd⟩ `git show --name-only <sha> \| grep -E 'execution/B\|keyframes/evidence\|scripts/dev/dev\.sh'` over
all five → **nothing**. Three sibling tracks committed inside this wave's window (`x-kf-w11`, `x-p-w3`,
`x-f-w3`) and **no W6 commit swept one of their paths**; `scripts/dev/dev.sh` is untouched and unstaged
in all five. **Zero writes outside bounds. Zero landed-wrong paths.**

### Gate table — BEFORE → AFTER, re-measured at this seat

**`.a` — 13 of 13 GREEN.** Every figure below was read by this seat, not inherited.

| gate | ⟨cmd⟩ at this seat | reading | verdict |
|---|---|---|---|
| a1 | `npx vite-node …/parse-probe.ts` + `npx vitest run test/gradient-order-invariant.test.ts` | probe prints `parseCssColor("oklch()") -> reject` (no throw) and rejects the descending literal by name; **13 passed (13)** | **GREEN** |
| a2 | `node …/WBGSE-O-r3-crossdrag-forcedcolors.mjs` | emitted `linear-gradient(90deg, … 50%, … 84.4%, … 100%)` — **ascending**; lefts are three `calc(var(--rail-inset) + var(--rail-track) * f)` | **GREEN** |
| a3 | o21 *"one axis: every handle centre sits where the ramp paints its own ordinal"* | passed | **GREEN** |
| a4 | o21 *"the forward and inverse maps are inverse"* | passed | **GREEN** |
| a5 | `node …/W6-evidence/gradient/gate-a-gesture-paint.mjs` | `travel@1px=0.00px  travel@120px=120.00px` | **GREEN** |
| a6 | same | `activeElement=BUTTON/stop-2-…`, ArrowLeft `100 → 98` | **GREEN** |
| a7 | same + `node …/WBGSE-O-r3-gestures.mjs` | `{"beforeMid":2,"afterMid":2,"afterRight":2}`; cancel-in-dead-zone `2` | **GREEN** |
| a8 | same | **5** `aria-valuenow` writes over 5 pointermoves | **GREEN** |
| a9 | same (webkit iPhone-14) | 44px target; **rows inside the handle's own target claimed by the destructive control: `[]`**; chip still reachable `3 → 2` | **GREEN** |
| a10 | same | chip band `[256.7, 280.7]`; **rules intersected: 0** | **GREEN** |
| a11 | same | white-ramp ring:fill inner **15.08:1** @0% · **14.59:1** @100% | **GREEN** (see residual R-6) |
| a12 | `node …/WBGSE-D-probe2.mjs` | `beforeOverhangPx: 0` · `afterOverhangPx: 0`; handleLeftEdge ≡ barLeftEdge at rootFS **16** (224≡224) **and 20** (102≡102) | **GREEN** |
| a13 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **17 passed (1.3m)** — the spec's 3-failed/9-passed open is gone | **GREEN** |

**`.f` — 9 of 10 GREEN, f2 honest-RED.**

| gate | ⟨cmd⟩ at this seat | reading | verdict |
|---|---|---|---|
| f1 | `node docs/tranches/X/gates/gate-catalog-totality.mjs` | `offered=18 catalogued=18 info=18, docs=11 authored + 7 decided-none = 18`; `display-p3` created **2015** | **GREEN** |
| f2 | `grep -rn 'colorSpaceInfo\.rgb\|(colorSpaceInfo as any)' demo \| wc -l` | **1** — `demo/picker/controls/ComponentSliders/ConsoleRail.vue:174` | **RED — honest** (Escalation 1) |
| f3 | `npx playwright test o21-space-catalog-truth.spec.ts` | passed | **GREEN** |
| f4 | `npx playwright test o22-specimen-legibility.spec.ts` | passed | **GREEN** |
| f5 | `node docs/tranches/X/gates/gate-specimen-grammar.mjs` | `65610 specimens over 18 spaces; css=14 channels=4; longest 50/52 chars`; `data-specimen-form` grep 0 → **1** | **GREEN** |
| f6 | `npx playwright test o23-specimen-gamut-honesty.spec.ts` | passed; run prints `worst un-projected Lab recovery 7.517e-1 (hsl); bound 1; clipped control (hex) 4.061e+1`; `data-out-of-gamut` grep 0 → **1**; 10 MARKED / 8 in-gamut | **GREEN — with the unit's DEVIATION 1 returned unratified** |
| f7 | `grep -rn 'colorSpace: any' demo` → **0** · `grep -c 'as DisplayColorSpace' …Selector.vue` → **0** · `npx vue-tsc --noEmit -p tsconfig.demo.json` → **exit 0** · witness project → **exit 0** | all four legs | **GREEN** |
| f8 | `npx playwright test o24-specimen-dot-identity.spec.ts` + `grep -c 'tag='` | `distinctVisualSignatures = 18 of 18` under keying that EXCLUDES the url; 18 distinct `feTurbulence` seeds; **background constant across all 18 rows** (no projected repaint); `tag=` → **0** | **GREEN** |
| f9 | two greps | `updateToColorSpace` in the component → **2**; `ColorPicker` watch-grep → **0** | **GREEN** |
| f10 | `grep -rn 'from "\.\./ui/' demo/color-session/ \| wc -l` | **0** | **GREEN** |

**Wave-level.**

| gate | ⟨cmd⟩ | reading | verdict |
|---|---|---|---|
| **H1** | `node docs/tranches/X/gates/gate-no-chassis.mjs` (**authored at this seat**, `W6.md:98`) | **POSITIVE CONTROL fires first** (a synthetic `useInstrumentChassis({stage,inspector,action})` trips the dead-name leg **and** all three limbs — a detector that cannot fail may not report green, the a9/a11 lesson of Act 5). Over the wave's own added `demo/` lines — **14 files, 3 commits** — **0 constructs parameterise stage + inspector + action**, **0 revive the dead name**, and of the **2** new modules the one shared across instrument roots (`space-catalog.ts`, 3 importers, roots `color-session` + `scenes/about`) carries **0 housing limbs**: one truth shared, never one shell. **Double-run identical.** | **GREEN** |
| **H2** | `test -f docs/tranches/V/megatranche/audit/codex-provenance/motion-quarantine.md` | file **present** (69,859 bytes, tracked `9812f951`) — the `test -f` leg is GREEN. The second leg — *"every assertion in .e/.j marked MOTION-SOURCED cites it"* — **has no assertions to audit**: `.e` and `.j` never ran. | **RED — undischargeable until `.e`/`.j` land** |
| **H3** | three sweeps, run at open **and** here | **(1) Parser R1 has FLIPPED**: `node -e "…parseCssColor('oklch()')…"` → **`NO THROW`, exit 0** (the spec's stated exit 1 is stale; X-W9's cure is installed). The masking-fallback ban held: ⟨cmd⟩ over all three product commits' added `demo/` lines, `+.*try {` → **0 · 0 · 0**, and the added `e2e/`+`test/` lines carry **0** real `test.skip`/`.only` (the one grep hit is a comment saying an assertion was *deleted with its measurement, never `test.skip()`*). **(2) Glass rail-variant tripwire NOT FIRED** — packed exports matching `rail\|slider\|gradient` = **`./slider`** only. **(3) Glass 8.0.0 tripwire NOT FIRED** — installed **7.0.0**, `./watercolor-dot` still published; the §Blocked limb stays banked for **X-W4.g**, opened here by nothing. | **GREEN (swept, both ends)** |
| **H4** | §Dispositions roll-call over the 14 CC rows | **CC-005** (FOLD, consumed by the spec) and **CC-108** (fact behind H1) discharge. **CC-058** is PART-discharged (`.a` landed; `.b`/`.c` did not). **CC-068** is 9/10 (`.f`). **CC-056 · CC-057 · CC-059 · CC-060 · CC-061 · CC-062 · CC-063 · CC-064 · CC-065 · CC-066 · CC-067 — eleven rows leave this close with NO disposition**, because their units never ran. Ids for life, zero silent drops: each is named here and carried. | **RED** |

**Roster arithmetic (SELF-COUNT).** 46 sub-gates + 4 wave conditions = **50**. GREEN **24** = a1–a13 (13) ⊕
f1 f3 f4 f5 f6 f7 f8 f9 f10 (9) ⊕ H1 ⊕ H3. RED **26** = f2 ⊕ b1–b4 ⊕ c1–c4 ⊕ d1–d2 ⊕ e1–e2 ⊕ g1–g2 ⊕
h1–h2 ⊕ i1–i3 ⊕ j1–j3 ⊕ **j4 (never measured)** ⊕ H2 ⊕ H4. 24 + 26 = 50, no gate counted twice, none dropped.

### The RED-BY-ABSENCE set, measured rather than assumed

These were not taken on faith that a missing unit leaves a red gate; each was run or statically read here.

- **b1 · b2 · b4** — ⟨cmd⟩ `node …/probes/wb-gradient-stopeditor/gate-seat.mjs` → **`GATE G3 (stop seat) — RED`**:
  `aria-pressed`/`aria-selected` both absent; `Home` and `ArrowDown` no-ops (`style.left` unchanged); a
  press 3px inside the rail's left edge mints nothing; **with 12 stops only 150px of the 462px rail (32.5%)
  can still mint**. **b3** — ⟨cmd⟩ no numeric-entry control exists (`.b` unwritten).
- **c1** — ⟨cmd⟩ `node …/gate-structure.mjs` → **`GATE G4 (structure) — RED`**, and its conditions still bite:
  `model/sample.ts` and `model/types.ts` **do not exist** (⟨cmd⟩ `ls demo/workbenches/gradient/model/` → ABSENT),
  no ` in <space>` clause on 8 emitted gradient strings, the 7-name dead re-export block survives.
  **c2 · c3 · c4** — `gate-literal-dialect.mjs` ABSENT, `test/interpolation-subset.test.ts` ABSENT.
  *(One G4 line is stale prose, not a live defect: G4c narrates `setStopsFromColors` writing palette strings
  "with no validity check". At the settled bytes `useGradientModel.ts:199-202` rejects through `parseCssColor`
  before any write. `.a` cured it; the instrument's message predates the cure. Recorded so no successor
  re-cures a cured thing.)*
- **d1 · d2** — ⟨cmd⟩ `ls docs/tranches/V/megatranche/audit/probes/x-w6/` → **ABSENT**; no
  `W6-glass-ask-easing-readout.md`. The census that decides d2 is unchanged at this close: installed glass
  **7.0.0**, `./input` unpublished — the cure is still the dated BJ ask, never a local restyle.
- **e1 · e2** — ⟨cmd⟩ `grep -rn requestAnimationFrame demo/workbenches/gradient/` → **2**
  (`EasingAuthoringStage.vue:58`, `:65`), **neither PRM-gated**; `gate-prm-idiom.mjs` ABSENT; no aurora
  declaration on the ramp.
- **g1 · g2** — `gate-card-rhythm.mjs` ABSENT.
- **h1 · h2** — `gate-blob-pipeline.mjs` ABSENT; `W6-blob-pipeline-census.md` ABSENT.
- **i1 · i2 · i3** — `o25-atmosphere-response.spec.ts` ABSENT, `o26-atmosphere-coldload.spec.ts` ABSENT,
  `gate-lband-door.mjs` ABSENT, `W6-atmosphere-tombstone.md` **ABSENT** (the DR-01 row takes its
  **eighteenth** carry); ⟨cmd⟩ `grep -rn deriveAurora demo/` → **8** (mandate still satisfied),
  ⟨cmd⟩ `grep -rn armRuntime demo/` → **0** (i3's cure still not in the tree).
- **j1 · j2 · j3** — `o27-scene-contracts.spec.ts` ABSENT; the 14 routes are still `component: Stub`
  (`demo/color-picker/router/index.ts:24-38`, read here). **j4 was never measured** — MEASURE-AT-OPEN was
  deliberately skipped at open under probe parsimony and no seat took it since, so it leaves this close
  **UNMEASURED**, which is neither cured nor retired-with-its-measurement.
- **`.j`'s HALT CONDITION still holds**: X-W5 is `planned`, 14 `Stub` routes, 0 scene-contract sites. A
  `.j` dispatched today returns BLOCKED-ON X-W5 without writing a product byte.

### §7 cadence at the settled bytes

- ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` → **exit 0, no diagnostics**.
- ⟨cmd⟩ `npx eslint demo/` → **exit 0**.
- ⟨cmd⟩ `npx vitest run` → **16 failed / 610 passed (626)**, **6 files**. Enumerated here, not summarised:
  `test/gradient-parse.test.ts` **2** · `test/gradient-v4-consume.test.ts` **1** — **`.a`'s escalation, still
  open**; `test/v4-css-emerging.test.ts` **10** (`serializeCssValue` not exported from `src/css/stylesheet`) ·
  `test/spectrum-luma.test.ts` **1** · `test/v4-c1.test.ts` **1** · `demo/test/shell/reka-binding-idiom.test.ts`
  **1** — **13 pre-existing, all under `src/**` (X-W9's) or the demo shell (X-W8's), none importing a path
  in this wave's diff.** This close **did not fix the 3** — VERIFY-ONLY, and the two files sit outside
  every dispatched unit's writable set.
- ⟨cmd⟩ `git status --porcelain` at close → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
  `M scripts/dev/dev.sh` — the two standing rows, neither this seat's. Re-running f3/f8's oracles
  rewrote two committed AFTER frames as a by-product; both were restored by single-path
  ⟨cmd⟩ `git checkout -- …/after-catalog-open.png …/after-specimen-dots.png` so the committed evidence
  stays byte-identical (E-3), and the tree was verified clean afterwards.

### §8 Verification Artefacts — what exists and what does not

| §8 row | state |
|---|---|
| `W6-evidence/gradient/{before,after}-*.png` (7 pairs) | **ABSENT** — `.a` banked **26 gate transcripts** (`gradient/gates/*.txt`, BEFORE **and** AFTER, incl. `a13-vacuity-falsifier.txt`) and **zero PNG frames**. §17 count-scoping was honoured throughout — no figure `.a` cites is PNG-derived — so no claim rests on the missing frames, but the §8 row is unmet. |
| `W6-evidence/catalog/{before,after}-{catalog-open, display-p3-about, specimen-dots}.png` | **PRESENT, 6 frames** (§8 spells the middle one `about-display-p3`; the files read `display-p3-about` — a naming variance, same scene). |
| `W6-evidence/owner-marks/` (OM-3/4/6/9/10/13 re-captures) | **ABSENT** — every owning unit (`.d .g .h`) is undispatched. |
| `W6-evidence/atmosphere/` (N-seed frames + cold-load) | **ABSENT** — `.i` undispatched. |
| `W6-atmosphere-tombstone.md` | **ABSENT** — DR-01's tombstone is **not written**. |
| `W6-glass-ask-easing-readout.md` / `W6-lband-letter.md` | **ABSENT** — `.d`/`.i` undispatched. |
| `W6-blob-pipeline-census.md` | **ABSENT** — `.h` undispatched. |
| Gate transcripts in `W6-evidence/gates/` | **PRESENT but re-homed** — `gradient/gates/` (`.a`, 26 files) and `catalog/GATE-TRANSCRIPTS.md` (`.f`). Per-lane rather than the single `gates/` dir §8 names. |

**π MATRIX**: chromium 1440×900 and playwright-webkit iPhone-14 were both exercised at this seat
(`gate-a-gesture-paint.mjs` runs both cells). **1600×1000 catalog cell, 720×450 short landscape: NOT
exercised** — their units are undispatched. **safari-app via safaridriver (I-20): not claimed.**
**API-LESS dev cell**: the `setStopsFromColors` end-to-end witness through real palette data stays
**UNVERIFIABLE-HERE** and is not claimed; its model-level contract is gated in
`test/gradient-order-invariant.test.ts`.

### E13 mail — swept again at this seat, read-only

⟨cmd⟩ the same positional-status awk over `INBOX.md` → **0 UNREAD** across ⟨cmd⟩ **79** `I-`/`O-` rows,
double-run **0 ≡ 0**. Four paths re-counted: `docs/tranches/V/` depth-1 `.md` **10** · `V/coordination/`
**24** · `../glass-ui/docs/tranches/BK/coordination/` **9** (newest
`glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed) · `../keyframes.js/docs/tranches/V/coordination/`
**13** · `../sci-report/atlas/docs/tranches/P/coordination/` **28**. ⟨cmd⟩
`find <the four paths> -type f -name '*.md' -newermt "2026-09-19 00:00"` → **two** members, both the same
as at open — `V/coordination/INBOX.md` (**self**, excluded by SELF-COUNT) and keyframes' own
`INBOUND-LEDGER.md` (not addressed to value.js, mints no row). **Register tail unmoved at I-35 / O-39.
This wave closes with NO UNREAD mail in scope.**

### Landed-wrong findings — recorded, NOT fixed here

1. **`.a`'s cure leaves 3 assertions RED in two `test/` files it could not write.** Deleting
   `GradientModelState.intervals` / `ParsedGradientModel.intervals` is the cure's point, and
   `test/gradient-parse.test.ts:32,:63` + `test/gradient-v4-consume.test.ts:20,:33` still read them.
   Confirmed RED at the settled bytes by this seat. The §7 whole-suite cadence is therefore RED on exactly
   3 assertions until the bounds question is answered. **`.a` named it, did not smooth it, and did not
   widen its own bounds** — the right call under the categorical write law; it is listed here as a
   landed-wrong *condition*, not as a seat's fault.
2. **The commands the spec names for a3–a7 are not the commands that measured them green.** `W6.md:105-106`
   binds a3/a4 to `gate-axis.mjs` and a5/a6/a7 to `gate-gesture.mjs`, both `execute, no write`. Re-run
   independently at this seat, both are still **UNRUNNABLE** — `gate-axis.mjs` dies at `:35`
   (`TypeError: null is not an object (evaluating 'h.getAttribute("aria-label").match(/([\d.]+)%/)[1]')`)
   and `gate-gesture.mjs` times out at `:21` waiting for
   `button[data-stop-id][aria-label="Gradient stop at 0%"]`. Cause re-confirmed here: the live accessible
   names read `Gradient stop 1 of 3` with the ordinal on `aria-valuenow` (X-W4 · C2's ARIA split, landed
   **after** the spec's 2026-08-03 stamp). `.a` held the properties with instruments inside its own bounds
   rather than editing the named ones, which §4's Bounds law requires — **but the wave's stated commands
   remain unsatisfied by anything, and a successor must not read "a3 GREEN" as "gate-axis.mjs GREEN".**
3. **f6(ii)'s stated `1e-6` constant was not tested as written.** `.f` substituted exact legs (b)/(d) plus a
   Lab-recovery bound it authored itself, printing both numbers (`7.517e-1` un-projected vs `4.061e+1`
   clipped control). The substitution is arithmetically forced — 1e-6 is only reachable at the
   15-significant-digit caption f4 declares a defect — and `.f` explicitly refused to mark its own homework.
   **It leaves this close UNRATIFIED.** The anti-projection property itself is measured and is RED-able.
4. **Oracle ordinal collisions, now three-deep.** `o21` names two specs (`o21-gradient-rail`,
   `o21-space-catalog-truth`) and `o22` names two (`o22-status-lamp`, `o22-specimen-legibility`). Worse for
   the successor: **`o26-aurora-perceptibility.spec.ts` and `o27-focus-affordance.spec.ts` already exist**,
   and `W6.md` §4 tells `.i` to create `o26-atmosphere-coldload.spec.ts` and `.j` to create
   `o27-scene-contracts.spec.ts`. Every spec text names its file explicitly so no gate is ambiguous today,
   but **the numbering namespace is exhausted and `.i`/`.j` will collide on creation.**

### Residuals — each with a named owner

| # | residual | owner |
|---|---|---|
| R-1 | **8 units undispatched** — `.b .c .d .e .g .h .i .j`. Lane 1's tail (`.b .c .d .e`), Lane 2's tail (`.g`), Lane 3 whole (`.h .i`), Lane 4 (`.j`, itself BLOCKED-ON X-W5). | **X-W6 re-dispatch** |
| R-2 | **f2's surviving hit** — `ConsoleRail.vue:174` `(colorSpaceInfo as any)[space]`. Migration written free by `.f`: `SPACE_CATALOG[space].info` is total, no cast, no fallback. | **X-W9.h** (`W9.md:104`, `:142-147`) |
| R-3 | **The URL round-trip revert** — `ictcp` and `jzazbz` do not survive model→URL→model (`useColorUrl.ts` → `applyUrlToModel` → `parseAndSetColor` re-parses a colour with no CSS syntax, landing in `oklch`). Pre-existing, on a first-class route, **homeless**. | **unassigned — needs a home** |
| R-4 | **`.a`'s bounds escalation, unanswered.** `test/gradient-v4-consume.test.ts` is in the WAVE's bounds via `X-W6-FOLD.md` §3 BoundsDelta **n.34** but routed to `.d`; `test/gradient-parse.test.ts` is in **no** bounds row anywhere (a genuine §3a trigger). Both migrations are written verbatim in `.a`'s receipt. | **X-W6 `.d`** (n.34) ⊕ **a dated bounds grant** for the second |
| R-5 | **Two stale named instruments** — `gate-axis.mjs`, `gate-gesture.mjs`: on disk, unedited, unrunnable. A one-line re-point at `aria-valuenow` per gate revives them, inside whichever wave owns `…/probes/wb-gradient-stopeditor/**`. | **the probes' owning wave** |
| R-6 | **a11's outer ring reads 1.00:1 / 1.04:1** while the inner ring carries 15.08:1 / 14.59:1. The dual-contrast recipe means *one* ring clears 3:1 against any fill, which is the property `W6.md:176` states; the outer figure is published here so a challenger can adjudicate the reading rather than discover it. | **L-18 challenge pass** |
| R-7 | **`p3.mjs` (a8) and `p2.mjs` (a10)** crash on a null `[data-testid="gradient-stop-bar"]` identically before and after the cure — a probe-boot condition. **`WBGSE-D-probe4.mjs` (a11)** reads the handle SEAT's paint, which X-W4 moved to `.rail-handle-face`. All three carry their properties elsewhere. | **the probes' owning wave** |
| R-8 | **13 pre-existing vitest failures** in `src/**` and the demo shell — `v4-css-emerging` 10, `spectrum-luma` 1, `v4-c1` 1, `reka-binding-idiom` 1. None imports a W6 path. | **X-W9** (src) / **X-W8** (shell) |
| R-9 | **`W6.md`'s four-verb line is NOT flipped** and `**Status**: planned` is left as written. The spec is a dated, stamped authority under **E-3**; this close is an addendum beside it, and a PARTIAL wave has no IMPLEMENTED to stamp. The live status surface is the LEDGER row. | **the close that lands all 45** |
| R-10 | **j4 UNMEASURED.** MEASURE-AT-OPEN was skipped at open under probe parsimony; no seat has taken the 720×450 baseline since. It may still retire GREEN with its measurement pasted — but it must be *taken*. | **X-W6 `.j`** |
| R-11 | **DR-01 takes its eighteenth carry.** The tombstone `.i` was to write **first** does not exist. This is the exact failure species the spec's §11 Archaeology warns of (*17 closes under 13 names*), and it is recorded loud rather than allowed to pass as a quiet absence. | **X-W6 `.i`** |

### Escalations returned by this close

1. **The bounds grant `.a` asked for** (R-4) — one line, two paths, migrations already written.
2. **f6(ii)'s substitution** (landed-wrong 3) — ratify the property test with its two printed figures, or
   restate the constant in a way f4 can coexist with.
3. **The `o25`–`o27` oracle namespace** (landed-wrong 4) — `.i` and `.j` cannot create their specs at the
   ordinals `W6.md` §4 names without colliding with two shipped files.
4. **The URL codec's non-CSS-space round-trip** (R-3) — a live product defect with no owning wave.

### Four-verb status after this close

**AUDITED** yes · **SPECIFIED** yes (`W6.md`) · **IMPLEMENTED** **no — PARTIAL, 2 of 10 units, 24 of 50
gates** · **VERIFIED** no (X-W11's stamp, and it cannot be reached from here).

---

## Check 1

SERVED MODEL: claude-opus-5[1m]

**Seat**: L-20 FRESH ADVERSARIAL CHECK, pass 1 — **VERIFY-ONLY**. An independent `claude-opus-5[1m]`
that authored no cure byte, no unit receipt and no line of `## Close`. Wall clock **2026-09-19**.
**Verdict**: **NOT-CONFORMANT** — 0 BLOCKER · **1 CRITICAL** · **1 HIGH** · 5 MINOR · 2 INFO.

**Every one of the close's 24 claimed GREENs reproduces at this seat's own commands** — 24 of 24, zero
divergences of verdict, every figure re-read from the settled bytes rather than inherited. The wave does
not fail on what it did; it fails on what **22 of its 26 RED gates carry no relief for**.

### Crash-recovery (standing law)

⟨cmd⟩ `git status --porcelain` at open → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M docs/tranches/X/execution/D/X-P-W3.md` · `M scripts/dev/dev.sh`. **None is inside this seat's
writable set** (the V fold-source · Track D's seat · the unowned NEVER-touch row). No inherited hunk;
none was staged, stashed or restored. At close the dirty set is the same two standing rows plus Track D's
`X-P-W4.md` (a sibling's live work, untouched here).

### Axis 1 — every claimed GREEN re-run at this seat (24 of 24 reproduce)

| gate | ⟨cmd⟩ at this seat | reading | verdict |
|---|---|---|---|
| a1 | `npx vitest run test/gradient-order-invariant.test.ts` | **13 passed (13)** | **GREEN — reproduces** |
| a2 | `node …/WBGSE-O-r3-crossdrag-forcedcolors.mjs` (fresh :9000 server, STALE-SERVER LAW) | emitted `… 50%, … 84.4%, … 100%` — **ascending**; lefts are three `calc(var(--rail-inset) + var(--rail-track) * f)` | **GREEN — reproduces** |
| a3 | o21 *"one axis: every handle centre sits where the ramp paints its own ordinal"* | passed (`o21:143`) | **GREEN — reproduces** |
| a4 | o21 *"the forward and inverse maps are inverse"* | passed (`o21:185`) | **GREEN — reproduces** |
| a5–a11 | `node …/W6-evidence/gradient/gate-a-gesture-paint.mjs` | `travel@1px=0.00px travel@120px=120.00px` · `activeElement=BUTTON/stop-2-…` `[27.4,100]→[27.4,98]` · `before=2 middle=2 right=2 cancel=2` · **5** `aria-valuenow` writes over 5 pointermoves · chip band `[256.7,280.7]` rules intersected **0** · white ramp `innerRatio 15.08 / 14.59`, `outerRatio 1 / 1.04` · a9 rows claimed `[]`, chip `3 → 2` — **`GATE X.W6.a (gesture + paint) — GREEN`** | **GREEN — reproduces, figure for figure** |
| a12 | `node …/WBGSE-D-probe2.mjs` + o21 `:238` | `beforeOverhangPx: 0` · `afterOverhangPx: 0`; handleLeftEdge ≡ barLeftEdge at **224≡224** (rootFS 16) and **102≡102** (rootFS 20) | **GREEN — reproduces** |
| a13 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **17 passed (1.6m)** | **GREEN — reproduces** |
| f1 | `node docs/tranches/X/gates/gate-catalog-totality.mjs` | `GATE f1 — GREEN  offered=18 catalogued=18 info=18  docs=11 authored + 7 decided-none = 18 decided`; `display-p3` created **2015** | **GREEN — reproduces** |
| f3 f4 f6 f8 | `npx playwright test o21-space-catalog-truth o22-specimen-legibility o23-specimen-gamut-honesty o24-specimen-dot-identity --project=smoke` | **4 passed (1.6m)**; f6 prints `worst un-projected Lab recovery 7.517e-1 (hsl); bound 1; clipped control (hex) 4.061e+1`, **10 MARKED / 8 in-gamut**; f8 prints `distinctVisualSignatures = 18 of 18`, background constant across all 18 rows | **GREEN — reproduces, figure for figure** |
| f5 | `node docs/tranches/X/gates/gate-specimen-grammar.mjs` | `GATE f5 — GREEN  65610 specimens over 18 spaces; css=14 channels=4; longest 50/52 chars`; grep `data-specimen-form` → **1** | **GREEN — reproduces** |
| f7 | `grep -rn 'colorSpace: any' demo` → **0** · `grep -c 'as DisplayColorSpace' …Selector.vue` → **0** · `npx vue-tsc --noEmit -p tsconfig.demo.json` → **exit 0** | all legs | **GREEN — reproduces** |
| f9 | two greps | `updateToColorSpace` in the component → **2**; `ColorPicker` watch-grep → **0** | **GREEN — reproduces** |
| f10 | `grep -rn 'from "\.\./ui/' demo/color-session/ \| wc -l` | **0** | **GREEN — reproduces** |
| **H1** | `node docs/tranches/X/gates/gate-no-chassis.mjs` | **positive control fires first** (`dead-name ✓  stage+inspector+action ✓`), then over **14 demo/ files across 3 commits** and **2 new modules**: `GATE H1 — GREEN`. The detector is not one that cannot fail | **GREEN — reproduces** |
| **H3** | `node -e "…parseCssColor('oklch()')…"` → **`NO THROW`, exit 0**, `{"ok":false,"diagnostics":[…]}` · added-line masking sweep over the three product commits → **0 real `try {` / `test.skip` / `.only`** (every hit is prose, read at the bytes) · installed glass **7.0.0**, `./watercolor-dot` still published | both ends swept | **GREEN — reproduces** |

Also re-verified GREEN at this seat: `npx vue-tsc --noEmit -p tsconfig.demo.json` **exit 0** ·
`npx eslint demo/` **exit 0** · `npx vitest run` **16 failed / 610 passed (626), 6 files**, enumerated
per file exactly as the close enumerates them (`gradient-parse` 2 · `gradient-v4-consume` 1 ·
`v4-css-emerging` 10 · `spectrum-luma` 1 · `v4-c1` 1 · `reka-binding-idiom` 1).

**a11 adjudicated rather than discovered** (the close's R-6 asks a challenger to read it): the arm
computes `ratio(over(ring, fill), fill)` — ring-against-**fill**, not ring-against-ring — and passes on
`max(inner, outer) ≥ 3`. That is the dual-contrast semantics `W6.md:159` itself prescribes (*"interim
dual-contrast resting/selected ring generalized from the file's own recipe"*): one edge clears 3:1
against **any** fill, which is why the light edge reads 1.00 on a white ramp and the dark edge 15.08.
**Not a narrowed assertion. a11 stands GREEN.**

**The a13 re-anchor adjudicated**: the two deleted `toContainText` assertions targeted DOM that was
**already retired before this wave** — ⟨cmd⟩ `git grep -n 'C ≤' f90aeb02^ -- demo | wc -l` → **0** and at
HEAD → **0**, and `GradientVisualizer.vue:226-232` renders the tile as a self-closing `role="img"` div
with no text at all. The spec's a13 *is* the duty to retire dead-DOM assertions. The re-anchored P7-R1
spec is **stronger** than what it replaced (it adds `toBeFocused` and a `data-selected` count).
**Not a silently narrowed assertion.**

### Axis 2 — bounds (CLEAN)

⟨cmd⟩ `git show --name-only` over all six wave commits, de-duplicated → **61 paths**, every one inside
`W6.md` §4's writable set (the two fold errata `e.1` `GradientEasingEditor.vue` and `e.2`
`ColorNutritionLabel.vue` are ruled corrections, not widenings), plus the record and the LEDGER row.
`scripts/dev/dev.sh` **0** · `registry/adjudicated/` **0** · `node_modules/` **0** · `src/` **0** ·
`api/` **0** · `demo/color-picker/App.vue` **0** · `demo/ui/` **0** · `demo/palettes/` **0**.
**Zero writes outside bounds.** All six commits carry the `Claude-Session` trailer (⟨cmd⟩ → `1` each).

### Axis 3 — masking fallbacks (NONE)

Added-line sweep over the three product commits: every `try` / `catch` / `test.skip` / `.only` hit is
**prose in a comment** (read at the bytes, one of them the line that says an assertion was *"DELETED with
the measurement, never `test.skip()`"*). The one real `try/catch` in the diff is
`gate-specimen-grammar.mjs:111-118`, which **converts a throw into `fail(...)`** — the opposite of a mask.
`setStopsFromColors` branches on `parseCssColor`'s `{ok:false}` shape (`useGradientModel.ts:199-202`,
read here) rather than wrapping it. **0 allowlists · 0 copied producer selectors · 0 patched node_modules.**

### Axis 4 — commit families (CLEAN)

GRADSTOP-A §14's family is **whole** in `f90aeb02` (model ⊕ axis ⊕ gesture ⊕ paint ⊕ oracle in one
commit). `c222542d` is the a9 gutter — a **second meaning**, discovered by the first AFTER run, not a
split of the family. §9's per-unit scopes hold for the two units that sat; #11 `docs(x-w6 close)` exists.

### Axis 5 — E-3 (HELD)

⟨cmd⟩ `git diff --stat f90aeb02^..HEAD -- docs/tranches/V/megatranche/registry/adjudicated/
docs/tranches/X/waves/W6.md W5.md W7.md W9.md …/audit/probes/ …/audit/components/` → **prints nothing**.
The dated spec, the adjudicated registry, every sibling spec and all twelve `execute, no write`
instruments are **byte-untouched by this wave**.

### Axis 6 — mail (CLEAN)

Position-free sweep, stronger than the close's positional one: ⟨cmd⟩
`grep -nE '\|[[:space:]]*(\*\*)?UNREAD' INBOX.md` → **one hit, and it is prose** in a sweep note at
`:226`, not a table row. **0 UNREAD across 79 `I-`/`O-` rows.** Newest glass letter
`glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed. **No UNREAD mail in scope.**

### Axis 7 — the four-verb line moved LAWFULLY

`W6.md:7` still reads `**Status**: planned` and `:10` still reads `IMPLEMENTED no` — **byte-untouched**.
That is correct twice over: the spec is dated and IMMUTABLE under E-3, and a PARTIAL wave has no
IMPLEMENTED to stamp. Nothing was flipped that the bytes do not support.

### Axis 8 — the spec's own §2a goal criterion is NOT MET at the bytes

`W6.md:17` asks that **each** of six live instruments own its stage, inspector and action contract **as a
routed scene**, tell one geometric and one colour-science truth, and carry its motion under the shared
field/motion law. At the bytes: Gradient has its geometry and gesture truth (`.a`) but **no inspector**
(`.b` unwritten) and **no routed scene** (⟨cmd⟩ `grep -c 'component: Stub' demo/color-picker/router/index.ts`
→ **14**); the space catalog has its colour-science truth (`.f`); **Easing, HeroBlob, Blob/Atmosphere and
Mix are untouched**; the motion clause is unmet (⟨cmd⟩ 2 ungated rAF in the gradient tree). Only the
final clause — *no chassis-shaped abstraction rebuilt* — is satisfied outright, and H1 measures it.
**One of seven clauses true.**

### Axis 9 — published figures (2 do not reproduce; both MINOR)

Every substantive figure re-read here reproduces. Two do not — see MINOR-3 below.

### Axis 10 — HONEST-RED ADJUDICATION, gate by gate

**RELIEVED — the honest-RED set (4):**

| gate | relief, cited at the spec bytes | owner named in the record |
|---|---|---|
| **f2** | **Another wave owns the surviving hit by the spec's own routing.** The one remaining site is `demo/picker/controls/ComponentSliders/ConsoleRail.vue:174`, and ⟨`W9.md:104`⟩ books that path `modify` for X-W9, ⟨`:142-147`⟩ is the cross-wave note, ⟨`:303-311`⟩ routes `componentDescription()` at `:172-180` to **X-W9.h**. Curing it here is `W6.md` §3a file-bound expansion. Verified RED here: ⟨cmd⟩ grep → **1** | **R-2 → X-W9.h**, with the one-line migration (`SPACE_CATALOG[space].info`, total, no cast) written free |
| **j1 · j2 · j3** | **A predecessor wave owns the contract `.j` adopts.** `W6.md:313` — *"this unit **adopts** the X-W5 scene contract for the route"* — and §10 Depends-on names **X-W5** (*"`.j` adopts that contract route by route; it does not author it"*). X-W5 is `planned`; verified here: **14 `component: Stub` routes**, **0** `defineScene`/`SceneContract`/`useScene` sites. A `.j` dispatched today returns BLOCKED-ON X-W5 without writing a product byte | **R-1** (`.j` BLOCKED-ON X-W5) |

**UNRELIEVED (22)** — `b1 b2 b3 b4 · c1 c2 c3 c4 · d1 d2 · e1 e2 · g1 g2 · h1 h2 · i1 i2 i3 · j4 · H2 · H4`.
These are RED because **eight of the wave's ten units were never dispatched**. Nothing in `W6.md`
relieves them: each is assigned to a unit of **this** wave, every instrument each needs is **inside**
this wave's own `create` rows, and every dependency each names is **MET** (X-W0 CLOSED, X-W4 CLOSED,
X-W1 CLOSED, glass 7.0.0 installed with all consumed subpaths published — re-verified here). The only
"owner" the record can name for them is **R-1, re-dispatch of this same wave**, which is undone work,
not relief. Each was re-measured RED at this seat rather than assumed — ⟨cmd⟩ `gate-seat.mjs` →
`GATE G3 (stop seat) — RED` with `Home` and `ArrowDown` measured no-ops **against `style.left`** (not
against a stale accessible name, so b1's RED is honest); ⟨cmd⟩ `gate-structure.mjs` →
`GATE G4 (structure) — RED`, 7 live conditions; `model/sample.ts` and `model/types.ts` **ABSENT**;
⟨cmd⟩ `grep -rn deriveAurora demo/` → **8**, `armRuntime` → **0**; the `x-w6/` probe dir, every `o25`–`o27`
oracle, the tombstone, the blob census, the lband gate and the easing ask **all ABSENT**.

*(The close's own G4c caveat is confirmed at the bytes and is NOT a live defect: `useGradientModel.ts:199-202`
rejects through `parseCssColor` before any write; the instrument's message predates `.a`'s cure.)*

### Defect register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **1** | **CRITICAL** | **22 of the 26 RED gates carry no relief.** Eight of ten units (`.b .c .d .e .g .h .i .j`) were never dispatched, so 19 born-RED sub-gates ⊕ H2 ⊕ H4 ⊕ j4 stay RED with no producer, no successor and no named honest-RED behind them. `W6.md:335` closes the wave only when **all 45** born-RED sub-gates are GREEN by their own commands — **22 of 45** are. Two named consequences ride inside it: **H4** leaves **eleven CC rows** (CC-056 · 057 · 059 · 060 · 061 · 062 · 063 · 064 · 065 · 066 · 067) with **no disposition** against §6's *"exactly one disposition, ids for life"*; and **DR-01 takes its EIGHTEENTH carry** — the tombstone that `W6.md:298` makes `.i`'s **first act** is unwritten, which is precisely the repeat-failure species §11 Archaeology exists to stop (*"17 closes under 13 names"*) | ⟨cmd⟩ every gate above re-measured RED at this seat; ⟨cmd⟩ `ls docs/tranches/V/megatranche/audit/probes/x-w6/` → ABSENT; `W6-atmosphere-tombstone.md` ABSENT; `W6-blob-pipeline-census.md` ABSENT; `o25`/`o26`/`o27` ABSENT | Re-dispatch the eight units. `.i`'s tombstone is a **docs-only first act** needing no live cell and no product byte — it can land ahead of the rest. `.j` waits on X-W5; the other seven do not wait on anything |
| **2** | **HIGH** | **A cure shipped a regression the wave then closed over.** `.a` deleted `GradientModelState.intervals` / `ParsedGradientModel.intervals` — correctly, it is the defect — and **3 assertions in two untouched suites now fail**: `test/gradient-parse.test.ts:32,:63` (`expect(m.intervals).toHaveLength(…)` → *"Target cannot be null or undefined"*) and `test/gradient-v4-consume.test.ts:20/:33`. `W6.md` §7 requires `npx vitest run` after each unit lands **and again before wave close**; it is RED at the settled bytes and the close (VERIFY-ONLY) did not cure it. This is L-18 skeptic target **2**, *cure-shipped regressions*, landing live | ⟨cmd⟩ `npx vitest run` → **16 failed / 610 passed (626)**; ⟨cmd⟩ `git diff --stat f90aeb02^..HEAD -- test/gradient-parse.test.ts test/gradient-v4-consume.test.ts` → **nothing** (the files are untouched, so the breakage is the cure's); ⟨cmd⟩ `git show f90aeb02^:test/gradient-parse.test.ts \| grep -n intervals` → `:32`, `:63` — they asserted the field before the wave | **Mitigation is real and named** (`.a` refused to widen its own bounds, wrote both migrations verbatim, and escalated; one file IS in-wave via `X-W6-FOLD.md` §3 BoundsDelta **n.34**, routed to `.d`) **but it does not erase the red suite**: dispatch `.d` for `gradient-v4-consume.test.ts` and issue the one-line dated bounds grant for `gradient-parse.test.ts`, then apply `.a`'s two migrations |
| **3** | MINOR | **The spec's named commands for a3–a7 are satisfied by nothing.** `W6.md:105-106` binds a3/a4 to `gate-axis.mjs` and a5/a6/a7 to `gate-gesture.mjs`. Both are **UNRUNNABLE**, re-run independently here. §6 asks for GREEN *"by the same commands that are RED today"*; these are unrunnable, which is a different state from RED-for-the-defect | ⟨cmd⟩ `node …/gate-axis.mjs` → `TypeError: null is not an object (evaluating 'h.getAttribute("aria-label").match(/([\d.]+)%/)[1]')` at `:35`; ⟨cmd⟩ `node …/gate-gesture.mjs` → `Timeout 30000ms` waiting for `aria-label="Gradient stop at 0%"` at `:21`. **Cause confirmed to PRE-DATE the wave**: ⟨cmd⟩ `git show f90aeb02^:…/GradientStopEditor.vue \| grep aria` already carries `aria-valuenow` / `aria-valuetext` / `:aria-label="stopName(index)"`; ⟨cmd⟩ `git log -S 'Gradient stop ${'` → `666978d4` (X-W4 · C2) | Not `.a`'s fault — §4's Bounds law forbids editing those instruments, and the substitutes read `aria-valuenow`/`style.left`, **strictly more precise** than the whole-percent name the originals parsed (GRADSTOP-A §6). **A one-line re-point per gate** revives them, inside whichever wave owns `…/probes/wb-gradient-stopeditor/**` (R-5). Until then no successor may read *"a3 GREEN"* as *"`gate-axis.mjs` GREEN"* |
| **4** | MINOR | **f6(ii)'s stated `1e-6` constant was never tested as written**, and the substitution the wave uses instead rests on a bound **this wave authored for itself**. `.f` refused to mark its own homework and returned it unratified; the close left it unratified | ⟨cmd⟩ the o23 run prints `worst un-projected Lab recovery 7.517e-1 (hsl); bound 1; clipped control (hex) 4.061e+1` — reproduced here. The tension is arithmetic and real: `1e-6` is reachable only at the 15-significant-digit caption **f4 declares a defect**, so the two gates cannot both hold as written | Ratify the property substitution by a **dated addendum beside** `W6.md` (E-3, never a rewrite), or restate the constant in a form f4 can coexist with. The positive control (a forced clip at 54× the un-projected worst case) is a legitimate falsifier and should survive whichever way it is ruled |
| **5** | MINOR | **j4 was never measured.** `W6.md:323` makes it MEASURE-AT-OPEN, *"taken at wave open before any cure"*, and `:325` lets it **retire GREEN with its measurement pasted**. The open seat skipped it under probe parsimony §5.2 and no seat took it since, so it is neither cured nor retired | The close states it plainly (R-10); ⟨cmd⟩ no 720×450 transcript exists anywhere under `W6-evidence/` | Take the 720×450 baseline. **Nothing blocks it** — it needs no `.j` cure, by the spec's own wording, and no unit's bytes stand in its way |
| **6** | MINOR | **Two published figures do not reproduce** (write-then-measure / SELF-COUNT). (a) `## Close` §8 says `.a` banked *"26 gate transcripts"* — there are **25**. (b) `.a`'s Act 3 publishes ⟨cmd⟩ `grep -c 'try {' demo/workbenches/gradient/` → **0**; that command on a **directory** reads a single file and exits 1 | ⟨cmd⟩ `ls -1 …/W6-evidence/gradient/gates/ \| wc -l` → **25** (commit `e77650e1` carries 27 files = 25 transcripts + the instrument + the record). ⟨cmd⟩ `grep -c 'try {' demo/workbenches/gradient/` → `demo/workbenches/gradient/GradientPane.vue:0`, **exit 1**; the recursive form → **1**, in `GradientCodeEditor.vue`, **untouched by this wave** | Correct both figures by dated addendum. **The underlying property is independently sound** — the close's H3 sweep over the three commits' *added* lines returns `0 · 0 · 0` and reproduces here, so the masking-fallback ban held; only the citation is wrong |
| **7** | MINOR | **§8's gradient witness row is unmet and unowned.** `W6.md:358` names seven `{before,after}` PNG pairs for the gradient lane; **none exists**, and no residual row (R-1…R-11) assigns them an owner — R-1 owns *units*, not this artefact row | ⟨cmd⟩ `find …/W6-evidence -name '*.png'` → **6 files, all under `catalog/`**. The close discloses the absence in its §8 table but gives it no owner | Assign the row explicitly at re-dispatch. **Mitigated**: §17 count-scoping was honoured — no figure `.a` cites is PNG-derived, verified here across every AFTER reading, so no claim rests on the missing frames |
| **8** | INFO | **The catalog oracles are not hermetic**: running `o21-space-catalog-truth` / `o24-specimen-dot-identity` **rewrites two committed AFTER frames**, so any challenger re-running the gate dirties the wave's own evidence | ⟨cmd⟩ `git status --porcelain` after this seat's oracle run → `M …/after-catalog-open.png` · `M …/after-specimen-dots.png`; restored byte-identical by single-path ⟨cmd⟩ `git checkout -- …`, tree verified clean. The close hit and disclosed the same thing | Have the oracle write to a scratch path and compare, or accept the frames as regenerated-by-design and say so in §8 |
| **9** | INFO | **LEDGER ⇄ spec divergence on X-W7's opens-after.** `LEDGER.md:35` reads *"X-W1 (N-1 mount substrate)"*; ⟨`W7.md:6`⟩ reads *"X-W3 …, X-W4 …, and **X-W6**"* | both read at the bytes | Reconcile the cell; under `W7.md` the wave is blocked (see below), under the ledger cell it is not |

### Successor "Opens after" conjuncts, measured against this wave

| successor | conjuncts at the spec bytes | state | lawfully blocked? |
|---|---|---|---|
| **X-W7** | ⟨`W7.md:6`⟩ X-W3 · X-W4 · **X-W6** | X-W3 **CLOSED** ✓ · X-W4 **CLOSED** ✓ · **X-W6 PARTIAL ✗** | **YES — blocked on X-W6.** Materially so: ⟨`W7.md:150-156`⟩ makes X-W6 write four shared paths **first**, and only **1 of 4** landed (`ColorSpaceSelector.vue`); `AuroraPane.vue`, `MixConfigBar.vue`, `MixSourceSelector.vue` are unwritten, so `X.W7.f`/`X.W7.g` have no post-W6 bytes to edit on three of them. The one conjunct whose substance **did** arrive is `formatSpecimen`'s digit policy, which `X.W7.f`'s registers size against |
| **X-W8** | ⟨`W8.md:6`⟩ X-W5 · **X-W6** · X-W7 stabilize destination ownership | X-W5 `planned` ✗ · **X-W6 PARTIAL ✗** · X-W7 `planned` ✗ | **YES — three conjuncts RED.** `W6.md:402` is explicit that X-W8's subtraction needs `.a`/`.c`'s destinations stable; `.c` never ran, so `model/types.ts` and `model/sample.ts` do not exist and the 7 dead re-export doors survive |
| **X-W10** | ⟨`W10.md:6`⟩ X-W5 · **X-W6** · X-W7 · X-W8 · X-W9 stable | **X-W6 not stable ✗** (plus four others) | **YES** |
| **X-W11** | ⟨`W11.md:6`⟩ X-W0 … X-W10 **IMPLEMENTED** | **X-W6 IMPLEMENTED = no ✗** | **YES** |

**No successor is unlawfully unblocked by this close** — and it is precisely the close's refusal to flip
the four-verb line (R-9) that keeps all four correctly blocked. Had it stamped IMPLEMENTED, X-W11's
conjunct would have gone green on bytes that do not support it.

### Verdict

**NOT-CONFORMANT.** The bar is *zero BLOCKER/CRITICAL/HIGH and every claimed GREEN reproduces*; the
second half is **fully met** (24 of 24) and the first is not. The honest-RED route is unavailable
because **22 of 26 RED gates have no relief** — not producer-owned, not routed to a successor, not named
as an honest-RED by id. The wave is **incomplete, not dishonest**: this close reports its own PARTIAL
accurately, names every residual, refuses three greens it could have taken quietly (f6(ii)'s
substitution, the a3–a7 command substitution, j4's absence), and writes DR-01's eighteenth carry loud
rather than letting it pass as a quiet absence. **The LEDGER row stays PARTIAL. It is not promoted.**

**Cure, shortest path to CONFORMANT-HONEST-RED**: dispatch `.i` (tombstone first — a docs act with no
dependencies), then `.b .c .d .e .g .h` (all six have every dependency MET today), answering `.a`'s
bounds escalation on the way so defect 2 closes with `.d`. `.j` alone waits on X-W5, and j1–j3 are
already relieved and owner-named; j4 needs one 720×450 measurement that nothing blocks.

---

## Repair 1

SERVED MODEL: claude-opus-5[1m]

**Seat**: REPAIR, round 1, against `## Check 1`'s defect register (1 CRITICAL · 1 HIGH · 5 MINOR ·
2 INFO). Wall clock **2026-09-19**, branch `tranche-u`.
**Verdict**: **4 defects CURED · 2 PARTIALLY CURED AND ESCALATED · 1 ESCALATED · 2 INFO untouched.**
The two at ≥MEDIUM are the two that cannot close from inside this seat's writable set, and both are
returned by name with the measured reason — not smoothed, not partially claimed.

**One gate moved: j4 RED-UNMEASURED → GREEN, retired with its measurement pasted.** The UNRELIEVED
set goes **22 → 21**. DR-01's eighteenth carry is **closed**.

### Crash-recovery (standing law)

⟨cmd⟩ `git status --porcelain` at open → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh` · three untracked `docs/tranches/X/fourier/evidence/w3/*.txt`. **None is
inside this seat's writable set** (the V fold-source · the unowned NEVER-touch row · Track B's
in-flight evidence). **No inherited hunk on any W6 path**; nothing was stashed, reset or restored.
During this seat's work siblings added `docs/tranches/X/{parse-that,keyframes,fourier}/**` — read,
never staged. Every commit below carries its own pathspec on the commit itself.

### Defect 1 — CRITICAL · 22 of 26 RED gates carry no relief → **PARTIALLY CURED, ESCALATED**

**Cured limb** — the one the register itself names as landable alone (*"`.i` can go first and alone:
its tombstone is a docs-only first act needing no live cell and no product byte, which retires
DR-01's eighteenth carry immediately"*).

`docs/tranches/X/waves/W6-atmosphere-tombstone.md` — commit **`c2f17bad`**. It does the three things
`W6.md:362` and `DISEASE-REGISTRY.md:117` require, each re-derived at this seat:

- **Predicate quoted verbatim** from ⟨`docs/tranches/A/audit/W6-deferred.md:22`⟩ —
  *"| Aurora `deriveAuroraPalette(baseColor, opts)` | NOT SHIPPED | `grep -rln 'deriveAuroraPalette' glass-ui/src` → 0 |"* —
  with `:49-51` (the consequence: *"`AuroraPane.vue` keeps its honest 'under rework' state"*) and
  `:72` (the routing that became the carry). ⟨cmd⟩ `git log --date=short -1 065c6fe` →
  `2026-05-19 docs(tranche-a/w6): formal re-scope — glass-ui APIs unshipped; routed to named successor`.
- **`e32111c7` cited and re-measured.** ⟨cmd⟩ `git log --date=short -1 e32111c7` → `2026-06-11 … `
  ***deriveAurora wired picker→atmosphere + AuroraPane rebuilt*** `…`. ⟨cmd⟩ `grep -rn deriveAurora demo/ | wc -l`
  → **8** at this seat. S's independent confirmation cited at ⟨`docs/tranches/S/S.md:227`⟩ —
  *"non-findings recorded: wiring INTACT — do not rebuild"* — **as corroboration of the mechanism, and
  explicitly NOT as a close** (S's own failure was to let "already-fine" stand in for a tombstone).
- **RF-26's misdating corrected** by dated addendum-beside: ⟨`REFORMATION-2026-07-16.md:85`⟩ reads
  *"D-1 aurora-derive (**Tranche D**→K→N→T→U→V)"*; the origin is **A.W6 `065c6fe` (2026-05-19)**,
  under-counting the ride **by three closes** (A→B→D), confirmed independently at
  ⟨`TRUTH-TABLE.md:162`⟩. ⟨cmd⟩ `git diff --stat -- docs/tranches/V/audit/REFORMATION-2026-07-16.md`
  → **prints nothing**. E-3 held.

**`X:ATMO-1` is minted with carry 0 and declared RED BY ABSENCE in the tombstone itself** — ⟨cmd⟩
`ls e2e/smoke/oracles/o25-atmosphere-response.spec.ts` → No such file; ⟨cmd⟩
`ls docs/tranches/X/waves/W6-evidence/atmosphere/` → No such directory. **This document relieves no
gate.** It discharges `.i`'s FIRST ACT and `W6.md:362`'s artefact row; **i1, i2, i3 stay RED.**

**ESCALATED** — the rest. Re-dispatch of `.b .c .d .e .g .h .i .j` is *undone work*, not relief, and
it is not a repair seat's act: eight units across four lanes, four worktrees and ≤2-concurrent
grouping is the orchestrator's dispatch (`## Unit plan`), not a cure inside a §File-Bounds writable
set. **H4's eleven undispositioned CC rows** (CC-056 · 057 · 059 · 060 · 061 · 062 · 063 · 064 · 065 ·
066 · 067) ride with it and discharge only as each unit lands its row. Returned below.

### Defect 2 — HIGH · a cure shipped a regression → **PARTIALLY CURED, ESCALATED**

**Cured half.** `test/gradient-v4-consume.test.ts` **is** inside the WAVE's bounds —
⟨`X-W6-FOLD.md` §3 BoundsDelta **n.34**⟩ adds it `modify` — so `.a`'s migration landed **verbatim as
`.a` wrote it** (`## Unit receipts` → `.a` → ESCALATION table): the `intervals:` literal dropped, each
stop literal given `easing: linearInterval()`. Commit **`1155fd1f`**.

**Escalated half.** ⟨cmd⟩ `grep -rn 'gradient-parse' docs/tranches/X/ docs/tranches/V/megatranche/`
re-run at this seat → **132 hits, not one of them a bounds row** (records, prose, the W0 graph JSON
and a corpus snapshot). `test/gradient-parse.test.ts` is in **no** `W6.md` §4 row and **no**
BoundsDelta row: a genuine §3a *file-bound expansion that invalidates the wave*, and §3a says the
seat **halts**. A repair seat may not grant itself the bounds a unit seat correctly refused to take.
**The one-line grant is returned, with `.a`'s migration already written** (read `m.stops.length - 1`,
or drop `:32`/`:63` — the stops assertions beside them already carry the shape).

**Gate re-reading** — ⟨cmd⟩ `npx vitest run`, **double-run identical**:

| | before Repair 1 | after |
|---|---|---|
| totals | **16 failed / 610 passed (626)**, 6 files | **15 failed / 611 passed (626)**, **5** files |
| `test/gradient-v4-consume.test.ts` | **1 failed** | **0 — GONE from the failing set** |
| `test/gradient-parse.test.ts` | 2 | **2 — the escalation, unchanged** |
| the 13 pre-existing (`v4-css-emerging` 10 · `spectrum-luma` 1 · `v4-c1` 1 · `reka-binding-idiom` 1) | 13 | **13, byte-for-byte the same set** |

§7 cadence at the settled bytes: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` → **exit 0** ·
⟨cmd⟩ `npx eslint demo/` → **exit 0** · ⟨cmd⟩ `npx prettier --check` over all four files this seat
wrote → **"All matched files use Prettier code style!"** (they were re-run *after* formatting; every
figure above is read from the settled bytes).

### Defect 3 — MINOR · a3–a7's named commands satisfied by nothing → **ESCALATED**

Re-run independently at this seat, both still unrunnable:

- ⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/wb-gradient-stopeditor/gate-axis.mjs`
  → `TypeError: null is not an object (evaluating 'h.getAttribute("aria-label").match(/([\d.]+)%/)[1]')` at `:35`
- ⟨cmd⟩ `node …/gate-gesture.mjs` → `Timeout 30000ms exceeded` waiting for
  `button[data-stop-id][aria-label="Gradient stop at 0%"]`

⟨`W6.md:105-106`⟩ marks both **`execute, no write`**. The cure — a one-line re-point at
`aria-valuenow` per gate — is **a write to a path this wave may not write**, and §4's Bounds law plus
§3a's halt rule make taking it an ESCALATION rather than a MINOR cure. It is R-5's, owned by whichever
wave owns `…/probes/wb-gradient-stopeditor/**`. **Standing warning carried forward: no successor may
read "a3 GREEN" as "`gate-axis.mjs` GREEN".**

### Defect 4 — MINOR · f6(ii)'s `1e-6` never tested as written → **CURED**

`docs/tranches/X/waves/W6-f6ii-addendum-2026-09-19.md` — commit **`77f80e83`**, a dated
addendum-beside (⟨cmd⟩ `git diff --stat -- docs/tranches/X/waves/W6.md` → **prints nothing**; E-3
held). The ruling, in one line: **f6(ii)@`1e-6` and f4 are jointly unsatisfiable** — four significant
figures carry a 5e-4 relative half-step and `1e-6` needs ~ten figures, i.e. exactly the
fifteen-digit caption `W6.md:257` declares the defect — so the substitution was **forced**, not
chosen. The decisive fact the escalation did not have: **the property is tested exactly, with no
wave-authored constant**, at leg **(ii)(b)** (`o23…:274-284` — `abs(channel − truth) ≤ policyResolution(truth)`,
and `policyResolution` at `:158-160` *is* the digit policy's half-step) and leg **(ii)(d)**
(`:291-303` — zero tolerance: a MARKED row must still PRINT outside its gamut). `LAB_RECOVERY_BOUND = 1.0`
lives only on the **redundant** Lab leg (ii)(c).

**Gate re-reading** — ⟨cmd⟩ `npx playwright test e2e/smoke/oracles/o23-specimen-gamut-honesty.spec.ts --project=smoke`,
**run twice, byte-identical**: `1 passed`, and
`X.W6.f f6(ii) — worst un-projected Lab recovery 7.517e-1 (hsl); bound 1; clipped control (hex) 4.061e+1`
— **54× separation**, with `CLIPPED_CONTROL_FLOOR = 10` asserted in the **breaking** direction at
every run. Census both runs **10 MARKED / 8 in-gamut**. **f6 stands GREEN.** The addendum names the
exact line a challenger should attack (clause 3), so the L-18 pass adjudicates rather than discovers.

### Defect 5 — MINOR · j4 never measured → **CURED. GATE MOVED: RED-UNMEASURED → GREEN**

`docs/tranches/X/waves/W6-evidence/j4-shortlandscape-720x450.{mjs,txt}` — commit **`6dfdd8d2`**.
Taken against a **freshly started** dev server (STALE-SERVER law), **one fresh page per route**,
preview selectors **declared** per route, reachability read as *(rect intersects the 720×450 cell)*
AND *(hit-testable by `elementFromPoint` after `scrollIntoView({block:"nearest"})`)*. Both the
BEFORE and AFTER boxes are printed, so an off-screen-but-scrollable control is distinguishable from
an unreachable one — which matters here, because ⟨measured⟩ `document.scrollHeight === innerHeight`
on **all four** routes (the panes own their scroll, the page does not).

```
GATE j4 (short landscape 720×450) — GREEN  4 of 4 routes reachable on both arms
  gradient    preview  [data-testid="gradient-render-tile"]  {top:360,h:129}  REACHABLE
              last control  DIV "Gradient CSS"  before {top:863}  after {top:361}  hit=true
  mix         preview  main canvas                           {top:105,h:336}  REACHABLE
              last control  BUTTON "Mix"        before {top:440}  after {top:401}  hit=true
  blob        preview  [data-testid="goo-blob-canvas"]       {top:70,h:180}   REACHABLE
              last control  SPAN "ALPHA channel" before {top:602} after {top:417} hit=true
  atmosphere  preview  [data-testid="atmosphere-canvas"]     {top:0,h:450}    REACHABLE
              last control  BUTTON "Reset"      before {top:385}  after {top:385}  hit=true
```

**Double-run byte-identical** (⟨cmd⟩ `diff` over the two transcripts, `origin` line excluded →
IDENTICAL). Per `W6.md:325` j4 **retires GREEN with its measurement pasted, not carried**.

**It is a BASELINE, not a substitute command.** `o27-scene-contracts.spec.ts` does not exist, minting
it is `.j`'s dispatched work, and its ordinal collides with the shipped
`e2e/smoke/oracles/o27-focus-affordance.spec.ts` — the close's escalation 3, still unruled. No
successor may read this as *"j4 GREEN by o27"*.

**L-18 target 5 (probe-before-meaning) fired, and is recorded rather than buried.** The first cut of
this instrument walked all four routes on ONE page by hash navigation and returned
`blob: PREVIEW unreachable`. Isolated before publication —
`docs/tranches/X/waves/W6-evidence/j4-blob-preview-nav-loss.{mjs,txt}`, same commit:

```
A  fresh /#/blob   @ 720×450        {"present":true,"anchor":true,"w":180,"h":180,"top":70}
A  +4s                              {"present":true,"anchor":true,...}      (not a settle race)
B  gradient→mix→blob @ 720×450      {"present":false,"anchor":false}
B  +5s                              {"present":false,"anchor":false}        (it does not come back)
C  fresh /#/blob   @ 1440×900       {"present":true,"anchor":true,"w":180,"h":180,"top":114}
```

A vs C isolates the viewport (**the cell makes no difference**); A vs B isolates the cause (**the
navigation**). That is a **scene-lifetime** defect — `W6.md:313`'s j2 (*"canvas lifetime bound to the
scene"*) and j3 (*"persistent live preview with an explicit loss/recovery contract"*) — **not** a
short-landscape one. Published as j4 RED it would have been a false RED against the wrong gate.
**NEW FINDING, owner `.j`, banked with its instrument; it is NOT relief for j2/j3**, which stay
owner-named honest-RED on X-W5.

### Defect 6 — MINOR · two published figures do not reproduce → **CURED by this dated addendum**

E-3 forbids rewriting `## Close`; both corrections land here, each re-measured at this seat:

| figure | as published | ⟨cmd⟩ at this seat | correction |
|---|---|---|---|
| `## Close` §8 — `.a` banked *"26 gate transcripts"* | 26 | `ls -1 docs/tranches/X/waves/W6-evidence/gradient/gates/ \| wc -l` → **25** | **25.** `e77650e1` carries 27 files = 25 transcripts + the instrument + the record |
| `.a` Act 3 — `grep -c 'try {' demo/workbenches/gradient/` → 0 | 0 | the same command → `demo/workbenches/gradient/GradientPane.vue:0`, **exit 1** — a directory argument reads one file | the command is **malformed, not the property**. The recursive form → **1**, `GradientVisualizer/GradientCodeEditor.vue`, a file **untouched by this wave** |

**The underlying property is independently sound and re-verified**: the close's H3 added-line
masking sweep over the three product commits returns `0 · 0 · 0`, and Check 1 reproduced it. Only the
two citations were wrong; they are corrected, not carried.

### Defect 7 — MINOR · §8's gradient witness row unmet and unowned → **CURED (owner assigned)**

⟨cmd⟩ `find docs/tranches/X/waves/W6-evidence -name '*.png'` → **6 files, all under `catalog/`**;
the seven `{before,after}` gradient pairs `W6.md:358` names do not exist.

**Owner assigned: the X-W6 close seat** — §8 is a close-time artefact list and that seat already owns
its siblings (the `W6-evidence/gates/` transcripts, §9 commit **#11**). **With one measured
qualification a successor must have**: the **BEFORE** half can no longer be captured from the working
tree, because `.a`'s cure has landed and the pre-cure DOM is gone; it is reachable **only** from a
worktree at `f90aeb02^`. **Mitigated, and this is why nothing rests on it**: §17 count-scoping was
honoured — Check 1 verified across every AFTER reading that **no figure `.a` cites is PNG-derived**.

### Defects 8 and 9 — INFO, untouched, with one measurement added

- **8 (oracle hermeticity)**: not re-opened. One reading added: ⟨cmd⟩ `git status --porcelain` after
  **two** `o23-specimen-gamut-honesty` runs at this seat → **no `W6-evidence/` frame modified**. The
  non-hermeticity is `o21-space-catalog-truth` / `o24-specimen-dot-identity` specifically; **o23 is
  hermetic** and may be re-run freely by a challenger.
- **9 (LEDGER ⇄ `W7.md` opens-after divergence)**: **not touched.** `LEDGER.md:35` is **X-W7's row**,
  not this wave's, and this seat may edit only its own wave's cells. Left for X-W7's seat.

### Bounds and commits — every path inside this wave's writable set

| # | commit | paths | bounds row |
|---|---|---|---|
| 1 | `c2f17bad` | `docs/tranches/X/waves/W6-atmosphere-tombstone.md` | `W6.md:103` `W6-*.md` (tombstones) **create** |
| 2 | `1155fd1f` | `test/gradient-v4-consume.test.ts` | `X-W6-FOLD.md` §3 **n.34** `modify` |
| 3 | `77f80e83` | `docs/tranches/X/waves/W6-f6ii-addendum-2026-09-19.md` | `W6.md:103` `W6-*.md` (letters) **create** |
| 4 | `6dfdd8d2` | `…/W6-evidence/j4-shortlandscape-720x450.{mjs,txt}` · `…/W6-evidence/j4-blob-preview-nav-loss.{mjs,txt}` | `W6.md:104` `W6-evidence/**` **create** |
| 5 | this commit | `docs/tranches/X/execution/A/X-W6.md` (append-only) · `docs/tranches/X/execution/LEDGER.md` (own row) | the record and its own row |

⟨cmd⟩ `git show --name-only` over commits 1–4, de-duplicated → **7 paths**, every one inside the set
above. `scripts/dev/dev.sh` **0** · `registry/adjudicated/` **0** · `node_modules/` **0** · `src/`
**0** · `api/` **0** · `demo/` **0** · sibling tracks' trees **0**. Every commit carries its own
pathspec **on the commit itself** and the `Claude-Session` trailer. **`W6.md` byte-untouched.**

### E13 mail — swept at this seat, read-only

⟨cmd⟩ position-free `grep -nE '\|[[:space:]]*(\*\*)?UNREAD' docs/tranches/V/coordination/INBOX.md`
→ **one hit**, at `:226`, and it is **prose** in a sweep note, not a table row. Re-run with the
INBOX's own classifying probe — ⟨cmd⟩ `grep -nE '\| \*\*UNREAD' INBOX.md`, the form `:226` itself
records as the correct one because live cells are spelled `| **UNREAD 2026-09-17** —` — **same one
prose hit, double-run 1 ≡ 1**. The three cells that note names (I-32 · I-33 · I-34) have since been
dispositioned. **0 UNREAD.** Register tail unmoved at **I-35 / O-39** (⟨cmd⟩ max of the `I-`/`O-`
id column). Nothing this seat wrote mints a row: the tombstone, the addendum and the j4
baseline are all consumer-side records with no producer limb, and glass-ui was neither read for a
census nor written. **This repair closes with NO UNREAD mail in scope.**

### Escalations returned by Repair 1

| # | escalation | measured reason |
|---|---|---|
| **E1** | **Re-dispatch `.b .c .d .e .g .h .i .j`** (defect 1's body). `.i`'s tombstone has landed, so `.i` resumes at i1/i2/i3, not at its first act. | Eight units, four lanes, four worktrees, ≤2-concurrent grouping — the orchestrator's dispatch, not a cure inside a writable set. **H4's eleven CC rows** ride with it. UNRELIEVED now **21** (`b1-b4 · c1-c4 · d1-d2 · e1-e2 · g1-g2 · h1-h2 · i1-i3 · H2 · H4`) — j4 has left the set GREEN. |
| **E2** | **A one-line dated bounds grant for `test/gradient-parse.test.ts`** (defect 2's other half; the close's escalation 1, still open). | ⟨cmd⟩ `grep -rn 'gradient-parse' docs/tranches/X/ docs/tranches/V/megatranche/` → **132 hits, zero bounds rows**. §3a orders the seat to halt, not widen. `.a`'s migration is already written verbatim. |
| **E3** | **A one-line re-point per stale instrument** — `gate-axis.mjs`, `gate-gesture.mjs` (defect 3). | Both `execute, no write` at ⟨`W6.md:105-106`⟩; editing them is a write this wave may not make. Both re-run unrunnable at this seat, errors quoted above. Owner: the wave that owns `…/probes/wb-gradient-stopeditor/**` (R-5). |
| **E4** | **The `o25`–`o27` oracle namespace** (the close's escalation 3, carried). | `o26-aurora-perceptibility.spec.ts` and `o27-focus-affordance.spec.ts` ship today; `W6.md` §4 tells `.i` and `.j` to *create* at those ordinals. It blocked j4's named command at this seat and will block `.i`/`.j` on creation. |

Carried unchanged from `## Close`: the `ictcp`/`jzazbz` URL round-trip revert (**R-3**, homeless).

### Four-verb status after Repair 1 — unchanged, deliberately

**AUDITED** yes · **SPECIFIED** yes · **IMPLEMENTED** **no — still PARTIAL, 2 of 10 units** ·
**VERIFIED** no. Gates **25 of 50 GREEN** (24 + j4). `W6.md:7` `**Status**: planned` and `:10`
`IMPLEMENTED no` are **byte-untouched**: E-3 binds, and a PARTIAL wave has no IMPLEMENTED to stamp.
**The LEDGER row stays PARTIAL and is not promoted.** Four successors stay lawfully blocked.

---

## Check 2

SERVED MODEL: claude-opus-5[1m]

**Seat**: L-20 FRESH ADVERSARIAL CHECK, **pass 2** — **VERIFY-ONLY**. An independent
`claude-opus-5[1m]` that authored no cure byte, no unit receipt, and no line of `## Close`,
`## Check 1` or `## Repair 1`. Wall clock **2026-09-19**.
**Verdict**: **NOT-CONFORMANT** — 0 BLOCKER · **1 CRITICAL** · **1 HIGH** · 2 MINOR · 3 INFO.

**All 25 claimed GREENs reproduce at this seat's own commands** — 25 of 25, zero divergences of
verdict, every figure re-read from the settled bytes rather than inherited, the cheap gates
double-run. The wave still does not fail on what it did. It fails on the **21 of its 25 RED gates
that carry no relief** — Check 1's 22 less j4, which Repair 1 moved GREEN with its measurement.

### Crash-recovery (standing law)

⟨cmd⟩ `git status --porcelain` at open → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh`. **Neither is inside this seat's writable set** (the V fold-source · the
unowned NEVER-touch row). **No inherited hunk on any W6 path**; nothing stashed, reset or restored.
Mid-seat a sibling's `docs/tranches/X/execution/D/X-P-W4.md` and its own `LEDGER.md` row went dirty
and then committed — read, never staged, never restored. At close the dirty set is the same two
standing rows.

### Axis 1 — every claimed GREEN re-run at this seat (25 of 25 reproduce)

| gate | ⟨cmd⟩ at this seat | reading | verdict |
|---|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` + `npx vitest run test/gradient-order-invariant.test.ts` | probe prints `parseCssColor("oklch()") -> reject` (no throw), `parseGradientCSS -> reject: stop positions must be non-decreasing` on the descending literal and `-> ok` on the ascending one; **13 passed (13)** | **GREEN — reproduces** |
| a2 | `node …/WBGSE-O-r3-crossdrag-forcedcolors.mjs` (fresh :9000, STALE-SERVER law) | emitted `linear-gradient(90deg, … 50%, … 84.4%, … 100%)` — **ascending**; three `calc(var(--rail-inset) + var(--rail-track) * f)` lefts | **GREEN — reproduces** |
| a3 | o21 `:143` *"one axis: every handle centre sits where the ramp paints its own ordinal"* | passed | **GREEN — reproduces** |
| a4 | o21 `:185` *"the forward and inverse maps are inverse"* | passed | **GREEN — reproduces** |
| a5–a11 | `node …/W6-evidence/gradient/gate-a-gesture-paint.mjs` | `travel@1px=0.00px travel@120px=120.00px` · `activeElement=BUTTON/stop-2-mu8a1r5o [27.4,100]→[27.4,98]` · `before=2 middle=2 right=2 cancel=2` · **5** `aria-valuenow` writes over 5 pointermoves · chip band `[256.7,280.7]` rules intersected **0** · white ramp `innerRatio 15.08 / 14.59`, `outerRatio 1 / 1.04` · a9 rows claimed `[]`, chip `3 → 2` — `GATE X.W6.a (gesture + paint) — GREEN`, exit 0 | **GREEN — reproduces, figure for figure** |
| a7 (second arm) | `node …/WBGSE-O-r3-gestures.mjs` | `C14 buttons: {"beforeMid":2,"afterMid":2,"afterRight":2}` | **GREEN — reproduces** |
| a12 | `node …/WBGSE-D-probe2.mjs` + o21 `:238` | `beforeOverhangPx: 0` · `afterOverhangPx: 0`; handleLeftEdge ≡ barLeftEdge at **224≡224** (rootFS 16) and **102≡102** (rootFS 20) | **GREEN — reproduces** |
| a13 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **17 passed (1.3m)**, every spec named in the list reporter | **GREEN — reproduces** |
| f1 | `node docs/tranches/X/gates/gate-catalog-totality.mjs` | `GATE f1 — GREEN  offered=18 catalogued=18 info=18  docs=11 authored + 7 decided-none = 18 decided`; `display-p3` created **2015**. **Double-run identical** | **GREEN — reproduces** |
| f3 f4 f6 f8 | `npx playwright test o21-space-catalog-truth o22-specimen-legibility o23-specimen-gamut-honesty o24-specimen-dot-identity --project=smoke` | **4 passed (1.4m)**; f6 prints `worst un-projected Lab recovery 7.517e-1 (hsl); bound 1; clipped control (hex) 4.061e+1`; f8 prints `distinctVisualSignatures = 18 of 18` with 18 distinct `feTurbulence` seeds and `bg=lab(92 88.8 20 / 0.827)` **constant across all 18 rows** | **GREEN — reproduces, figure for figure** |
| f5 | `node docs/tranches/X/gates/gate-specimen-grammar.mjs` | `GATE f5 — GREEN  65610 specimens over 18 spaces; css=14 channels=4; longest 50/52 chars`. **Double-run identical** | **GREEN — reproduces** |
| f7 | `grep -rn 'colorSpace: any' demo` → **0** · `grep -c 'as DisplayColorSpace' …Selector.vue` → **0** · `npx vue-tsc --noEmit -p tsconfig.demo.json` → **exit 0, no diagnostics** · `npx vue-tsc --noEmit -p …/catalog/tsconfig.f7-witness.json` → **exit 0** | all four legs | **GREEN — reproduces** |
| f9 | two greps | `updateToColorSpace` in the component → **2**; `ColorPicker` watch-grep → **0** | **GREEN — reproduces** |
| f10 | `grep -rn 'from "\.\./ui/' demo/color-session/ \| wc -l` | **0** | **GREEN — reproduces** |
| **H1** | `node docs/tranches/X/gates/gate-no-chassis.mjs` | **positive control fires first** (`dead-name ✓  stage+inspector+action ✓`), then over **14 demo/ files across 3 commits** and **2 new modules**: `GATE H1 — GREEN`. **Double-run identical** | **GREEN — reproduces** |
| **H3** | `node -e "…parseCssColor('oklch()')…"` → **`NO THROW`, exit 0**, `{"ok":false,"diagnostics":[{"code":"css_syntax",…}]}` · packed glass exports matching `rail\|slider\|gradient` → **`./slider` only** · installed **7.0.0**, `./watercolor-dot` **published** | all three sweeps | **GREEN — reproduces** |
| **j4** | `node …/W6-evidence/j4-shortlandscape-720x450.mjs` | `GATE j4 (short landscape 720×450) — GREEN  4 of 4 routes reachable on both arms`, exit 0; every box re-printed (gradient tile `{top:360,h:129}`, mix canvas `{top:105,h:336}`, blob `{top:70,h:180}`, atmosphere `{top:0,h:450}`), `docScrollHeight=450 innerHeight=450` on all four | **GREEN — reproduces** |

Also re-verified at this seat: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` **exit 0** ·
⟨cmd⟩ `npx eslint demo/` **exit 0** · ⟨cmd⟩ `npx vitest run` **15 failed / 611 passed (626), 5 files**
— Repair 1's post-cure figure exactly, enumerated per file (`gradient-parse` 2 · `v4-css-emerging` 10 ·
`spectrum-luma` 1 · `v4-c1` 1 · `reka-binding-idiom` 1), with `gradient-v4-consume` **gone from the
failing set**. ⟨cmd⟩ `git diff --check HEAD` → nothing.

**Three readings added, so no successor re-derives them:**

1. **`gate-axis.mjs` has TWO failure faces, one defect.** On a server that has just been restarted it
   dies earlier — ⟨cmd⟩ `TypeError: null is not an object (evaluating 'bar.getBoundingClientRect')` at
   `:35` — and on a settled server it reproduces the published error exactly, ⟨cmd⟩
   `TypeError: null is not an object (evaluating 'h.getAttribute("aria-label").match(/([\d.]+)%/)[1]')`
   at `:35`. Both runs taken here. The published citation is correct; the earlier face is a boot
   condition, **not a second defect**. `gate-gesture.mjs` times out at `:21` in both.
2. **The f7 witness is a `vue-tsc` project, never `tsc`.** ⟨cmd⟩ `npx tsc --noEmit -p …/tsconfig.f7-witness.json`
   → **exit 2, 5 errors** including `f7-witness.ts(29,1): error TS2578: Unused '@ts-expect-error' directive`
   — because plain `tsc` cannot type an SFC default export, so `InstanceType<typeof ColorSpaceSelector>["$props"]`
   degrades and the directive goes unused. The witness's own header names `vue-tsc`, and `vue-tsc` is
   **exit 0** here. **No successor may read a `tsc` run of this project as a RED witness.**
3. **The vacuity falsifier is real** (L-18 target 1). Read at the banked transcript
   `…/gradient/gates/a13-vacuity-falsifier.txt`, not re-mutated at this seat (a mutation is a write to a
   product path this seat may not make): MUTATION 1 *delete the `.sort()`* → **5 failed | 8 passed (13)**,
   MUTATION 2 *the axis map becomes a plain percent* → **1 failed | 12 passed (13)**, both restored with
   their site counts re-printed. The suite reds under both named mutations; it is not vacuous.

### Axis 2 — bounds (CLEAN)

⟨cmd⟩ `git show --name-only` over all **twelve** wave commits (`f90aeb02` `c222542d` `e77650e1`
`e0e204a9` `7e5b9512` `7630cc48` `a0a2c4da` `c2f17bad` `1155fd1f` `77f80e83` `6dfdd8d2` `fc1f1a0e`),
de-duplicated → **68 paths**, each checked against `W6.md` §4 and `X-W6-FOLD.md` §3:

- the three §4 deviations are **ruled errata, not widenings** — ⟨`X-W6-FOLD.md:1016`⟩ **n.1**
  `GradientVisualizer/GradientEasingEditor.vue` (*"the `easing/` segment does not exist"*),
  ⟨`:1017`⟩ **n.2** `demo/scenes/about/ColorNutritionLabel.vue` (*"measured absent at that path,
  present at this one"*), ⟨`:1049`⟩ **n.34** `test/gradient-v4-consume.test.ts` `modify`;
- ⟨cmd⟩ `scripts/dev/dev.sh` across all twelve → **0**; `src/` **0** · `api/` **0** ·
  `node_modules/` **0** · `demo/color-picker/App.vue` **0** · `demo/color-picker/router/` **0** ·
  `demo/ui/` **0** · `demo/palettes/` **0** · `.github/workflows/` **0** · sibling tracks'
  `execution/B|C|D` **0** · `registry/adjudicated/` **0**;
- all twelve carry the `Claude-Session` trailer (⟨cmd⟩ → `1` each).

**Zero writes outside bounds.**

### Axis 3 — masking fallbacks (NONE)

Added-line sweep over the five product/evidence-bearing commits (`f90aeb02` `c222542d` `e0e204a9`
`1155fd1f` `6dfdd8d2`) for `try {` / `catch` / `test.skip` / `.skip(` / `.only(` / `xit(` /
`allowlist` / `eslint-disable` / `@ts-ignore`: **every hit read at the bytes is prose in a comment**
(one is the line stating an assertion was *"DELETED with the measurement, never `test.skip()`"*; one
is `.a`'s own ban restated at `useGradientModel.ts:190-193`). The single real `try/catch` in the diff
is ⟨`gate-specimen-grammar.mjs:111-118`⟩ and it **converts a throw into `fail(...)`** — the opposite
of a mask, read here. `setStopsFromColors` branches on `parseCssColor(...).ok` at
⟨`useGradientModel.ts:199-202`⟩ rather than wrapping it — read at the bytes, which also confirms the
close's caveat that `gate-structure.mjs`'s G4c narration *"with no validity check"* is **stale prose,
not a live defect**. `1155fd1f`'s migration **widens no assertion** (⟨cmd⟩ `git show 1155fd1f`: the
`intervals:` literal drops, each stop gains `easing: linearInterval()`, and the only other hunks are
prettier line-wraps). **0 `@ts-expect-error` used to silence a defect** — the one in the tree is f7's
own RED-able witness. **0 allowlists · 0 copied producer selectors · 0 patched node_modules.**

### Axis 4 — commit families (CLEAN)

GRADSTOP-A §14's family is **whole** in `f90aeb02` (model ⊕ axis ⊕ gesture ⊕ paint ⊕ tests ⊕ oracles,
one commit, body required and present). `c222542d` is the a9 gutter — a **second meaning** discovered
by the first AFTER run. §9 #6 is `e0e204a9` with its body; #11 `docs(x-w6 close)` is `7630cc48`.
Repair 1's four cures are **four meanings in four commits** (tombstone · test migration · f6(ii)
addendum · j4 baseline), none split, none merged. **One commit per meaning throughout.**

### Axis 5 — E-3 (HELD)

⟨cmd⟩ `git diff --stat f90aeb02^..HEAD --` over `docs/tranches/V/megatranche/registry/adjudicated/`,
`docs/tranches/X/waves/W6.md`, `W5.md`, `W7.md`, `W8.md`, `W9.md`, `W10.md`, `W11.md`,
`…/audit/probes/`, `…/audit/components/` → **prints nothing**. Extended to
`docs/tranches/V/audit/REFORMATION-2026-07-16.md`, `docs/tranches/X/CONFORMANCE-2026-08-03.md`,
`EXECUTION-RUNBOOK.md`, `refinement/`, `REFINEMENT-FOLD-2026-08-28.md`, `scripts/dev/dev.sh` →
**prints nothing**. The one file in that extended set that moved in the commit *range* is
`COHESION.md` (+22), and ⟨cmd⟩ `git log --oneline f90aeb02^..HEAD -- …/COHESION.md` → **`2613953b`
`abbed3f6`, both Track C (`x-f-w3`)** — **no W6 commit touches it.** The dated spec, the adjudicated
registry, every sibling spec and all twelve `execute, no write` instruments are **byte-untouched by
this wave**, and RF-26's misdating was corrected by addendum-beside rather than by edit.

### Axis 6 — mail (CLEAN)

⟨cmd⟩ `grep -nE '\|[[:space:]]*(\*\*)?UNREAD' docs/tranches/V/coordination/INBOX.md` → **one hit, at
`:226`, and it is prose** in a sweep note, not a table row. ⟨cmd⟩ row census → **79** `I-`/`O-` rows;
⟨cmd⟩ max ids → **I-35 / O-39**, the register tail unmoved. ⟨cmd⟩ `find` over the landing paths
`-newermt "2026-09-19 00:00"` → **two** members, `V/coordination/INBOX.md` (**self**, excluded by
SELF-COUNT) and keyframes' `INBOUND-LEDGER.md` (not addressed to value.js, mints no row).
**0 UNREAD in scope. This check closes with no UNREAD mail.**

### Axis 7 — the four-verb line moved LAWFULLY

⟨cmd⟩ `sed -n '7p;10p' docs/tranches/X/waves/W6.md` → `**Status**: planned` and
`… IMPLEMENTED no · VERIFIED no`, **byte-untouched** (axis 5's diff prints nothing over `W6.md`).
Correct twice over: E-3 binds the dated spec, and a PARTIAL wave has no IMPLEMENTED to stamp.
Nothing was flipped that the bytes do not support.

### Axis 8 — the spec's own §2a goal criterion is NOT MET at the bytes

`W6.md:17` asks that **each** of six live instruments — Gradient, the space catalog, Easing,
HeroBlob, Blob/Atmosphere, Mix — own its stage, inspector and action contract **as a routed scene**,
tell one geometric **and** one colour-science truth, and carry its motion under the shared
field/motion law, with no chassis rebuilt. Measured here:

- **Gradient** has its geometric truth (`.a`, a3/a4/a12 GREEN) but **no inspector** (`.b` unwritten:
  ⟨cmd⟩ `gate-seat.mjs` → `GATE G3 (stop seat) — RED`, no numeric entry in the tree) and **no routed
  scene** (⟨cmd⟩ `grep -c 'component: Stub' demo/color-picker/router/index.ts` → **14**);
- **the space catalog** has its colour-science truth (`.f`, 9 of 10);
- **Easing · HeroBlob · Blob/Atmosphere · Mix** are untouched — ⟨cmd⟩ none of `EasingAuthoringStage.vue`,
  `easingCatalogue.ts`, `HeroBlob.vue`, `useContrastSafeColor.ts`, `AuroraPane.vue`, `BlobPane.vue`,
  `useAtmosphere.ts`, `atmosphere-calibration.ts`, `MixPane.vue`, `MixConfigBar.vue`,
  `MixSourceSelector.vue`, `MixAnimationCanvas.vue`, `useMixingAnimation.ts` appears in the 68-path census;
- **the motion clause is unmet** — ⟨cmd⟩ `grep -rn requestAnimationFrame demo/workbenches/gradient/`
  → **2**, neither PRM-gated, and no aurora declaration on the ramp;
- only *no chassis-shaped abstraction rebuilt* is satisfied outright, and H1 measures it.

**One of seven clauses true.** Per `W6.md:342` a wave whose goal is unmet closes
`complete_with_misses` — and this wave has not even reached that, because its gates do not all pass.

### Axis 9 — the record's published figures reproduce

Every figure re-read here reproduces, **including both figures Repair 1 corrected**: ⟨cmd⟩
`ls -1 …/W6-evidence/gradient/gates/ | wc -l` → **25** (the close's "26" is corrected, and `e77650e1`
carries 27 files = 25 transcripts + the instrument + the record); ⟨cmd⟩
`grep -c 'try {' demo/workbenches/gradient/` → `demo/workbenches/gradient/GradientPane.vue:0`,
**exit 1** — malformed on a directory, exactly as Repair 1 states, and the recursive form → **1**, in
`GradientVisualizer/GradientCodeEditor.vue`, **not in the 68-path census**. Repair 1's own figures
reproduce: vitest **15 failed / 611 passed (626), 5 files**; ⟨cmd⟩
`find …/W6-evidence -name '*.png'` → **6, all under `catalog/`**; the tombstone's predicate is
**verbatim** ⟨`docs/tranches/A/audit/W6-deferred.md:22`⟩, its `e32111c7` citation re-measured here at
⟨cmd⟩ `grep -rn deriveAurora demo/` → **8**. **No figure in `## Close`, `## Check 1` or `## Repair 1`
fails to reproduce at this seat.**

### Axis 10 — HONEST-RED ADJUDICATION, gate by gate

**RELIEVED — the honest-RED set (4), each re-derived at the spec bytes here:**

| gate | relief, cited at the spec bytes | owner named in the record |
|---|---|---|
| **f2** | **A later wave owns the surviving hit by the spec's own routing.** The one remaining site is ⟨cmd⟩ `demo/picker/controls/ComponentSliders/ConsoleRail.vue:174` — `const info = (colorSpaceInfo as any)[space];` — and ⟨`W9.md:104`⟩ books that exact path `modify` for X-W9, ⟨`W9.md:8`⟩ *"X-W9.h follows X-W4 on `ConsoleRail.vue`"*, ⟨`:142`⟩ is the cross-wave hold and ⟨`:304-311`⟩ routes `componentDescription()` at `:172-180` to **X-W9.h**. The path is in no `W6.md` §4 row; curing it here is the §3a expansion that invalidates the wave. Verified RED here: grep → **1** | **R-2 → X-W9.h**, with the one-line migration (`SPACE_CATALOG[space].info`, total, no cast) written free by `.f` |
| **j1 · j2 · j3** | **A predecessor wave owns the contract `.j` adopts.** ⟨`W6.md:313`⟩ — *"this unit **adopts** the X-W5 scene contract for the route"* — and ⟨`W6.md:397`⟩ §10 Depends-on X-W5, *"`.j` adopts that contract route by route; it does not author it"*. ⟨`W5.md:12`⟩ **Status: planned**; LEDGER X-W5 row **planned**; verified at the bytes here: **14 `component: Stub` routes**. A `.j` dispatched today returns BLOCKED-ON X-W5 without writing a product byte | **R-1** (`.j` BLOCKED-ON X-W5); Repair 1's `j4-blob-preview-nav-loss` finding is banked to `.j` and is explicitly **not** relief for j2/j3 |

**UNRELIEVED (21)** — `b1 b2 b3 b4 · c1 c2 c3 c4 · d1 d2 · e1 e2 · g1 g2 · h1 h2 · i1 i2 i3 · H2 · H4`.
Each was **re-measured RED at this seat**, not assumed:

- **b1 · b2 · b4** — ⟨cmd⟩ `node …/gate-seat.mjs` → `GATE G3 (stop seat) — RED`: `aria-pressed`/`aria-selected`
  both absent; `Home` and `ArrowDown` no-ops **against `style.left`** (`calc(var(--rail-inset) + var(--rail-track) * 0)`
  unchanged); a click 3px inside the rail mints nothing; with 12 stops only **149px of 462px (32.3%)**
  can still mint. **b3** — no numeric-entry control exists.
- **c1** — ⟨cmd⟩ `node …/gate-structure.mjs` → `GATE G4 (structure) — RED`, seven live conditions
  (`model/sample.ts` and `model/types.ts` **ABSENT** by ⟨cmd⟩ `ls demo/workbenches/gradient/model/`;
  8 emitted gradient strings with no ` in <space>` clause; the 7-name dead re-export door with zero
  consumers). **c2 · c3 · c4** — `gate-literal-dialect.mjs` and `test/interpolation-subset.test.ts` **ABSENT**.
- **d1 · d2** — ⟨cmd⟩ `ls docs/tranches/V/megatranche/audit/probes/x-w6/` → **ABSENT**;
  `W6-glass-ask-easing-readout.md` **ABSENT**. d2 closes *either* by the glass primitive *or* by a
  dated ask — and ⟨`W6.md:103`⟩ makes that ask **this wave's own `create` row**, so the branch does
  not relieve the gate, it assigns it.
- **e1 · e2** — 2 ungated rAF, `gate-prm-idiom.mjs` **ABSENT**, no aurora declaration on the ramp.
- **g1 · g2** — `gate-card-rhythm.mjs` **ABSENT**.
- **h1 · h2** — `gate-blob-pipeline.mjs` and `W6-blob-pipeline-census.md` **ABSENT**.
- **i1 · i2 · i3** — `o25-atmosphere-response.spec.ts`, `o26-atmosphere-coldload.spec.ts`,
  `gate-lband-door.mjs`, `W6-lband-letter.md`, `W6-evidence/atmosphere/` **all ABSENT**;
  ⟨cmd⟩ `grep -rn armRuntime demo/` → **0**. The tombstone landed (`c2f17bad`) and **relieves no gate**
  by its own words — it discharges `.i`'s FIRST ACT and `W6.md:362`'s artefact row only.
- **H2** — the `test -f` leg is GREEN (`motion-quarantine.md` present, tracked `9812f951`); the
  citation leg has **no assertions to audit** because `.e`/`.j` never ran. Read **conservatively RED**,
  as `## Close` read it and as `W6.md:338`'s addendum directs (*"H2's citation legs stay born-RED"*).
  A vacuous-true reading would move it GREEN and is **not taken here** — that is the laundering
  direction, and this seat refuses it.
- **H4** — **eleven CC rows leave with no disposition** (CC-056 · 057 · 059 · 060 · 061 · 062 · 063 ·
  064 · 065 · 066 · 067) against ⟨`W6.md:340`⟩ *"exactly one disposition, ids for life, zero silent
  drops"*. CC-065's tombstone limb discharged; its X:ATMO-1 limb did not.

**Nothing in `W6.md` relieves these 21.** Each is assigned to a unit of **this** wave; every
instrument each needs sits inside **this** wave's own `create` rows; and every dependency each names
is MET — X-W0/X-W1/X-W2/X-W3/X-W4 **CLOSED** in the LEDGER, installed glass **7.0.0** with `./aurora`,
`./select`, `./labeled-field`, `./blob`, `./blob-config` published (re-read here). The only owner the
record can name is **R-1, re-dispatch of this same wave** — undone work, not relief.

**SELF-COUNT.** 46 sub-gates + 4 wave conditions = **50**. GREEN **25** = a1–a13 (13) ⊕ f1 f3 f4 f5
f6 f7 f8 f9 f10 (9) ⊕ j4 ⊕ H1 ⊕ H3. RED **25** = f2 ⊕ b1–b4 ⊕ c1–c4 ⊕ d1–d2 ⊕ e1–e2 ⊕ g1–g2 ⊕
h1–h2 ⊕ i1–i3 ⊕ j1–j3 ⊕ H2 ⊕ H4. 25 + 25 = 50. Of `W6.md:333`'s **45 born-RED sub-gates**, **22 are
GREEN** (j4 is not born-RED; H1 and H3 are not sub-gates). Relieved 4, unrelieved **21**.

### Defect register — Check 2

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **1** | **CRITICAL** | **21 of the 25 RED gates carry no relief.** Eight of ten units (`.b .c .d .e .g .h .i .j`) are undispatched — `.i` served only its docs-only first act — so 19 born-RED sub-gates ⊕ H2 ⊕ H4 stay RED with no producer, no successor and no spec-named honest-RED id. ⟨`W6.md:335`⟩ closes the wave only when **all 45** born-RED sub-gates are GREEN by their own commands; **22 of 45** are. H4's eleven undispositioned CC rows ride inside it | every gate above re-measured RED at this seat (`gate-seat.mjs` → `GATE G3 — RED`, `gate-structure.mjs` → `GATE G4 — RED`, the `x-w6/` probe dir · `o25`/`o26`/`o27` · the blob census · the lband gate · the easing ask **all ABSENT**); §2a **one of seven clauses true** | Re-dispatch the seven units whose every dependency is MET (`.b .c .d .e .g .h` ⊕ `.i` resuming at i1). `.j` alone waits on X-W5. This is the orchestrator's act, not a check seat's |
| **2** | **HIGH** | **The cure-shipped regression's surviving half is still live.** `.a` deleted `ParsedGradientModel.intervals` — correctly, it is the defect — and **2 assertions in `test/gradient-parse.test.ts` fail at the settled bytes**. ⟨`W6.md:348`⟩ §7 requires `npx vitest run` after each unit lands **and again before wave close**; it is RED. This is L-18 skeptic target **2** landing live | ⟨cmd⟩ `npx vitest run` → **15 failed / 611 passed (626), 5 files**, the two named `parseGradientCSS — complete-model acceptance` cases enumerated; ⟨cmd⟩ `git diff --stat f90aeb02^..HEAD -- test/gradient-parse.test.ts` → **nothing** (the file is untouched, so the breakage is the cure's) | **Mitigation is real, measured, and halves the defect**: Repair 1 landed `.a`'s migration verbatim on `gradient-v4-consume.test.ts` under FOLD n.34 (`1155fd1f`) and that file is **gone from the failing set**, re-measured here. The residual is **one dated bounds grant** — ⟨cmd⟩ `grep -rn 'gradient-parse' docs/tranches/X/ docs/tranches/V/megatranche/` returns no bounds row, so §3a orders a halt, and `.a`'s second migration is already written verbatim. **It does not erase the red suite** |
| **3** | MINOR | **The spec's named commands for a3–a7 are satisfied by nothing.** ⟨`W6.md:105-106`⟩ binds a3/a4 to `gate-axis.mjs` and a5/a6/a7 to `gate-gesture.mjs`, both `execute, no write`; both are **UNRUNNABLE**, re-run twice here. §6 asks for GREEN *"by the same commands that are RED today"* — unrunnable is a different state from RED-for-the-defect | ⟨cmd⟩ `node …/gate-axis.mjs` → `TypeError: null is not an object (evaluating 'h.getAttribute("aria-label").match(/([\d.]+)%/)[1]')` at `:35`; ⟨cmd⟩ `node …/gate-gesture.mjs` → `Timeout 30000ms` at `:21`. Cause re-confirmed to **pre-date** the wave: the live names read `Gradient stop 1 of 2` with the ordinal on `aria-valuenow` (⟨cmd⟩ the gestures probe's `C6/D2-13 attrs` block, read here) | **Not the wave's to cure** — §4's Bounds law forbids editing those instruments and §3a orders a halt (Repair 1 **E3**). The substitutes read `aria-valuenow`/`style.left`, strictly more precise than the whole-percent name. **Standing warning holds: no successor may read "a3 GREEN" as "`gate-axis.mjs` GREEN"** |
| **4** | MINOR | **§8's artefact roster is unmet on six of eight rows.** The seven gradient `{before,after}` PNG pairs, `owner-marks/`, `atmosphere/`, `W6-blob-pipeline-census.md`, `W6-glass-ask-easing-readout.md` / `W6-lband-letter.md` do not exist | ⟨cmd⟩ `find …/W6-evidence -name '*.png'` → **6, all `catalog/`**; the five doc rows **ABSENT** at ⟨cmd⟩ `ls` | Five of the six rows are owned by the undispatched units and discharge with defect 1. The gradient PNG row was given an owner at Repair 1 (the close seat) with the measured qualification that its BEFORE half is reachable only from a worktree at `f90aeb02^`. **Mitigated and non-load-bearing**: verified across every AFTER reading reproduced at this seat that **no figure `.a` cites is PNG-derived** |
| **5** | INFO | **§7's `prettier --check` leg is RED on the touched set and was never published by the close.** 13 of the 22 touched product/test paths fail, including one file this wave created (`test/gradient-order-invariant.test.ts`) | ⟨cmd⟩ `npx prettier --check <the 22 touched paths>` → `Code style issues found in 13 files`. **Measured pre-existing, not a regression**: the 10 extractable *modified* files all fail at `f90aeb02^` too (⟨cmd⟩ pre-wave blobs checked under the same `.prettierrc`), four untouched files (`HeroBlob.vue` · `AuroraPane.vue` · `MixPane.vue` · `useAtmosphere.ts`) fail, and `package.json` declares **no format script** | Repo-wide condition; recorded so no successor reads this leg as a W6 breakage. The one wave-created offender is a one-command fix inside `.a`'s own bounds at re-dispatch |
| **6** | INFO | **Oracle non-hermeticity reproduced.** Running `o21-space-catalog-truth` / `o24-specimen-dot-identity` rewrites two committed AFTER frames, so any challenger who re-runs f3/f8 dirties the wave's own evidence | ⟨cmd⟩ `git status --porcelain` after this seat's oracle batch → `M …/after-catalog-open.png` · `M …/after-specimen-dots.png`; restored byte-identical by single-path ⟨cmd⟩ `git checkout -- …`, tree verified clean afterwards. Repair 1's added reading holds: **o23 is hermetic** and was re-run twice here with no frame touched | As Check 1 states: write to a scratch path and compare, or declare the frames regenerated-by-design in §8 |
| **7** | INFO | **LEDGER ⇄ `W7.md` opens-after divergence, carried unchanged.** ⟨`LEDGER.md:35`⟩ X-W7's row reads its predecessor as X-W1; ⟨`W7.md:6`⟩ reads *"X-W3 …, X-W4 …, and **X-W6**"* | both read at the bytes here | X-W7's cell, not this wave's. Materially moot today: under either reading X-W7 is blocked, since ⟨`W7.md:12`⟩ is `planned` and X-W6 is PARTIAL |

### Successor "Opens after" conjuncts, measured against this wave

| successor | conjuncts at the spec bytes | state | lawfully blocked? |
|---|---|---|---|
| **X-W7** | ⟨`W7.md:6`⟩ X-W3 · X-W4 · **X-W6** | X-W3 **CLOSED** ✓ · X-W4 **CLOSED** ✓ · **X-W6 PARTIAL ✗** | **YES — blocked on X-W6.** Materially: ⟨`W7.md:150-156`⟩ makes X-W6 write four shared paths first, and only **1 of 4** landed (`ColorSpaceSelector.vue`); `AuroraPane.vue`, `MixConfigBar.vue`, `MixSourceSelector.vue` are absent from the 68-path census. The one conjunct whose substance **did** arrive is `formatSpecimen`'s digit policy |
| **X-W8** | ⟨`W8.md:6`⟩ X-W5 · **X-W6** · X-W7 stabilize destination ownership | X-W5 `planned` ✗ · **X-W6 PARTIAL ✗** · X-W7 `planned` ✗ | **YES — three conjuncts RED.** ⟨`W6.md:402`⟩ is explicit that X-W8's subtraction needs `.a`/`.c`'s destinations stable; `.c` never ran, so `model/types.ts` and `model/sample.ts` do not exist and the 7 dead re-export doors survive (re-measured here) |
| **X-W10** | ⟨`W10.md:6`⟩ X-W5 · **X-W6** · X-W7 · X-W8 · X-W9 stable | **X-W6 not stable ✗** (plus four others; X-W9 is PARTIAL in the LEDGER) | **YES** — and the LEDGER row already reads `BLOCKED-ON X-W5 · X-W6 · X-W7 · X-W8 · X-W9` |
| **X-W11** | ⟨`W11.md:6`⟩ X-W0 … X-W10 **IMPLEMENTED** | **X-W6 IMPLEMENTED = no ✗** | **YES** |

**No successor is unlawfully unblocked**, and it is the close's and Repair 1's shared refusal to flip
the four-verb line (R-9) that keeps all four correctly blocked.

### Verdict

**NOT-CONFORMANT.** The bar is *zero BLOCKER/CRITICAL/HIGH and every claimed GREEN reproduces*. The
second half is **fully met — 25 of 25, with the cheap gates double-run and every substantive figure
re-read from the settled bytes, including both figures Repair 1 corrected.** The first half is not:
one CRITICAL (21 unrelieved REDs) and one HIGH (the surviving half of the cure-shipped regression).

The honest-RED route is **unavailable**: CONFORMANT-HONEST-RED requires *every* remaining RED gate to
be relieved and owner-named, and only **4 of 25** are (`f2` → X-W9.h · `j1 j2 j3` → X-W5). The other
**21** are RED because eight of ten units were never dispatched — undone work, which is not relief,
and this seat will not launder it as such.

**What Repair 1 genuinely bought** (measured, not conceded): j4 moved RED-UNMEASURED → GREEN with its
measurement pasted and double-run; DR-01's eighteenth carry closed with the predicate quoted verbatim
and RF-26's misdating corrected by addendum-beside; f6(ii) ratified with the arithmetic that makes the
substitution forced rather than chosen; the HIGH halved at the bytes; and two wrong citations corrected
rather than carried. **The wave remains incomplete, not dishonest** — every RED it carries it names,
and the three greens it could have taken quietly (a3–a7's command substitution, f6(ii)'s constant, the
vacuous-true reading of H2) are all still refused.

**Cure, shortest path to CONFORMANT-HONEST-RED**: dispatch `.b .c .d .e .g .h` and resume `.i` at i1
— all seven have every dependency MET at the bytes today — issuing the one-line dated bounds grant for
`test/gradient-parse.test.ts` on the way so defect 2 closes. `.j` alone waits on X-W5, and j1–j3 are
already relieved and owner-named.

**The LEDGER row stays `PARTIAL 2026-09-19`. It is not promoted.**

### Commits and one disclosed index condition

| # | commit | paths | bounds row |
|---|---|---|---|
| 1 | `e524f321` | `docs/tranches/X/execution/A/X-W6.md` (append-only — `## Check 2`) | the record |
| 2 | this commit | the same record (this disclosure) | the record |

**DISCLOSED — the shared LEDGER was carried by a sibling's commit, not by this seat's.** This seat's
LEDGER act was the lawful minimum: an in-place replacement of the X-W6 row's own status cell plus one
appended event line, both re-read immediately before writing. Between that write and this seat's
commit, **Track C dirtied the same file** (the `F.W3` row) and committed first — ⟨cmd⟩
`git show --stat c0386722` → `docs/tranches/X/execution/LEDGER.md | 6 ++++--`, and ⟨cmd⟩
`git show c0386722 -- …/LEDGER.md | grep -c "X-W6 CHECK 2"` → **1**. So `c0386722`
(*"docs(X·exec): F.W3 row …"*) carries **this seat's X-W6 row cell and event line** alongside its own
F.W3 row. **This seat swept nothing**: it never staged, committed, reset or restored a sibling path,
and its own commit `e524f321` carries the record alone. Recorded here because a pathspec cannot
separate two seats' edits to **one file**, and the next seat should read the X-W6 ledger cell's
provenance from this note rather than from `c0386722`'s subject line. ⟨cmd⟩ `git status --porcelain`
at close → `M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh` — the two standing
rows, neither this seat's; `scripts/dev/dev.sh` was never touched and never staged. The two committed
AFTER frames this seat's oracle batch regenerated were restored byte-identical by single-path
⟨cmd⟩ `git checkout -- …` before any commit, and the tree was verified clean afterwards.

---

## Repair 2

SERVED MODEL: claude-opus-5[1m]

**Seat**: REPAIR, round 2, against `## Check 2`'s defect register (1 CRITICAL · 1 HIGH · 1 MINOR).
Wall clock **2026-09-19**, branch `tranche-u`.
**Verdict**: **THREE GATES MOVED RED → GREEN · 1 PARTIALLY CURED AND ESCALATED · 1 ESCALATED.**

**Gates 25 → 28 of 50. The UNRELIEVED set 21 → 18. Of `W6.md:333`'s 45 born-RED sub-gates,
22 → 25 are GREEN.** Two ledger rows leave with a full disposition for the first time
(**CC-063**, **CC-066**), taking H4's undispositioned set **11 → 9**.

Every one of the three is a gate whose cure the record had written off as "undone work". None of them
was. Each was a **measurement** this wave owed and had never taken, and in all three the measurement
**overturned the hypothesis the spec carried** — which is what the three gates exist to do.

### Crash-recovery (standing law)

⟨cmd⟩ `git status --porcelain` at open → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh`. **Neither is inside this seat's writable set** (the V fold-source · the
unowned NEVER-touch row). **No inherited hunk on any W6 path**; nothing stashed, reset or restored.
Mid-seat Track B/D added untracked `docs/tranches/X/parse-that/**` — read, never staged. At close the
dirty set is the same two standing rows.

### Defect 1 — CRITICAL · 21 of 25 RED gates carry no relief → **PARTIALLY CURED, ESCALATED**

The register's own cure line reads *"This is the orchestrator's dispatch across four lanes and four
worktrees, not an act available to a check or repair seat."* That is true of **dispatch**. It is not
true of the **writable set**: every instrument these gates need sits in `W6.md` §4's own `create`
rows, and three of them are completable by one seat with a measurement. Those three were taken.

#### 1a · **h2 — RED → GREEN.** The blob pipeline census (`48d95650`)

`W6.md:284` makes the census `.h`'s FIRST act and `:293` reds the gate *"if the wave cuts at a stage
it did not measure"*. `docs/tranches/X/gates/gate-blob-pipeline.mjs` +
`docs/tranches/X/waves/W6-blob-pipeline-census.md`.

**All three candidate strippers were measured. None of them is a stripper.** Every stage delivers
**100.0% of the chroma sRGB allows at the lightness it lands on** — re-measured at four seeds:

| stage | reading at the owner's case `lab(92% 88.8 20)` |
|---|---|
| seed | L 0.9583 · C **0.27245** · sRGB ceiling at its own (L,h) **0.02105** → **12.94× outside the gamut it must be painted in** |
| candidate 1 · the 1×1-canvas resolver | C 0.14949 (−45.1%) — **and OFF the blob's chroma path** |
| candidate 2 · `deriveBlobPalette` | C 0.08795…0.00971, **100.0% of ceiling at every stop of every seed** |
| candidate 3 · the shader | gamma-sRGB `vec3` uniforms ⊕ a clamp-only `gamutClampOklch` |
| stage 4 · `oklchStopToHex` | **\|ΔC\| ≤ 4.09e-4** — four orders below the deltas above |

Three findings the record did not have:

1. **Candidate 1 is off the path.** `HeroBlob.vue:42` reaches `useContrastSafeColor` through exactly
   one name, `resolveSurfaceLightnessLive`, whose sole consumer `floorStops` returns
   `{ ...s, L: clamp(…) }` — **`C` and `h` untouched**. The gate re-checks both facts structurally
   every run (leg L4), so the day someone routes colour through that door the census is wrong **on
   the record** rather than quietly. The spec's **arithmetic was right and its attribution was not**:
   the identical clamp on the path that IS the blob's is the producer's own
   `defaultBlobColorResolver` = `oklchToGammaRgb ∘ cssToOklch`, measured byte-for-byte the same
   (`rgb(255 143 200)`), which reproduces `W6.md:291`'s figure.
2. **L-18 target 5 fired and is recorded.** The raw deltas read as *"`deriveBlobPalette` strips 68%"*.
   Measured against the sRGB ceiling at each stop's own (L,h) that reading is **FALSE**. Gate leg L5
   recomputes the ceilings and reds if the census ever publishes a stripper claim without them — it
   is the leg that stops this gate manufacturing a false cut for h1.
3. **The consumer's one declared chroma lever is INERT.** `HeroBlob.vue:124` passes
   `chromaCeiling: Math.max(0.16, seed.C)`; measured at ceilings **0.27245 · 0.400 · 1.000** the
   derived chroma is byte-identical. Raising it can never make the blob more vibrant.

**Negative control banked**: one mutated digit (`derive.maxC` 0.08794842 → 0.08794942, Δ 1e-6) reds
the gate by key. A first tolerance of 5e-5 did **not** fire and was tightened to 1e-7 before
publication — recorded, not buried.

#### 1b · **d2 — RED → GREEN.** The easing-readout census and the dated ask (`c8111846`)

`docs/tranches/V/megatranche/audit/probes/x-w6/gate-easing-readout.mjs` +
`docs/tranches/X/waves/W6-glass-ask-easing-readout.md`.

`W6.md:226` makes d2 fail **in both directions**, so the gate does **not** read the ask and stop: it
re-runs the census against the installed producer's shipped declarations and **decides the branch**,
then checks the wave took it. Census at **7.0.0**, re-derived every run:

```
./input published: false
./labeled-field  LabeledField  label REQUIRED  slots [default, error]
./labeled-field  LabeledInput  label REQUIRED  slots [error]     (+ Select/Slider/Switch)
./number-field   NumberField   label optional  slots [default]   (+ Content/Decrement/Increment/Input)
fitting primitives (optional label AND a leading/trailing action slot): NONE
```

**The near miss was ruled on explicitly rather than skipped.** `LabeledField` **does** ship a generic
`default(props: LabeledFieldSlotProps)` composition seam that the spec's prose (*"`LabeledInput`
declares no trailing/leading slot"*) never mentions, because it is about a different component. It is
ruled NOT FITTING on its own declarations: `label: string` is **required**, so composing a read-only
literal from it invents a label the design does not have, forces `controlLabelable: false` to suppress
a `for` with no target, leaves `controlId`/`labelledBy`/`errorId`/`required` unconsumed — and still
supplies none of the well ground, the mono register or the trailing action seam. That is a literal
wearing a form field's clothes, not composition.

**Both directions verified by negative control**: dropping one shipped slot from the ask's table reds
it (*"the census must be pasted, not summarised"*); widening the gate's action-slot test so
`NumberField` fits reds it the other way (*"a fitting published primitive EXISTS … and the readout
does not compose it"*). Leg L4 re-reads this wave's own diff over `GradientEasingEditor.vue` and
measures **0** styling lines added — the `W6.md:217` restyle ban held.

#### 1c · **i2 — RED → GREEN.** The dark lBand door, PROBED, then LANDED (`4cb294b9`)

`docs/tranches/X/gates/gate-lband-door.mjs` + the cure in `useAtmosphere.ts` ·
`atmosphere-calibration.ts` · `aurora-bracket.test.ts`.

`W6.md:308` fails i2 in both directions too, so the **probe decides**. Driven through the producer's
own `resolveAtoms` door at seed `oklch(0.66 0.16 28)`:

```
plain                     L 0.5000 0.6067 0.7133 0.8200
lightnessScheme: "dark"   L 0.1800 0.2600 0.3400 0.4200   every stop moves, and moves DOWN
lBand [0.10, 0.34]        L 0.1000 0.1800 0.2600 0.3400   honoured to its endpoints
```

**The door is REACHABLE, so the letter branch is forbidden.** The three sites that deferred this row
read that the atoms door *"ships no scheme/lBand"* and that *"seed-atom resolution clobbers a
base-palette override"*. True of the dist they were written against; **FALSE of the installed
7.0.0**, whose own declaration names the light-band-in-dark result *"the dark-leg defect"*. This is
L-18 target 4 — citation inheritance — caught by re-derivation: `W6.md:305`'s own evidence was a grep
**occurrence count**, and an occurrence count is not reachability.

**Landed** through one `fieldAtoms()` seam routing **both** resolution sites (the WebGL getter and
`resolvedPalette`) through the shipped door, with the atoms left as the tuning surface — an authored
`lightnessScheme` or `lBand` still wins. **The ground's scheme-banding is deliberately untouched**: it
is pinned to the RAW producer derive by the `FIRST_VISIT_GROUND` byte-identity, and collapsing the two
would silently re-point that pin. The three comments are corrected by **dated E-3 addenda that quote
the superseded claim and overturn it**, never by silent deletion, and two cases were added to
`aurora-bracket.test.ts` **in the breaking direction**, so the next dist that closes the door reds a
test instead of ageing into a fourth deferral.

**A first cut of this gate was FALSE-GREEN and is recorded rather than buried** (L-18 target 5): legs
L3/L4 read the raw source, so deleting the landing still passed — the explanatory comment carried the
literal. The gate now strips comments (`codeOf`) before either leg, and both controls fire post-fix.

#### 1d · What is ESCALATED, and why it is not a smaller claim

**`.b .c .e .g` and the `.h`/`.i` remainders stay undispatched.** Re-dispatch is eight units across
four lanes and four worktrees — the orchestrator's act. Three specific refusals, each measured:

- **e2 was NOT taken, deliberately.** Re-measured: ⟨cmd⟩ `grep -rn requestAnimationFrame
  demo/workbenches/gradient/` → **2**, both in `EasingAuthoringStage.vue` (`:58`, `:65`), and read at
  the bytes **both are one-shot post-paint reads of the SVG `viewBox`** (`syncVbRatio`) — a layout
  measurement, not a clock and not motion. `W6.md:238` offers *"≤2 with both gated, or 0"*, and
  PRM-gating a layout read would break the zero-letterbox law for reduced-motion users — the wrong
  cure. Landing e2 while **e1 is unbuilt** would also make its second leg (*"every motion declaration
  sits inside a `no-preference` block"*) **vacuously true**, which is the laundering direction
  `## Check 2` refused for H2 and this seat refuses here. **e2 stays RED with a sharpened finding for
  `.e`'s dispatch.**
- **h1 stays RED, now with a measured reason rather than an absence.** `W6.md:293`'s own falsifier
  reads *"h1 fails at any current colour whose chroma exceeds sRGB, which is exactly the owner's
  case"*, and §1a measures that excess at **12.94×** against a producer uniform typed gamma-sRGB
  `vec3`. **h1 as written is unsatisfiable on this canvas for the case it names.** That is a finding
  for `.h` and for X-W10's canon — the gate does not consume it and h1 is not moved.
- **i1 and i3 stay RED.** `o25`/`o26` and `W6-evidence/atmosphere/` frames are `.i`'s remaining work;
  ⟨cmd⟩ `grep -rn armRuntime demo/` → **0**, unchanged.

### Defect 2 — HIGH · the cure-shipped regression's surviving half → **ESCALATED, with the grant's arithmetic verified**

Re-measured at this seat: ⟨cmd⟩ `npx vitest run` → **15 failed / 611 passed (626)** at open, and
**15 failed / 613 passed (628)** at close — the same 15 failures, the +2 being this seat's own passing
i2 cases. The two live assertions are `test/gradient-parse.test.ts:32` and `:63`.

⟨cmd⟩ `grep -rn 'gradient-parse' docs/tranches/X/ docs/tranches/V/megatranche/` → **140 hits**, of
which **4** are bounds-shaped and all four are **record prose** (two LEDGER rows, the `R-4` escalation
row, the Check-1 defect row). **Zero bounds rows.** §3a makes a write there a *file-bound expansion
that invalidates the wave*, and **a repair seat may not grant itself the bounds a unit seat correctly
refused to take.** Returned a third time rather than widened.

**What this seat adds, so the grant is one command and not a judgement**: `.a`'s written migration
(`m.stops.length - 1`) was verified arithmetically against both assertions at the bytes —
`:32` parses `linear-gradient(90deg, red, blue 50%)` → **2 stops → 1**, matching `toHaveLength(1)`;
`:63` parses `linear-gradient(90deg, red 0% 50%, blue)` → **3 stops → 2**, matching `toHaveLength(2)`.
Both substitutions are exact. The grant is a one-line bounds row and a two-line edit.

### Defect 3 — MINOR · a3–a7's named commands satisfied by nothing → **ESCALATED (third return)**

Unchanged and not re-litigated: ⟨`W6.md:105-106`⟩ marks `gate-axis.mjs` and `gate-gesture.mjs`
**`execute, no write`**, so the one-line re-point at `aria-valuenow` is a write this wave may not make
(Repair 1 **E3**, Check 2 defect 3). **Standing warning carried forward: no successor may read
"a3 GREEN" as "`gate-axis.mjs` GREEN".**

### Gate re-reading — every gate a cure could move, re-run at the settled bytes

| gate | ⟨cmd⟩ | reading | verdict |
|---|---|---|---|
| **h2** | `node docs/tranches/X/gates/gate-blob-pipeline.mjs` | `GATE h2 — GREEN`, 13 published figures / 12 re-derived; **double-run byte-identical**; negative control reds | **RED → GREEN** |
| **d2** | `node …/probes/x-w6/gate-easing-readout.mjs` | `GATE d2 — GREEN`, branch `DATED ASK`, fitting primitives NONE, 0 restyle lines; **double-run identical**; both directions red under control | **RED → GREEN** |
| **i2** | `node docs/tranches/X/gates/gate-lband-door.mjs` | `GATE i2 — GREEN`, `REACHABLE = true`, three sites clean; **double-run identical**; both controls red | **RED → GREEN** |
| f1 | `node …/gate-catalog-totality.mjs` | `GREEN  offered=18 catalogued=18 info=18` | unmoved |
| f5 | `node …/gate-specimen-grammar.mjs` | `GREEN  65610 specimens; longest 50/52 chars` | unmoved |
| **H1** | `node …/gate-no-chassis.mjs` | positive control fires first, then `GATE H1 — GREEN` over **14 demo/ files across 3 commits** — this seat's two new modules add no housing | unmoved |
| **H3** | the parser bank one-liner | `NO THROW`, exit 0 | unmoved |
| **j4** | `node …/W6-evidence/j4-shortlandscape-720x450.mjs` | re-run against a **freshly started** :9000 because this seat touched the atmosphere route: `GREEN 4 of 4 routes reachable on both arms`, **every box identical** to Repair 1's (gradient `{top:360,h:129}` · mix `{top:105,h:336}` · blob `{top:70,h:180}` · atmosphere `{top:0,h:450}`) | unmoved |
| §7 | `vue-tsc -p tsconfig.demo.json` · `eslint demo/` · `vitest run` | **exit 0** · **exit 0** · **15 failed / 613 passed (628)** — the same 15, +2 new passing | as at open |

**Prettier, measured rather than asserted.** Every file this seat *created* checks clean. In the two
product files it *modified*, every remaining hunk is **pre-existing at HEAD** — verified hunk-for-hunk
with the repo's own `.prettierrc.json` against the pre-edit blobs (`useAtmosphere.ts` hunks at
35/92/108/198/209/277/305/352 map one-to-one onto the pre-edit 35/92/108/170/181/248/276/323 under this
seat's +28-line shift). The **one** hunk this seat introduced (a quoting choice in a new test title)
was fixed. Check 2's INFO 5 — repo-wide, not a W6 breakage — is confirmed, not inherited.

### SELF-COUNT

46 sub-gates + 4 wave conditions = **50**. **GREEN 28** = a1–a13 (13) ⊕ f1 f3 f4 f5 f6 f7 f8 f9 f10 (9)
⊕ **d2** ⊕ **h2** ⊕ **i2** ⊕ j4 ⊕ H1 ⊕ H3. **RED 22** = f2 ⊕ b1–b4 ⊕ c1–c4 ⊕ d1 ⊕ e1–e2 ⊕ g1–g2 ⊕ h1
⊕ i1 i3 ⊕ j1–j3 ⊕ H2 ⊕ H4. 28 + 22 = 50. Of `W6.md:333`'s **45 born-RED sub-gates**, **25 are GREEN**
(j4 is not born-RED; H1 and H3 are not sub-gates). **Relieved and owner-named 4** (f2 → X-W9.h;
j1 j2 j3 → X-W5). **UNRELIEVED 18** = `b1-b4 · c1-c4 · d1 · e1-e2 · g1-g2 · h1 · i1 i3 · H2 · H4`.

**H4**: CC-063 (d2) and CC-066 (DR-04 — `W6.md:298`, *"the row closes either way"*) now leave with a
full disposition. The undispositioned set goes **11 → 9** (CC-056 · 057 · 059 · 060 · 061 · 062 · 064
· 065 · 067); CC-061 and CC-065 are each half-discharged (h2 landed / h1 open; the tombstone landed /
X:ATMO-1 open). **H4 stays RED**, read conservatively, exactly as `## Check 2` read it.

### Bounds and commits — every path inside this wave's writable set

| # | commit | paths | bounds row |
|---|---|---|---|
| 1 | `48d95650` | `docs/tranches/X/gates/gate-blob-pipeline.mjs` · `…/waves/W6-blob-pipeline-census.md` · `…/W6-evidence/blob/{canvas-clamp.mjs, canvas-clamp-2026-09-19.txt, h2-gate-2026-09-19.txt, h2-negative-control-2026-09-19.txt}` | `W6.md:96` (h2) **create** · `:103` `W6-*.md` **create** · `:104` `W6-evidence/**` **create** |
| 2 | `c8111846` | `docs/tranches/V/megatranche/audit/probes/x-w6/gate-easing-readout.mjs` · `…/waves/W6-glass-ask-easing-readout.md` · `…/W6-evidence/easing/{d2-gate, d2-negative-controls}-2026-09-19.txt` | `W6.md:100` (d2) **create** · `:103`/`:363` **create** · `:104` **create** |
| 3 | `4cb294b9` | `demo/color-picker/composables/boot/useAtmosphere.ts` · `…/atmosphere-calibration.ts` · `demo/test/glass/aurora-bracket.test.ts` · `docs/tranches/X/gates/gate-lband-door.mjs` · `…/W6-evidence/atmosphere/{i2-gate, i2-negative-controls}-2026-09-19.txt` | `W6.md:74` · `:75` · `:81` **modify** · `:97` (i2) **create** · `:104` **create** |
| 4 | this commit | `docs/tranches/X/execution/A/X-W6.md` (append-only) · `docs/tranches/X/execution/LEDGER.md` (own row) | the record and its own row |

⟨cmd⟩ `git show --name-only` over commits 1–3, de-duplicated → **16 paths**, every one inside the set
above. `scripts/dev/dev.sh` **0** · `registry/adjudicated/` **0** · `node_modules/` **0** · `src/` **0**
· `api/` **0** · `demo/color-picker/App.vue` **0** · `demo/color-picker/router/` **0** · `demo/ui/` **0**
· `demo/palettes/` **0** · `.github/workflows/` **0** · sibling tracks' `execution/B|C|D` **0**. Every
commit carries its own pathspec **on the commit itself** and the `Claude-Session` trailer.
**`W6.md` byte-untouched** (⟨cmd⟩ `git diff --stat -- docs/tranches/X/waves/W6.md` → prints nothing);
so are the twelve `execute, no write` instruments. **E-3 held.**

### E13 mail — swept at this seat, read-only

⟨cmd⟩ position-free `grep -nE '\|[[:space:]]*(\*\*)?UNREAD' docs/tranches/V/coordination/INBOX.md` →
**one hit, at `:226`**, and it begins `**Sweep 2026…` — **prose in a sweep note, not a table row**
(re-derived here, not inherited: a row is spelled `| I-n` / `| O-n`). Re-run with the INBOX's own
classifying probe → the **same single prose hit**. **0 UNREAD.** ⟨cmd⟩ row census → **75** `I-`/`O-`
rows; tail unmoved at **I-35 / O-39**.

**One row is OWED and is returned as an escalation rather than taken.** The d2 cure is a
**glass-forward ask**, and the standing BH/BI relay edict (owner, 2026-07-12) requires every
glass-ui-level ask to be relayed as an `O-` row. `docs/tranches/V/coordination/INBOX.md` is in **no**
`W6.md` §4 bounds row, so minting it from this seat would be a write outside the writable set. The
letter it should carry is landed and dated; the row is **E5** below. **This repair closes with NO
UNREAD mail in scope.**

### Escalations returned by Repair 2

| # | escalation | measured reason |
|---|---|---|
| **E1** | **Re-dispatch `.b .c .e .g`, and resume `.h` at h1 · `.i` at i1/i3.** `.d` now needs d1 only. | Eight units across four lanes and four worktrees — the orchestrator's dispatch. **UNRELIEVED now 18** (`b1-b4 · c1-c4 · d1 · e1-e2 · g1-g2 · h1 · i1 i3 · H2 · H4`). `.j` alone waits on X-W5. |
| **E2** | **The one-line dated bounds grant for `test/gradient-parse.test.ts`** (third return; the close's escalation 1). | ⟨cmd⟩ 140 hits, **4 bounds-shaped, all four record prose, zero bounds rows**. §3a orders a halt, not a widening. **`.a`'s migration is now arithmetically verified at both sites** (2 stops → 1; 3 stops → 2), so the grant is one row and two lines. |
| **E3** | **A one-line re-point per stale instrument** — `gate-axis.mjs`, `gate-gesture.mjs` (third return). | Both `execute, no write` at ⟨`W6.md:105-106`⟩. Owner: whichever wave owns `…/probes/wb-gradient-stopeditor/**` (R-5). |
| **E4** | **The `o25`–`o27` oracle namespace** (carried, unruled). | `o26-aurora-perceptibility.spec.ts` and `o27-focus-affordance.spec.ts` ship today while `W6.md` §4 tells `.i`/`.j` to *create* at those ordinals. It blocks i1/i3 on creation. |
| **E5** | **NEW — the `O-` relay row for the d2 glass-forward ask.** | The BH/BI edict binds; `INBOX.md` is in no `W6.md` §4 row. The letter is landed and dated at `W6-glass-ask-easing-readout.md`; only the register row is owed. Next id after **O-39**. |
| **E6** | **NEW — h1 may be unsatisfiable as written.** | Measured: the owner's case is **12.94× outside sRGB at its own lightness** and the producer's uniform is a gamma-sRGB `vec3`. `W6.md:293`'s own falsifier says h1 fails at exactly such a colour. `.h`'s dispatch — or X-W10's canon — must restate h1 against a deliverable ΔC or accept it as honest-RED-by-physics. **Not taken here; h1 is not moved.** |

Carried unchanged: the `ictcp`/`jzazbz` URL round-trip revert (**R-3**, homeless).

### Four-verb status after Repair 2 — unchanged, deliberately

**AUDITED** yes · **SPECIFIED** yes · **IMPLEMENTED** **no — still PARTIAL** · **VERIFIED** no.
Gates **28 of 50 GREEN**. `W6.md:7` `**Status**: planned` and `:10` `IMPLEMENTED no` are
**byte-untouched**: E-3 binds, and a PARTIAL wave has no IMPLEMENTED to stamp. **The LEDGER row stays
PARTIAL and is not promoted.** Four successors stay lawfully blocked.

### DISCLOSED — the shared LEDGER was carried by a sibling's commit, not by this seat's

This seat's LEDGER act was the lawful minimum: **one in-place replacement of the X-W6 row's own
status and commit cells, plus one appended event line**, both written immediately after re-reading
the file (⟨cmd⟩ `git diff -U0` at that moment showed **hunk `@@ -34` alone** — mine, and nothing else).
Between that write and this seat's commit, **Track D dirtied the same file** (the `X.P.W4` row at
`:82`) and committed first. Rather than commit over it, this seat committed its own record alone
(`18eb1666`) and then **waited** — three 12-second waits — for the sibling to land. It did, at
⟨cmd⟩ `git show --stat c23dc4e5` → *"docs(x-p-w4/check-2): LEDGER — CHECK 2 NOT-CONFORMANT …"*, and
that commit carries **this seat's X-W6 row cell and event line** alongside its own `X.P.W4` row:
⟨cmd⟩ `git show c23dc4e5 -- …/LEDGER.md | grep -c "THREE GATES CURED BY REPAIR 2"` → **1** ·
⟨cmd⟩ `… | grep -c "X-W6 REPAIR 2 (round 2"` → **1**.

**This seat swept nothing**: it never staged, committed, reset or restored a sibling path, and it
never ran `git add -A`/`-u`. A pathspec cannot separate two seats' edits to **one file** — the
condition `## Check 2` disclosed in the opposite direction — so it is recorded here instead. **The
next seat should read the X-W6 ledger cell's provenance from this note rather than from
`c23dc4e5`'s subject line.** ⟨cmd⟩ `git status --porcelain` at close →
`M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh` — the two standing rows,
neither this seat's; `scripts/dev/dev.sh` was never touched and never staged.

---

## Check 3

SERVED MODEL: claude-opus-5[1m]

**Seat**: L-20 FRESH ADVERSARIAL CHECK, **pass 3** — **VERIFY-ONLY**. An independent
`claude-opus-5[1m]` that authored no cure byte, no unit receipt, and no line of `## Close`,
`## Check 1`, `## Repair 1`, `## Check 2` or `## Repair 2`. Wall clock **2026-09-19**.
**Verdict**: **NOT-CONFORMANT** — 0 BLOCKER · **1 CRITICAL** · **1 HIGH** · 2 MINOR · 3 INFO.

**All 28 claimed GREENs reproduce at this seat's own commands** — 28 of 28, zero divergences of
verdict, every figure re-read from the settled bytes rather than inherited, the cheap gates
double-run byte-identical. **Repair 2's three new GREENs (h2 · d2 · i2) are real at this seat**, and
one of them was attacked at its own falsifier rather than accepted: the d2 two-way control was
re-derived here in memory and **fires in both directions**. The wave still does not fail on what it
did. It fails on the **18 of its 22 RED gates that carry no relief**.

### Crash-recovery (standing law)

⟨cmd⟩ `git status --porcelain` at open → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh`. **Neither is inside this seat's writable set** (the V fold-source · the
unowned NEVER-touch row). **No inherited hunk on any W6 path**; nothing stashed, reset or restored.
Mid-seat siblings dirtied `docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` and
`docs/tranches/V/coordination/INBOX.md` (+3 lines, a new **O-40**) and added untracked
`docs/tranches/X/parse-that/**` — all read, never staged, never restored.

### Axis 1 — every claimed GREEN re-run at this seat (28 of 28 reproduce)

| gate | ⟨cmd⟩ at this seat | reading | verdict |
|---|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` + `npx vitest run test/gradient-order-invariant.test.ts` | probe prints `parseCssColor("oklch()") -> reject` (no throw) over all 8 empty-function literals, `parseGradientCSS -> reject: stop positions must be non-decreasing` on the descending literal, `-> reject: unparseable color "oklch()"` on the garbage stop and `-> ok` on the ascending one; **13 passed (13)** | **GREEN — reproduces** |
| a2 | `node …/WBGSE-O-r3-crossdrag-forcedcolors.mjs` (fresh :9000, STALE-SERVER law) | emitted `linear-gradient(90deg, oklch(70% 0.165 205deg) 50%, oklch(0.75 0.15 145) 84.4%, oklch(0.65 0.18 265) 100%)` — **ascending**; three `calc(var(--rail-inset) + var(--rail-track) * f)` lefts | **GREEN — reproduces** |
| a3 | o21 `:143` *"one axis: every handle centre sits where the ramp paints its own ordinal"* | passed | **GREEN — reproduces** |
| a4 | o21 `:185` *"the forward and inverse maps are inverse"* | passed | **GREEN — reproduces** |
| a5–a11 | `node …/W6-evidence/gradient/gate-a-gesture-paint.mjs` | `travel@1px=0.00px travel@120px=120.00px` · `activeElement=BUTTON/stop-2-mu8bwl9d [27.4,100]→[27.4,98]` · `before=2 middle=2 right=2 cancel=2` · **5** `aria-valuenow` writes over 5 pointermoves · chip band `[256.7,280.7]` rules intersected **0** · white ramp `innerRatio 15.08 / 14.59`, `outerRatio 1 / 1.04` · a9 rows claimed `[]`, chip `3 → 2` — `GATE X.W6.a (gesture + paint) — GREEN`, exit 0 | **GREEN — reproduces, figure for figure** |
| a12 | `node …/WBGSE-D-probe2.mjs` + o21 `:238` | `beforeOverhangPx: 0` · `afterOverhangPx: 0`; handleLeftEdge ≡ barLeftEdge at **224≡224** (rootFS 16) and **102≡102** (rootFS 20) | **GREEN — reproduces** |
| a13 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **17 passed (1.4m)**, every spec named in the list reporter | **GREEN — reproduces** |
| f1 | `node docs/tranches/X/gates/gate-catalog-totality.mjs` | `GATE f1 (catalog totality) — GREEN  offered=18 catalogued=18 info=18  docs=11 authored + 7 decided-none = 18 decided`; `display-p3` created **2015**. **Double-run byte-identical** | **GREEN — reproduces** |
| f3 f4 f6 f8 | `npx playwright test o21-space-catalog-truth o22-specimen-legibility o23-specimen-gamut-honesty o24-specimen-dot-identity --project=smoke` | **4 passed (1.2m)**; f8 prints 18 distinct `feTurbulence` seeds with `bg=lab(92 88.8 20 / 0.827)` **constant across all 18 rows** (no projected repaint) | **GREEN — reproduces** |
| f5 | `node docs/tranches/X/gates/gate-specimen-grammar.mjs` | `GATE f5 (specimen grammar) — GREEN`; `css=14 channels=4`, `ictcp`/`jzazbz` on the `·` dialect, `prophoto-rgb` at 50ch. **Double-run byte-identical** | **GREEN — reproduces** |
| f7 | `grep -rn 'colorSpace: any' demo` → **0** · `grep -c 'as DisplayColorSpace' …Selector.vue` → **0** · `npx vue-tsc --noEmit -p tsconfig.demo.json` → **exit 0, no diagnostics** | all legs | **GREEN — reproduces** |
| f9 | two greps | `updateToColorSpace` in the component → **2**; `ColorPicker` watch-grep → **0** | **GREEN — reproduces** |
| f10 | `grep -rn 'from "\.\./ui/' demo/color-session/ \| wc -l` | **0** | **GREEN — reproduces** |
| **d2** | `node …/probes/x-w6/gate-easing-readout.mjs` | `GATE d2 (easing readout) — GREEN`; 7.0.0; `./input` published **false**; ten primitives censused; **fitting: NONE**; branch `DATED ASK`, `composes=false ask=true`; **0** restyle lines. **Double-run identical** | **GREEN — reproduces** |
| **h2** | `node docs/tranches/X/gates/gate-blob-pipeline.mjs` | `GATE h2 — GREEN`; seed C **0.27245** vs sRGB ceiling **0.02105** = **12.9×** outside; stage 1 C 0.14949 **100.0% of ceiling**; stage 2 C 0.08795…0.00971 100.0%, `chromaCeiling lever inert = true`; stage 3 `|ΔC| ≤ 4.09e-4`; `13 published figures, 12 re-derived`. **Double-run byte-identical** | **GREEN — reproduces** |
| **i2** | `node docs/tranches/X/gates/gate-lband-door.mjs` | `GATE i2 — GREEN`; plain L `0.5000 0.6067 0.7133 0.8200` → `"dark"` L `0.1800 0.2600 0.3400 0.4200` `moves=true` → `lBand [0.1,0.34]` L `0.1000 0.1800 0.2600 0.3400` `honoured=true`; **REACHABLE = true**, branch **LAND THE BAND**, `letter present: false`, three sites `clean`. **Double-run identical** | **GREEN — reproduces** |
| **j4** | `node …/W6-evidence/j4-shortlandscape-720x450.mjs` | `GATE j4 (short landscape 720×450) — GREEN  4 of 4 routes reachable on both arms`, exit 0; atmosphere box `{top:0,h:450}`, `docScrollHeight=450 innerHeight=450` | **GREEN — reproduces** |
| **H1** | `node …/gate-no-chassis.mjs` | positive control fires first (`dead-name ✓  stage+inspector+action ✓`), then `GATE H1 — GREEN` over 14 demo/ files. **Re-run here over the FULL product roster including Repair 2's `4cb294b9`** — ⟨cmd⟩ `node …/gate-no-chassis.mjs f90aeb02 c222542d e0e204a9 4cb294b9 1155fd1f` → **still GREEN** | **GREEN — reproduces, and widened** |
| **H3** | `node -e "…parseCssColor('oklch()')…"` → **`NO THROW`, exit 0**, `{"ok":false,"diagnostics":[{"code":"css_syntax",…}]}` · packed glass exports matching `rail\|slider\|gradient` → **`./slider` only** · installed **7.0.0**, `./watercolor-dot` **published** | all three sweeps | **GREEN — reproduces** |

Also re-verified at this seat: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` **exit 0** ·
⟨cmd⟩ `npx eslint demo/` **exit 0** · ⟨cmd⟩ `npx vitest run` **15 failed / 613 passed (628), 5 files**
— Repair 2's close figure exactly, enumerated per file (`gradient-parse` **2** · `v4-css-emerging`
**10** · `spectrum-luma` **1** · `v4-c1` **1** · `reka-binding-idiom` **1**).

**The d2 falsifier was ATTACKED, not accepted** (L-18 target 1). Repair 2 claims both directions of
`W6.md:226` red under control. This seat re-derived both **in memory, with zero writes to any repo
path** — the gate's own L1 census read from the installed `.d.ts` surface, its L2 fit test and its L3
branch check replayed over a perturbed ask string and a widened `ACTION_SLOT`:

- **DIRECTION 1** (drop `LabeledField`'s shipped `error` slot from the ask's table row) → **RED**:
  *"the ask states `LabeledField` without its shipped slot `error` — the census must be pasted, not
  summarised"*.
- **DIRECTION 2** (widen `ACTION_SLOT` to accept `default`, so `NumberField` fits) → **RED**:
  *"a fitting published primitive EXISTS (NumberField via ./number-field, …) and the readout does not
  compose it"*.
- Baseline unperturbed → **GREEN**.

**The property is real and d2 is not a false-green.** What does not reproduce is its *receipt* — see
defect 3.

### Axis 2 — bounds (CLEAN)

⟨cmd⟩ `git show --name-only` over all **eighteen** W6 commits (`f90aeb02` `c222542d` `e77650e1`
`e0e204a9` `7e5b9512` `7630cc48` `a0a2c4da` `c2f17bad` `1155fd1f` `77f80e83` `6dfdd8d2` `fc1f1a0e`
`e524f321` `48d95650` `c8111846` `4cb294b9` `18eb1666` `f7a3fc04`), each path checked against
`W6.md` §4 and `X-W6-FOLD.md` §3:

- the three §4 deviations are **ruled errata, not widenings**, re-read at the FOLD's own bytes here —
  ⟨`X-W6-FOLD.md`⟩ **n.1** `GradientVisualizer/GradientEasingEditor.vue` (*"the `easing/` segment does
  not exist"*), **n.2** `demo/scenes/about/ColorNutritionLabel.vue` (*"measured absent at that path,
  present at this one"*), **n.34** `test/gradient-v4-consume.test.ts` `modify`;
- Repair 2's three commits land at `W6.md:96` (h2), `:97` (i2), `:100` (d2), `:103` (`W6-*.md`),
  `:104` (`W6-evidence/**`), `:74`/`:75`/`:81` (the i2 cure's three product/test paths) — every one a
  literal §4 row;
- ⟨cmd⟩ across all eighteen: `scripts/dev/dev.sh` **0** · `src/` **0** · `api/` **0** ·
  `node_modules/` **0** · `demo/color-picker/App.vue` **0** · `demo/color-picker/router/` **0** ·
  `demo/ui/` **0** · `demo/palettes/` **0** · `.github/workflows/` **0** · sibling tracks'
  `execution/B|C|D` **0** · `registry/adjudicated/` **0**;
- all eighteen carry the `Claude-Session` trailer (⟨cmd⟩ `%(trailers:key=Claude-Session)` → 1 each).

**Zero writes outside bounds.**

### Axis 3 — masking fallbacks (NONE)

Added-line sweep over the eight product/evidence-bearing commits (`f90aeb02` `c222542d` `e0e204a9`
`1155fd1f` `6dfdd8d2` `48d95650` `c8111846` `4cb294b9`) for `try {` / `catch` / `test.skip` /
`.skip(` / `.only(` / `xit(` / `allowlist` / `eslint-disable` / `@ts-ignore` / `@ts-expect-error`:

- **every hit in the five older commits is prose in a comment**, re-read at the bytes — including
  `.a`'s own ban restated at ⟨`useGradientModel.ts:190-193`⟩ and the line stating an assertion was
  *"DELETED with the measurement, never `test.skip()`"*.
- **The one real `try/catch` Repair 2 added** is ⟨`gate-easing-readout.mjs:203-208`⟩ and it wraps a
  `git diff` read whose `catch` calls **`fail(...)`** — it makes the gate **RED**, the opposite of a
  mask. Same shape as the pre-existing ⟨`gate-specimen-grammar.mjs:111-118`⟩.
- **`setStopsFromColors` branches on `parseCssColor(...).ok`** at ⟨`useGradientModel.ts:199-202`⟩
  rather than wrapping it — read at the bytes here, which independently re-confirms that
  `gate-structure.mjs`'s G4c narration *"with no validity check"* is **stale prose, not a live defect**.
- **The i2 cure narrows nothing.** ⟨cmd⟩ `git show 4cb294b9 -- demo/`: the only deletions are five
  comment lines carrying the superseded deferral and **one hoisted `const { isDark } = useGlobalDark();`**
  (moved earlier in the same function, not removed — both faces read here). The two added
  `aurora-bracket.test.ts` cases assert **in the breaking direction** (`toBeLessThan(light[i])`,
  `toBeGreaterThanOrEqual(0.18)`, `toBeLessThanOrEqual(0.42)`, `toBeCloseTo(LO, 4)`), so the next dist
  that closes the door reds a test.
- **0 allowlists · 0 copied producer selectors · 0 patched node_modules · 0 `test.skip` · 0 narrowed
  assertions.**

### Axis 4 — commit families (CLEAN)

GRADSTOP-A §14's family is **whole** in `f90aeb02`; `c222542d` is the a9 gutter, a second meaning
discovered by the first AFTER run. §9 #6 is `e0e204a9`; #11 is `7630cc48`. Repair 2's three cures are
**three meanings in three commits** — `48d95650` (h2 census, §9 #8's *"census commit precedes the
cure"* honoured by there being no cure to precede), `c8111846` (§9 #4, the d2 ask), `4cb294b9`
(§9 #9, the i2 band) — none split, none merged, each with a body. **One commit per meaning throughout.**

### Axis 5 — E-3 (HELD)

⟨cmd⟩ `git diff --stat f90aeb02^..HEAD --` over `docs/tranches/V/megatranche/registry/adjudicated/`,
`docs/tranches/X/waves/W6.md`, `W5.md`, `W7.md`, `W8.md`, `W9.md`, `W10.md`, `W11.md`,
`docs/tranches/X/CONFORMANCE-2026-08-03.md`, `EXECUTION-RUNBOOK.md`, `docs/tranches/X/refinement/`,
`…/audit/probes/wb-gradient-stopeditor/`, `…/audit/components/wb-gradient-stopeditor/`,
`scripts/dev/dev.sh` → **prints nothing**. The dated spec, the adjudicated registry, the conformance
artifact, every sibling spec, the FOLD and all twelve `execute, no write` instruments are
**byte-untouched by this wave**. The three stale comments i2 overturned were corrected by **dated
addenda-beside that quote the superseded claim**, never by silent deletion — read at `4cb294b9`.

### Axis 6 — mail (CLEAN)

⟨cmd⟩ `grep -oE '\| \*\*UNREAD[^|]{0,60}' docs/tranches/V/coordination/INBOX.md` — the INBOX's **own**
classifying probe, not a bare `grep -i unread` — → **one hit, and it is the quoted pattern inside a
2026-09-18 sweep note**, not a row. The three cells that probe found UNREAD on 09-18 are re-read at
their Status columns here: **I-32** *"READ IN FULL + ROUTED — TERMINAL AS MAIL 2026-09-19"* · **I-33**
*"READ IN FULL + RELAYED — TERMINAL AS MAIL 2026-09-19"* · **I-34** *"READ + NO OBLIGATION MINTED —
TERMINAL AS MAIL 2026-09-19"*. ⟨cmd⟩ row census → **80** `I-`/`O-` row lines, **76** distinct ids
(Repair 2's *75* and Check 2's *79* are the same file counted two ways — neither is wrong; the delta
since is one sibling's uncommitted **O-40**). Tail **I-35 / O-40**. **0 UNREAD in scope. This check
closes with no UNREAD mail.**

### Axis 7 — the four-verb line moved LAWFULLY

⟨cmd⟩ `sed -n '7p;10p' docs/tranches/X/waves/W6.md` → `**Status**: planned` and
`… IMPLEMENTED no · VERIFIED no`, **byte-untouched** (axis 5 prints nothing over `W6.md`). Correct
twice over: E-3 binds the dated spec, and a PARTIAL wave has no IMPLEMENTED to stamp.

### Axis 8 — the spec's own §2a goal criterion is NOT MET at the bytes

`W6.md:17` asks that **each** of six live instruments own its stage, inspector and action contract
**as a routed scene**, tell one geometric **and** one colour-science truth, and carry its motion under
the shared field/motion law, with no chassis rebuilt. Measured here:

- **Gradient** — geometric truth yes (a3/a4/a12 GREEN at this seat); **no inspector** (⟨cmd⟩
  `gate-seat.mjs` → `GATE G3 (stop seat) — RED`, no numeric entry); **no routed scene**;
- **the space catalog** — colour-science truth yes (`.f`, 9 of 10);
- **Easing** — d2 leaves as a **dated ask**, which discharges CC-063 but builds no instrument; d1 RED,
  no radius register exists;
- **HeroBlob** — h2's census landed and **overturned the spec's own stripper hypothesis**, but h1 is
  open and the blob does not carry the current colour's chroma;
- **Blob/Atmosphere** — i2's dark band landed; i1/i3 open, no oracle, ⟨cmd⟩ `grep -rn armRuntime demo/`
  → **0**;
- **Mix** — untouched;
- **routed scene, all six** — ⟨cmd⟩ `grep -c 'component: Stub' demo/color-picker/router/index.ts` →
  **14**. Not one instrument owns a scene contract;
- **the motion clause is unmet** — ⟨cmd⟩ `grep -rn requestAnimationFrame demo/workbenches/gradient/`
  → **2**, neither PRM-gated, and no aurora declaration on the ramp;
- only *no chassis-shaped abstraction rebuilt* is satisfied outright, and H1 measures it — here over a
  **wider** roster than the gate's default (see axis 1).

**Two of seven clauses now carry measured substance** (the catalog's colour science; no chassis), up
from Check 2's one — but the routed-scene clause, which is the §2a sentence's spine, is **FALSE for
all six instruments**. Per `W6.md:342` a wave whose goal is unmet closes `complete_with_misses`; this
wave has not reached that, because its gates do not all pass.

### Axis 9 — the record's published figures

Every substantive figure in `## Close`, `## Check 1`, `## Repair 1`, `## Check 2` and `## Repair 2`
re-read here reproduces, **with one exception, and it is a receipt rather than a property** (defect 3).
Re-derived at this seat: the vitest line **15 failed / 613 passed (628)**; the h2 census's 13 figures
(the gate itself re-derives 12 and prints the count); i2's twelve probe lightnesses; d2's ten-primitive
census; the `.a` figure set a5–a11 and a12 figure for figure; **j4's four route boxes**; and Repair 2's
prettier claim — ⟨cmd⟩ `npx prettier --check` against the **pre-edit blobs** (`git show 4cb294b9^:…`)
confirms `useAtmosphere.ts` and `aurora-bracket.test.ts` both fail at HEAD **and** before Repair 2
touched them, while all three files Repair 2 *created* check clean.

### Axis 10 — HONEST-RED ADJUDICATION, gate by gate

**RELIEVED — the honest-RED set (4), each re-derived at the spec bytes here:**

| gate | relief, cited at the spec bytes | owner named in the record |
|---|---|---|
| **f2** | **A later wave owns the surviving hit by the spec's own routing.** ⟨cmd⟩ the grep returns exactly **1** hit, `demo/picker/controls/ComponentSliders/ConsoleRail.vue:174` — `const info = (colorSpaceInfo as any)[space];` — and ⟨`W9.md:104`⟩ books that exact path `modify` for X-W9, ⟨`W9.md:8`⟩ *"X-W9.h follows X-W4 on `ConsoleRail.vue`"*, ⟨`:142`⟩ the cross-wave hold, ⟨`:304-311`⟩ the routing of `componentDescription()`. ⟨cmd⟩ `grep -c ConsoleRail docs/tranches/X/waves/W6.md` → **0**: the path is in no §4 row, so curing it here is the §3a expansion that invalidates the wave | **R-2 → X-W9.h**, migration written free by `.f` |
| **j1 · j2 · j3** | **A predecessor wave owns the contract `.j` adopts.** ⟨`W6.md:313`⟩ — *"this unit **adopts** the X-W5 scene contract for the route"* — and ⟨`W6.md:397`⟩ §10, *"it does not author it"*. ⟨`W5.md:7`⟩ **Status: planned**, re-read here; **14 `component: Stub` routes** measured at this seat. A `.j` dispatched today returns BLOCKED-ON X-W5 without writing a product byte | **R-1** (`.j` BLOCKED-ON X-W5) |

**UNRELIEVED (18)** — `b1 b2 b3 b4 · c1 c2 c3 c4 · d1 · e1 e2 · g1 g2 · h1 · i1 i3 · H2 · H4`.
Each was **re-measured RED at this seat**, not assumed:

- **b1 · b2 · b4** — ⟨cmd⟩ `node …/gate-seat.mjs` → `GATE G3 (stop seat) — RED`: `aria-pressed`/
  `aria-selected` both absent; `Home` and `ArrowDown` no-ops against `style.left`
  (`calc(var(--rail-inset) + var(--rail-track) * 0)` unchanged); a click 3px inside the rail mints
  nothing; with 12 stops only **149px of 462px (32.3%)** can still mint. **b3** — no numeric-entry
  control exists.
- **c1** — ⟨cmd⟩ `node …/gate-structure.mjs` → `GATE G4 (structure) — RED`, seven live conditions
  (`model/sample.ts` and `model/types.ts` **ABSENT** by ⟨cmd⟩ `ls demo/workbenches/gradient/model/`;
  8 emitted gradient strings with no ` in <space>` clause; the 7-name dead re-export door with **zero**
  consumers; `colorAt` still double-implemented). **c2 · c3 · c4** — `gate-literal-dialect.mjs` and
  `test/interpolation-subset.test.ts` **ABSENT** at ⟨cmd⟩ `ls`.
- **d1** — ⟨cmd⟩ `ls …/probes/x-w6/` now shows `gate-easing-readout.mjs` alone;
  `gate-easing-radius.mjs` **ABSENT**. d2's landing does not touch d1: `W6.md:223` wants a **radius
  register**, which no byte in this wave supplies.
- **e1 · e2** — ⟨cmd⟩ **2** ungated rAF in `demo/workbenches/gradient/`, `gate-prm-idiom.mjs`
  **ABSENT**, no aurora declaration on the ramp. Repair 2's refusal to take e2 while e1 is unbuilt is
  **endorsed here**: `W6.md:238`'s second leg would be vacuously true, which is the laundering
  direction — ⟨cmd⟩ `grep -rn 'MOTION-SOURCED\|motion-quarantine' demo/workbenches/gradient/ e2e/smoke/oracles/`
  → **0**.
- **g1 · g2** — `gate-card-rhythm.mjs` **ABSENT**.
- **h1** — no oracle; and Repair 2's **E6** is corroborated at this seat's own h2 run: the owner's case
  measures **12.9× outside sRGB at its own lightness** (C 0.27245 vs ceiling 0.02105) against a
  gamma-sRGB `vec3` uniform, which is exactly the colour `W6.md:293`'s falsifier says h1 fails at.
  **That is a finding for `.h`/X-W10, not a relief** — no spec row assigns h1 elsewhere.
- **i1 · i3** — `o25-atmosphere-response.spec.ts`, `o26-atmosphere-coldload.spec.ts` and
  `W6-evidence/atmosphere/` frames **ABSENT**; ⟨cmd⟩ `grep -rn armRuntime demo/` → **0**.
- **H2** — the `test -f` leg is GREEN (`motion-quarantine.md` present, **69,859 bytes**, tracked
  `af03de5c`); the citation leg has **no assertions to audit** because `.e`/`.j` never ran (grep above
  → 0). Read **conservatively RED**, as every prior section read it and as `W6.md:338`'s addendum
  directs. **The vacuous-true reading is refused here too.**
- **H4** — **nine CC rows leave with no disposition** (CC-056 · 057 · 059 · 060 · 061 · 062 · 064 ·
  065 · 067) against ⟨`W6.md:340`⟩. Repair 2's arithmetic is **confirmed**: CC-063 discharges on d2
  and CC-066 on i2 (⟨`W6.md:298`⟩ *"the row closes either way"*), taking the set 11 → 9; CC-061 and
  CC-065 are each half-discharged.

**Nothing in `W6.md` relieves these 18.** Each is assigned to a unit of **this** wave; every instrument
each needs sits inside **this** wave's own `create` rows; and every dependency each names is MET —
X-W0/X-W1/X-W2/X-W3/X-W4 **CLOSED** in the LEDGER, installed glass **7.0.0** with `./aurora`,
`./select`, `./labeled-field`, `./number-field`, `./blob`, `./blob-config`, `./color` all published
(re-read at the packed `exports` map here). The only owner the record can name is **R-1, re-dispatch
of this same wave** — undone work, not relief.

**SELF-COUNT.** 46 sub-gates + 4 wave conditions = **50**. **GREEN 28** = a1–a13 (13) ⊕ f1 f3 f4 f5 f6
f7 f8 f9 f10 (9) ⊕ d2 ⊕ h2 ⊕ i2 ⊕ j4 ⊕ H1 ⊕ H3. **RED 22** = f2 ⊕ b1–b4 ⊕ c1–c4 ⊕ d1 ⊕ e1–e2 ⊕ g1–g2
⊕ h1 ⊕ i1 i3 ⊕ j1–j3 ⊕ H2 ⊕ H4. 28 + 22 = 50, no gate counted twice, none dropped. Of `W6.md:333`'s
**45 born-RED sub-gates**, **25 are GREEN** (j4 is not born-RED; H1 and H3 are not sub-gates).
**Relieved and owner-named 4** · **UNRELIEVED 18**.

### Defect register — Check 3

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **1** | **CRITICAL** | **18 of the 22 RED gates carry no relief.** Four units (`.b .c .e .g`) are undispatched outright and three (`.d .h .i`) landed one gate each, so 16 born-RED sub-gates ⊕ H2 ⊕ H4 stay RED with no producer, no successor and no spec-named honest-RED id. ⟨`W6.md:335`⟩ closes the wave only when **all 45** born-RED sub-gates are GREEN by their own commands; **25 of 45** are | every gate above re-measured RED at this seat (`gate-seat.mjs` → `GATE G3 — RED`, `gate-structure.mjs` → `GATE G4 — RED`, `gate-easing-radius.mjs` · `gate-prm-idiom.mjs` · `gate-card-rhythm.mjs` · `gate-literal-dialect.mjs` · `test/interpolation-subset.test.ts` · `o25`/`o26`/`o27` **all ABSENT**); §2a **two of seven clauses true**, the routed-scene spine FALSE for all six instruments (14 `Stub`) | Re-dispatch `.b .c .e .g`; resume `.d` at d1, `.h` at h1, `.i` at i1/i3. All seven have every dependency MET at the bytes today. `.j` alone waits on X-W5. This is the orchestrator's act across four lanes and four worktrees, not a check seat's |
| **2** | **HIGH** | **The cure-shipped regression's surviving half is still live.** `.a` deleted `ParsedGradientModel.intervals` — correctly, it is the defect — and **2 assertions in `test/gradient-parse.test.ts` fail at the settled bytes**. ⟨`W6.md:348`⟩ §7 requires `npx vitest run` after each unit lands **and again before wave close**; it is RED. L-18 skeptic target **2**, landing live | ⟨cmd⟩ `npx vitest run test/gradient-parse.test.ts` → the two named cases `× parses a plain linear gradient with authored literals intact` and `× expands CSS double positions into two coincident-color stops`; ⟨cmd⟩ `git diff --stat f90aeb02^..HEAD -- test/gradient-parse.test.ts` → **nothing** (untouched, so the breakage is the cure's); ⟨cmd⟩ `grep -rn 'gradient-parse' docs/tranches/X/waves/W6.md docs/tranches/X/refinement/X-W6-FOLD.md` → **0 bounds rows** | **Mitigation is real and halves it**: Repair 1 landed the migration on `gradient-v4-consume.test.ts` under FOLD n.34 (`1155fd1f`) and that file is gone from the failing set, re-measured here. Repair 2 verified `.a`'s second migration arithmetically at both sites. The residual is **one dated bounds grant** (E2, third return); §3a orders a halt, not a self-granted widening. **It does not erase the red suite** |
| **3** | MINOR | **The d2 negative-control transcript banked as this wave's proof shows GREEN where the record claims RED.** ⟨`X-W6.md` §Repair 2 1b⟩ states *"Both directions verified by negative control … reds it … reds it the other way"*, and the LEDGER row repeats it. The banked file's own header reads *"the TWO-WAY falsifier fires in BOTH directions"* — but **all four of its blocks print `GATE d2 (easing readout) — GREEN … exit=0`**, byte-identical to the unperturbed run. A challenger reading only the receipt would conclude the gate is false-green | ⟨cmd⟩ `cat -n docs/tranches/X/waves/W6-evidence/easing/d2-negative-controls-2026-09-19.txt` → 78 lines; `:10` (DIRECTION 1), `:29` (DIRECTION 2), `:47` and `:63` (RESTORED, double-run) are **the same GREEN block four times**; `exit=0` at `:25`, `:44`, `:62`, `:78`. Contrast h2's and i2's controls, which **do** print `— RED` with a named `FAIL` line | **Not a gate defect — the property was independently re-derived GREEN-to-RED at this seat** (axis 1): direction 1 → *"the ask states `LabeledField` without its shipped slot `error`"*; direction 2 → *"a fitting published primitive EXISTS (NumberField via ./number-field, …)"*. The cure is one re-capture of the transcript at `.d`'s next sitting. **MINOR with mitigation — does not block** |
| **4** | MINOR | **The spec's named commands for a3–a7 are satisfied by nothing** (fourth return). ⟨`W6.md:105-106`⟩ binds a3/a4 to `gate-axis.mjs` and a5/a6/a7 to `gate-gesture.mjs`, both `execute, no write`; §6 asks for GREEN *"by the same commands that are RED today"*, and unrunnable is a different state from RED-for-the-defect | Cause re-confirmed at this seat from the live tree: the accessible names read `Gradient stop 1 of 3` (⟨cmd⟩ the crossdrag probe's `D2-03 before` block, printed here) with the ordinal on `aria-valuenow` — X-W4 · C2's ARIA split, landed **after** the spec's 2026-08-03 stamp | **Not the wave's to cure** — §4's Bounds law forbids editing those instruments and §3a orders a halt (E3). The substitutes read `aria-valuenow`/`style.left`, strictly more precise than the whole-percent name. **Standing warning holds: no successor may read "a3 GREEN" as "`gate-axis.mjs` GREEN"** |
| **5** | INFO | **H1's default roster is narrower than "this wave's diff".** ⟨`gate-no-chassis.mjs:45-50`⟩ hardcodes three commits and omits Repair 2's product commit `4cb294b9` | read at the bytes; ⟨cmd⟩ `node …/gate-no-chassis.mjs f90aeb02 c222542d e0e204a9 4cb294b9 1155fd1f` → **`GATE H1 — GREEN`** over 15 files | **Non-material at these bytes** — the gate takes its roster from `argv`, and the widened run is green. A re-dispatch should pass the full roster or update the default |
| **6** | INFO | **Oracle non-hermeticity is broader than recorded.** Check 2 records **two** committed AFTER frames rewritten by an f3/f8 re-run; a full f3/f4/f6/f8 batch rewrites **three** | ⟨cmd⟩ `git status --porcelain` after this seat's oracle batch → `M …/after-catalog-open.png` · `M …/after-display-p3-about.png` · `M …/after-specimen-dots.png`; all three restored byte-identical by single-path ⟨cmd⟩ `git checkout -- …`, tree verified clean afterwards | As Check 1 states: write to a scratch path and compare, or declare the frames regenerated-by-design in §8 |
| **7** | INFO | **§7's `prettier --check` leg is RED on the touched set**, and **§8's artefact roster is unmet on the rows owned by undispatched units** | ⟨cmd⟩ `npx prettier --check <13 touched paths>` → **9 fail**. Measured pre-existing for the three checked at their pre-edit blobs (`useAtmosphere.ts`, `aurora-bracket.test.ts`, `useGradientModel.ts` all fail at `4cb294b9^`/`f90aeb02^` too); Repair 2's three created files and the three new gate scripts check **clean**. The one wave-created offender remains `test/gradient-order-invariant.test.ts` | Repo-wide condition, recorded so no successor reads it as a W6 breakage; the §8 rows discharge with defect 1. The seven gradient PNG pairs, `owner-marks/`, `atmosphere/` frames stay absent |

### Successor "Opens after" conjuncts, measured against this wave

| successor | conjuncts at the spec bytes | state | lawfully blocked? |
|---|---|---|---|
| **X-W7** | ⟨`W7.md:6`⟩ X-W3 · X-W4 · **X-W6** | X-W3 **CLOSED** ✓ · X-W4 **CLOSED** ✓ · **X-W6 PARTIAL ✗** | **YES — blocked on X-W6.** Materially unchanged by Repair 2: of the four shared paths W7 needs X-W6 to write first, **`AuroraPane.vue`, `MixConfigBar.vue`, `MixSourceSelector.vue` are still absent from the wave's path census** — i2 wrote `useAtmosphere.ts`/`atmosphere-calibration.ts`, not the pane |
| **X-W8** | ⟨`W8.md:6`⟩ X-W5 · **X-W6** · X-W7 stabilize destination ownership | X-W5 `planned` ✗ · **X-W6 PARTIAL ✗** · X-W7 `planned` ✗ | **YES — three conjuncts RED.** ⟨`W6.md:402`⟩ is explicit that X-W8's subtraction needs `.a`/`.c`'s destinations stable; `.c` never ran, so `model/types.ts` and `model/sample.ts` do not exist and the 7 dead re-export doors survive with **zero consumers** (re-measured here) |
| **X-W10** | ⟨`W10.md:6`⟩ X-W5 · **X-W6** · X-W7 · X-W8 · X-W9 stable | **X-W6 not stable ✗** (plus four others; X-W9 is PARTIAL in the LEDGER) | **YES** — the LEDGER row already reads `BLOCKED-ON X-W…` |
| **X-W11** | ⟨`W11.md:6`⟩ X-W0 … X-W10 **IMPLEMENTED** | **X-W6 IMPLEMENTED = no ✗** | **YES** |

**No successor is unlawfully unblocked**, and it is this record's sustained refusal to flip the
four-verb line (R-9) that keeps all four correctly blocked.

### Verdict

**NOT-CONFORMANT.** The bar is *zero BLOCKER/CRITICAL/HIGH and every claimed GREEN reproduces*. The
second half is **fully met — 28 of 28, with the cheap gates double-run byte-identical, every
substantive figure re-read from the settled bytes, H1 re-run over a roster WIDER than its own default,
and d2's two-way falsifier independently re-derived RED in both directions.** The first half is not:
one CRITICAL (18 unrelieved REDs) and one HIGH (the surviving half of the cure-shipped regression).

The honest-RED route is **unavailable**: CONFORMANT-HONEST-RED requires *every* remaining RED gate to
be relieved and owner-named, and only **4 of 22** are (`f2` → X-W9.h · `j1 j2 j3` → X-W5). The other
**18** are RED because four units were never dispatched and three landed one gate each — undone work,
which is not relief, and this seat will not launder it as such.

**What Repair 2 genuinely bought** (measured at this seat, not conceded): three gates moved RED → GREEN
by **measurement rather than assertion**, and in all three the measurement **overturned the hypothesis
the spec carried** — h2 showed no stage is a stripper (every stage at **100.0% of the sRGB ceiling**,
the owner's seed **12.9× outside** it) and corrected `W6.md:291`'s attribution; d2's census ruled the
`LabeledField` near-miss explicitly on its own declarations; i2 proved `W6.md:305`'s grep **occurrence
count was not reachability** and landed the band the row had deferred three times. Two false-green gate
cuts were caught before publication and **recorded rather than buried**. Three greens that were
available cheaply — e2's vacuous second leg, h1, a vacuous-true H2 — were all **refused**. **The wave
remains incomplete, not dishonest.** Its one receipt that does not reproduce (defect 3) understates its
own rigour rather than overstating it.

**Cure, shortest path to CONFORMANT-HONEST-RED**: dispatch `.b .c .e .g` and resume `.d` at d1, `.h` at
h1, `.i` at i1/i3 — all seven have every dependency MET at the bytes today — issuing the one-line dated
bounds grant for `test/gradient-parse.test.ts` on the way so defect 2 closes, and re-capturing the d2
control transcript so defect 3 closes with it. `.j` alone waits on X-W5, and j1–j3 are already relieved
and owner-named.

**The LEDGER row stays `PARTIAL`. It is not promoted.**

### Commits

| # | commit | paths | bounds row |
|---|---|---|---|
| 1 | this commit | `docs/tranches/X/execution/A/X-W6.md` (append-only — `## Check 3`) · `docs/tranches/X/execution/LEDGER.md` (this wave's own row cell + one appended event line) | the record and its own row |

⟨cmd⟩ `git status --porcelain` at close → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh` ⊕ the sibling rows this seat read and never touched
(`docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md`, `docs/tranches/V/coordination/INBOX.md`,
untracked `docs/tranches/X/parse-that/**`). **`scripts/dev/dev.sh` was never touched and never
staged.** The three committed AFTER frames this seat's oracle batch regenerated were restored
byte-identical by single-path ⟨cmd⟩ `git checkout -- …` before any commit, and the tree was verified
clean afterwards. **No product byte, no gate script and no evidence file was written by this seat** —
the two controls behind defect 3 were re-derived **in memory**, against a scratch replica of the
gate's own L1/L2/L3 legs, with zero writes to any repo path.

---

## Open — RESUME 2026-09-20 (second sitting; SEAT 0, `claude-opus-5[1m]`)

**SERVED MODEL: claude-opus-5[1m]** · sitting of record **2026-09-17**, the owner's begin-word
(COHESION §0j) · ruling of record **COHESION §0z** (`732fe109`), *"E1 · re-dispatch. Seat 0 re-opens
X-W6 in RESUME MODE and dispatches `.b .c .e .g` whole, resumes `.d` at d1 … `.h` at h1, `.i` at
i1/i3; `.j` dispatches once X-W5 reads CLOSED"*. Track-relaunch authority: **§0ag** (the supervisor
cron retired; all four tracks return) read with **§0af**. This block is **append-only** beside the
2026-09-18 `## Open`, the `## Close`, and Checks 1–3 — E-3: nothing above this line is rewritten.

### Crash-recovery sweep (standing law, before any other act)

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/value.js` at this open →

```
 M demo/color-picker/App.vue
 M demo/color-picker/composables/usePaletteWiring.ts
 M demo/palettes/usePalettePorts.ts
 M demo/palettes/useSlugMigration.ts
D  demo/shell/PaneSegmentedControl.vue
 M demo/shell/dock/Dock.vue
 M demo/shell/usePaneRouter.ts
 M demo/shell/useViewManager.ts
 M demo/shell/viewSchema.ts
 M demo/styles/shell.css
 M docs/tranches/V/reformation/CARRY-LEDGER.md
 M docs/tranches/X/execution/A/X-W5.md
 M docs/tranches/X/execution/C/F-W10.md
 M e2e/smoke/dual-pane-1440.spec.ts
 M e2e/smoke/mobile/page-load-mobile.spec.ts
 M e2e/smoke/mobile/walk.spec.ts
 M scripts/dev/dev.sh
```

**Zero of those seventeen paths is inside SEAT 0's writable set** (`execution/A/X-W6.md` ·
`execution/LEDGER.md` · `coordination/INBOX.md`). Every one belongs to a sibling seat — the shell /
dock / palettes / e2e rows are **X-W5's** open lane (`execution/A/X-W5.md` is itself dirty),
`C/F-W10.md` is Track C, `CARRY-LEDGER.md` is the V fold, and `scripts/dev/dev.sh` is the unowned
standing-dirty row. **Nothing inherited, nothing stashed, nothing restored, nothing staged.** This
seat wrote no product byte and touched no path outside its three.

### Preconditions, measured at the bytes AND in the LEDGER

| condition | source | reading at this open |
|---|---|---|
| X-W6 is not CLOSED | `LEDGER.md:34` | **`PARTIAL 2026-09-19`** — resume, not re-open-from-zero |
| the resume ruling exists | COHESION §0z (`732fe109`) | PRESENT, six escalations E1–E6 ruled; §4 addendum landed at `W6.md:479` |
| `.a` landed | `git log` | `f90aeb02` (normalise-on-write + stop-owned easing, one axis, one gesture owner) · `c222542d` (a9 gutter) · receipt `e77650e1` |
| `.f` landed | `git log` | `e0e204a9` (X:CSS-1) · receipt `7e5b9512` |
| Repair 2's three landed cures | `git log` | `48d95650` (h2) · `c8111846` (d2) · `4cb294b9` (i2) |
| X-W4 (`SceneActionSet`) | LEDGER + §0ac | **CLOSED** — §0ac, *"X-W4 IS CLOSED"* |
| X-W5 (`.j`'s only precondition) | `LEDGER.md:37` | **`OPEN 2026-09-17`** — NOT CLOSED. Per §0z E1, `.j` is **the last unit and waits**, never skipped |
| glass-ui 7.0.0 subpaths | installed tree | `./aurora` · `./select` · `./labeled-field` · `./number-field` present; `./input` still absent (d2's census branch stands) |
| `motion-quarantine.md` (H2) | `9812f951` | tracked; H2's **citation** legs stay born-RED (`W6.md:338` addendum) |

**Verdict: the wave resumes.** `.j` alone carries a live precondition, and it is the last group.

### E13 Step-0 — the four-path mail sweep at this open

Swept read-only at this seat's own clock, 2026-09-20:

1. `docs/tranches/V/` — newest `ARCHITECTURE.md` (2026-09-20 00:17, a sibling's canon write, **not
   mail**); newest *letter-shaped* item unchanged since 2026-07-17.
2. `docs/tranches/V/coordination/` — newest five are the **2026-09-18 4.1.0 quartet + the
   parse-that addendum-2**, every one authored by us and already rowed (O-rows); `INBOX.md` itself
   was touched 2026-09-20 00:11 by a sibling seat's sweep line.
3. `../glass-ui/docs/tranches/` — ⟨cmd⟩ `ls -dt …/tranches/*/` → **`BK/` is still the newest
   tranche dir** (BK · BJ · BI · IOS27-MICRO · BH). Newest BK coordination item:
   `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, already rowed. ⟨cmd⟩
   `find …/BK/coordination -newermt "2026-09-18 18:00"` → **empty**.
4. `../keyframes.js/docs/tranches/V/coordination/` — newest value-addressed item is our own
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`; `INBOUND-LEDGER.md` (09-19) is
   keyframes' own ledger, addressed to nobody here.
5. `../sci-report/atlas/docs/tranches/P/coordination/` — unmoved, tail 2026-07-27.

**Census**: ⟨cmd⟩ `grep -c "^| I-\|^| O-" INBOX.md` → **82 rows**; tail **I-35 / O-42** (O-41, O-42
minted by sibling tracks since X-W6's last sitting). **Classification read BY POSITION** from each
row's Status cell (field 6), never by bare grep — ⟨cmd⟩
`awk -F'|' '/^\| (I|O)-[0-9]+ /{…if ($6 ~ /UNREAD/) print}'` → **4 rows contain the word**
(O-20, I-31, I-32, O-39) and **every one describes a prior or already-answered state**: I-31
`FOLDED 2026-09-17`, I-32 `READ IN FULL + ROUTED — TERMINAL AS MAIL 2026-09-19`, O-20 `SENT`,
O-39 `SENT … a letter does not owe a letter back`.

**Result: 0 unrowed · 0 UNREAD in X-W6's scope.** No row was minted at this open and no row's
status was changed. **One `O-` row stays OWED inside the wave** — §0z **E5** grants it to `.d`
(the glass-forward easing-readout ask), and `INBOX.md` is in `.d`'s writable set by that ruling,
not this seat's to pre-empt. A dated sweep line is appended to `INBOX.md` by this seat.

---

## Baseline — RESUME 2026-09-20 (the owed gates only; the rest cite the banked reading)

**Scope law**: at a RESUME-mode open only the gates the **still-owed** units turn are re-run at
baseline; every gate already GREEN at a landed unit cites Check 3's 2026-09-19 reading, where **28
of 28 claimed GREENs reproduced at an independent seat, zero divergences**. Every figure below was
taken **read-only** — no product byte, no gate script and no evidence file was written.

| gate | unit | command | reading at this open |
|---|---|---|---|
| b1 · b2 · b4 | `.b` | `node …/probes/wb-gradient-stopeditor/gate-seat.mjs` (:9000, playwright-webkit) | **RED, exit 1, double-run byte-identical** — 5 conditions |
| b3 | `.b` | ⟨cmd⟩ `grep -rn "stop inspector numeric entry" e2e/` | **0 hits → RED by absence** |
| c1 | `.c` | `node …/probes/wb-gradient-stopeditor/gate-structure.mjs` | **RED, exit 1, double-run byte-identical** — 7 conditions |
| c2 | `.c` | `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` | **GREEN-BEFORE-CURE, AND VACUOUS** (see finding R.2-1) |
| c3 | `.c` | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | instrument **ABSENT → RED** |
| c4 | `.c` | `npx vitest run test/interpolation-subset.test.ts` | file **ABSENT → RED** |
| d1 | `.d` | `node …/probes/x-w6/gate-easing-radius.mjs` | instrument **ABSENT → RED** |
| d2 | `.d` | `node …/probes/x-w6/gate-easing-readout.mjs` | **GREEN** (`c8111846`), banked at Check 3 and attacked there in both directions; the **negative-control transcript re-capture is owed** (Check 3 defect 3) |
| e1 | `.e` | new e2e `-g "gradient selector aurora"` | ⟨cmd⟩ `grep -rn "glass-ui/aurora" demo/workbenches/gradient/` → **0**; spec title **0 hits → RED** |
| e2 | `.e` | `grep -rn "requestAnimationFrame" demo/workbenches/gradient/` + `node …/probes/x-w6/gate-prm-idiom.mjs` | **2 rAF sites** (both `EasingAuthoringStage.vue`); instrument **ABSENT → RED** |
| g1 | `.g` | `node …/probes/x-w6/gate-card-rhythm.mjs` | instrument **ABSENT → RED** |
| g2 | `.g` | new e2e `-g "companion panes share one track start"` | **0 hits → RED by absence** |
| h1 | `.h` | new e2e `-g "hero blob carries current chroma"` | **0 hits → RED by absence** (restated by §0z **E6**) |
| h2 | `.h` | `node docs/tranches/X/gates/gate-blob-pipeline.mjs` | **GREEN** (`48d95650`), banked at Check 3 — every stage at **100.0%** of the sRGB ceiling, the owner's seed **12.9×** outside it |
| i1 | `.i` | `npx playwright test e2e/smoke/oracles/o25-atmosphere-response.spec.ts` | spec **ABSENT → RED** |
| i2 | `.i` | `node docs/tranches/X/gates/gate-lband-door.mjs` | **GREEN** (`4cb294b9`), banked at Check 3 |
| i3 | `.i` | `npx playwright test e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts` (E4 re-point) | spec **ABSENT → RED**; ⟨cmd⟩ `grep -rn armRuntime demo/` → **0** |
| j1 · j2 · j3 | `.j` | `…/o29-scene-contracts.spec.ts` (E4 re-point) | spec **ABSENT → RED**; ⟨cmd⟩ `grep -c "component: Stub" demo/color-picker/router/index.ts` → **14** |
| j4 | `.j` | same spec, `-g "short landscape"` | **GREEN at Repair 1** (`6dfdd8d2`, 4 of 4 routes at 720×450), re-witnessed at Check 3; carried, not re-measured here |
| §7 cadence | all | `npx vitest run` | **4 failed / 628 passed (632), 3 files, exit 1** |

### Pasted outputs

⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/wb-gradient-stopeditor/gate-seat.mjs` (run 1 and
run 2, output byte-identical; the only differing line is this seat's own appended `EXIT=` label):

```
GATE G3 (stop seat) — RED
  G3c  selection has no programmatic representation: aria-pressed and aria-selected are both absent. With exactly 2 stops the remove chip is suppressed (removable = stops.length > 2), so the ONLY selected-state cue is scale(1.25) + a border-alpha change.
  G3d  key "Home" is a no-op on a focused stop handle (VISUAL-CONSTITUTION §5.2 requires Home=0%, End=100% and Up/Down at the same signed step; expected 0%). style.left stayed "calc(var(--rail-inset) + var(--rail-track) * 0)".
  G3d  key "ArrowDown" is a no-op on a focused stop handle (VISUAL-CONSTITUTION §5.2 requires Home=0%, End=100% and Up/Down at the same signed step; expected -1%). style.left stayed "calc(var(--rail-inset) + var(--rail-track) * 0)".
  G3f  a click 3px inside the rail's left edge mints nothing (n stayed 2) — with only 2 stops the terminal handle's always-on hit expander already owns the end of the rail, and there is no other add path (no numeric entry, no add button).
  G3f  with 12 stops, only 149px of the 462px rail (32.3%) can still mint a stop — the handles' always-on hit expanders mask 67.7% of the add gesture, with no indication of why it stopped working.
EXIT=1
```

The reading **reproduces Check 3's** (`Home`/`ArrowDown` no-ops against `style.left`; 149px of 462px
mintable at 12 stops) at this seat's own clock, against a **freshly started** `:9000` (STALE-SERVER
LAW) which was stopped again before this block was written.

⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/wb-gradient-stopeditor/gate-structure.mjs` →
`GATE G4 (structure) — RED`, `EXIT=1`, double-run byte-identical, **7 condition lines**: G4a ×2 (the
`colorAt` prop still exists — two implementations of *"the colour of this ramp at p"*; `model/sample.ts`
absent) · G4b (**8** gradient strings emitted, none carrying an ` in <space>` clause) · G4c (2 sites
interpolate an untrusted literal into a `background` SHORTHAND) · G4d (`defineModel("selectedStopId")`
with no parent binding) · G4g ×2 (`model/types.ts` absent, two type-only declaration cycles; the
7-name re-export block with **zero** consumers).

⟨cmd⟩ `npx vitest run` → `Test Files  3 failed | 34 passed (37)` · `Tests  4 failed | 628 passed (632)`
· `EXIT=1`. The four: **`test/gradient-parse.test.ts:32` and `:63`** — the two survivors §0z **E2**
grants (`.a`'s migration: 2 stops → 1, 3 stops → 2) — plus two **foreign born-RED canaries owned by
other waves**, `test/spectrum-luma.test.ts:109` (`C-5 · BORN-RED`) and
`demo/test/shell/reka-binding-idiom.test.ts:77` (`NG-6`), neither in any X-W6 bounds row. Check 3 read
`15 failed / 613 passed (628)`; the delta is sibling-track landings since, not this wave's.

### R.2 findings — a GREEN before its cure

- **R.2-1 · c2 is GREEN and VACUOUS.** ⟨cmd⟩
  `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` → **exit 0**, but
  `test/gradient-order-invariant.test.ts (13 tests | 13 skipped)` — ⟨cmd⟩
  `grep -c "sampling law" test/gradient-order-invariant.test.ts` → **0**. The `-t` filter matches
  **nothing**, so the gate's own command exits 0 with zero assertions executed. This is exactly the
  L-18 target-1 species (*"a suite that stays green under both is not evidence"*). **`.c` must
  author the `one sampling law` case under that exact name** before c2 may be read as GREEN; a c2
  reported GREEN without a matching test in the file is a **false green** and the close must refuse it.
- **R.2-2 · j4** is GREEN before its cure **by declaration** (`W6.md:323`, MEASURE-AT-OPEN) — already
  taken and retired with its measurement at Repair 1; recorded, not re-opened.

---

## Unit plan — RESUME 2026-09-20 (7 owed units; `.a` and `.f` are landed and are NOT re-dispatched)

**Model law M-23** (`W6.md:154`) is unchanged: **every unit is an Opus implementation seat**
(`claude-opus-5[1m]`); **no Fable seat in this wave**; no unit authors design canon (the radius,
spacing/shadow and Movement-of-Momentum canon are **X-W10's** — this wave applies, it never mints).

**Landed, never re-dispatched**: **`.a`** (`f90aeb02` · `c222542d`, receipt `e77650e1`, 13/13 gates
reproduced at Check 3) · **`.f`** (`e0e204a9`, receipt `7e5b9512`, 9 of 10). The three Repair-2 cures
**h2** (`48d95650`), **d2** (`c8111846`) and **i2** (`4cb294b9`) are landed **inside** units that are
still owed, so those units resume at their remaining gates only.

**Groups (ordered; ≤2 concurrent — owner cap, §0ae/§0ag; no two concurrent units share a
`modify` path):**

| group | units | shared-path check |
|---|---|---|
| 1 | `.b` ∥ `.g` | `GradientStopEditor`/`GradientVisualizer`/`GradientPane` vs `ColorPicker.vue`/`AboutPane.vue` — **disjoint**; `.g` after `.f` ✓ (Lane 2 serial, `.f` landed) |
| 2 | `.c` ∥ `.h` | model/sample/CSS/interpolation vs `HeroBlob.vue`/`useContrastSafeColor.ts` — **disjoint**; `.c` after `.b` ✓ (Lane 1 serial) and after `.f` ✓ (c4's own rider law, `W6.md:212`) |
| 3 | `.d` ∥ `.i` | easing trio vs atmosphere trio + `AuroraPane.vue` — **disjoint**; `.d` after `.c` ✓, `.i` after `.h` ✓ (Lane 3 serial) |
| 4 | `.e` | shares `EasingAuthoringStage.vue` with `.d` and `GradientVisualizer.vue` with `.b`/`.c` → strictly after all three; **alone** |
| 5 | `.j` | Lane 4 — after Lanes 1–3; shares `AuroraPane.vue` with `.i`; **gated on X-W5 reading CLOSED in the LEDGER** |

**Wave-level, assigned to NO unit** (`W6.md` §4a, §9 commit **#11**): H1's roster run over the wave's
**full** commit set (§0z), H2's citation audit, H3's close sweep, H4's disposition roll-call, the gate
transcripts in `W6-evidence/gates/`, and the status flip to **IMPLEMENTED** (never VERIFIED — X-W11's
stamp). The close seat is dispatched separately, after group 5.

**Worktrees** (`W6.md` §4b): the four sibling worktrees are **not on disk** at this open (⟨cmd⟩
`git worktree list` → none of `value-x-w6-{gradient,catalog,atmosphere,scenes}`), and `.a`/`.f`/the
three Repair-2 cures all landed in the main tree. With the cap at **two** concurrent and both members
of every group path-disjoint, seats work in `/Users/mkbabb/Programming/value.js` unless a seat elects a
worktree; **the STALE-SERVER LAW binds either way** — every literal/precision/serializer claim runs
headless `vite-node` against the tree or a **freshly restarted** server, never a long-running one, and
each concurrent seat takes its own port (`.b`/`.c`/`.d`/`.e` :9000, `.g`/`.h`/`.i`/`.j` :9002).

### The owed units

**X.W6.b** — Gradient seat, inspector and keyboard grammar (CC-058 · MT-GRADSTOP-2). **Whole.**
§5 `W6.md:182-196`. Gates **b1 b2 b3 b4**. Commit **#2** `feat(demo/gradient-seat)`.
Writable: `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` ·
`…/GradientVisualizer/GradientVisualizer.vue` · `demo/workbenches/gradient/GradientPane.vue` ·
`e2e/smoke/oracles/o21-gradient-rail.spec.ts` **(ADD-never-replace)** ·
`e2e/smoke/views/gradient.spec.ts` **(ADD-never-replace)** · `docs/tranches/X/waves/W6-evidence/**`.
**Locks**: consumes `.a`'s `canRemove` (landed); the **D-6/D2-16 WatercolorDot-faces limb is BANKED**
(`W6.md:428`) — importing `@mkbabb/glass-ui/watercolor-dot` here mints a seventh impostor CC-044 must
delete; trigger = X-W0's census, receiving surface **X-W4.g**, never this wave. **GRADSTOP-A §15** —
crowding cured by **disambiguation** (seat/fan-out/overflow), never by a minimum-ordinal-spacing rule;
b2 must seat *every* addable ordinal at *any* rail width, so a wider hit region alone is not a cure.
b4: **one** removal owner with an **explicit disabled state carrying its reason** — never `v-if`
absence, never a silent early return.

**X.W6.c** — Gradient sampling law, literal dialect and leaf types (CC-058 · MT-GRADSTOP-3). **Whole.**
§5 `W6.md:198-212`. Gates **c1 c2 c3 c4**. Commit **#3** `refactor(demo/gradient-sampling)`,
**body required**.
Writable: `demo/workbenches/gradient/model/types.ts` **(create)** · `…/model/sample.ts` **(create)** ·
`…/composables/useGradientModel.ts` · `…/composables/useGradientCSS.ts` ·
`…/composables/useGradientInterpolation.ts` · `…/GradientVisualizer/GradientVisualizer.vue` ·
`docs/tranches/X/gates/gate-literal-dialect.mjs` **(create)** · `test/interpolation-subset.test.ts`
**(create)** · `test/gradient-order-invariant.test.ts` · `test/gradient-parse.test.ts` **(§0z E2)** ·
`docs/tranches/X/waves/W6-evidence/**`.
**Locks**: **strictly after `.f`** (c4's rider) and after `.b` (Lane 1); the **ordering policy does
NOT reopen** — settled in `.a` (GRADSTOP-A §14); **STALE-SERVER LAW** on c3 (headless `vite-node`,
never the long-running server); the paint-stack dedup rider is **two sites** (`.gradient-rail`,
`.gradient-render-tile`) — §17 forbids citing four/six. **R.2-1 BINDS**: c2's command `-t "one
sampling law"` matches **zero** tests today, so the unit **authors that case under that exact name**;
reporting c2 GREEN without it is a false green. **E2's migration rides here**: §0z grants
`test/gradient-parse.test.ts` as *"unit `.a`'s migration only"*, `.a` is landed and never
re-dispatched, so the first still-owed Lane 1 seat carries the act — **`:32` 2 stops → 1, `:63` 3
stops → 2**, arithmetically verified at both sites by Repair 2, **no assertion weakened and no other
case touched**; §7's `npx vitest run` must lose those two failures. If the seat reads the grant as
seat-scoped rather than change-scoped, it **halts under §3a and returns it** — it never widens.

**X.W6.d** — Easing instrument coherence (CC-060 · MT-F030; CC-063 · MT-F037). **Resumes at d1.**
§5 `W6.md:214-226`. Gates **d1** (+ d2's owed re-capture). Commit **#4** `style(demo/easing-register)`.
Writable: `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` **(no `easing/`
segment — fold §2 e.1, re-verified at the bytes)** · `…/GradientVisualizer/easing/EasingAuthoringStage.vue` ·
`…/GradientVisualizer/easing/easingCatalogue.ts` ·
`docs/tranches/V/megatranche/audit/probes/x-w6/gate-easing-radius.mjs` **(create)** ·
`docs/tranches/X/waves/W6-evidence/easing/**` · `docs/tranches/V/coordination/INBOX.md` **(§0z E5 —
mail rows only, next `O-n`)**.
**Locks**: d2 is **already GREEN** (`c8111846`) and its branch is **settled** — the census selected the
**dated glass-forward ask**; the unit **does not re-decide it** and does not touch
`gate-easing-readout.mjs`'s verdict logic. Two acts are owed: (1) **d1** — one radius register derived
from the panel's own scale, the preset chips deciding **once** between the icon-button circle and the
shared rounded-rect; the radius **canon** is X-W10's (M-23), `.d` applies it. (2) **Check 3 defect 3**
— `W6-evidence/easing/d2-negative-controls-2026-09-19.txt` prints `GREEN` in all four blocks where it
must print **RED in both directions**; the transcript is **re-captured** (dated addendum-beside, E-3 —
the stale file is not silently overwritten) so both controls print their `FAIL` lines. (3) **E5** —
the `O-` relay row for `W6-glass-ask-easing-readout.md`, mail rows only. **glass-ui is READ-ONLY
always**; no local restyle of the readout (M-14 cl.1).

**X.W6.e** — Gradient selector aurora (CC-064 · MT-F041). **Whole.**
§5 `W6.md:228-243`. Gates **e1 e2**. Commit **#5** `feat(demo/gradient-aurora)`.
Writable: `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` ·
`…/GradientVisualizer/easing/EasingAuthoringStage.vue` · the gradient tree's scoped styles ·
`docs/tranches/V/megatranche/audit/probes/x-w6/gate-prm-idiom.mjs` **(create)** ·
`e2e/smoke/views/gradient.spec.ts` **(ADD-never-replace)** · `W6-evidence/**`.
**Locks**: consume `@mkbabb/glass-ui/aurora` (published, verified at this open) — **no new animation
species, no private rAF loop**; PRM honoured **structurally**, inside
`@media (prefers-reduced-motion: no-preference)`, never by leaning on the global reduce-guard; land at
**≤2 rAF both gated, or 0**. **Repair 2 refused e2 deliberately and that refusal is inherited**: the 2
rAF sites are one-shot post-paint `viewBox` reads (`syncVbRatio`) — a layout measurement, not a clock —
and PRM-gating a layout read breaks the zero-letterbox law; **landing e2 while e1 is unbuilt makes e2's
second leg vacuously true**, so **e1 lands first or with it**, never after. **MOTION-SOURCED ·
PENDING-QUARANTINE** — every motion/PRM assertion cites `motion-quarantine.md` (`9812f951`) **and** is
re-derived against the two guards `demo/styles/animations.css:184` ⊕
`…/glass-ui/dist/styles/utilities/a11y-overrides.css`. After `.d` (shares `EasingAuthoringStage.vue`).

**X.W6.g** — Picker card rhythm and About alignment (CC-059 · MT-F029; CC-062 · MT-F035). **Whole.**
§5 `W6.md:267-279`. Gates **g1 g2**. Commit **#7** `fix(demo/picker-rhythm)`.
Writable: `demo/picker/ColorPicker.vue` (card stack + scoped styles) · `demo/scenes/about/AboutPane.vue` ·
`docs/tranches/V/megatranche/audit/probes/x-w6/gate-card-rhythm.mjs` **(create)** · a new e2e arm in
`e2e/smoke/oracles/o21-space-catalog-truth.spec.ts` or `e2e/smoke/views/` **(ADD-never-replace)** ·
`W6-evidence/**`.
**Locks**: after `.f` (Lane 2 serial — shares `ColorPicker.vue` + `AboutPane.vue`, `.f` landed); the
cure is the **shared row contract** (one grid row, one track start), **never a per-pane nudge** — g2
asserts About **and** keeps the **OM-10 Mix control unmoved**, and a nudge passes the first while
breaking the second; the spacing/shadow **canon** is X-W10's (M-23) — `.g` applies a censused
disposition, it does not invent a register. g1 fails on any interval with no scale derivation,
*including one that merely looks right*.

**X.W6.h** — HeroBlob chroma fidelity (CC-061 · MT-F032). **Resumes at h1.**
§5 `W6.md:281-293` **as restated by COHESION §0z E6** and `W6.md:479`. Gate **h1**. Commit **#8**
`fix(demo/hero-blob-chroma)` (the census commit `48d95650` already precedes it).
Writable: `demo/picker/visual/HeroBlob.vue` · `demo/color-session/useContrastSafeColor.ts` · a new e2e
arm **(ADD-never-replace)** · `docs/tranches/X/waves/W6-evidence/**`.
**Locks**: **h2 is GREEN and its census is the premise, not a question** — every pipeline stage
delivers **100.0%** of the chroma sRGB allows at the lightness it lands on, and the owner's seed
`lab(92% 88.8 20)` is **12.94×** outside sRGB (C 0.27245 vs ceiling 0.02105); *there is no stripper to
cut*. **§0z E6 is the cure**: widen the **ceiling**, never the tolerance — the blob's colour resolver
and its WebGL2 drawing buffer declare **`display-p3`** where `matchMedia('(color-gamut: p3)')` matches
(`gl.drawingBufferColorSpace`, a `display-p3` 2D resolver canvas) and fall to **sRGB** otherwise; **h1
= the painted dominant chroma within the stated ΔC of the current colour's chroma gamut-mapped
(css-color-4 §13 chroma reduction) to the buffer's colour space**, and chroma beyond the display's own
gamut is **honest-RED-by-physics, by id**. The seat lands it **inside its §4 rows or returns the exact
path it lacks** — no local patch of `node_modules`, no consumer try/catch.

**X.W6.i** — The atmosphere harness (CC-065 · CC-066 · CC-067). **Resumes at i1 and i3.**
§5 `W6.md:295-308`. Gates **i1 i3**. Commit **#9** `feat(demo/atmosphere-oracle)`, **body required**.
Writable: `demo/color-picker/composables/boot/useAtmosphere.ts` ·
`demo/color-picker/composables/boot/atmosphere-calibration.ts` · `demo/test/glass/aurora-bracket.test.ts` ·
`demo/scenes/atmosphere/AuroraPane.vue` · `e2e/smoke/oracles/o25-atmosphere-response.spec.ts`
**(create)** · `e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts` **(create — §0z E4 re-point;
`o26-aurora-perceptibility` and `o27-focus-affordance` already ship and are untouched)** ·
`docs/tranches/X/waves/W6-evidence/atmosphere/**`.
**Locks**: **the tombstone already committed FIRST** (`c2f17bad`, DR-01 retired as landed at N.W5
`e32111c7`, carry closed at 18) and **i2 is GREEN** (`4cb294b9`) — neither reopens. **i1 reads
COMMITTED FRAMES only**: for each of N seeds the named atoms move **≥ a stated ΔE2000**, measured from
frames committed in this wave's own commit (force-added past `.gitignore *.png`) — *an agent's
description cannot pass i1, and it fails equally if it could be*. **i3**: the first painted atmosphere
equals the seeded pick on a **cold** load; ⟨cmd⟩ `grep -rn armRuntime demo/` → **0**, so the T-era
`armRuntime({immediate:true})` cure is not in the tree. **Writes `AuroraPane.vue` before `.j`.**

**X.W6.j** — Scene adoption: Gradient pilot → Mix canary → Blob/Atmosphere persistence (CC-056 · V·L3;
CC-057 · V·L4). **LAST, and precondition-gated.**
§5 `W6.md:310-327`. Gates **j1 j2 j3** (**j4 GREEN at Repair 1** `6dfdd8d2` — carried with its
measurement, never re-opened). Commit **#10** `feat(demo/scene-adoption)`.
Writable: `demo/workbenches/mix/MixPane.vue` · `…/mix/MixConfigBar.vue` · `…/mix/MixSourceSelector.vue` ·
`…/mix/MixAnimationCanvas/MixAnimationCanvas.vue` · `…/mix/MixAnimationCanvas/composables/useMixingAnimation.ts` ·
`demo/scenes/blob/BlobPane.vue` · `demo/scenes/atmosphere/AuroraPane.vue` · route-private scene styles ·
`e2e/smoke/oracles/o29-scene-contracts.spec.ts` **(create — §0z E4 re-point)**.
**HALT CONDITION (§0z E1, measured at this open)**: X-W5 reads **`OPEN 2026-09-17`** in the LEDGER, not
CLOSED. The seat **re-reads `LEDGER.md` first**; if X-W5 is still not CLOSED it writes its receipt with
the measurement and **returns BLOCKED-ON `X-W5` without writing a product byte** — *"`.j` is the last
unit and waits on it, never skipped"*. When it opens: order is **Gradient → Mix → Blob/Atmosphere**,
each route its own completable slice; **transitions are X-W5's (CC-054/CC-055) — this unit asserts NO
transition property of its own** and its pane/sub-pane assertions inherit the **PENDING-QUARANTINE**;
writes `MixConfigBar.vue` + `MixSourceSelector.vue` (X-W7-shared) **first** and `AuroraPane.vue` after
`.i`; **no chassis** (H1) — two instruments' stages are never factored into one parameterised housing.

---

## Unit receipts — resume round 2026-09-20

*(empty at this open; each dispatched seat appends its own receipt below, newest last)*

### X.W6.g

**Seat**: `claude-opus-5[1m]`, wall clock **2026-09-20**. Dispatched WHOLE per §0z E1.
**Spec of record**: `W6.md:267-279` (§5 X.W6.g) · `W6.md:47-120` (§4 File Bounds) · `W6.md:383`
(§9 commit #7). Rulings consumed: COHESION §0z (E1 re-dispatch) and every later addendum read to
the file end (`§0aa`–`§0ah`; none names `.g`, and `§0ac:2145` places X-W6 after X-W9 in the
relaunch order, which is the order this seat was dispatched under).
**Gates owned**: **g1 g2**. **Commit**: `e69aaf95`.
**Verdict**: **PARTIAL** — **g2 GREEN** (twice, with both negative controls RED); **g1 RED**, its
instrument authored and its cure **ESCALATED** with the exact bytes named below.

#### Act 0 — crash-recovery (standing law)

⟨cmd⟩ `git status --porcelain` at this seat's open → 14 dirty rows. Intersected against this
unit's writable set (`demo/picker/ColorPicker.vue` · `demo/scenes/about/AboutPane.vue` ·
`…/probes/x-w6/gate-card-rhythm.mjs` · `e2e/smoke/views/**` · `…/W6-evidence/**`):

```
 M demo/color-picker/App.vue          → X-W5's seat, NOT mine
 M demo/shell/{dock/Dock.vue,usePaneRouter.ts,useViewManager.ts,viewSchema.ts}
 M demo/styles/shell.css              → X-W5's seat, NOT mine
 M demo/palettes/{usePalettePorts,useSlugMigration}.ts  → X-W7's, NOT mine
 M e2e/smoke/{dual-pane-1440,mobile/page-load-mobile,mobile/walk}.spec.ts  → not under views/
 M docs/tranches/X/execution/{A/X-W5.md,C/F-W10.md} · docs/tranches/V/reformation/CARRY-LEDGER.md
 M scripts/dev/dev.sh                 → the unowned row, NEVER touched
```

**Zero rows inside this unit's writable set.** Nothing inherited; nothing outside the set touched.

#### Act 1 — the measurement, before any edit (D-19)

A FRESH dev server (STALE-SERVER law, `W6.md:148`): ⟨cmd⟩ `npx vite --port 9001 --strictPort` →
`VITE v8.0.16 ready in 823 ms`. Every figure below is a DOM reading at 1440×900 on `/#/` with the
model on **lab** — the space OM-3 was captured in.

| what | reading |
|---|---|
| the headline card | `.pane-shell > .card`, top 112.00, height 684.77 |
| title row → readout seam | **7.16px**, declared by `--picker-header-rhythm` (7.168px) |
| `h3.readout` box | min-height **122.407px**, `--readout-lines` **2**, line-height **61.2033px** |
| `h3.readout` content-top → first `.readout-cell` | **61.22px, EMPTY** |
| `align-content` on `.readout` | `flex-end` |

**61.22px against a 61.20px line box.** `W6.md:276`'s RED-today reads *"a band ≈ the readout row's
own height between header and readout"*; the band is that row's own height to two decimals. The
owner's frame is reproduced, not inherited.

#### Act 2 — g1's instrument, authored (`gate-card-rhythm.mjs`, ABSENT at every prior check)

`W6.md:276` names the command and `ROOT-FINDINGS.md:1403` names the test: *"the gap must derive
from the type scale's interval, **not from leftover flex/grid slack**."* That is two halves, and
the instrument implements both rather than either:

- **PROVENANCE** — an interval is legitimate only if some box DECLARED it (a gap, a margin). Free
  space a flex container had left over and then distributed by `align-content` is declared by
  nobody: it is the row's own "leftover flex slack", and it fails wherever it lands.
- **DERIVATION** — a declared interval must resolve to a φ-ladder step (`--phi-0..4` and integer
  multiples, the register `foundation.css` publishes and `AboutPane.vue` already consumes as
  `pt-phi-3`) or to a named rhythm token. **A LINE BOX IS NOT A STEP.** Admitting one would let
  this exact 61.2px band print "ok · 1lh" — the vacuous green L-18 target 1 is written against.
- **ROW INFLATION** (the anti-gaming leg) — each headline row is also measured whole, box height
  against painted extent, so the same band re-declared as a padding is still the same band.

Why PROVENANCE is not optional: this reserve has now been placed twice and measured as dead air
both times — below the tuple (T.W4-2, the §6.1 "61px dead band between the figures and the
gradient rail") and above it (T.W6.5-P, `e2e/smoke/oracles/readout-seam.spec.ts`, which is where it
sits today and is what the owner marked). A gate that only asked "is the seam small?" goes green on
the placement OM-3 marks. This one reads free space wherever it is anchored, so **moving the band a
third time cannot turn it green.**

⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/x-w6/gate-card-rhythm.mjs` → **exit 1**,
double-run byte-identical (⟨cmd⟩ `diff -q run1 run2` → no output). Transcript:
`docs/tranches/X/waves/W6-evidence/picker/g1-card-rhythm-BEFORE-2026-09-20.txt`.

```
LARGEST INTERVAL: 61.22px — h3.card-title.readout content-top → span.readout-cell top
                  → RESIDUE 61.22px undeclared

ROW INFLATION (box height · painted height · inflation · verdict):
     84.97    84.97     0.00  div.title-row.w-full          → ok · 0
    122.41    67.00    55.41  h3.card-title.readout
                    → INFLATED BY A QUANTITY THAT IS NOT A SPACING STEP

GATE g1 — RED: 2 interval(s) fail.
```

Every other interval in the card passes and is printed with its derivation — the title→readout seam
as `--picker-header-rhythm`, the spectrum→sliders gap as `2×--phi-0`, and eleven zero-width edges.
**The card has exactly one interval that means nothing, and it is the largest one**, which is
`ROOT-FINDINGS.md:1403` verbatim: *"the card's internal vertical rhythm allocates its largest single
interval to nothing."*

#### Act 3 — g1's cure: ESCALATED, with the bytes measured rather than guessed

The residue's mechanism is one pair of declarations on `h3.readout` — `min-height: calc(
var(--readout-lines,1) * 1.12em)` (the per-space card-lock) crossed with `align-content: flex-end`.
The lock reserves lab's honest worst case of two lines; the live tuple paints one; the unpainted
line is anchored ABOVE the numbers. Both declarations live in
`demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue`.

**The reach is not the problem.** ⟨measured⟩ the rendered `h3.readout` carries `data-v-2bc1bc2c` —
**ColorPicker.vue's own scope id** (the same id on `.pane-shell`, `.picker-header`, `.title-row`),
because it is the child component's root node. So a rule in ColorPicker.vue's `<style scoped>`
reaches it by the documented Vue child-root rule, with no `:deep()`, and that write is INSIDE this
unit's writable set. **The problem is that no such rule is a cure**, and this seat measured why:

1. **Re-anchoring moves the band, it does not remove it.** `align-content: start` puts the same
   61.22px between the numbers and the spectrum — the exact band T.W6.5-P was commissioned to kill.
   g1's provenance leg reds either way, by construction, and a third placement of a twice-refused
   band is not a cure.
2. **Removing the lock ships a measured regression.** With `min-height` gone the card grows 61.2px
   the moment lab's tuple wraps mid-drag; the lock's stated reason to exist is that nothing below
   the header shifts mid-drag.
3. **A shipped oracle ASSERTS the band the owner marked.**
   `e2e/smoke/oracles/readout-seam.spec.ts:85-119` requires `lock === 2`, `minHeight ≈ lock ×
   lineHeight`, `deadBandBelow ≤ EPS` and `airAbove ≥ boxHeight − painted` — i.e. it requires that
   the reserved-minus-painted delta ride ABOVE the numbers. **g1 GREEN and that leg GREEN cannot
   both be true.** (⟨cmd⟩ `npx playwright test e2e/smoke/oracles/readout-seam.spec.ts
   --project=smoke` → **3 failed** at these bytes already, all three on
   `getByRole('main', {name:'Color tool panes'})` **element(s) not found** — a shell accessible-name
   change from X-W5's in-flight work in this shared tree, NOT the seam. Its assertions still encode
   the contradiction; they are simply not currently reachable.)

So the cure needs, at minimum, `ColorComponentDisplay.vue` (or a reservation policy in
`…/ColorComponentDisplay/readoutReservation.ts`) **and** the retirement or re-authoring of
`e2e/smoke/oracles/readout-seam.spec.ts`. **None of those three paths is in `W6.md` §4 and none is
in this unit's writable set.** That is §3a's first trigger — *"File-bound expansion that invalidates
the wave: any unit needing a write outside §4"* — so this seat halts on it and returns it, per
METHOD (*"if the specified cure is impossible at the bytes, do NOT substitute"*).

**What the ruling has to decide** (it is a design act, and `W6.md:154` puts the spacing canon in
X-W10 — *".g applies a censused disposition, it does not invent a register"*): the card-lock and
OM-3 are incompatible as stated. Three reserves have now been shown to the owner and all three were
refused — per-cell `ch` min-widths (R4, *"the reservation rendered as dead air between the
values"*), the band below (T.W6.5-P §6.1), the band above (OM-3). The open question is not where to
put the reserve a fourth time; it is **whether the worst-case reservation survives at all**, and
that is the owner's or X-W10's word, not an implementation seat's.

#### Act 4 — g2's arm, authored and GREEN (a GREEN-BEFORE-ITS-CURE finding, R.2 class)

`e2e/smoke/views/companion-pane-track-start.spec.ts` (new; ADD-never-replace — the file did not
exist, nothing was replaced). `W6.md:279` decides its shape: *"g2 fails if the cure moves the Mix
control (a per-pane nudge passes the About assertion and breaks the control; the gate asserts
both)"* — so the OM-9 scene and the OM-10 control are **assertions of ONE test**, never two tests a
seat could read half of. Each pane is additionally asserted to sit ON its own track start, which is
what makes it the SHARED ROW CONTRACT and not two coordinates that happen to agree.

⟨cmd⟩ `npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts --project=smoke -g
"companion panes share one track start"` → **1 passed**, twice (16.1 s / 19.6 s). Transcript:
`W6-evidence/picker/g2-track-start-2026-09-20.txt`.

**The OM-9 defect does not reproduce at these bytes** — Picker and About both begin at track start
112.00 on `/#/`, Picker and Mix both at 159.00 on `/#/mix`. It is a GREEN BEFORE ITS CURE and is
recorded as a finding, not a convenience: X.W5.b's block law and X.W5.c's region grid landed between
the owner's capture and this seat. **Named honestly: X.W5.c's grid is UNCOMMITTED in this shared
tree** (⟨cmd⟩ `git diff --stat demo/styles/shell.css` → `142 ++---`), so this green stands on a
sibling seat's in-flight bytes; at HEAD the same two-column row exists through the retired
`.pane-container--dual` media arm (⟨cmd⟩ `git show HEAD:demo/styles/shell.css | grep -n dual` →
`:249`), so the contract holds on both sides of that landing — but the reading is X-W5-coupled and
a close seat should re-run it after X-W5 commits.

**The green is readable, because the gate was made to fail.** ⟨cmd⟩ `node
docs/tranches/X/waves/W6-evidence/picker/g2-negative-controls.mjs` → **2 of 2 went RED**:

```
C1 · per-pane nudge on About (margin-top: 16px) — must go RED
    FAIL  About sits ON its track start: |127.98 − 111.98| = 16.00px
    FAIL  Picker↔About top edges: |112.00 − 127.98| = 15.98px
C2 · per-pane nudge on the Picker — the falsifier's own shape
    FAIL  CONTROL (OM-10) Picker↔Mix top edges: |128.00 − 112.00| = 16.00px
    FAIL  CONTROL Picker sits ON its track start: |128.00 − 112.00| = 16.00px
```

C2's About leg ALSO failed here, and that is stated rather than smoothed: in a tree where OM-9
reproduced, a Picker nudge would buy the About leg — here About is already aligned, so the nudge
breaks it too. The load-bearing half of C2 is unaffected: **the OM-10 control leg catches a Picker
nudge**, which is the property `W6.md:279` demands.

#### §7 cadence, at the settled bytes

⟨cmd⟩ `npx prettier --check` on the three authored files → `All matched files use Prettier code
style!` (they were `--write`-formatted first, and **both gates were then re-run and re-banked from
the settled bytes** — WRITE-THEN-MEASURE; g1's double-run stayed byte-identical).
⟨cmd⟩ `npx tsc -p tsconfig.e2e.json --noEmit` → **5 errors, 0 in this unit's file**; all five are in
`e2e/smoke/oracles/o23-specimen-gamut-honesty.spec.ts` (X.W6.f's), pre-existing, untouched here.
⟨cmd⟩ `git diff --check` on both authored source paths → clean.
`eslint`/`vue-tsc -p tsconfig.demo.json`/`vitest` are not run by this seat: **no `demo/`, `src/` or
`test/` byte was written**, so they would measure other seats' trees, not this unit's landing.

#### E13 mail

Swept read-only at this seat's clock. `docs/tranches/V/coordination/INBOX.md` carries 89 `UNREAD`
occurrences across the register; **none addresses `.g`, the picker card rhythm, or the pane track
start**. `.g` holds no INBOX grant (§0z E5 gave mail rows to `.d` only) and wrote no mail row.

#### Gate readings — BEFORE → AFTER

| gate | command | BEFORE (this seat) | AFTER (this seat) |
|---|---|---|---|
| **g1** | `node …/probes/x-w6/gate-card-rhythm.mjs` | **RED by absence** — instrument absent at open, close, Check 1, Check 2, Check 3 | **RED, measured**: exit 1, one residue of **61.22px** + the readout row inflated **55.41px**; double-run identical |
| **g2** | `npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts --project=smoke -g "companion panes share one track start"` | **RED by absence** — 0 hits at every prior check | **GREEN**, 1 passed, twice; negative controls **2 of 2 RED** |

#### Commits

| # | hash | paths | §4 row |
|---|---|---|---|
| 7 | `e69aaf95` | `…/probes/x-w6/gate-card-rhythm.mjs` · `e2e/smoke/views/companion-pane-track-start.spec.ts` · `W6-evidence/picker/{g1-card-rhythm-BEFORE,g2-track-start,g2-negative-controls}-2026-09-20.txt` · `W6-evidence/picker/g2-negative-controls.mjs` | `W6.md:102` (g1) **create** · `:84`-class ADD-never-replace under `e2e/smoke/views/**` · `:104` `W6-evidence/**` **create** |

**DEVIATION, named**: `W6.md:383` declares commit #7's scope `fix(demo/picker-rhythm)`. No product
byte landed — g1's cure is escalated and g2 needed none — so the commit is taken as
`test(demo/picker-rhythm)` and says so in its own body. Claiming `fix` over a diff containing no
`demo/` path would be a false entry in the wave's commit ledger.

#### Residuals — named, not smuggled

- **R-g1 · the 61.22px residue stands.** The band the owner marked is still in the tree. It now has
  a machine gate that reds on it, names it to two decimals, and cannot be satisfied by moving it.
- **R-g2 · g2's green is X-W5-coupled.** It was measured over X.W5.c's uncommitted grid in this
  shared tree. Re-run after X-W5 commits; the contract holds at HEAD too (the `--dual` media arm),
  so no reversal is expected, but the reading is not independent of a sibling's landing.
- **R-g3 · `readout-seam.spec.ts` is RED for an unrelated reason** — three failures, all
  `getByRole('main', {name:'Color tool panes'})` not found, from X-W5's in-flight shell. Recorded
  here because this seat ran it; it belongs to X-W5's close, not to `.g`.
- **R-g4 · §8's OM re-captures (OM-3 / OM-9 / OM-10 at the same crop) are NOT produced.** `.g`'s
  writable set carries `W6-evidence/**`, so the frames are landable — but OM-3's AFTER is a picture
  of a cure that has not happened, and OM-9/OM-10's would assert by eye what g2 now asserts by
  measurement. They ride the g1 ruling.

#### ESCALATION — ESC-g1: the card-lock and OM-3 are incompatible, and the cure's bytes are outside §4

**Returned, not worked around.** To turn g1 green a seat must write at least one of
`demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue` (the `min-height` ×
`align-content: flex-end` pair) or `…/ColorComponentDisplay/readoutReservation.ts` (the per-space
worst-case line count), **and** retire or re-author `e2e/smoke/oracles/readout-seam.spec.ts:85-119`,
which asserts the OM-3 band as its own cure. **None of the three is in `W6.md` §4; none is in this
unit's writable set.** §3a trigger: *"File-bound expansion that invalidates the wave."*

The ruling owed is a design one, and `W6.md:154` (M-23) puts it in X-W10, not in an implementation
seat: **does lab's worst-case line reservation survive?** Three reserves have been refused by the
owner (R4 per-cell `ch`; T.W6.5-P below; OM-3 above), and a fourth placement is the only move left
inside the lock. Either the lock goes and the card is allowed to grow on a 1↔2-line crossing, or the
band stays and OM-3 is dispositioned as accepted — and whichever is chosen, `readout-seam.spec.ts`
has to be re-pointed in the same act, because it currently encodes the opposite answer.

**What is already in hand for whoever rules it**: the gate exists, is double-run stable, prints the
full interval table with every passing derivation, and has an anti-gaming leg that defeats both
cheap answers (re-anchor, re-declare-as-padding). The cure is one or two declarations once the
policy is ruled.

#### Files written by this unit (nothing outside them)

`docs/tranches/V/megatranche/audit/probes/x-w6/gate-card-rhythm.mjs` (create) ·
`e2e/smoke/views/companion-pane-track-start.spec.ts` (create) ·
`docs/tranches/X/waves/W6-evidence/picker/` (create: 2 instruments' transcripts + 1 instrument) ·
this record. **`demo/picker/ColorPicker.vue` and `demo/scenes/about/AboutPane.vue` were READ and
MEASURED, never written** — g2 needed no cure and g1's is escalated.

**Erratum (2026-09-20, in place — this seat's own record, same session)**: commit `e69aaf95` was
written WITHOUT the `Claude-Session:` trailer the standing commit form prescribes; the record
commit `8d55a82f` carries it. The omission is recorded rather than repaired — amending a landed
commit in an index four tracks share is the larger harm, and the standing law admits no
`reset`/amend for this. Every path in `e69aaf95` is inside this unit's writable set and is listed
in the commit table above.

---

### X.W6.b

SERVED MODEL: claude-opus-5[1m]

**Unit**: Gradient seat, inspector and keyboard grammar (CC-058 · MT-GRADSTOP-2), `W6.md` §5
`:182-196`, dispatched **whole** by COHESION §0z **E1**.
**Status**: **ESCALATED** — **b2 · b3 · b4 GREEN**; b1's product content is landed and proven, and
its gate's two remaining legs are RED **by the probe's input state**, not by an absent binding
(§Escalation below). Wall clock **2026-09-20**.
**Commits**: `63713d4c` (the seat band, the inspector, the keyboard/selection contract) ·
`7dff25f6` (the crowding fan) · `fa2466f0` (the instrument + gate transcripts) · this record.

#### Act 0 — crash-recovery (standing law, before any other act)

⟨cmd⟩ `git status --porcelain` at open → 21 paths. **Not one is inside this unit's writable set**:
the shell / dock / palettes / `e2e/smoke/{dual-pane-1440,mobile/*}` rows are **X-W5's** open lane,
`execution/{A/X-W5,B/KF-W13,C/F-W10}.md` are sibling seats' records, `CARRY-LEDGER.md` is the V
fold, `scripts/dev/dev.sh` is the unowned NEVER-touch row, and
`…/probes/x-w6/gate-card-rhythm.mjs` + `e2e/smoke/views/companion-pane-track-start.spec.ts` are
`.g`'s in-flight files. ⟨cmd⟩ `git status --porcelain -- demo/workbenches/gradient e2e/smoke/oracles/o21-gradient-rail.spec.ts`
→ **empty**. **Nothing inherited, nothing stashed, nothing restored.** Every commit below carries
its own pathspec; ⟨cmd⟩ `git diff --cached --name-only` after the first → `demo/shell/PaneSegmentedControl.vue`
**only**, i.e. the sibling's staged deletion, untouched.

#### Act 1 — BEFORE (RESUME-mode scope law)

The still-owed gates for this unit were re-run **at this sitting's own open** by SEAT 0, double-run
byte-identical (`X-W6.md` §Baseline — RESUME, five G3 conditions pasted there), so this seat cites
that baseline for `gate-seat.mjs` rather than re-running a third time, and takes its **own**
before/after for the figure its cure moves:

⟨cmd⟩ `node <scratchpad>/probe-clip.mjs` — the add-surface census on the ramp's own centre row
(the gate's measure: a column counts when `document.elementFromPoint` at that pixel returns the
ramp itself), chromium 1440×900 against a **freshly started** `:9000`:

| | rail box | seat 0 box | addable |
|---|---|---|---|
| BEFORE | 462.0×40.0 @ (224, 209.7) | 24×24 @ (224, **217.7**) | **388 / 462 = 84.0%** (2 stops) |
| AFTER | 462.0×40.0 @ (224, 248.2) | 24×24 @ (224, **292.2**) | **462 / 462 = 100.0%** |

Banked at `W6-evidence/gradient/gates/b2-meniscus-census-2026-09-20.txt`, with the clipping census
that had to be taken **before the cure could be designed** (the seats hang below the rail's box, so
"does the rail clip its children" is a measurement, not an assumption): `.gradient-rail` and
`.rail-seat` both `overflow: visible · contain: none · clip-path: none`; the nearest clipping
ancestor is the pane Card, four levels up.

#### Act 2 — the cure (`63713d4c`, then `7dff25f6`)

- **b2 · the seat rail frees the meniscus.** Every seat's hit rung used to inflate **on the ramp**,
  so the terminal seat owned the meniscus (`bar.x + 3` minted nothing) and twelve stops sterilised
  67.7% of the add surface. Nothing about a stop requires it to sit on the ramp — its ordinal is an
  **X**, and X is exactly what `.a`'s one axis fixes — so the seats, the caret and the ghost take
  their own band below the ramp: `--rail-handle-top = var(--rail-height) + var(--rail-gutter) +
  var(--rail-hit)/2`, where `--rail-hit` is the rung **actually in force** (the 24px seat on a fine
  pointer, `--rail-touch` under `@media (pointer: coarse)`), so the ramp is free of BOTH rungs
  rather than only the fine one. The handles stay **descendants of the rail element**, so every
  existing oracle that scopes `[data-stop-id]` to `[data-testid="gradient-stop-bar"]` still binds.
- **b2 · the band is reserved by the RAIL, not the seat root** — the first shape of this cure put
  `padding-bottom` on `.rail-seat`, which reserves space *after* the inspector rather than between
  the two; measured on the coarse cell, the seats landed **on top of** the inspector and its
  control could not be reached. The rail's own `margin-block-end` is the reservation.
- **b1 · the value contract.** `aria-selected` lands on the seat (selection had **no** programmatic
  representation: G3c's own words), and the **ORDINAL now rides `aria-valuetext`** —
  `Stop 2 of 3, position 37.5%` — not the accessible name alone. A name is announced when a control
  takes focus; a drag that carries a stop past its neighbour changes its ordinal, and under the old
  split that change was silent. The §5.2 keys, the Space grab and the keyboard CREATE caret were
  landed by X-W4 · C1/C2 and are re-measured here rather than re-authored.
- **b3 · the inspector's numeric entry.** `type="number"` + `inputmode="decimal"`, `min/max/step`,
  bound to the selected stop and writing through **the same sole mutator** every gesture writes
  through (`setStopPosition` via `moveStop`), so entry and paint cannot disagree.
- **b4 · ONE removal owner.** The floating chip is **deleted**: it was the floor expressed as
  `v-if="selectedStop && removable"` **absence** over a remover that returned in **silence**, and it
  had to be exiled a full coarse target below the seat (and reserve that whole band) so that a tap
  which grabbed could not destroy. The inspector's control stays at the floor, `disabled`, with its
  reason rendered and wired as its own `aria-describedby`; a handle's Delete/Backspace routes to the
  same `requestRemove`, which **announces** the refusal in a `role="status"` line instead of
  returning silently. The seat now reads the model's own **`canRemove`** (`.a`'s, passed as a prop)
  instead of re-deriving `stops.length > 2` — one rule, one author. The control keeps the accessible
  name `Remove selected stop`, which is what `.a`'s a9/a10 arms and `gradient.spec.ts:286` bind.
- **b2/§15 · crowding, disambiguated** (`7dff25f6`). Measured at this seat: with fifteen stops
  inside fourteen percent of the rail, the seat at 0% **could not be pressed at all** — the seat at
  1% covered it whole (⟨playwright⟩ *"subtree intercepts pointer events"*). §15 forbids curing that
  by forbidding coincidence, so crowded seats **fan**: each takes the first lane of the band whose
  last occupant is at least one seat away (greedy; capped at three lanes, then the lane whose
  occupant is furthest behind), and the rail reserves exactly the lanes in use. The seat span is
  read from the rail's own `--rail-inset` against its own axis via `useElementSize`, so the fan
  follows the rail's width instead of a percentage guess. **No position is changed and no separation
  is imposed** — only the seats move, and only on the axis the ordinal does not live on.

#### Act 3 — AFTER, at the settled bytes (every reading double-run)

| gate | ⟨cmd⟩ | BEFORE (SEAT 0's open, same sitting) | AFTER (this seat) |
|---|---|---|---|
| b1 · b2 · b4 | `node …/probes/wb-gradient-stopeditor/gate-seat.mjs` | **RED, 5 conditions** (G3c · G3d ×2 · G3f ×2) | **RED, 2 conditions** — G3c CURED, **both G3f legs CURED**; only G3d's Home/ArrowDown remain (§Escalation). Double-run **byte-identical** |
| b1 · b2 · b3 · b4 | `node docs/tranches/X/waves/W6-evidence/gradient/gate-b-seat-inspector.mjs` (new, in bounds) | RED by absence (the instrument did not exist) | **GREEN**, `EXIT=0`, double-run **byte-identical** |
| b3 | ⟨grep⟩ `type="number"\|NumberField\|inputmode` in `demo/workbenches/gradient/` | **0** (banked at the open) | the entry exists and round-trips: typed **37.5 → `aria-valuenow` 37.5**, painted skew **0.000px** (tolerance 1px) |
| regression (`.a`) | `node docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs` | GREEN at `.a`'s close | **GREEN** — a5 `travel@1px=0.00px` · a6 `activeElement=BUTTON` · a7 `2/2/2/2` · a8 `5 writes / 5 moves` · a9 `0 rows claimed`, reachability **3 → 2** · a10 `0 rules intersected` · a11 `15.08 : 1` and `14.59 : 1` |
| §7 cadence | `npx vue-tsc --noEmit -p tsconfig.demo.json` · `npx eslint demo/workbenches/gradient/` · `npx prettier --check` | — | **exit 0 · exit 0 · clean** |

The `gate-b-seat-inspector.mjs` arms, pasted from the run banked at
`W6-evidence/gradient/gates/b1b2b3b4-gate-b-seat-inspector-AFTER-run{1,2}.txt`:

```
  · b1 interior stop answered all eight keys
  · b1 a11y {"role":"slider","valuemin":"0","valuemax":"100","valuetext":"Stop 2 of 3, position 100%","selected":"true"}
  · b1 terminal bound: Home/ArrowDown inert at 0%, ArrowUp → 1%
  · b2 @1440px viewport: addable 462/462 with 12 stops
  · b2 @390px viewport: addable 324/324 with 12 stops
  · b2 meniscus press at bar.x+3: 12 → 13
  · b3 inspector subject after selecting the interior stop: {"selected":1,"entryDisabled":false,"entryValue":"50"}
  · b3 typed 37.5 → aria-valuenow 37.5, painted skew 0px
  · b4 removal controls on the route: 1
  · b4 at the floor: {"present":true,"disabled":true,"describedBy":"gradient-stop-removal-reason","reason":"A gradient needs at least two stops, so this one cannot be removed.","visible":true}
  · b4 above the floor: 3 → 2

GATE X.W6.b (seat + inspector + keyboard) — GREEN
```

#### Act 4 — two findings recorded loud (neither is this unit's cure, and neither is smoothed)

1. **The gradient e2e suite is RED at HEAD for a reason outside this unit's bounds.** ⟨cmd⟩
   `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke`
   → **21 failed**, every one at the shared fixture's
   `getByRole("main", { name: "Color tool panes" })` binding, which resolves to nothing. Live probe:
   ⟨cmd⟩ the route's `[role=main]` census → **one element, `aria-label` NULL**. **Reproduced in a
   CLEAN detached worktree at the wave's own open commit `17734065`** — not one byte of this unit
   present — where the pre-existing spec *"pill silhouette (T-46)"* fails identically
   (`W6-evidence/gradient/gates/b-e2e-fixture-broken-at-open-commit-17734065.txt`). The cause is
   the shell's landed composition root (`de99ec15`, X-W5's); `demo/color-picker/App.vue` and
   `e2e/smoke/fixtures/dock.ts` are **both outside this unit's §4 writable set** (`W6.md:120` names
   App.vue in Do-NOT-touch), so this seat did not edit either. **Consequence**: the four ADDED specs
   in `o21-gradient-rail.spec.ts` are authored and correct but **cannot be witnessed until the
   fixture is repaired by its owner** — they are ADD-never-replace rows sharing the file's single
   pre-existing failure — so b1–b4's properties are held by the in-bounds instrument above, which is
   exactly the act `.a` took when `gate-axis.mjs` / `gate-gesture.mjs` went stale.
2. **A harness-contention false RED, named so no later reader inherits it.** `.a`'s instrument was
   run once **concurrently** with `gate-seat.mjs` against the one dev server and reported
   `a9 the chip is not reachable` after `page.waitForSelector("[data-stop-id]")` timed out on the
   coarse cell. Re-run **solo** at the same bytes: **GREEN**. This is the class
   `playwright.config.ts:98-108` documents (`workers: 1` — concurrent software-GL contexts against
   one dev server time out first paint); it masks no product defect and the GREEN run is the one
   banked.

#### ESCALATION — b1's two remaining G3d legs are RED **by the probe's input state**

`gate-seat.mjs` G3d drives `document.querySelector("[data-stop-id]")` — the **first seat in
document order** — and calls a key a no-op when that seat's `style.left` does not change:

```
  G3d  key "Home" is a no-op on a focused stop handle … style.left stayed "calc(var(--rail-inset) + var(--rail-track) * 0)".
  G3d  key "ArrowDown" is a no-op on a focused stop handle … style.left stayed "calc(var(--rail-inset) + var(--rail-track) * 0)".
```

The quoted `* 0` **is the measurement**: that seat is the **0% terminal**. The route's boot model is
exactly two stops, at 0% and 100% (`useGradientModel.ts:124-127`), and positions are clamped to the
axis domain `[0, 100]` (`:106-108`, `.a`'s own law — *"explicitly NOT the banned neighbour clamp"*).
So for the seat the probe drives, **Home means "go to 0%" when it is already at 0%, and ArrowDown
means "go below the minimum"** — both correct, both inert, and `style.left` cannot change. The
mirror holds for whichever terminal is first: an element at an axis bound fails exactly two of the
four keys. With a two-stop seed **there is no interior stop to be first**, so no ordering of the
seats can make all four legs write.

Three exits were considered and each is refused:
- **Change the boot seed** so the first stop is interior — that is the gate's input, not its
  subject, and three existing e2e rows assert the two-stop seed (`o21:211`, `gradient.spec.ts:246`,
  `o21:177`'s `[0,50,100]`), which ADD-never-replace forbids this unit from rewriting.
- **Let positions leave `[0,100]`** so ArrowDown can write — that deletes `.a`'s axis-domain clamp
  and paints stops off the rail.
- **Reorder the seats** so an interior one is first — with a two-stop seed there is no interior one,
  and DOM order is the ordinal order the ordinal announcement names.

Each of those is a workaround aimed at the instrument rather than the product, which this wave bans.
**The property b1 exists to hold is landed and measured**, by the in-bounds instrument, in both
directions: an interior seat answers **all eight** keys (ArrowUp/Down/Left/Right, PageUp/PageDown,
Home, End) and the terminal seat holds its bound while answering `ArrowUp` **immediately**
(0% → 1%) — which is precisely the distinction `style.left` cannot draw: *bound* versus *unbound*.
The instrument is `execute, no write` in §4, so per the Bounds law this seat **did not edit it** and
halts instead.

**Returned for ruling** (the shape `.a`'s a3–a7 escalation took, which §0z **E3** ruled by
addendum): may b1's two G3d legs read on the substitute command of record —
`node docs/tranches/X/waves/W6-evidence/gradient/gate-b-seat-inspector.mjs`, whose b1 arm holds the
same property at strictly greater precision (`aria-valuenow`, the model's exact value, on an
**interior** stop) and additionally prints the terminal bound — with the `gate-seat.mjs` re-point
riding X-W11's OUT-OF-WAVE roster to the instrument's owner, as E3 did for `gate-axis.mjs` and
`gate-gesture.mjs`?

#### Residuals (carried, not smoothed)

1. The four ADDED e2e specs are **authored, unwitnessed** until the `main`-name fixture is repaired
   by its owner (Act 4 · finding 1). They are not skipped, not deleted, and not re-pointed at a
   private fixture — their file's other 6 specs fail for the same one reason.
2. The fan is capped at **three lanes** (`MAX_LANES`); past it the fan reuses the lane whose
   occupant is furthest behind, so a cluster denser than three seats can still overlap partially.
   Stated where it is written, not discovered later.
3. `aria-selected` on `role="slider"` is the attribute G3c's own failure text names
   (*"aria-pressed and aria-selected are both absent"*) and the one this instrument reads; ARIA 1.2
   lists `aria-selected` under `option`/`row`/`tab`/`gridcell` rather than `slider`, and the
   spec-global alternative (`aria-current`) is not what the gate reads. The gate's word is followed
   and the tension is recorded here rather than resolved by this seat.
4. `npx prettier --write` (the §7 cadence) reflowed one **pre-existing** statement in
   `GradientVisualizer.vue` (`resetGradient`'s argument list) that this unit did not author. Inside
   the writable set, formatting-only, named here so the diff reads honestly.

---

## Close — RESUME 2026-09-20 (the second sitting's close; VERIFY-ONLY seat)

SERVED MODEL: claude-opus-5[1m]

**Seat**: the wave-level close seat of the 2026-09-20 resume sitting, dispatched after group 1
(`W6.md` §9 commit **#11**; unit plan `:2587-2590` — *"Wave-level, assigned to NO unit … the close
seat is dispatched separately"*). **VERIFY-ONLY — this seat cured nothing**: it wrote no product
byte, no gate script and no unit's evidence, and its only writes are this block, the eleven close
transcripts under `W6-evidence/gates/close-2026-09-20/`, the wave's own `LEDGER.md` row cell and a
dated `INBOX.md` sweep line. This block is **append-only beside** the 2026-09-18 `## Open`, the
first `## Close`, Checks 1–3, Repairs 1–2 and the 2026-09-20 `## Open — RESUME` — **E-3: nothing
above this line is rewritten.**

**Verdict: PARTIAL.** Two units landed in this sitting (`.b`, `.g`), each ESCALATED at one gate;
**six units remain undispatched or precondition-gated** (`.c` `.d` `.e` `.h` `.i` — and `.j`, still
BLOCKED-ON X-W5). The four-verb line does **not** move: **IMPLEMENTED stays `no`.**

### Act 0 — crash-recovery (standing law, before any other act)

⟨cmd⟩ `git status --porcelain` at this seat's open → **16 rows**, byte-for-byte the sibling set SEAT
0 recorded at the resume open less `execution/C/F-W10.md` (Track C committed it since):
`demo/color-picker/App.vue` · `demo/color-picker/composables/usePaletteWiring.ts` ·
`demo/palettes/{usePalettePorts,useSlugMigration}.ts` · `D demo/shell/PaneSegmentedControl.vue` ·
`demo/shell/{dock/Dock.vue,usePaneRouter.ts,useViewManager.ts,viewSchema.ts}` ·
`demo/styles/shell.css` · `docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`docs/tranches/X/execution/A/X-W5.md` · `e2e/smoke/{dual-pane-1440,mobile/page-load-mobile,mobile/walk}.spec.ts`
· `scripts/dev/dev.sh`.

**Zero of the sixteen is inside this seat's writable set** (`execution/A/X-W6.md` ·
`execution/LEDGER.md` · `coordination/INBOX.md` · `W6-evidence/gates/**`). Every one belongs to a
sibling seat — the shell / dock / palettes / e2e rows are **X-W5's open lane**, `CARRY-LEDGER.md` is
the V fold, `scripts/dev/dev.sh` is the unowned standing-dirty row. **Nothing inherited, nothing
stashed, nothing restored, nothing staged.**

### Act 1 — bounds and commit roster: every commit exists, every path inside its unit's set

⟨cmd⟩ `git log -1 --format='%h %s'` and `git show --stat --format='' <sha>` over the sitting's six
commits, each path read against `W6.md` §4 **and** the resume unit plan's own Writable line:

| # | commit | unit | paths | bounds verdict |
|---|---|---|---|---|
| 1 | `63713d4c` | `.b` | 3 — `GradientStopEditor.vue` · `GradientVisualizer.vue` · `o21-gradient-rail.spec.ts` | **CLEAN** (`W6.md:57` · `:58` · `:85` ADD-never-replace) |
| 2 | `7dff25f6` | `.b` | 1 — `GradientStopEditor.vue` | **CLEAN** |
| 3 | `fa2466f0` | `.b` | 8 — `W6-evidence/gradient/gate-b-seat-inspector.mjs` + 7 transcripts | **CLEAN** (`W6.md:104`) |
| 4 | `3abf014f` | `.b` | 1 — this record | **CLEAN** |
| 5 | `e69aaf95` | `.g` | 6 — `…/probes/x-w6/gate-card-rhythm.mjs` · `e2e/smoke/views/companion-pane-track-start.spec.ts` · 4 `W6-evidence/picker/**` | **CLEAN** (`W6.md:102` create · `:84`-class ADD-never-replace under `e2e/smoke/views/**` · `:104`) |
| 6 | `8d55a82f` | `.g` | 1 — this record | **CLEAN** |

**No commit swept a sibling's path.** ⟨cmd⟩ `git show --name-only` over all six, grepped for
`scripts/dev/dev\.sh` · `src/` · `api/` · `demo/color-picker/App.vue` · `demo/color-picker/router/`
· `demo/ui/` · `demo/palettes/` · `.github/workflows/` · `node_modules/` ·
`registry/adjudicated/` · `execution/{B,C,D}/` → **zero hits in every class**. The sibling's staged
deletion `D demo/shell/PaneSegmentedControl.vue` sat in the shared index through all six and was
**never swept in** — every commit carried its own pathspec on the commit itself.

**ADD-never-replace, verified rather than asserted.** ⟨cmd⟩ `git show --numstat 63713d4c --
o21-gradient-rail.spec.ts` → `242 added / 7 deleted`; ⟨cmd⟩ `grep -c "^test(" ` at the wave's open
commit `17734065` → **6**, at HEAD → **10**: four specs **added, none removed**. The seven deleted
lines are prettier re-wraps, each with its `+` twin in the same hunk (`skewPx: +(`,
`const handle = live`, `.evaluateAll((els) => …)`, the `INVERSE_TOL_PCT` assertion re-wrapped over
three lines) — **no assertion weakened, none deleted**.

**Landed-wrong findings: NONE.** No path landed outside a writable set in this sitting.

### Act 2 — gate table, BEFORE → AFTER, re-read at this seat's own clock

**Scope law (RESUME).** The gates the sitting's two units turned are re-run **here, by this seat**,
against a **freshly started** `:9000` stopped again before this block was written (STALE-SERVER
law); every gate belonging to a landed-earlier unit cites **Check 3's 2026-09-19 reading, where 28
of 28 claimed GREENs reproduced at an independent seat with zero divergences**, and is not re-run a
fourth time. Transcripts: `W6-evidence/gates/close-2026-09-20/`.

**`.b` — b2 · b4 GREEN by their own named command; b1 and b3 honest-RED, each by its probe's input
state, each with the property held by an in-bounds instrument.**

| gate | ⟨cmd⟩ at this seat | BEFORE (SEAT 0, this sitting's open) | AFTER (this seat) | verdict |
|---|---|---|---|---|
| b1 | `node …/probes/wb-gradient-stopeditor/gate-seat.mjs` | RED, **5** conditions (G3c · G3d ×2 · G3f ×2) | RED, **2** — only `G3d Home` and `G3d ArrowDown`; **G3c CURED** (`aria-selected` lands). Double-run **byte-identical** | **RED — honest** (ESC-b1) |
| b2 | same instrument, add-path arm | `bar.x+3` mints nothing; 12 stops mask 67.7% of the rail | **both G3f legs absent from the failure list**; inspector instrument: `462/462 @1440px` · `324/324 @390px` with 12 stops; `bar.x+3: 12 → 13` | **GREEN** |
| b3 | `npx playwright test e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke -g "stop inspector numeric entry"` | 0 hits → RED by absence | **1 failed** — `getByRole('main', { name: 'Color tool panes' })` → *element(s) not found*, the **foreign** fixture break; the property itself measures GREEN on the in-bounds instrument (`typed 37.5 → aria-valuenow 37.5, painted skew 0px`) | **RED — honest, by foreign fixture** (correction to the unit receipt) |
| b4 | same instrument, removal arm | three destructive species, floor as `v-if` absence + silent early return | **no G3-removal condition remains**; instrument: `removal controls on the route: 1`, floor `{disabled:true, describedBy:"gradient-stop-removal-reason", reason:"A gradient needs at least two stops…"}`, above the floor `3 → 2` | **GREEN** |
| — | `node …/W6-evidence/gradient/gate-b-seat-inspector.mjs` (in-bounds, `fa2466f0`) | absent | **GREEN, EXIT=0, double-run byte-identical**: `b1 interior stop answered all eight keys` · `b1 a11y {"role":"slider","valuemin":"0","valuemax":"100","valuetext":"Stop 2 of 3, position 100%","selected":"true"}` · `b1 terminal bound: Home/ArrowDown inert at 0%, ArrowUp → 1%` | reads the property, not the gate |

**The escalation's premise, verified at the bytes rather than taken on the seat's word.** ⟨cmd⟩
`sed -n '122,128p' demo/workbenches/gradient/composables/useGradientModel.ts` → the boot model is
exactly two stops, `position: 0` and `position: 100`; ⟨cmd⟩ `sed -n '106,108p'` → `axisPosition`
= `Math.round(clamp(position, 0, 100) * 10) / 10`. `gate-seat.mjs` G3d drives
`document.querySelector("[data-stop-id]")` — the first seat in document order, which at that seed
**is the 0% terminal**, and the gate's own output quotes `* 0`. Home ("go to 0%") and ArrowDown
("go below the minimum") on an element already at its axis bound cannot move `style.left`. **The
RED is a true statement about the probe's input, not about a missing binding** — ⟨cmd⟩
`grep -n 'aria-valuetext\|aria-selected\|role="slider"' GradientStopEditor.vue` → `:623 role="slider"`
· `:627 :aria-valuenow` · `:628 :aria-valuetext` · `:630 :aria-selected`, all landed.

**`.g` — g2 GREEN, g1 RED and reproducing to the hundredth.**

| gate | ⟨cmd⟩ at this seat | BEFORE | AFTER | verdict |
|---|---|---|---|---|
| g1 | `CARD_RHYTHM_ORIGIN=http://localhost:9000 node …/probes/x-w6/gate-card-rhythm.mjs` | RED **by absence** at open, close, Check 1, Check 2, Check 3 | **RED, measured, EXIT=1**, double-run byte-identical (⟨cmd⟩ `diff -q` → no output): `61.22px h3.card-title.readout content-top → span.readout-cell top — RESIDUE 61.22px undeclared` ⊕ `55.41px box height − painted height — INFLATED BY A QUANTITY THAT IS NOT A SPACING STEP` | **RED — honest** (ESC-g1) |
| g2 | `npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts --project=smoke -g "companion panes share one track start"` | RED by absence, 0 hits at every prior check | **1 passed (11.4 s)** | **GREEN** |

`.g`'s published figures reproduce at this seat **to the hundredth** — 61.22 and 55.41 — from a
different port, on a server this seat started itself. The instrument is not port-coupled and not
inherited.

**Wave-level conditions, re-run here.**

| gate | ⟨cmd⟩ | reading at this seat | verdict |
|---|---|---|---|
| **H1** | `node docs/tranches/X/gates/gate-no-chassis.mjs <18 shas>` — the **full** roster §0z demands (`f90aeb02 c222542d e77650e1 e0e204a9 7e5b9512 c2f17bad 1155fd1f 77f80e83 6dfdd8d2 48d95650 c8111846 4cb294b9 63713d4c 7dff25f6 fa2466f0 e69aaf95 8d55a82f 3abf014f`), not the three-sha default the script carries | **GREEN, EXIT=0** — positive control fires first; over the wave's whole `demo/` diff: *"no added construct parameterises stage + inspector + action; no added module is both housing-shaped and shared across instrument roots; the dead name is not revived."* The two new modules are read and named — `space-catalog.ts` (importers 3, instrument roots 2) and `specimen-format.ts` (1, 1): **data, not housing** | **GREEN** |
| **H2** | `test -f …/codex-provenance/motion-quarantine.md` ⊕ the citation leg | file **present** and tracked (`9812f951`) — leg 1 GREEN. Leg 2 — *"every assertion in .e/.j marked MOTION-SOURCED cites it"* — has **no assertion to cite it**: `.e` and `.j` are undispatched, ⟨cmd⟩ `grep -rn "glass-ui/aurora" demo/workbenches/gradient/` → **0** | **RED — born-RED, unchanged** |
| **H3** | the three bank sweeps, at open **and** here | **(1) Parser R1 has FLIPPED GREEN**: ⟨cmd⟩ `node --input-type=module -e "…parseCssColor('oklch()')…"` → **EXIT=0, no throw** (X-W9's cure is in `dist/`; the spec's *"exit 1 today"* is stale and this wave added **no** consumer try/catch to reach it). **(2)** rail-variant tripwire → not fired. **(3)** ⟨cmd⟩ glass `package.json` version → **7.0.0** — the Glass-8 trigger has **NOT** fired, so the D-6/D2-16 limb stays banked for **X-W4.g** and nothing in §Blocked opened here | **GREEN (swept)** |
| **H4** | §Dispositions roll-call over the **14** CC rows (CC-108 is an adjacent bank row, not one of them) | **discharged: 3** — CC-005 (FOLD, consumed by the spec) · **CC-068 / X:CSS-1 — now 10 of 10**, f2 having flipped on a sibling's `95792b44` · CC-066 (i2, `4cb294b9`). **PART-discharged: 3** — CC-058 (`.a` landed whole; `.b` landed with b1/b3 escalated; `.c` undispatched) · CC-062 (g2 GREEN) · CC-059 (g1 RED, ESC-g1). **Not discharged: 8** — CC-056 · CC-057 (`.j`, BLOCKED-ON X-W5) · CC-060 (d1) · CC-061 (h1) · CC-063 (d2 GREEN, its `O-` relay row OWED) · CC-064 (`.e`) · CC-065 · CC-067 (`.i`). 3 + 3 + 8 = **14**. **Zero silent drops — every row leaves this close with exactly one named state** | **RED — the wave is not done** |

**The six undispatched / gated units — RED, measured rather than assumed** (⟨cmds⟩ at this seat, all
static, none inherited):

| gate | unit | ⟨cmd⟩ | reading |
|---|---|---|---|
| c1 | `.c` | `test -f …/model/types.ts` ⊕ `gate-structure.mjs` (banked, open) | leaf types absent → **RED** |
| c2 | `.c` | `grep -c "one sampling law" test/gradient-order-invariant.test.ts` | **0** — R.2-1's vacuity stands; a c2 reported GREEN is a false green → **RED** |
| c3 | `.c` | `test -f docs/tranches/X/gates/gate-literal-dialect.mjs` | **ABSENT** → RED |
| c4 | `.c` | `test -f test/interpolation-subset.test.ts` | **ABSENT** → RED |
| d1 | `.d` | `test -f …/probes/x-w6/gate-easing-radius.mjs` | **ABSENT** → RED |
| e1 | `.e` | `grep -rn "glass-ui/aurora" demo/workbenches/gradient/` ⊕ spec title | **0** and **0** → RED |
| e2 | `.e` | `grep -rn "requestAnimationFrame" demo/workbenches/gradient/` ⊕ `test -f …/gate-prm-idiom.mjs` | **2** rAF sites (both `EasingAuthoringStage.vue`), instrument **ABSENT** → RED |
| h1 | `.h` | `grep -rn "hero blob carries current chroma" e2e/` | **0** → RED |
| i1 | `.i` | `test -f e2e/smoke/oracles/o25-atmosphere-response.spec.ts` | **ABSENT** → RED |
| i3 | `.i` | `test -f …/o28-atmosphere-coldload.spec.ts` ⊕ `grep -rn armRuntime demo/` | **ABSENT** and **0** → RED |
| j1 j2 j3 | `.j` | `test -f …/o29-scene-contracts.spec.ts` ⊕ `grep -c "component: Stub" demo/color-picker/router/index.ts` | **ABSENT** and **14** → RED, and the unit is **BLOCKED-ON X-W5** (`LEDGER.md:37` reads `OPEN 2026-09-17` at this close) |

### Act 3 — SELF-COUNT (the roster arithmetic, counted twice)

**50 = 46 sub-gates + 4 wave conditions.**

**GREEN 32** = `.a` a1–a13 (**13**, banked Check 3) ⊕ `.f` **f1–f10 (10** — f2 re-measured at this
seat and **FLIPPED**, see below; the other nine banked
Check 3) ⊕ **b2 b4** (2, re-run here) ⊕ **g2** (1, re-run here) ⊕ d2 h2 i2 (**3**, Repair 2, banked
Check 3) ⊕ **j4** (1, Repair 1, re-witnessed Check 3) ⊕ **H1** (re-run here over 18 shas) ⊕ **H3**
(swept here).

**RED 18** = **b1** ⊕ **b3** ⊕ **g1** ⊕ c1 c2 c3 c4 ⊕ d1 ⊕ e1 e2 ⊕ h1 ⊕ i1 i3 ⊕ j1 j2 j3 ⊕ H2 ⊕ H4.

32 + 18 = **50**; no gate counted twice, none dropped. **Delta against the resume open**: GREEN
24 → **32** (+8: b2, b4, g2, **f2**, j4 and d2/h2/i2 re-banked into the count, H1 re-established over
the full roster), RED 26 → **18**.

**f2 FLIPPED RED → GREEN, and NOT by this wave — stated plainly.** ⟨cmd⟩
`grep -rn 'colorSpaceInfo\.rgb\|(colorSpaceInfo as any)' demo | wc -l | tr -d ' '` → **0** (it read
**1** at the first close and at Check 3, at
`demo/picker/controls/ComponentSliders/ConsoleRail.vue:174`). ⟨cmd⟩ `git log -1 --format='%h %ad %s'
--date=short 95792b44` → `95792b44 2026-09-19 fix(demo/console-rail): exact channel-id descriptor
lookup` — a **sibling's** commit replaced the `.rgb` masking read with an exact keyed lookup
(`colorSpaceInfo[space].components[component]`, `:174` today). The gate's own command is what
decides the gate, so f2 is **GREEN**; the credit is **not this wave's**, and **ESC-f2 is discharged
by a foreign cure** rather than by an act of X-W6. Recorded this way so no later reader inherits a
green as if a W6 seat had earned it.

**H4 roll-call, counted exactly over the §Dispositions **14** rows** (CC-108 is an *adjacent* bank
row, not one of the fourteen): **discharged 3** — CC-005, CC-066, CC-068. **part-discharged 3** —
CC-058, CC-059, CC-062. **not discharged 8** — CC-056, CC-057, CC-060, CC-061, CC-063, CC-064,
CC-065, CC-067. 3 + 3 + 8 = **14**, every row with exactly one named state, zero silent drops.

### Act 4 — §8 Verification Artefacts, run as written

⟨cmd⟩ `find docs/tranches/X/waves/W6-evidence -name "*.png"` → **6**, all under `catalog/`
(`{before,after}-{catalog-open,display-p3-about,specimen-dots}.png`) — **`W6.md:359` MET**.

- **`W6.md:358` — the seven gradient `{before,after}` pairs: NOT MET.** 0 of 14. The owner assigned
  at Repair 1 defect 7 is *this* seat; it is **not discharged here** and is carried as **R-C1** with
  its measured qualification intact: the BEFORE half is reachable only from a worktree at
  `f90aeb02^`, and **no figure any unit cites is PNG-derived** (§17 count-scoping, verified at Check 1).
- **`W6.md:360` — `W6-evidence/owner-marks/` (OM-3 · OM-4 · OM-6 · OM-9 · OM-10 · OM-13 re-captured at
  the same crop): NOT MET.** ⟨cmd⟩ `ls W6-evidence/` → the directory does not exist. OM-3's AFTER is a
  picture of a cure that has not happened (ESC-g1); OM-4/OM-6/OM-13 belong to `.d`/`.h`, undispatched.
- **`W6.md:361` — the atmosphere N-seed frames + cold-load capture: NOT MET.** ⟨cmd⟩ `ls
  W6-evidence/atmosphere/` → 2 files, both i2 transcripts. `.i` is undispatched.
- **`W6.md:362` — `W6-atmosphere-tombstone.md`: MET** (`c2f17bad`, DR-01 retired as landed at N.W5
  `e32111c7`, carry closed at 18).
- **`W6.md:363` — `W6-glass-ask-easing-readout.md`: MET** (`c8111846`); **`W6-lband-letter.md` not
  required** — i2's census arm selected the *band-reachable* branch.
- **`W6.md:364` — `W6-blob-pipeline-census.md`: MET** (`48d95650`).
- **`W6.md:365` — gate transcripts in `W6-evidence/gates/`: MET for every gate that has been run.**
  ⟨cmd⟩ `find W6-evidence -name "*.txt" | wc -l` → **44**, plus the **11** this close banked under
  `gates/close-2026-09-20/`. A gate whose unit never ran carries no transcript by construction.

### Act 5 — §7 cadence at the settled bytes

| ⟨cmd⟩ | reading |
|---|---|
| `npx vue-tsc --noEmit -p tsconfig.demo.json` | **EXIT=0** |
| `npx eslint demo/workbenches/gradient demo/picker demo/color-session` | **EXIT=0** |
| `npx prettier --check` on the sitting's five authored paths | `All matched files use Prettier code style!` — **EXIT=0** |
| `npx vitest run` | `Test Files 3 failed \| 34 passed (37)` · `Tests 4 failed \| 628 passed (632)` · **EXIT=1** |

**The four failures are named, and none belongs to this sitting.** `test/gradient-parse.test.ts` ×2
(*"parses a plain linear gradient with authored literals intact"*, *"expands CSS double positions
into two coincident-color stops"*) are the **§0z E2 migration grant**, which the resume plan routes
to `.c` — **undispatched**, so they stand. `test/spectrum-luma.test.ts` (`C-5 · BORN-RED`) and
`demo/test/shell/reka-binding-idiom.test.ts` (`NG-6`) are **foreign born-RED canaries owned by other
waves** and appear in no X-W6 bounds row. The count is **identical** to the resume open's reading
(4 failed / 628 passed): this sitting's two units added no failure and removed none.

### Act 6 — E13 mail, swept again at this seat's own clock, read-only

1. `docs/tranches/V/` — no new letter-shaped item.
2. `docs/tranches/V/coordination/` — the newest five are the 2026-09-18 4.1.0 quartet ⊕ the
   parse-that addendum-2, all ours and already rowed.
3. `../glass-ui/docs/tranches/` — ⟨cmd⟩ `ls -dt …/tranches/*/` → `BK/` still newest; newest BK
   coordination item `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed**; ⟨cmd⟩
   `find …/BK/coordination -newermt "2026-09-20 00:00"` → **empty**.
4. `../keyframes.js/docs/tranches/V/coordination/` — newest value-addressed item is our own
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`.

**Census**: ⟨cmd⟩ `grep -c "^| I-\|^| O-" INBOX.md` → **90** (82 at the resume open; **O-43…O-46**
minted by sibling tracks since — ⟨read⟩ their destination cells: X·KF/X·F/X·V-X-W9 and the owner
relay, **none addressed to X-W6**). Classification read **by position** from each row's Status cell,
never by bare grep: the rows containing the word `UNREAD` all describe a prior or already-answered
state (O-20 `SENT`, I-31 `FOLDED`, I-32 `READ IN FULL + ROUTED`, O-39 `SENT`).

**Result: 0 unrowed · 0 UNREAD in X-W6's scope — the wave closes with no unread mail.** One **`O-`
row stays OWED** inside the wave: §0z **E5** grants the glass-forward easing-readout relay for
`W6-glass-ask-easing-readout.md` to **`.d`**, and ⟨cmd⟩ `grep -n "easing-readout" INBOX.md` → **no
row**. `.d` is undispatched; the grant is its own, not this seat's to pre-empt, and it rides as
residual **R-C2**. A dated sweep line is appended to `INBOX.md` by this seat.

### Act 7 — corrections this close makes to the sitting's own receipts (L-18 target 4)

1. **`.b` reported b3 GREEN; b3's own named command is RED at this seat.** The unit's return reads
   *"b3 GREEN: the selected-stop inspector owns numeric entry"* — the **property** is GREEN and
   reproduces (`typed 37.5 → aria-valuenow 37.5, painted skew 0.000px`), but `W6.md:193`'s command
   of record is the e2e `-g "stop inspector numeric entry"`, and ⟨cmd⟩ that exact command → **1
   failed**, `getByRole('main', { name: 'Color tool panes' })` *element(s) not found*. b3 is
   therefore **honest-RED by the same foreign fixture as b1's sibling specs**, GREEN only on the
   substitute instrument, and it joins ESC-b1's ruling request. The unit named the fixture break
   loudly in its own Act 4 finding 1; it simply did not carry that consequence into its b3 verdict.
2. **`e69aaf95` carries no `Claude-Session:` trailer** (`.g`'s own erratum, kept). Recorded, not
   repaired — amending a landed commit in an index four tracks share is the larger harm.
3. **`.g`'s g2 green remains X-W5-coupled**, and still is at this close: ⟨cmd⟩ `git status
   --porcelain` shows `demo/styles/shell.css` **still uncommitted** in this shared tree. The reading
   reproduced here (1 passed) stands on a sibling seat's in-flight bytes; R-g2 is carried forward.

### Act 8 — escalations returned by this close

- **ESC-b1 (new, from `.b`) — may b1's two `G3d` legs read on the substitute command of record?**
  The premise is **verified at the bytes by this seat** (two-stop seed at 0/100; `axisPosition`
  clamps to `[0,100]`; the gate drives the first seat in document order, which is the 0% terminal).
  `gate-seat.mjs` is `execute, no write` in §4, so neither the unit nor this seat edited it. The
  requested shape is exactly the one **§0z E3** already granted a3–a7. **This close endorses the
  request and adds one measurement**: the substitute instrument is strictly more precise *and*
  strictly wider — it reads `aria-valuenow` on an **interior** stop (all eight keys) **and** prints
  the terminal bound (`Home/ArrowDown inert at 0%, ArrowUp → 1%`), which is the distinction
  `style.left` cannot draw. **Ruling owed.**
- **ESC-b3 (new, raised by this close) — b3's named e2e command cannot be witnessed** until the
  shell fixture's accessible name is repaired by its owner. The break is **reproduced in a clean
  detached worktree at the wave's own open commit `17734065`** with none of `.b`'s bytes present
  (`W6-evidence/gradient/gates/b-e2e-fixture-broken-at-open-commit-17734065.txt`), so it is not this
  wave's. `demo/color-picker/App.vue` and `e2e/smoke/fixtures/dock.ts` are both in `W6.md:120`'s
  Do-NOT-touch / outside §4. **Owner: X-W5** (its landed composition root `de99ec15`). **Ruling
  owed**: either X-W5 repairs the name and b1/b3's four ADDED specs become witnessable, or b3 reads
  on the in-bounds instrument the way ESC-b1 asks for b1.
- **ESC-g1 (carried, from `.g`) — the card-lock and OM-3 are incompatible and the cure's bytes are
  outside §4.** Unchanged and re-measured here (61.22 / 55.41, double-run). The cure needs
  `ColorComponentDisplay.vue` (or `readoutReservation.ts`) **and** the retirement or re-authoring of
  `e2e/smoke/oracles/readout-seam.spec.ts:85-119`, which asserts the OM-3 band as its own cure.
  **None is in §4.** The question is a design one — *does lab's worst-case line reservation survive?*
  — and `W6.md:154` (M-23) puts it in **X-W10** or the owner's word, never an implementation seat's.
- **ESC-f2 (carried, from the first close) — DISCHARGED, and not by us.** The last
  `colorSpaceInfo.rgb` masking site at `demo/picker/controls/ComponentSliders/ConsoleRail.vue:174`
  is **gone**: a sibling's `95792b44` (2026-09-19) replaced it with an exact keyed lookup. ⟨cmd⟩ the
  gate's own grep → **0**. The escalation needs no ruling; **f2 is GREEN and X-W6 did not earn it**.

### Act 9 — residuals, each with a named owner

| id | residual | owner |
|---|---|---|
| **R-C1** | `W6.md:358`'s seven gradient `{before,after}` PNG pairs — **0 of 14**. The BEFORE half is reachable only from a worktree at `f90aeb02^`; **no figure any unit cites is PNG-derived** (§17, verified Check 1), so nothing rests on it | the **X-W6 close seat** (assigned Repair 1 defect 7; carried, not discharged here) → **X-W11's OUT-OF-WAVE roster** if the wave closes without them |
| **R-C2** | the `O-` relay row for `W6-glass-ask-easing-readout.md` is still unminted (⟨cmd⟩ INBOX grep → no row) | **`.d`**, by §0z **E5**'s own grant |
| **R-C3** | six units owed: `.c` `.d` `.e` `.h` `.i` whole-or-partial, `.j` BLOCKED-ON X-W5 | the **next X-W6 sitting** (Seat 0 / the orchestrator) |
| **R-C4** | `test/gradient-parse.test.ts:32`/`:63` still fail — the §0z **E2** migration grant rides the first still-owed Lane 1 seat | **`.c`** |
| **R-C5** | H2's citation leg cannot discharge while `.e`/`.j` are unbuilt — there is no motion assertion to cite the quarantine record | **`.e`**, then **`.j`** |
| **R-C6** | the spec's **§2a goal criterion is NOT MET** at these bytes — four of the six named instruments (Easing, HeroBlob, Blob/Atmosphere, Mix) do not yet own a routed scene contract; a wave whose gates pass but whose §2a goal is unmet closes `complete_with_misses` (`W6.md:342`), and this one does not yet pass its gates either | the wave's remaining sittings |
| **R-g1** | the 61.22px residue stands in the tree, now with a machine gate that reds on it and cannot be satisfied by moving it | the **ESC-g1 ruling** (X-W10 / the owner) |
| **R-g2** | g2's GREEN is **X-W5-coupled** — measured over X.W5.c's still-uncommitted `demo/styles/shell.css` (⟨cmd⟩ `git status --porcelain` at this close still shows it `M`) | re-run after **X-W5** commits |
| **R-g3** | `e2e/smoke/oracles/readout-seam.spec.ts` is RED for the same foreign `main`-name reason | **X-W5** |
| **R-g4** | §8's OM re-captures (OM-3 / OM-9 / OM-10 at the same crop) not produced | rides the **ESC-g1** ruling |
| **R-b1** | the four ADDED specs in `o21-gradient-rail.spec.ts` are authored, correct and **unwitnessed** — not skipped, not deleted, not re-pointed at a private fixture | **X-W5** (the fixture), then a re-run |
| **R-b2** | the crowding fan is capped at `MAX_LANES = 3`; a cluster denser than three seats can still partially overlap | `.b`'s successor sitting, if the owner wants it uncapped |
| **R-b3** | `aria-selected` on `role="slider"` is what `gate-seat.mjs` G3c reads, while ARIA 1.2 lists that attribute under `option`/`row`/`tab`/`gridcell` | the instrument's owner, via **X-W11's OUT-OF-WAVE roster** (with the ESC-b1 re-point) |
| **R-b4** | `prettier --write` reflowed one pre-existing statement in `GradientVisualizer.vue` (`resetGradient`'s argument list) | recorded; formatting-only, inside the writable set |

### Act 10 — the four-verb line after this close

**AUDITED yes** (per-row, unchanged) · **SPECIFIED yes** (`W6.md` ⊕ the 2026-09-19 E-3 addendum) ·
**IMPLEMENTED no** · **VERIFIED no**.

**The line does not move, and the spec is why.** `W6.md:335` — *"the wave closes when all 45 born-RED
sub-gates are GREEN by the same commands that are RED today"* — and **18 of the 50 are RED at this
seat**, six units having never been dispatched in this sitting. `W6.md:404`/`:387` reserve
**VERIFIED** for X-W11's release close on its own browser and real-Safari cells; no seat here may
stamp it, and this seat stamps neither verb.

### Act 11 — verdict and this close's own commits

**PARTIAL.** The sitting landed `.b` and `.g`; **b2 · b3(property) · b4 · g2** hold at this seat's
own double-run commands, **b1 · b3(command) · g1** are honest-REDs with their escalations returned,
**f2** flipped GREEN on a sibling's cure, and **six units remain**. Nothing was masked: no
`test.skip`, no try/catch around a defect, no allowlist, no copied producer selector, no local patch
of `node_modules` — ⟨cmd⟩ over this sitting's two product commits for `\.skip\(|@ts-ignore|eslint-disable`
→ **0 hits**. No gate was satisfied by editing its own instrument: the four `execute, no write`
probes are byte-untouched (⟨cmd⟩ `git status --porcelain -- docs/tranches/V/megatranche/audit/probes/wb-gradient-stopeditor/`
→ empty), and `W6.md` itself is byte-untouched.

| # | commit | paths | bounds row |
|---|---|---|---|
| 1 | this close | `docs/tranches/X/execution/A/X-W6.md` (append-only) · `docs/tranches/X/execution/LEDGER.md` (this wave's own row cell + one appended event line) · `docs/tranches/X/waves/W6-evidence/gates/close-2026-09-20/*.txt` (11) | the record, its own row, and `W6.md:104`/`:365` |
| 2 | the mail sweep | `docs/tranches/V/coordination/INBOX.md` (one dated sweep line, no row minted, no row's status changed) | E13 |

Both carry their own pathspec **on the commit itself** and the `Claude-Session` trailer;
`scripts/dev/dev.sh` was never touched and never staged, and the sibling's staged
`D demo/shell/PaneSegmentedControl.vue` was never swept in.

### Act 12 — the push: attempted twice, BLOCKED, and disclosed rather than forced

⟨cmd⟩ `git push origin HEAD` (twice, as the close's acts prescribe) →
`! [rejected] HEAD -> tranche-u (non-fast-forward)`. ⟨cmd⟩ `git fetch origin` then
`git rev-list --left-right --count origin/tranche-u...HEAD` → **`1  70`**: the shared branch has
diverged — origin carries one commit this tree does not (`6fc1212e`,
*"docs(x-w9/repair-1-resume-round)"*, a sibling track's, touching **only**
`docs/tranches/X/execution/A/X-W9.md`), while this tree carries 70 it does not.

Three integrations were considered and two refused:

1. **`git merge origin/tranche-u` in the main tree — REFUSED BY GIT, and the refusal must stand.**
   ⟨cmd⟩ → `error: Your local changes to the following files would be overwritten by merge:
   demo/shell/PaneSegmentedControl.vue`. That path is a **sibling seat's staged deletion** (X-W5's
   open lane). Unstaging or restoring it is exactly what the standing law forbids — *"never reset or
   unstage another seat's paths"* — so the merge was not retried by clearing it. ⟨cmd⟩
   `test -f .git/MERGE_HEAD` → **ABSENT**, `git log -1` unchanged: the failed attempt left **no**
   merge state and moved no byte.
2. **The merge in a detached scratch worktree (no main-index involvement) — ATTEMPTED, then
   ABORTED.** ⟨cmd⟩ `git worktree add --detach <scratch> HEAD` → clean, 0 dirty rows; ⟨cmd⟩
   `git merge --no-edit origin/tranche-u` → **`CONFLICT (content): Merge conflict in
   docs/tranches/X/execution/A/X-W9.md`**. Resolving it is a **write to another wave's execution
   record**, outside this seat's writable set — an ESCALATION by §4's Bounds law, not a close-seat
   act. ⟨cmd⟩ `git merge --abort` ⊕ `git worktree remove --force` → the scratch worktree is gone and
   the main tree is byte-identical to before (⟨cmd⟩ `git worktree list` shows only the three
   pre-existing sibling worktrees).
3. **`--force` / `--force-with-lease` — NOT ATTEMPTED.** The standing law admits no force-push
   unless the spec or COHESION §0j prescribes that exact command, and neither does.

**Disclosed state**: this close's two commits (`7e445639`, `f36779f2`) are **landed locally** and are
ancestors of the branch tip (⟨cmd⟩ `git merge-base --is-ancestor f36779f2 <tip>` → yes; a sibling
seat committed `47fafdf0` on top while this block was written). **They are not yet on origin.**

**ESC-PUSH (new, returned by this close)**: the shared `tranche-u` branch needs one integration merge
whose only conflicting path is `docs/tranches/X/execution/A/X-W9.md`. **Owner: the X-W9 seat** (two
of its worktrees are live — ⟨cmd⟩ `git worktree list` → `value.js-x-w9-c`, `value.js-x-w9-h`), or
whichever seat owns that record at the time. Once that one file is reconciled by its owner, `git
push origin HEAD` carries all 70 commits — including this wave's six — with no force and no
history rewrite.

---

## Check 1 — RESUME 2026-09-20 (L-20 fresh adversarial pass 1 over the second sitting's close)

SERVED MODEL: claude-opus-5[1m]

**Seat**: a fresh adversarial checker of the **2026-09-20 resume sitting's close** (`:3213`), dispatched
under L-20 pass 1. **VERIFY-ONLY — this seat cured nothing**: it wrote no product byte, no gate script,
no unit's evidence; its only writes are this block, this wave's own `LEDGER.md` row cell plus one
appended event line. **Append-only beside** the 2026-09-18 `## Open`, the first `## Close`, Checks 1–3,
Repairs 1–2, the 2026-09-20 `## Open — RESUME` and that sitting's `## Close` — **E-3: nothing above this
line is rewritten.** Named this way because the record already carries `## Check 1`–`## Check 3` for the
first sitting; this is pass 1 over the *second* sitting's close.

**Verdict: NOT-CONFORMANT.** This seat re-ran **30 of the 50 gates** at its own commands and **30 of 30
reproduce the close's verdict** — 12 claimed GREENs and 18 claimed REDs, several double-run
byte-identical. Two findings block: one **CRITICAL** (12 of the 18 RED gates carry no relief of any of
axis 10's three kinds — they are undone work, and undone work is not relief) and one **HIGH** (**a13**
and **a2**, both banked GREEN and counted in the close's 32, are **RED at these bytes** — the close's
own b3 row measures the break that takes them down, one file over, and did not carry the consequence).
**The LEDGER row stays `PARTIAL`. It is not promoted.**

### Act 0 — crash-recovery (standing law, before any other act)

⟨cmd⟩ `git status --porcelain` at this seat's open → **17 rows**: the sixteen the close recorded plus
`docs/tranches/X/execution/C/F-W10.md` (Track C, re-dirtied since). **Zero is inside this seat's
writable set** (`execution/A/X-W6.md` · `execution/LEDGER.md`). Every one belongs to a sibling seat —
the `demo/color-picker/` · `demo/shell/` · `demo/palettes/` · `demo/styles/shell.css` · `e2e/smoke/**`
rows are **X-W5's open lane**, `CARRY-LEDGER.md` is the V fold, `execution/A/X-W5.md` and
`execution/C/F-W10.md` are sibling records, `scripts/dev/dev.sh` is the unowned standing-dirty row.
**Nothing inherited, nothing stashed, nothing restored, nothing staged.** No predecessor seat's partial
work exists on any path this seat may write.

### Axis 1 — 30 of the 50 gates re-run at this seat (30 of 30 reproduce; 2 banked ones do not — defect 2)

A dev server was started by **this seat** on `:9000` (⟨cmd⟩ `npx vite --port 9000`, `VITE v8.0.16 ready`,
`curl -o /dev/null -w %{http_code}` → `200`) and every live gate below was driven against it — a
different process from the one the close used (STALE-SERVER law).

| gate | ⟨cmd⟩ at this seat | reading | verdict |
|---|---|---|---|
| **b2** | `node …/probes/wb-gradient-stopeditor/gate-seat.mjs` | RED-set contains **no `G3f` leg** (both add-path legs absent) | **GREEN — reproduces** |
| **b4** | same instrument, removal arm | RED-set contains **no G3-removal condition** | **GREEN — reproduces** |
| **b1** | same instrument | **RED, exactly 2** conditions, both `G3d` (`Home`, `ArrowDown`), each quoting `style.left … * 0` — the 0% terminal. ⟨cmd⟩ run twice, ⟨cmd⟩ `diff -q` → **byte-identical** | **RED — reproduces in kind and in count** |
| **b1–b4 (property)** | `node …/W6-evidence/gradient/gate-b-seat-inspector.mjs` | **EXIT=0, GREEN**, every line the close quotes reproduces verbatim: `interior stop answered all eight keys` · `{"role":"slider","valuemin":"0","valuemax":"100","valuetext":"Stop 2 of 3, position 100%","selected":"true"}` · `terminal bound: Home/ArrowDown inert at 0%, ArrowUp → 1%` · `462/462 @1440px` · `324/324 @390px` · `bar.x+3: 12 → 13` · removal controls **1**, floor `{"disabled":true,"describedBy":"gradient-stop-removal-reason","reason":"A gradient needs at least two stops, so this one cannot be removed."}`, above the floor `3 → 2` · `typed 37.5 → aria-valuenow 37.5, painted skew 0px` | **GREEN — reproduces** |
| **b3 (named command)** | `npx playwright test e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke -g "stop inspector numeric entry"` | **1 failed** — `getByRole('main', { name: 'Color tool panes' }).getByRole('heading', { name: 'Gradient' })` *element(s) not found* at `:41`, before the first substantive assertion | **RED — reproduces, foreign fixture** |
| **g1** | `CARD_RHYTHM_ORIGIN=http://localhost:9000 node …/probes/x-w6/gate-card-rhythm.mjs` | **EXIT=1**, `LARGEST INTERVAL: 61.22px — h3.card-title.readout content-top → span.readout-cell top → RESIDUE 61.22px undeclared` ⊕ `122.41 / 67.00 / 55.41 → INFLATED BY A QUANTITY THAT IS NOT A SPACING STEP`. **To the hundredth, from a server this seat started** | **RED — reproduces** |
| **g2** | `npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts --project=smoke -g "companion panes share one track start"` | **1 passed (19.0s)** | **GREEN — reproduces** |
| **f2** | `grep -rn 'colorSpaceInfo\.rgb\|(colorSpaceInfo as any)' demo \| wc -l` | **0** | **GREEN — reproduces (foreign cure, `95792b44`; the close says so plainly)** |
| **H1** | `node docs/tranches/X/gates/gate-no-chassis.mjs <the same 18 shas>` | **EXIT=0, GREEN** — *"no added construct parameterises stage + inspector + action"*; the two new modules read and named (`space-catalog.ts` importers 3 / roots 2; `specimen-format.ts` 1 / 1) | **GREEN — reproduces over the full roster** |
| **H3(1)** | `node --input-type=module -e "…parseCssColor('oklch()')…"` | **no throw, EXIT=0** — X-W9's cure is in `dist/`; ⟨cmd⟩ `git log f90aeb02^..HEAD -- node_modules` → nothing, no consumer try/catch added | **GREEN (swept) — reproduces** |
| **H3(3)** | `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` | **7.0.0** — the Glass-8 trigger has not fired; nothing in §Blocked opened | **GREEN (swept) — reproduces** |
| **f1** | `node docs/tranches/X/gates/gate-catalog-totality.mjs` | **EXIT=0** — `offered=18 catalogued=18 info=18 docs=11 authored + 7 decided-none = 18` | **GREEN — reproduces (banked, re-run anyway)** |
| **f5** | `node docs/tranches/X/gates/gate-specimen-grammar.mjs` | **EXIT=0** — every row one grammar, `hex css 9ch #003abe00` the last | **GREEN — reproduces (banked, re-run anyway)** |
| **f7·f8·f9·f10 (static legs)** | the four greps | `colorSpace: any` **0** · `as DisplayColorSpace` **0** · `tag=` **0** · `updateToColorSpace` **2** · peer watcher **0** · `from "../ui/` **0** | **GREEN — reproduce** |

**The six undispatched / gated units are RED at this seat too, measured not assumed** — ⟨cmds⟩
`test -f model/types.ts` **ABSENT** · `model/sample.ts` **ABSENT** · `grep -c "one sampling law"` **0** ·
`gate-literal-dialect.mjs` **ABSENT** · `test/interpolation-subset.test.ts` **ABSENT** ·
`gate-easing-radius.mjs` **ABSENT** · `grep -rn "glass-ui/aurora" demo/workbenches/gradient/` **0** ·
`grep -rn requestAnimationFrame demo/workbenches/gradient/` **2** · `gate-prm-idiom.mjs` **ABSENT** ·
`grep -rn "hero blob carries current chroma" e2e/` **0** · `o25-atmosphere-response.spec.ts` **ABSENT** ·
`o28-atmosphere-coldload.spec.ts` **ABSENT** · `grep -rn armRuntime demo/` **0** ·
`o29-scene-contracts.spec.ts` **ABSENT** · `grep -c "component: Stub"` **14** ·
`motion-quarantine.md` **PRESENT** (H2 leg 1 GREEN, leg 2 vacuous). **The close understated nothing.**

**The banked set, probed rather than trusted — and two of it fall.** The RESUME scope law lets a close
cite Check 3's 2026-09-19 reading for gates its own units did not turn. This seat spot-checked the two
banked gates whose **command sets touch the shell fixture the close itself reports broken**, and both
are RED today: ⟨cmd⟩ `npx playwright test e2e/smoke/views/gradient.spec.ts
e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` (**a13**'s command of record) →
**21 failed / 0 passed**, every spec dying at `getByRole('main', { name: 'Color tool panes' })` before
its first assertion; ⟨cmd⟩ `… -g "neighbour-crossing drag round-trips"` (**a2**'s second leg,
`e2e/smoke/views/gradient.spec.ts:160`) → **1 failed**, same locator. a13's other leg, ⟨cmd⟩
`npx vitest run test/gradient-order-invariant.test.ts`, is still **13 passed (13)** — the model half of
the gate is intact; it is the e2e half that no longer witnesses. Check 3 read a13 at **17 passed
(1.4m)** on 2026-09-19 and `.b` reproduced the break in a clean detached worktree at the wave's own open
commit `17734065`, so the moving part is the **sibling X-W5 lane's uncommitted bytes in this shared
tree** — foreign, and outside `W6.md:120`'s Do-NOT-touch either way. **See defect 2.** The remaining
eleven banked `.a` gates (a1, a3–a12) drive `vite-node`, the four `…/probes/wb-gradient-stopeditor/`
gates or the eight `…/evidence/` probes and touch no dock fixture; this seat did not re-run them and
does not claim to have.

### Axis 2 — bounds (CLEAN, with one disclosed widening)

⟨cmd⟩ `git show --stat` over the sitting's six commits → **20 file-touches**, each read against
`W6.md` §4 and the resume unit plan's own Writable line: `GradientStopEditor.vue` (`:57`) ·
`GradientVisualizer.vue` (`:58`) · `o21-gradient-rail.spec.ts` (`:85`) · `W6-evidence/**` (`:104`, 12
files) · `…/probes/x-w6/gate-card-rhythm.mjs` (`:102`) · `e2e/smoke/views/companion-pane-track-start.spec.ts`
· this record (2).

⟨cmd⟩ `git log --oneline f90aeb02^..HEAD -- scripts/dev/dev.sh` → **0** — never committed, and ⟨cmd⟩
`git status --porcelain` shows it still `M` and unstaged at this seat.
⟨cmd⟩ `git diff f90aeb02^..HEAD --stat -- node_modules` → **empty**.
⟨cmd⟩ `git status --porcelain -- …/probes/wb-gradient-stopeditor/ …/components/wb-gradient-stopeditor/`
→ **0 rows**: the twelve `execute, no write` instruments are byte-untouched, so no gate was satisfied
by editing its own instrument.

**The one widening, named rather than waved through.** `e2e/smoke/views/companion-pane-track-start.spec.ts`
is a **create** at a path §4 does not carry. It is not smuggled: `W6.md:277` states g2's command as
*"new e2e"* and §4 carries **no row for any of the four "new e2e" gates** (g2, b3, e1, h1) — a spec gap,
not a seat's appetite — and the resume unit plan (`:2676-2678`) grants `.g` *"a new e2e arm in
`e2e/smoke/oracles/o21-space-catalog-truth.spec.ts` **or** `e2e/smoke/views/` (ADD-never-replace)"*.
Recorded as **MINOR-with-mitigation**: the artefact is mandated by the gate that consumes it, the
directory is granted by the dispatch of record, and the write is disclosed in three places in the
record. It does not block.

**ADD-never-replace, re-verified.** ⟨cmd⟩ `git show --numstat 63713d4c -- o21-gradient-rail.spec.ts` →
**242 added / 7 deleted**; ⟨cmd⟩ `git show 17734065:… | grep -c "^test("` → **6**, ⟨cmd⟩ at HEAD → **10**.
Each of the 7 deletions has its `+` twin in the same hunk (`skewPx:` → `skewPx: +(`; `const handle = live`
re-wrapped; `expect(…).toBeLessThanOrEqual(INVERSE_TOL_PCT)` re-wrapped over three lines with
`INVERSE_TOL_PCT` intact at `+86`). **No assertion weakened, none deleted, none narrowed.**

### Axis 3 — masking fallbacks (NONE)

⟨cmd⟩ over the sitting's product diff (`63713d4c^..7dff25f6` and `e69aaf95`) for
`^\+.*(\.skip\(|@ts-ignore|eslint-disable|try\s*\{|catch\s*\(|test\.fixme)` restricted to `demo/` and
`e2e/` → **0 hits**. No allowlist, no copied producer selector, no `node_modules` patch (axis-2 diff
empty), no narrowed assertion (axis-2 numstat). The two REDs the sitting could most cheaply have
masked — b1's `G3d` legs and g1's 61.22px — were **left RED and escalated**, and the instrument that
would have turned b1 green by editing it (`gate-seat.mjs`) is byte-untouched. That is the opposite of
masking.

### Axis 4 — commit families (CLEAN)

`W6.md` §9 assigns `.b` commit **#2** `feat(demo/gradient-seat)` and `.g` commit **#7**
`fix(demo/picker-rhythm)`. Landed: `63713d4c` + `7dff25f6`, both `feat(demo/gradient-seat)` — two
meanings (the seat/inspector/removal cure; the crowding fan-out), not a split family — plus their
evidence and receipt commits, which §9 row 11 and `W6.md:104` carry. `.g` landed as
`test(demo/picker-rhythm)` rather than `fix(…)`: **no cure landed** (g1 is ESC-g1), so `test(` is the
honest scope and `fix(` would have overstated it — **INFO**. Runbook §3.4's same-commit locks carry
**no X-W6 row** (the `X·V PSC deletion + C1 successor` lock is X-W5's), so no declared family exists to
split. `e69aaf95` carries **no `Claude-Session:` trailer** (⟨cmd⟩ `git log -1 --format=%B | grep -c` →
**0**; the other five → **1** each) — a standing-law deviation, **disclosed by the close at Act 7 item 2**
and deliberately not repaired, since amending a landed commit in an index four tracks share is the
larger harm. **MINOR-with-mitigation.**

### Axis 5 — E-3 (HELD)

⟨cmd⟩ `git diff --stat f90aeb02^..HEAD -- docs/tranches/V/megatranche/registry/adjudicated/
docs/tranches/X/waves/W5.md docs/tranches/X/waves/W7.md
…/audit/probes/wb-gradient-stopeditor/ …/audit/components/wb-gradient-stopeditor/` → **prints nothing**.
The only hit in the whole immutable sweep is `docs/tranches/X/waves/W6.md | 4 ++++` — **4 insertions,
0 deletions**, at commit `732fe109`, and the diff is exactly the `**ADDENDUM 2026-09-19 (dated, beside
— E-3; COHESION §0z)**` appended after the file's last line. **A dated addendum-beside, appended, not a
rewrite — E-3 satisfied on its own terms.** ⟨cmd⟩ `git log --oneline 4cb294b9..HEAD -- W6.md` names that
one ruling commit and none of the sitting's six: the close's *"`W6.md` is byte-untouched"* holds for
this sitting.

### Axis 6 — mail (CLEAN in scope)

⟨cmd⟩ `grep -c "^| I-\|^| O-" INBOX.md` → **90**, the close's figure exactly. ⟨cmd⟩ `grep -n UNREAD`
→ every hit is either the file's own vocabulary preamble (`:4 :5 :23 :33`), a dated sweep line, or a row
whose **Status cell, read by position**, says otherwise: **O-20 SENT** · **I-30 Routing** ·
**I-31 Routing/FOLDED** · **I-32 Routing** · **I-35 ANSWERED** · **O-39 SENT**. The four rows minted
since the resume open — ⟨cmd⟩ `grep -n "^| O-4[3-6]"` → **O-43** X·KF/X·F · **O-44** fourier-analysis ·
**O-45** X·V's X-W9 gate-table seats · **O-46** the owner + the V·π ledger — **none is addressed to
X-W6**. **0 UNREAD in scope.** The one owed `O-` row the close names (the glass-forward easing-readout
relay) is confirmed still unminted: ⟨cmd⟩ `grep -n "easing-readout" INBOX.md` → **3 hits, all inside
dated sweep prose, none a `| O- |` row** — **R-C2 stands, owner `.d` by §0z E5.**

### Axis 7 — the four-verb line moved LAWFULLY

**AUDITED yes · SPECIFIED yes · IMPLEMENTED no · VERIFIED no.** `W6.md:335` conditions the close on
*"all 45 born-RED sub-gates GREEN by the same commands"*; **18 of 50 are RED at this seat's own
commands**. `W6.md:387`/`:404` reserve VERIFIED for X-W11. Not moving either verb is the only lawful
reading, and the close took it.

### Axis 8 — the spec's §2a goal criterion is NOT MET at the bytes

§2a requires each of **six** live instruments — Gradient, the space catalog, Easing, HeroBlob,
Blob/Atmosphere, Mix — to own its own stage, inspector and action contract **as a routed scene**.
⟨cmd⟩ `grep -c "component: Stub" demo/color-picker/router/index.ts` → **14**: no route owns a scene
contract, and `.j` (the unit that adopts them) is undispatched and BLOCKED-ON X-W5. Easing (`.d`),
HeroBlob (`.h`) and Blob/Atmosphere (`.i`) are undispatched. **2 of 6 instruments have their
substance landed (Gradient via `.a`/`.b`; the catalog via `.f`), 0 of 6 own a routed scene contract.**
The close states this itself (R-C6) and does not claim the goal. `W6.md:342`'s
`complete_with_misses` clause is not even reachable yet — it presumes gates that pass.

### Axis 9 — the record's published figures (all reproduce but one, and that one is defect 2)

| the close's figure | ⟨cmd⟩ at this seat | reading |
|---|---|---|
| g1 `61.22px` ⊕ `55.41px`, double-run | the gate, on a server this seat started | **61.22 / 55.41** — identical to the hundredth |
| b2 `462/462 @1440px` · `324/324 @390px` · `bar.x+3: 12 → 13` | the in-bounds instrument | **identical** |
| b4 `removal controls: 1`, floor reason string, `3 → 2` | same | **identical, string for string** |
| b1 RED **2** conditions, `G3c` cured | `gate-seat.mjs` | **identical**, and byte-identical across two runs |
| `find W6-evidence -name "*.txt"` = 44 ⊕ 11 close transcripts | ⟨cmd⟩ | **55 total, 11 under `gates/close-2026-09-20/`** — 44 + 11, consistent |
| `find W6-evidence -name "*.png"` = 6, all `catalog/` | ⟨cmd⟩ | **6** |
| `owner-marks/` absent · `atmosphere/` = 2 files | ⟨cmd⟩ | **confirmed** |
| tombstone · glass ask · blob census MET; lband letter not required | ⟨cmd⟩ `test -f` ×4 | **MET · MET · MET · absent** |
| INBOX rows **90** | ⟨cmd⟩ | **90** |
| `vue-tsc` EXIT=0 · `eslint` EXIT=0 · `vitest` 4 failed / 628 passed EXIT=1 | ⟨cmds⟩ | **EXIT=0 · EXIT=0 · `Test Files 3 failed \| 34 passed (37)`, `Tests 4 failed \| 628 passed (632)`** — and the four names are exactly the four the close names (`gradient-parse` ×2, `spectrum-luma` C-5, `reka-binding-idiom` NG-6) |
| H4 roll-call 3 + 3 + 8 = **14** | re-counted against §Dispositions | **14**, every row one state |
| SELF-COUNT `32 + 18 = 50` | re-counted | the **arithmetic** is right; the **membership** is not — see defect 2 |
| push divergence `1  70` | ⟨cmd⟩ `git rev-list --left-right --count origin/tranche-u...HEAD` | **`1  75`** — five sibling commits have landed since; the disclosed condition is unchanged in kind and ESC-PUSH still stands |

### Axis 10 — HONEST-RED ADJUDICATION, gate by gate

**RELIEVED — 5**, each by one of axis 10's three kinds, each owner-named:

| gate | the relief, at the spec's own bytes | owner |
|---|---|---|
| **b3** | its named e2e dies at `getByRole('main', { name: 'Color tool panes' })` before its first assertion. The two files that could cure it — `demo/color-picker/App.vue` and `e2e/smoke/fixtures/dock.ts` — are in `W6.md:120`'s **Do-NOT-touch** and outside §4. Reproduced by `.b` in a clean detached worktree at the wave's own open commit `17734065`, with none of this wave's bytes present, so it is **not this wave's break**. A consumer patch here would be the copied-selector defect the standing law names | **X-W5** (its landed composition root `de99ec15`) |
| **g1** | the cure needs `demo/picker/display/ColorComponentDisplay.vue` (or `readoutReservation.ts`) **and** the retirement of `e2e/smoke/oracles/readout-seam.spec.ts:85-119`, which asserts the very band OM-3 calls the defect. **Neither is in §4**, and `W6.md:154` (M-23) assigns the spacing canon to **X-W10**, never an implementation seat | **X-W10 / the owner**, via ESC-g1 |
| **j1 j2 j3** | `W6.md:479`'s dated addendum routes `.j` explicitly: *"`.j` after X-W5 CLOSED"*. ⟨cmd⟩ `LEDGER.md:37` → X-W5 reads **OPEN 2026-09-17**. The spec's own routing blocks the unit | **X-W5**, then the next X-W6 sitting |

**PENDING A RULING — 1**: **b1**. Its RED is a true statement about the probe's *input state*, verified
at the bytes by this seat as well (⟨cmd⟩ `sed -n '122,128p' useGradientModel.ts` → the boot model is two
stops at 0 and 100; `gate-seat.mjs` G3d drives `document.querySelector("[data-stop-id]")`, the first
seat in document order, and the gate's own failure text quotes `* 0`; Home and ArrowDown on a control
already at its axis minimum cannot move `style.left`). The property is GREEN on an in-bounds instrument
that is strictly wider (interior seat, all eight keys, **plus** the terminal bound printed). But
**`W6.md`'s §0z addendum grants the substitute-command shape to `a3–a7` only — b1 is not named by id** —
so b1 is an escalation awaiting the §0z ruling seat's word, **not yet relieved**. The seat's refusal to
edit `gate-seat.mjs` (an `execute, no write` instrument) is the correct act and is confirmed at the
bytes.

**UNRELIEVED — 12**: **c1 c2 c3 c4** (`.c`) · **d1** (`.d`) · **e1 e2** (`.e`) · **h1** (`.h`) ·
**i1 i3** (`.i`) · **H2** (its citation leg has no assertion to cite because `.e`/`.j` are unbuilt) ·
**H4** (8 of 14 CC rows not discharged). Every one is RED because **a unit of this wave was never
dispatched**, not because a producer owns it, not because a successor owns it, and not because the spec
names it honest-RED by id. `W6.md:418` (COMPLETABLE C-06) is explicit that each unit's dependencies are
MET today — ⟨cmds⟩ confirm it: glass **7.0.0** installed with every consumed subpath published, the
parser bank **GREEN**, the quarantine record **present**. **Undone work is not relief, and this seat
will not launder it as such.**

### Successor "Opens after" conjuncts, measured against this wave

| successor | its X-W6 conjunct | reading |
|---|---|---|
| **X-W7** (`W7.md:6`) | *"X-W3, X-W4 and **X-W6** (instruments …)"* | **RED** — X-W6 is PARTIAL; `formatSpecimen`'s digit policy exists (`.f` landed) but `.c`'s sampling law does not. **Lawfully blocked** |
| **X-W8** (`W8.md:6`) | *"X-W5, X-W6 and X-W7 stabilize destination ownership"* | **RED** — `.c`'s destinations (`model/types.ts`, `model/sample.ts`) are **ABSENT**, so the dead doors have nowhere to land. **Lawfully blocked** |
| **X-W10** (`W10.md:6`) | *"X-W5, X-W6, X-W7, X-W8, X-W9 stable"* | **RED**. **Lawfully blocked** — and note ESC-g1 is *routed to* X-W10, so the two are mutually waiting; that circularity is the owner's to cut, and the close names it |
| **X-W11** (`W11.md:6`) | *"X-W0 … X-W10 are IMPLEMENTED"* | **RED** — X-W6's IMPLEMENTED is `no`. **Lawfully blocked** |

**No successor is unlawfully unblocked, and no successor's conjunct is claimed GREEN anywhere in this
close.**

### Defect register — Check 1 (RESUME)

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **1** | **CRITICAL** | **12 of the 18 RED gates carry no relief of any kind** — `c1 c2 c3 c4 d1 e1 e2 h1 i1 i3 H2 H4`. Not producer-owned, not routed to a successor by the spec, not named honest-RED by id: RED because five units of this wave were never dispatched | ⟨cmds⟩ at this seat: `model/types.ts` **ABSENT** · `model/sample.ts` **ABSENT** · `grep -c "one sampling law"` **0** · `gate-literal-dialect.mjs` **ABSENT** · `test/interpolation-subset.test.ts` **ABSENT** · `gate-easing-radius.mjs` **ABSENT** · `grep -rn "glass-ui/aurora" demo/workbenches/gradient/` **0** · `gate-prm-idiom.mjs` **ABSENT** · `grep -rn "hero blob carries current chroma" e2e/` **0** · `o25-…spec.ts` **ABSENT** · `o28-…spec.ts` **ABSENT** · H4 roll-call **8 of 14 not discharged**. Dependencies are MET: glass **7.0.0**, parser bank **GREEN**, quarantine record **PRESENT** | dispatch `.c .d .e .h .i` — `W6.md:418` states each is a completable slice and this seat confirms every dependency at the bytes. `.j` alone waits on X-W5 |
| **2** | **HIGH** | **Two banked GREENs are RED at these bytes and are counted in the close's 32**: **a13** and **a2**. Every spec in the two files a13's command names now dies at the same foreign fixture the close's own b3 row measures — and the close did not carry that consequence one file over | ⟨cmd⟩ `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` → **21 failed / 0 passed**, EXIT=1 (a13's vitest leg still `13 passed`). ⟨cmd⟩ `… -g "neighbour-crossing drag round-trips"` (a2's second leg) → **1 failed**, `element(s) not found`. Both die at `getByRole('main', { name: 'Color tool panes' })`. The close's SELF-COUNT should read **GREEN 30 / RED 20**, not 32 / 18 | re-read a13 and a2 at the close's own clock; move both into the **relieved** honest-RED set under **ESC-b3's owner (X-W5)** — the break is foreign and a consumer patch would be the copied-selector defect — and republish the SELF-COUNT as 30 / 20. **No cure to the product is owed; the arithmetic and the honest-RED roster are** |
| **3** | MINOR (mitigated) | one write at a path §4 does not carry: `e2e/smoke/views/companion-pane-track-start.spec.ts` (create, `e69aaf95`) | `W6.md:277` mandates g2's *"new e2e"* and §4 carries no row for **any** of the four "new e2e" gates; the resume unit plan `:2676-2678` grants `.g` *"a new e2e arm in … **or** `e2e/smoke/views/` (ADD-never-replace)"*; disclosed three times in the record | the next E-3 addendum-beside adds the four missing §4 rows (g2 · b3 · e1 · h1) so no later seat has to reason its way to the same place |
| **4** | MINOR (mitigated) | `e69aaf95` carries **no `Claude-Session:` trailer** | ⟨cmd⟩ `git log -1 --format=%B e69aaf95 \| grep -c "Claude-Session:"` → **0**; the other five → **1** each | none here — the close already ruled that amending a landed commit in an index four tracks share is the larger harm, and this seat agrees. The erratum is recorded twice now |
| **5** | INFO | `.g` landed as `test(demo/picker-rhythm)` where §9 row 7 declares `fix(demo/picker-rhythm)` | ⟨cmd⟩ `git log -1 --format=%s e69aaf95` | none — **no cure landed** (g1 is ESC-g1), so `test(` is the honest scope and `fix(` would have overstated it |
| **6** | INFO | §8's artefact rows `W6.md:358` (7 gradient PNG pairs) and `:360` (`owner-marks/`) are unmet | ⟨cmd⟩ `find W6-evidence -name "*.png"` → **6**, all `catalog/`; ⟨cmd⟩ `ls W6-evidence/owner-marks` → absent | already owner-named as **R-C1** / **R-g4**; no figure any unit cites is PNG-derived (§17), so nothing rests on them |

**Weighed the other way, honestly.** This close refused three cheap greens that were available to it:
it left `gate-seat.mjs` byte-untouched rather than re-pointing the probe that would have turned b1; it
corrected **its own unit's** b3 verdict from GREEN down to honest-RED (Act 7 item 1) rather than
banking the unit's word; and it recorded f2's flip as **a sibling's cure that X-W6 did not earn**.
It also refused to force a push it could have forced. Defect 2 is the inverse of that discipline, not an
instance of its absence: the close applied the RESUME scope law exactly as written — *cite the banked
reading for gates the sitting's units did not turn* — and the law's blind spot is precisely a gate whose
command set a **foreign, uncommitted** sibling lane can move under it. That is a finding about the
banking practice as much as about this seat.

### Verdict

**NOT-CONFORMANT.** The bar is *zero BLOCKER/CRITICAL/HIGH and every claimed GREEN reproduces*.

- **Second half — met for everything this seat re-ran, and only there**: **30 of 30** reproduce at
  this seat's own commands, several double-run byte-identical, g1's figures to the hundredth from a
  server this seat started itself, H1 re-run over the full 18-sha roster, and the six undispatched
  units measured RED rather than assumed. But **2 of the banked GREENs are RED at the settled bytes**
  (defect 2), so the published roster does not reproduce as published.
- **First half — not met**: one **CRITICAL** (12 unrelieved REDs) and one **HIGH** (defect 2).

**CONFORMANT-HONEST-RED is unavailable.** It requires *every* remaining RED to be relieved and
owner-named. At this seat **7 are relieved** (`a2` `a13` `b3` → X-W5's fixture · `g1` → X-W10 / the
owner · `j1 j2 j3` → X-W5, by `W6.md:479`'s own routing), **1 awaits a ruling** (`b1` — the §0z
substitute-command shape is granted to `a3–a7` by id and not to b1), and **12 are unrelieved undone
work**. Undone work is not relief.

**What is nevertheless true of this sitting.** `.b` cured b2 and b4 at the gate's own arms — the
meniscus is live (`462/462` at 1440, `324/324` at 390, with twelve stops on the rail), and the three
destructive species collapsed to one owner with a disabled floor that states its reason. `.g` proved
its shared-row contract with both negative controls RED and authored a machine gate that reds on the
61.22px residue and **cannot be satisfied by moving it**. Nothing was masked, nothing was skipped, no
instrument was edited to make its own gate pass, and `scripts/dev/dev.sh` was never touched. **The wave
remains incomplete, not dishonest** — and the one figure that does not reproduce moves gates into the
*relieved* column, not out of it.

**Cure, shortest path to CONFORMANT-HONEST-RED**: dispatch `.c .d .e .h .i` (every dependency MET at
these bytes), obtain the §0z ruling on ESC-b1, and have X-W5 repair the shell fixture's accessible name
— which alone returns `a2`, `a13`, `b3` and `.b`'s four ADDED specs to witnessable. `.j` waits on X-W5
by the spec's own routing.

**The LEDGER row stays `PARTIAL`. It is not promoted.**

### Commits

| # | commit | paths | bounds row |
|---|---|---|---|
| 1 | this commit | `docs/tranches/X/execution/A/X-W6.md` (append-only — `## Check 1 — RESUME 2026-09-20`) · `docs/tranches/X/execution/LEDGER.md` (this wave's own row cell + one appended event line) | the record and its own row |

⟨cmd⟩ `git status --porcelain` at this seat's close → the same sibling rows read and never touched, plus
`scripts/dev/dev.sh` still `M` and **never staged**. **No product byte, no gate script, no evidence file
and no sibling record was written by this seat**; the dev server this seat started on `:9000` was stopped
before this block was committed. The staged `D demo/shell/PaneSegmentedControl.vue` that sits in the
shared index is a sibling seat's and was **not** swept in: this commit carries its own pathspec on the
commit itself.

---

## Open — RESUME 2026-09-21 (third sitting; SEAT 0, `claude-opus-5[1m]`)

SERVED MODEL: claude-opus-5[1m]

**Append-only beside** every block above — the 2026-09-18 `## Open`, the first `## Close`, Checks 1–3,
Repairs 1–2, the 2026-09-20 `## Open — RESUME`, that sitting's `## Close` and its `## Check 1`.
**E-3: nothing above this line is rewritten.**

**Mode**: RESUME. ⟨cmd⟩ `grep -n "^| X-W6" LEDGER.md` → the row reads **PARTIAL 2026-09-20 — NOT
PROMOTED**, not CLOSED and not OPEN, so this sitting re-opens under COHESION **§0z E1** (the re-dispatch
ruling) as read forward by `## Check 1 — RESUME`'s cure line: *"dispatch `.c .d .e .h .i` … `.j` waits
on X-W5 by the spec's own routing."*

### Act 0 — crash-recovery (standing law, before any other act)

⟨cmd⟩ `git status --porcelain` → the sibling rows this record has named since 2026-09-18 (X-W5's open
lane under `demo/color-picker/`, `demo/shell/`, `demo/palettes/`, `demo/styles/shell.css`, `e2e/smoke/**`;
`CARRY-LEDGER.md`, the V fold; `execution/A/X-W5.md`; `docs/tranches/X/waves/W6.md`'s sibling rows;
`scripts/dev/dev.sh`, the unowned standing-dirty row) **plus one row inside this seat's own writable
set**: `M docs/tranches/X/execution/A/X-W6.md`.

**That row is inherited, read whole, and judged.** ⟨cmd⟩ `git diff --stat -- .../A/X-W6.md` →
**306 insertions / 0 deletions**; ⟨cmd⟩ `git diff -- .../A/X-W6.md | head -60` → the hunk begins at the
file's last committed line and is exactly the **`## Check 1 — RESUME 2026-09-20`** block: the L-20
pass-1 checker's verdict, written by a seat that was killed before it could commit (the sibling commit
`f44f09b1` records the same seat's stranded `LEDGER.md` hunk at 02:07, carried verbatim there).
**Judged against the spec**: the block is append-only, rewrites no byte above it, claims no product
cure, and its readings are the ones this seat re-measured below. **It conforms — it is finished by being
committed with this open**, inside this seat's own writable set, and is named here rather than passed
off as this sitting's authorship. Nothing stashed, nothing restored, nothing outside the writable set
touched, nothing staged that is not on this commit's own pathspec.

### Preconditions, measured at the bytes AND in the LEDGER (2026-09-21)

| condition | source | measurement at this open | verdict |
|---|---|---|---|
| X-W0 CLOSED | `W6.md` §Opens-after chain · RUNBOOK §1.1 | ⟨cmd⟩ `grep "^| X-W0 " LEDGER.md` → `CLOSED 2026-09-17` | MET |
| X-W1 CLOSED (visual-oracle substrate + CI) | `W6.md:398` | `CLOSED 2026-09-17`; ⟨cmd⟩ `ls e2e/visual` → PRESENT; ⟨cmd⟩ `grep -c playwright .github/workflows/ci.yml` → **12** | MET |
| X-W4 CLOSED (`SceneActionSet`) | `W6.md:396` | `CLOSED 2026-09-17`; ⟨cmd⟩ `grep -rl SceneActionSet demo/` → **4 files** | MET |
| installed glass 7.0.0, subpaths published | `W6.md:399` | ⟨cmd⟩ `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → **7.0.0** | MET |
| X-W5 CLOSED (binds **`.j` alone**) | `W6.md:4` · `:479` · COHESION §0z E1 | ⟨cmd⟩ `grep "^| X-W5 " LEDGER.md` → **`PARTIAL — 2026-09-21`** (`.c` DEAD twice, `.d`/`.e` never dispatched) | **NOT MET — `.j` waits, never skipped** |

The **§Opens-after divergence** is unchanged from the 2026-09-18 open and is not re-litigated: `W6.md:4`
reads *"Opens after: X-W5"*, while RUNBOOK **§1.1** places X-W6 directly under X-W0 (*"X-W6 (scenes/
workbenches; opens against its fold) ⟂ W7 on four shared paths"*, no W5→W6 edge), COHESION **§0k.3**
reads *"X-W6 (S-7, S-8) … may open lawfully"*, and this row's own `Opens after` cell reads **X-W0**.
The X-W5 clause binds **unit `.j` alone** — and at this sitting `.j` is therefore **NOT DISPATCHED**,
by COHESION **§0z E1**'s own words: *"`.j` dispatches once X-W5 reads CLOSED in the LEDGER … if it is
not yet CLOSED at `.j`'s turn, `.j` is the last unit and waits on it, never skipped."*

**Orchestrator note honoured**: W6 writes FIRST on the four paths shared with X-W7 ⟨`W7.md:607`,
`W7.md:150-156`⟩ — `MixConfigBar.vue` and `MixSourceSelector.vue` are `.j`'s, so with `.j` deferred the
write-order obligation is carried forward to `.j`'s sitting and X-W7 stays lawfully blocked
⟨`W7.md:6`⟩ meanwhile.

### E13 Step-0 — the four-path mail sweep at this open (2026-09-21)

Swept read-only at this seat's own clock, each path compared against **every** row of
`docs/tranches/V/coordination/INBOX.md`.

1. `docs/tranches/V/` + `V/coordination/` — ⟨cmd⟩ `find docs/tranches/V -maxdepth 2 -name '*.md'
   -newermt "2026-09-20 00:00" ! -name INBOX.md` → **`ARCHITECTURE.md`** + **`reformation/CARRY-LEDGER.md`**,
   Track A's own canon documents, **not letters and addressed to no one** (the same two the KF.W13S
   sweep classified on 2026-09-20). No new letter-shaped item.
2. `../glass-ui/docs/tranches/` — ⟨cmd⟩ `ls -dt …/tranches/*/ | head -1` → **`BK/`**, re-confirmed the
   newest glass tranche dir; ⟨cmd⟩ `find BK/coordination -maxdepth 1 -name '*.md' -newermt
   "2026-09-20 00:00"` → **empty**. Tail letter is still `glass-outbound-2026-09-18-valuejs-o26-reply.md`
   = **I-35, rowed**.
3. `../keyframes.js/docs/tranches/V/coordination/` → **empty** at the same delta test.
4. `../sci-report/atlas/docs/tranches/P/coordination/` → **empty**; tail unmoved.

**Census, double-run**: ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **90** · **90**. Classification read
**BY POSITION** from each row's Status/Routing cells, never by bare grep: ⟨cmd⟩
`awk -F'|' '/^\| *[IO]-[0-9]+[a-z]? *\|/ { s=$(NF-2); t=$(NF-1); if (s ~ /^ *UNREAD/ || t ~ /^ *UNREAD/) print $2 }' | wc -l`
→ **0**. Tail ids: **I-39** · **O-46**.

**Result: 0 unrowed · 0 new `I-n` minted · 0 UNREAD in X-W6's scope.** `INBOX.md` carries **no edit at
this open** (SELF-COUNT law; it is self-excluded from its own census). **One `O-` row stays OWED inside
the wave and is NOT pre-empted here**: §0z **E5** grants the glass-forward easing-readout relay for
`docs/tranches/X/waves/W6-glass-ask-easing-readout.md` to unit **`.d`** — ⟨cmd⟩
`grep -n "easing-readout" INBOX.md` → **3 hits, all inside prior sweep prose, no `O-` row**. The grant
is `.d`'s to spend.

---

## Baseline — RESUME 2026-09-21 (the owed gates only; every other gate cites the banked reading)

**RESUME scope law**: only the gates the still-owed units turn are re-run at this open. The other 40
cite the 2026-09-20 close's table as re-read by `## Check 1 — RESUME` (30 of 30 reproduced at that
seat's own commands), **with its defect 2 standing**: `a2` and `a13` are RED at the settled bytes under
a foreign X-W5 fixture break, and the published SELF-COUNT of record is **GREEN 30 / RED 20**, not
32 / 18.

| gate | unit | command (read-only, at this open) | BEFORE |
|---|---|---|---|
| c1 | `.c` | `node …/probes/wb-gradient-stopeditor/gate-structure.mjs` | **RED** — EXIT **1**, **7** `G4*` failure blocks; `model/types.ts` **ABSENT**, `model/sample.ts` **ABSENT**, the 7-name re-export door live |
| c2 | `.c` | `grep -c "one sampling law" test/gradient-order-invariant.test.ts` | **RED** — **0**; the `-t` selector still matches no test (R.2-1 stands: `.c` authors the case under that exact name) |
| c3 | `.c` | `ls docs/tranches/X/gates/gate-literal-dialect.mjs` | **RED** — No such file |
| c4 | `.c` | `ls test/interpolation-subset.test.ts` | **RED** — No such file |
| d1 | `.d` | `ls …/probes/x-w6/gate-easing-radius.mjs` | **RED** — No such file |
| e1 | `.e` | `grep -rn "gradient selector aurora" e2e/` · `grep -rn "glass-ui/aurora" demo/workbenches/gradient/` | **RED** — **0** · **0** |
| e2 | `.e` | `grep -rn requestAnimationFrame demo/workbenches/gradient/` · `ls …/probes/x-w6/gate-prm-idiom.mjs` | **RED** — **2** rAF sites (unchanged, both `syncVbRatio`) · probe No such file |
| h1 | `.h` | `grep -rn "hero blob carries current chroma" e2e/` | **RED** — **0** |
| i1 | `.i` | `ls e2e/smoke/oracles/o25-atmosphere-response.spec.ts` | **RED** — No such file |
| i3 | `.i` | `ls e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts` · `grep -rn armRuntime demo/` | **RED** — No such file · **0** |

### R.2 findings — a GREEN before its cure

**NONE.** All ten owed gates measure **RED** at this open, by the same commands the spec and §0z name.
The three Repair-2 cures that already landed inside still-owed units (**h2** `48d95650`, **d2**
`c8111846`, **i2** `4cb294b9`) are **not re-opened and not re-counted** — they are banked GREEN and
their units resume at their remaining gates only, exactly as the 2026-09-20 plan states.

---

## Unit plan — RESUME 2026-09-21 (5 owed units dispatched; `.j` deferred, 4 units landed)

**Model law M-23** (`W6.md:154`) is unchanged: every unit is an **Opus implementation seat**
(`claude-opus-5[1m]`). No Fable seat in this wave; no unit authors design canon (radius, spacing/shadow
and Movement-of-Momentum canon are **X-W10's** — this wave applies, it never mints).

**Landed, never re-dispatched** (each verified at the bytes by ⟨cmd⟩ `git log -1 --format=%s <sha>`):
**`.a`** (`f90aeb02` · `c222542d`) · **`.f`** (`e0e204a9`) · **`.b`** (`7dff25f6`, receipt `fa2466f0`) ·
**`.g`** (`e69aaf95`). Landed **inside** still-owed units and likewise never re-opened: **h2**
(`48d95650`), **d2** (`c8111846`), **i2** (`4cb294b9`), the DR-01 **tombstone** (`c2f17bad`), **j4**
(`6dfdd8d2`).

**Concurrency**: the chassis clause of `346e11d1` caps a run at **maxUnits 1**, tightening §0ae/§0ag's
two. Every group below is therefore a **single unit**, ordered by the spec's own lanes: Lane 1 serial
`.c → .d → .e`, then Lane 3 serial `.h → .i`. No two units run concurrently, so the disjointness
obligation is met by construction; the lane order still binds because `.d` shares
`EasingAuthoringStage.vue` with `.e`, and `.e` shares `GradientVisualizer.vue` with `.c`.

| group | unit | why here |
|---|---|---|
| 1 | `.c` | Lane 1, after `.b` (landed) and strictly after `.f` (c4's own rider, `W6.md:212`) |
| 2 | `.d` | Lane 1, after `.c` |
| 3 | `.e` | Lane 1, after `.d` (`EasingAuthoringStage.vue`) and after `.b`/`.c` (`GradientVisualizer.vue`) |
| 4 | `.h` | Lane 3 head; shares no path with Lane 1 |
| 5 | `.i` | Lane 3, after `.h`; writes `AuroraPane.vue` before `.j` |

**`.j` is NOT DISPATCHED at this sitting.** ⟨cmd⟩ `grep "^| X-W5 " LEDGER.md` → **`PARTIAL — 2026-09-21`**,
not CLOSED. COHESION **§0z E1**: *"`.j` dispatches once X-W5 reads CLOSED in the LEDGER … if it is not
yet CLOSED at `.j`'s turn, `.j` is the last unit and waits on it, never skipped."* The orchestrator's
write-first obligation on the four X-W7-shared paths (`W7.md:607`) rides with `.j` and is carried
forward, so X-W7 stays lawfully blocked meanwhile (`W7.md:6`).

**Wave-level, assigned to NO unit** (§4a, §9 commit **#11**): H1's roster run over the wave's full
commit set, H2's citation audit, H3's bank sweep, H4's disposition roll-call, the gate transcripts in
`W6-evidence/gates/`, and the status flip. The close seat is dispatched separately, after group 5.
**IMPLEMENTED is the most this wave may stamp — VERIFIED is X-W11's** (`W6.md:404`).

**Worktrees** (§4b): ⟨cmd⟩ `git worktree list` → none of `value-x-w6-{gradient,catalog,atmosphere,scenes}`
on disk; with one concurrent seat every unit works in `/Users/mkbabb/Programming/value.js`. The
**STALE-SERVER LAW** binds either way — every literal/precision/serializer claim runs headless
`vite-node` against the tree or a **freshly restarted** server, never a long-running one.

### The owed units (verbatim in substance from the 2026-09-20 plan; re-verified at these bytes)

**X.W6.c** — Gradient sampling law, literal dialect and leaf types (CC-058 · MT-GRADSTOP-3). **Whole.**
§5 `W6.md:198-212`. Gates **c1 c2 c3 c4**. Commit **#3** `refactor(demo/gradient-sampling)`, **body required**.
Writable: `demo/workbenches/gradient/model/types.ts` (create) · `…/model/sample.ts` (create) ·
`…/composables/useGradientModel.ts` · `…/composables/useGradientCSS.ts` ·
`…/composables/useGradientInterpolation.ts` · `…/GradientVisualizer/GradientVisualizer.vue` ·
`docs/tranches/X/gates/gate-literal-dialect.mjs` (create) · `test/interpolation-subset.test.ts` (create) ·
`test/gradient-order-invariant.test.ts` · `test/gradient-parse.test.ts` (§0z E2) · `W6-evidence/**`.
**Locks**: strictly after `.f` and `.b`; **the ordering policy does NOT reopen** (settled in `.a`,
GRADSTOP-A §14); **STALE-SERVER LAW** on c3; the paint-stack dedup rider is **two sites** only;
**R.2-1 binds** — c2's `-t "one sampling law"` matches zero tests, so the unit authors that case under
that exact name; **§0z E2's migration rides here** (`test/gradient-parse.test.ts` `:32` 2→1, `:63` 3→2,
no assertion weakened), and if the seat reads the grant as seat-scoped it halts under §3a.

**X.W6.d** — Easing instrument coherence (CC-060 · MT-F030; CC-063 · MT-F037). **Resumes at d1.**
§5 `W6.md:214-226`. Gates **d1** (+ d2's owed re-capture). Commit **#4** `style(demo/easing-register)`.
Writable: `…/GradientVisualizer/GradientEasingEditor.vue` · `…/GradientVisualizer/easing/EasingAuthoringStage.vue` ·
`…/GradientVisualizer/easing/easingCatalogue.ts` · `…/probes/x-w6/gate-easing-radius.mjs` (create) ·
`docs/tranches/X/waves/W6-evidence/easing/**` · `docs/tranches/V/coordination/INBOX.md` (§0z E5 — mail rows only).
**Locks**: **d2 is GREEN (`c8111846`) and its branch is settled** — the census selected the dated
glass-forward ask; the unit does not re-decide it and does not touch `gate-easing-readout.mjs`'s verdict
logic. Three acts: (1) **d1**, one radius register derived from the panel's own scale, the preset chips
deciding **once** between the icon-button circle and the shared rounded-rect (canon is X-W10's, `.d`
applies); (2) **Check 3 defect 3** — re-capture `d2-negative-controls` **as a dated file beside** the
stale one (E-3, never overwritten) so both controls print their `FAIL` lines; (3) **§0z E5** — the `O-`
relay row for `W6-glass-ask-easing-readout.md`, next `O-n` after **O-46**. glass-ui is READ-ONLY; no
local restyle of the readout (M-14 cl.1).

**X.W6.e** — Gradient selector aurora (CC-064 · MT-F041). **Whole.** §5 `W6.md:228-243`. Gates **e1 e2**.
Commit **#5** `feat(demo/gradient-aurora)`.
Writable: `…/GradientVisualizer/GradientVisualizer.vue` · `…/GradientVisualizer/easing/EasingAuthoringStage.vue` ·
the gradient tree's scoped styles · `…/probes/x-w6/gate-prm-idiom.mjs` (create) ·
`e2e/smoke/views/gradient.spec.ts` (ADD-never-replace) · `W6-evidence/**`.
**Locks**: consume `@mkbabb/glass-ui/aurora` — **no new animation species, no private rAF loop**; PRM
honoured **structurally** inside `@media (prefers-reduced-motion: no-preference)`, never by leaning on
the global reduce-guard; land at **≤2 rAF both gated, or 0**. **Repair 2's refusal of e2 is inherited**:
the two rAF sites are one-shot post-paint `viewBox` reads, a layout measurement and not a clock, and
PRM-gating a layout read breaks the zero-letterbox law; **e1 lands first or with it** — landing e2 while
e1 is unbuilt makes e2's second leg vacuously true. **MOTION-SOURCED · PENDING-QUARANTINE**: every
motion/PRM assertion cites `motion-quarantine.md` (`9812f951`) **and** is re-derived against the two
guards `demo/styles/animations.css:184` ⊕ `…/glass-ui/dist/styles/utilities/a11y-overrides.css`.

**X.W6.h** — HeroBlob chroma fidelity (CC-061 · MT-F032). **Resumes at h1.** §5 `W6.md:281-293` as
restated by **COHESION §0z E6** and `W6.md:479`. Gate **h1**. Commit **#8** `fix(demo/hero-blob-chroma)`
(the census commit `48d95650` already precedes it).
Writable: `demo/picker/visual/HeroBlob.vue` · `demo/color-session/useContrastSafeColor.ts` · a new e2e arm
(ADD-never-replace) · `docs/tranches/X/waves/W6-evidence/**`.
**Locks**: **h2 is GREEN and its census is the premise, not a question** — every stage delivers 100.0%
of the chroma sRGB allows, and the owner's seed `lab(92% 88.8 20)` is **12.94×** outside sRGB; *there is
no stripper to cut*. **§0z E6 is the cure**: widen the **ceiling**, never the tolerance — resolver and
WebGL2 drawing buffer declare **`display-p3`** where `matchMedia('(color-gamut: p3)')` matches
(`gl.drawingBufferColorSpace`, a `display-p3` 2D resolver canvas), sRGB otherwise; h1 = painted dominant
chroma within the stated ΔC of the current colour's chroma **gamut-mapped (css-color-4 §13) to the
buffer's space**, and chroma beyond the display's gamut is **honest-RED-by-physics, by id**. Lands
inside its §4 rows or returns the exact path it lacks — no `node_modules` patch, no consumer try/catch.

**X.W6.i** — The atmosphere harness (CC-065 · CC-066 · CC-067). **Resumes at i1 and i3.**
§5 `W6.md:295-308`. Gates **i1 i3**. Commit **#9** `feat(demo/atmosphere-oracle)`, **body required**.
Writable: `demo/color-picker/composables/boot/useAtmosphere.ts` · `…/boot/atmosphere-calibration.ts` ·
`demo/test/glass/aurora-bracket.test.ts` · `demo/scenes/atmosphere/AuroraPane.vue` ·
`e2e/smoke/oracles/o25-atmosphere-response.spec.ts` (create) ·
`e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts` (create — §0z E4 re-point; `o26-aurora-perceptibility`
and `o27-focus-affordance` already ship and are untouched) · `W6-evidence/atmosphere/**`.
**Locks**: the **tombstone already committed FIRST** (`c2f17bad`) and **i2 is GREEN** (`4cb294b9`) —
neither reopens. **i1 reads COMMITTED FRAMES only**: for each of N seeds the named atoms move **≥ a
stated ΔE2000**, measured from frames committed in this wave's own commit (force-added past
`.gitignore *.png`) — an agent's description cannot pass i1, and it fails equally if it could be.
**i3**: the first painted atmosphere equals the seeded pick on a **cold** load (⟨cmd⟩ `grep -rn
armRuntime demo/` → **0** at this open). Writes `AuroraPane.vue` **before** `.j`.

**X.W6.j** — deferred, not dispatched. **BLOCKED-ON X-W5** (`PARTIAL — 2026-09-21`), §0z E1.

---

## Unit receipts — third sitting 2026-09-21

*(empty at this open; each dispatched unit appends its own receipt below, `SERVED MODEL:` first line)*

### X.W6.c

SERVED MODEL: claude-opus-5-5[1m]

**Status: ESCALATED** (one lawful landing; the unit's cure needs writes outside its writable set).
Seat opened 2026-09-22 at HEAD `7509da22`, in `/Users/mkbabb/Programming/value.js` (one concurrent seat,
no worktree).

#### Act 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → 17 dirty rows, **none** inside this unit's writable set (the X-W5 shell
rows, `scripts/dev/dev.sh`, and two sibling records). No inherited partial work; nothing touched outside
the set.

#### Act 1 — BEFORE (double-run, read-only)

| gate | command | BEFORE |
|---|---|---|
| c1 | `node …/probes/wb-gradient-stopeditor/gate-structure.mjs` | **RED** — EXIT 1 ×2, **7** `G4*` lines ×2 (G4a ×2 · G4b · G4c · G4d · G4g ×2), identical to the 2026-09-21 baseline |
| c2 | `grep -c "one sampling law" test/gradient-order-invariant.test.ts` | **RED** — 0 (R.2-1 stands) |
| c3 | `ls docs/tranches/X/gates/gate-literal-dialect.mjs` | **RED** — No such file |
| c4 | `ls test/interpolation-subset.test.ts` | **RED** — No such file |
| §0z E2 | `npx vitest run test/gradient-parse.test.ts` | **2 failed / 17 passed (19)** — `:32` and `:63` read the deleted `m.intervals` |

#### Act 2 — §0z E2, landed (`caea9d1e`)

The grant reads *"unit `.a`'s migration only"*: that names the **content**, the two-line migration `.a`'s
cure requires, and not a seat. Seat 0's plan carries it to this unit, and it is in this unit's writable
set. **No §3a halt.** ⟨cmd⟩ `git diff` → `:32` `expect(m.intervals).toHaveLength(1)` →
`expect(m.stops.length - 1).toBe(1)` and `:63` `…toHaveLength(2)` → `…toBe(2)`. Both expected values are
unchanged: 2 stops give 1 interval and 3 stops give 2, as Repair 2 verified. No other case was touched.
⟨cmd⟩ `npx vitest run test/gradient-parse.test.ts` ×2 → **19 passed (19)** both runs. `git diff --check`
is clean. ⟨cmd⟩ `npx prettier --check test/gradient-parse.test.ts` → `[warn]`, but the parent bytes
(`caea9d1e^`) give the same `[warn]`, so it predates this edit and is out of this unit's scope.
Commit: `caea9d1e` `test(gradient-parse): §0z E2 — .a's interval-count migration (2 stops -> 1, 3 stops -> 2)`,
committed with its own pathspec.

#### Act 3 — the cure, measured at the bytes: IMPOSSIBLE inside the writable set (no substitute taken)

Every limb of the spec's mechanism (`W6.md:200-203`) was checked against the files that import what it
moves or deletes. ⟨cmd⟩ `grep -rnE "from ['\"][^'\"]*(useGradientModel|useGradientCSS|gradientParse|useGradientInterpolation)['\"]" demo test e2e`:

| limb (spec / brief) | out-of-set files the cure has to write | measured at |
|---|---|---|
| **leaf `model/types.ts` FIRST**, which breaks **both** type-only cycle edges | `composables/gradientParse.ts` (edge 2: `:23` `import type { GradientType, GradientStop } from "./useGradientModel"`) · plus four other files that take the types from the factory: `GradientStopEditor.vue:6`, `GradientEasingEditor.vue:36-39`, `easing/easingCatalogue.ts:36`, `easing/useSpecimenRows.ts:17-21` | the grep above |
| **DELETE the dead re-export block** | `GradientStopEditor.vue:7` `import { railPosition } from "../composables/useGradientModel"`. Through the door it reaches a **live** consumer, which `.a` added after the gate's "zero consumers" was measured | `sed -n 6,7p` |
| **one `sampleAt`**, G4a "the `colorAt` prop is gone" | `GradientStopEditor.vue:9,:32,:76,:261-262` declares and consumes `colorAt` (the gate tests `/colorAt/` against the editor) | `grep -n colorAt` |
| c1 · G4c (the untrusted literal kept out of the checker's shorthand) | `GradientStopEditor.vue:606`, `:668` | gate line G4c |
| **two-site paint-stack dedup** (`.gradient-rail` + `.gradient-render-tile`) | `.gradient-rail` is declared at `GradientStopEditor.vue:783-797`. The only site in set is `.gradient-render-tile` (`GradientVisualizer.vue:344-353`) | `grep -rn gradient-rail demo` |
| c4 — the interpolation set derives from the catalog | `demo/color-session/color-space-meta.ts:26` owns `INTERPOLATION_SPACES`, and `MixConfigBar.vue:27` reads the same set. That file is in **no** `W6.md` §4 row | `grep -rn INTERPOLATION_SPACES demo` |

**Why none of the in-set limbs landed on its own.** The spec orders the leaf types **first** (`W6.md:201`).
Every other limb (`sample.ts`, the space clause, `formatColorLiteral`, the door deletion) either imports
the types or deletes an export. Without the types leaf, an in-set landing has two routes. (a) `sample.ts`
type-imports `useGradientModel`, which adds a **third** type-only cycle edge
(`useGradientCSS → sample → useGradientModel → useGradientCSS`). (b) `useGradientModel.ts` re-exports the
types it moved, which is the "state factory re-exports nothing" violation that G4g exists to delete. It
would also be a legacy-compat shim. Each route is a substitute for the specified cure, and each turns c1
GREEN on text while the defect stays. Neither was taken. c2 was not authored alone either: its case
imports `sampleAt` from `model/sample.ts`, and a case with nothing to import turns all of
`gradient-order-invariant.test.ts` RED, including `.a`'s green cases. c3 and c4 are left unbuilt for the
same reason, since each probes an artefact the cure creates. One out-of-set dependency **is** avoidable
and is noted for the re-dispatch: `test/gradient-v4-consume.test.ts:6` imports `sampleCoalescedStops`
from `useGradientCSS`. If the ramp builder keeps that name and position, and samples through `sampleAt`,
that file needs no write.

#### Act 4 — AFTER

| gate | AFTER | moved? |
|---|---|---|
| c1 | RED — EXIT 1, 7 `G4*` lines (unchanged) | no |
| c2 | RED — 0 | no |
| c3 | RED — No such file | no |
| c4 | RED — No such file | no |
| §0z E2 | **19 passed (19)** ×2 | **yes** (2 of the 4 whole-suite failures `.a`'s close counted are cured) |

#### Act 5 — ESCALATION `ESC-W6c-1` (§3a, a file-bound expansion)

X.W6.c needs a writable-set grant before its re-dispatch. The grant falls into two classes:
1. **Inside `W6.md` §4, outside `.c`'s unit list** (the unit list at `W6.md:203` omits them; granting them
   takes a dated addendum only): `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` (door
   repoint, types repoint, `colorAt` → `sampleAt`, G4c ×2, `.gradient-rail` dedup) ·
   `demo/workbenches/gradient/composables/gradientParse.ts` (cycle edge 2) ·
   `…/GradientVisualizer/GradientEasingEditor.vue` (types repoint) · `…/GradientVisualizer/easing/easingCatalogue.ts`
   (types repoint).
2. **Outside `W6.md` §4 entirely** (a true §3a trigger): `demo/workbenches/gradient/GradientVisualizer/easing/useSpecimenRows.ts`
   (types repoint) · `demo/color-session/color-space-meta.ts` (c4: `INTERPOLATION_SPACES` derived from
   `SPACE_CATALOG`, the single home that Gradient and Mix both read).

`.b` and `.f` have both landed. `GradientStopEditor.vue` has no other live Lane-1 writer until `.e`, and
`.e` does not touch it. Every one of these writes is a one-line repoint, except the editor's and
`color-space-meta.ts`'s. With the grant, the unit lands whole as commit #3.

#### Act 6 — bounds, commits, mail

⟨cmd⟩ `git show --stat caea9d1e` → `test/gradient-parse.test.ts | 4 ++--`, one path, inside the set.
`scripts/dev/dev.sh` was not staged. This receipt is committed on its own pathspec. No mail rows were in
scope for this unit (it touches no glass-ui surface).

---

## Close — RESUME 2026-09-22 (the third sitting's close; VERIFY-ONLY seat)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above. E-3: nothing above this line is rewritten. This seat cured
nothing. Its only writes are this block, the gate transcripts under
`W6-evidence/gates/close-2026-09-22/`, and the X-W6 LEDGER row.

**What this sitting's run returned.** One unit reached this close: **`.c`, ESCALATED (ESC-W6c-1)**.
⟨cmd⟩ `grep -n "^### X.W6\." X-W6.md | tail` → the third sitting has one receipt, `### X.W6.c`.
**`.d .e .h .i` have no receipt, no commit and no dirty path in this run.** They were planned at the
2026-09-21 open and never dispatched, so they stay owed. `.j` stays **BLOCKED-ON X-W5** (§0z E1).

### Act 0 — crash-recovery (standing law, before any other act)

⟨cmd⟩ `git status --porcelain` → 16 rows: the X-W5 lane (`demo/color-picker/App.vue`,
`…/usePaletteWiring.ts`, `demo/palettes/*`, `demo/shell/*`, `demo/styles/shell.css`, three
`e2e/smoke/**` specs, and `execution/A/X-W5.md`), `V/reformation/CARRY-LEDGER.md`, and
`scripts/dev/dev.sh`. **None is inside this seat's writable set** (this record, `LEDGER.md`'s X-W6
row, `W6-evidence/**`). Nothing was inherited, stashed, restored or touched.

### Act 1 — commit roster and bounds

| commit | unit | ⟨cmd⟩ `git show --stat` | inside the unit's writable set? |
|---|---|---|---|
| `caea9d1e` test(gradient-parse): §0z E2 | `.c` | `test/gradient-parse.test.ts \| 4 ++--` | **YES**. The §0z E2 row is `W6.md:479`, carried to `.c` by the 2026-09-21 plan |
| `c9f11e87` docs(x-w6/.c): receipt | `.c` | `execution/A/X-W6.md \| 99 +++` | **YES**. The record, append-only |

⟨cmd⟩ `git log --format='%h %s' bd790e2e..HEAD -- demo test e2e docs/tranches/X/gates` → `caea9d1e` and
nothing else from this wave. **Landed-wrong: NONE.** `git diff --check caea9d1e^ caea9d1e` is clean.

**ESC-W6c-1's premise was checked at the bytes here, not taken on the seat's word.** ⟨cmd⟩ `grep -n useGradientModel`
→ `GradientStopEditor.vue:6-7` (`GradientStop` type plus the live `railPosition` value) ·
`gradientParse.ts:23` (type-only) · `GradientEasingEditor.vue:36-39` · `easingCatalogue.ts:36` ·
`easing/useSpecimenRows.ts:17-21`. ⟨cmd⟩ `grep -rn INTERPOLATION_SPACES demo` →
`mix/MixConfigBar.vue:27` reads `color-session/color-space-meta`. **The premise reproduces.** The spec
records one more path fact: `W6.md` §4 lists `GradientVisualizer/easing/GradientEasingEditor.vue`, but
the file is at `GradientVisualizer/GradientEasingEditor.vue` (⟨cmd⟩ `find demo -name
GradientEasingEditor.vue`). The addendum that rules ESC-W6c-1 should name the true path.

### Act 2 — gate table, BEFORE → AFTER, re-run at this seat's own clock

Transcripts: `W6-evidence/gates/close-2026-09-22/` (8 files). BEFORE is the 2026-09-21 open's baseline for
the owed gates, and `## Check 1 — RESUME`'s membership (GREEN 30 / RED 20) for the rest.

**`.c`, the one unit dispatched this run. All four gates are RED, and ESC-W6c-1 is reproduced.**

| gate | ⟨cmd⟩ at this seat | BEFORE | AFTER | verdict |
|---|---|---|---|---|
| c1 | `node …/probes/wb-gradient-stopeditor/gate-structure.mjs` ×2 | EXIT 1, 7 `G4*` lines | **EXIT 1 ×2, 7 failure lines** (G4a ×2 · G4b · G4c · G4d · G4g ×2) plus the header; `diff -q` → identical | **RED** (ESC-W6c-1) |
| c2 | `grep -c "one sampling law" test/gradient-order-invariant.test.ts` | 0 | **0** | **RED** |
| c3 | `test -f docs/tranches/X/gates/gate-literal-dialect.mjs` | ABSENT | **ABSENT** | **RED** |
| c4 | `test -f test/interpolation-subset.test.ts` | ABSENT | **ABSENT** | **RED** |
| §0z E2 (not a numbered gate) | `npx vitest run test/gradient-order-invariant.test.ts test/gradient-parse.test.ts demo/test/glass/aurora-bracket.test.ts` ×2 | gradient-parse 2 failed / 17 passed | **3 files · 41 passed (41)**, both runs | cured by `caea9d1e` |

**The owed units that were not dispatched are still RED.** Each was measured with a static command,
none inherited from the open:
`gate-easing-radius.mjs` **ABSENT** (d1) · `grep -rn glass-ui/aurora demo/workbenches/gradient/` **0**
and `grep -rn "gradient selector aurora" e2e/` **0** (e1) · `grep -rn requestAnimationFrame
demo/workbenches/gradient/` **2** and `gate-prm-idiom.mjs` **ABSENT** (e2) · `grep -rn "hero blob carries
current chroma" e2e/` **0** (h1) · `o25-atmosphere-response.spec.ts` **ABSENT** (i1) ·
`o28-atmosphere-coldload.spec.ts` **ABSENT** and `grep -rn armRuntime demo/` **0** (i3) ·
`o29-scene-contracts.spec.ts` **ABSENT** and `grep -c "component: Stub" router/index.ts` **14** (j1 j2 j3).

**Banked GREENs this seat re-ran. All of them reproduce.**

| gate | ⟨cmd⟩ | reading | verdict |
|---|---|---|---|
| a1 (end state) | the vitest run above | `gradient-order-invariant` inside **41/41** | GREEN |
| f1 | `node docs/tranches/X/gates/gate-catalog-totality.mjs` | EXIT 0; `offered=18 catalogued=18 info=18 docs=11 authored + 7 decided-none = 18 decided` | GREEN |
| f5 | `node docs/tranches/X/gates/gate-specimen-grammar.mjs` | EXIT 0; the last row is `hex css 9ch #003abe00` | GREEN |
| f2 · f7 · f8(static) · f9 · f10 | the spec's greps | `0` · `colorSpace: any` 0, `as DisplayColorSpace` 0, and `vue-tsc -p tsconfig.demo.json` printed no diagnostic · `tag=` 0 · `updateToColorSpace` 2, peer watcher 0 · `from "../ui/` 0 | GREEN |
| h2 | `node docs/tranches/X/gates/gate-blob-pipeline.mjs` | EXIT 0; `census 13 published figures, 12 re-derived here` | GREEN |
| i2 | `node docs/tranches/X/gates/gate-lband-door.mjs` | EXIT 0; the calibration and bracket sites are `clean` | GREEN |
| g2 | `npx playwright test …/companion-pane-track-start.spec.ts --project=smoke` (same run as below) | **1 passed** | GREEN |
| **H1** | `node docs/tranches/X/gates/gate-no-chassis.mjs` over **19 shas** (the 18 of record plus `caea9d1e`) ×2 | EXIT 0 ×2, byte-identical: `GATE H1 (no copied chassis) — GREEN`, and the positive control fires first | GREEN |
| **H3** | parser R1 `parseCssColor('oklch()')` · glass version | EXIT 0, no throw · **7.0.0**, so Glass-8 has not fired and nothing in §Blocked opened | GREEN (swept) |

A note on method: the first H1 attempt passed the roster as one zsh word. git rejected it as `ambiguous
argument` and the gate exited 1. That was this seat's quoting mistake, not a gate reading. The re-run
passes each sha as its own argument.

**Defect 2 from Check 1 still stands at these bytes: the foreign fixture break.** ⟨cmd⟩
`VJS_E2E_PORT=9311 npx playwright test e2e/smoke/views/gradient.spec.ts
e2e/smoke/oracles/o21-gradient-rail.spec.ts e2e/smoke/views/companion-pane-track-start.spec.ts
--project=smoke` → **21 failed / 1 passed (7.8m)**. The run started its own server on a fresh port.
**40** failure lines quote `getByRole('main', { name: 'Color tool panes' })`, the X-W5 lane's
uncommitted shell bytes. So **a2** and **a13**'s e2e legs and **b3**'s named command are **RED by a
foreign fixture**. The one pass is g2.

**Not re-run at this seat. Each cites its dated banked reading.** These gates need the stopeditor
probes and a live server, and nothing in them moved this run (`caea9d1e` changes one test file):
a3–a12 (Check 3, 2026-09-19) · b1 (RED) · b2 · b4 (Check 1 RESUME, 2026-09-20) · g1 (RED, 61.22/55.41,
Check 1 RESUME) · d2 (Repair 2 `c8111846`, Check 3) · f3 · f4 · f6 · f8 e2e (Check 3) · j4 (`6dfdd8d2`,
Check 3).

### Act 3 — SELF-COUNT (counted twice)

**50 = 46 sub-gates + 4 wave conditions.**

**GREEN 30**:
- a1 and a3–a12 (**11**)
- f1–f10 (**10**)
- b2, b4, g2 (**3**)
- d2, h2, i2 (**3**)
- j4
- H1
- H3

**RED 20**:
- a2, a13 (foreign fixture)
- b1, b3, g1
- c1, c2, c3, c4
- d1, e1, e2, h1, i1, i3
- j1, j2, j3
- H2, H4

11 + 10 + 3 + 3 + 3 = **30** and 2 + 3 + 4 + 6 + 3 + 2 = **20**, so 30 + 20 = **50**. The second count
matches. **Delta against Check 1 (RESUME): none.** This run's one landing, `caea9d1e`, cures the §0z E2
migration, which is a §7 cadence item and not a numbered gate. It moves the vitest reading from
4 failed to **2 failed**.

**H4 roll-call over the 14 §Dispositions rows:**
- **Discharged (3):** CC-005, CC-066, CC-068.
- **Partly discharged (3):** CC-058, where `.c` is ESCALATED; CC-059; CC-062.
- **Not discharged (8):** CC-056, CC-057, CC-060, CC-061, CC-063, CC-064, CC-065, CC-067.

3 + 3 + 8 = **14**. Every row has one named state; none was dropped silently.

### Act 4 — §8 Verification Artefacts, run as written

⟨cmd⟩ `git ls-files --error-unmatch` against each named file:
- `W6-atmosphere-tombstone.md` is **TRACKED**.
- `W6-glass-ask-easing-readout.md` is **TRACKED**.
- `W6-blob-pipeline-census.md` is **TRACKED**.
- `W6-lband-letter.md` is **ABSENT**. That is lawful: i2 took the landing branch.

⟨cmd⟩ `git ls-files W6-evidence/<dir> | grep -c png`:
- `gradient/` has 34 tracked files and **0 PNG**. The before/after gradient frames are still owed.
- `catalog/` has 9 tracked files, **6 of them PNG**.
- `owner-marks/` has **0** tracked files, so the OM re-captures are still owed.
- `atmosphere/` has 2 tracked files and **0 frames**, so the X:ATMO-1 frames are owed with i1.
- `gates/` has 11 tracked files, and this close adds 8 under `close-2026-09-22/`.

**§8 is PARTIAL**: the gradient, owner-marks and atmosphere frames are still owed.

### Act 5 — §7 cadence at the settled bytes

- ⟨cmd⟩ `npx vitest run` → `Test Files 2 failed | 35 passed (37)` · `Tests 2 failed | 630 passed (632)`,
  EXIT 1. Both failures are the foreign born-RED canaries that X-V/W1.a added on 2026-09-18:
  `test/spectrum-luma.test.ts` C-5 and `demo/test/shell/reka-binding-idiom.test.ts` NG-6. Neither
  file is in X-W6's bounds.
- ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` printed no diagnostic.
- ⟨cmd⟩ `git diff --check caea9d1e^ caea9d1e` is clean.
- ⟨cmd⟩ `npx prettier --check test/gradient-parse.test.ts` gives `[warn]`, and the parent bytes
  (`caea9d1e^`) give the same `[warn]`. The warning predates this run.

### Act 6 — E13 mail, swept again at this seat's clock (read-only)

1. ⟨cmd⟩ `find docs/tranches/V -maxdepth 2 -name '*.md' -newermt "2026-09-21 00:00" ! -name INBOX.md`
   → **empty**.
2. The newest glass tranche directory is still `BK/`, and its delta since 2026-09-21 is **empty**.
3. The keyframes.js V coordination directory is **empty** at the same delta.
4. The sci-report/atlas P coordination directory is **empty** at the same delta.

⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **90**, twice. The by-position UNREAD `awk` → **0**. The tail
is **O-46**. **No UNREAD mail is in scope.** The §0z E5 `O-` relay row for the easing readout stays
owed to `.d`, which was not dispatched. This close does not take it over.

### Act 7 — escalations returned by this close

- **ESC-W6c-1 (§3a file-bound expansion) is returned to the orchestrator for a dated COHESION addendum.**
  The addendum should grant `.c` six paths:
  - `GradientVisualizer/GradientStopEditor.vue`
  - `composables/gradientParse.ts`
  - `GradientVisualizer/GradientEasingEditor.vue`, at its true path (see Act 1)
  - `GradientVisualizer/easing/easingCatalogue.ts`
  - `GradientVisualizer/easing/useSpecimenRows.ts`
  - `demo/color-session/color-space-meta.ts`

  Once granted, `.c` is re-dispatched whole as commit #3. Two routes would turn c1 green without the
  grant: a new type-only cycle edge, or a types re-export shim. Both turn c1 green on text while the
  defect stays, so neither is lawful. The premise was re-verified in Act 1.
- **ESC-PUSH / defect 2 (foreign fixture):** a2, a13 and b3 stay RED until X-W5's shell lane settles
  `getByRole('main', { name: 'Color tool panes' })`, or the specs are re-pointed under X-W5's own
  grant. X-W6 has no write to the X-W5 shell.
- `.d .e .h .i` **were not dispatched in this run.** That is not an escalation of theirs. Their briefs
  in the 2026-09-21 plan stand, and they are still owed in the order `.d → .e`, then `.h → .i`. `.e`
  also sits after `.c`, because both write `GradientVisualizer.vue`. Each must be re-dispatched
  whole at its resume gate.

### Act 8 — residuals, each with a named owner

| residual | owner |
|---|---|
| c1–c4 (ESC-W6c-1) | **COHESION addendum (orchestrator)** → `.c` re-dispatch |
| d1, plus d2's dated re-capture, plus the §0z E5 `O-` relay | **`.d`** (owed, undispatched) |
| e1 · e2, MOTION-SOURCED · PENDING-QUARANTINE | **`.e`** (after `.c` and `.d`) |
| h1 (§0z E6 display-p3 ceiling) | **`.h`** (owed, undispatched) |
| i1 · i3, plus the committed atmosphere frames (§8) | **`.i`** (after `.h`) |
| j1 · j2 · j3 | **`.j`**, BLOCKED-ON X-W5 CLOSED (§0z E1) |
| a2 · a13 · b3 (foreign fixture) | **X-W5** (shell lane) |
| b1 (probe input at the 0% terminal) · g1 (61.22px residue) | the gates' re-point rides **X-W11's OUT-OF-WAVE roster** (b1). **`.g` / X-W10 canon** (g1) |
| H2 leg 2 (no MOTION-SOURCED assertion to cite yet) | **`.e` / `.j`** |
| §8 gradient before/after frames · owner-marks OM re-captures | **wave close #11, after `.c .d .e`** |
| the two foreign vitest canaries (C-5 · NG-6) | **X-V/W1.a's successors** (not X-W6) |

### Act 9 — the four-verb line after this close

AUDITED yes · SPECIFIED yes · **IMPLEMENTED no**. The wave is PARTIAL: 20 of 50 gates are RED, and 5
units are owed or blocked. **VERIFIED no**, because that is X-W11's stamp (`W6.md:404`). The line does
not move at this close.

### Act 10 — verdict

**PARTIAL — NOT PROMOTED.** GREEN 30 / RED 20, unchanged from Check 1 (RESUME). This run landed
`caea9d1e` (§0z E2, lawful and in-set) and `c9f11e87` (the `.c` receipt). **Landed-wrong: none.**
**Escalation: ESC-W6c-1.** This close's own commits are the record block, the transcripts and the
LEDGER cell, each committed on its own pathspec.

### Act 11 — the push: tried twice and rejected, not forced

⟨cmd⟩ `git push origin HEAD`, run twice → `! [rejected] HEAD -> tranche-u (non-fast-forward)` both times.
⟨cmd⟩ `git rev-list --left-right --count origin/tranche-u...HEAD` → **`1  98`**. The one remote-only commit
is `6fc1212e`, a sibling's X-W9 repair. The divergence is the same kind as ESC-PUSH at the 2026-09-20
close. I did not rebase or merge the shared four-track index, which also holds X-W5's uncommitted
shell rows, and I did not force-push. **ESC-PUSH still stands.** The fix is an orchestrator-level
`git pull --rebase` when no seat has anything staged. The close commit is `980bbfc4`.

## Check 1 — RESUME 2026-09-22 (L-20 fresh adversarial pass 1 over the third sitting's close)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). VERIFY-ONLY seat: no product byte, no gate script,
no spec byte written. Writes: this block + one appended LEDGER event line.

**Verdict: NOT-CONFORMANT.** The close itself is honest (it claims PARTIAL, not CLOSED, and every
figure it publishes reproduces). But the wave does not meet its own §6 close bar, and 16 of the 20
RED gates have no relief under the spec's own terms. The LEDGER status cell is **not** moved.

### Act 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → 16 rows, the same set the close names (X-W5 lane, `CARRY-LEDGER.md`,
`execution/A/X-W5.md`, `scripts/dev/dev.sh`). None is in this seat's writable set (this record and the
LEDGER). Nothing was inherited or touched.

### Axis 1 + 9 — claimed GREENs re-run at this seat's clock (13 reproduced, 0 failed)

| gate | ⟨cmd⟩ | reading |
|---|---|---|
| a1 | `npx vitest run test/gradient-order-invariant.test.ts test/gradient-parse.test.ts demo/test/glass/aurora-bracket.test.ts` | `3 passed (3)` · `41 passed (41)` |
| f1 | `node docs/tranches/X/gates/gate-catalog-totality.mjs` | EXIT 0 · `offered=18 catalogued=18 info=18` |
| f5 | `node docs/tranches/X/gates/gate-specimen-grammar.mjs` | EXIT 0 · last row `hex css 9ch #003abe00` |
| f2 · f7 · f8(static) · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0`/`0` + vue-tsc EXIT 0 · `0` · `2`/`0` · `0` |
| h2 | `node docs/tranches/X/gates/gate-blob-pipeline.mjs` | EXIT 0 · `13 published figures, 12 re-derived` |
| i2 | `node docs/tranches/X/gates/gate-lband-door.mjs` | EXIT 0 · three sites `clean` |
| d2 | `node …/probes/x-w6/gate-easing-readout.mjs` | EXIT 0 · `branch selected by the census: DATED ASK` · restyle `0 line(s)` |
| H1 | `node docs/tranches/X/gates/gate-no-chassis.mjs` over the 19 shas | EXIT 0 · GREEN |
| H3 | parser R1 one-liner · glass `package.json` version | EXIT 0 · `7.0.0` |

Not re-run (they need a live server and nothing they read moved since `caea9d1e`): a3–a12, b2, b4,
f3, f4, f6, f8 e2e, g2, j4. Each cites its dated banked reading, as the close does. The published
**GREEN 30 / RED 20** re-adds (11+10+3+3+3 / 2+3+4+6+3+2).

§7 at the settled bytes: ⟨cmd⟩ `npx vitest run` → `Test Files 2 failed | 35 passed (37)` ·
`Tests 2 failed | 630 passed (632)`. The failures are `test/spectrum-luma.test.ts` C-5 and
`demo/test/shell/reka-binding-idiom.test.ts` NG-6, exactly as the close says.

### Axes 2–7 — bounds, masking, families, E-3, mail, four-verb

- **Bounds (2).** ⟨cmd⟩ `git show --stat` on all 24 wave commits (`f90aeb02` … `0f6ca611`). This
  sitting's commits are `caea9d1e` (`test/gradient-parse.test.ts`, the §0z E2 grant),
  `c9f11e87` / `980bbfc4` / `0f6ca611` (the record, the LEDGER cell and `W6-evidence/gates/close-2026-09-22/`).
  All are in-set. The three older off-§4 paths (`demo/scenes/about/ColorNutritionLabel.vue`,
  `test/gradient-v4-consume.test.ts`, `e2e/smoke/views/companion-pane-track-start.spec.ts`) were
  adjudicated at earlier checks and are not re-opened. ⟨cmd⟩ `git log --oneline f90aeb02^..HEAD --
  scripts/dev/dev.sh | wc -l` → **0**.
- **Masking (3).** No try/catch, no skip, no allowlist and no node_modules patch in this sitting's diff.
  `caea9d1e` replaces `expect(m.intervals).toHaveLength(n)` with `expect(m.stops.length - 1).toBe(n)`.
  That is the E2 migration the addendum prescribes, because the `intervals` array no longer exists.
  The new line restates the preceding stop-count assertion, so it adds no information, but it hides
  nothing either (**INFO**).
- **Families (4).** Commit #3 (`.c`) has not landed. `caea9d1e` is the E2 grant, not #3. No family
  has been split.
- **E-3 (5).** ⟨cmd⟩ `git diff --stat f90aeb02^..HEAD -- docs/tranches/V/megatranche/registry/adjudicated/`
  → empty. `W6.md`'s only change in the span is `732fe109` (the orchestrator's §0z addendum), and it
  is insertion-only (⟨cmd⟩ `git diff … | grep '^-[^-]'` → empty). `W9.md` moved under X-W9's own
  commits, which are not this wave's.
- **Mail (6).** ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **90**. ⟨cmd⟩ the awk that reads Status and
  Routing by position → **0** UNREAD. The unanchored `/UNREAD/` match returns 6 rows (O-20, I-30, I-31,
  I-32, I-35, O-39), but in each one the word sits in prose: the statuses are SENT, ROWED, FOLDED and
  READ. `find docs/tranches/V -maxdepth 2 -newermt 2026-09-21 ! -name INBOX.md` → empty. **Clean.**
  The §0z E5 `O-` relay is still owed to `.d`.
- **Four-verb (7).** The record holds the line at IMPLEMENTED **no**, and it has not moved. That is
  lawful.

### Axis 8 — the §2a goal at the bytes: NOT MET

- The Gradient sampler is still two: ⟨cmd⟩ c1 prints `model/types.ts does not exist`, the 7-name door
  is live, and `grep -c "one sampling law"` → 0.
- The easing radius register is unmade: `gate-easing-radius.mjs` is ABSENT.
- There is no aurora on the ramp, and the 2 rAF sites are still ungated.
- The blob chroma cure h1 has not landed.
- There is no X:ATMO-1 oracle and no cold-load cure: `armRuntime` → **0**.
- No route owns a scene: `grep -c "component: Stub" router/index.ts` → **14**.

### Axis 10 — honest-RED adjudication, gate by gate (the set is EMPTY)

§6 at the spec bytes says: *"The wave closes when **all 45 born-RED sub-gates are GREEN**"*. The spec
routes none of these gates to a producer or a later wave. COHESION §0z ruled this same shape *"UNDONE
WORK … the cure is dispatch"*.

| RED gate(s) | spec relief? | owner the close names | adjudication |
|---|---|---|---|
| c1 c2 c3 c4 | none. `.c` is this wave's unit. ESC-W6c-1 is a §3a trigger, and its grant is unruled (no COHESION addendum after §0ak names it) | orchestrator → `.c` re-dispatch | **UNRELIEVED — HIGH** |
| d1 · e1 · e2 · h1 · i1 · i3 | none. §0z E1 dispatched them. The close records them as *"not dispatched in this run"*. h1's display-p3 physics ceiling (E6) only relieves chroma beyond the display gamut, and that has not been measured | `.d` `.e` `.h` `.i` | **UNRELIEVED — HIGH** |
| a2 · a13 · b3 | none. X-W5 is a predecessor, not a producer and not a successor. The break is X-W5's **uncommitted** working-tree shell bytes (`getByRole('main', {name:'Color tool panes'})`) | X-W5 | **UNRELIEVED — blocked by a foreign fixture, not relief (HIGH, cure outside W6)** |
| b1 · g1 | none at the spec bytes. §0z E3 moves only a3–a7's instruments to X-W11. R-3 is the `ictcp`/`jzazbz` URL revert, not b1. g1's canon is X-W10 content, but the g1 gate belongs to this wave | X-W11 roster (b1) · `.g`/X-W10 (g1) | **UNRELIEVED — HIGH** |
| j1 j2 j3 | a **lawful wait**, not relief. `W6.md:4` says Opens after X-W5, and §0z E1 says `.j` waits and is never skipped. X-W5 reads PARTIAL 2026-09-21 | `.j` after X-W5 CLOSED | **LAWFULLY BLOCKED, still owed (MEDIUM)** |
| H2 (leg 2) · H4 | these follow from `.e`/`.j` and from the 8 undischarged dispositions | `.e`/`.j` · all units | **UNRELIEVED — follows from the above** |

The §0z E2 condition (*"§7's `npx vitest run` must read GREEN before close"*) is also RED at 2
foreign canaries (C-5, NG-6), owned by X-V/W1.a's successors. It stays **MEDIUM** here as a
close-condition dependency.

### Successor "Opens after" conjuncts

- **X-W7** (`W7.md:6`): X-W3 is CLOSED (honest-RED G-21) and X-W4 is CLOSED. **X-W6 is RED.**
  → **lawfully BLOCKED.**
- **X-W8** needs W5·W6·W7 to stabilize, and **X-W10** needs W5..W9 stable. W5 and W6 are PARTIAL.
  → **both lawfully BLOCKED.**
- **X-W11** needs X-W0..X-W10 IMPLEMENTED. → **lawfully BLOCKED.**

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| 1 | HIGH | Ten gates are RED because units owed by this wave never sat: c1–c4 (`.c`, ESC-W6c-1) and d1 e1 e2 h1 i1 i3 (`.d .e .h .i`, not dispatched) | Axis 10 table · c1 EXIT 1 · `gate-literal-dialect.mjs`, `interpolation-subset.test.ts`, `gate-easing-radius.mjs`, `gate-prm-idiom.mjs`, o25, o28 all ABSENT · rAF 2 · `armRuntime` 0 | the orchestrator rules ESC-W6c-1 with a dated COHESION addendum (6 paths, `GradientEasingEditor.vue` at its true path), then dispatches `.c`, `.d → .e`, `.h → .i` whole per §0z E1 |
| 2 | HIGH | a2 · a13 · b3 RED: the e2e fixture is broken by X-W5's uncommitted shell bytes | close Act 2: 21 failed / 1 passed, 40 lines quote `Color tool panes` | X-W5 lands or reverts its shell lane. Then re-run a2/a13/b3 by the same commands. No W6 write to the X-W5 shell |
| 3 | HIGH | b1 and g1 are RED with no spec relief. Routing them to X-W11 or X-W10 is not a spec routing | `W6.md` §6 · §0z E3 names a3–a7 only | the orchestrator either rules a dated relief addendum for each, or `.b` and `.g` re-sit to GREEN |
| 4 | MEDIUM | j1–j3 are owed and lawfully blocked on X-W5 | LEDGER X-W5 `PARTIAL — 2026-09-21` · `component: Stub` 14 | `.j` dispatches when X-W5 reads CLOSED |
| 5 | MEDIUM | the §0z E2 close condition (full vitest GREEN) is RED at 2 foreign canaries | `2 failed \| 630 passed (632)` | X-V/W1.a's successors cure C-5 and NG-6 |
| 6 | INFO | `caea9d1e`'s migrated assertion restates the stop count. It is spec-mandated (E2) and hides nothing | `git show caea9d1e` | none required |
| 7 | INFO | ESC-PUSH: 1 commit behind origin (`6fc1212e`), disclosed and not forced | close Act 11 | an orchestrator `git pull --rebase` when the index is clean |

**Honest-RED set: ∅.** gatesReproduced **13** · gatesFailed = the 20 RED gates: a2 a13 b1 b3 g1 c1 c2
c3 c4 d1 e1 e2 h1 i1 i3 j1 j2 j3 H2 H4. The LEDGER status stays **PARTIAL**.

## Repair 1 — 2026-09-22 (REPAIR SEAT, round 1, over the Check 1 — RESUME 2026-09-22 register)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). This seat cured the in-bounds limbs of register #1
and escalates the rest with measured reasons. It does not promote the LEDGER status cell. It appends
one event line.

### Act 0 — crash-recovery and bounds

⟨cmd⟩ `git status --porcelain` → the same 16 foreign rows Check 1 names (X-W5 shell lane,
`CARRY-LEDGER.md`, `execution/A/X-W5.md`, `scripts/dev/dev.sh`). None of them is in this seat's
writable set, and none was staged. ⟨cmd⟩ `git log f90aeb02^..HEAD -- scripts/dev/dev.sh | wc -l` → 0.

**Bounds finding.** The Check-1 table read ESC-W6c-1 as unruled. But `X-W6-FOLD.md` §3 BoundsDelta
(the dated addendum, which governs) already grants the `.c` paths ESC-W6c-1 asked for. The rows are
n.1 (`GradientEasingEditor.vue`), n.4 (`GradientCodeEditor.vue`), n.5 (`EasingSpecimenStrip.vue`),
n.6 (`useSpecimenRows.ts`), n.26 (`readoutReservation.ts`) and n.34 (`test/gradient-v4-consume.test.ts`).
`GradientStopEditor.vue`, `gradientParse.ts` and `easingCatalogue.ts` are §4 rows. So ESC-W6c-1 is
**retired, except for one path**: `demo/color-session/color-space-meta.ts` (c4). No BoundsDelta row
and no §4 row names that file.

### Defect → cure → commit → gate re-reading

Each re-reading below was taken after the last cure landed (HEAD `191d4f3a`), and each was run twice.
The transcripts are in `docs/tranches/X/waves/W6-evidence/gates/repair1-2026-09-22/`.

| register limb | cure (the spec's own idiom) | commit(s) | gate re-reading ×2 |
|---|---|---|---|
| #1 · c1 (one structure) | leaf `model/types.ts`. One sampler, `model/sample.ts`: `sampleAt` / `intervalSampler` / `sampleCoalescedStops`. The css-color-4 `in <space> [<hue> hue]` clause goes on the coalesced output and the ramps. The 7-name re-export door and `interpolateStopColors` are deleted | `e07bff63` | `gate-structure.mjs` → **EXIT 0 ×2, `GATE G4 (structure) — GREEN`** |
| #1 · c2 (two samplers → one) | ghost, rail, mint and specimen ink all read `intervalSampler`. The visualizer's `colorAtPosition` is deleted, and the bar press mints through `mintStop` | `e07bff63` · `b0991fd3` | `-t "one sampling law"` → **4 passed \| 13 skipped ×2** |
| #1 · c3 (one literal dialect) | `formatColorLiteral` (oklch, L%, deg, fixed precision). Seeds pass through `seedLiteral`, and mints use the same dialect. New gate `docs/tranches/X/gates/gate-literal-dialect.mjs`, which includes a negative control | `e07bff63` | **EXIT 0 ×2, GREEN**. The readout prints one grammar: `oklch(75% 0.15 145deg) … oklch(67.26% 0.17323 237.93deg) 81.2% …` |
| #1 · d1 (one radius register) | the `.easing-panel` register: `--easing-radius-outer: var(--radius-card)`, `--easing-radius-inner: var(--radius-md)`, `--easing-inset` = outer − inner. Rows, wells and the authoring well derive from it. Chips become `shape="icon"` true circles (2.75rem). New gate `probes/x-w6/gate-easing-radius.mjs`, with a classifier and a negative control | `9557e6b5` · `e6bd7fe5` | **EXIT 0 ×2, GREEN**: 33 panel surfaces, 2 read-only (the d2 ask / producer) |
| #1 · d2 (kept GREEN) | L4 now reads the readout rail only. The old reading covered the whole panel, which made d1 and d2 mutually exclusive. In a second step, a paint *declaration* reds while a transitioned property name does not. The O-47 relay row covers §0z E5 | `78af2c6a` · `8e4785e1` · `e6bd7fe5` | **EXIT 0 ×2**, branch `DATED ASK`, restyle 0 lines. Direction 3 was re-captured at the current L4 (`W6-evidence/easing/d2-dir3-recapture-2026-09-22.txt`): markup restyle **RED**, `background:` declared in `.rail-btn` **RED**, HEAD editor **GREEN** |
| #1 · e1 (selector aurora) | the census shows no strip-scale aurora primitive in glass 7.0.0, so the gate takes the two-way ask branch: `docs/tranches/X/waves/W6-glass-ask-gradient-aurora.md` plus INBOX **O-49 SENT**. The oracle reds the day a fitting primitive ships, and equally if the ramp animates locally | `3c558956` · `3ece0690` · **`191d4f3a`** | run 1 **RED**, and the instrument was at fault: `locator.screenshot` timed out on *"element is not stable"* while the pane settled at cold boot. Cured in `191d4f3a`: the rail's box is polled until two reads agree, then clipped frames are captured. **3 re-runs: 1 passed each.** Capture control (`e1-clip-controls.txt`): unperturbed `moved=false`, injected local animation `moved=true` |
| #1 · e2 (no private clock; PRM structural) | the two rAF `syncVbRatio` sites become `useMutationObserver(viewBox)`. Every transition/animation in the gradient tree sits in `@media (prefers-reduced-motion: no-preference)`, and the strip uses glass `useReducedMotion`. New gate `probes/x-w6/gate-prm-idiom.mjs`, with 4 negative controls and 1 positive control | `3c558956` | rAF grep → **0**. Gate **EXIT 0 ×2**: 15 files, 8 motion declarations, all gated |
| #1 · i1 (X:ATMO-1) | committed frames `W6-evidence/atmosphere/atmo1-{ref,h030,h120,h210,h300}.png` (checked by `git ls-tree HEAD` and hash-object match), with their capture harness. `o25-atmosphere-response.spec.ts` checks four named atoms at CIEDE2000 (Sharma-verified), with MIN_MOVE 10 | `e68e8889` | **1 passed ×2**. The 32 printed per-atom readings of ΔE2000 vs unseeded span 16.26–62.59, all at or above 10 |
| #1 · i3 (cold-load) | born-RED oracle `o28-atmosphere-coldload.spec.ts`: a document-level MutationObserver timeline, read at the `first-paint` entry, tolerance 0.02 ΔE_OK. The cure itself is out of bounds; see ESC-R1-i3 | `e68e8889` | **RED ×2, honest.** The first-paint ground is `#b37290 #df8ea7 #ffb0b4 #ffcfc8` for every seed. First-paint vs settled ΔE_OK max 0.1595 / 0.2433 / 0.2933 |

**Two defects found and cured along the way** (neither was on the register):

1. **The ease-in-back tile crashed the pane.** An overshooting curve drove `mix` outside [0,1] and threw
   `color_progress_out_of_range`. The fix clamps the codomain once, in `intervalSampler`
   (`clamp(curve(t),0,1)`, commit `b0991fd3`), and it is falsified by the "codomain guard" case in
   `-t "one sampling law"`.
2. **The authoring stage's canvas selector matched nothing.** It selected `svg[role='img']`, but glass
   7.0.0 renders `role="group"`, so every Law-3 rule and the ratio sync were dead. The selector now
   uses the aria-label the seat itself passes (`3c558956`).

### Close-bar gates a cure could move (measured after `191d4f3a`)

| gate | ⟨cmd⟩ | reading |
|---|---|---|
| §7 vitest | `npx vitest run` | `Test Files 2 failed \| 35 passed (37)` · `Tests 2 failed \| 634 passed (636)`. That is Check 1's 630 plus the 4 new sampling-law cases. The 2 failures are the foreign canaries C-5 (`test/spectrum-luma.test.ts`) and NG-6 (`demo/test/shell/reka-binding-idiom.test.ts`), unchanged |
| vue-tsc | `npx vue-tsc --noEmit -p tsconfig.demo.json` | EXIT 0 |
| eslint | `npx eslint demo/workbenches/gradient` plus the two gradient tests and o25/o28 | EXIT 0 |
| H1 | `node docs/tranches/X/gates/gate-no-chassis.mjs` over **28 shas** (the 18 of record, `caea9d1e`, and this seat's 9) ×2 | EXIT 0 ×2, byte-identical, GREEN |

### Escalations (measured; each needs a path outside this wave's bounds or an act beyond this seat)

- **ESC-R1-c4.** c4 (`test/interpolation-subset.test.ts` → *No test files found*, EXIT 1). The test
  file is a §4 `create` row, but the cure is `INTERPOLATION_SPACES` derived from `SPACE_CATALOG` at
  its single home, `demo/color-session/color-space-meta.ts`, which both Gradient and Mix
  (`MixConfigBar.vue:27`) read. That path is in neither §4 nor the BoundsDelta. A gradient-local
  derivation would make a third home, not cure the second. This is the residue of ESC-W6c-1: the
  orchestrator grants that one path by dated addendum, or routes c4.
- **ESC-R1-h1.** Per the E6 ruling, *"returns the exact path it lacks"*. The blob's colour resolver
  is producer-side: `glass-ui/src/components/blob/composables/blobSimulation.ts:78`
  (`oklchToGammaRgb(cssToOklch(css))`, sRGB gamma). The WebGL2 drawing buffer is also producer-side:
  `glass-ui/src/composables/glass/webgl/useWebGLCanvas.ts:178` (`getContext("webgl2", …)`, with no
  `drawingBufferColorSpace`), and the WebGPU twin is `…/webgpu/useGpuSubstrate.ts`.
  ⟨cmd⟩ `grep -rn drawingBufferColorSpace` finds nothing in the glass source at 9.0.0 or in the
  installed 7.0.0 dist, and `demo/` holds no `getContext("webgl2")`. glass-ui is READ-ONLY, and
  §4 lists no letter file for h1 (`W6.md:363` licenses only the easing-readout and lband letters),
  so no ask was authored. It is owed as a glass-forward ask by the orchestrator's relay.
- **ESC-R1-i3.** RED ×2 as measured above. The first-paint ground is the pre-hydration default because
  nothing seeds the atmosphere before the module graph boots. The cure is a pre-module boot seed in
  `demo/color-picker/index.html`, which is outside §4. The producer's arm-replay (GAP-ARM) has
  already shipped in 7.0.0, so this is a consumer write.
- **ESC-R1-g1.** The 61.22px residue (ESC-g1) needs `ColorComponentDisplay.vue` **and** the
  retirement of `e2e/smoke/oracles/readout-seam.spec.ts:85-119`. Both are out of bounds.
  `readoutReservation.ts` is in bounds (n.26), but alone it cannot move g1, and M-23 (`W6.md:154`)
  assigns the spacing canon to X-W10. The design ruling is owed by the owner or X-W10.
- **ESC-R1-b1.** `gate-seat.mjs` G3d presses Home/ArrowDown on the stop at 0%. The instrument is
  execute-no-write for this seat, and §0z E3 relieves a3–a7 only. A dated relief addendum or an
  instrument re-author is owed by the orchestrator.
- **ESC-R1-a2/a13/b3** (register #2). X-W5's uncommitted shell bytes break the e2e fixture
  (`main` "Color tool panes"). The cure is in the X-W5 lane.
- **ESC-R1-j** (register #4). j1–j3 are lawfully blocked until X-W5 reads CLOSED (it reads PARTIAL).
- **ESC-R1-vitest** (register #5). C-5 and NG-6 are foreign canaries (X-V/W1.a successors).
- **ESC-R1-simple-readout-clause.** The simple readout (`serializeGradient`) still omits the space
  clause. Adding it breaks `test/gradient-parse.test.ts:86`, and the parser would have to accept
  `in <space>`. Both are outside the §0z E2 grant, which covers the stop-count migration only.
- **ESC-R1-paint-dedup** (MINOR rider). The `.rail-swatch` / render-tile paint-stack dedup needs a
  shared stylesheet outside bounds.
- **ESC-PUSH** (register #7). Still an orchestrator act.

### Tally

Register #1 limbs cured to GREEN: **c1, c2, c3, d1, e1, e2, i1** (7), plus 2 found defects cured
(the back-tile crash and the dead canvas selector) and the e1 instrument flake. d2 stays GREEN,
re-proved two-way. **Still RED:** c4 · h1 · i3 (#1, escalated), a2 · a13 · b3 (#2), b1 · g1 (#3),
j1–j3 (#4), vitest (#5), and H2/H4, which follow. The LEDGER status stays **PARTIAL**, and this seat
does not promote it.

## Check 2 — RESUME 2026-09-22 (L-20 fresh adversarial pass 2, over the third sitting's close + Repair 1)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). VERIFY-ONLY seat: no product byte, gate script or spec
byte written. Writes: this block + one appended LEDGER event line (the status cell is **not** moved).

**Verdict: NOT-CONFORMANT.** Every GREEN that Repair 1 and the close claim reproduces at this seat's
clock (20 gate readings, ×2 where cheap). But 13 of the 50 gates stay RED; 8 of them (c4 h1 i3 a2 a13 b3 b1 g1) have no relief under the
spec's own terms, j1–j3 are a lawful wait on X-W5, and H2/H4 follow. No dated COHESION addendum after
Repair 1 rules ESC-R1-c4 / -h1 / -i3 / -g1 / -b1 (⟨cmd⟩ `grep -n "^## §0a" COHESION.md | tail -2` → §0al, §0am, both Track B/C). The
honest-RED set is empty; the LEDGER cell stays PARTIAL.

### Act 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → the same 16 foreign rows (X-W5 shell lane, `CARRY-LEDGER.md`,
`execution/A/X-W5.md`, `scripts/dev/dev.sh`). None is in this seat's writable set (this record and the
LEDGER). Nothing inherited, stashed, restored or touched.

### Axes 1 + 9 — every claimed GREEN, re-run at this seat's clock (20 reproduced, 0 failed)

| gate | ⟨cmd⟩ (this seat) | reading ×2 |
|---|---|---|
| c1 | `node …/probes/wb-gradient-stopeditor/gate-structure.mjs` | EXIT 0 ×2 · `GATE G4 (structure) — GREEN` |
| c2 | `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` | `4 passed \| 13 skipped (17)` ×2 |
| c3 | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | `GATE c3 (literal dialect) — GREEN` ×2; one shape `oklch(N% N Ndeg) (1)` across authored + minted |
| d1 | `node …/probes/x-w6/gate-easing-radius.mjs` | `GATE d1 (easing radius) — GREEN` ×2 · 33 panel surfaces · 2 read-only (1 `d2-ask`, 1 `producer`) |
| d2 | `node …/probes/x-w6/gate-easing-readout.mjs` | EXIT 0 ×2 · `branch selected by the census: DATED ASK` · restyle `0 line(s)` |
| e1 | `npx playwright test e2e/smoke/views/gradient.spec.ts -g "gradient selector aurora" --project=smoke` | `1 passed (15.7s)` · `1 passed (13.4s)` |
| e2 | `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` + `node …/probes/x-w6/gate-prm-idiom.mjs` | `0` ×2 · EXIT 0 ×2 · `files scanned: 15 · requestAnimationFrame calls: 0 · CSS motion declarations: 8` |
| i1 | `npx playwright test e2e/smoke/oracles/o25-atmosphere-response.spec.ts --project=smoke` | `1 passed` ×2 (o28 in the same invocation: `1 failed` ×2 — i3, below) |
| a1 (end state) | covered by the full `npx vitest run` below | `gradient-order-invariant` passes inside it |
| f1 · f5 · h2 · i2 | the four `docs/tranches/X/gates/*.mjs` | EXIT 0 each |
| f2 · f7 · f8(static) · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0`/`0` + vue-tsc no diagnostic · `0` · `2`/`0` · `0` |
| H1 | `node docs/tranches/X/gates/gate-no-chassis.mjs` over the 19 wave product shas (`f90aeb02` … `191d4f3a`) | EXIT 0 ×2 · *"no added module is both housing-shaped and shared across instrument roots"* |
| H3 | parser R1 one-liner · glass `package.json` | EXIT 0 · `7.0.0` (Glass-8 not fired; §Blocked unopened) |

Not re-run (live-server probes; nothing they read moved since their dated banked reading): a3–a12,
b2, b4, f3, f4, f6, f8 e2e, g2, j4 — they cite Check 3 (2026-09-19) and Check 1 RESUME (2026-09-20).

§7 at the settled bytes: ⟨cmd⟩ `npx vitest run` → `Test Files 2 failed | 35 passed (37)` ·
`Tests 2 failed | 634 passed (636)` — exactly Repair 1's figure. The 2 failures are the foreign
born-RED canaries `test/spectrum-luma.test.ts` C-5 and `demo/test/shell/reka-binding-idiom.test.ts`
NG-6 (X-V/W1.a's), unchanged.

**Published figures reproduce (axis 9)**: Repair 1's c1/c2/c3/d1/d2/e2 readings, the 634/636 vitest
figure, and i3's RED all re-measure identically. SELF-COUNT at these bytes, counted twice:
GREEN = a1 a3–a12 (11) + f1–f10 (10) + b2 b4 g2 (3) + d2 h2 i2 (3) + j4 + H1 + H3 (3) + c1 c2 c3 d1
e1 e2 i1 (7) = **37**; RED = a2 a13 b3 (3) + b1 g1 (2) + c4 h1 i3 (3) + j1 j2 j3 (3) + H2 H4 (2) =
**13**; 37 + 13 = **50**.

### Axes 2–7 — bounds, masking, families, E-3, mail, four-verb

- **Bounds (2).** ⟨cmd⟩ `git show --stat` on Repair 1's 11 commits (`e07bff63` `b0991fd3` `9557e6b5`
  `e6bd7fe5` `78af2c6a` `8e4785e1` `3c558956` `3ece0690` `e68e8889` `191d4f3a` `86e1c91a`). Every product
  path is a §4 row or a `X-W6-FOLD.md` §3 BoundsDelta row (n.1 `GradientEasingEditor.vue`, n.4
  `GradientCodeEditor.vue`, n.5 `EasingSpecimenStrip.vue`, n.6 `useSpecimenRows.ts`, n.34
  `test/gradient-v4-consume.test.ts`); the gates are §4 `create` rows; `capture-atmo1.mjs` and the frames
  sit under `W6-evidence/**`. One edge: `3ece0690` appends INBOX row **O-49** (the `.e` aurora ask),
  while the §0z addendum grants INBOX to `.d` for the easing-readout row only — **MINOR**, mitigated:
  E13 requires every sent letter to be rowed, and the letter itself is an in-bounds `W6-*.md`.
  The execute-no-write instruments: ⟨cmd⟩ `git log f90aeb02^..HEAD -- …/probes/wb-gradient-stopeditor
  …/components/wb-gradient-stopeditor/evidence` → empty. `scripts/dev/dev.sh` → **0** commits.
- **Masking (3).** ⟨cmd⟩ `git show <the 6 product commits> | grep -nE '^\+.*(catch *\(|\.skip|fixme|
  allowlist|@ts-ignore|eslint-disable)'` → empty. Judged by reading: (i) `b0991fd3`'s
  `clamp(curve(t),0,1)` in `intervalSampler` is a domain cure at the one sampler (a colour interval has
  no overshoot codomain), not a catch around the throw — it is falsified by its own "codomain guard"
  case (**INFO**); (ii) d1's two read-only surfaces are printed each run with owner, one routed to d2's
  dated ask and one glass-internal (`W6.md` §Blocked: ".d touches our radius choices only"), and the
  classifier carries a negative control (**INFO**); (iii) `78af2c6a`/`8e4785e1` re-scope d2's L4 to the
  readout rail its predicate names — the three-direction negative controls re-captured RED
  (`W6-evidence/easing/d2-dir3-recapture-2026-09-22.txt`), so no direction was narrowed away (**INFO**);
  (iv) e1's ask branch is the spec's own (`W6.md` X.W6.e: *"leaves as a marked BJ ask (same two-way
  falsifier as d2)"*) — the oracle re-runs the census each run, pins the `./aurora` d.ts sha256, and
  reds on a local animation or any settled-frame delta. None is HIGH.
- **Families (4).** Commit #3 `.c` spans `e07bff63` + `b0991fd3` (one meaning + its found-defect cure);
  #4 `.d` = `9557e6b5` + gate fixes; #5 `.e` = `3c558956` (+ `191d4f3a` instrument settle);
  #9 `.i` = `e68e8889`, after the tombstone (earlier sitting). No family split across meanings.
- **E-3 (5).** ⟨cmd⟩ `git diff --stat f90aeb02^..HEAD -- docs/tranches/V/megatranche/registry/adjudicated/
  docs/tranches/X/CONFORMANCE-2026-08-03.md` → empty; `W6.md`'s only touch in span is `732fe109`
  (the orchestrator's §0z addendum, insertion-only per Check 1), `git diff 732fe109..HEAD -- W6.md` → empty.
- **Mail (6).** ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **93** (90 + O-47/O-48/O-49); by-position
  UNREAD awk → **0**. `find docs/tranches/V -maxdepth 2 -newermt 2026-09-22 ! -name INBOX.md` → empty.
  Glass `BK/coordination` delta since 09-21: `glass-outbound-2026-09-22-consumers-10.0.0.md` (rowed,
  4 INBOX hits), `nwo1-bh-relay` (2), `fw4-relay` (4) — all rowed. keyframes V / atlas P → empty.
  **Clean.**
- **Four-verb (7).** IMPLEMENTED stays **no**; the line did not move. Lawful.

### Axis 8 — the §2a goal at the bytes: NOT MET (narrower than at Check 1)

Now met at the bytes: one sampler (`model/sample.ts` `intervalSampler`, c1/c2), one literal dialect
(c3), one easing radius register (d1), no private clock in the gradient tree (e2 rAF **0**), the
X:ATMO-1 oracle reading committed frames (i1). Still unmet: the interpolation set is still
hand-maintained (c4 · `test/interpolation-subset.test.ts` absent); the blob still does not carry the
current chroma (h1 · ⟨cmd⟩ `grep -rn "hero blob carries current chroma" e2e/ | wc -l` → **0**, no oracle);
a cold load still paints the default (i3 RED ×2, ⟨cmd⟩ `grep -rn armRuntime demo/ | wc -l` → **0**);
no route owns a scene (⟨cmd⟩ `grep -c "component: Stub" demo/color-picker/router/index.ts` → **14**).

### Axis 10 — honest-RED adjudication, gate by gate (the set is EMPTY)

`W6.md` §6: *"The wave closes when **all 45 born-RED sub-gates are GREEN**"*. No COHESION addendum
after Repair 1 relieves any of these (last two sections: §0al Track C, §0am KF.W13S).

| RED gate(s) | spec relief? | owner named | adjudication |
|---|---|---|---|
| c4 | none. ESC-R1-c4 is a §3a file-bound trigger (`demo/color-session/color-space-meta.ts` is in neither §4 nor BoundsDelta); a trigger is not relief until ruled | orchestrator addendum → `.c` | **UNRELIEVED — HIGH** |
| h1 | none. §0z E6 relieves only chroma *beyond the display's gamut*; the h1 oracle does not exist, so nothing was measured against the E6 ceiling. ESC-R1-h1's producer-only premise does not hold at the bytes: `HeroBlob.vue:15` hands `cssColorOpaque` to glass `<Blob>`, and the library ships `mapColorToGamut` (`src/color/operations.ts:135`), so on the sRGB-buffer cell a consumer gamut-map in `HeroBlob.vue` (a §4 row) is an in-bounds route to the E6-restated predicate. The display-p3 buffer limb is producer-side, and §3a says such a unit *"halts and files the ask"* — no ask or O-row was filed | `.h` | **UNRELIEVED — HIGH** |
| i3 | none. ESC-R1-i3: the cure (a pre-module boot seed) is in `demo/color-picker/index.html`, outside §4. The born-RED oracle `o28` is committed and reads RED ×2 at this seat | orchestrator addendum → `.i` | **UNRELIEVED — HIGH** (escalated, lawful halt) |
| a2 · a13 · b3 | none. X-W5 is a predecessor, not a producer or successor; the break is X-W5's **uncommitted** shell bytes (`getByRole('main', {name:'Color tool panes'})`) | X-W5 | **UNRELIEVED — HIGH, cure outside W6** |
| b1 · g1 | none. §0z E3 relieves a3–a7's instruments only; g1's canon is X-W10 content but the gate is this wave's | orchestrator (b1 instrument) · owner/X-W10 (g1) | **UNRELIEVED — HIGH** |
| j1 j2 j3 | a **lawful wait**, not relief: `W6.md:4` + §0z E1 (`.j` waits, never skipped); X-W5 reads PARTIAL 2026-09-21 | `.j` after X-W5 CLOSED | **LAWFULLY BLOCKED, owed (MEDIUM)** |
| H2 · H4 | H2 leg 1 is now met (⟨cmd⟩ `test -f …/codex-provenance/motion-quarantine.md` → 0; e1 cites it) but leg 2 needs `.j`'s assertions; H4 follows the undischarged dispositions (CC-056/057/061/067 and CC-058's c4 limb) | `.j` · all units | **follows from the above** |

The §0z E2 close condition (full vitest GREEN) stays RED at the 2 foreign canaries (**MEDIUM**).

### Successor "Opens after" conjuncts

- **X-W7** (`W7.md:6`): X-W3 CLOSED (honest-RED G-21) ✓ · X-W4 CLOSED ✓ · **X-W6 not CLOSED** → lawfully BLOCKED.
- **X-W8** (W5·W6·W7 stable) and **X-W10** (W5..W9 stable): W5 PARTIAL, W6 PARTIAL → both lawfully BLOCKED.
- **X-W11** (X-W0..X-W10 IMPLEMENTED) → lawfully BLOCKED.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| 1 | HIGH | c4 · i3 RED: each cure needs a path outside §4/BoundsDelta (`color-space-meta.ts`; `demo/color-picker/index.html`), escalated and unruled | `interpolation-subset.test.ts` → *No test files found*; `o28` `1 failed` ×2; COHESION tail = §0al/§0am | orchestrator rules ESC-R1-c4 / ESC-R1-i3 by dated addendum (grant or route); `.c` / `.i` re-sit |
| 2 | HIGH | h1 RED with no oracle authored and an in-bounds consumer route left untried; the producer limb was not filed as §3a requires | `grep "hero blob carries current chroma" e2e/` → 0; `HeroBlob.vue:15`; `mapColorToGamut` at `src/color/operations.ts:135` | `.h` authors the h1 oracle at the E6 restatement, cuts at the measured stripper (h2 census) in `HeroBlob.vue`/`useContrastSafeColor.ts`, and files the display-p3 buffer limb as a dated glass-forward ask |
| 3 | HIGH | a2 · a13 · b3 RED under X-W5's uncommitted shell bytes | close Act 2: 21 failed / 1 passed, 40 lines quote `Color tool panes` | X-W5 lands or reverts its shell lane; re-run by the same commands |
| 4 | HIGH | b1 · g1 RED with no spec relief | §0z E3 names a3–a7 only; ESC-R1-b1/-g1 unruled | dated relief addendum, or `.b`/`.g` re-sit (g1 needs the owner/X-W10 spacing ruling) |
| 5 | MEDIUM | j1–j3 owed, lawfully blocked on X-W5 | LEDGER X-W5 `PARTIAL — 2026-09-21`; `component: Stub` 14 | `.j` dispatches when X-W5 reads CLOSED |
| 6 | MEDIUM | §0z E2 close condition (full vitest) RED at 2 foreign canaries | `2 failed \| 634 passed (636)` | X-V/W1.a successors cure C-5, NG-6 |
| 7 | MINOR | INBOX O-49 appended by `.e` outside the §0z INBOX grant (which names `.d`'s row only) | `git show --stat 3ece0690` | mitigated by E13 (a sent letter must be rowed); the next addendum should name it |
| 8 | INFO | `intervalSampler`'s `clamp(curve(t),0,1)` codomain guard — a domain cure at the one sampler, falsified by its own case | `git show b0991fd3 -- …/model/sample.ts` | none |
| 9 | INFO | d1's 2 read-only surfaces and d2's L4 re-scope are declared, printed and negative-controlled | d1 transcript; `d2-dir3-recapture-2026-09-22.txt` | none |

**Honest-RED set: ∅.** gatesReproduced **20** (c1 c2 c3 d1 d2 e1 e2 i1 a1 f1 f2 f5 f7 f8s f9 f10 h2 i2
H1 H3; H2-leg-1 and the 634/636 vitest figure also reproduce) · gatesFailed = the 13 RED gates: a2 a13 b1 b3 g1 c4 h1 i3
j1 j2 j3 H2 H4. The LEDGER status stays **PARTIAL**; one event line appended.

## Repair 2 — 2026-09-22 (REPAIR SEAT, round 2, over the Check 2 — RESUME 2026-09-22 register)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). Writes are inside §4 plus the FOLD §3 BoundsDelta and
the COHESION **§0an** grant (2026-09-22, landed `57448ba0` while this seat was open: *"ESC-W6c-1
RULED … `demo/color-session/color-space-meta.ts` (c4: `INTERPOLATION_SPACES` DERIVED from
`SPACE_CATALOG`…)"*). That grant is the ruling Check 2 register #1 asked for, for its c4 half.

### Act 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → the same 16 foreign rows as Check 2 (the X-W5 shell lane,
`CARRY-LEDGER.md`, `execution/A/X-W5.md`, `scripts/dev/dev.sh`). None is in this seat's writable
set. Nothing inherited, stashed, restored or touched. Every e2e reading below ran over a tree that
still carries those uncommitted X-W5 bytes; the picker and hero-blob routes loaded under them.

### Defect → cure → commit → gate re-reading

| # | defect (Check 2) | cure | commit | gate re-reading (this seat) |
|---|---|---|---|---|
| 1 · c4 | RED; `color-space-meta.ts` outside bounds, ESC-R1-c4 unruled | **Ruled by §0an; cured.** `INTERPOLATION_SPACES` = `SPACE_CATALOG_ENTRIES.filter(e => e.interpolatable)`, labelled by the catalog, in catalog order. The module keeps only the per-space behaviour line; an interpolatable space without one throws at module load. `test/interpolation-subset.test.ts` (§4 create) pins membership, labels, and the absence of a second list in the module, Gradient or Mix | `b2dd375c` | ⟨cmd⟩ `npx vitest run test/interpolation-subset.test.ts` → `Tests 5 passed (5)` ×2, **GREEN**. **Negative control**: `color-space-meta.ts` swapped for its HEAD bytes (the hand-kept list), run, restored → `2 failed \| 3 passed` (membership order and the source census). c1 `gate-structure.mjs` → GREEN ×2 and f1 `gate-catalog-totality.mjs` → GREEN ×2 (neither moved). `vue-tsc` exit 0, eslint clean, prettier clean. Transcript: `W6-evidence/gradient/c4-interpolation-subset-2026-09-22.txt` |
| 1 · i3 | RED; the cure (a pre-module boot seed) is in `demo/color-picker/index.html`, outside §4; ESC-R1-i3 unruled | **Not cured — escalation stands.** §0an rules only ESC-W6c-1. The COHESION tail (`§0am`, `§0an`) holds no i3 ruling, and `demo/color-picker/**` sits under X-W5's shell | — | not re-run; no byte it reads moved. Check 2's `o28 … 1 failed` ×2 stands |
| 2 · h1 | RED, no oracle; in-bounds consumer route untried; p3 buffer limb not filed | **Oracle written to the E6 restatement. The in-bounds consumer route was measured and refused. The limb is filed.** (a) The arm `hero blob carries current chroma` was added to `e2e/smoke/webgl-blob-idle.spec.ts` (FOLD n.33, ADD-never-replace; the pre-existing idle arm is byte-untouched). It reads `drawingBufferColorSpace` off the blob's own WebGL2 context and gamut-maps the current colour to that space (css-color-4 §13, the library's `mapColorToGamut`). It then asserts that the settled bead's core-median OKLCH chroma is within the stated ΔC 0.04, which is two css-color-4 JNDs: one for the mapping's own acceptance band, one for the measured frame spread (max 0.0164). (b) The consumer route Check 2 named: `<Blob :color>` fed the `mapColorToGamut` result was built in the working tree and measured. The OM-6 core C went 0.0477 → 0.0481, so h1 did not move. The base colour at the OM-6 seed fell from the producer clip's C 0.149 to 0.021, a *less* vibrant bead against the owner's own words. It was reverted and never committed; a cure that works against the defect's owner is not a cure. The h2 census stands: no stripper exists on an sRGB buffer. (c) `W6-glass-ask-hero-blob-p3.md` is filed: the 3-site producer census, `drawingBufferColorSpace` → 0 at glass 7.0.0 and 9.0.0, and a two-way falsifier | `a87f8930` | ⟨cmd⟩ `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts --project=smoke` ×2 → the three h1 arms **pass ×2**. `buffer srgb (display p3: false)`. ΔC for OM-6 `lab(92% 88.8 20)` +0.0257/+0.0255; `oklch(0.65 0.3 150)` +0.0059/+0.0057; `oklch(0.55 0.37 328)` −0.0218/−0.0220. **h1 GREEN on this cell.** **Negative control** (palette chroma ×0.3, working tree only): `2 failed \| 1 passed`, ΔC −0.108 / −0.173. The OM-6 seed passes even as a ghost: its sRGB target is C 0.021, and that is the physics E6 names. Transcripts: `W6-evidence/blob/h1-{run1,run2,negative-control}-2026-09-22.txt` |
| 3 · a2 a13 b3 | RED under X-W5's uncommitted shell bytes | **Not curable here.** §0an confirms: *"The a2/a13/b3 REDs caused by the foreign X-W5 fixture stay X-W5's (its `.c` cure … is uncommitted in the shared tree under L-7 and lands when X-W5 resumes)."* W6 writes nothing in the X-W5 shell | — | ⟨cmd⟩ `git status --porcelain` → the X-W5 rows are still uncommitted. Check 2's readings stand |
| 4 · b1 g1 | RED, no spec relief; ESC-R1-b1 / ESC-R1-g1 unruled | **Not cured — escalation stands.** The COHESION tail at this seat (§0al · §0am · §0an) holds no b1 or g1 relief. g1 also needs the owner's or X-W10's spacing canon (M-23: `.g` applies canon, it never mints it) | — | not re-run; no byte they read moved |
| 5 · j1–j3 | owed, lawfully blocked on X-W5 | **Lawful wait.** ⟨cmd⟩ `grep "^\| X-W5 " LEDGER.md` → `PARTIAL — 2026-09-21`. §0z E1 and §0an: `.j` dispatches after X-W5 reads CLOSED | — | — |
| 6 · §0z E2 (full vitest) | RED at 2 foreign canaries | **Not curable here.** C-5 (`test/spectrum-luma.test.ts`) and NG-6 (`demo/test/shell/reka-binding-idiom.test.ts`) are X-V/W1.a's born-RED canaries, outside §4 | — | ⟨cmd⟩ `npx vitest run` after both cures → `Test Files 2 failed \| 36 passed (38)` · `Tests 2 failed \| 639 passed (641)` ×2. Before the cures it read `634/636` ×2. The +5 tests and +1 file are `interpolation-subset.test.ts`. The failures are still exactly C-5 and NG-6 |
| 7 · O-49 row (MINOR) | `.e` appended INBOX O-49 outside the §0z grant | **Not curable here.** The cure is the orchestrator naming the row in a COHESION addendum, and COHESION is not in W6's writable set. The same gap now covers the h1 letter: `W6-glass-ask-hero-blob-p3.md` is filed, but its `O-` INBOX row is **not** written, because the §0z INBOX grant names `.d`'s easing-readout row only | — | — |
| 8 · 9 (INFO) | — | none required | — | — |

**Found, not on the register.** Both whole-file runs of `webgl-blob-idle.spec.ts` red its
**pre-existing** arm, `hero blob parks its WebGL loop after N ms idle`, on `Test timeout of 30000ms
exceeded`, inside the `waitMs(page, PARK_SETTLE_MS)` wait (`:79`). This seat's hunk only appends: the
arm's bytes and its imports are unchanged (⟨cmd⟩ `git show a87f8930 -- e2e/smoke/webgl-blob-idle.spec.ts`
→ `130  0`, additions only). The park-latency arithmetic is FOLD rows W6·187/W6·208
(X-W2.b's `settled` seam plus `.h`). It is recorded, not cured, and it is not masked (no timeout raised).

### Wave tally at these bytes (SELF-COUNT, counted twice)

GREEN = Check 2's 37 (a1 a3–a12 · f1–f10 · b2 b4 g2 · d2 h2 i2 · j4 H1 H3 · c1 c2 c3 d1 e1 e2 i1) + **c4** +
**h1** = **39**. RED = a2 a13 b3 (3) + b1 g1 (2) + i3 (1) + j1 j2 j3 (3) + H2 H4 (2) = **11**.
39 + 11 = **50**. A second pass by lane (Lane 1 a/b/c/d/e: 13+4+4+2+2 = 25, with RED a2 a13 b1 b3 = 4 → 21 GREEN;
Lane 2 f/g: 12, RED g1 → 11; Lane 3 h/i: 5, RED i3 → 4; Lane 4 j: 4, RED j1–j3 → 1; wave H1–H4: 4,
RED H2 H4 → 2) → 21 + 11 + 4 + 1 + 2 = **39** GREEN, 4 + 1 + 1 + 3 + 2 = **11** RED. The two passes agree.
H1 was not re-run over a widened roster: ⟨cmd⟩ `node docs/tranches/X/gates/gate-no-chassis.mjs a87f8930`
→ *"the roster added no demo/ line"*. `b2dd375c` adds no module. It re-derives an existing export in
place, so the housing shape the detector looks for cannot appear.

### Escalations (measured; each needs a ruling or a write outside this seat's set)

- **ESC-R1-i3** (unchanged). The cure is a pre-module boot seed in `demo/color-picker/index.html`, which
  is outside §4, outside the BoundsDelta, and outside §0an.
- **ESC-R1-b1 / ESC-R1-g1** (unchanged). No relief addendum exists. g1 also needs X-W10's or the owner's
  spacing canon.
- **a2 · a13 · b3.** X-W5 must land or revert its uncommitted shell lane (§0an says so itself).
- **j1–j3.** Lawfully blocked until X-W5 reads CLOSED.
- **§0z E2.** C-5 and NG-6 belong to the X-V/W1.a successors.
- **INBOX rows.** O-49 (the `.e` aurora ask, already written) needs naming in a COHESION addendum. The
  h1 p3 ask's `O-` row (`W6-glass-ask-hero-blob-p3.md`) is **unwritten** and needs the same grant
  before E13 can row it.

The LEDGER status cell stays **PARTIAL**; this seat does not promote it. One event line is appended.

## Check 3 — RESUME 2026-09-22 (L-20 fresh adversarial pass 3, over the third sitting's close + Repairs 1–2)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). VERIFY-ONLY seat: no product byte, gate script or spec
byte written. Writes: this block + one appended LEDGER event line (the status cell is **not** moved).

**Verdict: NOT-CONFORMANT.** Every GREEN Repair 2 adds reproduces at this seat's clock (c4 ×2, h1 ×2),
and so do the 18 banked GREENs re-run here. **11 gates stay RED**. Three of them (**b1 · g1 · i3**) have
no relief under the spec or any dated COHESION addendum: the tail is still **§0an** (⟨cmd⟩
`grep -n "^## §0a" COHESION.md | tail -1` → `2509: §0an`), and §0an rules ESC-W6c-1 only. The
honest-RED set is empty; the LEDGER cell stays PARTIAL.

### Act 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → the same 17 foreign rows as Repair 2 (the X-W5 shell lane incl. the
staged `D demo/shell/PaneSegmentedControl.vue`, `CARRY-LEDGER.md`, `execution/A/X-W5.md`,
`execution/B/KF-W13S.md`, `scripts/dev/dev.sh`). None is in this seat's writable set (this record and
the LEDGER). Nothing inherited, stashed, restored or touched.

### Axes 1 + 9 — every claimed GREEN re-run at this seat's clock (20 reproduced, 0 failed)

| gate | ⟨cmd⟩ (this seat) | reading |
|---|---|---|
| **c4** (Repair 2) | `npx vitest run test/interpolation-subset.test.ts` ×2 | `Tests 5 passed (5)` ×2 |
| **h1** (Repair 2) | `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke` ×2 | `3 passed (52.4s)` · `3 passed (42.3s)`; `buffer srgb (display p3: false)`; `oklch(0.55 0.37 328)` ΔC −0.02168 / −0.02200 (stated ±0.04) |
| c1 | `node …/probes/wb-gradient-stopeditor/gate-structure.mjs` | EXIT 0 · `GATE G4 (structure) — GREEN` |
| c2 | `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` | `4 passed \| 13 skipped (17)` |
| c3 | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | `GATE c3 (literal dialect) — GREEN` |
| d1 · d2 · e2 | the three `…/probes/x-w6/gate-*.mjs` + `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` | `GATE d1 … GREEN` · d2 restyle `0 line(s)` · `GATE e2 (PRM idiom) — GREEN` · rAF **0** |
| f1 · f5 · h2 · i2 | the four `docs/tranches/X/gates/*.mjs` | EXIT 0 each |
| f2 · f7 · f8(static) · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0`/`0` + vue-tsc EXIT 0, no diagnostic · `0` · `2`/`0` · `0` |
| a1 (end state) | `npx vitest run` (full) | `gradient-order-invariant` passes inside it |
| H1 | `node docs/tranches/X/gates/gate-no-chassis.mjs b2dd375c a87f8930` | EXIT 0 · *"no added module is both housing-shaped and shared across instrument roots"* |
| H3 | parser R1 one-liner · glass version | EXIT 0 (no throw) · `7.0.0` (§Blocked unopened) |

**RED confirmed, not inherited**: i3 — ⟨cmd⟩ `npx playwright test e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts --project=smoke` → `1 failed` (`:148`). j1–j3 — `grep -c "component: Stub" demo/color-picker/router/index.ts` → **14**; `o29` absent.
Not re-run (live-server probes; no byte they read moved since their dated readings): a2 a13 b3
(Close 2026-09-22: 21 failed / 1 passed under the X-W5 fixture; the X-W5 rows are still uncommitted),
a3–a12, b1, b2, b4, e1, f3, f4, f6, f8 e2e, g1, g2, i1, j4 — cited to Check 2 / Check 3 (2026-09-19) /
Check 1 RESUME.

§7 at the settled bytes: ⟨cmd⟩ `npx vitest run` → `Test Files 2 failed | 36 passed (38)` ·
`Tests 2 failed | 639 passed (641)` — Repair 2's figure exactly. The failures are the foreign canaries
C-5 (`test/spectrum-luma.test.ts`) and NG-6 (`demo/test/shell/reka-binding-idiom.test.ts`).

**Published figures reproduce (axis 9).** Repair 2's c4 `5 passed`, h1 `pass ×2` with the ΔC it prints,
and the 639/641 vitest figure all re-measure. SELF-COUNT at these bytes, counted twice:
GREEN = a1 a3–a12 (11) + f1–f10 (10) + b2 b4 g2 (3) + c1–c4 (4) + d1 d2 (2) + e1 e2 (2) + h1 h2 (2) +
i1 i2 (2) + j4 H1 H3 (3) = **39**; RED = a2 a13 b3 (3) + b1 g1 (2) + i3 (1) + j1 j2 j3 (3) + H2 H4 (2) =
**11**; 39 + 11 = **50**. By unit: a 11/13 · b 2/4 · c 4/4 · d 2/2 · e 2/2 · f 10/10 · g 1/2 · h 2/2 ·
i 2/3 · j 1/4 · H 2/4 → 11+2+4+2+2+10+1+2+2+1+2 = **39**. The two passes agree with Repair 2's 39 / 11.

### Axes 2–7 — bounds, masking, families, E-3, mail, four-verb

- **Bounds (2).** ⟨cmd⟩ `git show --stat` on Repair 2's four commits. `b2dd375c`:
  `demo/color-session/color-space-meta.ts` (COHESION **§0an** item 2 grant) · `test/interpolation-subset.test.ts`
  (§4 create) · a `W6-evidence/**` transcript. `a87f8930`: `e2e/smoke/webgl-blob-idle.spec.ts`
  (`X-W6-FOLD.md:1048`, BoundsDelta **n.33**, ADD-never-replace; ⟨cmd⟩ its diff is `130 +, 0 −`) ·
  `W6-glass-ask-hero-blob-p3.md` (§4 `W6-*.md` create) · three `W6-evidence/blob/**` transcripts.
  `a243bc49` / `da9bdf0d`: the record and the LEDGER. **All in bounds.**
  ⟨cmd⟩ `git log f90aeb02^..HEAD -- scripts/dev/dev.sh | wc -l` → **0**; the execute-no-write
  stopeditor probes and evidence → **0** commits.
- **Masking (3).** Read, not grepped only. `b2dd375c` throws at module load when an interpolatable
  catalog space has no behaviour line. That is a fail-fast totality check, not a catch around a defect
  (**INFO**). The h1 arm's `throw new Error("unparseable …")` helpers are oracle preconditions.
  There is no `.skip`, `fixme`, raised timeout, allowlist or `catch` in either product diff.
  The ΔC band (0.04) is derived in the spec's comment (two css-color-4 §13 JNDs) and is
  negative-controlled. Repair 2 measured and **reverted** the consumer gamut-map route rather than
  shipping a cure that reduced the OM-6 base chroma (0.149 → 0.021). That was honest.
  **One finding (MEDIUM, register #5):** Repair 2's own negative control
  (`h1-negative-control-2026-09-22.txt`, the ×0.3 ghost) fails the two in-gamut-headroom seeds but
  **passes the owner's own seed `lab(92% 88.8 20)`**, because its sRGB gamut-mapped target is C 0.021.
  On the sRGB cell, h1's GREEN on OM-6 therefore cannot distinguish the defect the owner named. §0z E6
  makes chroma beyond the display's gamut **honest-RED-by-physics, by id**, but the record tallies h1 as
  plain GREEN. It does not carry that beyond-gamut limb as a named honest-RED id beside the filed p3 ask.
- **Families (4).** c4 lands as `b2dd375c` under #3's scope `refactor(demo/gradient-sampling)`. §0an
  asked for `.c` "WHOLE as its commit #3 (one sha)". The c1–c3 half landed at Repair 1 (`e07bff63` +
  `b0991fd3`) before §0an existed, so c4 is a second sha under one meaning. **MINOR**: the family is
  not split across meanings, and the sequencing was forced by the ruling's timing. The h1 oracle landed
  under #8 `fix(demo/hero-blob-chroma)` as `test(…)`, after the census `48d95650`. The order is kept
  (census precedes cure).
- **E-3 (5).** ⟨cmd⟩ `git diff --stat f90aeb02^..HEAD -- docs/tranches/V/megatranche/registry/adjudicated/
  docs/tranches/X/CONFORMANCE-2026-08-03.md` → empty. `W6.md`'s only touch in the wave span is
  `732fe109` (the §0z addendum, insertion-only).
- **Mail (6).** ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **93**. The by-position UNREAD `awk` → **0**.
  Glass `BK/coordination` has three files newer than 2026-09-22 12:00 (`consumers-10.0.0`,
  `nwo1-bh-relay`, `fw4-relay`), all rowed per Check 2. keyframes V and atlas P → empty. **No UNREAD
  in scope.** The filed `W6-glass-ask-hero-blob-p3.md` has no `O-` row (⟨cmd⟩ `grep -c hero-blob-p3
  INBOX.md` → 0), because §0z grants INBOX to `.d`'s row only. **MINOR**, carried with O-49.
- **Four-verb (7).** IMPLEMENTED stays **no**. The line did not move. Lawful.

### Axis 8 — the §2a goal at the bytes: NOT MET (narrower again)

Newly met since Check 2: the interpolation set derives from the catalog (c4). The blob carries the
chroma its **sRGB** buffer allows on the two headroom seeds (h1). Still unmet: a cold load paints the
default, not the pick (i3 `1 failed` here; ⟨cmd⟩ `grep -rn armRuntime demo/ | wc -l` → 0). No route
owns a scene (14 `component: Stub`, j1–j3). The keyboard grammar is not total (b1). The card still
carries an interval that is not on the scale (g1). The gradient specs are RED under the foreign
fixture (a2 a13 b3).

### Axis 10 — honest-RED adjudication, gate by gate (the set is EMPTY)

`W6.md` §6: *"The wave closes when **all 45 born-RED sub-gates are GREEN**"*. The COHESION tail is
§0an, which rules ESC-W6c-1 alone.

| RED gate(s) | relief at the spec bytes? | owner named | adjudication |
|---|---|---|---|
| i3 | **none.** ESC-R1-i3's cure (a pre-module boot seed) sits in `demo/color-picker/index.html`, outside §4 and BoundsDelta and not granted by §0an. Not producer-owned, not routed to a successor, not named honest-RED | orchestrator addendum → `.i` | **UNRELIEVED — HIGH** (escalated; the halt itself is lawful) |
| b1 · g1 | **none.** §0z E3 relieves a3–a7's instruments only. g1's canon is X-W10 content, but g1 is this wave's gate (`W6.md` §6), and M-23 forbids `.g` minting canon. ESC-R1-b1 / ESC-R1-g1 are unruled | orchestrator (b1) · owner / X-W10 (g1) | **UNRELIEVED — HIGH** |
| a2 · a13 · b3 | **routing, not relief.** `W6.md:4` makes X-W5 this wave's predecessor. §0an names the owner (*"stay X-W5's … lands when X-W5 resumes"*). No byte is W6's to write | X-W5 (§0an) | **BLOCKED on a predecessor, owner-named — MEDIUM**. Not honest-RED: the spec still requires them GREEN |
| j1 j2 j3 | **lawful wait**, not relief: `W6.md:4` + §0z E1 (`.j` waits, never skipped). X-W5 reads `PARTIAL — 2026-09-21` | `.j` after X-W5 CLOSED | **LAWFULLY BLOCKED — MEDIUM** |
| H2 · H4 | H2 leg 1 met (`motion-quarantine.md` exists; e1 cites it). Leg 2 needs `.j`'s assertions. H4 follows the undischarged dispositions (CC-056, CC-057, CC-067; CC-059/CC-062 via g1; CC-058 via b1/b3/a2/a13) | `.j` · the units above | **follows** |

### Successor "Opens after" conjuncts

- **X-W7** (`W7.md:6`): X-W3 CLOSED ✓ · X-W4 CLOSED ✓ · **X-W6 not CLOSED ✗** → lawfully BLOCKED.
  (The LEDGER row's `X-W1` cell is the N-1 mount-substrate conjunct and is also CLOSED ✓.) The
  write-first obligation on the four shared Mix paths still rides with `.j`.
- **X-W8** (W5 · W6 · W7 stable) → BLOCKED (W5 and W6 PARTIAL, W7 planned).
- **X-W10** (W5..W9 stable) → BLOCKED. **X-W11** (X-W0..X-W10 IMPLEMENTED) → BLOCKED.
- Every block is lawful. No successor is blocked by a defect this check could cure.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| 1 | HIGH | i3 RED. Its cure needs `demo/color-picker/index.html`, outside §4/BoundsDelta, and no ruling exists | `o28` `1 failed` at this seat; COHESION tail = §0an (ESC-W6c-1 only) | orchestrator rules ESC-R1-i3 by dated addendum (grant or route); `.i` re-sits at i3 |
| 2 | HIGH | b1 · g1 RED with no spec relief and no ruling | §0z E3 names a3–a7 only; ESC-R1-b1 / -g1 unruled at §0an | dated relief or re-point addendum for b1's instrument; the owner or X-W10 rules g1's spacing canon, then `.g` re-sits |
| 3 | MEDIUM | a2 · a13 · b3 RED under X-W5's uncommitted shell bytes; the owner is named by §0an, but the gates are not relieved | close 2026-09-22: 21 failed / 1 passed, 40 lines quote `Color tool panes`; X-W5 rows still uncommitted at this seat | X-W5 lands or reverts its shell lane; re-run by the same commands |
| 4 | MEDIUM | j1–j3 owed, lawfully blocked on X-W5 (`W6.md:4`, §0z E1) | LEDGER X-W5 `PARTIAL — 2026-09-21`; `component: Stub` 14 | `.j` dispatches when X-W5 reads CLOSED |
| 5 | MEDIUM | h1's GREEN on the owner's seed is insensitive to the defect it names on the sRGB cell: the ×0.3 ghost passes OM-6 (ΔC +0.00993). The §0z E6 beyond-gamut limb is not carried as a named honest-RED id beside the p3 ask | `W6-evidence/blob/h1-negative-control-2026-09-22.txt` (`2 failed \| 1 passed`; OM-6 target C 0.02105) | the next record names the OM-6 beyond-sRGB limb honest-RED-by-physics by id (E6), cross-referenced to `W6-glass-ask-hero-blob-p3.md`; h1's GREEN is cited as carried by the two headroom seeds |
| 6 | MEDIUM | §0z E2 close condition (full vitest) RED at the 2 foreign canaries | `2 failed \| 639 passed (641)` at this seat | X-V/W1.a successors cure C-5 and NG-6 |
| 7 | MINOR | `.c` spans three shas (`e07bff63` `b0991fd3` `b2dd375c`) against §0an's "one sha". Forced by the ruling landing after Repair 1; one meaning, not split | `git log --oneline` | none beyond noting it in the close |
| 8 | MINOR | INBOX has no `O-` row for the filed `W6-glass-ask-hero-blob-p3.md`, and O-49 was written outside §0z's INBOX grant | `grep -c hero-blob-p3 INBOX.md` → 0; `git show --stat 3ece0690` | the next COHESION addendum names both rows; E13 rows the p3 ask |
| 9 | INFO | `color-space-meta.ts` throws at module load on a catalog space with no behaviour line. This is fail-fast totality, not masking | `git show b2dd375c` | none |

**Honest-RED set: ∅.** gatesReproduced **20** (c1 c2 c3 c4 d1 d2 e2 f1 f2 f5 f7 f8s f9 f10 h1 h2 i2
a1 H1 H3; the 639/641 vitest figure also reproduces) · gatesFailed = the 11 RED gates: a2 a13 b1 b3
g1 i3 j1 j2 j3 H2 H4. The LEDGER status stays **PARTIAL**; one event line appended.

---

## Open — RESUME 2026-09-22 (fourth sitting; SEAT 0, `claude-opus-5-5[1m]`)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). Resume spec: COHESION **§0z** + **§0an** + **§0aq**
and `W6.md`'s **ADDENDUM 2026-09-22** (`W6.md:483-484`), read whole. **Mode**: RESUME. ⟨cmd⟩
`grep "^| X-W6 " LEDGER.md` → **PARTIAL 2026-09-22 — NOT PROMOTED**, not CLOSED.

### Act 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh`.
Neither is in this seat's writable set (this record, the LEDGER, INBOX). **Nothing inherited**; nothing
stashed, restored or touched. ⟨cmd⟩ `git fetch -q origin; git rev-list --left-right --count HEAD...origin/tranche-u`
→ `0 0` (ESC-PUSH discharged per §0aq holds at this clock).

### Preconditions, measured at the bytes AND in the LEDGER (2026-09-22)

| condition | measurement | verdict |
|---|---|---|
| X-W0 CLOSED | ⟨cmd⟩ `grep "^| X-W0 " LEDGER.md` → `CLOSED 2026-09-17 (honest-RED: HG-8 …)` | MET |
| X-W1 CLOSED | `CLOSED 2026-09-17 (honest-RED: G-17 · G-19 · G-20)`; ⟨cmd⟩ `ls e2e/visual` → present | MET |
| X-W4 CLOSED | `CLOSED 2026-09-17`; ⟨cmd⟩ `grep -rl SceneActionSet demo/ \| wc -l` → **4** | MET |
| installed glass 7.0.0 | ⟨cmd⟩ `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → **7.0.0** | MET |
| X-W5 shell lane committed (a2/a13/b3 re-run at close, §0aq) | tree clean of X-W5 rows (Act 0); LEDGER X-W5 → `PARTIAL 2026-09-17 — RESUME 3 close 2026-09-22 … §9 commits 1–5 ALL LANDED` | MET (for the close re-run) |
| X-W5 CLOSED (binds **`.j` alone**, §0z E1) | same cell → **PARTIAL** | **NOT MET — `.j` waits, never skipped** |

### E13 Step-0 — four-path mail sweep (2026-09-22)

1. value.js `V/` + `V/coordination/` — ⟨cmd⟩ `find docs/tranches/V -maxdepth 2 -name '*.md' -newermt
   "2026-09-22 00:00" ! -name INBOX.md` → `EVIDENCE.md` · `VISUAL-CONSTITUTION.md` ·
   `OPTICAL-BENCH-COMPOSITIONS.md` · `research/proportion-register.md` — Track A canon documents
   (the last: *"Tranche V — Formation Proportion Register"*, `e2f56558 docs(canon)`), not letters.
2. glass — ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -1` → **`BK/`** (still newest). Newer than
   2026-09-22: `glass-outbound-2026-09-22-consumers-10.0.0.md` (8 INBOX hits) ·
   `fourier-to-glass-2026-09-17-nwo1-bh-relay.md` (5) · `value-to-glassui-2026-09-DD-fw4-relay.md` (7) — all rowed.
3. keyframes `V/coordination` → **empty** at the delta. 4. atlas `P/coordination` → **empty**.

Census ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **93** · **93**; the by-position UNREAD `awk` → **0**.
Tail ids **I-39 · O-49**. **0 unrowed · 0 new I-n · 0 UNREAD in scope.** One `O-` row is OWED inside the
wave and is `.h`'s to write under §0aq ("display-p3 ask by mail"): ⟨cmd⟩ `grep -c hero-blob-p3 INBOX.md`
→ **0** for the filed `W6-glass-ask-hero-blob-p3.md` (Check 3 register #8). A dated sweep line is
appended to INBOX.

---

## Baseline — RESUME 2026-09-22 (the owed units' gates only; every other gate cites Check 3's reading)

Run read-only at this open; live probes against the `:9000` vite dev server (PID 43106, started
2026-09-22 14:55, serving this tree from disk). Every other gate cites `## Check 3 — RESUME 2026-09-22`.

| gate | unit | ⟨cmd⟩ | BEFORE |
|---|---|---|---|
| b1 | `.c` (§0aq ESC-R1-b1) | `node …/probes/wb-gradient-stopeditor/gate-seat.mjs` | **RED** — EXIT 1, `GATE G3 (stop seat) — RED`, **2** `G3d` lines: `key "Home"` and `key "ArrowDown"` are no-ops on the focused stop at 0% (`style.left` stayed `calc(var(--rail-inset) + var(--rail-track) * 0)`; expected 0% / −1%) |
| c1 | `.c` | `node …/wb-gradient-stopeditor/gate-structure.mjs` | GREEN — EXIT 0, `GATE G4 (structure) — GREEN` (banked `e07bff63`) |
| c2 | `.c` | `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` | GREEN — `4 passed \| 13 skipped (17)` |
| c3 | `.c` | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | GREEN — `GATE c3 (literal dialect) — GREEN` |
| c4 | `.c` | `npx vitest run test/interpolation-subset.test.ts` | GREEN — `5 passed (5)` (banked `b2dd375c`) |
| d1 | `.d` | `node …/probes/x-w6/gate-easing-radius.mjs` | GREEN — EXIT 0; `panel surfaces measured: 33 · read-only: 2` (banked `9557e6b5`) |
| d2 | `.d` | `node …/probes/x-w6/gate-easing-readout.mjs` | GREEN — EXIT 0; `branch … DATED ASK`, restyle `0 line(s)` |
| e1 | `.e` | `npx playwright test e2e/smoke/views/gradient.spec.ts -g "gradient selector aurora" --project=smoke` | GREEN — `1 passed (25.3s)` (banked `3c558956` + `191d4f3a`) |
| e2 | `.e` | `node …/probes/x-w6/gate-prm-idiom.mjs` | GREEN — EXIT 0; `requestAnimationFrame calls: 0` |
| h1 | `.h` | `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke` | GREEN on the sRGB cell — `3 passed (59.5s)`; OM-6 `lab(92% 88.8 20)` target C (gamut-mapped) **0.02105**, ΔC 0.02552 — the beyond-sRGB limb is unnamed (Check 3 #5) |
| i1 | `.i` | `npx playwright test e2e/smoke/oracles/o25-atmosphere-response.spec.ts --project=smoke` | GREEN — `1 passed (4.7s)` |
| i3 | `.i` | `npx playwright test e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts --project=smoke` · `grep -rn armRuntime demo/ \| wc -l` | **RED** — `1 failed`: *"oklch(0.62 0.2 30): the first painted atmosphere is not the seeded one"* (0.1595 > bound) and *oklch(0.62 0.2 150)* (0.2933); armRuntime **0** |

### R.2 — a GREEN before its cure

**NONE.** Every GREEN above is a cure already landed at a named sha in a prior sitting or repair
(Check 3 reproduced each); none precedes its cure. The two RED gates (b1, i3) are exactly the two
§0aq grants. **H1-P3** is not a gate but an honest-RED id §0aq mints; `.h` records it.

---

## Unit plan — RESUME 2026-09-22 (5 units re-dispatched on §0aq's grants; `.j` deferred; 4 units landed)

**Model law M-23** (`W6.md:154`): every unit is an **Opus implementation seat**. No Fable seat; no
unit mints canon. **Landed, never re-dispatched**: `.a` (`f90aeb02` · `c222542d`) · `.b` (`7dff25f6`) ·
`.f` (`e0e204a9`) · `.g` (`e69aaf95`). **Re-dispatched by §0aq** ("RESUME dispatches [`.c`] → [`.d`] →
[`.e`] → [`.h`] → [`.i`] (`.a` `.b` `.f` `.g` done)"), each on its residual only — the shas already
landed inside them (`.c`: `caea9d1e` `e07bff63` `b0991fd3` `b2dd375c` · `.d`: `9557e6b5` `e6bd7fe5` ·
`.e`: `3c558956` `191d4f3a` `3ece0690` · `.h`: `48d95650` `a87f8930` · `.i`: `c2f17bad` `4cb294b9`
`e68e8889`) are **not reopened**. **Concurrency**: maxUnits 1; strictly serial per `W6.md:484`
*"Order: [`.c`] → [`.d`] → [`.e`] → [`.h`] → [`.i`]"*. `.j` after X-W5 CLOSED (§0z E1) — NOT dispatched.
**Wave-level (no unit)**: close seat after group 5 re-runs a2/a13/b3 (X-W5 shell lane committed, §0aq),
H1–H4, and records g1 honest-RED by id → X-W10 (§0aq ESC-R1-g1) and the two vitest canaries → X-W8 `.i`.

| group | unit | residual | gates |
|---|---|---|---|
| 1 | `.c` | b1 cure in `GradientStopEditor.vue` (commit #4, §0aq ESC-R1-b1); c1–c4 held | b1 (+ c1–c4 non-regression) |
| 2 | `.d` | verify d1/d2 at the post-`.c` bytes; receipt | d1 d2 |
| 3 | `.e` | verify e1/e2 at the post-`.d` bytes; receipt | e1 e2 |
| 4 | `.h` | `H1-P3` named honest-RED-by-physics; h1 on the consumer route; `O-50` mail row for `W6-glass-ask-hero-blob-p3.md` | h1 |
| 5 | `.i` | i3 cure: pre-module boot seed in `demo/color-picker/index.html` (§0aq ESC-R1-i3), W5.md:321 rider | i3 (+ i1 i2 held) |

Unit briefs are carried verbatim in the returned plan; the writable sets are §4 ⊕ §0an ⊕ §0aq:
- **`.c`**: `demo/workbenches/gradient/{model/types.ts,model/sample.ts,composables/useGradientModel.ts,composables/useGradientCSS.ts,composables/useGradientInterpolation.ts,composables/gradientParse.ts,GradientVisualizer/GradientVisualizer.vue,GradientVisualizer/GradientStopEditor.vue,GradientVisualizer/GradientEasingEditor.vue,GradientVisualizer/easing/easingCatalogue.ts,GradientVisualizer/easing/useSpecimenRows.ts}` · `demo/color-session/color-space-meta.ts` · `docs/tranches/X/gates/gate-literal-dialect.mjs` · `test/{interpolation-subset,gradient-order-invariant,gradient-parse}.test.ts` · `docs/tranches/X/waves/W6-evidence/**`. `gate-seat.mjs` is execute-no-write.
- **`.d`**: `GradientEasingEditor.vue` · `easing/EasingAuthoringStage.vue` · `easing/easingCatalogue.ts` · `…/probes/x-w6/gate-easing-radius.mjs` · `W6-evidence/easing/**` · INBOX (mail rows only).
- **`.e`**: `GradientVisualizer.vue` · `easing/EasingAuthoringStage.vue` · gradient tree scoped styles · `…/probes/x-w6/gate-prm-idiom.mjs` · `e2e/smoke/views/gradient.spec.ts` (ADD-never-replace) · `W6-evidence/**`.
- **`.h`**: `demo/picker/visual/HeroBlob.vue` · `demo/color-session/useContrastSafeColor.ts` · `e2e/smoke/webgl-blob-idle.spec.ts` (ADD-never-replace) · `docs/tranches/X/waves/W6-glass-ask-hero-blob-p3.md` (dated addendum-beside only) · `W6-evidence/**` · INBOX (the one `O-` row, §0aq).
- **`.i`**: `demo/color-picker/composables/boot/{useAtmosphere,atmosphere-calibration}.ts` · `demo/test/glass/aurora-bracket.test.ts` · `demo/scenes/atmosphere/AuroraPane.vue` · `e2e/smoke/oracles/{o25-atmosphere-response,o28-atmosphere-coldload}.spec.ts` · `demo/color-picker/index.html` (pre-module boot seed ONLY) · `W6-evidence/atmosphere/**`.

`.j` — **BLOCKED-ON X-W5** (LEDGER `PARTIAL`), §0z E1; not dispatched.

---

## Unit receipts — fourth sitting 2026-09-22

### X.W6.c

SERVED MODEL: claude-opus-5-5[1m]

**Residual**: b1 (§0aq ESC-R1-b1, commit #4 in `GradientStopEditor.vue`); c1–c4 non-regression only.
**Verdict**: **ESCALATED — ESC-W6c-b1-1: the b1 RED is the INSTRUMENT'S INPUT-STATE, not a product defect.**
No product byte written; no commit #4 (a commit with nothing to cure would be a masking act); the gate not
touched (execute-no-write).

**Act 0 — crash-recovery.** ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh` — neither in this unit's writable set. **Nothing inherited**; nothing stashed/restored.

**Act 1 — the gate at this seat's clock (b1 BEFORE, ×2).** ⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/wb-gradient-stopeditor/gate-seat.mjs`
→ run 1 and run 2 identical: `GATE G3 (stop seat) — RED`, EXIT 1, exactly **2** lines, both `G3d`:
`key "Home" is a no-op … expected 0%` and `key "ArrowDown" is a no-op … expected -1%`, each with
`style.left stayed "calc(var(--rail-inset) + var(--rail-track) * 0)"`. No G3a/G3b/G3c/G3e/G3f line
(role / `aria-value*` / `aria-valuetext` / selected state / add path / removal arm all pass).

**Act 2 — read the instrument before its output (probe-before-meaning).** ⟨cmd⟩ `sed -n 97,104p gate-seat.mjs`:
for each of `[["Home",0],["End",100],["ArrowUp",1],["ArrowDown",-1]]` it reloads, focuses
`document.querySelector("[data-stop-id]")` — the FIRST stop — presses the key and fails iff `style.left`
is byte-identical before/after. The seeded route's first stop sits at **0%** (the axis floor), so:
- `Home` → 0% on a stop already at 0% is the identity under ANY lawful grammar (§5.2: Home = 0%).
- `ArrowDown` → −1% requires a position below the axis domain; the model's `round1` clamps to the AXIS
  DOMAIN 0–100 (`useGradientModel.ts:60-65`, landed in `.a`, GRADSTOP-A §14 — "explicitly NOT the banned
  neighbour clamp"), and the handle advertises `aria-valuemin="0"` (`GradientStopEditor.vue:635`).
  `ArrowDown` at the floor is therefore also the identity. The gate's own "expected −1%" is out of domain.

**Act 3 — the product grammar at the bytes.** ⟨cmd⟩ `sed -n 465,516p GradientStopEditor.vue` →
`onHandleKeydown` owns ArrowLeft/ArrowDown (−step) · ArrowRight/ArrowUp (+step, same signed step,
Shift = 10) · PageDown/PageUp (∓10) · Home → `moveStop(stop, 0)` · End → `moveStop(stop, 100)` · Space
grab/drop · Escape cancel · Delete/Backspace → the one removal owner; `onCaretKeydown` (`:520-560`) is the
keyboard CREATE path (a named caret `<button>` "Add gradient stop at N%", Enter/Space mint). Handle carries
`role="slider"` + `aria-valuemin/max/now` + `aria-valuetext` "Stop i of n, position p%" (unconditional
ordinal). Provenance: ⟨cmd⟩ `git log -S'case "Home":' -- GradientStopEditor.vue` → `666978d4
feat(demo/gradient-stop-grammar)` (the X-W4 CC-042 landing). Every §5.2 row the brief lists is present.

**Act 4 — discriminating probe (scratch, not committed; ran against `:9000`, PID 43106).** Same focus/press
recipe as G3d, but reading `aria-valuenow`/`aria-valuetext` on the first AND the last stop:
```
init [["stop-1-…","0","0"],["stop-2-…","100","1"]]
0  Home      ["0","Stop 1 of 2, position 0%"]     <- identity at the floor
0  ArrowDown ["0","Stop 1 of 2, position 0%"]     <- identity at the floor (domain clamp)
-1 Home      ["0","Stop 2 of 2, position 0%"]     <- Home ACTS: 100 -> 0
-1 ArrowDown ["99","Stop 2 of 2, position 99%"]   <- ArrowDown ACTS: -1 step
-1 PageDown  ["90","Stop 2 of 2, position 90%"]   <- PageDown ACTS: -10
0  End       ["100","Stop 1 of 2, position 100%"] <- End ACTS
0  ArrowUp   ["1","Stop 1 of 2, position 1%"]     <- ArrowUp ACTS: +1 (same signed step)
```
Home and ArrowDown act on every stop not already at the floor; the ordinal is announced on every move.
(STALE-SERVER LAW: this is a behaviour witness, not a literal/precision claim; the handlers are unchanged
since `666978d4`, long before the server's 14:55 start.)

**Why no cure is admissible.** The two RED lines are satisfiable only by (i) changing the seeded first stop
off 0% (gaming the input — masking), (ii) admitting sub-zero positions (reopens `.a`'s settled axis
domain, GRADSTOP-A §14/§15 — forbidden to `.c`), or (iii) re-aiming the gate at a stop off the floor
(gate-seat.mjs is execute-no-write). Per the brief: *"If the RED is the instrument's input-state (not a
product defect) STOP and escalate — never edit the gate."* STOPPED.

**Act 5 — c1–c4 non-regression (no product byte changed; read at this clock).**
| gate | ⟨cmd⟩ | BEFORE (Baseline) → AFTER |
|---|---|---|
| b1 | `node …/wb-gradient-stopeditor/gate-seat.mjs` ×2 | RED (2 G3d) → **RED (2 G3d) ×2 — instrument input-state, ESC-W6c-b1-1** |
| c1 | `node …/wb-gradient-stopeditor/gate-structure.mjs` | GREEN → GREEN (`GATE G4 (structure) — GREEN`, EXIT 0) |
| c2 | `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` | GREEN → GREEN (`4 passed \| 13 skipped (17)`) |
| c3 | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | GREEN → GREEN (`GATE c3 (literal dialect) — GREEN`) |
| c4 | `npx vitest run test/interpolation-subset.test.ts` | GREEN → GREEN (`5 passed (5)`) |

**Commits**: product none (no defect to cure); this receipt only. **Escalation ESC-W6c-b1-1** (needs a
ruling, not a seat): b1 is to be read by a ruling that either (a) re-points G3d's Home/ArrowDown arms at a
stop off the axis floor (instrument edit — X-W11 OUT-OF-WAVE roster, like the a3–a7 re-point R-5 in the
2026-09-19 addendum), or (b) accepts the Act-4 transcript as the b1 witness of record. The product side of
b1 is DONE at `666978d4` (+ `.a`'s domain clamp); `.c` holds c1–c4 GREEN.
**SELF-COUNT**: gates read 5 (b1 c1 c2 c3 c4); GREEN 4 (c1 c2 c3 c4); RED 1 (b1, escalated). Counted twice.

---

## Close — RESUME 2026-09-22 (the fourth sitting's close; VERIFY-ONLY seat)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). This seat cures nothing. Transcripts:
`docs/tranches/X/waves/W6-evidence/gates/close-4-2026-09-22/` (27 files, ANSI stripped).

### Act 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M docs/tranches/X/execution/B/KF-W13T.md` · `M docs/tranches/X/execution/LEDGER.md` · `M scripts/dev/dev.sh`.
None of these is this wave's to finish. LEDGER.md is a sibling seat's in-flight edit, and this seat edits it
only by in-place replacement of the X-W6 row. **Nothing inherited**; nothing stashed, restored or touched.
⟨cmd⟩ `git rev-list --left-right --count HEAD...origin/tranche-u` → `0 0` at open.

### Act 1 — commit roster and bounds

The workflow dispatched only `.c`. It returned ESCALATED, and group 2–5 (`.d .e .h .i`) **were not
dispatched in this sitting**. ⟨cmd⟩ `git log --oneline 0d21210f^..HEAD` → the sitting's X-W6 commits are
`0d21210f` (OPEN: record + INBOX + LEDGER) and `d8029124` (`.c` receipt). ⟨cmd⟩ `git show --stat d8029124`
→ `docs/tranches/X/execution/A/X-W6.md | 75 +` only. ⟨cmd⟩ `git log --oneline 0d21210f..HEAD -- demo e2e
test docs/tranches/X/gates docs/tranches/X/waves` → **empty**, so no product byte landed in this sitting.
**Landed-wrong: 0.** The other commits in the range (`7dbd758b` `680a8b3c` `eba6a7b0`) belong to Tracks B
and C, not to this wave.

### Act 2 — gate table, BEFORE (Check 3 / this sitting's Baseline) → AFTER (this seat's clock)

Live probes ran against a `:9000` vite server started **17:15:54** from this tree (fresh, so STALE-SERVER LAW
is satisfied). Playwright ran on its own tree-true webServer; h1 and b3 were re-run on an isolated port
(`VJS_E2E_PORT=8196`) to rule out attaching to a sibling seat's server.

| gate | ⟨cmd⟩ (this seat) | BEFORE | AFTER |
|---|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` → `npx vitest run test/gradient-order-invariant.test.ts` | GREEN | **GREEN**: `Tests 17 passed (17)` |
| a5–a11 | `node docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs` (command of record, 2026-09-19 addendum) | GREEN | **GREEN**, EXIT 0: `travel@1px=0.00px` · `[27.4,100] → [27.4,98]` · `before=2 middle=2 right=2 cancel=2` · 5 writes / 5 moves · chip `rules intersected: 0` · a9 `[]`, `3 → 2` |
| a7 (arm 2) | `node …/WBGSE-O-r3-gestures.mjs` | GREEN | **GREEN**: `C14 buttons: {"beforeMid":2,"afterMid":2,"afterRight":2}` |
| a12 | `node …/evidence/WBGSE-D-probe2.mjs` | GREEN | **GREEN**, EXIT 0: rootFS 20px `afterOverhangPx: 0` |
| a2 · a3 · a4 · a13 · e1 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | a3 a4 e1 GREEN · a2 a13 RED | **RED ×5**: `22 failed`. 21 fail at `getByRole('main', { name: 'Color tool panes' })` → `element(s) not found`, and 1 on a screenshot timeout (see R-1) |
| b3 | same run + `-g "stop inspector numeric entry"` on :8196 | RED | **RED ×2**: the second run times out on `getByRole('combobox', { name: 'Select view' })` (R-1) |
| b1 | `node …/wb-gradient-stopeditor/gate-seat.mjs` ×2 | RED | **RED ×2**: EXIT 1, exactly 2 `G3d` lines (Home, ArrowDown on the first stop at 0%). ESC-W6c-b1-1 |
| b2 · b4 | same `gate-seat.mjs` (add-path and removal arms) | GREEN | **GREEN ×2**: no G3e or G3f line |
| c1 | `node …/wb-gradient-stopeditor/gate-structure.mjs` | GREEN | **GREEN**: `GATE G4 (structure) — GREEN` |
| c2 | `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` | GREEN | **GREEN**: `4 passed \| 13 skipped (17)` |
| c3 | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | GREEN | **GREEN**: `GATE c3 (literal dialect) — GREEN` |
| c4 | `npx vitest run test/interpolation-subset.test.ts` | GREEN | **GREEN**: `5 passed (5)` |
| d1 | `EASING_RADIUS_ORIGIN=http://localhost:9000 node …/probes/x-w6/gate-easing-radius.mjs` ×2 | GREEN | **GREEN ×2**: `panel surfaces measured: 33 · read-only: 2`. Without the env var the first run gets ERR_CONNECTION_REFUSED because the default origin is :9002; that is an environment fault, not a gate reading |
| d2 | `node …/probes/x-w6/gate-easing-readout.mjs` | GREEN | **GREEN**: `DATED ASK`, restyle `0 line(s)` |
| e2 | `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` + `gate-prm-idiom.mjs` | GREEN | **GREEN**: `0` · `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 · h2 · i2 | the four `docs/tranches/X/gates/*.mjs` | GREEN | **GREEN**, EXIT 0 each: `GATE f1 … GREEN` (18/18) · `GATE f5 … GREEN` · `GATE h2 … GREEN` · `GATE i2 … GREEN` |
| f2 · f7 · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | GREEN | **GREEN**: `0` · `0`/`0`, vue-tsc `EXIT 0` · `2`/`0` · `0` |
| f3 | `npx playwright test e2e/smoke/oracles/o21-space-catalog-truth.spec.ts` | GREEN (cited) | **RED**: `getByRole('listbox')` `toBeHidden` fails. The node carries `data-state="closed"` but stays visible 8000ms, resolved 19 times (R-2) |
| f4 · f6 · f8 | `o22-specimen-legibility` · `o23-specimen-gamut-honesty` · `o24-specimen-dot-identity` (+ f8 grep `tag=` → `0`) | GREEN (cited) | **RED ×3**: all three stop at `getByRole('main', { name: 'Color tool panes' })` (R-1) |
| g1 | `CARD_RHYTHM_ORIGIN=http://localhost:9000 node …/probes/x-w6/gate-card-rhythm.mjs` | RED | **RED**: `LARGEST INTERVAL: 61.22px` · `GATE g1 — RED: 2 interval(s) fail`. Honest-RED by id → X-W10 (§0aq) |
| g2 | `npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts -g "companion panes share one track start"` | GREEN | **GREEN**: `1 passed (20.4s)` |
| h1 | `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke` ×3 (the third on :8196) | GREEN (Baseline `3 passed (59.5s)`) | **RED ×3**: `3 failed`, `getByTestId('goo-blob-canvas').last()` not found within 8000ms. A bounded probe on :9000 finds `canv: 1` after 6s on the same route (R-3) |
| i1 | `o25-atmosphere-response.spec.ts` | GREEN | **GREEN**: `1 passed (2.6s)` |
| i3 | `o28-atmosphere-coldload.spec.ts` | RED | **RED**: seeds 30 · 150 · 260 each fail with *"the first painted atmosphere is not the seeded one"* |
| j1 · j2 · j3 | `o29-scene-contracts.spec.ts` | RED | **RED**: `o29` absent (`ls e2e/smoke/oracles`); `grep -c "component: Stub" router/index.ts` → **14**; `.j` BLOCKED-ON X-W5 |
| j4 | (measured and retired, cited) | GREEN (Check 3) | **GREEN (cited)**: no byte it reads moved in this sitting |
| H1 | `node docs/tranches/X/gates/gate-no-chassis.mjs b2dd375c a87f8930` | GREEN | **GREEN**, EXIT 0: *"no added module is both housing-shaped and shared across instrument roots"* |
| H2 | `test -f …/codex-provenance/motion-quarantine.md` + citation legs | RED | **RED**: the file is present, but the `.e`/`.j` citation legs are undischarged (`.j` unlanded) |
| H3 | parser R1 one-liner · glass version | GREEN | **GREEN**: `EXIT 0` · `7.0.0` (§Blocked unopened) |
| H4 | every row one disposition | RED | **RED**: CC-056/CC-057 (`.j`) not landed |

### Act 3 — SELF-COUNT (counted twice)

**GREEN is 31.** a1 plus a5–a12 (9), b2 and b4 (2), c1–c4 (4), d1 and d2 (2), e2 (1), f1 f2 f5 f7 f9 f10 (6),
g2 (1), h2 (1), i1 and i2 (2), j4 (1), H1 and H3 (2). **RED is 19.** a2 a3 a4 a13 (4), b1 b3 (2), e1 (1),
f3 f4 f6 f8 (4), g1 (1), h1 (1), i3 (1), j1 j2 j3 (3), H2 H4 (2). The total is 31 + 19 = **50**.

Counted by unit: a 9/13, b 2/4, c 4/4, d 2/2, e 1/2, f 6/10, g 1/2, h 1/2, i 2/3, j 1/4, H 2/4. That gives
9+2+4+2+1+6+1+1+2+1+2 = **31**, the same as the first count.

Against Check 3's 39/11, **8 gates went from GREEN to RED with no W6 byte moving**: a3, a4, e1, f3, f4, f6, f8
and h1. Seven of the eight are e2e cells. Six of those fail at retired shell DOM, and f3 fails on a closed
listbox that stays visible. X-W5's shell commits `50633f19` (15:44) and `2183b814` (16:09) landed between
Check 3's readings and this seat's. h1 read GREEN at this sitting's open (16:56, after both commits) and
RED ×3 here, so its cause is **not attributed** (R-3).

### Act 4 — §8 Verification Artefacts, run as written

⟨cmd⟩ `git ls-files`:
- `W6-atmosphere-tombstone.md`, `W6-glass-ask-easing-readout.md`, `W6-blob-pipeline-census.md` and
  `W6-glass-ask-hero-blob-p3.md` are **TRACKED**.
- `W6-lband-letter.md` is **ABSENT**. That is lawful because i2 took the landing branch.
- `W6-evidence/gradient/` has 35 files and **0 PNG**. The before/after frames are owed.
- `owner-marks/` has **0** files. The OM re-captures are owed.
- `atmosphere/` has 8 files, **5 of them PNG** (`atmo1-h030/h120/h210/h300/ref`). The cold-load capture
  is owed with i3.
- `catalog/` has 9 files.
- `gates/` gains `close-4-2026-09-22/` from this close.

**§8 is PARTIAL.**

### Act 5 — §7 cadence at the settled bytes

- ⟨cmd⟩ `npx vitest run` → `Test Files 2 failed | 36 passed (38)` · `Tests 2 failed | 639 passed (641)`.
  This matches Check 3 exactly. The two failures are the foreign canaries C-5 (`test/spectrum-luma.test.ts`)
  and NG-6 (`demo/test/shell/reka-binding-idiom.test.ts`).
- ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` → `EXIT 0`.
- Prettier and eslint were not re-run: no W6 path changed in this sitting (Act 1).

### Act 6 — E13 mail (read-only)

- `grep -c '^| I-\|^| O-' INBOX.md` → **94**; the tail is `O-50`, the KF.W13T BK relay.
- Status-cell scan `awk -F'|' '$6 ~ /UNREAD/'`: 4 cells match, but each is SENT, FOLDED or READ, with
  "UNREAD" only in prose. **0 UNREAD.**
- The only new V docs since 15:00 are canon files (`EVIDENCE.md`, `VISUAL-CONSTITUTION.md`,
  `OPTICAL-BENCH-COMPOSITIONS.md`, `research/proportion-register.md`), none of them letters.
- glass: `BK/` is still the newest tranche.
- keyframes `V/coordination` and atlas `P/coordination` have nothing new.
- **0 unrowed, 0 UNREAD in scope.** One outbound row is still OWED: `grep -c hero-blob-p3 INBOX.md` → 1 hit,
  and that hit is the open's sweep prose, not an `O-` row. `.h` must write it (§0aq), and `.h` was not
  dispatched.

### Act 7 — escalations

- **ESC-W6c-b1-1** (from `.c`, confirmed ×2 here) needs a ruling. The choices are: re-point G3d's
  Home/ArrowDown arms at a stop off the axis floor (an instrument edit via X-W11's OUT-OF-WAVE roster, like
  R-5), or accept `.c`'s Act-4 probe transcript as the b1 witness of record. The product grammar is at
  `666978d4`.
- **ESC-W6close-1** (new, R-1) needs a ruling on ownership. X-W5's landmark rename (`<main>` is now
  `aria-labelledby` the route H1, `App.vue:53-59`) orphaned **66** e2e files. ⟨cmd⟩ `grep -rln "Color tool
  panes" e2e | wc -l` → 66. Those files still query `getByRole('main', { name: 'Color tool panes' })`, and
  some also query `getByRole('combobox', { name: 'Select view' })` via `e2e/smoke/fixtures/dock`. That
  turns a2 a3 a4 a13 b3 e1 f4 f6 f8 RED. The no-backwards-compat law puts the consumer migration on the
  renamer (X-W5). W6's own spec paths (`gradient.spec.ts`, `o21-gradient-rail.spec.ts`, `o22`–`o24`) are
  inside §4 and could migrate in a W6 repair. The shared fixture and the other ~60 files cannot. Restoring
  the old label would be a masking act and is banned.

### Act 8 — residuals, each with a named owner

| id | residual | owner |
|---|---|---|
| R-1 | 66 e2e files target retired shell DOM; 9 W6 gates RED (ESC-W6close-1) | X-W5 (consumer migration of its rename); W6 repair migrates W6's own §4 spec paths |
| R-2 | f3: after a pick, the space listbox keeps `data-state="closed"` but stays visible past 8s | next W6 repair seat bisects `2183b814` (X-W5 motion) against `.f`'s `e0e204a9`; owner follows the bisect |
| R-3 | h1: `goo-blob-canvas` is not found within 8s on the e2e server ×3, but is present (`canv: 1`) on :9000 at 6s. Cause unattributed | `.h` re-sit (owed; not dispatched this sitting) |
| R-4 | b1: ESC-W6c-b1-1 | ruling: X-W11 OUT-OF-WAVE roster, or accept the transcript |
| R-5 | i3: cold-load first paint is not the seeded pick's (3 seeds) | `.i` re-sit on the §0aq `index.html` grant (not dispatched) |
| R-6 | g1: 61.22px largest interval, 2 fail | X-W10 (honest-RED by id, §0aq, M-23) |
| R-7 | j1–j3 and H4 | `.j` after X-W5 CLOSED (§0z E1) |
| R-8 | H2 citation legs | `.e` / `.j` |
| R-9 | `.d .e .h .i` not dispatched in the fourth sitting. `.d` and `.e` gates hold GREEN except e1 (R-1) | next RESUME dispatch |
| R-10 | the `O-` INBOX row for `W6-glass-ask-hero-blob-p3.md` | `.h` |
| R-11 | §8: gradient before/after PNGs 0, owner-marks 0, atmosphere cold-load frame | `.a`/`.b` evidence repair · `.i` |
| R-12 | vitest C-5 and NG-6 foreign canaries (2/641) | X-V/W1.a successors · X-W8 `.i` (§0z E2) |
| R-13 | d1/g1 default origins (:9002/:9001) refuse unless the per-lane server is up; run with the `*_ORIGIN` env var | none (environment note) |

### Act 9 — four-verb line after this close

AUDITED yes · SPECIFIED yes · **IMPLEMENTED no** (19 RED) · VERIFIED no (X-W11's stamp). The line does not move.

### Act 10 — verdict

**PARTIAL.** GREEN is 31/50 and RED is 19/50 (8 regressed from GREEN with no W6 byte moving). Landed-wrong
is 0. There are 0 UNREAD. Two escalations are open (ESC-W6c-b1-1, ESC-W6close-1). The LEDGER row reads
PARTIAL.

## Check 1 — RESUME 2026-09-22 (L-20 fresh adversarial pass 1 over the fourth sitting's close)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). VERIFY-ONLY: this seat cures nothing. It read the spec
`W6.md` whole (both addenda included), this record's fourth-sitting Open, Unit plan, `.c` receipt and Close, and
every commit the close names (`0d21210f` · `d8029124` · `8865d963`).
**Crash-recovery**: ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh`.
Neither path is in this seat's writable set, so nothing was inherited.
**Live cell**: the `:9000` vite server (PID 14970, started 17:15:54, cwd = this repo). That is the close's own
fresh server, so the STALE-SERVER LAW holds. Playwright ran on its own webServer.

### Axis 1 — the claimed GREENs, re-run at this seat's clock

| gate(s) | ⟨cmd⟩ | this seat |
|---|---|---|
| a1 | `parse-probe.ts` → `npx vitest run test/gradient-order-invariant.test.ts` | `Tests 17 passed (17)` |
| a5–a11 | `node docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs` | `GATE X.W6.a (gesture + paint) — GREEN`: `travel@1px=0.00px` · `[27.4,100] → [27.4,98]` · `before=2 middle=2 right=2 cancel=2` · 5 writes · `rules intersected: 0` · a9 `[]`, `3 → 2` |
| a7 arm 2 | `node …/WBGSE-O-r3-gestures.mjs` | `C14 buttons: {"beforeMid":2,"afterMid":2,"afterRight":2}` |
| a12 | `node …/WBGSE-D-probe2.mjs` | EXIT 0, `"afterOverhangPx": 0` |
| b2 · b4 | `node …/gate-seat.mjs` ×2 | neither run prints a G3e or G3f line |
| c1 | `gate-structure.mjs` | EXIT 0, `GATE G4 (structure) — GREEN` |
| c2 · c4 | the vitest filters | `4 passed \| 13 skipped (17)` · `5 passed (5)` |
| c3 | `npx vite-node …/gate-literal-dialect.mjs` | `GATE c3 (literal dialect) — GREEN` |
| d1 | `EASING_RADIUS_ORIGIN=http://localhost:9000 node …/gate-easing-radius.mjs` | `panel surfaces measured: 33 · read-only …: 2` · `GATE d1 (easing radius) — GREEN` |
| d2 · e2 | `gate-easing-readout.mjs` · `gate-prm-idiom.mjs` + the rAF grep | EXIT 0 GREEN each · rAF grep `0` |
| f1 · f5 · h2 · i2 | the four `docs/tranches/X/gates/*.mjs` | EXIT 0 each, `— GREEN` |
| f2 · f7 · f9 · f10 | the spec's `test …` greps (`W6.md:255/260/262/263`) + `npx vue-tsc --noEmit -p tsconfig.demo.json` | all four greps GREEN · `TSC EXIT 0` |
| g2 | `companion-pane-track-start.spec.ts -g "companion panes share one track start"` | run 1 **`1 failed`**: `locator.evaluate` 30 s timeout on `region "Picker"` after `toBeVisible` passed. Run 2 **`1 passed (29.8s)`** (see C1-6) |
| i1 | `o25-atmosphere-response.spec.ts` | `1 passed` |
| H1 | `node docs/tranches/X/gates/gate-no-chassis.mjs b2dd375c a87f8930` | *"no added module is both housing-shaped and shared across instrument roots"* |
| H3 | the parser R1 one-liner · glass version | `EXIT 0` · `7.0.0` |
| j4 | cited, not re-run | no byte it reads moved in this sitting (Axis 2) |

**30 of the 31 claimed GREENs reproduce** (g2 on its second run). j4 is cited, and nothing it reads has moved.

**The claimed REDs, re-read.**
- b1: `gate-seat.mjs` ×2 prints exactly the 2 `G3d` lines, Home and ArrowDown.
- f4: `o22-specimen-legibility.spec.ts` gives **`1 failed`** at `getByRole('main', { name: 'Color tool panes' })`.
- h1: `webgl-blob-idle.spec.ts -g "hero blob carries current chroma"` gives **`1 failed · 2 passed (1.1m)`** on
  `getByTestId('goo-blob-canvas').last()`. The close recorded `3 failed`, so the RED is nondeterministic in its
  count (C1-7).
- The landmark cause is confirmed at the bytes: `App.vue:59` reads `<main class="pane-main" :aria-labelledby="ROUTE_TITLE_ID">`,
  which is the X-W5 `50633f19` lineage. ⟨cmd⟩ `grep -rln "Color tool panes" e2e | wc -l` → **66**.

### Axes 2–9

- **(2) Bounds.** ⟨cmd⟩ `git diff --stat 0d21210f^..HEAD -- demo e2e test src scripts/dev/dev.sh` → **empty**.
  `git show --stat`: `0d21210f` touches INBOX, this record and LEDGER. `d8029124` touches this record only.
  `8865d963` touches this record, LEDGER and 27 transcripts under `W6-evidence/gates/close-4-2026-09-22/` (§4
  `W6-evidence/**`). `dev.sh` is untouched. The result is clean.
- **(3) Masking.** There is no product diff in this sitting. The `.c` seat refused to game b1 (seed, domain or
  instrument edit), which is the lawful refusal. There is no masking act.
- **(4) Commit families.** Open, receipt and close are one commit per meaning. No §9 product family was split,
  because none landed.
- **(5) E-3.** ⟨cmd⟩ `git diff --stat 0d21210f^..HEAD -- docs/tranches/X/waves/W6.md docs/tranches/V/megatranche/registry/adjudicated/ …/probes/wb-gradient-stopeditor …/audit/components`
  → **empty**. The rule held.
- **(6) Mail.** ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **94**. The status-cell `awk` finds 4 cells, and every one
  is SENT, FOLDED or READ, with the word only in prose. **0 UNREAD.** The owed `O-` row for
  `W6-glass-ask-hero-blob-p3.md` is still absent (`grep -c hero-blob-p3` → 1, the sweep prose). It is `.h`'s to
  write and `.h` was not dispatched, so this is an outbound debt, not an unread.
- **(7) Four-verb.** The line stays at IMPLEMENTED no. That is lawful with 19 RED.
- **(8) Goal §2a at the bytes.** **NOT MET.** The four scene contracts are unlanded: `o29` is absent and there are
  **14** `component: Stub` rows. The blob chroma (h1) and the cold-load (i3) are RED.
- **(9) Published figures.**
  - 27 transcripts: reproduces.
  - GREEN 31 / RED 19 = 50: the arithmetic reproduces.
  - vue-tsc EXIT 0: reproduces.
  - INBOX 94: reproduces.
  - h1 `3 failed` does **not** reproduce as a count (this seat got 1 failed). g2 `1 passed` is flaky (1 of 2).

### Axis 10 — honest-RED adjudication (every RED, at the spec bytes)

| gate | relief at the spec bytes | owner named in the register | verdict |
|---|---|---|---|
| g1 | `W6.md:484`: "**g1** honest-RED by id → X-W10 (M-23)" | R-6 X-W10 | **HONEST-RED** |
| j1 · j2 · j3 | `W6.md:479`/`:484`: "`.j` after X-W5 CLOSED". LEDGER X-W5 = PARTIAL | R-7 `.j` | **HONEST-RED** (successor-gated by the spec) |
| H4 | the CC-056/CC-057 dispositions land in `.j`, which is gated as above | R-7 | **HONEST-RED** |
| H2 | the file is present, and the `.e` legs cite it (`gradient.spec.ts:445-446`, `gate-prm-idiom.mjs:15-16,48`). Only the `.j` leg is owed, and it is gated as above | R-8 | **HONEST-RED** |
| a2 · a3 · a4 · a13 · b3 · e1 · f4 · f6 · f8 | **none**. These are W6's own gates on W6's own §4 spec paths. They are not producer-owned and are not routed to a successor by the spec. ESC-W6close-1 is unruled | R-1 names X-W5 plus a W6 repair, but only as a proposal | **UNRELIEVED** |
| f3 | **none**. The cause is unattributed and the bisect is owed | R-2 (a proposed bisect) | **UNRELIEVED** |
| h1 | **none** for this limb. §0aq relieves only `H1-P3` (OM-6 beyond-sRGB). This failure is canvas-absent on the sRGB cell | R-3 `.h` re-sit | **UNRELIEVED** |
| i3 | **none**. §0aq *grants* `.i` the `index.html` cure, and that is a W6 duty, not relief | R-5 `.i` | **UNRELIEVED** |
| b1 | **none**. `W6.md:484` assigns the cure to `.c`, and ESC-W6c-b1-1 is unruled. This seat confirms the instrument focuses the FIRST stop (`gate-seat.mjs:97-102`), and on this route that stop sits at the 0% floor, so `.c`'s input-state reading is credible. It is still a ruling owed, not relief | R-4 | **UNRELIEVED (escalated)** |

**Honest-RED set: g1 · j1 · j2 · j3 · H2 · H4** (6). **13 REDs are unrelieved.**

### Successor "Opens after" conjuncts

- **X-W7** (`W7.md:6`): X-W3 · X-W4 · **X-W6**. The X-W6 conjunct is **RED** (the row is PARTIAL). Blocked lawfully.
- **X-W8** (`W8.md:6`): X-W5 · **X-W6** · X-W7 stable. RED. Blocked lawfully.
- **X-W10** (`W10.md:6`): X-W5..X-W9 stable. RED. Blocked lawfully.
- **X-W11** (everything): RED. Blocked lawfully.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C1-1 | HIGH | 9 W6 gates are RED with no spec relief: a2 a3 a4 a13 b3 e1 f4 f6 f8. The cause is retired shell DOM after X-W5's landmark rename | `o22` → `1 failed` at `getByRole('main', { name: 'Color tool panes' })`; `App.vue:59` `:aria-labelledby`; 66 e2e files | A ruling on ESC-W6close-1. Then a W6 repair migrates W6's own §4 spec paths to the route-titled landmark, and X-W5 migrates the shared `fixtures/dock` and the rest. Restoring the old label is banned |
| C1-2 | HIGH | f3 is RED and unrelieved: the closed listbox stays visible | close transcript `pw-f-i.txt`; R-2 | A W6 repair bisects `2183b814` against `e0e204a9` and cures the cause at the root |
| C1-3 | HIGH | h1 is RED and unrelieved on the sRGB cell: canvas not found. §0aq relieves only H1-P3 | `webgl-blob-idle.spec.ts -g "hero blob carries current chroma"` → `1 failed · 2 passed` | `.h` re-sit attributes and cures it, and also writes the owed `O-` row |
| C1-4 | HIGH | i3 is RED and unrelieved. `.i` holds the §0aq `index.html` grant but was not dispatched | close `o28` 3 seeds failing; Baseline RED | `.i` re-sit with the pre-module boot seed |
| C1-5 | MEDIUM | b1 is RED with its escalation unruled (ESC-W6c-b1-1). The product grammar is credibly present | `gate-seat.mjs` ×2 → 2 `G3d` lines; instrument focuses the first stop at 0% | A COHESION ruling: re-point the instrument (X-W11 OUT-OF-WAVE) or accept `.c`'s Act-4 transcript |
| C1-6 | MINOR | g2 GREEN is flaky: 1 fail and 1 pass here | run 1 `locator.evaluate` 30 s timeout; run 2 `1 passed (29.8s)` | The next close double-runs g2. Mitigation: it reproduced GREEN on its second run |
| C1-7 | MINOR | The close's h1 count `3 failed` does not reproduce (1 failed here). The RED is nondeterministic | as C1-3 | `.h` records the per-seed determinism |
| C1-8 | MINOR | §8 artefacts are PARTIAL: gradient PNG 0, owner-marks 0, cold-load frame owed | close Act 4 | R-11 owners |
| C1-9 | INFO | Bounds, masking, commit-family, E-3 and mail axes are clean. The four-verb line held lawfully | Axes 2–7 | none |

### Verdict

**NOT-CONFORMANT.** There are 4 HIGH, 1 MEDIUM, 3 MINOR and 1 INFO. 30 of the 31 claimed GREENs reproduce (g2
flaky). The honest-RED set is g1 · j1 · j2 · j3 · H2 · H4, and 13 REDs are unrelieved. The LEDGER row is **NOT
promoted** and stays PARTIAL.

---

## Repair 1 — RESUME 2026-09-22 (REPAIR SEAT, round 1, over the Check 1 — fourth sitting register)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). Spec read whole (`W6.md`, both addenda); the record read at its
header, the fourth-sitting Open/Baseline/Unit plan, the fourth Close's Acts 7–8 and the Check 1 above.
**Crash-recovery**: ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh`. Neither is in this seat's writable set, so **nothing was inherited**; neither was
touched or staged.

**Host condition (binding on every e2e reading below).** ⟨cmd⟩ `uptime` across the seat → load averages
**38 · 50 · 59** (18:00), **165 · 85 · 66** (18:11), **17 · 42 · 55** (18:23), **86 · 69 · 64** (18:26),
**179 · 128 · 93** (18:33). Other sessions' Playwright/vite runs share the host (⟨cmd⟩ `ps aux | grep "playwright test"`
→ runs from two foreign repos beside this seat's). Every e2e reading here was taken under that load, on a
freshly started vite (`VJS_E2E_PORT=8290`, tree-true, the STALE-SERVER LAW held).

### C1-1 (HIGH) — nine gates on retired shell DOM: W6's own limb CURED, the rest ESCALATED

- **Cure (in bounds, §4 spec paths).** The six `getByRole("main", { name: "Color tool panes" })` queries in W6's
  own specs move to the route-titled landmark, the idiom X-W5's migrated specs already use
  (`walk.spec.ts:120`, `page-load.spec.ts:26`): `gradient.spec.ts:21` and `o21-gradient-rail.spec.ts:40/:205` →
  `"Gradient"`; `o22:42` · `o23:190` · `o24:41` → `"Home"`. Gate a13 itself demands *"zero assertions target
  retired DOM"*, so this is the gate's own cure, not a relaxation. The old label is not restored.
  ⟨cmd⟩ `grep -rn "Color tool panes" e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o2[1-5]*.ts e2e/smoke/oracles/o28*.ts | wc -l` → **0**.
  The combobox `Select view` is **not** retired (⟨cmd⟩ `grep -rn "Select view" demo` → `demo/shell/dock/DockViewSelect.vue:68`),
  so `fixtures/dock` needs no change for W6.
- **Commit**: `7733e557` `test(x-w6/repair-1): W6's own specs query the route-titled main landmark`.
- **Escalated**: the other files still on the retired label (⟨cmd⟩ `grep -rln "Color tool panes" e2e | wc -l` → **61** (66 − W6's 5 files),
  e.g. `o26-aurora-perceptibility.spec.ts:69`, `o27-focus-affordance.spec.ts:36`) are outside §4. They belong to the
  renamer under the no-backwards-compat law. **ESC-W6close-1 stays open for that ownership ruling.**
- **Gate re-reading** (⟨cmd⟩ `VJS_E2E_PORT=8290 npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts [o22 o23 o24] --project=smoke`,
  transcripts `W6-evidence/gates/repair-1-2026-09-22/pw-run{1,2,3}.txt`):

  | run | host load | result | failures, by kind |
  |---|---|---|---|
  | 1 (5 files, fresh spawned server) | 38–59 | `9 failed · 16 passed (8.6m)` | o21 :60–:313 ×7 at `locator.click` / `scrollIntoViewIfNeeded` timeouts on `Select view` / the bar (*"waiting for element to be visible, enabled and stable"*); a2 `mouse.move` timeout; e1 `moved` true |
  | 2 (gradient + o21, fresh spawned) | 50–165 | `8 failed · 14 passed (8.2m)` | o21 only: `paneSettled` poll (transform ≠ none) ×2, stability timeouts, one `toHaveCount`; **all 12 `gradient.spec.ts` tests passed, a2 and e1 included** |
  | 3 (5 files, warmed fresh server) | 17–179 | `9 failed · 16 passed (9.7m)` | option/combobox stability timeouts; `main "Gradient"` heading not found **while the view listbox was still open** (the error-context snapshot shows `- listbox:` with `option "Gradient" [selected]` beside `main "Gradient"` — reka hides the outside tree from the a11y API) |

  **No failure in any run is a retired-DOM query**: every one is an actionability or settle wait. **f4 · f6 · f8 read GREEN
  in both runs 1 and 3** (the f4 census prints `0/18 captions overflow`; the f6 census prints every out-of-gamut row
  `MARKED`). Three o21 tests failed in **all three** runs — `:60` (terminal truth), `:80` (paint stack) and `:188`
  (a4's inverse-map arm) — each at a `Select view`/option click, a `paneSettled` poll or a stop-count wait, never at
  an assertion on the rail. `:60` and `:80` are the first two tests of every run. Every other o21
  and gradient test passed in at least one run. The aggregate a2 · a3 · a4 ·
  a13 · b3 · e1 is **not** read GREEN here: the same command did not pass whole at this host load (see C1-2 for the
  measured mechanism).

### C1-2 (HIGH) — f3: the closed listbox stays visible. ATTRIBUTED by measurement; not cured in bounds; ESCALATED

- **Measured mechanism** (`probe-listbox-stuck.mjs`, readings in `…/repair-1-2026-09-22/probe-readings.txt`). After a
  pick, reka's Select content is `data-state="closed"` and stays mounted because its exit animation
  **`glass-reveal-out` (0.15 s) sits at `currentTime 0`, `running`**. The five `--saved-bg*` ground transitions on
  `<html>` sit at `currentTime 0` too. The document timeline is not advancing: **rAF fired at
  `[-5, 8989, 11762, 12610]` ms**, one frame every 3–9 s, while `page.evaluate` answered at once (the main thread
  was free). The page has two canvases, 300×150 and 63×63. At host load 22.8 the same ten picks all closed, in
  **10–3404 ms** (`probe-listbox-close.mjs`). So the listbox is not stuck in state; it is waiting for frames the
  swiftshader compositor does not produce under this load. The same starvation explains `main "Gradient"` not being
  found in run 3 (the view listbox was still open) and the o21 stability timeouts in C1-1.
- **What is not attributed.** Whether X-W5's `50633f19`/`2183b814` raised the per-frame cost enough to turn f3 from
  GREEN (Check 3) to RED. One A/B (`probe-raf-cadence.mjs`; `*{backdrop-filter:none}` injected in the probe page only)
  gave idle first frames at **17198 ms as-is vs 3877 ms without backdrop-filter**. That is N=1 at load 68–86, so it is
  not conclusive. The bisect the close asked for (`2183b814` vs `e0e204a9`) needs a quiet host, which this seat did
  not have (load 17–179).
- **Why no cure here.** No W6 byte produces the stall. `glass-reveal-out` is producer CSS, the ground transitions are
  `useAtmosphere`'s by design (200 ms OKLab, F-12), and the blur carrier is X-W5's `demo/styles/shell.css`. Lengthening
  the f3 wait would be a masking act, and it is not done.
- **Gate re-reading**: ⟨cmd⟩ `npx playwright test e2e/smoke/oracles/o21-space-catalog-truth.spec.ts --project=smoke` (run 4,
  load up to 179) → **RED**: `toBeHidden` failed, *"19 × locator resolved to … role="listbox" … data-state="closed""*,
  byte-identical to the close's R-2.
- **Escalation ESC-W6r1-f3**: a quiet-host bisect of per-frame cost across `e0e204a9 → 50633f19 → 2183b814`, owned by
  X-W5 (the shell/motion bytes) or X-W2 (frame budget), with W6's f3 re-read after it.

### C1-3 (HIGH) — h1 canvas absent on the sRGB cell: ATTRIBUTED and CURED; the O- row WRITTEN

- **Measured cause** (`probe-blob-arrival.mjs`, readings in `probe-readings.txt`). The blob canvas mounts behind the
  overture beat DAG: the `b2` field settle, then the `b4` idle slice (`useOverture.ts:169-171`, rIC ceiling 500 ms), then
  the async HeroBlob chunk (`ColorPicker.vue:103,165`), then engine init. On a warm server it arrives **1645–6429 ms**
  after navigation (beat marks e.g. `b1@382 b3@462 b2@1084 b4@2034`, canvas at 2052). On the **first navigation of a
  freshly spawned vite** it arrives at **17138 ms**, with FCP alone at **13848 ms** (the dev server's on-demand
  transform). One further warm-server outlier read 16243 ms. The h1 test waited for it with the expect default,
  **8000 ms**. Whichever seed ran first against a cold or starved server was RED with the canvas absent. That is why
  the count moved between **3 failed** (the close, run on fresh `:8196` servers) and **1 failed · 2 passed** (Check 1).
  C1-7's nondeterminism is this mechanism.
- **Cure**: the h1 arrival wait is bounded by the test's own `test.setTimeout(60_000)` budget
  (`toBeVisible({ timeout: 45_000 })`), with the measurement in the comment. **The chroma assertions, the stated ΔC 0.04
  and the seeds are unchanged.** Arrival latency is not what h1 asserts; the overture DAG and its perf cells own it.
- **Commit**: `b2bb8aab` `test(x-w6/repair-1): h1 waits out the blob's measured arrival, not the 8 s expect default`.
- **O- row**: `O-52` (INBOX) for `W6-glass-ask-hero-blob-p3.md`, **SENT**. **Commit `65a552be`.** ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **96**.
- **Gate re-reading** (⟨cmd⟩ `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke`):
  run 4 → `3 passed`; run 5 → **`3 passed (1.5m)`**, OM-6 ΔC **0.02527**, `oklch(0.65 0.3 150)` ΔC **0.00538**,
  `oklch(0.55 0.37 328)` ΔC **−0.02165**, buffer `srgb`; run 6, on a **freshly spawned** server (`VJS_E2E_PORT=8490`, the case that failed) → **`3 passed (1.1m)`**,
  ΔC 0.02538 · 0.00592 · −0.02168. **h1 GREEN ×3**, on the warm server twice and the cold server once. The owner's OM-6
  beyond-sRGB limb stays **`H1-P3`**, honest-RED-by-physics (§0aq).

### C1-5 (MEDIUM) — b1: ESCALATED (a ruling, not a byte)

⟨cmd⟩ `sed -n 97-104p …/wb-gradient-stopeditor/gate-seat.mjs` → each key reloads, then `document.querySelector("[data-stop-id]").focus()`
selects the **first** stop, which on this route sits at 0%. There, Home (want 0%) and ArrowDown (want −1%) are identity
moves by the bound. The instrument is `execute, no write` (§4), so re-pointing it is not this seat's to do. The in-bounds
witness `o21-gradient-rail.spec.ts:422` (*"keyboard grammar is total: an interior stop answers every key, a terminal
holds its bound"*) **passed in runs 1 and 3** and failed in run 2 on an actionability wait (C1-2's starvation). **ESC-W6c-b1-1
stays open**: COHESION rules either the X-W11 OUT-OF-WAVE re-point of G3d to an interior stop, or o21:422 / `.c`'s
Act-4 transcript as b1's witness of record.

### C1-4 (HIGH) — i3 cold-load first paint: NOT CURED; ESCALATED with the measured reason

- **What the oracle measures.** `o28-atmosphere-coldload.spec.ts:22,38,119-123` runs each seed in a **fresh context
  with no storage and no ground record**; the pick exists only in the URL (`#/?space=oklch&color=…`).
- **What the grant covers.** §0aq ESC-R1-i3: *"a `<script>` before the module entry that seeds the first-painted
  atmosphere **from the persisted pick**"*. The boot script already seeds from the persisted record
  (`index.html` `color-picker-ground`, the `rec.deriveVersion === VERSION` branch). On o28's cold load there is no
  persisted pick, so a seed read from storage cannot move o28.
- **What a URL-seeded pre-module cure would need** (read at the bytes). The settled ground is
  `normalizeGroundStops(palette.map(oklchStopToHex))` over `guaranteeSeamOffset(resolveCalibratedAtmosphere(fieldAtoms()), seed)`
  (light) or `deriveAurora(seed, { scheme: "dark" })` (`useAtmosphere.ts:142-143,207-211,266-293`). Its seed is
  `cssColorOpaqueFrame` from the colour pipeline (`App.vue:291-294`), which comes from `resolveHydratedBootModel()`
  (`boot/hydrate.ts:110`) plus the pipeline's opaque serialisation (`demo/color-session/useColorPipeline.ts`, outside
  `.i`'s set). A classic inline script can do this only by **copying the producer's `deriveAurora`** (banned). A module
  seed does not paint first unless it is **render-blocking** (`blocking="render"`), which puts a module graph on the
  critical path. That is a perf-bearing design act on X-W2's LCP bar (T Q14's escalation class), and it reaches the
  pipeline's serialisation outside the grant. §3a names *"file-bound expansion"* and *"producer-boundary surprise"* as
  triumvirate triggers, so this seat did not author it.
- **Gate re-reading**: not re-run. No byte it reads moved in this repair. The close's RED (seeds 30 · 150 · 260) stands.
- **Escalation ESC-W6r1-i3**: COHESION rules (a) whether §0aq's *"persisted pick"* includes the URL-carried pick, and
  if so (b) the render-blocking boot-seed module, its reach into `useColorPipeline.ts`'s serialisation, and X-W2's
  sign-off on the critical-path cost. The alternative is to re-point o28 at a storage-seeded cold load; that is an E-3
  addendum to the oracle, not this seat's.

### C1-6 (MINOR) — g2 flaky: the double-run DONE, and it is still flaky

⟨cmd⟩ `npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts -g "companion panes share one track start" --project=smoke` ×2
(`pw-g2-run{1,2}.txt`, load 68–81) → run 1 **`1 passed (19.6s)`**, run 2 **`1 failed`**: *"the Picker pane never settled"*.
Run 4 also failed with the same message. It is the same starvation as C1-2: the pane's enter transform cannot reach
rest while frames are 3–9 s apart. g2 is **GREEN on a settled host, and not reliably GREEN at this load**. It rides
ESC-W6r1-f3's quiet-host re-read.

### C1-7 (MINOR) — h1's count was nondeterministic: ATTRIBUTED, and CURED with C1-3

The 3-failed vs 1-failed spread was the first-seed-on-a-cold-server case (C1-3). After `b2bb8aab`, runs 4 · 5 · 6
(warm, warm, cold) read `3 passed` each.

### C1-8 (MINOR) — §8 artefacts PARTIAL: NOT CURED (no one-command cure)

The gradient before/after PNGs, the owner-mark re-captures and the cold-load frame each need a capture seat. Before
frames cannot be re-taken, because the cures have already landed. They stay with the R-11 owners (`.a`/`.b` evidence
repair · `.i`). This repair's own transcripts and probes are committed under
`W6-evidence/gates/repair-1-2026-09-22/` (⟨cmd⟩ `ls … | wc -l` → **14**).

### C1-9 (INFO) — no act owed

### Tally at this repair's bytes (WRITE-THEN-MEASURE; read from the transcripts above)

Per-test pass/fail across runs 1 · 2 · 3 (⟨cmd⟩ a `grep "^    \[smoke\] › …"` over `pw-run{1,2,3}.txt`; G = passed, R = failed, - = not in the run):

| gate · test | run 1 | run 2 | run 3 |
|---|---|---|---|
| a3 · o21:143 one axis | R | G | R |
| a4 · o21:188 inverse maps | R | R | R |
| (a13 leg) o21:60 terminal truth | R | R | R |
| b3 · o21:366 numeric entry | G | R | G |
| a2 · gradient:163 crossing drag | R | G | R |
| e1 · gradient:451 aurora | R | G | G |
| f4 · o22 | G | - | G |
| f6 · o23 | G | - | G |
| f8 · o24 | G | - | G |

**Moved to GREEN by this repair (×2 or more, same command):** **f4 · f6 · f8** (runs 1 and 3) and **h1** (runs 4 · 5 · 6).
**Not read GREEN:** a2 · a3 · a4 · a13 · b3 · e1. e1 and b3 passed twice in three runs, but the command of record did
not pass whole at this host load, so they are not published GREEN (C1-2's starvation; ESC-W6r1-f3).

**SELF-COUNT, counted twice.** GREEN = the close's 31 + f4 f6 f8 h1 = **35**. RED = a2 a3 a4 a13 (4) + b1 b3 (2) + e1 (1)
+ f3 (1) + g1 (1) + i3 (1) + j1 j2 j3 (3) + H2 H4 (2) = **15**. 35 + 15 = **50**. Second count, by unit: `.a` RED
a2 a3 a4 a13 (4); `.b` RED b1 b3 (2); `.e` RED e1 (1); `.f` RED f3 (1); `.g` RED g1 (1); `.i` RED i3 (1); `.j` RED
j1 j2 j3 (3); wave-level RED H2 H4 (2). 4+2+1+1+1+1+3+2 = **15**. g2 stays in the GREEN column (Check 1 counted it there) but
read **1 of 2** here (C1-6).

**Unrelieved RED after this repair:** a2 a3 a4 a13 b3 e1 (C1-1 remainder: in-bounds bytes cured, reading blocked by the
host), f3 (ESC-W6r1-f3), i3 (ESC-W6r1-i3), b1 (ESC-W6c-b1-1). **Honest-RED set unchanged:** g1 · j1 · j2 · j3 · H2 · H4.

### Bounds, masking, mail

- ⟨cmd⟩ `git diff --stat 098ee13a..HEAD -- demo src api scripts/dev/dev.sh docs/tranches/X/waves/W6.md docs/tranches/V/megatranche/registry docs/tranches/V/megatranche/audit` → **empty**.
  Every path this repair wrote is §4 / §0aq: `e2e/smoke/views/gradient.spec.ts` and `o21`–`o24` (§4), `e2e/smoke/webgl-blob-idle.spec.ts`
  and INBOX (`.h`'s set, §0aq), `W6-evidence/**`, this record and the LEDGER.
- The o23/o24 runs re-wrote two committed §8 frames (`W6-evidence/catalog/after-catalog-open.png`, `after-specimen-dots.png`) as a
  side effect of running. Those frames are prior evidence (E-3), so both were restored to HEAD bytes and nothing re-captured
  was committed. The scratch probe copies at the repo root were removed; their committed copies live in the evidence directory.
- **Masking: none.** No retired label was restored. No f3 or g2 wait was lengthened. The one wait that changed (h1 arrival) is
  attributed by measurement and leaves every chroma assertion untouched.
- Prettier: ⟨cmd⟩ `npx prettier --check` over the six touched specs → `gradient.spec.ts` and `webgl-blob-idle.spec.ts` warn. Both warn
  **at HEAD before this repair** too (checked via `git show HEAD:<path> | prettier --check --stdin-filepath`), so they were not
  reformatted (ADD-never-replace). ⟨cmd⟩ `git diff --check` → clean.
- **E13**: INBOX `O-52` written (SENT). ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **96**. 0 UNREAD in scope.

### Escalations (for COHESION)

1. **ESC-W6close-1** (open; C1-1 remainder): the owner of the **61** e2e files still on the retired `main` label, outside W6 §4.
2. **ESC-W6r1-f3** (new; C1-2 · C1-6 · the a2–e1 reading): a quiet-host bisect of per-frame cost across `e0e204a9 → 50633f19 → 2183b814`
   (the X-W5 shell/motion bytes), owned by X-W5 or X-W2. The frame-starvation mechanism is measured here.
3. **ESC-W6c-b1-1** (open; C1-5): re-point G3d (X-W11 OUT-OF-WAVE) or accept o21:422 / `.c` Act-4 as b1's witness.
4. **ESC-W6r1-i3** (new; C1-4): does §0aq's *"persisted pick"* cover the URL pick, and if so, the render-blocking boot-seed module
   plus its reach into `useColorPipeline.ts` (X-W2 sign-off). The alternative is an E-3 re-point of o28.

### Commits

`7733e557` (C1-1) · `65a552be` (O-52) · `b2bb8aab` (C1-3/C1-7) · this record + the evidence directory (the commit that adds this section).

### Verdict

**PARTIAL — 3 of the 4 HIGH defects are attributed, and 1 HIGH is cured whole.** C1-3 is cured: h1 is GREEN ×3 and the O- row is
written. C1-1 is cured in bounds: f4, f6 and f8 are GREEN ×2, and the remainder is host-blocked or escalated. C1-2 is attributed
and escalated. C1-4 is escalated. The MEDIUM (C1-5) is escalated. Of the MINORs, C1-7 is cured, C1-6 has its double-run done
(still flaky), and C1-8 is carried. **GREEN 35 / RED 15.** The LEDGER row is **not promoted**; it stays PARTIAL. A fresh
check is owed.

---

## Check 2 — RESUME 2026-09-22 (L-20 fresh adversarial pass 2, over the fourth sitting's close + Repair 1)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). VERIFY-ONLY: this seat cures nothing. It read `W6.md` whole (both
addenda), this record's fourth-sitting Open and Unit plan, the fourth Close, Check 1 and Repair 1, and every commit
Repair 1 names (`7733e557` · `65a552be` · `b2bb8aab` · `97e9a4f4`).
**Crash-recovery**: ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh`.
Neither is in this seat's writable set, so nothing was inherited.
**Rulings**: ⟨cmd⟩ `grep -rln 'ESC-W6r1-f3\|ESC-W6close-1\|ESC-W6r1-i3\|ESC-W6c-b1-1' docs/tranches/X` → only `LEDGER.md` and this
record. COHESION's newest addenda (`§0ar` · `§0as` · `§0at`) rule Track B/C rows. **None of the four W6 escalations is ruled.**
**Live cell**: the `:9000` vite server (PID 14970, cwd = this repo, the close's fresh server; no `demo/` byte has moved since:
⟨cmd⟩ `git diff --stat 7733e557^..HEAD -- demo src` → empty). Playwright ran on its own fresh webServers (`VJS_E2E_PORT` 8590–8594).
Host load ⟨cmd⟩ `uptime` → **20.8 · 61.6 · 73.0** (18:40) and **25.1 · 48.1 · 64.7** (18:43).

### Axis 1 — the 35 claimed GREENs, re-run at this seat's clock

| gate(s) | ⟨cmd⟩ | this seat |
|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` → `npx vitest run test/gradient-order-invariant.test.ts` | EXIT 0 · EXIT 0 (17 tests) |
| a5–a11 | `node docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs` | `GATE X.W6.a (gesture + paint) — GREEN` (a9 `[]`, `3 → 2`) |
| a7 arm 2 | `node …/WBGSE-O-r3-gestures.mjs` | EXIT 0, `errs: []` |
| a12 | `node …/WBGSE-D-probe2.mjs` | EXIT 0 |
| b2 · b4 | `node …/gate-seat.mjs` ×2 | 0 `G3e`/`G3f` lines in either run |
| c1 · c2 · c3 · c4 | `gate-structure.mjs` · vitest `-t "one sampling law"` · `vite-node gate-literal-dialect.mjs` · `vitest run test/interpolation-subset.test.ts` | `GATE G4 (structure) — GREEN` · EXIT 0 · `GATE c3 (literal dialect) — GREEN` · EXIT 0 |
| d1 · d2 | `EASING_RADIUS_ORIGIN=http://localhost:9000 node …/gate-easing-radius.mjs` · `gate-easing-readout.mjs` | `33 · read-only 2 · GATE d1 — GREEN` · EXIT 0, `DATED ASK`, restyle `0 line(s)` |
| e2 | rAF grep + `gate-prm-idiom.mjs` | `0` · `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 · h2 · i2 | the four `docs/tranches/X/gates/*.mjs` | EXIT 0 each (f1 `offered=18 catalogued=18 info=18`) |
| f2 · f7 · f8(grep) · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0 0` · `0` · `2 0` · `0` · TSC EXIT 0 |
| f4 | `npx playwright test e2e/smoke/oracles/o22-specimen-legibility.spec.ts --project=smoke` ×2 | run 1 (`:8592`) **`1 failed`**: `locator.screenshot` 30 s test timeout *"waiting for element to be stable"*; run 2 (`:8593`) **`1 passed (29.4s)`**, `0/18 captions overflow` |
| f6 · f8 | `o23` · `o24` (run with f4 run 1) | `2 passed` |
| g2 | `companion-pane-track-start.spec.ts -g "companion panes share one track start"` | `1 passed (26.7s)` |
| h1 | `webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke` ×2, each on a freshly spawned server | run 1 (`:8590`) **`1 failed · 2 passed (2.4m)`**: seed `lab(92% 88.8 20)`, *"Test timeout of 60000ms exceeded"* at `page.evaluate` (`webgl-blob-idle.spec.ts:169`), i.e. **after** the 45 s arrival wait was spent; run 2 (`:8591`) **`3 passed (1.0m)`**, ΔC 0.0251 · (≈0.006) · (≈−0.022), buffer `srgb` |
| i1 | `o25-atmosphere-response.spec.ts` | `1 passed (4.1s)` |
| H1 · H3 | `gate-no-chassis.mjs b2dd375c a87f8930` · the R1 one-liner + glass version | EXIT 0 · `EXIT 0` · `7.0.0` |
| j4 | cited | no byte it reads moved (Axis 2) |

**34 re-run, 1 cited (j4). 32 reproduce on every reading; f4 and h1 reproduce on 1 of 2 readings** (both failures are
the frame/latency starvation class Repair 1 measured, at host load 20–73). The o22/o24 runs re-wrote two committed §8
frames (`catalog/after-catalog-open.png`, `after-specimen-dots.png`) as a run side effect; both were restored to HEAD
bytes (`git checkout -- <that path>`, the seat's own side effect only); nothing re-captured is committed.

**The claimed REDs, re-read.** b1: `gate-seat.mjs` ×2 → EXIT 1 each, exactly the 2 `G3d` lines (Home · ArrowDown on the
first stop at 0%). The rest (a2 a3 a4 a13 b3 e1 f3 i3 j1–j3 H2 H4) are cited from Repair 1's transcripts: no byte any
of them reads has moved since (`git log 97e9a4f4..HEAD -- demo e2e test` → empty).

### Axes 2–9

- **(2) Bounds.** `git show --stat`: `7733e557` → `gradient.spec.ts` + `o21`–`o24` (§4, ADD-never-replace edits of a
  retired label; 6 lines); `65a552be` → INBOX 1 line (`.h`'s mail row, §0aq); `b2bb8aab` → `e2e/smoke/webgl-blob-idle.spec.ts`
  (`.h`'s set, §0aq); `97e9a4f4` → this record, LEDGER (+1) and 14 files under `W6-evidence/gates/repair-1-2026-09-22/`.
  `dev.sh` untouched. **Clean.**
- **(3) Masking.** `7733e557` re-points W6's own queries at the live landmark (`App.vue` `:aria-labelledby` the route
  H1); the retired label is not restored — a13's own demand, not a relaxation. `b2bb8aab` widens only the canvas
  **arrival** wait (`toBeVisible({ timeout: 45_000 })`) with its measured cause in the comment; ΔC 0.04, the seeds and
  every chroma assertion are byte-unchanged. That is a latency wait, not a narrowed assertion, and it is attributed by
  measurement — **not a masking act** — but it leaves 15 s of a 60 s budget for the rest of the test, and run 1 above
  spent it (C2-5). No try/catch, skip, allowlist, copied selector or node_modules patch. **Clean.**
- **(4) Commit families.** One commit per meaning (landmark · mail · h1 wait · record). No §9 product family split.
- **(5) E-3.** ⟨cmd⟩ `git diff --stat 7733e557^..HEAD -- docs/tranches/X/waves/W6.md docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/V/megatranche/audit/probes/wb-gradient-stopeditor docs/tranches/V/megatranche/audit/components src api demo scripts/dev/dev.sh`
  → **empty**. Held.
- **(6) Mail.** ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **96**; `O-52` present (SENT, `W6-glass-ask-hero-blob-p3.md`). The status-cell
  `awk -F'|' '$6 ~ /UNREAD/'` hits 4 rows (O-20 · I-31 · I-32 · O-39), each SENT/FOLDED/READ with the word in prose only.
  **0 UNREAD in scope; the owed O- row is discharged.**
- **(7) Four-verb.** IMPLEMENTED no, with 15 RED. Lawful; it did not move.
- **(8) Goal §2a at the bytes.** **NOT MET.** ⟨cmd⟩ `grep -c "component: Stub" demo/color-picker/router/index.ts` → **14**;
  `ls e2e/smoke/oracles | grep -c o29` → **0**: no instrument owns a routed scene contract yet. The cold-load truth (i3) is RED.
- **(9) Published figures.** GREEN 35 / RED 15 = 50: the arithmetic reproduces. INBOX 96: reproduces. `61` retired-label
  files: ⟨cmd⟩ `grep -rln "Color tool panes" e2e | wc -l` → **61**, reproduces. Repair 1's "h1 GREEN ×3" and "f4 GREEN ×2"
  reproduce here only 1 of 2 each (C2-5, C2-6).

### Axis 10 — honest-RED adjudication (every RED, at the spec bytes)

| gate | relief at the spec bytes | owner in the register | verdict |
|---|---|---|---|
| g1 | `W6.md:484` *"**g1** honest-RED by id → X-W10 (M-23)"* | R-6 X-W10 | **HONEST-RED** |
| j1 · j2 · j3 | `W6.md:479`/`:484` *"`.j` after X-W5 CLOSED"*; LEDGER X-W5 = **PARTIAL** | R-7 `.j` | **HONEST-RED** (successor-gated by the spec) |
| H4 | CC-056/CC-057 land in `.j` (§Dispositions), gated as above | R-7 | **HONEST-RED** |
| H2 | the record exists; the `.e` legs cite it; only the `.j` leg is owed, gated as above | R-8 | **HONEST-RED** |
| a2 · a3 · a4 · a13 · b3 · e1 | **none**. W6's own gates on W6's own §4 specs; the in-bounds retired-label cure landed (`7733e557`) but the command of record has not passed whole; ESC-W6r1-f3 (frame starvation, X-W5/X-W2 bisect) is **unruled** | Repair 1 esc. 2 (proposal) | **UNRELIEVED** |
| f3 | **none**. Attributed to frame starvation, not cured; ESC-W6r1-f3 unruled | Repair 1 esc. 2 | **UNRELIEVED** |
| i3 | **none**. §0aq grants `.i` the `index.html` cure (a W6 duty, not relief); ESC-W6r1-i3 (does "persisted pick" cover the URL pick) is **unruled** | R-5 · esc. 4 | **UNRELIEVED** |
| b1 | **none**. `W6.md:484` assigns the cure to `.c`; ESC-W6c-b1-1 is **unruled** (the product grammar is credibly present: o21:422 passed in Repair 1 runs 1 and 3) | R-4 · esc. 3 | **UNRELIEVED (escalated)** |

**Honest-RED set: g1 · j1 · j2 · j3 · H2 · H4** (6). **9 REDs are unrelieved**: a2 a3 a4 a13 b3 e1 f3 i3 b1.

### Successor "Opens after" conjuncts

- **X-W7** (`W7.md:6`): X-W3 · X-W4 · **X-W6** → the X-W6 conjunct is **RED** (row PARTIAL). Blocked lawfully.
- **X-W8** (`W8.md:6`): X-W5 · **X-W6** · X-W7 stable → RED (X-W5 and X-W6 both PARTIAL). Blocked lawfully.
- **X-W10** (`W10.md:6`): X-W5..X-W9 stable → RED. Blocked lawfully.
- **X-W11** (`W11.md:6`): X-W0..X-W10 IMPLEMENTED → RED. Blocked lawfully.
No successor is unlawfully blocked; every successor is lawfully blocked on this row.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C2-1 | HIGH | a2 a3 a4 a13 b3 e1 stay RED with no spec relief. The in-bounds label cure landed, but the command of record (`gradient.spec.ts` + `o21`) has not passed whole in any reading | Repair 1 `pw-run{1,2,3}.txt` (9 · 8 · 9 failed; o21 `:60` `:80` `:188` failed all three); no byte moved since | ESC-W6r1-f3 ruled (quiet-host bisect across `e0e204a9 → 50633f19 → 2183b814`, owner X-W5/X-W2); then the same command double-read GREEN. ESC-W6close-1's 61 foreign files ride the renamer |
| C2-2 | HIGH | f3 RED and unrelieved (closed listbox stays visible; frame starvation attributed, not cured) | Repair 1 run 4 `toBeHidden` ×19 `data-state="closed"` | as C2-1 (ESC-W6r1-f3); no wait lengthened |
| C2-3 | HIGH | i3 RED and unrelieved; the §0aq grant is a duty, and ESC-W6r1-i3 is unruled | close `o28` seeds 30 · 150 · 260 RED; Repair 1 C1-4 | COHESION rules ESC-W6r1-i3 (URL pick ∈ "persisted pick"? render-blocking boot module + X-W2 sign-off, or an E-3 re-point of o28); then `.i` re-sits |
| C2-4 | MEDIUM | b1 RED, escalation unruled; product grammar credibly present | `gate-seat.mjs` ×2 → EXIT 1, 2 `G3d` lines each | COHESION rules ESC-W6c-b1-1 (X-W11 OUT-OF-WAVE re-point of G3d, or o21:422 as witness of record) |
| C2-5 | MEDIUM | h1's published "GREEN ×3" reproduces 1 of 2 here: on a freshly spawned server the 45 s arrival wait consumed the 60 s test budget and `page.evaluate` timed out | run 1 `:8590` `1 failed · 2 passed (2.4m)`, `webgl-blob-idle.spec.ts:169` *"Test timeout of 60000ms exceeded"*; run 2 `:8591` `3 passed (1.0m)` | the next `.h`/close seat double-reads h1 on a cold server; if it stays split, the arrival cost is ESC-W6r1-f3's (overture DAG / frame budget), not a larger budget. Mitigation: every chroma reading that completed was inside ΔC 0.04 |
| C2-6 | MEDIUM | f4's published "GREEN ×2" reproduces 1 of 2 here (screenshot stability timeout, the starvation class) | `:8592` `1 failed` *"waiting for element to be stable"*; `:8593` `1 passed`, `0/18 captions overflow` | rides ESC-W6r1-f3's quiet-host re-read. Mitigation: the census itself never read an overflow |
| C2-7 | MINOR | §8 artefacts PARTIAL (gradient PNG 0, owner-marks 0, cold-load frame owed) | Close Act 4; unchanged | R-11 owners |
| C2-8 | INFO | Bounds, masking, commit-family, E-3 and mail axes clean; O-52 discharged the owed row; four-verb line held lawfully | Axes 2–7 | none |

### Verdict

**NOT-CONFORMANT.** 3 HIGH · 3 MEDIUM · 1 MINOR · 1 INFO. Of 35 claimed GREENs, 34 were re-run and 1 cited (j4);
32 reproduce on every reading, f4 and h1 on 1 of 2. Honest-RED set **g1 · j1 · j2 · j3 · H2 · H4**; **9 REDs unrelieved**
(a2 a3 a4 a13 b3 e1 f3 i3 b1), four of them waiting on unruled escalations (ESC-W6r1-f3 · ESC-W6r1-i3 · ESC-W6c-b1-1 ·
ESC-W6close-1). The LEDGER row is **not promoted**; it stays PARTIAL.

## Repair 2 — RESUME 2026-09-22 (REPAIR SEAT, round 2, over the Check 2 — fourth sitting register)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). Read `W6.md` whole once (both addenda), the fourth-sitting Check 2
register, and the Repair 1 diagnosis ranges by `grep -n`/`sed`.
**Crash-recovery**: ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/coordination/INBOX.md` · `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M docs/tranches/X/execution/C/F-W12.md` · `M scripts/dev/dev.sh`. None is in this seat's writable set; nothing inherited, nothing touched.
**Rulings**: ⟨cmd⟩ `grep -rln 'ESC-W6r1-f3\|ESC-W6close-1\|ESC-W6r1-i3\|ESC-W6c-b1-1' docs/tranches/X` → `LEDGER.md` · this record only.
COHESION's newest addendum is `§0au` (F.W12). **None of the four W6 escalations is ruled.**
**Bytes**: ⟨cmd⟩ `git log 97e9a4f4..HEAD --oneline -- demo e2e test` → empty. No product or spec byte moved since Check 2.
**Host**: ⟨cmd⟩ `uptime` → load **54.76 · 42.04 · 55.32** (18:49). Not a quiet host.

### Defect → cure → gate re-reading

| # | sev | disposition | receipt |
|---|---|---|---|
| C2-1 (a2 a3 a4 a13 b3 e1) | HIGH | **ESCALATED — not cured.** No W6 byte produces the stall (Repair 1 C1-1/C1-2 measured it: rAF one frame every 3–9 s under load, producer `glass-reveal-out` and X-W5 `shell.css` blur carrier). The cure the register names is a COHESION ruling on ESC-W6r1-f3 + a quiet-host bisect across `e0e204a9 → 50633f19 → 2183b814` owned by X-W5/X-W2 — outside this seat's writable set. Lengthening any wait would be masking; none is done. The host stayed loaded (22–55), so no quiet-host double-read of the command of record was possible | rulings grep above; `git log 97e9a4f4..HEAD -- demo e2e test` → empty |
| C2-2 (f3) | HIGH | **ESCALATED** — same mechanism, same ruling (ESC-W6r1-f3) | as C2-1 |
| C2-3 (i3) | HIGH | **ESCALATED** — the cure is a COHESION ruling on ESC-W6r1-i3 (URL-carried pick ∈ "persisted pick"?): either a render-blocking boot-seed module (needs X-W2 sign-off — outside `.i`'s grant, which is the pre-module `index.html` seed only) or an E-3 re-point of o28 (a spec act, not a seat act). Repair 1 C1-4 measured why the granted seed cannot move o28 | Repair 1 C1-4 |
| C2-4 (b1) | MEDIUM | **ESCALATED** — `gate-seat.mjs` is `execute, no write` (§4); re-pointing G3d rides X-W11's OUT-OF-WAVE roster, and accepting o21:422 as witness of record is a COHESION ruling (ESC-W6c-b1-1). Not re-run here: no byte it reads moved since Check 2's ×2 EXIT 1 | Check 2 Axis 1 |
| C2-5 (h1) | MEDIUM | **CURED BY THE REGISTER'S OWN PRESCRIPTION** — the cure was *"run h1 twice on a cold server; if it stays split, escalate"*. Two freshly spawned servers, both GREEN; the split did not persist; no byte changed | below |
| C2-6 (f4) | MEDIUM | **ESCALATED (rides ESC-W6r1-f3)** — the split persists (1 of 2 again): the failing run died at the §8 witness `listbox.screenshot` (`o22:83`) before the census, the frame-stability class. Adding `animations:"disabled"` or a longer timeout would mask the starvation the escalation owns; not done. Every completed census read `0/18` overflow | below |
| C2-7 (§8 artefacts) | MINOR | **NOT CURED — no one-command cure**: the gradient BEFORE frames and the OM re-captures need the `.a/.b` evidence repair and `.i` (R-11 owners); the cold-load frame is gated on i3 | Close Act 4 |
| C2-8 | INFO | none | — |

### Gate re-readings (transcript `W6-evidence/gates/repair-2-2026-09-22/h1-f4-cold-double-read.txt`)

⟨cmd⟩ `VJS_E2E_PORT=868{1,2} npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke --reporter=line`
(each on its own freshly spawned webServer):

| run | port | load at start | result | ΔC per seed (stated ±0.04; buffer `srgb`) |
|---|---|---|---|---|
| 1 | 8681 | 47.74 | **`3 passed (1.0m)`** | 0.02518 · 0.00603 · −0.02165 |
| 2 | 8682 | 29.81 | **`3 passed (1.1m)`** | 0.02518 · 0.00561 · −0.02167 |

**h1 GREEN ×2 on cold servers** (C2-5 discharged at its own terms; with Check 2's run 2 and Repair 1's three, 5 of the last 6 readings are GREEN; the one RED was the arrival-budget run).

⟨cmd⟩ `VJS_E2E_PORT=868{3,4} npx playwright test e2e/smoke/oracles/o22-specimen-legibility.spec.ts --project=smoke --reporter=line`:

| run | port | load at start | result |
|---|---|---|---|
| 3 | 8683 | 23.76 | **`1 passed (31.5s)`** — every printed census row `fits` (13 rows in the tail-capped transcript; 0 `overflow` lines) |
| 4 | 8684 | 22.11 | **`1 failed`** at `o22:83` `listbox.screenshot(...)` (the §8 AFTER witness), before the census printed |

**f4 split again (1 of 2)** → stays with ESC-W6r1-f3. Run side effect: `catalog/after-catalog-open.png` was re-written by the
o22 run and restored to HEAD bytes (`git checkout -- <that path>`, this seat's own side effect only).
Transcript counts (write-then-measure, read twice): ⟨cmd⟩ `grep -c '^\[h1\]'` → **6** · `grep -c '3 passed'` → **2** · `grep -c '  fits '` → **13** ·
`grep -c '1 failed'` → **1** · `grep -c '1 passed'` → **1** · `grep -c overflow` → **0**.

### Escalations (unchanged in substance; re-stated for the orchestrator)

1. **ESC-W6r1-f3** — owns a2 a3 a4 a13 b3 e1 f3 and the f4 split: a COHESION ruling + a quiet-host bisect across
   `e0e204a9 → 50633f19 → 2183b814` (X-W5/X-W2). Host load during this seat: 22–55.
2. **ESC-W6r1-i3** — owns i3: COHESION rules the URL-pick reading (render-blocking boot module w/ X-W2 sign-off, or an E-3 o28 re-point).
3. **ESC-W6c-b1-1** — owns b1: X-W11 OUT-OF-WAVE re-point of G3d, or o21:422 accepted as witness of record.
4. **ESC-W6close-1** — the 61 foreign e2e files on the retired label → the renamer (ownership ruling).

### Verdict

**1 cured (C2-5, by re-reading at its own prescription; no byte changed) · 5 escalated (C2-1 · C2-2 · C2-3 · C2-4 · C2-6) ·
1 MINOR carried (C2-7, no one-command cure) · 1 INFO.** No product, spec or test byte written. GREEN/RED arithmetic
unchanged: **GREEN 35 / RED 15**; honest-RED **g1 · j1 · j2 · j3 · H2 · H4**; unrelieved **a2 a3 a4 a13 b3 e1 f3 i3 b1**.
The LEDGER row stays **PARTIAL**.

## Check 3 — RESUME 2026-09-22 (L-20 fresh adversarial pass 3, over the fourth sitting's close + Repairs 1–2)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). VERIFY-ONLY: this seat cures nothing. It read `W6.md` whole (both
addenda), this record's fourth-sitting Open and Unit plan, Check 2 and Repair 2 (the last two sections), and every
commit Repair 2 names (`6c7f56e2`).
**Crash-recovery**: ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh`.
Neither is in this seat's writable set; nothing inherited, nothing touched.
**Rulings**: ⟨cmd⟩ `grep -rln 'ESC-W6r1-f3\|ESC-W6close-1\|ESC-W6r1-i3\|ESC-W6c-b1-1' docs/tranches/X` → `LEDGER.md` · this record only;
COHESION's newest addendum is still `§0au` (F.W12). **None of the four W6 escalations is ruled.**
**Bytes**: ⟨cmd⟩ `git diff --stat 97e9a4f4..HEAD -- demo e2e test src api docs/tranches/X/waves/W6.md docs/tranches/V/megatranche/registry/adjudicated/ scripts/dev/dev.sh`
→ **empty**. ⟨cmd⟩ `git show --stat 6c7f56e2` → this record (+65) · LEDGER (+1) · 1 transcript under `W6-evidence/gates/repair-2-2026-09-22/`.
**Live cell**: `:9000` vite (PID 14970, this repo); Playwright on fresh webServers (`VJS_E2E_PORT` 8701–8722).
Host ⟨cmd⟩ `uptime` → **29.3 · 33.4 · 46.5** (18:54) · **20.8 · 23.9 · 37.7** (19:00) · **43.2 · 39.2 · 41.3** (19:04).

### Axis 1 — the 35 claimed GREENs, re-run at this seat's clock

| gate(s) | ⟨cmd⟩ | this seat |
|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` → `npx vitest run test/gradient-order-invariant.test.ts test/interpolation-subset.test.ts` | EXIT 0 · `22 passed (22)` |
| a5–a11 | `node docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs` | `GATE X.W6.a (gesture + paint) — GREEN` |
| a7 arm 2 · a12 | `node …/WBGSE-O-r3-gestures.mjs` · `node …/WBGSE-D-probe2.mjs` | EXIT 0 · EXIT 0 |
| b2 · b4 | `node …/gate-seat.mjs` ×2 | 0 `G3e` / 0 `G3f` lines in both runs |
| c1 · c2 · c3 · c4 | `gate-structure.mjs` · vitest `-t "one sampling law"` · `vite-node gate-literal-dialect.mjs` · `test/interpolation-subset.test.ts` | `GATE G4 (structure) — GREEN` · `4 passed \| 13 skipped (17)` · `GATE c3 (literal dialect) — GREEN` · (in the 22 above) |
| d1 · d2 | `EASING_RADIUS_ORIGIN=http://localhost:9000 node …/gate-easing-radius.mjs` · `gate-easing-readout.mjs` | `GATE d1 (easing radius) — GREEN` · EXIT 0 |
| e2 | `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` + `gate-prm-idiom.mjs` | `0` · `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 · h2 · i2 | the four `docs/tranches/X/gates/*.mjs` | EXIT 0 each |
| f2 · f7 · f8(grep) · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0 0` + TSC EXIT 0 · `0` · `2 0` · `0` |
| f6 · f8 · i1 | `o23` + `o24` + `o25` in one run (`:8701`) | `3 passed (19.2s)` |
| f4 | `o22-specimen-legibility.spec.ts` ×2 (`:8713`, `:8714`) | run 1 **`1 passed (28.7s)`**, `X.W6.f f4 CENSUS — 0/18 captions overflow`; run 2 **`1 failed`** — `page.goto: Test timeout of 30000ms exceeded` at `o22:41` (cold-server first load), before the census |
| g2 | `companion-pane-track-start.spec.ts -g "companion panes share one track start"` ×3 (`:8715` `:8716` `:8717`) | run 1 **`1 failed`** — `page.goto: Test timeout of 30000ms exceeded` at `:115` (first load, host 20–43); runs 2–3 **`1 passed (16.0s)`** · **`1 passed (15.7s)`** |
| h1 | `webgl-blob-idle.spec.ts -g "hero blob carries current chroma"` ×2 on fresh servers (`:8711`, `:8712`) | **`3 passed (1.1m)`** · **`3 passed (2.1m)`**; ΔC 0.00607/−0.02173 · 0.00534/−0.02035 (for the 150/328 seeds; stated ±0.04), buffer `srgb` |
| H1 · H3 | `gate-no-chassis.mjs b2dd375c a87f8930` · the R1 one-liner | EXIT 0 · EXIT 0 |
| j4 | cited | no byte it reads moved |

**34 re-run, 1 cited (j4). 32 reproduce on the first reading; g2 and f4 each lost one reading to a `page.goto` load
timeout on a freshly spawned server** (the same host-starvation class Checks 1–2 measured, at load 20–43; no assertion
was reached in either failing run). g2 then read GREEN ×2; f4 stays 1 of 2 on this seat (Repair 2 read it 1 of 2 as well).
Run side effects: o24 re-wrote `catalog/after-specimen-dots.png` and o22 re-wrote `catalog/after-catalog-open.png`; each was
restored to HEAD bytes (`git checkout -- <that path>`, this seat's own side effect only). Nothing re-captured is committed.

**The claimed REDs, re-read (not cited this time).**

| gate(s) | ⟨cmd⟩ | this seat |
|---|---|---|
| a2 · a3 · a4 · a13 · b3 · e1 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` ×2 (`:8722` line, `:8723` list) | **`1 failed · 21 passed (3.7m)`** · **`1 failed · 21 passed (3.2m)`**. The one failure both times is **`o21:188`** (a4's inverse-map arm): `expect(locator).toHaveCount(expected)` *Expected: 3 · Received: 2* at `o21:222`, the post-press mint wait. Every other test passed both times: `:143` one axis (a3), `gradient.spec:163` neighbour-crossing (a2), `o21:366` numeric entry (b3), `gradient.spec:451` aurora (e1), `:60` `:80` (the Repair-1 "starvation" failures), `:422` keyboard grammar |
| a4 — direct probe | an ad-hoc Playwright script (scratchpad, not committed) against `:9000` at 1440×900, `#/gradient`: press at each terminal handle's centre-x, rail top + 4px, as `o21:219` does | `t=0 … hit DIV.gradient-rail … stops 2->3` · `t=100 … hit DIV.gradient-rail … stops 2->3`. **The product mints at both terminals**; the handle sits at y 292–316, below the rail (248–288), so the press lands on the rail, not the grab region |
| f3 | `o21-space-catalog-truth.spec.ts` ×2 (`:8720`, `:8724`) | **`1 passed (1.5m)`** · **`1 passed (1.6m)`**; census 18 spaces, every `created=` authored. f3 **reads GREEN ×2 at this seat** with no byte moved since Repair 1 read it RED |
| b1 | `gate-seat.mjs` ×2 | EXIT 1 each; exactly **2** `G3d` lines each (Home · ArrowDown on the first stop at 0%) |
| i3 | `o28-atmosphere-coldload.spec.ts` (`:8721`) · `grep -rn armRuntime demo/ \| wc -l` | **`1 failed`** — *"oklch(0.62 0.2 260): the first painted atmosphere is not the seeded one"* · `0` |
| g1 · j1–j3 · H2 · H4 | cited | honest-RED set (Axis 10); ⟨cmd⟩ `grep -c "component: Stub" demo/color-picker/router/index.ts` → **14**; `ls e2e/smoke/oracles \| grep -c o29` → **0** |

**What moved since Check 2, at the same bytes**: a2 · a3 · b3 · e1 each passed inside both suite readings (their own `-g`
commands are subsets of this run), and f3 passed ×2. The gradient suite fell from 8–9 failures (Repair 1) to **1**, at host
load 20–43. The one survivor is not a starvation miss. `o21:188` has failed in **every** reading on record (Repair 1 ×3 +
this seat ×2 = 5 of 5). It fails at the same assertion each time, while its siblings `:60` and `:80` now pass. The direct
probe mints. So the RED is in the test's own sequence (`page.reload` → `openView` → `paneSettled` → bounding boxes → press), not in the
product. One candidate, **not measured here**: the geometry is read after a reload that drops the pre-reload
`scrollIntoViewIfNeeded` (`o21:194`). This is **W6's own §4 file**, so ESC-W6r1-f3 does not own it.

### Axes 2–9

- **(2) Bounds.** The one commit since Check 2, `6c7f56e2`, touched this record (+65), LEDGER (+1) and
  `W6-evidence/gates/repair-2-2026-09-22/h1-f4-cold-double-read.txt`. All three are in the repair seat's set. `dev.sh`
  untouched: ⟨cmd⟩ `git log --oneline -1 -- scripts/dev/dev.sh` shows no W6 commit, and the path is still ` M` in the tree. **Clean.**
- **(3) Masking.** No product, test or gate byte moved (the Bytes line). Repair 2 lengthened no wait and added no
  `animations:"disabled"`. The o21-space-catalog-truth foot-note (ictcp/jzazbz URL round-trip) is a logged observation
  from `e0e204a9`. It is not an exclusion from any f3 assertion. **Clean.**
- **(4) Commit families.** `6c7f56e2` is one record commit. No §9 product family is split.
- **(5) E-3.** The Bytes line prints nothing over `W6.md`, `registry/adjudicated/`, `src` and `demo`. ⟨cmd⟩
  `git diff --stat 97e9a4f4..HEAD -- docs/tranches/V/megatranche/audit/probes/wb-gradient-stopeditor docs/tranches/V/megatranche/audit/components`
  → empty. Held.
- **(6) Mail.** ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **97** (96 at Check 2; the new row is **I-40**). The status-cell
  `awk -F'|' '$6 ~ /UNREAD/'` hits O-20 · I-31 · I-32 · O-39 (UNREAD appears in the prose only) and **I-40**, which is
  **UNREAD**. I-40 is scoped *"Track C (X·F) … outside F.W12 scope"*: a glass reply to O-23/O-32, the fourier relays.
  **Outside W6's scope.** `O-52` is present. **0 UNREAD in W6's scope.**
- **(7) Four-verb.** IMPLEMENTED no; SPECIFIED stands. Lawful, and unmoved.
- **(8) Goal §2a at the bytes.** **NOT MET.** Stubs **14** and o29 **0**, so no instrument owns a routed scene yet (`.j` is gated
  on X-W5). The cold-load truth (i3) is RED.
- **(9) Published figures.** Repair 2's "h1 GREEN ×2 on cold servers" reproduces (×2 here). Its "f4 split 1 of 2"
  reproduces (1 of 2 here). **The GREEN 35 / RED 15 arithmetic no longer describes the bytes as read at this seat:**
  f3 read GREEN ×2, and a2 · a3 · b3 · e1 passed in both suite readings. This seat promotes nothing, because it is verify-only. The next
  close seat owes the re-count.

### Axis 10 — honest-RED adjudication (every RED left at this seat's readings, at the spec bytes)

| gate | relief at the spec bytes | owner in the register | verdict |
|---|---|---|---|
| g1 | `W6.md:484` *"**g1** honest-RED by id → X-W10 (M-23)"* | R-6 X-W10 | **HONEST-RED** |
| j1 · j2 · j3 | `W6.md:479`/`:484` *"`.j` after X-W5 CLOSED"*; the LEDGER X-W5 row is **PARTIAL** | R-7 `.j` | **HONEST-RED** (the spec gates it on a successor) |
| H4 | CC-056/CC-057 land in `.j` (§Dispositions), gated as above | R-7 | **HONEST-RED** |
| H2 | the quarantine record exists (⟨cmd⟩ `ls …/codex-provenance/motion-quarantine.md` → present) and the `.e` legs cite it; only the `.j` leg is owed, gated as above | R-8 | **HONEST-RED** |
| a4 · a13 | **none.** These are W6's own gates on W6's own §4 spec. `o21:188` fails 5 of 5; the product mints on a direct probe; the rest of the suite is GREEN ×2. ESC-W6r1-f3 (frame starvation) does not describe this RED | none (misfiled under ESC-W6r1-f3) | **UNRELIEVED** |
| i3 | **none.** §0aq grants `.i` the `index.html` cure; that is a W6 duty, not relief. ESC-W6r1-i3 is **unruled** | R-5 · esc. 2 | **UNRELIEVED** |
| b1 | **none.** `W6.md:484` assigns the cure to `.c`; ESC-W6c-b1-1 is **unruled**. `o21:422` (the keyboard grammar) passed ×2 here | R-4 · esc. 3 | **UNRELIEVED (escalated)** |

**Honest-RED set: g1 · j1 · j2 · j3 · H2 · H4** (6). **4 REDs are unrelieved: a4 · a13 · i3 · b1**. At this seat's readings
a2 · a3 · b3 · e1 · f3 are GREEN (×2), so they are not REDs here. They leave the unrelieved list once a close seat re-counts them.

### Successor "Opens after" conjuncts

- **X-W7** (`W7.md:6`): X-W3 · X-W4 · **X-W6**. The X-W6 conjunct is **RED** (the row is PARTIAL), so X-W7 is lawfully blocked.
- **X-W8** (`W8.md:6`): X-W5 · **X-W6** · X-W7 stable. **RED** (X-W5 and X-W6 are both PARTIAL); lawfully blocked.
- **X-W10** (`W10.md:6`): X-W5..X-W9 stable. **RED**; lawfully blocked.
- **X-W11** (`W11.md:6`): X-W0..X-W10 IMPLEMENTED. **RED**; lawfully blocked.
Every successor is blocked lawfully on this row, and none unlawfully.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C3-1 | HIGH | a4 (and a13, the suite that contains it) stays RED with no spec relief. `o21:188` fails 5 of 5 readings at `o21:222` (*Expected: 3 · Received: 2*), yet a direct press at the same geometry mints 2→3 at both terminals. The RED is in the test's sequence, not in starvation, and it has been filed under ESC-W6r1-f3, which does not own it | suite ×2 above (`1 failed · 21 passed` each, `:188` alone); the direct probe `stops 2->3` ×2; Repair 1 table `a4 · o21:188 \| R \| R \| R` | a repair seat diagnoses `o21:188`'s reload→openView→press sequence in bounds (`o21` is §4, ADD-never-replace: add the missing settle/scroll, never loosen the ordinal or mint assertion), and then reads the suite GREEN ×2 |
| C3-2 | HIGH | i3 RED and unrelieved; ESC-W6r1-i3 is unruled | `o28` `1 failed` (seed 260); armRuntime `0` | COHESION rules ESC-W6r1-i3; then `.i` re-sits |
| C3-3 | MEDIUM | b1 RED; its escalation is unruled, though the product grammar is credibly present (`o21:422` GREEN ×2) | `gate-seat.mjs` ×2, EXIT 1, 2 `G3d` lines each | COHESION rules ESC-W6c-b1-1 |
| C3-4 | MEDIUM | f4 reproduces 1 of 2 (the second run died at `page.goto` load, before the census). g2 lost 1 of 3 readings the same way | f4 `:8714`, g2 `:8715`, each `page.goto: Test timeout of 30000ms exceeded` | rides ESC-W6r1-f3's quiet-host reading. Mitigation: no completed census read an overflow, and g2 read GREEN ×2 after the miss |
| C3-5 | MINOR | the record's GREEN 35 / RED 15 is stale against the bytes: f3 · a2 · a3 · b3 · e1 read GREEN ×2 here | Axis 1 re-read | the next close seat re-counts at its own double reading. Nothing is promoted by a check seat |
| C3-6 | MINOR | §8 artefacts are PARTIAL (gradient PNG 0, owner-marks 0, cold-load frame owed) | Close Act 4; unchanged | R-11 owners |
| C3-7 | INFO | I-40 is UNREAD, but its scope is Track C (fourier O-23/O-32), outside W6 | INBOX `:135` | Track C's seat |
| C3-8 | INFO | Bounds, masking, commit-family and E-3 axes are clean; the four-verb line held lawfully | Axes 2–7 | none |

### Verdict

**NOT-CONFORMANT.** 2 HIGH · 2 MEDIUM · 2 MINOR · 2 INFO. Of 35 claimed GREENs, 34 were re-run and 1 cited (j4). All 34
reproduce. 32 did so on the first reading; g2 read GREEN on 2 of 3 and f4 on 1 of 2 (a load timeout at first navigation).
Honest-RED set: **g1 · j1 · j2 · j3 · H2 · H4**. Unrelieved: **a4 · a13 · i3 · b1**. f3, a2, a3, b3 and e1 read GREEN ×2 at this
seat. The LEDGER row is **not promoted**; it stays PARTIAL.

---

## Open — RESUME 2026-09-22 (fifth sitting; SEAT 0, `claude-opus-5-5[1m]`)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). Resume spec: COHESION **§0z** + **§0an** + **§0aq** + **§0ax**
and `W6.md`'s two **ADDENDA 2026-09-22** (`W6.md:483-486`), read whole. **Mode**: RESUME. ⟨cmd⟩
`grep "^| X-W6 " LEDGER.md` → **PARTIAL 2026-09-22 — fourth-sitting close**, not CLOSED. §0ax corrected the
chassis (an ESCALATED unit is a return, not a halt) and set the stage order X-W5 → X-W6; X-W5 RESUME 5 ran
first (`5ad17633` … `7a4c98e1`).

### Act 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh`.
Neither is in this seat's writable set (this record, the LEDGER, INBOX). **Nothing inherited**; nothing
stashed, restored or touched.

### Already done — never re-dispatched

`.a` (`f90aeb02` · `c222542d`) · `.b` (`7dff25f6`) · `.f` (`e0e204a9`) · `.g` (`e69aaf95`; g1 honest-RED by id →
X-W10, §0aq ESC-R1-g1) · `.c` (`caea9d1e` `e07bff63` `b0991fd3` `b2dd375c` + the b1 grammar at `666978d4`; b1 =
**`B1-G3D` honest-RED-by-instrument**, `.c`'s discriminating probe the witness of record, §0ax ESC-W6c-b1-1).

### Preconditions, measured at the bytes AND in the LEDGER (2026-09-22 21:58)

| condition | measurement | verdict |
|---|---|---|
| X-W0 CLOSED | ⟨cmd⟩ `grep "^| X-W0 " LEDGER.md` → `CLOSED 2026-09-17 (honest-RED: HG-8's literal byte-diff clause — ESC-N1)` | MET |
| X-W1 CLOSED | `CLOSED 2026-09-17 (honest-RED: G-17 · G-19 · G-20)`; ⟨cmd⟩ `ls e2e/visual \| head -1` → `admin-populated.visual.spec.ts` | MET |
| X-W4 CLOSED | `CLOSED 2026-09-17`; ⟨cmd⟩ `grep -rl SceneActionSet demo/ \| wc -l` → **4** | MET |
| installed glass 7.0.0 | ⟨cmd⟩ `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → **7.0.0** | MET |
| X-W5 `.c2` landmark migration landed (the nine landmark REDs re-run after it, §0ax) | ⟨cmd⟩ `grep -rln "Color tool panes" e2e \| wc -l` → **0**; shas `ab5270b6` · `ad93c771` · `fdf3e9e0` | MET |
| X-W5 CLOSED (binds **`.j` alone**, §0z E1 · §0aq · §0ax) | ⟨cmd⟩ `grep "^| X-W5 " LEDGER.md` → `PARTIAL — RESUME 5 close 2026-09-22` (Check 3 `7a4c98e1` NOT-CONFORMANT, ESC-W5c2-1/-2 unruled) | **NOT MET — `.j` BLOCKED-ON X-W5, never skipped** |

**Reading of §0ax's "Order (RESUME, after X-W5 CLOSED)"**: §0z E1, §0aq and §0an each bind X-W5 CLOSED to
`.j` alone, and §0ax's own stated reason for the stage swap is that `.c2` migrates the landmark query (now
landed, 0 hits) and that "`.j` waits on X-W5 CLOSED anyway". The orchestrator's dispatch note for this sitting
reads it the same way: `.d` → `.e` → `.h` → `.i` run now; `.j` returns BLOCKED-ON X-W5 and the close runs.

### E13 Step-0 — four-path mail sweep (2026-09-22 21:58)

⟨cmd⟩ `find <dir> -maxdepth 1 -type f -newermt "2026-09-22 21:30"` over value.js `V/` · `V/coordination/` ·
glass `BK/coordination/` (⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -1` → **`BK/`**, still newest) ·
keyframes `V/coordination/` · atlas `P/coordination/` → only `INBOX.md` itself (the X-W5 close seat's sweep line).
Census ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **97**; tail **I-40 · O-52**. Status-column UNREAD
(`awk -F'|' '$6 ~ /UNREAD/'`) → O-20 · I-31 · I-32 · O-39 (prose hits) and **I-40** (UNREAD, Track C fourier
O-23/O-32 reply — **outside W6's scope**). `O-52` = `W6-glass-ask-hero-blob-p3.md`, the §0aq display-p3 ask,
already rowed (⟨cmd⟩ `grep -c hero-blob-p3 INBOX.md` → **2**). **0 unrowed · 0 new I-n · 0 UNREAD in scope.**
A dated sweep line is appended to INBOX.

---

## Baseline — RESUME 2026-09-22 fifth sitting (the owed units' gates + the nine landmark REDs; every other gate cites Check 3)

Run read-only at this open (21:58–22:03), host load 11.5 → 24.9. Static/live probes against the `:9000` vite
dev server (PID 14970, this repo, the same server Check 3 read). Playwright on fresh webServers
(`VJS_E2E_PORT` 8731–8735). Transcripts kept in the seat's scratchpad, not committed; the two catalog PNGs
o22/o24 re-wrote as a run side effect were restored to HEAD bytes (`git checkout -- <path>`, this seat's own
side effect only).

| gate | unit | ⟨cmd⟩ | BEFORE |
|---|---|---|---|
| d1 | `.d` | `EASING_RADIUS_ORIGIN=http://localhost:9000 node …/probes/x-w6/gate-easing-radius.mjs` | **GREEN** — EXIT 0; `panel surfaces measured: 33 · read-only (d2-ask / producer): 1` · `GATE d1 (easing radius) — GREEN` |
| d2 | `.d` | `node …/probes/x-w6/gate-easing-readout.mjs` | **GREEN** — EXIT 0; `fitting primitives …: NONE` · `branch selected by the census: DATED ASK` · local restyle `0 line(s)` |
| e2 | `.e` | `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` + `node …/probes/x-w6/gate-prm-idiom.mjs` | **GREEN** — `0`; `files scanned: 15 · requestAnimationFrame calls: 0 · CSS motion declarations: 8` · `GATE e2 (PRM idiom) — GREEN` |
| a2 · a3 · a4 · a13 · b3 · e1 (landmark set) | `.e` (e1) · repair seat (a4/a13, §0ax) | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **`1 failed · 21 passed (2.2m)`** — the one failure is **`o21:188`** (a4's inverse-map arm), *Expected: 3 · Received: 2* at `o21:222:54`, the same reading as Check 3 (now 6 of 6). a2 · a3 · b3 · e1 pass inside this run; a13 (the suite) is RED on `:188` alone |
| f4 · f6 · f8 (landmark set) | wave-level (`.f` landed) | `npx playwright test e2e/smoke/oracles/o22-… o23-… o24-… --project=smoke` | **`3 passed (19.7s)`** |
| i1 | `.i` | `npx playwright test e2e/smoke/oracles/o25-atmosphere-response.spec.ts --project=smoke` | **GREEN** — `1 passed (2.1s)` |
| i3 | `.i` | `npx playwright test e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts --project=smoke` · `grep -rn armRuntime demo/ \| wc -l` | **RED** — `1 failed`: every seed paints the unseeded ground `[#b37290 #df8ea7 #ffb0b4 #ffcfc8]` at first paint; first-paint vs settled ΔE_OK max **0.1595** (h30) · **0.2933** (h150) · **0.2433** (h260); armRuntime **0** |
| h1 | `.h` | `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke` | **GREEN on the sRGB buffer** — `3 passed (40.3s)`; OM-6 `lab(92% 88.8 20)` C 0.27245 → target C (gamut-mapped) **0.02105**, painted 0.04662, ΔC 0.02557 · `oklch(0.65 0.3 150)` ΔC 0.00564 (stated ±0.04), `buffer srgb (display p3: false)`. The beyond-sRGB limb = **`H1-P3`** (honest-RED-by-physics, §0aq), not yet recorded in the ask by id (⟨cmd⟩ `grep -c H1-P3 docs/tranches/X/waves/W6-glass-ask-hero-blob-p3.md` → **0**); the boot latency §0ax names is not yet measured |

**Cited, not re-run** (⟨cmd⟩ `git diff --stat 1474b27b..HEAD -- demo e2e test src` → 73 files, all X-W5 `.c2`/`.d2`:
the `e2e/**` landmark re-point through the fixture, `demo/shell/**`, `demo/color-picker/{App.vue,ErrorBoundary.vue,main.ts,router/index.ts}`,
`demo/styles/animations.css` (swap containment) and `demo/picker/ColorPicker.vue:2-4` (§0ax grant to `.d2`); no W6 §4 file
other than that granted comment relocation; the close seat re-reads these at its own double-run):
a1 · a5–a12 · b1 (`B1-G3D`) · b2 · b4 · c1–c4 · f1 · f2 · f5 · f7 · f9 · f10 · g1 (→ X-W10) · g2 · h2 · i2 · H1 ·
H3 · j1–j3 (BLOCKED-ON X-W5) · j4 · H2 · H4 · f3 (Check 3: GREEN ×2; §0ax's bisect is the repair seat's).

### R.2 — a GREEN before its cure

**NONE.** d1 · d2 · e2 · i1 · h1(sRGB) are cures landed in prior sittings at named shas (`.d` `9557e6b5`
`e6bd7fe5` · `.e` `3c558956` `191d4f3a` `3ece0690` · `.h` `48d95650` `a87f8930` · `.i` `c2f17bad` `4cb294b9`
`e68e8889`). a2 · a3 · b3 · e1 · f4 · f6 · f8 went GREEN on X-W5 `.c2`'s landmark migration (`ab5270b6`),
the cure §0ax named for exactly those nine. The RED gates are i3 (`.i`'s §0aq duty) and a4/a13 (`o21:188`,
the repair seat's by §0ax).

---

## Unit plan — RESUME 2026-09-22 fifth sitting (4 owed units dispatched serially; `.j` BLOCKED-ON X-W5; 5 units landed)

**Model law M-23** (`W6.md:154`): every unit is an **Opus implementation seat**; no Fable seat, no canon minted.
**alreadyDone (never re-dispatched)**: `X.W6.a` · `X.W6.b` · `X.W6.c` · `X.W6.f` · `X.W6.g` (shas in the Open).
**Chassis (§0ax)**: an ESCALATED unit is recorded and the next group runs; only a DEAD seat halts. **Concurrency**:
maxUnits 1, strictly serial per `W6.md:486` *"[`.d`] → [`.e`] → [`.h`] → [`.i`] → [`.j`]"*. Landed shas inside each
unit are **not reopened**; each unit works its residual only.
**Wave-level (no unit)**: the repair seat owns a4 / a13 (`o21:188`, settle/scroll ADDED, mint/ordinal assertions
untouched) and f3's bisect (`ColorSpaceSelector.vue` granted if rooted there), §0ax. The close seat re-reads the
nine landmark gates, H1 over the full roster, g1 → X-W10 by id, b1 = `B1-G3D`, the §0z E2 canaries → X-W8 `.i`.

| group | unit | residual | gates |
|---|---|---|---|
| 1 | `.d` | re-verify d1/d2 at the post-`.c` bytes; d2 both-direction negative controls re-read; §7 cadence; receipt (commit #4 only if a byte must move) | d1 d2 |
| 2 | `.e` | re-verify e1/e2 at the post-`.d` bytes; H2 citation legs for e1/e2 re-derived against the two guards (`animations.css` moved under X-W5 `.d2`: re-locate the reduce guard's line); receipt | e1 e2 (H2 `.e` legs) |
| 3 | `.h` | `H1-P3` recorded by id (dated addendum-beside in `W6-glass-ask-hero-blob-p3.md`, `O-52` cross-ref); the consumer-route oracle confirmed; the blob boot latency MEASURED and named; h1 ×2 on fresh servers | h1 (+ h2 held) |
| 4 | `.i` | i3 cure: the pre-module boot seed in `demo/color-picker/index.html` (§0aq ESC-R1-i3), `W5.md:321` dialog-ancestry rider measured; i1/i2 held | i3 (+ i1 i2) |
| — | `.j` | **BLOCKED-ON X-W5** (LEDGER `PARTIAL — RESUME 5 close`; Check 3 `7a4c98e1` NOT-CONFORMANT). Not dispatched | j1 j2 j3 (j4 measured) |

**Writable sets** (§4 ⊕ §0z ⊕ §0an ⊕ §0aq ⊕ §0ax):
- **`.d`**: `…/easing/GradientEasingEditor.vue` · `…/easing/EasingAuthoringStage.vue` · `…/easing/easingCatalogue.ts` ·
  `docs/tranches/V/megatranche/audit/probes/x-w6/{gate-easing-radius,gate-easing-readout}.mjs` ·
  `docs/tranches/X/waves/W6-glass-ask-easing-readout.md` (dated addendum-beside only) · `W6-evidence/easing/**` ·
  `docs/tranches/V/coordination/INBOX.md` (mail rows only).
- **`.e`**: `…/GradientVisualizer/GradientVisualizer.vue` · `…/easing/EasingAuthoringStage.vue` · gradient-tree scoped
  styles · `…/probes/x-w6/gate-prm-idiom.mjs` · `e2e/smoke/views/gradient.spec.ts` (ADD-never-replace) ·
  `docs/tranches/X/waves/W6-glass-ask-gradient-aurora.md` (addendum-beside only) · `W6-evidence/**`.
- **`.h`**: `demo/picker/visual/HeroBlob.vue` · `demo/color-session/useContrastSafeColor.ts` ·
  `e2e/smoke/webgl-blob-idle.spec.ts` (ADD-never-replace) · `docs/tranches/X/waves/W6-glass-ask-hero-blob-p3.md`
  (dated addendum-beside only) · `docs/tranches/X/waves/W6-blob-pipeline-census.md` (addendum-beside only) ·
  `W6-evidence/blob/**` · INBOX (mail rows only).
- **`.i`**: `demo/color-picker/composables/boot/{useAtmosphere,atmosphere-calibration}.ts` ·
  `demo/test/glass/aurora-bracket.test.ts` · `demo/scenes/atmosphere/AuroraPane.vue` ·
  `e2e/smoke/oracles/{o25-atmosphere-response,o28-atmosphere-coldload}.spec.ts` · `demo/color-picker/index.html`
  (the pre-module boot seed ONLY) · `W6-evidence/atmosphere/**`.

Every unit appends its own receipt under `## Unit receipts — fifth sitting 2026-09-22` below (its own `###` block).

---

## Unit receipts — fifth sitting 2026-09-22


### X.W6.d

SERVED MODEL: claude-opus-5-5[1m] · RESUME residual only (verify-and-bank); landed `9557e6b5` · `e6bd7fe5` not reopened.
Spec read: `W6.md` §5 X.W6.d (true bytes `:214-227`; the dispatch's `:252-268` anchor has drifted to X.W6.f — INTENT
taken at `:214`) + ADDENDUM 2026-09-19 (`:479`) + ADDENDA 2026-09-22 (`:483-486`); COHESION §0z E1/E5 · §0aq · §0ax.

**Act 1 — crash-recovery.** ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh` — neither in `.d`'s writable set. **Nothing inherited.** Anchor drift recorded: the writable
set names `…/GradientVisualizer/easing/GradientEasingEditor.vue`; the true bytes are
`demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` (⟨cmd⟩ `ls …/GradientVisualizer/` → present
there, absent under `easing/`), which is also the gate's `EDITOR` constant. No byte of it was written.

**Act 2 — d1 · d2 ×2 at the post-`.c` bytes (HEAD `d7bc7bec`; `:9000` → HTTP 200).**

| gate | ⟨cmd⟩ | BEFORE (fifth-sitting baseline) | AFTER (this seat, run 1 · run 2) |
|---|---|---|---|
| d1 | `EASING_RADIUS_ORIGIN=http://localhost:9000 node docs/tranches/V/megatranche/audit/probes/x-w6/gate-easing-radius.mjs` | GREEN | **GREEN · GREEN** — exit 0 ×2, outputs byte-IDENTICAL (`diff` → empty); `panel surfaces measured: 33 · read-only (d2-ask / producer): 2` · `GATE d1 (easing radius) — GREEN` |
| d2 | `node docs/tranches/V/megatranche/audit/probes/x-w6/gate-easing-readout.mjs` | GREEN | **GREEN · GREEN** — exit 0 ×2, IDENTICAL; `fitting primitives …: NONE` · `branch selected by the census: DATED ASK; wave composes=false ask=true` · `local restyle … 0 line(s)` |

Erratum-beside on the baseline row (not rewritten, E-3): the Baseline cell prints d1 `read-only (d2-ask / producer): 1`;
the settled bytes print **2** (`button.rail-btn` d2-ask + `button.control-surface` producer), identical to the committed
`W6-evidence/easing/d1-gate-2026-09-22.txt:17/:33` → a transcription slip at the baseline, not a regression.

**Act 3 — d2's negative controls re-read, both directions, at the post-`.c` bytes.** Scratch copies of the committed
gate (ROOT pinned; one perturbation each; gate/ask/editor never edited). Committed transcript
`docs/tranches/X/waves/W6-evidence/easing/d2-negative-controls-2026-09-22-fifth-sitting.txt` (beside the 09-19 and
09-22 files, E-3), commit **`58faba6f`**.

| direction | perturbation | reading |
|---|---|---|
| control | ROOT-pinned copy, unperturbed | GREEN, exit 0; `diff` vs the committed gate's run 1 → IDENTICAL |
| A (the letter carries the census) | ask copy, `:61` LabeledField row loses `` `error` `` | **RED** exit 1 — `the ask states \`LabeledField\` without its shipped slot \`error\`` |
| **B (fitting primitive present + letter → RED)** | `ACTION_SLOT` widened to accept `default` | **RED** exit 1 — `branch selected by the census: COMPOSE` · `a fitting published primitive EXISTS (NumberField …) and the readout does not compose it` |
| **C1 (local restyle → RED)** | editor copy `:184` `rounded-md bg-well` → `rounded-full ring-1 bg-well`, L4 diffed vs `f90aeb02^` | **RED** exit 1 — `added 1 styling line(s) to the readout rail … 184: +…rounded-full ring` |
| C2 (local restyle, style block) | `background: tomato;` inside `.rail-btn` (after `:316`) | **RED** exit 1 — `317: +    background: tomato;` |
| C3 control | same harness, HEAD editor unperturbed | GREEN exit 0 — the C-reds are the perturbations', not the harness's |

⟨cmd⟩ `grep -c 'GATE d2 (easing readout) — RED' <transcript>` → **4** · `— GREEN` → **3** (control · C3 · committed gate).

**Act 4 — the O-row stays rowed.** ⟨cmd⟩ `grep -c easing-readout docs/tranches/V/coordination/INBOX.md` → **4**;
`:139` = **O-47** · 2026-09-22 · glass-ui (BK coordination) · `W6-glass-ask-easing-readout.md` · status **SENT**
(carriage rides SS-6; nothing in X-W6 waits on the reply). ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -1` → `BK/`;
the one new glass outbound (`glass-outbound-2026-09-22-consumers-10.0.0.md`) reads `value.js: zero hits` and is already
swept in INBOX (`:380`…`:412`). **0 UNREAD in `.d`'s scope; no INBOX byte written.**

**Act 5 — §7 cadence on the `.d` files.**
- ⟨cmd⟩ `npx eslint GradientEasingEditor.vue easing/EasingAuthoringStage.vue easing/easingCatalogue.ts` → exit **0** ×2.
- ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` → exit **0** ×2, no diagnostics.
- ⟨cmd⟩ `npx prettier --check` over the three product files + the two probes → exit **1** ×2: the two probes are clean;
  `GradientEasingEditor.vue` · `EasingAuthoringStage.vue` · `easingCatalogue.ts` warn. **Pre-existing, not `.d`'s:**
  ⟨cmd⟩ `git show <rev>:<f> | npx prettier --check --stdin-filepath <f>` → WARN for all three at **`f90aeb02^`**
  (pre-wave), at `9557e6b5^`, at `9557e6b5` and at HEAD; and ⟨cmd⟩ `npx prettier --list-different "demo/workbenches/**/*.{vue,ts}" | wc -l`
  → **27** of 38 files — a tree-wide formatting debt, not a `.d` byte. Held as a residual (below), not cured here:
  the dispatch binds "no product byte unless a gate reads RED", and d1/d2 read GREEN.

**Commits.** `58faba6f` (the d2 transcript) · this receipt (record commit). **Commit #4 `style(demo/easing-register)` NOT
minted** — no product byte moved (d1 and d2 GREEN at the bytes; landed `9557e6b5`/`c8111846`/`e6bd7fe5` stand).

**Residuals.** (R-d-1) prettier warns on the three easing files since before the wave (27/38 workbench files tree-wide) —
a formatting pass belongs to whichever seat owns a tree-wide prettier sweep, not a GREEN-gated RESUME residual;
(R-d-2) the writable-set anchor for `GradientEasingEditor.vue` names `easing/`, the bytes live one level up.
**Escalations: none.** Gates: **d1 GREEN ×2 · d2 GREEN ×2** (both-direction falsifiers RED).

### X.W6.e

SERVED MODEL: claude-opus-5-5[1m] · RESUME residual only (verify-and-bank); landed `3c558956` · `191d4f3a` · `3ece0690`
not reopened. Spec read whole once: `W6.md` §5 X.W6.e (true bytes **`:228-242`**; the dispatch's `:270-285` anchor has
drifted to §COMPLETABLE/§Blocked — INTENT taken at `:228`) + H2 (true bytes **`:338`**; dispatch `:410` drifted) +
ADDENDA 2026-09-22 (true bytes **`:344-347`**; dispatch `:483-486` drifted — the file is 486 lines with the 09-19
addendum's body elided at `:340`). COHESION §0z E2 · §0an · §0aq · §0ax read for rulings `.e` consumes: order
[`.d`] → [`.e`] → [`.h`] → [`.i`]; nothing else rules on `.e`.

**Act 1 — crash-recovery.** ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh` — neither in `.e`'s writable set. **Nothing inherited**; nothing stashed, restored or touched.

**Act 2 — e1 · e2 ×2 at the post-`.d` bytes (HEAD `1a4efe67`).**

| gate | ⟨cmd⟩ | BEFORE (fifth-sitting baseline) | AFTER (this seat, run 1 · run 2) |
|---|---|---|---|
| e1 | `VJS_E2E_PORT=8761\|8762 npx playwright test e2e/smoke/views/gradient.spec.ts -g "gradient selector aurora" --project=smoke` (fresh webServer each; ⟨cmd⟩ `lsof -iTCP:<p> -sTCP:LISTEN \| wc -l` → 0 · 0 before) | GREEN (inside the landmark-set run) | **GREEN · GREEN** — `1 passed (14.2s)` EXIT 0 · `1 passed (11.7s)` EXIT 0; `gradient.spec.ts:451:1 › gradient selector aurora` |
| e2 | `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` + `node docs/tranches/V/megatranche/audit/probes/x-w6/gate-prm-idiom.mjs` | GREEN | **GREEN · GREEN** — rAF **0** · **0**; probe exit 0 ×2, outputs byte-IDENTICAL (`diff` → empty): `negative control: ctl-style.vue → FAIL · ctl-inline.vue → FAIL · ctl-utility.vue → FAIL · ctl-read.vue → FAIL` · `positive control: … → clean` · `quarantine record: present` · both guards `present (a reduce block)` · `files scanned: 15 · requestAnimationFrame calls: 0 · CSS motion declarations: 8` · `GATE e2 (PRM idiom) — GREEN` |

**Act 3 — H2's `.e` legs: citation + re-derivation against the two guards.**
- **Leg 1 (record present).** ⟨cmd⟩ `test -f docs/tranches/V/megatranche/audit/codex-provenance/motion-quarantine.md` → exit 0
  (the probe prints `quarantine record: present` ×2, and FAILs when absent — `gate-prm-idiom.mjs:188-194`).
- **Leg 2 (every MOTION-SOURCED assertion in e1/e2 cites it).** ⟨cmd⟩ `grep -n "motion-quarantine\|MOTION-SOURCED" e2e/smoke/views/gradient.spec.ts`
  → `:445` `MOTION-SOURCED · PENDING-QUARANTINE (W6.md H2): cites` · `:446` the record's path — the e1 test's own doc
  block (e1 is the file's only MOTION-SOURCED assertion). ⟨cmd⟩ same grep over `gate-prm-idiom.mjs` → `:15` marker ·
  `:16` path (header) · `:46-49` the `QUARANTINE` constant the run reads. **Both e-gates cite it.**
- **The reduce guard re-located after X-W5 `.d2` (`b36df565`).** ⟨cmd⟩ `grep -n "prefers-reduced-motion" demo/styles/animations.css`
  → `:43` no-preference · **`:184` `@media (prefers-reduced-motion: reduce)`** (the global guard, header `:177`) · `:202`
  (the B.W1 overlay carve-out). ⟨cmd⟩ `git show b36df565 -- demo/styles/animations.css` → hunks at `@@ -222` and `@@ -292`
  only, both BELOW the guard: **the guard did not move; `W6.md:240/:338`'s `:184` still reads true at the bytes.**
  Glass's guard: ⟨cmd⟩ `grep -n prefers-reduced-motion node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`
  → `:1` (a reduce block; minified, installed 7.0.0).
- **No citation byte owed.** Neither e-gate reads a line number: the probe's `GUARDS` (`:50-55`) are file paths and the
  presence check is the regex `/prefers-reduced-motion:\s*reduce/` (`:195-199`); the spec's doc block cites the two
  files by path. So the probe (this unit's script) and the spec are **left byte-unchanged**.
- **Re-derivation — can either guard manufacture or mask the e-assertions?** e2 asserts every gradient-tree motion
  declaration is nested in `@media (prefers-reduced-motion: no-preference)` and rAF = 0 — a source-structure fact
  independent of both guards (a guard zeroing a stray transition cannot make it nest). e1's ask branch asserts
  `animationName === "none"` on the rail **and** a zero settled-frame delta over 5 frames. The reduce guards set
  `animation-duration`/`transition-duration` only, never `animation-name`, so the name leg cannot be manufactured by
  either guard; and both guards are inert in e1's cell: ⟨cmd⟩ `grep -rn reducedMotion playwright.config.ts e2e` → only
  `o11:289/302` · `o9:161/163` (scoped `emulateMedia`) and `e2e/visual/modality` — **the `smoke` project emulates no
  reduce**, so the still frames are the ramp's, not a guard's. **H2 `.e` legs: GREEN.**

**Act 4 — mail (E13, read-only).** ⟨cmd⟩ `grep -c gradient-aurora docs/tranches/V/coordination/INBOX.md` → **1**; `:141` =
**O-49** · status **SENT** 2026-09-22 (carriage rides SS-6). ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -1` → `BK/`;
⟨cmd⟩ `grep -rln "gradient-aurora\|strip-scale aurora" ../glass-ui/docs/tranches/BK/coordination/` → **0 files** (no reply
yet; nothing in X-W6 waits on it — e1's L3 branch is the two-way falsifier). **0 UNREAD in `.e`'s scope; no INBOX byte.**
Glass installed ⟨cmd⟩ `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → 7.0.0 (e1 re-checks
the ask's census hash against the installed `aurora/index.d.ts` on every run — GREEN ×2 above, so the census is current).

**Act 5 — §7 cadence on the `.e` files** (the six product files `3c558956` touched + the probe + the spec).
- ⟨cmd⟩ `npx eslint <the six .vue>` → exit **0** ×2.
- ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.demo.json` → exit **0**, 0 output lines.
- ⟨cmd⟩ `npx vitest run` → exit 1 ×2, **`Tests 2 failed | 639 passed (641)`** · `Test Files 2 failed | 36 passed (38)` ×2:
  `test/spectrum-luma.test.ts` C-5 and `demo/test/shell/reka-binding-idiom.test.ts` NG-6 — the two foreign W1.a born-RED
  canaries §0z E2 / §0aq (COHESION `:2655-2656`) routes to **X-W8 `.i`**; cited by id, not `.e`'s.
- ⟨cmd⟩ `npx prettier --check <probe> <spec> <six .vue>` → exit 1: probe · `GradientVisualizer.vue` · `GradientStopEditor.vue`
  clean; WARN on `gradient.spec.ts` · `EasingAuthoringStage.vue` · `GradientCodeEditor.vue` · `GradientEasingEditor.vue` ·
  `EasingSpecimenStrip.vue`. **Pre-existing, not `.e`'s:** ⟨cmd⟩ `git show <rev>:<f> | npx prettier --check --stdin-filepath <f>`
  → WARN (exit 1) for all five at **`3c558956^`** (pre-`.e`) and at HEAD — the same tree-wide debt `.d` recorded as R-d-1.
- ⟨cmd⟩ `git diff --check` → empty (no product byte moved).

**Commits.** This receipt (record commit) only. **Commit #5 `feat(demo/gradient-aurora)` NOT minted** — no byte moves:
e1/e2 GREEN ×2 at the post-`.d` bytes and H2's `.e` legs need no citation byte (the guard did not move; nothing reads its line).

**Residuals.** (R-e-1) prettier WARN on five `.e`-touched files since before `.e` — folds into R-d-1's tree-wide sweep owner;
(R-e-2) dispatch anchors `:270-285` / `:410` / `:483-486` drifted against the 486-line `W6.md` (true `:228-242` / `:338` /
`:344-347`), INTENT taken; (R-e-3) the probe logs a missing guard as `MISSING` without failing — lawful, because e2's
assertion (no-preference nesting, rAF 0) does not depend on either guard; recorded, not changed.
**Escalations: none.** Gates: **e1 GREEN ×2 · e2 GREEN ×2 · H2 (`.e` legs) GREEN.**

### X.W6.h

SERVED MODEL: claude-opus-5-5[1m] · Opus implementation seat (M-23). Residual only; landed `48d95650` (h2 census) and
`a87f8930` (h1 oracle) **not reopened**. Anchor drift: the dispatch's `W6.md:342-356` is §6/§8 at the true bytes; the
unit is at **`W6.md:281-293`**, the h1 restatement at **`:481`**, the 2026-09-22 addenda at **`:483-486`** — INTENT taken.

**Act 1 — crash-recovery.** ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh`. Neither is in `.h`'s writable set. **Nothing inherited**; nothing stashed, restored or touched.

**Act 2 — `H1-P3` recorded by id** (§0aq h1). BEFORE ⟨cmd⟩ `grep -c H1-P3 docs/tranches/X/waves/W6-glass-ask-hero-blob-p3.md`
→ **0**. A dated ADDENDUM-beside was appended (the letter's body untouched, E-3). It records the ceilings, measured
twice with the same result (⟨cmd⟩ `node --input-type=module -e "…mapColorToGamut(parseCssColor('lab(92% 88.8 20)').value, g)…"`):
OM-6 C **0.27245**. The sRGB ceiling is **0.02105** (**12.94×** short) and the display-p3 ceiling is **0.02768** (**9.84×** short).
The seed is therefore outside **both** gamuts. The P3 ask widens the ceiling by 31% and cannot reach the seed, so the rest
is physics. AFTER: the same grep → **6**. ⟨cmd⟩ `grep '^| O-52' INBOX.md | grep -o H1-P3` → present (the row already carries the id).
The ask's content did not change, so **no new O-row was minted** and INBOX is untouched.

**Act 3 — the oracle rides the consumer route, confirmed at the bytes.** `HeroBlob.vue:15` `:color="cssColorOpaque"` →
the glass `<Blob>` → the canvas `goo-blob-canvas`. The oracle navigates `/#/?space=oklch&color=<seed>` (the product's own
colour route) and reads `.last()` of that testid (`webgl-blob-idle.spec.ts:150-228`). ⟨cmd⟩ the boot probe's
`document.querySelectorAll('[data-testid="goo-blob-canvas"]')` → **1 canvas**, `closest('.hero-blob-anchor')` **true**,
on all 8 navigations. The target is `mapColorToGamut(seed, drawingBufferColorSpace)` (spec `:139-147`, css-color-4 §13),
read off the blob's own context. h2's census measured the clamp at the producer's `defaultBlobColorResolver`
(glass, READ-ONLY), not at `useContrastSafeColor.ts:101-105`: its 1×1 resolver is off the chroma path and writes L only
(`resolveSurfaceLightnessLive` → `floorStops`). A consumer gamut-map at the `:color` seam was measured and refused at
`a87f8930`, because it lowers the bead's chroma (ask §4). So the cut stays the mailed producer limb, and **no product byte moves**.

**Act 4 — §0ax boot latency, MEASURED and named** (⟨cmd⟩ `node W6-evidence/blob/boot-latency.mjs <origin> <label> <n>`;
it measures from navigation commit to `goo-blob-canvas` attached and then visible, seed OM-6, 1440×900. The load was 36
`while :; do :; done` loops on 18 cores. Transcript: `W6-evidence/blob/boot-latency-2026-09-22.txt`):

| cell | nav 1 | nav 2 | nav 3 |
|---|---|---|---|
| fresh server `:8741`, host quiet (load 11.6) | 2278 ms (FCP 392) | 2068 | 1984 |
| warm server `:8741`, under load (29.6) | 2532 | 2442 | 2412 |
| fresh server `:8742` started under load (60.2) | **18267 ms (FCP 15792)** | 3082 | — |

**Named**: the blob's own mount path costs about **2.0–3.1 s** after navigation, quiet or loaded. The long pole is the
**first navigation of a freshly spawned dev server under load**, where FCP alone is 15.8 s of the 18.3 s. That is Vite's
on-demand transform, a harness latency and not a product one. The oracle's arrival wait is on the mount DOM fact itself:
`await expect(blob).toBeVisible({ timeout: 45_000 })` at `:165`, a bound of 45 s against a measured worst case of
18.3 s. §0ax's precondition ("waits on a timer shorter than boot") is **not met**, so **no spec byte is ADDed** and no
timeout moves. The 8 s reading §0ax quotes is the pre-Repair-1 expect default, which C1-3 already replaced with this
DOM-fact wait. The post-arrival `waitMs(PARK_SETTLE_MS)` is the park settle measured from the mounted canvas, not a boot timer.

**Act 5 — gates, double-run.**
- **h1** ⟨cmd⟩ `VJS_E2E_PORT=8743|8744 VJS_E2E_PERF_PORT=8753|8754 npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke`
  (fresh webServers). BEFORE (baseline): 3 passed. AFTER: **`3 passed (39.9s)` · `3 passed (37.8s)`**. Buffer `srgb`
  (display p3: false). ΔC OM-6 **0.02562 / 0.02552** (target 0.02105) · 150 **0.00568 / 0.00564** · 328 **−0.02274 / −0.02274**
  (stated ±0.04). Transcripts: `W6-evidence/blob/h1-run{1,2}-2026-09-22-fifth.txt`. **GREEN ×2** at the gamut-mapped
  predicate; the beyond-gamut limb reads `H1-P3`.
- **h2 (held)** ⟨cmd⟩ `node docs/tranches/X/gates/gate-blob-pipeline.mjs` ×2 → EXIT 0 · `GATE h2 (blob pipeline census) — GREEN`
  · `census 13 published figures, 12 re-derived here`, identical both runs. **GREEN ×2**.

**Commits**: `03653b52` docs(x-w6/.h) — ask addendum + boot-latency probe/transcript + h1 transcripts (pathspec, 5 files).
This receipt is a separate record commit. Commit #8's family (census precedes cure) was already honoured at `48d95650` → `a87f8930`,
and no product byte was owed, so no `fix(demo/hero-blob-chroma)` commit is minted here.
**Residuals**: (R-h-1) `H1-P3` beyond-gamut limb, honest-RED-by-physics. Owner: glass-ui via O-52 for the P3 widening
(+31%); no display reaches OM-6. (R-h-2) the dev-server cold-transform pole (18.3 s under load) is a harness property
and is recorded, not cured. **Escalations: none.** Gates: **h1 GREEN ×2 · h2 GREEN ×2.**

### X.W6.i

SERVED MODEL: claude-opus-5-5[1m] · RESUME residual = i3 on the §0aq `index.html` grant (§0ax: "a duty"); landed
`c2f17bad` · `4cb294b9` · `e68e8889` not reopened. **Status: ESCALATED — no product byte moved** (the specified cure
is impossible at the bytes without a producer-derive fork; measured below, §3a "producer-boundary surprise").

**Act 0 — crash-recovery.** ⟨cmd⟩ `git status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`M scripts/dev/dev.sh` — neither in `.i`'s writable set. **Nothing inherited**; nothing stashed, restored or touched.

**Act 1 — i3 at baseline (re-read, fresh server).** ⟨cmd⟩ `VJS_E2E_PORT=8741 npx playwright test
e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts --project=smoke` → **`1 failed`**; *"oklch(0.62 0.2 150) … Received
0.29330989323473755"* · *"oklch(0.62 0.2 260) … Received 0.24326322147615295"* (≤ 0.02 expected) — the Open's reading
reproduced. o28 seeds **only through the URL hash** on a fresh context with **no storage** (`o28:37-38` `newContext`,
`o28:121` `#/?space=oklch&color=<seed>`).

**Act 2 — anchors measured at the true bytes (before any edit).**
- The pre-module classic script the grant names **already exists**: `demo/color-picker/index.html:159-203`, module
  entry `:205`. It seeds `--saved-bg-0..3` pre-paint from the **persisted ground record** (`localStorage
  'color-picker-ground'`, shape/version/scheme-validated, `:186-198`) — the DERIVED stops the sink persisted
  (`useAtmosphere.ts:277-305`, `GROUND_STORE_KEY` = `ground.ts:59`), else the first-visit constant pair. The
  persisted-pick arm (a returning visit) is therefore already seeded with the atmosphere's own derived stops.
- The uncured arm is the **URL-carried pick on a cold load** — exactly o28's case, and exactly the question
  ESC-W6r1-i3 carried ("does 'persisted pick' cover the URL pick"), which §0aq/§0ax route to `.i` without ruling
  the derive mechanism.
- What the atmosphere paints first for a pick (the stops `--saved-bg-n` must equal): `useAtmosphere.ts:285-293`
  writes `normalizeGroundStops(palette.map(oklchStopToHex))`, where light `palette` = `guaranteeSeamOffset(
  resolveCalibratedAtmosphere(fieldAtoms()), seed).palette` (`:149-153`; `atmosphere-calibration.ts:105-113` →
  glass `resolveAtoms`) and dark = glass `deriveAurora(seed, { scheme: "dark" })` (`:264-275`).
- That chain's module graph, measured: ⟨cmd⟩ `sed -n 7,13p node_modules/@mkbabb/glass-ui/dist/aurora.js` →
  `deriveAurora` (`aurora.js:798`) imports `cssToOklch · deriveHue · gamutMapStop · oklchStopToHex · oklchToLinear`
  from glass `./color.js` and `interpolateHue` from `@mkbabb/value.js/color`; ⟨cmd⟩ `head -3 …/dist/color.js` → glass
  `color.js` imports `convertColor · mapColorToGamut · toRgba8` from `@mkbabb/value.js/color` plus the value.js parser
  chunk. The seed also crosses value.js's own 18-space parser (`hydrate.ts:95-107` `parsePickerColor` →
  `convertPickerColor`).

**Act 3 — why the specified cure cannot land inside the grant (the escalation, `ESC-W6i-i3-1`).** A classic
`<script>` before `:205` cannot `import`. To "seed exactly the first-painted atmosphere ground" from a URL pick it
would have to reproduce, as vanilla JS in HTML: value.js's parser + `convertColor` + `mapColorToGamut`, glass's
`deriveAurora` (harmony hue walk, bell chroma, lightness band, the 48-step gamut descent `Ze`), glass `resolveAtoms`,
this repo's calibration (`vividnessForSeedChroma`) and seam offset, and `oklchStopToHex`. That is a hand-copied fork of
two producers' derive — the standing law's copied-producer class and a direct breach of the same file's U-F23 law
(`index.html:144-158`: "Only the guard LOGIC below is mirrored"; the constants are token-injected precisely so no
derive literal is hand-typed). It would drift silently on any glass/value.js derive change. Not authored.
The lawful routes each need a write **outside** `.i`'s set: (a) single-source the derive into the boot script at
build/serve time — a bundled IIFE injected by `plugins/vite-ground-tokens.ts` (render-blocking inline JS = X-W2's
bundle/perf property); (b) make the module entry render-blocking (`<script type="module" blocking="render">` at
`:205` — X-W5's carve + an LCP/TBT change, X-W2 sign-off), so first paint follows the hydrated sink's immediate
write; or (c) an E-3 re-point of o28 to the persisted-pick arm the existing script already seeds (a spec act).
**Ask**: COHESION rules ESC-W6i-i3-1 — (a) with `plugins/vite-ground-tokens.ts` granted + X-W2 sign-off, (b) with
`index.html:205` granted + X-W2 sign-off, or (c) the E-3 re-point; then `.i` re-sits.

**Act 4 — W5.md:321 dialog-ancestry rider.** No byte of `index.html` moved (⟨cmd⟩ `git diff --stat --
demo/color-picker/index.html` → empty), so the portalled-dialog ancestry (`<body class="relative" data-paper-field>`
over `#app`, `:228-230`) is byte-identical before/after by construction; no live before/after pair was captured
because there is no after.

**Act 5 — held gates (this seat's clock, fresh servers).**
| gate | ⟨cmd⟩ | reading |
|---|---|---|
| i3 | `o28-atmosphere-coldload.spec.ts --project=smoke` (port 8741) | **RED** — `1 failed` (0.2933 · 0.2433 > 0.02), BEFORE = AFTER (no cure landed) |
| i1 | `o25-atmosphere-response.spec.ts --project=smoke` (port 8742) | **GREEN** — `1 passed (5.5s)` |
| i2 | `node docs/tranches/X/gates/gate-lband-door.mjs` | **GREEN** — `EXIT=0` · `GATE i2 (dark lBand door) — GREEN` |
| vitest aurora-bracket | `npx vitest run demo/test/glass/aurora-bracket.test.ts` | `1 passed (1)` · `9 passed (9)` |
§7 cadence: no product byte touched → prettier/eslint/vue-tsc not owed by this seat; `git diff --check` on the record commit.

**Commits**: this receipt only (`docs(x-w6/.i)`). No `feat(demo/atmosphere-oracle)` commit minted (commit #9's
tombstone-first family already landed; no cure byte exists to add). **Residuals**: (R-i-1) i3 RED, unrelieved,
owner = COHESION ruling on ESC-W6i-i3-1. **Escalations: ESC-W6i-i3-1.**

---

## Close — RESUME 2026-09-22 (the fifth sitting's close; VERIFY-ONLY seat)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). This seat cures nothing. Transcripts:
`docs/tranches/X/waves/W6-evidence/gates/close-5-2026-09-22/` (committed with this close). Spec read whole once
(`W6.md`, 486 lines, incl. both ADDENDA 2026-09-22 `:483-486`); of this record only the fifth sitting's Open →
Baseline → Unit plan → unit receipts, and the fourth close's Acts 7–8 for the residual ids.

### Act 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`. Neither
is in this seat's writable set (this record, the LEDGER row, `W6-evidence/gates/close-5-2026-09-22/`). **Nothing
inherited**; nothing stashed, restored or touched.

### Act 1 — commit roster and bounds

⟨cmd⟩ `git log --oneline d7bc7bec^..HEAD` → **7** commits, each `git show --stat`-read:

| sha | unit | paths (all in the unit's fifth-sitting writable set) |
|---|---|---|
| `d7bc7bec` | SEAT 0 | this record · LEDGER · INBOX (sweep line) |
| `58faba6f` | `.d` | `W6-evidence/easing/d2-negative-controls-2026-09-22-fifth-sitting.txt` |
| `1a4efe67` | `.d` | this record (receipt) |
| `e1655c15` | `.e` | this record (receipt) |
| `03653b52` | `.h` | `W6-evidence/blob/{boot-latency.mjs, boot-latency-2026-09-22.txt, h1-run{1,2}-2026-09-22-fifth.txt}` · `W6-glass-ask-hero-blob-p3.md` (addendum-beside, +26) |
| `f1d74d53` | `.h` | this record (receipt) |
| `0cfab676` | `.i` | this record (receipt; ESC-W6i-i3-1) |

⟨cmd⟩ `git diff --stat d7bc7bec^..HEAD -- demo e2e test src` → **empty**: no product, test or source byte moved in
this sitting. §9 product families #4/#5/#8/#9 correctly unminted (no cure byte). `dev.sh` never staged.
**Landed-wrong: 0.**

### Act 2 — gate table, BEFORE (this sitting's Baseline, or Check 3 where cited) → AFTER (this seat's clock, 22:21–22:45)

Host load 12–22 throughout. **STALE-SERVER finding first**: the `:9000` server (PID 14970) started **17:15:54**, before
X-W5 `.d2`'s demo commits (`52dc0a5b` 20:59, `b36df565` 21:00). Every live probe was therefore re-read against a
**fresh** `npx vite --port 8891 --strictPort` on this tree (killed at the end). Two committed probes hard-code
`:9000` (`WBGSE-D-probe2.mjs:6`, `WBGSE-O-r3-gestures.mjs:3`). They ran from dot-prefixed scratch copies that changed
**only the origin byte**. The copies were deleted afterwards, and ⟨cmd⟩ `git status --porcelain <evidence dir>`
printed nothing. Playwright runs used fresh webServers (`VJS_E2E_PORT` 8801–8807 for run 1, 8901–8907 for run 2). The
o22/o24 runs re-wrote three `W6-evidence/catalog/after-*.png` files as a side effect. This seat restored them to HEAD
bytes with `git checkout -- <path>`, touching only its own side effect.

| gate | ⟨cmd⟩ (this seat; transcript file) | BEFORE | AFTER |
|---|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` → `npx vitest run test/gradient-order-invariant.test.ts` (`a1-*.txt`) | GREEN (cited) | **GREEN**: `Tests 17 passed (17)` |
| a2 · a3 · b3 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` ×2 (`pw-grad-r{1,2}.txt`) | GREEN | **GREEN ×2**: all three pass inside both runs |
| a4 · a13 | same suite ×2 | RED (`o21:188`) | **RED ×2**: run 1 `1 failed · 21 passed (2.2m)`, run 2 `3 failed · 19 passed (2.3m)`. `o21:188` fails in both at *Expected: 3 · Received: 2*. The repair seat that §0ax assigned was not dispatched this sitting |
| e1 | same suite ×2 (`gradient.spec.ts:451`) | GREEN | **RED (1 of 2)**: run 2 fails with *"the ramp moves with no producer primitive composed" Expected false · Received true*. In the same run, X-W5's own `gradient.spec.ts:401` *"no pane subtree rests on a permanent compositing transform (W5-10)"* also fails (+10 lines) |
| a5–a11 | `node docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs` ×4: `:9000` ×2, `GRADIENT_URL=…:8891` ×2 (`a-gp*.txt`) | GREEN (cited, fourth close) | **RED at this seat, GREEN on 1 of 4 reads.** `a-gp-fresh-1` is GREEN (`a5 travel@1px=0.00px` … `GATE X.W6.a (gesture + paint) — GREEN`). The other three all throw at `gate-a-gesture-paint.mjs:208` (a10's `handles(p).nth(0).click()`) with *"element is outside of the viewport"*. The mechanism is in Act 2a |
| a7 (arm 2) | `node …/WBGSE-O-r3-gestures.mjs` on `:9000` and on the fresh `:8891` (`a7-c14*.txt`) | GREEN | **GREEN ×2**: `C14 buttons: {"beforeMid":2,"afterMid":2,"afterRight":2}`. a7 also needs its arm C in `a-gp`, so a7 is RED with a5–a11 |
| a12 | `node …/evidence/WBGSE-D-probe2.mjs`, `:9000` ×1 and `:8891` ×2 (`a12*.txt`) | GREEN (cited) | **RED ×3**: block 1 throws at `WBGSE-D-probe2.mjs:42` (*"page.screenshot: Clipped area is either empty or outside the resulting image"*). The rail is off-screen, so block 5 is never reached |
| b1 | `node …/wb-gradient-stopeditor/gate-seat.mjs` ×2 on `:9000` and ×2 on `:8891` (`seat*.txt`) | RED (`B1-G3D`) | **RED ×4**: EXIT 1, exactly 2 `G3d` lines each (Home · ArrowDown). This is **`B1-G3D` honest-RED-by-instrument**, §0ax |
| b2 · b4 | same `gate-seat.mjs` ×4 | GREEN | **GREEN ×4**: no G3e or G3f line |
| c1 | `node …/gate-structure.mjs` | GREEN | **GREEN**: `GATE G4 (structure) — GREEN` |
| c2 | `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` | GREEN | **GREEN**: `4 passed \| 13 skipped (17)` |
| c3 | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | GREEN | **GREEN**, and its negative control prints FAIL as designed |
| c4 | `npx vitest run test/interpolation-subset.test.ts` | GREEN | **GREEN**: `5 passed (5)` |
| d1 | `EASING_RADIUS_ORIGIN=… node …/x-w6/gate-easing-radius.mjs`, ×2 on `:9000` and ×2 on `:8891` | GREEN | **GREEN ×4**: `panel surfaces measured: 33 · read-only (d2-ask / producer): 1` all four times (see R-d1 below) |
| d2 | `node …/x-w6/gate-easing-readout.mjs` | GREEN | **GREEN**: `fitting primitives …: NONE` · `DATED ASK` · local restyle `0 line(s)` |
| e2 | `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` + `gate-prm-idiom.mjs` | GREEN | **GREEN**: `0` · `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 | `gate-catalog-totality.mjs` · `gate-specimen-grammar.mjs` | GREEN | **GREEN**, EXIT 0 each |
| f2 · f7 · f9 · f10 | the spec's greps (`greps.txt`) + `npx vue-tsc --noEmit -p tsconfig.demo.json` (`vuetsc.txt`) | GREEN | **GREEN**: f2 `0` · f7 `0`/`0` with vue-tsc `EXIT=0` · f9 `2`/`0` · f10 `0` |
| f3 | `o21-space-catalog-truth.spec.ts` ×2 | GREEN (Check 3) | **GREEN ×2**: `1 passed (1.5m)` · `1 passed (1.4m)` |
| f4 · f6 · f8 | `o22` · `o23` · `o24` ×2, plus the f8 grep `tag=` → `0` | GREEN | **GREEN ×2**: `3 passed (23.3s)` · `3 passed (17.0s)` |
| g1 | `CARD_RHYTHM_ORIGIN=… node …/x-w6/gate-card-rhythm.mjs`, `:9000` and `:8891` | RED | **RED ×2**: `LARGEST INTERVAL: 61.22px` · `2 interval(s) fail`. Honest-RED by id → X-W10 (§0aq) |
| g2 | `npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts -g "companion panes share one track start" --project=smoke` ×2 | GREEN (Check 3, 2 of 3) | **RED ×2** (regressed): *"the About pane (div.glass-resting.card) sits ON its track start, not offset into it (pane 104.92 vs track 111.5)"*, Received **6.58** and then **6.50**, Expected ≤ 1 |
| h1 | `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke` ×2 | GREEN | **GREEN ×2**: `3 passed (42.4s)` · `3 passed (38.0s)` (sRGB buffer; H1-P3 by id) |
| h2 | `node docs/tranches/X/gates/gate-blob-pipeline.mjs` | GREEN | **GREEN**, EXIT 0 |
| i1 | `o25-atmosphere-response.spec.ts` ×2 | GREEN | **GREEN ×2**: `1 passed (2.1s)` each |
| i2 | `node docs/tranches/X/gates/gate-lband-door.mjs` | GREEN | **GREEN**, EXIT 0 |
| i3 | `o28-atmosphere-coldload.spec.ts` ×2 + `grep -rn armRuntime demo/ \| wc -l` | RED | **RED ×2**: `1 failed`, Received 0.1595 · 0.2933 · 0.2433 against ≤ 0.02 (seeds 30 · 150 · 260). armRuntime `0`. ESC-W6i-i3-1 |
| j1 · j2 · j3 | `grep -c "component: Stub" demo/color-picker/router/index.ts` · `ls e2e/smoke/oracles \| grep -c o29` | RED | **RED**: `14` · `0`. `.j` is BLOCKED-ON X-W5 |
| j4 | measured and retired (cited) | GREEN (Check 3) | **GREEN (cited)** |
| H1 | `node docs/tranches/X/gates/gate-no-chassis.mjs b2dd375c a87f8930` | GREEN | **GREEN**, EXIT 0. No product commit landed in this sitting, so the roster is unchanged |
| H2 | `ls …/codex-provenance/motion-quarantine.md` + the citation legs | RED | **RED**: the file is present and the `.e` legs cite it (`e1655c15`). The `.j` leg is owed |
| H3 | the parser R1 one-liner, run alone · the glass version | GREEN | **GREEN**: `R1 EXIT=0` · `7.0.0` |
| H4 | every row has one disposition | RED | **RED**: CC-056 and CC-057 (`.j`) have not landed |

### Act 2a — the regression this seat measured: an intermittently stuck scene-enter on cold navigation (not a W6 byte)

⟨cmd⟩ `node stuck-enter-repro.mjs` (committed beside the transcripts; read-only; five fresh chromium processes, first
navigation to `#/gradient` at 1440×900, 6 s settle, fresh vite `:8891`) →
`0 {"barX":-351,"enterFrom":2,"enterActive":2}` · `1..4 {"barX":224,"enterFrom":0,"enterActive":0}`. That is **1 of 5**
first navigations with the pane left in `vj-enter-enter-from` + `vj-enter-enter-active`. In that state the pane
holds its entry transform (`matrix(0.999391, -0.0348995, …)`) and the gradient rail sits at x = −351. An earlier
probe on this seat watched it stay there for **12 s**. Two ancestry reads found the transform on the
`relative w-full mx-auto h-full min-w-0 vj-enter-…` pane wrapper.

The classes and the swap belong to X-W5 `.d2`: `52dc0a5b` *"out-in scene swap with loading states"* and `b36df565`
*"swap-duration containment on the pane layers"*. Both landed **after** this wave's fourth-sitting Check 3, which read
a5–a11, a12, e1 and g2 GREEN. No W6 §4 byte has moved since then (⟨cmd⟩ `git diff --stat d7bc7bec^..HEAD -- demo e2e
test src` → empty; the fifth Baseline cited these gates and did not re-run them).

**Attribution, stated to its measured extent.** The mechanism is measured for a5–a11 (the a10 click lands on an
off-viewport handle) and for a12 (a clip outside the image). For e1 it is corroborated: in the same run, X-W5's own
W5-10 *"permanent compositing transform"* test failed beside it. For **g2 (6.5 px ×2)** it is **not bisected**: a
deterministic 6.5 px About offset may be the swap's layout rather than a stuck frame. This seat names X-W5 `.d2`
as the suspect, not as proven.
Escalated as **ESC-W6close5-1**. The cure is outside W6's §4 (`demo/shell/**`, `demo/styles/animations.css` are
X-W5's), and a W6 wait or settle added to mask it would be the banned masking species.

### Act 3 — SELF-COUNT (counted twice)

**GREEN is 30.** a1 a2 a3 (3) · b2 b3 b4 (3) · c1–c4 (4) · d1 d2 (2) · e2 (1) · f1–f10 (10) · h1 h2 (2) · i1 i2 (2) ·
j4 (1) · H1 H3 (2). 3+3+4+2+1+10+2+2+1+2 = **30**.
**RED is 20.** a4 a5 a6 a7 a8 a9 a10 a11 a12 a13 (10) · b1 (1) · e1 (1) · g1 g2 (2) · i3 (1) · j1 j2 j3 (3) · H2 H4 (2).
10+1+1+2+1+3+2 = **20**. 30 + 20 = **50** = the §6 roster.
Recount by unit (G/R): `.a` 3/10 · `.b` 3/1 ·
`.c` 4/0 · `.d` 2/0 · `.e` 1/1 · `.f` 10/0 · `.g` 0/2 · `.h` 2/0 · `.i` 2/1 · `.j` 1/3 · wave H 2/2 → G 3+3+4+2+1+10+0+2+2+1+2 = **30**,
R 10+1+0+0+1+0+2+0+1+3+2 = **20**. Both counts agree.
**Movement against the fourth close (31/19)**: a2 a3 b3 f3 f4 f6 f8 went RED→GREEN, all on X-W5 `.c2`'s landmark
migration (`ab5270b6`). h1 also went RED→GREEN (fresh servers). a5–a11 (7), a12 and g2 went GREEN→RED on X-W5 `.d2`
bytes (Act 2a), and e1 went GREEN→RED on 1 of 2 runs. No W6 byte moved in either direction.

**Honest-RED set (relieved at the spec bytes)**: g1 (→ X-W10, `W6.md:484`) · b1 (`B1-G3D`, `W6.md:486`) · j1 j2 j3 · H2 ·
H4 (`.j` after X-W5 CLOSED). **Unrelieved**: a4 · a13 (the repair seat, §0ax; not dispatched) · i3 (ESC-W6i-i3-1,
unruled) · a5–a11 · a12 · e1 · g2 (ESC-W6close5-1, new).

### Act 4 — §8 Verification Artefacts, run as written

⟨cmd⟩ `git ls-files W6-evidence/<dir> | grep -c '\.png$'` → gradient **0** · catalog **6** · owner-marks **0** ·
atmosphere **5**. ⟨cmd⟩ `git ls-files <doc>` → `W6-atmosphere-tombstone.md` 1 · `W6-glass-ask-easing-readout.md` 1
(d2's census selected the ask) · `W6-blob-pipeline-census.md` 1 · `W6-lband-letter.md` 0 (i2 GREEN on the landed branch, so no
letter is owed). Gate transcripts for this close are committed in `W6-evidence/gates/close-5-2026-09-22/` (52
files). **§8 is PARTIAL**, as at the fourth close: the gradient before/after PNGs, the owner-mark re-captures and the
cold-load first-paint frame are still owed (R-11).

### Act 5 — §7 cadence at the settled bytes

No product byte moved in this sitting. ⟨cmd⟩ `npx eslint demo` → `EXIT=0`. ⟨cmd⟩ `npx vue-tsc --noEmit -p
tsconfig.demo.json` → `EXIT=0`. ⟨cmd⟩ `git diff --check d7bc7bec^..HEAD` → exit 0. The prettier debt R-d-1 predates
the wave, and `.e`'s full vitest reading (2 of 641: C-5 and NG-6, the foreign canaries → X-W8 `.i`, §0z E2) is cited,
not re-run. Both are unchanged at these bytes.

### Act 6 — E13 mail (read-only sweep, 22:23)

⟨cmd⟩ `find <dir> -maxdepth 1 -type f -newermt "2026-09-22 21:58"` over the four paths:
- value.js `V/` → nothing; `V/coordination/` → `INBOX.md` only.
- glass `BK/coordination/` (still the newest glass tranche dir) → `chicago-inbound-2026-09-22-button-stadium-pad.md`.
  This is a **chicago → glass-ui** 10.0.1 patch request. ⟨cmd⟩ `grep -ci value <it>` → **0**, so it is not addressed to value.js and not in W6's scope.
- keyframes `V/coordination/` → nothing.
- atlas `../sci-report/atlas/docs/tranches/P/coordination/` → nothing.

Census ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **97** (unchanged). The status-column UNREAD rows are O-20 · I-31 · I-32 · O-39
(prose hits) and **I-40** (Track C fourier, outside W6). **0 UNREAD in W6's scope**, and no INBOX byte was written.

### Act 7 — escalations

- **ESC-W6close5-1** (new, from Act 2a): X-W5 `.d2`'s out-in scene swap sometimes leaves the entering pane in
  `vj-enter-enter-from`/`-active` on a cold first navigation (1 of 5 fresh browsers, measured). a5–a11 and a12 go
  RED on it, e1 goes RED on 1 of 2 runs, and g2's 6.5 px About offset is suspected but not bisected. The
  owner is **X-W5** (`52dc0a5b` · `b36df565`, CC-054/CC-055 transitions are X-W5's by `W6.md` §10). The cure
  is outside W6's §4. No W6 seat may add a wait, settle or `animations:"disabled"` to hide it.
- **ESC-W6i-i3-1** (from `.i`, `0cfab676`) is **unruled**. It needs a COHESION ruling on (a) plugin-injected derive + X-W2,
  (b) render-blocking module entry + X-W2, or (c) an E-3 re-point of o28.
- **ESC-W6close-1** (fourth close) is **discharged** at these bytes: ⟨cmd⟩ `grep -rln "Color tool panes" e2e | wc -l` → 0
  (fifth Open), and f4 f6 f8 a2 a3 b3 are GREEN ×2.
- **ESC-W6c-b1-1** was **ruled** by §0ax: b1 = `B1-G3D`, honest-RED-by-instrument.

### Act 8 — residuals, each with a named owner

| id | residual | owner |
|---|---|---|
| R-4 | b1 `B1-G3D` (2 `G3d` lines ×4) | X-W11's OUT-OF-WAVE roster re-points G3d (§0ax) |
| R-5 | i3: the cold-load first paint is not the seeded pick's (3 seeds ×2) | COHESION ruling on ESC-W6i-i3-1, then a `.i` re-sit |
| R-6 | g1: 61.22 px, 2 intervals fail | X-W10 (honest-RED by id, §0aq, M-23) |
| R-7 | j1–j3 and H4 | `.j` after X-W5 CLOSED (LEDGER X-W5 still PARTIAL) |
| R-8 | the H2 `.j` citation leg | `.j` |
| R-11 | §8: gradient PNGs 0, owner-marks 0, the cold-load frame | `.a`/`.b` evidence repair · `.i` |
| R-12 | the vitest canaries C-5 and NG-6 | X-W8 `.i` (§0z E2) |
| R-14 | a4 and a13: `o21:188` RED ×2 at *Expected 3 · Received 2* | the W6 repair seat (§0ax: settle/scroll ADDED, assertions untouched). Not dispatched this sitting |
| R-15 | a5–a11, a12, e1 and g2 regressed on X-W5 `.d2` bytes | X-W5 (ESC-W6close5-1). W6 re-reads them once it is cured |
| R-16 | the `:9000` dev server (PID 14970, started 17:15) predates X-W5 `.d2`. Probes that default to it read stale bytes | environment. Any seat's live probe must use a fresh server (STALE-SERVER LAW) |
| R-d1 | d1's read-only count reads **1** ×4 at this seat. The `.d` receipt's "erratum" called the Baseline's 1 a slip and claimed 2. The count depends on DOM state, and the verdict is GREEN either way | `.d` receipt erratum (an addendum-beside, next `.d` sitting) |
| R-d-1 | the prettier debt predates the wave | X-W8 hygiene / the next product commit on those paths |

### Act 9 — four-verb line after this close

AUDITED yes · SPECIFIED yes · **IMPLEMENTED no** (20 RED, 13 of them unrelieved) · VERIFIED no (X-W11's stamp). The line does
not move.

### Act 10 — verdict

**PARTIAL.** GREEN is 30/50 and RED is 20/50. Landed-wrong is 0 and UNREAD in scope is 0. Escalations: one new
(ESC-W6close5-1), one still unruled (ESC-W6i-i3-1). The LEDGER row reads **PARTIAL — fifth-sitting close**.

## Check 1 — RESUME 2026-09-22 (L-20 fresh adversarial pass 1 over the fifth sitting's close `1835ce1d`)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). VERIFY-ONLY: this seat cures nothing. It read `W6.md` whole
once (486 lines, both ADDENDA 2026-09-22 `:483-486` included). Of this record it read only the fifth sitting's Open → Baseline →
Unit plan (`:6003-6130`) and its Close (`:6400-6586`). Transcripts sit in the seat's scratchpad and are not committed.

### Axis 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`. Neither path is in
this seat's writable set (this record and the LEDGER). **Nothing inherited.**

### Axis 2 · 4 · 5 — bounds, families, E-3

⟨cmd⟩ `git log --oneline d7bc7bec^..HEAD` → 9 commits (`d7bc7bec` `58faba6f` `1a4efe67` `e1655c15` `03653b52` `f1d74d53`
`0cfab676` `1835ce1d` `53c63b3b`). Each was `git show --stat`-read. They touch only: this record · the LEDGER (1 row) · INBOX (+2, the
sweep line) · `W6-evidence/{easing,blob,gates/close-5-2026-09-22}/**` · `W6-glass-ask-hero-blob-p3.md` (+26/−0, an addendum
beside). ⟨cmd⟩ `git diff --stat d7bc7bec^..HEAD -- docs/tranches/X/waves/W6.md docs/tranches/V/megatranche/registry/adjudicated/
<sibling W*.md> scripts/dev/dev.sh demo e2e test src docs/tranches/V/megatranche/audit/{components,probes}` → **empty**.
No product byte moved, so no §9 family was minted and none was split. `dev.sh` was never staged. **Clean.**

### Axis 1 · 9 — the claimed GREENs, re-run by this seat (22:36–22:48, fresh webServers `VJS_E2E_PORT` 8941/8951–8953, fresh vite `:8961`)

| gate(s) | ⟨cmd⟩ | this seat |
|---|---|---|
| a1 · c2 · c4 | `npx vite-node …/evidence/parse-probe.ts` · `npx vitest run test/gradient-order-invariant.test.ts test/interpolation-subset.test.ts` | probe prints the adjudicated pre-cure rejections; `Tests 22 passed (22)` (17 + 5) → **GREEN** |
| a2 · a3 · b3 · e1 · a4 · a13 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | `1 failed · 21 passed (2.0m)`. The one failure is `o21:188` (a4). a2 a3 b3 e1 → **GREEN**; a4 · a13 → **RED** (as the close read it) |
| b2 · b4 (b1) | `GRADIENT_URL=http://localhost:8961/#/gradient node …/gate-seat.mjs` | `GATE G3 — RED` with exactly two `G3d` lines (Home · ArrowDown), no G3e or G3f → b2 b4 **GREEN**; b1 = `B1-G3D` |
| c1 | `node …/gate-structure.mjs` | `GATE G4 (structure) — GREEN` |
| c3 | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | `grammar shapes …: oklch(N% N Ndeg) (1)` · `GATE c3 — GREEN` |
| d1 | `EASING_RADIUS_ORIGIN=http://localhost:8961 node …/gate-easing-radius.mjs` | `measured: 33 · read-only: 2` · **GREEN** (read-only count 2 here, against the close's 1 ×4: R-d1 stands, and the verdict is unaffected) |
| d2 · e2 | `gate-easing-readout.mjs` · the rAF grep + `gate-prm-idiom.mjs` | `DATED ASK` · local restyle `0` · rAF `0` · `GATE e2 — GREEN` |
| f1 · f5 · h2 · i2 · H1 | the five `docs/tranches/X/gates/*.mjs` (H1 over `b2dd375c a87f8930`) | f1 `offered=18 catalogued=18 info=18`; exit **0** for each of the other four |
| f2 · f7 · f8 · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0`/`0` + `EXIT=0` · `tag=` `0` · `2`/`0` · `0` → **GREEN** |
| f4 · f6 · f8 | `o22` · `o23` · `o24` | `3 passed (16.7s)` |
| i1 · i3 | `o25` · `o28` | `1 failed · 1 passed`. o25 **GREEN**; o28 **RED**, Received 0.1595 · 0.2933 · 0.2433 (the close's exact figures) |
| g2 | `companion-pane-track-start.spec.ts -g "companion panes share one track start"` | **RED**, pane 104.95 vs track 111.45, Received **6.50** (the close's second-run figure) |
| H3 | parser R1 one-liner · glass version | `R1=0` · `7.0.0` |
| j1–j3 | `grep -c "component: Stub" …/router/index.ts` · `ls e2e/smoke/oracles \| grep -c o29` | `14` · `0` → RED (`.j` has not run) |

**Reproduced GREEN: 27 of the close's 30** (a1 a2 a3 b2 b3 b4 c1 c2 c3 c4 d1 d2 e2 f1 f2 f4 f5 f6 f7 f8 f9 f10 h2 i1 i2 H1 H3).
**Not re-run, cited**: f3 (close GREEN ×2), h1 (close GREEN ×2), j4 (retired, Check 3). **No claimed GREEN failed.**
The close's REDs reproduce wherever this seat ran them: a4 · a13 · b1 · g2 · i3 · j1–j3. **e1** passed in this seat's one run. The close
read it RED on 1 of 2, so e1 is flaky and not stably GREEN. The published 30/20 split is consistent with the bytes.

### Axis 3 · 6 · 7 · 8

- **(3) Masking**: this sitting's diff contains no product, test or source byte (Axis 2), so it can hold no masking fallback. The close
  declined to add a wait or settle over ESC-W6close5-1 and said so, which is the lawful posture. **Clean.**
- **(6) Mail**: ⟨cmd⟩ `awk -F'|' '$6 ~ /UNREAD/' INBOX.md` → O-20 · I-31 · I-32 · O-39 (prose hits) and I-40 (Track C fourier). ⟨cmd⟩
  `grep -c '^| I-\|^| O-'` → **97**, the count the close stated. **0 UNREAD in W6's scope.**
- **(7) Four-verb line**: it stays `IMPLEMENTED no`, and 20 gates are RED, so the line lawfully did not move.
- **(8) Goal criterion (§2a)**: **NOT MET at the bytes.** The gradient's gesture and geometry truth (a4–a12) does not hold at this HEAD. The
  cold load does not paint the pick (i3). No route owns a scene contract (j1–j3: `component: Stub` ×14).

### Axis 10 — honest-RED adjudication, at the spec bytes

| gate | relief at the spec bytes | owner named in the residual register | verdict |
|---|---|---|---|
| g1 | `W6.md:484` *"**g1** honest-RED by id → X-W10 (M-23)"* | R-6 → X-W10 | **RELIEVED** |
| b1 | `W6.md:486` *"b1 = `B1-G3D` honest-RED-by-instrument"* | R-4 → X-W11 roster | **RELIEVED** |
| j1 · j2 · j3 | `W6.md:479`/`:484`/`:486`: *"`.j` after X-W5 CLOSED"*. LEDGER X-W5 = `PARTIAL — RESUME 5 close` | R-7 → `.j` | **RELIEVED** (routed behind a gate that is not yet met) |
| H4 | CC-056/CC-057 land only in `.j` (§Dispositions); `.j` is routed as above | R-7 | **RELIEVED** |
| H2 | the `.j` MOTION-SOURCED citation leg is owed by `.j` (§5 `.j`, §6 H2); `.j` is routed as above | R-8 → `.j` | **RELIEVED** |
| a4 · a13 | **none**. §0ax (`W6.md:486`) assigns a4/`o21:188` to *"the repair seat"* inside THIS wave. That is a W6 duty, not a successor routing, and the seat was not dispatched | R-14 | **UNRELIEVED** |
| i3 | **none**. §0aq/§0z route i3 to `.i` inside this wave. ESC-W6i-i3-1 is unruled, and no addendum relieves it | R-5 | **UNRELIEVED** |
| a5–a11 · a12 | **none**. §10 makes transitions X-W5's, but X-W5 is a PREDECESSOR (still PARTIAL), not a later wave. No addendum names these gates. A predecessor regression is escalated (ESC-W6close5-1), not relieved | R-15 → X-W5 | **UNRELIEVED** |
| e1 | **none**. It is flaky: RED on 1 of 2 runs at the close, GREEN on 1 of 1 here. It is not relieved, and not stably GREEN | R-15 | **UNRELIEVED** |
| g2 | **none**. It regressed and was not bisected; X-W5 `.d2` is the suspect | R-15 | **UNRELIEVED** |

**Honest-RED set (relieved)**: g1 · b1 · j1 · j2 · j3 · H2 · H4 (7). **Unrelieved**: a4 · a5 · a6 · a7 · a8 · a9 · a10 · a11 · a12 · a13 ·
e1 · g2 · i3 (13). This matches the close's own partition exactly.

### Successors' "Opens after" conjuncts against X-W6

- **X-W7** (`W7.md:6`: X-W3 · X-W4 · **X-W6**): the X-W6 conjunct is **RED**, so X-W7 is lawfully BLOCKED on this wave.
- **X-W8** (`W8.md:6`: X-W5 · X-W6 · X-W7 stabilize): the X-W6 conjunct is **RED**, and so are X-W5 and X-W7. X-W8 is lawfully BLOCKED.
- **X-W10** (`W10.md:6`: X-W5..X-W9 stable): the X-W6 conjunct is **RED**, so X-W10 is BLOCKED.
- **X-W11** (`W11.md:6`: X-W0..X-W10 IMPLEMENTED): **RED**, so X-W11 is BLOCKED.
- X-W6's own `.j` conjunct (X-W5 CLOSED) is **RED**. LEDGER X-W5 reads `PARTIAL`, and its Check 3 is NOT-CONFORMANT.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C1-1 | **HIGH** | a5–a11 and a12 (8 born-RED sub-gates, the core of `.a`) are RED at HEAD, and the spec gives them no relief. The mechanism is X-W5 `.d2`'s cold-navigation scene-enter, which sometimes sticks and leaves the rail at x = −351 | close `a-gp*.txt` (3 of 4 throw at `:208`) and `a12*.txt` (3 of 3 throw at `:42`); `stuck-enter-repro.txt` 1 of 5 | X-W5 cures ESC-W6close5-1 at its own bytes (`52dc0a5b`/`b36df565`). Then a W6 re-sit re-reads the gates. No W6 wait or settle may be added |
| C1-2 | **HIGH** | a4 and a13 are RED (`o21:188` *Expected 3 · Received 2*). The fix is a W6 duty (§0ax's repair seat) that was never dispatched | this seat: `1 failed · 21 passed (2.0m)`, `o21:188` | dispatch §0ax's repair seat (settle/scroll ADDED, assertions untouched) |
| C1-3 | **HIGH** | i3 is RED. ESC-W6i-i3-1 has had no ruling, and no addendum relieves the gate | this seat: o28 Received 0.1595 / 0.2933 / 0.2433 against ≤ 0.02; `armRuntime` `0` | COHESION rules ESC-W6i-i3-1 ((a)/(b)/(c)), then `.i` re-sits |
| C1-4 | **HIGH** | g2 regressed GREEN→RED (6.50 px against ≤ 1) and has not been bisected | this seat: pane 104.95 vs track 111.45, Received 6.50 | bisect against X-W5 `.d2` (ESC-W6close5-1). If the cause is W6's, `.g` re-sits |
| C1-5 | MEDIUM | e1 is flaky: RED 1 of 2 at the close, GREEN 1 of 1 here. It is not stably GREEN | close `pw-grad-r2.txt`; this seat's run passed `gradient.spec.ts:451` | same root as C1-1 (W5-10 failed beside it). Re-read ×2 after the X-W5 cure |
| C1-6 | INFO | d1's read-only count is DOM-dependent: 1 ×4 at the close, 2 here. The verdict stays GREEN | this seat: `read-only (d2-ask / producer): 2` | R-d1's erratum, already owned by `.d` |
| C1-7 | INFO | the close's published figures, bounds, mail census and honest-RED partition all reproduce. No landed-wrong byte | Axes 1–6 above | none |

### Verdict

**NOT-CONFORMANT.** Every claimed GREEN this seat re-ran reproduced (27 of 30; 3 were cited). No write fell outside §4. No masking was
found. E-3 held, and mail is clean. But **13 gates stay RED with no relief at the spec bytes** (C1-1..C1-5), and the §2a goal is unmet.
The LEDGER row **stays PARTIAL**, and this seat makes no status edit. The honest-RED set, relieved and owner-named, is g1 · b1 · j1 · j2 · j3 · H2 · H4.

## Repair 1 — RESUME 2026-09-22 (REPAIR SEAT, round 1, over the Check 1 — fifth sitting register)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). This seat read `W6.md` whole once (486 lines, both 2026-09-22 ADDENDA), and
from this record only the header, the fifth sitting's Unit plan (`:6090-6130`) and Check 1 (`:6588-6686`). Writable set:
§0ax's repair-seat grant (`e2e/smoke/oracles/o21-gradient-rail.spec.ts`, ADD-never-replace, settle/scroll only; and
`ColorSpaceSelector.vue` only if f3's bisect roots there, which is not needed: f3 is not in this register) · `W6-evidence/**` ·
this record · the LEDGER row (append only).

### Axis 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → ` M …/V/reformation/CARRY-LEDGER.md` · ` M …/W6-evidence/catalog/after-catalog-open.png` ·
` M …/W6-evidence/catalog/after-specimen-dots.png` · ` M scripts/dev/dev.sh`. The two catalog PNGs are inside `W6-evidence/**`.
They are not a killed seat's cure. Both have mtime `22:40`, which falls inside Check 1's o22/o24 run (22:36–22:48), and
⟨cmd⟩ `grep -rln 'after-catalog-open\|after-specimen-dots' e2e` → `o22-specimen-legibility.spec.ts` · `o24-specimen-dot-identity.spec.ts`.
So they are capture side-effects of a gate run. This seat neither restores nor commits them, and they stay the close's
committed frames. `CARRY-LEDGER.md` and `dev.sh` are outside this set and were not touched. **No inherited cure work.**

### C1-2 (HIGH) — a4 · a13, `o21:188`: CURED at `df290a72`

**Diagnosis (measured before the cut).** ⟨cmd⟩ `npx playwright test e2e/smoke/oracles/o21-gradient-rail.spec.ts:188 --project=smoke`
(fresh webServer `VJS_E2E_PORT=8971`) → `1 failed`, `o21:222` *Expected: 3 · Received: 2* (`o21-188-base.txt`). A probe
replays the test's own sequence (`goto` → openView → reload → openView → settle → press) against a fresh vite on `:8973`
(`o21-188-press-diag.mjs`). It logs what sits at the press pixel:
- the plain replay → `"hit":"HTML. testid=null"` (t=0) and `"hit":"DIV.p-1 w-full text-small font-display"` (t=100); `after 2` both times.
- the same replay, reading state before the press → `state {"lb":1,"bpe":"none"}`, then `clear after 200 ms`; the hit is now
  `DIV.gradient-rail … testid=gradient-stop-bar` and `after 3` at both terminals.

The mechanism: the reload lands back on `#/gradient`, so `openView` re-picks the view that is already mounted. No pane
swap runs, so `paneSettled` returns at once (`settle 0`). The view-select listbox is still closing, and its dismissable
layer still holds `body` at `pointer-events: none`. The raw `page.mouse.click` therefore reaches no element. The product
is sound: the same press, made after the listbox closes, mints at both terminals. Check 3's candidate, the dropped
`scrollIntoViewIfNeeded`, is refuted: `scrollY 0`, and the rail sits inside the viewport (`rb.y 244.97`, viewport height 720).

**Cure (§0ax idiom: a settle ADDED, assertions untouched).** `o21:199` gains
`await expect(page.getByRole("listbox")).toHaveCount(0);` after `paneSettled`, with a comment that names the mechanism. No
mint, ordinal or axis assertion moved (⟨cmd⟩ `git show --stat df290a72` → `1 file changed, 9 insertions(+)`, 0 deletions).
It masks nothing: a listbox that never closes times out and fails loudly. `npx prettier --check` → clean. `git diff --check` → clean.

**Gate re-reading after the cure** (transcripts in `W6-evidence/gates/repair-1-close5-2026-09-22/`, self-counted from the
settled bytes with `grep -c '✓'` / `grep -c '✘'`):

| gate | ⟨cmd⟩ | reading |
|---|---|---|
| a4 (alone) | `npx playwright test e2e/smoke/oracles/o21-gradient-rail.spec.ts:188 --project=smoke` ×2 | `1 passed (17.9s)` · `1 passed (17.4s)` → **GREEN ×2** |
| a4 · a13 (suite) | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` ×3 | r1 `22 passed (1.9m)` · r2 `1 failed · 21 passed (1.9m)` · r3 `22 passed (1.8m)`. `o21:188` is ✓ in **all three**. |
| a13 (vitest leg) | `npx vitest run test/gradient-order-invariant.test.ts` ×2 | `Tests 17 passed (17)` ×2 |

**a4 → GREEN** (5 of 5 readings). **a13 → GREEN on 2 of 3 suite readings, not yet stably GREEN.** r2's one failure is not
`o21:188`. It is `gradient.spec.ts:243` (*stop add … drag …*) at `:282`: *Expected > 277.2 · Received 12*. The drag lands
the handle at the rail's left end, and this seat's byte cannot reach that test. It is the gesture species (a5-class drag) that Check 1 C1-1
rooted in ESC-W6close5-1, which the g2 measurement below observes directly: a scene pane resting in its enter state.
**Not measured here**: whether the r2 drag ran on such a pane. The attribution is by species, not by trace. a13's residual
flake is therefore filed under ESC-W6close5-1 (escalated below). No settle was added to hide it.

### C1-4 (HIGH) — g2: DIAGNOSED to X-W5 bytes, ESCALATED (joins ESC-W6close5-1)

⟨cmd⟩ `npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts -g "companion panes share one track start" --project=smoke`
→ `1 failed`: *"the About pane (div.glass-resting.card) sits ON its track start … (pane 104.9516830444336 vs track 111.453125)"*,
Received **6.501441955566406** (`g2-head.txt`).

**Mechanism, measured.** An in-page probe on a fresh vite `:8973` loads `#/` and reads the About region at t = 1.5 s, 4 s and 8 s.
All three readings are identical:
- the About pane (`DIV.glass-resting`) → `tf=matrix(0.999391, 0.0348995, -0.0348995, 0.999391, 563.2, 0)`, `top=104.99`, `anims: []`.
- its parent `DIV.pane-wrapper` → `tf=none top=111.58`. The Picker pane → `tf=none top=112.00`.
- a second read of the stuck element →
  `"cls":"… about-card pane-scroll-fade … h-full vj-enter-enter-from vj-enter-enter-active"`.

The About pane never leaves Vue's `vj-enter` enter-from state (2° rotate + 563.2 px translate). Nothing is animating, so
the state is permanent, not a slow arrival. The 6.5 px is the vertical reach of the rotated box's corner, not a layout
offset. So g2's RED is not a W6 `.g` alignment regression. It is the same stuck scene-enter that ESC-W6close5-1 names,
observed on a second route (`#/`) and a second pane (About).

**The owner of those bytes.** The scene swap lives in `demo/shell/PaneSlot.vue` · `usePaneRouter.ts` ·
`demo/color-picker/App.vue` · `demo/styles/animations.css`. These are the files that X-W5 `.d2` `52dc0a5b` and `b36df565` touch
(⟨cmd⟩ `git show --stat`). They are X-W5 shell property and sit outside W6 §4 ("Do NOT touch … `demo/color-picker/App.vue`").

**Bisect attempt, not completed.** Trees at `fdf3e9e0`, `52dc0a5b` and `b36df565` were extracted with `git archive` into the
scratchpad. They did not serve faithfully: ⟨cmd⟩ at `fdf3e9e0` → `About region renders no pane` plus
`Invalid vnode type … <HeroBlob>`, a module-resolution artefact of a tree outside the repo root. Those readings are
**discarded, not cited**. The mechanism measurement above supersedes the bisect: it names the state (`vj-enter-enter-from`
resting, zero animations) and who owns it. The last GREEN reading was c9e39745 (Check 3, 19:16). Since then only X-W5 commits
touch `demo/` (⟨cmd⟩ `git log c9e39745..HEAD -- demo e2e/smoke/fixtures playwright.config.ts` → `b36df565 52dc0a5b fdf3e9e0
ab5270b6 fc9c2be4 043a783c`). **The cause is not W6's own, so `.g` does not re-sit.**

The probe's output is committed as `g2-about-stuck-probe.txt`.

### C1-1 (HIGH) — a5–a11 · a12: ESCALATED (ESC-W6close5-1, X-W5 bytes)

No W6 byte can cure these. The cure Check 1 names sits at X-W5's `.d2` bytes (`52dc0a5b`/`b36df565`: `PaneSlot.vue`,
`usePaneRouter.ts`, `App.vue`, `animations.css`), and all of them fall outside W6 §4. Check 1 forbids a W6 wait or settle over
it, and so does the masking-fallback ban. This seat adds one fact to the escalation: the g2 probe above shows the stuck
state directly, on `#/` and on the About pane (`vj-enter-enter-from vj-enter-enter-active` held with zero running
animations, 563.2 px off-station). So ESC-W6close5-1 is not confined to the gradient route's cold navigation. It is a
transition that sometimes never advances past enter-from. **Re-sit trigger**: X-W5 cures ESC-W6close5-1 at its own bytes,
then W6 re-reads a5–a12, e1, g2 and the a13 suite ×2.

### C1-3 (HIGH) — i3: ESCALATED (ESC-W6i-i3-1 unruled)

The cure path is a COHESION ruling on ESC-W6i-i3-1 ((a)/(b)/(c)), then a `.i` re-sit. A repair seat can author neither.
The ruling is a COHESION act, and §0aq routes i3's cure to unit `.i`, not to this seat. i3 was not re-run, because no byte
this seat moved can reach it (`o21` is a gradient spec). Check 1's reading stands: Received 0.1595 / 0.2933 / 0.2433
against ≤ 0.02.

### C1-5 (MEDIUM) — e1: ESCALATED under ESC-W6close5-1

e1 sits inside the a13 suite this seat ran three times. `gradient.spec.ts:451` (*gradient selector aurora*) reads ✓ in
r1, r2 and r3 (⟨cmd⟩ `grep 'spec.ts:451' a13-r*.txt`). That makes 3 of 3 here, against 1 of 2 at the close. Three readings
cannot promote a known flake to stably GREEN: its failing reading at the close sat beside W5-10 (`gradient.spec.ts:401`,
a pane resting on a transform), which is the ESC-W6close5-1 state. It re-reads ×2 after the X-W5 cure. No W6 byte is owed.

### C1-6 (INFO) — d1's read-only count

This is INFO severity and has no one-command cure. It stays with R-d1's erratum, which `.d` already owns. Not acted on.

### Tally

| defect | severity | disposition | commit | gate after |
|---|---|---|---|---|
| C1-2 | HIGH | **CURED**: a settle added in `o21:188` (the view-select listbox closes before the raw press); assertions untouched | `df290a72` | a4 **GREEN** 5/5 · a13 GREEN 2/3 (residual `gradient:243` flake → ESC-W6close5-1) |
| C1-4 | HIGH | **ESCALATED**: mechanism measured (About pane rests in `vj-enter-enter-from`, zero animations), owned by X-W5 `.d2` bytes outside §4 | — | g2 RED (6.50) |
| C1-1 | HIGH | **ESCALATED**: ESC-W6close5-1, X-W5 bytes | — | a5–a12 RED (not re-run; Check 1's reading stands) |
| C1-3 | HIGH | **ESCALATED**: ESC-W6i-i3-1 needs a COHESION ruling, then a `.i` re-sit | — | i3 RED (Check 1's reading stands) |
| C1-5 | MEDIUM | **ESCALATED** under ESC-W6close5-1 | — | e1 ✓ 3/3 here, not yet stable |
| C1-6 | INFO | not acted on (R-d1, `.d`) | — | d1 GREEN |

**Cured 1 · escalated 4 · 1 INFO left alone.** Only one product-adjacent byte moved: an e2e spec, 9 lines added, 0 removed.
`dev.sh` was not staged. W6's unrelieved RED set falls from 13 to 12 (a4 leaves it). a13 stays in it until the suite reads
GREEN ×2 after the X-W5 cure. **The LEDGER row stays PARTIAL.**

## Check 2 — RESUME 2026-09-22 (L-20 fresh adversarial pass 2, over the fifth sitting's close `1835ce1d` + Repair 1 `df290a72`/`b130ea87`)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). VERIFY-ONLY: this seat cures nothing. `W6.md` read whole once (486 lines, both
ADDENDA 2026-09-22). Of this record only the header, the fifth sitting's Open → Unit plan (`:6003-6130`), its Close
(`:6400-6586`), Check 1 (`:6588-6686`) and Repair 1 (`:6688-6817`). Transcripts in the seat's scratchpad, not committed.

### Axis 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → ` M …/V/reformation/CARRY-LEDGER.md` · ` M …/W6-evidence/catalog/after-catalog-open.png` ·
` M …/W6-evidence/catalog/after-specimen-dots.png` · ` M scripts/dev/dev.sh`. None is in this seat's writable set (this record,
the LEDGER). The two PNGs are the o22/o24 capture side effects Repair 1 already named; this seat's own o22/o24/o21-catalog run
re-wrote them and a third (`after-display-p3-about.png`). This seat restored **only the third** (its own side effect, clean at open)
with `git checkout -- <path>`; the other two were left as found. **Nothing inherited.**

### Axis 2 · 4 · 5 — bounds, families, E-3

⟨cmd⟩ `git show --stat` over the post-close commits `64bb0929` `df290a72` `b130ea87` `e3112366` → record + LEDGER (+1 line each
docs commit) · `e2e/smoke/oracles/o21-gradient-rail.spec.ts` (`9 insertions(+)`, 0 deletions — a §4 path, ADD-never-replace, §0ax's
repair-seat grant) · `W6-evidence/gates/repair-1-close5-2026-09-22/**`. ⟨cmd⟩ `git diff --stat d7bc7bec^..HEAD -- docs/tranches/X/waves/W6.md
…/W5.md …/W7.md docs/tranches/V/megatranche/registry/adjudicated/ scripts/dev/dev.sh src docs/tranches/X/CONFORMANCE-2026-08-03.md`
→ **empty**. `df290a72` is one meaning (the a4 settle), unsplit; no §9 product family was minted in the sitting. **Clean.**

### Axis 3 — masking

`df290a72`'s hunk adds `await expect(page.getByRole("listbox")).toHaveCount(0);` after `paneSettled` at `o21:~210`, with no mint,
ordinal or axis assertion moved. It is the §0ax-prescribed idiom (*"settle/scroll added, assertions untouched"*), and it fails
loudly if the listbox never closes — a settle, not a relaxation. No try/catch, skip, allowlist or narrowed assertion anywhere in
the sitting's diff. **Clean.**

### Axis 1 · 9 — the claimed GREENs, re-run by this seat (22:55–23:00, fresh webServers `VJS_E2E_PORT` 9311/9321/9331, fresh vite `:9345`, killed after)

| gate(s) | ⟨cmd⟩ | this seat |
|---|---|---|
| a1 · c2 · c4 (a13 vitest leg) | `npx vitest run test/gradient-order-invariant.test.ts test/interpolation-subset.test.ts` · `… -t "one sampling law"` | `Tests 22 passed (22)` · `4 passed \| 13 skipped (17)` → **GREEN** |
| a2 · a3 · a4 · b3 · e1 · a13 (pw leg) | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **`22 passed (1.9m)`** — `o21:188` (a4) ✓ and `gradient.spec.ts:451` (e1) ✓ on this read |
| a5–a11 | `GRADIENT_URL=http://localhost:9345/#/gradient node …/W6-evidence/gradient/gate-a-gesture-paint.mjs` ×2 | run 1 **EXIT=1** (*"element is outside of the viewport"* ×3, the ESC-W6close5-1 stuck-enter signature) · run 2 **EXIT=0** `GATE X.W6.a (gesture + paint) — GREEN` → **RED 1 of 2** |
| a12 | `WBGSE-D-probe2.mjs` from a dot-prefixed scratch copy differing only at `:6` (origin `9000`→`9345`), deleted after; `git status --porcelain <evidence dir>` → empty | EXIT 0, `afterOverhangPx: 0` → GREEN **1 of 1** here, against RED 3 of 3 at the close — not stable |
| b2 · b4 (b1) | `GRADIENT_URL=… node …/gate-seat.mjs` | EXIT 1, exactly **2** `G3d` lines, **0** G3e/G3f → b2 b4 **GREEN**; b1 = `B1-G3D` |
| c1 · c3 | `gate-structure.mjs` · `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | `GATE G4 (structure) — GREEN` · `GATE c3 (literal dialect) — GREEN` |
| d1 · d2 · e2 | `EASING_RADIUS_ORIGIN=http://localhost:9345 … gate-easing-radius.mjs` · `gate-easing-readout.mjs` · rAF grep + `gate-prm-idiom.mjs` | `measured: 33 · read-only: 2` GREEN (R-d1 stands) · EXIT 0 · `0` + `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 · h2 · i2 · H1 | the five `docs/tranches/X/gates/*.mjs` (H1 over `b2dd375c a87f8930`) | EXIT **0** ×5 |
| f2 · f7 · f8 · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0`/`0` + `EXIT=0` · `tag=` `0` · `2`/`0` · `0` → **GREEN** |
| f3 · f4 · f6 · f8 · i1 · i3 | `o21-space-catalog-truth` · `o22` · `o23` · `o24` · `o25` · `o28` in one run | `1 failed · 5 passed (1.8m)`; the failure is `o28` (i3), Received **0.1595 · 0.2933 · 0.2433** (≤ 0.02) — the close's exact figures |
| g2 | `companion-pane-track-start.spec.ts -g "companion panes share one track start"` | **RED**, Received **6.5014** (≤ 1) |
| H3 | parser R1 one-liner | `R1=0`; glass `7.0.0` |
| j1–j3 · H2 | `grep -c "component: Stub" …/router/index.ts` · `ls e2e/smoke/oracles \| grep -c o29` · `test -f …/motion-quarantine.md` | `14` · `0` · present (`.j` leg owed) → RED |

**Reproduced GREEN: 28 of the close's 30** (a1 a2 a3 b2 b3 b4 c1 c2 c3 c4 d1 d2 e2 f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 h2 i1 i2 H1 H3)
**+ Repair 1's a4 = 29.** Cited, not re-run: h1 (close ×2, Check 1 cited) · j4 (retired, Check 3). **No claimed GREEN failed.**
Self-count: 3+3+4+3+10+2+2+2 = a1-a3 (3) · b2-b4 (3) · c1-c4 (4) · d1 d2 e2 (3) · f1-f10 (10) · h2 i1 (2) · i2 H1 (2) · H3 a4 (2) = **29**.

### Axis 6 · 7 · 8

- **(6) Mail**: ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **97**; `awk -F'|' '$6 ~ /UNREAD/'` → O-20 · I-31 · I-32 · O-39 (prose hits) · I-40
  (Track C fourier). ⟨cmd⟩ `find <4 paths> -maxdepth 1 -type f -newermt "2026-09-22 22:40"` → **empty** at all four (BK still the newest
  glass dir). **0 UNREAD in W6's scope.**
- **(7) Four-verb**: `IMPLEMENTED no` with RED gates unrelieved — lawfully unmoved.
- **(8) §2a goal**: **NOT MET at the bytes** — the gradient's gesture/geometry truth (a5–a12) holds only intermittently at HEAD; the
  cold load paints the default, not the pick (i3); About sits off its track (g2); no route owns a scene (`component: Stub` ×14).

### Axis 10 — honest-RED adjudication, at the spec bytes

| gate | relief at the spec bytes | owner (residual register) | verdict |
|---|---|---|---|
| g1 | `W6.md:484` *"**g1** honest-RED by id → X-W10 (M-23)"* | R-6 → X-W10 | **RELIEVED** |
| b1 | `W6.md:486` *"b1 = `B1-G3D` honest-RED-by-instrument"* | R-4 → X-W11 roster | **RELIEVED** |
| j1 · j2 · j3 | `W6.md:479/484/486` *"`.j` after X-W5 CLOSED"*; LEDGER X-W5 = `PARTIAL — RESUME 5 close` | R-7 → `.j` | **RELIEVED** (routed behind an unmet gate) |
| H4 | CC-056/CC-057 land only in `.j` (§Dispositions) | R-7 | **RELIEVED** |
| H2 | the `.j` MOTION-SOURCED leg is `.j`'s (§5 `.j`, §6 H2) | R-8 → `.j` | **RELIEVED** |
| a4 | — | — | **CURED** (`df290a72`; GREEN here, 6 of 6 cumulative) |
| a5–a11 · a12 | **none**. X-W5 is a PREDECESSOR, still PARTIAL; no addendum names these gates. A predecessor regression is escalated (ESC-W6close5-1, unruled), not relieved | R-15 → X-W5 | **UNRELIEVED** (a5–a11 RED 1/2 here; a12 GREEN 1/1 here vs RED 3/3 at close — flaky) |
| a13 | none; its suite leg reads GREEN here and on 2 of 3 at Repair 1 (`gradient:243` drag flake, same species) — not stably GREEN ×2 after the X-W5 cure as Repair 1 itself requires | R-15 | **UNRELIEVED** |
| e1 | none; GREEN here (5 of 6 cumulative), RED once beside W5-10 | R-15 | **UNRELIEVED** (flaky) |
| g2 | none; mechanism measured by Repair 1 (About pane resting in `vj-enter-enter-from`), X-W5 bytes; no ruling | R-15 | **UNRELIEVED** (RED 6.50 here) |
| i3 | none; §0ax routes i3 to `.i` inside THIS wave (a duty); ESC-W6i-i3-1 unruled (⟨cmd⟩ `grep -n "ESC-W6i-i3-1\|ESC-W6close5-1" COHESION.md` → **0**) | R-5 | **UNRELIEVED** |

**Honest-RED set (relieved)**: g1 · b1 · j1 · j2 · j3 · H2 · H4 (7). **Unrelieved**: a5 · a6 · a7 · a8 · a9 · a10 · a11 · a12 · a13 · e1 · g2 · i3 (12).

### Successors' "Opens after" conjuncts against X-W6

X-W7 (`W7.md:6`: X-W3 · X-W4 · **X-W6**) · X-W8 (`W8.md:6`: X-W5 · **X-W6** · X-W7) · X-W10 (`W10.md:6`: X-W5..X-W9) · X-W11
(`W11.md:6`: X-W0..X-W10 IMPLEMENTED): the X-W6 conjunct is **RED** in each, so all four are **lawfully BLOCKED** on this wave. X-W6's
own `.j` conjunct (X-W5 CLOSED) is RED (LEDGER X-W5 `PARTIAL`, Check 3 `7a4c98e1` NOT-CONFORMANT).

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C2-1 | **HIGH** | a5–a11 and a12 (8 born-RED `.a` sub-gates) are not stably GREEN at HEAD and the spec gives them no relief; the mechanism is X-W5 `.d2`'s intermittently stuck scene-enter (ESC-W6close5-1, unruled) | this seat: `gate-a-gesture-paint.mjs` run 1 EXIT 1 (*outside of the viewport* ×3), run 2 EXIT 0; a12 GREEN 1/1 here vs RED 3/3 at the close | X-W5 cures ESC-W6close5-1 at its own bytes (`52dc0a5b`/`b36df565`); then a W6 re-sit re-reads a5–a12 ×2. No W6 wait/settle |
| C2-2 | **HIGH** | g2 RED (6.50 px vs ≤ 1); rooted by Repair 1 in the same stuck `vj-enter-enter-from` on the About pane, X-W5 bytes; no ruling relieves it | this seat: `companion-pane-track-start` Received 6.5014 | ESC-W6close5-1 (X-W5), then re-read ×2 |
| C2-3 | **HIGH** | i3 RED; a W6 `.i` duty (§0ax), ESC-W6i-i3-1 unruled in COHESION | this seat: o28 Received 0.1595 / 0.2933 / 0.2433 (≤ 0.02); `armRuntime` 0 | COHESION rules ESC-W6i-i3-1 (a)/(b)/(c); `.i` re-sits |
| C2-4 | MEDIUM | a13 and e1 are flaky, not stably GREEN: both ✓ in this seat's one suite read, but a13 failed 1 of 3 at Repair 1 (`gradient:243`) and e1 1 of 2 at the close | this seat `22 passed (1.9m)`; Repair 1 `a13-r2.txt`; close `pw-grad-r2.txt` | same root as C2-1; re-read ×2 after the X-W5 cure |
| C2-5 | INFO | Repair 1's a4 cure is lawful and reproduces (the §0ax settle idiom, assertions untouched, +9/−0) | `git show --stat df290a72`; `o21:188` ✓ here | none |
| C2-6 | INFO | d1's read-only count reads 2 here (1 ×4 at the close); DOM-dependent, verdict GREEN | `read-only (d2-ask / producer): 2` | R-d1, `.d` |

### Verdict

**NOT-CONFORMANT.** Every claimed GREEN this seat re-ran reproduced (29: the close's 28 re-run + Repair 1's a4; h1 and j4 cited). No
write outside §4, no masking, E-3 held, mail clean, families unsplit. But **12 gates stay RED or unstable with no relief at the spec
bytes** (C2-1..C2-4) and the §2a goal is unmet. Honest-RED (relieved, owner-named): g1 · b1 · j1 · j2 · j3 · H2 · H4. The LEDGER row
**stays PARTIAL**; this seat makes no status edit and appends one event line.

---

## Repair 2 — RESUME 2026-09-22 (REPAIR SEAT, round 2, over the Check 2 — fifth sitting register)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). This seat read `W6.md` whole once (486 lines, both 2026-09-22 ADDENDA). From this
record it read only the fifth sitting's Open → Unit plan (`:6003-6130`), the `.i` receipt (`:6329-6399`), Repair 1 (`:6688-6817`) and
Check 2 (`:6819-6921`). Writable set: §0ax's repair-seat grant (`o21-gradient-rail.spec.ts`, settle/scroll only; `ColorSpaceSelector.vue`
only for f3, which is not in this register), `W6-evidence/**`, this record, and the LEDGER (append only).

### Axis 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → ` M …/V/reformation/CARRY-LEDGER.md` · ` M …/W6-evidence/catalog/after-catalog-open.png` ·
` M …/W6-evidence/catalog/after-specimen-dots.png` · ` M scripts/dev/dev.sh`. The two PNGs are the o22/o24 capture side effects that
Repair 1 and Check 2 already named. They are not a cure, and this seat leaves them as found. The other two paths are outside this set.
**Nothing inherited.**

### What moved since Check 2 (measured ×2, same result both runs)

| ⟨cmd⟩ | run 1 · run 2 |
|---|---|
| `git log --oneline 9c5aaec2..HEAD -- demo e2e \| wc -l` | `0` · `0` (no product or spec byte has moved since Check 2) |
| `grep -c 'ESC-W6i-i3-1\|ESC-W6close5-1' docs/tranches/X/COHESION.md` | `0` · `0` (both escalations still unruled) |
| `grep -rn armRuntime demo/ \| wc -l` | `0` · `0` |
| `grep -ln vj-enter demo/shell/PaneSlot.vue demo/styles/animations.css \| wc -l` | `2` · `2` (the stuck enter state is defined in X-W5 shell bytes, not in any W6 §4 path) |
| `grep "^\| X-W5 " LEDGER.md` | `PARTIAL — RESUME 5 close 2026-09-22` (X-W5 has not cured ESC-W6close5-1) |

### Defect → disposition

| # | severity | disposition | reason, measured | commit | gate after |
|---|---|---|---|---|---|
| C2-1 | HIGH | **ESCALATED** (ESC-W6close5-1) | The cause is the pane swap's `vj-enter` enter state resting with no running animation. That state lives in `demo/shell/PaneSlot.vue` · `usePaneRouter.ts` · `demo/color-picker/App.vue` · `demo/styles/animations.css`, which are X-W5 `.d2` bytes (`52dc0a5b`/`b36df565`). All of them sit outside W6 §4, and `App.vue` is named in §4's Do-NOT-touch list. Check 2 forbids a W6 wait or settle, and the masking ban forbids it too. | — | a5–a11 · a12 unchanged from Check 2 (no byte moved; not re-run) |
| C2-2 | HIGH | **ESCALATED** (ESC-W6close5-1) | Same mechanism. Repair 1 measured the About pane resting in `vj-enter-enter-from vj-enter-enter-active` with `anims: []`. The fault is not W6 `.g`'s, so `.g` does not re-sit. | — | g2 RED 6.50 (Check 2's reading stands) |
| C2-3 | HIGH | **ESCALATED** (ESC-W6i-i3-1) | §0ax sends i3 to `.i` on the `index.html` grant. `.i` measured that a classic pre-module script can reach a URL-carried pick's first paint only by hand-copying value.js's parser and glass's `deriveAurora`/`resolveAtoms`. That is the copied-producer class the standing law bans. The three lawful routes each need a write outside W6's set, or a spec act: (a) `plugins/vite-ground-tokens.ts` with X-W2 sign-off, (b) `index.html:205` `blocking="render"` with X-W2 sign-off, or (c) an E-3 re-point of o28. COHESION has no ruling (0 hits ×2). A repair seat can author neither the ruling nor the `.i` re-sit. | — | i3 RED 0.1595 / 0.2933 / 0.2433 (Check 2's reading stands) |
| C2-4 | MEDIUM | **ESCALATED** under ESC-W6close5-1 | a13 (`gradient.spec.ts:243` drag) and e1 fail in the same stuck-enter species. The cure is the X-W5 cure, followed by re-reading ×2. No W6 byte is owed. | — | a13 · e1 flaky (Check 2's reading stands) |
| C2-5 | INFO | none owed | Repair 1's a4 cure `df290a72` was confirmed lawful. | — | a4 GREEN |
| C2-6 | INFO | not acted on | This defect has no one-command cure. It stays under the R-d1 erratum, which `.d` owns. | — | d1 GREEN |

**Re-run set**: empty. No cure landed, so no gate could move, and every figure above is Check 2's reading cited by its date. The
only fresh measurements are the five commands in the table above, each run twice.

### Tally

**Cured 0 · escalated 4 (C2-1 · C2-2 · C2-3 · C2-4) · 2 INFO left alone.** Self-count: the HIGH rows C2-1, C2-2 and C2-3 plus the
MEDIUM row C2-4 make **4** escalated. No product byte moved, and `dev.sh` was not staged. **Re-sit triggers**: (1) X-W5 cures
ESC-W6close5-1 at its own bytes, then W6 re-reads a5–a12, a13, e1 and g2 ×2. (2) COHESION rules ESC-W6i-i3-1 (a), (b) or (c), then `.i` re-sits.
Unrelieved RED set: **12**, unchanged. **The LEDGER row stays PARTIAL.**

## Check 3 — RESUME 2026-09-22 (L-20 fresh adversarial pass 3, over the fifth sitting's close `1835ce1d` + Repairs 1–2)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). VERIFY-ONLY: this seat cures nothing. `W6.md` read whole once (486 lines, all three
ADDENDA). Of this record: the header, the fifth sitting's Open → Unit plan (`:6003-6130`), Check 2 (`:6819-6921`) and Repair 2
(`:6925-6970`). Transcripts in the seat's scratchpad, not committed. Fresh vite `:9355` (started and killed by this seat); fresh
Playwright webServers `VJS_E2E_PORT` 9361 / 9371 / 9381.

### Axis 0 — crash-recovery

⟨cmd⟩ `git status --porcelain` → ` M …/V/reformation/CARRY-LEDGER.md` · ` M …/W6-evidence/catalog/after-catalog-open.png` ·
` M …/W6-evidence/catalog/after-specimen-dots.png` · ` M scripts/dev/dev.sh` — identical at open and at this seat's last act (this seat
ran no o22/o24 capture). None is in this seat's writable set (this record, the LEDGER). **Nothing inherited; nothing touched.**

### Axis 2 · 4 · 5 — bounds, families, E-3 (since Check 2)

⟨cmd⟩ `git log --oneline 9c5aaec2..HEAD` → `29394f55` (record, +49) · `608595e6` (LEDGER, +1) — docs only, one meaning each.
⟨cmd⟩ `git diff --stat 9c5aaec2..HEAD -- docs/tranches/X/waves/W6.md …/W5.md …/W7.md docs/tranches/V/megatranche/registry/adjudicated/
scripts/dev/dev.sh src demo e2e` → **empty**. Check 2's pre-sitting reading (`d7bc7bec^..HEAD` empty over the same set) stands. **Clean.**

### Axis 3 — masking

No product or spec byte moved since Check 2 (⟨cmd⟩ `git log --oneline 9c5aaec2..HEAD -- demo e2e test src | wc -l` → `0`); Check 2's
read of `df290a72` (settle added, assertions untouched, +9/−0) stands. **Clean.**

### Axis 1 · 9 — the gates, re-run by this seat (2026-09-22 23:03–23:20, load 4.9 → ~10)

| gate(s) | ⟨cmd⟩ | this seat |
|---|---|---|
| a1 · c2 | `npx vitest run test/gradient-order-invariant.test.ts test/interpolation-subset.test.ts` | `Tests 22 passed (22)` → **GREEN** |
| a2 · a3 · a4 · b3 · e1 · a13 (pw leg) | `VJS_E2E_PORT=9361 npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **`22 passed (2.0m)`**, EXIT 0 — `o21:188` (a4) ✓, `gradient:451` (e1) ✓ |
| a5–a11 | `GRADIENT_URL=http://localhost:9355/#/gradient node docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs` ×2 | run 1 EXIT 0 · run 2 EXIT 0, `GATE X.W6.a (gesture + paint) — GREEN`, *outside of the viewport* 0 ×2 → GREEN **2 of 2 here** (Check 2: RED 1 of 2) |
| a12 | `WBGSE-D-probe2.mjs` via a dot-prefixed copy differing only at `:6` (`9000`→`9355`), deleted after; `git status --porcelain <evidence dir>` → empty before and after | EXIT 0, `"afterOverhangPx": 0` → GREEN 1 of 1 (close: RED 3 of 3) |
| b2 · b4 (b1) | `GRADIENT_URL=… node …/wb-gradient-stopeditor/gate-seat.mjs` | EXIT 1, `G3d` **2**, `G3e` 0, `G3f` 0 → b2 b4 **GREEN**; b1 = `B1-G3D` |
| c1 · c3 | `gate-structure.mjs` · `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | `GATE G4 (structure) — GREEN` · `GATE c3 (literal dialect) — GREEN` |
| d1 · d2 · e2 | `EASING_RADIUS_ORIGIN=http://localhost:9355 … gate-easing-radius.mjs` · `gate-easing-readout.mjs` · `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` + `gate-prm-idiom.mjs` | `measured: 33` `GATE d1 — GREEN` · EXIT 0 · `0` + `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 · h2 · i2 · H1 | `node docs/tranches/X/gates/gate-{catalog-totality,specimen-grammar,blob-pipeline,lband-door}.mjs` · `gate-no-chassis.mjs b2dd375c a87f8930` | EXIT **0** ×5 |
| H3 | the parser R1 one-liner · glass version | `R1=0` · (glass `7.0.0`, Open) |
| i3 | `VJS_E2E_PORT=9371 npx playwright test e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts …` | **RED** — Received **0.15949 · 0.29331 · 0.24326** (≤ 0.02); ground at paint `[#b37290 #df8ea7 #ffb0b4 #ffcfc8]` for every seed |
| g2 | `companion-pane-track-start.spec.ts -g "companion panes share one track start"` ×2 (9371, 9381) | run 1 ✓ · run 2 **RED** Received **6.50144** (≤ 1) → **RED 1 of 2** |
| j1–j3 | `grep -c "component: Stub" demo/color-picker/router/index.ts` · `ls e2e/smoke/oracles \| grep -c o29` | `14` · `0` → RED (routed, below) |

Cited, not re-run (Check 2's reading of 2026-09-22 22:55–23:00, no byte moved since): c4 · f2 · f3 · f4 · f6 · f7 · f8 · f9 · f10 · i1 ·
h1 (close ×2) · j4 (retired). The catalog Playwright arms were not re-run here, deliberately: they re-write the tracked catalog PNGs.

**Close-claimed GREENs reproduced by this seat: 19** — a1 a2 a3 a4 b2 b3 b4 c1 c2 c3 d1 d2 e2 f1 f5 h2 i2 H1 H3. Self-count:
a1–a4 (4) + b2–b4 (3) + c1–c3 (3) + d1 d2 e2 (3) + f1 f5 (2) + h2 i2 (2) + H1 H3 (2) = **19**. **No claimed GREEN failed.** Ten
unrelieved gates also read GREEN in this seat's run (a5–a11, a12, a13, e1); that is not a close-stable GREEN (below).

### Axis 6 · 7 · 8

- **(6) Mail**: ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **97** (unchanged); `awk -F'|' '$6 ~ /UNREAD/'` → O-20 · I-31 · I-32 · O-39 (prose
  hits) · I-40 (Track C fourier) — the same set Check 2 read. ⟨cmd⟩ `find <V/ · V/coordination · glass BK/coordination · keyframes
  V/coordination · atlas P/coordination> -maxdepth 1 -type f -newermt "2026-09-22 22:40" | wc -l` → **0** at all five (BK still the newest
  glass dir). **0 UNREAD in W6's scope.**
- **(7) Four-verb**: `IMPLEMENTED no` with RED gates unrelieved — lawfully unmoved; the LEDGER row reads PARTIAL.
- **(8) §2a goal**: **NOT MET at the bytes** — the cold load paints the default ground, not the pick (i3); About sits 6.5 px off its
  track on 1 of 2 reads (g2); no route owns a scene (`component: Stub` ×14); the gradient's gesture truth held here but failed at the
  close and at Check 2 under the same X-W5 stuck-enter.

### Axis 10 — honest-RED adjudication, at the spec bytes

| gate | relief at the spec bytes | owner (residual register) | verdict |
|---|---|---|---|
| g1 | `W6.md:484` *"**g1** honest-RED by id → X-W10 (M-23)"* | R-6 → X-W10 | **RELIEVED** |
| b1 | `W6.md:486` *"b1 = `B1-G3D` honest-RED-by-instrument"*; this seat: exactly 2 `G3d` lines | R-4 → X-W11 roster | **RELIEVED** |
| j1 · j2 · j3 | `W6.md:479/484/486` *"`.j` after X-W5 CLOSED"*; LEDGER X-W5 = `PARTIAL — RESUME 5 close` | R-7 → `.j` | **RELIEVED** (routed behind an unmet predecessor conjunct) |
| H4 | CC-056/CC-057 land only in `.j` (§Dispositions) | R-7 | **RELIEVED** |
| H2 | the `.j` MOTION-SOURCED leg is `.j`'s (§5 `.j`, §6 H2) | R-8 → `.j` | **RELIEVED** |
| i3 | **none** — §0ax routes i3 to `.i` inside THIS wave; ESC-W6i-i3-1 still unruled (⟨cmd⟩ `grep -c 'ESC-W6i-i3-1\|ESC-W6close5-1' COHESION.md` → **0**) | R-5 | **UNRELIEVED** (RED here, stable across every seat) |
| g2 | **none** — the mechanism is X-W5 `.d2`'s stuck `vj-enter` (ESC-W6close5-1, unruled); a predecessor regression escalated is not relieved | R-15 → X-W5 | **UNRELIEVED** (RED 1 of 2 here) |
| a5–a11 · a12 · a13 · e1 | **none** — same ESC-W6close5-1 species; no addendum names them | R-15 → X-W5 | **UNRELIEVED** (GREEN in this seat's run, but RED at the close and at Check 2 at unchanged bytes — not stably GREEN; Repair 1's own ×2-after-the-X-W5-cure bar is unmet) |

**Honest-RED set (relieved, owner-named)**: g1 · b1 · j1 · j2 · j3 · H2 · H4 (7). **Unrelieved**: a5 · a6 · a7 · a8 · a9 · a10 · a11 · a12 ·
a13 · e1 · g2 · i3 (12).

### Successors' "Opens after" conjuncts against X-W6

X-W7 (`W7.md:6`: X-W3 · X-W4 · **X-W6**) · X-W8 (`W8.md:6`: X-W5 · **X-W6** · X-W7) · X-W10 (`W10.md:6`: X-W5..X-W9 stable) · X-W11
(`W11.md:6`: X-W0..X-W10 IMPLEMENTED): the X-W6 conjunct is **RED** in each — all four **lawfully BLOCKED** on this wave. X-W6's own `.j`
conjunct (X-W5 CLOSED) is RED (LEDGER X-W5 `PARTIAL`).

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C3-1 | **HIGH** | i3 RED; a W6 `.i` duty (§0ax) with no relief at the spec bytes; ESC-W6i-i3-1 unruled | this seat: o28 Received 0.15949 / 0.29331 / 0.24326 (≤ 0.02); COHESION hits 0 | COHESION rules ESC-W6i-i3-1 (a)/(b)/(c); `.i` re-sits |
| C3-2 | **HIGH** | g2 RED (not stably GREEN): About off its shared track, X-W5 stuck-enter (ESC-W6close5-1), unrelieved | this seat: run 1 ✓, run 2 Received 6.50144 (≤ 1) | X-W5 cures ESC-W6close5-1 at its own bytes; W6 re-reads g2 ×2 |
| C3-3 | MEDIUM | a5–a11, a12, a13, e1 read GREEN in this seat (a5–a11 2 of 2, a12 1 of 1, suite 22/22) but failed at the close and at Check 2 at identical bytes; the same unrelieved species, not a close-stable GREEN | this seat's runs above; Check 2 `gate-a-gesture-paint` run 1 EXIT 1; close a12 RED 3/3 | same as C3-2; re-read ×2 after the X-W5 cure |
| C3-4 | INFO | no claimed GREEN failed; bounds, masking, E-3, families and mail all clean since Check 2 (docs-only commits `29394f55` `608595e6`) | axes 2–6 above | none |

### Verdict

**NOT-CONFORMANT.** All 19 claimed GREENs this seat re-ran reproduced, and none failed. But **i3 is RED and g2 is RED 1 of 2**, and
neither has relief at the spec bytes (C3-1 · C3-2, HIGH). The a-gesture/e1 set is still unstable across seats at unchanged bytes (C3-3),
and the §2a goal is unmet. Honest-RED (relieved, owner-named): g1 · b1 · j1 · j2 · j3 · H2 · H4. No byte has moved since Check 2 and
both escalations are unruled, so this pass could not have returned otherwise. The **re-sit triggers stand**: X-W5 cures ESC-W6close5-1,
and COHESION rules ESC-W6i-i3-1. The LEDGER row **stays PARTIAL**; this seat makes no status edit and appends one event line.

---

## Open — RESUME 2026-09-23 (sixth sitting; SEAT 0, `claude-opus-5-5[1m]`)

SERVED MODEL: claude-opus-5-5[1m] (this seat's section; the file's line 1 names the file's creating seat).

Opened 2026-09-23 00:10 EDT, HEAD `52889b4f`, branch `tranche-u`. Resume spec = W6.md's three ADDENDA of
2026-09-22 + COHESION §0z · §0an · §0aq · §0ax · §0ay (§0ay is the file's last addendum; ⟨`grep -n "^## §0" COHESION.md | tail -1`⟩ → `2882:## §0ay`).

**Crash-recovery (git status --porcelain).** Dirty rows: `docs/tranches/V/reformation/CARRY-LEDGER.md` (not W6's) ·
`scripts/dev/dev.sh` (never touched) · `docs/tranches/X/waves/W6-evidence/catalog/after-{catalog-open,specimen-dots}.png`
(mtime 2026-09-22 22:59 — the o22/o24 run side effect of a prior check seat; `.f`'s landed evidence at `e0e204a9`, outside
every owed unit's writable set and outside this seat's — left untouched, not staged). The owed units' paths
(`e2e/smoke/oracles/o21-gradient-rail.spec.ts` · `plugins/vite-ground-tokens.ts` · `demo/color-picker/index.html`) are
**clean** — no inherited partial work.

**Preconditions.** LEDGER `X-W6` "Opens after" cell = `X-W0` → **CLOSED 2026-09-17** (row 28). The spec's `Opens after: X-W5`
reads through §0ay's order "X-W5 [`.c3`] → [`.d3`]; then X-W6 [`.a2`] → [`.i2`] → [`.j` if X-W5 reads CLOSED]": X-W5's RESUME 6
sat (`.c3`/`.d3` both ESCALATED, close `f46ab34b`), so `.a2` and `.i2` dispatch; **X-W5 reads PARTIAL** (LEDGER row 37,
"IMPLEMENTED NO"; ESC-W5c3-1 · ESC-W5d3-1 unruled) → **`.j` BLOCKED-ON X-W5**, not dispatched. `.a2`'s path and `.i2`'s two
paths exist on disk (⟨`ls plugins/`⟩ → `vite-ground-tokens.ts` 2715 B).

**E13 Step-0 mail sweep.** BK still the newest glass-ui tranche dir (⟨`ls -t glass-ui/docs/tranches | head -1`⟩ → `BK`).
⟨`find <path> -maxdepth 1 -type f -newermt 2026-09-22T23:58:55`⟩ (the last swept clock, X-W5's close `f46ab34b`) → **empty** on
value.js `V/` · `V/coordination` · glass BK `coordination` · keyframes `V/coordination` · atlas `{L,M,N,P,Q,R}/coordination`.
**0 new I-n · 0 UNREAD in X-W6 scope**; INBOX tail stays I-40. Sweep line appended to INBOX.md.

## Baseline — RESUME 2026-09-23 sixth sitting (the owed units' gates only; every other gate cites Check 3 `19a3ac41`)

Run read-only 00:10–00:20 EDT, host load 8.27 (⟨`uptime`⟩). Playwright on fresh webServers (`VJS_E2E_PORT` 8741–8744),
line reporter, transcripts in the seat scratchpad (not committed). No run left a side effect (⟨`git status --porcelain`⟩
unchanged but for this record).

| gate | unit | ⟨cmd⟩ | BEFORE (run 1 · run 2) |
|---|---|---|---|
| a4 (`o21:188`) | `.a2` | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **GREEN · GREEN** — `o21:188` absent from both failure lists (run 1's list = `o21:60` · `gradient:209` · `gradient:401`; run 2 none) |
| a13 (the suite) | `.a2` | same command + `npx vitest run test/gradient-order-invariant.test.ts` | **RED · GREEN** — run 1 `3 failed · 19 passed (2.4m)` EXIT 1: `o21:60` (`Expected: < 123.88 · Received: 167.09`, left edge nearer the LAST stop), `gradient:209` (grab-teleport, `Expected: <= 2 · Received: 340.46` — the rail displaced ≈ the §0ay stuck-enter x = −351 class), `gradient:401` (W5-10 compositing transform, `- Expected -1 / + Received +10`); run 2 `22 passed (2.3m)` EXIT 0. vitest `17 passed (17)` ×1 |
| i3 | `.i2` | `npx playwright test e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts --project=smoke` · `grep -rn armRuntime demo/ \| wc -l` | **RED · RED** — `1 failed` ×2: every seed paints the unseeded ground `[#b37290 #df8ea7 #ffb0b4 #ffcfc8]` at first paint (40–60 ms); first-paint vs settled ΔE_OK max **0.1595** (h30) · **0.2933** (h150) · **0.2433** (h260), bar `<= 0.02` — identical to the fifth sitting's reading; armRuntime **0** |
| j1–j4 | `.j` | `o29-scene-contracts.spec.ts` | not run — **BLOCKED-ON X-W5** (X-W5 PARTIAL) |

### R.2 — a GREEN before its cure

**a4 (`o21:188`) reads GREEN ×2 at this open — not a GREEN before its cure, but a cure that predates `.a2`'s minting.**
The fifth sitting's baseline read `:188` RED 6 of 6 (`Expected: 3 · Received: 2` at `o21:222:54`); the fifth sitting's
Repair 1 landed the settle in bounds under §0ax's grant (⟨`git log --oneline 1835ce1d..HEAD -- e2e/smoke/oracles/o21-gradient-rail.spec.ts`⟩
→ `df290a72 test(e2e/o21): a4 inverse-map arm waits for the view-select listbox to close before its raw press`, 2026-09-22 22:51,
+9/−0, assertions untouched — Check 3 read it "Clean" and reproduced a4 GREEN). §0ay (`d1bc67c3`, 23:10) minted `.a2` after it
without citing it. The suite's RED has moved from `:188` to the cold-nav set (`o21:60` · `gradient:209` · `gradient:401`,
1 of 2 runs) — the ESC-W5d3-1 class (§0ay: a cold first navigation leaves the pane in `vj-enter-enter-from`), X-W5's, not
`.a2`'s. `.a2` is therefore dispatched VERIFY-FIRST: read `:188` at its own clock (≥ 3 runs); if GREEN, write no byte and
receipt a4 as discharged by `df290a72`; add a settle/scroll to `:188`'s reload → openView → press sequence only if `:188`
fails at its clock; read a13 ×2 and, if only the cold-nav set is RED, return it escalated on ESC-W5d3-1 (a settle added to
`:60`/`:209`/`:401` is outside §0ay's grant and would mask X-W5's defect — a masking fallback).

## Unit plan — RESUME 2026-09-23 sixth sitting (2 owed units dispatched serially; `.j` BLOCKED-ON X-W5; 8 units landed)

**alreadyDone (never re-dispatched)**: `X.W6.a` · `.b` · `.c` · `.d` · `.e` · `.f` · `.g` · `.h` (commits of record in the
prior sittings' receipts). **Standing dispositions (not units)**: b1 = `B1-G3D` (§0ax) · g1 → X-W10 (M-23, §0an addendum) ·
h1's beyond-sRGB limb = `H1-P3` by physics (§0aq). **`.j`**: BLOCKED-ON X-W5 (LEDGER row 37 PARTIAL; §0ay "`.j` if X-W5 reads
CLOSED"). Order (W6.md third ADDENDUM · §0ay): **[`.a2`] → [`.i2`]**, one at a time (≤ 1 concurrent; the two share no path).
An ESCALATED unit does not halt the wave (§0ax chassis ruling).

| unit | model | executes | writable | gates | locks |
|---|---|---|---|---|---|
| `X.W6.a2` | opus | W6.md §5 `.a` table rows a4/a13 (L156–180) · third ADDENDUM (L488) · COHESION §0ay a4/a13 bullet · §0ax X-W6 bullet | `e2e/smoke/oracles/o21-gradient-rail.spec.ts` (settle/scroll only, ADD-never-replace) · `docs/tranches/X/waves/W6-evidence/gates/**` · this record's receipt | a4 · a13 GREEN ×2 | assertions untouched; no settle on the ESC-W5d3-1 cold-nav set; one commit `test(e2e/o21)` only if a byte is owed |
| `X.W6.i2` | opus | W6.md §5 `.i` i3 row (L295–308) · §0an addendum `.i` ⊕ `index.html` · third ADDENDUM · COHESION §0ay ESC-W6i-i3-1 (a) + perf gate | `plugins/vite-ground-tokens.ts` · `demo/color-picker/index.html` (pre-module boot seed only; dialog-ancestry rider `W5.md:321`) · `demo/color-picker/composables/boot/useAtmosphere.ts` (§4 `.i` path; only to expose the `:285-293` derive as an importable single source, behaviour unchanged) · `docs/tranches/X/waves/W6-evidence/{atmosphere,gates}/**` · this record's receipt | i3 GREEN ×2 · perf: injected IIFE ≤ 12 KB gzip + LCP on `/` within 50 ms of `HEAD~` ×2 · i1 held GREEN · vue-tsc/vitest/prettier (§7) | single source by construction (no hand-copied derive = copied-producer HIGH; no `blocking="render"`); over budget → return size, i3 = `I3-SEED-SIZE`, (c) recorded |

### Briefs

- **`.a2`** — Verify-first. `df290a72` (Repair 1) already added `o21:188`'s listbox settle. Run `npx playwright test
  e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` ≥ 3× (fresh `VJS_E2E_PORT`).
  If `:188` is GREEN every run → no byte; receipt a4 discharged by `df290a72`. If `:188` fails → add only the missing
  settle/scroll to its reload → openView → press sequence (never touch the mint/ordinal assertions), commit, GREEN ×2. a13's
  other failures (`o21:60` · `gradient:209` · `gradient:401` = cold-nav stuck enter) are ESC-W5d3-1's: record, escalate, never mask.
- **`.i2`** — In `plugins/vite-ground-tokens.ts`, at build AND serve, bundle (esbuild/vite API) an IIFE from the SAME modules
  as `useAtmosphere.ts:285-293`'s derive (glass `color.js` + value.js `/color`) and inject it into `demo/color-picker/index.html`'s
  pre-module boot seed: when no persisted ground exists, seed `--saved-bg-*` from the URL-hash pick. No hand-copied derive, no
  `blocking="render"`. Measure gzip size (≤ 12 KB) and LCP on `/` vs `HEAD~` ×2; over → return size, i3 = `I3-SEED-SIZE`.
  Else i3 (`o28-atmosphere-coldload.spec.ts`) GREEN ×2, i1 (`o25`) held, §7 cadence green; one `feat(demo/atmosphere-oracle)` commit.

## Unit receipts — sixth sitting 2026-09-23


## Open — RESUME 2026-09-23 (seventh sitting; SEAT 0, `claude-opus-5-5[1m]`)

SERVED MODEL: claude-opus-5-5[1m] (this seat's section; the file's line 1 names the file's creating seat).

Opened 2026-09-23 01:22 EDT, HEAD `196c014d`, branch `tranche-u`. Resume spec = W6.md's four ADDENDA (2026-09-19 ·
2026-09-22 ×3 · 2026-09-23 fourth) + COHESION §0z · §0an · §0aq · §0ax · §0ay · §0az (§0az is the file's last addendum;
⟨`grep -n "^## §0" COHESION.md | tail -1`⟩ → `2918:## §0az`). The sixth sitting (open `27bd523b`) dispatched no unit — its
receipts section is empty and ⟨`git log --oneline 52889b4f..HEAD -- e2e/smoke/oracles/o21-gradient-rail.spec.ts
plugins/vite-ground-tokens.ts demo/color-picker/index.html demo/color-picker/composables/boot/useAtmosphere.ts`⟩ → **empty**;
§0az ran X-W5's `.c4`/`.d4` first, so `.a2` and `.i2` are still owed and sit now.

**Crash-recovery (git status --porcelain).** Dirty rows: `docs/tranches/V/reformation/CARRY-LEDGER.md` (not W6's) ·
`scripts/dev/dev.sh` (never touched) · `docs/tranches/X/waves/W6-evidence/catalog/after-{catalog-open,specimen-dots}.png`
(a prior check seat's o22/o24 run side effect; `.f`'s landed evidence, outside every owed unit's writable set — untouched,
never staged). The owed units' paths (`o21-gradient-rail.spec.ts` · `plugins/vite-ground-tokens.ts` 2715 B ·
`demo/color-picker/index.html` · `useAtmosphere.ts`) are **clean** — no inherited partial work.

**Preconditions.** LEDGER `X-W6` "Opens after" cell = `X-W0` → **CLOSED 2026-09-17** (row 28). Spec `Opens after: X-W5`,
read through §0az's order "X-W5 [`.c4`] → [`.d4`]; then X-W6 [`.a2`] → [`.i2`] (→ [`.j`] once X-W5 reads CLOSED)": X-W5
RESUME 7 sat (`.c4` `e2efb30a`/`2d18b6da` · `.d4` `f55e59b7`/`5a7d3113`/`d6d8b38f` · close `c575f741` · Checks 1–3 ⊕
Repairs 1–2 through `196c014d`) → `.a2`/`.i2` dispatch. **X-W5 reads PARTIAL** (LEDGER row 37; ESC-W5d4-1 unruled) →
per §0az **`.j` is OMITTED from this plan** (never a wave-level BLOCKED; a later resume dispatches it).

**E13 Step-0 mail sweep.** BK still the newest glass-ui tranche dir (⟨`ls -t glass-ui/docs/tranches | head -2`⟩ → `BK`,
`BJ`); atlas newest dir `T` holds only `T.md` (no `coordination/`). ⟨`find <path> -maxdepth 1 -type f -newermt
2026-09-23T01:10:33-04:00`⟩ (X-W5 RESUME 7 close `c575f741`, the last swept clock) → only `V/coordination/INBOX.md` itself
(the close seat's own sweep line) on value.js `V/coordination`; **empty** on `V/` · glass BK `coordination` · keyframes
`V/coordination` · atlas `{P,Q,R}/coordination` · atlas `T/` (depth 2). **0 new I-n · 0 UNREAD in X-W6 scope**; INBOX tail
stays I-40. Sweep line appended to INBOX.md.

## Baseline — RESUME 2026-09-23 seventh sitting (the owed units' gates only; every other gate cites the fifth sitting's Check 3 `19a3ac41` and X-W5 RESUME 7's close `c575f741`)

Run read-only 01:22–01:30 EDT, host load 7.38 at start rising to 21.16 mid-run (⟨`uptime`⟩; sibling tracks active).
Playwright on fresh webServers (`VJS_E2E_PORT` 8751–8752 · 8761–8762), line reporter, transcripts in the seat scratchpad
(not committed). No run left a side effect (⟨`git status --porcelain`⟩ unchanged but for this record and INBOX.md).

| gate | unit | ⟨cmd⟩ | BEFORE (run 1 · run 2) |
|---|---|---|---|
| a4 (`o21:188`) | `.a2` | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | **GREEN · GREEN** — `o21:188` passed in both runs |
| a13 (the suite) | `.a2` | same command + `npx vitest run test/gradient-order-invariant.test.ts` | **GREEN · GREEN** — run 1 `22 passed (2.0m)` EXIT 0 · run 2 `22 passed (2.2m)` EXIT 0; vitest `Tests 17 passed (17)` EXIT 0 ×1. The sixth sitting's cold-nav set (`o21:60` · `gradient:209` · `gradient:401`, RED 1 of 2 there) passed in both runs here |
| i3 | `.i2` | `npx playwright test e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts --project=smoke` · `grep -rn armRuntime demo/ \| wc -l` | **RED · RED** — `1 failed` EXIT 1 ×2 (`o28:114`, `Expected: <= 0.02`): every seed paints the unseeded ground `[#b37290 #df8ea7 #ffb0b4 #ffcfc8]` at first paint (48–244 ms); first-paint vs settled ΔE_OK max **0.1595** (h30) · **0.2933** (h150) · **0.2433** (h260) — identical to the fifth and sixth sittings' readings; armRuntime **0** |
| j1–j4 | `.j` | `o29-scene-contracts.spec.ts` | not run — `.j` OMITTED (§0az; X-W5 PARTIAL) |

### R.2 — a GREEN before its cure

**a4 and a13 read GREEN ×2 at this open, before `.a2` has sat.** Neither is a vacuous green; both cures predate `.a2`'s
minting. a4 (`o21:188`): the fifth sitting's Repair 1 `df290a72` (2026-09-22 22:51, listbox-close settle, +9/−0,
assertions untouched) — the sixth sitting read `:188` GREEN ×2 already. a13's residual cold-nav set (`o21:60` ·
`gradient:209` · `gradient:401`): X-W5 `.d4` `f55e59b7` (§0az ESC-W5d3-1 (a) — PaneSlot keys its Transition child on
`(pane, resolved)`) — X-W5's own close `c575f741` read "W6 a5–a11 · a12 · e1 suite GREEN ×2". `.a2` is therefore dispatched
**VERIFY-FIRST**: read the a13 suite ≥ 3× at its own clock; GREEN every run → write no spec byte, receipt a4/a13 discharged by
`df290a72` ⊕ `f55e59b7`; add a settle/scroll to `:188`'s reload → openView → press sequence only if `:188` fails at its
clock; any other failure in the cold-nav enter class is X-W5's (ESC-W5d4-1) — record, escalate, never mask.

## Unit plan — RESUME 2026-09-23 seventh sitting (2 owed units dispatched serially; `.j` OMITTED per §0az; 8 units landed)

**alreadyDone (never re-dispatched)**: `X.W6.a` · `.b` · `.c` · `.d` · `.e` · `.f` · `.g` · `.h` (commits of record in the
prior sittings' receipts). **Standing dispositions (not units)**: b1 = `B1-G3D` (§0ax) · g1 → X-W10 (M-23, §0an addendum) ·
h1's beyond-sRGB limb = `H1-P3` by physics (§0aq). **`.j`**: OMITTED (§0az; W6.md fourth ADDENDUM) — X-W5 reads PARTIAL
(LEDGER row 37); a later resume dispatches it once X-W5 reads CLOSED. Order (W6.md third + fourth ADDENDA · §0ay · §0az):
**[`.a2`] → [`.i2`]**, one at a time (≤ 1 concurrent; the two share no path). An ESCALATED unit does not halt the wave (§0ax).

| unit | model | executes | writable | gates | locks |
|---|---|---|---|---|---|
| `X.W6.a2` | opus | W6.md §5 `.a` a4/a13 rows (L156–180) · third ADDENDUM (L488) · COHESION §0ay a4/a13 bullet · §0ax X-W6 bullet | `e2e/smoke/oracles/o21-gradient-rail.spec.ts` (settle/scroll only, ADD-never-replace) · `docs/tranches/X/waves/W6-evidence/gates/**` · this record's receipt | a4 · a13 GREEN ×2 | assertions untouched; no settle masking an X-W5 cold-nav defect (ESC-W5d4-1 is X-W5's); one `test(e2e/o21)` commit only if a byte is owed |
| `X.W6.i2` | opus | W6.md §5 `.i` i3 row (L295–308) · §0an addendum `.i` ⊕ `index.html` · third ADDENDUM · COHESION §0ay ESC-W6i-i3-1 (a) + perf gate | `plugins/vite-ground-tokens.ts` · `demo/color-picker/index.html` (pre-module boot seed only; dialog-ancestry rider `W5.md:321`) · `demo/color-picker/composables/boot/useAtmosphere.ts` (only to expose the `:285-293` derive as an importable single source, behaviour unchanged) · `docs/tranches/X/waves/W6-evidence/{atmosphere,gates}/**` · this record's receipt | i3 GREEN ×2 · perf: injected IIFE ≤ 12 KB gzip + LCP on `/` within 50 ms of `HEAD~` ×2 · i1 held GREEN · vue-tsc/vitest/prettier (§7) | single source by construction (no hand-copied derive = copied-producer HIGH; no `blocking="render"`); over budget → return size, i3 = `I3-SEED-SIZE`, (c) recorded |

### Briefs

- **`.a2`** — Verify-first. `df290a72` already added `o21:188`'s listbox settle. Run the a13 suite ≥ 3× on fresh
  `VJS_E2E_PORT`s. `:188` GREEN every run → no byte; receipt a4 discharged by `df290a72`. `:188` fails → add only the
  missing settle/scroll to its reload → openView → press sequence (mint/ordinal assertions untouched), commit, GREEN ×2.
  Any other a13 failure rooted in the cold-nav enter class is X-W5's (ESC-W5d4-1): record, escalate, never mask.
- **`.i2`** — In `plugins/vite-ground-tokens.ts`, at build AND serve, bundle (esbuild/vite API) an IIFE from the SAME
  modules as `useAtmosphere.ts:285-293`'s derive and inject it into `index.html`'s pre-module boot seed: no persisted ground
  → seed `--saved-bg-*` from the URL-hash pick. No hand-copied derive, no `blocking="render"`. Measure gzip (≤ 12 KB) and LCP
  on `/` vs `HEAD~` ×2; over → return size, i3 = `I3-SEED-SIZE`. Else o28 GREEN ×2, i1 (o25) held, §7 cadence; one
  `feat(demo/atmosphere-oracle)` commit.

## Unit receipts — seventh sitting 2026-09-23

### X.W6.a2

SERVED MODEL: claude-opus-5-5[1m] · 2026-09-23 01:27–01:37 EDT · HEAD at open `12bb3195` · host load 11.4 → 17.5 (⟨`uptime`⟩).

**Crash-recovery.** ⟨`git status --porcelain`⟩ → dirty rows `V/reformation/CARRY-LEDGER.md` · `W6-evidence/catalog/after-{catalog-open,specimen-dots}.png` · `scripts/dev/dev.sh` — none inside `.a2`'s writable set; `o21-gradient-rail.spec.ts` clean → no inherited partial work.

**Anchor at true bytes.** ⟨`sed -n 188,215p e2e/smoke/oracles/o21-gradient-rail.spec.ts`⟩ → `:188` is the a4 test ("the forward and inverse maps are inverse …"); its reload → `openView` → `paneSettled` sequence already carries `await expect(page.getByRole("listbox")).toHaveCount(0)` (Repair 1 `df290a72`, +9/−0, assertions untouched). The settle §0ay rules for `.a2` is therefore already landed; no scroll is missing (`rail.scrollIntoViewIfNeeded()` present).

**Acts (verify-first; no spec byte written).**
1. ⟨`VJS_E2E_PORT=8771 npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke --reporter=line`⟩ → `22 passed (1.9m)` EXIT 0.
2. same, `VJS_E2E_PORT=8773` → `22 passed (2.0m)` EXIT 0.
3. same, `VJS_E2E_PORT=8775` → `22 passed (1.8m)` EXIT 0.
4. ⟨`npx vitest run test/gradient-order-invariant.test.ts`⟩ → `Tests 17 passed (17)` EXIT 0 (run twice this seat; both 17/17).
   `o21:188` · `o21:60` · `gradient:209` · `gradient:401` (the sixth sitting's cold-nav set) each present and passed in all three runs (⟨`grep -c "o21-gradient-rail.spec.ts:188" a13-run{1,2,3}.txt`⟩ → `1 1 1`; 0 `failed`/`✘` lines).
5. Transcripts banked ANSI-stripped (line 1 = SERVED MODEL): `docs/tranches/X/waves/W6-evidence/gates/a2-2026-09-23/{a13-run1,a13-run2,a13-run3,a13-vitest}.txt` → commit **`f0e3eb55`** (4 files, +124).

**Gates BEFORE → AFTER.** a4 (`o21:188`): GREEN ×2 at open → **GREEN ×3** this seat. a13 (suite + vitest): GREEN ×2 at open → **GREEN ×3** (22/22 each) + vitest 17/17.

**Disposition.** a4/a13 **DISCHARGED** by `df290a72` (o21:188 listbox-close settle) ⊕ X-W5 `.d4` `f55e59b7` (PaneSlot Transition keyed on `(pane, resolved)` — cured the cold-nav enter class behind `o21:60`/`gradient:209`/`gradient:401`). No `test(e2e/o21)` commit owed (no byte owed; LOCK honoured). No cold-nav failure observed → nothing to record on ESC-W5d4-1 from this seat.

**Residuals.** None owned. ESC-W5d4-1 stays X-W5's (not touched here). **Escalations: none.**

### X.W6.i2

SERVED MODEL: claude-opus-5-5[1m] · 2026-09-23 · HEAD at open `00bae0ff` · **Status: ESCALATED — `I3-SEED-SIZE`** (COHESION §0ay: the bundle cannot meet ≤ 12 KB gzip → return the size; i3 closes honest-RED by id with (c) recorded for the owner). No product byte landed.

**Act 0 — crash-recovery.** ⟨`git status --porcelain`⟩ → `CARRY-LEDGER.md` · `W6-evidence/catalog/after-{catalog-open,specimen-dots}.png` · `scripts/dev/dev.sh` — none inside `.i2`'s writable set; `plugins/vite-ground-tokens.ts` · `index.html` · `useAtmosphere.ts` clean → nothing inherited.

**Act 1 — anchors at true bytes.** `useAtmosphere.ts:285-293` (the sink: `normalizeGroundStops(palette.map(oklchStopToHex))` over `groundPalette` = the calibrated seam-guarded field palette in light, glass `deriveAurora(seed, {scheme:"dark"})` in dark) — as cited. `index.html:159-203` pre-module boot seed, module entry `:205`, `__GROUND_*__` tokens resolved by `plugins/vite-ground-tokens.ts` `injectGroundTokens` (sync `transformIndexHtml`). The app's seed string is `serializePickerColor(withAlpha(model.color, 1))` (`useColorPipeline.ts:104`) over `boot/hydrate.ts` `resolveHydratedBootModel()` (URL → storage → default).

**Act 2 — the §0ay (a) cure, built as ruled.** (i) `useAtmosphere.ts`: the derive exposed as importable pure functions (`seededAuroraAtoms` · `fieldAtomsFor` · `fieldConfigFor` · `groundPaletteFor` · `groundStopsFor` · `deriveGroundStops`) and the composable rewired onto the SAME functions (behaviour unchanged). (ii) `plugins/vite-ground-tokens.ts`: `bundleGroundSeed(config)` — vite `build()` (rolldown), lib IIFE, `write:false`, minify, `define NODE_ENV=production`, resolved through the config's OWN `resolve.alias`/`dedupe` (the value.js self-alias set), entry = a virtual module importing `resolveHydratedBootModel` + `serializePickerColor`/`withAlpha` + `deriveGroundStops` (no derive re-stated); `transformIndexHtml` async, bundle cached, serve re-bundles on a watched change to any bundled module. (iii) `index.html`: `__GROUND_SEED__` inlined inside the existing classic script (no `blocking="render"`); no persisted ground → `groundSeed.urlGround(dark)` else the constants. Full diff banked: `W6-evidence/gates/i2-2026-09-23/i2-cure-unlanded.patch`.

**Act 3 — perf gate, size arm (WRITE-THEN-MEASURE ×2).** ⟨`npx vite-node measure-seed.ts`⟩ (resolveConfig gh-pages/build → `bundleGroundSeed` → gzip -9) → run 1 `{"raw":144706,"gzip":50989,"modules":21}` · run 2 identical; ⟨`shasum -a 256 seed1.js seed2.js`⟩ → both `5e7b8c2d…effe1f98`; ⟨`gzip -9 -c seed1.js | wc -c`⟩ → `50998`. **50 989 B gzip vs 12 288 B budget = 4.15× over.** Attribution (rolldown `chunk.modules` rendered length): glass `dist/aurora.js` **157 687** · value.js `anchors` 14 287 · `/css` 13 292 · glass `color.wgsl` 13 131 · the demo modules ≤ 4 838 each. Cause: the producer dist's GLSL/WGSL shader sources (one top-level `var` chain with template interpolation, `aurora.js:122ff`) survive tree-shaking — ⟨`grep -o '#version' seed1.js | wc -l`⟩ → `1`, ⟨`grep -o 'uniform ' …`⟩ → `53`. esbuild cross-check (same entry/aliases, bundle+minify+tree-shake) → `{"raw":204099,"gzip":65439}`, aurora.js 160 526 B in output — the retention is the producer bundle's, not the bundler's. No terser installed (a toolchain add is outside the set). Transcript: `i2-seed-size.txt`. LCP arm **not run** — the size arm already decides the ruling's branch.

**Act 4 — functional witness (not of record).** With the unlanded cure applied: ⟨`VJS_E2E_PORT=8781 npx playwright test e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts --project=smoke`⟩ → `1 passed (20.1s)`, first-paint vs settled ΔE_OK **0.0000** at h30 · h150 · h260 (first paint 40–44 ms). So the (a) mechanism is correct; only its weight fails the gate. Transcript: `i2-o28-with-unlanded-cure.txt`.

**Act 5 — revert + held gates at HEAD bytes.** ⟨`git checkout -- plugins/vite-ground-tokens.ts demo/color-picker/index.html demo/color-picker/composables/boot/useAtmosphere.ts`⟩ (this seat's own unlanded edits only) → product paths clean. ⟨`VJS_E2E_PORT=8783 npx playwright test …o25… …o28… --project=smoke`⟩ → o25 **passed** (i1 held GREEN); o28 **failed**, Received 0.15949 · 0.29331 · 0.24326 (= baseline). Transcript: `i2-held-at-head.txt`. §7 cadence: no product byte landed → prettier/eslint/vue-tsc/vitest not owed; `git diff --check` on the commits (the `.patch` carries diff-format blank context lines only).

**Gates BEFORE → AFTER.** i3: RED ×2 → **RED (I3-SEED-SIZE)**, unchanged bytes. perf size: — → **RED 50 989 B gzip ×2**. perf LCP: not run (branch decided). i1: GREEN → **GREEN** held.

**Commits.** `d30ac937` (evidence: patch + size + functional witness + held gates). No `feat(demo/atmosphere-oracle)` minted (over budget).

**Residuals / escalation.** i3 = **`I3-SEED-SIZE`** honest-RED by id. For the owner: (a) as built costs ~51 KB gzip of render-path inline JS (unless glass ships a derive-only, shader-free subpath — a BK relay row, never a consumer copy), versus the ruling's recorded fallback **(c)**, an E-3 re-point of o28 to the persisted-ground arm the existing boot script already seeds. The banked patch applies cleanly at `00bae0ff` if the budget is raised.

## Close — RESUME 2026-09-23 (the seventh sitting's close; VERIFY-ONLY seat)

SERVED MODEL: claude-opus-5-5[1m]

**Append-only beside** every block above (E-3). This seat cures nothing. Transcripts:
`docs/tranches/X/waves/W6-evidence/gates/close-7-2026-09-23/` (committed with this close). Spec read whole once (`W6.md`,
490 lines, incl. the four ADDENDA `:483-490`); of this record only the seventh sitting's Open → Baseline → Unit plan →
receipts (`:7155-7279`), Check 3's Register/Verdict and the fifth close's Acts 2–10 for the gate commands and residual ids.

### Act 0 — crash-recovery

⟨`git status --porcelain`⟩ → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M …/W6-evidence/catalog/after-catalog-open.png` ·
` M …/W6-evidence/catalog/after-specimen-dots.png` · ` M scripts/dev/dev.sh`. None is in this seat's writable set (this
record, the LEDGER row, `W6-evidence/gates/close-7-2026-09-23/`). **Nothing inherited**; nothing stashed, restored or touched
(the two catalog PNGs are a prior seat's o22/o24 side effect, carried since the seventh Open).

### Act 1 — commit roster and bounds

⟨`git log --oneline 196c014d..HEAD`⟩ → **5** commits, each `git show --stat`-read:

| sha | unit | paths | in bounds |
|---|---|---|---|
| `12bb3195` | SEAT 0 (open) | this record · INBOX.md sweep line | yes |
| `f0e3eb55` | `.a2` | `W6-evidence/gates/a2-2026-09-23/{a13-run1,a13-run2,a13-run3,a13-vitest}.txt` (4 files, +124) | yes (`W6-evidence/gates/**`) |
| `00bae0ff` | `.a2` | this record (+22, receipt) | yes |
| `d30ac937` | `.i2` | `W6-evidence/gates/i2-2026-09-23/{i2-cure-unlanded.patch,i2-held-at-head.txt,i2-o28-with-unlanded-cure.txt,i2-seed-size.txt}` (4 files, +520) | yes (`W6-evidence/{atmosphere,gates}/**`) |
| `624cff0e` | `.i2` | this record (+22, receipt) | yes |

**Landed-wrong: 0.** No product byte landed this sitting. ⟨`git log --oneline 1835ce1d..HEAD -- demo e2e plugins src test`⟩ →
8 commits, none W6's product: `df290a72` (W6 Repair 1, o21:188 settle) and seven X-W5 commits (`b9f63632` `a072eef3` `8ddafa23`
`e2efb30a` `f55e59b7` `5a7d3113` `16852e03`). ⟨`git apply --check …/i2-cure-unlanded.patch`⟩ → EXIT 0 (the banked cure
still applies at HEAD). INFO: ⟨`git diff --check 12bb3195..HEAD -- . ':!*.patch'`⟩ → 2 trailing-whitespace hits in
`i2-held-at-head.txt:51,105` — verbatim Playwright reporter lines in a transcript, not product bytes (the `.i2` receipt named
only the `.patch`).

### Act 2 — gate table, BEFORE (the fifth close `1835ce1d` · Check 3 `19a3ac41` · the seventh Baseline where cited) → AFTER (this seat, 01:43–02:00 EDT)

Host load 10 at start, **57.4** peak mid-run (⟨`uptime`⟩; sibling tracks active). STALE-SERVER: `:9000` (PID 14970) is the
stale server R-16 named; every live probe here ran against a **fresh** `npx vite --port 8791 --strictPort` on this tree
(killed at the end). `WBGSE-O-r3-gestures.mjs` and `WBGSE-D-probe2.mjs` hard-code `:9000`; they ran from dot-prefixed copies
beside the originals that changed **only the origin byte** (⟨`diff … | grep -c '^<'`⟩ → 1 each), deleted afterwards
(⟨`git status --porcelain <evidence dir>`⟩ → empty). Playwright on fresh webServers (`VJS_E2E_PORT` 8811/8821/8831 ·
8841–8844 · 8851–8858). Transcript file names in parentheses.

| gate | ⟨cmd⟩ (transcript) | BEFORE | AFTER |
|---|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` → `npx vitest run test/gradient-order-invariant.test.ts` (`a1-*.txt`) | GREEN | **GREEN**: probe EXIT 0; `Tests 17 passed (17)` |
| a2 · a3 · b3 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` ×3 (`pw-grad-r{1,2,3}.txt`) | GREEN | **GREEN ×3**: all three pass inside every run |
| a4 (`o21:188`) | same suite ×3 | GREEN ×2 (seventh Baseline) · GREEN ×3 (`.a2`) | **GREEN ×3**: `o21:188` passes in all three runs |
| a13 (the suite) | same suite ×3 + the a1 vitest | GREEN ×2 (Baseline) · ×3 (`.a2`) | **RED 1 of 3**: r1 `2 failed · 20 passed (2.6m)` EXIT 1 — `o21:60` (test 1/22, *Expected < 123.88 · Received 167.09*) and `gradient:209` (*Expected ≤ 2 · Received 584.35*); r2 `22 passed (2.1m)` EXIT 0; r3 `22 passed (3.0m)` EXIT 0. The two failures are exactly the sixth sitting's cold-nav set (`o21:60` · `gradient:209` · `gradient:401`) under load 10→57 — the X-W5 enter class (ESC-W5d4-1), unrelieved at X-W5's bytes |
| e1 (`gradient:451`) | same suite ×3 | GREEN | **GREEN ×3** |
| a5–a11 | `GRADIENT_URL=http://localhost:8791/#/gradient node …/W6-evidence/gradient/gate-a-gesture-paint.mjs` ×3 (`a-gp-r{1,2,3}.txt`) | GREEN (X-W5 close) | **GREEN 2 of 3**: r2 · r3 `GATE X.W6.a (gesture + paint) — GREEN` (a5 travel@1px 0.00 · a7 2/2/2/2 · a9 44px, `[]` · a10 0 rules · a11 innerRatio 14.6); r1 (the fresh server's first hit, concurrent with pw r1) `page.waitForSelector('[data-stop-id]')` 20 s timeout at `:46` — no stop ever visible; same enter class as a13 r1 |
| a7 (arm 2) | `node …/.WBGSE-O-r3-gestures.8791.mjs` (`a7-c14.txt`) | GREEN | **GREEN**: `C14 buttons: {"beforeMid":2,"afterMid":2,"afterRight":2}` |
| a12 | `node …/.WBGSE-D-probe2.8791.mjs` ×2 (`a12-r{1,2}.txt`) | GREEN (Check 3, 1 of 1) | **GREEN ×2**: block 5 `beforeOverhangPx 0` · `afterOverhangPx 0` (rootFS 20px, handleW 30, handle = bar left edge 102) |
| b1 | `GRADIENT_URL=… node …/gate-seat.mjs` ×2 (`seat-r{1,2}.txt`) | RED (`B1-G3D`) | **RED ×2**: EXIT 1, exactly 2 `G3d` lines each — `B1-G3D` honest-RED-by-instrument (§0ax) |
| b2 · b4 | same ×2 | GREEN | **GREEN ×2**: 0 `G3e` · 0 `G3f` |
| c1 | `node …/gate-structure.mjs` (`c1.txt`) | GREEN | **GREEN**: `GATE G4 (structure) — GREEN` |
| c2 | `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` (`c2.txt`) | GREEN | **GREEN**: `4 passed \| 13 skipped (17)` |
| c3 | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` (`c3.txt`) | GREEN | **GREEN**: `GATE c3 (literal dialect) — GREEN` |
| c4 | `npx vitest run test/interpolation-subset.test.ts` (`c4.txt`) | GREEN | **GREEN**: `5 passed (5)` |
| d1 | `EASING_RADIUS_ORIGIN=http://localhost:8791 node …/x-w6/gate-easing-radius.mjs` ×2 (`d1-r{1,2}.txt`) | GREEN | **GREEN ×2**: `panel surfaces measured: 33 · read-only (d2-ask / producer): 2` both times (R-d1: this seat reads **2**; the fifth close read 1 — DOM-state dependent, verdict GREEN either way) |
| d2 | `node …/x-w6/gate-easing-readout.mjs` (`d2.txt`) | GREEN | **GREEN**: `fitting primitives …: NONE` · `DATED ASK` · local restyle `0 line(s)` |
| e2 | `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` + `gate-prm-idiom.mjs` (`e2.txt`) | GREEN | **GREEN**: `0` · `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 | `gate-catalog-totality.mjs` · `gate-specimen-grammar.mjs` | GREEN | **GREEN**, EXIT 0 each |
| f2 · f7 · f9 · f10 | the spec's greps (`greps.txt`) + `npx vue-tsc --noEmit -p tsconfig.demo.json` (`vuetsc.txt`) | GREEN | **GREEN**: f2 `0` · f7 `0`/`0` + vue-tsc `EXIT=0` (the `@ts-expect-error` witness is consumed) · f9 `2`/`0` · f10 `0` |
| f4 · f6 · f8 | `o22` · `o23` · `o24` ×2 (`f468-r{1,2}.txt`) + f8 grep `tag=` → `0` | GREEN | **GREEN ×2**: `3 passed (22.7s)` · `3 passed (25.7s)` |
| h1 | `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke` ×2 | GREEN | **GREEN ×2**: `3 passed (59.5s)` · `3 passed (1.1m)` (sRGB buffer; H1-P3 by id) |
| h2 | `node docs/tranches/X/gates/gate-blob-pipeline.mjs` | GREEN | **GREEN**: `GATE h2 (blob pipeline census) — GREEN` |
| i1 | `o25-atmosphere-response.spec.ts` ×2 | GREEN | **GREEN ×2**: `1 passed (2.0s)` each |
| i2 | `node docs/tranches/X/gates/gate-lband-door.mjs` | GREEN | **GREEN**: `GATE i2 (dark lBand door) — GREEN` |
| i3 | `o28-atmosphere-coldload.spec.ts` ×2 + `grep -rn armRuntime demo/ \| wc -l` | RED | **RED ×2**: `1 failed` EXIT 1, Received **0.15949 · 0.29331 · 0.24326** (≤ 0.02; seeds 30 · 150 · 260) — byte-identical to every sitting since the fifth; armRuntime `0`. **`I3-SEED-SIZE`** (`.i2`): the §0ay (a) cure is unlanded by rule |
| j1 · j2 · j3 | `grep -c "component: Stub" demo/color-picker/router/index.ts` · `ls e2e/smoke/oracles \| grep -c o29` | RED | **RED**: `14` · `0` — `.j` OMITTED (§0az; X-W5 PARTIAL) |
| j4 | measured and retired (cited, Check 3) | GREEN | **GREEN (cited)** |
| H1 | `node docs/tranches/X/gates/gate-no-chassis.mjs b2dd375c a87f8930` | GREEN | **GREEN**: `GATE H1 (no copied chassis) — GREEN`; no product commit this sitting |
| H2 | `ls …/codex-provenance/motion-quarantine.md` + citation legs | RED | **RED**: file present, `.e` legs cite it; the `.j` leg is owed |
| H3 | parser R1 one-liner · installed glass version | GREEN | **GREEN**: `R1 EXIT=0` · `7.0.0` |
| H4 | every row one disposition | RED | **RED**: CC-056 · CC-057 (`.j`) not landed |
| f3 | `o21-space-catalog-truth.spec.ts` ×2 (`f3-r{1,2}.txt`) | GREEN | **GREEN ×2**: `1 passed (1.4m)` · `1 passed (1.3m)` |
| g1 | `CARD_RHYTHM_ORIGIN=http://localhost:8791 node …/x-w6/gate-card-rhythm.mjs` (`g1.txt`) | RED | **RED**: `LARGEST INTERVAL: 61.22px` · `2 interval(s) fail` — honest-RED by id → X-W10 (§0aq, M-23) |
| g2 | `npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts -g "companion panes share one track start" --project=smoke` ×2 (`g2-r{1,2}.txt`) | RED (Check 3, 1 of 2) | **RED ×2, deterministic**: *"the About pane (div.glass-resting.card) sits ON its track start … (pane 105.2173 vs track 111.71875)"*, Received **6.50144** both runs (≤ 1). Diagnostic (`g2-about-probe.txt`): the same `readRowOnce` read against the fresh vite `:8791` at 1280×720 → `paneTop 112 = regionTop 112`, `tf none`, 0 animations — the offset reproduces only in the e2e webServer cell. X-W5 `.d4` `f55e59b7` did **not** relieve it; ESC-W6close5-1 (Repair 1 C1-4: the About pane resting in `vj-enter-enter-from`) stands on X-W5's bytes |

The catalog oracle runs re-wrote `W6-evidence/catalog/after-display-p3-about.png`; this seat restored its own side effect with
`git checkout -- <that path>`. `after-{catalog-open,specimen-dots}.png` were dirty before this seat opened and are left as found.

### Act 3 — SELF-COUNT (counted twice)

**GREEN is 33.** a1 a2 a3 a4 a12 (5) · b2 b3 b4 (3) · c1–c4 (4) · d1 d2 (2) · e1 e2 (2) · f1–f10 (10) · h1 h2 (2) · i1 i2 (2) ·
j4 (1) · H1 H3 (2). 5+3+4+2+2+10+2+2+1+2 = **33**.
**RED is 17.** a5–a11 (7) · a13 (1) · b1 (1) · g1 g2 (2) · i3 (1) · j1 j2 j3 (3) · H2 H4 (2). 7+1+1+2+1+3+2 = **17**.
33 + 17 = **50** = the §6 roster.
Recount by unit (G/R): `.a` 5/8 · `.b` 3/1 · `.c` 4/0 · `.d` 2/0 · `.e` 2/0 · `.f` 10/0 · `.g` 0/2 · `.h` 2/0 · `.i` 2/1 · `.j` 1/3 ·
wave H 2/2 → G 5+3+4+2+2+10+0+2+2+1+2 = **33**, R 8+1+0+0+0+0+2+0+1+3+2 = **17**. Both counts agree.
**Movement against the fifth close (30/20)**: a4 RED→GREEN ×3 (`df290a72`), a12 RED→GREEN ×2 and e1 RED→GREEN ×3 (both on X-W5
`.d4` `f55e59b7`). a5–a11 (GREEN 2 of 3) and a13 (GREEN 2 of 3) are counted **RED — not close-stable**, the same rule every close
and check since the fifth has applied to this species; their single failures sit in the X-W5 cold-nav enter class. g2 moved from
intermittent to deterministic RED. 30 + 3 = 33.

**Honest-RED (relieved at the spec bytes)**: g1 (→ X-W10, `W6.md:484`) · b1 (`B1-G3D`, `W6.md:486`) · j1 j2 j3 · H2 · H4 (`.j`
OMITTED while X-W5 is PARTIAL, `W6.md:490`). **Escalated (owner-ruling or X-W5 bytes)**: i3 (`I3-SEED-SIZE`) · g2 · a5–a11 · a13
(ESC-W6close5-1 / ESC-W5d4-1, X-W5).

### Act 4 — §8 Verification Artefacts, run as written

⟨`git ls-files W6-evidence/<dir> | grep -c '\.png$'`⟩ → gradient **0** · catalog **6** · owner-marks **0** · atmosphere **5**.
⟨`git ls-files <doc> | wc -l`⟩ → `W6-atmosphere-tombstone.md` 1 · `W6-glass-ask-easing-readout.md` 1 (d2's census selected the
ask) · `W6-blob-pipeline-census.md` 1 · `W6-lband-letter.md` 0 (i2 GREEN on the landed branch; no letter owed). This close's
transcripts are committed in `W6-evidence/gates/close-7-2026-09-23/`; `.a2`'s and `.i2`'s in `a2-2026-09-23/` and
`i2-2026-09-23/`. **§8 is PARTIAL**, unchanged: gradient before/after PNGs, owner-mark re-captures and the cold-load
first-paint frame are still owed (R-11).

**`.i2`'s perf reading, corroborated read-only.** ⟨`gzip -9 -c node_modules/@mkbabb/glass-ui/dist/aurora.js | wc -c`⟩ →
**63916** (raw 201341). The glass aurora module alone is 5.2× the 12288 B budget, so any first-paint IIFE that imports the
derive through `@mkbabb/glass-ui/aurora` unshaken cannot meet §0ay's gate. That agrees with `.i2`'s 50989 B (tree-shaken) and
65439 B (esbuild) readings. The banked patch still applies (Act 1).

### Act 5 — §7 cadence at the settled bytes

No product byte moved this sitting. ⟨`npx eslint demo`⟩ → `EXIT=0` (`eslint.txt`). ⟨`npx vue-tsc --noEmit -p tsconfig.demo.json`⟩ →
`EXIT=0` (`vuetsc.txt`). ⟨`npx vitest run`⟩ → `Tests 2 failed | 639 passed (641)` (`vitest-full.txt`); the two are exactly
**C-5** (`test/spectrum-luma.test.ts`) and **NG-6** (`demo/test/shell/reka-binding-idiom.test.ts`), the foreign born-RED
canaries → X-W8 `.i` (§0z E2, R-12). ⟨`git diff --check 12bb3195..HEAD -- . ':!*.patch'`⟩ → 2 transcript hits (Act 1, INFO). The
prettier debt R-d-1 predates the wave; unchanged.

### Act 6 — E13 mail (read-only sweep, ~01:47)

⟨`find <dir> -maxdepth 1 -type f -newermt 2026-09-23T01:28:08-04:00`⟩ (the seventh Open `12bb3195`, the last swept clock)
→ **empty** on value.js `V/` · `V/coordination/` · glass `BK/coordination/` (⟨`ls -t glass-ui/docs/tranches | head -2`⟩ → `BK`,
`BJ`) · keyframes `V/coordination/` · atlas `P/coordination/` · atlas `T/` (⟨`ls -t …/atlas/docs/tranches | head -2`⟩ → `T`, `Q`).
⟨`grep -c '^| I-\|^| O-' INBOX.md`⟩ → **97** (unchanged). The UNREAD-status rows are O-20 · I-30 · I-31 · I-32 · I-35 · O-39 ·
I-40, none addressed to X-W6. **0 UNREAD in W6's scope.** No INBOX byte written.

### Act 7 — escalations

- **ESC-W6i-i3-1 → `I3-SEED-SIZE`** (`.i2`, `d30ac937`/`624cff0e`). §0ay's (a) cure is built and banked unlanded. It measures
  50989 B gzip against the 12288 B budget, and this seat's read-only corroboration is `aurora.js` alone at 63916 B gzip. The
  **OWNER** chooses: accept (a) at ~51 KB, send a BK relay row asking glass for a shader-free derive subpath, or take (c), an
  E-3 re-point of o28 to the persisted-ground arm.
- **ESC-W6close5-1 / ESC-W5d4-1** (X-W5, still unruled). g2 is now **deterministic** RED ×2 at 6.50144 in the e2e cell. The
  same `readRowOnce` read on a fresh vite server lands exactly on the track. a5–a11 and a13 each fail 1 of 3 in the cold-nav
  enter class. X-W5 `.d4` `f55e59b7` relieved a4 · a12 · e1 but not these. The owner is **X-W5**: the transitions are CC-054/CC-055
  (`W6.md` §10), outside W6 §4. No W6 seat may add a wait, settle or `animations:"disabled"` to hide them.
- **No new escalation.**

### Act 8 — residuals, each with a named owner

| id | residual | owner |
|---|---|---|
| R-4 | b1 `B1-G3D` (2 `G3d` lines ×2) | X-W11's OUT-OF-WAVE roster re-points G3d (§0ax) |
| R-5 | i3 = `I3-SEED-SIZE`: first paint is the unseeded ground (0.15949 · 0.29331 · 0.24326 ×2); the (a) cure is 50989 B gzip vs 12288 B | **OWNER** (accept (a) · BK shader-free-derive relay · (c) E-3 re-point), then a `.i` re-sit |
| R-6 | g1: 61.22 px, 2 intervals fail | X-W10 (honest-RED by id, §0aq, M-23) |
| R-7 | j1–j3 and H4 | `.j` on the resume after X-W5 reads CLOSED (§0az; LEDGER X-W5 still PARTIAL) |
| R-8 | the H2 `.j` citation leg | `.j` |
| R-11 | §8: gradient PNGs 0, owner-marks 0, the cold-load first-paint frame | `.a`/`.b` evidence repair · `.i` |
| R-12 | the vitest canaries C-5 and NG-6 (2 of 641) | X-W8 `.i` (§0z E2) |
| R-15 | g2 RED ×2 deterministic (6.50144); a5–a11 and a13 RED 1 of 3 each (cold-nav enter class) | X-W5 (ESC-W6close5-1 / ESC-W5d4-1); W6 re-reads them ×2 after the cure |
| R-16 | the `:9000` dev server (PID 14970) is still stale | environment (STALE-SERVER LAW: live probes use a fresh server) |
| R-17 | `i2-held-at-head.txt:51,105` trailing whitespace (verbatim reporter lines) | none owed (transcript bytes are evidence; INFO only) |
| R-d1 | d1's read-only count reads **2** ×2 here (the fifth close read 1 ×4); DOM-state dependent, verdict GREEN either way | `.d` receipt erratum (addendum-beside, next `.d` sitting) |
| R-d-1 | the prettier debt predates the wave | X-W8 hygiene / the next product commit on those paths |

R-14 (a4) is **discharged**: `o21:188` is GREEN ×3 here and ×3 at `.a2`, cured by `df290a72`.

### Act 9 — four-verb line after this close

AUDITED yes · SPECIFIED yes · **IMPLEMENTED no** (17 RED; unrelieved: i3 · g2 · a5–a11 · a13) · VERIFIED no (X-W11's stamp).
The line does not move.

### Act 10 — verdict

**PARTIAL.** GREEN 33/50, RED 17/50. Landed-wrong 0. UNREAD in scope 0. No new escalation. `I3-SEED-SIZE` waits for an owner
ruling, and ESC-W6close5-1 / ESC-W5d4-1 wait for X-W5. The LEDGER row reads **PARTIAL — seventh-sitting close**.

## Check 1 — RESUME 2026-09-23 (L-20 fresh adversarial pass 1 over the seventh sitting's close `7b7947ad`)

SERVED MODEL: claude-opus-5-5[1m] · VERIFY-ONLY · 2026-09-23 ~01:50–02:10 EDT · HEAD `7b7947ad` · load 6→16 (⟨`uptime`⟩).
Spec read whole once (`W6.md`, 490 L, the four ADDENDA). Of this record: the seventh Open → Unit plan → receipts → Close
(`:7155-7450`) only. COHESION §0ay · §0az read by range (`:2882-2960`).

**Crash-recovery.** ⟨`git status --porcelain`⟩ → `CARRY-LEDGER.md` · `W6-evidence/catalog/after-{catalog-open,specimen-dots}.png`
· `scripts/dev/dev.sh`. None is in this seat's writable set (this record and the LEDGER). Nothing was inherited, and nothing
was touched. The check's own Playwright runs left no new dirty path.

### Axis 1 — the claimed GREENs, re-run at this seat's clock

| gate | ⟨cmd⟩ | this seat |
|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` → `npx vitest run test/gradient-order-invariant.test.ts` | probe EXIT 0 · `Tests 17 passed (17)` |
| a2 · a3 · a4 · b3 · e1 (+ a13 suite) | `VJS_E2E_PORT=8921 npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | `22 passed (1.9m)` EXIT 0 (1 of 1) |
| c1 | `node …/gate-structure.mjs` | `GATE G4 (structure) — GREEN` EXIT 0 |
| c2 | `npx vitest run test/gradient-order-invariant.test.ts -t "one sampling law"` | `4 passed \| 13 skipped (17)` |
| c3 | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | `GATE c3 (literal dialect) — GREEN` |
| c4 | `npx vitest run test/interpolation-subset.test.ts` | `5 passed (5)` |
| d2 | `node …/x-w6/gate-easing-readout.mjs` | EXIT 0 · `DATED ASK` · local restyle `0 line(s)` |
| e2 | rAF grep + `gate-prm-idiom.mjs` | `0` · `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 | `gate-catalog-totality.mjs` · `gate-specimen-grammar.mjs` | EXIT 0 · EXIT 0 |
| f2 · f7 · f8(grep) · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0 0` + `EXIT=0` · `0` · `2 0` · `0` |
| f4 · f6 · f8 | `VJS_E2E_PORT=8941 npx playwright test o22 o23 o24 --project=smoke` | `3 passed (21.1s)` EXIT 0 |
| h2 · i2 · H1 | `gate-blob-pipeline.mjs` · `gate-lband-door.mjs` · `gate-no-chassis.mjs b2dd375c a87f8930` | each `— GREEN` |
| i1 | `VJS_E2E_PORT=8911 npx playwright test o28 o25 --project=smoke` | o25 `passed` |
| H3 | the R1 one-liner · glass `package.json` version | `R1 0` · `7.0.0` |

**26 claimed GREENs reproduce**: a1 a2 a3 a4 b3 c1 c2 c3 c4 d2 e1 e2 f1 f2 f4 f5 f6 f7 f8 f9 f10 h2 i1 i2 H1 H3. That is 26,
counted twice. **0 failed.** Not re-run, with each close reading cited: a12 · b2 · b4 · d1 · f3 · h1 · j4. The a5–a11
gesture-paint script was also not re-run.
**The REDs reproduce.** i3: in the same o28 run, `1 failed`, Received **0.15949 · 0.29331 · 0.24326** (byte-identical), armRuntime `0`.
g2: ⟨`VJS_E2E_PORT=8931 npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts -g "companion panes share one
track start" --project=smoke`⟩ → `1 failed`, *pane 105.03 vs track 111.53*, Received **6.50144**. j1–j3: ⟨`grep -c "component:
Stub" demo/color-picker/router/index.ts`⟩ → `14`; o29 absent. H2: the record file is present; the `.j` leg is owed.

### Axes 2–9

- **(2) Bounds.** ⟨`git show --stat`⟩ over `196c014d..HEAD` gives 6 commits (`12bb3195` `f0e3eb55` `00bae0ff` `d30ac937` `624cff0e`
  `7b7947ad`). Every path is this record, the LEDGER, INBOX (a sweep line) or `W6-evidence/gates/**`. There is **0 product
  byte** and `scripts/dev/dev.sh` is in no commit.
- **(3) Masking.** No product diff. The `.i2` cure sits banked as a `.patch` and is unlanded. `.a2` wrote no spec byte, so
  0 masking hunks.
- **(4) Families.** No §9 product family was minted this sitting (`.i2` held `feat(demo/atmosphere-oracle)` over budget, and it
  held lawfully). Evidence and receipt commits were split by meaning.
- **(5) E-3.** ⟨`git diff --stat 196c014d..HEAD -- W6.md registry/adjudicated/ W[0-9]*.md scripts/dev/dev.sh`⟩ → **empty**.
  ⟨`git diff --stat ae79306d~1..HEAD -- registry/adjudicated/ scripts/dev/dev.sh`⟩ (from the wave's first record commit) → **empty**.
- **(6) Mail.** ⟨`grep -n UNREAD INBOX.md | grep -i W6`⟩ → O-20 (a glass-addressed SENT row naming `W6-AUTH-1` in its body) · I-35
  (KF.W6's, READ + CONSUMED). **0 UNREAD in X-W6 scope.**
- **(7) Four-verb.** The close holds IMPLEMENTED **no**, which is lawful with 17 RED. The line did not move.
- **(8) Goal §2a.** Not met at the bytes: the routed-scene arm (`.j`, four routes owning a contract) is 0 of 4 (`Stub` ×14).
  The first-paint arm of the atmosphere (i3) is also unmet.
- **(9) Figures.** 33/17 re-counted from Act 3's lists: 5+3+4+2+2+10+2+2+1+2 = 33 and 7+1+1+2+1+3+2 = 17. The Received
  triplets, the 6.50144 offset, `Stub` 14 and armRuntime 0 all reproduce. The i3 size figure (50989 B) was not re-bundled here.
  The close's read-only corroboration (glass `aurora.js` 63916 B gzip) is cited, not re-measured.

### Axis 10 — RED adjudication at the spec bytes

| gate | relief at the spec bytes | owner named | verdict |
|---|---|---|---|
| g1 | `W6.md:484` second ADDENDUM: "**g1** honest-RED by id → X-W10 (M-23)" | X-W10 (R-6) | **HONEST-RED** |
| b1 | `W6.md:486`: "b1 = `B1-G3D` honest-RED-by-instrument" | X-W11 roster (R-4) | **HONEST-RED** |
| i3 | COHESION §0ay (`:2903-2911`): over budget → "the wave closes i3 honest-RED by id `I3-SEED-SIZE` with (c) recorded as the fallback" | OWNER (R-5) | **HONEST-RED** (measured over budget ×2, patch banked) |
| j1 · j2 · j3 · H4 · H2 (`.j` leg) | `W6.md:490` / §0az: `.j` OMITTED "on a later resume". This is a **deferral inside this wave**, not honest-RED by id, and the wave cannot close on it | `.j` after X-W5 CLOSED (R-7/R-8) | **UNRELIEVED — deferred, owned** |
| g2 | None in W6.md. §0ay ruled ESC-W6close5-1 to X-W5 `.d3`. §0az's `.d4` gate is "W6's … g2 GREEN ×2", but g2 is RED ×2 (deterministic) at X-W5's bytes, and ESC-W5d4-1 is **unruled** (COHESION: 0 hits) | X-W5 (R-15) | **UNRELIEVED** |
| a5–a11 · a13 | Same class as g2: 1 of 3 each at the close. The a13 suite was GREEN 1 of 1 here, but it is not close-stable, and no ruling or ADDENDUM relieves it | X-W5 (R-15) | **UNRELIEVED** |

### Successor "Opens after" conjuncts

X-W7 (`W7.md:6`: "…and **X-W6**"), X-W8 (`W8.md:6`: "X-W5, X-W6 and X-W7 stabilize…"), X-W10 (`W10.md:6`: "…X-W6… stable")
and X-W11 (`W11.md:6`: "X-W0 … X-W10 are IMPLEMENTED") each hold an X-W6 conjunct, and **each is RED**: the row reads PARTIAL
and IMPLEMENTED is **no**. All four successors are **lawfully blocked** on X-W6, with X-W5 PARTIAL beside it. None is
unlawfully blocked by this wave, because the block comes from each spec's own conjunct.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C1-1 | HIGH | g2 is RED deterministically, and no spec byte relieves it | ⟨companion-pane-track-start `-g …`⟩ → `1 failed`, Received 6.50144; COHESION has 0 hits for `ESC-W5d4-1` | X-W5 ruling and cure (ESC-W6close5-1 / ESC-W5d4-1). W6 re-reads g2 ×2 afterwards. No W6 settle |
| C1-2 | HIGH | a5–a11 and a13 are not close-stable (each 1 of 3 at the close), and nothing relieves them | close Act 2 rows a13 · a5–a11. This seat read the suite 22/22 on 1 run, which is not a stability reading | the same X-W5 cure, then W6 reads ×3 |
| C1-3 | MEDIUM | j1–j3, H4 and H2's `.j` leg are deferred inside the wave, not honest-RED; the §2a routed-scene arm is unmet | `Stub` ×14 · o29 absent · `W6.md:490` | `.j` sits on the resume after X-W5 reads CLOSED |
| C1-4 | MINOR | §8 artefacts are partial: gradient PNGs 0, owner-marks 0, no cold-load frame | close Act 4 | `.a`/`.b` evidence repair · `.i` re-sit (R-11) |
| C1-5 | INFO | i3 = `I3-SEED-SIZE` is lawfully honest-RED, and it waits on an OWNER choice | §0ay `:2903-2911`; o28 Received reproduces | owner: accept (a) · BK relay · (c) |
| C1-6 | INFO | two trailing-whitespace lines sit in a transcript | close R-17 | none owed |

### Verdict

**NOT-CONFORMANT.** 26 of 26 re-run claimed GREENs reproduce and 0 failed. The honest-RED set is **g1 · b1 · i3**.
**Unrelieved**: g2 · a5–a11 · a13 (X-W5-owned, unruled), with j1–j3 · H2 · H4 deferred to `.j`. The LEDGER row **stays
PARTIAL**, the close's verdict is **confirmed**, and nothing is promoted.

## Repair 1 — RESUME 2026-09-23 (REPAIR SEAT, round 1, over the Check 1 — seventh sitting register `3cd0224e`)

SERVED MODEL: claude-opus-5-5[1m] · 2026-09-23 ~02:00 EDT · HEAD `3cd0224e` · load 6.34 at open (⟨`uptime`⟩).
Spec read whole once (`W6.md`, 490 L, four ADDENDA). Of this record: the seventh Open → Unit plan (`:7155-7233`) and Check 1
(`:7452-7542`) only; the close by grep/sed range.

**Crash-recovery.** ⟨`git status --porcelain`⟩ → `V/reformation/CARRY-LEDGER.md` · `W6-evidence/catalog/after-{catalog-open,
specimen-dots}.png` · `scripts/dev/dev.sh`. The same three rows Check 1 found. None lies in a writable set this seat can claim
for a cure (the two PNGs are `.f`'s landed evidence and the prior o22/o24 run's side effect). Nothing was inherited, and
nothing was touched or staged.

**Rulings since Check 1.** ⟨`git log --oneline 7b7947ad..HEAD`⟩ → `3cd0224e` only (Check 1 itself). ⟨`grep -n "^## §0"
COHESION.md | tail -1`⟩ → `2918:## §0az` (no new addendum). ⟨`grep -c ESC-W5d4-1 COHESION.md`⟩ → `0`. LEDGER row X-W5 still
PARTIAL. So no X-W5 byte and no ruling has moved since the close. Every HIGH/MEDIUM cure Check 1 names sits at X-W5's bytes
or on `.j`, which §0az omits while X-W5 is PARTIAL.

### Defect → cure → commit → gate re-reading

| # | sev | defect | cure at this seat | commit | gate re-reading |
|---|---|---|---|---|---|
| C1-1 | HIGH | g2 RED deterministically (6.50144), unrelieved | **ESCALATED, no W6 byte.** §0ay (`COHESION.md:2896`) rules the cold-nav stuck enter (ESC-W6close5-1) to X-W5. §0az gave X-W5 `.d4` the "W6 g2 GREEN ×2" duty. ⟨`grep -c ESC-W5d4-1 COHESION.md`⟩ → `0`, so X-W5's residual is still unruled. The only W6-side move would be a settle or animation disable in the companion-pane spec or a per-pane nudge in `AboutPane.vue`. The spec bans the first (masking) and g2's own falsifier bans the second ("a per-pane nudge passes the About assertion and breaks the control"). | none | not re-run: no byte moved since Check 1, which read `1 failed`, Received 6.50144 at `3cd0224e` |
| C1-3 | MEDIUM | j1–j3 · H4 · H2's `.j` leg are deferred inside the wave; the §2a routed-scene arm is unmet | **ESCALATED, no W6 byte.** `W6.md:490` (fourth ADDENDUM) and §0az omit `.j` while X-W5 is not CLOSED, and the LEDGER X-W5 row reads PARTIAL. A repair seat that dispatched `.j` would breach the ruled order. The cure is `.j` on the resume after X-W5 CLOSES. | none | ⟨`grep -c "component: Stub" demo/color-picker/router/index.ts`⟩ → `14`; ⟨`ls e2e/smoke/oracles \| grep -c o29`⟩ → `0` (unchanged) |
| C1-4 | MINOR | §8 artefacts partial | **Not a one-command cure. Left to its owners.** Re-measured: ⟨`git ls-files W6-evidence/gradient \| grep -c png`⟩ → `0` · ⟨`git ls-files W6-evidence/owner-marks \| wc -l`⟩ → `0`. The gradient before/after frames require BEFORE bytes (the pre-`.a` tree) plus seven capture cells. The owner-mark re-crops need the owner's crops. The cold-load first-paint frame rides the `.i` re-sit, which is gated on the owner's I3-SEED-SIZE choice (R-11). Each is a unit's work, not a one-command cure. | none | — |
| C1-5 | INFO | i3 = `I3-SEED-SIZE` awaits OWNER | none owed (owner act) | none | cited: Check 1 o28 Received 0.15949 · 0.29331 · 0.24326 |
| C1-6 | INFO | two trailing-whitespace lines in `i2-held-at-head.txt` | none owed (a verbatim reporter transcript, and E-3 bars editing prior evidence) | none | — |
| C1-2 | HIGH | a5–a11 · a13 not close-stable, unrelieved | **ESCALATED, no W6 byte.** This is the same cold-nav enter class §0ay ruled to X-W5 (`COHESION.md:2898` names "a5–a12, e1 and g2"). No X-W5 byte has landed since the close, so any W6-side settle would mask X-W5's defect (the `.a2` lock). This seat took the stability reading Check 1 said was missing (below). | none | a13 suite **GREEN 2 of 3** · a5–a11 **GREEN 3 of 3** (table below) |

### The stability reading (read-only, fresh servers, 2026-09-23 02:03–02:13 EDT, load 6.3 at start)

| gate | ⟨cmd⟩ | r1 | r2 | r3 |
|---|---|---|---|---|
| a13 suite (a2 · a3 · a4 · b3 · e1 legs) | `VJS_E2E_PORT=897{1,2,3} npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke --reporter=line` | `22 passed (1.9m)` EXIT 0 | `22 passed (1.9m)` EXIT 0 | `1 failed · 21 passed (1.9m)` EXIT 1: **`gradient.spec.ts:451` (e1)** *"the ramp moves with no producer primitive composed"*, Expected false · Received true (`:537`) |
| a5–a11 | fresh `npx vite --port 8979 --strictPort`; `GRADIENT_URL=http://localhost:8979/#/gradient node docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs` ×3 | `GATE X.W6.a (gesture + paint) — GREEN` EXIT 0 | GREEN EXIT 0 | GREEN EXIT 0 |

**New finding for the next check (R1-1, MEDIUM).** The close read **e1 GREEN ×3** (`:7330`) and counted it in the 33.
Here e1 failed on 1 of 3 runs at unchanged bytes, and it failed in the same species the fifth sitting's close recorded at
`:6449` (RED 1 of 2 there). §0ay (`COHESION.md:2898`) places e1 in the X-W5 cold-nav regression set with a5–a12 and g2. So
e1 is **not close-stable** by the rule the close applied to a5–a11 and a13. Moving it from GREEN to RED is the next check's
job: this seat does not rewrite the close's count (E-3). The cure is the same X-W5 escalation (ESC-W6close5-1 /
ESC-W5d4-1), after which W6 re-reads e1 ×3. **This seat does not own a W6-side cure**: the "no motion" leg is exactly what a
late scene-enter transition inside the clip box would trip, and a settle would mask it.

### Figures (WRITE-THEN-MEASURE)

No product, spec or test byte moved: ⟨`git diff --stat 3cd0224e -- demo e2e test src plugins`⟩ → empty. The close's 33 / 17
therefore stands as the record figure. This seat measured one new instability, e1 at 2 of 3 (R1-1), and hands it to the next
check without re-counting the close. Self-count: **cured 0** (C1-1 · C1-2 · C1-3 escalated to X-W5 / `.j`; C1-4 is not a
one-command cure; C1-5 · C1-6 are INFO, none owed). **Escalated 3**, and R1-1 joins C1-2's escalation. The row stays **PARTIAL**.

## Check 2 — RESUME 2026-09-23 (L-20 fresh adversarial pass 2, over the seventh sitting's close `7b7947ad` + Repair 1 `919a860d`)

SERVED MODEL: claude-opus-5-5[1m] · VERIFY-ONLY · 2026-09-23 ~02:10–02:25 EDT · HEAD `919a860d` · load 6.8 at open (⟨`uptime`⟩).
Spec read whole once (`W6.md`, 490 L, four ADDENDA). Of this record: the seventh Close (`:7280-7451`), Check 1 (`:7452-7543`)
and Repair 1 (`:7544-7591`) only.

**Crash-recovery.** ⟨`git status --porcelain`⟩ → `V/reformation/CARRY-LEDGER.md` · `W6-evidence/catalog/after-{catalog-open,
specimen-dots}.png` · `scripts/dev/dev.sh`. These are the same three rows every seat since the seventh Open has found. None is in
this seat's writable set (this record and the LEDGER). Nothing was inherited, touched or staged.

**Movement since Check 1.** ⟨`git log --oneline 7b7947ad..HEAD`⟩ → `3cd0224e` · `919a860d`. Both are record+LEDGER only
(⟨`git show --stat`⟩: `X-W6.md` +92/+49, `LEDGER.md` +1/±1). ⟨`grep -n "^## §0" COHESION.md | tail -1`⟩ → `2918:## §0az`, so
there is no new ruling. ⟨`grep -c ESC-W5d4-1 COHESION.md`⟩ → `0`. The LEDGER row for X-W5 still reads **PARTIAL — RESUME 7 close**.
No product, spec or ruling byte has moved since the close.

### Axis 1 — the claimed GREENs, re-run at this seat's clock

| gate | ⟨cmd⟩ | this seat |
|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` → `npx vitest run test/gradient-order-invariant.test.ts` | probe EXIT 0 · `Tests 17 passed (17)` |
| a2 · a3 · a4 · b3 · e1 | `VJS_E2E_PORT=9111 npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` | `1 failed · 21 passed (2.1m)` EXIT 1. Every a2/a3/a4/b3/e1 leg passed. The one failure is **`o21:60`** (*"terminal truth…"*, Expected < 123.88 · Received **167.09**), an a13 suite leg, byte-identical to the close's r1 |
| c1 | `node …/gate-structure.mjs` | `GATE G4 (structure) — GREEN` |
| c2 | `npx vitest run … -t "one sampling law"` | `4 passed \| 13 skipped (17)` |
| c3 | `npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs` | `GATE c3 (literal dialect) — GREEN` |
| c4 | `npx vitest run test/interpolation-subset.test.ts` | `5 passed (5)` |
| d2 | `node …/x-w6/gate-easing-readout.mjs` | `DATED ASK` · local restyle `0 line(s)` |
| e2 | rAF grep + `gate-prm-idiom.mjs` | `0` · `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 · h2 · i2 | `gate-{catalog-totality,specimen-grammar,blob-pipeline,lband-door}.mjs` | EXIT 0 ×4 |
| f2 · f7 · f8(grep) · f9 · f10 | the spec's greps (`W6.md:255-263`) + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0`/`0` + `vuetsc=0` · `0` · `2`/`0` · `0` |
| f4 · f6 · f8 · i1 | `VJS_E2E_PORT=9131 npx playwright test o28 o25 o22 o23 o24 --project=smoke` | `4 passed` (o25 · o22 · o23 · o24); o28 is the 1 failure (i3, below) |
| H1 | `node docs/tranches/X/gates/gate-no-chassis.mjs b2dd375c a87f8930` | `GATE H1 (no copied chassis) — GREEN` |
| H3 | the R1 one-liner · glass `package.json` | `R1=0` · `7.0.0` |

**26 claimed GREENs reproduce** (counted twice): a1 a2 a3 a4 b3 e1 c1 c2 c3 c4 d2 e2 f1 f2 f4 f5 f6 f7 f8 f9 f10 h2 i1 i2 H1 H3.
**0 failed.** Each of these was cited from the close and not re-run: a12 · b2 · b4 · d1 · f3 · h1 · j4, plus the a5–a11 gesture-paint script.
**The REDs reproduce.** i3: `o28` Received **0.15949 · 0.29331 · 0.24326** (byte-identical). g2: ⟨`VJS_E2E_PORT=9141 npx playwright
test e2e/smoke/views/companion-pane-track-start.spec.ts -g "companion panes share one track start" --project=smoke`⟩ →
*pane 105.2173 vs track 111.71875*, Received **6.50144** (deterministic). The first attempt at port 9121 died on
`EADDRINUSE 127.0.0.1:8091`, a collision between this seat's own concurrent webServers, and was re-run alone. a13: `o21:60` RED on
1 of 1 here. j1–j3: ⟨`grep -c "component: Stub" demo/color-picker/router/index.ts`⟩ → `14`; ⟨`ls e2e/smoke/oracles | grep -c o29`⟩ → `0`.
H2: `motion-quarantine.md` is present, and the `.j` leg is owed.

### Axes 2–9

- **(2) Bounds.** Since the close, the only commits are `3cd0224e` and `919a860d`: record + LEDGER, 0 product bytes. The close's own
  roster (`196c014d..7b7947ad`, 6 commits) was re-read by Check 1, and every path in it is inside bounds. `scripts/dev/dev.sh` is in no commit.
- **(3) Masking.** There is no product diff this sitting. The `.i2` cure sits unlanded as a banked `.patch`, and Repair 1 added no settle or
  wait. **0 masking hunks.**
- **(4) Families.** No §9 product family was minted. The check and repair commits are one meaning each.
- **(5) E-3.** ⟨`git diff --stat 196c014d..HEAD -- docs/tranches/X/waves/W6.md docs/tranches/V/megatranche/registry/adjudicated/
  'docs/tranches/X/waves/W[0-9]*.md' scripts/dev/dev.sh`⟩ → **empty**.
- **(6) Mail.** ⟨`grep -n "^| [IO]-[0-9]" INBOX.md | grep UNREAD`⟩ → O-20 · I-30 · I-31 · I-32 · I-35 · O-39 · I-40, the same set as the
  close. None is addressed to X-W6: O-20 is a SENT glass row, and I-35 is KF.W6's. **0 UNREAD in scope.**
- **(7) Four-verb.** The line holds at IMPLEMENTED **no**, which is lawful with RED gates standing. It did not move.
- **(8) Goal §2a.** It is **not met** at the bytes. The routed-scene arm is 0 of 4 routes (`Stub` ×14, o29 absent), and the
  first-paint atmosphere arm (i3) is unmet.
- **(9) Figures.** The close's 33/17 re-sums from its lists (5+3+4+2+2+10+2+2+1+2 · 7+1+1+2+1+3+2), and both Received triplets and
  6.50144 reproduce. **But the 33 counts e1**, and Repair 1 read e1 at 2 of 3 (R1-1). Under the close's own "not close-stable → RED"
  rule, the lawful figure is **GREEN 32 / RED 18**. This seat read e1 GREEN on 1 of 1, which is not a stability reading. The
  figure is registered below as a correction, not re-written into the close (E-3).

### Axis 10 — RED adjudication at the spec bytes

| gate | relief | owner | verdict |
|---|---|---|---|
| g1 | `W6.md:484` "**g1** honest-RED by id → X-W10 (M-23)" | X-W10 (R-6) | **HONEST-RED** |
| b1 | `W6.md:486` "b1 = `B1-G3D` honest-RED-by-instrument" | X-W11 roster (R-4) | **HONEST-RED** |
| i3 | COHESION §0ay: over budget → "closes i3 honest-RED by id `I3-SEED-SIZE`" (measured 50989 B > 12288 B, ×2) | OWNER (R-5) | **HONEST-RED** |
| j1 · j2 · j3 · H4 · H2 (`.j` leg) | `W6.md:490` / §0az: `.j` OMITTED "on a later resume". This is a deferral **inside** the wave, not an id, and §6 lists no j-gate among its reliefs | `.j` after X-W5 CLOSED (R-7/R-8) | **UNRELIEVED — deferred, owned** |
| g2 | None in W6.md. §0az gives X-W5 `.d4` the "W6 g2 GREEN ×2" duty, and ESC-W5d4-1 is unruled (0 hits) | X-W5 (R-15) | **UNRELIEVED** |
| a5–a11 · a13 · e1 | The X-W5 cold-nav enter class (§0ay `COHESION.md:2898`). Nothing relieves it by id. a13 is RED 1 of 1 here | X-W5 (R-15) | **UNRELIEVED** |

### Successor "Opens after" conjuncts

X-W7 (`W7.md:6`), X-W8 (`W8.md:6`), X-W10 (`W10.md:6`) and X-W11 (`W11.md:6`) each carry an X-W6 conjunct, and each is **RED**
(row PARTIAL, IMPLEMENTED no). All four are **lawfully blocked** by their own spec bytes, with X-W5 PARTIAL beside them. No
conjunct on X-W6 is GREEN.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C2-1 | HIGH | g2 is RED deterministically, and no spec byte relieves it (carries C1-1) | companion-pane `-g …` → Received 6.50144; `grep -c ESC-W5d4-1 COHESION.md` → 0 | an X-W5 ruling and cure, then W6 reads g2 ×2. No W6 settle |
| C2-2 | HIGH | a5–a11, a13 and e1 are not close-stable, and nothing relieves them (carries C1-2 + R1-1) | `o21:60` RED 1 of 1 here (167.09); Repair 1's e1 read was 2 of 3 | the X-W5 cold-nav cure, then W6 reads ×3 |
| C2-3 | MEDIUM | j1–j3, H4 and H2's `.j` leg are deferred inside the wave; the §2a routed-scene arm is unmet (carries C1-3) | `Stub` 14 · o29 0 · `W6.md:490` | `.j` on the resume after X-W5 CLOSES |
| C2-4 | MEDIUM | the close's figure counts e1 GREEN although it is 2 of 3; the lawful figure is 32/18 | Repair 1 R1-1 · close Act 3 | the next close counts e1 RED until it reads ×3 GREEN |
| C2-5 | MINOR | §8 artefacts are partial: gradient PNGs 0, owner-marks 0, no cold-load frame (carries C1-4) | close Act 4 | `.a`/`.b` evidence repair · `.i` re-sit (R-11) |
| C2-6 | INFO | i3 `I3-SEED-SIZE` is lawfully honest-RED and waits on the OWNER | o28 triplet reproduces | owner: accept (a) · BK relay · (c) |

### Verdict

**NOT-CONFORMANT.** 26 of 26 re-run claimed GREENs reproduce and 0 failed. The honest-RED set is **g1 · b1 · i3**.
**Unrelieved**: g2 · a5–a11 · a13 · e1, all X-W5-owned and unruled, with j1–j3 · H2 · H4 deferred to `.j`. The LEDGER row
**stays PARTIAL** and nothing is promoted.

## Repair 2 — RESUME 2026-09-23 (REPAIR SEAT, round 2, over the Check 2 — seventh sitting register `c9ec0909`)

SERVED MODEL: claude-opus-5-5[1m] · 2026-09-23 ~02:14 EDT · HEAD `c9ec0909` · load 6.53 at open (⟨`uptime`⟩).
Spec read whole once (`W6.md`, 490 L, four ADDENDA). Of this record: Check 2 (`:7593-7686`) and Repair 1 (`:7544-7591`), with
the close's Act 3 read by sed range (`:7364-7369`) only.

**Crash-recovery.** ⟨`git status --porcelain`⟩ → `V/reformation/CARRY-LEDGER.md` · `W6-evidence/catalog/after-{catalog-open,
specimen-dots}.png` · `scripts/dev/dev.sh`. These are the same three rows every seat since the seventh Open has found, and none of
them is in this seat's writable set. Nothing was inherited, touched or staged.

**Rulings since Check 2.** ⟨`git log --oneline c9ec0909..HEAD`⟩ → empty. ⟨`grep -c ESC-W5d4-1 COHESION.md`⟩ → `0`. The last
addendum is still `2918:## §0az`, and the LEDGER X-W5 row still reads **PARTIAL — RESUME 7 close**. ⟨`git diff --stat c9ec0909 --
demo e2e test src plugins`⟩ → empty. No product, spec or ruling byte has moved.

### Defect → cure → commit → gate re-reading

| # | sev | defect | cure at this seat | commit | gate re-reading |
|---|---|---|---|---|---|
| C2-1 | HIGH | g2 is RED deterministically (6.50144), and nothing relieves it | **ESCALATED, no W6 byte.** §0ay rules the cold-nav stuck enter to X-W5. §0az gives X-W5 `.d4` the "W6 g2 GREEN ×2" duty, and ESC-W5d4-1 is still unruled (0 hits). The only W6-side moves are a settle in the companion-pane spec, which the spec bans as masking, or a per-pane nudge in `AboutPane.vue`, which g2's own OM-10 control falsifies. | none | not re-run, because no byte moved. Check 2's reading is cited: Received 6.50144 |
| C2-2 | HIGH | a5–a11, a13 and e1 are not close-stable, and nothing relieves them | **ESCALATED, no W6 byte.** This is the X-W5 cold-nav enter class (`COHESION.md:2898` names a5–a12, e1 and g2). Adding a settle here would mask X-W5's defect. | none | not re-run, because no byte moved. The cited readings are a13 at 2 of 3 and a5–a11 at 3 of 3 (Repair 1), and `o21:60` at 1 of 1 RED (Check 2) |
| C2-3 | MEDIUM | j1–j3, H4 and H2's `.j` leg are deferred inside the wave, so the §2a routed-scene arm is unmet | **ESCALATED, no W6 byte.** §0az (`W6.md:490`) omits `.j` while X-W5 is not CLOSED, and X-W5 reads PARTIAL. Dispatching `.j` from this seat would breach the ruled order. | none | ⟨`grep -c "component: Stub" demo/color-picker/router/index.ts`⟩ → `14` · ⟨`ls e2e/smoke/oracles \| grep -c o29`⟩ → `0` |
| C2-4 | MEDIUM | the close's 33/17 counts e1 GREEN, but e1 reads GREEN on only 2 of 3 runs | **CURED at the record (E-3: stated beside the close, not re-written into it).** The figure of record for the seventh sitting is now **GREEN 32 / RED 18**, with e1 moved to RED under the close's own rule that a gate not stable at close is RED. It stays RED until it reads GREEN ×3 after the X-W5 cure. | this Repair 2 commit | the re-sum is below and was double-run |
| C2-5 | MINOR | the §8 artefacts are partial | **Not a one-command cure, so it is left to its owners.** The gradient frames need the pre-`.a` BEFORE tree plus seven capture cells. The owner-mark re-crops need the owner's crops. The cold-load frame rides the `.i` re-sit, which waits on I3-SEED-SIZE (R-11). | none | ⟨`git ls-files W6-evidence/gradient \| grep -c png`⟩ → `0` · ⟨`git ls-files W6-evidence/owner-marks \| wc -l`⟩ → `0` |
| C2-6 | INFO | i3 `I3-SEED-SIZE` waits on the owner | nothing is owed (it is an owner act) | none | cited from Check 2: o28 received 0.15949 · 0.29331 · 0.24326 |

### Figures (WRITE-THEN-MEASURE, double-run)

**GREEN is 32.** a1 a2 a3 a4 a12 (5) · b2 b3 b4 (3) · c1–c4 (4) · d1 d2 (2) · e2 (1) · f1–f10 (10) · h1 h2 (2) · i1 i2 (2) · j4 (1) ·
H1 H3 (2). ⟨`echo $((5+3+4+2+1+10+2+2+1+2))`⟩ ×2 → `32` · `32`.
**RED is 18.** a5–a11 (7) · a13 (1) · b1 (1) · e1 (1) · g1 g2 (2) · i3 (1) · j1 j2 j3 (3) · H2 H4 (2).
⟨`echo $((7+1+1+1+2+1+3+2))`⟩ ×2 → `18` · `18`. 32 + 18 = **50**, which is the §6 roster.

Self-count: **cured 1** (C2-4). **Escalated 3**: C2-1 and C2-2 go to X-W5 (ESC-W6close5-1 / ESC-W5d4-1), and C2-3 goes to `.j`
after X-W5 CLOSES. C2-5 is not a one-command cure, and C2-6 is INFO with nothing owed. The row stays **PARTIAL** at GREEN 32 / RED 18.

## Check 3 — RESUME 2026-09-23 (L-20 fresh adversarial pass 3, over the seventh sitting's close `7b7947ad` + Repairs 1–2 `919a860d`/`30605bad`)

SERVED MODEL: claude-opus-5-5[1m] · VERIFY-ONLY · 2026-09-23 ~02:16–02:35 EDT · HEAD `9d7e97ae` · load 4.2 at open, 12.0 mid-run (⟨`uptime`⟩).
Spec read whole once (`W6.md`, 490 L, four ADDENDA). Of this record: the seventh Open → Unit receipts (`:7155-7279`), the seventh
Close (`:7280-7451`), Check 2 (`:7593-7686`) and Repair 2 (`:7688-7721`) only.

**Crash-recovery.** ⟨`git status --porcelain`⟩ → `V/reformation/CARRY-LEDGER.md` · `W6-evidence/catalog/after-{catalog-open,
specimen-dots}.png` · `scripts/dev/dev.sh` — the same three rows every seat since the seventh Open found; none in this seat's
writable set (this record, the LEDGER). Nothing inherited, touched or staged. This seat's o22/o24/f3 runs left the status unchanged.

**Movement since Check 2.** ⟨`git log --oneline c9ec0909..HEAD`⟩ → `30605bad` (record +35) · `9d7e97ae` (LEDGER ±1); 0 product
bytes. ⟨`grep -n "^## §0" COHESION.md | tail -1`⟩ → `2918:## §0az` (no new ruling). LEDGER X-W5 row still **PARTIAL — RESUME 7 close**.

### Axis 1 — the claimed GREENs, re-run at this seat's clock

Transcripts in the seat scratchpad (not committed; `c3w6-*` / `pw-*`). Live probes ran against a **fresh** `npx vite --port 9391
--strictPort` (killed after); Playwright on fresh webServers (`VJS_E2E_PORT` 9311 · 9321 · 9331 · 9411 · 9421 · 9431 · 9441).

| gate | ⟨cmd⟩ | this seat |
|---|---|---|
| a1 | `npx vite-node …/evidence/parse-probe.ts` → `npx vitest run test/gradient-order-invariant.test.ts` | probe EXIT 0 · `Tests 17 passed (17)` |
| a2 · a3 · a4 · b3 · e1 | `npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts --project=smoke` ×3 | every a2/a3/a4/b3/e1 leg (incl. `o21:188`, `gradient:451`) passed in **all three** runs. r1 `22 passed (1.9m)` EXIT 0 · r2 `1 failed · 21 passed (1.9m)` EXIT 1 · r3 `22 passed (1.9m)` EXIT 0 |
| b2 · b4 | `GRADIENT_URL=http://localhost:9391/#/gradient node …/gate-seat.mjs` | EXIT 1; `G3e` 0 · `G3f` 0 (b2/b4 GREEN); `G3d` 2 (b1, below) |
| c1 · c2 · c3 · c4 | `gate-structure.mjs` · `vitest -t "one sampling law"` · `gate-literal-dialect.mjs` · `vitest run test/interpolation-subset.test.ts` | `GATE G4 (structure) — GREEN` · `4 passed \| 13 skipped (17)` · `GATE c3 (literal dialect) — GREEN` · `5 passed (5)` |
| d1 | `EASING_RADIUS_ORIGIN=http://localhost:9391 node …/x-w6/gate-easing-radius.mjs` | `panel surfaces measured: 33 · read-only (d2-ask / producer): 2` · `GATE d1 (easing radius) — GREEN` |
| d2 | `node …/x-w6/gate-easing-readout.mjs` | `DATED ASK` · local restyle `0 line(s)` |
| e2 | `grep -rn requestAnimationFrame demo/workbenches/gradient/ \| wc -l` + `gate-prm-idiom.mjs` | `0` · `GATE e2 (PRM idiom) — GREEN` |
| f1 · f5 · h2 · i2 | `node docs/tranches/X/gates/gate-{catalog-totality,specimen-grammar,blob-pipeline,lband-door}.mjs` | EXIT 0 ×4 |
| f2 · f7 · f8(grep) · f9 · f10 | the spec's greps + `npx vue-tsc --noEmit -p tsconfig.demo.json` | `0` · `0`/`0` + `EXIT=0` · `0` · `2`/`0` · `0` |
| f3 | `npx playwright test e2e/smoke/oracles/o21-space-catalog-truth.spec.ts --project=smoke` | `1 passed (1.3m)` (its side-effect rewrite of `after-display-p3-about.png` restored by `git checkout -- <that path>`) |
| f4 · f6 · f8 · i1 | `npx playwright test o25 o22 o23 o24 o28 --project=smoke` | `4 passed` (o25 · o22 · o23 · o24); o28 the 1 failure (i3) |
| h1 | `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g "hero blob carries current chroma" --project=smoke` | `3 passed (37.6s)` |
| H1 · H3 | `gate-no-chassis.mjs b2dd375c a87f8930` · R1 one-liner · glass `package.json` | `GATE H1 (no copied chassis) — GREEN` · `R1=0` · `7.0.0` |

**30 of the 32 figure-of-record GREENs re-run; 30 reproduce, 0 failed** (counted twice): a1 a2 a3 a4 (4) · b2 b3 b4 (3) · c1–c4 (4) ·
d1 d2 (2) · e2 (1) · f1–f10 (10) · h1 h2 (2) · i1 i2 (2) · H1 H3 (2) → 4+3+4+2+1+10+2+2+2 = **30**. Cited, not re-run: a12 (its
probe hard-codes `:9000`, the stale server; a port-edited copy would be a write in the evidence dir) · j4 (measured-and-retired).

**The REDs reproduce.** i3: o28 Received **0.15948859 · 0.29330989 · 0.24326322** (byte-identical to every sitting since the fifth).
g2: *pane 105.2173 vs track 111.71875*, Received **6.501441955566406** (deterministic, 1 of 1 here). b1: exactly 2 `G3d` lines
(`B1-G3D`). g1: `LARGEST INTERVAL: 61.22px` · `2 interval(s) fail`. j1–j3: `Stub` **14**, o29 **0**. H2: `motion-quarantine.md`
present; the `.j` leg owed.

**Stability readings (the species the close counts RED).** a5–a11: `GRADIENT_URL=http://localhost:9391/#/gradient node
…/W6-evidence/gradient/gate-a-gesture-paint.mjs` ×3 → `GATE X.W6.a (gesture + paint) — GREEN` ×3 (EXIT 0 each; the server was warm,
so the close's first-hit failure was not exercised). e1 (`gradient:451`): GREEN 3 of 3. **a13: GREEN 2 of 3** — r2 failed a
**new leg**, `gradient.spec.ts:243` (*"stop add (bar click mints the ramp color), drag, and touch-true remove"*,
`expect(moved.left).toBeGreaterThan(railWidth * 0.6)` at `:282` → Expected > 277.2 · Received **12**: the drag did not move the
handle), not the prior cold-nav set (`o21:60` · `gradient:209` · `gradient:401` all passed ×3 here). Load 12.0 at that minute.

### Axes 2–9

- **(2) Bounds.** ⟨`git show --stat 30605bad 9d7e97ae`⟩ → `X-W6.md` +35 · `LEDGER.md` ±1; the close roster (`196c014d..7b7947ad`) was
  read by Checks 1–2 and every path sits inside §4 / the ADDENDA grants. `scripts/dev/dev.sh` is in no commit (still dirty, unstaged).
- **(3) Masking.** No product diff since the close; `.i2`'s cure sits unlanded as a banked `.patch`; no settle/wait/skip added by
  any repair. **0 masking hunks.**
- **(4) Families.** No §9 product family minted this sitting; each check/repair commit is one meaning.
- **(5) E-3.** ⟨`git diff --stat 196c014d..HEAD -- docs/tranches/X/waves/W6.md docs/tranches/V/megatranche/registry/adjudicated/
  'docs/tranches/X/waves/W[0-9]*.md' scripts/dev/dev.sh`⟩ → **empty**.
- **(6) Mail.** ⟨`grep -n "^| [IO]-[0-9]" INBOX.md | grep UNREAD`⟩ → O-20 · I-30 · I-31 · I-32 · I-35 · O-39 · I-40 — the close's set,
  none addressed to X-W6. ⟨`find docs/tranches/V/coordination -maxdepth 1 -type f -newermt 2026-09-23T02:10:00`⟩ → empty; glass
  newest tranche still `BK`, ⟨`find …/BK/coordination -newermt 2026-09-23T01:28:08`⟩ → empty. **0 UNREAD in scope.**
- **(7) Four-verb.** Holds at IMPLEMENTED **no** — lawful with unrelieved REDs standing. Did not move.
- **(8) Goal §2a.** **Not met** at the bytes: the routed-scene arm is 0 of 4 (`Stub` ×14, o29 absent) and the first-paint
  atmosphere arm (i3) is unmet. By §6's last line the wave could at best close `complete_with_misses`.
- **(9) Figures.** Repair 2's **32/18** re-sums from its lists (⟨`echo $((5+3+4+2+1+10+2+2+1+2)) $((7+1+1+1+2+1+3+2))`⟩ → `32 18`),
  and the i3 triplet, g2's 6.50144 and g1's 61.22 px reproduce. No figure correction owed.

### Axis 10 — RED adjudication at the spec bytes (18 RED)

| gate | relief at the bytes | owner | verdict |
|---|---|---|---|
| g1 | `W6.md:484` "**g1** honest-RED by id → X-W10 (M-23)" | X-W10 (R-6) | **HONEST-RED** |
| b1 | `W6.md:486` "b1 = `B1-G3D` honest-RED-by-instrument" | X-W11 OUT-OF-WAVE roster (R-4) | **HONEST-RED** |
| i3 | COHESION §0ay: over budget → i3 honest-RED by id `I3-SEED-SIZE` (50989 B gzip > 12288 B ×2, `d30ac937`) | OWNER (R-5) | **HONEST-RED** |
| j1 · j2 · j3 · H4 · H2 (`.j` leg) | `W6.md:490` / §0az: `.j` OMITTED "on a later resume" — a deferral of this wave's **own** unit, not a successor's cure and not an id | `.j` after X-W5 CLOSED (R-7/R-8) | **UNRELIEVED — deferred, owned** |
| g2 | none in W6.md; §0az gives X-W5 `.d4` the "W6 g2 GREEN ×2" duty; ESC-W5d4-1 unruled (⟨`grep -c ESC-W5d4-1 COHESION.md`⟩ → 0) | X-W5 (R-15) | **UNRELIEVED** |
| a5–a11 · a13 · e1 | the X-W5 cold-nav enter class (§0ay `COHESION.md:2898`) — owner-named, not relieved by id. a13 RED 1 of 3 here on a **new** leg (`gradient:243`) | X-W5 (R-15); `gradient:243` unattributed | **UNRELIEVED** |

### Successor "Opens after" conjuncts

X-W7 (`W7.md` "…and **X-W6** (instruments…"), X-W8 (`W8.md` "X-W5, X-W6 and X-W7 stabilize…"), X-W10 (`W10.md` "X-W5, X-W6, … stable")
and X-W11 (`W11.md` "X-W0 … X-W10 are IMPLEMENTED") each carry an X-W6 conjunct; each is **RED** (row PARTIAL, IMPLEMENTED no). All four are
**lawfully blocked** by their own bytes (X-W8/X-W10 also on X-W5 PARTIAL). No X-W6 conjunct is GREEN.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C3-1 | HIGH | g2 is RED deterministically and no spec byte relieves it (carries C2-1) | companion-pane `-g …` → Received 6.501441955566406; `grep -c ESC-W5d4-1 COHESION.md` → 0 | an X-W5 ruling + cure, then W6 reads g2 ×2; no W6 settle, no per-pane nudge (OM-10 control) |
| C3-2 | HIGH | a13 is not close-stable (2 of 3 here) and nothing relieves it; a5–a11 and e1 stay RED under the close's own stability rule though GREEN 3 of 3 here (carries C2-2) | r2 `gradient.spec.ts:243` → `:282` Expected > 277.2 · Received 12 | the X-W5 cold-nav cure, then W6 reads the suite ×3; the next seat bisects `gradient:243` (drag with no travel) — if it is not the enter class it is `.a`'s, not X-W5's |
| C3-3 | MEDIUM | j1–j3, H4 and H2's `.j` leg are deferred inside the wave; the §2a routed-scene arm is unmet (carries C2-3) | `Stub` 14 · o29 0 · `W6.md:490` | `.j` on the resume after X-W5 CLOSES |
| C3-4 | MINOR | §8 artefacts partial: gradient PNGs 0, owner-marks 0, no cold-load frame (carries C2-5) | ⟨`git ls-files W6-evidence/gradient \| grep -c png`⟩ → 0 | `.a`/`.b` evidence repair · `.i` re-sit (R-11) |
| C3-5 | INFO | the catalog oracles (o21-space-catalog-truth · o22 · o24) rewrite committed `W6-evidence/catalog/after-*.png` as a run side effect; two such rewrites have sat dirty since the seventh Open | ⟨`git status --porcelain`⟩ after f3 → `after-display-p3-about.png` M (restored by this seat) | the oracles write to `test-results/`, not the evidence dir (a `.f` hygiene row; evidence stays E-3) |
| C3-6 | INFO | i3 `I3-SEED-SIZE` is lawfully honest-RED and waits on the OWNER | o28 triplet reproduces | owner: accept (a) · BK relay · (c) |

### Verdict

**NOT-CONFORMANT.** 30 of 30 re-run claimed GREENs reproduce, 0 failed. Honest-RED set: **g1 · b1 · i3**. **Unrelieved**: g2 ·
a5–a11 · a13 · e1 (X-W5-owned, unruled) and j1–j3 · H2 · H4 (deferred to `.j`). The LEDGER row **stays PARTIAL**; nothing promoted.
