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
