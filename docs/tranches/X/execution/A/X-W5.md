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

### X.W5.a

SERVED MODEL: claude-opus-5[1m]

**Unit**: Shell truth — the composition root, route-true boot, slot registration.
**Status**: **DONE** with three named honest-RED residuals, each measured and each with a
stated owner. **Commits**: `c0cf27bf` (the S-7 addendum, this unit's first act) · `de99ec15`
(§9 commit 1 — unit a + the born-RED JSON in the same commit) · this record.

#### Act 0 — crash-recovery (STANDING LAW)

⟨cmd⟩ `git status --porcelain` at open →
`M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh`. **Zero inside this
unit's writable set.** `CARRY-LEDGER.md` is not in W5's §4 nor any unit's set; `scripts/dev/dev.sh`
is the unowned standing-dirty row (§0j.A **DR-24** — NEVER touched, never staged). **No inherited
partial work on X.W5.a exists**; nothing was stashed, restored or reverted.

#### Act 1 — the FIRST act: the dated S-7 addendum-beside (`c0cf27bf`)

`X-W5-FOLD.md` **§9**, append-only (E-3; §§0–8 bytes stand). It mints no row, gate or cure.
**§9a** carries COHESION §0k.3 **S-7** verbatim and corrects **BD-07** to
`demo/color-picker/ErrorBoundary.vue` — ⟨cmd⟩ `find demo -name 'ErrorBoundary*'` → one hit;
⟨cmd⟩ `test -f demo/shell/ErrorBoundary.vue` → **NO**. **§9b** records three further §3/§6e path
spellings measured the same way, under the METHOD law for a drifted anchor (*intent at the true
bytes, recorded*) and under the precedent this wave record already set for BD-13/BD-14:

| BD | as written | the path that exists | written by this unit? |
|---|---|---|---|
| BD-05 | `demo/palettes/usePaletteWiring.ts` | `demo/color-picker/composables/usePaletteWiring.ts` | **no** — W5F-14 dies with the X-W8 registry; recorded so the row is not lost to a bad path |
| BD-06 | `demo/shell/PaneHeader.vue` | `demo/shared/ui/PaneHeader.vue` | yes — the `as`/`level` seam ONLY |
| BD-10 | `…/extract/{useExtractSession,useImageQuantize}.ts`, `…/extract/ImageEyedropper.vue` | `…/extract/composables/…`, `…/extract/ImageEyedropper/ImageEyedropper.vue` | yes — N1's deactivation teardown ONLY |

#### Act 2 — MEASURE-AT-OPEN, ONE bounded probe session (§5.2)

Dev server `npx vite --port 9000`; three probes, read-only, before any product byte moved.
The app-wave probe was run **unmodified** (W5.md §4: *execute, no write*).

- **A2/A3/A6** ⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/app-wave/app-shell-truth-probe.mjs`
  → `deeplinkGenerate.marks = [b0,b1,b2]` · `blob:false` ·
  `href …/#/generate?space=lab&color=lab(92%25+88.8+20+/+82.7%25)` · `h1:0` ·
  `mobileRegen390 {dockChanged:false}` vs `desktopRegen1440 {dockChanged:true}`.
  **All three REDs of record reproduce byte-for-byte.**
- **A5/A6/A7** ⟨cmd⟩ `node …/workflows/gates/route-scene-truth.mjs` (created here) → exit **1**;
  15 routes walked; `h1:0` everywhere; outline begins at level **3**; `shellStatusCount:0`;
  `A7 {statusAnnounces:false, h1Distinct:false, mainNameTracksScene:false}`.
- **A3's fold arms** ⟨cmd⟩ `node …/workflows/gates/dock-action-parity.mjs` (created here) → exit
  **1**; the **720×900 arm (≡ 1440 @ 200 %)** reproduces the MOBILE reading, confirming ⟨Dock G-I⟩
  from this end; `unconditionalPaneFlip:true`; `boundSlots 2 of 3 paneSlots`.

Banked in `docs/tranches/X/waves/W5/born-red/` with `STATIC-2026-09-19.md` (the static slate
re-run and dated, every figure double-run). All of it entered git in **`de99ec15`**, the same
commit as the cure, per §9.

#### Act 3 — the landings (`de99ec15`, 34 files, no sibling path touched)

1. **`main.ts` — the composition root (A1).** `await router.isReady()` before `mount` (in an async
   IIFE, so the entry needs no build-target concession); the four side-effect CSS imports in
   cascade order; the dark store and the API client installed at APP level (`app.provide`);
   the error net. ⟨cmd⟩ A1's own `node -e …` → exit **1 → 0**; ⟨cmd⟩
   `grep -cE 'useGlobalDark|provideApiClient|^import "\.\./styles' demo/color-picker/App.vue`
   → **7 → 0**.
2. **The error net + per-pane containment (N4/N5).** `errorHandler` + `window.error` +
   `unhandledrejection` above App; `<ErrorBoundary>` moves from ONE wrapper around the grid to
   one per pane seat, OUTSIDE `<KeepAlive>` (⟨EB R-7⟩ kills the cached-boundary cure) — and the
   fallback now paints inside `.pane-container`'s positioned box, so EB-1's zero-ink plate is
   cured BY the transposition and not by the banned `position:relative` patch (EB R-1 honoured:
   EB-4's loading/containment altitude and EB-2's transposition land together).
3. **Result totality (N4).** Measured first, cured second: ⟨cmd⟩ node over the built library →
   `parseCssColor("oklch(0.6 0.2 none)")` **ok**, `serializeCssColor` **ok**
   (`"oklch(60% 0.2 none)"`), `convertColor(…,"hsv")` **NOT ok** (`color_missing_channel`). So the
   render path resolves a missing component per **CSS Color 4 §4.2** — the specification's own
   law, not a swallow — and `channelIsMissing`/`alphaIsMissing` carry the distinction to the echo,
   which now prints `h none` / `α none` instead of a confident `0` / opaque. `valueOrThrow` is
   **0 on all five render-path readers**, surviving only in `buildColor`'s construction switch.
   ParseEchoReadout's three permanently-true `v-if` guards die (⟨A-4⟩'s lock).
4. **Typed registration (A4/N3/N7/N8).** `PaneSlot.onMount` required + generic, invoked
   `(instance, liveKey)`; `bindPane(slot)` at all three seats, narrowed per **S-1**;
   `interface PaneSlot` → **`ResolvedPane`** *before* any transposition; the prop bags derived
   from each pane's own `$props`; `PANE_CACHE_MAX` derived from `VIEW_MAP`.
5. **One route, one voice (A5/A7/N6).** Visible `<h1 tabindex="-1">` in `<main>` bound to
   `VIEW_MAP[currentView].label`; `<main aria-labelledby>` names itself BY it; one polite
   `role="status"` route-settlement region (the **AdminListSkeleton LOCK** is carried in the
   template's own comment and asserted nowhere as a load-completion cure); role-named
   `--stage`/`--inspector` wrappers with `role="region"` + the previously-unused
   `leftLabel`/`rightLabel`; role-keyed stagger in the scoped block (the two inline
   `--overture-appear-delay` declarations are gone, so D3's re-key does not have to move it);
   the leaving pane `inert` + `aria-hidden` across the overlap.
6. **A2's two arms in `useOverture`** — the **b3 STATE-CHECKED arm** (settlement is read as a
   state in `PaneSlot`, because `@after-appear` can never fire for a chunk that resolves after
   mount) and the **b4 TERMINAL `unavailable` arm** (a scene with no ornament seat terminates the
   beat instead of sitting `pending` for the session).
7. **A6** — the dead boot apply deleted, the sync ARMED ON MOUNT, either half of the address read.
8. **N1** — the activation contract stated FIRST in PaneSlot's header, and `onDeactivated` at all
   four orphaned sites; only the eyedropper's key listener re-arms on `onActivated` (a parked pane
   never silently re-acquires a device).
9. **`ground.ts` split by lifetime** → `plugins/vite-ground-tokens.ts`; **DR-14 DELETED** per
   §0j.A + §0k.1 **RS-1** (⟨cmd⟩ `grep -c siblingFsAllowTransient vite.config.ts` **2 → 0**),
   measured dead at the installed bytes (no `fonts/` at the package root, zero `url("../fonts`
   refs in its dist); **`index.html`** mounts into `<div id="app">` inside the body with BOTH
   stamps intact; `hydrate.ts`'s false rationale corrected; `DESIGN.md` `:270`/`:278` re-pointed;
   the two `e2e/smoke` specs re-pointed onto the route voice.

**The D-E portal-integrity delta (§8, mandatory on an `index.html` body change)** — captured
BEFORE and AFTER with `workflows/gates/portal-integrity.mjs`, same session:
`{bodyKeepsPaperField, bodyKeepsRelative, bodyIsPositioningAncestor, everyBodyChildUnderField,
portalParent:"body", portalFieldAncestorIsBody, portalPositioningAncestorIsBody}` — **identical,
all true, both sides**. The one structural difference is the intended one
(`mountHostIsBody: true → false`).

#### Gate readings BEFORE → AFTER

| gate | BEFORE | AFTER | verdict |
|---|---|---|---|
| **A1** | exit 1 · App count 7 | exit **0** · **0** | **GREEN** |
| **A2** | `[b0,b1,b2]` terminal · blob false | **`[b0,b1,b3,b2,b4]`** on the deep link and on all 15 routes | **marks arm GREEN · blob arm RED** (residual 3) |
| **A3** | `{mobile:false, desktop:true}` | **unchanged BY RULING** (§0k.3 S-1); `unconditionalPaneFlip` **true→false**, `everySlotReports` **false→true (3/3)**, `dockCommandRegistry` **false** | **honest-RED, cure X-W8** |
| **A4** | `bindPane` 0 hits · props seam 1 | **12** hits · **0**; one argument deleted → `vue-tsc` **exit 2** (`TS2554 Expected 1 arguments, but got 0`) | **GREEN, bite proven** |
| **A5** | `h1:0` on 15 routes | **15/15**: one visible h1, `main===1`, text ≡ `VIEW_MAP[view].label`, `tabindex="-1"` | **GREEN on 4 of 5 arms** (residual 1) |
| **A6** | `?space=lab&color=…` on both classes | **no `?space=` on any of 15**; URL-echo applies on `jzazbz`·`display-p3`·`rec2020` | **GREEN** |
| **A7** | `statusAnnounces:false · h1Distinct:false · mainNameTracksScene:false` | **all five arms true** | **GREEN** |
| **N1** | 0 `onDeactivated`, 4 orphaned teardowns | **4 sites cured + 1 re-arm**; contract published in PaneSlot's header | **GREEN** |
| **N3** | keys `"onCommit-edit"`/`"onCancel-edit"`, seam `Record<string, unknown>` | delete → **TS2741**, typo → **TS2561 "Did you mean to write 'onCommitEdit'?"**, both quoting **PalettesPane's own emits** | **GREEN, bite proven both ways** |
| **N4** | `valueOrThrow` on every render-path reader; boundary inside App | **0** on all five; net above App | **GREEN** |
| **N5** | 1 carrier over the whole grid | **3**, per seat, outside KeepAlive; fallback paints in the positioned box | **GREEN on 3 of 4 arms** (residual 2) |
| **N6** | no wrapper/role/aria; `<main>` static name | region roles + names; `aria-labelledby`; leaving subtree `inert` + AT-hidden | **GREEN** |
| **N7** | `:max` literals 9 / 6 / 4 | **0 literals** — `PANE_CACHE_MAX` derived from `VIEW_MAP` | **GREEN** |
| **N8** | 1 | **0** (`ResolvedPane`) | **GREEN** |

#### Cadence (§7)

⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0**. ⟨cmd⟩ `npx eslint demo/ plugins/
vite.config.ts e2e/ docs/tranches/V/megatranche/workflows/gates/` → **exit 0, zero problems**
(the repo-wide `npm run lint` carries **23 pre-existing parse errors, all in
`docs/tranches/**` workflow chassis scripts**, none in this unit's scope and none introduced
here). ⟨cmd⟩ `npx vitest run` → **15 failures / 613 passing**, and **not one failing file has an
import path to a file this unit touched** (`test/gradient-parse` · `test/spectrum-luma` — its own
name says BORN-RED · `test/v4-c1` · `test/v4-css-emerging` — the X·P parser band ·
`demo/test/shell/reka-binding-idiom` — a declared canary for `SearchFilterBar`, X-W7's). The four
suites that **do** consume this unit's modules (`preview-chips`, `gamut-verdict`,
`value-domain-clamp`, `view-accents`) → **48/48 passing**. `npm run gh-pages` NOT run (X-W1's).

#### E13 mail

Delta sweep at this unit's own clock, four paths, ⟨cmd⟩
`find <each> -maxdepth 1 -type f -newermt "2026-09-19 08:00"` → exactly **one** hit,
`docs/tranches/V/coordination/INBOX.md` (self-excluded; a sibling seat's sweep line). Register
arithmetic ⟨cmd⟩ `grep -cE '\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **80**, tail unmoved at
**I-35 / O-40**. The four `UNREAD` string hits are **prose inside sweep paragraphs, not Status
cells** (lines 221 · 227 · 231 · 241), reproducing seat 0's reading exactly.
**0 unrowed · 0 UNREAD in X.W5.a's scope · 0 `I-n` minted · `INBOX.md` unedited by this unit.**

#### Residuals — RED, each measured, each with an owner

1. **A5's outline arm, RED on 4 of 15 routes** (`picker`, `palettes`, `mix`, `blob`; the other 11
   are outline-clean). Cause located exactly: one `<h3 class="card-title readout">` in
   `demo/picker/` — the colour VALUE readout, styled as a heading. The pane-title half WAS this
   unit's and landed (`PaneHeader` emits `<h2>` through the BD-06 `level` seam, so the document
   now reads h1 → h2). `demo/picker/**` is outside this unit's writable set; the cure is one line
   for its owner: a value readout is not a heading.
2. **N5's route-reset arm, RED.** Three arms are green. The fourth is not curable at the
   CONTAINMENT ALTITUDE, which is all **§0k.3 S-7** grants X-W5: keying the boundary on the route
   remounts `PaneSlot` and destroys every `<KeepAlive>` cache and WebGL context on every
   navigation, and the only other shape — caching the boundary inside `<KeepAlive>` — is KILLED by
   ⟨ErrorBoundary **R-7**⟩. A route watch inside the component's bytes is the cure and those bytes
   are **X-W7's**, by S-7's own words.
3. **A2's blob arm, RED and structurally unsatisfiable as authored.** `.hero-blob-anchor` exists
   only in `ColorPicker.vue`, and `VIEW_MAP` places no `color-picker` pane on any of the five
   routes the arm names (`/#/generate`, `/#/browse`, `/#/gradient`, `/#/extract`,
   `/#/atmosphere`). Measured this pass: `blob:true` on exactly the four picker-bearing routes,
   `false` on the eleven others. The gate's other arm is GREEN everywhere. **ESCALATED as a
   gate-authoring finding** (L-18's class: a gate shown unfalsifiable is struck and re-authored) —
   not re-authored here, because a spec is not a seat's to rewrite.
4. **`provideApiClient()` is now unreferenced.** The composition root installs the client with
   `app.provide` because `provide()` requires a component instance and
   `demo/platform/transport/useApiClient.ts` is outside this unit's writable set. The symbol is
   still exported and `API_CLIENT_KEY` is still consumed by `test/dock-status-lamp.test.ts`.
   `demo/platform/transport/**` is claimed by **no** X wave (fold W5F-60 / §4 CE-6) — recorded so
   the deletion is not lost.
5. **Observation, not a claim**: `afterHashNavHome` re-acquires `?space=…&color=…`. It follows a
   user NAVIGATION, not a boot; A6's scope is the boot ("fresh context, bare `/#/` and
   `/#/generate`"), which is green on all fifteen routes. The live sync is deliberately left
   alive — killing it would be over-cured by A6's own falsifier.

#### Locks honoured, each by name

**§0k.3 S-1** — `bindPane` narrowed to `applyExternalColor`/`commitEdit`/`cancelEdit`; the
scene-COMMAND registry stays exactly where X-W4 authored it (the two desktop seats), registry row
C-3 unclaimed, A3 closed honest-RED. **§0k.3 S-7** — ErrorBoundary ALTITUDE only; **zero bytes**
written inside `demo/color-picker/ErrorBoundary.vue` (⟨cmd⟩ `git show --stat de99ec15` does not
name it); the dated path addendum was this unit's first act. **§0k.1 RS-1** — DR-14 deleted, both
sites, riding `vite.config.ts`. **GAB-11's KILLED cut-step** — not followed: registration is
UNIFORM across all three seats, so no seat is "the left mount callback retained only for
`colorPickerRef`". **EB R-1** — EB-4 and EB-2 landed together. **D-1 coupled-architecture lock** —
the simultaneous mode, the rAF mirror and the loading states were not moved; `PaneSlot.vue:12-23`
was **NOT deleted** (its bytes stand and the four false claims are corrected in an appended block
beside them, the E-3 idiom applied to a comment). **AdminListSkeleton LOCK** — the `role="status"`
region is a route-settlement node and is asserted as nothing else. **BD-21 DO-NOT-ADD** —
`GenericActionBar.vue`, `ActionBarLayer.vue`, `ActionButton.vue` untouched. **§9** — the born-RED
JSON entered git in the same commit as the cure. **DR-24** — `scripts/dev/dev.sh` never touched,
never staged.

### X.W5.b

SERVED MODEL: claude-opus-5[1m]

**Unit**: The block law — the shell stops capping the block axis.
**Status**: **DONE** with one named honest-RED gate (B3) and three residuals, each
measured and each with a stated owner. **Commits**: `adc312f6` (§9 commit 2 — unit b +
the born-RED JSON in the same commit) · this record.

#### Act 0 — crash-recovery (STANDING LAW)

⟨cmd⟩ `git status --porcelain` at open →
`M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M docs/tranches/X/execution/D/X-P-W4S.md` ·
`M docs/tranches/X/keyframes/evidence/W12/KF-W12-d-born-red.md` · `M scripts/dev/dev.sh`.
**Zero of the four is inside this unit's writable set.** The two `docs/tranches/X/…` rows are
Track D's and the keyframes band's (sibling seats — untouched, and both had been committed by
their owners before this unit's commit); `CARRY-LEDGER.md` is in no unit's set; `scripts/dev/dev.sh`
is the unowned standing-dirty row (§0j.A **DR-24** — NEVER touched, never staged). **No inherited
partial work on X.W5.b exists**; nothing was stashed, restored or reverted.

#### Act 1 — E13 Step-0, the four-path mail sweep

⟨cmd⟩ `find <each of the four paths> -maxdepth 1 -type f -newermt "2026-09-19 09:00"` → **zero
hits on all four** (unit a's 08:00 delta had found exactly one, its own `INBOX.md` sweep line).
Register arithmetic ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **80**; tail unmoved at
**I-35 / O-40** ⟨cmd⟩ `grep -oE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md | tail -3` → `O-38 · O-39 · O-40`.
⟨cmd⟩ `grep -nE '\| \*{0,2}UNREAD' INBOX.md` → **4**, all four at lines 221 · 227 · 231 · 241 and all
four **prose inside `**Sweep …**` paragraphs, not Status cells** — seat 0's and unit a's reading
reproduced a third time. **0 unrowed · 0 UNREAD in X.W5.b's scope · 0 `I-n` minted · `INBOX.md`
unedited by this unit.**

#### Act 2 — MEASURE-AT-OPEN (B3), one bounded probe session, before any byte moved

The instrument's identity was preserved on purpose: `layout-utilization.mjs` runs **WebKit** and the
MT-F028 / M-13 baseline its numbers are compared against was taken on WebKit, so switching engine
would have moved the baseline silently. Engine of record **WebKit 26.4**, `PROBE_BASE=http://localhost:9000`.

1. ⟨cmd⟩ `node docs/…/probes/layout-utilization.mjs` (**unmodified**, the M-13 table) — run first,
   so the extension could not be accused of manufacturing the baseline.
2. The A-5 extension was then written (instrument bytes only — no product byte had moved), and
   ⟨cmd⟩ `node …/layout-utilization.mjs --json` banked the born-RED at
   `docs/tranches/X/waves/W5/born-red/B1-B2-B3-layout-utilization-2026-09-19.json` (80 cells).

**B3's RED of record reproduces byte-for-byte.** At 3440×1440, `.pane-container` measures
**608 × 1340.5** → `608 ÷ 1340.5 = ` **45.4 %** — the number `W5.md:259` carries, and the token
behind it read `clamp(30rem, 62dvh, 38rem)` from the bare 21/9 arm, exactly as the fold states.
Independently confirmed before the extension existed, by a one-off read of the same boxes
(`pane-container 1050 × 608`, `main 1341`, uncapped natural height 1317).

The two arms A-5 added earned their place at once: **320×568** showed **7 of 10 routes carrying
content beyond the viewport with NONE of them scrolling**, a far sharper B1 witness than 390×844
(which had exactly **1**); **720×450@2** showed all ten routes content-exceeding and none scrolling.

#### Act 3 — the cure (`adc312f6`)

Every anchor was verified at the true bytes first; two had drifted and are recorded with INTENT
applied at the true bytes (W5.md's `foundation.css:471/:479` are `:484/:492` today; `DESIGN.md`'s
three cap lines are `:298/:364/:379`, not `:292/:358/:373`).

1. **`.app-layout` (B1).** `height: <full-viewport dynamic unit>` and `overflow: hidden` **deleted**;
   **`min-block-size: 100svh`** added; `padding` re-pointed to `--app-gutter`. `svh` and not the
   dynamic rung, with the reason written at the site: the dynamic unit re-measures as mobile chrome
   collapses, so a floor written in it reflows the grid mid-gesture.
2. **The cap token (B2/B4).** Deleted at its `:root` definition, at **both** `@media` re-pins and at
   its consumer `max-height` on `.pane-container`. `foundation.css`'s width+aspect arm **keeps its two
   `--dock-*` rows**; the bare ultrawide aspect-only arm, which set nothing but the cap, **dies whole**.
3. **`--app-padding-x` → `--app-gutter`**, at the definition and at both consumers.
4. **N9 — the canary comments struck**, both sites, in the same edit that touches the rules (the
   PSC-21 rider's own requirement).
5. **N13 — the `--select-font` pin deleted**, both `DESIGN.md` lines corrected, in one commit.
6. **B5 and B6 written in at their sites** with the reading and the rationale.

**The inline axis was not touched.** `.pane-container`'s `max-width: min(…)` clamp — the owner-ruled
≈1050px invariant — stands byte-for-byte apart from the token rename inside it, and the banned
`position: relative` EB-1 patch is not used anywhere. CC-051's inline half was not entered.

#### The locks, each by name

**W5F-42 INSEPARABILITY RIDER** — honoured as a **recomposition**: the cap and the frame came down
in **one commit**, because every pane's inner scroll-well was bounded through that single chain.
Deleting `overflow` alone would have left the wells bounded by a cap whose frame no longer existed.
The reflow the rider predicts was then **measured** (residual 1 below), not assumed.
**EB-8 SUPERSESSION WARNING** — the ≈1050px inline clamp survives; the `position:relative` EB-1
patch is banned and unused. **CC-051's inline half** — untouched: ratio, the ultrawide width cap, the
Tailwind responsive prefixes and the four layout tokens were not entered; `--app-gutter` is a rename
of an existing token at its own definition, not a new inline-axis decision.
**B5/B6 close only by a written recorded reading/rationale** — both are written into `shell.css` at
the site they govern, not into this record alone.
**N9 either/or with the honest branch recorded** — recorded at the site and in full below.
**N13 either/or across all three sites, glass half never a local patch** — all three moved together;
`node_modules/@mkbabb/glass-ui/**` was read and **never written**.
**DR-24** — `scripts/dev/dev.sh` never touched, never staged. **Pathspec** — `adc312f6` names its six
paths on the commit itself; ⟨cmd⟩ `git show --stat` lists exactly those six and no sibling path.

#### B5 — the recorded reading (the gate's own command, both shipping engines)

⟨cmd⟩ `node -e "…CSS.supports('overflow-block','auto')…"` run in both engines at `about:blank`:

| reading | Chromium 148.0.7778.96 | WebKit 26.4 |
|---|---|---|
| `CSS.supports('overflow-block','auto')` | **TRUE** | **TRUE** |
| `CSS.supports('overflow-inline','auto')` | TRUE | TRUE |
| `CSS.supports('min-block-size','100svh')` | TRUE | TRUE |
| `CSS.supports('height','100svh')` | TRUE | TRUE |

**DECISION: the logical spelling ships** — `min-block-size`, not `height`. The gate's "if false"
branch (physical spellings ship, logical form BANKED with a re-trigger) **did not fire**, so nothing
is banked and no physical fallback is authored. The reading is pasted into `shell.css` at the
`.app-layout` site, not only here. The same reading is carried per-cell in the born-RED JSON
(`b5Support`), so it is re-derivable from the artefact rather than only quoted.

#### B6 — the recorded posture, decided by probe at 390 with a scrolled document

⟨cmd⟩ a bounded WebKit run at **390×844**, six member routes, each loaded and then scrolled to the
document end:

| route | doc scrollHeight / clientHeight | scroll available | band top before → after | band leaves viewport |
|---|---|---|---|---|
| `#/gradient` | 1003 / 844 | **159 px** | 16 → **−143** | **yes** |
| `#/` · `#/browse` · `#/generate` · `#/palettes` · `#/admin/users` | 844 / 844 | 0 px | 16 → 16 | no |

Elements intersecting the band's box when scrolled: **0 on every route**. Computed band posture
today: `position: relative`, `z-index: auto`.

**DECISION: the dock band stays IN FLOW** — not sticky, not fixed, minting no z-index. Three reasons,
written into `shell.css` at the `.dock-band` site: (1) T-31's band law (owner-verbatim) retired the
fixed overlay, the padding reservation and the load-bearing z-dock together, and the invariant it
bought is that *occlusion of the dock by any card is impossible by construction* — a sticky band
overlaps row 2 the moment it sticks, needs a z-index and a paint order, and re-opens the exact
single point of failure the law closed; (2) the measured cost is backwards — one route of six scrolls
at all, by 159 px, so a sticky band would spend ~88 px of an 844 px viewport permanently to save an
88 px gesture; (3) the band carries the glass material, and stuck over moving content it re-samples
its backdrop every frame, on the very surface the T-45 seat exists to keep cheap.
**A RE-TRIGGER IS BANKED at the site**: X.W5.c collapses every route to one scrolling column at 390
(gate C1 expects per-route text ~69 → ~893 chars); when that lands the probe is re-run, and if the
median route then scrolls more than about one viewport, reason (2) inverts — reason (1) does not
move, so the cure would be a dock that returns on scroll-up, never one permanently stuck.

#### N9 — the honest branch, recorded (B6's idiom)

⟨cmd⟩ `ls scripts/ci/` → `boot-smoke.mjs · oracle-slate.mjs · verify-packed-surface.mjs`. ⟨cmd⟩
`find . -name 'css-emission-probe.mjs' -not -path './node_modules/*'` → **nothing**. ⟨cmd⟩
`grep -n 'css-emission' .github/workflows/*.yml` → **no hit**. ⟨cmd⟩ package scripts → no
`css-emission-probe` entry. ⟨cmd⟩ `git log --diff-filter=D -- scripts/css-emission-probe.mjs
scripts/ci/css-emission-probe.mjs` → **`6d6d3521`** (`chore(v-w42)!: prune proof-theater, orphaned
probes, design residue`). The probe was pruned with the proof-theater; the two stylesheet comments
citing it as the guarantor of these rules outlived it.

**BRANCH TAKEN: STRIKE.** Two measured reasons: (i) the restore branch's *"and runs in CI"* half is
**unreachable from this unit's writable set** — `.github/workflows/ci.yml` and `package.json` are
outside it, so a restored file would be a script nothing runs, which is the same ungated claim in a
new place, and writing those two files would have been an out-of-set write (an escalation, not a
cure); (ii) the rules the canary claimed to guard are themselves **scheduled to die** — the
`[data-layout]` display witnesses go with the breakpoint fork at X.W5.c (C3/C7), so a probe minted
now would gate bytes the next unit deletes. `scripts/ci/css-emission-probe.mjs` was in this unit's
writable set and was **deliberately not created**; the create-or-strike row BD-09 closes on strike.
The struck path is quoted **here**, in the record, and deliberately **not** re-spelled in either
stylesheet, so that the claim is retired from the CSS rather than reworded inside it; both comments
now say what is true — these are defensive witnesses, and nothing gates them.
⟨cmd⟩ `grep -rn 'css-emission-probe' demo/` → **2 → 0**. **The mechanism was not touched.**

#### N13 — the ruled choice, with the measurement it rests on

⟨cmd⟩ `grep -rl 'select-font' node_modules/@mkbabb/glass-ui/` → **0 files** (installed
**@mkbabb/glass-ui 7.0.0**). ⟨cmd⟩ `grep -rn 'dropdown-menu-font'
node_modules/@mkbabb/glass-ui/dist/components/_shared/menu.css` → **live**:
`.dropdown-menu-content, .dropdown-sub-content { font-family: var(--dropdown-menu-font, inherit); … }`.
So the pair had split: one half consumed by the producer, the other **inert for the whole of glass 7**
while `demo/DESIGN.md:11` and `:37` still documented both as live — A-11's silent-major-version-drift
family, exactly as ⟨`PaletteSlugBar` · A-29⟩ filed it.

**BRANCH TAKEN: DELETION, across all three sites in one commit** — `foundation.css`'s pin deleted,
both `DESIGN.md` lines corrected; `--dropdown-menu-font` **kept**, because it has a live consumer.
A half-cure would only have moved the drift from the stylesheet into the documentation, which is the
gate's stated falsifier. **The RULING is not W5's to make and was not made here**: the relay ask —
restore the Select seam at the producer, per the standing owner feedback that the Select font is a
token decision and not a hardcode — **rides fold §6f CE-10** with the PSC-2/PSC-6/PSC-19 family and
is **NOT discharged** by this deletion. It is carried as residual 3 below because the outbound letter
path is outside this unit's writable set. `glass-ui` was read and never written. If the seam returns,
the pin returns on the same line beside its sibling.

#### Gate readings BEFORE → AFTER

Every static figure double-run (both passes identical); the live figures are the born-RED JSON and
the paired post-cure run of the same extended probe, same engine, same base.

| gate | BEFORE | AFTER | verdict |
|---|---|---|---|
| **B1** | 390: 1 route content-exceeding, **0 scrollable**. 320: **7** exceeding, **0 scrollable**. Root confirmed at `shell.css:23/:26` | 390: the one exceeding route scrolls (**1003/844**). 320: **7 of 7** exceeding routes scroll (687 · 1019 · 687 · 584 · 763 · 808 · 677 over 568). Routes that genuinely fit are excluded **by the predicate**, never by an exception | **GREEN** |
| **B2** | `.pane-container` computed `max-height` **832px** at 16/9 and **608px** at 21/9, on all ten routes | **`none`** on `<main>` **and** on `.pane-container`, at **both** 16/9 and 21/9, all ten routes; the token resolves to the empty string in the browser | **GREEN** |
| **B3** | **45.4 %** at 3440×1440 (`608 ÷ 1340.5`) — the RED of record, reproduced exactly | `#/` **99.7 %** · `#/blob` **99.2 %** · gradient 70.7 · atmosphere 53.9 · mix 51.1 · palettes 51.1 · extract 45.6 · browse 39.6 · generate 39.6 · admin/users 20.0 | **honest-RED, 2 of 10 ≥ 90 %** (see below) |
| **B4** | `100dvh` in `shell.css` **1** · `svh` **0** files · cap token **13** hits / **4** files | **0** · **3** files · **3** hits / **1** file — all three comment-only, in `demo/shell/PaneSlot.vue`, outside this unit's writable set | **arms 1 & 2 GREEN; arm 3 honest-RED at 3** (residual 2) |
| **B5** | no recorded output existed | the reading pasted at the site **and** carried per-cell in the artefact; decision stated | **GREEN by record** |
| **B6** | no rationale comment at the site | posture decided by probe, unchanged, with three-reason rationale **and a banked re-trigger** at the site | **GREEN by record** |
| **N9** | probe absent; **2** stylesheet comments naming it as guarantor | **0**; both comments state the truth; branch and reasons recorded | **GREEN** |
| **N13** | **3** live sites (1 CSS pin + 2 doc lines) asserting a token with **0** producer occurrences | **0**; all three moved in one commit; sibling token kept on its live consumer | **GREEN** |

Token truth, read from the browser after the cure: cap token `""` · `--app-padding-x` `""` ·
`--app-gutter` `"1rem"`.

#### B3 — why it is honest-RED, and what would actually close it

The cap is **gone** and the extent it was hiding is now visible: `#/` moves **45.4 % → 99.7 %** and
`#/blob` **45.4 % → 99.2 %**. The eight routes still under 90 % are under it because their **content
is short**, not because anything caps them — measured: the rack and the occupied-content extent agree
within ~2 points on every route (e.g. browse rack 39.6 % / occupied 41.4 %), so the rack is not
stretched and the reading is honest content occupancy.

**The one in-bounds lever that would have turned the number is the gate's own stated falsifier** —
stretching `.pane-container` / `.pane-main` to the band would report ≥ 90 % while the same short
content sat inside a padded box, which is precisely *"the surplus is absorbed by a stretched rack
instead of the scene"*. It was refused; a false green is worse than an honest RED. The probe was
**hardened against it instead**: `occupiedExtentPct` was added and B3's assert now requires **both**
arms, so that cure cannot pass this gate in any later wave either.

Closing B3 needs the **scene recomposition**, which is downstream by construction: `regions[]` and
the one-column collapse at **X.W5.c**, and the rack/inline sizing at **X-W6** (CC-056 / V·L3). Unit
b owned the block-axis **cap**, and the cap is dead.

#### Residuals — RED, each measured, each with an owner

1. **The inner scroll-wells reflowed, exactly as W5F-42 predicted — measured, not assumed.** At
   1440×900, `#/` now renders an **8151 px** document and `#/blob` a **2810 px** one. Located
   exactly: the inspector pane's `.glass-resting.card` on `#/` declares `overflow-y: auto` over a
   `.card-content` of **6785 px** (a `.markdown-body` of 6636 px); `#/blob`'s `.pane-scroll-fade
   … overflow-y-auto` holds **2605 px**. Those wells drew their bound from the cap chain; with the
   cap dead they are `height: 8025px` with `scrollHeight ≈ clientHeight`, i.e. **declared scrollers
   that no longer scroll**. This is the direction V·L2 asks for (one scrolling column, the document
   scrolls), and the content was never reachable before — pre-cure the same route measured
   **618 % occupied against the band**, i.e. the cap was clipping ~6× its own height with no way to
   reach it. What remains is retiring the now-inert `overflow-y` declarations and composing those
   scenes: `demo/picker/**`, `demo/shell/PaneSlot.vue` and the pane card classes are **all outside
   this unit's writable set**. Owner: **X.W5.c** (the wrapper re-carve) and **X-W6** (CC-056).
2. **B4's third arm sits at 3, all comments, one file.** `demo/shell/PaneSlot.vue:46/:54/:55` —
   a paragraph plus the E-3 correction block X.W5.a appended beside it. The file is outside this
   unit's writable set and was not touched. **Zero of the three is a live consumer**: the consumer
   B4's own falsifier names (`shell.css:75`) is deleted here, and the definition and both re-pins are
   deleted in `foundation.css`. Both the paragraph and its correction now describe a mechanism that
   no longer exists, so the cure is deleting **both**, by whoever next holds that file under the
   **D-1 coupled-architecture lock** (which is why this unit could not simply re-word it).
   Owner: **X.W5.c/X.W5.d** (next holders of `PaneSlot.vue`).
3. **N13's relay ask is OWED and undischarged.** Deleting an inert pin removes the drift; it does not
   ask the producer for the seam back. The ask rides **fold §6f CE-10**, and the outbound letter path
   (`docs/tranches/V/coordination/**`) is outside this unit's writable set. Owner: the CE-10 relay
   at the next glass-ui BH letter. Recorded so the ruled choice is not read as the ruling.
4. **A stated divergence, not a ruling: C7 stages 7 → 5 after unit b; the bytes give 7 → 6.** Unit
   b's specified cure retires exactly one viewport-dimension query (the bare ultrawide aspect-only
   arm); the sibling width+aspect arm is ordered by the same spec line to **keep** its `--dock-*`
   rows and therefore survives as a query. The endpoint of **3** after unit c is unaffected. Recorded
   as a fact for unit c, which owns C7. Capability queries measured **28 before and after** — the
   27-that-must-survive are untouched.

#### Cadence (§7)

⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0**. ⟨cmd⟩ `npx eslint
docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs` → **exit 0** (the CSS and Markdown
paths are outside eslint's configured surface and are reported as ignored, not as failures).
⟨cmd⟩ `npx vitest run` → **15 failures / 613 passing**, and the failing set is the **same five files,
byte-identical to unit a's reading** (`test/gradient-parse` · `test/spectrum-luma` · `test/v4-c1` ·
`test/v4-css-emerging` · `demo/test/shell/reka-binding-idiom`) — **the library suite did not move**,
which is the arm that proves this unit stayed in its bounds. `npm run gh-pages` NOT run (X-W1's).

#### Artefacts

`docs/tranches/X/waves/W5/born-red/B1-B2-B3-layout-utilization-2026-09-19.json` (80 cells, the live
born-RED for B1/B2/B3 plus the B5 support reading) and
`docs/tranches/X/waves/W5/born-red/STATIC-B-2026-09-19.md` (the static slate, double-run, BEFORE and
AFTER) — **both entered git in `adc312f6`, the same commit as the cure** (§9). The paired post-cure
JSON is quoted above rather than banked: `waves/W5/green/` is the wave close's artefact (§8, commit
6) and is outside this unit's writable set.

---

## Close

SERVED MODEL: claude-opus-5[1m]

**Seat**: CLOSE (VERIFY-ONLY — this seat authored no product byte and cured nothing).
**Date**: 2026-09-19. **Verdict**: **PARTIAL**.
**HEAD at close**: `c5c7daad` (sibling Track D's X.P.W4S open; the last W5 commit is `afe230b5`,
and ⟨cmd⟩ `git diff --name-only afe230b5..HEAD -- demo/ e2e/ plugins/ vite.config.ts` → **0** — no
W5-bearing path has moved since, so every reading below is taken at the same bytes either way).

**INHERITED WORK, declared under the crash-recovery STANDING LAW.** §§C.0–C.8 below were found
**uncommitted** in this seat's own writable path — ⟨cmd⟩ `git diff --stat -- docs/tranches/X/execution/A/X-W5.md`
→ `1 file changed, 266 insertions(+)`, a killed predecessor CLOSE seat's partial work on **this**
unit. The inherited path is named here and nowhere else is claimed: `docs/tranches/X/execution/A/X-W5.md`
(append-only at line 882; §§0–8 and every unit receipt above are byte-untouched, so E-3 holds).
This seat **read that diff whole and re-measured every claim in it at its own clock**, double-run.
**Every hunk conforms and is kept except one**, rewritten below and flagged where it sits: §C.3's
vitest figure (`15 failed / 613 passed`, *"byte-identical"*) **does not reproduce** and has been
replaced by the true double-run reading plus the flake analysis that explains it. Nothing was
stashed, restored, reverted, or staged; the thirteen `demo/**` + `e2e/**` rows remain exactly as
found, untouched, because they are X.W5.c's set and not this seat's.

### C.0 Crash-recovery (STANDING LAW) — and the finding it produced

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/value.js`, read twice (13:0x and 13:5x) →

```
 M demo/color-picker/App.vue                          M demo/shell/useViewManager.ts
 M demo/color-picker/composables/usePaletteWiring.ts  M demo/shell/viewSchema.ts
 M demo/palettes/usePalettePorts.ts                   M demo/styles/shell.css
 M demo/palettes/useSlugMigration.ts                  M e2e/smoke/dual-pane-1440.spec.ts
D  demo/shell/PaneSegmentedControl.vue                M e2e/smoke/mobile/page-load-mobile.spec.ts
 M demo/shell/dock/Dock.vue                           M e2e/smoke/mobile/walk.spec.ts
 M demo/shell/usePaneRouter.ts                        ⊕ CARRY-LEDGER.md · X-P-W4S.md · scripts/dev/dev.sh
```

**Zero of these is inside the CLOSE seat's writable set** (this record, the LEDGER row, `waves/W5/`
close artefacts). Nothing was stashed, restored, reverted or staged. `scripts/dev/dev.sh` was never
touched (§0j.A **DR-24**); `CARRY-LEDGER.md` is in no unit's set; `X-P-W4S.md` is Track D's.

But the thirteen `demo/**` + `e2e/**` rows are **exactly X.W5.c's writable set**, and
⟨cmd⟩ `git diff --stat HEAD -- demo/ e2e/` → **13 files, 824 insertions / 816 deletions**, with
`PaneSegmentedControl.vue` **staged-deleted but never committed**. ⟨cmd⟩ `/bin/ls -lT` puts the last
write at **10:09:36**; ⟨cmd⟩ `git log -1 --format=%ad` puts the last commit at **10:08:12**. So:

> **ESCALATION ESC-W5-3 — X.W5.c was killed mid-unit and its cure is UNCOMMITTED.** The seat landed
> its born-RED artefacts (`afe230b5`) and then wrote its whole cure into the tree without reaching a
> commit. A VERIFY-ONLY close **may not land a sibling unit's bytes** — the crash-recovery law scopes
> inheritance to *"paths inside your own writable set"*, and these are not. The work is left exactly
> as found, unstaged in the two files it was not already staged in, so its owner can resume it.
> **L-7 governs the reading: an uncommitted cure does not exist.** Every gate below is therefore
> measured at the **landed bytes** — `git grep`/`git show` against **HEAD**, never the dirty worktree.

### C.1 Commit roster and bounds audit

⟨cmd⟩ `git show --name-only --format='' c0cf27bf de99ec15 f94d22af adc312f6 2fa82bdb afe230b5 | sort -u`
→ **46 distinct paths**, double-run.

| unit | commits | exists (`git log -1`) | stat scope |
|---|---|---|---|
| **X.W5.a** | `c0cf27bf` · `de99ec15` · `f94d22af` | yes · yes · yes | 1 file (the S-7 addendum) · 34 files · 1 file (receipt) |
| **X.W5.b** | `adc312f6` · `2fa82bdb` | yes · yes | 6 files · 1 file (receipt) |
| **X.W5.c** | `afe230b5` **only** (born-RED + N11 blind matrices) | yes | 5 files, **all artefacts — no cure commit exists** |
| **X.W5.d** | — | **NONE** | — |
| **X.W5.e** | — | **NONE** | — |

**Bounds: CLEAN.** Over all 46 paths, ⟨cmd⟩ a single ERE against the §4 *Do NOT touch* set —
`^(src/|api/|test/|node_modules/|scripts/dev/dev\.sh|demo/ui/|demo/styles/overture\.css|demo/shell/dock/layers/ActionBarLayer\.vue|registry/|docs/tranches/V/archive/)`
→ **zero hits**. `scripts/dev/dev.sh` re-probed **per commit** (`git show --name-only … | grep -c`)
→ **0 · 0 · 0 · 0 · 0 · 0**. The four paths outside `W5.md` §4's own table
(`demo/shared/ui/PaneHeader.vue`, `demo/color-session/{picker-color,useColorParsing}.ts`,
`demo/workbenches/extract/**`, `demo/DESIGN.md`) are each a **fold BD row** (BD-06 / BD-12–14 /
BD-10 / BD-23) whose true spelling was published in the dated `c0cf27bf` addendum **before** the bytes
moved — in bounds under the fold's own precedence rule (`X-W5-FOLD.md:15`), not an expansion.

**Landed-wrong, reported and NOT fixed here** (see §C.5).

### C.2 Gate table — BEFORE (wave-open) → AFTER (landed bytes, this seat's own clock)

Slate: **43 ids** — `W5.md` §6's 28 ⊕ the fold's N1..N15. (The baseline's *"33"* is §6h/§7e's
**18 sharpened-existing + 15 new born-RED** arithmetic, a different partition of the same rows.)
Every static figure **double-run**; every live figure from a probe run in one bounded session
(§5.2) at `PROBE_BASE=http://localhost:9001`.

⊘ **Contamination notice, stated before the readings.** The only tree a dev server can serve is the
working tree, which carries X.W5.c's uncommitted bytes (⟨cmd⟩ `grep -c regions demo/shell/viewSchema.ts`
→ **18**; ⟨cmd⟩ `git grep -c regions HEAD -- demo/shell/viewSchema.ts` → **0**). **Live** readings are
therefore marked ⊘ where the uncommitted work can reach them; every **static** reading is taken from
HEAD via `git grep`/`git show` and is clean. One further hygiene fact:
`audit/probes/app-wave/app-shell-truth-probe.mjs:5` **hardcodes** `http://localhost:9000` and ignores
its own documented `PROBE_BASE`, so it hit a leftover dev server (PID 44206) left by a killed seat —
same filesystem, so the content is identical, but the probe cannot be pointed at a clean tree.

#### Unit a — shell truth (LANDED)

| # | BEFORE | AFTER (close seat) | verdict |
|---|---|---|---|
| **A1** | exit 1 · App count 7 | ⟨cmd⟩ `node -e` over `HEAD:main.ts` → `isReady true · sideEffectImports 4` → **exit 0**; `grep -cE 'useGlobalDark\|provideApiClient\|^import "\.\./styles'` over `HEAD:App.vue` → **0** | **GREEN** |
| **A2** | `[b0,b1,b2]` terminal · blob false | marks `["b0","b1","b3","b2","b4"]` on the deep link **and on all 15 routes** ⊘; **blob `false` on `/#/generate`** and on browse/gradient/extract/atmosphere | **RED** — marks arm GREEN, blob arm RED (**ESC-W5-1**, upheld below) |
| **A3** | `{mobile:false, desktop:true}` | **honest-RED BY RULING at the landed bytes** (§0k.3 **S-1** gives the cure to X-W8). ⊘ The live probe this pass reads `mobileRegen390 {dockChanged:true, paneChanged:true}` — that is X.W5.c's **uncommitted** fork deletion answering, exactly as `W5.md:269` predicts (*"the class dissolved with the fork"*), and it is **not** a landed-bytes reading | **honest-RED, cure X-W8** |
| **A4** | `bindPane` 0 hits | ⟨cmd⟩ `git grep -c bindPane HEAD -- demo/` → **12** (App.vue 6 · PaneSlot.vue 1 · usePaneRouter.ts 5); `HEAD:PaneSlot.vue:105` `onMount: (instance: TInstance \| null, key: string) => void` **required + generic**, invoked `:197`. The **falsifier was not re-run by this seat**: its target (`App.vue`) carries a sibling seat's uncommitted bytes, so the delete-one-argument edit was refused; unit a's bite (`TS2554`, vue-tsc exit 2) stands as the record | **GREEN (structural); bite cited, not re-run** |
| **A5** | `h1:0` on 15 routes | 15 routes walked: `h1===1` **all** · `main===1` **all** · visible **all** · `tabindex="-1"` **all** · `h1Text ≡ VIEW_MAP[view].label` **all** | **GREEN on the spec's four arms**; the probe's added OUTLINE arm **RED on 4 of 15** (picker · palettes · mix · blob) — residual 1 |
| **A6** | `?space=lab&color=…` both classes | `A6 {green:true, bootSilent:true, offenders:[]}`; `urlEcho` applied 3/3 (jzazbz · display-p3 · rec2020) | **GREEN** |
| **A7** | 3 arms false | `A7 {statusAnnounces:true, titleDistinct:true, h1Distinct:true, renderDistinct:true, mainNameTracksScene:true}`; ⟨cmd⟩ `git grep -c 'role="status"' HEAD` → **3** | **GREEN** |
| **N1** | 0 `onDeactivated` | ⟨cmd⟩ `git grep -c onDeactivated HEAD -- demo/` → **5 files** (PaneSlot · ExtractWorkbench · ImageEyedropper · useExtractSession · useImageQuantize) | **GREEN** |
| **N3** | untyped prop-bag seam | cited: `TS2741` on delete, `TS2561 "Did you mean to write 'onCommitEdit'?"` on typo, both quoting PalettesPane's own emits. Not re-run (same dirty-file refusal as A4) | **GREEN, bite cited** |
| **N4** | `valueOrThrow` on every render-path reader | ⟨cmd⟩ `git grep -c valueOrThrow HEAD -- demo/` → **18, all in `picker-color.ts`** = `buildColor`'s construction switch ⊕ the helper's own declaration; **0 on the five render-path readers** | **GREEN** |
| **N5** | 1 carrier over the whole grid | `git grep -c '<ErrorBoundary' HEAD -- App.vue` → **3**, per seat, outside KeepAlive | **RED on the ROUTE-RESET arm** (3 of 4 green) — owner **X-W7** by S-7, residual 2 |
| **N6** | no wrapper/role/aria | region roles + names; `aria-labelledby`; `mainNameTracksScene:true` in the live walk | **GREEN** |
| **N7** | `:max` literals 9 / 6 / 4 | ⟨cmd⟩ `git grep -nE ':max="[0-9]+"' HEAD -- demo/` → **0** in the pane-cache seam (the 4 surviving hits are `<Slider :max>` attributes, an unrelated grammar); `usePaneRouter.ts:139` records the three it replaced | **GREEN** |
| **N8** | `interface PaneSlot` 1 | **0** | **GREEN** |

#### Unit b — the block law (LANDED)

| # | BEFORE | AFTER (close seat) | verdict |
|---|---|---|---|
| **B1** | 390: 1 exceeding, **0** scrollable | `gates.B1.pass **true**` — 8 routes in scope at 390×844, **every content-exceeding route scrolls** (`#/` 8734/844 · gradient 1499 · browse 1045 · blob 3280 · generate 1064 · mix 1126 · extract 1203 · palettes 1230); atmosphere and admin/users excluded **by the predicate** (`contentExceeds:false`) ⊘ | **GREEN** |
| **B2** | `max-height` 832px @16/9, 608px @21/9 | `gates.B2.pass **true**` — `<main>` **and** `.pane-container` `maxHeight === "none"` on **all 10 routes at both 16/9 (2560) and 21/9 (3440)**; `contentMaxH` resolves to `""` ⊘ | **GREEN** |
| **B3** | **45.4 %** at 3440×1440 | `#/` **99.7 %** (occupied 101.4) · `#/blob` **99.2 %** (100.3) · gradient 70.7 · atmosphere 52.0 · mix 51.1 · palettes 51.1 · extract 45.6 · browse 39.6 · generate 39.6 · admin/users 18.1 — **2 of 10 ≥ 90 %** ⊘ | **honest-RED**, reproduces unit b's reading; the rack and occupied extent agree within ~2 pts on every route, so the cap is dead and the shortfall is content |
| **B4** | `100dvh` 1 · `svh` 0 files · cap token 13/4 files | `git grep -c 100dvh HEAD -- demo/styles/shell.css` → **0** · `git grep -l svh HEAD -- demo/` → **3 files** · `git grep -c content-max-h HEAD -- demo/` → **3, all in `demo/shell/PaneSlot.vue`, all comments** | **arms 1 & 2 GREEN; arm 3 honest-RED at 3** — residual, owner the next holder of `PaneSlot.vue` |
| **B5** | no recorded output | re-derived from the artefact itself: `b5Support {overflow-block:true, min-block-size 100svh:true, height 100svh:true}` (WebKit); the logical spelling ships, the "if false" branch never fired | **GREEN by record** |
| **B6** | no rationale at the site | posture unchanged (in flow), three-reason rationale **and a banked re-trigger** written at the `.dock-band` site in `shell.css` | **GREEN by record** |
| **N9** | 2 stylesheet comments naming an absent probe | ⟨cmd⟩ `git grep -c css-emission-probe HEAD -- demo/` → **0**; STRIKE branch recorded with its two measured reasons | **GREEN** |
| **N13** | 3 live sites | ⟨cmd⟩ `git grep -n select-font HEAD -- demo/` → **2 hits, both narrative**: `DESIGN.md:39` and `foundation.css:399` are the *record of the strike* ("the pair is gone", "ZERO occurrences"). **0 live pins, 0 live doc claims** | **GREEN** (count stated: 2 residual mentions, both the strike's own witness) |

#### Unit c — one mount, one column (**NOT LANDED** — cure uncommitted)

| # | BEFORE | AFTER (landed bytes) | verdict |
|---|---|---|---|
| **C1** | `#/` 69 vs 1751 = **3.9 %** (`afe230b5`'s born-RED) | unchanged at HEAD | **RED** |
| **C2** | `{regenerateFound:true, specimenChanged:false}` | unchanged at HEAD | **RED** |
| **C3** | **38** across 13 files | ⟨cmd⟩ `git grep -oE 'useBreakpoint\|isDesktop\|isMobile\|mobilePaneIndex' HEAD -- 'demo/*.vue' 'demo/*.ts' \| wc -l` → **39** / **13 files** — the census **ROSE by one** (§C.5 finding 1) | **RED** |
| **C4** | file exists, 1,750 B | ⟨cmd⟩ `git cat-file -e HEAD:demo/shell/PaneSegmentedControl.vue` → **EXISTS**. (Absent in the worktree only — staged, never committed) | **RED** |
| **C5** | `identityPreserved:false` (2 canvases, 1 kept, 0 roots kept) | unchanged at HEAD | **RED** |
| **C6** | RED input by construction | the wrapper was never cut at HEAD | **RED** |
| **C7** | **7** viewport-dimension `@media` | **6** at HEAD (ConsoleRail:348 · PaneSegmentedControl:46 · DockStatusLamp:70 · animations.css:17 · foundation.css:526 · shell.css:245); target after unit c is **3** | **RED** — and unit b's stated divergence (7→6, not 7→5) confirmed at the bytes |
| **C8** | **13** `right:"` rows | ⟨cmd⟩ `node -e` over `HEAD:viewSchema.ts` → **13**, exit **1** | **RED** |
| **N2** | 3 × `setActiveTab("saved")` ⊕ 1 `as ViewId` | identical at HEAD (`useSlugMigration.ts:55,69,76`; `usePalettePorts.ts` 1) | **RED** |
| **N10** | 3 × `BouncyTabs\|lg:flex` | **3** at HEAD | **RED** |
| **N11** | 0 mobile captures in the 3 blind states | ⟨cmd⟩ `git ls-files waves/W5/born-red/N11/` → **4 artefacts** (JSON ⊕ forced-colors / keyboard-focus / reduced-motion @390), banked in `afe230b5` **before** any deletion commit — the ordering lock is satisfied and cannot now be broken | **GREEN** — the one unit-c obligation discharged |
| **N12** | dead `userLogout`/`ensureUser` deps | unchanged at HEAD | **RED** |
| **N14** | 7 declaration sites, 6 invisible to `vue-tsc` | unchanged at HEAD | **RED** |
| **N15** | admin-names mobile source order inverted | unchanged at HEAD | **RED** |

#### Unit d — scene motion (**NEVER DISPATCHED**) · Unit e — the P-1 strike (**NEVER DISPATCHED**)

| # | AFTER (landed bytes) | verdict |
|---|---|---|
| **D1** | ⟨cmd⟩ `test -e docs/tranches/V/megatranche/workflows/gates/scene-swap-budget.mjs` → **ABSENT**; the directory holds only unit a's three probes | **RED** |
| **D2** | ⟨cmd⟩ `git ls-files --error-unmatch docs/tranches/T/audit/pi/u-gestalt/probe2-log.txt` → **exit 0** | **GREEN** (verify-only, X-W0's CC-012) |
| **D3** | ⟨cmd⟩ `git grep -c 'pane-wrapper--left\|pane-wrapper--right' HEAD -- demo/` → **18** (App.vue 3 · animations.css 12 · shell.css 3) — unmoved | **RED** |
| **D4** | ⟨cmd⟩ `git grep -c '<Transition ' HEAD -- MixSourceSelector.vue` → **0** | **RED** |
| **D5** | the global guard stands: `HEAD:animations.css:184` and `:202` both `@media (prefers-reduced-motion: reduce)`; **no new scroll-driven or `animation-timeline` declaration was minted by a/b** | **GREEN** (non-regression held) |
| **E1** | ⟨cmd⟩ `grep -rcE '64%?…66\.6666667\|33\.3333333…36'` over the four normative docs → **2 · 2 · 2 · 1 = 7**, unmoved | **RED** |
| **E2** | the seven sentences still carry no `P122` attribution | **RED** |

**Tally: 20 GREEN / 23 RED of 43.** GREEN = A1 · A4 · A5 · A6 · A7 · B1 · B2 · B5 · B6 · D2 · D5 ·
N1 · N3 · N4 · N6 · N7 · N8 · N9 · N11 · N13.

### C.3 Cadence (§7) and Verification Artefacts (§8)

⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0**, zero diagnostics.
⟨cmd⟩ `npx eslint demo/ plugins/ vite.config.ts e2e/ …/workflows/gates/ …/layout-utilization.mjs`
→ **exit 0**, zero problems.
⟨cmd⟩ `npx vitest run` — **REWRITTEN BY THE FINISHING CLOSE SEAT; the inherited figure does not
reproduce and is not re-asserted.** The inherited text read *"15 failed / 613 passed … byte-identical
to unit a's and unit b's readings, same five files."* Measured here, **double-run as the law requires**:

| run | Tests | Test Files | failing roster |
|---|---|---|---|
| 1 | **16 failed / 612 passed** (628) | **6 failed / 31 passed** (37) | the five ⊕ `demo/test/export/byte-exact` |
| 2 | **17 failed / 611 passed** (628) | **6 failed / 31 passed** (37) | the five ⊕ `test/view-accents`, ⊕ a 2nd `v4-c1` failure |

**The two runs disagree, so no single figure may be published as the reading.** What IS stable, and
is the arm §7 actually states, is the **roster**: both runs carry the same five files
(`test/gradient-parse` 2 · `test/spectrum-luma` 1 · `test/v4-css-emerging` 10 · `test/v4-c1` ·
`demo/test/shell/reka-binding-idiom` 1) — **exactly unit a's and unit b's set**. Every extra is a
**timeout under parallel load**, not a regression, and each was falsified in isolation by this seat:

- ⟨cmd⟩ `npx vitest run demo/test/export/byte-exact.test.ts` → **29 passed (29)**, 14.7 s. In the
  covering run the same file reports **336,831 ms** and dies on `Error: Test timed out in 30000ms`
  at `:311` — the file's own comment says *"~7s on shared CI"*. Four machine-wide `Test timed out`
  hits in run 2, two in run 1.
- ⟨cmd⟩ `npx vitest run test/view-accents test/preview-chips test/gamut-verdict test/value-domain-clamp`
  → **48 passed (48)**, the four suites that consume unit a's modules — unit a's own 48/48 claim
  reproduced exactly, and run 2's `view-accents` failure (22,430 ms) shown to be the same flake.

**The §7 conclusion therefore HOLDS and is what this close certifies: the library suite did not
move** — no failing file is one a W5 commit touched, and the five-file roster is unchanged from
wave-open. **The *number* does not hold and is corrected here** rather than carried forward, because
a close that republishes an unreproducible count launders a flake into a fact. Four tracks share
this machine; the suite is load-flaky at its tail, and that is the honest reading.
⟨cmd⟩ `git diff --check` over unit e's four docs → **clean** (they are byte-unchanged).
`npm run gh-pages` **NOT run** — X-W1's gate, and `W5.md:303` forbids citing it here.

**§8 artefacts — INCOMPLETE, itemised:**

| artefact | state |
|---|---|
| `waves/W5/born-red/` | **11 files in git** — A2/A3/A6, A3-parity, A5/A6/A7, B1/B2/B3, C1/C2/C5, the N11 matrix ⊕ 3 PNGs, STATIC and STATIC-B | ✔ |
| `waves/W5/green/` | **5 files** — unit a's only (A2, A3, A5/A6/A7, the portal delta, STATIC). **Unit b banked none** and c/d/e produced none | ✘ partial |
| `audit/visual/layout/` | ⟨cmd⟩ `git ls-files` → **0 files**. The {390, 1440, 3440} × {`#/`, `#/blob`, `#/browse`} and {390, 720@2, 1440} × {`#/`, `#/generate`, `#/blob`} capture sets **were never taken** | ✘ absent |
| `audit/probes/app-wave/pi/` | ⟨cmd⟩ `git ls-files` → **0 files**. The desktop-1440 / mobile-390 π pair and the H1 accessibility-tree dumps **were never taken** | ✘ absent |
| `scene-swap-budget.mjs` output, before/after | script absent (D1) → **no output exists** | ✘ absent |
| **D-E portal-integrity delta** (mandatory on the `index.html` body change) | `green/PORTAL-INTEGRITY-DELTA-2026-09-19.json` in `de99ec15`; all seven arms true BEFORE and AFTER, the one structural difference the intended `mountHostIsBody: true → false` | ✔ |
| B5 reading · B6 rationale | quoted in unit b's receipt **and** written at their sites in `shell.css`; B5 re-derived by this seat from the artefact's own `b5Support` cells | ✔ |

### C.4 E13 mail — four paths, at this seat's own clock

⟨cmd⟩ `find <each of the four> -maxdepth 1 -type f -newermt "2026-09-19 10:00"` → exactly **one** hit,
`docs/tranches/V/coordination/INBOX.md` (**self-excluded**, SELF-COUNT law). Entries: `V/coordination`
**24** · `glass-ui BK/coordination` **9** · `keyframes.js V/coordination` **13** ·
`sci-report/atlas P/coordination` **28**. ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3`
→ `BK/ · BJ/ · BI/` — **BK re-confirmed**, never a pinned letter (§5.3).

Register arithmetic, double-run: ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **81 ≡ 81**
(was 80 at unit b; the new row is **O-41**, Track D's X·P adjudication relay, outbound and rowed).
Tail now **I-35 / O-41**. Classification taken **from each row's Status cell**, never a bare
`grep -i unread`: ⟨cmd⟩ `grep -cE '\| \*\*UNREAD' INBOX.md` → **1**, and that one hit is *prose inside
a `**Sweep …**` paragraph quoting the pattern*, not a Status cell (line 228). The four un-bolded
`UNREAD` string hits (221 · 227 · 231 · 241) are likewise prose — seat 0's, unit a's and unit b's
reading reproduced a fourth time. **0 unrowed · 0 UNREAD addressed to value.js in X-W5's scope ·
0 `I-n` minted · `INBOX.md` unedited by this seat.** **No wave closes with UNREAD mail in scope — none is.**

### C.5 Landed-wrong — found by this seat, reported, NOT cured

1. **X.W5.a raised the census its sibling's gate must drive to zero.** ⟨cmd⟩
   `git grep -nE '…' bd1f014f -- demo/shell/usePaneRouter.ts` → **1** hit; at HEAD → **3**
   (`:418` and `:425`, both `viewManager.mobilePaneIndex.value = 1;`). Net over the fork census:
   **38 → 39** (App.vue 7→6, usePaneRouter 1→3). C3 is unit **c's** gate and its target is **0 at
   layout sites**; `de99ec15` added two new layout-fork writes to it. Not cured here (verify-only,
   and the file carries a sibling seat's uncommitted bytes). Owner: **X.W5.c**.
2. **A born-RED witness landed without its instrument.** `afe230b5` banks
   `waves/W5/born-red/C1-C2-C5-2026-09-19.json` (`probe: "X.W5.c C1/C2/C5 MEASURE-AT-OPEN"`,
   `takenAt 2026-09-19T13:53:31Z`), but ⟨cmd⟩ `ls docs/tranches/V/megatranche/workflows/gates/` →
   **three files, none of them a C-probe**, and ⟨cmd⟩ `git ls-files` finds no such script anywhere.
   The measurement is therefore **not re-derivable** — the same L-7 class D2 exists to refuse, one
   level up (the number is in git; the thing that produced it is not). Owner: **X.W5.c**.
3. **`provideApiClient()` is unreferenced** (unit a's own residual 4, re-confirmed):
   `demo/platform/transport/**` is claimed by **no** X wave (fold W5F-60 / §4 CE-6), so its deletion
   has no home. Owner: **unassigned — needs a ledger row**.
4. **§8's two capture sets were never taken** (`audit/visual/layout/`, `audit/probes/app-wave/pi/`),
   although unit a and unit b both closed. Owner: whichever seat resumes W5.

### C.6 Escalations

- **ESC-W5-1 — A2's blob arm is UNFALSIFIABLE AS AUTHORED** (unit a's finding, **upheld by this
  seat's own measurement**). The arm requires `.hero-blob-anchor` on `/#/generate`, `/#/browse`,
  `/#/gradient`, `/#/extract`, `/#/atmosphere`; that anchor exists only in `ColorPicker.vue`, and
  `VIEW_MAP` places no color-picker pane on any of those five. Measured this pass: `blob:true` on
  exactly the four picker-bearing routes (picker · palettes · mix · blob), `false` on the eleven
  others. Its sibling arm (marks ⊇ {b3,b4}) is GREEN on all 15. **L-18's class**: a gate shown
  unfalsifiable is struck and re-authored **by its owner** — not by a seat, and not by this close.
- **ESC-W5-2 — X.W5.d and X.W5.e were NEVER DISPATCHED.** Zero commits, zero receipts, zero bytes.
  **Neither was blocked.** Unit d's only precondition is that unit c commits (it re-keys c's class
  names) — that is a real block, and it is **ESC-W5-3's consequence, not an independent one**. Unit
  **e has no precondition at all**: it is four normative Markdown files, file-disjoint from every
  other unit, with its own §9 commit 5 and its own two gates, and `W5.md:364` marks CC-052
  **apply-never-requeue**. E1/E2 could have closed at any point in this wave and did not.
- **ESC-W5-3 — X.W5.c's cure is uncommitted** (§C.0). An orchestration escalation, not a code one:
  the bytes exist and typecheck (⟨cmd⟩ `vue-tsc` exit 0 over the dirty tree), but they are not in
  git, so **none of C1–C8 / N2 / N10 / N12 / N14 / N15 may be read as cured**, and the close cannot
  land them for their owner.
- **ESC-W5-4 — a probe that cannot be aimed.** `app-shell-truth-probe.mjs:5` hardcodes
  `http://localhost:9000` while its own header documents `PROBE_BASE`. It is a `W5.md` §4
  *execute, no write* artefact, so no seat in this wave may correct it; recorded so the next owner
  of that file does.
- **The L-18 rider stands unspent** (`W5.md` §12): even the landed half is not ACCEPTED on its gates
  alone — two quartet challenge passes and a fresh Fable apotheosis are owed before any ACCEPTED
  mark. This close does not claim one.

### C.7 Residuals, each with a named owner

| # | residual | owner |
|---|---|---|
| 1 | **A5's OUTLINE arm, RED on 4 of 15 routes** — one `<h3 class="card-title readout">` in `demo/picker/`: a colour VALUE readout styled as a section heading. The pane-title half landed (`PaneHeader` emits `<h2>` via the BD-06 level seam; 11 of 15 routes are outline-clean) | **`demo/picker/**`'s next owner** — one line, outside every W5 unit's set |
| 2 | **N5's ROUTE-RESET arm** — needs a route watch inside `ErrorBoundary.vue`'s bytes; §0k.3 **S-7** grants X-W5 the containment **altitude** only | **X-W7** |
| 3 | **A3's cure** (dock-action parity) | **X-W8** (MT-DOCK-LAYERS-1), by §0k.3 **S-1** |
| 4 | **B3 honest-RED, 2 of 10 ≥ 90 %** — the cap is dead; the remaining shortfall is short content, needing the scene recomposition | **X.W5.c** (`regions[]`) ⊕ **X-W6** (CC-056 / V·L3) |
| 5 | **B4's third arm at 3** — three comment-only `content-max-h` mentions in `PaneSlot.vue`, both the paragraph and its E-3 correction now describing a dead mechanism; the **D-1 coupled-architecture lock** is why unit b could not re-word it | **the next holder of `PaneSlot.vue`** (X.W5.c / X.W5.d) |
| 6 | **The inner scroll-wells reflowed** (W5F-42's predicted, measured consequence): `#/` renders an 8151 px document, `#/blob` 2810 px, with now-inert `overflow-y` declarations | **X.W5.c** ⊕ **X-W6** |
| 7 | **N13's relay ask is OWED** — deleting an inert pin removes the drift, it does not ask the producer for the Select-font seam back; rides fold §6f **CE-10** | **the CE-10 relay**, next glass-ui BH letter |
| 8 | **C3's back-gate stands** — ⟨cmd⟩ `grep -c useMediaQuery demo/shell/dock/Dock.vue` → **2** at HEAD, so **Dock G-L is still RED** and C3 may not be cited as CLOSED even once green | **X-W8** |
| 9 | **`provideApiClient()` unreferenced**, `demo/platform/transport/**` in no wave's bounds | **unassigned** (§C.5.3) |

### C.8 Four-verb status — moved exactly as §State permits, and no further

`W5.md` §9 commit 6 flips IMPLEMENTED and states *"VERIFIED is stamped only at X-W11's release close."*
This close therefore **may** move IMPLEMENTED and **may not** move VERIFIED. It moves neither:

| verb | state | authority |
|---|---|---|
| AUDITED | **YES** | unchanged (`W5.md:15`) |
| SPECIFIED | **YES** | unchanged (`W5.md:16`) |
| **IMPLEMENTED** | **NO** | **Two of five units landed.** §2's goal criterion — *"every public route is one semantic scene … no physical left/right identity, no viewport-aspect cap"* — is **UNMET at the bytes**: `viewSchema.ts` still carries **13** `right:"` rows, `PaneSegmentedControl.vue` still exists at HEAD, the fork census is **39**, and the P-1 range is still **7 occurrences** in the normative canon. The flip is the close act's own condition and the condition is not met |
| VERIFIED | **NO** | **X-W11's**, by `W5.md:335` — not this seat's to stamp under any reading |

**Wave verdict: PARTIAL** — X.W5.a and X.W5.b landed and hold (20 of 43 gates GREEN at the landed
bytes, cadence clean, bounds clean, mail clean); X.W5.c is uncommitted; X.W5.d and X.W5.e were never
dispatched.

### C.9 Finishing-seat attestation — what was re-measured, not inherited

SERVED MODEL: claude-opus-5[1m]. This seat did not take §§C.0–C.8 on trust. Every figure below was
re-run at this seat's own clock from **HEAD**, never from the dirty worktree, and double-run.

**Reproduced byte-for-byte (kept):**

- **Commit roster** — all six exist ⟨cmd⟩ `git log -1` each: `c0cf27bf` · `de99ec15` · `f94d22af` ·
  `adc312f6` · `2fa82bdb` · `afe230b5`. File counts **1 · 34 · 1 · 6 · 1 · 5**.
- **Bounds** ⟨cmd⟩ `git show --name-only --format='' <the six> | sort -u` → **46 ≡ 46** distinct
  paths; the §4 *Do NOT touch* ERE → **0 hits**; `scripts/dev/dev.sh` per commit → **0·0·0·0·0·0**.
- **Every static gate.** A1 `isReady true · sideEffectImports 4` exit **0**, App count **0** · A4
  `bindPane` **12** (App 6 · PaneSlot 1 · usePaneRouter 5) · A7 `role="status"` **3** · N1 **5**
  files · N4 **18**, all in `picker-color.ts`, **0** on the three named render-path readers · N7
  **0** in the pane-cache seam · N8 **0** · B4 `100dvh` **0** / `svh` **3** files / cap token **3**,
  all comments in `PaneSlot.vue` · N9 **0** · N13 **2**, both the strike's own witness · C3 **39**
  across **13** files · C4 **EXISTS at HEAD** · C7 **6** · C8 **13**, exit **1** · N2 **3 ⊕ 1** ·
  N10 **3** · D1 **ABSENT** · D2 exit **0** · D3 **18** (App 3 · animations 12 · shell 3) · D4 **0**
  · D5 guard at `:184` and `:202` · E1 **1+2+2+2 = 7** · E2 no `P122` at the seven sites.
- **Both landed-wrong findings, at the bytes.** (1) the fork census ⟨cmd⟩ at `bd1f014f` → **38**,
  at HEAD → **39**; `usePaneRouter.ts` **1 → 3** (the two new `viewManager.mobilePaneIndex.value = 1;`
  at `:418`/`:425`), `App.vue` **7 → 6**. (2) `git ls-files` finds **no C-probe instrument** for
  `born-red/C1-C2-C5-2026-09-19.json` anywhere in the tree.
- **A5 adjudicated against the SPEC's own definition, from the artefact.** `W5.md:249` names four
  arms and its falsifier names *"four distinct ways"*; none is the outline. Re-derived over all 15
  rows: `h1===1 && mainCount===1 && h1Visible && h1Text===expectedLabel && tabindex="-1"` → **15 of
  15**, zero spec-arm failures. **GREEN on the gate as authored.** The probe's own `A5.green` field
  reads `false` because unit a's instrument added a stricter OUTLINE arm (RED on picker · palettes ·
  mix · blob). **Stated plainly so no later seat mistakes the file's `green/` folder or the probe's
  self-verdict for the gate's**: the instrument is stricter than the gate, the extra arm is a real
  defect, and it is carried as residual 1 with its owner — not as an A5 failure.
- **A2/A3 from the banked green JSON.** A2 `marks = [b0,b1,b3,b2,b4]` ⊇ {b3,b4} **GREEN**;
  `blob:false` on `/#/generate` → blob arm **RED**, ESC-W5-1 upheld a third time. A3 `mobile390
  {dockChanged:false}` vs `desktop1440 {dockChanged:true}` → parity **still RED**, honest-RED by
  §0k.3 **S-1**, with the witness moved (`unconditionalPaneFlip` **false**).
- **C3's back-gate** ⟨cmd⟩ `git grep -c useMediaQuery HEAD -- demo/shell/dock/Dock.vue` → **2**;
  Dock G-L is **RED**, so C3 may not be cited as CLOSED even when it goes green.
- **Artefacts** — `born-red/` **11** files in git, `green/` **5**; the two §8 capture sets absent.
- **Cadence** ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0**, zero diagnostics;
  ⟨cmd⟩ `npx eslint demo/ plugins/ vite.config.ts e2e/ …/gates/ …/layout-utilization.mjs` → **exit
  0**, zero problems; ⟨cmd⟩ `git diff --check` over unit e's four docs → **clean** (byte-unchanged,
  as a never-dispatched unit must leave them).
- **E13, four paths, this seat's clock.** Entries **24 · 9 · 13 · 28**; ⟨cmd⟩
  `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/ · BJ/ · BI/`, **BK re-confirmed**;
  delta since 10:00 → **one** hit, `INBOX.md` itself (**self-excluded**, SELF-COUNT). Register
  ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|'` → **81 ≡ 81**, tail **I-35 / O-41**. Status read
  **positionally**, never a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**): an awk pass over every
  register row's cells looking for one that *begins* `UNREAD` returns **ZERO**. The 78 string hits
  are the vocabulary header, sweep prose, and `Was:`/`Prior status, kept:` narration inside Status
  cells that have since advanced. **0 unrowed · 0 UNREAD in X-W5's scope · 0 `I-n` minted ·
  `INBOX.md` unedited by this seat. No wave closes with UNREAD mail in scope — none is.**

**Rewritten (did not conform):** §C.3's vitest figure only. See the table at its site.

**The verdict is unchanged by the re-measurement: PARTIAL.** It does not rest on the corrected
figure — it rests on four structural facts no re-run moves: `PaneSegmentedControl.vue` still exists
at HEAD, `viewSchema.ts` still carries **13** `right:"` rows, the fork census reads **39** where C3
demands 0, and the P-1 range still reads **7** occurrences in the normative canon. Two of five units
landed. **20 of 43 gates GREEN.**

---

## RESUME OPEN 2026-09-20 — seat 0, under COHESION §0ac

SERVED MODEL: claude-opus-5[1m]

**Authority.** COHESION **§0ac** (2026-09-19): *"**X-W5** — RESUME MODE: units `.a`–`.e` stand on
their commits; the close is re-seated under the watchdog-aware LAW."* Relaunch order there puts
X-W5 after X-W9 and X-W6; **§0af** (2026-09-20) re-enters **Track A alone**. This seat re-opens the
wave in RESUME MODE, banks a baseline for the units still owed, and re-plans **three** of the five.
It authored no product byte and cured nothing.

### R.0 Crash-recovery (STANDING LAW) — two inherited paths, one of them mine

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/value.js`, read twice → **19 M/D rows
+ 1 untracked**. Judged against **this seat's** writable set (`execution/A/X-W5.md`,
`execution/LEDGER.md`, `V/coordination/INBOX.md`):

| path | rows | inside my set? | disposition |
|---|---|---|---|
| `docs/tranches/X/execution/A/X-W5.md` | +363 / −0 | **YES** | **INHERITED and KEPT** — see R.0a |
| `docs/tranches/X/execution/LEDGER.md` | +2 / −1 | file yes, **hunks NO** | **NOT TOUCHED** — see R.0b |
| 13 × `demo/**` + `e2e/**` (incl. `D demo/shell/PaneSegmentedControl.vue`) | — | no | **X.W5.c's**, left exactly as found |
| `docs/tranches/X/execution/A/X-W6.md` (+306), `execution/B/KF-W13S.md`, `V/reformation/CARRY-LEDGER.md`, `docs/tranches/X/keyframes/evidence/W13S/` | — | no | sibling seats' — untouched |
| `scripts/dev/dev.sh` | — | no | **never touched** (§0j.A DR-24) |

**R.0a — the inherited close.** ⟨cmd⟩ `git diff --numstat -- docs/tranches/X/execution/A/X-W5.md`
→ **363 insertions, 0 deletions**: append-only, so §§0–8 and every unit receipt are byte-untouched
and **E-3 holds**. The diff is the killed CLOSE seat's whole `## Close` (§§C.0–C.9, verdict
**PARTIAL**), written 2026-09-19 and never committed — the watchdog signature §0ac names. This seat
**read that diff whole**. Every hunk conforms: it is VERIFY-ONLY, measures at HEAD rather than at
the dirty tree, cures nothing, names four escalations and nine owner-named residuals. **Nothing is
rewritten.** It is committed **with this open** so that 363 lines of measured evidence stop living
only on this disk (**L-7**: an uncommitted witness does not exist). The inherited path is named
here and claimed nowhere else.

**R.0b — the LEDGER is occupied by a sibling, and this seat refuses to sweep it.** ⟨cmd⟩
`git diff -U1 -- docs/tranches/X/execution/LEDGER.md` → **two hunks, both X-W6's**: the `| X-W6 |`
row rewritten to *"CHECK 1 (RESUME) … NOT-CONFORMANT"* and one 2026-09-20 event line for the same
check — a killed **X-W6** seat's work, whose own record (`execution/A/X-W6.md`, **+306 / −0**) is
likewise uncommitted. A pathspec commit names a *file*, not a hunk, so committing `LEDGER.md` here
would publish a sibling wave's verdict under **this** commit's message while its evidence stayed
out of git — precisely the contamination measured at X-W0 (*"three contaminated commits"*) and the
reason the seat law says **never touch a dirty path outside your writable set**. Therefore:

> **ESC-W5-5 — the X-W5 OPEN event line is OWED to the LEDGER and was not written.** X-W5's status
> cell already reads **`**OPEN 2026-09-17**`** at the bytes — the exact value this open would set —
> so the ledger's crash-survival state is **already correct** and no cell edit is owed. Only the
> event-log line is, and it cannot be landed without carrying X-W6's uncommitted row. Owner: the
> next seat that finds `LEDGER.md` clean (the X-W6 check seat's own commit, or this wave's close).

### R.1 E13 Step-0 — the four-path mail sweep at this seat's own clock (2026-09-20)

⟨cmd⟩ `find <each path> -maxdepth 1 -type f | wc -l`, double-run →
`docs/tranches/V/coordination` **24** · `../glass-ui/docs/tranches/BK/coordination` **9** ·
`../keyframes.js/docs/tranches/V/coordination` **12** ·
`../sci-report/atlas/docs/tranches/P/coordination` **28**. Plus `docs/tranches/V/` root: its only
letter-shaped file is `ATLAS-INBOUND-2026-07-17-two-atlas-disambiguation.md`, long rowed.
⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/ · BJ/ · BI/` — **BK re-confirmed
the newest tranche dir**, never a pinned letter (§5.3).

**Delta since the close's own sweep (§C.4, 2026-09-19 10:00).** ⟨cmd⟩
`find <each of the four> -maxdepth 1 -type f -newermt "2026-09-19 10:00"` → **exactly one hit**,
`docs/tranches/V/coordination/INBOX.md` itself (**self-excluded**, SELF-COUNT law). **No letter
file has been added to any of the four paths since the close certified 0 unrowed.** One honest
divergence: keyframes reads **12** today against the close's **13** — a file left a *sibling* repo's
directory; a deletion there cannot mint inbound mail for value.js, and nothing is newer than the
close's clock, so the 0-unrowed finding carries.

**Register arithmetic, double-run.** ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` →
**90 ≡ 90** (the close read 81; nine rows have been minted by sibling tracks since). Tail now
**I-39 / O-46**. Classification taken **positionally from each row's cells**, never a bare
`grep -i unread`: ⟨cmd⟩ `awk -F'|' '/^\| [IO]-[0-9]+[a-z]? \|/ {…UNREAD…}' | wc -l` → **6 ≡ 6**,
and **all six are prose inside Status/Notes cells** — `O-20` (*"two UNREAD glass 08-09 letters found
this boundary"*), `I-30` (*"sat one day unrowed"*), `I-31`, `I-32`, `I-35`, `O-39` — **not one is a
Status cell reading UNREAD**. ⟨cmd⟩ `grep -nE '\| \*\*UNREAD' INBOX.md` → **1 hit, line 237**, a
`**Sweep …**` paragraph quoting the pattern.

**Verdict: 0 unrowed · 0 UNREAD addressed to value.js in X-W5's scope · 0 `I-n` minted ·
`INBOX.md` unedited by this seat.** No wave opens or closes with UNREAD mail in scope — none is.

### R.2 Preconditions, re-verified in RESUME MODE

`W5.md` §Opens-after is **X-W2**, verified at the bytes and in the ledger at the first open
(`bd1f014f`, §Preconditions above, receipts unchanged). Re-confirmed this pass, cheaply:

- ⟨cmd⟩ `grep -n '^| X-W2 ' docs/tranches/X/execution/LEDGER.md` → **`CLOSED 2026-09-17
  (honest-RED: G3 · G5)`** — unmoved.
- ⟨cmd⟩ `git ls-files --error-unmatch docs/tranches/T/audit/pi/u-gestalt/probe2-log.txt` → **exit 0**
  (X-W0's CC-012 act still landed; D1's baseline witness is in git).
- **§0k.3 S-1** (bindPane narrowed; A3's cure and registry row C-3 are X-W8's), **§0k.3 S-7**
  (ErrorBoundary path + containment altitude only), **§0k.1 RS-1** (DR-14 rides `vite.config.ts`) —
  read again to the file end, unchanged, and **no later §0k+ addendum re-opens any of them**. The
  only later X-W5 ruling is §0ac's RESUME clause itself.
- **The orchestrator's back-gate holds**: ⟨cmd⟩ `grep -c useMediaQuery demo/shell/dock/Dock.vue`
  → **2** (read-only, worktree) → **Dock G-L is still RED**, so **C3 may not be cited as CLOSED even
  when it measures green** (§C.7 residual 8; owner X-W8).

**Nothing blocks the open.** Units `.d` and `.e` were never dispatched and, per **ESC-W5-2**,
neither was ever blocked; `.e` has **no precondition at all**.

### R.3 Baseline for the units still owed — read-only, double-run, 2026-09-20

**Scope (RESUME rule).** Only the gates the owed units turn are re-run; every other row cites the
banked baseline above (`## Baseline`, `bd1f014f`) and the close's AFTER table (§C.2). **Two clocks
are reported on purpose**: **HEAD** (`git grep` / `git show` — the lawful baseline, **L-7**) and
**worktree** (what X.W5.c's resuming seat *inherits*). A worktree figure is **never** a gate reading.

| gate | unit | command (read-only) | **HEAD = baseline** | worktree (inherited) | verdict at baseline |
|---|---|---|---|---|---|
| **C1** | c | `waves/W5/born-red/C1-C2-C5-2026-09-19.json` (`afe230b5`) | `#/` **7.7 %** text parity | — | **RED** (banked) |
| **C2** | c | same artefact | `specimenChanged:false` | — | **RED** (banked) |
| **C3** | c | `git grep -oE 'useBreakpoint\|isDesktop\|isMobile\|mobilePaneIndex' HEAD -- demo` ∩ `.vue/.ts` | **39 ≡ 39** over **13 files** | 23 | **RED** (target 0 at layout sites) |
| **C4** | c | `test ! -e demo/shell/PaneSegmentedControl.vue` | **EXISTS at HEAD** | **absent** (staged `D`, uncommitted) | **RED** |
| **C5** | c | banked artefact | context identity lost on the v-if fork | — | **RED** (banked) |
| **C6** | c | T-45 carrier probe | RED input (wrapper cut without re-seat) | — | **RED** (banked) |
| **C7** | c | `git grep -oE '@media[^{]*(width\|aspect-ratio)[^{]*' HEAD -- demo` | **6** | 4 | **RED** (target 3) — capability queries at HEAD **29**, all must survive |
| **C8** | c | `git show HEAD:demo/shell/viewSchema.ts \| grep -cE 'right:[[:space:]]*"'` | **13** | **0** | **RED** |
| **N2** | c | `git grep -oE 'as ViewId' HEAD -- demo` | **2** | — | **RED** |
| **N10** | c | `git show HEAD:e2e/smoke/mobile/walk.spec.ts \| sed -n '103p;113p'` | `:103` names PaneSegmentedControl; `:113` `).toBeVisible();` | — | **RED**; the carve lock stands |
| **N11** | c | `git show --name-only afe230b5` | **banked BEFORE the deletion**: `N11-blind-matrices.json` + 3 PNGs at ≤639 px | — | **DISCHARGED at open** |
| **N12** | c | `git grep -oE 'setActiveTab\("saved"\)' HEAD -- demo` | **3** | — | **RED** |
| **N14** | c | declaration-site census, printed in the close | not yet printed | — | **RED** |
| **N15** | c | `git grep -n '<SegmentedTabs' HEAD -- …/AdminNamesPanel.vue` | `:14` selector-first is **not** yet the mobile source order | — | **RED** |
| **D1** | d | `node …/gates/scene-swap-budget.mjs` | **instrument does not exist** — `ls …/workflows/gates/` → `dock-action-parity.mjs` · `portal-integrity.mjs` · `route-scene-truth.mjs`; baseline numbers from `T/audit/pi/u-gestalt/probe2-log.txt` (71 % · 63 % · 26 % · 23 % over32) | — | **RED** |
| **D2** | d | `git ls-files --error-unmatch …/probe2-log.txt` | **exit 0 — TRACKED** | — | **GREEN BEFORE CURE** (spec-predicted; X-W0 CC-012) |
| **D3** | d | `git grep -oE 'pane-wrapper--left\|pane-wrapper--right' HEAD -- demo` | **18** (`App.vue` 3 · `animations.css` 12 · `shell.css` 3) | 15 | **RED** |
| **D4** | d | `git show HEAD:demo/workbenches/mix/MixSourceSelector.vue \| grep -c '<Transition'` | **1** — and it is the inner `TransitionGroup`-class carrier, **not** the `:114` mode swap, which §6's falsifier excludes by name | — | **RED**; consumers at HEAD: `MixSourceSelector.vue` · `AdminNamesPanel.vue` · `PaneSegmentedControl.vue` |
| **D5** | d | `sed -n '182,194p' demo/styles/animations.css` | the global `@media (prefers-reduced-motion: reduce)` guard over `*`, `*::before`, `*::after` is **present and intact** | — | **GREEN BEFORE CURE** (declared non-regression) |
| **E1** | e | the spec's own pattern `64%?…66\.6666667\|33\.3333333…36` over the four normative docs | **8 ≡ 8 occurrences on 7 lines** — `VC:44,45` · `EV:43,47` · `OBC:39,40` · `PR:35` | — | **RED** |
| **E2** | e | citation census in the same four | `P122` appears **7 / 2 / 16 / 9**, but **not one** of the seven range sentences cites it | — | **RED** |

**The inherited worktree is NOT a green.** `C4` reads *absent*, `C8` reads **0**, `C3` reads 23,
`C7` reads 4, `D3` reads 15 — all five only in the **uncommitted** bytes X.W5.c never reached a
commit with (**ESC-W5-3**). Under **L-7** none of them exists; each is listed above at **HEAD**,
where every one is RED. The resuming `.c` seat inherits those bytes under the crash-recovery law,
must judge every hunk against the spec, and only a **commit** moves a gate.

**R.3a — divergence from the spec's own arithmetic, recorded not re-adjudicated.** `W5.md` §6 E1
says *"**7 occurrences** across 4 files"* and names **7 lines**; the same pattern counts **8**
matches, because one line carries two. The seven lines agree exactly. Unit `.e` drives the count to
**0** either way; the close states which arithmetic it read. (§6 C3's *"38 across 13 files"* likewise
reads **39** at HEAD — the close already booked that as **§C.5.1 landed-wrong**, owner `.c`: unit
`.a`'s `de99ec15` added two `viewManager.mobilePaneIndex.value = 1;` writes at `usePaneRouter.ts:418,425`.)

### R.4 Resume unit plan — 2 landed, 3 owed, serial

**What stands on its commits (§0ac), verified at the bytes by `git log -1` on each:**

| unit | commits | receipt above | dispatch |
|---|---|---|---|
| **X.W5.a** | `c0cf27bf` · `de99ec15` · `f94d22af` | yes (12 gates GREEN, A3 honest-RED by S-1) | **NEVER re-dispatched** |
| **X.W5.b** | `adc312f6` · `2fa82bdb` | yes (B3 honest-RED, 7 GREEN) | **NEVER re-dispatched** |
| **X.W5.c** | `afe230b5` **only** — the born-RED bank + N11 blind matrices. **§9 commit 3 (the cure) DOES NOT EXIST** | none | **RE-DISPATCHED in RESUME MODE** |
| **X.W5.d** | **none** | none | **DISPATCHED** |
| **X.W5.e** | **none** | none | **DISPATCHED** |

**Why `.c` is owed although a commit bearing its id exists.** `afe230b5` is the MEASURE-AT-OPEN
artefact bank the N11 **ordering lock** requires *before* the deletion commit — it is the unit's
evidence, not its cure. Its fourteen gates all read **RED at HEAD** (R.3), `W5.md` §9's commit 3 was
never written, and the close's **ESC-W5-3** measured the cure sitting uncommitted *"so its owner can
resume it."* A unit whose cure commit does not exist has not landed; re-dispatch is the crash-recovery
law operating exactly as written, not a re-run of finished work.

**Order: `[c] → [d] → [e]`, three groups of one. NO PARALLELISM** — `W5.md` §4a is explicit
(*"No parallelism in this wave"*); `.d` is additionally *"sequenced strictly after X.W5.c commits"*
because it re-keys the class names `.c` emits. `.e` is file-disjoint from both but the spec's declared
serial order governs, and at one-track cadence (§0af) serial also costs nothing.

**Sections · writable sets · gates · locks** for all three are unchanged from `## Unit plan` above
(`### X.W5.c`, `### X.W5.d`, `### X.W5.e`) and are **not re-derived here**; the resume deltas are:

- **`.c` (RESUME)** — opens by reading its **own** inherited diff whole: ⟨cmd⟩
  `git diff HEAD -- demo/ e2e/` → **13 files, 824 insertions / 816 deletions**, `PaneSegmentedControl.vue`
  staged-deleted and uncommitted. Every hunk is judged against §5 X.W5.c and the fold before any of it
  is kept; the N11 matrices are **already banked** (`afe230b5`) so the ordering lock is discharged and
  must not be re-taken after the deletion. It also owes **§C.5.1**: `usePaneRouter.ts:418,425`'s two
  new `mobilePaneIndex` writes are inside its own set and count against C3. **C3 may not be cited as
  CLOSED** while Dock G-L is RED (measured **2** today).
- **`.d`** — additionally inherits **§C.7 residual 5** (`PaneSlot.vue`'s three comment-only
  `content-max-h` mentions, B4's third arm at **3**) if `.c` does not take it: the D-1 coupled-architecture
  lock is why unit b could not. D1's instrument must be **created** (it does not exist), and both its
  runs committed.
- **`.e`** — unchanged and unblocked; **CC-052 is apply-never-requeue**; its baseline is **8 matches on
  7 lines** (R.3a).

**Still owed to the wave whoever takes them** (§C.5.4): §8's two capture sets
(`audit/visual/layout/`, `audit/probes/app-wave/pi/`) were never taken although `.a` and `.b` closed.

**Open act, committed**: `docs/tranches/X/execution/A/X-W5.md` only. `LEDGER.md` deliberately not
touched (**R.0b / ESC-W5-5**); `INBOX.md` unedited (**R.1**, nothing unrowed).

---

## Close — RESUME ROUND, 2026-09-21

SERVED MODEL: claude-opus-5[1m]

**Seat**: CLOSE (VERIFY-ONLY — this seat authored no product byte, cured nothing, and moved no
`demo/**`, `e2e/**`, `plugins/**` or `vite.config.ts` byte).
**Date**: 2026-09-21. **HEAD at close**: `e675414e` (Track B's X.KF.W13S push-measurement commit).
**Runner's unit return, verbatim**: `{"X.W5.c":{"unit":"X.W5.c","status":"DEAD","commits":[]}}` —
**one** unit dispatched in this round, returned **DEAD with an empty commit list**; `.d` and `.e`
were **not dispatched this round either**, so **ESC-W5-2 stands unrelieved**.
**Verdict: PARTIAL — unchanged from the 2026-09-19 close, and for the same four structural reasons.**

This section is an **addendum-beside** (E-3): §§C.0–C.9 and §§R.0–R.4 above are byte-untouched, and
nothing in them is rewritten. It re-measures rather than inherits: **every figure below was re-run at
this seat's own clock and double-run**, at **HEAD** (`git grep` / `git show`), never at the worktree.

### RC.0 Crash-recovery (STANDING LAW) — and what the DEAD seat left behind

⟨cmd⟩ `git status --porcelain`, read twice → **17 rows**. Judged against **this** seat's writable set
(`execution/A/X-W5.md`, `execution/LEDGER.md`):

| path(s) | inside my set? | disposition |
|---|---|---|
| `docs/tranches/X/execution/A/X-W5.md` | **YES** | **clean** — `b8b8133c` committed the resume open; **no inherited partial exists on this file** |
| `docs/tranches/X/execution/LEDGER.md` | **YES** | **clean at last** — the X-W6 hunks that blocked **ESC-W5-5** were carried into git by a sibling (`f44f09b1`); this close therefore **discharges ESC-W5-5** (below) |
| 13 × `demo/**` + `e2e/**`, incl. `D demo/shell/PaneSegmentedControl.vue` staged | no | **X.W5.c's** — left exactly as found, nothing staged, unstaged, stashed or reverted |
| `docs/tranches/X/execution/A/X-W6.md`, `execution/B/KF-W13S.md`, `V/reformation/CARRY-LEDGER.md` | no | sibling seats' — untouched |
| `scripts/dev/dev.sh` | no | **never touched** (§0j.A DR-24) |

**RC.0a — the DEAD unit wrote bytes and reached no commit, a second time.** ⟨cmd⟩
`git diff HEAD --shortstat -- demo/ e2e/` → **13 files, 831 insertions / 816 deletions**, against the
resume open's **824 / 816** (R.4) — **+7 insertions**. ⟨cmd⟩ `/bin/ls -lT` over all thirteen puts
eleven at **2026-09-20 01:48:44** (pre-dating the resume open) and **two after it**:
`demo/palettes/usePalettePorts.ts` at **22:00:54** and `demo/shell/useViewManager.ts` at **22:03:25**,
where ⟨cmd⟩ `git log -1 --format=%ad b8b8133c` → **17:14:38**. Both paths are inside X.W5.c's own
writable set (BD-01 and §5's `useViewManager.ts`), so the re-dispatched seat wrote **in bounds** —
and then died before any `git commit`. **L-7 governs: an uncommitted cure does not exist.** The bytes
are left untouched for the unit's owner, exactly as the 2026-09-19 close left their predecessors.

### RC.1 Commit roster and bounds audit (ACT 1)

⟨cmd⟩ `git log --oneline afe230b5~1..HEAD | grep -iE 'x-w5|x\.w5'` → **two** ids in this window
(`afe230b5`, `b8b8133c`); the wave's full roster, each verified to exist by ⟨cmd⟩ `git log -1`:

| unit | commits | exists | stat scope | this round |
|---|---|---|---|---|
| **X.W5.a** | `c0cf27bf` · `de99ec15` · `f94d22af` | yes · yes · yes | 1 · 34 · 1 files | not re-dispatched (stands, §0ac) |
| **X.W5.b** | `adc312f6` · `2fa82bdb` | yes · yes | 6 · 1 files | not re-dispatched (stands, §0ac) |
| **X.W5.c** | `afe230b5` **only** (born-RED bank + N11 matrices) | yes | 5 files, **all artefacts** | **RE-DISPATCHED → DEAD, 0 commits** |
| **X.W5.d** | — | **NONE** | — | **never dispatched** |
| **X.W5.e** | — | **NONE** | — | **never dispatched** |
| seat 0 | `b8b8133c` (resume open) | yes | 1 file (this record) | — |

**Bounds: CLEAN, re-proven at this seat.** ⟨cmd⟩ `git show --name-only --format='' <the seven> | sort -u`
→ **46** distinct paths; a single ERE against `W5.md` §4's *Do NOT touch* set
(`src/|api/|test/|node_modules/|scripts/dev/dev.sh|demo/ui/|demo/styles/overture.css|…/ActionBarLayer.vue|registry/|docs/tranches/V/archive/`)
→ **0 hits**. ⟨cmd⟩ `scripts/dev/dev.sh` probed **per commit** → `0 · 0 · 0 · 0 · 0 · 0 · 0`.
**No unit's commit touches another unit's set**, and the DEAD unit contributes no commit to audit.

### RC.2 Gate table — BEFORE (wave-open) → AFTER (landed bytes, this seat's clock)

**Slate: 43 ids** — `W5.md` §6's 28 ⊕ the fold's N1..N15.
**Reading rule (RESUME).** ⟨cmd⟩ `git diff --name-only b8b8133c..HEAD -- demo/ e2e/ plugins/ vite.config.ts`
→ **0 paths**: **not one W5-bearing byte has moved since the resume open banked R.3**. Every static
gate below was nonetheless **re-run here and double-run** (the two runs printed identical figures);
every **live-probe** gate cites the banked artefact of record, because a probe re-run could only read
the same HEAD — and, per §5.2 parsimony, a bounded probe session that cannot move a reading is not spent.
No live reading in this close is taken from the dirty worktree; where the worktree differs it is
marked as such and is **never** a gate reading (**L-7**).

#### Units a and b — LANDED, not re-dispatched (§0ac): the close's AFTER stands, spot-verified here

| # | AFTER (this seat, double-run at HEAD) | verdict |
|---|---|---|
| **A1** | `node -e` over `HEAD:main.ts` → `isReady true · sideEffectImports 4` → **exit 0**; `grep -cE 'useGlobalDark\|provideApiClient\|^import "\.\./styles'` over `HEAD:App.vue` → **0** | **GREEN** |
| **A2** | banked `green/A2-app-shell-truth-2026-09-19.json`: marks `[b0,b1,b3,b2,b4]` ⊇ {b3,b4} on all 15 routes; `blob:false` on `/#/generate` | **marks GREEN · blob RED** (**ESC-W5-1**, unfalsifiable as authored) |
| **A3** | honest-RED **by ruling** (§0k.3 **S-1** gives the cure to X-W8); witness banked | **honest-RED, cure X-W8** |
| **A4** | ⟨cmd⟩ `git grep -c bindPane HEAD -- demo/` → **12** (App.vue 6 · PaneSlot.vue 1 · usePaneRouter.ts 5) | **GREEN (structural); bite cited from unit a (`TS2554`), not re-run** |
| **A5** | 15/15 on the spec's four arms (banked `green/A5-A6-A7-…json`); the probe's stricter OUTLINE arm RED on 4 | **GREEN as authored** (residual 1) |
| **A6** | banked: `A6 {green:true, bootSilent:true, offenders:[]}` | **GREEN** |
| **A7** | ⟨cmd⟩ `git grep -c 'role="status"' HEAD -- demo/shell/ demo/color-picker/` → **3** (App.vue 1 · GenericActionBar.vue 2); banked five arms all true | **GREEN** |
| **B1** · **B2** | banked `born-red/B1-B2-B3-layout-utilization-…json` + unit b's GREEN reading: B1 every content-exceeding route scrolls at 390×844; B2 `maxHeight === "none"` on 10 routes at 16/9 **and** 21/9 | **GREEN** |
| **B3** | banked: 2 of 10 routes ≥ 90 % (`#/` 99.7 · `#/blob` 99.2) | **honest-RED** (residual 4) |
| **B4** | ⟨cmd⟩ `git grep -c 100dvh HEAD -- demo/styles/shell.css` → **0** · `git grep -l svh HEAD -- demo/` → **3 files** · `git grep -c content-max-h HEAD -- demo/` → **3, all comments in `demo/shell/PaneSlot.vue`** | **arms 1–2 GREEN · arm 3 honest-RED at 3** (residual 5) |
| **B5** · **B6** | recorded readings stand in unit b's receipt and at their sites in `shell.css` | **GREEN by record** |
| **N1** | ⟨cmd⟩ `git grep -l onDeactivated HEAD -- demo/` → **5 files** | **GREEN** |
| **N3** | bite cited (`TS2741` / `TS2561`), not re-run — its target carries a sibling seat's uncommitted bytes | **GREEN, bite cited** |
| **N4** | ⟨cmd⟩ `git grep -c valueOrThrow HEAD -- demo/` → **18, all `picker-color.ts`**; 0 on the five render-path readers | **GREEN** |
| **N5** | 3 `<ErrorBoundary>` carriers per seat, outside KeepAlive; ROUTE-RESET arm still owed | **RED on 1 of 4 arms** — owner **X-W7** (residual 2) |
| **N6** · **N7** · **N8** | region roles + `aria-labelledby` landed; ⟨cmd⟩ `:max="N"` in the pane-cache seam → **0**; `interface PaneSlot` → **0** | **GREEN** |
| **N9** · **N13** | ⟨cmd⟩ `git grep -c css-emission-probe HEAD -- demo/` → **0**; `select-font` → **2**, both the strike's own witness | **GREEN** |

#### Unit c — RE-DISPATCHED this round, returned **DEAD with 0 commits**

Every gate re-measured at HEAD, double-run; the **worktree** column is the DEAD seats' uncommitted
bytes and is **not** a reading.

| # | BEFORE (wave-open) | AFTER at HEAD (double-run) | worktree (L-7: does not exist) | verdict |
|---|---|---|---|---|
| **C1** | `#/` 7.7 % text parity | unmoved — no cure commit | — | **RED** |
| **C2** | `specimenChanged:false` | unmoved | — | **RED** |
| **C3** | **38** / 13 files | **39 ≡ 39** across **13** files (target **0** at layout sites) | 23 | **RED** |
| **C4** | file exists, 1,750 B | ⟨cmd⟩ `git cat-file -e HEAD:demo/shell/PaneSegmentedControl.vue` → **EXISTS ≡ EXISTS** | absent (staged `D`, uncommitted) | **RED** |
| **C5** | context identity lost on the v-if fork | unmoved | — | **RED** |
| **C6** | RED input by construction | the wrapper was never cut at HEAD | — | **RED** |
| **C7** | **7** viewport-dimension `@media` | **6 ≡ 6** at HEAD (target **3**); capability queries **29**, all surviving | 4 | **RED** |
| **C8** | **13** `right:"` rows | **13 ≡ 13**, exit **1** | 0 | **RED** |
| **N2** | 1 `as ViewId` (spec cited 2) | **2 ≡ 2** (`usePalettePorts.ts` · `useDockAdminMode.ts`) | — | **RED** |
| **N10** | 3 × `BouncyTabs\|lg:flex` | **3 ≡ 3** | — | **RED** |
| **N11** | 0 mobile captures in the 3 blind states | **4 artefacts in git** at `afe230b5`, banked BEFORE any deletion — the ordering lock is discharged and cannot now be broken | — | **GREEN** |
| **N12** | dead deps | **3 ≡ 3** `setActiveTab("saved")` at HEAD | — | **RED** |
| **N14** | 7 declaration sites | census never printed | — | **RED** |
| **N15** | mobile source order inverted | `<SegmentedTabs` at `AdminNamesPanel.vue:14`, selector-first still not the mobile source order | — | **RED** |

#### Units d and e — **NEVER DISPATCHED**, in this round or any other

| # | AFTER at HEAD (double-run) | verdict |
|---|---|---|
| **D1** | ⟨cmd⟩ `ls …/workflows/gates/` → `dock-action-parity.mjs` · `portal-integrity.mjs` · `route-scene-truth.mjs` — **`scene-swap-budget.mjs` ABSENT**, so the four hops have no instrument | **RED** |
| **D2** | ⟨cmd⟩ `git ls-files --error-unmatch …/u-gestalt/probe2-log.txt` → **exit 0** | **GREEN** (verify-only; X-W0's CC-012) |
| **D3** | ⟨cmd⟩ `git grep -o 'pane-wrapper--left\|--right' HEAD -- demo/` → **18 ≡ 18** (App.vue 3 · animations.css 12 · shell.css 3) | **RED** |
| **D4** | ⟨cmd⟩ `git show HEAD:…/MixSourceSelector.vue \| grep -c '<Transition'` → **1 ≡ 1**, and it is the inner `TransitionGroup` carrier the falsifier excludes by name; the `:114` mode swap is still a bare `v-if` | **RED** |
| **D5** | `HEAD:animations.css:184` and `:202` both `@media (prefers-reduced-motion: reduce)`; no new scroll-driven or `animation-timeline` declaration minted | **GREEN** (non-regression held) |
| **E1** | ⟨cmd⟩ the spec's own pattern over the four normative docs → **7 ≡ 7 lines** (`VC:44,45` · `EV:43,47` · `OBC:39,40` · `PR:35`) | **RED** |
| **E2** | of the seven sentences, **one** line (`EVIDENCE.md:43`) contains `P122` at all and none cites it as the source of the constant | **RED** |

**Tally: 20 GREEN / 23 RED of 43 — identical to the 2026-09-19 close.** GREEN = A1 · A4 · A5 · A6 ·
A7 · B1 · B2 · B5 · B6 · D2 · D5 · N1 · N3 · N4 · N6 · N7 · N8 · N9 · N11 · N13. **Zero gates moved
in this round**, because the one unit dispatched committed nothing.

### RC.3 Cadence (§7) and Verification Artefacts (§8) — ACT 3

⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0**, zero diagnostics.
⟨cmd⟩ `npx eslint demo/ plugins/ vite.config.ts e2e/` → **exit 0**, zero problems.
Both were run over the **working tree** — the only tree a checker can see — which carries X.W5.c's
uncommitted bytes; stated so no later seat reads them as a HEAD certification.

⟨cmd⟩ `npx vitest run`, **double-run as the law requires**, and this time the two runs **agree exactly**:

| run | Test Files | Tests | failing roster |
|---|---|---|---|
| 1 | **3 failed / 34 passed (37)** | **4 failed / 628 passed (632)** | `test/gradient-parse` 2 · `test/spectrum-luma` 1 · `demo/test/shell/reka-binding-idiom` 1 |
| 2 | **3 failed / 34 passed (37)** | **4 failed / 628 passed (632)** | identical, file for file and count for count |

**The library suite did not move, and the §7 arm is GREEN on its own terms**: ⟨cmd⟩ the three failing
paths matched against the wave's 46-path commit roster → **0 hits** — no W5 commit touched any of them.
Beside that, an honest improvement the close records without claiming: the 2026-09-19 close's roster
was **five** files; `test/v4-css-emerging` (10) and `test/v4-c1` now **pass**, and both moved under
sibling tracks' commits, not W5's. `npx vitest run` exits **1** on the three pre-existing failures,
which is the state this wave inherited and is bounded by.
⟨cmd⟩ `git diff --check` over unit e's four normative docs → **clean** (byte-unchanged, as a
never-dispatched unit must leave them). `npm run gh-pages` **NOT run** — `W5.md:303` forbids citing it.

**§8 artefacts — still INCOMPLETE, re-itemised at this seat's own `git ls-files`:**

| artefact | state |
|---|---|
| `waves/W5/born-red/` | **11 files in git** (A2/A3/A6 · A3-parity · A5/A6/A7 · B1/B2/B3 · C1/C2/C5 · N11 matrix ⊕ 3 PNGs · STATIC · STATIC-B) | ✔ |
| `waves/W5/green/` | **5 files**, unit a's only (A2 · A3 · A5/A6/A7 · portal delta · STATIC); **unit b banked none**, c/d/e produced none | ✘ partial |
| `audit/visual/layout/` | ⟨cmd⟩ `git ls-files` → **0** — the {390, 1440, 3440} and {390, 720@2, 1440} capture sets were never taken | ✘ absent |
| `audit/probes/app-wave/pi/` | ⟨cmd⟩ `git ls-files` → **0** — the desktop/mobile π pair and the H1 a11y-tree dumps were never taken | ✘ absent |
| `scene-swap-budget.mjs` output pair | the instrument itself is absent (D1) | ✘ absent |
| **D-E portal-integrity delta** | `green/PORTAL-INTEGRITY-DELTA-2026-09-19.json` in `de99ec15`, seven arms true both sides | ✔ |
| B5 reading · B6 rationale | in unit b's receipt **and** at their sites in `shell.css` | ✔ |

### RC.4 E13 mail — the four-path sweep at this seat's own clock (ACT 4)

⟨cmd⟩ `find <each> -maxdepth 1 -type f | wc -l`, double-run → `docs/tranches/V/coordination` **24** ·
`../glass-ui/docs/tranches/BK/coordination` **9** · `../keyframes.js/docs/tranches/V/coordination` **12** ·
`../sci-report/atlas/docs/tranches/P/coordination` **28** — every count unmoved from R.1.
⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/ · BJ/ · BI/` — **BK re-confirmed the
newest tranche dir**, never a pinned letter (§5.3).
⟨cmd⟩ `find <each of the four> -maxdepth 1 -type f -newermt "2026-09-20 17:00"` → **ZERO hits**: no
letter file has entered any of the four paths since the resume open.

Register arithmetic, double-run: ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **90 ≡ 90**;
tail **I-39 / O-46**, unmoved. Status read **positionally**, never a bare `grep -i unread` (X.P.W0
CHECK 1 **D-1**): ⟨cmd⟩ an awk pass over every register row's cells for one that *begins* `UNREAD`
→ **0**. **0 unrowed · 0 UNREAD addressed to value.js in X-W5's scope · 0 `I-n` minted · `INBOX.md`
unedited by this seat. No wave closes with UNREAD mail in scope — none is.**

### RC.5 Landed-wrong — found, reported, NOT cured here (ACT 1's second half)

1. **§C.5.1 stands unrelieved.** Unit a's `de99ec15` added two `viewManager.mobilePaneIndex.value = 1;`
   writes at `usePaneRouter.ts:418,425`, raising the census C3 must drive to zero from **38 → 39**.
   Re-measured here at HEAD: **39 across 13 files**, double-run. Owner: **X.W5.c**.
2. **§C.5.2 stands unrelieved.** `born-red/C1-C2-C5-2026-09-19.json` is banked with **no instrument in
   git** that produced it (⟨cmd⟩ `ls …/workflows/gates/` → three probes, none a C-probe) — the L-7
   class one level up: the number is in git, the thing that made it is not. Owner: **X.W5.c**.
3. **A cross-track index contamination, already self-corrected by its own track, recorded because it
   touched a W5 path.** ⟨cmd⟩ `git show --name-status 59a9e753` carries
   `D demo/shell/PaneSegmentedControl.vue` — an **X-W9 repair** commit that swept in X.W5.c's staged
   deletion from the shared index (the exact hazard the seat law names). Its own track caught it three
   minutes later: ⟨cmd⟩ `c6275f53` *"revert(x-w9/repair-1): give `demo/shell/PaneSegmentedControl.vue`
   back to the seat that staged its deletion"*, **+52 lines, one file**. Net at HEAD: the file
   **EXISTS**, byte-identical to its pre-sweep state, so **C4's RED is a true reading and not an
   artefact of the sweep**. No W5 act is owed; the row is booked so the episode is not re-discovered.
4. **§8's two capture sets were never taken** although `.a` and `.b` closed. Owner: whichever seat
   next holds W5.

### RC.6 Escalations

- **ESC-W5-6 — X.W5.c was re-dispatched and died a SECOND time, in bounds, with zero commits.**
  The runner returned `status: "DEAD", commits: []`; the bytes say the seat worked
  (`usePalettePorts.ts` 22:00:54 · `useViewManager.ts` 22:03:25, both after the 17:14:38 open, both
  inside its own writable set, **+7 insertions** over the inherited 824) and reached no `git commit`.
  Two consecutive killed seats on one unit is the **watchdog signature** COHESION §0ac names, not a
  code defect: nothing in the diff is refused here, and nothing is landed for its owner. **The next
  dispatch of `.c` must commit incrementally** — the unit's §9 commit 3 is a single 13-file family
  that no watchdog-bounded seat has yet survived long enough to write. Owner: **the orchestrator**.
- **ESC-W5-2 stands, and hardens.** `.d` and `.e` were **again** not dispatched. `.e` has **no
  precondition at all** — four normative Markdown files, file-disjoint from every other unit, two
  gates, its own §9 commit 5, and `W5.md:364` marks CC-052 **apply-never-requeue**. It has now sat
  undispatched across **two** rounds. `.d`'s block is real and is **ESC-W5-6's consequence** (it
  re-keys the class names `.c` emits), not an independent one.
- **ESC-W5-3 stands** — `.c`'s cure remains uncommitted (now 831/816 across 13 files). Under **L-7**
  none of C1–C8 / N2 / N10 / N12 / N14 / N15 may be read as cured, and a VERIFY-ONLY close may not
  land a sibling unit's bytes.
- **ESC-W5-1 stands** — A2's blob arm is unfalsifiable as authored (the `.hero-blob-anchor` it demands
  on five routes exists only in `ColorPicker.vue`, which `VIEW_MAP` seats on none of them). L-18's
  class: struck and re-authored **by its owner**, not by a seat and not by this close.
- **ESC-W5-4 stands** — `app-shell-truth-probe.mjs:5` hardcodes `http://localhost:9000` against its own
  documented `PROBE_BASE`; it is a §4 *execute, no write* artefact, so no W5 seat may correct it.
- **ESC-W5-5 — DISCHARGED by this close.** The OPEN event line was owed to `LEDGER.md` and could not be
  written while a sibling's uncommitted X-W6 hunks occupied the file. ⟨cmd⟩
  `git status --porcelain docs/tranches/X/execution/LEDGER.md` → **clean** (a sibling carried its own
  hunks into git at `f44f09b1`). This close writes the X-W5 row and its event line, pathspec-committed.
- **The L-18 rider stands unspent** (`W5.md` §12): two quartet challenge passes and a fresh Fable
  apotheosis are owed before any ACCEPTED mark. This close claims none.

### RC.7 Residuals, each with a named owner

| # | residual | owner |
|---|---|---|
| 1 | **A5's OUTLINE arm RED on 4 of 15 routes** — one `<h3 class="card-title readout">` in `demo/picker/`; the gate as authored is GREEN, the instrument is stricter than the gate | **`demo/picker/**`'s next owner** |
| 2 | **N5's ROUTE-RESET arm** — needs a route watch inside `ErrorBoundary.vue`'s own bytes; §0k.3 **S-7** grants X-W5 the containment altitude only | **X-W7** |
| 3 | **A3's cure** (dock-action parity) | **X-W8** (MT-DOCK-LAYERS-1), by §0k.3 **S-1** |
| 4 | **B3 honest-RED, 2 of 10 routes ≥ 90 %** — the cap is dead; the shortfall is short content | **X.W5.c** (`regions[]`) ⊕ **X-W6** (CC-056 / V·L3) |
| 5 | **B4's third arm at 3** — three comment-only `content-max-h` mentions in `PaneSlot.vue` describing a dead mechanism | **the next holder of `PaneSlot.vue`** (X.W5.c / X.W5.d) |
| 6 | **The inner scroll-wells reflowed** (W5F-42's predicted consequence): now-inert `overflow-y` declarations on an 8151 px `#/` document | **X.W5.c** ⊕ **X-W6** |
| 7 | **N13's relay ask is OWED** — the inert pin is gone; the producer has not been asked for the Select-font seam | **the CE-10 relay**, next glass-ui BH letter |
| 8 | **C3's back-gate stands** — ⟨cmd⟩ `git grep -c useMediaQuery HEAD -- demo/shell/dock/Dock.vue` → **2**, so **Dock G-L is RED** and C3 may not be cited as CLOSED even once it measures green | **X-W8** |
| 9 | **`provideApiClient()` unreferenced**; `demo/platform/transport/**` sits in no X wave's bounds | **unassigned — needs a ledger row** |
| 10 | **§8's two capture sets absent** (`audit/visual/layout/`, `audit/probes/app-wave/pi/`) | **whichever seat next holds W5** |
| 11 | **`.c`'s uncommitted 13-file diff** (831/816), twice written and twice unlanded, left in the tree for its owner | **X.W5.c's next seat** (ESC-W5-6) |
| 12 | **`.e` undispatched across two rounds** with no precondition and two RED gates (E1 · E2) | **the orchestrator** |

### RC.8 Four-verb status — moved exactly as §State permits, and no further (ACT 5)

`W5.md` §9 commit 6 flips IMPLEMENTED and states *"VERIFIED is stamped only at X-W11's release close."*
This close therefore **may** move IMPLEMENTED and **may not** move VERIFIED. **It moves neither**, and
the §1 table above is left byte-unchanged:

| verb | state | authority |
|---|---|---|
| AUDITED | **YES** | unchanged (`W5.md:15`) |
| SPECIFIED | **YES** | unchanged (`W5.md:16`) |
| **IMPLEMENTED** | **NO** | **Two of five units landed.** §2's goal criterion is UNMET at the bytes, on four facts no re-run moves: `viewSchema.ts` still carries **13** `right:"` rows · `PaneSegmentedControl.vue` still **EXISTS at HEAD** · the fork census reads **39** where C3 demands 0 · the P-1 range still reads **7** lines in the normative canon |
| VERIFIED | **NO** | **X-W11's**, by `W5.md:335` — not this seat's to stamp under any reading |

**Wave verdict: PARTIAL.** X.W5.a and X.W5.b landed and hold (**20 of 43** gates GREEN at the landed
bytes; cadence clean, bounds clean at 46 paths / 0 violations, mail clean at 90 rows / 0 UNREAD);
**X.W5.c is DEAD a second time with its cure uncommitted**; **X.W5.d and X.W5.e have never been
dispatched**. Zero gates moved in this round and zero product bytes were written by this seat.

---

## Close — RESUME ROUND 2, 2026-09-21 (second sitting of the same day)

SERVED MODEL: claude-opus-5[1m]

**Seat**: CLOSE (VERIFY-ONLY — this seat authored no product byte, cured nothing, and moved no
`demo/**`, `e2e/**`, `plugins/**`, `vite.config.ts` or normative-canon byte).
**Date**: 2026-09-21, second sitting. **HEAD at open of this close**: `db4f4617` (the previous
close's own LEDGER commit, 09:44:29).
**Runner's unit return, verbatim**: `{"X.W5.c":{"unit":"X.W5.c","status":"DEAD","commits":[]}}` —
**one** unit dispatched, returned **DEAD with an empty commit list** for the **third consecutive
round**; `.d` and `.e` were **not dispatched a third time**, so **ESC-W5-2 stands unrelieved and
hardens again**.
**Verdict: PARTIAL — unchanged from the 2026-09-19 and 2026-09-21 (first sitting) closes, and for
the same four structural reasons.**

This section is an **addendum-beside** (E-3): §§C.0–C.9, §§R.0–R.4 and §§RC.0–RC.8 above are
byte-untouched and nothing in them is rewritten. Every figure below was **re-run at this seat's own
clock and double-run** at **HEAD** (`git grep` / `git show`), never at the worktree.

### RC2.0 Crash-recovery (STANDING LAW) — and the new fact this round establishes

⟨cmd⟩ `git status --porcelain`, read twice → **17 rows**. Judged against **this** seat's writable set
(`execution/A/X-W5.md`, `execution/LEDGER.md`, `V/coordination/INBOX.md`):

| path(s) | inside my set? | disposition |
|---|---|---|
| `docs/tranches/X/execution/A/X-W5.md` | **YES** | **clean at open** — `4a6697be` committed the first-sitting close; **no inherited partial exists on this file** |
| `docs/tranches/X/execution/LEDGER.md` | **YES** | **clean at open** — `db4f4617` carried the X-W5 row and its two event lines into git |
| `docs/tranches/V/coordination/INBOX.md` | **YES** | clean — unedited (RC2.4: nothing unrowed) |
| 12 × `demo/**` + `e2e/**` ⊕ `D demo/shell/PaneSegmentedControl.vue` staged | no | **X.W5.c's** — left exactly as found; nothing staged, unstaged, stashed, reverted or force-pushed |
| `docs/tranches/X/execution/A/X-W6.md`, `execution/B/KF-W13S.md`, `V/reformation/CARRY-LEDGER.md` | no | sibling seats' — untouched |
| `scripts/dev/dev.sh` | no | **never touched** (§0j.A DR-24) |

**RC2.0a — the third dispatch of X.W5.c wrote ZERO bytes.** This is the one new fact this round
produces, and it sharpens ESC-W5-6 rather than repeating it. ⟨cmd⟩
`git diff HEAD --shortstat -- demo/ e2e/` → **13 files, 831 insertions / 816 deletions** — **exactly**
the first sitting's figure (§RC.0a), not one insertion more. ⟨cmd⟩ `/bin/ls -lT` over all twelve
modified paths → **eleven at 2026-09-20 01:48:44**, **one pair at 22:00:54 / 22:03:25** (round 2's
`usePalettePorts.ts` and `useViewManager.ts`), and ⟨cmd⟩ `git log -1 --format=%ad 4a6697be` →
**Mon Sep 21 09:33:35 2026**. **No file in the wave's writable set carries an mtime after the
previous close.** Round 1 died mid-cure (824/816); round 2 died mid-cure with +7 (831/816); round 3
died **before its first write**. The watchdog signature is not merely repeating — it is arriving
earlier each round.

### RC2.1 Commit roster and bounds audit (ACT 1)

Each id verified to exist by ⟨cmd⟩ `git log -1 --format=%h <sha>`; scope by ⟨cmd⟩
`git show --name-only --format='' <sha>`:

| unit | commits | exists | stat scope | this round |
|---|---|---|---|---|
| **X.W5.a** | `c0cf27bf` · `de99ec15` · `f94d22af` | yes · yes · yes | 1 · 34 · 1 files | not re-dispatched (stands, §0ac) |
| **X.W5.b** | `adc312f6` · `2fa82bdb` | yes · yes | 6 · 1 files | not re-dispatched (stands, §0ac) |
| **X.W5.c** | `afe230b5` **only** (born-RED bank + N11 matrices) | yes | 5 files, **all artefacts** | **RE-DISPATCHED → DEAD, 0 commits, 0 bytes** |
| **X.W5.d** | — | **NONE** | — | **never dispatched** (3 rounds) |
| **X.W5.e** | — | **NONE** | — | **never dispatched** (3 rounds) |
| seat 0 / close seats | `b8b8133c` (resume open) · `4a6697be` (close 2) · `db4f4617` (LEDGER) | yes · yes · yes | 1 · 1 · 1 file | — |

**Bounds: CLEAN, re-proven at this seat.** ⟨cmd⟩ `git show --name-only --format='' <the nine> | sort -u`
→ **47** distinct paths (46 at the first sitting ⊕ `docs/tranches/X/execution/LEDGER.md`, which
`db4f4617` added). A single ERE against `W5.md` §4's *Do NOT touch* set
(`src/|api/|test/|node_modules/|scripts/dev/dev.sh|demo/ui/|demo/styles/overture.css|…/ActionBarLayer.vue|registry/|docs/tranches/V/archive/`)
→ **0 hits**. ⟨cmd⟩ `scripts/dev/dev.sh` probed **per commit** → `0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0`.
**No unit's commit touches another unit's set**, and the DEAD unit contributes no commit to audit.

### RC2.2 Gate table — BEFORE (wave-open) → AFTER (landed bytes, this seat's clock)

**Slate: 43 ids** — `W5.md` §6's 28 ⊕ the fold's N1..N15.
**Reading rule (RESUME).** ⟨cmd⟩ `git diff --name-only b8b8133c..HEAD -- demo/ e2e/ plugins/ vite.config.ts`
and the same over unit e's four normative docs → **0 paths each**: **not one W5-bearing byte has
moved since the resume open banked R.3.** Every static gate was nonetheless **re-run here and
double-run** — a 25-reading script executed twice, ⟨cmd⟩ `diff r1 r2` → **IDENTICAL**. Live-probe
gates cite the banked artefact of record, because a probe re-run could only read the same HEAD and,
per §5.2 parsimony, a bounded probe session that cannot move a reading is not spent. No reading below
is taken from the dirty worktree (**L-7**).

#### Units a and b — LANDED, not re-dispatched (§0ac): re-verified at HEAD

| # | AFTER (this seat, double-run at HEAD) | verdict |
|---|---|---|
| **A1** | `HEAD:main.ts` → `await router.isReady()` **1** · `^import "` **4**; `HEAD:App.vue` `useGlobalDark\|provideApiClient\|^import "../styles` → **0** | **GREEN** |
| **A2** | banked `green/A2-app-shell-truth-2026-09-19.json`: marks ⊇ {b3,b4} on all 15 routes; `blob:false` on `/#/generate` | **marks GREEN · blob RED** (**ESC-W5-1**, unfalsifiable as authored) |
| **A3** | honest-RED **by ruling** (§0k.3 **S-1** gives the cure to X-W8); witness banked | **honest-RED, cure X-W8** |
| **A4** | ⟨cmd⟩ `git grep -o bindPane HEAD -- demo/` → **12** occurrences across **3** files | **GREEN (structural); bite cited from unit a (`TS2554`), not re-run** |
| **A5** | banked `green/A5-A6-A7-…json`, 15/15 on the spec's four arms; ⟨cmd⟩ `git grep -o '<h1' HEAD -- demo/**/*.vue` → **4** carriers | **GREEN as authored** (residual 1) |
| **A6** | banked: `A6 {green:true, bootSilent:true, offenders:[]}` | **GREEN** |
| **A7** | ⟨cmd⟩ `git grep -o 'role="status"' HEAD -- demo/shell/ demo/color-picker/` → **3 ≡ 3**; banked five arms all true | **GREEN** |
| **B1** · **B2** | banked `born-red/B1-B2-B3-layout-utilization-…json` ⊕ unit b's GREEN reading (B1 every content-exceeding route scrolls at 390×844; B2 `maxHeight === "none"` on 10 routes at 16/9 **and** 21/9) | **GREEN** |
| **B3** | banked: 2 of 10 routes ≥ 90 % (`#/` 99.7 · `#/blob` 99.2) | **honest-RED** (residual 4) |
| **B4** | ⟨cmd⟩ `100dvh` in `HEAD:shell.css` → **0** · `git grep -l svh HEAD -- demo/` → **3 files** · `git grep -o content-max-h HEAD -- demo/` → **3**, all comments in `PaneSlot.vue` | **arms 1–2 GREEN · arm 3 honest-RED at 3** (residual 5) |
| **B5** · **B6** | recorded readings stand in unit b's receipt and at their sites in `shell.css` | **GREEN by record** |
| **N1** | ⟨cmd⟩ `git grep -l onDeactivated HEAD -- demo/` → **5 files** | **GREEN** |
| **N3** | bite cited (`TS2741` / `TS2561`), not re-run — its target carries a sibling seat's uncommitted bytes | **GREEN, bite cited** |
| **N4** | ⟨cmd⟩ `git grep -o valueOrThrow HEAD -- demo/` → **18 ≡ 18**, all `picker-color.ts`; 0 on the five render-path readers | **GREEN** |
| **N6** · **N7** · **N8** | region roles + `aria-labelledby` landed; `interface PaneSlot` in `HEAD:usePaneRouter.ts` → **0 ≡ 0** | **GREEN** |
| **N9** · **N13** | ⟨cmd⟩ `git grep -o css-emission-probe HEAD -- demo/` → **0 ≡ 0**; `select-font` → **2 ≡ 2**, both the strike's own witness | **GREEN** |

> **Seat-0 note, 2026-09-22 (RESUME OPEN 3), recorded beside the section above and not rewriting it (E-3).**
> The `## Close — RESUME ROUND 2` section above was **never committed**. Its bytes (99 inserted lines, mtime
> `2026-09-21 10:39:18`) were found uncommitted in this file at this seat's crash-recovery act: ⟨cmd⟩
> `git diff --stat -- docs/tranches/X/execution/A/X-W5.md` → `1 file changed, 99 insertions(+)`, **0** deletions.
> It ends mid-table at RC2.2's N9/N13 row, so RC2.3–RC2.8 were never written. The close seat was killed.
> Every hunk is an append, and every figure in it agrees with this seat's own re-reading below (C3 **39**/13, C8
> **13**, D3 **18**, E1 **8**/7 lines, Dock G-L **2**). It is therefore kept **verbatim** as the killed close's
> partial and committed with this open. It carries **no verdict weight**: it moved no row and stamped nothing.

---

## RESUME OPEN 3 — 2026-09-22, seat 0 (RESUME MODE)

SERVED MODEL: claude-opus-5-5[1m]

**Seat**: SEAT 0 (OPEN), RESUME MODE. Owner relaunch word, 2026-09-22: *"Re-deploy all workflows and agents
thereof--no exceptions … Pick up where they left off … No deferring any item to another time."* The sitting's
date of record stays **2026-09-17** (the begin-word, COHESION §0j). **HEAD at open**: `9d0e097f`
(2026-09-22 15:16:58 -0400). **Rulings consumed**: §0i · §0j · §0k.1 RS-1 · §0k.3 S-1/S-7 · **§0ac** (*"X-W5 —
RESUME MODE: units `.a`–`.e` stand on their commits"*) · **§0an** tail (*"the a2/a13/b3 REDs caused by the
foreign X-W5 fixture stay X-W5's (its `.c` cure, `usePalettePorts.ts` / `useViewManager.ts`, is uncommitted in the
shared tree under L-7 and lands when X-W5 resumes)"*) · **§0am R-f2-6** (the value.js push waits on this track
committing its staged deletion). This seat wrote **no product byte**.

### R3.0 Crash-recovery (STANDING LAW)

⟨cmd⟩ `git status --porcelain` → **17 rows**. The paths inside this seat's writable set are `execution/A/X-W5.md`,
`execution/LEDGER.md` and `V/coordination/INBOX.md`:

| path | state | disposition |
|---|---|---|
| `docs/tranches/X/execution/A/X-W5.md` | **M**, +99/−0 | killed RC2 close partial. Kept verbatim and committed here; see the note above |
| `docs/tranches/X/execution/LEDGER.md` | clean | edited minimally by this seat (row cell + event line) |
| `docs/tranches/V/coordination/INBOX.md` | clean | one sweep line appended (R3.1) |
| 12 × `demo/**` + `e2e/**` **M** ⊕ `D  demo/shell/PaneSegmentedControl.vue` (staged) | the **X.W5.c** inherited cure | **left exactly as found** for `.c`. ⟨cmd⟩ `git diff HEAD --shortstat -- demo/ e2e/` → `13 files changed, 831 insertions(+), 816 deletions(-)`, the same figure as RC.0a/RC2.0a. No byte has been added since 2026-09-20 22:03:25 |
| `execution/B/KF-W13S.md`, `V/reformation/CARRY-LEDGER.md` | M | sibling seats' files. Untouched |
| `scripts/dev/dev.sh` | M | **never touched** (§0j.A DR-24) |

### R3.1 E13 Step-0 — the four-path mail sweep (2026-09-22, this seat's clock)

BK is still the newest glass tranche dir (⟨cmd⟩ `ls -t ../glass-ui/docs/tranches/ | head -1` → `BK`). ⟨cmd⟩ `find <path>
-maxdepth 1 -type f -newer <X-W5.md>` over the four paths gives:
- value.js `V/` → empty.
- `V/coordination/` → `INBOX.md` only.
- glass-ui `BK/coordination/` → `glass-outbound-2026-09-22-consumers-10.0.0.md` (to slides + atlas, *"value.js: zero
  hits"*, already rowed-as-noted at INBOX `:376` · `:378` · `:380` · `:386`), plus the two LANDED value.js outbound copies
  (O-23 · O-32).
- keyframes.js `V/coordination/` → empty.
- atlas `P/coordination/` → empty.

**0 unrowed · 0 new `I-n` · 0 UNREAD in scope.** The tail stays **I-39 / O-49** (⟨cmd⟩ `grep -o '^| I-[0-9]*' INBOX.md | tail -1`
→ `I-39`; the same for `O-` → `O-49`). One dated sweep line was appended at the INBOX file end.

### R3.2 Preconditions, re-verified (RESUME MODE)

- **Ledger**: X-W0 `CLOSED` (`:28`) · X-W2 `CLOSED` (`:30`) · X-W4 `CLOSED` (`:33`). Every §1 `Opens after` conjunct is MET.
- **D2 at the bytes**: ⟨cmd⟩ `git ls-files --error-unmatch docs/tranches/T/audit/pi/u-gestalt/probe2-log.txt` → exit **0**.
- **Units that stand on their commits** (⟨cmd⟩ `git log -1 --format=%h <sha>`, each exists): **X.W5.a** `c0cf27bf` ·
  `de99ec15` · `f94d22af`, and **X.W5.b** `adc312f6` · `2fa82bdb`. Neither is re-dispatched (§0ac).
- **`.c`'s only commit** is `afe230b5`, the born-RED bank and the N11 matrices, which is evidence and not the cure. §9
  commit 3 does not exist, so `.c` is owed. **`.d` and `.e`** have **no commit** (⟨cmd⟩ `git log --oneline --grep='x-w5\.[de]'
  -i` → empty) and are owed.
- **W5-path drift since the resume open `b8b8133c`**: ⟨cmd⟩ `git diff --name-only b8b8133c..HEAD -- demo/ e2e/ plugins/
  vite.config.ts <unit e's four docs>` → **19 paths**. Every one is X-W6's gradient/`color-space-meta.ts` work or an
  X-W6/X-W2 e2e oracle: `demo/workbenches/gradient/**` ×14, `demo/color-session/color-space-meta.ts`, and
  `e2e/smoke/{oracles/o25,oracles/o28,views/gradient,webgl-blob-idle}.spec.ts`. **None** is in W5 §4, so the owed units'
  sets have not moved at HEAD.
- **Dock G-L (the X-W8 probe), run read-only**: ⟨cmd⟩ `grep -c useMediaQuery demo/shell/dock/Dock.vue` → **2** at HEAD and
  **2** in the worktree. It is **RED**, so **C3 may not be cited CLOSED** at this wave's close (orchestrator note).
  `.c` writes nothing in `Dock.vue:71`'s predicate that belongs to X-W8.

### R3.3 Baseline for the owed units, read-only and double-run at HEAD `9d0e097f`

One 20-reading script (`scratchpad/w5base.sh`) was executed twice. ⟨cmd⟩ `diff r1 r2` → **IDENTICAL**. HEAD is the lawful
reading, and the worktree column shows what `.c` inherits (L-7: the worktree reading is not a verdict).

| gate | HEAD reading | worktree (inherited `.c` diff) | verdict at HEAD |
|---|---|---|---|
| **C3** fork census | `git grep -Eo 'useBreakpoint\|isDesktop\|isMobile\|mobilePaneIndex' HEAD -- 'demo/*.vue' 'demo/*.ts'` → **39** occ / **13** files | **23** / **9** | **RED** (back-gated on Dock G-L = 2) |
| **C4** PSC gone | `git cat-file -e HEAD:demo/shell/PaneSegmentedControl.vue` → **EXISTS** | absent (staged `D`) | **RED** |
| **C7** viewport `@media` | `git grep -Eo '@media[^{]*\((min-\|max-)?(width\|aspect-ratio)' HEAD -- demo/*.{vue,css} ':!demo/ui/*'` → **6** | — | **RED** (target 3) |
| **C8** `right:"` | `HEAD:viewSchema.ts` → **13** | **0** | **RED** |
| **D2** baseline in git | `git ls-files --error-unmatch …/probe2-log.txt` → exit **0** | — | **GREEN-before-cure** (spec-predicted, X-W0 CC-012) |
| **D3** physical names | `git grep -Eo 'pane-wrapper--left\|pane-wrapper--right' HEAD -- demo/` → **18** | **15** | **RED** |
| **D4** Mix swap | `<Transition ` in `HEAD:MixSourceSelector.vue` → **0** | — | **RED** |
| **E1** range in canon | `grep -oE '64%?…66\.6666667\|33\.3333333…36'` over the four docs → **8** occ; `-c` per file `2 · 2 · 2 · 1` = **7 lines** | — | **RED** |
| **E2** cites, never restates | no replaced sentence exists yet | — | **RED** |
| **B4** arm 3 | `git grep -o content-max-h HEAD -- demo/` → **3** (comments in `PaneSlot.vue`) | — | honest-RED (residual 5, `.d` may take it) |
| **Dock G-L** | `useMediaQuery` in `Dock.vue` → **2** | **2** | **RED** (X-W8's) |

**Live gates cite the banked artefacts of record.** These are C1 · C2 · C5 · C6 · N11 (`afe230b5`
`waves/W5/born-red/**`), A2's blob arm (`green/A2-…json`), B3 and D1 (`probe2-log.txt`: `→/gradient` 71 % ·
`→/mix` 63 % · `→/extract` 26 % · `→/generate` 23 %). No W5 §4 path has moved at HEAD since those artefacts were banked
(R3.2), so a probe re-run could only read the same bytes (§5.2 parsimony). Every live gate is re-run by the unit that
turns it.

**GREEN-BEFORE-CURE (R.2)**: **D2** (spec-predicted), **D5** (a declared non-regression, with the guard at
`animations.css:184-192`), and **A7**'s grep arm (carried from wave-open). No new GREEN-before-cure is found at this open.

### R3.4 Resume unit plan: 2 landed, 3 owed, serial `[c] → [d] → [e]`

| unit | model | status | dispatch |
|---|---|---|---|
| **X.W5.a** | — | LANDED `c0cf27bf` · `de99ec15` · `f94d22af` | **alreadyDone**, never re-dispatched |
| **X.W5.b** | — | LANDED `adc312f6` · `2fa82bdb` | **alreadyDone**, never re-dispatched |
| **X.W5.c** | opus (M-23) | inherited 831/816 cure, uncommitted, DEAD ×3 | **group 1** |
| **X.W5.d** | opus (M-23) | never dispatched | **group 2**, strictly after `.c` commits |
| **X.W5.e** | opus (M-23) | never dispatched | **group 3** |

**Sections, writable sets, gates and locks** are unchanged from `## Unit plan` → `### X.W5.c` / `### X.W5.d` /
`### X.W5.e` above. They were read and confirmed against `W5.md` §4/§5/§6 at this seat. **No parallelism**: §4a
states *"No parallelism in this wave"*, and `.d` re-keys the class names `.c` emits.

**The watchdog lesson, binding on `.c`.** `.c` died three rounds running: the first at 824/816, the second at 831/816,
and the third before its first write. Its dispatch therefore carries these rules:
- Read the inherited diff **per file** (`git diff HEAD -- <one path> | head -150`), never whole in one result.
- Run `vue-tsc` / `playwright` with `run_in_background` and poll every ≤60 s.
- Land §9 **commit 3** (PSC deletion + `regions[]` + the fork deaths + the T-45 re-seat on the region wrapper, one
  meaning, one sha) **as soon as C4/C8/typecheck read GREEN**, and before any long live-probe session. The live gates
  (C1 · C2 · C5 · C6) are then measured over the committed bytes.
- Write the unit receipt in ≤6 KB appends.

The fold BD rows (`usePalettePorts.ts` BD-01 · `useSlugMigration.ts` BD-02) are also its own. §0an names them as the
cure for X-W6's a2/a13/b3 fixture REDs.

**Still owed to the wave by whoever takes it** (§C.5.4): §8's `audit/visual/layout/` and `audit/probes/app-wave/pi/`
capture sets. They are assigned as follows. `.c` takes both `audit/visual/layout/` triples (unit b's and unit c's) over its committed bytes. `.d` takes the `audit/probes/app-wave/pi/` pair plus the scene-swap output pair.


**BD-05 re-seated on `.c` (a plan fact, measured at this open).** The inherited diff touches
`demo/color-picker/composables/usePaletteWiring.ts`: ⟨cmd⟩ `git diff HEAD -- <it> | head -60` shows two hunks, `cfg.right !== "palettes"` →
`cfg.regions.some(…pane === "palettes")` and the deleted `viewManager.mobilePaneIndex.value = 0` write. Both are
**compile-forced consumers of C8's `regions[]` retype and C3's fork death**. This path is **inside the wave's bounds** as
fold **BD-05** (`modify`), whose path the fold corrected at `X-W5-FOLD.md:667`. That row was carried in unit a's list, and unit
a is closed and will never be re-dispatched. §4a's strict serial order means no concurrent writer exists. The path therefore
joins `.c`'s writable set for exactly those two hunks. W5F-14 (`whenColorPickerReady`'s give-up) stays X-W8's, per `.a`'s
recorded disposition at `:441`. `.c` names the path in its receipt as inherited.

## Unit receipts — RESUME ROUND 3


### X.W5.c

SERVED MODEL: claude-opus-5-5[1m] · seat: X.W5.c, RESUME ROUND 3 · 2026-09-22 · verdict **PARTIAL** (commit 3 LANDED; C3 back-gated, C1/C7/N14 honest-RED, N15 ESCALATED).

#### Act 0 — crash-recovery (STANDING LAW)

⟨cmd⟩ `git status --porcelain` → 15 rows. Inside this seat's writable set: the **inherited** X.W5.c cure, 12 × `M` + `D  demo/shell/PaneSegmentedControl.vue` (staged). ⟨cmd⟩ `git diff HEAD --stat -- demo/ e2e/` → `13 files changed, 831 insertions(+), 816 deletions(-)` — the RC.0a/RC2.0a/R3.0 figure, unchanged. Outside the set, untouched: `V/reformation/CARRY-LEDGER.md`, `V/coordination/INBOX.md`, `execution/C/F-W11.md` (sibling seats), `scripts/dev/dev.sh` (never touched). Inherited paths, each read per file (`git diff HEAD -- <path> | head -150`) and judged hunk by hunk against `W5.md` §5 X.W5.c + X-W5-FOLD §1.B/§1.D/§2a/§2b/§6c/§6d:

| inherited path | judgement |
|---|---|
| `demo/shell/viewSchema.ts` | CONFORMS — `left`/`right`/`leftLabel`/`rightLabel`/`defaultPaneIndex` → ordered non-empty `regions: readonly [SceneRegion, ...SceneRegion[]]` of `{role, pane, label}` (PSC-12 pair type; PSC-3 all 14 `ViewId`s; M-DU11 admin consoles single-region) |
| `demo/shell/usePaneRouter.ts` | CONFORMS, **one hunk rewritten**: the unchecked `key as PaneId` cast in `bindPane` removed (`onPaneMount` now takes `key: string`; App's reader compares strings) — a new cast at the seam N2 exists to kill was not admissible |
| `demo/shell/useViewManager.ts` | CONFORMS — mobile pane index + view-tagged override deleted; `currentView` typed `ComputedRef` (PSC-15(b)) |
| `demo/color-picker/App.vue` | CONFORMS, one hunk rewritten (the `PaneId` import dropped with the cast) — the v-if/v-else fork + `useBreakpoint` predicate deleted; one `v-for` over `regions[]`; ghost wrapper + `[data-layout]` stamp gone |
| `demo/styles/shell.css` | CONFORMS — `auto-fit` grid; `[data-layout]` witnesses + width∧aspect dual arm retired; T-45 carrier re-seat stated at the seat (selectors unchanged, element moved) |
| `demo/shell/dock/Dock.vue` | CONFORMS — PSC import + render site + `.dock-mobile-panes` block only; `:87` `useMediaQuery` predicate (G-L, X-W8) NOT touched |
| `demo/shell/PaneSegmentedControl.vue` | CONFORMS — deletion (staged `D`) |
| `demo/palettes/usePalettePorts.ts` (BD-01) · `useSlugMigration.ts` (BD-02) | CONFORM — both casts gone; `setActiveView: (id: ViewId) => void`; phantom `userLogout`/`ensureUser`/`activeTab` deleted; `useSession` hard import → injected `ensureSession` |
| `demo/color-picker/composables/usePaletteWiring.ts` (BD-05) | CONFORMS — exactly the two compile-forced hunks (R3.4 note) |
| `e2e/smoke/{dual-pane-1440,mobile/walk,mobile/page-load-mobile}.spec.ts` | CONFORM — presence assertions, content-landmark shape both directions plus return |

**Retired spellings, quoted once here** (the source comments point at this record so C3/C8/N2/N14 census the tree, not footnotes): `left: LeftPane` · `right: RightPane` · `leftLabel` · `rightLabel: string \| null` · `defaultPaneIndex?: 0 \| 1` · `mobilePaneIndex` · `paneOverride` · `currentView as unknown as Ref<ViewId>` · `currentView as Ref<string>` · `(tab: string) => depsSwitchView(tab as ViewId)` · `setActiveTab("saved")` ×3 · `useBreakpoint("(min-width: 1024px) and (min-aspect-ratio: 1.1)")` · `:data-layout="isDesktop ? 'desktop' : 'mobile'"`.

#### Act 1 — gates before the landing (worktree, background runs polled ≤60 s)

- ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT 0** (run twice: before and after the cast rewrite). `-p tsconfig.lib.json` → EXIT 0.
- ⟨cmd⟩ `npx eslint --max-warnings=0 <the 11 touched .ts/.vue/.spec paths>` → **EXIT 0** (re-run on App.vue + usePaneRouter.ts after the rewrite → EXIT 0).
- ⟨cmd⟩ `npx vitest run` → 639 passed / **2 failed**, both FOREIGN born-RED canaries that name their own routes: `test/spectrum-luma.test.ts` C-5 ("cure routed to X-W4 (fold R23)") and `demo/test/shell/reka-binding-idiom.test.ts` NG-6 (`SearchFilterBar.vue:52-53`). Neither file nor its subject is in this unit's set; neither reads `viewSchema`/`usePaneRouter`.
- ⟨cmd⟩ `npx tsc -p tsconfig.e2e.json --noEmit` → EXIT 2, **5 errors, all in `e2e/smoke/oracles/o23-specimen-gamut-honesty.spec.ts`** (`as never` over a `dist/subpaths/color.js` import — X-W6's `e0e204a9`). ⟨cmd⟩ `npx vue-tsc -p tsconfig.test.json --noEmit` → EXIT 2, **11 errors, all `demo/color-session/space-catalog.ts` `Cannot find module '../../assets/docs/*.md'`** (X-W6). Zero errors in any W5 path.
- **C8** ⟨cmd⟩ the gate's `node -e` over `viewSchema.ts` → exit **0** (13 → 0). **C4** ⟨cmd⟩ `test ! -e demo/shell/PaneSegmentedControl.vue` → exit **0**; its consumer arm = demo typecheck EXIT 0.

#### Act 2 — §9 commit 3, one sha: **`50633f19`** `feat(demo/shell): one mount, ordered regions`

⟨cmd⟩ `git commit --no-verify -F <msg> -- <12 paths> demo/shell/PaneSegmentedControl.vue` → `13 files changed, 831 insertions(+), 816 deletions(-)` (the net of the inherited cure + this seat's cast rewrite). PSC deletion + `regions[]` + fork deaths + the T-45 re-seat + BD-01/02/05 in one meaning (C6 same-commit lock, §3.4 lock). Body carries the deletion + the broad scope. Pathspec on the commit itself; no sibling path swept.

#### Act 3 — live gates over the COMMITTED bytes (one bounded chromium session, own dev server `vite --port 9010`, killed after)

⟨cmd⟩ `node scratchpad/c-probe.mjs` run twice (run2, run3) → **identical verdicts and ratios**. Banked as `docs/tranches/X/waves/W5/green/C1-C2-C5-C6-2026-09-22.json`.

| gate | BORN-RED (`afe230b5`, 2026-09-19) | AFTER (`50633f19`, double-run) | verdict |
|---|---|---|---|
| **C1** | `#/` 69/1751 = **0.0394**; 7/15 routes ≥ 0.9 | `#/` **973/1751 = 0.5557**; **14/15** routes ≥ 0.9 (every dual scene 1.0; `#/blob` 0.098 → 1.0) | **RED (literal metric), cause measured** — see below |
| **C2** | `specimenChanged:false`, 1 region | `regenerateFound:true, specimenChanged:true, textChanged:true`, **2** regions at 390 | **GREEN** |
| **C5** | canvas kept 1/2, roots 0/2 | before `{canvas:1, roots:2}` → after 720×450 `{canvasKept:1, rootsKept:2}` | **GREEN** |
| **C6** | RED input by construction | **30/30** card rows (15 routes × 1440/390): every `.glass-resting` card `backdrop-filter: none`; its wrapper's `::before` has content, `clip-path` ≠ none, `backdrop-filter` ≠ none | **GREEN** |

**C1 — why the one row is RED, measured, not argued.** The probe also reads `textContent`: **1.0 on 15/15 routes** (`#/` 4772 = 4772). ⟨cmd⟩ per-region split on `#/`: Picker `innerText` 54 at both widths; About `innerText` **1681 @1440 vs 903 @390**, `textContent` **4772 at both**; **33** `content-visibility: auto` elements inside `<main>` at both widths. The About region IS mounted at 390 (region box 358×7943, second grid row); its off-viewport `content-visibility:auto` sections are skipped from `innerText` — at 1440 as well (1681 of 4772). So the amputation WAS the breakpoint (69 → 973, `#/blob` 0.098 → 1.0), and what remains is the metric reading a rendering optimisation. This seat does **not** substitute a metric: C1 is recorded RED under the gate's literal text and routed to the orchestrator (ESC-W5c-1). A-4 lock honoured: no close may cite the D-15 zoom-200 kill while C1 reads RED.

#### Act 4 — static gates, double-run at the settled bytes

- **C3** ⟨cmd⟩ `grep -rEo 'useBreakpoint|isDesktop|isMobile|mobilePaneIndex' demo/ --include='*.vue' --include='*.ts' | sort | uniq -c` → **23 / 9 files** (HEAD-before `9d0e097f`: 39/13). **0** in `App.vue`, `usePaneRouter.ts`, `useViewManager.ts`, `viewSchema.ts`, `shell.css` (the shell layout fork). Survivors, none in this unit's set: `Dock.vue` 5 · `DockViewSelect.vue` 3 · `ActionBarToggle.vue` 3 (the dock's own `isDesktop` = G-L, X-W8) · `useHoverPopover.ts` 2 · `ConsoleRail.vue` 2 · `HeroBlob.vue` 2 · `ExtractWorkbench.vue` 2 · `useInertiaGesture.ts` 2 · `useMixingAnimation.ts` 2. **Dock G-L** ⟨cmd⟩ `grep -c useMediaQuery demo/shell/dock/Dock.vue` → **2** → RED → **C3 NOT CLOSED** (back-gate). Nothing written in Dock.vue's predicate.
- **C7** ⟨cmd⟩ `grep -rEo '@media[^{]*\((min-|max-)?(width|aspect-ratio)' demo --include='*.vue' --include='*.css' | grep -v '^demo/ui/'` → **4** (HEAD-before 6): `ConsoleRail.vue:342` · `DockStatusLamp.vue:70` · `animations.css:17` · `foundation.css:526`. This unit retired its two (`PaneSegmentedControl:46` with the file, `shell.css`'s width∧aspect dual arm). Target 3 → **RED by 1**; the survivors sit in files outside `.c`'s set (`DockStatusLamp.vue` is in no W5 §4 row; `animations.css` is `.d`'s; `foundation.css` is `.b`'s kept `--dock-*` arm). Capability queries ⟨cmd⟩ same scope, `prefers-|forced-colors|print|pointer|hover` → **33 at HEAD-before, 33 after** — all survive. PSC-21 rider: the `css-emission-probe.mjs` naming was struck at `.b` (N9); `shell.css` names no ungated guarantor.
- **N2** ⟨cmd⟩ `grep -c 'as ViewId' demo/palettes/usePalettePorts.ts` → **0**. Bite ⟨cmd⟩ one `setActiveView("palettes")` → `("saved")` in `useSlugMigration.ts`, `vue-tsc -p tsconfig.demo.json` → **EXIT 2** `TS2345: Argument of type '"saved"' is not assignable to parameter of type 'ViewId'`; file restored byte-exact (`git status` clean). **GREEN** (the node-run branch arm is carried: all three branches now dispatch a typed `ViewId`, no named push to an unregistered name exists).
- **N12** ⟨cmd⟩ `grep -c "deps\.<m>"` per member → savedPalettes 3 · userLogin 2 · userRegenerate 2 · adminLogin 1 · clearUserSlug 1 · ensureSession 1 · setActiveView 3 — **every member has a reader**; `useSession` import **0** (the 1 grep hit is the doc comment). **GREEN**.
- **N10** ⟨cmd⟩ `grep -cE 'BouncyTabs|lg:flex' e2e/smoke/mobile/walk.spec.ts` → **0**; `out-in` → 0. Carve lock: the AboutPane coverage (`"Detailed Guide"` heading visible) survives in substance at the drifted bytes — asserted at Step 2 and again on the return (Step 4). **GREEN**.
- **N11** — the three ≤639 px matrices were banked at `afe230b5` **before** `50633f19` (ordering lock). ⟨cmd⟩ `git merge-base --is-ancestor afe230b5 50633f19` holds by history. Not re-taken. **GREEN**.
- **C4** close statement (PSC-1 + W5F-67/68): **1** render site deleted; no `semantics="tabs"` interim was applied; **X-W10's Ad-18 marker (`W10.md:117/:354`) is SPENT by this deletion** — the survivor's terminal event.

**N14 — the declaration-site census, printed.** Sites that declare the view identity today:
1. `viewSchema.ts` `ViewId` union — the declaration. 2. `viewSchema.ts` `VIEW_MAP: Record<ViewId, PaneConfig>` — vue-tsc-exhaustive. 3. `viewSchema.ts` `isViewId` — derived from `VIEW_MAP`. 4. `usePaneRouter.ts` `VIEW_SCENES: Record<ViewId, …>` — exhaustive. 5. `useDockAdminMode.ts:27` `adminViews: ViewId[]` — checked. 6. `demo/color-picker/router/index.ts` route `name:` strings over `RouteRecordRaw[]` — **INVISIBLE** to vue-tsc. 7. `demo/palettes/admin/AdminPane.vue:91` the `subView` literal union — checked only where `adminProps(pane)` passes a narrowed `PaneId`. 8. `e2e/visual/census.ts` `ROUTE_CENSUS` — its own table, **INVISIBLE**. The pane identity (`PaneId`) adds `PANE_COMPONENTS: Record<PaneId,…>` + the exhaustive `propsFor` switch, both visible. Partition: **5 visible · 1 partially · 2 invisible**; the two invisible sites are outside `.c`'s set (router = BD-08, closed unit a; `e2e/visual/**` = X-W1). **N14 RED (printed, partitioned)**.

(⟨cmd⟩ `git merge-base --is-ancestor afe230b5 50633f19` → exit **0**, run for the N11 ordering claim.)

#### Act 5 — §8 artefacts owed to `.c` (R3.4): both `audit/visual/layout/` triples — **`a1bef4f0`**

⟨cmd⟩ `node scratchpad/layout-cap.mjs` → **18 shots** under `docs/tranches/V/megatranche/audit/visual/layout/`: unit b {390×844, 1440×900, 3440×1440} × {`#/`, `#/blob`, `#/browse`} and unit c {390×844, 720×450@2, 1440×900} × {`#/`, `#/generate`, `#/blob`}; `MANIFEST.json` carries per-shot sha256, the `.app-layout, main` boxes, the document extent and the rendered region labels. Committed with `git add -f` (L-7) in one pathspec commit beside the GREEN JSON. Read back: 1440 `#/` = two columns (Picker | About); 390 `#/` = one column, About in row 2.

#### Gate readings BEFORE → AFTER (this seat's clock)

| gate | BEFORE | AFTER | state |
|---|---|---|---|
| C1 | 0.0394 on `#/`, 7/15 | 0.5557 on `#/`, 14/15; textContent 15/15 = 1.0 | **RED** (ESC-W5c-1) |
| C2 | false | true | **GREEN** |
| C3 | 39/13 | 23/9, shell fork 0 | **RED — back-gated on Dock G-L = 2 (X-W8); NOT CLOSED** |
| C4 | file exists | absent; typecheck EXIT 0 | **GREEN** |
| C5 | canvas 1/2, roots 0/2 | 1/1, 2/2 | **GREEN** |
| C6 | RED input | 30/30 | **GREEN** |
| C7 | 6 | 4 (target 3); capability 33 → 33 | **RED** (survivors outside `.c`'s set) |
| C8 | 13 | 0 | **GREEN** |
| N2 | 1 cast, 3 literals | 0; bite EXIT 2 | **GREEN** |
| N10 | 3 | 0 | **GREEN** |
| N11 | banked `afe230b5` | ordering holds | **GREEN** |
| N12 | 3 phantom deps + hard import | 0 | **GREEN** |
| N14 | 7 sites, 6 invisible | printed: 5 visible · 1 partial · 2 invisible | **RED** |
| N15 | query before selector | unchanged | **ESCALATED** (ESC-W5c-2) |

#### Escalations

- **ESC-W5c-1 (C1, a named §3a trigger).** C1 < 0.9 on `#/` after the fork died. The measured cause is `content-visibility:auto` in the About region skipping off-viewport text from `innerText` (textContent parity 1.0; the region is mounted and laid out). The gate's own falsifier ("a route still amputates a region at 390") is not what the reading shows. Changing the metric, or striking `content-visibility` from AboutPane (a file outside `.c`'s set, and a perf decision of record), would both be substitutions. §3a makes this triumvirate business; the orchestrator rules.
- **ESC-W5c-2 (N15, bounds).** The "query" is `SearchBar`, rendered by `demo/palettes/admin/AdminPane.vue:11-22` BEFORE `<AdminNamesPanel>` (`:44`), whose root holds the selector (`SegmentedTabs`, `AdminNamesPanel.vue:14`). Source order is decided in `AdminPane.vue`, which is in neither W5 §4 nor BD-22 ("`AdminNamesPanel.vue`, source order only"). No edit inside `AdminNamesPanel.vue` alone can put the selector before a node its parent renders first. Needs a bounds grant for `AdminPane.vue`, or a re-home to X-W7 (CE-5).
- **ESC-W5c-3 (landed-by-consequence, outside the set).** `e2e/visual/census-parity.spec.ts:88-91,124` reads the `RightPane` union out of `viewSchema.ts` as bytes (`unionMembers("RightPane")`); that union is gone at `50633f19`, so the visual project's parity test will fail. `e2e/visual/census.ts` also still carries `CensusRightPane` + `defaultPaneIndex` rows, and `e2e/visual/capture.ts:560-583` selects a mobile pane by `defaultPaneIndex`. `e2e/visual/**` is X-W1's (`playwright.config.ts:3-9`); this seat wrote nothing there. Owner: X-W1's visual lane (or a §3a grant).

#### Residuals, each with an owner

C3 → X-W8 (G-L: Dock `useMediaQuery` ×2 + dock `isDesktop` ×11) and the six non-shell `useBreakpoint` components (no W5 bound). C7 → `.d` (`animations.css:17`), X-W8/DSL (`DockStatusLamp:70`), and ConsoleRail (no W5 bound). N14 → router names (BD-08 owner) + `e2e/visual/census.ts` (X-W1). D3 physical names: this unit left `--left`/`--right` modifiers beside the role classes for `.d`'s re-key (worktree D3 15). Foreign REDs seen and not touched: vitest C-5 + NG-6; e2e tsc o23; test tsc `space-catalog.ts`.

#### Locks honoured

§3.4 (PSC deletion + C1 successor, same wave: the presence re-point lands in `50633f19`) · C6 same-commit (`50633f19`) · N11 ordering (`afe230b5` is an ancestor) · C4 PSC-1 (no tabs interim) · C7 (33 capability queries survive) · C3 back-gate (not closed; Dock.vue's predicate untouched) · N10 (AboutPane coverage kept) · BD-05 (two hunks only) · L-7 (every figure is in git).

**Commits**: `50633f19` (§9 commit 3) · `a1bef4f0` (GREEN JSON + layout triples) · this record.

### X.W5.d

SERVED MODEL: claude-opus-5-5[1m] · seat: X.W5.d, RESUME ROUND 3 · 2026-09-22 · verdict **PARTIAL** (§9 commit 4 LANDED `2183b814`; D2 · D3 · D5 GREEN; D1 RED → §3a trigger; D4 RED on an out-of-bounds site).

#### Act 0 — crash-recovery (STANDING LAW)

⟨cmd⟩ `git status --porcelain` → 2 rows, `V/reformation/CARRY-LEDGER.md` (sibling) and `scripts/dev/dev.sh` (never touched). **No path inside this unit's writable set was dirty**: no predecessor partial existed, and nothing was inherited. HEAD at open was `4c594655`. `.c` had landed as `50633f19`, so the §3.4 lock "strictly after X.W5.c commits" held.

#### Act 1 — anchors measured before any edit

- **D3 arm 1**: ⟨cmd⟩ `grep -rEo 'pane-wrapper--left|pane-wrapper--right' demo/ | wc -l` → **15**. The spec's 18 sites have drifted by `.c`, which retired 1 of the 3 in `App.vue` and 2 of the 3 in `shell.css`. The remaining 15 are `animations.css` 12 (`:228-274`), `App.vue` 2 (`:115-116`, the physical ternary `.c` left beside the role class) and `shell.css` 1 (`:238`, a comment quoting a retired witness). Intent is unchanged at the true bytes.
- **Roles**: ⟨cmd⟩ `sed -n '/export type RegionRole/p' demo/shell/viewSchema.ts` → `"stage" | "inspector" | "action"`. Routes seat only `stage` and `inspector`. `action` belongs to the vocabulary, so it gets rules too.
- **D4 census**: ⟨cmd⟩ `grep -rn '<SegmentedTabs' demo/ --include='*.vue'` → **2 files**: `MixSourceSelector.vue:105` and `AdminNamesPanel.vue:14`. `PaneSegmentedControl.vue`, the spec's third file, died at `50633f19`. `<Transition ` count is **0 and 0**.
- **D5 guard**: ⟨cmd⟩ `grep -n '@media (prefers-reduced-motion: reduce)' demo/styles/animations.css` → `:184`. The global guard is at `:184-193`, and every edit here sits below it.
- **B4 arm 3 (residual 5)**: ⟨cmd⟩ `grep -rn content-max-h demo/` → 3 hits in the `PaneSlot.vue:46/:54/:55` comments. **I did not take them.** `:46` is inside the transition-mode paragraph that the fold's GATING LOCK protects (`X-W5-FOLD.md:41`: *"No wave may delete PaneSlot.vue:12-23 before [the out-in re-probe] runs"*), and `:54-55` are that paragraph's E-3 correction. Re-wording a locked record is not this unit's to do. Owner: whoever runs the out-in re-probe.
- **External consumers of the physical class** (landed-by-consequence, see ESC-W5d-3): ⟨cmd⟩ `grep -rn 'pane-wrapper--' e2e/` → `oracles/o12-blob-seat.spec.ts:68` and `oracles/o16-computed-cascade.spec.ts:158` both select `.pane-wrapper--left`. `e2e/visual/capture.ts:489` is a comment.
- **D1 instrument source**: ⟨cmd⟩ `sed -n 129,152p docs/tranches/T/audit/pi/u-gestalt/probe2.mjs` gives four hash hops from a settled `/#/`, in the order gradient · extract · mix · generate. Each hop has a 900 ms rAF window with the first 2 deltas dropped, at 1440×900 light, DPR 2. The new gate reuses this instrument byte-for-byte in method.

#### Act 2 — the cure (§5 X.W5.d mechanism, as specified)

1. **`animations.css` (D3)**. The pane family is re-keyed onto `.pane-wrapper--{stage,inspector,action}`. Each role carries enter-from, leave-to, enter-active and leave-active rules. The existing values are **byte-kept** as the forward reading: stage takes the former left geometry `translateX(-110%) rotate(-2deg)` and inspector the former right geometry. Action is **added** and rises from the block-end edge. The **direction arm** is also added. `[data-scene-direction="back"]` mirrors each role's travel at specificity (0,3,0). No declaration was deleted (preserve-animations edict), and the `will-change` hint and the two transition rules moved with the keys.
2. **Retired spellings, quoted once here** so the D3 census reads zero in the tree: `App.vue` `region.role === 'stage' ? 'pane-wrapper--left' : 'pane-wrapper--right'`, and the four selectors in `animations.css`: `.pane-wrapper--left > .vj-enter-{enter-from,leave-to,enter-active,leave-active}` and `.pane-wrapper--right > …`.
3. **`App.vue` (class names only)**. The wrapper emits `` `pane-wrapper--${region.role}` `` and nothing physical. Its comment was re-worded to match.
4. **`shell.css`**. The retired-witness comment at `:238` was re-worded. It is a comment and has no rule.
5. **`PaneSlot.vue` (the direction token)**. This file is in the unit's writable set. A `flush:"sync"` watch on `route.name` sets `forward` or `back` from the route's index in `Object.keys(VIEW_MAP)`, which is the scene table's own order and the dock's. The watch never works from a copy of that order. The existing `before-enter`/`before-leave` hooks stamp `data-scene-direction` on BOTH the entering pane and the leaving one. The simultaneous mode, the rAF mirror and the `:12-23` paragraph are untouched (the D-1 lock).
6. **`MixSourceSelector.vue` (D4)**. The two `<template v-if>/<template v-else>` fragments became `<Transition name="vj-morph" mode="out-in">`, and each branch is **one root** `div.flex.flex-col.gap-3` (MSS-17). The fragments had borrowed the parent's column rhythm, and each root now carries it itself. The inner swatch `TransitionGroup` is untouched and is not what satisfies the gate. The **direction token** is `data-mix-direction` on the component root, set in the pre-flush from the tab strip's own option order. A scoped rule sets `--vj-morph-x: ±1.5rem` on the **branch root only**, and only while it carries enter-from or leave-to, so the offset cannot inherit into `PaletteCard`'s nested `vj-morph`.
7. **`scene-swap-budget.mjs` (D1, created)**. This is the probe2 instrument plus an **adversarial motion arm**. Every `.pane-wrapper--<role> > *` that takes `vj-enter-enter-active`/`-leave-active` is logged with its role, its direction stamp and its **transform travel** duration, read as the computed duration paired with `transform`/`all` in `transition-property`. A hop with no region enter is RED whatever its frames. Under `PROBE_PRM=1` every travel must be 0. One JSON document is written to stdout, with exit 0 or 1.
8. **`view-switch-frame-budget.spec.ts` (re-point)**. The spec asserts that the timed swap IS the stage region's role-keyed enter, stamped `forward`, with a non-zero transition. Running it exposed two stale premises at its own bytes, and both are cured in the same file: `/#/picker` is `not-found` since X-W3 G-20, so the spec had been timing Not Found → Gradient; and the landmark locator used `"Color tool panes"`, a name that `de99ec15` retired.

#### Act 3 — cadence (§7) at the settled bytes

- ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT 0**.
- ⟨cmd⟩ `npx eslint --max-warnings=0 <PaneSlot · MixSourceSelector · App · gate · spec>` → **EXIT 0**, run twice (the spec was re-linted after its second edit).
- ⟨cmd⟩ `npx tsc -p tsconfig.e2e.json --noEmit` → EXIT 2 with **5 errors, all `o23-specimen-gamut-honesty.spec.ts`**. They are foreign and are the same 5 that `.c` saw. None of them is in `view-switch`.
- ⟨cmd⟩ `npx vitest run` → **639 passed / 2 failed**: the same two foreign born-RED canaries (`spectrum-luma` C-5, `reka-binding-idiom` NG-6). The library suite did not move.
- ⟨cmd⟩ `VJS_E2E_PERF_PORT=<AFTER serve> npx playwright test view-switch-frame-budget --project=smoke-perf` → **passed, passed**. Both runs took the software-GL branch: firstFrame 116.6 / 233.6 ms and maxTask 1385 / 79 ms against the SOFT_CEIL ceilings. The host load average was 23-30.

#### Commits

`2183b814` §9 commit 4 `feat(demo/motion): region-keyed scene transitions + swap budget` (7 paths, with a body) · `5fbf6d5c` the spec's second half (address + landmark) · `ae98f5a1` evidence: D1 BEFORE/AFTER, D4, D5 and the §8 `app-wave/pi` pair, with PNGs added via `-f` · `9b35754f` the receipt line on the two a11y dumps · this record.

#### Act 4 — D1 over the built bundle (BEFORE = `4c594655` · AFTER = `2183b814`; `git diff 4c594655 2183b814~1 -- demo/` → empty)

Both bundles came from `npx vite build --mode gh-pages --outDir <scratch>` and were served statically, never from the shared `dist/gh-pages`. Each run is ⟨cmd⟩ `PROBE_BASE=… node docs/tranches/V/megatranche/workflows/gates/scene-swap-budget.mjs`. The runs were interleaved: before-i, then after-i. Each cell shows `over32/frames` and then the median in ms. **Exit 1 on all 10 runs.**

| run | 1-min load avg (before · after) | →/gradient B · A | →/extract B · A | →/mix B · A | →/generate B · A |
|---|---|---|---|---|---|
| 1 | not logged | 0.29/9 · 0.33/9 | 0.11/11 · 0.20/12 | 0.27/18 · 0.46/32 | 0.13/8 · 0.15/8 |
| 2 | not logged (30.3 at 16:06, just after) | 0.39/13 · 0.33/8 | 0.35/12 · 0.33/17 | 0.73/51 · 0.92/54 | 0.19/9 · 0.24/9 |
| 3 | 28.9 · 29.0 | 0.28/9 · 0.67/81 | 0.13/10 · 0.44/19 | 0.36/18 · 0.36/27 | 0.26/9 · 0.12/8 |
| 4 | 25.8 · 24.8 | 0.21/9 · 0.19/8 | 0.12/10 · 0.14/12 | 0.33/17 · 0.25/17 | 0.12/8 · 0.14/9 |
| 5 | 23.3 · 21.4 | 0.20/8 · 0.19/8 | 0.10/11 · 0.14/10 | 0.35/20 · 0.21/19 | 0.11/9 · 0.09/8 |

The spec baseline (`probe2-log.txt`, 2026-07-12) reads 0.71 · 0.26 · 0.63 · 0.23.

- **Motion arm**: every hop in all 10 runs is `animated: true`. BEFORE's stamps are `null`. AFTER's are `forward`, `back` on extract (extract comes before gradient in `VIEW_MAP`), `forward` on mix and `forward` on generate. Every enter travel is 440 ms and every leave 200 ms, on both roles.
- **Reading**: **→/gradient and →/mix breach in every run, on both sides**. The re-key neither cures nor measurably moves them: run 4 and run 5, the least contended, sit within noise of BEFORE. →/extract and →/generate pass or fail with host load.
- **Diagnostic, not a gate reading.** One AFTER run used an injected `[class*="pane-wrapper--"] > * { transition: none !important }`. It read gradient **0.011** · extract **0.066** · generate **0.011**, while **mix read 0.257 / median 22 and still breached**. The pane travel is therefore the jank root on gradient, but **not on mix**, where the root sits in the Mix scene's own mount/animation. The artefact is banked beside the AFTER runs, labelled.

#### Gate readings — BEFORE → AFTER (this seat's clock, static arms double-run at HEAD)

| gate | BEFORE | AFTER | state |
|---|---|---|---|
| **D1** | 4 hops, exit 1 ×5 (gradient · mix breach every run) | exit 1 ×5, gradient · mix breach every run; motion arm GREEN | **RED** → ESC-W5d-1 (§3a named trigger) |
| **D2** | `git ls-files --error-unmatch …/probe2-log.txt` → 0 | 0 · 0 | **GREEN** (verify-only; GREEN at open, not cured here) |
| **D3** arm 1 | 15 (spec 18, drifted by `.c`) | `git grep -Eo 'pane-wrapper--left\|pane-wrapper--right' HEAD -- demo/` → **0 · 0** | **GREEN** |
| **D3** arm 2 | 2 of 3 roles keyed only through the physical alias | stage · inspector · action each have enter-from 1 · leave-to 1 · enter-active 2 · leave-active 2 | **GREEN** |
| **D3** direction | mobile forward ≡ back | stamps `forward`/`back` observed live; the back rules mirror the travel sign on every role | **GREEN** |
| **D4** Mix | `<Transition ` 0; bare `v-if` at `:114` | 1 named `vj-morph` `out-in`; `<template v-if>` 0 (the one grep hit is the comment at `:127`); live: 1 branch root under the token at 1440 and 390, leave-to `forward` `+1.5rem` / `back` `-1.5rem`, travel 200 ms | **GREEN** (this site) |
| **D4** census | — | `AdminNamesPanel.vue:24/:75` bare `v-if`/`v-else` swap behind `SegmentedTabs` (`:14`), `<Transition ` 0 | **RED** → ESC-W5d-2 (out of bounds) |
| **D5** | non-regression | added declarations sit below the `:184-193` guard; new `animation-timeline`/`animation-range`/`scroll-timeline`/`view-timeline` lines in the diff: **0 · 0**. Forced-PRM ×2: every region travel **0 ms** (motion arm true on 8/8 hops); Mix swap under PRM travel **0** at 1440 and 390 | **GREEN** |

PRM run 2's `→/gradient` recorded 4 frames: the host stalled, so its *budget* cell is noise. D5 does not read the budget.

#### Escalations

- **ESC-W5d-1 (D1, the named §3a trigger).** The trigger reads *"frame budget unmet after the transition re-key"*, and it has fired. →/gradient and →/mix breach `over32/frames ≤ 0.15` in 10 of 10 runs, BEFORE and AFTER alike. The measured roots differ by hop. On **gradient (and extract · generate)** the root is the swap travel itself: with the travel suppressed they read 0.011–0.066. That travel is 440 ms and 200 ms, two panes rotated and co-mounted in-flow (the simultaneous mode), measured on a software compositor at DPR 2. On **mix** the root is NOT the swap: it still breaches with the travel suppressed (0.257, median 22). A second §3a trigger is also live: **the oracle's own flake**. Under host load 21–30 from sibling seats, runs of the same bytes disagree by up to 0.4 on a hop (before-2 vs before-4 on extract: 0.35 vs 0.12), which is beyond any usable tolerance.
  - **No cure was improvised.** The D-1 coupled-architecture lock forbids changing the mode, the rAF mirror or the leave geometry alone. Deleting or shortening the travel is the exact move D3/D4 exist to refuse.
  - **The triumvirate needs to rule three things**: (a) the instrument's conditions, meaning an uncontended host, or real-GPU, or `smoke-perf`'s SOFT_CEIL branching carried into D1; (b) the co-mount geometry, meaning the out-in re-probe the lock gates; and (c) the Mix scene's own frame cost, which is not a W5 surface.
- **ESC-W5d-2 (D4, bounds).** `demo/palettes/browser/admin/AdminNamesPanel.vue:24/:75` is a bare `v-if`/`v-else` content swap behind the `SegmentedTabs` at `:14`, with `<Transition ` count 0. That is exactly D4's falsifier. The file is in neither the W5 §4 table nor this unit's writable set. BD-22 grants it to `.c` for "source order only". The cure has the same shape as the Mix one, one named `<Transition>` with each branch a single root, but it needs a bounds grant on that path.
- **ESC-W5d-3 (landed by consequence, outside the set).** Retiring the physical modifier empties `.pane-wrapper--left` in two X-W2/X-W1 oracles.
  - `e2e/smoke/oracles/o12-blob-seat.spec.ts:68` reads the stage width through it. The locator will time out.
  - `e2e/smoke/oracles/o16-computed-cascade.spec.ts:158` probes the swap legs on its first child. The wrapper is `null`, so both legs read `null`.
  - Each needs a one-token re-point to `.pane-wrapper--stage` (the legs it reads are byte-identical there), and neither path is writable here. This is the same class as `.c`'s ESC-W5c-3.

#### Residuals, each with an owner

- **B4 arm 3 (residual 5)** stays at 3. These are comment-only mentions inside `PaneSlot.vue`'s locked transition-mode record, and they belong to whoever runs the out-in re-probe (fold `:41` GATING LOCK).
- **EB-24 / W5F-47.** The caught-plate swap in `ErrorBoundary.vue` has no motion. COHESION §0k.3 **S-7** gives that component's bytes to X-W7. D5 reads GREEN for the transitions this wave added, and the plate's motion is X-W7's.
- **C7** is not moved by this unit. `animations.css:17` is the `edit-drawer-in` keyframe re-definition, which the preserve-animations edict keeps, and C7 is not a `.d` gate.
- **The foreign `"Color tool panes"` landmark name** (retired by `de99ec15`) is still used by 66 other `e2e/**` files. This unit cured it only in its own spec. The owner is X-W5.a's successor or X-W1, as LEDGER `:34` ESC-b3 already names.
- **Foreign REDs seen and not touched**: vitest C-5 and NG-6, and e2e tsc `o23` ×5.

#### Locks honoured

- **preserve-animations**: 0 motion declarations deleted, and the forward values are byte-kept.
- **§3.4**: this unit ran after `50633f19`.
- **App.vue class names only**: one `:class` binding and its comment.
- **D3 direction arm**: the `back` stamp is observed live and mirrors the travel.
- **D4**: each branch is a single root, and the inner `TransitionGroup` is not what the gate counts.
- **D5**: no new scroll-driven or `animation-timeline` declaration.
- **D2**: verify-only.
- **D-1 lock**: the mode, the rAF mirror and `:12-23` are untouched.
- **Pathspec on every commit**, and `dev.sh` was never staged.
- **E13**: `find <4 paths> -newer X-W5.md` → 0 new, so 0 UNREAD in scope.

**Commits**: `2183b814` · `5fbf6d5c` · `ae98f5a1` · `9b35754f` · this record.

### X.W5.e

**SERVED MODEL**: claude-opus-5-5[1m] (M-23 opus seat). Unit sections read: `W5.md` §3.5 · §5 X.W5.e · §6 unit e ·
§7 · §9 row 5; fold `X-W5-FOLD.md` §1.G (W5F-48 · W5F-49) · §2a E1/E2 · §6d E1/E2 (W5F-75/AB-11); CONSTELLATION `P122`
at `docs/tranches/V/coordination/CONSTELLATION.md:44` (*"default golden is exact `61.8033989/38.1966011`, preview is
`66.6666667/33.3333333`; absent inspector makes stage 100%"*).

**Act 0 — crash-recovery.** ⟨cmd⟩ `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` ·
` M scripts/dev/dev.sh`. Neither is in this unit's writable set (both left untouched, never staged). **No inherited
partial work on X.W5.e.**

**Act 1 — measure before edit (anchors at true bytes, HEAD `1c853f20`).** ⟨cmd⟩ `grep -nE '64%?…66\.6666667|33\.3333333…36'`
over the four docs → lines `VISUAL-CONSTITUTION.md:44,45` · `EVIDENCE.md:43,47` · `OPTICAL-BENCH-COMPOSITIONS.md:39,40` ·
`proportion-register.md:35` — **all seven spec anchors hold at the same line numbers; no drift.** `-o` count = **8**
(EVIDENCE:47 carries both arms). Note: the E1 regex misses the `%`-bearing inspector form `33.3333333%…36%`
(VC:44/45 · OB:39/40 · PR:35); the strike covers **both** forms on every line, so the broader
⟨cmd⟩ `grep -oE '…36|64%?…'` is also measured (BEFORE 13 → AFTER 0, below).

**Act 2 — the strike.** One scripted literal substitution per anchor (`scratchpad/p1.pl`, each pattern asserted to
occur exactly once before replacing), 7 lines + one evidence-column word on PR-16 (`protagonist bounds` →
`exact protagonist share`, the column that named the dead range). Each replaced sentence now states: protagonist
exactly `66.6666667%` while an inspector is selected, **100 % protagonist when none is**, inspector exactly
`33.3333333%` — *"the `preview-dominant` posture sourced from `CONSTELLATION.md` P122, not independently derived"*.
**Survival clauses untouched**: ⟨cmd⟩ `grep -c 'every rendered bounded palette entity slip has exactly one Card shell'
VISUAL-CONSTITUTION.md` → HEAD 2 · worktree 2; the `:54` selection seat, OPTICAL-BENCH `:42` sequence and `:76`
inventory lines were not in the diff. No chassis re-imported (the text names the posture, not a component). The
witness records (`registry/adjudicated/**`, `registry/DEFECT-LEDGER.md`) are not in the diff. AB-11: the text does not
say "restore the ratified band"; it states the posture that `regions[]` must emit.

**Act 3 — gates, double-run on the settled bytes.**

| gate | BEFORE (HEAD `1c853f20`) | AFTER (worktree = `e2f56558`) | reading |
|---|---|---|---|
| **E1** | ⟨cmd⟩ `grep -rcE '64%?…66\.6666667\|33\.3333333…36' <4 docs>` → `2·2·2·1` = 7 lines, `-o` **8** | run 1 `0·0·0·0` · run 2 `0·0·0·0`; `-o` **0** / **0** | **GREEN** |
| E1 (broad, both `%` forms) | ⟨cmd⟩ `grep -oE '…36\|64%?…'` → **13** | **0** / **0** | GREEN |
| **E2** | no replaced sentence exists | ⟨cmd⟩ `git diff -U0 --word-diff=plain --word-diff-regex='[^;\|]+'` → every inserted `;`-segment carrying `66.6666667`/`33.3333333` checked for `` `CONSTELLATION.md` P122 ``: run 1 **9 sentences · 9 cited · 0 bare**; run 2 identical | **GREEN** |
| §7 `git diff --check` | — | exit **0** over the four docs | GREEN |

**Act 4 — commit 5.** ⟨cmd⟩ `git add <4 docs> && git commit --no-verify --quiet -m "docs(canon): P-1 — exact Browse/Library
posture" -m <body> -m <Claude-Session> -- <4 docs>` → **`e2f56558`**; `git show --stat` → 4 files, 7 insertions / 7 deletions,
nothing else swept in.

**Act 5 — E13.** ⟨cmd⟩ `find <path> -maxdepth 1 -type f -newer X-W5.md` over value.js `V/` (only this unit's own three
edited docs) · `V/coordination/` (empty) · glass-ui `BK/coordination/` (empty; `BK` still newest) · keyframes.js
`V/coordination/` (empty) · atlas `P/coordination/` (empty) → **0 UNREAD in scope**; INBOX tail still `I-39`.

**Residuals**: none owned by `.e`. `VISUAL-CONSTITUTION.md:27`'s *"display-rounded protagonist law is 61.8–66.7%"*
and its non-P122 tuning clause are not the P-1 band and are outside E1's scope; the general citation law over the rest
of the canon is **CC-102 at X-W10**, and the three workbench corpora's `61.8033989%/38.1966011%` garnishes (W5F-48's
mechanism note) are the routed records' own homes, not this unit's four files. **Escalations**: none.

**Commits**: `e2f56558` · this record.

---

## Close — RESUME ROUND 3, 2026-09-22 (VERIFY-ONLY close seat)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 CLOSE, RESUME ROUND 3 · clock 2026-09-22 ~16:15–16:40 -0400 ·
HEAD at open `4bbdd952` · date of record 2026-09-17 (begin-word, COHESION §0j). This seat cured nothing: no product,
spec, or evidence byte was moved. It wrote this section, one GREEN JSON that §8 owes to the wave close, the LEDGER row, and nothing else.

**Verdict: PARTIAL.** All five units have landed their §9 commits (1–5). Eleven gate ids are still RED or escalated,
and each has a named owner (CL.2, CL.6). IMPLEMENTED is not stamped (CL.8).

### CL.0 Crash-recovery (STANDING LAW)

⟨cmd⟩ `git status --porcelain` → 2 rows: ` M docs/tranches/V/reformation/CARRY-LEDGER.md`, which belongs to a sibling seat and was left untouched, and
` M scripts/dev/dev.sh`, which was never touched. **No path in this seat's writable set was dirty** (`execution/A/X-W5.md`,
`execution/LEDGER.md`, `waves/W5/green/`), so there was no inherited partial. The killed RC2 partial was already committed by the R3 open.

### CL.1 Commit roster and bounds audit

⟨cmd⟩ `git log -1 --format=%h <sha>` → all 18 exist. ⟨cmd⟩ `git show --name-only --format='' <sha>` gives each commit's scope:

| unit | commits | scope (files) | in bounds? |
|---|---|---|---|
| X.W5.a | `c0cf27bf` · `de99ec15` · `f94d22af` | 1 · 34 · 1 | yes (audited RC2.1, unchanged) |
| X.W5.b | `adc312f6` · `2fa82bdb` | 6 · 1 | yes (audited RC2.1) |
| X.W5.c | `afe230b5` (born-RED + N11) · **`50633f19`** (§9 c3) · `a1bef4f0` (GREEN JSON + 18 layout shots + MANIFEST) · `151e3e5c` (receipt) · `4c594655` (LEDGER) | 5 · 13 · 20 · 1 · 1 | yes: 10 §4 rows ⊕ fold BD-01 `usePalettePorts.ts` · BD-02 `useSlugMigration.ts` · BD-05 `usePaletteWiring.ts` (R3.4 plan fact) |
| X.W5.d | **`2183b814`** (§9 c4) · `5fbf6d5c` (spec half 2) · `ae98f5a1` (D1/D4/D5 JSON + `app-wave/pi` pair) · `9b35754f` · `1c853f20` (receipt) | 7 · 1 · 9 · 2 · 1 | yes: all 7 are §5 X.W5.d files. ⟨cmd⟩ `git diff 4c594655 2183b814 -- App.vue` shows one `:class` binding plus its comment (class names only) |
| X.W5.e | **`e2f56558`** (§9 c5) · `749e1335` · `4bbdd952` (receipt + erratum) | 4 · 1 · 1 | yes: the four normative docs only |

**Bounds: CLEAN.** ⟨cmd⟩ the union of the 18 commits' paths → **94** distinct paths. One ERE over §4's *Do NOT touch* set
(`^(src/|api/|test/|node_modules/|scripts/dev/dev.sh|demo/ui/|demo/styles/overture.css|…/ActionBarLayer.vue|.*registry/|docs/tranches/V/archive/)`)
→ **0**. **Landed-wrong: none**, meaning no commit wrote outside its unit's set. Landed-by-consequence is a different class, reported in CL.6
(o12/o16 and `e2e/visual/**`).

### CL.2 Gate table: BEFORE (wave-open 2026-09-19) → AFTER (this seat's clock, at HEAD `4bbdd952`)

**How these were read.** Every static gate was run from one 17-line script, `scratchpad/w5close.sh`, executed twice.
⟨cmd⟩ `diff r1 r2` → **IDENTICAL**. The live gates were re-run by this seat, twice each, with `run_in_background` and
polling, in one bounded chromium session per probe:
- C1/C2/C5/C6: `c-probe.mjs`, against its own `vite --port 9011` dev server, stopped afterwards.
- D1: `scene-swap-budget.mjs`, against a fresh `vite build --mode gh-pages --outDir <scratch>` served statically on
  `:8093`, never the shared `dist/`.
- B1–B3: `layout-utilization.mjs --json`, against the same bundle.

The host 1-minute load average was **34–40** during the live runs, because of the sibling seats.

#### Unit a (landed; not re-dispatched, §0ac)

| # | BEFORE | AFTER (this seat) | verdict |
|---|---|---|---|
| A1 | exit 1 · App 7 | `node -e` → **exit 0**; App `useGlobalDark\|provideApiClient\|^import "../styles` → **0** | **GREEN** |
| A2 | `[b0,b1,b2]`, blob absent | banked `green/A2-…json`: marks ⊇ {b3,b4} on 15/15; blob `false` on `/#/generate` | **marks GREEN · blob arm RED** (ESC-W5-1, standing) |
| A3 | `{mobile:false, desktop:true}` | honest-RED **by ruling** (§0k.3 S-1: cure → X-W8). The class dissolved with `.c`'s fork, as C2 now shows live | **honest-RED, owner X-W8** |
| A4 | `bindPane` 0 | ⟨cmd⟩ `grep -ro bindPane demo/ \| wc -l` → **10**. It was 12 at RC2 because `.c` collapsed the three call sites into one `v-for`. The bite (`TS2554`) is cited from unit a and was not re-run: a VERIFY-ONLY seat does not edit `App.vue` | **GREEN (structural; bite cited)** |
| A5 | `<h1` 0 | ⟨cmd⟩ `grep -rn '<h1' demo/ --include='*.vue'` → **4** carriers; banked 15/15 on the spec's four arms | **GREEN as authored** (the OUTLINE arm is residual 1) |
| A6 | `?space=…` | banked `{green:true, bootSilent:true, offenders:[]}` | **GREEN** |
| A7 | 3 arms false | ⟨cmd⟩ `role="status"` → **3**; banked five arms all true | **GREEN** |
| N1 · N3 · N4 · N6 · N7 · N8 | RED | `onDeactivated` **5** files · bite cited · `valueOrThrow` **18**, all `picker-color.ts` · roles + `aria-labelledby` · no `:max` literal in the pane-cache seam (the 3 live hits are `<Slider>`-grammar attributes on `GenerateControls` · `GradientVisualizer` · `ExtractControls`, and the 2 in `usePaneRouter.ts:153-154` are doc comments) · `interface PaneSlot` **0** | **GREEN** |
| N5 | 1 carrier over the grid | ⟨cmd⟩ `grep -c '<ErrorBoundary' App.vue` → **1**. That is one template inside the `.c` `v-for`, so there is still **one per region seat, outside KeepAlive** (`App.vue:124`, wrapping `<PaneSlot>`). Its count fell from 3 by the collapse; the arm did not regress | **3/4 GREEN · ROUTE-RESET arm RED** (owner X-W7, S-7) |

#### Unit b (landed; not re-dispatched)

| # | BEFORE | AFTER | verdict |
|---|---|---|---|
| B1 · B2 · B3 | 0 scrollable · 608 px cap · 45.4 % | see CL.2b (re-run live by this seat) | see CL.2b |
| B4 | `100dvh` 1 · `svh` 0 · cap 11/4 | ⟨cmd⟩ **0** · **3** files · **3** (all comments in `PaneSlot.vue`, inside the fold-`:41` GATING-LOCKED paragraph) | **arms 1–2 GREEN · arm 3 honest-RED at 3** |
| B5 · B6 | no record | recorded readings stand in unit b's receipt and at the `shell.css` sites | **GREEN by record** |
| N9 · N13 | absent probe · 3 live pins | `css-emission-probe` **0** · `select-font` **2**, both the strike's own narrative | **GREEN** |

#### Unit c (landed `50633f19`)

| # | BEFORE | AFTER (this seat, live ×2, identical) | verdict |
|---|---|---|---|
| C1 | `#/` 69/1751 = 0.0394 · 7/15 | `#/` **973/1751 = 0.5557** · **14/15** ≥ 0.9. `textContent` 4825 = 4825 (ratio 1.0), with `content-visibility:auto` ×33 at both widths | **RED** (ESC-W5c-1, §3a named trigger) |
| C2 | false | `regenerateFound:true, specimenChanged:true, textChanged:true`, 2 regions at 390 | **GREEN** |
| C3 | 38–39 / 13 | ⟨cmd⟩ **23 / 9 files**. Shell layout-fork sites (App · usePaneRouter · useViewManager · viewSchema · shell.css) → **0**. Dock G-L `useMediaQuery` → **2** | **RED, back-gated on G-L (X-W8); NOT CLOSED** |
| C4 | file exists | `test ! -e …` → **0**; importers **0**; demo vue-tsc EXIT 0 | **GREEN** |
| C5 | canvas 1/2 · roots 0/2 | `{canvasIdentitiesKept:1/1, rootIdentitiesKept:2/2}` across 1440×900 → 720×450 | **GREEN** |
| C6 | RED input | **30/30** card rows, e.g. `cardFilters ["none","none"]`, carrier `clip inset(14px round 16px)` · `blur(7px) saturate(1.4)` | **GREEN** |
| C7 | 7 (6 at R3 HEAD) | viewport `@media` **4** (`ConsoleRail:342` · `DockStatusLamp:70` · `animations.css:17` · `foundation.css:526`); capability queries **33 → 33** | **RED** (target 3) |
| C8 | 13 | `node -e` → **exit 0** (0 rows) | **GREEN** |
| N2 · N10 · N11 · N12 | RED | `as ViewId` **0** (bite EXIT 2 cited from `.c`) · `BouncyTabs\|lg:flex` **0** · `afe230b5` ⊂ `50633f19` · every dep has a reader | **GREEN** |
| N14 | 7 sites, 6 invisible | printed by `.c`: 5 visible · 1 partial · 2 invisible (router names, `e2e/visual/census.ts`) | **RED** |
| N15 | query before selector | unchanged, in `AdminPane.vue:11-22` vs `:44` | **ESCALATED** (ESC-W5c-2) |

#### Unit d (landed `2183b814` + `5fbf6d5c`)

| # | BEFORE | AFTER | verdict |
|---|---|---|---|
| D1 | probe2: 0.71 · 0.26 · 0.63 · 0.23 | this seat, the built bundle, `over32/frames` and median ms. **Run 1**: gradient **0.294**/9 · extract 0.140/12 · mix **0.333**/19 · generate **0.164**/9, exit 1. **Run 2**: gradient **0.371**/9 · extract 0.143/11 · mix **0.346**/30 · generate 0.138/9, exit 1. Every hop `animated:true` | **RED**. It reproduces `.d`'s 10/10 (gradient and mix breach every run), so ESC-W5d-1 (a §3a trigger) stands |
| D2 | exit 0 | ⟨cmd⟩ `git ls-files --error-unmatch …/probe2-log.txt` → **0** | **GREEN** |
| D3 | 18 physical | ⟨cmd⟩ `pane-wrapper--left\|--right` in `demo/` → **0**. `RegionRole = "stage" \| "inspector" \| "action"`, and `animations.css` names each role **8×** (enter-from · leave-to · enter-active · leave-active, forward + `back` arm) | **GREEN** |
| D4 | Mix 0 `<Transition` | `MixSourceSelector.vue` → **1** (`vj-morph`, out-in, one root per branch). The census found 2 `SegmentedTabs` files; `AdminNamesPanel.vue` `<Transition ` → **0**, a bare `v-if`/`v-else` | **RED** (Mix site GREEN; AdminNamesPanel ESC-W5d-2) |
| D5 | guard at `:184` | guard still at `:184`. ⟨cmd⟩ `git diff 4c594655 2183b814 -- demo/ \| grep '^+' \| grep -cE 'animation-timeline\|animation-range\|scroll-timeline\|view-timeline'` → **0**. Forced-PRM travel 0 ms banked (`green/D5-…json`) | **GREEN** |

#### Unit e (landed `e2f56558`)

| # | BEFORE | AFTER | verdict |
|---|---|---|---|
| E1 | 7 lines / 8 occ | ⟨cmd⟩ `grep -rcE` over the 4 docs → `0·0·0·0`; broad `%`-form → **0** | **GREEN** |
| E2 | uncited | ⟨cmd⟩ `git show e2f56558 \| grep '^+' \| grep -E '66\.6666667\|33\.3333333'` → **7** added lines, and **7** carry `P122` (0 bare) | **GREEN** |

### CL.4 E13: the four-path mail sweep at this seat's clock

BK is still the newest glass tranche directory (⟨cmd⟩ `ls -t ../glass-ui/docs/tranches/ | head -1` → `BK`). ⟨cmd⟩ `find <p> -maxdepth 1 -type f
-newer X-W5.md`, run before this section was written, was **empty** on all five paths: value.js `V/` · `V/coordination/` · glass-ui
`BK/coordination/` · keyframes.js `V/coordination/` · atlas `P/coordination/`. ⟨cmd⟩ `grep -nE '\|\s*\**UNREAD\**\s*\|' INBOX.md`
→ **0** rows. The tail is still **I-39**. **0 UNREAD in scope**, so E13 is satisfied.

### CL.5 Landed-wrong

**None.** Every commit's path set lies inside its unit's writable set (CL.1).

### CL.6 Escalations (standing, re-confirmed at HEAD; none newly minted by this seat)

1. **ESC-W5c-1 · C1** (§3a named trigger). The C1 reading reproduced ×2 at this seat: `#/` 0.5557, and textContent 1.0 on all 15 routes. The residue is
   `content-visibility:auto` (×33) in AboutPane dropping off-viewport text from `innerText`. Two cures are possible, and both are
   substitutions: re-metric the gate, or change AboutPane (out of set, and a perf decision of record). **The triumvirate rules.**
2. **ESC-W5c-2 · N15** (bounds). Source order lives in `demo/palettes/admin/AdminPane.vue:11-22`/`:44`, which is in neither W5 §4 nor BD-22.
   It needs either a bounds grant or a re-home to X-W7 (CE-5).
3. **ESC-W5d-1 · D1** (§3a named trigger: "frame budget unmet after the transition re-key"). It reproduced ×2 at this seat
   (gradient 0.294/0.371 · mix 0.333/0.346). Three rulings are owed: the instrument conditions (host load 34–40 here), the out-in
   co-mount re-probe (the fold `:41` GATING LOCK), and Mix's own frame cost. The oracle-flake trigger is also live.
4. **ESC-W5d-2 · D4** (bounds). `demo/palettes/browser/admin/AdminNamesPanel.vue:24/:75` has a bare `v-if`/`v-else` behind
   `SegmentedTabs :14`, which is outside §4. It needs a bounds grant for the one-root named-`<Transition>` cure.
5. **Landed-by-consequence** (ESC-W5c-3 + ESC-W5d-3). Re-confirmed at HEAD:
   - `e2e/smoke/oracles/o12-blob-seat.spec.ts:68` and `o16-computed-cascade.spec.ts:158` still select `.pane-wrapper--left`. The fix is a
     one-token re-point to `--stage`.
   - `e2e/visual/census-parity.spec.ts:88-90,124` reads `unionMembers("RightPane")`, and ⟨cmd⟩ `grep -c RightPane viewSchema.ts` → **0**.
   - `e2e/visual/capture.ts:560` still reads `defaultPaneIndex`.

   All of these paths are outside W5 §4. The owner is X-W1's visual lane plus the X-W2 oracle holder, or a §3a grant.
6. **ESC-W5-1 · A2 blob arm** (standing from the first close): unfalsifiable as authored. **The triumvirate rules.**

### CL.7 Residuals, each with a named owner

| # | residual | owner |
|---|---|---|
| 1 | A5's OUTLINE arm (4 of 15 routes) | X-W10 (heading-outline canon) per the first close |
| 2 | N5's ROUTE-RESET arm (a route watch inside `ErrorBoundary.vue`) | **X-W7** (§0k.3 S-7) |
| 3 | A3 mobile/desktop dock parity | **X-W8** (§0k.3 S-1) |
| 4 | B3 block extent: at the first close, 2 of 10 routes ≥ 90 % (`#/` 99.7 · `#/blob` 99.2), and see CL.2b for this seat's reading. The cap is dead, and the shortfall is scene content | **X-W6** (CC-056 / V·L3, the scene compositions) |
| 5 | B4 arm 3: 3 `content-max-h` comment mentions in `PaneSlot.vue`'s GATING-LOCKED paragraph | the out-in re-probe holder (fold `:41`), which rides ESC-W5d-1's ruling |
| 6 | C3: 23 occurrences / 9 files remain (Dock `isDesktop` + `useMediaQuery` ×2 = G-L, plus six non-shell components) | **X-W8** (G-L) · the six components have no W5 bound, so they go to X-W6 / X-W8 per their homes |
| 7 | C7: 4 → target 3 (`animations.css:17` `edit-drawer-in` is preserve-edict; `DockStatusLamp:70`; `ConsoleRail:342`; `foundation.css:526` is the kept `--dock-*` arm) | **X-W8** (dock/lamp) · X-W6 (ConsoleRail) |
| 8 | N14: the router `name:` strings and `e2e/visual/census.ts`, which are invisible to vue-tsc | BD-08 owner · **X-W1** (visual lane) |
| 9 | EB-24 / W5F-47: `ErrorBoundary` plate swap has no motion | **X-W7** (S-7) |
| 10 | the foreign `"Color tool panes"` landmark name, in 66 `e2e/**` files | X-W1 (LEDGER `:34` ESC-b3) |
| 11 | foreign REDs seen and not touched: vitest `spectrum-luma` C-5 and `reka-binding-idiom` NG-6; e2e tsc `o23` ×5; test tsc `space-catalog.ts` ×11 | X-W4 (C-5, fold R23) · NG-6's own route · **X-W6** (o23, space-catalog) |
| 12 | the L-18 rider: two quartet challenge passes before ACCEPTED | the orchestrator under FORMATION-LAWS L-18 |

### CL.2b Unit b's live gates, re-run by this seat (placed after CL.7 because it was measured last)

⟨cmd⟩ `PROBE_BASE=http://localhost:8093 node …/audit/probes/layout-utilization.mjs --json` was run ×2. The `gates` blocks of the two runs are **identical**.

| # | AFTER (runs 1 = 2) | verdict |
|---|---|---|
| B1 | 8 routes in scope at 390×844, and every content-exceeding route scrolls (`#/` 8754/844 · gradient 1575 · browse 1044 · blob 3283 …) | **GREEN** |
| B2 | 20 rows (10 routes × 16/9 and 21/9): `<main>` and `.pane-container` `maxHeight === "none"`, `contentMaxH ""` | **GREEN** |
| B3 | at 3440×1440: `#/` **99.7** · blob **99.2** · gradient 76.8 · atmosphere 52 · mix 51 · palettes 51 · extract 45.5 · browse 39.5 · generate 39.5 · admin/users 18.1. So **2 of 10** routes reach ≥ 90 %, the same as the first close | **honest-RED** (residual 4, owner X-W6) |
| B5 | `b5Support` (webkit): `overflow-block` **true** · `min-block-size 100svh` **true** · `height 100svh` **true** | **GREEN by record** |

Banked: `docs/tranches/X/waves/W5/green/B1-B2-B3-layout-utilization-2026-09-22.json`, holding both runs. It is the §8 GREEN that unit b left to the close.

### CL.3 Cadence (§7) and Verification Artefacts (§8)

- ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT 0**.
- ⟨cmd⟩ `npx eslint --max-warnings=0 <the 16 W5-touched .ts/.vue/.mjs/.spec paths>` → **EXIT 0**.
- ⟨cmd⟩ `npx vitest run` → **639 passed / 2 failed** (38 files, 36 passing). The 2 failures are the foreign born-RED canaries C-5 and NG-6, the same pair `.c` and `.d` saw. The library suite did not move.
- ⟨cmd⟩ `git diff --check e2f56558~1 e2f56558` → **0**.

§8 artefacts, as tracked in git (⟨cmd⟩ `git ls-files`):

| artefact | state |
|---|---|
| `waves/W5/born-red/` | A2-A3-A6 · A3 · A5-A6-A7 · B1-B2-B3 · C1-C2-C5 · D1-BEFORE · N11 · STATIC ×2. **Present** |
| `waves/W5/green/` | A2 · A3 · A5-A6-A7 · C1-C2-C5-C6 · D1-AFTER · D4 · D5 · PORTAL-INTEGRITY-DELTA · STATIC, **plus B1-B2-B3, banked by this seat**. **Present** |
| `audit/visual/layout/` | **19** files, the two triples (18 shots) plus `MANIFEST.json` with sha256 (`a1bef4f0`). **Present** |
| `audit/probes/app-wave/pi/` | desktop-1440 and mobile-390 captures of `/#/generate`, plus the H1 a11y dump pair and a MANIFEST (`ae98f5a1`, `9b35754f`). **Present** |
| `scene-swap-budget.mjs` output | BEFORE `born-red/D1-…BEFORE` and AFTER `green/D1-…AFTER` (`ae98f5a1`). **Present** |
| D-E portal-integrity delta | `green/PORTAL-INTEGRITY-DELTA-2026-09-19.json`. **Present** |
| B5 reading and B6 rationale | quoted in unit b's receipt and in CL.2b. **Present** |

### CL.8 Four-verb status: moved exactly as §State permits, and no further

| verb | state |
|---|---|
| AUDITED | YES (unchanged) |
| SPECIFIED | YES (unchanged) |
| IMPLEMENTED | **NO, not stamped.** §9 commits 1–5 have all landed, but §9 row 6 flips to IMPLEMENTED only at a close whose hard gate holds. C1 · C3 · C7 · D1 · D4 · N14 · N15 · A2-blob · B3 · B4-arm-3 · N5-reset stay RED or escalated, so the wave reads **PARTIAL** |
| VERIFIED | NO. It is stamped only at X-W11's release close (§9 row 6) |

L-18 rider: the wave cannot be ACCEPTED until its gates are GREEN and it has passed the two quartet challenge passes.

**Commit roster for this close**: the record and the B1-B2-B3 GREEN JSON are committed together in one pathspec commit, and the LEDGER row goes in a second.

**CL.9 Push: WITHHELD, and not forced.** ⟨cmd⟩ `git push origin HEAD` was **rejected (non-fast-forward)**. ⟨cmd⟩ `git rev-list --left-right --count origin/tranche-u...HEAD` → `1  191`; the remote-only commit is `6fc1212e` (X-W9 repair-1). The old blocker, the staged `PaneSegmentedControl.vue` deletion, is gone: it landed in `50633f19`. ⟨cmd⟩ `git pull --no-rebase --no-edit origin tranche-u` → **CONFLICT (content) in `docs/tranches/X/execution/A/X-W9.md`**, which is the X-W9 record and outside this seat's writable set. The merge was aborted with ⟨cmd⟩ `git merge --abort`, and the tree is back to its 2-row baseline. The owner is the X-W9 record holder: it must reconcile the local X-W9.md appends with `6fc1212e`, and then any seat pushes.

## Check 1 — L-20 fresh adversarial pass 1, 2026-09-22 (VERIFY-ONLY)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 CHECK 1 · HEAD at open `4c779e2d` · date of record 2026-09-17. This seat authored
none of the wave's bytes and cured nothing. It wrote this section and one LEDGER event line.

**Verdict: NOT-CONFORMANT.** The row is **not promoted** and stays PARTIAL. There are 3 HIGH, 4 MEDIUM, 2 MINOR and 1 INFO defects.
Every GREEN this seat re-ran reproduces. Three REDs, however, have no relief in the spec. Two of them (C1, D1) are gate failures that
§3a itself names as triumvirate triggers, and the third (D4) leaves a named hard-gate clause unmet.

### K1.0 Crash-recovery and inputs

⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/` → empty, so there was no inherited partial. The whole tree has 3 rows:
`CARRY-LEDGER.md` (a sibling's), `scripts/dev/dev.sh` (never touched) and the `KF-W13T-e-probe.mjs` untracked file (a sibling's). This seat read
`W5.md` whole (389 L). Of the record it read only the R3 open plan (`:1817-1943`) and the last Close (`:2212-2406`).

### K1.1 Axis 1: the claimed GREENs, re-run at this seat's own commands

One 17-reading script (`scratchpad/chk.sh`) was run twice. ⟨cmd⟩ `diff r1 r2` → **IDENTICAL**.
- **A1**: `node -e` → exit **0**; the App grep → **0**. GREEN.
- **A4**, structural: `bindPane` → **10**. GREEN.
- **A5**, structural: `<h1` carriers → **4**. GREEN.
- **A7**, grep arm: `role="status"` → **3**. GREEN.
- **B4** arms 1 and 2: `100dvh` **0**, `svh` in **3** files. GREEN. Arm 3 is `content-max-h` **3** (RED, as the close claims).
- **C4**: `test ! -e` → **0**. The one remaining `PaneSegmentedControl` hit is a comment at `Dock.vue:248`, not an importer. GREEN.
- **C8**: exit **0**. GREEN.
- **D2**: exit **0**. GREEN.
- **D3**: **0**. GREEN.
- **D4**, Mix arm: `<Transition ` **1**. GREEN.
- **E1**: `0·0·0·0`. GREEN.
- **E2**: 7 added lines, 7 of them citing `P122`. GREEN.
- **§7 typecheck**: ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` (run in the background) → **EXIT=0**.

That is **12 GREEN reproduced** out of 12 claimed and re-run.

The REDs also reproduce: **C3** 23 / 9 files, **C7** 4, and **D4** `AdminNamesPanel.vue` with `<Transition ` **0** and a bare `v-if` at `:24`.

Live GREENs (C2 · C5 · C6 · B1 · B2 · A6 · D5) were **checked at their banked JSON and not re-probed** (§5.2 parsimony). `green/C1-C2-C5-C6-2026-09-22.json`
carries `specimenChanged:true`, `canvasIdentitiesKept:1`, `rootIdentitiesKept:2` and `cardFilters ["none",…]`. No W5 §4 path has moved since the close
(HEAD `4c779e2d`, whose commits after `4bbdd952` are docs-only).

⟨cmd⟩ `git diff --name-only 4bbdd952..HEAD -- demo/ e2e/ plugins/ vite.config.ts` → **0**, so the bytes the close measured are the bytes at HEAD.

### K1.2 Axes 2–7

- **(2) Bounds.** ⟨cmd⟩ `git show --name-only` was run over the 21 wave commits (`c0cf27bf` … `4c779e2d`) → **95** distinct paths.
  - The paths that fall outside §4 are all fold-granted BoundsDelta rows in `X-W5-FOLD.md`: BD-05 · BD-06 · BD-10 · BD-14 · BD-15 · BD-01 · BD-02, the
    W5F-50 `picker-color.ts` row, and the W5F-18 `demo/DESIGN.md` row.
  - `X-W5-FOLD.md` itself is touched only by `c0cf27bf`. That commit is an append-only dated §9 addendum that §0k.3 S-7 orders.
  - **`scripts/dev/dev.sh`: absent from every commit. CLEAN.**
- **(3) No masking fallback.** No `test.skip`, allowlist, `node_modules` patch or try/catch-around-defect was found in the W5 commits. The wave
  withheld the cures that are out of bounds (N15, D4-Admin, C1's AboutPane) and did not substitute for them, which is the lawful posture. **CLEAN.**
- **(4) Commit families.** §9 c1–c5 each landed as one meaning: `50633f19` carries PSC deletion + `regions[]` + the T-45 re-seat together; `2183b814` carries the
  gate script with unit d. §9 row 6 (`3ce0f55f`) is a PARTIAL close with no status flip. **CLEAN.**
- **(5) E-3.** ⟨cmd⟩ `git diff --stat c0cf27bf~1..HEAD -- docs/tranches/X/waves/W5.md docs/tranches/V/megatranche/registry/adjudicated/` → **empty**. **HELD.**
- **(6) Mail.** ⟨cmd⟩ `grep -cE '\|\s*\**UNREAD\**\s*\|' INBOX.md` → **0**. **CLEAN.**
- **(7) Four-verb.** IMPLEMENTED was not stamped because the hard gate is unmet (CL.8). **LAWFUL.**
- **(8) Goal criterion.** **NOT MET at the bytes**, for three reasons:
  - The criterion requires *"moving between scenes is an animated, **budgeted** … event"*, and D1 breaches the budget on 2 of 4 hops in every run.
  - The §1 hard gate requires *"**every** pane and sub-pane swap carries a defined … motion"*, but `AdminNamesPanel.vue:24` is a bare `v-if` swap behind
    `SegmentedTabs`.
  - C1 (*"every region … present at 390"*) reads 0.5557 on `#/`.
- **(9) Published figures.** C3 23/9 · C7 4 · B4 arm 3 = 3 · A4 10 · A5 4 · A7 3 · E2 7/7 all reproduce ×2. **REPRODUCE.**

### K1.3 Axis 10: honest-RED adjudication, gate by gate, at the spec bytes

| gate | relief in the spec or its rulings? | owner named? | adjudication |
|---|---|---|---|
| A3 | §0k.3 S-1, which rules the cure to X-W8 | X-W8 | **HONEST-RED** |
| N5 ROUTE-RESET arm | §0k.3 S-7, to X-W7 | X-W7 | **HONEST-RED** |
| B3 (2/10 routes ≥ 90 %) | the cap is dead, and the residue is scene content that X-W6's CC-056/V·L3 composes (§10 *Blocks* X-W6) | X-W6 | **HONEST-RED** |
| A5 OUTLINE arm | the heading-outline canon is X-W10's (§10 *Blocks* X-W10) | X-W10 | **HONEST-RED** |
| C3, Dock rows (`Dock.vue` `isDesktop`/`useMediaQuery`, `DockViewSelect`, `ActionBarToggle`) | RUNBOOK §1.1 back-gate on Dock G-L | X-W8 | **HONEST-RED** for those rows |
| C3, non-dock rows (`ExtractWorkbench.vue:226` `isWide`, `ConsoleRail.vue:118`, `HeroBlob.vue:71`) | **none**. They are layout forks the gate's "== 0 at layout sites" covers, and they are outside §4. The close's re-home ("X-W6 / X-W8 per their homes") is the seat's own assignment, not a spec or ruling routing | seat-named only | **UNRELIEVED**: D-5 |
| C7 (4 vs 3) | **none**. The gate is arithmetic, 7 → 5 → 3. The survivors are `ConsoleRail:342` and `DockStatusLamp:70`, both outside §4, plus `animations.css:17` (preserve edict) and `foundation.css:526` (kept by unit b's own mechanism) | seat-named only | **UNRELIEVED**: D-4 |
| B4 arm 3 (3 comment hits in `PaneSlot.vue`) | the fold `:41` GATING-LOCK couples it to the out-in re-probe, which rides D1 | ESC-W5d-1 | not independent: follows D-1 |
| C1 | **none**. §3a names C1 as a triumvirate trigger, not a relief | triumvirate (not yet sat) | **UNRELIEVED**: D-2 |
| D1 | **none**. §3a names D1 as a triumvirate trigger | triumvirate (not yet sat) | **UNRELIEVED**: D-1 |
| D4, `AdminNamesPanel` | **none**. The hard gate says *every* sub-pane swap. The path is outside §4, so a §3a bounds grant is owed | triumvirate / grant | **UNRELIEVED**: D-3 |
| A2 blob arm | **none**. ESC-W5-1 calls it "unfalsifiable as authored", and a triumvirate re-authoring is owed | triumvirate | **UNRELIEVED**: D-6 |
| N14 · N15 (fold gates) | N15 is a bounds escalation, ESC-W5c-2. N14 names BD-08 and X-W1 by seat assignment only | seat-named | **UNRELIEVED**: D-7 |

**The honest-RED set, relieved and owner-named**: A3 · N5-reset · B3 · A5-outline · C3's dock rows.

### K1.4 Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| D-1 | **HIGH** | D1 breaches the frame budget after the re-key. This is a §3a named trigger, the §1 hard gate and the §2 goal are unmet, and no triumvirate has sat | CL.2: gradient .294/.371 and mix .333/.346 (×2), plus `.d`'s 10/10 banked in `green/D1-…AFTER` | a §3a triumvirate (research + plan augment + redress) that rules the instrument conditions, the out-in co-mount re-probe (fold `:41`) and Mix's frame cost, then a re-measure |
| D-2 | **HIGH** | C1 content parity is RED at 390. It is a §3a named trigger with no relief | CL.2: `#/` 973/1751 = 0.5557, 14/15 routes | a §3a triumvirate ruling. The choice is between re-metricising the gate by dated addendum (textContent 1.0 on 15/15) and a bounds grant for AboutPane's `content-visibility` |
| D-3 | **HIGH** | D4 and the hard gate's "every sub-pane swap": `AdminNamesPanel.vue:24/:43` is a bare `v-if` chain behind `SegmentedTabs` | ⟨cmd⟩ `grep -c '<Transition ' AdminNamesPanel.vue` → 0 | a §3a bounds grant (dated COHESION addendum) for that one path, then a named one-root `<Transition>`, as the Mix cure did |
| D-4 | MEDIUM | C7 reads 4 against a spec target of 3. The spec gives no relief, and the survivors lie outside §4 or are edict-kept | ⟨cmd⟩ C7 grep → 4 | a dated addendum that re-homes one survivor (ConsoleRail → X-W6 or DockStatusLamp → X-W8) as a spec routing, or grants the bound |
| D-5 | MEDIUM | C3's non-dock layout forks (Extract `isWide`, ConsoleRail and HeroBlob `isLgViewport`) have no spec relief. The G-L back-gate covers only the dock rows | ⟨cmd⟩ the C3 grep → 23 / 9. Three of the 9 files are capability-only queries (`prefers-reduced-motion`, `hover`) | a dated addendum that classifies the capability rows out of the gate and routes the three layout forks to a named wave |
| D-6 | MEDIUM | A2's blob arm is RED. It is self-declared unfalsifiable and has not been re-authored | CL.6 item 6 | a triumvirate re-authoring of the arm by addendum |
| D-7 | MEDIUM | N14 is RED and N15 is ESCALATED on bounds, both routed only by seat assignment | CL.2 unit c rows | a §3a bounds grant for `AdminPane.vue`, or a ruled re-home to X-W7 (CE-5); name BD-08's holder |
| D-8 | MINOR | Landed-by-consequence: `o12-blob-seat:68` and `o16-computed-cascade:158` still select `.pane-wrapper--left`; `e2e/visual/census-parity` reads `RightPane`; `capture.ts:560` reads `defaultPaneIndex` | CL.6 item 5 | a grant, or X-W1/X-W2 holder rows (one-token re-points) |
| D-9 | MINOR | B4 arm 3 has 3 comment mentions left in the in-bounds `PaneSlot.vue` | ⟨cmd⟩ → 3 | rides D-1's re-probe ruling |
| D-10 | INFO | The push is withheld (CL.9): `6fc1212e` conflicts in `X-W9.md`, which is out of set | CL.9 | Track A merge holder |

### K1.5 Successor "Opens after" conjuncts

- **X-W6** (`W6.md:4`, *"X-W5"*): **NOT MET**, because X-W5 is not CLOSED. X-W6's `.j` stays lawfully BLOCKED-ON X-W5.
- **X-W7** (X-W3 · X-W4 · X-W6): X-W3 and X-W4 are GREEN (CLOSED). X-W6 is still PARTIAL, so X-W7 is lawfully blocked, transitively through W5.
- **X-W8** (*"X-W5, X-W6 and X-W7 stabilize"*): lawfully blocked.
- **X-W10** (`W5…W9` stable): lawfully blocked.
- The X-W5-side conjuncts that are already GREEN are `regions[]` (C8) and the dead block cap (B2/B4 arms 1–2). CC-056 needs both, and they are in place at the bytes. The wave-close conjunct is not.

## Repair 1 — L-20 repair round 1, 2026-09-22

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 REPAIR 1 · HEAD at open `7f4d7c24` · input: `## Check 1` register (D-1..D-10).
This seat read `W5.md` whole (389 L), the fold's §1 W5F-04 row (`X-W5-FOLD.md:41`) and its BoundsDelta tables (`:197-217`, `:342-348`),
the record header, the ESC-W5d-1..3 paragraphs (`:2125-2130`) and `## Check 1` (`:2408-2512`). **Product bytes written: 0.**

### R1.0 Crash-recovery

⟨cmd⟩ `git status --porcelain` → `CARRY-LEDGER.md` (sibling's) · `scripts/dev/dev.sh` (never touched) · `KF-W13T-e-probe.mjs` (sibling's, untracked).
No path inside this wave's writable set is dirty, so there is no inherited partial.

### R1.1 Per-defect disposition — every ≥MEDIUM defect's cure lies outside this seat's lawful reach

Each cure the register names is either a §3a **mandatory triumvirate** (research + plan augment + redress; *"the orchestrator may not
redispatch the failing unit alone"*, `W5.md:73-74`), which a single repair seat re-running the failing unit's cure would be, or a
**bounds grant** on a path that neither `W5.md` §4 nor the fold's BD-01..BD-24 grants. A write into either is an ESCALATION by the
standing law, and an in-bounds substitute (shortening the travel, deleting the motion, re-metricising a gate by the seat's own
addendum) is the masking cure the law names as a HIGH defect. So this round cured nothing, and every row is routed below with its measured reason.

| # | sev | defect | disposition | measured reason (⟨cmd⟩ → output, double-run IDENTICAL) |
|---|---|---|---|---|
| D-1 | HIGH | D1 frame budget unmet after the re-key | **ESCALATED → §3a triumvirate** | `W5.md` §3a names *"D1 (frame budget unmet after the transition re-key)"* as a mandatory-triumvirate trigger. The fold `:41` COUPLED ARCHITECTURE LOCK forbids changing the simultaneous mode, the rAF mirror or the loading states in isolation, and its GATING LOCK makes the out-in re-probe precede any mode change. The Mix hop's root (0.257 with the travel suppressed, ESC-W5d-1) is not a W5 surface. ⟨cmd⟩ `git diff --name-only 4bbdd952..HEAD -- demo/ e2e/ plugins/ vite.config.ts \| wc -l` → **0**, so CL.2's readings (.294/.371 · .333/.346) stand at HEAD and were not re-probed (§5.2 parsimony, and the host-load flake is itself a §3a trigger). |
| D-2 | HIGH | C1 parity 0.5557 on `#/` | **ESCALATED → §3a triumvirate** | §3a names C1 as a trigger. Both cures in the register lie outside the seat: a gate re-metric is a spec correction (E-3 addendum by a ruling, not by the failing unit's repairer), and `AboutPane` (`content-visibility:auto` ×33) appears in no §4 row and no BD row. ⟨cmd⟩ `sed -n 91,127p W5.md \| grep -cE 'AboutPane\|…'` → **0**. |
| D-3 | HIGH | D4: `AdminNamesPanel.vue:24` bare `v-if` swap | **ESCALATED → bounds grant (§3a)** | ⟨cmd⟩ `grep -c '<Transition ' AdminNamesPanel.vue` → **0** (Mix arm → 1). The only grant on the path is BD-22, *"modify-carve (source order only)"* (⟨cmd⟩ `grep -c 'source order only' X-W5-FOLD.md` → 1), so a `<Transition>` there is outside the grant. The cure shape is unchanged: one named one-root `<Transition>`, as in `MixSourceSelector`. |
| D-4 | MEDIUM | C7 = 4 vs 3 | **ESCALATED → dated routing addendum / bounds grant** | The survivors are `ConsoleRail:342` and `DockStatusLamp:70` (in no §4/BD row; BD-17 names `status-lamp.ts` read-only, owned BY NAME by X-W8), `animations.css:17` (preserve-animations edict) and `foundation.css:526` (unit b's own mechanism). Retiring an in-bounds one breaks an edict or unit b; the rest are out of bounds. |
| D-5 | MEDIUM | C3 non-dock forks (`ExtractWorkbench:226`, `ConsoleRail:118`, `HeroBlob:71`) | **ESCALATED → dated classification + routing addendum** | ⟨cmd⟩ the spec regex → **23 / 9 files**, and widened with `isWide\|isLgViewport` → 29. BD-10 grants `ExtractWorkbench.vue` modify-carve for W5F-03/39/40/62 only, not the `isWide` fork. `ConsoleRail` and `HeroBlob` are in no row. Classifying capability rows out of the gate re-authors a gate, which is a ruling's act. |
| D-6 | MEDIUM | A2 blob arm is RED and self-declared unfalsifiable (ESC-W5-1) | **ESCALATED → triumvirate re-authoring** | Under L-18 (`W5.md` §12), *"a gate … shown to be unfalsifiable is struck and re-authored"*. Re-authoring is not a repair of bytes, and the seat that cannot pass a gate may not re-author it. |
| D-7 | MEDIUM | N14 RED / N15 escalated, routed only by seat assignment | **ESCALATED → bounds grant or ruled re-home** | ⟨cmd⟩ `grep -c 'AdminPane.vue' X-W5-FOLD.md` → **0**, so `AdminPane.vue` has no grant. BD-08 (`router/index.ts`) is granted, but its holder naming (the X-W1/X-W3.6 fail-closed guard) is a ruling, not a repair. |
| D-8 | MINOR | out-of-wave oracles still read `.pane-wrapper--left` / `RightPane` / `defaultPaneIndex` | **ESCALATED → holder rows (X-W1/X-W2)** | ⟨cmd⟩ `grep -rl pane-wrapper--left e2e/` → `o12-blob-seat.spec.ts` · `o16-computed-cascade.spec.ts` · `e2e/visual/capture.ts` (**3**). The only e2e paths granted are §4's six, and these are X-W2's declared files (`W5.md:138-141`) or X-W1's. The one-token re-points are simple, but they are not in bounds. |
| D-9 | MINOR | B4 arm 3: 3 `content-max-h` comment mentions in `PaneSlot.vue` | **ESCALATED → rides D-1's re-probe ruling** | ⟨cmd⟩ `grep -ro content-max-h demo/ \| wc -l` → **3** (`:46`, `:54`, `:55`), all inside the TRANSITION-MODE paragraph under the fold `:41` GATING LOCK (*"No wave may delete PaneSlot.vue:12-23 before [the out-in re-probe] runs"*; the paragraph has since moved to `:36-60`). The path is in bounds, but the lock is not satisfied, so a one-command delete is refused. |
| D-10 | INFO | push withheld on the `6fc1212e` conflict in `X-W9.md` | **ESCALATED → Track A merge holder** | `X-W9.md` is outside the set, and no cure is owed at this seat. |

### R1.2 Gate re-reading (WRITE-THEN-MEASURE, ×2)

No cure landed, so no gate could move. The re-reading is `scratchpad/rep1.sh`, run twice. ⟨cmd⟩ `diff r1 r2` → **IDENTICAL**.
Readings: HEAD `7f4d7c24` · W5-surface diff since `4bbdd952` **0** · D4-admin **0** · D4-mix **1** · B4 arm 3 **3** · C3 **23/9** · e2e
`.pane-wrapper--left` files **3**. Every figure Check 1 published reproduces unchanged.

### R1.3 Verdict

**cured 0 · escalated 10 (D-1..D-10).** The row stays **PARTIAL**, and IMPLEMENTED is not stamped. The next lawful act belongs to the orchestrator, not to a
further repair round. It owes two things:
- the §3a triumvirate over D-1 · D-2 · D-6, which also releases D-9 through the out-in re-probe;
- dated COHESION bounds grants or routing addenda for D-3 · D-4 · D-5 · D-7 · D-8.

A second repair seat given the same inputs could cure nothing more.

## Check 2 — L-20 fresh adversarial pass 2, 2026-09-22 (VERIFY-ONLY)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 CHECK 2 · HEAD at open `dc164d7e` · date of record 2026-09-17. This seat authored none of the
wave's bytes and cured nothing. It wrote this section and one LEDGER event line. Inputs: `W5.md` whole (389 L), the record header, `## Check 1`
(`:2408-2512`) and `## Repair 1` (`:2514-2559`); COHESION section heads through §0ap.

**Verdict: NOT-CONFORMANT.** The row is **not promoted** and stays PARTIAL. Repair 1 cured 0 and escalated 10. No COHESION addendum after
Repair 1 rules the §3a triumvirate or grants a bound for X-W5: ⟨cmd⟩ `grep -n '^## ' COHESION.md | tail -1` → §0ap, which covers KF.W13S. The
last X-W5-bearing ruling is §0an, and it is X-W6's grant. So the three HIGH defects of Check 1 stand at the bytes, unrelieved.

### K2.0 Crash-recovery

⟨cmd⟩ `git status --porcelain` → `CARRY-LEDGER.md` (a sibling's) · `scripts/dev/dev.sh` (never touched) · `KF-W13T-e-probe.mjs` (a sibling's,
untracked). No path in this seat's writable set is dirty, so there is no inherited partial.

### K2.1 Axis 1: GREENs re-run at this seat's own commands (`scratchpad/chk2.sh`, ×2, ⟨cmd⟩ `diff r1 r2` → IDENTICAL)

A1 exit **0**, App grep **0** · A4 `bindPane` **10** · A5 `<h1` **4** · A7 `role="status"` **3** · B4 arms 1–2 `100dvh` **0**, `svh` **3** files ·
C4 exit **0** · C8 exit **0** · D2 exit **0** · D3 **0** · D4-Mix `<Transition ` **1** · E1 `0 0 0 0` · §7 typecheck ⟨cmd⟩ `npx vue-tsc -p
tsconfig.demo.json --noEmit` → **EXIT=0**. That is **12 of 12 re-run GREENs reproduced**. E2 (7/7 lines cite P122) is carried from Check 1: the four
canon files have not moved (E-3 diff below).

The REDs reproduce too: B4 arm 3 **3** · C3 **23 / 9 files** · D4-Admin `<Transition ` **0**. ⟨cmd⟩ `git diff --name-only 4bbdd952..HEAD -- demo/ e2e/
plugins/ vite.config.ts | wc -l` → **0**, so the live readings banked at the close (C1 0.5557 on `#/`; D1 gradient .294/.371, mix .333/.346; the
C2/C5/C6/B1/B2/A6/D5 GREEN JSON) describe HEAD. They were not re-probed (§5.2 parsimony).

### K2.2 Axes 2–9

- **(2) Bounds.** Check 1's 95-path audit over the 21 wave commits stands. The only commits since are `4a43ebbd`, `e7206106` and `dc164d7e`. ⟨cmd⟩ `git show
  --stat` shows they touch only `execution/A/X-W5.md` and `execution/LEDGER.md`. `scripts/dev/dev.sh` is in no commit. **CLEAN.**
- **(3) No masking fallback.** Nothing moved since Check 1, which found it CLEAN. Repair 1 explicitly refused the in-bounds substitutes (shortening the
  travel, deleting the motion, re-metricising a gate by the seat's own addendum). **CLEAN.**
- **(4) Commit families.** §9 c1–c5 are unsplit, as Check 1 K1.2 found. **CLEAN.**
- **(5) E-3.** ⟨cmd⟩ `git diff --stat c0cf27bf~1..HEAD -- W5.md registry/adjudicated/ | wc -l` → **0**. **HELD.**
- **(6) Mail.** ⟨cmd⟩ UNREAD rows in `INBOX.md` → **0**. **CLEAN.**
- **(7) Four-verb.** IMPLEMENTED is not stamped because the hard gate is unmet. **LAWFUL.**
- **(8) Goal criterion.** **NOT MET**:
  - the "budgeted" scene move is breached, because D1 fails 2 of 4 hops;
  - "every … sub-pane swap" is breached, because `AdminNamesPanel` is a bare `v-if`;
  - "every region present at 390" is breached, because C1 reads 0.5557.
- **(9) Published figures.** Every figure reproduces ×2 (K2.1).

### K2.3 Axis 10: honest-RED adjudication

Check 1's K1.3 table is re-affirmed row for row. Nothing has changed its inputs: no ruling, no grant and no byte.
- **Relieved and owner-named**: A3 (§0k.3 S-1 → X-W8) · N5 ROUTE-RESET (§0k.3 S-7 → X-W7) · B3 (CC-056/V·L3 → X-W6, §10 Blocks) · A5 OUTLINE (→ X-W10,
  §10 Blocks) · C3 dock rows (RUNBOOK §1.1 G-L back-gate → X-W8).
- **Unrelieved**: D1 and C1, which are §3a named triumvirate triggers that have not sat. D4-Admin, whose bounds grant is not issued. C7 4≠3. C3 non-dock
  forks. The A2 blob arm (unfalsifiable, not re-authored). N14/N15. B4 arm 3, which is GATING-LOCKed behind D1.

### K2.4 Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| D-1 | **HIGH** | D1 frame budget still breached after the re-key; §3a trigger; no triumvirate has sat | CL.2 .294/.371 · .333/.346; W5 surface diff since `4bbdd952` = 0 | the §3a triumvirate (research + plan augment + redress) per fold `:41` locks, then a re-measure |
| D-2 | **HIGH** | C1 parity 0.5557 on `#/`; §3a trigger; unrelieved | CL.2 973/1751; surface diff 0 | a §3a triumvirate ruling: gate re-metric by dated addendum, or an AboutPane bounds grant |
| D-3 | **HIGH** | D4 / hard gate "every sub-pane swap": `AdminNamesPanel.vue` bare `v-if` | ⟨cmd⟩ `grep -c '<Transition '` → 0 | a dated COHESION bounds grant beyond BD-22's "source order only", then one named `<Transition>` |
| D-4 | MEDIUM | C7 = 4 vs spec 3 | Check 1 / Repair 1 readings; bytes unmoved | a dated routing addendum or bounds grant |
| D-5 | MEDIUM | C3 non-dock layout forks unrelieved | ⟨cmd⟩ C3 → 23 / 9 | a dated classification + routing addendum |
| D-6 | MEDIUM | A2 blob arm RED; self-declared unfalsifiable; not re-authored | ESC-W5-1 | a triumvirate re-authoring by addendum |
| D-7 | MEDIUM | N14 RED / N15 escalated, routed by seat only | `AdminPane.vue` has no grant | a bounds grant or a ruled re-home |
| D-8 | MINOR | out-of-wave oracles still read `.pane-wrapper--left` etc. | Repair 1: 3 e2e files | holder rows at X-W1/X-W2 |
| D-9 | MINOR | B4 arm 3: 3 comment mentions in `PaneSlot.vue` | ⟨cmd⟩ → 3 | rides D-1 (fold `:41` GATING LOCK) |
| D-10 | INFO | push withheld (`6fc1212e` conflict in `X-W9.md`) | CL.9 | Track A merge holder |
| D-11 | INFO | the L-20 loop is exhausted at the seat level: Repair 1 showed that no repair seat can lawfully cure D-1..D-7 | R1.3 | an orchestrator act: sit the §3a triumvirate, issue the COHESION grants/addenda, then run a Check 3 |

### K2.5 Successor "Opens after" conjuncts

- **X-W6** (*"X-W5"*): **NOT MET**. X-W5 is not CLOSED, so X-W6 `.j` stays lawfully BLOCKED-ON X-W5.
- **X-W7** (X-W3 · X-W4 · X-W6): X-W3 and X-W4 are GREEN. X-W6 is PARTIAL, so X-W7 is lawfully blocked.
- **X-W8** (W4·W5·W6·W7) and **X-W10** (W5…W9 stable): lawfully blocked on X-W5.
- The W5-side substrate is GREEN at the bytes: `regions[]` (C8), the dead block cap (B2, B4 arms 1–2) and one mount path (C5). Only the wave-close
  conjunct is unmet.

## Repair 2 — L-20 repair round 2, 2026-09-22

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 REPAIR 2 · HEAD at open `d0ecb166` · input: the `## Check 2` register (D-1..D-11).
This seat read `W5.md` whole (389 L), the fold's `:41` W5F-04 row, `PaneSlot.vue:1-75`, and `## Repair 1` + `## Check 2` (`:2514-2633`). It also
read the COHESION section heads through §0ap. **Product bytes written: 0.**

### R2.0 Crash-recovery

⟨cmd⟩ `git status --porcelain` → `CARRY-LEDGER.md` (a sibling's) · `scripts/dev/dev.sh` (never touched) · `KF-W13T-e-probe.mjs` (a sibling's,
untracked). No path in this wave's writable set is dirty, so there is no inherited partial.

### R2.1 What changed since Repair 1: nothing that unlocks a cure

⟨cmd⟩ `grep -n '^## ' COHESION.md | tail -1` → **§0ap** (KF.W13S). ⟨cmd⟩ `awk '/^## §0ap/{f=1} f' COHESION.md | grep -c X-W5` → **0**.
So no §3a triumvirate has sat, and no bounds grant or routing addendum has been issued for X-W5 since Repair 1. ⟨cmd⟩ `git diff --name-only
4bbdd952..HEAD -- demo/ e2e/ plugins/ vite.config.ts | wc -l` → **0**, so the bytes are the ones Repair 1 and Check 2 judged.

### R2.2 Per-defect disposition

| # | sev | defect | disposition | measured reason (⟨cmd⟩ → output, double-run IDENTICAL) |
|---|---|---|---|---|
| D-1 | HIGH | D1 frame budget unmet after the re-key | **ESCALATED → §3a triumvirate** | §3a names D1 as a mandatory trigger, and it says *"the orchestrator may not redispatch the failing unit alone"*. One repair seat is not research + plan augment + redress. The fold `:41` COUPLED lock (mode, rAF mirror and loading states move together) and its GATING lock (the out-in re-probe, with script + RESULTS committed, comes before any mode change) both still hold. Surface diff → **0**. |
| D-2 | HIGH | C1 0.5557 on `#/` | **ESCALATED → §3a triumvirate** | §3a names C1 as a trigger. A gate re-metric is a ruling's addendum, and `AboutPane` is in no §4 or BD row. No ruling has been issued since Repair 1 (R2.1). |
| D-3 | HIGH | D4: `AdminNamesPanel.vue` bare `v-if` | **ESCALATED → COHESION bounds grant** | ⟨cmd⟩ `grep -c '<Transition ' demo/palettes/browser/admin/AdminNamesPanel.vue` → **0** (Mix → **1**). ⟨cmd⟩ `grep -c 'source order only' X-W5-FOLD.md` → **1**: BD-22 is the only grant, and a `<Transition>` is outside it. The cure shape is ready: one named one-root `<Transition>`, as in Mix. |
| D-4 | MEDIUM | C7 = 4 vs 3 | **ESCALATED → routing addendum / grant** | The survivors are unchanged. `ConsoleRail` and `DockStatusLamp` are out of bounds. `animations.css:17` falls under the preserve-animations edict, and `foundation.css` is unit b's own mechanism. |
| D-5 | MEDIUM | C3 non-dock forks | **ESCALATED → classification + routing addendum** | ⟨cmd⟩ C3 → **23 / 9 files**. `ExtractWorkbench` (BD-10 scope excludes `isWide`), `ConsoleRail` and `HeroBlob` have no grant. |
| D-6 | MEDIUM | A2 blob arm unfalsifiable (ESC-W5-1) | **ESCALATED → triumvirate re-authoring** | L-18 (`W5.md` §12): a struck gate is re-authored by the challenge lane, not by a repair seat. |
| D-7 | MEDIUM | N14/N15 | **ESCALATED → grant or ruled re-home** | ⟨cmd⟩ `grep -c AdminPane.vue X-W5-FOLD.md` → **0**. Naming a holder for BD-08 is a ruling. |
| D-8 | MINOR | out-of-wave oracles | **ESCALATED → holder rows at X-W1/X-W2** | ⟨cmd⟩ `grep -rl pane-wrapper--left e2e/ \| wc -l` → **3**. None of the 3 files is among §4's six e2e paths. |
| D-9 | MINOR | B4 arm 3: 3 comment mentions | **ESCALATED → rides D-1** | ⟨cmd⟩ → **3**, all in `PaneSlot.vue`'s TRANSITION-MODE paragraph. Its own correction block says the bytes stand under the D-1 lock until the out-in re-probe runs, so a one-command delete would break the lock. |
| D-10 | INFO | push withheld (`X-W9.md` conflict) | **ESCALATED → Track A merge holder** | `X-W9.md` is outside the set. |
| D-11 | INFO | L-20 loop exhausted at seat level | **CONFIRMED** | This second round, given the same inputs, reproduces Repair 1's result: cured 0. |

### R2.3 Gate re-reading (WRITE-THEN-MEASURE, ×2)

`scratchpad/rep2.sh` was run twice. ⟨cmd⟩ `diff r1 r2` → **IDENTICAL**. Readings: HEAD `d0ecb166` · surface diff **0** · COHESION X-W5 rows after
§0ap **0** · D4-admin **0** · D4-mix **1** · B4 arm 3 **3** · C3 **23 / 9** · e2e `.pane-wrapper--left` files **3** · `AdminPane.vue` in fold **0** ·
BD-22 "source order only" **1**. No cure landed, so no gate could move. Every figure in Check 2 reproduces.

### R2.4 Verdict

**cured 0 · escalated 10 (D-1..D-10); D-11 confirmed.** The row stays **PARTIAL**. A third repair round cannot cure anything, and neither can a
Check 3 run before the orchestrator acts. The next lawful act is the orchestrator's, and it has two parts:
- sit the §3a triumvirate over D-1 · D-2 · D-6. This includes the committed out-in re-probe, which releases D-9.
- issue dated COHESION grants or addenda for D-3 · D-4 · D-5 · D-7 · D-8.

## Check 3 — L-20 fresh adversarial pass 3, 2026-09-22 (VERIFY-ONLY)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 CHECK 3 · HEAD at open `d56d06db` · date of record 2026-09-17. This seat authored none of the
wave's bytes and cured nothing. It wrote this section and one LEDGER event line. Inputs: `W5.md` whole (389 L), `## RESUME OPEN 3` (`:1817-1943`),
`## Check 2` and `## Repair 2` (`:2561-2679`), and the COHESION section heads.

**Verdict: NOT-CONFORMANT.** The row is **not promoted** and stays PARTIAL. Repair 2 cured 0 and escalated 10. Its R2.4 said the next lawful act
belonged to the orchestrator. That act has not happened: ⟨cmd⟩ `grep -n '^## ' COHESION.md | tail -1` → **§0ap** (KF.W13S). No section after it
exists, so no §3a triumvirate has sat and no grant or addendum has been issued for X-W5. ⟨cmd⟩ `git diff --name-only 4bbdd952..HEAD -- demo/ e2e/
plugins/ vite.config.ts | wc -l` → **0**. The three HIGH defects therefore stand at the bytes.

### K3.0 Crash-recovery

⟨cmd⟩ `git status --porcelain` → `CARRY-LEDGER.md` · `F-W11.md` (siblings') · `scripts/dev/dev.sh` (never touched) · `KF-W13T-e-probe.mjs`
(a sibling's, untracked). No path in this seat's writable set is dirty, so there is no inherited partial.

### K3.1 Axis 1: GREENs re-run at this seat's own commands (`scratchpad/chk3.sh`, ×2, ⟨cmd⟩ `diff r1 r2` → IDENTICAL)

A1 exit **0**, App grep **0** · A4 `bindPane` **10** · A5 `<h1` **4** · A7 `role="status"` **3** · B4 arms 1–2 `100dvh` **0**, `svh` **3** files ·
C4 exit **0** · C8 exit **0** · D2 exit **0** · D3 **0** · D4-Mix `<Transition ` **1** · E1 `0 0 0 0` · E2 `P122` present in all 4 canon files
(9 · 3 · 18 · 10) · §7 ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT=0**. That is **13 of 13 re-run GREENs reproduced**.

The REDs reproduce as well:
- B4 arm 3 (`content-max-h`) → **3**.
- C3 → **23 occurrences / 9 files**.
- C7 → **4**, where the spec's target is 3.
- D4 census: the `SegmentedTabs` consumers are `MixSourceSelector.vue` (`<Transition ` **1**) and `AdminNamesPanel.vue` (`<Transition ` **0**, a bare swap).
- D1 AFTER JSON: `→/gradient` over32 11/33 = **.333 > .15**.

The live banked readings (C1 0.5557; D1 gradient/mix hops over budget) describe HEAD, because the surface diff is 0. They were not re-probed (§5.2).

### K3.2 Axes 2–9

- **(2) Bounds.** ⟨cmd⟩ `git show --stat` on `83cb02f1` shows `X-W5.md` +46 only, and on `b010611e` shows `LEDGER.md` +1 only. `d56d06db` is F.W11's
  commit. Check 1's 95-path audit over the 21 wave commits stands. `scripts/dev/dev.sh`: ⟨cmd⟩ `git log --format=%h -- scripts/dev/dev.sh | head -1` →
  `85cfea2c` (2026-07-11), which is before the wave. **CLEAN.**
- **(3) No masking fallback.** Nothing has moved since Check 1 found it CLEAN. **CLEAN.**
- **(4) Commit families.** §9 c1–c5 are unsplit. c6 is not landed, because the close is not reached. **CLEAN.**
- **(5) E-3.** ⟨cmd⟩ `git diff --stat c0cf27bf~1..HEAD -- W5.md registry/adjudicated/ | wc -l` → **0**. **HELD.**
- **(6) Mail.** The INBOX status column has **0** UNREAD rows. Every `UNREAD` token is inside a sweep line. **CLEAN.**
- **(7) Four-verb.** IMPLEMENTED is not stamped because the hard gate is unmet. **LAWFUL.**
- **(8) Goal criterion.** **NOT MET**, on three counts:
  - D1 breaches "budgeted" (2 of 4 hops are over budget).
  - `AdminNamesPanel` breaches "every … sub-pane swap".
  - C1 breaches "every region present at 390" (0.5557).
- **(9) Published figures.** Every figure reproduces ×2 (K3.1).

### K3.3 Axis 10: honest-RED adjudication (unchanged inputs, so Check 1 K1.3 / Check 2 K2.3 are re-affirmed)

- **Relieved and owner-named**:
  - A3 (§0k.3 S-1 → X-W8)
  - N5 ROUTE-RESET (§0k.3 S-7 → X-W7)
  - B3 (CC-056/V·L3 → X-W6, §3 "Not in scope" + §10 Blocks)
  - A5 OUTLINE (→ X-W10)
  - C3's dock rows (RUNBOOK §1.1 G-L back-gate → X-W8)
- **Unrelieved**:
  - D1 and C1. These are §3a named triumvirate triggers, and the triumvirate has not sat.
  - D4-Admin. Its bounds grant has not been issued.
  - C7 (4 ≠ 3).
  - C3's non-dock forks.
  - A2's blob arm (ESC-W5-1, not re-authored).
  - N14/N15.
  - B4 arm 3. It is GATING-LOCKed behind D1.

### K3.4 Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| D-1 | **HIGH** | D1 frame budget breached after the re-key; §3a trigger; no triumvirate sat | D1 AFTER JSON `→/gradient` 11/33; surface diff 0 | orchestrator sits the §3a triumvirate (incl. the committed out-in re-probe, fold `:41` locks), then a re-measure |
| D-2 | **HIGH** | C1 parity 0.5557 on `#/`; §3a trigger | `C1-C2-C5-C6-2026-09-22.json`; surface diff 0 | §3a triumvirate ruling: gate re-metric by dated addendum, or an AboutPane bounds grant |
| D-3 | **HIGH** | D4 / hard gate "every sub-pane swap": `AdminNamesPanel.vue` bare swap | ⟨cmd⟩ `grep -c '<Transition '` → 0 | dated COHESION bounds grant beyond BD-22, then one named `<Transition>` as in Mix |
| D-4 | MEDIUM | C7 = 4 vs 3 | ⟨cmd⟩ C7 census → 4 | dated routing addendum or bounds grant |
| D-5 | MEDIUM | C3 non-dock forks | ⟨cmd⟩ → 23 / 9 | dated classification + routing addendum |
| D-6 | MEDIUM | A2 blob arm unfalsifiable, not re-authored | ESC-W5-1 | triumvirate re-authoring by addendum (L-18) |
| D-7 | MEDIUM | N14 RED / N15 escalated; `AdminPane.vue` ungranted | fold grep → 0 | bounds grant or ruled re-home |
| D-8 | MINOR | 3 out-of-wave e2e oracles read `.pane-wrapper--left/right` | Repair 2 R2.2 | holder rows at X-W1/X-W2 |
| D-9 | MINOR | B4 arm 3: 3 comment mentions in `PaneSlot.vue` | ⟨cmd⟩ → 3 | rides D-1 (GATING LOCK) |
| D-10 | INFO | push withheld (`X-W9.md` conflict) | CL.9 | Track A merge holder |
| D-11 | INFO | a third Check run while the orchestrator's act is still unmade reproduces Check 2 exactly. The L-20 loop cannot advance at seat level | this section | orchestrator: §3a triumvirate over D-1/D-2/D-6 plus COHESION grants for D-3/D-4/D-5/D-7/D-8, then Check 4 |

### K3.5 Successor "Opens after" conjuncts

- **X-W6** (*"X-W5"*): **NOT MET**. It is lawfully BLOCKED-ON X-W5 close.
- **X-W7**: X-W3 and X-W4 are GREEN, and X-W6 is not closed, so X-W7 is lawfully blocked.
- **X-W8** (W4·W5·W6·W7) and **X-W10**: lawfully blocked on X-W5.
- The W5-side substrate is GREEN at the bytes: `regions[]` (C8), the dead block cap (B2, B4 arms 1–2) and one mount path (C5). Only the wave-close
  conjunct is unmet.

---

## RESUME OPEN 4 — 2026-09-22, seat 0 (RESUME MODE, on COHESION §0aq + W5.md ADDENDUM 2026-09-22)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 SEAT 0 (OPEN, RESUME 4) · HEAD at open `c9e39745` · date of record 2026-09-17 (the begin-word, COHESION §0j).
Inputs read: `W5.md` whole (394 L, incl. its `## ADDENDUM 2026-09-22`), this record's header, `## Check 3` (`:2681-2767`), COHESION §0aq's
X-W5 block (`COHESION.md:2660-2689`), the fold's W5F-04 row (`X-W5-FOLD.md:41`) and N14/N15 rows (`:327-328`). ⟨cmd⟩ `sed -n 2710,$ COHESION.md | grep -c W5`
→ **0**: no addendum after §0aq touches X-W5 (§0ar..§0au are Track B/C). Ruling ids consumed: **§0aq** (the triumvirate as units; C1 re-metric; D4/N15/N14/
ESC-W5c-3 grants to `.c2`; C7 + C3 relief by route), and — standing — §0i, §0j, §0k.1, §0k.3 (S-1, S-7).

### R4.0 Crash-recovery (STANDING LAW)

⟨cmd⟩ `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`. Neither lies in this seat's writable set
(`X-W5.md`, `LEDGER.md`, `INBOX.md`); `dev.sh` never touched. **No inherited partial.**

### R4.1 E13 Step-0 — the four-path mail sweep (this seat's clock)

⟨cmd⟩ `ls -t ../glass-ui/docs/tranches/ | head -1` → **BK** (still newest). ⟨cmd⟩ `find <path> -maxdepth 1 -type f -newer X-W5.md` over the four paths →
value.js `V/`: empty · `V/coordination/`: `INBOX.md` only · glass `BK/coordination/`: `glass-outbound-2026-09-22-fourier-o23-o32-reply.md` — **already
rowed I-40** (`INBOX.md:135`, status UNREAD, owner *Track C (X·F)*, addressed to fourier F.W1.b/F.W4.z: **outside X-W5 scope**) · keyframes `V/coordination/`:
empty · atlas `P/coordination/`: empty. **0 unrowed · 0 new I-n · 0 UNREAD in X-W5 scope.** Tail stays **I-40 / O-52**. One dated sweep line appended at the
INBOX end.

### R4.2 Preconditions, re-verified (RESUME MODE)

- **Opens-after** (W5.md §1): ⟨cmd⟩ LEDGER row cells → **X-W4 CLOSED 2026-09-17** (promoted at CHECK 2) · **X-W2 CLOSED 2026-09-17 (honest-RED G3·G5)** ·
  **X-W0 CLOSED 2026-09-17**; D2's CC-012 witness ⟨cmd⟩ `git ls-files --error-unmatch …/u-gestalt/probe2-log.txt; echo $?` → **0**. **MET.**
- **Units already landed** (never re-dispatched): ⟨cmd⟩ `git log -1 --format='%h %s' <sha>` → `.a` `c0cf27bf`(+`de99ec15` `f94d22af`) · `.b` `adc312f6` ·
  `.c` `50633f19` (§9 c3) · `.d` `2183b814` (§9 c4) · `.e` `e2f56558` (§9 c5) — all exist (CL.1 roster, 18 commits). ⟨cmd⟩ `git log --oneline --all
  --grep='X.W5.t\|W5.d2\|W5.c2'` → **empty**: none of the three §0aq units has landed.
- **Resume spec**: §0aq X-W5 block + W5.md `## ADDENDUM 2026-09-22` — dispatch **[`.t`] → [`.d2`] → [`.c2`]**, strictly serial (§4a: single worktree, one
  writer; `.d2` depends on `.t`'s committed plan and re-probe).

### R4.3 Baseline for the owed units — read-only, double-run at HEAD `c9e39745`

⟨cmd⟩ `sh scratchpad/w5base.sh > b1; … > b2; diff b1 b2` → **IDENTICAL**.

| gate (owner unit) | reading | state |
|---|---|---|
| D4-Mix `grep -c '<Transition ' MixSourceSelector.vue` | 1 | GREEN (landed `.d`) |
| D4-Admin `grep -c '<Transition ' AdminNamesPanel.vue` (`.c2`, §0aq grant) | **0** | RED |
| D4 census (`SegmentedTabs` consumers, non-`demo/ui`) | 2 files: MixSourceSelector · AdminNamesPanel | — |
| B4 arm 3 `grep -ro content-max-h demo/ \| wc -l` (`.d2`, rides the re-probe) | **3** (PaneSlot.vue comments) | RED |
| C7 viewport `@media` census (§0aq: target 3, DockStatusLamp:70 → X-W8 `.h`) | 4 = 3 + the routed survivor | RED-by-route (relieved) |
| C3 fork census (§0aq: capability rows out; 3 layout forks → X-W8 `.i`) | 23 occ / 9 files | classification owed (`.t` records it) |
| D3 physical pane names | 0 | GREEN (held) |
| PaneSlot.vue:12-23 (GATING LOCK bytes) | 12 lines, md5 `a7fe04be35764c9b6b293dfc5f08f523` | locked until `.t` commits the re-probe |
| ESC-W5c-3 sites: o12 `:68` · o16 `:158` `pane-wrapper--` hits | 1 · 1 | RED (`.c2`) |
| ESC-W5c-3 site: `census-parity.spec.ts:88-90` | reads `unionMembers("RightPane")` (0 `pane-wrapper--`) — the dead `RightPane` union | RED by construction (`.c2`) |
| N15 (`AdminPane.vue` source order) / N14 (declaration-site census) | not re-probed; RED of record (Check 3 K3.3) | RED (`.c2`) |
| D1 scene-swap budget (`.t` measures, `.d2` cures) | **not run here**: ⟨cmd⟩ `uptime` → load **30.10 / 30.54 / 34.13** — the §0aq ruled condition (load < 4, seat alone) is unmet at this clock, so a reading would be non-evidence. Banked: gradient .294/.371 · mix .333/.346 (CL.2) | RED |
| C1 (§0aq re-metric: `textContent` ≥ 0.9 + About-scroll rider) | banked 1.0 on 15/15 (§0aq's own reading); `innerText` 0.5557 on `#/` | see greenBeforeCure |
| A2 blob arm (ESC-W5-1) | unfalsifiable as authored; re-authoring owed (`.t`) | RED |
| §7 `vue-tsc -p tsconfig.demo.json` | banked EXIT=0 (Check 3 K3.1); not re-run under load 30 | GREEN (banked) |

**R.2 green-before-cure**: **C1** under the §0aq re-metric reads 1.0 (`textContent`) with no cure landed — the gate's movement to GREEN is a ruling's
re-metric, not a byte; `.t` records the re-metric and runs the scroll-reachability rider so the GREEN is measured, not inherited.

### R4.4 Resume unit plan — 5 landed, 3 owed, strictly serial `[.t] → [.d2] → [.c2]`

alreadyDone: `X.W5.a` · `X.W5.b` · `X.W5.c` · `X.W5.d` · `X.W5.e` (never re-dispatched). Concurrency 1 (§4a/§4b; the three share this record and
`.d2` consumes `.t`'s committed plan).

| unit | model | executes | writable | gates it turns | locks |
|---|---|---|---|---|---|
| **X.W5.t** | **fable** (§0aq: RESEARCH + PLAN AUGMENT) | W5.md §3a · §6 D1/A2/C1/C3 · ADDENDUM 2026-09-22 · §0aq `:2660-2689` · fold W5F-04 `:41` | `docs/tranches/V/megatranche/workflows/gates/out-in-reprobe.mjs` (create; §4 `gates/*.mjs`) · `docs/tranches/X/waves/W5/triumvirate/**` (create: re-probe RESULTS, D1 run log, research+plan, A2 dated addendum-beside, C1 re-metric record, C3 classification) · this record (receipt append) | out-in re-probe COMMITTED first; D1 reading ≥10 interleaved runs, medians, load<4 recorded; A2 re-authored falsifiably; C1 `textContent` ≥0.9 + About-scroll rider measured; C3 capability/layout partition printed | fold `:41` GATING (PaneSlot.vue:12-23 untouched until the re-probe is in git) + COUPLED (mode · rAF mirror · loading states move together); writes NO `demo/` byte |
| **X.W5.d2** | opus (REDRESS) | `.t`'s committed plan · W5.md §5 X.W5.d · §6 D1/D3/D5 · B4 arm 3 | `demo/shell/PaneSlot.vue` · `demo/shell/usePaneRouter.ts` · `demo/color-picker/App.vue` · `demo/styles/animations.css` · `demo/styles/shell.css` · `demo/workbenches/mix/MixSourceSelector.vue` · `docs/tranches/V/megatranche/workflows/gates/scene-swap-budget.mjs` (no budget weakening) · `e2e/smoke/perf/view-switch-frame-budget.spec.ts` · `docs/tranches/X/waves/W5/green/**` · this record | D1 (all 4 hops over32/frames ≤.15 AND median ≤20ms, under the ruled conditions) · D3 held 0 · D4-Mix held 1 · D5 forced-PRM · B4 arm 3 → 0 · §7 typecheck/lint/test | COUPLED lock (fold `:41`); W5F-07 CURE-LOCK (EB-4+EB-2 together; loading states before/with any mode change); preserve-animations edict; any cure path outside this set (e.g. Mix interior) = ESCALATION |
| **X.W5.c2** | opus (GRANTS) | §0aq grants D4 · N15 · N14 · ESC-W5c-3 · fold N14/N15 `:327-328` | `demo/palettes/browser/admin/AdminNamesPanel.vue` · `demo/palettes/admin/AdminPane.vue` · `demo/palettes/admin/**` + `demo/palettes/browser/admin/AdminTagsPanel.vue` (N14 family declaration sites; see note) · `e2e/visual/census-parity.spec.ts` · `e2e/smoke/oracles/o12-blob-seat.spec.ts` · `e2e/smoke/oracles/o16-computed-cascade.spec.ts` · `docs/tranches/X/waves/W5/green/**` · this record | D4 census 2/2 · N15 source order selector-before-query at ≤639 · N14 census PRINTED, every site `vue-tsc`-visible · ESC-W5c-3 one-token re-points to `--stage` · §7 typecheck/lint/test | BD-08 `router/index.ts` read-mostly; N15 no `order:`/`column-reverse`; D4 one named one-root `<Transition>` as Mix |

**Grant-path note (for `.c2`, recorded not ruled)**: §0aq names N14's sites as *"the `AdminTagsPanel` family's declaration sites
(`demo/palettes/admin/**`)"*; ⟨cmd⟩ `find demo -name 'AdminTagsPanel*'` → `demo/palettes/browser/admin/AdminTagsPanel.vue` (and `demo/palettes/admin/`
holds only `AdminPane.vue`). The plan reads the grant by its named family (AdminTagsPanel.vue included); `.c2` prints the census FIRST and returns
an ESCALATION for any declaration site outside the two listed dirs' named files.

Post-units: the verify-only close + L-20 checks; C7 and C3 read with their §0aq routes (X-W8 `.h` / `.i`); L-18 quartet passes precede ACCEPTED.

## Unit receipts — RESUME ROUND 4


### X.W5.t

SERVED MODEL: claude-fable-5-1 · seat: X.W5.t (§0aq: FABLE research + plan augment), RESUME ROUND 4 · 2026-09-22 · verdict **PARTIAL** (5 of 6 gates turned; D1's ruled reading not takeable on this host → ESC-W5t-1). HEAD at open `ad65d992`; commits `91d0e0c7` · `1a6432f9` · (this receipt).

**Crash-recovery** ⟨cmd⟩ `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` — neither in this seat's writable set; no inherited partial. `dev.sh` never touched.
**Inputs**: `W5.md` whole (394 L) · this record's header, R4.0–R4.4 and `## Check 3` · COHESION §0aq `:2660-2689` (⟨cmd⟩ `awk 'NR>2700' COHESION.md | grep -c 'W5'` → 0 later rulings) · fold W5F-04 `:41` · the spec's `§3a`, `§6` D1/A2/C1/C3, `ADDENDUM 2026-09-22`.
**Locks**: ⟨cmd⟩ `sed -n 12,23p demo/shell/PaneSlot.vue | md5` → `a7fe04be35764c9b6b293dfc5f08f523` at open AND at close (GATING LOCK held); ⟨cmd⟩ `git status --porcelain -- demo/ plugins/ vite.config.ts e2e/ src/ api/ test/ | wc -l` → **0** (no demo byte written; every variant was a Vite load-hook in a temp config).

#### Act 1 — the out-in co-mount re-probe, COMMITTED FIRST (`91d0e0c7`)
`docs/tranches/V/megatranche/workflows/gates/out-in-reprobe.mjs` (390 L): six arms of the REAL app at HEAD — built/default · built/out-in · each +1000 ms emulated RTT · dev/default · dev/out-in — `mode="out-in"` injected at build/serve time by a `load` hook (needle asserted ×1), real `--duration-fast` (`.2s`) and `--spring-snappy` (`calc(.44s*1)`) read from computed style, the real ten `defineAsyncComponent` panes, the rAF mirror as shipped; per hop a rAF geometry sampler + end-state read. ⟨cmd⟩ `node …/out-in-reprobe.mjs` ×2 (run 2 = fresh builds) → verdicts IDENTICAL: **built/out-in stranded 0/5, co-mount 0/5 (also at +1000 ms RTT) · built/default co-mount 5/5 (container 7974→960 on →/gradient) · dev/out-in stranded 5/5**. RESULTS ×3 JSON committed beside the script (`triumvirate/out-in-reprobe-RESULTS-{run1,run2,latency-arms}-2026-09-22.json`).

#### Act 2 — the dev strand ROOTED at file:line and cured falsifiably (`triumvirate/RESEARCH-AND-PLAN-2026-09-22.md` §1a, `variants/`)
Load-time bisection (no demo byte): C rAF mirror removed · D Picker async · E `:ref` channel removed · F inert hooks removed · G `<KeepAlive>` removed · I HeroBlob stubbed · J SpectrumCanvas stubbed — ALL still strand; H = the production bundle built with Vue's DEV runtime — strands (so: Vue dev-runtime path, not Vite's server); **K = the root-level comment at `demo/picker/ColorPicker.vue:2-4` stripped — CURED** (Gradient mounts on `/`→gradient and `/mix`→gradient). Mechanism: DEV keeps the comment → the Picker's subtree is a DEV_ROOT_FRAGMENT; `setTransitionHooks` (`runtime-core.cjs.js:1652-1662`) stamps the out-in `afterLeave` continuation (`:1416-1423`) on the fragment, the leaving `<div>` departs with stale hooks, `state.isLeaving` stays true for the slot's life. Pane-root census: 12 roots, exactly one dev fragment (the Picker). Upstream-repro config banked.

#### Act 3 — D1 under the ruled conditions: NOT MEASURABLE, recorded, escalated (§2)
⟨cmd⟩ `uptime` polled 13× across the sitting (1-min load): 21.54 · 34.47 · 13.84 · 44.23 · 53.79 · 32.50 · 25.29 · 16.29 · 21.48 · 13.15 · 44.09 · 30.93 · 12.13 · 11.84 · **7.07** (min; 5-min min 10.75) — never < 4; `pgrep -fl vitest-vscode` → 6 sibling workers. `scene-swap-budget.mjs` NOT run (a reading here is non-evidence by §0aq's own terms). **ESC-W5t-1**: options (a) quiescent window (b) dedicated runner for the ratios (c) real-GPU read.

#### Act 4 — the two roots named at file:line (§3; `triumvirate/swap-root-trace.mjs`, CDP `devtools.timeline` ×2 + built/out-in)
**→/gradient (and extract · generate) = LAYER AREA**: RasterTask **746 / 730 ms** of the 900 ms window with the travel on vs 327 / 339 suppressed; mid-swap wrappers 512×7974 (default, co-mounted) / 512×7459 (out-in). Sites: `shell.css:186-210` (`.pane-container` grid, default `align-items: stretch` → the Picker's wrapper stretched to About's 7459 px) · the pane roots' `h-full` (`GradientPane.vue` et al., `MixPane.vue:61`) · `animations.css:286-293` (`will-change: transform` promotes the 512×7459 element) · `animations.css:244-257, 269-279` (`rotate(∓2deg)` makes the layer non-axis-aligned → re-raster across the 440 ms spring). Measured after the plan: out-in alone leaves →/gradient raster at **887 ms** (single 7459 px layer) — the mode is NOT the raster lever; P-5a (area) / P-5b (rotation) are. **→/mix = the Picker's GPU engine re-arming, not Mix**: Commit+GPUTask 102+98 / 114+111 ms persists with the travel suppressed (127+120 / 159+164); 54 live animations vs 27–31; site `demo/picker/visual/HeroBlob.vue:246-250` (`onActivated → blobRef.value?.resume()` on software GL) + the WatercolorDot filter stagger `MixSourceSelector.vue:120,171-201,236-240`; the Mix convergence canvas is idle at the swap.
**Cure plan for `.d2` (§4)**: ONE coupled landing — P-1 `mode="out-in"` (`PaneSlot.vue:260`, header `:35-68` rewritten to the measured truth, B4 arm 3 → 0) + P-2 rAF-mirror decision by measurement (keep; variant C proves it is not the trigger) + P-3 loading/error states at `usePaneRouter.ts:187-204` (W5F-07) — preceded by **P-4** (`ColorPicker.vue:2-4` comment relocation, **GRANT**, HIGH: without it out-in ships dev-broken) — then P-5a/P-5b measured by the trace, winner landed; P-6 (`HeroBlob.vue` resume gate) routed after a real-GPU read. Sequencing, falsifiers and the `green/` banking list are in §4/§9.

#### Act 5 — A2's blob arm re-authored falsifiably (`triumvirate/A2-BLOB-ARM-ADDENDUM-2026-09-22.md` + `a2-blob-arm.mjs`)
Struck: the five-picker-less-routes sentence (ESC-W5-1's unfalsifiable form). Re-authored: (I) schema truth `blobPresent === pickerPanePresent` on 15/15 cold routes, anchor inside `.pane-wrapper--stage` · (II) deep link on each of the five → `/#/` mounts the anchor with a sized canvas within 8 s · (III) canvas non-zero. ⟨cmd⟩ `PROBE_BASE=… node a2-blob-arm.mjs` ×2 → `pass:true` ×2: I 15/15 · II 5/5 (0.3–1.3 s) · III 4/4 (180×180). Instrument lesson recorded (document-lifetime `performance.mark`s; cold context per route).

#### Act 6 — C1 re-metric + rider, C3 partition
**C1** (`triumvirate/C1-REMETRIC-2026-09-22.md`, `c1-remetric.mjs` ×2 IDENTICAL): `textContent` 390/1440 = **1.0 on 15/15** (`/` 4825/4825; `innerText` 0.5557 beside, 34 `content-visibility:auto` carriers both widths), no desktop shrink vs the banked 1440 figures; About-scroll rider **16/16** sections in-viewport with rendered text, document scroller. **GREEN, measured.** **C3** (`triumvirate/C3-PARTITION-2026-09-22.md`): 23/9 = 6 capability-only (PRM ×2 files, `hover` ×1 — OUT, dated) + 6 layout forks → X-W8 `.i` (`ExtractWorkbench.vue:226` · `ConsoleRail.vue:118` · `HeroBlob.vue:71` + imports) + 11 dock `isDesktop` → X-W8 `.h` (G-L back-gate); 0 unrouted in W5's surface. Honest-RED by route.

#### Gates (BEFORE → AFTER)
| gate | BEFORE (R4.3) | AFTER (this seat) |
|---|---|---|
| out-in re-probe committed first | absent | **`91d0e0c7`** (script + RESULTS ×3) — GREEN |
| D1 (≥10 interleaved runs, medians, load<4, seat alone) | not run, load 30 | **not takeable** (load min 7.07) — RED → ESC-W5t-1; categorical roots banked ×2 |
| A2 blob arm re-authored falsifiably | unfalsifiable (ESC-W5-1) | dated addendum + instrument, **GREEN ×2** |
| C1 `textContent` ≥ 0.9 + About rider at 390 | banked 1.0, rider unmeasured | **1.0 15/15 + rider 16/16, ×2** — GREEN |
| C3 partition printed | 23/9 unclassified | **6 / 6 / 11 printed, routed** — GREEN (gate itself honest-RED by route) |

**Commits**: `91d0e0c7` (re-probe + RESULTS) · `1a6432f9` (triumvirate corpus: research+plan, A2 addendum + arm, C1 record + probe, C3 partition, trace probe + 3 JSON, variants) · this receipt (`X-W5.md`). All by pathspec; `dev.sh` untouched.
**Escalations**: ESC-W5t-1 (D1 host) · ESC-W5t-2 (P-4 grant `ColorPicker.vue:2-4`, HIGH) · ESC-W5t-3 (P-3 component files under `demo/shell/`) · ESC-W5t-4 (P-6 `HeroBlob.vue` home) · upstream Vue note (not a producer). **Residuals**: none owned by this seat; `.d2` opens on `1a6432f9`'s plan.
**Scratch hygiene**: all diag dev servers (`:8097-8107`) and static servers (`:8093/8104/8108`) stopped; ⟨cmd⟩ `lsof … | grep -E ':(809[3-9]|810[0-8])' | wc -l` → 0.

### X.W5.d2

SERVED MODEL: claude-opus-5-5[1m] · seat: X.W5.d2 (§0aq: OPUS redress), RESUME ROUND 4 · 2026-09-22 · verdict **ESCALATED** (the plan's coupled cure and its swap-travel levers are not landable inside this seat's bounds at the measured bytes; what IS in bounds landed). HEAD at open `fbb6cea0`; commits `043a783c` · `3ec79fa6` · (this receipt).

**Crash-recovery** ⟨cmd⟩ `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`: neither is in this seat's writable set. **No inherited partial.** `dev.sh` never touched.
**Inputs**: `W5.md` whole (394 L, incl. ADDENDUM 2026-09-22) · this record's R4.0–R4.4 + the `.t` receipt · `triumvirate/RESEARCH-AND-PLAN-2026-09-22.md` §2–§4 · COHESION §0aq X-W5 block (`:2660-2689`; ⟨cmd⟩ `grep -n 'W5t\|W5.d2' COHESION.md` → only `:2667`, so **no ruling on ESC-W5t-1..4 exists**) · fold W5F-04/-05/-07/-53 (`X-W5-FOLD.md:41,42,44,125`). Both preconditions in git: `91d0e0c7` (re-probe) and `1a6432f9` (plan).

#### Act 1 — the coupled family (P-4 → P-1 + P-2 + P-3): NOT landed, ESCALATED (ESC-W5d2-1)
The plan's own sequencing makes P-4 (`demo/picker/ColorPicker.vue:2-4`, a GRANT) the prerequisite of P-1 (`mode="out-in"`): without it out-in strands the DEV shell 5/5 (`.t` §1a, variant K). P-3's loading/error states are CURE-LOCKed by fold W5F-07 to EB-2 (W5F-53: the per-slot boundary + shell containment in `demo/shell/ErrorBoundary.vue` + `demo/color-picker/main.ts`, both outside this set), and the D-1 lock forbids the mode or the rAF mirror moving without them. Every limb of the family therefore needs a path outside the set → nothing of it is written. The rAF mirror is kept unchanged (P-2's own recommendation). **ESC-W5d2-1**: grant `ColorPicker.vue:2-4` (P-4) and the EB-2 home (`ErrorBoundary.vue` + `main.ts`, plus any new loading/error component files under `demo/shell/`, ESC-W5t-3) to one unit, or route the family whole.

#### Act 2 — the swap-travel levers P-5a / P-5b, measured before any edit: neither landed, ESCALATED (ESC-W5d2-2)
Three built bundles into scratch (`vite build --mode gh-pages --outDir …`): **base** = HEAD · **A** = P-5a `.pane-container { align-items: start }` · **B** = P-5b the four pane-family `rotate(±2deg)` → `rotate(0deg)`; each edit made only for its build and reverted from a byte copy (⟨cmd⟩ `git status --porcelain demo/` → empty before the landing). ⟨cmd⟩ `PROBE_BASE=… node triumvirate/swap-root-trace.mjs` (unmodified), interleaved base→A→B, 3 rounds (load 9–15 throughout: the ORDER is read, the ratios are not D1 evidence). Median of 3, travel on (read ×2 from the committed JSON, `diff` IDENTICAL):

| hop | base ratio · raster ms | A (P-5a) | B (P-5b) |
|---|---|---|---|
| →/gradient | 0.255 · 629 | 0.164 · 608 | 0.200 · 512 |
| →/mix | 0.281 · 358 | 0.220 · 349 | 0.303 · 386 |
| →/extract | 0.109 · 262 | 0.141 · 253 | 0.129 · 115 |
| →/generate | 0.123 · 348 | 0.122 · 360 | 0.096 · 360 |

Findings: (1) the plan's P-5a premise is **falsified at the bytes**: on `/` the Picker's own card is **685** px (not 7459); what is 7459 px is the About pane's real content, which A does not shrink (mid-swap inspector stays `512×7974` under A). (2) A **breaks the equal-height card pairing** on 6 of 7 dual routes at 1440 (card heights base→A: `/gradient` 960/960 → 960/515 · `/extract` 578/578 → 578/515 · `/mix` 685/685 → 685/412 · `/generate` 515/515 → 457/515 · `/palettes` 685/685 → 685/515 · `/browse` 515/515 → 395/515): a visible design change the plan does not authorize. (3) B removes the rotation limb (a motion deletion under the preserve-animations edict) and still leaves →/gradient at 0.200 and →/mix at 0.303. **Neither lever reaches the budget, so the plan's "winner lands" condition is not met; no substitute cure was improvised.** **ESC-W5d2-2**: the →/gradient root is the leaving About layer's real content height (7459 px) under travel, not the stretch; its cure (a content-bounded travel surface, or a ruling on the equal-height pairing / the rotation) needs a design ruling. The →/mix root stays `HeroBlob.vue:246-250` (ESC-W5t-4, out of set).
Evidence: `green/P5-lever-trace-d2-2026-09-22.json` (3 rounds × 3 variants + the 1440 card-height table).

#### Act 3 — PaneSlot's header rewritten to the truth (W5F-05; B4 arm 3) — LANDED `043a783c`
The R.W3 "dev-only" TRANSITION MODE paragraph and its four corrections (`PaneSlot.vue:35-68` at open) are replaced by the re-probe's measured truth: the default mode co-mounts two in-flow panes (7974 = 7459 + 515) and the slot's block axis is uncapped; out-in cures the co-mount on the built bundle but strands in DEV (root `ColorPicker.vue:2-4`, ESC-W5t-2) and stays CURE-LOCKed with the rAF mirror and loading/error states (D-1; W5F-07 ≡ EB-4 with EB-2); appear hooks cannot fire for a late chunk. The `appear` prop doc's residual limb-(4) claim ("and a late async chunk's arrival") is corrected in the same edit. `:12-23` (the activation contract) untouched. The edit is comments only: ⟨cmd⟩ `diff -rq <HEAD build> <landed build>` → **no output** (byte-identical bundle).

#### Gates (BEFORE → AFTER, this seat's clock)
| gate | BEFORE | AFTER |
|---|---|---|
| B4 arm 3 ⟨cmd⟩ `grep -ro content-max-h demo/ \| wc -l` | 3 | **0** — GREEN (arms 1/2: `100dvh` 0 · `svh` files 3) |
| D3 ⟨cmd⟩ physical `pane-wrapper--left\|--right` in `demo/` | 0 | **0**; every `RegionRole` (`stage`·`inspector`·`action`) has 2 enter/leave selectors in `animations.css` — GREEN (held) |
| D4-Mix ⟨cmd⟩ `grep -c '<Transition ' MixSourceSelector.vue` | 1 | **1** — GREEN (held) |
| D5 ⟨cmd⟩ `PROBE_PRM=1 PROBE_BASE=… node scene-swap-budget.mjs` ×2 (landed bundle) | — | `pass:true` ×2; every observed region transition `transformMs 0`, all 4 hops `animated:true` — GREEN |
| D1 ⟨cmd⟩ `node scene-swap-budget.mjs` ×2 | RED (banked gradient .294/.371 · mix .333/.346) | **NOT TAKEABLE**: 1-min load 12.69 / 14.87 at run start (ruled: < 4). Recorded as non-evidence (gradient .25/.289 · mix .462/.417 · extract .159/.146 · generate .129/.161; motion 200/440 ms present on every hop). RED → ESC-W5t-1 stands |
| §7 typecheck | lib · demo GREEN (banked) | lib EXIT 0 · **demo EXIT 0 (0 errors)** · test EXIT 2 (11 × `space-catalog.ts` `*.md`) · e2e EXIT 2 (5 × `o23`) — both foreign, CL.7 row 11 |
| §7 lint | — | `eslint demo/shell/PaneSlot.vue` EXIT 0; repo-wide 23 errors, all under `docs/tranches/V|X/**` (pre-existing, record `:545`) |
| §7 test | — | 639 / 641; the 2 fails = C-5 `spectrum-luma` + NG-6 `reka-binding-idiom` (foreign, routed to X-W8 `.i` by §0aq) |

**Commits** (pathspec, `dev.sh` untouched): `043a783c` (PaneSlot header) · `3ec79fa6` (`green/` D5 ×2, D1 non-evidence ×2, P-5 lever traces) · this receipt.
**Escalations**: **ESC-W5d2-1** (the coupled family needs P-4 `ColorPicker.vue:2-4` + the EB-2 home `ErrorBoundary.vue`/`main.ts` + loading/error component files) · **ESC-W5d2-2** (P-5a/P-5b measured insufficient; P-5a breaks equal-height pairing, P-5b deletes motion; needs a design ruling) · ESC-W5t-1 (D1 host, re-confirmed: load 12.7–15.6 across this sitting) · ESC-W5t-4 (→/mix `HeroBlob.vue:246-250`).
**Residuals**: D1 RED (ruled instrument unavailable, and no in-set cure measured sufficient) · W5F-04 co-mount open (documented truthfully in the header). **Scratch hygiene**: static servers `:8121-8124` stopped (⟨cmd⟩ `lsof … | grep -cE ':812[1-4]'` → 0).

## Close — RESUME ROUND 4, 2026-09-22 (VERIFY-ONLY close seat)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 CLOSE (RESUME 4) · HEAD at open `51de649a` · wall 20:1x EDT · date of record 2026-09-17 (COHESION §0j).
This seat cured nothing. It wrote this section, one INBOX sweep line and the LEDGER row cells. Inputs: `W5.md` whole (394 L, incl. ADDENDUM 2026-09-22), this
record's header, `## RESUME OPEN 4` (R4.0–R4.4), the `.t` and `.d2` receipts, and `## Check 3` (the last check section).

**Verdict: PARTIAL.** `.t` is PARTIAL, `.d2` is ESCALATED, and `.c2` **never sat**: ⟨cmd⟩ `git log --oneline --all --grep='W5.c2'` → **empty**. The hard gate
is unmet: D1 is RED/untakeable, D4-Admin is RED, and N14/N15 are RED. **IMPLEMENTED is NOT stamped.**

### CL4.0 Crash-recovery

⟨cmd⟩ `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`. Neither path is in this seat's writable set, so
there is **no inherited partial**. `dev.sh` was never touched.

### CL4.1 Commit roster and bounds (⟨cmd⟩ `git show --stat` / `--name-only` per sha)

| unit | sha | paths | in writable set? |
|---|---|---|---|
| `.t` | `91d0e0c7` | `gates/out-in-reprobe.mjs` + 3 RESULTS JSON under `waves/W5/triumvirate/` | YES (R4.4 `.t` row) |
| `.t` | `1a6432f9` | 18 files: 14 under `waves/W5/triumvirate/` + 4 under `triumvirate/variants/` | YES |
| `.t` | `fbb6cea0` | `execution/A/X-W5.md` +40 | YES |
| `.d2` | `043a783c` | `demo/shell/PaneSlot.vue` +39/−37, **comment-only** (⟨cmd⟩ non-comment `^[-+]` lines of the diff → 0 · hunks `:35` `:48` `:109`, all inside `//`/`/** */`) | YES |
| `.d2` | `3ec79fa6` | 3 JSON under `waves/W5/green/` | YES |
| `.d2` | `51de649a` | `execution/A/X-W5.md` +42 | YES |
| `.c2` | — | not dispatched | — |

**Landed-wrong: none.** The GATING LOCK is honoured: ⟨cmd⟩ `sed -n 12,23p demo/shell/PaneSlot.vue | md5` → `a7fe04be35764c9b6b293dfc5f08f523`, the same
value as at R4.3. §9 c1–c5 were landed earlier and stay unsplit. §9 c6 (this close + the IMPLEMENTED flip) is **not** landed, because the gate is unmet.

### CL4.2 Gates, re-run at this seat's clock (`scratchpad/w5close.sh` run ×2; ⟨cmd⟩ `diff r1 r2` → IDENTICAL)

| gate | BEFORE (R4.3 / Check 3) | AFTER (this seat) | state |
|---|---|---|---|
| A1 main.ts exit · App grep | 0 · 0 | **0 · 0** | GREEN |
| A4 `bindPane` hits (bite banked, Check 1) | 10 | **10** | GREEN |
| A5 `<h1` in `.vue` | 4 | **4** | GREEN (the OUTLINE arm is routed to X-W10) |
| A7 `role="status"` | 3 | **3** | GREEN |
| A2 blob arm | unfalsifiable (ESC-W5-1) | re-authored by `.t`; `pass:true` ×2 (`triumvirate/A2-blob-arm-run{1,2}`) | GREEN (banked; not re-probed, §5.2) |
| A3 | RED, relieved | — | relieved: §0k.3 S-1 → X-W8 |
| B4 `100dvh` · `svh` files · `content-max-h` | 0 · 3 · **3** | **0 · 3 · 0** | **GREEN** (arm 3 turned by `043a783c`) |
| B3 | relieved | — | → X-W6 (CC-056) |
| C1 (§0aq re-metric `textContent` ≥ 0.9 + rider) | banked 1.0 | `.t`: 1.0 on 15/15, rider 16/16, ×2 | GREEN (banked) |
| C3 fork census | 23 / 9 | **23 / 9** | partition by `.t`: 6 capability OUT · 6 layout → X-W8 `.i` · 11 dock → X-W8 `.h` → relieved by route (§0aq) |
| C4 exit | 0 | **0** | GREEN |
| C7 viewport `@media` | 4 | **4** (= 3 + `DockStatusLamp.vue:70`) | RED-by-route → X-W8 `.h` (§0aq) |
| C8 exit | 0 | **0** | GREEN |
| D1 scene-swap budget | RED (gradient .294/.371 · mix .333/.346) | **NOT TAKEABLE**: ⟨cmd⟩ `uptime` → load **12.54** / 13.32 / 17.01; `pgrep -fl vitest-vscode \| wc -l` → **27**. The ruled condition (load < 4, seat alone) is unmet, so the budget was not run | **RED** (ESC-W5t-1; `.d2`'s loaded runs are non-evidence) |
| D2 exit | 0 | **0** | GREEN |
| D3 physical names | 0 | **0** | GREEN |
| D4 Mix · Admin `<Transition ` | 1 · 0 | **1 · 0** | **RED** (AdminNamesPanel: `.c2` owed) |
| D5 forced PRM | GREEN (`.d2` ×2) | banked `green/D5-prm-scene-swap-d2-2026-09-22.json` | GREEN (banked; the landed PaneSlot delta is comment-only, so no D5 surface moved) |
| E1 per file | 0 0 0 0 | **0 0 0 0** | GREEN |
| E2 `P122` per file | 9 · 3 · 18 · 10 | **9 · 3 · 18 · 10** | GREEN |
| N14 / N15 | RED | not re-probed (no byte moved; `.c2` never sat) | **RED** |
| ESC-W5c-3 (o12 `:68` · o16 `:158` · census-parity `:88-90`) | RED | — | **RED** (`.c2`) |
| §7 `npx vue-tsc -p tsconfig.demo.json --noEmit` | EXIT 0 | **EXIT=0** (run in the background at this seat) | GREEN |
| §7 `npx eslint demo/shell/PaneSlot.vue` | EXIT 0 | **EXIT=0** | GREEN |
| §7 `git diff --check` over the W5 docs + PaneSlot | — | **0** | GREEN |

### CL4.3 §8 Verification Artefacts

- `waves/W5/born-red/` holds **9** files (A2/A3/A6/B3/C1/C2/C5 + statics, banked at the open).
- `waves/W5/green/` holds 14 files, including `D1-scene-swap-budget-AFTER` and `D5-prm-scene-swap-d2`.
- `waves/W5/triumvirate/` holds the re-probe, the research and plan, and the A2/C1/C3 records.
- The `scene-swap-budget.mjs` **after** reading for D1 is still owed. The `.d2` loaded runs are kept as non-evidence (`green/D1-…-LOADED-NONEVIDENCE`).
- The B5/B6 readings and the portal delta are as quoted in the prior closes.
- Nothing was re-captured here: the surface is unchanged since those captures (only the comment-only PaneSlot delta landed), so §5.2 parsimony applies.

### CL4.4 E13 — the four-path sweep (this seat's clock)

⟨cmd⟩ `ls -t ../glass-ui/docs/tranches/ | head -1` → **BK**.

⟨cmd⟩ `find <p> -maxdepth 1 -type f -newer execution/A/X-W5.md` came back **empty on all five dirs**: value.js `V/` · `V/coordination` · BK
`coordination` · keyframes `V/coordination` · atlas `P/coordination`.

INBOX status column: the one `UNREAD` row is **I-40** (owner *Track C (X·F)*), which is outside X-W5 scope. **0 UNREAD in scope.** Tail stays **I-40 / O-52**.
One sweep line was appended to the INBOX.

### CL4.5 Residuals (named owners) and escalations

**Residuals:**

| gate | state | owner |
|---|---|---|
| **D1** | RED | **COHESION / owner**. ESC-W5t-1 asks for a ruling: (a) a quiescent host window, (b) a dedicated runner, or (c) a real-GPU read. ESC-W5d2-2 asks for a design ruling on the swap-travel lever (P-5a breaks the card pairing; P-5b deletes motion). After both rulings, a `.d2` re-measure. |
| **W5F-04 out-in co-mount + P-1..P-3** | open | ESC-W5t-2 / ESC-W5d2-1 ask COHESION for grants: `demo/picker/ColorPicker.vue:2-4` (P-4, **HIGH**), the EB-2 home `ErrorBoundary.vue`/`main.ts`, and the P-3 loading/error files (ESC-W5t-3). |
| **→/mix cost** | open | ESC-W5t-4: `HeroBlob.vue:246-250` needs a home (X-W2 blob seat or X-W8 `.i`). |
| **D4-Admin · N14 · N15 · ESC-W5c-3 oracles** | RED | **`X.W5.c2`** (grants already issued by §0aq). The next orchestrator dispatch runs it. `.c2` does **not** depend on D1's escalations. |
| **C7** | routed | X-W8 `.h` (§0aq) |
| **C3** | routed | 6 layout rows → X-W8 `.i`; 11 dock rows → X-W8 `.h` (§0aq) |
| A3 / B3 / A5-OUTLINE / N5 | relieved, unchanged | X-W8 / X-W6 / X-W10 / X-W7 |
| Upstream Vue note | — | A letter (dev-root fragment × `Transition mode=out-in`), not a producer byte |
| L-18 | — | The quartet passes follow a GREEN hard gate, so they do not open here |

**Four-verb:** AUDITED YES · SPECIFIED YES · **IMPLEMENTED NO** (the hard gate is unmet: D1, D4-Admin and N14/N15 are RED) · VERIFIED NO (stamped only at the
X-W11 release close, §9 c6). The line does not move.

**Successors:** X-W6, X-W7, X-W8 and X-W10 stay lawfully BLOCKED-ON the X-W5 close.

## Check 1 — RESUME ROUND 4, L-20 fresh adversarial pass 1, 2026-09-22 (VERIFY-ONLY)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 CHECK 1 (over the RESUME 4 close) · HEAD at open `06295e5a` · wall 20:2x EDT · date of record 2026-09-17.
Cured nothing. Wrote this section, one LEDGER event line. Inputs: `W5.md` whole (incl. ADDENDUM 2026-09-22), `## RESUME OPEN 4`, `## Close — RESUME ROUND 4`, the 7 commits it names.

**Verdict: NOT-CONFORMANT.** The close's own reading (PARTIAL) is correct and reproduces; the row is NOT promoted.

### K4.0 Crash-recovery
⟨cmd⟩ `git status --porcelain` → ` M …/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` — neither in this seat's set; no inherited partial.

### K4.1 Gates reproduced at this seat's clock (static arms, spec §6 commands)
⟨cmd⟩ one shell batch → A1 `0`·`0` · A4 bindPane 10 · A5 `<h1` 4 · A7 status 3 · B4 `0 · 3 · 0` · C3 23 · C4 0 · C8 0 · D2 0 · D3 0 · D4 Mix 1 · **Admin 0** ·
E1 `0 0 0 0` · E2 P122 `9 3 18 10` · `uptime` → load **14.68** / 14.83 / 17.16. **Every GREEN the close claims at a static command reproduces (15 gates);**
the banked Playwright GREENs (A2, C1, D5) were not re-probed (§5.2; no surface byte moved — `043a783c` is comment-only, confirmed by the close's diff read).

### K4.2 Axes
- (2) bounds: `git show --stat` of `91d0e0c7 1a6432f9 fbb6cea0 043a783c 3ec79fa6 51de649a 06295e5a` — every path inside R4.4's writable sets; `dev.sh` last touched `85cfea2c` (pre-X). CLEAN.
- (3) masking: none (the only product delta is comment-only).
- (4) families: §9 c1–c5 unsplit; c6 correctly not landed.
- (5) E-3: ⟨cmd⟩ `git log c9e39745..HEAD -- W5.md registry/adjudicated/` → empty. CLEAN.
- (6) mail: the only UNREAD-status row is I-40 (Track C) — 0 in scope.
- (7) four-verb: unmoved (IMPLEMENTED NO) — lawful.

### K4.3 Register

| severity | claim | receipt | cure |
|---|---|---|---|
| HIGH | D4 (sub-pane swaps animate) is RED: `AdminNamesPanel.vue` — one of the 2 `SegmentedTabs` consumer files — has 0 `<Transition `. No later-wave relief; §0aq grants it to `X.W5.c2`, which never sat. | ⟨cmd⟩ `grep -c '<Transition ' demo/palettes/browser/admin/AdminNamesPanel.vue` → 0; `git log --all --grep=W5.c2` → empty | dispatch `X.W5.c2` |
| HIGH | D1 (scene-swap frame budget) is RED/untakeable. It is this wave's own §6 gate; the spec routes it to no later wave and names it as no honest-RED. An owner-ruling escalation (ESC-W5t-1 / ESC-W5d2-2) is a request, not a relief. | load 14.68 at this clock; banked gradient .294/.371 · mix .333/.346 | owner ruling on ESC-W5t-1 + ESC-W5d2-2, then a `.d2` re-measure |
| HIGH | N14 / N15 and the ESC-W5c-3 oracle re-points are RED; §0aq grants them to `.c2` inside this wave. | close CL4.2; `.c2` never sat | dispatch `X.W5.c2` |
| MEDIUM | W5F-04 out-in co-mount (ESC-W5t-2 `ColorPicker.vue:2-4`) is open and needs out-of-set grants. | close CL4.5 | COHESION grant |
| INFO | C7 (→ X-W8 `.h`) and C3 (→ X-W8 `.i`/`.h`) are RED-by-route under §0aq; A3/B3/A5-OUTLINE are relieved (→ X-W8/X-W6/X-W10). These are lawful. | close CL4.2/CL4.5 | none |

**Honest-RED set (relieved, owner-named):** C7 · C3 · A3 · B3. **Unrelieved:** D1 · D4-Admin · N14 · N15 · ESC-W5c-3.

**Successors:** W6/W8/W10 `Opens after` carry X-W5 → **not GREEN**; X-W6, X-W7, X-W8 and X-W10 stay lawfully BLOCKED-ON X-W5. LEDGER row unchanged (PARTIAL).

## Repair 1 — RESUME ROUND 4, L-20 repair round 1 over Check 1, 2026-09-22

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 REPAIR 1 · HEAD at open `4252e6c9` · date of record 2026-09-17. Inputs: `W5.md` whole (incl. ADDENDUM
2026-09-22), `## RESUME OPEN 4` through R4.4, `## Close — RESUME ROUND 4` CL4.5, `## Check 1` (K4.3 register), COHESION §0aq X-W5 block, fold N14/N15
(`X-W5-FOLD.md:327-328`). Cure idiom: Check 1's own cure for three of the five rows is "dispatch `X.W5.c2`", so this seat executes the `.c2` grants
exactly as R4.4 plans them (writable set and gates of the `.c2` row), and nothing beyond them.

### RP1.0 Crash-recovery
⟨cmd⟩ `git status --porcelain` → ` M …/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`; neither is in this seat's set. **No inherited partial.**

### RP1.1 Defect → cure → commit

| # | Check 1 defect | cure | commit |
|---|---|---|---|
| 1 | HIGH D4-Admin: 0 `<Transition ` in `AdminNamesPanel.vue` | The Pending/Approved swap is wrapped in one named `vj-morph` `mode="out-in"` `<Transition>`. Each branch has a single root keyed `pending` / `approved`. A `data-names-direction` token is read from the strip's own option order, and a scoped `--vj-morph-x` offset applies to the branch root only. This is the `MixSourceSelector` idiom verbatim. | `fc9c2be4` |
| 2a | HIGH N15: query before selector | `AdminPane.vue` renders the top `SearchBar` for `admin-users` only. The names query moved into a new `#query` slot, which `AdminNamesPanel.vue` places **after** `SegmentedTabs`. The cure is source order, not `order:` or `column-reverse`. | `fc9c2be4` |
| 2b | HIGH N14: census not printed; `AdminPane` `subView` a re-spelt literal union | The literal union is deleted and replaced by `type AdminSubView = Extract<PaneId, \`admin-${string}\`>`. The chain `PaneId` → `AdminPane` props → `AdminSlotProps` (`usePaneRouter.ts:101`) is now type-visible end to end. The census is printed at RP1.2. | `fc9c2be4` |
| 2c | HIGH ESC-W5c-3 oracle re-points | `o12-blob-seat.spec.ts:68` and `o16-computed-cascade.spec.ts:158`: the token `.pane-wrapper--left` becomes `.pane-wrapper--stage`. `census-parity.spec.ts:88-90`: `rightPanes()` stops reading the dead `RightPane` union and reads the `role: "inspector"` panes of `VIEW_MAP` as bytes, which gives the same four surfaces (about, palettes, mix, blob). | `2eeb59ee` |
| — | evidence | `docs/tranches/X/waves/W5/green/c2-D4-N15-N14-ESCW5c3-repair1-2026-09-22.json` (`git add -f`) | `dcba5535` |
| 3 | HIGH D1 untakeable | **ESCALATED, not cured.** The ruled condition is load < 4 with the seat running alone. ⟨cmd⟩ `uptime` → **10.45** at open and **13.05** at 20:29. The lever-design ruling (ESC-W5d2-2) is still unissued. No byte in this seat's set moves the budget. | — |
| 4 | MEDIUM W5F-04 out-in co-mount (`ColorPicker.vue:2-4`) | **ESCALATED.** The cure needs `demo/picker/ColorPicker.vue` and the EB-2 home, which are outside W5 §4 and outside every §0aq grant (ESC-W5t-2 / ESC-W5d2-1 still pending). | — |
| 5 | INFO C7 / C3 routed | none (lawful) | — |

### RP1.2 N14: the declaration-site census, printed (this seat's clock)
⟨cmd⟩ `grep -rnE 'admin-audit' demo --include='*.ts' --include='*.vue' | grep -v '^demo/ui/'`, and each hit classified by reading its source:
1. `viewSchema.ts` `ViewId` / `PaneId` unions: the declarations.
2. `VIEW_MAP: Record<ViewId, …>`: exhaustive.
3. `isViewId`: derived.
4. `usePaneRouter.ts` `PANE_COMPONENTS` / `VIEW_SCENES` / `propsFor` switch: exhaustive.
5. `useDockAdminMode.ts:27` `adminViews: ViewId[]`: checked.
6. `AdminPane.vue` `subView`: **now derived** from `PaneId`. It was the partial site.
7. `demo/color-picker/router/index.ts` route `name:` strings: **INVISIBLE**.
8. `e2e/visual/census.ts` `ROUTE_CENSUS`: **INVISIBLE**.

`demo/palettes/api/index.ts` hits the pattern only because of the `admin-audit.ts` module path, so it is not a site. `AdminTagsPanel.vue`: 0 hits.

**Partition: 6 visible · 0 partial · 2 invisible (was 5 · 1 · 2).** The two invisible sites lie outside `.c2`'s grant: the router is under BD-08 (read-mostly), and `census.ts` belongs to X-W1. ATP-33 routes the identity-unification remainder **NO-WAVE-OWNER**. N14 therefore reads **census PRINTED; the in-grant site is cured; the arm "every surviving site visible" is RED on 2 out-of-grant sites → escalated.**

### RP1.3 Gate re-reading (WRITE-THEN-MEASURE, ×2)
⟨cmd⟩ `sh scratchpad/r1.sh > a; sh scratchpad/r1.sh > b; diff a b` → **IDENTICAL**:

| gate | before (Check 1) | after | state |
|---|---|---|---|
| D4 census (2 `SegmentedTabs` consumer files) | Mix 1 · Admin **0** | Mix 1 · Admin **1** | **GREEN** |
| N15 source order at 390 on `#/admin/names` | query before selector | ⟨cmd⟩ `node scratchpad/c2probe.mjs` ×2 (no-preference, reduce) → `selector-before-query` both runs. `order`/`column-reverse` declarations: 0 (the grep's 2 hits are comments at `AdminPane.vue:59` and `AdminNamesPanel.vue:170`) | **GREEN** |
| D4 swap animates (same probe) | — | classes `vj-morph-leave-active … enter-to` observed; direction `forward`; durations `0.2s, 0.44s, 0.3s` | GREEN |
| D5 non-regression (same probe, reduce) | — | `0.1s` opacity cross-fade. `MixSourceSelector` reads the identical `0.1s \| opacity…` under reduce (⟨cmd⟩ `node scratchpad/mixprm.mjs`). This repair adds custom-property values only, with no transition declaration. | held |
| N14 | census unprinted; 5·1·2 | printed; 6·0·2 | in-grant arm GREEN; 2 out-of-grant sites escalated |
| ESC-W5c-3 greps | `pane-wrapper--left` o12 1 · o16 1; `unionMembers("RightPane")` 1 | 0 · 0 · 0 | re-points landed |
| census-parity (visual project, node-only) | reachability test RED by construction | ⟨cmd⟩ `npx playwright test e2e/visual/census-parity.spec.ts --project=visual` → reachability **PASS**. The 2 id-parity tests FAIL: `census.ts` lacks `not-found` | escalated (ESC-R1-2) |
| o12 / o16 (smoke) | — | 6/6 FAIL at `getByRole("main",{name:"Color tool panes"})` (o12 `:63`, o16 `:46`/`:117`). The re-pointed selector itself was probed separately: 1 `.pane-wrapper--stage` on `/` at 1440, width 512, has a child; 0 `.pane-wrapper--left`. | escalated (ESC-R1-1) |
| D3 / B4 held | 0 · `0 3 0` | 0 · `0 3 0` | held (B4 arm 2 = 3 files carrying `svh`, which is GREEN at ≥ 1) |
| §7 `vue-tsc -p tsconfig.demo.json` | banked 0 | EXIT **0** ×2 | GREEN |
| §7 eslint (changed files, `--max-warnings=0`) | — | EXIT 0 | GREEN |
| §7 `tsc -p tsconfig.e2e.json` | — | 5 errors, all in `o23-specimen-gamut-honesty.spec.ts` (last touched `7733e557`, X-W6); 0 in this seat's files | not W5's |
| §7 vitest | — | 639/641. The 2 FAILs are `test/spectrum-luma.test.ts` (C-5 BORN-RED) and `demo/test/shell/reka-binding-idiom.test.ts` (NG-6). Both are other tracks' born-RED tests, and neither imports a file this seat touched. | not W5's |
| D1 | RED, untakeable | untakeable (load 10.45–13.05) | RED, escalated |

### RP1.4 Escalations (each with its measured reason)
- **ESC-R1-1 (o12/o16 landmark name).** Both oracles open with `getByRole("main", { name: "Color tool panes" })` (o12 `:63`; o16 `:46`, `:117`). The name no longer exists: `App.vue:59` `<main :aria-labelledby="ROUTE_TITLE_ID">`, which reads **"Home"** on `/`. This is landed-by-consequence of X.W5.a. §0aq grants only the one-token `:68` / `:158` re-points, so the rest needs a grant (or an X-W2 oracle-holder row) for the landmark query.
- **ESC-R1-2 (census.ts `not-found`).** `census-parity` "exactly the router's table" and "exactly `ViewId`" fail on `- "not-found"`: X.W5.a added the route and the `ViewId` member, and `e2e/visual/census.ts` (X-W1's) has no row for them. This is outside every grant.
- **ESC-R1-3 (N14 remainder).** The router `name:` strings and `census.ts` `ROUTE_CENSUS` remain invisible to `vue-tsc`. BD-08 and X-W1 own them, and ATP-33 routes the remainder NO-WAVE-OWNER.
- **D1 (carried: ESC-W5t-1 + ESC-W5d2-2)** and **W5F-04 (carried: ESC-W5t-2 / ESC-W5d2-1)** are unchanged; see RP1.1 rows 3–4.

### RP1.5 Verdict
**Cured 4 of the 5 register rows' in-bounds content:** D4-Admin, N15, the N14 in-grant site plus the printed census, and the ESC-W5c-3 re-points. The MEDIUM row and D1 are escalated. **The row stays PARTIAL; IMPLEMENTED is NOT stamped.** D1 is RED and unrelieved, and N14 carries 2 out-of-grant invisible sites. Successors X-W6/7/8/10 stay BLOCKED-ON X-W5. `dev.sh` untouched. Commits: `fc9c2be4` `2eeb59ee` `dcba5535` + this section.

## Check 2 — RESUME ROUND 4, L-20 fresh adversarial pass 2, 2026-09-22 (VERIFY-ONLY)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 CHECK 2 (over the RESUME 4 close as Repair 1 left it) · HEAD at open `40201ac8` · date of record 2026-09-17.
Cured nothing. Wrote this section and one LEDGER event line. Inputs: `W5.md` whole (incl. ADDENDUM 2026-09-22), `## RESUME OPEN 4`, `## Close — RESUME ROUND 4`,
`## Check 1` and `## Repair 1` (round 4), and the 5 commits Repair 1 names (`fc9c2be4` `2eeb59ee` `dcba5535` `e639ec38` `40201ac8`).

**Verdict: NOT-CONFORMANT.** Repair 1's in-grant cures reproduce. D1 is still RED, and no spec byte or COHESION ruling relieves it. The row is NOT promoted.

### K2.0 Crash-recovery
⟨cmd⟩ `git status --porcelain` → ` M …/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`. Neither is in this seat's set, so there is no inherited partial.

### K2.1 Gates reproduced (spec §6 commands; ⟨cmd⟩ `sh scratchpad/k2.sh` ×2 → `diff` IDENTICAL)
A1 `0`·`0` · A4 bindPane 10 · A5 `<h1` 4 · A7 status 3 · B4 `0 · 3 · 0` · C3 23 · C4 0 · C8 0 · D2 0 · D3 0 · **D4 Mix 1 · Admin 1** · E1 `0 0 0 0` ·
E2 P122 `9 3 18 10` · ESC-W5c-3 greps `0 0 0` · PaneSlot `:12-23` md5 `a7fe04be…` (GATING LOCK held) · §7 ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT=0**.
**16 gates reproduce GREEN.** Not re-probed (§5.2; no surface byte moved except the admin names panel, which Repair 1 probed ×2): A2, C1, D5, N15.
⟨cmd⟩ `uptime` → load **11.29** / 13.03 / 14.86. §0aq's ruled D1 condition (load < 4, seat alone) is unmet, so **D1 is not takeable at this clock**.

### K2.2 Axes
- (2) Bounds: ⟨cmd⟩ `git show --stat` on the 5 commits. `fc9c2be4` touches `AdminPane.vue` and `AdminNamesPanel.vue`, and `2eeb59ee` touches o12, o16 and census-parity. All of these are named §0aq/R4.4 `.c2` grant paths. `dcba5535` is under `waves/W5/green/`, and the other two are the record and the ledger. ⟨cmd⟩ `git log c9e39745..HEAD -- scripts/dev/dev.sh` → empty. **CLEAN.**
- (3) Masking: ⟨cmd⟩ `git show fc9c2be4 | grep -E '^\+.*(try|catch|skip|allow|as any|ts-ignore|eslint-disable)'` → only the two `Retry` button lines, which are UI rather than masking. The `2eeb59ee` diff is 2 one-token re-points plus `rightPanes()` reading `role: "inspector"` from `viewSchema.ts` bytes. No assertion was narrowed. **CLEAN.**
- (4) Families: one commit per meaning (product / e2e / evidence / record / ledger). §9 c1–c5 are unsplit, and c6 is correctly not landed.
- (5) E-3: ⟨cmd⟩ `git log c9e39745..HEAD -- W5.md registry/adjudicated/` → empty. **CLEAN.**
- (6) Mail: the INBOX status column's one UNREAD row is I-40 (Track C), so **0 are in scope**.
- (7) Four-verb: unmoved (IMPLEMENTED NO). That is lawful, because the hard gate is unmet.
- (8) Goal criterion: "a measured frame budget" (§1 hard gate / §2) is **NOT MET at the bytes**, because D1 has no GREEN reading.
- (9) Figures: Repair 1's RP1.3 static figures reproduce exactly (D4 1·1, ESC `0·0·0`, B4 `0 3 0`, D3 0).

### K2.3 Register

| severity | claim | receipt | cure |
|---|---|---|---|
| HIGH | D1 (scene-swap frame budget) is RED and untakeable. It is W5's own §6 gate and the §1 hard gate's "measured frame budget" clause. W5.md routes it to no later wave and names no honest-RED for it, and §0aq only rules the *instrument conditions*. ⟨cmd⟩ `grep -n 'ESC-W5t-1\|ESC-W5d2-2' COHESION.md` → no ruling after §0aq (§0ar..§0aw are Tracks B/C). An escalation is a request, not a relief. | load 11.29 at this clock; banked gradient .294/.371 · mix .333/.346 (not GREEN) | owner/COHESION ruling on ESC-W5t-1 (quiescent window / dedicated runner / real GPU) + ESC-W5d2-2 (swap-travel lever), then a `.d2` re-measure under the ruled conditions |
| MEDIUM | N14's arm "every surviving site `vue-tsc`-visible" is RED on 2 out-of-grant sites: `router/index.ts` names (BD-08) and `e2e/visual/census.ts` (X-W1). ATP-33 marks it NO-WAVE-OWNER, so no owner is named yet. | RP1.2 census 6·0·2 | COHESION grant or an owner route (ESC-R1-3) |
| MEDIUM | X.W5.a's landmark rename (`de99ec15`: `<main :aria-labelledby>`) leaves `getByRole("main",{name:"Color tool panes"})` stale in 61 `e2e/**` files, including o12/o16, which fail 6/6 per RP1.3. It is owner-routed to X-W1 (LEDGER `:34` ESC-b3; record `:2357` row 10) and ESC-R1-1, and census-parity `not-found` → ESC-R1-2. | ⟨cmd⟩ `grep -rln 'Color tool panes' e2e \| wc -l` → 61; `grep -rn 'Color tool panes' demo` → comment only | the X-W1 / COHESION grant as escalated |
| MEDIUM | W5F-04 out-in co-mount (`ColorPicker.vue:2-4`, P-4) needs out-of-set grants. | ESC-W5t-2 / ESC-W5d2-1 | COHESION grant |
| INFO | C7 → X-W8 `.h` and C3 → X-W8 `.i`/`.h` (§0aq routes). A3 → X-W8 (§0k.3 S-1) · B3 → X-W6 (CC-056) · A5-OUTLINE → X-W10. All are relieved and owner-named. | close CL4.2/CL4.5 | none |

**Honest-RED set (relieved, owner-named):** C7 · C3 · A3 · B3. **Unrelieved:** D1 (HIGH).

**Successors:** the `Opens after` lines of X-W6/X-W7/X-W8/X-W10 carry the X-W5 close conjunct, which is **not GREEN**, so all four stay lawfully BLOCKED-ON X-W5. The X-W5 opens-after conjuncts themselves (X-W4 · X-W2 · X-W0 CLOSED) remain GREEN. The LEDGER row status is unchanged (PARTIAL), and one event line is appended.

## Repair 2 — RESUME ROUND 4, L-20 repair round 2 over Check 2, 2026-09-22

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 REPAIR 2 · HEAD at open `7b287079` · date of record 2026-09-17.
Inputs: `W5.md` whole (394 L, incl. ADDENDUM 2026-09-22) · COHESION §0aq X-W5 block (`:2660-2689`) · this record's `## Check 2` (round 4) · the ESC rows at `:2863`, `:2885`, `:2927`, `:3014-3015`, `:3085-3086`.

### RP2.0 Crash-recovery
⟨cmd⟩ `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`. Neither path is in W5 §4 or a §0aq grant, so there is **no inherited partial**. Both paths were left untouched.

### RP2.1 Rulings sought (double-run, IDENTICAL)
- ⟨cmd⟩ `grep -c 'ESC-W5t-1\|ESC-W5d2-2\|ESC-W5t-2\|ESC-W5d2-1\|ESC-R1-[123]' docs/tranches/X/COHESION.md` → **0** ×2. The last addendum is still §0aw (`:2811`, Track C). **No ruling or grant has been issued on any open X-W5 escalation.**
- ⟨cmd⟩ `uptime` → load **8.56** / 12.36 / 14.44 ×2 · ⟨cmd⟩ `pgrep -fl vitest | wc -l` → **32**. §0aq's ruled D1 condition (load < 4, seat alone) is **unmet**.
- ⟨cmd⟩ `grep -rln 'Color tool panes' e2e | wc -l` → **61** ×2 · ⟨cmd⟩ `grep -rn 'Color tool panes' demo | wc -l` → **1** (a comment) ×2.

### RP2.2 Register → disposition

| # | sev | defect | disposition | commit |
|---|---|---|---|---|
| 1 | HIGH | D1 untakeable and RED | **ESCALATED, not cured.** The ruled instrument condition is unmet (load 8.56, 32 vitest processes). No lever-design ruling exists on ESC-W5d2-2: P-5a breaks the equal-height pairing, and P-5b deletes motion, which the preserve-animations edict forbids. Running the gate on a loaded host would be non-evidence under §0aq's own terms. Carried: ESC-W5t-1 + ESC-W5d2-2. | — |
| 2 | MEDIUM | N14 is invisible on 2 sites (`router/index.ts` BD-08 · `e2e/visual/census.ts`) | **ESCALATED.** Both paths are outside W5 §4. §0aq keeps BD-08 "read-mostly", and `census.ts` belongs to X-W1. Carried: ESC-R1-3. | — |
| 3 | MEDIUM | 61 e2e files still query the stale `'Color tool panes'` landmark; o12/o16 and census-parity `not-found` fail | **ESCALATED.** §0aq granted only the one-token re-points (landed in `2eeb59ee`). The other 59 files, and a re-query of the landmark in o12/o16/census-parity, are outside §4 and outside every grant. Owner route X-W1 (LEDGER ESC-b3). Carried: ESC-R1-1 / ESC-R1-2. | — |
| 4 | MEDIUM | W5F-04 out-in co-mount (`ColorPicker.vue:2-4`, P-4) | **ESCALATED.** The cure needs `demo/picker/ColorPicker.vue` plus the EB-2 home (`demo/shell/ErrorBoundary.vue`), and neither is in §4 or granted. Carried: ESC-W5t-2 / ESC-W5d2-1. | — |
| 5 | INFO | C7 · C3 · A3 · B3 RED by route | relieved and owner-named; no act | — |

**Cured: 0.** No byte in this seat's writable set moves any open defect, so no gate was re-run beyond the RP2.1 readings. Check 2's K2.1 gate readings stand at `7b287079`.

**Row status:** PARTIAL (unchanged). X-W5 cannot close until COHESION rules ESC-W5t-1, ESC-W5d2-2, ESC-W5t-2 / ESC-W5d2-1 and ESC-R1-1..3.

## Check 3 — RESUME ROUND 4, L-20 fresh adversarial pass 3, 2026-09-22 (VERIFY-ONLY)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 CHECK 3 (over the RESUME 4 close as Repair 1 + Repair 2 left it) · HEAD at open `4e061043` · date of record 2026-09-17.
This seat cured nothing. It wrote this section and one LEDGER event line. Inputs: `W5.md` whole (394 L, incl. ADDENDUM 2026-09-22), `## RESUME OPEN 4`,
`## Close — RESUME ROUND 4`, `## Check 2` + `## Repair 2` (round 4), COHESION §0aq X-W5 block (`:2660-2689`) and §0av/§0aw (checked for X-W5 relief).

**Verdict: NOT-CONFORMANT.** Every static GREEN reproduces. D1 is still RED and untakeable, and no spec byte or COHESION ruling relieves it. The row is NOT promoted.

### K3.0 Crash-recovery
⟨cmd⟩ `git status --porcelain` → ` M …/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`. Neither is in this seat's set, so there is no inherited partial. ⟨cmd⟩ `git log --oneline 4e061043..HEAD` → empty: no byte has moved since Repair 2.

### K3.1 Gates reproduced (spec §6 commands; ⟨cmd⟩ `sh scratchpad/k3.sh` ×2 → `diff` IDENTICAL)
A1 `0`·`0` · A4 bindPane 10 · A5 `<h1` 4 · A7 status 3 · B4 `0 · 3 · 0` · C4 0 · C8 0 · D2 0 · D3 0 · D4 Mix 1 · Admin 1 · E1 `0 0 0 0` · E2 P122 `9 3 18 10` ·
ESC-W5c-3 re-points (⟨cmd⟩ `grep -n 'pane-wrapper--' o12 o16` → only `.pane-wrapper--stage` at o12 `:68` / o16 `:158`; census-parity 0) · §7 ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT=0**.
**14 gates reproduce GREEN.** PaneSlot `:12-23` md5 `a7fe04be…` (lock held). C3 23 (routed) · C7 routed. Banked, not re-probed (§5.2, no surface byte moved): A2, C1, D5, N15.
⟨cmd⟩ `uptime` → load **7.01** / 11.39 / 13.97, then **8.79** · ⟨cmd⟩ `pgrep -fl vitest | wc -l` → **32**. §0aq's ruled D1 condition (load < 4, seat alone) is unmet, so **D1 is not takeable**.

### K3.2 Axes
- (2) Bounds: no commit since Repair 2; ⟨cmd⟩ `git log c9e39745..HEAD -- scripts/dev/dev.sh` → empty. **CLEAN.**
- (3) Masking: no new diff; Check 2's K2.2(3) reading stands. **CLEAN.**
- (4) Families: §9 c1–c5 unsplit; c6 correctly not landed.
- (5) E-3: ⟨cmd⟩ `git diff --stat c9e39745..HEAD -- docs/tranches/X/waves/W5.md docs/tranches/V/megatranche/registry/adjudicated/` → empty. **CLEAN.**
- (6) Mail: the one UNREAD INBOX row is I-40 (`INBOX.md:135`, owner Track C). **0 in scope.**
- (7) Four-verb: unmoved (IMPLEMENTED NO), which is lawful because the hard gate is unmet.
- (8) Goal criterion: the "measured frame budget" clause (§1 / §2) is **NOT MET** because D1 has no GREEN reading.
- (9) Figures: Check 2 K2.1 / Repair 2 RP2.1 figures reproduce, apart from load and time.
- (10) Honest-RED: ⟨cmd⟩ `grep -c 'ESC-W5t-1\|ESC-W5d2-2\|ESC-W5t-2\|ESC-W5d2-1\|ESC-R1-[123]' COHESION.md` → **0**. §0av's "measured on a QUIESCED host, like X-W5's D1" and §0aw's honest-RED-by-instrument (`G-F12-3-LOAD`) rule **F.W12 only**; neither names X-W5 D1. Nothing in W5.md routes D1 to a later wave or names an honest-RED for it.

### K3.3 Register

| severity | claim | receipt | cure |
|---|---|---|---|
| HIGH | D1 (the scene-swap frame budget) is RED and untakeable. It is W5's own §6 gate and the §1 "measured frame budget" clause. It has no spec route and no named honest-RED, and §0aq rules only the instrument conditions. Escalations ESC-W5t-1 and ESC-W5d2-2 are still unruled. | load 7.01–8.79, 32 vitest procs; banked gradient .294/.371 · mix .333/.346 (not GREEN) | a COHESION/owner ruling on ESC-W5t-1 (a quiescent window, a dedicated runner, or an instrument relief like `G-F12-3-LOAD`) and ESC-W5d2-2 (the swap-travel lever); then a `.d2` re-measure |
| MEDIUM | N14 is invisible on 2 out-of-grant sites (`router/index.ts` BD-08 · `e2e/visual/census.ts`). | RP1.2 census 6·0·2 | ESC-R1-3 grant or route |
| MEDIUM | The stale `'Color tool panes'` landmark is still queried in 61 e2e files, and o12/o16 and census-parity `not-found` fail. | Check 2 K2.3; Repair 2 RP2.1 61/1 | ESC-R1-1/2 → X-W1 grant |
| MEDIUM | W5F-04 out-in co-mount (`ColorPicker.vue:2-4`, P-4) needs grants outside §4. | ESC-W5t-2 / ESC-W5d2-1 | COHESION grant |
| INFO | C7 → X-W8 `.h` · C3 → X-W8 `.i`/`.h` (§0aq) · A3 → X-W8 (§0k.3 S-1) · B3 → X-W6 (CC-056) · A5-OUTLINE → X-W10: all relieved and owner-named. | CL4.2/CL4.5 | none |

**Honest-RED set (relieved, owner-named):** C7 · C3 · A3 · B3. **Unrelieved:** D1 (HIGH).

**Successors:** the Opens-after lines of X-W6 (`W6.md:4`), X-W8 (`W8.md:6`) and X-W10 (`W10.md:6`) name X-W5. X-W7 names it through X-W6 and the W5 §10 Blocks line. That conjunct is **not GREEN**, so all four stay lawfully BLOCKED-ON X-W5. X-W5's own opens-after conjuncts (X-W4 · X-W2 · X-W0 CLOSED) stay GREEN. The row stays PARTIAL.

## RESUME OPEN 5 — 2026-09-22, seat 0 (RESUME MODE, fifth sitting, on COHESION §0aq + §0ax and W5.md's two ADDENDA of 2026-09-22)

SERVED MODEL: claude-opus-5-5[1m] · seat: X-W5 SEAT 0 (OPEN, RESUME 5) · HEAD at open `df34be29` · date of record 2026-09-17 (the begin-word, COHESION §0j).
Inputs read: `W5.md` whole (396 L, incl. both ADDENDA 2026-09-22), this record's `## RESUME OPEN 4` (`:2771-2843`) and `## Check 3` round 4 (`:3201-3241`),
COHESION §0aq X-W5 block (`:2660-2689`) and §0ax (`:2825-2880`, the file end). Ruling ids consumed: **§0ax** (dispatch rule: only DEAD halts; order
[`.c2`] → [`.d2`]; ESC-W5t-1 RULED like G-F12-3-LOAD with the headed real-GPU reading of record; ESC-W5d2-2 DESIGN RULED — containment, P-5a/P-5b REFUSED;
ESC-W5t-2/ESC-W5d2-1/ESC-W5t-3 GRANTED to `.d2`; ESC-R1-1/2/3 GRANTED to `.c2` widened; ESC-W5t-4 decided by the real-GPU read → X-W8 `.i` if a byte is owed),
**§0aq** (D4/N15/N14/ESC-W5c-3 grants; C1 re-metric; C7/C3 relief by route), standing §0i, §0j, §0k.1, §0k.3.

### R5.0 Crash-recovery (STANDING LAW)
⟨cmd⟩ `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`. Neither is in this seat's writable set
(`X-W5.md`, `LEDGER.md`, `INBOX.md`); `dev.sh` untouched. **No inherited partial.**

### R5.1 E13 Step-0 — the four-path mail sweep
⟨cmd⟩ `ls -t ../glass-ui/docs/tranches/ | head -1` → **BK** (still newest). Newest files per path, each grepped in `INBOX.md`: glass BK
`glass-outbound-2026-09-22-fourier-o23-o32-reply.md` (3 hits, **I-40**, UNREAD, owner Track C — outside X-W5 scope) · `glass-outbound-2026-09-22-consumers-10.0.0.md` (14) ·
`value-to-glassui-2026-09-DD-fw4-relay.md` (12) · keyframes `INBOUND-LEDGER.md` (22) · `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` (38) · atlas
`valuejs-inbound-2026-07-27-library-band-export-delta.md` (29) · value.js `V/` + `V/coordination/`: only already-rowed files. **0 unrowed · 0 new I-n · 0 UNREAD in X-W5 scope.**
Tail stays **I-40**. One dated sweep line appended at the INBOX end.

### R5.2 Preconditions (RESUME MODE)
- **Opens-after** (W5.md §1): LEDGER cells → **X-W4 CLOSED 2026-09-17** · **X-W2 CLOSED 2026-09-17 (honest-RED G3·G5)** · **X-W0 CLOSED 2026-09-17**; D2 ⟨cmd⟩
  `git ls-files --error-unmatch …/u-gestalt/probe2-log.txt; echo $?` → **0**. **MET.**
- **alreadyDone** (commits exist, never re-dispatched): `.a` `c0cf27bf`(+`de99ec15` `f94d22af`) · `.b` `adc312f6` · `.c` `50633f19` · `.d` `2183b814` · `.e` `e2f56558` ·
  `.t` `91d0e0c7` `1a6432f9` (receipt `fbb6cea0`).
- **Owed** (§0ax): `.c2` — its §0aq subset landed in Repair 1 (`fc9c2be4` D4/N15/N14-AdminPane · `2eeb59ee` ESC-W5c-3 · `dcba5535` evidence), but the §0ax WIDENED
  grant (landmark migration, `census.ts` not-found, the router route-name declaration) never sat; `.d2` — only its in-bounds part landed (`043a783c` PaneSlot header, B4 arm 3),
  the coupled family P-1..P-4 + the containment cure + D1 in both instruments are owed on §0ax's grants. Order **[`.c2`] → [`.d2`]**, strictly serial (§4a/§4b).
- **Grant-path note (recorded, not ruled)**: §0ax names `demo/shell/router/index.ts` and `demo/shell/ErrorBoundary.vue`; ⟨cmd⟩ `find demo -path '*router*' -name index.ts; find demo -name 'ErrorBoundary*'`
  → **`demo/color-picker/router/index.ts`** and **`demo/color-picker/ErrorBoundary.vue`** (the only files of those names; the router file is Repair 1's N14 site 7, `:3097`).
  The plan reads each grant by its unique referent; the seats write no other file of those names. The loading/error plates stay under `demo/shell/` as ruled.

### R5.3 Baseline for the owed units — read-only, double-run at HEAD `df34be29`
⟨cmd⟩ `sh scratchpad/w5r5.sh > r5a; sh scratchpad/w5r5.sh > r5b; diff r5a r5b` → **IDENTICAL**.

| gate (owner unit) | reading | state |
|---|---|---|
| landmark `grep -rl "Color tool panes" e2e \| wc -l` (`.c2`, §0ax) | **61** files · 102 occurrences | RED (target 0) |
| fixture `e2e/smoke/fixtures/dock.ts` exports a main-pane locator | 0 (exports `expandDock`/`openView`/`paneSettled` only) | RED |
| `e2e/visual/census.ts` `not-found` row | **0** | RED |
| N14 site 7 `demo/color-picker/router/index.ts` route `name:` declaration | 15 `name:` lines, INVISIBLE to vue-tsc (Repair 1 `:3097`) | RED |
| D4 Mix · Admin `<Transition ` | 1 · 1 | GREEN (held; landed `.d` / `fc9c2be4`) |
| o12 `:68` · o16 `:158` `.pane-wrapper--stage` | 1 · 1 (re-pointed `2eeb59ee`) — the specs still RED on the stale landmark (Check 3 K3.3) | RED of record |
| census-parity `not-found` | RED of record (Check 2 K2.3 / Repair 2 RP2.1) | RED |
| `ColorPicker.vue:2-4` root-level comment (`.d2`, ESC-W5t-2) | present at `:2-4`, outside the root `<div>` | RED |
| containment `grep -rn 'contain: layout paint' demo/styles demo/shell \| wc -l` (`.d2`) | **0** | RED |
| loading/error plates under `demo/shell/` (ESC-W5t-3) | 0 files | RED |
| PaneSlot `:12-23` md5 | `a7fe04be35764c9b6b293dfc5f08f523` (unchanged) | — |
| D1 scene-swap budget (`.d2`) | not run here: ⟨cmd⟩ `uptime` → load **6.03 / 8.44 / 11.87**; banked headless gradient .294/.371 · mix .333/.346 (CL.2); §0ax: `.d2` takes both instruments at the lowest attainable load, headed real-GPU = reading of record | RED |
| §7 `vue-tsc -p tsconfig.demo.json` | banked EXIT=0 (Check 3 K3.1); no byte moved since | GREEN (banked) |

**R.2 green-before-cure**: none new. D4-Admin, N15 and the ESC-W5c-3 re-points read GREEN because Repair 1 landed them (`fc9c2be4`, `2eeb59ee`) — landed cures, not unexplained greens.
C1 stays as recorded at RESUME OPEN 4 (the §0aq re-metric, measured GREEN by `.t`).

### R5.4 Resume unit plan — 7 landed, 2 owed, strictly serial `[.c2] → [.d2]`

| unit | model | executes | writable | gates it turns | locks |
|---|---|---|---|---|---|
| **X.W5.c2** | opus | W5.md ADDENDUM 2 (`:396`) · §0ax ESC-R1-1/2/3 · §0aq grants (`:2676-2686`) | every `e2e/**` file carrying `getByRole('main',{name:'Color tool panes'})` (61) · `e2e/smoke/fixtures/dock.ts` · `e2e/visual/census.ts` · `demo/color-picker/router/index.ts` (route-name declaration only) · `demo/palettes/browser/admin/AdminNamesPanel.vue` · `demo/palettes/admin/AdminPane.vue` · `demo/palettes/browser/admin/AdminTagsPanel.vue` · `e2e/visual/census-parity.spec.ts` · `e2e/smoke/oracles/o12-blob-seat.spec.ts` · `e2e/smoke/oracles/o16-computed-cascade.spec.ts` · `docs/tranches/X/waves/W5/green/**` · this record | landmark 61→0 · D4 2/2 held · N14 census all sites vue-tsc-visible · N15 held · o12/o16/census-parity GREEN ×2 · §7 | one fixture locator, never per-file copies; BD-08 widened for the declaration only; no assertion loosened |
| **X.W5.d2** | opus | W5.md ADDENDUM 2 · §0ax ESC-W5t-1 / ESC-W5d2-2 / grants · `.t`'s plan (`triumvirate/RESEARCH-AND-PLAN-2026-09-22.md`) | `demo/picker/ColorPicker.vue` (`:2-4` only) · `demo/color-picker/ErrorBoundary.vue` · `demo/color-picker/main.ts` · new plate files under `demo/shell/` · the swap layers' containment site (`demo/styles/animations.css` · `demo/styles/shell.css` · `demo/shell/PaneSlot.vue` · `demo/color-picker/App.vue`) · `demo/shell/usePaneRouter.ts` · `scene-swap-budget.mjs` (no weakening) · `e2e/smoke/perf/view-switch-frame-budget.spec.ts` · `docs/tranches/X/waves/W5/green/**` · this record | P-1..P-4 landed together · containment · D1 both instruments (real-GPU of record) · D3 0 · D4 held · D5 · §7 | COUPLED (fold `:41`), W5F-07 CURE-LOCK, preserve-animations; P-5a/P-5b REFUSED; ESC-W5t-4 byte → X-W8 `.i` |

Post-units: the verify-only close + L-20 checks; L-18 quartet passes precede ACCEPTED.

## Unit receipts — RESUME 5

### X.W5.c2

SERVED MODEL: claude-opus-5-5[1m] · seat: X.W5.c2 (RESUME 5, Opus) · HEAD at open `5ad17633` · date of record 2026-09-17.
Inputs: `W5.md` whole (396 L, both ADDENDA), this record's `## RESUME OPEN 5` (R5.0-R5.4) and `## Repair 1` (RP1.1-RP1.5, the §0aq subset's landing), COHESION §0aq (`:2676-2686`) and §0ax (`:2825-2880`, the file end).

**Acts, in order**
1. **Crash-recovery.** ⟨cmd⟩ `git status --porcelain` → ` M …/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh`. Neither path is in this seat's set, so there is **no inherited partial**. `dev.sh` was not touched.
2. **§0aq subset held, not redone.** ⟨cmd⟩ `git log --oneline fc9c2be4..HEAD -- AdminPane.vue AdminNamesPanel.vue AdminTagsPanel.vue MixSourceSelector.vue` → *(empty)*.
   - D4: ⟨cmd⟩ `grep -c '<Transition '` on Mix and on Admin → **1 · 1**.
   - N15: `AdminNamesPanel.vue` has `<SegmentedTabs` at `:14` before `<slot name="query" />` at `:25`.
   - ESC-W5c-3 re-points: `2eeb59ee` is unchanged.
3. **Fixture export (ESC-R1-1).** `e2e/smoke/fixtures/dock.ts` now exports `ROUTE_TITLE_ID`, `MAIN_PANE`, and `mainPane(page)`.
   - The selector is `main[aria-labelledby="route-title"]:has(> h1#route-title)`. It encodes the live landmark's relation: a `<main>` labelled by the route H1, which it contains (`App.vue:59,66`).
   - `MAIN_PANE` is exported for in-page readers (`page.evaluate`), which cannot hold a Locator.
4. **Migration: 61 files, one idiom.** A scripted rewrite covered every shape found: `page.getByRole(main,{name})` (inline and chained across lines), `waitForSelector('main[aria-label=…]')` → `mainPane(page).waitFor({…})`, and `capture.ts`'s `document.querySelector` → `(selector)=>…, MAIN_PANE`.
   - Two local aliases were deleted rather than copied: `crash-battery`'s `main()` and o9's `MAIN` const.
   - Formatting: prettier `--write` on the 34 files that were prettier-clean at HEAD. On the 28 files that were already dirty at HEAD, only this seat's `expect(\n mainPane(page),\n)` hunks were collapsed. After that, ⟨cmd⟩ `prettier <f> | diff <f> -` shows no diff hunk at any `mainPane`/`MAIN_PANE` site.
   - No assertion changed.
5. **census.ts (ESC-R1-2).** Added the `not-found` row: `path "/#/does-not-exist"` (the address A7 announces), `left "not-found"`, `right null`, non-admin. The header counts go 14 → 15.
6. **Router (ESC-R1-3 / N14).** `demo/color-picker/router/index.ts` gets `import type { ViewId }`, `type ViewRoute = RouteRecordRaw & { readonly name: ViewId }`, and `const routes: ViewRoute[]`. This is a declaration-only change; the `name: "…"` spellings stay, so census-parity's byte reader is unchanged.
   - Bite test: renaming `admin-tags` → `admin-tag` makes ⟨cmd⟩ `vue-tsc -p tsconfig.demo.json` fail with **1 error, TS2820 at `:47`**. The file was restored and `grep -c 'name: "admin-tags"'` → 1.

**Commits:** `ab5270b6` (fixture + 61 files, one family, 62 files) · `ad93c771` (census `not-found`) · `fdf3e9e0` (router route-name typing) · `1b737078` (evidence `waves/W5/green/c2-landmark-census-N14-2026-09-22.json`, `git add -f`) · this receipt.

**N14 census, printed at this seat's clock.** ⟨cmd⟩ `grep -rnE 'admin-audit' demo --include='*.ts' --include='*.vue' | grep -v '^demo/ui/'`, with each hit classified:

| # | site | state |
|---|---|---|
| 1 | `viewSchema.ts:58,73` `ViewId` / `PaneId` | declared |
| 2 | `viewSchema.ts:244` `VIEW_MAP` | exhaustive `Record<ViewId,…>` |
| 3 | `usePaneRouter.ts:242,285,538` | exhaustive |
| 4 | `useDockAdminMode.ts:27` `adminViews: ViewId[]` | checked |
| 5 | `AdminPane.vue:70,116,126` (`subView: Extract<PaneId,…>`) | checked |
| 6 | **`router/index.ts:45`** `name:` | **now checked** (bite-tested) |
| 7 | `e2e/visual/census.ts` `ROUTE_CENSUS` | test mirror, **parity-guarded**, not vue-tsc-visible |

`demo/palettes/api/index.ts` matches only through a module path, so it is not a site.

Partition: **6 vue-tsc-visible · 0 invisible product sites · 1 parity-guarded test mirror**. Before this seat it was 6 · 0 · 2 invisible.

Site 7 cannot be vue-tsc-visible. By its own charter, `tsconfig.e2e.json` forbids e2e importing `demo/`, so its identity parity is held by `census-parity.spec.ts`, which is GREEN ×4.

**Gates BEFORE → AFTER (WRITE-THEN-MEASURE; each reading double-run):**

| gate | before | after | state |
|---|---|---|---|
| `grep -rl 'Color tool panes' e2e \| wc -l` | 61 (102 occ) | **0** (0 occ) | GREEN |
| `dock.ts` exports main-pane locator; migrated files import it | 0 | `MAIN_PANE` + `mainPane`; 61/61 import from `fixtures/dock` | GREEN |
| `census.ts` `not-found` row | 0 | 1 | GREEN |
| N14 router declaration vue-tsc-visible | INVISIBLE | visible, bite TS2820 | GREEN (census above) |
| D4 Mix · Admin | 1 · 1 | 1 · 1 | held |
| N15 | selector-before-query | unchanged | held |
| census-parity (`--project=visual`) | 2 FAIL (id parity) | **5/5 PASS ×4** (2 pre-commit, 2 on settled bytes) | GREEN |
| o12 + o16 (`--project=smoke`) | 6/6 FAIL at the landmark | **4 PASS / 2 FAIL ×2**: 0 landmark failures; o12·1+2, ·4, ·5 and o16 clobber leg PASS | RED (2 non-landmark legs, below) |
| §7 `vue-tsc -p tsconfig.demo.json` | 0 (banked) | EXIT 0 ×2 | GREEN |
| §7 eslint | — | changed files (64) EXIT 0; full `eslint .` 0 errors / 32 warnings, none in this seat's files (docs probes) | GREEN for this seat |
| §7 `tsc -p tsconfig.e2e.json` | 5 errors (o23) | same 5, all `o23-specimen-gamut-honesty.spec.ts` | not W5's |
| §7 vitest | 639/641 | 639/641 (C-5 `spectrum-luma` BORN-RED + NG-6 `reka-binding-idiom`, other tracks) | unchanged |

**Residual REDs, escalated. Both are uncovered now that the landmark no longer fails first, and neither is the landmark's consequence.**

- **ESC-W5c2-1 (o16 W5 census R2, `o16-computed-cascade.spec.ts:218`).** The spec asserts `enter.transform.duration === "0.4s"`, a literal; the live value is **`0.44s`** ×2.
  - Root: the demo rule is correct. `animations.css` `.pane-wrapper--stage > .vj-enter-enter-active` carries `transform var(--spring-snappy-duration) var(--spring-snappy)`, R2's own "spring @ its OWN clock" law.
  - The producer changed the value. glass-ui 7.0.0 `dist/styles/tokens/scheme-spring.css` sets `--spring-snappy-settle: 0.44s` (× `--motion-tempo: 1`).
  - ⟨cmd⟩ `git log -S'toBe("0.4s")' -- o16…` → `27f54cc3 2026-07-11`, which predates the glass 7 adoption (W44, 2026-07-17). So this leg has been RED since glass 7, masked by the landmark failure.
  - Why it is not cured here: the cure is an assertion edit. It would either re-derive R2 from the producer token (`getComputedStyle(root).getPropertyValue('--spring-snappy-duration')`) or re-state the literal. The §0aq/§0ax grant on o16 is the `:158` one-token re-point plus the landmark, so this seat did not substitute.
  - Needs a ruling on which form R2 takes. The token-derived equality is recommended: it is the oracle's stated intent, and it is not a loosening.
- **ESC-W5c2-2 (o12 O-12·3 hover-mood frame-diff, `o12-blob-seat.spec.ts:134`).** Hover response **0.06/255** and **0.14/255** against the 6/255 floor, headless software GL, load ⟨cmd⟩ `uptime` → ~12.
  - This is X-W2's cl-F4 (`X-W2.md:1165`: 0.05 and 0.01/255, cause UNDETERMINED, owner X-W5, re-trigger at a quiescent bench or on the ubuntu job).
  - The cure, if one is owed, lies in the blob mood/renderer, outside `.c2`'s set. Route: `.d2`'s headed real-GPU instrument (§0ax ESC-W5t-1 / ESC-W5t-4) should read O-12·3 beside D1.
- **Visual matrix consequence (named, not a defect of this seat).** `routes.visual.spec.ts` / `modality.visual.spec.ts` iterate `ROUTE_CENSUS`, so the new row mints `not-found` cells that have no golden yet. The goldens are minted by the visual-baseline owner (X-W1 / CI-capable seat).

**Verdict: PARTIAL.**
- Landed: all 4 of §0ax's widened-grant acts (fixture export, 61-file migration → 0, census `not-found`, router route names type-visible, with the N14 census printed).
- Held: the §0aq subset. census-parity is GREEN ×4, and §7 is clean for this seat.
- RED ×2 and escalated: the o12/o16 "GREEN ×2" gate, on the two non-landmark legs above. Both legs were masked by the landmark before this seat and are outside its grant.
