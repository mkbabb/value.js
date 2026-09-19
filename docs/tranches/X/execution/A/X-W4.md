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

## Resume probe — 2026-09-18 23:5x EDT (dated addendum-beside; E-3: nothing above is rewritten)

**SERVED MODEL: claude-opus-5[1m]** · seat 0 (OPEN), re-seated after the **2026-09-18 host restart
killed the seats mid-work**. Sitting date of record stays **2026-09-17**. Wall clock
`2026-09-18 23:52:07 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`. **HEAD** `d351b84e` ⟨cmd⟩
`git log --oneline -1` · branch `tranche-u`. This seat wrote **zero bytes into any §4 File Bounds
path** and **zero bytes into any path owned by a sibling seat**; its writable set is this record,
`execution/LEDGER.md` and `V/coordination/INBOX.md`, and all three were clean at entry.

### R.1 Crash-recovery — the killed `X.W4.a` seat's partial work, named and NOT touched

⟨cmd⟩ `git status --porcelain` → **15 rows**. Of those, **thirteen are inside `X.W4.a`'s writable
set** and are a killed predecessor seat's partial work on **unit a**:

| inherited path | shape |
|---|---|
| `demo/shell/dock/layers/SlugEditLayer.vue` | M, +45/−1 |
| `demo/picker/controls/ComponentSliders/ConsoleRail.vue` | M, +21/−2 |
| `demo/palettes/PalettesPane.vue` | M, +10/−0 |
| `demo/palettes/browser/admin/AdminUsersPanel.vue` | M, 16 lines |
| `demo/palettes/browser/admin/AdminNamesPanel.vue` | M, 10 lines |
| `demo/palettes/browser/admin/AdminFlaggedPanel.vue` | M, 8 lines |
| `demo/palettes/browser/admin/AdminTagsPanel.vue` | M, 6 lines |
| `demo/palettes/browser/dialog/VersionHistoryDrawer.vue` | M, 4 lines |
| `demo/palettes/browser/search/SearchFilterBar.vue` | M, 4 lines |
| `demo/palettes/browser/admin/AdminAuditPanel.vue` | M, 2 lines |
| `e2e/smoke/a11y-control-targets.spec.ts` | **??**, 426 L, line 1 `// SERVED MODEL: claude-opus-5[1m]` |
| `e2e/smoke/mobile/a11y-control-targets.spec.ts` | **??**, 418 L, same first line |
| `docs/tranches/X/waves/evidence/W4/` | **??**, 19 entries — `a-falsifier.txt` · `a-h7-cascade.md` · `a-screens.md` · `baseline-2026-08-03.json` · `reopen-baseline.json` · `navprobe-recheck.txt` · 12 before/after PNGs (slug cluster · rail letters · admin audit toolbar, fine and coarse) |

⟨cmd⟩ `git diff --stat -- demo/ e2e/` → **10 files, +98/−28**. **Nothing was stashed, restored,
reverted or staged by this seat.** The whole inheritance is handed to the **redispatched `X.W4.a`**,
whose standing obligation is to read that diff whole, judge every hunk against `W4.md` §5/§6,
finish what conforms, rewrite what does not, and name these paths in its receipt. **No unit commit
exists for it** — see R.6.

**The two dirty rows OUTSIDE every W4 unit's writable set, named so no seat touches them**:
`scripts/dev/dev.sh` (unowned, permanent for tranche X, COHESION §0j.A DR-24 — never touched, never
staged) and `docs/tranches/V/reformation/CARRY-LEDGER.md` (M, **+34/−0**; in **no** `W4.md` §4 row —
a sibling's, left exactly as found).

**A stash exists and this seat neither created nor popped it**: ⟨cmd⟩ `git stash list` →
`stash@{0}: autostash` (a rebase/pull autostash), ⟨cmd⟩ `git stash show --stat stash@{0}` → **17
paths / +406/−134** spanning `.github/workflows/ci.yml`, `api/CLAUDE.md`, `package.json`,
`package-lock.json`, `scripts/gates/proof-perf-target.mjs`, `src/**` and five
`e2e/smoke/oracles/*.spec.ts`. **Not one of those paths is in any W4 unit's bounds.** Recorded here
so no X-W4 seat mistakes it for its own work and so nobody pops it — the no-`git stash` law binds
this wave in both directions.

### R.2 Preconditions — re-measured at the bytes AND in the ledger, and **the §1.1 divergence is GONE**

| conjunct | measurement at this clock | verdict |
|---|---|---|
| **X-W0** | ledger row 28: **`CLOSED 2026-09-17 (honest-RED: HG-8's literal byte-diff clause — ESC-N1)`** | **MET** (unmoved) |
| **X-W1** | ledger row 29: **`CLOSED 2026-09-17 (honest-RED: G-17 · G-19 · G-20)`** — *"CHECK 2 (L-20 fresh adversarial pass 2, run 2026-09-18, VERIFY-ONLY) returns CONFORMANT-HONEST-RED and the row IS PROMOTED"* | **MET ON THE LETTER NOW.** §1.1's recorded divergence (X-W1 then `OPEN`, met only in substance) is **resolved by the ledger itself**; nothing in §1.1 is rewritten, it is simply overtaken |
| **X-W1's named artefact** | `ec654158` in HEAD's history; `e2e-smoke` + `e2e-safari` HARD | **MET** (unmoved) |
| **CC-019 gate FORM** | ⟨cmd⟩ `find scripts -name "proof-*.mjs" \| wc -l` → **0** | **MET** |
| **X-W0.j — the `.g` trigger** | `GLASS8-REPIN-CENSUS.md` §0 **FAIL — 1 of 4 at the elected 8.0.0** | **`X.W4.g` STAYS CLOSED** — unmoved across X-W0 CHECK 1·2·3 |
| **§1.2 concurrency** | X-W1 is now CLOSED, so its watch-item (`e2e/smoke/**` read as a glob) **cannot fire**; the five new W4 spec paths are uncontended | **CLEAR** |

### R.3 COHESION re-read to the file end — five addenda are NEW since the open, none rules here

The open cited §0i–§0o; the file is now **1,540 lines** with **§0p · §0q · §0r · §0s · §0t** added
(X.P.W3's docket ×3, X.P.W3.h, KF.W10 ownership). ⟨cmd⟩
`awk 'NR>=1376' docs/tranches/X/COHESION.md | grep -cE 'X-W4|X\.W4'` → **0**. §1.3's ruling table is
therefore unmoved: **§0i.2** (+ **§0i.5**) elects 8.0.0, X-W0.j's FAIL keeps `.g` shut, **§0j.A**
rules U-F12 **Pole B** (no dark-accent work here) and `dev.sh` untouchable, and `W4.md:219-222`
makes every seat Opus.

### R.4 Baseline re-run at `d351b84e` — double-run, and the ONE moved number is the inheritance

```text
⟨cmd⟩ for i in 1 2; do h7=… h9=… st=… sl=… lbl=… sro=… wd=… oc=…; done
run1: h7=3 h9=15 st=13 sl=17 lbl=9 sro=0 wd=11 oc=9
run2: h7=3 h9=15 st=13 sl=17 lbl=9 sro=0 wd=11 oc=9
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit             → EXIT=0, 0 lines
⟨cmd⟩ npx eslint demo/color-picker/App.vue demo/shell/usePaneRouter.ts demo/shell/dock/ → EXIT=0
⟨cmd⟩ grep -n "no-explicit-any" eslint.config.js             → :70 "off" · :184 "off"
⟨cmd⟩ find scripts -name "proof-*.mjs" | wc -l               → 0
```

| gate | at open (11:02, `fb03d5f9`) | now (`d351b84e` + inherited worktree) | reading |
|---|---|---|---|
| **A3** `h-7` sites | **18** | **3** in the worktree — and ⟨cmd⟩ `git grep -n 'class="[^"]*\bh-7\b' HEAD -- 'demo/*.vue' \| grep -v 'w-7 h-7' \| wc -l` → **18 at HEAD** | the 15-site delta is **uncommitted inherited work**, NOT a landed cure. A3 is **RED at the committed bytes**; unit a owns finishing and committing it |
| **A1 · A2** | RED, spec absent | the two spec files now **exist untracked** (426 + 418 L) | still **unmeasured as a command** — no stack is up ⟨cmd⟩ `curl … http://localhost:9000/` → `000`. Unit a re-measures at its own clock (§5.2 parsimony: seat 0 does not spend the run) |
| **A4 · A5** | RED / demo owed | `navprobe-recheck.txt` and `a-falsifier.txt` present untracked, both `SERVED MODEL`-headed | evidence exists, **uncommitted**; unit a judges it against §8 before adopting it |
| **B1 · B2 · B3** | 13 / 15 / GREEN-fence | **13 · 15 · `--slider-range-origin` = 0** | **unmoved** |
| **C1–C4** | RED source-certain | `barRef` `:201-202`, `.rail-handle w-5 h-5` `:235`, `onHandleKeydown` `:173` | **unmoved** |
| **D1 · D2 · D4** | RED | `ActionBarContext` `keys.ts:17`; `DockActionBar` `usePaneRouter.ts:` **`:58`**; `Dock.vue:156-157` `v-if="actionBar"`/`v-else-if="genericBar"`; `Ref<any>` **`:142-144`**; `App.vue:317-319,:323,:330`; mobile `<PaneSlot>` `:83` with `:on-mount` only at `:105`/`:131`; `?.()` = **9** | **unmoved in substance; two anchors DRIFTED** |

**Anchor drift, named with its cause**: `DockActionBar` moved `:49 → :58` and the three `Ref<any>`
moved `:108-110 → :142-144`, because **`504819ea`** (*"fix(demo/router): fail-closed admin guard +
source-realized not-found route + fail-closed pane fallback (CC-037)"*, X.W3.6) landed in
`usePaneRouter.ts` after this wave opened. X-W3 is **CLOSED**, so the file is uncontended now; unit
d must read the live line numbers, never this record's.

### R.5 greenBeforeCure — unchanged, and re-measured

- **B3** — GREEN at open and **spec-declared** non-RED (`W4.md:390`); `--slider-range-origin` = **0**
  again at this clock. Its receipt is an **act owed before unit b's first slider prop edit**.
- **D1's typecheck leg** — `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0, 0 lines** again.
  D1 stays RED on its conjunct (two exported contracts, two render branches).
- **D2's eslint leg reads exit 0 for the wrong reason** — the rule is `"off"` at `eslint.config.js:70`
  and `:184`. Recorded again so the exit code is never presented as the gate.

### R.6 Which units are already done — **none**

⟨cmd⟩ `git log --oneline --all --grep="x-v/w4" -i` → **0 commits** · ⟨cmd⟩
`git log --oneline --all --grep="X\.W4"` → 2 hits, both **authoring-era** (`744bec41`, `8d496214`),
neither a unit landing. The only X-W4 execution commit in history is this record's own open,
**`4cedfdb5`** *"docs(X·exec): X-W4 OPEN — baseline banked, 4 units planned"*. **`alreadyDone` = ∅;
all four units are owed**, and unit **a** is redispatched **with the inheritance above**, never
re-started from zero and never adopted unread.

### R.7 E13 Step-0 — the four-path mail sweep at this seat's own clock

Swept read-only and compared against **every row** of `INBOX.md` (74 `I-`/`O-` rows,
⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+ \|'`), classification from each row's **Status cell**, never from a
bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**); `INBOX.md` **self-excluded** (SELF-COUNT law).

1. `docs/tranches/V/` + `V/coordination/` — ⟨cmd⟩ `/usr/bin/find … -newermt "2026-09-18 11:00"` →
   five 4.1 letters (`parse-that-…-evidence-addendum-2` · `fourier-…-facility19-delta` ·
   `glassui-…-r1-relay` · `atlas-…-export-delta-refresh` · `keyframes-…-cut-notice`) and
   `valuejs-outbound-…-kfw7-bh-relay-ADDENDUM-A9`, **all ours/outbound and all already rowed**
   (⟨cmd⟩ `grep -c` per basename → 2 · 1 · 1 · 1 · 1 · 8); `ARCHITECTURE.md` and
   `PALETTE-CONTRACT.md` are not mail.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed newest** ⟨cmd⟩
   `ls -dt ../glass-ui/docs/tranches/*/ | head -4` → `BK/ · BJ/ · BI/ · IOS27-MICRO/`; the only new
   member `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed (17 hits), **routed
   X·KF (Track B)** by its own cell.
3. `../keyframes.js/docs/tranches/V/coordination/` — **unmoved**; newest is our own outbound.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — **unmoved** since 2026-08-03.

**Result: 0 unrowed value.js-addressed letters · 0 new `I-n` minted (max stays I-35, O-38) ·
0 UNREAD in X-W4's scope.** The rows whose Status cells still read UNREAD — **I-30 · I-31 · I-32 ·
I-33 · I-34** — are routed by their own Routing cells to the X formation mail seat / X-W0.j /
X-EXT-1..6, and the one that names this wave (**X-EXT-1**, the four `./search` edges) routes to
**`X.W4.g`**, which the census FAIL keeps **CLOSED**. Nothing lands on units a–d.

### R.8 The unit plan is re-affirmed unchanged

**4 units, all Opus (M-23), SERIAL — groups `[a] → [b] → [c] → [d]`, peak concurrency 1** (§State
`Agents`, binding under runbook §5.1). `X.W4.g` is **NOT dispatchable**. The sequencing locks of
§1.4 stand as written: **A-1-before-A-3** recorded and inert (the SLUG-CHAIN cure surface is in no
§4 row — any need for it is a §3a ESCALATION), **MP-3 same-change guard** binding on unit d,
**AB-32** binding on unit d, and §1.5's rule that the fold layer's 31-path BoundsDelta is **declared
NOT adopted** — `W4.md` §4 is the whole writable set and widening is an escalation, never a licence.

---

## Unit receipts

*(empty at open — each unit appends its own section here, dated, with its served model on its first
line and its gate verdicts quoted by command.)*

### X.W4.a

**SERVED MODEL: claude-opus-5[1m]** · Opus implementation seat (M-23, `W4.md:219`) ·
**Track A · wave X-W4 · unit a** · redispatched after the **2026-09-18 host restart killed the
predecessor seat mid-work**. Sitting date of record stays **2026-09-17**. Wall clock at this seat
`2026-09-19 00:05:02 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`. **HEAD at entry** `849206f0`
⟨cmd⟩ `git log --oneline -1` · branch `tranche-u`.

**Sections executed**: `W4.md` §3 Scope 1–3 (`:49-56`) · §5 `### X.W4.a` (`:223-237`) · §6 unit-a
gate table (`:374-382`) · §9 commit rows 1–2 (`:456-457`) · §8 artefacts 1, 2, 3, 7, 8.
**Rulings consumed**: COHESION §0j.A — **U-F12 Pole B** (no dark-accent work; none done) and
**DR-24** `scripts/dev/dev.sh` NEVER touched. COHESION re-read to the file end (**1,540 lines**,
§0p–§0t new since the open); ⟨cmd⟩ `awk 'NR>=1376' docs/tranches/X/COHESION.md | grep -cE 'X-W4|X\.W4'`
→ **0** — no later addendum rules on this unit.

---

#### a.0 CRASH-RECOVERY — the inheritance, read WHOLE and judged hunk by hunk

⟨cmd⟩ `git status --porcelain` at entry → **15 rows**; **13 inside this unit's writable set**, all
a killed predecessor seat's partial work on **this** unit. Nothing was stashed, reset, restored or
blanket-adopted. The two rows OUTSIDE the set — `scripts/dev/dev.sh` (DR-24) and
`docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's) — were **left exactly as found**, and
`stash@{0}` was **never popped** (its 17 paths are in no W4 bound).

⟨cmd⟩ `git diff --stat -- demo/` → **10 files, +98/−28**, read in full before one byte was written.
The two untracked specs (**426 L** + **418 L**) and the 19-entry `evidence/W4/` were read whole.

| inherited path | judged against | verdict |
|---|---|---|
| `demo/shell/dock/layers/SlugEditLayer.vue` | §5 "producer's own sizing tokens" + §3 Scope 2 | **CONFORMS** — `--dock-compact-control-size` and `--control-floor` verified as real producer properties at the installed bytes (below); `aria-label`, not `placeholder`, carries the name |
| `demo/picker/controls/ComponentSliders/ConsoleRail.vue` | §3 Scope 1 (fine floor + coarse floor) | **CONFORMS IN EFFECT, ONE HUNK REWRITTEN** — see a.2 |
| `demo/palettes/PalettesPane.vue` | §3 Scope 2 + the open's §A4 note | **CONFORMS** — and the §A4 note is now *measured true at runtime*, not merely read off `dist/search.js` (below) |
| the five admin panels · `SearchFilterBar.vue` · `VersionHistoryDrawer.vue` | §3 Scope 3 (`h-7` → `size="xs"`) | **CONFORM** — and `variant=` correctly left untouched everywhere (the dead emphasis axis is **X-W8's**, `W4.md:86-88`) |
| `e2e/smoke/a11y-control-targets.spec.ts` · `e2e/smoke/mobile/…` | §6 census rule · attribution rule · name rule · CC-019 gate FORM | **CONFORM** — verified line by line against `W4.md:354-367`; no `test.skip`, no allowlist, no narrowed census, no relaxed assertion |
| `evidence/W4/` (6 text artefacts + 12 PNGs) | §8 artefacts 1, 2, 3, 7, 8 | **CONFORM** — every text artefact carries `SERVED MODEL` on line 1, both JSON artefacts a `servedModel` key |

**Nothing was treated as done until the gates this unit owns measured green at this seat's own
clock** (a.3). The inherited paths are named again in a.6.

#### a.1 Producer premises re-verified at the installed bytes (never assumed from the record)

- ⟨cmd⟩ `grep -rn 'dock-compact-control-size' node_modules/@mkbabb/glass-ui/dist/` →
  `components/dock/styles/controls/icon-button.css`:
  `.dock-icon-button--compact { width: var(--dock-compact-control-size, auto); height: var(--dock-compact-control-size, auto); … }`
  — **one property drives BOTH axes**, which is why the `.slug-control` cure is a single declaration.
- ⟨cmd⟩ `grep -rho -- '--dock-touch-target:[^;]*;' node_modules/@mkbabb/glass-ui/dist/` → `2.75rem;`
  (declared in `dist/styles/tokens/sizing.css`) — the rail rung's token is the **producer's**, not a
  demo literal.
- `ButtonProps` publishes `size?: Extract<Size,"xs"|"sm"|"md"|"lg">`
  (`dist/components/button/Button.vue.d.ts:5`) and `dist/components/button/styles.css` carries
  `.button[data-size="xs"] { --button-size: var(--control-h-xs); … }` — `size="xs"` **is** the
  published rung, and `demo/ui/button/index.ts` is one line: `export { Button } from "@mkbabb/glass-ui";`,
  so every cured site is a **producer** control. `demo/ui/**` was read, never written.

#### a.2 The one hunk this seat REWROTE, with its reason

`ConsoleRail.vue`'s inherited fine-pointer floor was stated in the **logical** pair
(`min-inline-size` / `min-block-size`) while the touch rung fourteen rules below states the same
floor in the **physical** pair (`min-height` / `min-width`, `:342-343`). The used value is identical
in `horizontal-tb` and the coarse rung still won — but it won only through the logical↔physical
resolution rule rather than by two rules declaring the same property in plain cascade order, which
is a subtlety a later reorder could silently invert. Rewritten to `min-width` / `min-height`, the
file's own convention, with the reason recorded in the declaration's comment.
**Re-measured after the rewrite** (a.3, run 3): every box byte-identical — `l`/`a`/`b` 24×24.4 fine,
31.7×44 coarse. A no-op on behaviour, by design.

#### a.3 Gate readings — BEFORE → AFTER, at this seat's own clock, DOUBLE-RUN

Commands, verbatim:
⟨cmd⟩ `npx playwright test --project=smoke e2e/smoke/a11y-control-targets.spec.ts`
⟨cmd⟩ `npx playwright test --project=smoke-mobile e2e/smoke/mobile/a11y-control-targets.spec.ts`

Run 2 and run 3 (run 3 = after the a.2 rewrite) printed **identical** readings:

```text
[W4-A1] undersized=2            [W4-A2] undersized=2
[W4-A3] measured=4 mismatches=0 [W4-A3-COARSE] measured=0 mismatches=0 unlifted=0
[W4-A4] nameless=0              [W4-A4-COARSE] nameless=0
```

| gate | BEFORE (`reopen-baseline.json`, born-RED, pre-byte) | AFTER (this seat, double-run) | verdict |
|---|---|---|---|
| **A1** fine | undersized **13** | **2** | **RED-CARRIED** — see a.4 |
| **A2** coarse | undersized **10** | **2** | **RED-CARRIED** — the same two rows |
| **A3** fine | measured 4 / mismatches 0; source `h-7` **18** | measured 4 / mismatches 0; source `h-7` **3** | **GREEN** |
| **A3** coarse | population 0 | population 0 / mismatches 0 / unlifted 0 | **GREEN (empty population, recorded)** |
| **A4** | nameless **3** fine / **2** coarse | **0** / **0** | **GREEN** |
| **A5** | owed | `a-falsifier.txt`, delta **5 → 2** with the pin named on both routes | **DEMONSTRATED** |

⟨cmd⟩ (double-run) `grep -rn 'class="[^"]*\bh-7\b' demo --include='*.vue' | grep -v 'w-7 h-7' | wc -l`
→ **3** · `git grep` of the same at HEAD → **18**. `run1: h7_worktree=3 h7_HEAD=18` /
`run2: h7_worktree=3 h7_HEAD=18`.

**The cured boxes, read out of the census rows of run 3 (not from the predecessor's record):**

| element | fine (smoke 1280×720) | coarse (smoke-mobile Pixel 7) | name |
|---|---|---|---|
| `input.slug-input` | 160 × **28** | 160 × **44** | `Slug or admin token` |
| 3 × `DockControl compact .slug-control` | **24 × 24** | **44 × 44** | Switch to slug · Generate new slug · Cancel |
| `.channel-rail-item` l · a · b | **24** × 24.4 | 31.7 × **44** | `l/a/b channel` |
| `.channel-rail-item` alpha | 24.5 × 25.4 | 31.7 × **44** | `alpha channel` |
| `input.input-bar-field` (palettes search) | 414 × **24** | not mounted | `Search your palettes` |

**The §A4 note is now measured, not inferred.** The open recorded from `dist/search.js` that an
`aria-label` on `<SearchBar>` would reach the inner `<input>` because the producer sets
`inheritAttrs: false` and splits only `class` off `$attrs`. At runtime the census row reads
`tag=input · cls="input-bar-field" · name="Search your palettes"` — **the attribute lands on the
input itself.** No producer byte, no wrapper, no copied selector; A4's desktop-only second site is
closed from the consumer, exactly as the note predicted.

#### a.4 A1 / A2 — RED-CARRIED, and precisely why this unit may not close them

Both matrices carry **the same two rows and only those**:

```text
/#/gradient · <button> "Gradient stop at 0%"   20×20 [class="rail-handle … w-5 h-5 …"] attributedTo=self
/#/gradient · <button> "Gradient stop at 100%" 20×20 [class="rail-handle … w-5 h-5 …"] attributedTo=self
```

They live in `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` — **X.W4.c's**
file (`W4.md` §4a: *"c owns `GradientStopEditor.vue`"*) and the **literal subject of gate C4**
(*"handle attributed target ≥ 24×24"*, `W4.md:399`, RED-measured there as `.rail-handle` **20×20**).
`W4.md` §6 books them into A1's and A2's own RED counts *and* into C4 — the wave is authored so A1/A2
go fully green **only after unit c lands**. Curing them here is the bounds breach §3a forbids.

**This is NOT §3a's A1/A2 escalation trigger.** That trigger reads *"means the target is owned by a
producer box we cannot reach from a consumer"* — these are consumer bytes in a sibling unit's file,
reachable and already owned. Recorded, not escalated; **A1 and A2 turn on unit c's landing, and the
same two spec files re-measure them with no edit.**

#### a.5 §7 cadence

```text
⟨cmd⟩ npx eslint <the 12 touched paths>              → EXIT 0
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit     → EXIT 0
⟨cmd⟩ npx tsc -p tsconfig.e2e.json --noEmit          → EXIT 0
⟨cmd⟩ git diff --check -- demo e2e                   → EXIT 0
⟨cmd⟩ npx prettier --check <the 2 new spec files>    → CLEAN
```

**`prettier --check demo e2e` is RED and was NOT cured — measured as pre-existing, not inherited
debt of this unit.** ⟨cmd⟩ `npx prettier --check demo e2e` → *"Code style issues found in **202**
files"*. All **ten** touched `.vue` files are unclean **at HEAD too**: their HEAD blobs were
extracted to a scratch tree and checked — ⟨cmd⟩ `npx prettier --check <scratch>/demo` → **10 of 10
warn**. Reformatting 202 files (or even the 10) would bury this unit's meaning in churn and is not
its scope. The two files this unit **created** are prettier-clean, so **no new format debt is
introduced**. Recorded for X-W11's hygiene walk.

`npm run typecheck` (library `vue-tsc`) is unaffected — this unit wrote **no `src/` byte**.

#### a.6 Commits — pathspec on the commit itself, one meaning each

| # | sha | scope | paths |
|---|---|---|---|
| §9 row 1 | **`8934de85`** | `fix(x-v/w4.a)` the cure | the 10 `demo/**` files, +106/−28 |
| §9 row 2 | **`cf5409e7`** | `test(x-v/w4.a)` the gate pair + A5 record | the 2 specs (426+418 L) + `a-falsifier.txt` |
| beside | **`b4e47d0c`** | `docs(x-v/w4.a)` the §8 evidence bank | artefacts 1, 2, 7, 8-text + `a-h7-cascade.md` |
| beside | **`5f5fc89f`** | `docs(x-v/w4.a)` artefact 8's 12 PNGs | `evidence/W4/*.png` |

The two `docs` commits are a separate **meaning** from rows 1 and 2 and split no family §9 declares;
§9 gives unit a no evidence row, while §8 requires the artefacts to exist. Every commit carried its
own pathspec — ⟨cmd⟩ `git show --stat` on each returns **exactly** its own paths and no sibling
seat's (rows 1: 10 files · 2: 3 files · 3: 5 files · 4: 12 files). `scripts/dev/dev.sh`,
`CARRY-LEDGER.md` and (appearing mid-unit) `docs/tranches/X/execution/C/F-W3.md` were never staged.

**The PNGs needed `git add -f` and it is disclosed, not quiet.** `.gitignore:34` ignores `*.png`
repo-wide and `:35` negates only `demo/**/*.png`. Force-adding evidence PNGs under `docs/tranches/**`
is **the repo's own established idiom** — ⟨cmd⟩ `git ls-files '*.png' | wc -l` → **435** tracked,
among them the whole of `docs/tranches/K/audit/visual-evidence-2026-06-04/`. `.gitignore` is **not**
in this unit's §4 set and was **not** touched; force-adding paths that **are** in the set is the
in-bounds act, editing the ignore file would not be.

#### a.7 Escalation CARRIED OUT (§3a file bounds) — `ColorInput.vue`'s nameless seat

Artefact 7's row anticipated MT-F005's nameless dock button was dead at HEAD. `navprobe.mjs` was
re-run **once** (`execute, no write`; one webkit launch, one page, one navigation — §5.2 parsimony;
the probe file's git status stayed clean) and **measures the premise FALSE**: the nameless button
**survives** — `<button class="send-btn btn-interactive">` at `demo/shell/dock/ColorInput.vue:67-81`
(two sibling seats, `v-if="proposeMode"` / `v-else`), **24×24** — *it passes A1/A2; the defect is the
NAME* — empty under navprobe's rule **and** under `W4.md` §6's.

Invisible to this wave's gates for a **measured** reason: `send-btn` rows in all four census cells =
**0**, because the seat is inside the dock's ColorInput `PopoverTrigger` and is not
mounted-and-visible at either project viewport; navprobe's matrix (webkit, 1440×900) reaches it and
the two gate projects do not — A2's own law that neither matrix may be inferred from the other,
honoured in the other direction. ⟨cmd⟩ `grep -c "ColorInput.vue" docs/tranches/X/waves/W4.md` → **0**:
the file sits in **no** W4 §4 row, open partition or `.g` table. **Not one byte was written for it.**
Recommended home **stated, not taken** — a dated E-3 bounds addendum, decided by the orchestrator.
The probe's second row also closes: `TOOLS MENU ITEMS: []`, so the "menu-gated instance" the row asks
after is not reachable at HEAD and the surviving nameless button is **not** menu-gated. **Artefact 7
closes WITH EVIDENCE, on the opposite verdict from the one the spec anticipated.**

#### a.8 Residuals, recorded so nothing is silently dropped

1. **A1 / A2 carry 2 rows each** — unit c's, gate C4's (a.4). No edit needed to re-measure.
2. **The A3 premise is FALSE and the cure is not free** (`a-h7-cascade.md`): the producer states its
   rung as `min-block-size`, so `h-7` was **inert** and these controls were 36 px fine / 54 px
   coarse. Moving the rung to `xs` is a real **shrink** to 28 / 44. 44 px is exactly
   `--touch-target`, and both A1/A2 clear their floor with 20 px to spare, so **no gate moves** —
   but it is a visible change and is stated as one. **X-W7 inherits A3's size-axis law** (`W4.md:481`)
   and should inherit this finding with it.
3. **Three surviving `h-7` sites**, classified in `a-h7-cascade.md` §6: two `<Skeleton>`s (not
   controls; §3 routes Skeleton to **X-W8**, and `AdminListSkeleton.vue` is out of every W4 bound)
   and one **native** `<button>` whose 28×28 square shape is its meaning. That native button stays
   28×28 under coarse and never reaches `--control-floor` — recorded as a residual.
4. **`prettier --check demo e2e` RED over 202 files**, pre-existing at HEAD (a.5).
5. **A5 rests on a delta, not a green-to-red flip**, and `a-falsifier.txt` says so in its own bytes —
   a flip is unavailable while residual 1 stands, and manufacturing one would be the masking move
   this wave forbids.
6. **`X.W4.g` untouched and CLOSED** — X-W0.j's dated census **FAIL (1 of 4 at the elected 8.0.0)**.
   ⟨cmd⟩ `grep -rn 'watercolor-dot' demo | wc -l` → **11**, the bank intact. Artefact 9 is correctly
   **absent**.

#### a.9 Locks discharged

- **Commit rows 1 + 2** landed as the family (a.6), cure then specs, in §9's own order.
- **A5's falsifier pair** pinned **then reverted**, both outputs pasted (`a-falsifier.txt`); ⟨cmd⟩
  `grep -c 'A5 falsifier' demo/shell/dock/layers/SlugEditLayer.vue` → **0** at close.
- **A-1-before-A-3** — recorded and **inert** in this partition (§1.4): the SLUG-CHAIN cure surface
  is in no §4 row, and **no SLUG-CHAIN byte was needed** — `SlugEditLayer.vue` was touched for target
  geometry and a name only. No §3a escalation on that axis.
- **`navprobe.mjs`** — `execute, no write`, **spent once** (a.7).
- **U-F12 Pole B** — no dark-accent work; the cure touches geometry and names only.
- **`scripts/dev/dev.sh`** — never opened, never staged.
- **glass-ui and every sibling tree READ-ONLY** — `node_modules/@mkbabb/glass-ui/**` was read for the
  premises in a.1 and never written; no producer row was hacked demo-side.
- **E13** — four-path sweep re-run at this seat's clock ⟨cmd⟩
  `/usr/bin/find <each path> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-18 23:52"` → **only
  `INBOX.md` itself** (self-excluded, SELF-COUNT law). **0 new letters · 0 new `I-n` · 0 UNREAD in
  this unit's scope**; the UNREAD rows (I-30 · I-31 · I-32 · I-33 · I-34 · I-35 · O-20) route by
  their own cells to the X formation mail seat / X-W0.j / X-EXT / X·KF, and X-EXT-1 routes to
  `X.W4.g`, which the census FAIL keeps closed.

**STATUS: PARTIAL.** Every byte of §3 Scope 1–3 and §5's mechanism is landed and committed; **A3,
A4, A5 GREEN**; **A1 and A2 RED-CARRIED on two rows each that §4a assigns to unit c and §6 books to
gate C4**. One §3a escalation carried out (a.7). No bounds were widened, no gate was narrowed, and
no assertion was relaxed.

---

### X.W4.b

**SERVED MODEL: claude-opus-5[1m]** · Opus implementation seat (M-23, `W4.md:219`) ·
**Track A · wave X-W4 · unit b**. Sitting date of record stays **2026-09-17**. Wall clock at this
seat `2026-09-19 00:08:22 EDT` → `00:36:59 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`.
**HEAD at entry** `bda34afa` ⟨cmd⟩ `git log --oneline -1` · branch `tranche-u`
⟨cmd⟩ `git rev-parse --abbrev-ref HEAD`.

**Sections executed**: `W4.md` §3 Scope 4–5 (`:57-63`) · §5 `### X.W4.b` (`:239-253`) · §6 unit-b
gate table (`:384-390`) · §9 commit rows 3–4 · §8 artefacts 4, 8.
**Rulings consumed**: COHESION **§0j.A** — **U-F12 Pole B** (no dark-accent work; none done) and
**DR-24** `scripts/dev/dev.sh` NEVER touched, never staged. COHESION re-read to the file end
(**1,540 lines**) ⟨cmd⟩ `grep -n "X-W4\|X\.W4" docs/tranches/X/COHESION.md` → six hits, all on
**`X.W4.g`**'s trigger-gated cut (`:72`, `:669`, `:675-676`, `:690`, `:759`, `:804`) plus **§0j.A**'s
U-F12 row (`:869`) and **§1104**'s S-8 row, which states CC-105's `--slider-track-bg` wait is
*"X-W4.g's own"*. **No later addendum rules on this unit.** `X.W4.g` is CLOSED by X-W0.j's dated
census **FAIL (1 of 4 at the elected 8.0.0)**, so none of those rows opens an act here.

---

#### b.0 CRASH-RECOVERY — the writable set was CLEAN, and the sibling rows were left alone

⟨cmd⟩ `git status --porcelain` at entry → **2 rows**, and ⟨cmd⟩ `git status --porcelain --` over
**every one of this unit's seven writable paths** → *(empty)*. **There was no inherited work on unit
b**: the 2026-09-18 restart's partial work was unit a's, and unit a landed it in five commits
(`8934de85` · `cf5409e7` · `b4e47d0c` · `5f5fc89f`, + the receipt `c2692eea`) before this seat sat.
The two dirty rows — `scripts/dev/dev.sh` (DR-24, never touched, never staged) and
`docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's) — were **left exactly as found**, as were
the rows that appeared mid-unit from concurrent seats (`docs/tranches/V/coordination/INBOX.md`,
`docs/tranches/X/execution/C/F-W3.md`, `docs/tranches/X/execution/LEDGER.md`). Nothing was stashed,
reset, restored or unstaged. `stash@{0}` was never popped.

#### b.1 The LOCK discharged FIRST — B3's receipt before any product byte

`W4.md:390` is explicit: *"CC-046's condition is explicitly **before any schema fold**, so a receipt
filed at close is a failure, not a pass."* So §9 **row 4 landed before row 3, and before every other
byte of this unit**: `ea0fdca8`, `docs/tranches/X/waves/evidence/W4/a16-retest-receipt.md`, filed at
⟨cmd⟩ `git status --porcelain -- demo/` → *(empty)*. The receipt records, at the installed bytes:

- **glass 7.0.0** (double-run), declared `^7.0.0`;
- `SliderProps` `dist/components/slider/types.d.ts:11-12` — `dir?: Direction;` / `inverted?: boolean;`
  — and both as **runtime-declared props** in the packed `Slider`, not merely as types;
  `Direction = "ltr" | "rtl"` (`_shared/primitive.d.ts:5`);
- `--slider-range-origin` = **0** in `demo` + `src`, both runs;
- **a re-runnable definition of "producer-internal"**, measured rather than asserted: a variable the
  producer **declares** is its own state, one it only **reads** through `var()` is a consumer feed
  seam. Of the producer's **15** slider variables, **3** are declared (`--slider-range-origin`,
  `--slider-track-height`, `--slider-thumb-size`) and consumer reads of all three = **0**. The three
  the demo does read are feed seams the producer never declares; the `--slider-track-bg` sites are
  **CC-105's**, booked to `X.W4.g` — *"never before, never by shim"* (`W4.md:89-90`).

**Zero slider props were edited by this unit**, and §5's clause is conditional (*"express **any**
direction/inversion need"*). The need was **measured absent** at all three in-bounds `<Slider>` seats
before the clause was honoured, so B3(ii) closes as the spec calls it — a **regression fence** — and
the fence is made permanent as a test rather than left as a one-time grep.

#### b.2 Born-RED, then the cure — in that order, with the numbers

The gate spec `e2e/smoke/a11y-select-title.spec.ts` (`c18de089`, 571 L, line 1
`// SERVED MODEL: claude-opus-5[1m]`) was authored and run **before one product byte moved**:

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-select-title.spec.ts --reporter=line
BORN-RED → EXIT 1 · 2 failed, 1 passed
[W4-B1] asserted=7 excluded=1 defects=14
[W4-B2] asserted=7 defects=14
[W4-B3] producerSliderVars=15 declaredInternal=3 consumerReads=0
```

Then the cure (`58371516`): the **eight** Select compositions in `MixConfigBar.vue` (3),
`GenerateControls.vue` (2) and `GradientVisualizer.vue` (3) adopt `@mkbabb/glass-ui/labeled-field`
— `label` + `:control-labelable="false"` + the slot's `labelledBy` on the trigger, the sibling
caption retired **into** the field's own title, the now-duplicate literal `aria-label` deleted, and
`class="h-9"` replaced by the published `size="sm"` rung.

```text
AFTER, run 1 → EXIT 0 · 3 passed        AFTER, run 2 (double-run) → EXIT 0 · 3 passed
[W4-B1] asserted=7 excluded=1 defects=0     [W4-B1] asserted=7 excluded=1 defects=0
[W4-B2] asserted=7 defects=0                [W4-B2] asserted=7 defects=0
[W4-B3] …declaredInternal=3 consumerReads=0 [W4-B3] …declaredInternal=3 consumerReads=0
```

| gate | BEFORE (born-RED, pre-byte) | AFTER (double-run) | verdict |
|---|---|---|---|
| **B1** composed trigger title | 7 triggers · **14** defects (a literal `aria-label` **and** no `aria-labelledby`, per trigger) | **0** | **GREEN** |
| **B2** trigger height rides the size axis | 7 triggers · **14** defects (`h-9` survives **and** the coarse rung does not lift) | **0** | **GREEN** |
| **B3** slider seam consumed as published | receipt owed; fence green | receipt filed **first**; fence **0** reads of **3** declared internals | **GREEN** |

Source counts, double-run, both runs identical:
`selectTrigger 13→13` (count unchanged; **8** re-composed) · `h-9 15→7` · `section-label 17→9`
(class uses `16→8`) · `<label>` without `for` `9→6` · `<LabeledField> 0→8` ·
`--slider-range-origin 0→0`.

#### b.3 The coarse lift — measured twice, by two independent mechanisms

§4 admits this unit **one** spec path, in `e2e/smoke/` — so there is no `smoke-mobile` twin and none
was invented. B2's second falsifier arm (*"when the coarse rung does not lift — the trigger is a touch
target too"*) is therefore measured **in-project**, by installing exactly what the producer's own
`@media (pointer: coarse)` block installs (`--ui-scale: 1.5`, `--control-floor: 2.75rem`) and
re-measuring: token **36 → 54** with `blockSize` following it. Before the cure the same probe read
token 54 against a `blockSize` frozen at **36**.

That mechanism test was then **confirmed in a real coarse context** at the artefact-8 capture (a
Pixel 7 browser context): trigger `blockSize` **36 · 36 · 36 before → 54 · 54 · 54 after**. The 44px
`--touch-target` floor clears with 10px to spare, and the lift cost no consumer byte.

#### b.4 The scope, stated rather than hidden

The census is scoped to **the pane the route names**, resolved structurally at run time from the
pane's own `h3.pane-header-title` — never an element allowlist, never an element named to be skipped.
`W4.md:389` names B2's population in its own words (*"all Select triggers in mix / generate /
gradient"*) and §4 gives unit b exactly those three SFCs. Every excluded trigger is **counted and
printed on every run** (`excluded=1`): `ColorSpaceSelector.vue`'s, mounted in the picker pane that
`/#/mix` seats beside the mix pane at 1280×720, and in **no** open-partition W4 row — it sits only in
§4's trigger-gated `X.W4.g` table, which the census FAIL keeps closed.

**Record d-3 honoured to the letter**: of the seven files holding `section-label`, this unit cured
its **three**. `AdminTagsPanel.vue` and `SearchFilterBar.vue` are **unit a's**, `MixSourceSelector.vue`
is **`.g`'s**, `TagEditPopover.vue` is in **no** W4 table. No repo-wide reading was taken.

#### b.5 §7 cadence

```text
⟨cmd⟩ npx eslint <the 4 touched paths>               → EXIT 0
⟨cmd⟩ npx eslint demo e2e                            → EXIT 0
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit     → EXIT 0
⟨cmd⟩ npx tsc -p tsconfig.e2e.json --noEmit          → EXIT 0
⟨cmd⟩ git diff --check -- demo e2e                   → EXIT 0
⟨cmd⟩ npx prettier --check e2e/smoke/a11y-select-title.spec.ts → CLEAN
```

**`prettier --check demo e2e` is RED over 202 files and was NOT cured — pre-existing, not this
unit's debt.** All three touched `.vue` files are unclean **at HEAD too**: their HEAD blobs were
extracted to a scratch tree and checked ⟨cmd⟩ `npx prettier --check <scratch>/demo/**/*.vue` → **3 of
3 warn**. The one file this unit created is prettier-clean, so **no new format debt is introduced**.
Recorded for X-W11's hygiene walk (unit a booked the same row). `npm run typecheck` is unaffected —
this unit wrote **no `src/` byte**.

#### b.6 Commits — pathspec on the commit itself, one meaning each

| # | sha | scope | paths |
|---|---|---|---|
| §9 row 4 | **`ea0fdca8`** | `docs(x-w4/a16-receipt)` B3's receipt, **before every product byte** | `evidence/W4/a16-retest-receipt.md` |
| born-RED | **`c18de089`** | `test(x-v/w4.b)` the gate spec, RED before the cure | `e2e/smoke/a11y-select-title.spec.ts` (571 L) |
| §9 row 3 | **`58371516`** | `fix(demo/select-composition)` the cure | the 3 `demo/**` SFCs, +50/−32 |
| beside | **`3d548669`** | `test(x-v/w4.b)` the gate instrument made navigation-safe | the same spec, +31/−37 |
| beside | **`6fdb57ee`** | `docs(x-v/w4.b)` the §8 evidence bank + artefact 8 | `b-select-composition.md` + 4 PNGs |

⟨cmd⟩ `git show --stat` on each returns **exactly** its own paths and no sibling seat's (1 · 1 · 3 ·
1 · 5 files). `scripts/dev/dev.sh`, `CARRY-LEDGER.md`, `INBOX.md`, `execution/C/F-W3.md` and
`execution/LEDGER.md` were **never staged**. The four PNGs needed `git add -f` and it is **disclosed,
not quiet**: `.gitignore:34` ignores `*.png` repo-wide and `:35` negates only `demo/**/*.png`;
force-adding evidence PNGs under `docs/tranches/**` is the repo's own established idiom (435 tracked
PNGs), `.gitignore` is not in this unit's §4 set and was not touched.

**The gate instrument was hardened once, mid-unit, with a measured cause.** The first AFTER run failed
B1 on `page.evaluate: Execution context was destroyed, most likely because of a navigation` — this
unit's new `@mkbabb/glass-ui/labeled-field` import is a dependency the dev server had not pre-bundled,
so vite's optimizer re-bundled and forced a **full page reload** mid-poll. Every wait is now
navigation-safe (`waitForFunction` re-installs in the new context; the view threads as an argument
instead of a `<body>` stamp). **Not one assertion changed**, and the born-RED verdict was taken before
the hardening and stands.

#### b.7 Escalation CARRIED OUT (§3a file bounds) — two stale name-bindings outside every W4 row

The cure retires seven literal `aria-label`s, which is what `W4.md:248` orders. Three out-of-bounds
specs bind Select triggers by name; all three were **run after the cure** ⟨cmd⟩
`npx playwright test --project=smoke e2e/smoke/walk.spec.ts e2e/smoke/oracles/o20-generate-plate.spec.ts e2e/smoke/oracles/o14-preview-truth.spec.ts`
→ **4 failed, 6 passed**, and the two causes were **separated by measurement**:

- **CAUSED BY THIS CURE — 2 tests**: `walk.spec.ts:89` and `o20-generate-plate.spec.ts:71` both bind
  `getByRole("combobox", { name: "Generation preset" })`. The composed name is now **`"Preset"`** —
  the caption the user reads — so Playwright's default substring match cannot reach it.
- **PRE-EXISTING, NOT THIS CURE — 2 tests**: `o14-preview-truth.spec.ts`'s two failures are at
  `:397-401`, the `.add-slot-ghost` assertion, **upstream of its combobox loop**. The control proves
  it ⟨cmd⟩ `npx playwright test --project=smoke e2e/smoke/views/mix.spec.ts` → **1 failed**, at the
  *identical* assertion with the identical message (the X-W1-documented live WatercolorDot blocker,
  CC-044, routed to the closed `X.W4.g`), and ⟨cmd⟩
  `git status --porcelain -- demo/workbenches/mix/MixSourceSelector.vue` → *(empty)*. o14's own
  combobox bindings use `{ name: "Color space" | "Hue method", exact: true }` and **survive verbatim**
  — the mix captions already said what their `aria-label` said.

**Not one byte was written for the two:** `e2e/smoke/walk.spec.ts` and
`e2e/smoke/oracles/o20-generate-plate.spec.ts` are in **no** `W4.md` §4 row, for any unit
⟨cmd⟩ `grep -c "walk.spec\|o20-generate-plate" docs/tranches/X/waves/W4.md` → **0**. Recommended
repair **stated, not taken** — both lines should read `{ name: "Preset", exact: true }`. The
alternative, padding the visible caption to *"Generation preset"* so a stale selector keeps matching,
would change shipped product copy to fit a test: the masking move this wave forbids. The orchestrator
owns the two-line repair, or a dated E-3 bounds addendum admitting the two paths.

#### b.8 Residuals, recorded so nothing is silently dropped

1. **The B2 population premise is FALSE and is recorded as such.** The spec's *"15 h-9 sites, all
   Select triggers in mix / generate / gradient"* reproduces as 15, but **only 8 are triggers in this
   unit's files**. The remainder: **`AuroraPane.vue:122,142,156,170`** — four Select triggers with a
   literal `aria-label` and a pinned `h-9`, i.e. **exactly the defect this unit cured, in a file that
   is in NO W4 §4 row** ⟨cmd⟩ `grep -c 'AuroraPane' docs/tranches/X/waves/W4.md` → **0**; plus
   `GenerateControls.vue:165` (a glass `<Button>`, not a trigger) and `:211` (`w-9 h-9`, a
   WatercolorDot swatch — **`X.W4.g`'s** seat, `W4.md:162`); plus `PaletteSlugBar.vue:2` `min-h-9`, a
   grep-shape hit (`\bh-9\b` matches inside `min-h-9`). **Home stated, not taken.**
2. **`GenerateControls.vue:165`'s `h-9` Button** — in this unit's file, outside this unit's named
   mechanism (`W4.md:248` moves *trigger* height; the `h-7` family was unit a's Scope 3). Booked for
   the size-axis law **X-W7** inherits (`W4.md:481`).
3. **A fourth Gradient-pane Select trigger exists and is PRODUCER-OWNED** — `aria-label="Easing
   preset"`, `blockSize` 40 fine / 60 coarse, from `@mkbabb/glass-ui/easing`'s `EasingPicker`
   ⟨cmd⟩ `grep -rln 'Easing preset' node_modules/@mkbabb/glass-ui/dist/` → `dist/easing.js`; the
   string appears **nowhere** in `demo/`. Invisible to the gate (the easing accordion is closed at
   rest) and correctly out of scope either way: a producer control naming itself is not a consumer
   defect. Recorded so no later seat reads it as a miss.
4. **The visible caption register CHANGED, and it is evidenced rather than smoothed.** `.section-label`
   is a **producer** typography class (mono, uppercase, tracked, muted); `LabeledField` renders the
   producer's own `Label` (sans, `--type-small`, weight 500, `--foreground`) and publishes **no seam
   for a caption class**. So the gradient band reads `TYPE · SPACE · HUE` before and
   `Type · Space · Hue` after — see `gradient-select-composition-{fine,coarse}-{before,after}.png`.
   **`demo/styles/utils.css` took ZERO bytes deliberately**: a demo rule re-skinning the producer's
   label through its `data-slot="label"` stamp would be a per-instance costume over a root vocabulary,
   which the standing glass-ui-first law routes to the producer. **A `LabeledField` label-register /
   label-class seam is a BH-inbox ask, stated here and not taken** — mail paths are not in this unit's
   bounds.
5. **`GradientVisualizer.vue:232`'s `<span class="section-label">Direction</span>` survives**, so that
   column now carries two caption voices. `Direction` titles a **`<Slider>`**, and §3 Scope 4 scopes
   this unit to *"each affected **Select**"*; converting it would be invention. Booked.
6. **`ComponentSliders.vue` took ZERO bytes** — no direction/inversion need exists at any in-bounds
   `<Slider>` seat (b.1). Its three `--slider-*` reads are feed seams the producer never declares.
7. **`prettier --check demo e2e` RED over 202 files**, pre-existing at HEAD (b.5).
8. **`X.W4.g` untouched and CLOSED** — ⟨cmd⟩ `grep -rn 'watercolor-dot' demo | wc -l` → **11**, the
   bank intact. Artefact 9 is correctly **absent**.

#### b.9 Locks discharged

- **B3's `a16-retest-receipt.md` landed BEFORE the first slider prop edit** — in fact before **every**
  byte of this unit, at `git status --porcelain -- demo/` → *(empty)*. §9 **row 4 before row 3**.
  Zero slider props were edited at all.
- **Born-RED first** — the gate spec landed and ran RED (`c18de089`) before the cure (`58371516`).
- **B1's cure surface = this unit's THREE files only** (record d-3) — honoured; the four other
  `section-label` files were never opened (b.4).
- **Direction / inversion expressed only through published `dir` / `inverted`** — vacuously and
  honestly: no direction mechanism was needed, none was invented, and **no producer-internal variable
  is read** (the fence reads the producer's declared set at run time, so it cannot go stale).
- **U-F12 Pole B** — no dark-accent work; the cure touches composition, naming and the size axis only.
- **`scripts/dev/dev.sh`** — never opened, never staged.
- **glass-ui and every sibling tree READ-ONLY** — `node_modules/@mkbabb/glass-ui/**` was read for the
  premises and never written; no producer row was hacked demo-side; the one producer ask is routed,
  not taken (residual 4).
- **No masking move** — no `try/catch` around a defect, no `test.skip`, no allowlist, no copied
  producer selector, no `node_modules` patch. The census scope is structural and prints its exclusions.
- **E13** — four-path sweep re-run at this seat's clock (`2026-09-19 00:36:59 EDT`) ⟨cmd⟩
  `/usr/bin/find <each path> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-18 23:52"` → only
  `docs/tranches/V/coordination/INBOX.md` (self-excluded, SELF-COUNT law) and keyframes'
  `INBOUND-LEDGER.md` (a sibling's ledger, not a letter). **0 new letters · 0 new `I-n` · 0 UNREAD in
  this unit's scope**: the five rows whose Status cells read UNREAD — **O-20 · I-30 · I-31 · I-32 ·
  I-35** — route by their own Routing cells to the X formation mail seat / X-W0.j / X-EXT-1..6 / X-W0
  / X·KF, and the one naming this wave (**X-EXT-1**) routes to **`X.W4.g`**, which the census FAIL
  keeps closed. Measured against this unit's vocabulary ⟨cmd⟩
  `grep -Eic "labeled-field|LabeledField|SelectTrigger|control-h-sm|slider-range-origin|aria-labelledby|section-label|size axis"` over
  `V/coordination/**` → the sole non-zero file is `CONSTELLATION.md` (the component manifest, not
  mail, and its line names `ColorInput.vue` / `PaletteSlugBar.vue` — X-W7/X-W8 surfaces).

**STATUS: PARTIAL.** **B1 · B2 · B3 all GREEN**, double-run, and every byte of §3 Scope 4–5 and §5's
mechanism is landed and committed in §9's own order (row 4 before row 3). The unit is **PARTIAL and
not DONE** for one reason, stated loudly: the spec-ordered `aria-label` retirement leaves **two
out-of-bounds `smoke`-project tests RED** (`walk.spec.ts:89`, `o20-generate-plate.spec.ts:71`), and
`e2e-smoke` is a HARD CI job (CC-031). The repair is named to the byte in b.7 and **was not taken**,
because neither path is in any W4 §4 row. No bounds were widened, no gate was narrowed, and no
assertion was relaxed.

---

### X.W4.c

**SERVED MODEL: claude-opus-5[1m]** · Opus implementation seat (M-23, `W4.md:219`) ·
**Track A · wave X-W4 · unit c**. Sitting date of record stays **2026-09-17**. Wall clock at this
seat `2026-09-19 00:49:53 EDT` → `01:22 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`.
**HEAD at entry** `97d5873b` ⟨cmd⟩ `git log --oneline -1` · branch `tranche-u`
⟨cmd⟩ `git rev-parse --abbrev-ref HEAD`.

**Sections executed**: `W4.md` §3 Scope 6 (`:64-67`) · §5 `### X.W4.c` (`:255-270`) · §6 unit-c gate
table (`:392-399`) · §9 commit row 5 · §8 artefacts 5, 8.
**Rulings consumed**: COHESION **§0j.A** — **U-F12 Pole B** (no dark-accent work; none done) and
**DR-24** `scripts/dev/dev.sh` NEVER touched, never staged. COHESION re-read to the file end
(**1,540 lines**, §0p–§0t present) ⟨cmd⟩ `grep -n "X-W4\|X\.W4" docs/tranches/X/COHESION.md` → eight
hits, **every one** on `X.W4.g`'s trigger-gated cut (`:72`, `:669`, `:675-676`, `:690`, `:759`,
`:804`, `:1104`) plus §0j.A's U-F12 row (`:869`). **No later addendum rules on this unit**, and
`X.W4.g` stays CLOSED on X-W0.j's dated census **FAIL (1 of 4 at the elected 8.0.0)**.
**Adjudication read whole** (the authorities this unit's locks come from):
`docs/tranches/V/megatranche/registry/adjudicated/GradientStopEditor.md` (298 L) — r1 §2 **D-7**,
GRADSTOP-A **§6** (readout vacuity), r3 rows **7 · 26 · 35**, r3.5 **§14 / §15 / §16**; and
`docs/tranches/V/VISUAL-CONSTITUTION.md` **§5.2** rows `:127` (gradient stop position) and `:131`
(explicit reorder: *"after Space grabs … Space drops, Escape cancels"*).

---

#### c.0 CRASH-RECOVERY — this unit's writable set was CLEAN at entry

⟨cmd⟩ `git status --porcelain` at entry → **6 rows**, and ⟨cmd⟩ `git status --porcelain --` over
**each** of this unit's four writable paths → *(empty)*. **There was no inherited work on unit c**;
the 2026-09-18 restart's partial work was unit a's and landed in its own commits. The rows outside
this set — `scripts/dev/dev.sh` (DR-24), `docs/tranches/V/reformation/CARRY-LEDGER.md`,
`docs/tranches/V/coordination/INBOX.md`, `docs/tranches/X/keyframes/waves/KF-W{0,1,2}.md` and (mid-unit)
`docs/tranches/X/execution/{B/KF-W10.md,LEDGER.md,C/F-W7.md}` — were **left exactly as found**.
Nothing was stashed, reset, restored or unstaged; `stash@{0}` was never popped.

#### c.1 Anchors verified at the true bytes BEFORE one edit

| anchor the brief banked | measured at entry | verdict |
|---|---|---|
| `barRef` `:201-202` | `:200-202` `<div ref="barRef" data-testid="gradient-stop-bar">`, no `role`, no `tabindex`, `cursor-copy` | **LIVE** |
| `onHandleKeydown` `:173` | `:173-187`, handling **ArrowLeft · ArrowRight · Delete · Backspace · Escape** only | **LIVE** |
| `.rail-handle w-5 h-5` `:235` | `:235` `class="rail-handle absolute top-1/2 w-5 h-5 rounded-full border-2 …"` | **LIVE** |

#### c.2 Born-RED FIRST — the gate spec landed and ran RED before one product byte

`e2e/smoke/a11y-gradient-stop-grammar.spec.ts` (**538 L**, line 1 `// SERVED MODEL: claude-opus-5[1m]`)
was authored and run **twice** at ⟨cmd⟩ `git status --porcelain -- demo/` → *(empty)*:

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-gradient-stop-grammar.spec.ts --reporter=line
BORN-RED, run 1 and run 2 IDENTICAL → EXIT 1 · 5 failed, 0 passed
C1  Error: Tab never reached the caret in 140 presses
C2  [{"role":null,"min":null,"max":null,"now":null,"text":null,"name":"Gradient stop at 0%"}, … ×3]
C3  home=231.75 end=227.359 unit=-0.0439px/%  defects=8   (Home and End were NO-OPS)
C4  fine   [{"w":20.7,"h":20.7,"hitW":24,"hitH":24,"faceW":null}, ×2]
C4  coarse [{"w":20.7,"h":20.7,"hitW":44,"hitH":44}, ×2]
```

Landed as **`96936340`** before the cure.

#### c.3 The cure — exactly §5's mechanism, and the three readings it forced

1. **A focusable, roled seat that mints at the caret** (C1). The seat is a real `<button>` parked on
   the rail (`data-testid="gradient-stop-caret"`, `aria-label="Add gradient stop at N%"`), arrows /
   Home / End / PageUp / PageDown move it, Enter or Space mints. **Reading recorded**: §5 says *"give
   the rail root a focusable, roled seat"*; the rail root itself could not BE that seat — ARIA gives
   `slider` and `button` **presentational children**, so a roled rail root containing focusable stop
   handles is invalid by construction, and `role="group"` + `tabindex` is a container that no AT
   forwards keys to. The seat therefore lives AT the rail root as its child, and the root takes
   `role="group"` + a name. The caret carries **no `data-stop-id`**, so `onBarPointerDown`'s guard is
   untouched and a pointer press that lands on the caret is still the BAR's add, at the pointer —
   C1's falsifier (*"fails if the new keyboard seat breaks the pointer-add gesture"*) is measured
   live in the same test: 2 → 3 (Enter) → 4 (Space) → **5 (a real bar click)**.
2. **Slider semantics** (C2): `role="slider"`, `aria-orientation`, `aria-valuemin="0"`,
   `aria-valuemax="100"`, `aria-valuenow` (the model's own number), `aria-valuetext="Position N%"`
   and the **ordinal in the name** — `Gradient stop 2 of 3`. The percentage moved OUT of the name
   and INTO the value on purpose: a name that changes every drag frame re-announces the control
   instead of its value, and GRADSTOP-A §6 bans reading that name for a position anyway.
3. **The full key set** (C3), each arm carrying its constitutional authority: Right/Up +1%,
   Left/Down −1% (Shift ±10), PageUp/PageDown ±10, **Home = 0% and End = 100%, unconditional**
   (§5.2 `:127`), Delete/Backspace removes, Escape clears the selection — and **Space grabs, Space
   drops, Escape cancels to the grab's origin** (§5.2 `:131`). **Reading recorded**: §5.2's stop
   row expresses the grab as an *ordinal* move; an ordinal swap here would write a non-monotonic
   model, which is exactly the L-1/D-2 BLOCKER whose cure (normalise-on-write) **GRADSTOP-A §14
   reserves to X-W6** — and §15 bans the separation law outright. The grab therefore lands as a
   POSITION gesture (an undoable keyboard drag), and C3's Space arm is measured at `style.left`
   across the gesture in both directions. It is **not vacuous**: with no grab state Escape cannot
   restore, so the cancel arm is RED on the pre-cure bytes.
4. **Target ≥24×24 with the 20px silhouette HELD** (C4): the `<button>` becomes the
   `max(1.5rem, 24px)` **seat** and a new `aria-hidden` `.rail-handle-face` inside it keeps the
   `w-5 h-5 border-2` **paint**, byte-for-byte as before. `HANDLE_HALF` is **untouched** — the axis
   constant and the D-1 skew are X-W6's, and growing the painted dot instead would have moved them.
   The material lift moves to the face and the ring stays on the seat, so the U-F25 composition now
   holds *by construction* (two elements cannot clobber one property). The U-F27 `::before` stays as
   the coarse 44px rung.

⟨cmd⟩ `git diff` measured three ways, because §7's cadence orders `prettier --write` over the
touched surface and the file was prettier-unclean at HEAD (units a and b booked the same debt):
**format-only churn 36 lines** · **cure-only +266/−53** · total landed 353.

#### c.4 Gate readings — BEFORE → AFTER, DOUBLE-RUN, both runs byte-identical

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-gradient-stop-grammar.spec.ts --reporter=line
AFTER, run 1 → EXIT 0 · 5 passed        AFTER, run 2 → EXIT 0 · 5 passed
[W4-C1] caretLeft=252 mintedLeft=252 inline="calc(55% - 1px)" · pointerEventsDuringKeyboardJourney=0
[W4-C2] role=slider min=0 max=100 now=0|50.2|100 text="Position …%" name="Gradient stop N of 3"
[W4-C3] home=10 end=450 unit=4.4000px/% · defects=0
[W4-C4-FINE]   [{"w":24,"h":24,"hitW":24,"hitH":24,"faceW":20,"faceH":20,"rootFontSize":16} ×2]
[W4-C4-RING]   {"shadow":"rgba(0,0,0,0.85) 0 0 0 1px, rgba(255,255,255,0.92) 0 0 0 3px","spread":3,"clippers":[],"focusVisible":true}
[W4-C4-COARSE] [{"w":24,"h":24,"hitW":44,"hitH":44} ×2]
```

| gate | BEFORE (born-RED, pre-byte, double-run) | AFTER (double-run) | verdict |
|---|---|---|---|
| **C1** keyboard creation exists | no seat to Tab to in 140 presses; creation was `onBarPointerDown/Up` only | 2 → **3** (Enter) → **4** (Space), **0** pointer events; and the pointer add still mints (→ **5**) | **GREEN** |
| **C2** handles are sliders | `role=null`, no `aria-value*`, no ordinal (3 of 3 handles) | role · min · max · now · valuetext · `N of 3` on 3 of 3, and `getByRole("slider")` finds all three | **GREEN** |
| **C3** the full grammar | Home/End no-ops; **7 keys absent**; 8 defects | **0 defects** — Home→10px, End→450px, Page ±44px, arrows ±4.391px, Space grab 0 / cancel −13.187 / drop commits | **GREEN** |
| **C4** target + visible focus | `.rail-handle` **20.7×20.7** at both matrices; ring unmeasured | **24×24** fine and coarse, face **20×20**, ring 1px+3px painted, **clippers = []** | **GREEN** |

**The wave-level payoff, measured rather than assumed.** Unit a closed PARTIAL with A1 and A2
**RED-CARRIED on exactly two rows each** — *"they live in `GradientStopEditor.vue` … A1 and A2 turn
on unit c's landing, and the same two spec files re-measure them with no edit"* (a.4, a.8 residual 1).
Re-run here with **no edit to either spec**, double-run:

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-control-targets.spec.ts             → 3 passed
⟨cmd⟩ npx playwright test --project=smoke-mobile e2e/smoke/mobile/a11y-control-targets.spec.ts → 3 passed
[W4-A1] undersized=0   (was 2)      [W4-A2] undersized=0   (was 2)
[W4-A4] nameless=0                  [W4-A4-COARSE] nameless=0     (the new caret seat is named)
```

**A1 and A2 are GREEN.** Unit a's carried RED is closed by this unit's landing, exactly as `W4.md`
§6 authored it.

#### c.5 The one instrument hardening, with its measured cause

The first AFTER run failed C4's ring arm on
`{"shadow":"rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px","spread":0}` — the
handle's own `box-shadow` **transition**, read at the instant focus landed, returns the
interpolation's first frame. The arm now **polls** the ring to its settled value (`cf108ec6`).
o27 solves the same problem by overriding the product's transition with `!important`; that is the
right aid for that oracle and the wrong one here, because this gate's subject is the affordance a
user actually sees. **Not one assertion changed**, and the born-RED verdict was taken before the
hardening and stands.

#### c.6 Commits — pathspec on the commit itself, one meaning each

| # | sha | scope | paths |
|---|---|---|---|
| born-RED | **`96936340`** | `test(x-v/w4.c)` the gate spec, RED before the cure | `e2e/smoke/a11y-gradient-stop-grammar.spec.ts` (538 L) |
| beside | **`cf108ec6`** | `test(x-v/w4.c)` the ring arm reads the settled affordance | the same spec, +15 |
| §9 row 5 | **`666978d4`** | `feat(demo/gradient-stop-grammar)` the cure **and** the two bindings it invalidated | `GradientStopEditor.vue` + `e2e/smoke/views/gradient.spec.ts` |
| beside | **`1c34ce6e`** | `docs(x-v/w4.c)` §8 artefacts 5 + 8 | `gradient-grammar.json` + 8 PNGs |
| beside | **`38de7661`** | `test(x-v/w4.c)` the key-by-key ledger artefact 5 is made of | the same spec |

⟨cmd⟩ `git show --stat` on each returns **exactly** its own paths and no sibling seat's (1 · 1 · 2 ·
9 · 1 files). `scripts/dev/dev.sh`, `CARRY-LEDGER.md`, `execution/LEDGER.md`, `execution/B/KF-W10.md`
and `execution/C/F-W7.md` were **never staged**. The cure and the re-anchor are ONE commit on
purpose: either alone would leave a self-inconsistent commit in a history where `e2e-smoke` is HARD.
The eight PNGs needed `git add -f` and it is **disclosed, not quiet** — `.gitignore:34` ignores
`*.png` repo-wide and `:35` negates only `demo/**/*.png`; force-adding evidence PNGs under
`docs/tranches/**` is the repo's own idiom (435 tracked PNGs) and `.gitignore` was not touched.

#### c.7 The in-bounds re-anchor, and the ONE out-of-bounds casualty (§3a, stated not taken)

**In bounds** — `e2e/smoke/views/gradient.spec.ts` held the only two bindings this cure invalidated,
and it is this unit's `modify` row, so both were re-anchored **to the instrument the authorities
name**: `:169-171`'s `aria-label`-percent parse now reads the handle's own `left` (GRADSTOP-A §6)
with `aria-valuenow` banked beside it, and `:197`'s `[aria-label="Gradient stop at 80%"]` becomes
`[data-stop-id][aria-valuenow="80"]`. Both tests **pass**.

**Out of bounds — `e2e/smoke/oracles/o27-focus-affordance.spec.ts:126-129`**, the BR-3 arm
*"the 20px visual dot HELD"*: it reads `getBoundingClientRect()` on `[data-stop-id]` and asserts
`18 < w < 22`. That element is now the **seat** (24), while the dot it names is the `.rail-handle-face`
(20). ⟨cmd⟩ `grep -c "o27" docs/tranches/X/waves/W4.md` → **0**; the file sits in **no** W4 §4 row
and in no other X wave's table (`W6.md`'s `o27-scene-contracts.spec.ts` is a different file), so
**not one byte was written for it**. Recommended repair **stated, not taken**: measure the face —
`el.querySelector(".rail-handle-face")!.getBoundingClientRect()` — which is the same 20×20 assertion
against the element that now carries the silhouette, and which **this unit's own C4 already asserts**
(`faceW ∈ (18,22)`, measured 20). The alternative — leaving the seat at 20 — fails C4, A1 and A2 and
is the masking move this wave forbids. The orchestrator owns the repair, or a dated E-3 bounds
addendum admitting the path.

**The causes were separated BY MEASUREMENT, not by assertion** (the b.7 discipline). The suspect
tests were re-run against the **pre-cure bytes** (`git checkout 96936340 -- <this unit's two files>`,
run, restore — both files are this unit's own, nothing else was touched, and ⟨cmd⟩
`git status --porcelain -- demo e2e` was empty afterwards):

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o27-focus-affordance.spec.ts \
      -g "20px visual dot HELD|EVERY operable control class|renders direction slider|selecting a stop pins|easing row carries"
PRE-CURE → 4 failed, 1 passed
```

| test | pre-cure | at HEAD | attribution |
|---|---|---|---|
| o27 BR-3 *"the 20px visual dot HELD"* | **PASSED** | FAILED (`Expected < 22, Received 24`) | **THIS CURE'S** — the one casualty above |
| o27 *"EVERY operable control class paints an outline"* | FAILED (`getByRole('option', {name:'Picker'})` never visible, inside the dock fixture, under forced-colors) | FAILED identically | **PRE-EXISTING** |
| gradient *"renders direction slider"* `:60` | FAILED (`/H \d+(–\d+)?°/` vs `""`) | FAILED identically | **PRE-EXISTING** — the render tile is an EMPTY `<div role="img">` with no text child (`GradientVisualizer.vue:222-228`, a file this unit never opened); r3.1 item 4 booked these dead-DOM anchors on 2026-07-28 (*"`Perceived-space` only in `gradient.spec.ts:57/:112`"*), and r3.3 row 4 (C4) routes them to MT-GRADSTOP-1's **G13** → **X-W6** |
| gradient *"selecting a stop pins the envelope plate"* `:114` | FAILED identically | FAILED identically | **PRE-EXISTING**, same row |
| gradient *"easing row carries its live ramp"* `:272` | FAILED (`"steps(4, end)"` vs `"steps(4, jump-end)"`) | FAILED identically | **PRE-EXISTING** — an easing-literal drift this unit's file cannot reach |
| o21-gradient-rail (whole spec) | — | **PASSED** | untouched by the cure |
| o27 BR-1 · BR-1 forced-colors · BR-3 coarse · BR-4 | — | **PASSED** | the ring, the WHCM outline and the coarse rung all survive the split |

#### c.8 §7 cadence

```text
⟨cmd⟩ npx eslint demo e2e                                    → EXIT 0
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit             → EXIT 0
⟨cmd⟩ npx tsc -p tsconfig.e2e.json --noEmit                  → EXIT 0
⟨cmd⟩ npx prettier --check <the 3 touched paths>             → CLEAN
⟨cmd⟩ git diff --check -- demo e2e docs                      → EXIT 0
```

**`prettier --check demo e2e` stays RED over 202 files** — pre-existing at HEAD, booked by units a
and b for X-W11's hygiene walk; the three files this unit touched are clean. **`npm run typecheck`
(library) is a NULL-DELTA check and reads one pre-existing error** —
`test/v4-css-emerging.test.ts(12,10): TS2459 … 'serializeCssValue' … not exported` — in a `test/`
file this unit never opened; ⟨cmd⟩ `git status --porcelain -- src test` → *(empty)*. **Zero `src/`
bytes**, as the wave states.

#### c.9 §8 artefacts

- **Artefact 5** — `evidence/W4/gradient-grammar.json` (`1c34ce6e`, `servedModel` on its first key):
  the born-RED cell beside the cured one, and the **21-press key-by-key ledger** — each key with its
  `left` before, after, delta, and the inline declaration the delta was read from. Both runs of the
  ledger were compared byte-for-byte ⟨cmd⟩ `IDENTICAL_RUNS= true`.
- **Artefact 8** — eight rail PNGs, fine and coarse, before and after, plus the caret-focused and
  handle-focused pairs. **The at-rest pairs are byte-identical** ⟨cmd⟩ `shasum -a 256` →
  `de4577b74e7adf99…` for `gradient-rail-fine-{before,after}.png` and `27c5e68b67ebc35f…` for
  `…-coarse-{before,after}.png`. That equality **is** the claim of §5's *"the 20×20 visual silhouette
  may stay"*: the rail at rest is pixel-for-pixel what it was, and only the seat grew.

#### c.10 Residuals, recorded so nothing is silently dropped

1. **o27 BR-3's fine arm is RED and it is this cure's** (c.7). One assertion pair, one named
   one-line repair, out of every W4 bound. `e2e-smoke` is a HARD CI job, so this unit closes
   **PARTIAL**, not DONE.
2. **Three pre-existing gradient REDs stand untouched** (c.7): two dead-DOM plate assertions
   (r3.3 row 4 / G13 → **X-W6**) and one easing literal (`steps(4, jump-end)`). Curing them would be
   taking X-W6's work on a mismatch this unit has not diagnosed.
3. **The `Gradient stop at N%` name is retired.** Out-of-tree adjudication probes use
   `button[data-stop-id][aria-label^="Gradient stop at"]` as a SELECTOR convention
   (`GradientStopEditor.md` r1 §3 π obligations, r3.4 π obligations). Those probes are banks, not
   gates, and **`data-stop-id` — which every live spec actually binds — is unchanged**; recorded so
   a later seat reading the adjudication's selector line is not surprised.
4. **The painted box varies ~3.5% between runs** (20.7 vs 20.0; 24.8 vs 24.0): a residual scale
   leaks into `getBoundingClientRect`, the same phenomenon unit a booked in its A3 note. No gate
   moves — every reading sits on the same side of its floor — and `rootFontSize` is now recorded
   with the geometry so the next seat can tell the two causes apart.
5. **A producer ask exists and was NOT taken**: the multi-thumb rail species stays GLASS-ROUTED
   (L-13 / D-14, banked), and this unit added **no new hand-rolled rail mechanics** — the caret is a
   `<button>` and the handles are the same buttons with ARIA. A relay letter would need
   `docs/tranches/V/coordination/**`, which is in no W4 §4 row; the adjudication's own ordering
   covers it (*"the a11y contract lands locally NOW via D-7's cure — accessibility does not wait on
   a sibling repo"*).
6. **`X.W4.g` untouched and CLOSED** — ⟨cmd⟩ `grep -rn 'watercolor-dot' demo | wc -l` → **11**, the
   bank intact. Artefact 9 is correctly **absent**.

#### c.11 Locks discharged

- **Born-RED first** — the gate spec landed and ran RED twice (`96936340`) before one product byte;
  ⟨cmd⟩ `git status --porcelain -- demo/` was empty at that commit.
- **Assertions read `style.left`, NEVER the rounded `aria-label`** (GradientStopEditor addendum §6)
  — every position in the gate and in artefact 5 is the handle's own `left`; the name is read for
  exactly one thing, C2's ordinal. The one surviving `aria-label`-percent read in the repo
  (`gradient.spec.ts:169`) was re-anchored to `left` by this unit.
- **The pointer-add gesture keeps a live case beside the keyboard one** — in C1's own test, after
  the keyboard arm: a real `bar.click()` mints (4 → 5).
- **NO new hand-rolled rail mechanics** — one `<button>` seat, one `aria-hidden` face span, ARIA
  attributes and a keydown switch. The multi-thumb species stays banked (residual 5).
- **The role-choice reading did NOT reach a third failure** — `slider` was taken on the first
  reading, from `W4.md:261` and D-7's own text, and measured green in the a11y tree (C2). The one
  role question that *was* re-read (the rail root) is recorded in c.3 with its ARIA reason, not
  escalated: it is a shape reading inside the named cure, not a failed gate.
- **`HANDLE_HALF` and the axis are untouched** — X-W6's, per `W4.md:77-80`.
- **U-F12 Pole B** — no dark-accent work; the cure touches semantics, geometry and focus only.
- **`scripts/dev/dev.sh`** — never opened, never staged.
- **glass-ui and every sibling tree READ-ONLY** — `node_modules/@mkbabb/glass-ui/**` was not written;
  no producer selector was copied (the census's `[data-slot="slider"]` attribution stamp was
  **deliberately not** used to re-attribute the handle — that would have been a copied producer
  selector, a HIGH defect, and the seat was grown honestly instead).
- **No masking move** — no `try/catch` around a defect, no `test.skip`, no allowlist, no
  `node_modules` patch, no assertion relaxed. The one instrument change (c.5) polls the product's own
  settled value instead of overriding the product.
- **E13** — four-path sweep re-run at this seat's clock (`2026-09-19 01:20:29 EDT`) ⟨cmd⟩
  `/usr/bin/find <each path> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 00:36"` → only
  keyframes' `INBOUND-LEDGER.md` (a sibling's ledger, not a letter). **0 new letters · 0 new `I-n` ·
  0 UNREAD in this unit's scope**: the five UNREAD rows — **O-20 · I-30 · I-31 · I-32 · I-35** —
  route by their own Routing cells to the X formation mail seat / X-W0.j / X-EXT-1..6 / X·KF, and
  X-EXT-1 routes to **`X.W4.g`**, which the census FAIL keeps closed. Measured against this unit's
  vocabulary ⟨cmd⟩ `grep -rEil "aria-valuetext|role=\"slider\"|gradient stop|keyboard grammar|focus-visible|target size|WCAG 2.5.8"`
  over `V/coordination/*.md` → the sole hit is `INBOX.md` itself (self-excluded, SELF-COUNT law).

**STATUS: PARTIAL.** **C1 · C2 · C3 · C4 all GREEN**, double-run and byte-identical across runs, and
**unit a's carried A1/A2 REDs are closed by this landing** (0 undersized at both matrices, measured
twice with no edit to either spec). The unit is **PARTIAL and not DONE** for one reason, stated
loudly: the spec-ordered target growth leaves **one out-of-bounds `smoke` assertion pair RED**
(`o27-focus-affordance.spec.ts:126-129`, the 20px-dot arm now reading the 24px seat), and
`e2e-smoke` is a HARD CI job (CC-031). The repair is named to the byte in c.7 and **was not taken**,
because the path is in no W4 §4 row. No bounds were widened, no gate was narrowed, and no assertion
was relaxed.
