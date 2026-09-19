SERVED MODEL: claude-opus-5[1m]

# X-W5 — "One route, one scene" (Track A · X·V) — EXECUTION RECORD

Authority of order: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.1 (edge table) · §3.4 (locks) · §5 (seat law).
Spec of record: `docs/tranches/X/waves/W5.md` (dated 2026-08-03, IMMUTABLE under E-3) **PLUS**
`docs/tranches/X/refinement/X-W5-FOLD.md` — the fold's own reading rule (`X-W5-FOLD.md:15`), verbatim:
*"At execution X-W5 reads `waves/W5.md` PLUS this addendum, in that order; where they disagree the
addendum governs."* Owner rulings consumed: COHESION **§0i** (three standing decision points), **§0j**
(the begin-word), **§0k.1** (RS-1), **§0k.3** (**S-1**, **S-7**). Nothing here is presumed; every
owner-gated item below cites its ruling id.

---

## Open

**Date**: 2026-09-19 (the sitting of record is 2026-09-17, the owner's begin-word, COHESION §0j).
**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`. **Mode**: fresh OPEN — the ledger row read `planned`,
no `execution/A/X-W5.md` existed, so this is not a RESUME.

### Crash-recovery (STANDING LAW)

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/value.js` →

```
 M docs/tranches/V/reformation/CARRY-LEDGER.md
 M docs/tranches/X/execution/C/F-W3.md
 M scripts/dev/dev.sh
```

**Zero of the three is inside this seat's writable set.** `docs/tranches/X/execution/C/F-W3.md` is
Track C's (sibling seat — untouched); `docs/tranches/V/reformation/CARRY-LEDGER.md` is not in W5's
§4 bounds nor in any unit's set (untouched); `scripts/dev/dev.sh` is the unowned standing-dirty row
— **NEVER touched, never staged** (COHESION §0j.A **DR-24**: *"RETIRED-BY-ASSIGNMENT with the
NEVER-touch posture made PERMANENT for tranche X"*). **No inherited partial work on X-W5 exists.**

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock, status taken from each register row's cell **by position**,
never a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**); `INBOX.md` **self-excluded** from its own
denominator (SELF-COUNT law).

| # | path | entries | newest | disposition |
|---|---|---|---|---|
| 1a | `docs/tranches/V/` | **10** `.md` | `ARCHITECTURE.md` (09-18) — an architecture doc, not mail | rowed/none owed |
| 1b | `docs/tranches/V/coordination/` | **24** | `INBOX.md` (self) → then the five 2026-09-18 `value-4.1` letters, **ours** = O-34..O-38 | rowed |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | **9** | `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed**, UNMOVED | rowed |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | **12** `.md` + `vnext/` | `INBOUND-LEDGER.md` (keyframes' own ledger, not a letter); newest letter = **O-21, ours** | rowed |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | **28** | `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12, ours** | rowed |

**BK re-confirmed the newest glass tranche dir** ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3`
→ `BK/ · BJ/ · BI/` — never a pinned letter (§5.3).

Delta ⟨cmd⟩ `find <each of the four paths> -maxdepth 1 -type f -newermt "2026-09-19 00:00"` → exactly
**two**, both self-or-theirs (`docs/tranches/V/coordination/INBOX.md`, self-excluded; keyframes'
`INBOUND-LEDGER.md`, carrying no new letter). Register arithmetic ⟨cmd⟩
`grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **80**; positional scan ⟨cmd⟩
`grep -cE '\| \*{0,2}UNREAD' INBOX.md` → **4**, and all four are **prose sweep lines, not table rows**
(lines 221, 227, 231, 241 — each a narrative `**Sweep …**` paragraph), double-run `4 ≡ 4`.

**Result: 0 unrowed · 0 UNREAD addressed to value.js in X-W5's scope · 0 new `I-n` minted.**
Register tail unmoved at **I-35 / O-40**. `INBOX.md` carries no edit from this seat: a sweep that mints
nothing writes nothing but its line, and **this seat's sweep is banked here rather than in `INBOX.md`**
because no row's status moved and no row was created — the file is left byte-identical.

### Preconditions — verified at the bytes AND in the ledger

W5.md §1 `Opens after`: **X-W4** (CC-043's typed `SceneActionSet`) · **X-W2** (reciprocal to
`W2.md:284`) · **X-W0** (CC-012's track-or-archive, for gate D2's baseline only). The ledger's own
`opens after` cell for X-W5 names **X-W2**; the spec's three are verified below, all three.

| predecessor | ledger status (read 2026-09-19) | named artefact, measured at the bytes | verdict |
|---|---|---|---|
| **X-W0** | `CLOSED 2026-09-17 (honest-RED: HG-8 — ESC-N1)`; CHECK 1 = 18/18 hard + 8/8 fold GREEN | CC-012 track-or-archive ⟨cmd⟩ `git ls-files --error-unmatch docs/tranches/T/audit/pi/u-gestalt/probe2-log.txt` → path echoed, **exit 0** | **MET** |
| **X-W2** | `CLOSED 2026-09-17 (honest-RED: G3 · G5)` | boot-path bytes settled; the six W5 `e2e/**` paths are file-disjoint from W2's seven (§4a: `e2e/smoke/mobile/` and `e2e/smoke/perf/` shared as *directories only*) | **MET** |
| **X-W4** | `CLOSED 2026-09-17` — promoted at CHECK 2 (2026-09-19), 16/16 §6 gates GREEN/DEMONSTRATED | `SceneActionSet` present and typed: `demo/color-session/keys.ts:175` (owner) · `demo/shell/usePaneRouter.ts:37,226,525,531` · `demo/shell/dock/Dock.vue:21,27` · `demo/shell/dock/layers/ActionBarLayer.vue:20,27` — **4 files** | **MET** |

**The one escalation this wave could not open without** — `X-W5-FOLD.md` **CE-1**, verbatim:
*"CE-1 · X-W5.a ⟂ X-W8 (MT-DOCK-LAYERS-1) — the `bindPane` conflict. **ESCALATION REQUIRED BEFORE W5
OPENS.**"* — is **RULED and CLOSED** at COHESION **§0k.3 S-1**, verbatim: *"**(b) R-8 governs.**
`bindPane` narrowed to non-command instance uses (applyExternalColor / commitEdit / cancelEdit); the
`DockCommand` provide/inject registry lands at **X-W8** (MT-DOCK-LAYERS-1); X-W5 may not claim C-3;
A3's witness stays X-W5's, A3's cure moves to X-W8."* §0k.3's own Consequence line names X-W5 (S-1,
S-7) among the waves that **"may open lawfully."** The precondition is therefore MET, and two spec
readings move with it:

1. **Gate A3's CURE is not X-W5's.** Unit a lands A3's **witness** (the measurement, incl. the fold's
   §2a (ii) Save/Cancel-discard arm and (iii) the 720×900 ≡ 1440@200 % arm) and closes A3 **honest-RED
   with the cure booked at X-W8**. A green A3 in W5 would be a false green under S-1.
2. **Registry row C-3 is not X-W5's to claim** (S-1's own words). Note the namespace: this is the
   *registry* row `C-3`, **not** the W5 hard gate `C3` (the fork census), which stays X-W5's and is
   back-gated per §1.1 below.

**Two further owner rulings land as this wave's first docs acts** (§0k.3 Consequence: *"each landing
the dated addendum its ruling names as its first docs act"*):

- **§0k.3 S-7** — *"**(a) `demo/color-picker/ErrorBoundary.vue`** — the only path that exists; X-W5's
  BD-07 `demo/shell/…` path is an authoring error, **corrected by dated addendum at X-W5-FOLD**. X-W5
  owns the containment altitude only (`App.vue:50/:140`'s wrap); the component's bytes are written by
  X-W7."* Measured here ⟨cmd⟩ `find demo -name 'ErrorBoundary*'` → `demo/color-picker/ErrorBoundary.vue`
  only; `test -f demo/shell/ErrorBoundary.vue` → **NO**. → **unit a's first act** is the dated
  addendum-beside at `docs/tranches/X/refinement/X-W5-FOLD.md` (append-only; E-3 — §§0–8 bytes stand).
- **§0k.1 RS-1** — *"DR-14's DELETE rides X-W5's existing `vite.config.ts` modify-carve (W5.md:94).
  §0j.A's X-W1 routing is corrected by this line; X-W1 owes nothing."* Measured: `siblingFsAllowTransient`
  at `vite.config.ts:139` (declaration) and `:287` (`fs: { allow: … }`) — **two sites, one file**, exactly
  as §0j.A DR-14 states. → **unit a** deletes both in its `vite.config.ts` carve.

**The one back-gate, restated** (RUNBOOK §1.1, verbatim): *"**W5's C3 may not close while Dock G-L (an
X-W8 probe) is RED** — the single place the subtraction wave back-gates a composition wave."* Run
read-only by this seat as ordered: ⟨cmd⟩ `grep -c useMediaQuery demo/shell/dock/Dock.vue` → **2**
(G-L's source arm requires `== 0`) → **Dock G-L is RED today**. C3 may go GREEN inside this wave and
**may not be cited as CLOSED**; the close records C3 as *green-source / back-gated-open* until X-W8's
rendered arm (the 1024×1366 dual-grammar probe, frame `collision-1024x1366.png`) lands.

---

## Baseline — the born-RED BEFORE reading, measured read-only 2026-09-19

Every static count below was **double-run** and is reported from the settled bytes (write-then-measure;
SELF-COUNT law). The spec's own `RED today` figures are dated **2026-08-03**; where today's bytes differ
the divergence is stated as a fact for the owning unit, never as a licence to re-adjudicate the gate.

### Gate slate — 33 entries (W5.md §6's 28 + the fold's N11..N15; §6h/§7e arithmetic: **18 sharpened-existing + 15 new born-RED**)

| gate | unit | BEFORE (this seat, 2026-09-19) | vs spec's 2026-08-03 |
|---|---|---|---|
| **A1** | a | `main.ts` **168 B** · `isReady` **false** · `^import "` count **0** → exit **1** (RED). `grep -cE 'useGlobalDark\|provideApiClient\|^import "\.\./styles' App.vue` → **7** (gate needs 0) | MATCHES |
| **A2** | a | live probe — **not spent by seat 0** (§5.2 parsimony; the X-W4 precedent). RED of record `[b0,b1,b2]`, blob absent. **MEASURE-AT-OPEN duty → unit a's first measurement act** | carried |
| **A3** | a | live probe — carried. RED of record `{mobileChanged:false, desktopChanged:true}`. Structural cause re-measured: **38** fork refs / **13** files (below). **CURE moved to X-W8 by §0k.3 S-1; witness only here** | carried + RULED |
| **A4** | a | `grep -rn 'bindPane' demo/` → **0** hits (RED — the checker cannot bite) | MATCHES |
| **A5** | a | `grep -rn '<h1' demo/ --include='*.vue'` → **0** hits (RED) | MATCHES |
| **A6** | a | live probe — carried. RED of record `?space=lab&color=…`. **MEASURE-AT-OPEN → unit a** | carried |
| **A7** | a | `grep -rn 'role="status"' demo/shell/ demo/color-picker/` → **2** (`GenericActionBar.vue:19` a comment · `:146` a live `sr-only` region). **DIVERGENT** — spec measured **0**. The grep arm is green-before-cure; the gate stays **RED** on its other two arms (no `<h1>` exists anywhere, A5=0; the `/#/does-not-exist` render is byte-identical to `/#/`) | **DIVERGENT** |
| **B1** | b | live probe — carried. Static root confirmed: `shell.css:23 height:100dvh` + `:26 overflow:hidden` | carried |
| **B2** | b | live probe — carried. Root re-measured at `foundation.css:471/:479` + `shell.css` | carried |
| **B3** | b | live probe — carried. RED of record **45.4 %**. **MEASURE-AT-OPEN → unit b** | carried |
| **B4** | b | `grep -c '100dvh' demo/styles/shell.css` → **1** · `grep -rl 'svh' demo/` → **0** files · `grep -r 'content-max-h' demo/` → **11** hits / **4** files (`DESIGN.md` 3 · `PaneSlot.vue` 1 · `shell.css` 2 · `foundation.css` 5) | RED; **count DIVERGENT** (spec: 8 / 3 files — `demo/DESIGN.md` is the fourth carrier) |
| **B5** | b | **decision-record** — no recorded output exists → absence is the failure | as declared |
| **B6** | b | **decision-record** — no rationale comment at the site → absence is the failure | as declared |
| **C1** | c | live probe — carried. RED of record `#/` **69 vs 893 = 7.7 %**. **MEASURE-AT-OPEN → unit c** | carried |
| **C2** | c | live probe — carried. RED of record `false`. **MEASURE-AT-OPEN → unit c** | carried |
| **C3** | c | `grep -rEo 'useBreakpoint\|isDesktop\|isMobile\|mobilePaneIndex' demo/ --include='*.vue' --include='*.ts'` → **38** across **13** files | MATCHES exactly |
| **C4** | c | `test -e demo/shell/PaneSegmentedControl.vue` → EXISTS, **1,750 B**; imported `Dock.vue:14`, rendered `:257` | RED; line drift (spec: `:15,198`) |
| **C5** | c | live probe — carried. RED of record: the `App.vue` v-if fork remounts. **MEASURE-AT-OPEN → unit c** | carried |
| **C6** | c | RED input by construction (the wrapper cut without the re-seat) | as declared |
| **C7** | c | source-scoped viewport-dimension `@media` → **7** (`ConsoleRail:348` · `PaneSegmentedControl:46` · `DockStatusLamp:70` · `shell.css:129` · `animations.css:17` · `foundation.css:471` · `foundation.css:479` aspect-only) | **7** MATCHES; one line drift (`ConsoleRail` :348 not :323) |
| **C8** | c | `node -e` over `viewSchema.ts` → **13** `right:"` rows → exit **1** | MATCHES exactly |
| **D1** | d | frame-budget oracle **does not exist yet** (`docs/tranches/V/megatranche/workflows/gates/` → **No such file or directory**; the parent `workflows/` exists with 10 siblings). RED of record: 71 % / 63 % / 26 % / 23 % over32 | RED (script to be created by unit d) |
| **D2** | d | `git ls-files --error-unmatch docs/tranches/T/audit/pi/u-gestalt/probe2-log.txt` → **exit 0** — **GREEN BEFORE CURE** | **GREEN**; discharged by X-W0's CC-012 exactly as W5.md:282 predicts |
| **D3** | d | `grep -rn 'pane-wrapper--left\|pane-wrapper--right' demo/` → **18** (`shell.css` 3 · `animations.css` 12 · `App.vue` 3) | MATCHES exactly |
| **D4** | d | `grep -c '<Transition ' MixSourceSelector.vue` → **0**; the bare `v-if` mode swap at `:114`; the `TransitionGroup` at `:120` is the inner list (explicitly not satisfying). `SegmentedTabs` census: **7** occurrences / **3** files | MATCHES exactly |
| **D5** | d | **non-regression** — the global PRM guard exists at `animations.css:184-192` (`@media (prefers-reduced-motion: reduce)` over `*, *::before, *::after`) → **GREEN BEFORE CURE**, must keep covering the new rules | as declared |
| **E1** | e | `grep -rcE '64%?…66\.6666667\|33\.3333333…36'` over the four normative docs → **7** total (`VISUAL-CONSTITUTION.md:44,45` · `EVIDENCE.md:43,47` · `OPTICAL-BENCH-COMPOSITIONS.md:39,40` · `proportion-register.md:35`) | MATCHES exactly |
| **E2** | e | the seven sentences carry **no source attribution**; `P122` appears **34×** elsewhere in the four docs but not at the seven sites | MATCHES |
| **N1** | a | 4 orphaned `onBeforeUnmount` teardowns under `<KeepAlive :max>`; demo census 1 `onActivated` / 0 `onDeactivated` | RED (source-certain) |
| **N2** | c | `setActiveTab("saved")` at `useSlugMigration.ts:55,:69,:76`; `as ViewId` at `usePalettePorts.ts:88` → **1** cast | RED; **DIVERGENT** (fold cites two casts at `:87-88`; one is live today) |
| **N3** | a | `usePaneRouter` prop bag keys are string literals; the seam is `Record<string, unknown>` | RED |
| **N4** | a | `valueOrThrow` live on the render path — `demo/color-session/picker-color.ts:104` + **10** call sites (`:116,:120,:126-135`); `main.ts` mounts bare (168 B) | RED. **Path divergence**: the fold's BD-13/BD-14 cite `demo/color-picker/composables/color/useColor{Pipeline,Parsing}.ts`; the files live at `demo/color-session/useColorPipeline.ts` and `demo/color-session/useColorParsing.ts` |
| **N5** | a | `grep -rn 'onErrorCaptured' demo/ src/` → **3** hits, **exactly one carrier** (`ErrorBoundary.vue:59`; `:39` is the import, `:66` a comment) wrapping the whole grid | RED, fold's "exactly one carrier" CONFIRMED |
| **N6** | a | `PaneSlot.vue:111-129` renders no wrapper/role/aria; `App.vue`'s `<main>` label never names the arrived pane | RED |
| **N7** | a | `:max` literals: `App.vue:99` **9** · `:125` **6** · `:159` **4**; `PaneSlot.vue:120` `:max="max"` | RED; **DIVERGENT** (fold names 6 and 9; a **third** literal `:max="4"` exists) |
| **N8** | a | `grep -c 'interface PaneSlot' demo/shell/usePaneRouter.ts` → **1** | MATCHES exactly |
| **N9** | b | `scripts/ci/` = `boot-smoke.mjs` · `oracle-slate.mjs` · `verify-packed-surface.mjs` — **`css-emission-probe.mjs` ABSENT**, while `shell.css:106` and `foundation.css:29` both cite it as the guarantor | MATCHES exactly |
| **N10** | c | `grep -cE 'BouncyTabs\|lg:flex' e2e/smoke/mobile/walk.spec.ts` → **3** | RED |
| **N11** | c | `states.mjs` captures at 1440×900 only; `shell.css` hides the control above 639 px ⇒ **zero** mobile captures of `PaneSegmentedControl` in the three blind states | RED (source-certain) |
| **N12** | c | `useSlugMigration` deps carry `userLogout`/`ensureUser` with zero readers | RED (source-certain) |
| **N13** | b | **3** live in-tree sites: `foundation.css:373` (`--select-font: var(--font-mono)`) · `demo/DESIGN.md:11` · `:37` | MATCHES exactly |
| **N14** | c | seven declaration sites of the view identity, six invisible to `vue-tsc` | RED (record-cited) |
| **N15** | c | admin-names mobile source order inverted (query before selector) | RED (record-cited) |

### GREEN-BEFORE-CURE (R.2 findings), stated loud

1. **D2** — `git ls-files --error-unmatch … probe2-log.txt` exits **0**. Green, and **predicted by the
   spec itself** (`W5.md:282`: *"Discharged by X-W0's CC-012 act; re-checked here because D1 depends on
   it"*). It is a finding, not a defect: the re-check is the point, and it passes. D1 may cite the
   baseline.
2. **D5** — declared *"not RED — non-regression"*; the global guard is present at
   `animations.css:184-192`. Green as declared; the obligation is that unit d's new declarations stay
   inside it.
3. **A7's grep arm** (`role="status"` ≥ 1) — **2** hits where the spec measured **0**. This arm is
   green before its cure. The gate is **not** green: A7 is a three-arm gate and the other two
   (redirect reason announced; 404 title/H1 distinct from `/#/`) are unmeasurable today because
   A5 = 0 `<h1>` anywhere. Recorded so no close can cite the grep alone. **The `AdminListSkeleton`
   LOCK travels with it** (fold §0a.5, verbatim): the shell `role="status"` region is a
   **route-settlement** node and *"may never be cited as this cure"* for load-completion/`aria-busy`.

### Divergences from the spec's 2026-08-03 numbers — facts for the units, not rulings

`A7` 0→**2** · `B4` content-max-h 8/3 files→**11/4 files** (`demo/DESIGN.md` is the fourth carrier) ·
`N2` two casts→**one** · `N7` two `:max` literals→**three** · `N4`/BD-13/BD-14 path drift
(`demo/color-picker/composables/color/` → `demo/color-session/`) · `C4` import line `:15`→`:14` ·
`C7` `ConsoleRail:323`→`:348`. Everything else reproduces **byte-exactly**: C3 **38/13**, C7 **7**,
C8 **13**, D3 **18**, D4 **0/7/3**, E1 **7**, N8 **1**, N9, N13 **3**.

---

## Unit plan

**Agents (binding, `W5.md:7`)**: **5 serial** — single worktree, no parallelism. §4a is explicit:
*"**No parallelism in this wave.** Units share `modify` paths pairwise — a∩c on `App.vue`,
`usePaneRouter.ts`, `useViewManager.ts`; a∩d on `PaneSlot.vue`; b∩c on `shell.css`."* Each unit commits
before the next opens; a dirty tree at handoff halts the wave (§4b).

**Model law M-23 (`W5.md:151`)**: *"every unit below is an **Opus implementation seat**. No design
content is authored here."* → all five seats are `opus`. The canon strike at X.W5.e applies an
already-ruled disposition (P-1, ADOPT) and authors no new design law.

**Ordered groups**: `[a] → [b] → [c] → [d] → [e]` (five groups of one).

### X.W5.a — Shell truth (composition root · route-true boot · slot registration)

- **Sections**: `W5.md` §3.1 (33-38) · §5 X.W5.a (155-173) · §6 unit a (241-251) · §9 commit 1 (330) ·
  fold §1.A (34-58) · §2a A1-A7 (149-171) · §2b N1/N3/N4/N5/N6/N7/N8 (174-190) · §3 BD-05/07/08/10/12-15 (191-220).
- **Writable**: `demo/color-picker/main.ts` · `index.html` (carve) · `App.vue` (carve) ·
  `composables/boot/useOverture.ts` · `boot/ground.ts` (carve) · `boot/hydrate.ts` ·
  `plugins/vite-ground-tokens.ts` (create) · `vite.config.ts` (carve **+ RS-1 DR-14 delete, :139/:287**) ·
  `demo/color-session/useColorUrl.ts` (carve) · `demo/shell/PaneSlot.vue` · `usePaneRouter.ts` ·
  `useViewManager.ts` · `docs/tranches/V/megatranche/workflows/gates/*.mjs` (create) ·
  `e2e/smoke/page-load.spec.ts` (carve) · `e2e/smoke/walk.spec.ts` (carve) ·
  `docs/tranches/X/waves/W5/born-red/**` (create) ·
  `docs/tranches/X/refinement/X-W5-FOLD.md` (**append-only dated addendum — COHESION §0k.3 S-7**) ·
  fold BD carves: `demo/palettes/usePaletteWiring.ts` (BD-05) · `demo/color-session/picker-color.ts`
  (BD-12) · `demo/color-session/useColorPipeline.ts` · `useColorParsing.ts` (BD-13/14, **paths corrected
  above**) · `demo/shell/dock/ParseEchoReadout.vue` (BD-15, carve) · `demo/shell/PaneHeader.vue`
  (BD-06, `as`/`level` seam only) · `demo/shell/router/index.ts` (BD-08, read-mostly) ·
  `demo/workbenches/extract/{ExtractWorkbench.vue,useExtractSession.ts,useImageQuantize.ts,ImageEyedropper.vue,ExtractPane.vue}`
  (BD-10, N1 deactivation only) · `demo/DESIGN.md` (BD-23, **lines :270/:278 only**).
- **Gates**: A1 · A2 · A4 · A5 · A6 · A7 · N1 · N3 · N4 · N5 · N6 · N7 · N8; **A3 = WITNESS ONLY**.
- **Locks**: §0k.3 **S-1** — `bindPane` narrowed to non-command uses (applyExternalColor / commitEdit /
  cancelEdit); **may not resurrect command dispatch through instance refs**; registry row C-3 is X-W8's;
  A3's cure is X-W8's. §0k.3 **S-7** — ErrorBoundary containment altitude only; the component's bytes are
  X-W7's; the path addendum is this unit's first act. §0k.1 **RS-1** — DR-14 delete rides `vite.config.ts`.
  Fold **GAB-11 KILLED cut-step**: *"retain the left mount callback only for `colorPickerRef`"* **may not
  be followed by any execution seat**. Fold **EB R-1**: EB-4 and EB-2 land **together**. Fold **D-1
  coupled-architecture lock**: simultaneous mode / rAF mirror / loading states move together or not at
  all, and **PaneSlot.vue:12-23 may not be deleted before the out-in re-probe runs**. **AdminListSkeleton
  LOCK** on A7. **DO NOT ADD** (BD-21): `GenericActionBar.vue` · `ActionBarLayer.vue` · `ActionButton.vue`
  — X-W4/X-W8 bounds. Commit 1 carries the born-RED JSON in the **same commit** (§9).
- **Brief**: First act = the dated S-7 addendum-beside at `X-W5-FOLD.md` (BD-07 path corrected to
  `demo/color-picker/ErrorBoundary.vue`), then re-run A2/A3/A6's MEASURE-AT-OPEN probes ONE bounded
  session and commit the BORN-RED JSON. Then: `main.ts` gains `await router.isReady()` + the four CSS
  imports in cascade order (utils → foundation → focus-ring → overture) + `useGlobalDark()` +
  `provideApiClient()` + the error net **above** App (N4/N5); `PaneSlot.onMount` becomes required and
  generic, invoked `(instance, liveKey)`; `usePaneRouter` gains `bindPane(slot)` **narrowed per S-1** and
  renames `interface PaneSlot` (N8) BEFORE any transposition; `App.vue` gains one visible
  `<h1 tabindex="-1">` in `<main>` bound to `VIEW_MAP[currentView].label`, one polite `role="status"`
  route-settlement region, role-named wrapper classes; `useColorUrl`'s boot rewrite → no-op; `ground.ts`'s
  node half → `plugins/vite-ground-tokens.ts`; DR-14 deleted from `vite.config.ts`. A3 closes
  honest-RED, cure booked X-W8.

### X.W5.b — The block law (the shell stops capping the block axis)

- **Sections**: `W5.md` §3.2 (39-41) · §5 X.W5.b (175-186) · §6 unit b (253-262) · §9 commit 2 (331) ·
  fold §1.E (95-101) · §2a B1..B6 (162-164) · §2b N9 (189) · §6c N13 (326) · §6e BD-09/BD-23 (342-348).
- **Writable**: `demo/styles/shell.css` (carve) · `demo/styles/foundation.css` (carve) ·
  `docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs` ·
  `scripts/ci/css-emission-probe.mjs` (BD-09, **create-or-strike**) · `demo/DESIGN.md` (BD-23,
  **lines :11/:37 only**) · `docs/tranches/X/waves/W5/born-red/**`.
- **Gates**: B1 · B2 · B3 · B4 · B5 · B6 · N9 · N13.
- **Locks**: fold W5F-42 **inseparability rider** — recomposition, **never overflow-deletion**; **EB-8
  supersession warning** — the ≈1050 px inline clamp is the invariant and the `position:relative` EB-1
  patch is **banned**. **CC-051's inline-axis half is NOT in scope** (rides CC-056 / V·L3 at X-W6): ratio,
  ultrawide width cap, the 62 Tailwind responsive prefixes, the 4 layout tokens. B5/B6 close **only** by a
  written recorded reading/rationale — absence is the failure. N9 is an **either/or** and the honest
  branch must be recorded (B6's idiom). N13 is an either/or across **all three** sites; the glass half
  rides CE-10's relay, **never a local patch** (glass-ui READ-ONLY, always).
- **Brief**: Re-run `layout-utilization.mjs` for B3's MEASURE-AT-OPEN and bank the BORN-RED JSON. Then:
  `.app-layout` → `min-block-size: 100svh`, `height:100dvh` + `overflow:hidden` deleted;
  `--content-max-h` deleted at its definition **and every consumer** (`shell.css:75`, `PaneSlot.vue:23`
  via a carve request to unit a's landed file, `foundation.css`'s 5, `DESIGN.md`'s 3 — B4 is repo-wide
  exactly so the consumer arm bites); `foundation.css:471`'s width+aspect arm keeps its `--dock-*` rows,
  `:479`'s bare `21/9` arm dies whole; `--app-gutter` born, `--app-padding-x` dies. Extend
  `layout-utilization.mjs` per A-5: assert mode; `docScrollable` + `.pane-container` box + `gridCols`;
  routes += `#/atmosphere`, `#/palettes`, `#/admin/users`; arms += 320×568, 720×450@2. Record B5's
  `CSS.supports('overflow-block','auto')` reading and B6's dock posture **with rationale in `shell.css`**.
  Resolve N9 (create the probe **or** strike both comments) and N13 (strike the pin + both DESIGN lines,
  or relay).

### X.W5.c — One mount, one column (the breakpoint fork dies)

- **Sections**: `W5.md` §3.3 (42-45) · §5 X.W5.c (188-203) · §6 unit c (264-275) · §9 commit 3 (332) ·
  fold §1.B (59-68) · §1.D (80-94) · §2a C1/C3-C8 (159-172) · §2b N2/N10/N11 (175-190) · §6c N12/N14/N15
  (325-329) · §6d C1/C4/C7 (330-341) · §3 BD-01/02/03/04 · §6e BD-22/BD-24.
- **Writable**: `demo/color-picker/App.vue` · `demo/shell/viewSchema.ts` · `demo/shell/usePaneRouter.ts` ·
  `demo/shell/useViewManager.ts` · `demo/shell/PaneSegmentedControl.vue` (**delete**) ·
  `demo/shell/dock/Dock.vue` (carve) · `demo/styles/shell.css` (carve) ·
  `e2e/smoke/dual-pane-1440.spec.ts` · `e2e/smoke/mobile/walk.spec.ts` (carve) ·
  `e2e/smoke/mobile/page-load-mobile.spec.ts` (carve) · fold BD: `demo/palettes/usePalettePorts.ts`
  (BD-01) · `demo/palettes/useSlugMigration.ts` (BD-02) · `demo/palettes/PalettesPane.vue` (BD-03) ·
  `demo/palettes/browser/CurrentPaletteEditor.vue` (BD-04, carve) ·
  `demo/palettes/browser/admin/AdminNamesPanel.vue` (BD-22, **source order only**) ·
  `docs/tranches/X/waves/W5/born-red/**`. **READ/EXECUTE, NO WRITE**:
  `docs/tranches/V/megatranche/audit/visual/states.mjs` (BD-24).
- **Gates**: C1 · C2 · C3 · C4 · C5 · C6 · C7 · C8 · N2 · N10 · N11 · N12 · N14 · N15.
- **Locks**: **§3.4 same-wave lock** — *"X·V PSC deletion + C1 successor same-wave."* **C6 same-commit
  lock** — the T-45 blur carrier is re-seated on the region wrapper **in the same commit** as the
  `.pane-wrapper` cut. **N11 ordering lock** — the three blind state matrices (`forced-colors`,
  `keyboard-focus`, `reduced-motion`) are captured at ≤639 px **BEFORE** the deletion commit, or the hole
  is recorded permanent at the G-F register; adding the arm after the deletion is a **false green**.
  **C4 REFUSAL (PSC-1)** — no `semantics="tabs"` interim patch; baseline pinned at exactly **1** render
  site; the close **states** that X-W10's Ad-18 marker (`W10.md:117/:354`) is spent by this deletion.
  **C7 PSC-21 canary rider** — the comments naming `css-emission-probe.mjs` are corrected or the probe
  restored **in the same edit** (coordinate with unit b's N9 branch); the **27 capability queries**
  (`prefers-*`, `forced-colors`, `print`, `pointer`, `hover`) **MUST survive**. **C3 BACK-GATE** —
  green C3 is necessary, not sufficient; **C3 may not close while Dock G-L is RED** (measured RED today:
  `useMediaQuery` count **2**); run G-L's source arm read-only and record, **write nothing in
  `Dock.vue:71`'s predicate that belongs to X-W8**. **N10 carve lock** — the `walk.spec.ts` correction
  **must not touch `:103/:113`** (AboutPane's only live coverage). **C1 A-4 lock** — *"Neither half may
  be re-litigated alone"*; no close may cite the D-15 zoom-200 kill while C1 is RED.
- **Brief**: `App.vue` collapses to one mount path; `viewSchema.ts` replaces `left`/`right`/
  `defaultPaneIndex` with an ordered `regions[]` of semantic roles (stage / inspector / action);
  `usePaneRouter` + `useViewManager` re-typed against it (N14: the declaration-site census is **printed**
  in the close); every `useBreakpoint`/`isDesktop`/`isMobile`/`mobilePaneIndex` **layout** fork deleted
  (38 → 0 at layout sites); `PaneSegmentedControl.vue` deleted **with** the Dock Picker|Blob toggle and
  **with** its C1 successor in the same wave; the T-45 carrier re-seated in the same commit as the
  wrapper cut; the `as ViewId` cast and the three `setActiveTab("saved")` literals typed away (N2/N12);
  the three e2e specs re-pointed from amputation assertions to presence assertions preserving the
  content-landmark proof shape (both directions plus return); `AdminNamesPanel` mobile source order →
  selector before query (N15). Re-run C1/C2/C5's MEASURE-AT-OPEN in ONE bounded session first and bank
  the BORN-RED JSON.

### X.W5.d — Scene motion (defined transitions on a measured budget)

- **Sections**: `W5.md` §3.4 (46-48) · §5 X.W5.d (205-218) · §6 unit d (277-285) · §8 (306-322) ·
  §9 commit 4 (333) · fold §1.F (102-110) · §2a D3/D4/D5 (169-171).
- **Writable**: `demo/styles/animations.css` (carve) · `demo/styles/shell.css` (carve) ·
  `demo/color-picker/App.vue` (**class names only**) · `demo/workbenches/mix/MixSourceSelector.vue`
  (carve) · `demo/shell/PaneSlot.vue` ·
  `docs/tranches/V/megatranche/workflows/gates/scene-swap-budget.mjs` (**create**) ·
  `e2e/smoke/perf/view-switch-frame-budget.spec.ts` (carve) · `docs/tranches/X/waves/W5/{born-red,green}/**`.
- **Gates**: D1 · D2 (verify-only, GREEN) · D3 · D4 · D5.
- **Locks**: **standing preserve-animations edict** — motion declarations are **added, never deleted**;
  a budget met by deleting the animation is caught by D3/D4, *"the two gates are adversarial by
  construction."* **Sequenced strictly after X.W5.c commits** (the class names it re-keys are c's
  output). **D3 direction arm** (fold W5F-45/NEW-DU-5): a region-role re-key that leaves mobile forward
  and back **motion-identical** has not cured the row — today `App.vue:77` gives every mobile wrapper
  `--left` so `--right`'s geometry is unreachable by construction. **D4 fragment cure-note** (MSS-17):
  `<template v-if>` cannot host `<Transition>`; each branch needs a single root; a `TransitionGroup` on
  the inner list does **not** satisfy the gate. **D5** — the caught/recovered swap **is** a pane swap and
  is in scope; no new scroll-driven or `animation-timeline` declaration may slip the guard at
  `animations.css:184-192` (that escape is X-W10's CC-099). **D2 is verify-only** — GREEN at open, do not
  re-cite it as cured here.
- **Brief**: Re-key the `vj-enter` pane family off `.pane-wrapper--left`/`--right` (18 physical-name
  sites: `animations.css` 12, `shell.css` 3, `App.vue` 3) onto region-role selectors, with **every**
  region role in `regions[]` carrying a matching enter/leave rule and forward/back distinguishable on
  mobile. Wrap `MixSourceSelector.vue`'s `:114` mode swap in a named `<Transition>` with a direction
  token, each branch a single root. Create `workflows/gates/scene-swap-budget.mjs` and run the four
  measured hops (`→/gradient`, `→/mix`, `→/extract`, `→/generate`) before and after, asserting
  `over32/frames ≤ 0.15` **and** `median ≤ 20 ms` per hop; commit both outputs. Re-point
  `view-switch-frame-budget.spec.ts` to the region-keyed swap. Hold D5 under a forced-PRM run.

### X.W5.e — The Browse/Library posture strike (P-1 applied, never re-queued)

- **Sections**: `W5.md` §3.5 (49-51) · §5 X.W5.e (220-231) · §6 unit e (287-292) · §7 (`git diff --check`,
  301) · §9 commit 5 (334) · fold §1.G (111-117) · §2a E1/E2 (172) · §6d E1/E2 (336).
- **Writable**: `docs/tranches/V/VISUAL-CONSTITUTION.md` (carve) · `docs/tranches/V/EVIDENCE.md` (carve) ·
  `docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md` (carve) ·
  `docs/tranches/V/research/proportion-register.md` (carve).
- **Gates**: E1 · E2.
- **Locks**: **the witness is READ-ONLY** — `registry/adjudicated/**` and `registry/DEFECT-LEDGER.md`
  quote the defect; *"a repo-wide gate would reward destroying the witness."* **P-2 citation discipline**
  — each replaced sentence names `CONSTELLATION.md` **P122** as the source of
  `66.6666667% / 33.3333333%`, **never restating the constant as independently derived**; a bare exact
  number with no citation *"trades one fabrication for another."* **CC-052 is apply-never-requeue.**
  Fold §6d/W5F-75 **AB-11**: the shipped default (49.1/49.1, `shell.css:133-136`) matches **no** ratified
  posture, so *"restore the ratified band" is not an admissible cure and `regions[]` is the only one*.
  Fold §2a **survival clauses** (one-Card-shell, `:54` selection seat, OPTICAL-BENCH sequence + boundary
  inventory) and the **no-chassis lock** — a "bespoke composition" cure may not re-import CC-108's corpse.
- **Brief**: In the four normative documents replace the `64%…66.6666667%` / `33.3333333%…36%` tolerance
  (7 occurrences: `VISUAL-CONSTITUTION.md:44,45` · `EVIDENCE.md:43,47` · `OPTICAL-BENCH-COMPOSITIONS.md:39,40`
  · `proportion-register.md:35`) with **one exact posture** — the preview-dominant pair
  `66.6666667% / 33.3333333%` when an inspector is selected, **100 % protagonist when none is** — each
  occurrence citing `CONSTELLATION.md` P122 by name as its source. Change **no** adjudication or defect
  record. Close with `git diff --check`.

### Wave-level cadence (`W5.md` §7) and artefacts (§8)

After each unit's integration batch and before close: `npm run typecheck` (the paired arm for C4 and C8)
· `npm run lint` · `npm run test` (**the library suite must not move — a delta means the wave escaped
its bounds**) · `git diff --check` for unit e. **`npm run gh-pages` is NOT this wave's gate** (the build
and deploy arms are X-W1's CC-032/CC-034); running it here produces no evidence W5 may cite.
Artefacts saved at close, all committed (`git add -f` past `.gitignore:34` for PNGs; **L-7 — an
uncommitted witness does not exist**): `waves/W5/born-red/` · `waves/W5/green/` · `audit/visual/layout/`
· `audit/probes/app-wave/pi/` · the scene-swap-budget output pair · the **D-E portal-integrity delta**
(body-direct-children positioning census + `[data-paper-field]` ancestry of a portalled dialog,
identical before/after — **mandatory on any `index.html` body change**, i.e. binding on unit a) · the B5
`CSS.supports` reading and the B6 dock-posture rationale quoted in the close report.

### Triumvirate triggers (`W5.md` §3a) — orchestrator may not redispatch a failing unit alone

Any write outside §4 (in particular `src/`, `api/`, `demo/workbenches/**` interiors beyond the two named
motion sites, or any `node_modules/@mkbabb/glass-ui/**` path — *"a cure that needs a glass byte is a
letter, not an edit"*) · A1 (the `isReady()` await reintroduces a boot stall on any of the fourteen
routes) · C1 (text-parity ratio still < 0.9 after the fork dies) · C5 (WebGL context identity lost
despite one mount path) · D1 (frame budget unmet after the transition re-key) · any third
diagnose→edit→re-measure iteration on the b3/b4 overture arm, the T-45 carrier re-seat, or the
frame-budget oracle's own flake.

### L-18 rider (`W5.md` §12), referenced so no close claims it was unforeseen

Implementation is not ACCEPTED on gates alone: after the gates are green the landed work must survive
**two quartet challenge passes** (4 Opus skeptics per pass, then a fresh Fable apotheosis over their
findings) before the wave may be marked ACCEPTED. A gate the challenge shows to be unfalsifiable is
struck and re-authored and the wave returns to IMPLEMENTED. Run under `FORMATION-LAWS` L-18, not by this
file.

---

## Unit receipts

_(empty at open — each unit appends its own receipt here, line 1 = its SERVED MODEL declaration)_
