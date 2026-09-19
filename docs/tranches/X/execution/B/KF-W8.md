SERVED MODEL: claude-opus-5[1m]

# X.KF.W8 — Structure & Colocation Settle — EXECUTION RECORD

Track B (X·KF, keyframes.js). Spec of record: `docs/tranches/X/keyframes/waves/KF-W8.md` (476 L,
read whole by this seat). Runbook: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.2 (Track B order), §3.4
(locks), §5 (seat law). Owner rulings consumed: `COHESION.md` §0i, §0j (§0j.C · X·KF: KF-OP1/§B-12,
KF-WRITE, KF-OGKF1, KF-SS3, KF-W5R4, KF-ODV3/ODV5/AT), §0k, §0l, §0m, §0n, §0o, §0p, §0q — read to
the file end. The one §0k+ ruling that lands **inside this wave's own units** is **§0o ESC-KFW2-1**
(quoted at §Open item 4).

---

## Open

**Date**: 2026-09-17 (the sitting's date; wall clock at this seat 2026-09-18 ~20:0x EDT).
**Seat**: SEAT 0 (OPEN), Track B. **Substrate**: `/Users/mkbabb/Programming/keyframes.js`, branch
`master`, HEAD `1fa98a5d8fa53cd6b408b3094195b9f8c12ab32f` == `origin/master` (⟨cmd⟩ `git rev-parse
HEAD` / `git rev-parse origin/master` → identical). Worktree: **2 untracked** files only
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md` ·
`…-2026-07-27-library-band-r1-widened-k1-k4.md` — our own delivered letters, not this wave's).

**Ref discipline (E-3 / the spec's own §Provenance).** The spec measures everything at
`origin/master 81a56990`. **That ref is five waves stale**: KF.W0 · W1 · W2 · W4 · W5 · W6 · W7 have
all landed since. Per the spec's own G9 sentence — *"the gate binds to the command and its ref, and
re-measures at open"* — and per the WRITE-THEN-MEASURE law, **every baseline below is re-measured at
`HEAD 1fa98a5d`, double-run**, and each divergence from the spec's `81a56990` reading is printed
beside it rather than smoothed. The spec's figures are recorded as its dated readings, never struck.

### Crash-recovery sweep (STANDING LAW)

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/keyframes.js` → **2 rows, both `??`**,
neither inside any unit's writable set. ⟨cmd⟩ same in `/Users/mkbabb/Programming/value.js` → 15
rows; **none** is a KF.W8 path (they are X·V demo rows, `CARRY-LEDGER.md`, the unowned
`scripts/dev/dev.sh`, `docs/tranches/X/waves/evidence/` and two e2e specs — all sibling-seat or
standing-arrangement rows). **No killed predecessor seat's partial work exists on this wave**:
`docs/tranches/X/execution/B/KF-W8.md` did not exist before this write and the ledger row read
`planned`. **Nothing inherited; nothing stashed; nothing outside the writable sets touched.**

### Preconditions — verified at the bytes AND in the ledger

Spec §State `Opens after`: **KF.W0** · **KF.W4** · **KF.W5** · **KF.W6 — SCOPED, *for G7's
measurement only*** (RULINGS-5 R5-6; runbook §1.2's `KF.W6 → KF.W8, SCOPED` edge).

| predecessor | ledger status | named artefact | measured at HEAD |
|---|---|---|---|
| KF.W0 | **CLOSED 2026-09-17** (20 commits + close `3a7efda5`·`a8abec97`, pushed) | §B-12 reset; the substrate ref | `master == origin/master == 1fa98a5d`; the sacred checkout is the execution substrate (§0j.C KF-WRITE (b)) ✅ |
| KF.W4 | **CLOSED 2026-09-17** (CHECK 2 CONFORMANT-HONEST-RED) | **commit 2** — the plugin-vue registration in `vitest.config.ts` (G10 leg (a)'s witness) | ⟨cmd⟩ `git show HEAD:vitest.config.ts \| grep -n plugins` → `:7` (prose) · **`:16 plugins: [vue()]`** ✅ |
| KF.W5 | **CLOSED 2026-09-17** (CHECK 1 CONFORMANT-HONEST-RED) | the **library surface decision** (which symbols join the published map) | ⟨cmd⟩ `git show HEAD:src/animation/public.ts \| sed -n '142,168p'` → the block headed *"X.KF.W5 THE PUBLICATION DECISION (§Sequencing S-3, gate G-CSSIDENT)"*, landing `export { cssIdent, reverseCSSTime, serializeTimingFunction } from "./compile/emit";` at **`:168`** ✅ (its contents are a **finding** for unit c — see §Baseline G2) |
| KF.W6 (SCOPED) | **CLOSED 2026-09-17** (CHECK 1 CONFORMANT-HONEST-RED) | the **R4-1 atomic commit**: delete `EditorHeader.vue` **+** strike barrel line `shell/index.ts:2` **+** strike the `layout.css:15` orphan token — ONE commit | ⟨cmd⟩ `git cat-file -e HEAD:demo/components/instrument/shell/EditorHeader.vue` → **fatal: does not exist** (deleted) · `git show HEAD:demo/components/instrument/shell/index.ts` → **3 lines**, `EditorShell` · `EditorStartScreen` · `SharePopover` (the `EditorHeader` line struck) · `git grep -n 'header-items-max-w' HEAD -- demo/styles/layout.css` → **exit 1** (token struck) ✅ all three limbs landed |

**Every `Opens after` condition is MET.** The wave opens.

### 4 · The one owner-gated item that lands inside this wave — COHESION §0o `ESC-KFW2-1`

Quoted verbatim from `COHESION.md` §0o:

> **ESC-KFW2-1 (KF.W2 G-W2-2, Tier-A single entry).** The §Bounds addendum-beside is **GRANTED**:
> `src/animation/engine/css/metadata.ts` joins KF-W2's Owned-files table by dated E-3 addendum; the
> one-import repoint (+ call sites `:42/:102`) is performed by **KF.W8's unit d** beside MISS-β2 (the
> same parse/emit neighbourhood, one commit), and G-W2-2 is re-measured at KF.W8's close.

Re-derived at HEAD by this seat: ⟨cmd⟩ `git show HEAD:src/animation/engine/css/metadata.ts | sed -n
'22,36p'` → the single direct grammar-entry import block `:22-30` (`collectStyleRules`,
`collectTimelineOptions`, + five `type` members) `from "@mkbabb/value.js/css"`; the two runtime call
sites resolve at **`:41` `collectStyleRules(stylesheet)`** and **`:102`
`collectTimelineOptions(selectedDeclarations(stylesheet))`** (the ruling's `:42` is the same call's
statement, recorded as the ruling's spelling and not re-issued — E-3). The façade **exists**:
⟨cmd⟩ `git ls-tree -r --name-only HEAD -- src/animation/compile | grep facade` →
`src/animation/compile/parse-facade.ts`, which re-exports **both** names (`:78` `collectStyleRules` ·
`:79` `collectTimelineOptions`). **The repoint is therefore reachable in-bounds and is unit d's, in
the MISS-β2 commit.** No other §0k+ addendum names KF.W8 (⟨cmd⟩ `grep -n 'KF\.W8\|KF-W8'
docs/tranches/X/COHESION.md` → **2 hits, both this ruling**, `:1105`/`:1106`).

### 5 · E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock (2026-09-18 ~20:0x EDT), delta against the F.W4 `.c` close
sweep (19:4x) and the KF.W7 `.j` re-close sweep (19:00), compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification taken from each row's **Status cell**, never
from a bare `grep -i unread` (X.P.W0 CHECK 1 D-1). `INBOX.md` **self-excluded** (SELF-COUNT law).

1. `docs/tranches/V/` → **10** `.md`; newest `PALETTE-CONTRACT.md` (18:43) — an architecture doc, not
   mail. `docs/tranches/V/coordination/` → **18** entries; newest
   `valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md` (19:00) = **O-31**, rowed.
2. `../glass-ui/docs/tranches/` — ⟨cmd⟩ `ls -latd ../glass-ui/docs/tranches/*/ | head -3` → **`BK/`**
   (Sep 18 17:53) · `BJ/` (Aug 3) · `BI/` (Jul 28): **BK re-confirmed newest**. `BK/coordination/` →
   **9** entries; newest `glass-outbound-2026-09-18-valuejs-o26-reply.md` (17:18, **43,967 B** — the
   third revision) = **I-35**, whose Status cell reads *"**READ + CONSUMED WHOLE 2026-09-18 17:1x EDT
   (KF.W6 unit `.l`)**"*, and whose third revision is answered by **O-31**'s addendum-beside.
3. `../keyframes.js/docs/tranches/V/coordination/` → **12** `.md` + `vnext/`; newest Sep 17 19:08
   (the §B-12 reset's restore) plus our own two untracked delivered letters (Jul 24 · Jul 27) — all
   rowed long since.
4. `../sci-report/atlas/docs/tranches/P/coordination/` → **28** entries; newest Aug 3 15:01 — rowed.

**Result: 0 unrowed · 0 UNREAD addressed to value.js in this wave's scope.** Highest inbound row is
**I-35** (READ + CONSUMED); highest outbound is **O-31**. **`INBOX.md` is NOT edited by this open**
(nothing to row); a dated sweep line is appended at the file end as the receipt.

---

## Baseline — the fifteen conditions, run READ-ONLY at `HEAD 1fa98a5d`, double-run

**Fifteen gates, all born RED at the spec's `81a56990`.** Re-measured here. **Verdict vocabulary**:
`RED` = the gate's condition fails, the wave's cure is owed · `HOLDS` = a leg or clause already
satisfied · `GREEN-BEFORE-CURE` = satisfied before this wave spends a byte (R.2 finding) ·
`DIVERGENT` = the reading moved against the spec's, materially.

| gate | reading at HEAD (double-run) | spec's reading at `81a56990` | verdict |
|---|---|---|---|
| **G1 c1** — zero `@src/` in `demo/` | **8 statements / 7 files** | 7 / 6 | **RED · DIVERGENT** (one new statement, **out of §Bounds** — see F-1) |
| **G1 c2** — no library-PRIVATE module reached | 4 reached modules; **0** named as a module path by any of the four published entries (the one `compile/emit/css-text` hit is **PROSE in a comment**, `public.ts:157` — a false positive, recorded not counted) | 4 of 4 private | **RED** |
| **G2 c1** — every consumed symbol published | **5 of 7 consumed symbols unpublished**: `serializeCssValue` · `camelCaseToHyphen` · `bumpLayoutEpoch` · `convertToPixels` · `namedSelectorToFraction`. **2 published by KF.W5** at `public.ts:168`: `reverseCSSTime` · `serializeTimingFunction` (+ `cssIdent`, published and not consumed) | 0 of 8 | **RED · MOVED** (W5's ruling landed and cured two) |
| **G2 c2** — narrowness (`export *` = 0) | ⟨cmd⟩ `git show HEAD:src/animation/index.ts \| grep -c 'export \*'` → **0** (run 1 = run 2) | 0, *"green today and must stay green"* | **GREEN-BEFORE-CURE (spec-declared)** |
| **G3** — exactly one serializer body | **3** — `demo/utils/keyframeSelector.ts:7` (exported) · `src/animation/compile/emit/css-text.ts:59` · `src/animation/compile/emit/format/format.ts:20` | 3 (`:58`/`:20`/`:7`) | **RED** (set identical; two coordinates moved by 1) |
| **G4** — barrel family, four clauses | **clause 1 HOLDS** (`transport/index.ts` **ABSENT**) · **clause 2 RED** (`keyframes/index.ts` present, `git grep -l 'instrument/keyframes"'` exit 1) · **clause 3 RED** (`timeline/index.ts` present, exit 1) · **clause 4 HOLDS** (`instrument/index.ts` **ABSENT**) | all four RED, four barrels present | **RED (2 of 4) · 2 GREEN-BEFORE-CURE** |
| **G5** — no parent-directory sibling imports | **2** — `keyframes/components/KeyframeCardList.vue:46` → `../KeyframeCard.vue` · `timeline/components/TimelineTrack.vue:296` → `../TimelineCaret.vue` | 3 (the third was `ChannelControls.vue:229` → `../KfPillTabs.vue`) | **RED · MOVED** (the third member died with `KfPillTabs` in KF.W6's own S-1 family) |
| **G6** — zero loose `.vue` at `demo/components/` | **1** — `demo/components/CopyButton.vue` | 1 | **RED** (unchanged; the ACTING gate) |
| **G7** — shell barrel symmetry | leg (i) **7** SFCs · leg (ii) **3** exports (`EditorShell`·`EditorStartScreen`·`SharePopover`) · leg (iii) **HOLDS** — every export has ≥1 importer · **leg (iv) DIVERGENT** (F-2, F-3) | (i) 8 · (ii) 4 · (iii) FALSE for `EditorHeader` · (iv) 4 external / 3 internal / 1 zero-importer | **RED via leg (iv) · legs (i)–(iii) HOLD** |
| **G8 leg (i)** — `editor-shell/` citations | **2** — `demo/app/App.vue:148` · `demo/components/instrument/shell/EditorStartScreen.vue:235` | 2 (`:144`/`:102`) | **RED** (same two sites, coordinates moved) |
| **G8 leg (ii)** — false value.js attribution | AV: **5 raw lines**, of which **4 are attribution** (`:90`·`:92`·`:96`·`:97`) and `:66` is a true `clamp` import. **`resize-tracks.test.ts` is CURED** — its `:8` now reads *"here previously attributed both symbols to value.js, which exports neither"* | AV 4 attribution + 6 test lines, all RED | **RED (AV arm) · GREEN-BEFORE-CURE (test arm, cured by KF.W4)** |
| **G8 leg (iii)** — barrel chunk-rationale prose | **2 files** — `keyframes/index.ts` · `timeline/index.ts` | 4 files | **RED (2) · 2 discharged with their barrels** |
| **G9** — every `*.test.ts` in exactly one project | tracked **154** (`test` 152 + `bench` 2); `npx vitest list --filesOnly` collects **152** (library **117** + demo **35**); **orphans = the same 2** `bench/d3-changed-keys.measure.test.ts` · `bench/sync-step.measure.test.ts` | 132 tracked / 2 orphans | **RED** (denominator moved; the RED members are identical) |
| **G10** — the `demo` project can load an SFC | leg (a) **GREEN** (`vitest.config.ts:16 plugins: [vue()]`, W4 commit 2) · leg (b) **GREEN-BEFORE-CURE** (`@vue/test-utils ^2.5.1` present — KF.W7's OP-4 landed the idempotent add first, exactly as DH-2 declared) · **the probe `test/demo/instrument/sfc-load.probe.test.ts` is ABSENT** | both legs RED | **RED on this wave's own act only (the probe)** |
| **G11** — `groupShortcuts()` beside the SFC + covered | ⟨cmd⟩ `git grep -l groupShortcuts HEAD -- demo test` → **exit 1** (neither artefact). The inline body is at `KeyboardShortcutsModal.vue:308-318` (`:308 const groupedShortcuts = computed(() => {` … `:318 });`), template consumer at `:139` | inline at `:57-67`, 0 test coverage | **RED** (extent re-derived: **`:308-318`**, not `:57-67`) |
| **G12** — characterization pair | neither `test/demo/instrument/CSSPasteDialog.test.ts` nor `…/KeyframesAddDialog.test.ts` exists (the two `git grep -l` hits are `test/compile/grammar-fuzz.test.ts` and `test/demo/instrument/highlight-css-roundtrip.test.ts` — prose/fixture mentions, **not** the named files) | 0 | **RED** |
| **G13** — the `src/` chain is RULED | `git ls-tree --name-only HEAD -- src/` → **one entry, `src/animation`**; `basename == dirname` stutters → **8** (`emit/backward/backward` · `emit/format/format` · `group/group` · `orchestration/{sequence,split-text,timeline,view-transition}/<same>` · `physics/spring/solver/solver`); **no ruling exists in the tree** | one entry; 8 stutters; no ruling | **RED** (unchanged, 8 = 8) |
| **G14** — hand-rolled projectors outside `useDragScrub` | `git grep -c 'getBoundingClientRect()' HEAD -- demo` → **13 lines / 11 files** (run 1 = run 2). `useDragScrub.ts` → **exit 1, zero** (still receives geometry). The in-bounds projector: `AnimationVisualizer.vue:121 const progressFromPointerX`, call sites **`:230`**/**`:235`** | 11 / 10; projector `:101-110`, sites `:210`/`:215` | **RED · DIVERGENT** (host census moved — F-4) |
| **G15 leg 1** — coupling | **7 convicted lines** in `RibbonBar.vue`: `:8` · `:13` · `:55` (`url(#rainbow-gradient)`) · `:65` · `:100` · `:105` · `:138` | 7 (`:8`·`:13`·`:59`·`:69`·`:108`·`:113`·`:138`) | **RED** (same seven, coordinates moved) |
| **G15 leg 2** — the pad allowance | **exactly 2 lines** — `:5` the Teleport comment · `:7` `id="controls-ribbon-target"`; no `<Teleport>` element, no binding on the pad | 2 permitted | **HOLDS / GREEN-BEFORE-CURE** |

### Pasted outputs (the load-bearing ones)

```
⟨cmd⟩ git grep -n 'from "@src/' HEAD -- demo
HEAD:demo/components/instrument/keyframes/composables/useKeyframeOps.ts:1:import { reverseCSSTime } from "@src/animation/compile/emit/css-text";
HEAD:demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:7:import { serializeTimingFunction } from "@src/animation/compile/emit/css-text";
HEAD:demo/components/instrument/timeline/KeyframeTimeline.vue:363:import { serializeCssValue } from "@src/animation/compile/emit/css-text";
HEAD:demo/components/instrument/timeline/utils/timelineEngine.ts:1:import { camelCaseToHyphen } from "@src/animation/internal/helpers";
HEAD:demo/components/instrument/timeline/utils/timelineEngine.ts:16:import { serializeCssValue } from "@src/animation/compile/emit/css-text";
HEAD:demo/components/playback/AnimationVisualizer.vue:65:import { bumpLayoutEpoch } from "@src/animation/resolve/browser";
HEAD:demo/utils/helpers.ts:9:import { convertToPixels } from "@src/animation/resolve/browser";
HEAD:demo/utils/keyframeSelector.ts:5:import { namedSelectorToFraction } from "@src/animation/compile/selector";

⟨cmd⟩ git grep -n "const selectorText\|const serializeSelector" HEAD -- src demo
HEAD:demo/utils/keyframeSelector.ts:7:export const selectorText = (selector: KeyframeSelector): string =>
HEAD:src/animation/compile/emit/css-text.ts:59:const serializeSelector = (selector: KeyframeSelector): string => {
HEAD:src/animation/compile/emit/format/format.ts:20:const selectorText = (selector: KeyframeSelector): string =>

⟨cmd⟩ git grep -nF 'utils/keyframeSelector' HEAD -- demo test      # A-9's consumer set
HEAD:demo/components/instrument/keyframes/composables/useKeyframeOps.ts:9
HEAD:demo/components/instrument/timeline/components/TimelineHoverPreview.vue:192
HEAD:demo/components/instrument/timeline/composables/useTimelineBuild.ts:7
HEAD:demo/components/instrument/timeline/composables/useTimelineOps.ts:7
HEAD:demo/components/instrument/timeline/timelineTypes.ts:2
HEAD:demo/components/instrument/timeline/utils/snapshotCapture.ts:3
HEAD:demo/components/instrument/timeline/utils/timelineEngine.ts:15
HEAD:test/demo/instrument/timeline-hover-preview.test.ts:18
HEAD:test/demo/instrument/timeline-mount-keyboard.test.ts:34
HEAD:test/demo/instrument/timeline-mount-projection.test.ts:35
HEAD:test/demo/instrument/timeline-undo.test.ts:6
HEAD:test/demo/instrument/value4-editor-boundary.test.ts:6
                                                        → 12 (run 1 = run 2), not the spec's SEVEN

⟨cmd⟩ git grep -nF 'CopyButton.vue"' HEAD -- demo test              # A-5, R-1's four repoints
HEAD:demo/components/instrument/keyframes/KeyframeCard.vue:133
HEAD:demo/components/instrument/keyframes/KeyframesEditor.vue:233
HEAD:demo/scenes/easing/EasingTarget.vue:181
HEAD:demo/scenes/spring/StartingStyleTarget.vue:150
  + the docblock prose at demo/components/instrument/keyframes/composables/useToolbarKeyboard.ts:25
                                                        → 4 importers, identities unmoved, all four coordinates moved

⟨cmd⟩ git grep -c 'getBoundingClientRect()' HEAD -- demo
HeroAurora.vue:1 · TimelineTrack.vue:2 · useZoomPan.ts:1 · TransportDock/useMenubarMeasure.ts:1
AnimationVisualizer.vue:2 · useSphereSpin.ts:1 · SequenceScrubber.vue:1 · SequenceTarget.vue:1
SpringHeatmap.vue:1 · SpringTarget.vue:1 · SquareScene.vue:1          → 13 lines / 11 files
```

### Findings banked at open (measured, not decided — each is a unit's to carry or escalate)

- **F-1 · G1 clause 1's green is NOT reachable inside §Bounds.** The 8th `@src/` statement,
  `demo/components/instrument/timeline/KeyframeTimeline.vue:363` (`serializeCssValue`), did not exist
  at `81a56990` and **appears in no §Bounds row**. A seat that edits it writes outside bounds; a seat
  that does not cannot reach `0`. **Unit c must ESCALATE this rather than choose**, exactly as the
  spec's own born-RED law (L-19) and the seat law's escalation trigger require.
- **F-2 · G7 leg (iv): `TypingDots` has acquired an EXTERNAL importer.**
  `test/demo/instrument/typing-dots-engine-seam.test.ts:39` (a **KF.W4** create) imports it from
  outside `shell/`. Under leg (iv)'s own definition of *external* that makes `TypingDots` externally
  consumed and not exported — inverting the spec's verdict *"internal-only = AnimatedText ·
  KeyboardShortcutsModal · TypingDots"*. Unit f carries it to G7 or escalates; it may **not** be
  cured by adding an export (the falsifier forbids exactly that).
- **F-3 · G7 leg (iv): `HeroAurora` now has ZERO static importers.** Its one consumer is
  `demo/app/App.vue:163-164` `defineAsyncComponent(() => import("@components/instrument/shell/
  HeroAurora.vue"))` — a **dynamic** import the leg's `from "…/N.vue"` command shape does not match.
  A-8's census of **1** stands by content; the *command* returns ∅. Unit f states which, with its own
  output, before it moves the file.
- **F-4 · G14's host census moved 11/10 → 13/11.** `HeroAurora.vue` is a **new** host (1 line) and
  `TimelineTrack.vue` now carries 2. Unit a's enumeration is the gate's binding subject (*"the gate
  binds to that enumeration, never to `11`"*), so unit a enumerates **13**, dispositioning the new
  host with its owner named — the spec's *"enumerate-and-disposition, never drop"* falsifier clause.
- **F-5 · A-9's consumer set moved 7 → 12.** Five of the twelve (`TimelineHoverPreview.vue:192` ·
  `timelineTypes.ts:2` · `timeline-hover-preview.test.ts:18` · `timeline-mount-keyboard.test.ts:34` ·
  `timeline-mount-projection.test.ts:35`) are **KF.W7 creates/edits with no §Bounds row here**. G3's
  own binding sentence — *"a 'one body' landing that leaves any of the seven on a deleted module is a
  broken tree, not a green gate"* — now reads over twelve, five of them unbounded. **Unit d
  escalates** rather than reaching outside its grant.
- **F-6 · G2's remaining five symbols cannot go green by publication.** KF.W5 ruled and published
  three names; it published **no epoch surface** (⟨cmd⟩ `git grep -n 'epoch' HEAD -- src/animation/
  index.ts src/animation/public.ts src/animation/load-engine.ts src/animation/engine/index.ts` → ∅).
  Per G1's *Blocked by* clause the remaining route is **relocation, never re-specifying** — the demo
  owns them (`demo/utils/helpers.ts:1-8`'s own docblock names this wave). Units c/h carry it.

**GREEN-BEFORE-CURE (R.2) at open**: G2 clause 2 (spec-declared) · G4 clause 1 · G4 clause 4 ·
G8 leg (ii)'s `resize-tracks.test.ts` arm · G10 leg (a) · G10 leg (b) · G15 leg 2. **Seven**, each
attributable to a named predecessor wave (KF.W4 · KF.W5 · KF.W6 · KF.W7) and none to this wave.

---

## Unit plan

**Shape**: the spec's §State `Units` line is binding — ***"8 (a→h), serial; no parallelism, no
jury"***. Peak concurrency **1**; nine ordered groups of one (a…h + the close seat `i`, derived from
§Bounds' `KF-W8-CLOSE.md` **create** row and the ledger's `IMPLEMENTED → CLOSED` vocabulary).
**Model**: the spec names **no** Fable / fresh-Fable / adjudicator / design-author seat and hands
tiering to the orchestrator (M-12) — **all nine seats Opus**.

**Repos**: product bytes land in `/Users/mkbabb/Programming/keyframes.js` (KF-WRITE (b), §0j.C);
the two doc artefacts (`KF-W8-census.md`, `KF-W8-CLOSE.md`) and this record land in
`/Users/mkbabb/Programming/value.js`. Sibling trees other than keyframes.js are READ-ONLY;
glass-ui READ-ONLY always.

**Same-commit families (runbook §3.4 + spec)** — must not split:
- **f**: `git mv demo/components/CopyButton.vue` + the **four** import repoints + the
  `useToolbarKeyboard.ts:25-27` docblock = **ONE commit** (R-1 / S-2 MUST-CARRY).
- **f**: each `editor-shell/` correction lands in the **same commit** as the move that made it stale
  (G8 *Authority*, README:132-135).
- **f**: `KeyframeCard.vue`'s **move** (KC-30) and its **`:133` CopyButton carve** (KF-CB-37) are two
  ids and **never share a commit** (D-14's split).
- **c**: KF-AV-8's three-site extirpation = one commit.
- **d**: the serializer unification **and** ESC-KFW2-1's `metadata.ts` repoint = **one commit**.
- **e**: one ruling, five sites (G4) — and the `src/` chain + `engine/animation.ts` decline is **one**
  ruling (R-4, KF.W5 D-6's no-split lock).

| unit | model | spec sections it executes | writable set | gates | locks |
|---|---|---|---|---|---|
| **a** | opus | §Units row `a` (`:56`); §Goal criterion (`:65-67`); §Scope 1 (`:71`); §Carry D-19 rows 1–12 (`:142-162`); §Carry LAW A A-1…A-10 (`:164-191`); G14 limb 3 (`:377`) | value.js `docs/tranches/X/keyframes/waves/KF-W8-census.md` (create) | feeds all; **binds G14's enumeration** | none; every downstream number binds to this artefact |
| **b** | opus | §Units row `b` (`:57`); §Scope 2 (`:72`); §Carry *The ratified idiom* (`:193-208`); §Rows `L-17` (`:243`), `ingest/cssom.ts` (`:255`), `B-16` (`:256`) | value.js `…/KF-W8-census.md` (append §KF.W8-I) | directions of G5 / G7 | the two inbound colocation questions are **riders that do not gate completion** |
| **c** | opus | §Units row `c` (`:58`); §Scope 3 (`:73`); G1 (`:262-269`); G2 (`:271-275`); §Rows KF-CE-12 · KF-CE-42 · KF-AV-8 · KF-AV-35 · KF-KE-15 · C-8 · C-12 (`:221-229`); §Bounds deep-import row (`:103`) | kf `demo/utils/helpers.ts` · `demo/utils/keyframeSelector.ts` · `demo/components/instrument/keyframes/composables/useKeyframeOps.ts` · `…/keyframes/utils/parseAnimationCSS.ts` · `…/timeline/utils/timelineEngine.ts` · `demo/components/playback/AnimationVisualizer.vue` (import line only) | **G1 · G2** | KF-AV-8's three-site extirpation = ONE commit; F-1 and F-6 are **ESCALATIONS**, never a widening |
| **d** | opus | §Units row `d` (`:59`); §Scope 4 (`:74`); G3 (`:277-283`); §Rows MISS-β2 (`:230`); §Sequencing → KF.W2/W3 (`:432-433`); **COHESION §0o ESC-KFW2-1** | kf `src/animation/compile/emit/format/format.ts` · `…/emit/css-text.ts` · `…/emit/index.ts` · `demo/utils/keyframeSelector.ts` · `…/useKeyframeOps.ts` · `…/useTimelineBuild.ts` · `…/useTimelineOps.ts` · `…/snapshotCapture.ts` · `…/timelineEngine.ts` · `test/demo/instrument/timeline-undo.test.ts` · `…/value4-editor-boundary.test.ts` · `src/animation/engine/css/metadata.ts` | **G3** (+ G-W2-2 re-measured at close) | serializer unification + metadata repoint = ONE commit; F-5's five unbounded consumers = **ESCALATION** |
| **e** | opus | §Units row `e` (`:60`); §Scope 5 + 8 (`:75`, `:78`); G4 (`:285-295`); G13 (`:361-370`); §Sequencing R-4 (`:406-412`); §Rows KAD-24 · SPF-22 · KF-KC-45 · L-19/C-14 · the single-child row (`:235-238`, `:251`) | kf `demo/components/instrument/keyframes/index.ts` · `demo/components/instrument/timeline/index.ts`; value.js `…/KF-W8-census.md` (the two rulings) | **G4 · G13** | ONE ruling / five sites; R-4 declines **both** structural instances together (KF.W5 D-6 no-split) |
| **f** | opus | §Units row `f` (`:61`); §Scope 6 (`:76`); G5 (`:297-300`); G6 (`:302-305`); G7 (`:307-322`); G8 (`:324-333`); §Sequencing R-1 (`:397-403`); §Rows KF-CB-37 · KF-AT-26(c) · KF-HA-14 · KC-30 · N-11 · m-7 · KF-AV-18 (`:226`, `:232-242`) | kf `demo/components/CopyButton.vue` (move) · `…/keyframes/KeyframeCard.vue` (move + `:133` carve, **separate commits**) · `…/keyframes/KeyframesEditor.vue:233` · `demo/scenes/easing/EasingTarget.vue:181` · `demo/scenes/spring/StartingStyleTarget.vue:150` · `…/keyframes/composables/useToolbarKeyboard.ts:25-27` · `…/timeline/TimelineCaret.vue` (move+rename) · `…/shell/HeroAurora.vue` (move) · `…/keyframes/components/KeyframeCardList.vue:46` · `…/timeline/components/TimelineTrack.vue:296` · `demo/app/App.vue:148` · `…/shell/EditorStartScreen.vue:235` · `demo/components/playback/AnimationVisualizer.vue` (`:90-97` prose) | **G5 · G6 (ACTING) · G7 · G8** | the `git mv` + 4 repoints + docblock = ONE commit; corrections ride their move's commit; move ≠ carve; **G7 performs NO barrel edit** |
| **g** | opus | §Units row `g` (`:62`); §Scope 7 (`:77`); G9 (`:335-340`); G10 (`:342-347`); G11 (`:349-353`); G12 (`:355-359`); §Sequencing R-5 (`:413`); §Rows R-10 · C-10 · the tests row (`:244-245`, `:252`) | kf `vitest.config.ts` (the third `measure` project **only**) · `demo/components/instrument/shell/KeyboardShortcutsModal.vue` (`:308-318`) · `demo/components/instrument/shell/groupShortcuts.ts` (create) · `test/demo/instrument/sfc-load.probe.test.ts` · `…/groupShortcuts.test.ts` · `…/CSSPasteDialog.test.ts` · `…/KeyframesAddDialog.test.ts` (creates) | **G9 · G10 · G11 · G12** | no `plugins` key is written (W4's); `package.json` needs **no** edit (`@vue/test-utils` already present); G12 is gated on KF.W7's R-7 verdict — **KF.W7 is CLOSED**, so the ruled shape is readable |
| **h** | opus | §Units row `h` (`:63`); §Scope 9 (`:79`); G14 (`:372-380`); G15 (`:382-391`); §Rows KF-AV-9 · KF-AV-26 · KF-AV-24 · M-4 · m-4 (`:225`, `:246-249`); the KF-AV-28 standing rider (`:216-217`) | kf `demo/components/playback/AnimationVisualizer.vue` (the projector + ball-rect + both call sites; the inertia block; the `useResizeObserver` wire) · `demo/composables/useDragScrub.ts` | **G14 · G15** | G15 = **spec input only, ZERO bytes** (a G15 green on a KF.W8 commit is itself the defect); the KF-AV-28 SWAP rider binds every byte on the two evaluated surfaces; the RIDER: projection math only |
| **i** | opus | §Goal criterion; §Gates whole (verify-only re-run); runbook §5.3 close sweep; ledger vocabulary | value.js `docs/tranches/X/keyframes/waves/KF-W8-CLOSE.md` (create) · `docs/tranches/X/execution/B/KF-W8.md` (§Close) · `docs/tranches/X/execution/LEDGER.md` (KF.W8 row) · `docs/tranches/V/coordination/INBOX.md` (close sweep line) | re-measures **all 15**, turns none | VERIFY-ONLY: it authors no cure; honest-RED is recorded, never asserted green; E13 close sweep; push kf `origin HEAD` |

### Group order (serial, peak concurrency 1)

`[a] → [b] → [c] → [d] → [e] → [f] → [g] → [h] → [i]`

No two units share a modify path in adjacent groups by construction (there is no concurrency).
`demo/utils/keyframeSelector.ts` is touched by **c** and **d**, and `AnimationVisualizer.vue` by
**c**, **f** and **h** — all strictly sequenced, which is why the spec forbids parallelism here.

---

## Unit receipts

*(empty at open — each unit appends its own receipt, dated, with its served model on line 1 of any
file it creates and its commands quoted ⟨cmd⟩ … → output)*

### a

**SERVED MODEL**: `claude-opus-5[1m]`. **Date**: 2026-09-18. **Unit**: `a` — re-baseline the census at
the stated ref; publish `KF-W8-census.md`. **Gates**: *feeds all* · **binds G14's enumeration**.
**Writable set**: `docs/tranches/X/keyframes/waves/KF-W8-census.md` (one path). **Status: DONE.**

#### Act 1 — crash-recovery sweep (STANDING LAW), before any other act

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/value.js` → **15 rows**; in
`/Users/mkbabb/Programming/keyframes.js` → **2 rows, both `??`** (our own two delivered letters).
⟨cmd⟩ `ls docs/tranches/X/keyframes/waves/KF-W8-census.md` → **No such file or directory**.
**No killed predecessor seat's work exists inside this unit's writable set — nothing inherited, nothing
stashed, no dirty path outside the set touched.** `scripts/dev/dev.sh` (dirty by standing arrangement)
was never opened.

#### Act 2 — the substrate, stated

⟨cmd⟩ `git rev-parse HEAD origin/master master` (kf) → **`1fa98a5d8fa53cd6b408b3094195b9f8c12ab32f`**
three times. **`master == origin/master == HEAD == 1fa98a5d`, NOT the spec's `81a56990`**, which is
seven waves stale (KF.W0·W1·W2·W4·W5·W6·W7 all landed since). Every figure below is re-derived at
`1fa98a5d`, **double-run**, each command printed with its output beside the spec's dated reading;
**E-3 — the spec's readings are RECORDED, never struck.**

#### Act 3 — D-19 rows 1–12, re-derived (census §1)

| row | spec @ `81a56990` | **this seat @ `1fa98a5d`** | verdict |
|---|---|---|---|
| D-19-1 | `debounce:16` · `convertPixelsToCh:28` · `helpers.ts:9` · `browser.ts:1-3`/`:23` | identical, coordinate for coordinate | **UNMOVED** |
| D-19-2 | the `:1-8` docblock naming this wave | byte-identical at `:1-8` | **UNMOVED** |
| D-19-3 | 2 in `keyframes/`; G1 = 7 stmts / 6 files / 4 modules | 2 in `keyframes/`; **G1 = 8 / 7 / 4** | **MOVED** — the 8th (`KeyframeTimeline.vue:363`) is **unbounded** |
| D-19-4 | AV `:45` deep import · `:46` clamp · wire `:79` | **`:65`** · **`:66`** · wire **`:99`** | **UNMOVED in identity, +20 in coordinate** |
| D-19-5 | one `src/` child; **8** stutters | one child; **8** stutters, path for path | **UNMOVED** |
| D-19-6 | HeroAurora sole importer `App.vue:147` (static) | **2 consumers, both DYNAMIC**: `App.vue:163-164` · `aurora-opacity-ceiling.test.ts:62` | **basis MOVED, conclusion (duo) STANDS** |
| D-19-7 | `controls-pane/` holds `ControlsPaneWrapper.{vue,css}` + `RibbonBar.vue` | identical | **UNMOVED — m-4 still does not reproduce as worded** |
| D-19-8 | 130 tests / 27 `test/demo` / 9 `test/demo/instrument` | **152 / 35 / 16** (+2 `bench/`) | **MOVED** — the 7 new files are exactly DH-3's KF.W4(2)/W5(1)/W7(4) creates; the nine read-only are all present |
| D-19-9 | up-imports RED at **3** | **RED at 2** | **MOVED** — the third died with `KfPillTabs.vue` in KF.W6's S-1/KPT-SUP-4 family (`git ls-tree … \| grep -i KfPillTabs` → exit 1). **DISCHARGED, not ignored** |
| D-19-10 | AnimatedText one importer `EditorStartScreen.vue:62`; `TypingDots:4` prose | one importer **`:137`**; `TypingDots` prose at **`:4` AND `:93`** | **conclusion STANDS — AnimatedText stays in `shell/`** |
| D-19-11 | `getBoundingClientRect()` = 11 lines / 10 files; `useDragScrub` zero | **13 lines / 11 files**; `useDragScrub` **still zero** (exit 1) | **MOVED** — enumerated at census §3 |
| D-19-12 | the family is **FIVE** sites (4 `export *` barrels + KF-CE-40) | **TWO live in-bounds sites**: `instrument/index.ts` **ABSENT** · `transport/index.ts` **ABSENT** · `shell/index.ts` present but **NO-ACCESS (KF.W6's)** · `keyframes/index.ts` (**KF-CE-40 = its `:11`**) + `timeline/index.ts` live | **MOVED** — G4 clauses 1 and 4 GREEN-BEFORE-CURE |

**KF-CE-40 located at the bytes** (the spec never pathed it): registry `kf-CSSCodeEditor.md:76`/`:101`
name it as `keyframes/index.ts:11`'s lazy `CSSCodeEditor` export. Both registry statements reproduce —
the two consumers (`KeyframesStringControls.vue:57` · `KeyframeTimeline.vue:357`) import the SFC
**statically**. **The fifth site is a line of the second, not a fifth file.**

#### Act 4 — LAW A census A-1…A-10, re-derived from the import graph (census §2)

Nothing inherited from `KF-W6-CARRY.md`, the spec's text, this record, or a prior pass. Each census =
specifier sweep ∪ symbol sweep with every hit resolved to its own specifier.

| # | spec | **this seat** | verdict |
|---|---|---|---|
| A-1 | 0 | **MOOT** — `instrument/index.ts` absent (`git cat-file -e` → fatal) | module gone |
| A-2 | 0 | **0** — specifier sweep exit 1 **and the umbrella `export *` is gone with the umbrella**; all 3 members resolve to SFCs | **0, and stronger** |
| A-3 | 0 | **0** — same; `TimelineKeyframe`'s **9** consumers all import `timelineTypes` | **0, and stronger** |
| A-4 | 0 | **MOOT** — `transport/index.ts` absent | module gone |
| A-5 | 4 | **4** — `KeyframeCard.vue:133` · `KeyframesEditor.vue:233` · `EasingTarget.vue:181` · `StartingStyleTarget.vue:150` | **reproduces; 4 coordinates moved** |
| A-6 | 1 | **1** — `KeyframeCardList.vue:46` | **reproduces** |
| A-7 | 1 | **2** — `TimelineTrack.vue:296` **+ `test/demo/instrument/timeline-mount-keyboard.test.ts:28`** (KF.W7 create, **unbounded**) | **MOVED** |
| A-8 | 1 | **2**, both dynamic — `App.vue:164` · `aurora-opacity-ceiling.test.ts:62`; **plus `scripts/gates/census.mjs:528`**, the literal path inside `EMBEDDED_SITES`, in **DO-NOT-TOUCH** territory | **MOVED + a new obligation** |
| A-9 | 7 | **12** — 7 bounded (incl. the two declared exceptions), **5 unbounded** (KF.W7 creates/edits) | **MOVED** |
| A-10 | 7 demo | **8 demo**; **the library half reproduces EXACTLY**, including the round-4 `3 → 4` on `compile/emit/css-text`; `resize-tracks.test.ts`'s relative reach survives at **`:41`** | **MOVED (demo half only)** |

**Two findings the wave record's F-5 did not carry**: A-9's consumers 2 and 5
(`useTimelineBuild.ts`, `timelineEngine.ts`) sit **one line above** their §Bounds grants (`:7` where
the row says `:8`; `:15` where it says `:16`) — a seat executing from the coordinate column carves the
wrong line in two files it *is* lawfully bounded for. **A-8's `scripts/gates/census.mjs:528` is new**:
a `git mv` of `HeroAurora.vue` breaks a **KF.W4-owned** gate script this wave may not repair.
**Recorded with its owner named; unit f's to escalate, never to widen.**

#### Act 5 — G14's host enumeration (census §3) — **THIS UNIT'S, AND IT BINDS THE GATE**

⟨cmd⟩ `git grep -n 'getBoundingClientRect()' HEAD -- demo` → **13 lines**; `-c` → **11 files**
(run 1 = run 2). **All 13 lines across all 11 files are enumerated, classified and dispositioned —
the falsifier's own requirement. Omitting one fails G14.**

**Rule stated at the receipt**: *PROJECTOR* iff the rect produces a normalized position (0..1, or an
affine remap — percent, NDC, a scaled unit); *BARE RECT READ* iff consumed as absolute geometry;
*NON-CODE* otherwise.

**Arithmetic**: 13 lines / 11 files raw → **1 NON-CODE** (`HeroAurora.vue:189`, a `//` comment in the
KF-APP-49 decline note — **there is no rect read in that file**) → **12 executable / 10 files** →
**9 PROJECTORS · 3 BARE READS** (`useMenubarMeasure.ts:13` · `AnimationVisualizer.vue:219` ·
`SquareScene.vue:245`) → of the 9, **3 are SEAM-SEATED** (`SequenceScrubber.vue:92` ·
`SequenceTarget.vue:215` · `SpringTarget.vue:238` — each *is* `useDragScrub`'s `project` callback) and
**6 are HAND-ROLLED** → **exactly ONE hand-rolled projector is in this wave's bounds:
`AnimationVisualizer.vue:124`**, body **`:121-130`**, call sites **`:230`/`:235`**, ball rect read
**`:219`** (spec: `:104` / `:101-110` / `:210`/`:215` / `:199` — **+20 wave-wide**).
⟨cmd⟩ `git grep -c 'getBoundingClientRect' HEAD -- demo/composables/useDragScrub.ts` → **exit 1, ZERO**
(the falsifier's seam clause armed and satisfied).

**TEN out-of-bounds hosts, each with its owner** (census §3.4): `useMenubarMeasure.ts` → **TD-1/TD-2,
NO-WAVE-OWNER + BH rider, DO-NOT-TOUCH** · `useZoomPan.ts` + `TimelineTrack.vue` (**2** lines now, was
1) → the W7-named `instrument/timeline/` cluster; this wave carves `:296` for the up-import repoint
only · the six scene hosts (`useSphereSpin.ts` · `SequenceScrubber.vue` · `SequenceTarget.vue` ·
`SpringHeatmap.vue` · `SpringTarget.vue` · `SquareScene.vue`) → the scene-repair packets, recorded as
inbound cargo at `KF-W10 §6.D · SUCCESSOR-FORMATION REGISTER` (anchor-only) · **`HeroAurora.vue`, NEW**
→ bounded for a **pure `move`** only, no body byte granted, its occurrence is prose and a `git mv`
carries it unchanged. **This wave promises nothing on the ten and books no act against any of them.**

⟨**E-3 observation, recorded not struck**⟩ The spec's G14 limb 3 is headed *"THE EIGHT OUT-OF-BOUNDS
HOSTS"* and then **enumerates nine**. **The enumeration was right; the numeral was short by one.** Its
numeral is recorded as its dated reading and is not corrected in it; this seat's enumeration is the
binding one and reads **ten** at this substrate.

⟨**charter observation, handed to unit h, ruled by nobody here**⟩ D-19-11 frames the seam as *"the seam
owns projection, callers own rect reads."* At these bytes `useDragScrub.ts`'s own docblock says the
opposite in its own voice — *"each scene now supplies ONLY its `project` … `project` is pure (the
scene's geometry)"*. **The seam owns the drag LIFECYCLE and the select-suppression token; projection is
the caller's by the seam's published contract**, which is why three scene hosts hold a rect-ratio inside
a `project` callback and are **not** defects. Unit h's consolidation should therefore land the
`AnimationVisualizer` projector **as a `project` callback on the seam**, the shape its three in-tree
siblings already take — not by inventing a rival mechanism inside `useDragScrub.ts`.

#### Act 6 — WRITE-THEN-MEASURE + SELF-COUNT

⟨cmd⟩ a 16-figure double-run harness over the settled bytes → **`SAME` on all sixteen** (HEAD · src
children 1 · stutters 8 · deep-import files 7 · statements 8 · rect lines 13 · rect files 11 ·
up-imports 2 · tests 152 · test/demo 35 · test/demo/instrument 16 · barrels 3 · A-9 12 · A-5 4 ·
A-7 2 · A-8 2). Pasted at census §4.

**SELF-COUNT over the published artefact**, read back from the settled bytes:
⟨cmd⟩ `wc -l KF-W8-census.md` → **637**; `head -1` → **`SERVED MODEL: claude-opus-5[1m]`**;
§3.1 table rows → **13**, numbered `1…13` with no gap; §3.4 disposition rows → **10**;
all 13 measured coordinates present (each ≥2 occurrences); `A-1…A-10` → **10/10**;
`### D-19-1 … ### D-19-12` → **12/12**.

#### Commits

| hash | meaning | pathspec |
|---|---|---|
| `fa2417d7` | the census artefact | `docs/tranches/X/keyframes/waves/KF-W8-census.md` |
| *(this record)* | unit `a` receipt | `docs/tranches/X/execution/B/KF-W8.md` |

Pathspec on the commit itself, `--no-verify --quiet`, `-- <the same exact paths>`. **No `git add -A`,
no `-u`, no `commit -a`, no reset, no stash.** Zero paths outside the writable set were staged.

#### Gate readings BEFORE → AFTER

| gate | before | after |
|---|---|---|
| *feeds all* | the wave's downstream numbers bound to a spec measured seven waves upstream | **bound to `KF-W8-census.md` at `1fa98a5d`**, every figure double-run |
| **binds G14's enumeration** | G14 had **no** enumeration — its own text defers to unit a, and its falsifier fails the gate on an omission | **SUPPLIED**: 13/13 lines, 11/11 files, 9 projectors / 3 bare reads / 1 non-code, 1 in-bounds hand-rolled projector, **10 out-of-bounds hosts each with its owner**. G14 is now a gate with a reachable, scoped green |

#### Residuals — measured, handed on, none cured here

1. **G1 clause 1's 8th statement** `KeyframeTimeline.vue:363` — **unbounded**. Unit **c**'s escalation
   (the record's F-1, now with the module-end derivation behind it).
2. **A-9's five unbounded consumers** + **two in-bounds coordinate drifts** (`useTimelineBuild.ts:7`
   not `:8`; `timelineEngine.ts:15` not `:16`). Unit **d**.
3. **A-7's second consumer** `timeline-mount-keyboard.test.ts:28` — unbounded; a move+rename repoints
   **two** files. Unit **f**.
4. **A-8's `scripts/gates/census.mjs:528`** — a DO-NOT-TOUCH KF.W4 gate script holds
   `HeroAurora.vue`'s literal path; the move breaks it and this wave may not repair it. Unit **f**,
   **ESCALATION-shaped**.
5. **The §Bounds coordinate column is stale wave-wide** (+20 in `AnimationVisualizer.vue`, larger
   elsewhere). Every grant resolves **by subject**; the re-anchoring table is census §5. **No seat may
   execute from the spec's numerals.**

**Escalations raised by this unit: NONE.** Its writable set was sufficient, its gates are turned, and
every out-of-bounds fact above is **recorded with its owner** rather than acted on.

### b

**SERVED MODEL**: `claude-opus-5[1m]`. **Date**: 2026-09-18. **Unit**: `b` — ratify the colocation
idiom (**KF.W8-I**); re-derive all nine banked colocation rows against it; apply it to the two
inbound colocation questions as riders. **Gates**: *directions of G5 / G7*. **Writable set**:
`docs/tranches/X/keyframes/waves/KF-W8-census.md` (one path, append-only into it). **No product
byte.** **Status: DONE.**

#### Act 1 — crash-recovery sweep (STANDING LAW), before any other act

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/value.js` → **15 rows**, **none** inside
this unit's writable set (X·V demo rows · `CARRY-LEDGER.md` · `LEDGER.md` · the unowned
`scripts/dev/dev.sh` · `docs/tranches/X/waves/evidence/` · two e2e specs · a sibling track's
`execution/A/X-W9.md`). ⟨cmd⟩ same in `/Users/mkbabb/Programming/keyframes.js` → **2 rows, both
`??`** (the two delivered V letters). ⟨cmd⟩ `git show HEAD:…/KF-W8-census.md | cmp -` against the
pre-act copy → **identical to `fa2417d7`'s bytes**: the file carried **no uncommitted predecessor
work**. **Nothing inherited, nothing stashed, no dirty path outside the set touched**;
`scripts/dev/dev.sh` never opened.

#### Act 2 — the substrate and the sections, read whole

Spec read whole in slices (476 L / 263 KB): §Units row `b` (`:57`) · §Scope 2 (`:72`) · §Carry *The
ratified idiom* (`:193-208`) · §Rows `L-17` (`:243`), `ingest/cssom.ts` (`:255`), `B-16` (`:256`) ·
plus the sections those rows turn on: G5 (`:297-300`) · G6 (`:302-305`) · G7 (`:307-322`) ·
§Sequencing R-1 (`:397-403`) · §Rows `C-8` (`:228`) · §Bounds. Wave record read whole
(`docs/tranches/X/execution/B/KF-W8.md`, baseline + plan + unit `a`'s receipt). `COHESION.md` §0j and
every §0k+ addendum read to the file end — ⟨cmd⟩ `grep -n 'KF\.W8\|KF-W8' docs/tranches/X/COHESION.md`
→ **2 hits, both `§0o ESC-KFW2-1`** (`:1105`/`:1106`), which lands at **unit d**, not here. **No
§0k+ ruling binds unit b.**

**Substrate**: ⟨cmd⟩ `git rev-parse HEAD origin/master master` (kf) →
**`1fa98a5d8fa53cd6b408b3094195b9f8c12ab32f`** three times. Every figure re-derived there, double-run.

#### Act 3 — the ratification (census §6.0)

**KF.W8-I adopted WHOLE and unaltered.** The paragraph was written into the census **by command** —
⟨cmd⟩ `sed -n '195p' docs/tranches/X/keyframes/waves/KF-W8.md >> …/KF-W8-census.md` — so it is
byte-exact by construction, and the receipt re-proves it at the settled bytes: ⟨cmd⟩
`grep -Fxc "$(sed -n '195p' …/KF-W8.md)" …/KF-W8-census.md` → **1**. Two consequences ratified with
it: the idiom is **cited, never re-minted** (where a gate's falsifier and the idiom's literal
predicate disagree at a file, this unit records and rules no cure), and **a direction is not an act**
(a direction stated for a path no §Bounds row grants is an escalation, never a licence).

#### Act 4 — the nine banked colocation rows, re-derived at `1fa98a5d` (census §6.1–§6.2)

**Counting rules stated AT the receipt (R5-11)**: *consumer* = any importer, **static or dynamic**
(the import graph, never one regex's shape); *product consumer* = an importer under `demo/`, a test
importer being recorded beside and never setting a home (README:127-130 / L-20); prose, template
tags, CSS comments and **literal path strings in tooling** are named, not counted; **the nine** = the
seven banked id-clusters of the spec's own re-derivation sentence (`:197`) + the `AnimatedText`-stays
disposition + the `L-17` anchor (`:193`/§Rows `:243`) = **9**, with `C-8` carried **separately** as
the tenth (§Rows `:228` assigns its banked word to this unit).

| # | row | measured consumers | verdict | direction |
|---|---|---|---|---|
| 1 | **L-17** | 1 — `KeyframesEditor.vue:235` | CONFORMANT (below) | none — the container is the blessing |
| 2 | **KC-30** | 1 — `KeyframeCardList.vue:46` | CONVICTED (above) | **down** → `keyframes/components/` (f) |
| 3 | **N-11/m-15/L-8** | 1 product `TimelineTrack.vue:296` + 1 test `timeline-mount-keyboard.test.ts:28` | CONVICTED | **down** → `timeline/components/` + m-7 rename; **two** files repoint (f) |
| 4 | **KF-AT-26(c)/KF-HA-14** | 1 product `App.vue:163-164` (**dynamic**) + 1 test (dynamic) + 1 path string `scripts/gates/census.mjs:528` | CONVICTED | **beside** `demo/app/App.vue` (f) |
| 5 | **AnimatedText stays** | 1 — `EditorStartScreen.vue:137`, same dir | CONFORMANT | **no move** — discharged by staying |
| 6 | **KF-CB-37** | **4** across **3** dirs (`:133`·`:233`·`:181`·`:150`) | one-consumer clause does **not** bind; G6 convicts | **owner-named dir** `demo/components/CopyButton/CopyButton.vue` (f) |
| 7 | **m-4** | RibbonBar 1 — `ControlsPaneWrapper.vue:159`, same dir | RibbonBar CONFORMANT; **CPW CONVICTED** | one directory settle, rides M-4 — **spec input, zero bytes** (h) |
| 8 | **KF-AV-26** | 1 by construction | direction well-formed | **beside/below** `AnimationVisualizer.vue` — **no create grant** (h) |
| 9 | **R-10** | 1 by construction | CONFORMANT **and granted** | **beside** → `shell/groupShortcuts.ts` (g) |

**Three findings the re-derivation adds** (each measured, none acted on):

1. **m-4's banked clause REPRODUCES**, at a pair no prior reading tested. Banked
   (`registry/adjudicated/kf-RibbonBar.md:59`): *"CPW **D-m8/mi-1** (three homes; the directory named
   for the component doesn't contain it)"*. ⟨cmd⟩ `git ls-tree -r --name-only HEAD -- demo | grep -i
   'controlspanewrapper\|controls-pane'` → **5 files / 2 directories**:
   `transport/ControlsPaneWrapper/{useControlsLayout,usePaneHover,usePaneRegister}.ts` **and**
   `transport/controls-pane/{ControlsPaneWrapper.vue,ControlsPaneWrapper.css}`. **The directory named
   for the component does not contain it** — live, word for word. Stated **beside** unit `a`'s
   D-19-7 (E-3, unedited): that cell measured `controls-pane/`'s contents and is correct about them;
   the clause's subject at this substrate is the **other** directory, which its command did not
   reach.
2. **KF-AV-26's cited mirror does not exist at EITHER ref.** ⟨cmd⟩ `git ls-tree --name-only HEAD --
   demo/components/playback/` → 2 SFCs; ⟨cmd⟩ the same at **`81a56990`** → **the same two files**;
   `use*.ts` population **0** at both. The spec's *"mirroring the already-colocated `use*.ts`
   population"* had no referent at its own dated ref (E-3: recorded, never struck) — and the
   direction does not need it, resting on KF.W8-I's own clause instead.
3. **R-1's cited live idiom is short by one member at HEAD.** ⟨cmd⟩ `git ls-tree -r --name-only HEAD
   -- demo/components/instrument/transport/` → owner-named directories are
   `AnimationControlsGroup/` · `TransportDock/` · `ControlsPaneWrapper/` = **THREE**, where R-1 named
   four — **`KfPillTabs/` died with `KfPillTabs.vue`** in KF.W6's S-1/KPT-SUP-4 family. **The law
   stands and is applied as written** (`demo/components/CopyButton/CopyButton.vue`); a second dated
   observation is recorded for unit f — all three of those directories hold `use*.ts` children only,
   so no owner-named directory contains its own SFC today.

#### Act 5 — the two directions turned (census §6.3)

**G5 — direction: the parent moves DOWN; nothing else is a cure.** RED at **2** at HEAD (⟨cmd⟩
`git grep -cn 'from "\.\./[A-Z][A-Za-z]*\.vue"' HEAD -- demo` → `KeyframeCardList.vue:46` ·
`TimelineTrack.vue:296`); the spec's third member (`ChannelControls.vue:229` → `../KfPillTabs.vue`)
is **enumerated as discharged with its file**, never dropped. Ruled: cure by moving the imported
parent **down into the `components/` container the cluster already has**, specifier to `./`; **not**
by moving the child up, **not** by a re-export stub at the old path (the gate's own falsifier),
**not** by a specifier rewrite that leaves the file above. Pure-move commits; row 3 carries m-7's
rename and the test repoint in the same edit. **TURNED.**

**G7 — direction: leg (iv) is reached by SUBTRACTION from the directory, never by ADDITION to the
barrel.** ⟨cmd⟩ `git ls-tree --name-only HEAD -- demo/components/instrument/shell/ | grep -c '\.vue$'`
→ **7**; ⟨cmd⟩ `git show HEAD:…/shell/index.ts | grep -c '^export '` → **3** (KF.W6's R4-1 atomic
commit landed). The wave's **one owed act** is row 4's `HeroAurora` move; **no export added, none
deleted, no byte of `shell/index.ts` written by any seat of this wave** (§Bounds' barrel row is
STRUCK to NO ACCESS). **TURNED.**

⟨**the one disagreement measured and NOT cured — `TypingDots` (record F-2)**⟩ two importers:
`EditorStartScreen.vue:138` (product, directory-internal) and
`test/demo/instrument/typing-dots-engine-seam.test.ts:39` (KF.W4 create, **outside** `shell/`).
Literally, KF.W8-I's *external = an importing module outside that directory* makes it externally
consumed and the *"exactly"* word would demand an export; **G7's own falsifier names this very file
as internal-only and fails a green reached by adding that export**. Two clauses of the wave's own
instrument disagree at one file. **Direction ruled: no export is added.** The residual predicate
conflict is **recorded, not resolved by widening** — unit f's, with G7, exactly as F-2 books it.

#### Act 6 — the two inbound riders, applied with their blockers (census §6.4)

**(iii) `ingest/cssom.ts`** — ⟨cmd⟩ `git show HEAD:src/animation/ingest/cssom.ts | wc -l` → **499**
(the spec's basis was 466: it **grew by 33 and was not split**). ⟨cmd⟩ `git grep -nE 'from
"[^"]*ingest/cssom"|from "\./cssom"' HEAD -- src test demo` → **two consumers, both inside the
module's own directory** (`ingest/adopt.ts:48/:57/:62` · `ingest/index.ts:13/:18`); **nothing outside
`src/animation/ingest/` reaches it.** **Verdict: CONFORMANT AS SITED — the colocation rules NO
MOVE.** Blockers: the **KF.W5 god-module split has not landed**; the **KF.W2 façade decision has** —
⟨cmd⟩ `git ls-tree -r --name-only HEAD -- src/animation/compile | grep facade` →
`src/animation/compile/parse-facade.ts`. Per the row's own words, if either upstream ruling dissolves
or relocates the module the row closes with that note and is **not re-minted as a move**.

**(iv) B-16's conditional shadow-name** — arming condition: *iff KF.W0's OP-4 locus probe resolves
demo-side*. KF.W0 ran the probe and **stated no home**, leaving B-16 to arm on the measurement.
Re-run here: ⟨cmd⟩ `git grep -c 'parseAnimationCSS' HEAD -- src` → **exit 1, ZERO**; `… -- demo` →
**3 files**, declaration at `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:26`.
**The probe resolves DEMO-SIDE → KF.W5's pre-stated disposition (ii) holds** (*"a demo row and a
net-new shadow-name finding routed to KF.W8's colocation decision"*) → **THE RIDER IS ARMED BY
MEASUREMENT.** Colocation applied: **two consumers in two different clusters** —
`keyframes/composables/useKeyframeOps.ts:7` (in-cluster) and `timeline/utils/timelineEngine.ts:11`
(`../../keyframes/utils/parseAnimationCSS`, a **cross-cluster reach into another cluster's private
`utils/`**); the one-consumer clause does not bind, the **cluster-root clause** convicts the siting,
and the direction is the **existing** owner-neutral home the tree already has, `demo/utils/` (9
files) — never a new `shared/`, never a wrapper. Shadow-name half: the demo module carries a
library-level operation's name while the library publishes none, and its body deep-reaches `@src/` at
`:7`. **BLOCKERS — and they are why NO BYTE LANDS**: §Bounds grants exactly
`keyframes/utils/parseAnimationCSS.ts (:7) | modify-carve` (one line, unit c's) and **no move, no
rename** — executing the direction would be a write outside the writable set, an **ESCALATION, not a
cure**; the row limits what may land here to the naming/colocation half; the remainder touches
KF.W3's seam, which this wave may not pre-empt. **Disposition: ARMED · DIRECTION RULED · UNEXECUTED
BY BOUNDS.**

**Neither rider gates this unit** (§State COMPLETABLE; the LOCK is honoured as written).

#### Act 7 — C-8's banked word (census §6.5)

§Rows `:228` assigns the banked **colocation** word to unit b. ⟨cmd⟩ `git grep -n
'KeyframesStringControls' HEAD -- demo test` → `channel-controls/ChannelControls.vue:206` (dynamic,
**cross-cluster**) · `demo/app/dock/ChromeDock.vue:267` (a `void import(…)` prefetch, a third
directory) · `keyframes/index.ts:8-9` (a **dead-barrel** member, G4 clause 2). **More than one
directory consumes it**, so the idiom's second clause puts exactly that at the cluster root:
**CONFORMANT AS SITED, no move.** What remains at the file is unit c's `@src/` repoint and unit e's
barrel ruling — named so neither is re-read as a colocation defect.

#### Act 8 — WRITE-THEN-MEASURE + SELF-COUNT

⟨cmd⟩ a **21-figure double-run harness** over the settled bytes → **`SAME` on all twenty-one**
(pasted at census §6.7). **SELF-COUNT**, read back from the settled bytes with each counting rule
stated at the figure: §6.2 table rows **9** (numbered 1…9, no gap) · `§6.0`…`§6.7` = **8**
subsections · §6.6 residual items **6** · harness figures **21** across **11** lines (the 22nd
`SAME |` is the `run()` echo string) · `⟨cmd⟩` receipts at §6.0–§6.6 **19** (the self-count
subsection excluded from its own count, so the figure cannot move when it is written) · the ratified
paragraph present **once** and **byte-identical** to `KF-W8.md:195`.
**Unit `a`'s §0–§5 are unedited**: ⟨cmd⟩ `git diff --numstat` → **`364  0`** — insertions only, **0
deletions** — and ⟨cmd⟩ `cmp` of the file's first **637** lines against the pre-act copy (itself
`cmp`-equal to `git show fa2417d7:…`) → **identical**. ⟨**WRITE-THEN-MEASURE, applied to this seat's
own receipt**: the first print of the numstat figure was `358  0`, taken **before** two self-count
corrections were written; it was re-measured and **replaced, not carried** — and the two corrected
figures (the harness's 21-across-11, the numstat) were each fixed by a **line-count-preserving** edit
so the published number could not move itself again.⟩

#### Commits

| hash | meaning | pathspec |
|---|---|---|
| `ac251a38` | census **§6** — KF.W8-I ratified, the nine re-derived, G5/G7 directions, the two riders | `docs/tranches/X/keyframes/waves/KF-W8-census.md` |
| *(this record)* | unit `b` receipt | `docs/tranches/X/execution/B/KF-W8.md` |

⟨cmd⟩ `git show --stat ac251a38` → **1 file changed, 364 insertions(+)** — **zero paths outside the
writable set staged**. Pathspec on the commit itself, `--no-verify --quiet`, `-- <the same exact
paths>`. No `git add -A`, no `-u`, no `commit -a`, no reset, no stash, no `LEDGER.md` edit (the close
seat's).

#### Gate readings BEFORE → AFTER

| gate | before | after |
|---|---|---|
| **direction of G5** | RED at 2 with **no ruled direction**: the gate's grep is satisfiable by a stub or by moving the child up, both of which fail KF.W8-I | **TURNED** — the parent moves **down** into the existing `components/` container, specifier to `./`, **no stub**, pure-move; the discharged third member enumerated, not dropped |
| **direction of G7** | leg (iv) had two live cure-shapes (add exports vs. move the SFC out) and the spec's own two clauses disagreed at `TypingDots` | **TURNED** — green by **subtraction** (row 4's `HeroAurora` move), **no export added or deleted, no barrel byte**; the `TypingDots` predicate conflict recorded and handed to f with G7, cured by no widening here |

#### Residuals — measured, handed on, none cured here

1. **Row 3's test importer** `test/demo/instrument/timeline-mount-keyboard.test.ts:28` — the move
   repoints **two** files and that path has **no §Bounds row**. **Unit f** (independently agrees with
   unit `a`'s residual 3).
2. **Row 4's tooling path string** `scripts/gates/census.mjs:528` — a KF.W4-owned gate script holds
   `HeroAurora.vue`'s literal path. **Unit f, escalation-shaped** (agrees with unit `a`'s residual 4).
3. **Row 8 has no landing grant** — §Bounds gives unit h a `modify-carve` and **no `create`** for the
   extracted composable, where R-10's twin is granted explicitly. **Unit h's escalation**; the
   direction is ruled, so the escalation is about the grant, not the shape.
4. **G7's `TypingDots` predicate conflict** — the barrel clause's literal *external* vs. the gate's
   falsifier. **Unit f, with G7.**
5. **Rider (iv) is ARMED and ungranted** — direction ruled, act needs a §Bounds widening this wave
   does not hold. For the close seat and `KF-W10 §6.D` (anchor-only).
6. **m-4's settle is specified, not executed** — it rides M-4, G15 spec input only, **zero bytes**.

**Escalations raised by this unit: NONE.** Its writable set was sufficient, both directions are
turned, and every out-of-bounds fact is **recorded with its owner** rather than acted on. **No
product byte, no widened grant, no `LEDGER.md` edit.**

### c

**SERVED MODEL**: `claude-opus-5[1m]`. **Date**: 2026-09-18. **Unit**: `c` — deep-import
extirpation + demo-side repoint, after KF.W5's surface ruling. **Gates**: **G1 · G2**.
**Writable set**: six keyframes.js paths (`demo/utils/helpers.ts` · `demo/utils/keyframeSelector.ts` ·
`…/keyframes/composables/useKeyframeOps.ts` · `…/keyframes/utils/parseAnimationCSS.ts` ·
`…/timeline/utils/timelineEngine.ts` · `demo/components/playback/AnimationVisualizer.vue`, import
line only). **Status: PARTIAL — six of the eight `@src/` statements extirpated, TWO ESCALATED, both
gates honest-RED at close.**

#### Act 1 — crash-recovery sweep (STANDING LAW), before any other act

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/keyframes.js` → **2 rows, both `??`**
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-…` · `…-2026-07-27-…`, our own delivered
letters), **neither inside this unit's writable set**; ⟨cmd⟩ same in `/Users/mkbabb/Programming/value.js`
→ **15 rows**, **none** a KF.W8 path. ⟨cmd⟩ `git rev-parse HEAD origin/master master` (kf) →
**`1fa98a5d8fa53cd6b408b3094195b9f8c12ab32f`** three times — the wave's open substrate, unmoved.
**No killed predecessor seat's partial work exists on this unit: nothing inherited, nothing stashed,
no dirty path outside the set touched**; `scripts/dev/dev.sh` never opened.

#### Act 2 — the sections, read whole, and the one measurement that decides the unit

Spec read in slices (476 L / 263 KB): §Units row `c` (`:58`) · §Scope 3 (`:73`) · G1 (`:262-269`) ·
G2 (`:271-275`) · §Rows `KF-CE-12` · `KF-CE-42` · `KF-AV-8` · `KF-AV-35` · `KF-KE-15` · `C-8` ·
`C-12` (`:221-229`) · §Bounds deep-import row (`:103`) · plus G3 (`:277-283`, unit d's — read because
it re-words this unit's `namedSelectorToFraction` finding) and §State `Opens after`. Record read whole
(baseline + plan + units `a` and `b`). `COHESION.md` §0j + every §0k+ addendum read to the file end —
⟨cmd⟩ `grep -n 'KF\.W8\|KF-W8' docs/tranches/X/COHESION.md` → **2 hits, both `§0o ESC-KFW2-1`**
(`:1105`/`:1106`), which is **unit d's**. **No §0k+ ruling binds unit c.**

**THE DECIDING MEASUREMENT — where the published door actually is.** KF.W5's S-3 block sits at
`public.ts:145-168` and lands `export { cssIdent, reverseCSSTime, serializeTimingFunction } from
"./compile/emit";` at **`:168`**, declared *"HEAVY surface only, deliberately"*. `index.ts` re-exports
`./public` **as types only** (⟨cmd⟩ `git show HEAD:src/animation/index.ts | grep -n 'from "./public"'`
→ `export type * from "./public";`), so the door a demo module actually turns is the **resolved engine
surface**: ⟨cmd⟩ `git grep -n 'reverseCSSTime\|serializeTimingFunction' HEAD -- src/animation/load-engine.ts`
→ `:62` · `:63` (the re-export roster) and `:118` · `:120` (the `AnimationEngine` interface fields).
**Both call sites already stood inside an awaited `loadAnimationEngine()`** — `useKeyframeOps.ts:62-63`
and `parseAnimationCSS.ts:27` — so the repoint is a destructure, not a new edge, and the demo's own
written law (`demo/kf-engine.ts:4-11`, the ED-3 dogfood inversion) is satisfied rather than worked
around.

**THE SECOND DECIDING MEASUREMENT — the five KF.W5 did not publish are ALL LIVE IN `src/`, so
"relocation" can only mean the demo authors its own body.** ⟨cmd⟩ `git grep -n '<name>' HEAD -- src`,
one run per name, **file counts**: `camelCaseToHyphen` **5** · `serializeCssValue` **9** ·
`convertToPixels` **2** · `namedSelectorToFraction` **4** · `bumpLayoutEpoch` **1**. None is dead on
the src tree, so none can *move* the way `demo/utils/helpers.ts:1-8`'s own precedent moved (*"the
library's encapsulation sweep (V.W6) measured these dead on the src tree and deleted them"*). The
route G1's *Blocked by* clause leaves — **relocation, never re-specifying** — is therefore executed as
**the demo owning the operation it needs**, at the concentrator, with the library body untouched and
named in every docblock. **Zero library bytes were written by this unit**: ⟨cmd⟩
`git diff --stat 1fa98a5d..HEAD -- src` → **empty output**.

#### Act 3 — the four landings

| # | commit | act | meaning |
|---|---|---|---|
| 1 | **`0d456cff`** | `useKeyframeOps.ts` `:1` deleted, `reverseCSSTime` taken off the `loadAnimationEngine()` destructure at `:62`; `parseAnimationCSS.ts` `:7` deleted, `serializeTimingFunction` taken off the destructure at `:27` | **KF-KE-15 / C-8's repoint consequence** — the two names KF.W5 published, through the door it opened. Pure repoint; **2 files changed, 3 insertions(+), 4 deletions(-)** |
| 2 | **`1e2e0331`** | `helpers.ts` `:9` deleted; the `ch` basis re-homed as `chInPixels` | **KF-AV-8's `resolve/browser` arm, as far as bounds reach**. `convertPixelsToCh` asked `convertToPixels` for exactly one unit; the demo now owns that metric, mirroring `resolve/browser.ts`'s own `ch` arm (half-em over computed `font-size`, 16px fallback) so the measurement is unchanged. **1 file, 23(+) 3(−)** |
| 3 | **`b0d378b0`** | `timelineEngine.ts` `:1` and `:16` deleted and collapsed into ONE `@utils/helpers` import; `camelCaseToHyphen` + `serializeCssValue` re-homed to the concentrator | **KF-CE-12's `compile/emit` arm**. `camelCaseToHyphen` lands beside the inverse the demo already owned; the serializer is written over value.js's **published** `CssValue` + `serializeCssColor`, not over the emitter's copy. **2 files, 44(+) 3(−)** |
| 4 | **`cdb31643`** | `keyframeSelector.ts` `:5` deleted; the four named-phase spans read demo-side; `selectorPercent` re-cut | **C-12 / G1's `compile/selector` arm**. **1 file, 27(+) 5(−)** |

**Commit discipline**: pathspec on the commit itself, `--no-verify --quiet`, `-- <the same exact
paths>`; **no `git add -A`, no `-u`, no `commit -a`, no reset, no stash, no force**. ⟨cmd⟩
`git diff --stat 1fa98a5d..HEAD` → **5 files changed, 97 insertions(+), 15 deletions(-)**, every one
inside the writable set. **`helpers.ts` was written in TWO passes on purpose** — KF-AV-8's arm is
locked to ONE commit, and staging half a file's hunks is not available to a pathspec commit, so the
`resolve/browser` cure landed and committed before the `compile/emit` cure was written into the same
file. No partial staging, no interactive add.

**One cure made better than its source, stated rather than smuggled.** `keyframeSelector.ts`'s map is
keyed off value.js's **published** selector union — ⟨cmd⟩ `sed -n '42,44p' /Users/mkbabb/Programming/value.js/src/css/types.ts`
→ `| Readonly<{ kind: "named"; name: "entry" | "exit" | "cover" | "contain"; offset?: number }>` —
so the demo's map is **total by construction**. The library body's two throw branches
(`selector.kind !== "named"`; `PHASE_FRACTIONS[name] === undefined`) are exactly the two cases that
published type forbids: the first is unreachable because `selectorPercent` branches on `kind` first,
and the second becomes a **compile** failure here if value.js ever adds a fifth phase, instead of a
runtime throw. Behaviour is identical on every input the type admits. The library's
`internal/scroll-phases.ts` stays the engine's single source for compilation and the mirror carries
its symbol name, so ⟨cmd⟩ `git grep -n 'PHASE_FRACTIONS' HEAD` prints **both** sides — the duplication
is visible to the next census, not hidden from it.

#### Act 4 — gates, run at the settled bytes, double-run

| gate | BEFORE (record baseline @ `1fa98a5d`) | AFTER (@ `cdb31643`, run 1 = run 2) | verdict |
|---|---|---|---|
| **G1 c1** — zero `@src/` in `demo/` | **8 statements / 7 files** | **2 statements / 2 files** — ⟨cmd⟩ `git grep -n 'from "@src/' HEAD -- demo` → `timeline/KeyframeTimeline.vue:363` (`serializeCssValue`) · `playback/AnimationVisualizer.vue:65` (`bumpLayoutEpoch`) | **RED** — and the two survivors are **exactly the two escalations below**; six of eight cured |
| **G1 c2** — no library-PRIVATE module reached | 4 reached modules, **4 of 4 private** | **2 reached** — ⟨cmd⟩ `git grep -hoE '"@src/[^"]+"' HEAD -- demo \| sort -u` → `compile/emit/css-text` · `resolve/browser`. `resolve/browser` → **0 hits / exit 1** at the four published entries; `compile/emit/css-text` → **1 hit, `public.ts:157`**, which is **PROSE inside the S-3 comment** (*"they stay in `compile/emit/css-text.ts`"*) — the baseline's own recorded false positive, **recorded not counted** | **RED** — denominator halved with clause 1, as the gate's own text says it must |
| **G2 c1** — every consumed symbol published | **5 of 7 unpublished** | **2 of 4 unpublished**. Published and consumed: `reverseCSSTime` (`public.ts:168` · `load-engine.ts:62`/`:118`) · `serializeTimingFunction` (`:168` · `:63`/`:120`). Unpublished and still consumed: `serializeCssValue` · `bumpLayoutEpoch`. **No longer library-consumed at all**: `camelCaseToHyphen` · `namedSelectorToFraction` (⟨cmd⟩ `git grep -c 'namedSelectorToFraction' HEAD -- demo` → **exit 1, ZERO**) · `convertToPixels` | **RED** |
| **G2 c2** — narrowness (`export *` = 0) | GREEN-BEFORE-CURE (spec-declared) | ⟨cmd⟩ `git show HEAD:src/animation/index.ts \| grep -c 'export \*'` → **0** (run 1 = run 2) | **STILL GREEN** — and it could not have moved: this unit wrote **zero** library bytes |

**Both falsifiers armed and clean.** G1 clause 2's — *a demo re-export shim that forwards the same
module passes clause 1 and fails clause 2*: ⟨cmd⟩ `git grep -n 'export .* from "@src/' HEAD -- demo`
→ **exit 1**. Every re-home is a **body**, never a forward. G2's — *a symbol published by widening a
barrel fails clause 2*: no export was added to any published entry, `export *` stays **0**, and
`git diff --stat … -- src` is empty.

**Tree health at the settled bytes** (none of these is a gate this unit owns; each is the
no-regression floor a repoint must clear): ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json` → **54
errors before, 54 after**, the diff of the two error sets being **one pre-existing
`useKeyframeOps.ts` TS2322 at `(80,13)` where it was `(81,13)`** — the deleted import line, nothing
else. ⟨cmd⟩ `npx vitest run` → **147 passed \| 5 skipped (152) files · 1518 passed \| 3 expected fail
\| 14 skipped**; ⟨cmd⟩ `npx vitest run --project demo` → **35/35 files · 262/262 tests**, run twice.
⟨cmd⟩ `npx eslint <the five files>` → **clean**. ⟨cmd⟩ `node scripts/gates/structure/index.mjs` →
**exit 0, PASS**. ⟨cmd⟩ `npx depcruise --config .dependency-cruiser.cjs src demo` → **4 violations,
all four the pre-existing `demo/scenes/cube/orbital-drag/` cycles**, none naming a file of this unit
(this unit removed import edges and added none between demo modules that did not already exist).

#### Act 5 — E13 Step-0, the four-path mail sweep at this seat's clock

Swept read-only at **20:30 EDT**, delta against the wave-open sweep (20:0x), classification taken from
each row's **Status cell**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded**.
(1) `docs/tranches/V/coordination/` — newest non-self `…-ADDENDUM-A9.md` **19:00** = **O-31**, rowed;
`INBOX.md`'s own 20:26 mtime is **Track D's X.P.W3 RESUME-5 sweep line**, a sibling seat's append, not
a letter. (2) `../glass-ui/docs/tranches/BK/coordination/` — newest `glass-outbound-2026-09-18-valuejs-o26-reply.md`
**17:18** = **I-35**, *READ + CONSUMED WHOLE*. (3) `../keyframes.js/docs/tranches/V/coordination/` —
newest **Sep 17 19:08**, unmoved. (4) atlas `P/coordination/` — newest **Aug 3 15:01**, unmoved.
**0 unrowed · 0 UNREAD addressed to this unit's scope**; the three live UNREAD cells (I-32 · I-33 ·
I-34) each route at their own Routing cell to **X-W0.j**, and not one names a keyframes byte.
**`INBOX.md` not edited** (the close seat's line, and there is nothing to row). This wave's outbound
obligation is **NEGATIVE** by its own §Sequencing, and this unit wrote **no** glass-ui byte and sent
no letter.

#### ESCALATIONS — two, each a runbook §5.7 trigger (*"any write outside §Bounds"*), neither an implementer's decision

**ESC-c1 · `demo/components/instrument/timeline/KeyframeTimeline.vue:363` — G1 clause 1's eighth
statement has NO §Bounds row.** Record finding **F-1**, reproduced at this seat by command:
⟨cmd⟩ `grep -n '^## ' docs/tranches/X/keyframes/waves/KF-W8.md` → §Bounds spans **`:81-139`**;
⟨cmd⟩ `awk 'NR>=81 && NR<=139' … | grep -c 'KeyframeTimeline'` → **0**, while ⟨cmd⟩
`grep -c 'KeyframeTimeline' KF-W8.md` → **8** (§Carry A-2/A-3, §Rows C-12 · L-19/C-14 · N-11, §Gates
G15's RibbonBar measurements) — **the file is named five ways and bounded nowhere.** It did not exist
at the spec's `81a56990`. **Not touched.** Consequence, stated because it is the cost of the gap: the
demo now holds two ways to serialize a `CssValue` — its own at `demo/utils/helpers.ts` and the
library-private one this one statement still reaches — and the second retires with **one specifier
line** the moment a seat is granted this file. **Owner**: a §Bounds widening by dated addendum-beside
(E-3), or the successor register at `KF-W10 §6.D` (anchor-only). **This unit may not choose**, and a
seat that edited the file to reach `0` would have bought the gate with an out-of-bounds write —
exactly what G8's falsifier calls *"an out-of-bounds green"*.

**ESC-c2 · `demo/components/playback/AnimationVisualizer.vue:65` — `bumpLayoutEpoch` has no lawful
cure inside ANY grant this wave holds.** The import line **is** bounded (§Bounds deep-import row,
spec `:45` → HEAD `:65`), so this is not a bounds gap but a **cure gap**, and all three routes are
closed by measurement:

1. **Publication is KF.W5's and KF.W5 closed without it.** ⟨cmd⟩ `git grep -n 'epoch' HEAD --
   src/animation/index.ts src/animation/public.ts src/animation/load-engine.ts
   src/animation/engine/index.ts` → **∅** (record finding **F-6**, re-run here). `src/` is not in this
   unit's writable set, so publishing it is a write outside §Bounds.
2. **Relocation is IMPOSSIBLE at the bytes, not merely undesirable.** ⟨cmd⟩ `git show
   HEAD:src/animation/resolve/browser.ts | sed -n '6,24p'` → `let layoutEpoch = 0;` ·
   `let browserScalarCache = new WeakMap<…>` · `export const bumpLayoutEpoch = (): number => {
   browserScalarCache = new WeakMap(); return ++layoutEpoch; };` · and, at `:22-23`, the module-eval
   `window.addEventListener("resize", bumpLayoutEpoch, { passive: true })`. The symbol is **not a
   function over its arguments — it is a mutation of module-private state the library alone holds.**
   A demo-authored copy would bump a demo-local counter and **never evict the library's
   `browserScalarCache`**, which is a silent behaviour regression wearing a green gate: the ball would
   serve the stale pre-resize target the wire at `:99` exists to prevent. That is the masking-fallback
   class the seat law forbids, so it was not written.
3. **Deleting the wire is unit h's grant and is a functional regression besides.** §Bounds carries
   `AnimationVisualizer.vue (:79)` as its **own** row (minted at repair round 4, R4-5(a)), and the
   unit plan assigns it to **h** (KF-AV-9's demo half — wire relocation + debounce). This unit's grant
   on this file is **the import line only**.

**Consequence for the family lock**: §Rows books KF-AV-8's *"three-site extirpation = ONE commit"*,
bundled with KF-AV-9's epoch-surface decision. **That bundle was broken upstream, not here** — the
epoch-surface decision did not land at KF.W5. The arm that could land did, whole, in `1e2e0331`; the
AV site is named in that commit's own message so the split is legible from the tree, not only from
this record. **Owner**: the epoch surface is a **library-surface design question** the bank already
routed that way (`kf-AnimationVisualizer.md:50`, verbatim of record: *"the eviction API is
global-by-construction (**library-side — no scoped bump exists**)"*) — a KF.W5 addendum-beside or the
`KF-W10 §6.D` register, taken **with** unit h's debounce/scoping half, since one surface decision owns
both.

#### Residuals — measured, handed on, none cured here

1. **The demo holds two `CssValue` serializers** until ESC-c1 is granted (helpers.ts's own; the
   library-private one at `KeyframeTimeline.vue:363`). One specifier line closes it.
2. **`demo/utils/keyframeSelector.ts` now mirrors `internal/scroll-phases.ts`'s four spans.** The
   engine keeps the single source for compilation; the demo owns its timeline reading. The true cure
   is a published door onto the phase mapping — **KF.W5's class**, booked for the close seat and
   `KF-W10 §6.D` (anchor-only). Both sides carry the symbol name `PHASE_FRACTIONS` so the pair is one
   `git grep` apart.
3. **Coordinates moved in two files unit `d` is granted.** `timelineEngine.ts` lost two import lines,
   so its `@utils/keyframeSelector` specifier is now at **`:13-16`** (was `:15`), and
   `parseAnimationCSS.ts`'s body shifted by one. Unit `a`'s residual 5 already binds every seat to
   resolve grants **by subject**; this receipt names the two files that moved so no seat executes from
   a numeral.
4. **`useKeyframeOps.ts`'s pre-existing TS2322 at `(80,13)`** (`stored.timingFunction = options.timingFunction`,
   `string` vs the `Easing` union) is **untouched and unrelated** — it was `(81,13)` before this unit
   and is one of the 54 the tree already carried.
5. **Nothing was pushed.** The unit plan gives `push kf origin HEAD` to the close seat `i`; local
   `master` is **4 commits ahead** of `origin/master` and the four seats after this one share the
   checkout.

#### SELF-COUNT, read back from the settled bytes

**Counting rules stated AT the receipt.** ⟨cmd⟩ `grep -c '^#### Act'` → **5**, numbered 1…5, no gap.
⟨cmd⟩ `grep -c '^\*\*ESC-c'` → **2**. **Residuals = 5**, and the rule matters: a bare
⟨cmd⟩ `grep -cE '^[0-9]\. \*\*'` over this receipt returns **8**, because **ESC-c2's three closed
routes are a numbered list too** — the residual count is the items under §Residuals alone
(8 − 3 = 5, numbered 1…5, no gap), stated here so the figure can be re-derived rather than trusted.
Commits **4** — ⟨cmd⟩ `git log --oneline 1fa98a5d..HEAD | wc -l` → **4**, each hash
printed above appearing in `git log` at that ref · files changed **5** of the **6** granted
(`AnimationVisualizer.vue` untouched, by ESC-c2) · `@src/` statements **8 → 2**, double-run ·
worktree at close ⟨cmd⟩ `git status --porcelain` → **2 rows, both the same two `??` letters this unit
opened on**. Every figure in this receipt was re-run at `cdb31643` after the last byte landed;
**run 1 = run 2 on all eleven harness figures** (statements · files · reached modules · private-of-
reached · `export *` · the `@src` `camelCaseToHyphen` count · `namedSelectorToFraction` in demo ·
`helpers.ts` 88 L · `keyframeSelector.ts` 53 L · unit commits · worktree rows).
