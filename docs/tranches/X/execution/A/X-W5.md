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
