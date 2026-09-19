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
