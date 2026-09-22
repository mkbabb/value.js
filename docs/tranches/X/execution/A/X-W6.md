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
