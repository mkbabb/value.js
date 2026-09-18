SERVED MODEL: claude-opus-5[1m]

# X-W4 — Semantic controls and action ownership (Track A · X·V) — EXECUTION RECORD

**Spec**: `docs/tranches/X/waves/W4.md` (559 lines, read WHOLE) · **Runbook**:
`docs/tranches/X/EXECUTION-RUNBOOK.md` §1.1 · §3.4 · §5 · **Rulings**: `docs/tranches/X/COHESION.md`
§0i · §0j · §0k · §0k(second) · §0l · §0m · §0n · §0o (read to the file end, 1,070 lines)
**Seat**: seat 0 (OPEN), Opus (`claude-opus-5[1m]`) · **Track A** · **wave X-W4**
**Sitting date**: **2026-09-17** (the begin-word's sitting). **Wall clock at this seat**:
`2026-09-18 11:02:59 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`.
**HEAD at open**: `fb03d5f9` ⟨cmd⟩ `git log --oneline -1` · **branch** `tranche-u`
⟨cmd⟩ `git rev-parse --abbrev-ref HEAD`.

---

## Open

### 0. What this seat did and did not do

This seat wrote **zero bytes into any `§4 File Bounds` path**. It swept mail, verified the
preconditions, ran the born-RED baseline **read-only**, and banked the unit plan. Every number below
is **double-run** and quoted by its command (⟨cmd⟩ … → output). No gate was moved, no bar touched, no
grep narrowed.

### 1. Preconditions — measured at the bytes AND in the ledger

The spec's §1 `Opens after` line reads, verbatim (`W4.md:6`):

> **Opens after**: X-W1 (CC-031 restores `e2e-smoke` as a HARD job — every gate here is a Playwright
> assertion in the `smoke` / `smoke-mobile` projects) and X-W0 (CC-019's structural proof-farm ban,
> which fixes the gate FORM: specs, never `scripts/proof-*.mjs`)

| conjunct | test | measurement | verdict |
|---|---|---|---|
| **X-W0 — ledger status** | `CLOSED` or `IMPLEMENTED` | **`CLOSED 2026-09-17 (honest-RED: HG-8's literal byte-diff clause — ESC-N1)`**; its CHECK 3 states in its own row: *"no successor is blocked by X-W0"* | **MET** |
| **X-W0 — named artefact (CC-019's structural ban; the gate FORM)** | no `scripts/proof-*.mjs`; gates are Playwright specs | ⟨cmd⟩ `find scripts -name "proof-*.mjs" \| wc -l` → **0**; ⟨cmd⟩ `ls scripts/proof-*.mjs` → *no matches found* | **MET** |
| **X-W0.j — the `.g` trigger** | census verdict, dated | `docs/tranches/X/W0/GLASS8-REPIN-CENSUS.md` §0: **FAIL — 1 of 4 at the elected target 8.0.0** (9.0.0 reads 0/4). Re-measured **three** times at X-W0's CHECK 1/2/3 and unchanged | **FAIL → `X.W4.g` STAYS CLOSED** |
| **X-W1 — named artefact (CC-031's HARD `e2e-smoke`)** | the job exists and no waiver mechanism | `.github/workflows/ci.yml:119-148` — job `e2e-smoke` (`# ── G-2 · the browser suite, HARD ──`) runs `--project=smoke --project=smoke-admin --project=smoke-mobile --project=smoke-reactivity --project=smoke-perf`; `:149-175` job `e2e-safari`. ⟨cmd⟩ `grep -rn "continue-on-error" .github/workflows/` → **1 hit, `ci.yml:26`, inside a prose comment**, none on any job or step. Landed at **`ec654158`** *"ci(x-v/w1.a): the verification surface — eight Playwright projects stop being CI-orphans, and the two named waiver mechanisms appear nowhere"*, present in HEAD's history | **MET** |
| **X-W1 — ledger status** | `CLOSED` or `IMPLEMENTED` | **`OPEN 2026-09-17`** — the wave is live, unit `a` landed | **NOT met on the letter — see §1.1** |
| **the gate substrate the spec names** | the `smoke` / `smoke-mobile` projects exist and partition correctly | `playwright.config.ts:146` `name: "smoke"`, `testDir: "./e2e/smoke"`, `testIgnore: ["**/admin/**","**/mobile/**","**/safari/**","**/perf/**","**/reactivity-instant.spec.ts"]`; `:180` `name: "smoke-mobile"`, `testDir: "./e2e/smoke/mobile"`, `devices["Pixel 7"]` | **MET** — and see §1.2 |

#### 1.1 The X-W1 conjunct — the divergence, stated loud and not resolved by presumption

Three instruments disagree on whether X-W1 gates this wave, and the disagreement is recorded rather
than laundered:

1. **The spec** (`W4.md:6`, `:467-472`) names X-W1 as a dependency, with its reason stated:
   *"without it these sixteen gates exist but are unenforced, which is the exact disease DR-09
   booked."*
2. **The ledger's own `opens after` cell for this wave** reads **`X-W0`** — X-W1 is not in it
   ⟨cmd⟩ `grep -n "^| X-W4 " docs/tranches/X/execution/LEDGER.md` →
   `| X-W4 | X-W0 | planned | | 4 serial + .g trigger-gated (X-W0.j) |`.
3. **The runbook** — which this ledger's own preamble names as the **authority of order**
   (*"Authority of order: `../EXECUTION-RUNBOOK.md` §1"*) — draws **no X-W1 → X-W4 edge** in §1.1's
   edge table, and states at `:131-132`: *"**Parallel inside track A**: W1 · W2 · W3 · W9 · W4 · W6 ·
   W10 are independent once W0 closes, subject to the four-workflow cap and the W6⟂W7 write-order."*

**This seat's reading, with its reason**: the conjunct is **MET in substance and the wave opens**,
because the spec's own operative clause — *"CC-031 restores `e2e-smoke` as a HARD job"* — is
**measured true at the bytes** (`ec654158`, both jobs HARD, both named waiver mechanisms absent, both
gate projects present), so the harm the dependency exists to prevent (gates that exist but are
unenforced) **does not obtain**; the ledger's own precondition cell for this row is X-W0, and X-W0 is
CLOSED; and the authority of order places W4 parallel to W1. **What is NOT claimed**: that X-W1 is
CLOSED or IMPLEMENTED — it is neither, it is OPEN. If the orchestrator reads the conjunct on its
letter rather than its clause, the correct act is to hold dispatch of units a–d until X-W1 stamps;
**nothing in this record presumes that ruling**, and no product byte has been written that such a
hold would have to undo.

**The near-precedent is named, not hidden**: the immediately preceding Track A seat returned
`{blocked}` for X-W10 (`fb03d5f9`) — but on a materially different measurement: **all five** of that
spec's predecessors read `planned`, i.e. never opened and no artefact present. Here one predecessor
is CLOSED, the other is OPEN **with its named artefact landed and measured**.

#### 1.2 Concurrency with the live X-W1 — measured disjoint

X-W1 is OPEN on the same track. Its §File Bounds (`W1.md:143-170`) hold `.github/workflows/ci.yml`,
`.github/workflows/deploy-pages.yml`, `e2e/visual/**`, four named `e2e/smoke` **fixtures**, three
named oracle/perf **specs** (`o16`, `o26`, `o5-boot-pacing`), `e2e/fixtures/palette-envelopes.ts`,
four `scripts/**` files, `playwright.config.ts`, `tsconfig.e2e.json`, `package.json` (scripts block),
`W1-LOG.md`, `docs/tranches/X/evidence/w1/**`. **Intersection with X-W4's §4 set: ∅** — W4 touches no
`.github/**`, no `playwright.config.ts`, no `package.json`, and none of W1's four fixtures or three
named specs; W1 touches no `demo/**`, no `eslint.config.js`, and neither `e2e/smoke/views/gradient.spec.ts`
nor any of W4's five new spec paths. **Watch-item (recorded, not ruled)**: W1's §Disjointness prose at
`W1.md:176` spells X.W1.a's hold as *"`e2e/smoke/**` fixtures + `test.fail()` specs"*; the governing
**table** enumerates files, and none is W4's. If a later X-W1 seat reads that prose as a glob over
`e2e/smoke/**`, the two waves collide on W4's five new spec files and the orchestrator must sequence.

#### 1.3 Owner-gated items — each RULED, cited, never re-opened

| item | ruling | id |
|---|---|---|
| the Glass-8 election for value.js | **8.0.0**, registry-pinned (`v8.0.0` @ `17a11bc5`); *"Nothing here elects a tag"* | COHESION **§0i.2** (+ erratum **§0i.5**) |
| the `X.W4.g` trigger | census **FAIL 1/4** at 8.0.0 → **`X.W4.g` stays CLOSED, the §1.M bank stays shut**; a FAIL is a complete dated result, not a deferral | X-W0.j `GLASS8-REPIN-CENSUS.md` §0, re-affirmed at X-W0 CHECK 1 · 2 · 3 |
| U-F12 Pole A/B (dark-accent) | **POLE B** — Pole A *"re-opens dark-accent work X-W4 was not sized for"*; **no dark-accent work in this wave** | COHESION **§0j.A** |
| model tiering for this wave | every seat is an implementation seat → **Opus** (M-23); no design authoring here (X-W10 owns the twice-authored track) | `W4.md:219-222` · runbook §5.1 |
| `scripts/dev/dev.sh` | **NEVER touch**, never staged, permanent for tranche X | COHESION **§0j.A** (DR-24) |

#### 1.4 The sequencing locks the orchestrator named — read, and measured

- **A-1-before-A-3** (runbook §3.4; REFINEMENT-FOLD §3 a.1): *"A-1 must land BEFORE or WITH A-3's
  sink repair — mounting the sink first converts a silent bug into a user-visible lie on a successful
  login."* This is the **SLUG-CHAIN** ordering. **Measured**: the SLUG-CHAIN cure surface named by the
  corpus (`demo/palettes/useSlugMigration.ts` · `demo/palettes/usePalettePorts.ts` ·
  `demo/shell/useViewManager.ts` — `X-W4-FOLD.md:3a`) is **in no W4 §File Bounds row**. The lock is
  therefore **recorded and inert in this partition**: unit a touches `SlugEditLayer.vue` for **target
  geometry and a name only**. If any seat finds a SLUG-CHAIN cure necessary to turn A1/A2/A4, that is
  a **§3a file-bounds ESCALATION** (triumvirate), never a quiet widening.
- **MP-3 same-change guard** (runbook §3.4; REFINEMENT-FOLD §3 b.2; `X-W4-FOLD.md:218`, `:296` gate
  **N10**): *"the moment X.W4.d cures GAB-2 by binding refs it ARMS an out-of-ErrorBoundary throw —
  X.W4.d lands the guard (or boundary rescope) IN THE SAME CHANGE."* **Binding on unit d**, and
  landable in bounds (`App.vue` is unit d's `modify-carve`). `startMix` is the sole throwing exposed
  member; its dock dispatch (`usePaneRouter.ts:221`) sits outside the only ErrorBoundary, which is
  inside `<main>` around `.pane-container` while the dock band closes before `<main>`.
- **AB-32** (REFINEMENT-FOLD §3 b.3): the `SceneActionSet` collapse **carries an active/selected
  member**, or the palette indicator regresses under a green gate. Binding on unit d.
- **`X.W4.g` is CLOSED** (§1.3), so §4a's "g never runs concurrently with a/b/c/d" is moot and the
  four units are the whole wave.

#### 1.5 The fold layer's BoundsDelta — declared, and declared NOT adopted

`docs/tranches/X/refinement/X-W4-FOLD.md` §3 proposes **31 distinct paths** the corpus says this wave
needs (ProfileSection/MobileMenuDropdown twins, SpectrumCanvas, ColorComponentDisplay,
PaletteRenameInput, PaginationBar, AdminListSkeleton, ParseEchoReadout, the SLUG-CHAIN trio, the
GEN-CLUSTER, ExtractControls, …). That fold states in its own bytes that `W4.md` §4 is
**byte-untouched (E-3)**, and `W4.md:16` states SPECIFIED *"**YES — by this file, and nothing
more**"*. **Therefore: the writable set of every unit below is `W4.md` §4 and nothing else.** Any cure
that requires a BoundsDelta path is an **ESCALATION** under §3a, returned with its measurement — it is
not a licence to widen. Recorded here so no executing seat rediscovers the tension as a surprise.

### 2. E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock (**2026-09-18 11:00 EDT**, sitting date 2026-09-17) and
compared against **every row** of `docs/tranches/V/coordination/INBOX.md`; classification taken from
each row's **Status cell**, never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**); `INBOX.md`
**self-excluded** (SELF-COUNT law).

1. `docs/tranches/V/` (10 `.md`) + `docs/tranches/V/coordination/` (18 entries) — newest inbound
   `value-inbox-2026-09-17-o8-o11-amendment-addendum.md` (rowed, 16 hits); the two 09-18 entries are
   `INBOX.md` itself and **our own outbound** `valuejs-outbound-2026-09-18-kfw7-bh-relay.md`
   (Track B's KF.W7 relay, already rowed).
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest glass tranche dir**
   ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -4` → `BK/` · `BJ/` · `BI/` · `IOS27-MICRO/`.
   Eight entries; the three 2026-09-17 17:43 letters are rowed as **I-32 · I-33 · I-34**
   (⟨cmd⟩ `grep -c` per basename → 6 · 6 · 5), the 08-29 ACK as **I-30** (18 hits).
3. `../keyframes.js/docs/tranches/V/coordination/` — 12 `.md` + `vnext/`; newest
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` (**our own outbound at their end**).
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 24 files, newest mtime 2026-08-03, nothing
   new since.

**Delta since the last recorded sweep (KF.W7 close, 01:36 EDT)** ⟨cmd⟩
`/usr/bin/find <each path> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-18 01:36"` →
`INBOX.md` (self-excluded) and `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` (ours, outbound) only.

**Result: 0 unrowed value.js-addressed letters · 0 new `I-n` minted here** (max stays **I-34**) ·
**0 UNREAD in X-W4's scope.** Three rows carry status **UNREAD 2026-09-17** — I-32, I-33, I-34 — and
all three are routed by their own Routing cells to the **X formation mail seat / X-W0.j / X-EXT-1..6**,
never to X-W4. Measured against this wave's own vocabulary ⟨cmd⟩
`grep -Eic "labeled-field|LabeledField|SelectTrigger|control-h-|slider-range-origin|SceneActionSet|gradient stop|control-floor|size axis|aria-valuetext"` over each of the three letters → **0 · 0 · 0**.
Their §EXTERNAL receiving cell inside this wave is **`X.W4.g`**, which is **CLOSED** by the census.

---

## Baseline

**Method**: every command below was run **read-only** at HEAD `fb03d5f9`, and **double-run** —
both runs printed identical values (⟨cmd⟩ the loop in §Baseline receipts). **13 of the 16 gates are
born-RED by the spec's own count; this seat reproduces every RED it can reach without writing the
gate's own spec file**, and classifies the rest honestly.

### Gate table

| # | unit | verdict at open | how measured here |
|---|---|---|---|
| **A1** | a | **RED — UNRUNNABLE-AT-OPEN as a command; RED source-certain** | its command names `e2e/smoke/a11y-control-targets.spec.ts`, which **unit a creates** ⟨cmd⟩ `ls e2e/smoke/*.spec.ts` → 14 specs, **no `a11y-control-targets`**. Source witnesses reproduce: `SlugEditLayer.vue:84` `placeholder="enter slug or token..."` on a bare input; three `DockControl compact` at `:91-99`, `:104-110`, `:112-118`; `.channel-rail-item` at `ConsoleRail.vue:33` |
| **A2** | a | **RED — same form, coarse matrix** | same spec, `--project=smoke-mobile`; project exists (`playwright.config.ts:180`, Pixel 7) |
| **A3** | a | **RED, measured** | ⟨cmd⟩ `grep -rn 'class="[^"]*\bh-7\b' demo --include='*.vue' \| grep -v 'w-7 h-7' \| wc -l` → **18** (spec: 18 — **reproduces exactly**) |
| **A4** | a | **RED, measured (source-certain)** | site 1 `SlugEditLayer.vue:84` — `placeholder` only. site 2 `PalettesPane.vue:33-37` — a producer `<SearchBar>` with `placeholder="Search your palettes..."` and **no name prop**; see the A4 note below |
| **A5** | a | **not RED — one-time falsifier demonstration, owed at unit a** | an act, not a measurement; its red/green pair is banked to `evidence/W4/a-falsifier.txt` |
| **B1** | b | **RED, measured** | ⟨cmd⟩ `grep -rn '<SelectTrigger' demo --include='*.vue' \| wc -l` → **13** (spec: 13) · ⟨cmd⟩ `grep -rn '<label' demo --include='*.vue' \| grep -v 'for=' \| wc -l` → **9** (spec: 9) · `.section-label` — see the divergence below |
| **B2** | b | **RED, measured** | ⟨cmd⟩ `grep -rn 'class="[^"]*\bh-9\b' demo --include='*.vue' \| wc -l` → **15** (spec: 15) |
| **B3** | b | **GREEN-BEFORE-CURE, as the spec declares** (regression fence + a receipt owed **before** the first slider prop edit) | ⟨cmd⟩ `grep -rn -- '--slider-range-origin' demo src \| wc -l` → **0** · installed glass **7.0.0** ⟨cmd⟩ `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` · `dist/components/slider/types.d.ts:11-12` `dir?: Direction;` `inverted?: boolean;` |
| **C1** | c | **RED, measured (source-certain)** | `GradientStopEditor.vue:201-213` — `<div ref="barRef" data-testid="gradient-stop-bar">` with `cursor-copy`, `@pointerdown/@pointermove/@pointerup/@pointercancel/@pointerleave` and **no `role`, no `tabindex`** |
| **C2** | c | **RED, measured (source-certain)** | `:229-236` — `<button type="button" :aria-label="\`Gradient stop at ${Math.round(stop.position)}%\`" class="rail-handle … w-5 h-5 …">`; **no `role`, no `aria-value*`, no `aria-valuetext`, no ordinal** |
| **C3** | c | **RED, measured (source-certain)** | `onHandleKeydown` at `:173-187` handles **ArrowLeft · ArrowRight · Delete · Backspace · Escape** only — **7 keys absent** (Home · End · PageUp · PageDown · ArrowUp · ArrowDown · Space) |
| **C4** | c | **RED, source-certain** | `.rail-handle` carries `w-5 h-5` = **20×20** at `:235`; the painted-box and focus-ring arms are unit c's own project-viewport re-baseline |
| **D1** | d | **RED on its conjunct** (the typecheck leg is GREEN today — see greenBeforeCure) | ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0, 0 lines**. But **two** contracts stand: `demo/color-session/keys.ts:17` `export interface ActionBarContext` and `demo/shell/usePaneRouter.ts:49` `export interface DockActionBar`, selected at runtime by `Dock.vue:156-157` `v-if="actionBar"` / `v-else-if="genericBar"` — **quoted from the bytes** |
| **D2** | d | **RED, measured — and RED in the falsifier's own shape** | ⟨cmd⟩ `npx eslint demo/color-picker/App.vue demo/shell/usePaneRouter.ts demo/shell/dock/` → **exit 0**, because ⟨cmd⟩ `grep -n "no-explicit-any" eslint.config.js` → `:70` and `:184` both `"off"`. The `any` stands: `usePaneRouter.ts:108,109,110` `Ref<any>`; `App.vue:317,318,319` `ref<any>(null)`, `:323,:330` `(el: any)` — **8 type-level sites** (divergence below) · **9** optional-chained dispatches ⟨cmd⟩ `grep -n '?\.()' demo/shell/usePaneRouter.ts \| wc -l` → **9** |
| **D3** | d | **not RED — one-time falsifier demonstration, owed at unit d** | banked to `evidence/W4/d-falsifier.txt` |
| **D4** | d | **RED by construction, source-measured** | `App.vue:83-91` — the mobile `<PaneSlot>` carries `:component`, `:component-key`, `:component-props`, `:transition-name`, `:max`, `appear`, `:on-appeared` and **no `:on-mount`**; the three pane refs stay `null` under the mobile branch, so all 9 `?.()` handlers no-op silently |
| G1–G4 | **g** | **NOT OPENED** | `X.W4.g` is CLOSED by X-W0.j's dated **FAIL (1/4 at 8.0.0)**. For the record only: ⟨cmd⟩ `grep -rn 'watercolor-dot' demo \| wc -l` → **11**, the bank intact and untouched |

### Producer premises — re-verified at the installed bytes (the wave's three glass rows)

- **`--control-h-xs`** ⟨cmd⟩ `grep -rn -- "--control-h-xs" node_modules/@mkbabb/glass-ui/dist/` →
  `dist/styles/tokens/sizing.css:1` `--control-h-xs: max(calc(1.75rem * var(--ui-scale)), var(--control-floor));`
  with `:root { --ui-scale: 1; --ui-coarse-scale: 1.5; --control-floor: 0px; … --touch-target: 2.75rem; }`,
  and `dist/styles/tokens/light-dark.css:1`
  `@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem); } }`
  → **28 px fine / 44 px coarse. The free coarse lift the spec asserts is real at 7.0.0.**
- **`./labeled-field` is a published subpath** ⟨cmd⟩
  `node -e "…exports['./labeled-field']"` → `{"types":"./dist/labeled-field.d.ts","import":"./dist/labeled-field.js"}`.
- **`SliderProps` publishes the seam**: `dir?: Direction` · `inverted?: boolean`
  (`dist/components/slider/types.d.ts:11-12`). **B3's premise holds with no Glass-8 dependency.**

### A4 note — the palette search input is a producer component, and it is still locally curable

The spec describes A4's second site as `<input type="search" class="input-bar-field" placeholder="Search your palettes…">`.
**At HEAD the source line is a producer component**, `PalettesPane.vue:33-37`
`<SearchBar v-model=… class="search-seated" placeholder="Search your palettes..." />` — the spec was
describing the **rendered** element, and `:36` is exactly the `placeholder` line, so the anchor is
live. This seat measured whether the cure is reachable from a consumer **before** planning it:
`dist/components/search/SearchBar.vue.d.ts` publishes `{modelValue, placeholder, icon, tag, size,
surface, variant}` — **no `label`, no `aria-label` prop** — and the component sets `inheritAttrs: !1`
(`dist/search.js:309`). **But** it splits only `class` off `$attrs` and spreads the remainder
**directly onto the `<input>`** (`dist/search.js:336-344`: `b("input", w({ ref_key:"inputRef", ref:s,
type:"search" }, o.value, { value:…, placeholder:…, class:"input-bar-field", onInput:… }))`, where
`o = computed(() => { let { class: _, ...t } = useAttrs(); return t; })`). **Therefore an `aria-label`
placed on `<SearchBar>` lands on the `<input>` itself and A4's second site needs no producer byte.**
Recorded so unit a does not mistake this for a glass row and so no one invents a wrapper.

### Divergences from the spec's 2026-08-03 numbers — recorded, no gate moved

| # | spec | measured here | disposition |
|---|---|---|---|
| **d-1** | B1: *"**14** `.section-label` uses"* | ⟨cmd⟩ `grep -rn 'section-label' demo --include='*.vue' \| wc -l` → **17**; as a class **use** ⟨cmd⟩ `grep -rn 'class="[^"]*section-label' demo --include='*.vue' \| wc -l` → **16**; as `<label class="section-label">` → **3** | **counting-shape divergence, not a defect.** Neither number moves B1, whose assertion is about composed names. Banked for unit b's own re-baseline |
| **d-2** | D2: *"**10** `any` occurrences (App.vue 6, usePaneRouter.ts 3, Dock.vue 1)"* | **8 type-level `any`**; the two remainder hits are **English prose** — `App.vue:64` *"…exists at any"* and `Dock.vue:85` *"…held ⇔ any flag true"* | the gate is an **eslint** gate and eslint counts **types**; the operative number for D2 is **8**, and the RED is unchanged (the rule is `"off"` at two sites). Recorded so a closing seat is not told to delete a comment |
| **d-3** | B1's cure surface | of the **7** files holding `section-label`, only **3** are unit b's (`MixConfigBar.vue`, `GenerateControls.vue`, `GradientVisualizer.vue`); `AdminTagsPanel.vue` and `SearchFilterBar.vue` are **unit a's** files, `MixSourceSelector.vue` is in the **g** table only, and `TagEditPopover.vue` is in **no W4 table at all** | **planning finding.** Unit b cures its three; the four others are **out of its writable set**. If B1's assertion is read as repo-wide, it cannot close in bounds → **§3a ESCALATION**, never a widening |

### greenBeforeCure (R.2)

- **B3** — measured GREEN at open and **declared** non-RED by the spec (`W4.md:390`): a
  recorded-re-test-plus-regression-fence. Its failure mode is *"the wave closes with no receipt"*, so
  the receipt is an **act owed before unit b's first slider prop edit**, not a measurement owed at
  close.
- **D1's typecheck leg** — `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0** today. The
  **gate** D1 is RED on its conjunct (two exported contracts, two render branches); the leg is banked
  so no closing seat can present a green typecheck as D1 met.

### Artefacts — 0 of 9 present at open

⟨cmd⟩ `ls -d docs/tranches/X/waves/evidence/W4` → *No such file or directory*. Artefact **7**
(`navprobe-recheck.txt`) needs a live stack at `http://localhost:9000` under **webkit**
(`docs/tranches/V/megatranche/audit/probes/navprobe.mjs:1-6`) — under §5.2 probe parsimony it is
**MEASURE-AT-UNIT-a**, beside A4's own evidence row, and is **not** spent twice. `X.W4.g`'s artefact 9
is correctly **absent** in the FAIL branch (`W4.md:446-447`).

### Baseline receipts — the double-run

```text
⟨cmd⟩ for i in 1 2; do  h7=$(grep -rn 'class="[^"]*\bh-7\b' demo --include='*.vue' | grep -v 'w-7 h-7' | wc -l) ...
run1: h7=18 h9=15 st=13 sl=17 lbl=9 sro=0 wd=11 any=8 oc=9
run2: h7=18 h9=15 st=13 sl=17 lbl=9 sro=0 wd=11 any=8 oc=9
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit   → EXIT=0, 0 lines
⟨cmd⟩ npx eslint demo/color-picker/App.vue demo/shell/usePaneRouter.ts demo/shell/dock/   → EXIT=0
⟨cmd⟩ find scripts -name "proof-*.mjs" | wc -l     → 0
```

---

## Unit plan

**4 units, ALL Opus (M-23), SERIAL — peak concurrency 1.** The §State `Agents` line is binding
(runbook §5.1): *"4 serial (single worktree; §4a permits parallel a‖c, but the owner's 4-workflow cap
and one shared review surface make serial the cheaper order)"*. `X.W4.g` is **NOT dispatchable** —
X-W0.j returned FAIL. Ordered groups: **[a] → [b] → [c] → [d]**, each on clean main, matching §9's
commit order.

### Group 1 — `X.W4.a` · shell control geometry and naming (Opus)

- **Sections**: §3 Scope 1–3 (`:49-56`) · §5 `### X.W4.a` (`:223-237`) · §6 unit-a table (`:374-382`) ·
  §9 commit rows 1–2 (`:456-457`) · §8 artefacts 1, 2, 3, 7, 8.
- **Writable**: `demo/shell/dock/layers/SlugEditLayer.vue` · `demo/picker/controls/ComponentSliders/ConsoleRail.vue` (carve: the `.channel-rail-item` letters only) · `demo/palettes/PalettesPane.vue` · `demo/palettes/browser/admin/AdminAuditPanel.vue` · `AdminUsersPanel.vue` · `AdminFlaggedPanel.vue` · `AdminTagsPanel.vue` · `AdminNamesPanel.vue` · `demo/palettes/browser/search/SearchFilterBar.vue` · `demo/palettes/browser/dialog/VersionHistoryDrawer.vue` · `e2e/smoke/a11y-control-targets.spec.ts` (create) · `e2e/smoke/mobile/a11y-control-targets.spec.ts` (create) · `docs/tranches/X/waves/evidence/W4/**` (runbook §1.1 execution-artefact grant).
- **Gates**: A1 · A2 · A3 · A4 · A5.
- **Locks**: commit rows 1 + 2 (the cure and its two specs) · A5's falsifier pair is pinned **then
  reverted**, both outputs pasted · A-1-before-A-3 recorded and inert (§1.4) · `navprobe.mjs` is
  `execute, no write` and spent **once**.

### Group 2 — `X.W4.b` · producer control axes (Opus)

- **Sections**: §3 Scope 4–5 (`:57-63`) · §5 `### X.W4.b` (`:239-253`) · §6 unit-b table (`:384-390`) ·
  §9 commit rows 3–4 · §8 artefacts 4, 8.
- **Writable**: `demo/workbenches/mix/MixConfigBar.vue` · `demo/workbenches/generate/GenerateControls.vue` · `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` · `demo/picker/controls/ComponentSliders/ComponentSliders.vue` (carve) · `demo/styles/utils.css` (carve) · `e2e/smoke/a11y-select-title.spec.ts` (create) · `docs/tranches/X/waves/evidence/W4/**`.
- **Gates**: B1 · B2 · B3.
- **Locks**: **B3's `a16-retest-receipt.md` lands BEFORE the first slider prop edit** (commit row 4
  before row 3) — a receipt filed at close is a **failure**, not a pass.

### Group 3 — `X.W4.c` · the Gradient stop rail's keyboard grammar (Opus)

- **Sections**: §3 Scope 6 (`:64-67`) · §5 `### X.W4.c` (`:255-270`) · §6 unit-c table (`:392-399`) ·
  §9 commit row 5 · §8 artefacts 5, 8.
- **Writable**: `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` (carve) · `e2e/smoke/views/gradient.spec.ts` · `e2e/smoke/a11y-gradient-stop-grammar.spec.ts` (create) · `docs/tranches/X/waves/evidence/W4/**`.
- **Gates**: C1 · C2 · C3 · C4.
- **Locks**: assertions read `style.left`, **never** the rounded `aria-label` (GradientStopEditor
  addendum §6) · the pointer-add gesture keeps a live case beside the keyboard one · no new
  hand-rolled rail mechanics (the multi-thumb species is GLASS-ROUTED and banked) · third failed
  role-choice reading halts to the triumvirate (§3a).

### Group 4 — `X.W4.d` · the typed `SceneActionSet` (Opus)

- **Sections**: §3 Scope 7 (`:68-71`) · §5 `### X.W4.d` (`:272-286`) · §6 unit-d table (`:401-408`) ·
  §9 commit row 6 · §8 artefacts 6, 8.
- **Writable**: `demo/color-picker/App.vue` (carve) · `demo/shell/usePaneRouter.ts` (carve) · `demo/shell/dock/Dock.vue` (carve) · `demo/shell/dock/layers/ActionBarLayer.vue` · `demo/shell/dock/layers/GenericActionBar.vue` · `demo/shell/dock/ActionToolbar.vue` · `demo/color-session/keys.ts` (carve) · `demo/picker/ColorPicker.vue` (carve) · `e2e/smoke/scene-action-contract.spec.ts` (create) · `eslint.config.js` · `docs/tranches/X/waves/evidence/W4/**`.
- **Gates**: D1 · D2 · D3 · D4.
- **Locks**: **MP-3 same-change guard** — the ref-binding and its ErrorBoundary guard/rescope land in
  **ONE change** (§1.4) · **AB-32** — the collapse carries an active/selected member · **D4 must NOT
  be closed by wiring the mobile `:on-mount`** (that is X-W5's `bindPane`; doing it here takes X-W5's
  work and the bounds check catches it) · `eslint.config.js` is shared with X-W8/X-W9 — this wave
  writes **only** the action-path `no-explicit-any` object · `ActionButton.vue` is **not in bounds**
  (fold §3a asks for it; §1.5 governs) → if the single-render-path collapse cannot land without it,
  **§3a ESCALATION**.

### Standing on every unit

Born-RED first (the gate's spec before its cure) · WRITE-THEN-MEASURE, every published count
double-run · SELF-COUNT law · quote-by-command · line 1 of any created file is `SERVED MODEL: …` ·
pathspec commits **on the commit itself** (four tracks share this index) · `scripts/dev/dev.sh` never
touched, never staged · glass-ui and every sibling tree READ-ONLY (producer rows ride the BH inbox) ·
no try/catch around a defect, no `test.skip`, no allowlist, no copied producer selector, no
`node_modules` patch · E13 re-swept at each unit's own clock · §7 cadence after each integration
batch (`prettier --check demo e2e` · `eslint demo e2e` · `vue-tsc -p tsconfig.demo.json --noEmit` ·
the four gate specs at both projects · `git diff --check`).

---

## Unit receipts

*(empty at open — each unit appends its own section here, dated, with its served model on its first
line and its gate verdicts quoted by command.)*
