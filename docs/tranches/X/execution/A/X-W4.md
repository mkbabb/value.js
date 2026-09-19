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

---

### X.W4.d

**SERVED MODEL: claude-opus-5[1m]** · Opus implementation seat (M-23, `W4.md:219`) ·
**Track A · wave X-W4 · unit d**, redispatched after the **2026-09-18 host restart killed the
predecessor seat mid-work**. Sitting date of record stays **2026-09-17**. Wall clock at this seat
`2026-09-19 02:51:41 EDT` → `03:15 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`. **HEAD at entry**
`88e91365` ⟨cmd⟩ `git log --oneline -1` · branch `tranche-u` ⟨cmd⟩ `git rev-parse --abbrev-ref HEAD`.

**Sections executed**: `W4.md` §3 Scope 7 (`:68-71`) · §5 `### X.W4.d` (`:272-286`) · §6 unit-d gate
table (`:401-408`) · §9 commit row 6 · §8 artefacts 6, 8.
**Rulings consumed**: COHESION read to the file end (**1,562 lines**; §0u and §0v are new since unit
c's seat) ⟨cmd⟩ `grep -c "X-W4\|X\.W4" docs/tranches/X/COHESION.md` → **9**, and
⟨cmd⟩ `awk 'NR>=1542' … | grep -cE 'X-W4|X\.W4'` → **0** — **no later addendum rules on this unit**.
The nine hits are `X.W4.g`'s trigger-gated cut (`:72`, `:669`, `:675-676`, `:690`, `:759`, `:804`,
`:1104`) plus **§0j.A**'s **U-F12 → POLE B** row (`:869`, *"re-opens dark-accent work X-W4 was not
sized for"* — **no dark-accent work done here**) and **DR-24** (`:865`) `scripts/dev/dev.sh`
**NEVER touched, never staged**. `X.W4.g` stays CLOSED on X-W0.j's dated census **FAIL (1 of 4 at the
elected 8.0.0)**; ⟨cmd⟩ `grep -rn 'watercolor-dot' demo | wc -l` → **11**, the bank intact.

---

#### d.0 CRASH-RECOVERY — the inheritance was THIS unit's, read WHOLE and judged hunk by hunk

⟨cmd⟩ `git status --porcelain` at entry → **11 rows**. **Nine are inside this unit's writable set**
and are a killed `X.W4.d` predecessor's partial work — the whole of unit d's product surface:

| inherited path | shape at entry |
|---|---|
| `demo/shell/usePaneRouter.ts` | M, +445 |
| `demo/shell/dock/Dock.vue` | M, +316 |
| `demo/color-picker/App.vue` | M, +269 |
| `demo/color-session/keys.ts` | M, +197 |
| `demo/shell/dock/layers/GenericActionBar.vue` | M, +172 |
| `demo/shell/dock/layers/ActionBarLayer.vue` | M, +139 |
| `demo/shell/dock/ActionToolbar.vue` | M, +49 |
| `eslint.config.js` | M, +43 |
| `demo/picker/ColorPicker.vue` | M, +38 |

⟨cmd⟩ `git diff --stat` over the nine → **+1,262 / −406**, read in full before one byte was written.
The two rows OUTSIDE the set — `scripts/dev/dev.sh` (DR-24) and
`docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's) — were **left exactly as found**, and
`stash@{0}` (17 paths, none in any W4 bound) was **never popped**. Nothing was stashed, reset,
restored or blanket-adopted.

**The predecessor's born-RED commit already existed** and is this unit's, not a stranger's:
⟨cmd⟩ `git log --oneline --all --grep="w4.d" -i` → **`5406a111`** *"test(x-v/w4.d): the scene-action
contract gate — BORN-RED, 8 of 8 failing before one product byte (D1 render path, D4 unavailable
state, AB-32 active member)"*, **243 L**, line 1 `// SERVED MODEL: claude-opus-5[1m]`, and
⟨cmd⟩ `git show --stat 5406a111` names **exactly one file**. The born-RED-first law is therefore
**satisfied by measurement, not by assertion**: the gate spec was in history before any product byte
of this unit landed.

| inherited surface | judged against | verdict |
|---|---|---|
| `keys.ts` — `SceneActionToken` (14), `SceneActionState` (4 arms), `SceneAction.active`, `SceneInputArm`, `ScenePaneTargets` | §5's *"token union, not `string`"*, §2's *"silently does nothing → unrepresentable"*, AB-32, §3a's D1 escape-hatch trigger | **CONFORMS** — the state union is TOTAL and the Picker's edit arm is a member of the set, so §3a's D1 trigger never fired |
| `usePaneRouter.ts` — `VIEW_SCENES`, `readScenePaneTarget`, `resolve`, `dispatch`, the four builders | §5's collapse; MP-3 | **CONFORMS** — `VIEW_SCENES` is `Record<ViewId, …>`, so a new view cannot silently inherit a neighbour's bar; MP-3's guard is the `failed` arm and lands in the same change |
| `Dock.vue` — one prop, one layer, one row | §5's *"replace the `v-if`/`v-else-if` priority with ONE render path"* | **CONFORMS** |
| `ActionBarLayer.vue` · `GenericActionBar.vue` | §5; `ActionButton.vue` is NOT in bounds | **CONFORMS** — the four states are expressed through props `ActionButton` already publishes (`disabled`, `title`, `description`, `activeStyle`), so the §3a `ActionButton` escalation did **not** fire |
| `ColorPicker.vue` — `actionBarContext` → `sceneActionTarget` | §5 | **CONFORMS** |
| `ActionToolbar.vue` — the retirement header | `W4.md` §4 (`modify`, not `delete`) + `:175` (`test/**` Do-NOT-touch) | **CONFORMS** — and measured: ⟨cmd⟩ `npx vitest run test/picker-blob-config.test.ts` → **3 passed** |
| `eslint.config.js` | the lock *"write ONLY the action-path `no-explicit-any` object"* (§4a Cross-wave, shared with X-W8/X-W9) | **ONE HUNK REWRITTEN** — see d.1 |
| `App.vue` — the registry and the two mount callbacks | §5; and the app's actual runtime | **DEFECT FOUND AND CURED** — see d.2 |

**Nothing was treated as done until the gates this unit owns measured green at this seat's own
clock** (d.3). The inherited paths are named again in d.4.

#### d.1 The one hunk this seat REVERTED, with its reason

The inherited `eslint.config.js` carried **+43/−13**: the D2 object **plus** three unrelated
`prettier --write` reflows (`:243-249`, `:269-275`, `:286-292`) in the `no-restricted-imports` blocks
that **X-W8 (.b/.e) and X-W9.f also write** (`W4.md:206-208`). The §Unit-plan lock is literal —
*"this wave writes **only** the action-path `no-explicit-any` object"* — and §7's `prettier --check`
leg reads `demo e2e`, which does not contain this file. Measured both ways so the trade is stated,
not assumed: ⟨cmd⟩ `npx prettier --check` on **HEAD's** `eslint.config.js` → **EXIT 1** (the file was
already prettier-unclean at HEAD, so the reflow was the cadence's doing, not gratuitous) — but it
manufactures three-hunk conflict surface on a file two other waves hold, for zero gate. The file was
rebuilt as **HEAD's bytes + the D2 object alone**: ⟨cmd⟩ `git show --stat e64002e9 -- eslint.config.js`
→ **`eslint.config.js | 30 ++`**, **+30 / −0**, purely additive. The D2 object is **last** in the flat
config, which is what makes it win (last match wins).

#### d.2 The DEFECT in the inheritance — measured, then cured at the root

The inherited cure **crashed the app on `/#/mix`**, and it was found by running the gate rather than
by reading it:

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/scene-action-contract.spec.ts
INHERITED, run 1 → EXIT 1 · 7 passed, 1 failed
[WebServer] [Unhandled rejection] Unknown Error: Maximum recursive updates exceeded in component <App>.
[WebServer] [console.error] NotFoundError: Failed to execute 'insertBefore' on 'Node': …
  1) AB-32 · the palette-open indicator survives the contract collapse
     Error: expect(locator).toBeVisible() failed — locator('.glass-dock') … unexpected value "hidden"
```

**The predecessor's own comment claimed this was cured** (*"a `shallowRef` whose value is replaced by
a fresh object literal therefore triggers on every patch … the registry has to earn that property
deliberately"*), and its identity guard in `publishScenePanes` is real — but it is not sufficient,
and the record says so rather than inheriting the claim. **Two bounded probes** (temporary
`console.warn`s inside this unit's own `App.vue`, reverted before landing) measured the actual
mechanism:

```text
probe 1 — every publish that passed the identity guard, on /#/mix, ONE render pass
  102 × [W4D-PUBLISH] {"m":[true,false]}   (null → target)
   51 × [W4D-PUBLISH] {"m":[false,true]}   (target → null)   … until Vue's recursion cap

probe 2 — what the right slot actually reports
  102 × {"right":"mix","kind":"obj","keys":["clearSelection","startMix","copyResult"],"hasClear":true}
   53 × {"right":"mix","kind":"obj","keys":[],"hasClear":false}
    4 × {"right":"about","kind":"obj","keys":[],"hasClear":false}
    1 × {"right":"mix","kind":"null"}
```

**The root cause, stated exactly.** `PaneSlot` reports through an INLINE function ref
(`PaneSlot.vue:124` `:ref="onMount ? (el: any) => onMount!(el) : undefined"`), so Vue re-invokes it
on every patch of the slot — and for a `defineAsyncComponent` pane inside `<KeepAlive>` the object it
hands back **alternates** between the resolved pane's exposed instance and the wrapper's own bare
public instance. The inherited callback read the bare report as a **de-registration**, so the
registry flipped `null ↔ target` on every patch; and because the registry is read by `sceneActions`,
which **App's own render reads**, the write re-entered the very effect that produced it. That is
verbatim what Vue's message says: *"a reactive effect that is mutating its own dependencies and thus
recursively triggering itself."* The three `ref<any>` this replaces were immune **by accident** —
nothing rendered them, so their flip cost nothing.

**Why the cure is the spec's, not an improvisation.** `PaneSlot.vue` is on `W4.md:175`'s
Do-NOT-touch list (X-W5's), and the alternative root fix — the panes registering themselves through
an injected port — needs `MixPane.vue` / `GeneratePane.vue` / `GradientPane.vue`, which are in **no**
W4 §4 row. Both would have been §3a escalations. The cure that IS in bounds is to state what a mount
report **means**, in `App.vue`, and nothing more:

```ts
function foldSceneReport<S extends ScenePane>(scene, slotOwnsScene, instance) {
    if (!slotOwnsScene || instance === null) return null;                    // gone, or unmounted
    return readScenePaneTarget(scene, instance) ?? scenePanes.value[scene];  // else: not a fact about this scene
}
```

· the slot no longer shows this scene → **cleared**; · an explicit unmount (`null`) → **cleared**;
· an instance exposing the scene's commands → **registered**; · anything else → **not a fact about
this scene**, so what is registered stands. **This is not a fallback over a defect**: a pane that
renames a command never satisfies `readScenePaneTarget`, so it never registers, and the contract
surfaces it as `unavailable` — which is exactly D4's subject. The same reading is applied to the
colour scene (`foldColorPickerReport`). No `try/catch` was placed around the recursion, no
`test.skip`, no assertion relaxed.

#### d.3 Gate readings — BEFORE → AFTER, at this seat's own clock, DOUBLE-RUN

```text
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit                                           → EXIT 0, 0 lines
⟨cmd⟩ npx eslint demo/color-picker/App.vue demo/shell/usePaneRouter.ts demo/shell/dock/    → EXIT 0
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/scene-action-contract.spec.ts
   run 1 → EXIT 0 · 10 passed (38.7s)      run 2 → EXIT 0 · 10 passed (38.4s)
   ⟨cmd⟩ grep -c "Maximum recursive" → 0 in BOTH runs
```

| gate | BEFORE (born-RED at `5406a111` / the wave baseline) | AFTER (this seat, double-run) | verdict |
|---|---|---|---|
| **D1** one contract, one render path | **2** exported contracts (`ActionBarContext` `keys.ts:17` · `DockActionBar` `usePaneRouter.ts:58`, DRIFTED from `:49` by `504819ea`) selected by `Dock.vue:156-157`; gate spec 8/8 failing | **1** contract; exactly ONE `[data-testid="scene-action-row"]` per document on every scene — colour **5** seats · generate **3** · mix **3** with **zero** `color.*` seats; `vue-tsc` EXIT 0 | **GREEN** |
| **D2** no untyped action path | **8** type-level `any` (the baseline's d-2 number, reproduced exactly) · **9** `?.()` dispatches · the rule `"off"` at `eslint.config.js:70`/`:184` | **0** type-level `any`, **0** `?.()` in code (5 + 2 surviving hits are prose quoting the retired code, named in artefact 6) · the rule armed as **error** and shown to fire | **GREEN** |
| **D3** the checker bites | owed | one token → an unregistered literal returns **TWO** `vue-tsc` errors (TS2820 at the declaration, TS2345 at the dispatch), **EXIT 2**; the revert returns **EXIT 0** with the file byte-identical to its pre-probe copy | **DEMONSTRATED** (`d-falsifier.txt`) |
| **D4** no silent no-op | the mobile `<PaneSlot>` carries no `:on-mount`, so all **9** handlers no-op with no signal | at 390×844, for Generate · Gradient · Mix: every seat `data-action-state="unavailable"`, `disabled` + `aria-disabled="true"`, accessible name matching `/unavailable/i`, and ONE `role="status"` line naming the condition; at the desktop matrix Generate reads `ready · ready · ready` and a real click dispatches without degrading the state | **GREEN** |

**D4's bounds are respected literally**: the mobile `:on-mount` was **NOT** wired. ⟨cmd⟩
`grep -c "on-mount" demo/color-picker/App.vue` → **3** at HEAD and **3** now — two bindings (`:121` left, `:155` right, both DESKTOP) and one prose line (`:445`), exactly as at
HEAD. The parity cure stays X-W5's `bindPane` (gate A3); this unit made the **silence**
unrepresentable and handed X-W5 a typed seam, which is what `W4.md:408` orders.

**No sibling gate moved.** Re-run with **no edit** to any sibling spec, at this seat's clock:

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-control-targets.spec.ts e2e/smoke/a11y-gradient-stop-grammar.spec.ts   → 8 passed
⟨cmd⟩ npx playwright test --project=smoke-mobile e2e/smoke/mobile/a11y-control-targets.spec.ts                                   → 3 passed
```

A1 · A2 · A3 · A4 (unit a, closed by unit c) and C1–C4 (unit c) all **stay GREEN** across this
landing.

#### d.4 Attribution — three neighbouring REDs, separated BY MEASUREMENT and found PRE-EXISTING

The dock-adjacent suites were run against the landed bytes and then against the **pre-cure bytes**
(⟨cmd⟩ `git checkout e64002e9^ -- <this unit's nine files>`, run, restore with
`git checkout e64002e9 -- <the same nine>`; only this unit's own files were ever checked out, and
⟨cmd⟩ `git status --porcelain` was clean of them afterwards):

```text
AFTER  (e64002e9)   color-propose + o15-dock-register → 3 failed, 6 passed
BEFORE (e64002e9^)  the SAME two specs                → 3 failed, 6 passed   ← the same three, same errors
```

| test | pre-cure | at HEAD | attribution |
|---|---|---|---|
| `color-propose.spec.ts:128` *"a successful propose returns the toolbar to its actions state"* | FAILED (*"the propose submission never reached the network"*) | FAILED identically | **PRE-EXISTING** — the other two propose tests (the cycle reaching `Propose color name`, and the one-active-layer invariant) **pass**, so the toolbar cycle this unit re-shaped is green; the failing arm is the network leg |
| `o15-dock-register.spec.ts:50` *"no geometric ring on mix dots"* | FAILED (`.add-slot-ghost` has no `aria-label` — *"glass-ui 7.0.0 WatercolorDot drops tag/aria-label/@click"*) | FAILED identically | **PRE-EXISTING** — this is **CC-044**'s impostor row, banked in `X.W4.g`, which the census FAIL keeps CLOSED |
| `o15-dock-register.spec.ts:125` *"the Tools trigger wears the true-button box-model"* | FAILED (`padding` `"4px"` vs `"8px 12px"`) | FAILED identically | **PRE-EXISTING** — a `--dock-compact-control-padding` register row; this unit wrote no dock CSS byte |

**Zero REDs are this unit's.** `e2e-smoke` is a HARD job (CC-031), so the three are named here rather
than absorbed; none is in any W4 §4 row and none was touched.

#### d.5 §7 cadence

```text
⟨cmd⟩ npx eslint demo e2e                                          → EXIT 0
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit                   → EXIT 0, 0 lines
⟨cmd⟩ npx tsc -p tsconfig.e2e.json --noEmit                        → EXIT 0
⟨cmd⟩ npx prettier --check <the 9 touched paths + the gate spec>   → CLEAN
⟨cmd⟩ git diff --check -- demo e2e eslint.config.js                → EXIT 0
⟨cmd⟩ npx vitest run test/picker-blob-config.test.ts               → 3 passed  (the ActionToolbar source pins)
```

`prettier --check demo e2e` stays RED over the pre-existing surface units a and b booked for X-W11's
hygiene walk; every file this unit touched is clean. **Zero `src/` bytes** ⟨cmd⟩
`git status --porcelain -- src test api` → *(empty)*, as the wave states.

#### d.6 Commits — pathspec on the commit itself, one meaning each

| # | sha | scope | paths |
|---|---|---|---|
| born-RED | **`5406a111`** | `test(x-v/w4.d)` the gate spec, 8 of 8 failing before one product byte | `e2e/smoke/scene-action-contract.spec.ts` (243 L) — the killed predecessor's, adopted after being read whole |
| §9 row 6 | **`e64002e9`** | `refactor(demo/scene-actions)` the collapse, the deletions and the eslint scope | the **9** files above (+1,302 / −396) |
| beside | **`aecad5d3`** | `test(x-v/w4.d)` this unit's own §8 artefact-8 frames | the gate spec, +44 |
| beside | **`72e776af`** | `docs(x-v/w4.d)` §8 artefacts 6 + 3(D3) + the four frames | `action-contract-diff.md` · `d-falsifier.txt` · 4 PNGs |

⟨cmd⟩ `git show --stat` on each returns **exactly** its own paths and no sibling seat's (1 · 9 · 1 ·
6 files). `scripts/dev/dev.sh`, `CARRY-LEDGER.md`, `execution/LEDGER.md`, `execution/C/F-W8.md` and
`execution/B/KF-W11.md` were **never staged** — three sibling seats committed to this index during
this unit's sitting and not one of their rows was swept in. **`e64002e9` is ONE commit on purpose**:
MP-3 binds the ref-binding cure and its throw-surfacing guard to the same change, and AB-32 binds the
active member to the same collapse. The four PNGs needed `git add -f` and it is **disclosed, not
quiet** — `.gitignore:34` ignores `*.png` repo-wide and `:35` negates only `demo/**/*.png`;
force-adding evidence PNGs under `docs/tranches/**` is the repo's own idiom (unit c's c.6 records the
same act) and `.gitignore` was not touched.

#### d.7 §8 artefacts

- **Artefact 6** — `evidence/W4/action-contract-diff.md` (242 L, `SERVED MODEL` on line 1): the three
  contents `W4.md:435-437` names, each quoted by its command and double-run — the `SceneActionSet`
  definition (14 tokens · the TOTAL four-arm state union · AB-32's `active` · the input arm that kept
  §3a's D1 escape-hatch trigger from firing · the typed registry), the deleted-symbol list (7 rows,
  including the three `ActionBarContext` members that could never change a rendered byte), and the
  `any` count **8 → 0** with every surviving prose hit named by file and line.
- **Artefact 3's D3 half** — `evidence/W4/d-falsifier.txt` (79 L): both outputs verbatim, RED then
  GREEN, plus D2's own rule shown to bite (necessary, because at the wave's open the scoped `eslint`
  read exit 0 **for the wrong reason**).
- **Artefact 8** — §8's five enumerated pairs are units a, b and c's surfaces and are **already
  banked** (`slug-cluster` · `rail-letters` · `admin-audit-toolbar` · `gradient-select-composition` ·
  `gradient-rail`, fine and coarse). The surface THIS unit changes is the dock's action bar, so its
  own pair is added: `action-bar-mix-desktop-{before,after}.png` and
  `action-bar-mix-390-{before,after}.png`, all four distinct ⟨cmd⟩ `shasum -a 256`. **The `before`
  desktop frame IS the D1 defect**: `/#/mix` rendering the picker's five seats plus the input toggle,
  beside an `after` frame rendering the mix set's three.

#### d.8 Residuals, recorded so nothing is silently dropped

1. **`ActionToolbar.vue` is retired from the render path but not deleted.** Nothing imports it
   ⟨cmd⟩ 4 surviving references, all prose. `W4.md` §4 grants `modify`, not `delete`, and
   `test/picker-blob-config.test.ts:50-51` reads this file's **source** while `W4.md:175` puts
   `test/**` on the Do-NOT-touch list. The one-line repair (delete the file and re-anchor those two
   assertions onto `usePaneRouter.ts`, where the `color.copy` seat now lives, in the SAME change) is
   written into the SFC's own header for the wave that owns both surfaces.
2. **`ColorPicker.vue` is in §5's file list but not in D2's eslint scope.** §6 D2's own command does
   not name it and its RED census never counted it; its single `any` is a display-space bridge on a
   `ColorSpaceSelector` typed `modelValue: string` (X-W6/X-W7's file). The eslint object **says so in
   its own comment** rather than globbing the file away. Recorded in artefact 6 §3.2.
3. **Three neighbouring `smoke` REDs are PRE-EXISTING** (d.4), measured byte-identical before the
   cure: one propose-network leg, one CC-044 impostor row (`X.W4.g`'s, census-CLOSED), one
   dock-padding register row. None is in any W4 §4 row; none was touched.
4. **The mobile `:on-mount` gap is INTACT and X-W5's** — the wave's own bounds say so, and this unit
   left it exactly as found. Every mobile-branch action renders `unavailable`, which is the state
   D4 asks for, not a cure of the gap.
5. **The `failed` state is a SURFACING seam, not an ErrorBoundary rescope.** MP-3 permits either arm;
   this unit took the surfacing arm because the dock band closes before `<main>` while the app's only
   boundary sits inside it, so a dock dispatch can reach no boundary at all. The containment altitude
   (a boundary rescope) belongs to X-W5 (COHESION §0k.3 S-7). Nothing is swallowed: the throw is
   recorded, rendered through `role="alert"`, and the seat stays operable so the state is recoverable.
6. **`X.W4.g` untouched and CLOSED** — ⟨cmd⟩ `grep -rn 'watercolor-dot' demo | wc -l` → **11**.
   Artefact 9 is correctly **absent**.

#### d.9 Locks discharged

- **Born-RED first** — `5406a111` is in history with **one** file in it, ahead of every product byte
  of this unit (d.0). The two artefact-8 capture tests added at `aecad5d3` came **after** the
  born-RED verdict and touch **no** gate assertion.
- **MP-3 SAME-CHANGE GUARD** — the ref-binding cure and its guard are **one commit** (`e64002e9`).
  `startMix` is the sole throwing exposed member and its dock dispatch is the one that could reach no
  boundary; `dispatch()` records the throw and `GenericActionBar` renders it as `failed`.
- **AB-32** — `SceneAction.active` is on the contract and the spec fences it: on `/#/palettes`,
  `color.palettes` reads `data-action-active="true"` while `color.copy` reads `"false"`. The
  indicator does not regress under a green gate.
- **D4 NOT closed by wiring the mobile `:on-mount`** — measured, `grep -c "on-mount"` → **3** (two desktop bindings + one comment), both bindings
  desktop, unchanged from HEAD (d.3).
- **`eslint.config.js`: ONLY the action-path object** — **+30 / −0**, three inherited reflows on
  X-W8/X-W9's blocks reverted (d.1).
- **`ActionButton.vue` NOT needed** — the four states ride props it already publishes, so §3a's
  named escalation did not fire. Nor did §3a's D1 trigger: the Picker's edit arm is a member of the
  contract, not an escape hatch.
- **U-F12 Pole B** — no dark-accent work; the change is types, dispatch and semantics.
- **`scripts/dev/dev.sh`** — never opened, never staged. **`CARRY-LEDGER.md`** and the three sibling
  execution records dirty during this sitting — never staged.
- **glass-ui and every sibling tree READ-ONLY** — `node_modules/@mkbabb/glass-ui/**` was read (to
  settle `getComponentPublicInstance`'s `markRaw` behaviour, which decides whether the exposed target
  survives a deep `ref`) and **not written**; no producer selector was copied; no `node_modules`
  patch.
- **No masking move** — no `try/catch` around a defect (the `try` in `dispatch` is the contract's
  `failed` arm, which RENDERS what it catches), no `test.skip`, no allowlist, no relaxed assertion,
  no widened bound. The two diagnostic probes were `console.warn`s in this unit's own file and were
  reverted before landing; ⟨cmd⟩ `grep -c "W4D-PROBE\|W4D-PUBLISH\|W4D-RIGHT" demo/color-picker/App.vue` → **0**.
- **E13** — four-path sweep re-run at this seat's clock (`2026-09-19 03:14:58 EDT`) ⟨cmd⟩
  `/usr/bin/find <each path> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 01:20"` → only
  `INBOX.md` itself (**self-excluded**, SELF-COUNT law); glass **BK** re-confirmed newest
  ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -3`; keyframes and atlas unmoved. **0 unrowed
  value.js-addressed letters · 0 new `I-n` · 0 UNREAD in this unit's scope**: the five rows whose
  Status cells read UNREAD — **O-20 · I-30 · I-31 · I-32 · I-35** — route by their own Routing cells
  to the X formation mail seat / X-W0.j / X-EXT-1..6 / X·KF, and the W4 receiver among them is
  **`X.W4.g`**, which the census FAIL keeps CLOSED. Measured against this unit's vocabulary ⟨cmd⟩
  `grep -rEil "SceneActionSet|SceneActionToken|ActionBarContext|DockActionBar|scene action|no-explicit-any"`
  over `V/coordination/*.md` and `BK/coordination/*.md` → the sole hit is `INBOX.md` itself.

**STATUS: DONE.** **D1 · D2 · D3 · D4 all GREEN**, double-run and byte-identical across runs, with
**zero RED carried** and **zero escalations**. The inheritance was adopted only after being read
whole and measured: one hunk reverted to hold a cross-wave lock, and one live crash
(*"Maximum recursive updates exceeded in component <App>"* on `/#/mix`) diagnosed by probe and cured
at its root inside this unit's bounds. The three neighbouring `smoke` REDs are **PRE-EXISTING**,
proved by a pre-cure control run, and no sibling gate moved across this landing.

---

## Close — X-W4 (VERIFY-ONLY close seat)

**SERVED MODEL: claude-opus-5[1m]** · the **VERIFY-ONLY close seat** · Track A · wave **X-W4**.
Sitting date of record **2026-09-17** (the owner's begin-word). Wall clock at this seat
`2026-09-19 03:32:48 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`. **HEAD at entry** `fc781875`,
`3087135d` by the time this section was written (both Track C/D docs commits landing concurrently)
⟨cmd⟩ `git log --oneline -1` · branch `tranche-u` ⟨cmd⟩ `git rev-parse --abbrev-ref HEAD`.

**This seat cured nothing.** It re-ran every §6 gate at its own clock against the **settled,
committed bytes**, re-ran §8's artefact inventory, re-swept E13, and wrote only this section and
the wave's LEDGER row cells. Every number below was measured here, never quoted from a unit receipt.

### K.0 Crash-recovery and the writable set

⟨cmd⟩ `git status --porcelain` at entry → **2 rows**, and **neither is in any W4 §4 path**:
`scripts/dev/dev.sh` (unowned, DR-24 — never opened, never staged) and
`docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's). **No inherited work existed inside this
seat's writable set**, so the crash-recovery obligation discharges as an absence: nothing was
stashed, reset, restored or adopted. The same two rows are still dirty and still untouched at close.
`W4.md` itself is **not** in this seat's writable set — §4 grants the close seat **no** row on it
(unlike `W3.md`, whose §4 carries an explicit *"modify (status + artefact paths at close)"* grant),
so **no byte of the spec was written** and §1's four-verb table keeps its authored bytes (K.10).

### K.1 Commit roster — 25 commits, every one present, bounds CLEAN

| unit | commits (in landing order) |
|---|---|
| **a** | `8934de85` cure · `cf5409e7` gate pair + A5 · `b4e47d0c` §8 evidence · `5f5fc89f` artefact-8 PNGs · `c2692eea` receipt · `bda34afa` LEDGER cell |
| **b** | `ea0fdca8` B3 receipt (§9 row 4, **before** row 3) · `c18de089` gate spec born-RED · `58371516` cure · `3d548669` instrument navigation-safety · `6fdb57ee` §8 evidence · `7dd45877` receipt |
| **c** | `96936340` gate spec born-RED · `cf108ec6` ring arm settles · `666978d4` cure + the two bindings it invalidated · `1c34ce6e` §8 artefacts 5+8 · `38de7661` key-by-key ledger · `18936b97` receipt · `3a36c78a` LEDGER cell |
| **d** | `5406a111` gate spec born-RED · `e64002e9` the collapse (ONE commit: MP-3 + AB-32) · `aecad5d3` artefact-8 frames · `72e776af` §8 artefacts 6 + D3 · `ea8ad82c` receipt · `c59a4849` LEDGER cell |
| **g** | **none — NOT OPENED.** X-W0.j's dated census returned **FAIL 1 of 4** at the elected 8.0.0 |

All 25 exist ⟨cmd⟩ `git show --stat --format="%h %s" <each>`. **Union bounds proof**, taken over all
25 commits' name-only output ⟨cmd⟩ `for c in …; do git show --pretty=format: --name-only $c; done |
sort -u | wc -l` → **70 paths**, of which 39 are `docs/tranches/X/waves/evidence/W4/**` and the
remaining **31** are exactly: the 22 `demo/**` + `eslint.config.js` §4 rows, the 6 `e2e/**` §4 rows,
this record and `execution/LEDGER.md`. **ZERO paths outside the writable sets** ⟨cmd⟩
`grep -cE "^(src/|api/|test/|node_modules/|\.github/|scripts/dev/dev\.sh|demo/shell/PaneSlot\.vue|demo/ui/|demo/shell/viewSchema\.ts)"`
over the union → **0**. Every commit carries one meaning and its own pathspec; no commit swept a
sibling seat's staged path (the X-W0 contamination shape does not recur here). `ComponentSliders.vue`
and `demo/styles/utils.css` are §4 rows that took **zero bytes** — permitted, not required (b.8).

**§9's declared order held**: commit row 4 (`ea0fdca8`, B3's receipt) is an **ancestor** of row 3
(`58371516`, the Select cure) ⟨cmd⟩ `git merge-base --is-ancestor ea0fdca8 58371516` → exit 0, and
each unit's gate spec landed **before** its product bytes.

### K.2 §6 Hard Gate re-measured at this seat's clock — **15 GREEN · 1 RED**

Commands, verbatim, each run at least **twice**:

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-control-targets.spec.ts e2e/smoke/a11y-select-title.spec.ts e2e/smoke/a11y-gradient-stop-grammar.spec.ts e2e/smoke/scene-action-contract.spec.ts
   run 1 → 20 passed · 1 failed (C4 fine)        run 2 → 21 passed · EXIT 0
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-gradient-stop-grammar.spec.ts -g "C4"
   isolated run 1 → 1 failed / 1 passed          isolated run 2 → 1 failed / 1 passed
⟨cmd⟩ npx playwright test --project=smoke-mobile e2e/smoke/mobile/a11y-control-targets.spec.ts
   run 1 → 3 passed   run 2 → 3 passed   run 3 → 3 passed
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit                                       → EXIT 0
⟨cmd⟩ npx eslint demo/color-picker/App.vue demo/shell/usePaneRouter.ts demo/shell/dock/ → EXIT 0
```

| # | BEFORE (the wave's own born-RED baseline) | AFTER (this seat, own clock) | verdict |
|---|---|---|---|
| **A1** fine target size | undersized **13** (`reopen-baseline.json`) | `[W4-A1] undersized=0` in **both** runs | **GREEN** |
| **A2** coarse target size | undersized **10** | `[W4-A2] undersized=0`, three runs | **GREEN** |
| **A3** size axis owns height | `h-7` **18** sites; coarse lift absent | `[W4-A3] measured=4 mismatches=0` · `[W4-A3-COARSE] measured=0 mismatches=0 unlifted=0`; source ⟨cmd⟩ `grep -rn 'class="[^"]*\bh-7\b' demo --include='*.vue' \| grep -v 'w-7 h-7' \| wc -l` → **3** | **GREEN** |
| **A4** zero nameless | nameless **3** fine / **2** coarse | `[W4-A4] nameless=0` · `[W4-A4-COARSE] nameless=0` | **GREEN** |
| **A5** the target gate bites | owed | `a-falsifier.txt` present, `SERVED MODEL`-headed, carrying the pinned-then-reverted pair (`→ EXIT 1 (non-zero, as the gate requires)`) and the delta 5 → 2 | **DEMONSTRATED** |
| **B1** composed trigger title | 14 defects over 7 triggers | `[W4-B1] asserted=7 excluded=1 defects=0`, both runs; every in-scope row reads `ariaLabel=null` + `labelledBy=v-1-N-label` + a rendered `titleText` + `titleBoxInsideField=true` | **GREEN** |
| **B2** trigger height rides the size axis | 14 defects; `h-9` 15 sites | `[W4-B2] asserted=7 defects=0`; every in-scope row `blockSize=36 tokenSm=36` fine and `blockSize=54 tokenSm=54` coarse — the lift measured in the reading itself; source `h-9` ⟨cmd⟩ → **7** (K.7 residual 3 names all seven) | **GREEN** |
| **B3** slider seam consumed as published | fence GREEN, receipt owed BEFORE the first prop edit | `[W4-B3] producerSliderVars=15 declaredInternal=3 consumerReads=0`; ⟨cmd⟩ `grep -rn -- '--slider-range-origin' demo src \| wc -l` → **0**; receipt `ea0fdca8` is an ancestor of the cure | **GREEN** |
| **C1** keyboard creation exists | no seat to Tab to; creation pointer-only | `[W4-C1] caretLeft=252 mintedLeft=252 inline="calc(55% - 1px)"` · `pointerEventsDuringKeyboardJourney=0`, both runs | **GREEN** |
| **C2** handles are sliders | `role=null`, no `aria-value*`, no ordinal | 3 of 3: `role=slider min=0 max=100 now=0\|50.2\|100`, `text="Position …%"`, `name="Gradient stop N of 3"` | **GREEN** |
| **C3** the full grammar | Home/End no-ops, 7 keys absent, 8 defects | `[W4-C3] home=10 end=450 unit=4.4000px/% defects=0`; the 21-press ledger reproduces key-for-key (Page ±44, arrows ±4.391, Space grab / Escape cancel −13.187) | **GREEN** |
| **C4** handle target + unclipped ring | `.rail-handle` 20×20, ring unmeasured | **RED at this seat's clock — 3 of 4 runs.** See K.3 | **RED** |
| **D1** one contract, one render path | 2 exported contracts, 2 render branches | ⟨cmd⟩ `vue-tsc` EXIT 0; ⟨cmd⟩ `grep -rn "export interface ActionBarContext\|export interface DockActionBar" demo` → **0**; `SceneActionSet` is the sole contract (`keys.ts:184`); the spec's 10 tests pass in both runs | **GREEN** |
| **D2** no untyped action path | 8 type-level `any`, 9 `?.()`, rule `"off"` | scoped eslint **EXIT 0** and ⟨cmd⟩ `npx eslint demo e2e` **EXIT 0** with the rule armed `"error"` over the seven action-path files (`eslint.config.js:322-333`); ⟨cmd⟩ `grep -n '?\.()' demo/shell/usePaneRouter.ts` → **2 hits, both prose** (`:135`, `:292`) | **GREEN** |
| **D3** the checker bites | owed | `d-falsifier.txt`: an unregistered token returns **TS2820 + TS2345 at EXIT 2**, the revert returns **EXIT 0**; the same file records D2's rule firing (`EXIT=1` → `EXIT=0`) | **DEMONSTRATED** |
| **D4** no silent no-op | mobile `PaneSlot` unbound; 9 handlers no-op | the 10 contract tests pass in both runs, including the 390×844 `unavailable` + `disabled` + `aria-disabled` + `role="status"` arms | **GREEN** |
| **G1–G4** | not opened | ⟨cmd⟩ `grep -rn 'watercolor-dot' demo \| wc -l` → **11**, the §1.M bank intact and untouched | **NOT OPENED** (census FAIL 1/4) |

### K.3 The one RED — C4's clip arm, and what it is and is not

C4 fails on **one** of its six assertions, `clippers == []`, and it fails **non-deterministically**:

```text
run 1 (four specs)   [W4-C4-FINE] w=24.8 h=24.8 hitW=24 hitH=24 faceW=20.7 faceH=20.7 rootFontSize=16
                     [W4-C4-RING] shadow="… 0px 0px 0px 1px, … 0px 0px 0px 3px" spread=3 focusVisible=true
                     clippers=["div.app-layout [contain=none overflow=hidden/hidden clip-path=none]"]   → FAILED
isolated ×2          identical bytes, identical clipper                                                 → FAILED, FAILED
run 2 (four specs)   [W4-C4-FINE] w=24 h=24 hitW=24 hitH=24 faceW=20 faceH=20 rootFontSize=16
                     clippers=[]                                                                        → PASSED
```

**The correlation is exact across four runs**: the clipper appears **iff** the geometry reads the
~3.3 % inflation (`24.8 = 24 × 1.0333`, `20.7 = 20 × 1.035`) that unit c already booked as a
residual (c.10 #4, *"a residual scale leaks into `getBoundingClientRect`"*) — and never when the
boxes read exactly `24 / 20`. `rootFontSize` is **16** in both states, so the inflation is not a rem
change; the rail's own layout arithmetic is unmoved (`unit=4.4000px/%` in both runs, read from
`style.left`, not from a client rect). The demo's pane swap enters on the **`--spring-snappy`**
morph family (`demo/styles/animations.css:251-271`, *"0.4 s true settle"*, `scale(0.97)` start), so
a read taken inside the spring's overshoot window inflates every client rect in the pane and pushes
the left-most handle's ring outside `.app-layout`'s `overflow: hidden` box — which is precisely what
the clipper string reports.

**What this is**: an **instrument-stability defect in the gate spec**, in unit c's own
`e2e/smoke/a11y-gradient-stop-grammar.spec.ts` (in bounds). `cf108ec6` taught the *ring* arm to poll
its settled value; the **geometry and clip walk were left un-settled**, so C4 reads the affordance
mid-spring. **What this is not**: a product regression — in the failing state the ring is still
painted (`1px` + `3px`, `focusVisible=true`), the seat is still ≥24 (24.8), the hit region still
24/44 and the face still the 20 px silhouette. Every user-facing arm of C4 passes in **both** states.

**Not cured here** (VERIFY-ONLY). The repair is named: settle the transform before the geometry read
(await the pane's `transitionend`/an `expect.poll` on a stable rect) exactly as the ring arm already
polls. `e2e-smoke` is a **HARD** CI job (CC-031), so a gate that is RED in 3 of 4 runs is a real CI
hazard and is booked as this wave's, not waived.

### K.4 §8 Verification Artefacts — 8 of 9 present, artefact 9 correctly absent

⟨cmd⟩ `ls docs/tranches/X/waves/evidence/W4/` → 8 text/JSON artefacts + **30** PNGs.

| # | artefact | state |
|---|---|---|
| 1 | `baseline-2026-08-03.json` | present, `servedModel` key |
| 2 | `reopen-baseline.json` | present, `servedModel` key |
| 3 | `a-falsifier.txt` · `d-falsifier.txt` | present, both `SERVED MODEL`-headed, both carrying a red/green pair |
| 4 | `a16-retest-receipt.md` | present, states *"Filed BEFORE the first slider prop edit"*, and `ea0fdca8` proves it by ancestry |
| 5 | `gradient-grammar.json` | present, the 21-press key-by-key `style.left` ledger |
| 6 | `action-contract-diff.md` | present, the deleted-symbol list and the `any` / `?.()` before-after |
| 7 | `navprobe-recheck.txt` | present — closes **with evidence on the opposite verdict**: MT-F005's nameless button is **alive** (a.7) |
| 8 | screenshot pairs | 30 PNGs covering the slug cluster, rail letters, an admin panel, a Select composition, the Gradient rail and the action bar — fine **and** coarse |
| 9 | `glass8-cut-receipt.md` | **correctly ABSENT** — the census FAIL branch (`W4.md:446-447`) |

Extra, beyond §8 and welcome: `a-h7-cascade.md` (the A3 premise measured FALSE) and
`b-select-composition.md`.

### K.5 §7 cadence at close

```text
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit        → EXIT 0, 0 lines
⟨cmd⟩ npx tsc -p tsconfig.e2e.json --noEmit             → EXIT 0
⟨cmd⟩ npx eslint demo e2e                               → EXIT 0
⟨cmd⟩ git diff --check -- demo e2e eslint.config.js     → EXIT 0
⟨cmd⟩ find scripts -name "proof-*.mjs" | wc -l          → 0   (CC-019's gate FORM holds)
⟨cmd⟩ npx prettier --check <the whole W4 touched surface> → 24 files RED
⟨cmd⟩ npm run typecheck   (library, the null-delta check) → RED, 1 error
```

Both REDs are **PRE-EXISTING and measured so here, not asserted**:

- **prettier.** The 24 are units a's and b's files plus dock neighbours; units c's and d's files and
  **all six** gate specs are clean. Controls: `git show 8934de85^:…/SlugEditLayer.vue`,
  `git show 58371516^:…/MixConfigBar.vue` and `git show e64002e9^:eslint.config.js` are **each
  already prettier-RED before their cure**. The repo-wide 202-file RED is X-W11's hygiene walk.
- **`npm run typecheck`.** `test/v4-css-emerging.test.ts(12,10): error TS2459: Module
  '"../src/css/stylesheet"' declares 'serializeCssValue' locally, but it is not exported.` This wave
  wrote **zero** `src/` and **zero** `test/` bytes (K.1's union proof). The last writer of
  `src/css/stylesheet.ts` is **`c8848bed`** *"refactor(css/surface): PSL-1 derivation, colour
  boundary, stylesheet split"* (2026-09-18 21:48), a **sibling wave's** commit — the export moved and
  the `test/` import was not re-anchored. **Named for its owner, not cured here** (`test/**` is on
  `W4.md:175`'s Do-NOT-touch list).

### K.6 Landed-wrong — caused by this wave, named, NOT cured

Each was re-run by this seat against the settled bytes ⟨cmd⟩
`npx playwright test --project=smoke e2e/smoke/walk.spec.ts e2e/smoke/oracles/o20-generate-plate.spec.ts e2e/smoke/oracles/o27-focus-affordance.spec.ts`
→ **4 failed · 5 passed**.

| id | row | cause | named repair |
|---|---|---|---|
| **LW-1** | `e2e/smoke/walk.spec.ts:89` — `getByRole("combobox", { name: "Generation preset" })` never visible | unit **b**'s spec-ordered `aria-label` retirement: the composed name is now **`"Preset"`** | `{ name: "Preset", exact: true }` (b.7) |
| **LW-2** | `e2e/smoke/oracles/o20-generate-plate.spec.ts:71` — the same binding, timing out at `locator.click` | same | same |
| **LW-3** | `e2e/smoke/oracles/o27-focus-affordance.spec.ts:126-129` (BR-3 fine, *"the 20px visual dot HELD"*) — `Expected < 22, Received 24` | unit **c**'s spec-ordered target growth: `[data-stop-id]` is now the 24 px **seat**, the 20 px dot is `.rail-handle-face` | measure the face — `el.querySelector(".rail-handle-face")!.getBoundingClientRect()` (c.7) |
| **LW-4** | `e2e/smoke/a11y-gradient-stop-grammar.spec.ts:529-532` — C4's clip arm, RED in 3 of 4 runs | unit **c**'s own gate spec reads geometry inside the pane-enter spring's settle window | settle the transform before the read, as `cf108ec6` already does for the ring (K.3) |

**LW-1..LW-3 are out of every W4 §4 row** ⟨cmd⟩
`grep -c "walk.spec\|o20-generate-plate\|o27" docs/tranches/X/waves/W4.md` → **0**, so the units
were right not to write them, and **right to escalate rather than pad product copy or relax an
assertion**. **LW-4 is in bounds** (unit c's own spec) and is this wave's to repair. `e2e-smoke` is
HARD, so all four are booked as open CI debt of this wave.

**Separated from them by measurement, PRE-EXISTING, not this wave's**: `o27:323` (BR-1
forced-colors — `getByRole('option', {name:'Picker'})` never visible under forced-colors, recorded
failing identically pre-cure at c.7), `color-propose.spec.ts:128` (the propose-network leg),
`o15-dock-register.spec.ts:50` (the **CC-044** impostor row, banked in the census-CLOSED `X.W4.g`)
and `:125` (a `--dock-compact-control-padding` register row), the two dead-DOM gradient plate
assertions (→ G13 / **X-W6**) and the `steps(4, jump-end)` easing literal. Units b, c and d each
proved theirs with a **pre-cure control run**; this seat re-ran the suites and reproduces the same
split.

### K.7 Residuals, with named owners

1. **`X.W4.g` is CLOSED and the §1.M bank is intact** — X-W0.j's dated census **FAIL 1 of 4** at the
   elected 8.0.0; `watercolor-dot` = **11**. Owner: **X-W0.j's re-trigger**, never this wave.
2. **A3's premise was measured FALSE and the cure is a real shrink** (`a-h7-cascade.md`): the
   producer states its rung as `min-block-size`, so `h-7` was inert and those controls were 36 fine /
   54 coarse; the size axis takes them to 28 / 44. No gate moves, but it is a visible change.
   Owner: **X-W7**, which inherits A3's size-axis law (`W4.md:481`).
3. **Seven surviving `h-9` sites**, all outside this wave's mechanism: `AuroraPane.vue:122,142,156,170`
   (**the identical defect B1/B2 cured, in a file in no W4 table** — ESC-b.8), `GenerateControls.vue:165`
   (a glass `<Button>`, not a trigger → **X-W7**), `:211` (`w-9 h-9`, a WatercolorDot swatch →
   **`X.W4.g`**), `PaletteSlugBar.vue:2` (`min-h-9`, a grep-shape hit, not a control).
4. **Three surviving `h-7` sites**: two `<Skeleton>`s (→ **X-W8**) and one native 28×28 button whose
   square shape is its meaning.
5. **`ActionToolbar.vue` is retired from the render path but not deleted** — `W4.md` §4 grants
   `modify`, not `delete`, and `test/picker-blob-config.test.ts` reads its **source** while `test/**`
   is Do-NOT-touch. Owner: the wave that holds both surfaces.
6. **`ColorPicker.vue` sits outside D2's armed eslint list** — declared in the config's own comment
   and in artefact 6 §3.2; its single `any` is a display-space bridge on a selector owned by
   **X-W6/X-W7**.
7. **The mobile `:on-mount` gap is intact** — ⟨cmd⟩ `grep -c "on-mount" demo/color-picker/App.vue`
   → **3** (two desktop bindings + one comment), unchanged from HEAD. Owner: **X-W5** (`bindPane`,
   its gate A3). D4 made the silence unrepresentable; it did not wire the mount, exactly as
   `W4.md:408` orders.
8. **The `LabeledField` label-register seam** (the caption voice changed from the producer's
   `.section-label` mono register to the producer's `Label`) is a **glass BH-inbox ask, stated and
   not taken** — mail paths are in no W4 §4 row (b.8 #4). `GradientVisualizer.vue:232`'s
   `section-label` over a `<Slider>` survives for the same reason (§3 Scope 4 scopes unit b to
   Selects).
9. **`prettier --check demo e2e` RED over 202 files** → **X-W11**'s hygiene walk.
10. **The library `npm run typecheck` TS2459** → the owner of `c8848bed` (K.5).
11. **The ~3.3 % client-rect inflation inside the pane-enter spring** is now measured on both sides
    (K.3) and is the mechanism behind LW-4; any later seat reading geometry on a freshly-entered
    pane inherits it.

### K.8 Escalations carried out by the units — 3 returned, all UNDISCHARGED

| id | §3a trigger | subject | state |
|---|---|---|---|
| **ESC-a.7** | file bounds | `demo/shell/dock/ColorInput.vue:67-81` — a **live nameless** `send-btn` seat (24×24, so it passes A1/A2; the defect is the NAME). Artefact 7's premise measured **FALSE** — MT-F005's button is not dead. Invisible to both gate projects because the seat sits inside a `PopoverTrigger` unmounted at those viewports | **OPEN** — a dated E-3 bounds addendum is the recommended home; the orchestrator decides. Zero bytes written |
| **ESC-b.7** | file bounds | `walk.spec.ts:89` · `o20-generate-plate.spec.ts:71` (= LW-1/LW-2) | **OPEN** — two-line repair named |
| **ESC-b.8** | file bounds | `AuroraPane.vue:122,142,156,170` — four Select triggers carrying the exact defect B1/B2 cured | **OPEN** — home stated, not taken |
| **ESC-c.7** | file bounds | `o27-focus-affordance.spec.ts:126-129` (= LW-3) | **OPEN** — one-line repair named |

§3a's **hard-gate triggers did NOT fire**: A1/A2 turned green from a consumer (no producer box was
unreachable), `LabeledField` hosted the trigger at 7.0.0 (B1), the rail took focus without breaking
the pointer-add gesture (C1, proved by the pointer case beside the keyboard one), and one
`SceneActionSet` expressed the Picker's edit arm without an escape hatch (D1). Unit d returned
**zero** escalations.

### K.9 E13 close sweep — 0 UNREAD in X-W4's scope

Four paths re-swept read-only at this seat's own clock (**2026-09-19 03:21 EDT**), delta against
unit d's 03:14:58 sweep, classification taken from each row's **Status cell**, never from a bare
`grep -i unread`; `INBOX.md` **self-excluded** (SELF-COUNT law; ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+ \|'`
→ **74** rows).

```text
⟨cmd⟩ /usr/bin/find <each of the four paths> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 03:15"
   docs/tranches/V/ + V/coordination/            → (nothing)
   ../glass-ui/docs/tranches/BK/coordination/    → (nothing)   [BK re-confirmed newest: BK · BJ · BI]
   ../keyframes.js/docs/tranches/V/coordination/ → (nothing)
   ../sci-report/atlas/docs/tranches/P/…         → (nothing)
```

**0 new letters · 0 unrowed value.js-addressed letters · 0 new `I-n` minted here.** The five rows
whose Status cells read UNREAD — **O-20 · I-30 · I-31 · I-32 · I-35** — each route by their own
Routing cell away from this wave (the X formation mail seat / X-W0.j / X-EXT-1..6 / X·KF); the one
whose receiving cell is inside X-W4 is **X-EXT-1 → `X.W4.g`**, which the census FAIL keeps **CLOSED**.
**No wave closes with UNREAD mail in scope, and none is in scope.**

### K.10 The four-verb line — deliberately NOT moved

`W4.md` §1's table keeps its authored bytes: AUDITED **YES** · SPECIFIED **YES** · IMPLEMENTED
**NO** · VERIFIED **NO**. Two independent reasons, either sufficient:

1. **This seat has no write on `W4.md`.** §4 grants the close seat no row on the spec (contrast
   `W3.md` §4's explicit close-seat grant, exercised at `493791d6`). Writing it would be a bounds
   ESCALATION, and §9's row-8 *"status flip"* cannot license a write the file-bounds table withholds.
2. **The substance does not support it.** §6's Hard Gate is **not fully met** — C4 is RED at this
   seat's clock — and the wave leaves four HARD-CI rows RED (K.6). The precedent is X-W2's close
   (`91dc6e56`): *"PARTIAL … Hard Gate NOT MET, IMPLEMENTED deliberately unstamped"*.

`VERIFIED` is likewise untouched: no row stamps it but the spec's own designated seat, and `W4.md`
designates none. **§12's L-18 rider — two quartet challenge passes adjudicated by a fresh Fable —
stands UNSERVED**; it is downstream of IMPLEMENTED and is recorded here so no later reading calls it
forgotten.

### K.11 Status — **PARTIAL**

**15 of 16 gates GREEN** at an independent seat's own clock, every one double-run against the
settled bytes: **A1 A2 A3 A4 A5 · B1 B2 B3 · C1 C2 C3 · D1 D2 D3 D4**. **One RED: C4**, on its
`clippers == []` arm only, non-deterministically (3 of 4 runs), with the mechanism measured on both
sides and the repair named (K.3). `X.W4.g` never opened and its bank is intact.

**What remains, in one line each**: C4's clip arm settled (LW-4, in bounds) · the two stale
`"Generation preset"` bindings (LW-1/LW-2, ESC-b.7) · o27 BR-3's face read (LW-3, ESC-c.7) ·
`ColorInput.vue`'s nameless seat (ESC-a.7) · `AuroraPane.vue`'s four triggers (ESC-b.8). **Zero
bounds were widened, zero gates narrowed, zero assertions relaxed, and this seat wrote no product
byte.**

---

## Check 1 — L-20 fresh adversarial pass 1 (VERIFY-ONLY)

**SERVED MODEL: claude-opus-5[1m]** · a fresh adversarial L-20 pass-1 seat that **authored no byte
of this wave** — no unit cure, no unit receipt, no `## Close`, no LEDGER row cell. Track A · wave
**X-W4**. Sitting date of record **2026-09-17** (the owner's begin-word). Wall clock at this seat
`2026-09-19 03:47:06 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`. **HEAD at entry** `fe50cc51`
⟨cmd⟩ `git log --oneline -1` · branch `tranche-u`.

**CRASH-RECOVERY first.** ⟨cmd⟩ `git status --porcelain` → **4 rows**, and **not one is in this
seat's writable set** (`docs/tranches/X/execution/A/X-W4.md` + `execution/LEDGER.md`):
`M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's) · `M scripts/dev/dev.sh` (unowned,
DR-24 — never opened, never staged) · `?? docs/tranches/X/fourier/conformance/…` and
`?? docs/tranches/X/keyframes/evidence/W11/…` (Track C and Track B seats'). **No inherited work
existed inside this seat's set**, so the obligation discharges as an absence: nothing stashed,
reset, restored or adopted. This seat **cured nothing** and wrote **no product byte**.

### CK.1 — every claimed GREEN re-run at this seat's own clock: **15 of 15 reproduce**

Commands verbatim, each at least double-run, against the settled committed bytes:

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-control-targets.spec.ts e2e/smoke/a11y-select-title.spec.ts e2e/smoke/a11y-gradient-stop-grammar.spec.ts e2e/smoke/scene-action-contract.spec.ts
   run 1 → 21 passed, EXIT 0        run 2 → 21 passed, EXIT 0
⟨cmd⟩ npx playwright test --project=smoke-mobile e2e/smoke/mobile/a11y-control-targets.spec.ts
   run 1 → 3 passed, EXIT 0         run 2 → 3 passed, EXIT 0
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit                                        → EXIT 0, 0 lines
⟨cmd⟩ npx eslint demo/color-picker/App.vue demo/shell/usePaneRouter.ts demo/shell/dock/ → EXIT 0
⟨cmd⟩ npx eslint demo e2e                                                               → EXIT 0
```

Source counts, **double-run**, both runs identical:
`h-7 = 3` · `h-9 = 7` · `watercolor-dot = 11` · `--slider-range-origin = 0` ·
`export interface ActionBarContext|DockActionBar = 0` · `?.() in usePaneRouter.ts = 2` (both prose,
`:135`, `:292`) · `on-mount in App.vue = 3` · `find scripts -name "proof-*.mjs" = 0`.

| gate | this seat's reading | verdict |
|---|---|---|
| **A1** | `[W4-A1] undersized=0`, runs 1 and 2 | **GREEN — reproduces** |
| **A2** | `[W4-A2] undersized=0`, two `smoke-mobile` runs | **GREEN — reproduces** |
| **A3** | `[W4-A3] measured=4 mismatches=0` · `[W4-A3-COARSE] measured=0 mismatches=0 unlifted=0`; source `h-7` → **3** | **GREEN — reproduces** (coarse arm vacuous, CK.6 #6) |
| **A4** | `[W4-A4] nameless=0` · `[W4-A4-COARSE] nameless=0` | **GREEN — reproduces** |
| **A5** | `a-falsifier.txt` on disk, `SERVED MODEL`-headed, pinned run `→ EXIT 1 (non-zero, as the gate requires)` with `undersized=5`, reverted run `undersized=2`, delta 2 named row by row | **DEMONSTRATED — reproduces** |
| **B1** | `[W4-B1] asserted=7 excluded=1 defects=0`, both runs; every in-scope row `ariaLabel=null` + `labelledBy=v-1-N-label` + rendered `titleText` + `titleBoxInsideField=true` | **GREEN — reproduces** |
| **B2** | `[W4-B2] asserted=7 defects=0`; rows read `blockSize=36 tokenSm=36` | **GREEN — reproduces** |
| **B3** | `[W4-B3] producerSliderVars=15 declaredInternal=3 consumerReads=0`; `--slider-range-origin` → 0; ⟨cmd⟩ `git merge-base --is-ancestor ea0fdca8 58371516` → **exit 0** (the receipt IS an ancestor of the cure) | **GREEN — reproduces** |
| **C1** | `[W4-C1] caretLeft=252 mintedLeft=252 inline="calc(55% - 1px)"` · `pointerEventsDuringKeyboardJourney=0` | **GREEN — reproduces** |
| **C2** | 3 of 3 handles `role=slider min=0 max=100 now=0\|50.2\|100`, `text="Position N%"`, `name="Gradient stop N of 3"` | **GREEN — reproduces** |
| **C3** | `[W4-C3] home=10 end=450 unit=4.4000px/%` · `defects=0` | **GREEN — reproduces** |
| **C4** | **RED — see CK.2** | **RED** |
| **D1** | `vue-tsc` EXIT 0 · ⟨cmd⟩ `grep -rn "export interface ActionBarContext\|export interface DockActionBar" demo` → **0** · `SceneActionSet` sole contract at `keys.ts:184` · the spec's 10 tests pass twice | **GREEN — reproduces** |
| **D2** | scoped eslint EXIT 0 and `npx eslint demo e2e` EXIT 0 with the rule `"error"` at `eslint.config.js:332`; `?.()` → 2 prose hits; **and see CK.6 #4** | **GREEN — reproduces, with a scope qualifier** |
| **D3** | `d-falsifier.txt` on disk: TS2820 + TS2345 at **EXIT 2**, revert **EXIT 0**, both pasted verbatim | **DEMONSTRATED — reproduces** |
| **D4** | the 10 contract tests pass in both runs, including the 390×844 `unavailable` + `disabled` + `aria-disabled` + `role="status"` arms; `grep -c "on-mount" App.vue` → **3**, unchanged | **GREEN — reproduces** |
| **G1–G4** | ⟨cmd⟩ `grep -rn 'watercolor-dot' demo \| wc -l` → **11**, bank intact | **NOT OPENED — correct** (X-W0.j census FAIL 1/4) |

### CK.2 — C4 adjudicated: the RED **reproduces**, and it has **NO relief**

Run in isolation, as the close ran it, **three times** at this seat's clock:

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-gradient-stop-grammar.spec.ts -g "C4"
   run 1 → 1 failed / 1 passed, EXIT 1
   run 2 → 1 failed / 1 passed, EXIT 1
   run 3 → 1 failed / 1 passed, EXIT 1
   all three, byte-identical:
   [W4-C4-FINE] [{"w":24.8,"h":24.8,"hitW":24,"hitH":24,"faceW":20.7,"faceH":20.7,"rootFontSize":16} ×2]
   clippers=["div.app-layout [contain=none overflow=hidden/hidden clip-path=none]"]
   Error: ancestors whose paint clip cuts the focus ring off — Expected -1 / Received +3
```

**Five readings at this seat: 3 RED (isolated) · 2 GREEN (inside the four-spec batch).** The close's
own split (3 of 4 RED) and its mechanism (the ~3.3 % client-rect inflation inside the pane-enter
spring's settle window — `24.8 = 24 × 1.0333`, `20.7 = 20 × 1.035`, `rootFontSize` **16** in both
states) **reproduce exactly**. The close's characterisation is confirmed: it is an
instrument-stability defect in the gate's own geometry/clip read, not a product regression — the
ring still paints (`focusVisible=true`, `1px` + `3px`), the seat is still ≥24, the hit region still
24/44, the face still 20.

**The relief test, run at the spec's own bytes — and it returns NONE:**

| relief the check admits | applies to C4? | at which bytes |
|---|---|---|
| **producer-owned** (green only upstream; a consumer patch would be a gate failure) | **NO** | the failing subject is the consumer's own `div.app-layout` paint clip, read by the consumer's own spec; `node_modules/@mkbabb/glass-ui/**` is nowhere in the failing arm |
| **owned by a later wave by the spec's own routing** | **NO** | ⟨cmd⟩ `grep -n "C4" docs/tranches/X/waves/W4.md` routes C4 nowhere; §3 "Not in scope" hands X-W6 the **§7 recomposition** and X-W5 the **mount**, neither of which is this arm. The close itself states it: *"**LW-4 is in bounds** (unit c's own spec) and is **this wave's to repair**"* |
| **an honest-RED the spec names by id** | **NO** | `W4.md` §6 names exactly three non-RED-by-design gates — **A5**, **D3** (one-time falsifier demonstrations) and **B3** (a recorded re-test + regression fence). C4 is none of them; it is one of the **13 born-RED** rows the wave exists to turn |

`W4.md:399` authored the clipping arm deliberately (*"Fails on size, on a missing ring, and on a ring
that exists but is clipped — the clipping arm is why the assertion reads the painted box, not the CSS
declaration"*) and §3 Scope 6 orders *"a visible, unclipped focus ring"*. **The §6 Hard Gate is
therefore NOT MET**, and `e2e-smoke` is a HARD CI job (CC-031, this wave's own named dependency), so
the branch reds intermittently on it. **The honest-RED set for this wave is EMPTY.**

### CK.3 — bounds, E-3 and commit families: **CLEAN**

- **Union bounds re-proven independently** over all 25 commits ⟨cmd⟩
  `for c in …; do git show --pretty=format: --name-only $c; done | sort -u | wc -l` → **70 paths**,
  **39** under `docs/tranches/X/waves/evidence/W4/` and **31** exactly the 22 `demo/**` §4 rows +
  `eslint.config.js` + the 6 `e2e/**` §4 rows + this record + `execution/LEDGER.md`. ⟨cmd⟩
  `grep -cE "^(src/|api/|test/|node_modules/|\.github/|scripts/|demo/shell/PaneSlot\.vue|demo/ui/|demo/shell/viewSchema\.ts)"`
  over the union → **0**. `scripts/dev/dev.sh` is **not** in the union and is still dirty-and-untouched
  at this seat's porcelain. `ComponentSliders.vue` and `demo/styles/utils.css` took zero bytes —
  permitted, not required.
- **E-3 held at the bytes**: ⟨cmd⟩ `git log --oneline 4cedfdb5^..HEAD -- docs/tranches/X/waves/W4.md`
  → *(empty)* — the dated spec is **byte-untouched**; ⟨cmd⟩ the same over
  `docs/tranches/V/megatranche/registry/adjudicated/` → *(empty)*. No conformance artefact and no
  sibling spec appears in the union.
- **Commit families**: §9 row 1 `8934de85` · row 2 `cf5409e7` · row 3 `58371516` · row 4 `ea0fdca8`
  (**ancestor of row 3**, measured) · row 5 `666978d4` (cure **+** the two bindings it invalidated, ONE
  commit) · row 6 `e64002e9` (the collapse **+** MP-3's guard **+** AB-32, ONE commit) · row 7
  **correctly omitted** (census FAIL) · row 8 `e2bc291c`. **No declared family is split**, and each of
  the 25 `git show --stat`s returns exactly its own paths — no sibling seat's staged row was swept in.
- **Born-RED ancestry**, measured per unit: b `c18de089`→`58371516` ✓ · c `96936340`→`666978d4` ✓ ·
  d `5406a111`→`e64002e9` ✓ · **a: the reverse** — see CK.6 #5.

### CK.4 — masking scan: **NONE FOUND**

⟨cmd⟩ over the whole wave diff (`4cedfdb5^..HEAD -- demo/ e2e/ eslint.config.js`) for
`test.skip|.fixme|.only|eslint-disable|@ts-ignore|@ts-expect-error|allowlist` → the **one** hit is a
comment in a gate spec saying the census is built *"never from a hand-fitted element allowlist"*.
⟨cmd⟩ `grep -rnE "as unknown as|as any|@ts-|eslint-disable"` over the seven action-path files and
`GradientStopEditor.vue` → **NONE**. The **one** added `try {` (`usePaneRouter.ts:327`) is the
contract's `failed` arm: it `record()`s the throw into state that `GenericActionBar.vue:149-150`
**renders** through `role="alert"` with the seat left operable — a surfacing seam, the opposite of a
swallow. No producer selector was copied into consumer CSS; the `[data-slot="…"]` and `.glass-dock`
strings are **test locators** on the producer's published stamps, and unit c is on record refusing the
one attribution stamp that would have been a copy. No `node_modules` byte moved.

### CK.5 — E13 mail: **0 UNREAD in scope**

⟨cmd⟩ `grep -nE '^\| [IO]-[0-9]+ \|' docs/tranches/V/coordination/INBOX.md | grep -i unread` →
**5 rows**: **O-20 · I-30 · I-31 · I-32 · I-35**. Each Routing cell read at the bytes: I-30 → X-W0.j's
widened census + the §EXTERNAL fold · I-31 → *"no X wave is minted"*, X-W0's close marks it FOLDED ·
I-32 → *"the X formation mail seat / X-W0.j … X-EXT-1..6"* · I-35 → *"**Routing: X·KF (Track B), NOT
X-W1**"* · O-20 → the outbound batch itself. ⟨cmd⟩ `grep -oE "X-W4[^ ]*|X\.W4[^ ]*"` across the five
rows → the **only** X-W4 token is **`X-W4.g's`** inside I-35's routing prose, and `X.W4.g` is CLOSED
by X-W0.j's dated census FAIL. **No row lands on units a–d.**

### CK.6 — Defect register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **1** | **HIGH** | **C4 is RED at the bytes with no relief in any category the spec admits, so `W4.md` §6's Hard Gate is NOT MET and the HARD `e2e-smoke` job reds intermittently on this branch.** The failing arm is `clippers == []` in an **in-bounds** §4 `create` row, with the repair already named and **not taken** | three isolated runs at this seat's clock, all RED, byte-identical (`w=24.8 h=24.8 faceW=20.7 rootFontSize=16`, `clippers=["div.app-layout …"]`); the close's own 3-of-4 split reproduced; relief table in CK.2 returns NONE | settle the transform before the geometry **and** clip read in `e2e/smoke/a11y-gradient-stop-grammar.spec.ts:461-532` — an `expect.poll` on a stable rect, or await the pane's `transitionend` — exactly as `cf108ec6` already polls the ring; re-run 4× and re-check. **Not one product byte and not one assertion changes** |
| **2** | MEDIUM (mitigated: escalated in bounds-law, owners named, repairs stated to the byte) | three HARD-CI rows land RED **caused by this wave's own spec-ordered cures** and are undischarged: `walk.spec.ts:89` and `o20-generate-plate.spec.ts:71` (the retired `"Generation preset"` literal `aria-label`) and `o27-focus-affordance.spec.ts:126-129` (BR-3 reading the 24 px seat) | ⟨cmd⟩ `npx playwright test --project=smoke e2e/smoke/walk.spec.ts e2e/smoke/oracles/o20-generate-plate.spec.ts e2e/smoke/oracles/o27-focus-affordance.spec.ts` → **4 failed · 5 passed**, the fourth (`o27:323` forced-colors) proved PRE-EXISTING by the units' own pre-cure control runs. ⟨cmd⟩ `grep -c "walk.spec\|o20-generate-plate\|o27" docs/tranches/X/waves/W4.md` → **0** | the orchestrator lands the three named one/two-line re-anchors (`{ name: "Preset", exact: true }` ×2; `el.querySelector(".rail-handle-face")`) under a dated E-3 bounds addendum. Padding product copy to fit a stale selector stays forbidden |
| **3** | MEDIUM (mitigated: measured, escalated as ESC-a.7, zero bytes written) | **§2's goal criterion is not met at the bytes**: two live, operable, **nameless** seats survive in the persistent shell — `demo/shell/dock/ColorInput.vue:66-81`, icon-only `<button class="send-btn btn-interactive">` under `v-if="proposeMode"` / `v-else`, no `aria-label`, no text child | read at the bytes at this seat; the wave's own `navprobe.mjs` re-run measured the same and overturned artefact 7's premise. ⟨cmd⟩ `grep -c 'ColorInput' docs/tranches/X/waves/W4.md` → **0** — invisible to both gate projects because the seat sits inside a `PopoverTrigger` unmounted at those viewports | a dated E-3 bounds addendum admitting `ColorInput.vue` to a W4-successor's §4, or an explicit route to the wave that owns the dock's input band; the cure itself is one `aria-label` per seat |
| **4** | MINOR (mitigated: `ColorInput.vue` is in **no** §4 row, so arming the literal glob would make D2 unfixable in bounds; the close does state the armed list is seven files) | **D2's armed scope is narrower than D2's own command.** The gate command's third leg is `demo/shell/dock/**`; the config arms the rule over **7 named files**, and two files inside that glob carry a type-level `any` the run therefore cannot see | ⟨cmd⟩ `grep -rnE "\bany\b" demo/shell/dock …` → `ColorInput.vue:242` and `layers/SlugEditLayer.vue:57`, both `catch (e: any)`; ⟨cmd⟩ `git show 6dde42ad:…` → **both pre-exist the wave**. `eslint.config.js:305-333` names only the `ColorPicker.vue` subtraction | name the two exclusions in the config comment and in a dated addendum-beside; `SlugEditLayer.vue` (unit a's file, in bounds for a successor) takes `catch (e: unknown)`, and `ColorInput.vue` rides defect 3's addendum |
| **5** | MINOR (mitigated: §9 itself orders row 1 = cure, row 2 = specs for unit a, so the **landing** conforms; the born-RED baseline was taken pre-byte in `reopen-baseline.json`, and A5 independently proves the gate bites) | **K.1's sentence *"each unit's gate spec landed before its product bytes"* is false for unit a** | ⟨cmd⟩ `git merge-base --is-ancestor 8934de85 cf5409e7` → **exit 0**: the cure is an **ancestor** of the two gate specs; the reverse test returns non-zero | correct the sentence in a dated addendum-beside (E-3: the Close's bytes are not rewritten) |
| **6** | MINOR (mitigated: the coarse lift is measured elsewhere — A2's census reads the slug field 160×44, the three dock seats 44×44 and the rail letters 31.7×44; b.3 measured the trigger's 36→54 in a real Pixel-7 context) | **A3's coarse arm is vacuous.** `[W4-A3-COARSE] measured=0` at `smoke-mobile` in both of this seat's runs, so A3's second declared failure mode (*"the coarse lift is absent"*) is never exercised — yet K.2 records A3 GREEN "at both projects" without the qualifier a.3 carried (*"GREEN (empty population, recorded)"*) | the two `smoke-mobile` runs above | carry a.3's own qualifier into the close's table by dated addendum; a successor that probes an admin route gives A3 a non-empty coarse population |
| **7** | INFO | K.4's *"30 PNGs"* counts **two untracked strays** — `action-bar-mix-390.png` and `action-bar-mix-desktop.png` — which `.gitignore:34` hides from `git status`, so they are in no commit | ⟨cmd⟩ `ls …/evidence/W4/*.png \| wc -l` → **30** · ⟨cmd⟩ `git ls-files … \| grep -c '\.png$'` → **28**; every §8-required pair is among the 28 | force-add the two or delete them; the artefact requirement is already met by the 28 |

**Superlatives, recorded because they are real.** The identical `rail-letters-{fine,coarse}-{before,after}.png`
pairs — the obvious place to find a faked before/after — are **disclosed and derived** in
`a-screens.md` (*"hit areas grow, glyphs do NOT … a byte-identical pair is precisely what honouring it
looks like"*), with the measured boxes carrying the row instead. The A3 premise was measured **FALSE**
and published against the wave's own interest (`h-7` was inert; the cure is a real 36→28 / 54→44
shrink). Unit d found and cured a **live `/#/mix` crash** in inherited work rather than adopting the
predecessor's claim. Unit c refused the producer attribution stamp that would have been a copied
selector. Every collateral RED in this wave was separated from a pre-existing one by an actual
**pre-cure control run**, never by assertion.

### CK.7 — the four-verb line, and the successors

**The line was NOT moved, and that is lawful.** `W4.md` §4 grants the close seat **no** row on the
spec (contrast `W3.md` §4's explicit close-seat grant), so writing it would be a §3a bounds
escalation; and §6's Hard Gate is not met (CK.2), so `IMPLEMENTED` is unsupported on the substance
too. `VERIFIED` is likewise untouched. §12's L-18 two-quartet challenge stands **UNSERVED**, which is
correct while the wave is pre-IMPLEMENTED.

**Successor conjuncts, measured:**

| successor | its `Opens after` conjunct on X-W4 | state |
|---|---|---|
| **X-W5** | *"X-W4 (the typed `SceneActionSet` contract, CC-043)"* · X-W2 · X-W0's CC-012 act | the X-W4 **clause** is **GREEN at the bytes** — one exported contract, 0 rival contracts, 0 `any` on the action path, `vue-tsc` EXIT 0, D1–D4 reproduce. X-W2 `CLOSED`, X-W0 `CLOSED`. On the **letter**, X-W4's ledger row stays `PARTIAL`, so **X-W5 is lawfully blocked on the letter and open on the clause** — the same divergence X-W4's own §1.1 recorded about X-W1, and the orchestrator's to rule |
| **X-W6** | *"Opens after: X-W5"* | blocked on X-W5 regardless of this wave |
| **X-W7** | X-W3 (`CLOSED`) · X-W4 (typed `SceneActionSet`) · **X-W6** (`planned`) · X-W1 (`CLOSED`) | blocked on **X-W6**, independently of X-W4 |
| **X-W8** | `W4·W5·W6·W7` | blocked on W5/W6/W7, independently of X-W4 |

**No successor is blocked by anything this check found except the letter of X-W4's own row.**

### CK.8 — Verdict: **NOT-CONFORMANT**

**1 HIGH · 2 MEDIUM · 3 MINOR · 1 INFO.** Every one of the close's **15** claimed GREEN reproduces at
this seat's own clock, double-run, against the settled bytes; bounds are clean over 70 paths; E-3
holds at the bytes; no masking move exists anywhere in the diff; no declared commit family is split;
mail is clean. **The wave fails the bar on one thing and one thing only: C4 is RED, reproducibly, and
no category of relief the check admits covers it** — it is neither producer-owned, nor routed to a
successor by the spec, nor an honest-RED `W4.md` names by id, and the close itself books it as *"this
wave's to repair"*. **The honest-RED set is EMPTY.** The row therefore **stays `PARTIAL`** and is not
promoted; it becomes promotable the moment C4's geometry-and-clip read is settled the way its own
ring arm already is, with no assertion and no product byte changed.

## Repair 1 — Check 1's register, cured in bounds

**SERVED MODEL: claude-opus-5[1m]** · the REPAIR SEAT (round 1) of Track A wave **X-W4**. Sitting
date of record **2026-09-17** (the owner's begin-word); wall clock at this seat
`2026-09-19 04:18:10 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`. **HEAD at entry** `f15477a8`
(Check 1's own commit) · branch `tranche-u`. E-3: **nothing above this line is rewritten** — every
correction below is a dated addendum-beside.

**CRASH-RECOVERY first.** ⟨cmd⟩ `git status --porcelain` at entry → `M docs/tranches/V/reformation/CARRY-LEDGER.md`
(a sibling's) · `M scripts/dev/dev.sh` (unowned, DR-24 — never opened, never staged). **Not one row
inside this seat's writable set** (the wave's §4 File Bounds + this record + `execution/LEDGER.md`),
so the obligation discharges as an absence: **no inherited hunk existed**, nothing was stashed,
reset or restored. Two further dirty rows appeared mid-seat (`docs/tranches/X/fourier/conformance/…`)
— Track C's, untouched. Every commit below carries its own pathspec.

### R.1 — defect 1 (**HIGH**, C4 / LW-4): **CURED**, and the mechanism corrected at the bytes

**Cure** (`5bd44d76`, `e2e/smoke/a11y-gradient-stop-grammar.spec.ts`, +99 lines, **additions only**):
a `transformRest()` helper, called twice inside the C4 fine test — once before the geometry read,
once after the Tab journey and before the clip walk — exactly the two reads Check 1 named. It asks
the **animation timeline**, not the clock: every **finite** animation on the handle's own ancestor
chain must have left `running`/`pending`, and the client rect must then repeat across two animation
frames. An infinite decorative loop (aurora, shimmer) is excluded by its **infinite duration**, never
by name; a **permanent resting transform** is not an animation, so this instrument does not inherit
`paneSettled`'s documented timeout on one — which is why `settle()`'s author refused `paneSettled`
and why neither instrument alone could see this defect.

**The mechanism, corrected against BOTH predecessors (dated addendum-beside).** The close (K.3) and
Check 1 (CK.2) read the inflation as *"the ~3.3 % client-rect inflation inside the pane-enter
spring's overshoot"* (`scale(0.97)` start → overshoot). Measured at this seat, it is a **2° ROTATION**,
not a scale overshoot:

```text
⟨cmd⟩ npx playwright test --project=smoke … -g "PROBE"   (temporary probe, reverted; evidence banked)
[PROBE-MIDFLIGHT] {"w":24.82,"h":24.82,"x":-426.3,"live":["div:transform@pending"],
                   "paneTransform":"matrix(0.999391, -0.0348995, 0.0348995, 0.999391, -563.2, 0)"}
[W4-C4-SETTLE]    probe inFlightAtEntry=["div:transform@pending:0ms"]
[PROBE-ATREST]    {"w":24,"h":24,"x":144,"hitW":24,"faceW":20}
```

`matrix(0.999391, -0.0348995, …)` **is** `rotate(-2deg)` (cos2° = 0.999391, sin2° = 0.0348995), the
pane still **563.2px** off-station — `demo/styles/animations.css:231-236`'s
`translateX(±110%) rotate(∓2deg)`. A 2° rotation inflates an axis-aligned rect by
**cos2° + sin2° = 1.03429**: `24 × 1.03429 = 24.82` and `20 × 1.03429 = 20.69` → the close's and
Check 1's `w=24.8`, `faceW=20.7`, **to the digit**. The arithmetic both predecessors published is
right; the cause is the rotate limb, not a scale overshoot — recorded because a wrong mechanism
would have sent a successor to the wrong CSS. And the transition is **`pending` at `currentTime 0ms`**:
the STALL `e2e/smoke/fixtures/dock.ts:paneSettled` documents (*"can STALL at currentTime = 0 for ~1s"*).
That is precisely why the file's own `settle()` could return inside it — four identical 250ms
geometry signatures are **exactly what a stalled animation produces**, so a geometry-only settle can
never be the instrument here.

**Falsifier pair** (the A5 / D3 idiom, since a wait that never waits is decorative):
`docs/tranches/X/waves/evidence/W4/c4-settle-falsifier.txt` — the probe forces the exact state, the
helper is shown detecting it (`div:transform@pending:0ms`) and resolving it (24.82 → 24). The probe
was reverted: ⟨cmd⟩ `grep -c PROBE e2e/smoke/a11y-gradient-stop-grammar.spec.ts` → **0**.

**Gate re-reading, at the settled bytes, every figure double-run or better:**

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-gradient-stop-grammar.spec.ts -g "C4"
   run a → 2 passed, EXIT 0    run b → 2 passed, EXIT 0
   run c → 2 passed, EXIT 0    run d → 2 passed, EXIT 0      (4 of 4; Check 1 read 3 of 3 RED here)
   every run: [W4-C4-FINE] w=24 h=24 hitW=24 hitH=24 faceW=20 faceH=20 rootFontSize=16 (×2 handles)
              [W4-C4-RING] spread=3 focusVisible=true clippers=[]   ← the arm that was RED
              [W4-C4-COARSE] w=24 h=24 hitW=44 hitH=44 (×2 handles)
⟨cmd⟩ npx playwright test --project=smoke <the four W4 gate specs>   → 21 passed EXIT 0, twice
```

**Honest limit, stated rather than smoothed**: the wild RED state did **not** reproduce at this
seat's clock before the cure — six runs at the settled bytes all entered with
`inFlightAtEntry=[]` or only the `html:--saved-bg*` custom-property transitions, never the pane
transform (the vite optimize cache is warm on this host, and the stall is a cold-transform-burst
event). The cure is therefore proven **against a deliberately induced instance of the exact state**
(the probe above) rather than against a lucky wild one, and Check 1's three byte-identical RED runs
stand as the control. Clearing the shared vite cache to force a cold boot was **refused**: three
sibling tracks share this checkout and a cache wipe mid-run is a sibling's broken run.

### R.2 — defect 4 (MINOR, D2's armed scope): **CURED** in bounds

**Cure** (`4f567837`): `demo/shell/dock/layers/SlugEditLayer.vue:57` — a **§4 row of this wave** —
takes `catch (e: unknown)` with the sibling's own narrowing (`useSlugMigration.ts:85-88`: an `Error`
carries the message, anything else carries none), so the last **curable-in-bounds** `any` inside D2's
`demo/shell/dock/**` glob is gone; and `eslint.config.js` now **states the scope where it is armed**,
naming both glob residents beside the existing `ColorPicker.vue` subtraction.

⟨cmd⟩ `grep -rn "catch (e: any)" demo/shell/dock | wc -l` → **1**, double-run (was 2):
`demo/shell/dock/ColorInput.vue:242` — in **no** W4 §4 row (⟨cmd⟩ `grep -c 'ColorInput' docs/tranches/X/waves/W4.md`
→ **0**), so arming the literal glob would make D2 **unfixable in bounds**. It is **named in the
config and escalated** (R.5), never silently globbed away and never padded. Re-read:
⟨cmd⟩ `npx eslint demo/color-picker/App.vue demo/shell/usePaneRouter.ts demo/shell/dock/` → **EXIT 0** ·
⟨cmd⟩ `npx eslint demo e2e` → **EXIT 0** · ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT 0**,
double-run · ⟨cmd⟩ `npx tsc -p tsconfig.e2e.json --noEmit` → **EXIT 0**.

### R.3 — defect 7 (INFO, the two PNG strays): **CURED**

`.gitignore:34` (`*.png`) hid `action-bar-mix-390.png` and `action-bar-mix-desktop.png` from
`git status`, so K.4 counted 30 on disk against 28 in commits. **Force-added, not deleted** —
evidence is kept, not trimmed to make a count true (`e112fc4f`). ⟨cmd⟩
`git ls-files docs/tranches/X/waves/evidence/W4/ | grep -c png` → **30** = ⟨cmd⟩
`ls docs/tranches/X/waves/evidence/W4/*.png | wc -l` → **30**.

### R.4 — defects 5 and 6 (MINOR, prose corrections): **the dated addenda, here**

- **Defect 5.** K.1's sentence *"each unit's gate spec landed before its product bytes"* is **FALSE
  for unit a** and is corrected here, not rewritten there: unit a's cure `8934de85` is an **ancestor**
  of its gate pair `cf5409e7` ⟨cmd⟩ `git merge-base --is-ancestor 8934de85 cf5409e7` → **exit 0**;
  the reverse returns non-zero. The **landing** still conforms — §9 itself orders row 1 = cure,
  row 2 = unit a's specs — and unit a's born-RED baseline was taken pre-byte in `reopen-baseline.json`,
  with A5 independently proving the gate bites. The sentence, not the work, was wrong.
- **Defect 6.** K.2's A3 row reads GREEN *"at both projects"* without the qualifier a.3 carried.
  Corrected here: **A3's coarse arm is VACUOUS** — ⟨cmd⟩ `npx playwright test --project=smoke-mobile e2e/smoke/mobile/a11y-control-targets.spec.ts`
  → `[W4-A3-COARSE] measured=0 mismatches=0 unlifted=0` in **3 of 3** runs at this seat, so A3's
  second declared failure mode (*"the coarse lift is absent"*) is never exercised at `smoke-mobile`.
  A3 is GREEN **on a non-empty fine population (measured=4, mismatches=0) and an EMPTY coarse one**;
  the coarse lift itself is measured elsewhere (A2's census: slug field 160×44, three dock seats
  44×44, rail letters 31.7×44; b.3's trigger 36→54). A successor that probes an admin route gives
  A3 a non-empty coarse population — it is not this wave's to invent.

### R.5 — ESCALATIONS: defects 2 and 3 (both **MEDIUM**), both out of bounds

Neither has an in-bounds cure; both are returned with a measured reason, unwidened and unmasked.

| # | what | measured reason it is not cured here |
|---|---|---|
| **ESC-R1** (defect 2) | three HARD-CI rows RED from this wave's own spec-ordered cures: `walk.spec.ts:17/89` · `oracles/o20-generate-plate.spec.ts:60/71` (the retired `"Generation preset"` literal) · `oracles/o27-focus-affordance.spec.ts:103/126-129` (BR-3 reading the 24px seat, `Expected < 22 · Received 24`) | ⟨cmd⟩ `grep -c "walk.spec\|o20-generate-plate\|o27" docs/tranches/X/waves/W4.md` → **0** — all three paths are outside **every** §4 row, so writing them is a §3a bounds escalation, and padding product copy to fit a stale selector is forbidden. Re-measured at this seat ⟨cmd⟩ `npx playwright test --project=smoke <the three> ` → **4 failed · 5 passed**, the same split Check 1 read; the 4th (`o27:323` BR-1 forced-colors) was proved **PRE-EXISTING** by the units' own pre-cure control runs. **Repairs stated to the byte**: `{ name: "Preset", exact: true }` ×2 and `el.querySelector(".rail-handle-face")!.getBoundingClientRect()`. They need a dated **E-3 bounds addendum** admitting the three paths — an ORCHESTRATOR act on a dated spec this seat may not touch |
| **ESC-R2** (defect 3) | §2's goal criterion unmet at the bytes: two live, operable, **nameless** seats in the persistent shell — `demo/shell/dock/ColorInput.vue:67-81`, icon-only `<button class="send-btn btn-interactive">` under `v-if="proposeMode"` / `v-else`, **no `aria-label`, no text child** (re-read at the bytes at this seat) | ⟨cmd⟩ `grep -c 'ColorInput' docs/tranches/X/waves/W4.md` → **0** — the file is in no §4 row (this is ESC-a.7, re-raised, still un-homed). Invisible to both gate projects because the seats sit inside a `PopoverTrigger` unmounted at those viewports, so **A4 reads `nameless=0` honestly**. The cure is one `aria-label` per seat and needs a dated E-3 bounds addendum admitting `ColorInput.vue` to a W4-successor's §4, or an explicit route to the wave owning the dock input band. `ColorInput.vue:242`'s `catch (e: any)` (defect 4's residue) rides the same addendum |

### R.6 — full gate re-reading after the cures (every gate a cure could move, and the rest beside it)

| gate | this seat's reading, settled bytes | verdict |
|---|---|---|
| **A1 · A2 · A4** | `[W4-A1] undersized=0` ×2 · `[W4-A2] undersized=0` ×3 · `[W4-A4] nameless=0` / `[W4-A4-COARSE] nameless=0` ×3 | **GREEN** |
| **A3** | `[W4-A3] measured=4 mismatches=0` ×2 · `[W4-A3-COARSE] measured=0 …` (VACUOUS, R.4) | **GREEN, qualified** |
| **A5 · D3** | the two falsifier records on disk, untouched by this repair | **DEMONSTRATED** |
| **B1 · B2 · B3** | `asserted=7 excluded=1 defects=0` · `asserted=7 defects=0` · `producerSliderVars=15 declaredInternal=3 consumerReads=0` — each in both batch runs | **GREEN** |
| **C1 · C2 · C3** | `caretLeft=252 mintedLeft=252` + `pointerEventsDuringKeyboardJourney=0` · 3 handles `role=slider` w/ value triple + ordinal · `home=10 end=450 unit=4.4000px/% defects=0` | **GREEN** |
| **C4** | **`clippers=[]` · w=24 · faceW=20 · hit 24/44 — 4 isolated runs + 2 batch runs, 6 of 6** | **GREEN — the HIGH is cured** |
| **D1 · D2 · D4** | `vue-tsc` EXIT 0 ×2 · scoped eslint EXIT 0 · `npx eslint demo e2e` EXIT 0 · the 10 contract tests pass in both batch runs | **GREEN** |
| **G1–G4** | ⟨cmd⟩ `grep -rn 'watercolor-dot' demo \| wc -l` → **11**, bank untouched by this repair | **NOT OPENED — correct** |

**§7 cadence at this repair**: ⟨cmd⟩ `git diff --check -- demo e2e eslint.config.js` → **EXIT 0** ·
⟨cmd⟩ `npx prettier --check e2e/smoke/a11y-gradient-stop-grammar.spec.ts` → **clean** (it was clean at
`f15477a8` and it stays clean — ⟨cmd⟩ `git show HEAD:<path> | npx prettier --check --stdin-filepath`
run over all three touched files reads **CLEAN · RED · RED**, the two REDs pre-existing at HEAD).
For those two, ⟨cmd⟩ `npx prettier <file> | diff - <file>` lands **every** hunk outside this repair's
bytes (`eslint.config.js:246/272/289` vs this repair at `:318-331`; `SlugEditLayer.vue:33/84/119` vs
this repair at `:57`), so the repair introduces **no** new formatting debt and does not reformat a
file the wave already recorded as X-W11 hygiene.

### R.7 — bounds, E-3, masking, mail

- **Bounds.** Union of this repair's three commits ⟨cmd⟩ `for c in 5bd44d76 4f567837 e112fc4f; do git show --pretty=format: --name-only $c; done | sort -u`
  → **6 paths**: `e2e/smoke/a11y-gradient-stop-grammar.spec.ts` (§4 create) · `eslint.config.js` (§4
  modify) · `demo/shell/dock/layers/SlugEditLayer.vue` (§4 modify) · three under
  `docs/tranches/X/waves/evidence/W4/` (§8's artefact home). ⟨cmd⟩ the same union
  `| grep -cE "^(src/|api/|test/|node_modules/|\.github/|scripts/|demo/shell/PaneSlot\.vue|demo/ui/|demo/shell/viewSchema\.ts)"`
  → **0**. `scripts/dev/dev.sh` is not in the union and is still dirty-and-untouched. Each commit
  carried its own pathspec and each `git show --stat` returns exactly its own paths — no sibling
  seat's staged row was swept in.
- **E-3.** `docs/tranches/X/waves/W4.md` is **byte-untouched** by this repair; so is every conformance
  artefact and every line of this record above `## Repair 1`. Defects 5 and 6 are corrected as dated
  addenda **here** (R.4), never by editing the Close.
- **Masking.** Nothing was skipped, allow-listed, `try`-wrapped, or re-thresholded: the C4 cure is
  **additions only** and **not one `expect(...)` line changed** — ⟨cmd⟩ `git show 5bd44d76 -- e2e/…`
  is `99 ++++` with `0` deletions. The SlugEditLayer cure **removes** an `any` rather than silencing a
  rule. Neither out-of-bounds defect was "fixed" by widening bounds or relaxing a sibling's assertion.
- **E13 mail.** ⟨cmd⟩ `grep -nE '^\| [IO]-[0-9]+ \|' docs/tranches/V/coordination/INBOX.md | grep -i unread`
  → the same **5** rows Check 1 read (O-20 · I-30 · I-31 · I-32 · I-35); ⟨cmd⟩ `grep -oE "X-W4[^ ]*|X\.W4[^ ]*"`
  across them → the only X-W4 token is **`X-W4.g's`** in I-35's routing prose, and `X.W4.g` is CLOSED
  by X-W0.j's dated census FAIL. **0 UNREAD in scope for units a–d.**

### R.8 — verdict of this repair

**Cured: 3** — defect 1 (**HIGH**, C4/LW-4) · defect 4 (MINOR, D2 scope) · defect 7 (INFO, the PNG
strays). **Corrected as dated addenda: 2** — defects 5 and 6 (R.4). **Escalated: 2** — defects 2 and
3, both MEDIUM, both measured out of every §4 row (R.5).

**C4 is GREEN 6 of 6 at the settled bytes**, so the one thing Check 1 found the Hard Gate wanting on
is answered, with no assertion, no threshold and **no product byte** moved in that cure. The two
MEDIUMs that remain are the wave's own **honestly escalated** CI debt: they are out of bounds by
measurement, their repairs are stated to the byte, and they need an orchestrator's dated E-3 bounds
addendum — which is the act this seat may not perform. **The row's promotion is not this seat's to
take**: a fresh VERIFY-ONLY check reads the gates at its own clock and rules.

**Commits**: `5bd44d76` (C4 settle + falsifier evidence) · `4f567837` (D2 scope) · `e112fc4f` (PNG
strays) · this record.

---

## Check 2 — L-20 fresh adversarial pass 2 (VERIFY-ONLY)

**SERVED MODEL: claude-opus-5[1m]** · a fresh adversarial L-20 **pass-2** seat that authored **no
byte** of this wave — no unit cure, no unit receipt, no `## Close`, no `## Check 1`, no
`## Repair 1`, no LEDGER row cell. Track A · wave **X-W4**. Sitting date of record **2026-09-17**
(the owner's begin-word). Wall clock at entry `2026-09-19 04:20:51 EDT` ⟨cmd⟩
`date "+%Y-%m-%d %H:%M:%S %Z"`. **HEAD at entry** `081903c8` (Repair 1's receipt) ⟨cmd⟩
`git log --oneline -1` · branch `tranche-u`. E-3: nothing above this line is rewritten.

**CRASH-RECOVERY first.** ⟨cmd⟩ `git status --porcelain` at entry → **2 rows**, **neither inside
this seat's writable set** (`docs/tranches/X/execution/A/X-W4.md` + `execution/LEDGER.md`):
`M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's) and `M scripts/dev/dev.sh` (unowned,
DR-24 — never opened, never staged). **No inherited hunk existed inside this seat's set**, so the
obligation discharges as an absence: nothing stashed, reset, restored or adopted. Two further dirty
rows appeared mid-seat from concurrent tracks (`execution/D/X-P-W4.md`, `V/coordination/INBOX.md`) —
read, never touched.

**One disclosure the SELF-COUNT law requires of this seat.** Running `scene-action-contract.spec.ts`
re-renders §8 artefact-8's two Mix action-bar frames in place, so this seat's own verification made
`action-bar-mix-390.png` (7,633 → 7,844 B) and `action-bar-mix-desktop.png` (6,675 → 7,030 B) dirty.
A VERIFY-ONLY seat writes no evidence byte, so both were returned to their committed bytes ⟨cmd⟩
`git checkout -- <the two paths>` — a two-path restore of **this seat's own incidental churn**, never
a blanket restore and never another seat's row. Porcelain afterwards carries neither.

### C2.1 — every gate re-run at this seat's own clock: **16 of 16 GREEN**, including the repaired C4

Commands verbatim, each at least double-run, against the settled committed bytes:

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-control-targets.spec.ts e2e/smoke/a11y-select-title.spec.ts e2e/smoke/a11y-gradient-stop-grammar.spec.ts e2e/smoke/scene-action-contract.spec.ts
   run 1 → 21 passed, EXIT 0        run 2 → 21 passed, EXIT 0
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/a11y-gradient-stop-grammar.spec.ts -g "C4"
   isolated runs 1 · 2 · 3 · 4 → 2 passed each, EXIT 0 each
⟨cmd⟩ npx playwright test --project=smoke-mobile e2e/smoke/mobile/a11y-control-targets.spec.ts
   run 1 → 3 passed, EXIT 0         run 2 → 3 passed, EXIT 0
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit                                        → EXIT 0 ×2
⟨cmd⟩ npx eslint demo/color-picker/App.vue demo/shell/usePaneRouter.ts demo/shell/dock/ → EXIT 0 ×2
⟨cmd⟩ npx eslint demo e2e                                                               → EXIT 0 ×2
⟨cmd⟩ npx tsc -p tsconfig.e2e.json --noEmit                                             → EXIT 0
```

Source counts, **double-run, both runs identical**: `h-7` → **3** · `h-9` → **7** ·
`watercolor-dot` → **11** · `--slider-range-origin` → **0** ·
`export interface ActionBarContext|DockActionBar` → **0** · `?.()` in `usePaneRouter.ts` → **2**
(both prose, `:135`, `:292`) · `on-mount` in `App.vue` → **3** · `find scripts -name "proof-*.mjs"`
→ **0** · `SceneActionSet` sole contract at `demo/color-session/keys.ts:184`.

| gate | this seat's reading | verdict |
|---|---|---|
| **A1** | `[W4-A1] undersized=0`, both batch runs | **GREEN — reproduces** |
| **A2** | `[W4-A2] undersized=0`, both `smoke-mobile` runs | **GREEN — reproduces** |
| **A3** | `[W4-A3] measured=4 mismatches=0` ×2 · `[W4-A3-COARSE] measured=0 mismatches=0 unlifted=0` ×2; source `h-7` → **3** | **GREEN — reproduces** (coarse arm VACUOUS, exactly as Repair 1's R.4 addendum records) |
| **A4** | `[W4-A4] nameless=0` ×2 · `[W4-A4-COARSE] nameless=0` ×2 | **GREEN — reproduces** |
| **A5** | `a-falsifier.txt` on disk, `SERVED MODEL`-headed, pinned run `→ EXIT 1 (non-zero, as the gate requires)` with `undersized=5`, reverted run `undersized=2` | **DEMONSTRATED — reproduces** |
| **B1** | `[W4-B1] asserted=7 excluded=1 defects=0`, both runs; every in-scope row `ariaLabel=null` + `labelledBy=v-1-N-label` + rendered `titleText` + `titleBoxInsideField=true` | **GREEN — reproduces** |
| **B2** | `[W4-B2] asserted=7 defects=0` ×2; rows read `blockSize=36 tokenSm=36` fine and `blockSize=54 tokenSm=54` coarse | **GREEN — reproduces** |
| **B3** | `[W4-B3] producerSliderVars=15 declaredInternal=3 consumerReads=0` ×2; `--slider-range-origin` → 0; ⟨cmd⟩ `git merge-base --is-ancestor ea0fdca8 58371516` → **exit 0** | **GREEN — reproduces** |
| **C1** | `[W4-C1] caretLeft=252 mintedLeft=252 inline="calc(55% - 1px)"` · `pointerEventsDuringKeyboardJourney=0` ×2 | **GREEN — reproduces** |
| **C2** | 3 of 3 handles `role=slider min=0 max=100 now=0\|50.2\|100`, `text="Position N%"`, `name="Gradient stop N of 3"` | **GREEN — reproduces** |
| **C3** | `[W4-C3] home=10 end=450 unit=4.4000px/%` · `defects=0` ×2 | **GREEN — reproduces** |
| **C4** | **`clippers=[]` · `w=24 h=24 hitW=24 hitH=24 faceW=20 faceH=20 rootFontSize=16` · coarse `hitW=hitH=44` · `focusVisible=true` · shadow `1px`+`3px` — in 4 isolated runs AND both batch runs, 6 of 6** | **GREEN — the Check-1 HIGH is CURED and reproduces at an independent seat** |
| **D1** | `vue-tsc` EXIT 0 ×2 · rival contracts **0** · `SceneActionSet` sole at `keys.ts:184` · the spec's 10 tests pass twice | **GREEN — reproduces** |
| **D2** | scoped eslint EXIT 0 ×2 and `npx eslint demo e2e` EXIT 0 ×2 with the rule armed `"error"`; `?.()` → 2 prose hits | **GREEN — reproduces** (scope qualifier: C2.6 #3) |
| **D3** | `d-falsifier.txt` on disk: TS2820 + TS2345 at **EXIT 2**, revert **EXIT 0** | **DEMONSTRATED — reproduces** |
| **D4** | the 10 contract tests pass in both runs, including the 390×844 `unavailable` + `disabled` + `aria-disabled` + `role="status"` arms; `grep -c "on-mount" App.vue` → **3**, unchanged | **GREEN — reproduces** |
| **G1–G4** | installed glass ⟨cmd⟩ `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → **7.0.0**; `watercolor-dot` → **11**, bank intact | **NOT OPENED — correct** (X-W0.j census FAIL 1/4 at the elected 8.0.0) |

### C2.2 — HONEST-RED ADJUDICATION: **the set is EMPTY, and now for the right reason**

Check 1's honest-RED set was empty because C4 was RED **with no relief** — an unrelieved RED, which
is why pass 1 returned NOT-CONFORMANT. At this seat the set is empty because **no §6 gate is RED at
all**: 13 born-RED rows are GREEN, the two one-time falsifier demonstrations (A5, D3) are on disk
with their red/green pairs, and B3's recorded-re-test-plus-fence holds with its receipt proved an
ancestor of the cure. **Nothing is laundered as honest-RED here because nothing needs to be.**

The repair that moved C4 was itself read at the bytes rather than taken on its word:
⟨cmd⟩ `git show --numstat 5bd44d76` → `99 0 e2e/smoke/a11y-gradient-stop-grammar.spec.ts` +
`74 0 …/evidence/W4/c4-settle-falsifier.txt` — **additions only, zero deletions**, so not one
`expect(...)`, threshold or product byte moved. `transformRest()` polls the **animation timeline**
to `[]` with a 20 s ceiling and then requires the client rect to repeat across two frames: if the
transform never settled the poll would **fail the test**, not pass it, so the wait cannot mask what
it waits for. Its exclusions are principled, not nominal (a loop is skipped for **infinite
duration**, never by name), and the falsifier pair banks the induced state
(`div:transform@pending:0ms`, `w=24.82`, `matrix(0.999391, -0.0348995, …)` = `rotate(-2deg)`)
beside its resolution (`w=24`). C4's six assertions are unchanged: `undersized == []`, `hitW ≥ 24`,
`hitH ≥ 24`, `18 < faceW < 22`, the `1px`+`3px` ring with `focusVisible`, and `clippers == []` over
**every** clipping ancestor.

### C2.3 — bounds, E-3 and commit families: **CLEAN**, re-proven independently

- **Union bounds** over **33** commits (the 25 unit commits + `4cedfdb5` OPEN + `849206f0` RESUME +
  `e2bc291c` close + `f15477a8` Check 1 + `5bd44d76` · `4f567837` · `e112fc4f` · `081903c8` Repair 1)
  ⟨cmd⟩ `while read c; do git show --pretty=format: --name-only "$c"; done | sort -u` → **74 paths**.
  ⟨cmd⟩ the same union `| grep -cE "^(src/|api/|test/|node_modules/|\.github/|scripts/|demo/ui/|demo/shell/PaneSlot\.vue|demo/shell/viewSchema\.ts)"` → **0**.
  The 42 non-evidence paths are exactly the 22 `demo/**` §4 rows + `eslint.config.js` + the 6
  `e2e/**` §4 rows + this record + `execution/LEDGER.md` + `V/coordination/INBOX.md` (the OPEN
  commit's E13 row, standing law, not §4). **`scripts/dev/dev.sh` is not in the union** ⟨cmd⟩
  `grep -c 'dev\.sh'` → **0**, and it is still dirty-and-untouched at this seat's porcelain.
- **K.1's own published figure re-derived**: the **25 unit commits alone** union to exactly **70
  paths — 39 evidence + 31 other**, to the number. The close's arithmetic is true at the bytes.
- **E-3 held**: ⟨cmd⟩ over all 33 commits' name-only output, `docs/tranches/X/waves/W4.md` appears
  **0** times — the dated spec is byte-untouched; so are
  `docs/tranches/V/megatranche/registry/adjudicated/**`, every `conformance/` path and every sibling
  wave spec (**0** matches each). Repair 1's two prose corrections are dated addenda-beside (R.4),
  never edits to the Close.
- **Commit families**: §9 row 4 `ea0fdca8` is an **ancestor** of row 3 `58371516` (exit 0) · row 5
  `666978d4` lands the cure **and** the two bindings it invalidated in ONE commit (`GradientStopEditor.vue`
  +367/−?, `views/gradient.spec.ts` 26 lines) · row 6 `e64002e9` lands the collapse as ONE commit
  over 9 files (+1,302/−396) including the eslint scope · row 7 **correctly omitted** (census FAIL) ·
  row 8 `e2bc291c`. **No declared family is split**, and each `git show --stat` returns exactly its
  own paths — no sibling seat's staged row was swept in.

### C2.4 — masking scan: **NONE FOUND**

⟨cmd⟩ over every one of the 33 commits' diffs restricted to `demo e2e eslint.config.js`, added lines
only, for `test.skip|test.fixme|.only(|eslint-disable|@ts-ignore|@ts-expect-error|allowlist|xit(|describe.skip`
→ the **one** hit is a comment in a gate spec stating the census is built *"never from a hand-fitted
element allowlist"*. **Two** `try`/`catch` sites are added in the whole wave and both were read:

- `usePaneRouter.ts:327` — the contract's `failed` arm. It `record()`s the throw into typed state
  that `GenericActionBar.vue:149-150` **renders** through `role="alert"` with the seat left operable
  (`failedMessage`, `runIfRunnable`). A surfacing seam, the exact opposite of a swallow.
- `SlugEditLayer.vue:57` — Repair 1 **re-typed an existing** `catch (e: any)` to
  `catch (e: unknown)` with real narrowing (`e instanceof Error ? e.message : ""`). It **removes** an
  `any`; it does not silence a rule.

⟨cmd⟩ `grep -c node_modules <the union>` → **0**: no producer byte was patched. No producer selector
was copied into consumer CSS — the only producer tokens the diff reads are `--control-h-xs` and
`--control-floor`, which `W4.md` §5 unit a **names as the mechanism**, and `--dock-compact-control-size`
is consumer-defined in `SlugEditLayer.vue:161` itself. The A-gate census is the §6 selector
**verbatim** with §6's own name rule and §6's own attribution rule (`role=slider` → `[data-slot="slider"]`,
nothing else re-attributed) and skips no element. Unit c's two re-anchors in `views/gradient.spec.ts`
**strengthen** rather than narrow: `pct > 60` became `left > railWidth × 0.6` **and** `valueNow > 60`
(two conjuncts for one), and `[aria-label="Gradient stop at 80%"]` became the exact
`[data-stop-id][aria-valuenow="80"]`.

### C2.5 — E13 mail: **0 UNREAD in scope**

⟨cmd⟩ `grep -nE '^\| [IO]-[0-9]+ \|' docs/tranches/V/coordination/INBOX.md | grep -i unread` →
the same **5** rows Check 1 and Repair 1 read: **O-20 · I-30 · I-31 · I-32 · I-35**. ⟨cmd⟩
`grep -oE "X-W4[^ ]*|X\.W4[^ ]*"` across those five rows → the **only** X-W4 token is **`X-W4.g's`**
in I-35's routing prose, and `X.W4.g` is CLOSED by X-W0.j's dated census FAIL (re-measured here:
installed glass **7.0.0**, `watercolor-dot` **11**). ⟨cmd⟩
`/usr/bin/find <the four coordination paths> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 04:18"`
→ *(nothing)* — **no letter has landed since Repair 1's sweep**. No row lands on units a–d.

### C2.6 — Defect register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **1** | MEDIUM (mitigated: out of bounds **by measurement**, repairs stated to the byte, owner named, zero bytes written) | **Three HARD-CI rows land RED, caused by this wave's own spec-ordered cures, and are still undischarged** (ESC-R1, carried from Check 1 defect 2): `walk.spec.ts:17/89` and `o20-generate-plate.spec.ts:60/71` (the retired `"Generation preset"` literal) and `o27-focus-affordance.spec.ts:103/126-129` (BR-3 reading the 24 px seat) | ⟨cmd⟩ `npx playwright test --project=smoke e2e/smoke/walk.spec.ts e2e/smoke/oracles/o20-generate-plate.spec.ts e2e/smoke/oracles/o27-focus-affordance.spec.ts` → **4 failed · 5 passed** at this seat, the same split the close and Check 1 read; the 4th (`o27:323` BR-1 forced-colors) was already RED at unit c's **pre-cure** control (`96936340`), i.e. before unit d existed, so it cannot be this wave's. ⟨cmd⟩ `grep -c "walk.spec\|o20-generate-plate\|o27" docs/tranches/X/waves/W4.md` → **0** | the orchestrator lands `{ name: "Preset", exact: true }` ×2 and `el.querySelector(".rail-handle-face")!.getBoundingClientRect()` under a dated **E-3 bounds addendum** admitting the three paths. Padding product copy to fit a stale selector stays forbidden |
| **2** | MEDIUM (mitigated: measured and published **against the wave's own interest**, escalated twice as ESC-a.7 → ESC-R2, zero bytes written) | **§2's goal criterion is not met at the bytes**: two live, operable, **nameless** seats survive in the persistent shell — `demo/shell/dock/ColorInput.vue:67-81`, two icon-only `<button class="send-btn btn-interactive">` under `v-if="proposeMode"` / `v-else`, **no `aria-label`, no text child** | re-read at the bytes at this seat (the two `<button>` blocks carry only `<Loader2>` / `<ArrowRight>` children). ⟨cmd⟩ `grep -c 'ColorInput' docs/tranches/X/waves/W4.md` → **0** — in no §4 row, so a cure is a §3a bounds ESCALATION, not an edit. A4 reads `nameless=0` **honestly**: the seats sit inside a `PopoverTrigger` unmounted at both gate viewports, and §6's own census rule counts only visible elements | a dated E-3 bounds addendum admitting `ColorInput.vue` to a W4-successor's §4, or an explicit route to the wave owning the dock input band; the cure is one `aria-label` per seat. `ColorInput.vue:242`'s surviving `catch (e: any)` rides the same addendum |
| **3** | MINOR (mitigated: the residue is **named in the config** and escalated, not globbed away; it **pre-dates the wave**; §6 D2's own RED census never counted it) | **D2's armed eslint scope stays narrower than D2's own command's third leg.** The command names the glob `demo/shell/dock/**`; `eslint.config.js:333-…` arms the rule over **7 named files**. Repair 1 cured `SlugEditLayer.vue`; **one** glob resident still carries a type-level `any` the armed run cannot see | ⟨cmd⟩ `grep -rn "catch (e: any)" demo/shell/dock \| wc -l` → **1**: `ColorInput.vue:242`. Provenance ⟨cmd⟩ `git log -1 -S'catch (e: any)' -- demo/shell/dock/ColorInput.vue` → **`a61094e3` (2026-07-17)**, two months before this wave. `W4.md` §6 D2's RED cell enumerates `App.vue` 6 + `usePaneRouter.ts` 3 + `Dock.vue` 1 — the armed list covers that population entirely | rides defect 2's addendum (`catch (e: unknown)`), after which the literal glob can be armed in bounds |
| **4** | MINOR (mitigated: **disclosed in the spec file's own header**, and the coarse rung is genuinely measured) | **C4's coarse arm runs as an in-file emulation under `--project=smoke`**, not under `--project=smoke-mobile` as §6's *"same spec at both projects"* reads literally | ⟨cmd⟩ `playwright.config.ts:181` → `smoke-mobile` carries `testDir: "./e2e/smoke/mobile"`, so a file outside that directory **cannot** run in that project, and `W4.md` §4 grants unit c exactly **one** spec path — a mobile twin would be an out-of-bounds create. The arm asserts `matchMedia("(pointer: coarse)")` **true** at 412×915 and reads `[W4-C4-COARSE] hitW=44 hitH=44` on both handles | none owed by this wave. A successor that is granted `e2e/smoke/mobile/**` for the rail can move the cell into the project proper |
| **5** | INFO | **A3's coarse arm is vacuous** — `[W4-A3-COARSE] measured=0` in **both** of this seat's `smoke-mobile` runs, so A3's second declared failure mode is never exercised | the two runs above | **already corrected** by Repair 1's dated addendum R.4 (defect 6); carried forward as a standing qualifier, not re-opened. The coarse lift itself is measured elsewhere (A2's census, B2's `36 → 54`) |
| **6** | INFO | **Two pre-existing cadence REDs reproduce and are not this wave's**: the library `npm run typecheck` and `prettier --check demo e2e` | ⟨cmd⟩ `npm run typecheck` → `test/v4-css-emerging.test.ts(12,10): error TS2459` — `test/**` is on `W4.md:175`'s Do-NOT-touch list and **0** `test/` or `src/` paths appear in the 74-path union. ⟨cmd⟩ `npx prettier --check demo e2e` → **193 files**; the **six gate specs this wave created are CLEAN** ⟨cmd⟩ `npx prettier --check <the six>` → *"All matched files use Prettier code style!"*, and ⟨cmd⟩ `git show 8934de85^:…/SlugEditLayer.vue \| npx prettier --check --stdin-filepath …` / the same at `58371516^:…/MixConfigBar.vue` are **each already RED before their cure** | X-W11's hygiene walk; and the owner of `c8848bed`'s stylesheet split for the TS2459 |

**Superlatives, recorded because they are real and were checked rather than assumed.** The C4 cure
is the rarest shape in this register: a HIGH answered by making the **instrument** honest, with
`git show --numstat` proving **zero deletions** — no assertion, no threshold, no product byte. Repair 1
also **corrected both of its predecessors' published mechanism** (rotation, not scale overshoot) and
banked the arithmetic to the digit, then **stated its own honest limit aloud** (the wild RED did not
reproduce on a warm host, so the cure was proved against a deliberately induced instance) and
**refused** to clear the shared vite cache because three sibling tracks share the checkout. The two
MEDIUMs are both the wave publishing findings **against its own interest**: artefact 7's premise was
overturned by the wave's own re-run, and A3's `h-7` premise was measured FALSE. Every collateral RED
in this wave was separated from a pre-existing one by an actual **pre-cure control run**, never by
assertion.

### C2.7 — the four-verb line, and the successors

**The line is still NOT moved, and that remains lawful.** ⟨cmd⟩ `grep -n 'waves/W4.md' docs/tranches/X/waves/W4.md`
→ *(empty)*: §4 File Bounds grants **no** row on the spec itself, so writing §1's table would be a
§3a bounds escalation. The contrast is at the bytes — `W3.md:153` carries the explicit
`| docs/tranches/X/waves/W3.md | modify (status + artefact paths at close) |` grant, and `W4.md` has
no such row. The precedent is also at the bytes: **`W3.md:30` still reads `| IMPLEMENTED | NO | — |`
while X-W3's LEDGER row reads `CLOSED 2026-09-17`** — the ledger row is the tranche's status of
record and the spec's four-verb table is not written by a seat that holds no row on it. §12's L-18
two-quartet challenge stands **UNSERVED** and is recorded, not forgotten.

**Successor conjuncts, measured at the bytes:**

| successor | its `Opens after` conjunct on X-W4 | state |
|---|---|---|
| **X-W5** | *"X-W4 (the typed `SceneActionSet` contract, CC-043)"* · **X-W2** · X-W0's CC-012 act (`W5.md:6`) | the X-W4 conjunct is **GREEN on the clause AND on the letter** once this check lands: one exported contract (`keys.ts:184`), **0** rival contracts, **0** `any` on the action path, `vue-tsc` EXIT 0, D1–D4 reproduce; X-W2 `CLOSED`, X-W0 `CLOSED`. **X-W5 is UNBLOCKED by this promotion** |
| **X-W6** | *"Opens after: X-W5"* (`W6.md:4`) | blocked on **X-W5**, independently of this wave |
| **X-W7** | X-W3 (`CLOSED`) · X-W4 (typed `SceneActionSet`) · **X-W6** (`planned`) · X-W1 (`CLOSED`) (`W7.md:6`) | blocked on **X-W6**, independently of this wave |
| **X-W8** | X-W5 · X-W6 · X-W7 (`W8.md:6`) | blocked on W5/W6/W7, independently of this wave |

**No successor is blocked by anything this check found.** X-W5 inherits the two MEDIUMs' addendum as
an orchestrator act, not as a precondition.

### C2.8 — Verdict: **CONFORMANT**

**0 BLOCKER · 0 CRITICAL · 0 HIGH · 2 MEDIUM (both mitigated, both escalated, both owner-named) ·
2 MINOR (both mitigated) · 2 INFO.** All **16** of §6's gates are GREEN or DEMONSTRATED at this
seat's own clock, every one double-run or better against the settled bytes, none quoted from a
receipt: **A1 A2 A3 A4 A5 · B1 B2 B3 · C1 C2 C3 C4 · D1 D2 D3 D4**. Check 1's single HIGH — C4's
`clippers == []` arm — is **cured and reproduces GREEN 6 of 6** at an independent seat, by an
additions-only instrument settle that moved no assertion, no threshold and no product byte. Bounds
are clean over **74 paths / 33 commits / 0 outside**; E-3 holds at the bytes over the dated spec, the
adjudicated registry, the conformance artefacts and every sibling spec; no declared §9 family is
split; **no masking move exists anywhere in the diff**; mail is clean. **The honest-RED set is
EMPTY** — not relieved, but unneeded: no §6 gate is RED. `X.W4.g` never opened and its §1.M bank is
intact at the census FAIL.

**The row is promoted to `CLOSED 2026-09-17`.** What travels with it, named so nothing is lost:
**ESC-R1** (three HARD-CI rows, repairs stated to the byte) and **ESC-R2** (`ColorInput.vue`'s two
nameless seats + its surviving `catch (e: any)`), both out of **every** §4 row by measurement, both
needing one dated **E-3 bounds addendum** from the orchestrator — an act no seat inside this wave may
perform.
