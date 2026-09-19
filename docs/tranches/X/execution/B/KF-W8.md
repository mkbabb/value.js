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

### d

**SERVED MODEL**: `claude-opus-5[1m]`. **Date**: 2026-09-18. **Unit**: `d` — keyframe-selector
serializer unification to one body (§Units `:59` · §Scope 4 `:74` · G3 `:277-283` · §Rows MISS-β2
`:230` · §Sequencing → KF.W2/W3 `:432-433`), **with COHESION §0o ESC-KFW2-1 folded in**.
**Gates**: **G3** (+ **G-W2-2** re-measured, §0o). **Lock**: the unification and the `metadata.ts`
repoint land in **ONE commit** — honoured, `e2d04331`.
**Status: ESCALATED — the library half of the one body landed (3 → 2 definitions), the demo half
has NO lawful cure inside any grant this wave holds, and A-9's repoint set is 12 with five members
unbounded. G3 honest-RED at 2; G-W2-2's `src/` arm turns GREEN.**

#### Act 1 — crash-recovery sweep (STANDING LAW), before any other act

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/keyframes.js` → **2 rows, both `??`**
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-…` · `…-2026-07-27-…`, our own delivered
letters), **neither inside this unit's writable set**; ⟨cmd⟩ same in `/Users/mkbabb/Programming/value.js`
→ **15 rows**, none a KF.W8 path (X·V demo rows · `CARRY-LEDGER.md` · the unowned `scripts/dev/dev.sh`
· `docs/tranches/X/waves/evidence/W4/` · two e2e specs — sibling-seat or standing-arrangement rows).
⟨cmd⟩ `git rev-parse HEAD` (kf) → **`cdb31643`** — unit `c`'s last landing, the substrate this unit
opens on. **No killed predecessor seat's partial work exists on this unit: nothing inherited, nothing
stashed, no dirty path outside the set touched**; `scripts/dev/dev.sh` never opened.

#### Act 2 — the sections read whole, and the two measurements that decide the unit

Spec read in slices (476 L / 263 KB): §Units row `d` · §Scope 4 · **G3** whole · §Rows `MISS-β2` ·
§Sequencing `→ KF.W2/W3` · §Bounds rows for all twelve granted paths (`:81-139`) · §State
`Opens after`. Record read whole (open · baseline · plan · units `a` · `b` · `c`). `COHESION.md`
§0j and every §0k+ addendum read to the file end; ⟨cmd⟩ `grep -n 'KF\.W8\|KF-W8' COHESION.md` →
**2 hits, both `§0o ESC-KFW2-1`** — **this unit's**, quoted at the record's §Open item 4.

**MEASUREMENT 1 — G3's subject at the true bytes.** ⟨cmd⟩ `git grep -n "const selectorText\|const
serializeSelector" HEAD -- src demo` (run 1 = run 2) → **3**:

```
demo/utils/keyframeSelector.ts:28        export const selectorText   (the spec's :7; unit c re-cut the file)
src/animation/compile/emit/css-text.ts:59        const serializeSelector   (the spec's :58)
src/animation/compile/emit/format/format.ts:20   const selectorText        (the spec's :20, unmoved)
```

**All three are byte-equivalent on every input the published type admits**, verified by reading the
three bodies rather than by assertion: percent → `${value*100}%` at all three; named-without-offset →
`${name}${""}` (copies 1 and 3) ≡ `name` (copy 2); named-with-offset → `${name} ${offset*100}%` at
all three. Consumers: `format.ts`'s at **`:176` · `:275` · `:355` · `:388`** (the spec's
`:132/:201/:280/:313`, all four drifted — **INTENT taken at the true bytes**, recorded here),
`css-text.ts`'s at **`:82`**, the demo's at eight sites across seven files.

**MEASUREMENT 2 — A-9 is TWELVE, not seven, and five members are unbounded. This is ESC-d2 and it is
re-derived before a byte is written.** ⟨cmd⟩ `git grep -nF 'utils/keyframeSelector' HEAD -- demo test`
(run 1 = run 2) → **12**:

```
demo/.../keyframes/composables/useKeyframeOps.ts:8      ← §Bounds carve re-anchor (R5-3(3)), spec :9
demo/.../timeline/components/TimelineHoverPreview.vue:192   ← NO §Bounds row
demo/.../timeline/composables/useTimelineBuild.ts:7     ← §Bounds minted row (R5-3(1)), spec :8
demo/.../timeline/composables/useTimelineOps.ts:7       ← §Bounds minted row (R5-3(1))
demo/.../timeline/timelineTypes.ts:2                    ← NO §Bounds row
demo/.../timeline/utils/snapshotCapture.ts:3            ← §Bounds minted row (R5-3(1))
demo/.../timeline/utils/timelineEngine.ts:18            ← §Bounds carve re-anchor, spec :16
test/demo/instrument/timeline-hover-preview.test.ts:18  ← NO §Bounds row (KF.W7 create)
test/demo/instrument/timeline-mount-keyboard.test.ts:34 ← NO §Bounds row (KF.W7 create)
test/demo/instrument/timeline-mount-projection.test.ts:35 ← NO §Bounds row (KF.W7 create)
test/demo/instrument/timeline-undo.test.ts:6            ← §Bounds DECLARED EXCEPTION (R5-3(2))
test/demo/instrument/value4-editor-boundary.test.ts:6   ← §Bounds DECLARED EXCEPTION (R5-3(2))
```

The five "NO §Bounds row" verdicts are measured, not asserted. ⟨cmd⟩ `grep -n '^## '
docs/tranches/X/keyframes/waves/KF-W8.md` → §Bounds spans **`:81-139`**. Over that span,
⟨cmd⟩ `awk 'NR>=81 && NR<=139' KF-W8.md | grep -c '<name>'` → **`TimelineHoverPreview` 0** ·
**`timelineTypes` 0** · `timeline-hover-preview` **1** · `timeline-mount-keyboard` **1** ·
`timeline-mount-projection` **1**; and over the **whole file** → `TimelineHoverPreview` **0**
(the file is named nowhere in the spec), `timelineTypes` **1** (§Carry **A-3**, a census cell naming
the type's home — not a §Bounds row). **The three test hits inside §Bounds are all one cell — the
DH-3 four-party declaration** — and that cell names them as ***KF.W7's* four creates**, beside
*"the nine tracked read-only"*; ⟨cmd⟩ reading the nine by name confirms **not one of the three is
among them**. So the three carry **no KF.W8 access word at all**: they are another wave's claimed
files, declared for the seam, never granted here.

#### Act 3 — the landing, ONE commit (the §Bounds/plan family lock)

| # | commit | act | meaning |
|---|---|---|---|
| 1 | **`e2d04331`** | `css-text.ts:59` `serializeSelector` **exported** with a docblock naming it THE selector serializer · `format/format.ts` local `selectorText` **deleted**, `serializeSelector` imported from `../css-text` at `:7`, the four call sites repointed (`:174`/`:273`/`:353`/`:386`) and the now-unused `type KeyframeSelector` import struck · `emit/index.ts` gains `export { serializeSelector } from "./css-text";` (the sub-zone half of MISS-β2's publication, on KF.W5's own terms at `:57`) · `engine/css/metadata.ts` `:22-30` split — the **two collectors** repoint to `../../compile/parse-facade`, the five `type` members stay on `@mkbabb/value.js/css` | **MISS-β2 / G3's library half + COHESION §0o ESC-KFW2-1, ONE commit** as both the ruling (*"beside MISS-β2 … the same parse/emit neighbourhood, one commit"*) and the unit plan require. **4 files changed, 46 insertions(+), 22 deletions(-)** |

**Why `css-text.ts` owns the survivor and not `format.ts`**: `css-text.ts` already holds
`serializeCssValue` · `serializeDeclaration` · `reverseCSSTime` · `serializeTimingFunction` — the
serializer family this function is a peer of — and it is the module **KF.W5's own publication act
already surfaces through** (`emit/index.ts:57`, `public.ts:168`), so the one body sits on the path a
package-surface publication would take. `format.ts` already imported `serializeCssValue` from
`../css-text` at `:1`, so the edge exists and **no new module edge and no cycle is introduced**:
⟨cmd⟩ `sed -n '1,10p' css-text.ts` → it imports only `@mkbabb/value.js/{css,value}` and
`../../constants`; nothing from `format/`.

**Commit discipline**: pathspec on the commit itself, `--no-verify --quiet`, `-- <the same exact four
paths>`; **no `git add -A`, no `-u`, no `commit -a`, no reset, no stash, no force**.
⟨cmd⟩ `git diff --name-only cdb31643..HEAD` → exactly the four, every one inside the writable set.
**Eight of this unit's twelve granted paths were not opened** — the five consumer/exception paths
because the repoint they would carry is blocked (ESC-d1/ESC-d2), `demo/utils/keyframeSelector.ts`
because its body is the escalated one and a demo-local forward would be the masking class.

#### Act 4 — gates, run at the settled bytes, double-run

| gate | BEFORE (@ `cdb31643`) | AFTER (@ `e2d04331`, run 1 = run 2) | verdict |
|---|---|---|---|
| **G3** — exactly one serializer body across `src` and `demo` | **3** — `demo/utils/keyframeSelector.ts:28` · `css-text.ts:59` · `format/format.ts:20` | **2** — ⟨cmd⟩ `git grep -n "const selectorText\|const serializeSelector" HEAD -- src demo` → `src/animation/compile/emit/css-text.ts:73 export const serializeSelector` · `demo/utils/keyframeSelector.ts:28 export const selectorText` | **RED (2, owed 1)** — the `src/` half is ONE body; the demo copy is **ESC-d1** |
| **G3 falsifier** — *"publishing one and leaving two callers on their private copy passes a naive count"* | — | armed and clean: the count is of **definitions**, and the two library callers (`format.ts` ×4, `css-text.ts` ×1) now call **the same body**; no alias import, no `selectorText` binding survives in `src/` (⟨cmd⟩ `git grep -n 'selectorText' HEAD -- src` → **1 hit, a comment at `format.ts:3`**) | **HOLDS** |
| **G-W2-2** (§0o) — exactly one module in `src/animation/**` imports value.js's grammar entries/collectors at runtime | **2 paths** — `compile/parse-facade.ts` · **`engine/css/metadata.ts`** (⟨cmd⟩ the gate's witness (ii), the multi-line-tolerant perl block, run at HEAD) | **1 path** — ⟨cmd⟩ same witness at `e2d04331` → parse-surface symbols at **`compile/parse-facade.ts` only**. The other two rows are the gate's own declared non-members: `emit/css-text.ts` + `frame/interp-slot.ts` `serializeCssColor` (**emit-half, Tier-D, out of denominator**) and `resolve/function.ts` `coerceToSyntax` (**the declared stray**) | **GREEN on the `src/` arm** |
| **G-W2-2 falsifier** — *"a repair that removes an importer without routing its call sites reds too"* | — | both call sites **routed, not orphaned**: ⟨cmd⟩ `grep -n 'collectStyleRules\|collectTimelineOptions' metadata.ts` → import `:28` · **`:47`** `collectStyleRules(stylesheet)` · **`:107`** `collectTimelineOptions(selectedDeclarations(stylesheet))` (the ruling's `:41`/`:102` and `:42`, recorded as its spelling and not re-issued — E-3, the bodies above shifted by the six-line comment) | **HOLDS** |
| **G-W2-2 (i)** — specifier lines / files naming the subpath under `src/` | 26 lines / 23 files | **25 / 22** (run 1 = run 2) — the gate's own words: *"command (i)'s file count may still exceed 1 (the type surface and the emit half legitimately stand)"* | recorded, non-decisive |

**Tree health at the settled bytes** (none is a gate this unit owns; each is the no-regression floor):
⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json | grep -c 'error TS'` → **54 before, 54 after**,
double-run — the error **set** is identical (`format.ts` and `css-text.ts` appear in neither).
⟨cmd⟩ `npx vitest run` → **147 passed | 5 skipped (152) files · 1518 passed | 3 expected fail |
14 skipped (1535)**, byte-identical to the baseline, **run twice** — which is the emit round-trip's
own witness that the two library bodies were equivalent. ⟨cmd⟩ `node scripts/gates/structure/index.mjs`
→ **PASS, 0 violations across R1–R6**, run twice; **R6 (no-unused-exports) is the rule that governs
the new `css-text.ts` export and it is clean** — `serializeSelector` is imported by `format.ts` **and**
re-exported by the sub-zone barrel, two independent consumption edges under R6's own semantics.
⟨cmd⟩ `npx eslint <the four files>` → **exit 0, clean**. ⟨cmd⟩ `npx depcruise --config
.dependency-cruiser.cjs src demo` → **4 violations before, 4 after** — the same four pre-existing
`demo/scenes/cube/orbital-drag/` cycles, none naming a file of this unit; **430 modules, 1559
dependencies** both runs, so the metadata repoint added no cycle.

#### Act 5 — E13 Step-0, the four-path mail sweep at this seat's clock

Swept read-only at **20:41 EDT**, delta against unit `c`'s **20:30** sweep, classification taken from
each row's **Status cell**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded**.
(1) `docs/tranches/V/coordination/` → **19** entries; newest non-self
`valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md` **19:00** = **O-31**, rowed (`INBOX.md`'s
own **20:26** mtime is Track D's X.P.W3 RESUME-5 sweep line, a sibling seat's append, not a letter).
(2) `../glass-ui/docs/tranches/` → **`BK/`** newest (Sep 18 17:53); `BK/coordination/` newest
`glass-outbound-2026-09-18-valuejs-o26-reply.md` **17:18** = **I-35**, *READ + CONSUMED WHOLE*.
(3) `../keyframes.js/docs/tranches/V/coordination/` → newest **Sep 17 19:08**, unmoved.
(4) atlas `P/coordination/` → newest **Aug 3 15:01**, unmoved. **0 unrowed · 0 UNREAD addressed to
this unit's scope**; the three live UNREAD rows re-read at their Status cells — **I-32** · **I-33**
(both route to *"the X formation mail seat"*) · **I-34** (*"no obligation is minted here"*, budgeted
at X-EXT-1 / X-W4.g) — and **not one names a keyframes byte**. **`INBOX.md` not edited** (nothing to
row; the close seat `i` owns the sweep line). This unit wrote **no** glass-ui byte and sent no letter.

#### ESCALATIONS — two, each a runbook §5.7 trigger, neither an implementer's decision

**ESC-d1 · G3's third body cannot retire: the PACKAGE-surface half of MISS-β2's publication act is
KF.W5's file, and KF.W5 closed without it.** The spec calls MISS-β2 *"the publication act"* and
carves `emit/index.ts` as *"the export list G3 amends"* — and, in the same cell, states the
distinction that decides this: *"the N-8 gap is at the **package** surface, not this internal
barrel."* The chain a demo consumer needs is four links, and this unit holds two:

1. `css-text.ts` exports the one body — **landed** (in bounds).
2. `emit/index.ts` surfaces it — **landed** (in bounds), on the exact terms KF.W5 used for
   `reverseCSSTime`/`serializeTimingFunction` at `:57`.
3. `src/animation/public.ts` names it in its `from "./compile/emit"` list — **`public.ts` is
   READ-ONLY here** (§Bounds row 1: *"read-only (W5 writes)"*). ⟨cmd⟩ `git grep -n 'serializeSelector'
   HEAD -- src/animation/public.ts src/animation/index.ts src/animation/load-engine.ts
   src/animation/engine/index.ts` → **∅**.
4. `load-engine.ts` carries it on the resolved engine roster + the `AnimationEngine` interface —
   **also READ-ONLY**, and it is the door unit `c` measured the demo actually turns.

**No fourth route exists at the bytes**, each closed by measurement, not by preference: a demo
`@src/` import is G1 clause 1's exact prohibition (and unit `c` just spent four commits retiring six
of them); a demo-side re-export forward of the library body is **G1 clause 2's named falsifier**
(*"a demo re-export shim that forwards the same module passes clause 1 and fails clause 2"*); and
value.js — the demo's one lawful package door, which owns the grammar — publishes **no inverse**:
⟨cmd⟩ `grep -n 'KeyframeSelector\|elector' node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts` →
`parseKeyframeSelector` and the `KeyframeSelector` type, **and no serializer**. Writing a fourth
demo body, or re-pointing the demo through `@src/`, would each buy a numeral with a defect.
**Not done.** **Owner**: a KF.W5 addendum-beside publishing `serializeSelector` at `public.ts` +
`load-engine.ts` (one named line each; step 2 is already standing for it), or the successor register
at `KF-W10 §6.D` (anchor-only). **Consequence, stated because it is the cost of the gap**: G3 rests
at **2**, the demo keeps its own reading of a three-branch function, and both sides carry a name the
next census can find in one `git grep`.

**ESC-d2 · A-9's repoint set is TWELVE and five members carry no §Bounds row — so even a GRANTED
publication cannot be executed inside this wave's bounds.** Measured at Act 2 and reproduced here:
⟨cmd⟩ `git grep -nF 'utils/keyframeSelector' HEAD -- demo test | wc -l` → **12** (run 1 = run 2)
against the spec's *"**seven** consumers … five demo + two demo-lane tests"*, which G3's own binding
sentence rides: *"A 'one body' landing that leaves any of the seven on a deleted module is a broken
tree, not a green gate."* The five with no grant — **`TimelineHoverPreview.vue:192`** (named
**nowhere** in the spec, 0 hits whole-file) · **`timelineTypes.ts:2`** (1 hit, §Carry A-3, a census
cell) · **`timeline-hover-preview.test.ts:18`** · **`timeline-mount-keyboard.test.ts:34`** ·
**`timeline-mount-projection.test.ts:35`** (the last three named once, inside DH-3, **as KF.W7's own
creates**) — are all **KF.W7 landings that post-date the spec's `81a56990`**. This is the **same
class** the round-5 repair cured for the other five (R5-3 minted three rows and restored two
exceptions precisely *because* *"five of the seven had no lawful landing surface"*): the cure was
correct and the census it was computed over has since moved. **Not touched.** **Owner**: a §Bounds
widening by dated addendum-beside (E-3) enumerating the five, or `KF-W10 §6.D`. The two escalations
are **ordered**: ESC-d1 must be granted before ESC-d2's rows are worth widening, since with no
published door there is nothing for the twelve to repoint *to*.

#### Residuals — measured, handed on, none cured here

1. **`emit/index.ts:65-71`'s new barrel line publishes nothing onward yet.** It is the sub-zone half
   of the publication act §Bounds books, and it is **structurally clean** (R6 treats a
   re-export-from as an edge onto the owner, not as an owned export — ⟨cmd⟩ structure gate PASS,
   twice), but until ESC-d1's `public.ts` line lands it surfaces a name no consumer outside `src/`
   can reach. **It is named in its own comment as exactly that**, so a successor reads the seam from
   the tree rather than from this record.
2. **The demo's `selectorText` and the library's `serializeSelector` are two names for one function**
   across the repo boundary. When ESC-d1 lands, the demo's body retires and the twelve consumers
   repoint to the library name — which is why ESC-d2's five rows must be granted in the same act.
3. **`resolve/function.ts`'s `coerceToSyntax` is still the one stray runtime grammar import.**
   KF.W2's own gate text booked it *"delete-or-declare at open"*; it survives at HEAD, is **outside
   the parse-surface denominator** by that gate's own reading, and is **outside this unit's writable
   set**. Recorded, not cured, and named so the close seat's G-W2-2 re-measure is not surprised by it.
4. **Four spec coordinates drifted and INTENT was taken at the true bytes**: `format.ts`'s call sites
   `:132/:201/:280/:313` → **`:176`/`:275`/`:355`/`:388`** at open (`:174`/`:273`/`:353`/`:386` after
   the deletion); `css-text.ts:58` → **`:59`**; `metadata.ts`'s `:41`/`:42`/`:102` → **`:47`**/`:107`;
   `keyframeSelector.ts:7` → **`:28`** (unit `c`'s re-cut). Every one resolved **by subject**, per
   unit `a`'s residual 5.
5. **Nothing was pushed.** `push kf origin HEAD` is the close seat `i`'s; local `master` is now
   **5 commits ahead** of `origin/master` and the four seats after this one share the checkout.

#### SELF-COUNT, read back from the settled bytes

**Counting rules stated AT the receipt.** ⟨cmd⟩ `grep -c '^#### Act'` over this receipt → **5**,
numbered 1…5, no gap. **Escalations = 2** — ⟨cmd⟩ `grep -c '^\*\*ESC-d'` → **2**; a bare
⟨cmd⟩ `grep -cE '^[0-9]\. '` returns **9**, because ESC-d1's four-link chain is a numbered list
too (9 − 4 = 5 = the items under §Residuals alone, numbered 1…5, no gap) — stated so both figures are
re-derivable rather than trusted. **Commits = 1** — ⟨cmd⟩ `git log --oneline cdb31643..HEAD | wc -l`
→ **1**, `e2d04331`, the family lock honoured whole. **Files changed = 4** of the **12** granted;
the eight unopened are enumerated at Act 3 with the reason each stayed shut. **G3 = 3 → 2**,
double-run; **G-W2-2 parse-surface modules = 2 → 1**, double-run. Tree-health floor unmoved on all
five harnesses (vue-tsc **54 = 54** · vitest **1518/152 = 1518/152** · structure **PASS = PASS** ·
eslint **0 = 0** · depcruise **4 = 4**), each run twice at the settled commit. Worktree at close
⟨cmd⟩ `git status --porcelain` → **2 rows, both the same two `??` letters this unit opened on**.

---

## Close

**SERVED MODEL**: `claude-opus-5[1m]`. **Date**: 2026-09-18. **Seat**: `i` (CLOSE), **VERIFY-ONLY —
this seat authored no cure, turned no gate, opened no product file.** **Certificate**:
`docs/tranches/X/keyframes/waves/KF-W8-CLOSE.md` (304 L), which carries the long form of everything
below and every command that produced it.

**Crash-recovery sweep, before any other act**: kf → **2 `??` rows**, the same two delivered letters
every unit opened on; value.js → **15 rows**, and `git status --porcelain -- <this seat's four paths>`
→ **empty**. Nothing inherited, nothing stashed, `scripts/dev/dev.sh` never opened.

**Substrate**: kf `HEAD e2d04331`, **5 commits ahead of `origin/master 1fa98a5d`** at measurement
(pushed by this seat as its last act). Every figure re-run at the settled bytes and **double-run**;
a 16-figure harness returns **`SAME` on all sixteen**.

### VERDICT — **PARTIAL**

**Units a · b · c · d executed. Units e · f · g · h NEVER RAN** — no commit names them, no receipt
exists for them, and no killed seat's partial work sits in either worktree. Their §Bounds grants,
family locks and unit plans stand unspent. **Nine gates are RED-UNATTEMPTED**, and this seat records
them as such rather than as ordinary REDs: the distinction is the whole of the wave's state.

### Gate table — BEFORE → AFTER (all 15 re-run by this seat at `e2d04331`, double-run)

| gate | baseline @ `1fa98a5d` | **close @ `e2d04331`** | verdict |
|---|---|---|---|
| G1 c1 | 8 stmts / 7 files | **2 / 2** (`KeyframeTimeline.vue:363` · `AnimationVisualizer.vue:65`) | **RED** — 6 of 8 cured (unit c); the two survivors ARE ESC-c1 and ESC-c2 |
| G1 c2 | 4 reached, 4 private | **2 reached, both private** (`css-text`'s one hit is prose at `public.ts:157`) | **RED** — denominator halved with c1 |
| G2 c1 | 5 of 7 unpublished | **2 still consumed-and-unpublished** (`serializeCssValue` · `bumpLayoutEpoch`) | **RED** |
| G2 c2 | 0 `export *` | **0** | **GREEN — HELD** |
| G3 | 3 bodies | **2** (`css-text.ts:73` · `demo/utils/keyframeSelector.ts:28`) | **RED (owed 1)** — the `src/` half is ONE body; the demo copy is ESC-d1 |
| G4 | c1+c4 green-before-cure, c2+c3 RED | **unchanged** (`keyframes/index.ts` · `timeline/index.ts` present, 0 importers) | **RED — UNATTEMPTED (e)** |
| G5 | 2 up-imports | **2** (`KeyframeCardList.vue:46` · `TimelineTrack.vue:296`) | **RED — UNATTEMPTED (f)** |
| G6 (ACTING) | 1 loose `.vue` | **1** (`CopyButton.vue`) | **RED — UNATTEMPTED (f)** |
| G7 | (i)7 (ii)3 (iii)HOLDS (iv)DIVERGENT | **(i)7 · (ii)3 · (iii)HOLDS · (iv) RED** — `HeroAurora` + `TypingDots` externally consumed, not exported | **RED via (iv) — UNATTEMPTED (f)**; W6's R4-1 half landed, this wave's move did not |
| G8 (i)/(ii)/(iii) | 2 sites · AV 4 · 2 files | **2 · 4 · 2, all unchanged** | **RED — UNATTEMPTED (f)**; the test arm stays GREEN-BEFORE-CURE (KF.W4) |
| G9 | 154 tracked / 152 collected / 2 orphans | **identical** | **RED — UNATTEMPTED (g)** |
| G10 | legs (a)+(b) green; probe absent | **legs green, probe still ABSENT** | **RED on this wave's own act — UNATTEMPTED (g)** |
| G11 | 0 artefacts; inline `:308-318` | **identical** (`git grep -l groupShortcuts` → exit 1) | **RED — UNATTEMPTED (g)** |
| G12 | neither file exists | **identical** | **RED — UNATTEMPTED (g)** |
| G13 | 1 child · 8 stutters · no ruling | **identical — no committed ruling in the tree** | **RED — UNATTEMPTED (e)**. R-4 is ruled in the *spec*; G13 demands it in the *tree* |
| G14 | 13 lines / 11 files; projector alive | **13 / 11**; `progressFromPointerX` alive at `:121`, sites `:230`/`:235`; `useDragScrub` **zero** | **RED — UNATTEMPTED (h)**; unit a's binding enumeration is SUPPLIED, so the scoped green is reachable and simply unspent |
| G15 | leg 1 = 7 lines; leg 2 = 2 | **7 · 2** | **leg 1 RED — CORRECTLY UNSPENT** (its own falsifier: a G15 green on a KF.W8 commit is the defect); **leg 2 HOLDS** |

**The one gate outside §Gates this close is ordered to re-measure — COHESION §0o `ESC-KFW2-1`:**
**`G-W2-2` (KF.W2, `src/` arm) is GREEN.** The gate's own multi-line-tolerant witness (ii), re-run by
**this** seat, returns parse-surface symbols at **exactly one path, `compile/parse-facade.ts`**; the
other three rows are its declared non-members (`css-text.ts` + `interp-slot.ts` `serializeCssColor`,
emit-half Tier-D; `resolve/function.ts` `coerceToSyntax`, the declared stray). Falsifier clean — the
call sites are **routed, not orphaned** (`metadata.ts:28` → `../../compile/parse-facade`, consumed at
`:47` and `:107`). Leg (i) = **25 lines / 22 files**, non-decisive. **It is the only gate this wave
turned.**

**Tally: 2 whole conditions GREEN (G2 c2 held · G-W2-2 turned) + 7 legs/clauses green-before-cure;
13 of 15 RED**, of which 2 moved substantially (G1 c1 8→2 · G3 3→2), 1 is correctly unspent (G15),
and **9 are RED-UNATTEMPTED**.

**Tree-health floors, re-run here**: vitest **1518 passed / 3 expected fail / 14 skipped (147+5 of
152 files)** · vue-tsc **54** · structure gate **PASS, 0 violations R1–R6** · `vitest list` **152** —
every one identical to the baseline. The five product commits cost the tree nothing.

### Commit roster — 11 commits, each verified to touch only its unit's writable set

kf: `0d456cff` · `1e2e0331` · `b0d378b0` · `cdb31643` (unit c) · `e2d04331` (unit d).
value.js: `fa2417d7` · `6971e9ca` (a) · `ac251a38` · `e24a7cfb` (b) · `aa8c8cbd` (c) · `fdebfef5` (d).
Plus this close's own commits, listed in the ledger row.

`git show --stat` over all eleven: **zero** paths outside the granting unit's set; **zero** hits for
`scripts/dev/dev.sh`, `scripts/gates/**`, `.dependency-cruiser.cjs`, `public.ts`, `load-engine.ts` or
`shell/index.ts`. Family locks honoured: unit d's four-file MISS-β2 + §0o commit is whole; unit c's
KF-AV-8 arm is one commit with its third site **escalated and named in the commit message** — a
declared split of a bundle broken upstream, not a silent one; `demo/utils/helpers.ts` in two commits
is **two ids, two meanings**.

### LANDED-WRONG — **NONE**

No write outside §Bounds, no split family, no gate bought out-of-bounds, no masking cure, no asserted
green. The two places a numeral could have been bought were **escalated, not taken**, and the tree
shows it: `git grep -n 'export .* from "@src/' HEAD -- demo` → **exit 1**.

### Escalations (4) and residuals (17), each with its owner

**ESC-c1** `KeyframeTimeline.vue:363` unbounded → §Bounds addendum-beside (E-3) or `KF-W10 §6.D`.
**ESC-c2** `bumpLayoutEpoch` has no lawful cure in any grant → KF.W5 addendum-beside (the epoch
surface) **with** unit h's debounce half. **ESC-d1** `serializeSelector`'s package-surface half is
KF.W5's file → KF.W5 addendum-beside, or `KF-W10 §6.D`. **ESC-d2** A-9's repoint set is **twelve**,
five unbounded → §Bounds widening enumerating the five; **ordered after ESC-d1**.

The seventeen residuals are enumerated with owners at the certificate §5. The load-bearing ones for a
successor: **units e–h unexecuted** (owner: the orchestrator / a resumption) · **the §Bounds
coordinate column is stale wave-wide — no seat may execute from the spec's numerals; census §5 is the
re-anchoring table** · **`scripts/gates/census.mjs:528` holds `HeroAurora.vue`'s literal path in
DO-NOT-TOUCH KF.W4 territory, and unit f's booked `git mv` breaks it** (escalation-shaped, unraised
only because the act never ran; owner: KF.W4 by addendum-beside, **before** the move) · **G7's
`TypingDots` predicate conflict** · **unit h has no `create` grant for the extracted composable**.

### E13 — close sweep

Four paths swept read-only at this seat's clock; classification from each row's **Status cell**,
`INBOX.md` self-excluded. Newest per path: value.js `…ADDENDUM-A9.md` 19:00 = **O-31** (rowed) ·
glass-ui `BK/coordination/…o26-reply.md` 17:18 = **I-35** · kf Sep 17 19:08 · atlas Aug 3 15:01.
**I-35 is the only row routed to X·KF**, Status **READ + CONSUMED WHOLE (KF.W6 `.l`)**, its §4(1)
re-install ask escalated to seat 0 / KF.W0 — **not KF.W8's**. The three live `UNREAD` cells
(**I-32 · I-33 · I-34**) route to **X-W0.j / the X formation mail seat / X-EXT-1** and name no
keyframes byte. **0 unrowed · 0 UNREAD in scope.** Outbound obligation **NEGATIVE**; zero glass-ui
bytes, no letter sent.

### The four-verb line

| verb | state | why |
|---|---|---|
| AUDITED | **YES** (unmoved) | the 58-record corpus, §State |
| SPECIFIED | **YES** (unmoved) | by the spec file |
| IMPLEMENTED | **PARTIAL — units a·b·c·d only** | four of eight units executed; nine gates RED-UNATTEMPTED. `YES` would assert acts that did not happen |
| VERIFIED | **NO** | the spec designates **no seat** to stamp it (⟨cmd⟩ `grep -c 'Verification' KF-W8.md` → **0**; the §State cell reads `NO`), and a PARTIAL implementation cannot carry it |

**The spec declares no §Verification Artefacts section.** What stands in its place is §Gates' fifteen
literal commands and G13's *"the ruling is in the tree"* clause — all re-run above. This seat invents
no artefact the spec did not ask for, and stamps nothing the spec did not authorize.

### SELF-COUNT

Gates re-run **15** (+1 outside gate, counted separately) · commits verified **11** · units with
receipts **4 of 8** · escalations **4** · residuals **17** (1…17, no gap) · harness figures **16**,
run twice, `SAME` on all sixteen · tree-health harnesses **4**. Every figure here was produced by a
command at the settled bytes by **this** seat; none is inherited from a unit receipt.

---

## Check 1

**SERVED MODEL**: `claude-opus-5[1m]`. **Date**: 2026-09-18. **Seat**: fresh adversarial L-20 pass 1,
**VERIFY-ONLY** — this seat authored no cure, turned no gate, opened no product file for writing, and
wrote nothing outside this section, the LEDGER row's own cell and the two commits that carry them.

**Crash-recovery sweep, before any other act (STANDING LAW).** ⟨cmd⟩ `git status --porcelain` in
`/Users/mkbabb/Programming/keyframes.js` → **2 rows, both `??`** (the two delivered letters every seat
of this wave opened on); same in `/Users/mkbabb/Programming/value.js` → **15 rows**, none of them a
path this seat may write (X·V demo rows, `CARRY-LEDGER.md`, the unowned `scripts/dev/dev.sh`,
`docs/tranches/X/waves/evidence/W4/`, two e2e specs — all sibling-seat or standing-arrangement).
**Nothing inherited on this unit; nothing stashed; `scripts/dev/dev.sh` never opened.**

**Substrate.** kf `HEAD e2d04331 == origin/master` (⟨cmd⟩ `git rev-parse HEAD` / `git rev-parse
origin/master` → identical); value.js `HEAD 8af01d8d`. Every figure below was produced by this seat's
own command at those bytes; none is inherited from the close, the certificate or a unit receipt.

### VERDICT — **NOT-CONFORMANT**

**1 BLOCKER · 0 CRITICAL · 0 HIGH · 1 MEDIUM · 2 MINOR · 1 INFO.** **Every claimed GREEN reproduces**
and **no defect of integrity was found**: zero writes outside §Bounds, zero masking fallbacks, zero
split families, E-3 whole, the four-verb line lawful, mail met by routing. The wave is NOT-CONFORMANT
for one reason and one only — **eleven of the fifteen gates are RED with NO relief in the spec's own
bytes**, because units `e` · `f` · `g` · `h` never ran, and **three of the four conjuncts of the
spec's own §Goal criterion are FALSE at the bytes**. The close records this honestly and stamps
`PARTIAL`; **the status therefore STAYS `PARTIAL 2026-09-17` and is not promoted to `CLOSED`** — the
ledger's own vocabulary makes `IMPLEMENTED` conditional on *"every unit's commits landed"* and
`CLOSED` on *"verify-only close **+ fresh check CONFORMANT**"*, and neither condition is met.

### 1 · Reproduction — all 16 conditions re-run at this seat's own commands

**16 of 16 verdicts reproduce; 0 fail.** Run at `e2d04331`, each by the gate's own literal command.

| condition | this seat's reading | close's reading | reproduces |
|---|---|---|---|
| G1 c1 | `git grep -n 'from "@src/' HEAD -- demo` → **2 / 2** (`KeyframeTimeline.vue:363` · `AnimationVisualizer.vue:65`) | 2 / 2 | ✅ |
| G1 c2 | the 2 reached modules (`compile/emit/css-text` · `resolve/browser`) named by **none** of the four published entries | 2 reached, both private | ✅ |
| G2 c1 | `serializeCssValue` · `bumpLayoutEpoch` consumed and unpublished | 2 unpublished | ✅ |
| G2 c2 | `git show HEAD:src/animation/index.ts \| grep -c 'export \*'` → **0** | 0 — GREEN HELD | ✅ |
| G3 | `git grep -n "const selectorText\|const serializeSelector" HEAD -- src demo` → **2** (`css-text.ts:73` · `demo/utils/keyframeSelector.ts:28`) | 2 | ✅ |
| G4 | c1 `transport/index.ts` **absent** ✅ · c2 `keyframes/index.ts` present + importers exit 1 ❌ · c3 `timeline/index.ts` present + importers exit 1 ❌ · c4 `instrument/index.ts` **absent** ✅ | identical | ✅ |
| G5 | **2** — `KeyframeCardList.vue:46` · `TimelineTrack.vue:296` | 2 | ✅ |
| G6 | `git ls-tree --name-only HEAD -- demo/components/ \| grep '\.vue$'` → **1**, `CopyButton.vue` | 1 | ✅ |
| G7 | (i) **7** · (ii) **3** (`EditorShell`·`EditorStartScreen`·`SharePopover`) · (iii) HOLDS (barrel `App.vue:147` ×2, `MbabbMenu.vue:189`) · **(iv) RED** — `HeroAurora` (`App.vue:164` dynamic + `aurora-opacity-ceiling.test.ts:62`) and `TypingDots` (`typing-dots-engine-seam.test.ts:39`) are externally consumed and not exported | identical | ✅ |
| G8 | (i) **2** (`App.vue:148` · `EditorStartScreen.vue:235`) · (ii) AV **4** attribution (`:90`·`:92`·`:96`·`:97`), `:66` the true `clamp` import, `resize-tracks.test.ts:8` carries KF.W4's correction · (iii) **2 files** | identical | ✅ |
| G9 | tracked **154**; `npx vitest list --filesOnly` → **152**; orphans = the same **2** `bench/*.measure.test.ts` | identical | ✅ |
| G10 | `vitest.config.ts:16 plugins: [vue()]` ✅ · `@vue/test-utils` present ✅ · probe **absent** | identical | ✅ |
| G11 | `git grep -l groupShortcuts HEAD -- demo test` → **exit 1**; inline alive at `KeyboardShortcutsModal.vue:308` | identical | ✅ |
| G12 | neither named file exists | identical | ✅ |
| G13 | `git ls-tree --name-only HEAD -- src/` → **one entry**; **no committed ruling in the tree** | identical | ✅ |
| G14 | `git grep -c 'getBoundingClientRect()' HEAD -- demo` → **13 lines / 11 files**; `progressFromPointerX` alive at `:121`, sites `:230`/`:235`; `useDragScrub` **zero** | identical | ✅ |
| G15 | leg 1 **7** convicted lines (`:8`·`:13`·`:55`·`:65`·`:100`·`:105`·`:138`) · leg 2 **exactly 2** (`:5`·`:7`), no `<Teleport>` element | 7 · 2 | ✅ |
| **G-W2-2** (COHESION §0o) | witness (ii) re-run whole by this seat: parse-surface symbols at **exactly one path, `compile/parse-facade.ts`**; the other three rows are the declared non-members (`css-text.ts` + `interp-slot.ts` `serializeCssColor`, emit-half Tier-D; `resolve/function.ts` `coerceToSyntax`, the declared stray). Leg (i) **25 / 22** | **GREEN** | ✅ |

**Tree-health floors, re-run whole by this seat**: ⟨cmd⟩ `npx vitest run` → **Test Files 147 passed |
5 skipped (152) · Tests 1518 passed | 3 expected fail | 14 skipped (1535)** · ⟨cmd⟩ `npx vue-tsc
--noEmit -p tsconfig.json | grep -c 'error TS'` → **54** · ⟨cmd⟩ `node scripts/gates/structure/index.mjs`
→ **PASS: scope=src clean (0 violations across R1–R6)** · ⟨cmd⟩ `npx vitest list --filesOnly | wc -l`
→ **152**. **All four reproduce exactly.** The five product commits cost the tree nothing.

### 2 · Integrity axes — all clean

**(2) Bounds.** ⟨cmd⟩ `git show --stat` over all eleven commits: kf `0d456cff` (`useKeyframeOps.ts` ·
`parseAnimationCSS.ts`) · `1e2e0331` (`demo/utils/helpers.ts`) · `b0d378b0` (`timelineEngine.ts` ·
`helpers.ts`) · `cdb31643` (`demo/utils/keyframeSelector.ts`) · `e2d04331` (`emit/css-text.ts` ·
`emit/format/format.ts` · `emit/index.ts` · `engine/css/metadata.ts`); value.js `fa2417d7`/`ac251a38`
(`KF-W8-census.md`) · `6971e9ca`/`e24a7cfb`/`aa8c8cbd`/`fdebfef5`/`a0a37d3a` (this record +
`KF-W8-CLOSE.md`) · `575b4a7f` (`LEDGER.md`) · `8af01d8d` (`INBOX.md`). **Every path is inside its
unit's granting row.** `src/animation/engine/css/metadata.ts` is the one path outside §Bounds and it
is **owner-granted verbatim** — this seat re-read COHESION §0o at `:1103-1106` and the record's
quotation is byte-exact. **`scripts/dev/dev.sh` appears in 0 of 11 commits**; so do
`scripts/gates/**`, `.dependency-cruiser.cjs`, `public.ts`, `load-engine.ts` and `shell/index.ts`.

**(3) No masking fallback.** All five kf diffs read whole by this seat. **Zero** test files touched in
the wave; no `test.skip`, no `vi.mock`, no allowlist, no try/catch around a defect, no copied producer
selector, no `node_modules` patch, no narrowed assertion. The four re-homed demo bodies are **bodies,
not forwards** — ⟨cmd⟩ `git grep -n 'export .* from "@src/' HEAD -- demo` → **exit 1**, which is G1
clause 2's own falsifier, armed and clean. Each mirror was diffed against its source by this seat and
is **faithful**: `chInPixels` ≡ `resolve/browser.ts:126` (`case "ex": case "ch": return value *
fontSize * 0.5` over `Number.parseFloat(style.fontSize) || 16`) · demo `serializeCssValue` ≡
`css-text.ts:41-56` line for line · demo `PHASE_FRACTIONS` ≡ `internal/scroll-phases.ts`'s four spans
value for value, and `selectorPercent` reproduces `compile/selector.ts:59-60`'s
`span.start + offset * (span.end - span.start)` exactly. The library's two throw branches are the two
cases `src/css/types.ts:42-44`'s published union forbids, so the demo's map is total by construction —
**a cure made better than its source, and stated rather than smuggled.** G3's unification left nothing
dangling: ⟨cmd⟩ `git grep -n 'selectorText' HEAD -- src` → **2 hits, both prose**; all four
`format.ts` call sites repointed; no published entry names `serializeSelector` (⟨cmd⟩ over the four →
exit 1), so the package surface did not widen.

**(4) Families.** Unit d's `MISS-β2 + ESC-KFW2-1 = ONE commit` is whole in `e2d04331` (all four files).
`demo/utils/helpers.ts` in two commits is **two ids, two meanings** (KF-AV-8 · KF-CE-12) and the
receipt states why a pathspec commit cannot stage half a file. Unit c's KF-AV-8 three-site lock landed
one site and **named the escalated site in the commit message itself** — a declared break of a bundle
broken upstream, legible from the tree and not only from the record. **No split of meaning.**

**(5) E-3.** No KF.W8 commit touches `docs/tranches/X/keyframes/waves/KF-W8.md`, any sibling spec, any
file under `docs/tranches/V/megatranche/registry/adjudicated/`, or any `conformance/PASS-*` artefact —
verified from the eleven `--stat` file lists above, which name **four** doc paths in total
(`KF-W8-census.md`, `KF-W8-CLOSE.md`, this record, `LEDGER.md`) plus `INBOX.md`. **E-3 HELD.**

**(7) The four-verb line** moved lawfully: AUDITED **YES** (unmoved) · SPECIFIED **YES** (unmoved) ·
IMPLEMENTED `NO` → **PARTIAL** (four of eight units) · VERIFIED **NO** (the spec designates no seat;
⟨cmd⟩ `grep -c 'Verification' KF-W8.md` → **0**, reproduced here). No verb was stamped that the acts
do not support, and the ledger stamps no VERIFIED.

### 3 · Defect register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **BLOCKER** | **Eleven of the fifteen gates are RED with NO relief in the spec's own bytes, and the §Goal criterion is 1-of-4 at the bytes.** Units `e`·`f`·`g`·`h` never ran. **G4 · G5 · G6 · G7 · G8 · G9 · G10 · G11 · G12 · G13 · G14** are each a booked act of **THIS** wave with a **lawful in-bounds landing surface**: G6 is declared **ACTING** (*"This wave turns it"*); G4/G13 are §Scope 5 and 8, their two barrels bounded `delete-or-gate` and their rulings' home bounded `create`; G5/G7/G8 are unit f's moves and prose corrections, every target bounded (incl. the three `AnimationVisualizer.vue` carves minted at repair round 4 and `EditorStartScreen.vue:102` minted at round 3 precisely so leg (i)'s GREEN would be reachable in-bounds); G9–G12 are unit g's one carve and four creates, with **G10 legs (a) and (b) already GREEN** so only this wave's own probe is missing and **G12's KF.W7 gate is CLOSED**; G14's **SOURCE and DESTINATION were both bounded** (rounds 5 and 4) and unit a's binding enumeration is **SUPPLIED** — the close's own words: *"the scoped green is reachable and simply unspent"*. **No producer owns them, no successor is routed them by the spec, and none is an honest-RED the spec names by id.** §Goal criterion, measured: *no demo module reaches around the two-entry exports map* → **FALSE** (2) · *no module lives above its only consumer* → **FALSE** (G5 = 2, G6 = 1) · *no barrel or test file exists that nothing loads* → **FALSE** (2 barrels 0 importers, 2 orphan bench tests) · *the colocation idiom is written down once and every banked colocation row re-derived* → **TRUE** (unit b, census §6). | the sixteen commands of §1 above, each double-run at `e2d04331`; §Bounds rows `:104`–`:135` read whole for the landing surfaces | **Resume the wave at `e` → `f` → `g` → `h`.** The grants, family locks and unit plans stand unspent and no byte of them was bought wrongly. Two obstacles are already measured and must be raised **before** the acts, not discovered inside them: `scripts/gates/census.mjs:528` holds `HeroAurora.vue`'s literal path in DO-NOT-TOUCH KF.W4 territory (owner: KF.W4 addendum-beside, before unit f's `git mv`), and G7 leg (iv)'s `TypingDots` predicate is inverted by a KF.W4 create (F-2) while its falsifier forbids the export cure. **The row stays `PARTIAL`.** |
| **D-2** | **MEDIUM** | **SELF-COUNT: two published tallies do not reproduce from the record's own enumeration.** The close, the certificate (`:111`, `:177`, `:274`) and the LEDGER row all print ***"nine are RED-UNATTEMPTED"***; the gate tables that carry the verdicts mark **ELEVEN** — G4·G5·G6·G7·G8·G9·G10·G11·G12·G13·G14. The LEDGER row prints the numeral **9** with those same **eleven** ids enumerated beside it in the same sentence. Likewise ***"RED at close: 13 of the 15"***: every one of the fifteen carries a RED member at close (G15's leg 1 included, recorded RED-but-correctly-unspent), so the figure is **15**, or **14** under a rule that excludes G15 — and no counting rule is stated at the receipt that yields 13. **This is the exact class the program convicts by name** — a figure reprinted beside an enumeration that does not support it — one generation on, inside a close whose own SELF-COUNT law requires the counting rule to ride the receipt. **It launders nothing**: every RED is individually recorded, marked UNATTEMPTED, and owner-attributed, and the enumeration is complete. | ⟨cmd⟩ `grep -c 'UNATTEMPTED' KF-W8-CLOSE.md` over the verdict column → the eleven ids above; the close's own gate table, rows G4…G14 | **A dated addendum-beside (E-3)** at this record, the certificate and the LEDGER row restating **11** and **14/15** — or stating AT the receipt the counting rule under which 9 and 13 reproduce. The prior artefacts are not edited. |
| **D-3** | **MINOR** | **The E13 relief is stated on content and reproduces only on routing.** The close (and unit c's receipt at `:766-767`) says the three live `UNREAD` rows *"name no keyframes byte"* / *"each route at their own Routing cell to X-W0.j"*. **I-33's row routes to "the X formation mail seat, which relays each sibling's section to that sibling's lane (fourier → X·F …; kf → X·KF)"** — not to X-W0.j — and the letter it points at carries **`## 2 · keyframes.js`**, naming `KeyboardShortcutsModal.vue:3/:12`, `TimelineCaret.vue:9/19`, `TimelineTrack.vue:86-93` and `RibbonBar.vue:50` — **three of them files this wave bounds**. **E13's close condition still HOLDS**, but by **routing**, not by content: the relay act is the mail seat's, the subject is glass-ui consumption (producer rows ride mail; glass is READ-ONLY always), and no row is addressed to KF.W8. | ⟨cmd⟩ `sed -n '106p' INBOX.md` (the Routing cell) · ⟨cmd⟩ `grep -n '^## ' ../glass-ui/docs/tranches/BK/coordination/glass-outbound-2026-09-17-constellation-o20-relay.md` → `:64 ## 2 · keyframes.js` | Dated addendum-beside re-stating the relief as **routing-based** (the row's owner is the X formation mail seat), and naming I-33's §2 as an inbound the mail seat still owes X·KF. |
| **D-4** | **MINOR-with-mitigation** | **Two demo mirrors of library bodies now exist with no pin.** `demo/utils/keyframeSelector.ts`'s `PHASE_FRACTIONS` mirrors `src/animation/internal/scroll-phases.ts`, and `demo/utils/helpers.ts`'s `chInPixels` mirrors `resolve/browser.ts:126`. Both are **faithful today** (verified value-for-value above) and both are the spec's **sanctioned** route — G1's *Blocked by* clause: *"clause 2 goes green by publication or by relocation, never by re-specifying"* — but nothing red-flags a future divergence. **Mitigation, already in the tree**: both carry the library's own symbol name so `git grep -n 'PHASE_FRACTIONS' HEAD` prints both sides, the residual is booked (unit c residual 2) with its true cure named (a published door onto the phase mapping — KF.W5's class), and the demo map is keyed off value.js's **published** union so a fifth phase fails compilation rather than resolving to nothing. **Does not block.** | the four diffs read whole; `src/css/types.ts:42-44` | Carried as booked. The durable cure is the published door, owner KF.W5 addendum-beside / `KF-W10 §6.D`. |
| **D-5** | **INFO** | **KF.W10 is lawfully blocked on this wave.** Its `Opens after` conjunct reads *"X.KF.W2 · W4 · W5 · W6 · W7 · W8 · W9 **IMPLEMENTED**"*, and KF.W8 is `PARTIAL`, not `IMPLEMENTED`. Its `KF-W8-R-4-STRUCT-PAIR` FOLD-FORWARD row and the three verbatim re-open triggers cite a **KF.W8 R-4 ruling that G13 measures as absent from the tree**, so that carry has no committed source until unit e runs. **No other wave names KF.W8 in an `Opens after`** (swept over every `X/**/waves/*.md`). | ⟨cmd⟩ `grep -n '^\*\*Opens after\*\*' KF-W10.md` · the LEDGER's KF.W10 row · G13 re-run above | No act. Recorded so the successor's blocker is legible from this end. |

### 4 · Honest-RED adjudication (axis 10) — the relieved set, each with its relief cited

**FOUR gates are RED under the spec's own relief, and each has a named owner.** They are the set this
wave would close `CONFORMANT-HONEST-RED` on **if D-1 did not stand**.

- **G3** — **relieved.** The one surviving body is the demo's; retiring it needs the **package**-surface
  half, and §Bounds holds `src/animation/index.ts · public.ts · load-engine.ts` **read-only (W5
  writes)**. **ESC-d1**, owner **KF.W5 addendum-beside or `KF-W10 §6.D`**. The `src/` half — the half
  this wave *could* lawfully spend — **landed**: 3 bodies → 2, one body in `src/`.
- **G1 / G2** — **relieved as to every route this wave's granted units hold.** The two survivors are the
  two escalations. **ESC-c1** (`KeyframeTimeline.vue:363`): the file is named five ways in the spec and
  **bounded nowhere** (this seat re-ran it — §Bounds spans `:81-139`, `grep -c 'KeyframeTimeline'` over
  that range → **0**, over the whole file → **8**); it did not exist at the spec's `81a56990`, so the
  gate's green is **unreachable in-bounds** and a seat that reached it would have bought an
  out-of-bounds green. Owner: **§Bounds widening by dated addendum-beside (E-3), or `KF-W10 §6.D`**.
  **ESC-c2** (`bumpLayoutEpoch`): publication is KF.W5's and **KF.W5 closed with no epoch surface**
  (re-run here: `git grep -n 'epoch' HEAD` over the four published entries → **∅**); relocation is
  impossible at the bytes because the symbol mutates module-private state (`layoutEpoch` +
  `browserScalarCache` at `resolve/browser.ts:6-19`), so a demo copy would be the masking regression
  the seat law forbids. Owner: **KF.W5 addendum-beside, taken with unit h's debounce half**. ⟨*The
  residue: unit h's half never ran, which is D-1's, not this relief's.*⟩
- **G15** — **relieved by the spec's own text and falsifier.** *"Cannot go green independently — hard-
  bundled with `kf-ChannelControls` **L-2/C-2** … This wave contributes the RibbonBar-side spec input
  and no byte"*, and *"a G15 recorded green on a KF.W8 commit is itself the defect"*. **Zero bytes
  landed on `RibbonBar.vue`** — correctly unspent, and this seat confirms leg 2 still HOLDS at exactly
  the two permitted pad lines. Owner: **the L-2/C-2 structural settlement**. ⟨*§Scope 9's spec-input
  deliverable was nonetheless never written — unit h. That is D-1's, not a defect of this relief.*⟩

**UNRELIEVED — the eleven of D-1**: G4 · G5 · G6 · G7 · G8 · G9 · G10 · G11 · G12 · G13 · G14. None is
producer-owned; none is routed to a successor by the spec; none is an honest-RED the spec names by id.
**They are unspent work, and this seat records them as such rather than as honest.**

### 5 · SELF-COUNT

Conditions re-run by this seat **16** (15 §Gates + G-W2-2), each by the gate's own literal command,
**16 reproduce · 0 fail** · commits inspected **11** (5 kf read as full diffs, 6 value.js by
`--stat`) · tree-health harnesses re-run **4**, all four identical to the close's figures · defects
**5** (1 BLOCKER · 1 MEDIUM · 2 MINOR · 1 INFO; numbered D-1…D-5, no gap) · honest-RED gates **4**
(G1 · G2 · G3 · G15), unrelieved RED gates **11**, and **4 + 11 = 15**, the whole §Gates set, so the
partition is total and no gate is unadjudicated. **Counting rule, stated AT the receipt**: one unit =
one **gate id**, never a leg or a clause — G1's two clauses are one gate, G7's four legs are one gate,
G15's two legs are one gate; this is the rule under which "eleven" is the RED-UNATTEMPTED figure at
D-2, and it is stated here so the figure can be re-derived rather than trusted. Every figure in this
section was produced by a command at the settled bytes by **this** seat.

---

## Repair 1

**SERVED MODEL**: `claude-opus-5[1m]`. **Date**: 2026-09-18. **Seat**: REPAIR SEAT, round 1 —
authorised to cure every Check-1 defect at ≥MEDIUM and every MINOR with a one-command cure. **This
seat authored cures**; it is not verify-only.

**Crash-recovery sweep, before any other act (STANDING LAW).** ⟨cmd⟩ `git status --porcelain` in
`/Users/mkbabb/Programming/keyframes.js` → **2 rows, both `??`** (the two delivered letters every seat
of this wave has opened on; not this unit's and not staged). Same in
`/Users/mkbabb/Programming/value.js` → **16 rows**, none of them a path this seat may write (the X·V
demo rows, `CARRY-LEDGER.md`, the unowned `scripts/dev/dev.sh`, `docs/tranches/X/waves/evidence/W4/`,
two e2e specs, a tarball). **Nothing inherited on this unit — no killed predecessor's partial work
exists on any path in this seat's writable set; nothing stashed; `scripts/dev/dev.sh` never opened.**

**Substrate.** kf opened at `HEAD e2d04331 == origin/master`; kf closed at **`HEAD 69095552`**. Every
figure below was produced by this seat's own command at the settled bytes, **double-run**.

### D-1 (BLOCKER) — CURED IN PART, and the remainder ESCALATED with measured reasons

**The ordered cure was ***"Resume the wave at `e` → `f` → `g` → `h`"***.** It was resumed in that
order. **Unit `e` is DONE. Unit `f` is DONE except its one blocked move. Unit `g` is DONE WHOLE.
Unit `h` could not lawfully spend a byte** — both of its acts, and §Scope 9's deliverable, have no
in-bounds landing surface, which is measured below rather than discovered inside the act, exactly as
D-1's own cure sentence ordered for the two obstacles it already knew about.

**EIGHT gates turn GREEN — G4 · G6 · G8 · G9 · G10 · G11 · G12 · G13.** The unrelieved-RED set of
**eleven** falls to **three**, and each of the three now carries a measured escalation with a named
owner instead of standing as unspent work.

| # | unit | act | commit | gate re-reading, double-run at `69095552` |
|---|---|---|---|---|
| 1 | `e` | the dead `defineAsyncComponent` barrel family DELETED with its chunk-rationale comments — `keyframes/index.ts` + `timeline/index.ts`, zero importers each, re-verified before the delete | kf `68b97596` | **G4 GREEN, all four clauses**: every barrel path ⟨cmd⟩ `git ls-tree --name-only HEAD -- <path> \| wc -l` → **0**, all four. **G8 leg (iii) GREEN**: ⟨cmd⟩ `git grep -ln 'Monaco\|highlight\.js\|chunk' HEAD -- <the four>` → **0 files**; and repo-wide ⟨cmd⟩ `git grep -ln 'never eager-loads\|idle-warm pane-reveal seam\|facility umbrella' HEAD -- demo test scripts` → **∅ (exit 1)**, so no surviving copy convicts |
| 2 | `e` | the TWO RULINGS written to their bounded home — the barrel family (one ruling, five sites) and the `src/` chain **+** `engine/animation.ts` DECLINED TOGETHER, with the `ls-tree` output pasted, all three re-open triggers named, and KF.W5's denominator cited **by gate id `G-STRUCT` (leg 2)**, never as a number | value.js `78e754ff` (`KF-W8-census.md` §7, **+152 lines, 0 deletions** — unit `a`/`b`'s bytes unedited) | **G13 GREEN**: a committed ruling names the chain, its disposition and its trigger, with ⟨cmd⟩ `git ls-tree --name-only HEAD -- src/` → **`src/animation`** pasted beside it. No flatten executed; **zero bytes of `src/` opened** |
| 3 | `f` | `git mv demo/components/CopyButton.vue` → **`demo/components/CopyButton/CopyButton.vue`** (R-1's owner-named destination; `instrument/` refused because two of four importers live under `demo/scenes/`), **+ the four MUST-CARRY repoints + the `useToolbarKeyboard.ts` docblock, ONE commit**; `CopyButton.vue`'s own stale *"modified IN PLACE"* note corrected in the same commit | kf `a49e4ab1` | **G6 GREEN**: ⟨cmd⟩ `git ls-tree --name-only HEAD -- demo/components/ \| grep -c '\.vue$'` → **0**. No shim module at the old path — the falsifier's exact evasion — ⟨cmd⟩ `ls demo/components/*.vue` → no matches |
| 4 | `f` | `git mv …/keyframes/KeyframeCard.vue` → `keyframes/components/KeyframeCard.vue` + `KeyframeCardList.vue:46` `../` → `./`, a **separate commit** from the KF-CB-37 carve on the same file (D-14's split) | kf `34b051eb` | **G5 moves 2 → 1**: ⟨cmd⟩ `git grep -n 'from "\.\./[A-Z][A-Za-z]*\.vue"' HEAD -- demo` → **1 line**, `TimelineTrack.vue:296`. Still RED; the survivor is **ESC-R1-3** |
| 5 | `f` | the two `editor-shell/` citations corrected to their real referent `shell/`, **both enumerated sites in ONE commit** | kf `d399da1c` | **G8 leg (i) GREEN**: ⟨cmd⟩ `git grep -n 'editor-shell/' HEAD -- demo` → **∅ (exit 1)**. Zero obtained at the two enumerated sites and no third file touched (the falsifier's out-of-bounds-green clause) |
| 6 | `f` | KF-AV-18: the layout-epoch cache, the epoch and the auto-`window.resize` listener re-attributed to **`src/animation/resolve/browser.ts:6-24`**, their real owner, at four AV lines and three `resize-tracks.test.ts` lines; value.js's genuine part (`isLayoutTrackingUnit`) named instead | kf `29b860fa` | **G8 leg (ii) GREEN**: ⟨cmd⟩ `git grep -n 'value\.js' HEAD -- …/AnimationVisualizer.vue …/resize-tracks.test.ts` → **4 lines**, every one naming a real value.js export (`clamp` `:66`; `isLayoutTrackingUnit` `:96-97`) or stating a NON-attribution (`:8`, KF.W4's; `:67`). Referents corrected, no comment deleted. 3/3 tests in the touched file pass |
| 7 | `g` | R-5: the two `bench/*.measure.test.ts` orphans **adopted in place** by a third declared `measure` project; glob behaviour verified against the tracked bench listing BEFORE the shape was chosen (README:127-130) | kf `422c16c1` | **G9 GREEN**: collected **158** ≡ tracked **158**, and the two SETS are **identical file for file** (⟨cmd⟩ `diff` over the sorted lists → no output), double-run. The falsifier compares sets, not counts, and the `.measure.test.ts` suffix anchor swallows no `*.bench.ts` |
| 8 | `g` | G10's pathed probe **created**: imports one real `demo/**/*.vue` by alias, mounts it with `@vue/test-utils`, asserts a connected DOM subtree | kf `269b094d` | **G10 GREEN**: ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/sfc-load.probe.test.ts` → **2 passed**. No `vi.mock` of the subject, no `.ts` shim, no did-not-throw assertion — the three cases the falsifier names |
| 9 | `g` | R-10: `groupShortcuts()` **extracted** to `shell/groupShortcuts.ts` beside its SFC, the inline `computed` body **gone whole**, the template binding kept and re-sourced, and a 5-clause cover created | kf `63bb7b6b` | **G11 GREEN**: ⟨cmd⟩ `git grep -l groupShortcuts HEAD -- demo test` → **3 paths** (module · cover · SFC); ⟨cmd⟩ `git grep -c 'groupShortcuts' HEAD -- …/KeyboardShortcutsModal.vue` → **3** (≥1, the SFC consumes the module); ⟨cmd⟩ `git grep -n 'const groups = new Map' HEAD -- …/KeyboardShortcutsModal.vue` → **∅ (exit 1)**, the inline body gone |
| 10 | `g` | G12's characterization pair **created**, authored against the shape **KF.W7's R-7 actually ruled** — the fold has landed, `CSSPasteDialog.vue` is the ONE shell and `KeyframesAddDialog.vue` the thin adapter | kf `69095552` | **G12 GREEN**: ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/CSSPasteDialog.test.ts test/demo/instrument/KeyframesAddDialog.test.ts` → **2 files, 17 tests passed**. Neither dialog under test is mocked; R-9 is **not** claimed discharged |

**Tree-health floors, re-run whole after the last commit and double-run** — ⟨cmd⟩ `npx vitest run` →
**Test Files 153 passed | 5 skipped (158) · Tests 1545 passed | 3 expected fail | 14 skipped (1562)**
(from the close's 147/5/152 · 1518 — **+6 files, +27 tests**, all of them this repair's own creates
and the two adoptions, **zero regressions**) · ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json | grep -c
'error TS'` → **54**, **unmoved** from the close · ⟨cmd⟩ `node scripts/gates/structure/index.mjs` →
**PASS: scope=src clean (0 violations across R1–R6)** · ⟨cmd⟩ `npx vitest list --filesOnly | wc -l` →
**158**. ⟨cmd⟩ `npx tsc --noEmit -p tsconfig.test.json` → **23 errors across 15 files, none of them a
file this seat created or opened** (re-run per-file; the four new specs contribute **0**).

**§Goal criterion, re-measured — 1-of-4 → 2-of-4.** *no demo module reaches around the two-entry
exports map* → **FALSE** (2 statements; ESC-c1/ESC-c2, owner KF.W5 — unmoved and not this repair's) ·
*no module lives above its only consumer* → **FALSE**, but improved (G5 **2 → 1**, G6 **1 → 0**) ·
*no barrel or test file exists that nothing loads* → **TRUE** (**0** barrels, all four gone; **0**
orphan tests, 158 ≡ 158) · *the colocation idiom is written down once and every banked colocation row
re-derived* → **TRUE** (unit `b`, census §6).

### D-2 (MEDIUM) — CURED by dated addendum-beside (E-3); prior artefacts not edited

**The counting rule the two figures reproduce under is stated below, and the two figures the prior
artefacts printed are restated. No prior artefact's bytes are edited** — the addendum rides beside
them, at this record, at `KF-W8-CLOSE.md` and at the LEDGER row.

**COUNTING RULE, stated AT the receipt: one unit = one GATE ID, never a leg or a clause.**

- **RED-UNATTEMPTED is ELEVEN, not nine.** The close, `PASS`-side certificate (`:111`, `:177`,
  `:274`) and the LEDGER row each printed ***"nine are RED-UNATTEMPTED"*** while the gate tables that
  carry the verdicts marked **eleven**, enumerated in the same sentence: **G4 · G5 · G6 · G7 · G8 ·
  G9 · G10 · G11 · G12 · G13 · G14**. Counted under the rule above the enumeration yields **11**, and
  **11** is the figure of record. **No counting rule yields 9 over that set**, so the numeral is
  restated rather than rescued.
- **RED-at-close is FOURTEEN of fifteen under the stated rule, or fifteen under a rule that counts
  G15's correctly-unspent leg 1 — never thirteen.** Every one of the fifteen carried a RED member at
  close. **14/15** is the figure of record here, the rule being *a gate counts as RED at close iff it
  carried a RED member that this wave could in principle have spent* — which excludes **G15** alone,
  whose own text forbids a KF.W8 byte (*"a G15 recorded green on a KF.W8 commit is itself the
  defect"*). **13 reproduces under no stated rule.**

**It laundered nothing, then or now** — every RED was individually recorded, marked UNATTEMPTED and
owner-attributed, and the enumeration was complete and correct at both sites. The defect was a figure
reprinted beside an enumeration that does not support it, and the cure is to print the rule with the
figure.

**Restated for THIS round, under the same rule**: after Repair 1 the RED-UNATTEMPTED set is **ZERO**
— the eleven were attempted, **eight turned GREEN**, and the remaining **three (G5 · G7 · G14)** are
RED-WITH-MEASURED-ESCALATION, which is a different disposition and is counted as such.

### D-3 (MINOR) — CURED by dated addendum-beside: the E13 relief is **ROUTING-based**, not content-based

The close (and unit `c`'s receipt) stated the relief on CONTENT — *"name no keyframes byte"* / *"each
route at their own Routing cell to X-W0.j"*. **Re-read at the rows themselves, that is not what I-33
says.** I-33's Routing cell routes to *"the X formation mail seat, which relays each sibling's section
to that sibling's lane (fourier → X·F …; kf → X·KF)"* — **not** to X-W0.j — and the letter it points
at carries a **`## 2 · keyframes.js`** section naming `KeyboardShortcutsModal.vue`, `TimelineCaret.vue`,
`TimelineTrack.vue` and `RibbonBar.vue`, three of which this wave bounds.

**E13's close condition HOLDS, and it holds BY ROUTING**: the relay act is the **X formation mail
seat's**, the subject is **glass-ui consumption** (producer rows ride mail; glass-ui is READ-ONLY
always), and **no row is addressed to KF.W8**. **I-33 §2 is recorded here as an inbound the mail seat
still owes X·KF** — it is not this wave's to consume and not this seat's to relay.

### E13 — Repair-1 mail sweep (four paths, read-only, this seat's own clock)

`INBOX.md` **self-excluded** (SELF-COUNT law); classification taken from each row's **Status** cell,
never from a bare `grep -i unread`. **All four paths are UNMOVED since the `.i` close sweep**:
(1) `docs/tranches/V/coordination/` newest non-self `valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md`
**Sep 18 19:00** = **O-31**, rowed; (2) ⟨cmd⟩ `ls -latd ../glass-ui/docs/tranches/*/ | head -3` →
**`BK/`** (Sep 18 17:53) newest; `BK/coordination/` newest `glass-outbound-2026-09-18-valuejs-o26-reply.md`
**17:18** = **I-35**, rowed and CONSUMED; (3) `../keyframes.js/docs/tranches/V/coordination/` newest
**Sep 17 19:08**, unmoved; (4) `../sci-report/atlas/docs/tranches/P/coordination/` newest
**Aug 3 15:01**, unmoved. **0 unrowed · 0 new `I-n` · 0 UNREAD in X.KF.W8's scope.** Outbound
obligation **NEGATIVE**: **zero glass-ui bytes** were written by this seat and no letter was sent.

### ESCALATIONS RAISED BY THIS SEAT — seven, each with its measured reason and its owner

**None is a decline and none is a deferral by preference**: each is a booked act whose only cure lies
outside this wave's §File Bounds, measured before the act rather than discovered inside it.

1. **ESC-R1-1 — `HeroAurora`'s move (G7's ONE owed act; KF-HA-14 / KF-AT-26(c)).** ⟨cmd⟩
   `git grep -n 'HeroAurora' HEAD -- scripts` → **`scripts/gates/census.mjs:528`**, the literal path
   `"demo/components/instrument/shell/HeroAurora.vue"` inside that gate's **`EMBEDDED_SITES`** C2
   citation roster, annotated in its own source as *"(X.KF.W4 §Bounds, Citation targets)"*. §Do NOT
   touch names **`every gate script under scripts/gates/**` (KF.W4)**. The move dangles that roster
   entry and this wave may not repair it. **A second, newer obstacle is measured here and is not in
   the spec's dated reading**: the A-8 census of **1** consumer is stale — at this substrate the SFC
   also has `test/demo/instrument/aurora-opacity-ceiling.test.ts:62` (a **KF.W4 create**, no §Bounds
   row in this wave). **Owner: KF.W4 addendum-beside (roster re-point) + a §Bounds row for the test.**
2. **ESC-R1-2 — G7 leg (iv)'s `TypingDots` predicate is INVERTED by a KF.W4 create (the record's
   F-2).** `shell/TypingDots.vue` has two importers — `EditorStartScreen.vue:138` (product,
   directory-internal) and `test/demo/instrument/typing-dots-engine-seam.test.ts:39` (**outside**
   `shell/`). Read against leg (iv)'s literal *external = an importing module outside the directory*,
   it is externally consumed and the *"exactly"* word demands an export; **G7's own falsifier names
   adding that export as a failure mode**, by this file's name. Two clauses of the wave's own
   instrument disagree at one file and **a seat may not resolve that by widening**. **Owner: a dated
   addendum-beside at G7 ruling whether a test importer makes an SFC externally consumed.**
   ⟨*Even with this resolved, G7 stays RED until ESC-R1-1 lands: leg (iv) also convicts `HeroAurora`,
   and its discharge is the move.*⟩
3. **ESC-R1-3 — `TimelineCaret`'s move + m-7's rename (G5's surviving member).** The move repoints
   **two** files and the second is `test/demo/instrument/timeline-mount-keyboard.test.ts` — a **KF.W7
   create** carrying **no §Bounds row in this wave** (⟨cmd⟩ `git grep -n 'TimelineCaret' HEAD -- test`
   → `:28` the import, `:301` the mount; the rename additionally moves the `.timeline-caret` /
   `.timeline-caret-readout` selectors that file reads at `:309` `:437` `:440` `:450`). A unification
   that leaves a test on a deleted module is a **broken tree, not a green gate** — G3's own words,
   binding identically here. Agrees with census §6.6 residual 1, derived independently. **Owner:
   §Bounds widening by dated addendum-beside.**
4. **ESC-R1-4 — G14's green is UNREACHABLE inside its own bounds.** The census's **BINDING** landing
   shape (§3.3, handed to unit `h`) is: land the projector *"as a `project` callback on the seam — the
   shape its three in-tree siblings already take — and **not** by inventing a rival mechanism inside
   `useDragScrub.ts`"*. But `AnimationVisualizer.vue`'s drag lifecycle is **`useDragCapture`**, not
   `useDragScrub` (⟨cmd⟩ `git grep -n 'useDragCapture' HEAD -- demo` → `…/AnimationVisualizer.vue:72`
   the import, `:215` the call), so landing a `project` callback on the seam requires rewriting the
   import at `:72` and the `useDragCapture({…})` block at `:215-245` — **neither inside the four
   carve rows §Bounds grants this file** (`:121-130` · `:219` · `:230` · `:235`, per census §3.3's
   substrate table). The only in-bounds alternative — an exported projector helper in
   `useDragScrub.ts` — is either the **rival mechanism §3.3 forbids**, or makes the seam acquire a
   `getBoundingClientRect()`, which **G14's own falsifier fails by name** (⟨cmd⟩
   `git grep -c 'getBoundingClientRect()' HEAD -- demo/composables/useDragScrub.ts` → **0**, armed and
   still satisfied). **The swap is additionally a BEHAVIOURAL change** (window listeners vs
   element-scoped capture; `useDragCapture`'s `e.button !== 0` guard has no counterpart on the seam),
   so it is a grant question and an evaluation, never a seat's improvisation. **Owner: §Bounds
   widening by dated addendum-beside, taken with that evaluation.** **Zero bytes were spent on either
   file**, so no half-cure was bought.
5. **ESC-R1-5 — KF-AV-26's extraction has NO `create` grant.** §Bounds gives unit `h` a `modify-carve`
   on `AnimationVisualizer.vue` (`:122-191` at the spec's ref) and **no `create`** for the colocated
   `use*.ts` the act extracts into. Agrees with census §6.6 residual 3. **Owner: a §Bounds `create`
   row.** *(The direction is already ruled; the escalation is about the grant, not the shape.)*
6. **ESC-R1-6 — §Scope 9's RibbonBar-side spec input has no bounded home.** `RibbonBar.vue` is
   `spec-input only` (**zero bytes**, and a G15 recorded green on a KF.W8 commit is itself the defect
   — correctly unspent here: ⟨cmd⟩ leg 1 → **7** convicted lines, leg 2 → **exactly 2** pad lines
   `:5`/`:7`, no `<Teleport>` element, **unchanged**), and unit `h`'s writable set is the two kf files
   alone — no doc create is bounded for the deliverable. **Owner: a bounded doc home by
   addendum-beside.**
7. **ESC-R1-7 — G12's producer realm, the durable cure.** ⟨cmd⟩ a probe mounting the real
   `CSSPasteDialog` without the producer stub dies at **`Cannot find package '@mkbabb/keyframes.js'
   imported from node_modules/@mkbabb/glass-ui/dist/useSpring-BCHxLjwv.js`** — the externalized
   producer resolving the self-package from inside `node_modules`, where `vitest.config.ts`'s source
   alias cannot reach. The lane already answers this with `vi.mock` of the producer
   (`aurora-opacity-ceiling.test.ts`, a KF.W4 create) and this repair follows that idiom **with the
   seam declared in both new specs**. The **durable** cure is a runner change (inlining the producer
   so the alias applies), and `vitest.config.ts` is carved in this wave to the `measure` project
   **and nothing else**. **Owner: §Bounds widening / KF.W4.**

### OBSERVED, NOT MINE — two pre-existing harness failures, recorded so they are not read as this repair's

- ⟨cmd⟩ `node scripts/gates/census.mjs` → **FAIL** (`provenance · citations`). Five printed violations,
  all in `src/animation/compile/emit/{backward/backward.ts,format/options.ts}` and
  `test/engine/computed-resolution.test.ts`; plus the pre-existing `DEAD demo/styles/layout.css:0`
  carve, which that script itself routes to **KF.W6**. ⟨cmd⟩ the violation list grepped for any path
  this seat touched → **0**. Not one of the close's four tree-health floors, and unmoved by this repair.
- ⟨cmd⟩ `npm run lint` → **4 depcruise `no-cycle` errors**, all four inside
  `demo/scenes/cube/orbital-drag/` — a directory this seat never opened and this wave does not bound.

### SELF-COUNT

Defects in the register **5** (D-1…D-5, no gap) · **cured 3** (D-1 in part, D-2, D-3) · **carried as
booked 1** (D-4, MINOR-with-mitigation — its stated cure is *"Carried as booked. The durable cure is
the published door, owner KF.W5 addendum-beside / `KF-W10 §6.D`"*, which lies outside this wave; the
two demo mirrors are unchanged by this repair) · **no act 1** (D-5, INFO, whose own cure line is *"No
act"* — and it is now **partly discharged**: G13's ruling exists in the tree, so `KF-W10 §6.D`'s
`KF-W8-R-4-STRUCT-PAIR` FOLD-FORWARD row has a committed source for the first time; KF.W10 remains
blocked because this wave is not `IMPLEMENTED`).

Commits **10** — **9 in keyframes.js** (`68b97596` · `a49e4ab1` · `34b051eb` · `d399da1c` ·
`29b860fa` · `422c16c1` · `269b094d` · `63bb7b6b` · `69095552`; ⟨cmd⟩ `git log --oneline
e2d04331..HEAD | wc -l` → **9**) and **1 in value.js** before this section (`78e754ff`), each taken
over a verified pathspec and each touching only its unit's writable set. Gates re-run by this seat
**15 + the four tree-health floors**, every one double-run at the settled bytes. **Gates turned GREEN
8** (G4 · G6 · G8 · G9 · G10 · G11 · G12 · G13) · **gates still RED 7** (G1 · G2 · G3 · G5 · G7 · G14
· G15), of which **4 were already relieved at Check 1** (G1 · G2 · G3 · G15) and **3 now carry a
measured escalation with a named owner** (G5 · G7 · G14) — **8 + 7 = 15**, the whole §Gates set, so
the partition is total. Escalations raised **7** (ESC-R1-1…ESC-R1-7, no gap). **RED-UNATTEMPTED: 0.**

**Status: the row stays `PARTIAL`.** Units `e` · `f` · `g` landed; unit `h` spent **zero bytes** and
is wholly escalated, so *"every unit's commits landed"* is not met and `IMPLEMENTED` is not reached.
Every figure in this section was produced by a command at the settled bytes by **this** seat.

---

## Check 2

**SERVED MODEL**: `claude-opus-5[1m]`. **Date**: 2026-09-18. **Seat**: fresh adversarial L-20 pass 2,
**VERIFY-ONLY** — an independent Opus 5 that authored no byte of the wave's cures, of any unit
receipt, of `## Close`, of `## Check 1` or of `## Repair 1`. It opened no product file for writing and
wrote nothing outside this section, the LEDGER row's own cell and its event line, and the one commit
that carries them.

**Crash-recovery sweep, before any other act (STANDING LAW).** ⟨cmd⟩ `git status --porcelain` in
`/Users/mkbabb/Programming/keyframes.js` → **2 rows, both `??`** (the two delivered letters every seat
of this wave has opened on — not this seat's writable set, never staged); same in
`/Users/mkbabb/Programming/value.js` → **30 rows** at this seat's open sweep, none of them a path
this seat may write (X·V demo rows, `src/css/**` and `src/subpaths/**` sibling-seat work,
`CARRY-LEDGER.md`, the unowned `scripts/dev/dev.sh`, two e2e specs,
`docs/tranches/X/waves/evidence/W4|W9/`). Mid-check a sibling seat committed `c8848bed`
(`src/css/**` · `src/subpaths/**`), leaving **15**; no path of this seat's was touched. **Nothing inherited on
this unit; nothing stashed; `scripts/dev/dev.sh` never opened.**

**Substrate.** kf `HEAD 69095552 == origin/master` (⟨cmd⟩ `git rev-parse HEAD` / `git rev-parse
origin/master` → identical); value.js `HEAD ed0e55a3` at this seat's open (a sibling seat advanced it to `c8848bed`
mid-check; kf's substrate is unmoved). Every figure below was produced by this seat's
own command at those bytes, **double-run**; none is inherited from the close, Check 1, Repair 1, the
certificate or a unit receipt.

### VERDICT — **CONFORMANT-HONEST-RED**

**0 BLOCKER · 0 CRITICAL · 0 HIGH · 0 MEDIUM · 3 MINOR · 1 INFO.** **16 of 16 conditions reproduce**
at this seat's own literal commands, **GREEN and RED alike**, and the four tree-health floors
reproduce exactly. Integrity is clean on every axis: **zero writes outside §Bounds**, **zero masking
fallbacks**, **E-3 whole**, mail met, the four-verb line lawful. **Seven gates remain RED and all
seven are RELIEVED** — four by the spec's own text (G1 · G2 · G3 · G15, as Check 1 adjudicated and
this seat re-derived), three by a measured out-of-bounds cure with a named owner (G5 · G7 · G14),
each of which this seat verified **at the bytes** rather than accepting from the register.

**Why this reverses Check 1's NOT-CONFORMANT.** Check 1's single BLOCKER was that eleven gates were
RED as **unspent work** — booked acts of this wave with a lawful in-bounds landing surface that no
seat had attempted. Repair 1 attempted all eleven: **eight turned GREEN** and the remaining three were
measured to have **no lawful in-bounds cure**. That is a categorical change, not a softening: unspent
work becomes honest-RED only when the wave's own §File Bounds forbid the cure, and this seat
re-measured each of the three obstacles independently before accepting it.

### 1 · Reproduction — 16 of 16, at this seat's own commands, double-run at `69095552`

| condition | this seat's reading (⟨cmd⟩ run twice, `SAME`) | record's reading | reproduces |
|---|---|---|---|
| G1 c1 | `git grep -n 'from "@src/' HEAD -- demo` → **2** (`KeyframeTimeline.vue:363` · `AnimationVisualizer.vue:65`) | 2 | ✅ RED |
| G1 c2 | the two reached modules over the four published entries: `compile/emit/css-text` → one hit and it is **prose** (`public.ts:157`, a comment); `resolve/browser` → **exit 1**. Both **library-private** | 2 reached, both private | ✅ RED |
| G2 c1 | `serializeCssValue` · `bumpLayoutEpoch` consumed and named by no published entry (`load-engine.ts:61-63`/`:116-120` and `public.ts:168` publish `cssIdent`·`reverseCSSTime`·`serializeTimingFunction`, all three no longer consumed) | 2 unpublished | ✅ RED |
| G2 c2 | `git show HEAD:src/animation/index.ts \| grep -c 'export \*'` → **0** | 0 | ✅ **GREEN — HELD** |
| G3 | `git grep -n "const selectorText\|const serializeSelector" HEAD -- src demo` → **2** (`css-text.ts:73` · `demo/utils/keyframeSelector.ts:28`) | 2 | ✅ RED (owed 1) |
| G4 | all four clauses hold by the **absent** disjunct: `git ls-tree --name-only HEAD -- <each of the four barrel paths>` → **0 rows, all four**; and all four importer greps exit 1 | GREEN, all four clauses | ✅ **GREEN** |
| G5 | `git grep -n 'from "\.\./[A-Z][A-Za-z]*\.vue"' HEAD -- demo` → **1**, `TimelineTrack.vue:296` → `../TimelineCaret.vue` | 2 → 1, still RED | ✅ RED |
| G6 | `git ls-tree --name-only HEAD -- demo/components/ \| grep -c '\.vue$'` → **0**; the whole listing is three directories (`CopyButton` · `instrument` · `playback`) — **no shim module at the old path**, the falsifier's exact evasion | 0 | ✅ **GREEN** |
| G7 | (i) **7** SFCs · (ii) **3** exports · (iii) HOLDS (`App.vue:147` barrel ×2 · `MbabbMenu.vue:189` · `EditorShell.vue:227` direct) · **(iv) RED** — `HeroAurora` (`App.vue:163-164` dynamic + `aurora-opacity-ceiling.test.ts:62`) and `TypingDots` (`typing-dots-engine-seam.test.ts:39`) externally consumed and not exported | (i)7 (ii)3 (iii)HOLDS (iv)RED | ✅ RED via (iv) |
| G8 | (i) `git grep -n 'editor-shell/' HEAD -- demo` → **∅ (exit 1)** · (ii) **4 lines**, each naming a real value.js export (`clamp` `:66`) or stating a NON-attribution (`:96` · test `:8` · `:67`) · (iii) **0 files**, and the repo-wide prose sweep `never eager-loads\|idle-warm pane-reveal seam\|facility umbrella` → **∅** | GREEN on all three legs | ✅ **GREEN** |
| G9 | tracked **158** ≡ collected **158**, and the two SETS are **identical file for file** (⟨cmd⟩ `diff` over the sorted, prefix-stripped lists → no output) | 158 ≡ 158, sets identical | ✅ **GREEN** |
| G10 | ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/sfc-load.probe.test.ts` → **1 file / 2 tests passed** | 2 passed | ✅ **GREEN** |
| G11 | `git grep -l groupShortcuts HEAD -- demo test` → **3 paths** (module · cover · SFC); `git grep -c 'groupShortcuts' … KeyboardShortcutsModal.vue` → **3**; the inline `computed` body **gone whole** and the template binding at `:139` kept and re-sourced | 3 · 3 · gone | ✅ **GREEN** |
| G12 | ⟨cmd⟩ `npx vitest run --project demo …/CSSPasteDialog.test.ts …/KeyframesAddDialog.test.ts` → **2 files / 17 tests passed**; neither dialog under test is stubbed | 2 files, 17 tests | ✅ **GREEN** |
| G13 | `git ls-tree --name-only HEAD -- src/` → **`src/animation`**, one entry, **pasted beside the ruling** at `KF-W8-census.md §7.2`, which names the chain, the second instance, the DECLINE, three re-open triggers and the terminus, and subordinates KF.W5's denominator **by gate id `G-STRUCT` (leg 2)**, never as a number. No flatten; **zero `src/` bytes** in the whole wave (⟨cmd⟩ `git diff --name-only e2d04331..HEAD \| grep '^src/'` → exit 1) | GREEN | ✅ **GREEN** |
| G14 | `git grep -c 'getBoundingClientRect()' HEAD -- demo` → **13 lines / 11 files**; the projector is alive; `useDragScrub` **zero** (falsifier armed and still satisfied) | 13 / 11 | ✅ RED |
| G15 | leg 1 → **7** convicted lines · leg 2 → **exactly 2** pad lines (`:5` the Teleport comment · `:7` the `id`), **no `<Teleport>` element**; **zero KF.W8 bytes on `RibbonBar.vue`** | 7 · 2 | ✅ leg 1 RED — correctly unspent; leg 2 HOLDS |
| **G-W2-2** (COHESION §0o) | witness (ii) re-run **whole** by this seat over all 22 `@mkbabb/value.js/css` files: the parse-surface symbols sit at **exactly one path, `compile/parse-facade.ts`** (14 symbols); the only other runtime rows are the declared non-members — `css-text.ts` + `interp-slot.ts` `serializeCssColor` (emit-half, Tier-D) and `resolve/function.ts` `coerceToSyntax` (the declared stray). Falsifier clean: `metadata.ts:28` routes through `../../compile/parse-facade`. Leg (i) **25 lines / 22 files**, non-decisive | **GREEN** | ✅ **GREEN** |

**Tree-health floors, re-run whole by this seat**: ⟨cmd⟩ `npx vitest run` → **Test Files 153 passed |
5 skipped (158) · Tests 1545 passed | 3 expected fail | 14 skipped (1562)** · ⟨cmd⟩ `npx vue-tsc
--noEmit -p tsconfig.json | grep -c 'error TS'` → **54** · ⟨cmd⟩ `node scripts/gates/structure/index.mjs`
→ **PASS: scope=src clean (0 violations across R1–R6)** · ⟨cmd⟩ `npx vitest list --filesOnly | wc -l`
→ **158** · ⟨cmd⟩ `npx tsc --noEmit -p tsconfig.test.json` → **23 errors across 15 files**, and
⟨cmd⟩ the file list grepped for the four specs this wave created → **exit 1, none**. **All five
reproduce exactly.** A 16-figure gate harness was run twice and returns the same sixteen values.

### 2 · Integrity axes — all clean

**(2) Bounds.** ⟨cmd⟩ `git diff --name-only e2d04331..HEAD` over the nine repair commits names **20
paths**, and every one sits in a §Bounds row: the two barrels (`delete-or-gate`) · the CopyButton move
and its four minted repoint rows + the `useToolbarKeyboard.ts` docblock carve · the KeyframeCard move
+ `KeyframeCardList.vue` · `App.vue` + `EditorStartScreen.vue` (G8 leg (i)'s two enumerated sites) ·
`AnimationVisualizer.vue` + `resize-tracks.test.ts` (KF-AV-18) · `vitest.config.ts` (the `measure`
carve, post-KF.W4) · `KeyboardShortcutsModal.vue` + `groupShortcuts.ts` · the four `create`d specs.
⟨cmd⟩ the same list grepped for `scripts/dev/dev.sh|scripts/gates/|.dependency-cruiser.cjs|shell/index.ts|public.ts|load-engine.ts|presets/|src/animation/index.ts|TransportDock/|RibbonBar.vue|useDragScrub`
→ **exit 1, zero hits**; ⟨cmd⟩ for `^src/` → **exit 1**. **`shell/index.ts` is untouched by this
wave** — G7's falsifier clause *"fails on ANY barrel edit outside KF.W6's R4-1 atomic commit, by any
seat including this one"* is armed and clean. The three value.js repair/check commits name **four**
doc paths in total (`KF-W8-census.md`, the record, `KF-W8-CLOSE.md`, `LEDGER.md`) plus `INBOX.md`.

**(3) No masking fallback.** All nine kf diffs read **whole** by this seat. No `test.skip`, no
`.todo`, no allowlist, no copied producer selector, no `node_modules` patch, no narrowed assertion,
and the one `try` in the wave is `try/**finally** { w.unmount() }` — a mount teardown, not a catch.
**The producer `vi.mock` in the two G12 specs is not a masking fallback and this seat verified the
reason rather than accepting it**: `node_modules/@mkbabb/glass-ui/dist/` imports `@mkbabb/keyframes.js`
(⟨cmd⟩ `grep -rl` → `useSpring-BCHxLjwv.js` and four siblings), the package is **absent** from
`node_modules` (⟨cmd⟩ `ls -d` → no such file), and `vitest.config.ts`'s source self-alias cannot reach
an import originating inside `node_modules` — so the producer cannot load at all in this lane. The
idiom is the lane's own and **pre-dates this wave** (⟨cmd⟩ `git grep -ln 'vi.mock("@mkbabb/glass-ui'
HEAD -- test` → five files, three of them pre-existing, incl. the KF.W4 create
`aurora-opacity-ceiling.test.ts`), the **subjects themselves are real and mounted** (`CSSPasteDialog`
and `KeyframesAddDialog` imported from the demo tree; the stubs are behavioural — the `Textarea` stub
emits `update:modelValue`, the `Button` stub renders a real `<button>` carrying `disabled`), and the
durable cure is **escalated with its owner** (ESC-R1-7). The G10 probe is likewise honest against its
own falsifier: it imports one real `demo/**/*.vue`, asserts the module is a **compiled** component
(`render`/`setup` present — the assertion a resolve-only success cannot make), mounts it `attachTo:
document.body` and asserts a connected subtree carrying the component's own rendered text.
**KF-AV-18's cure corrects referents and deletes no comment** — the diff re-attributes the epoch cache
to `src/animation/resolve/browser.ts` and names value.js's genuine part (`isLayoutTrackingUnit`);
zero assertions were touched in `resize-tracks.test.ts` (only its prose). **The barrel deletes were
measured before they were spent**: ⟨cmd⟩ at the pre-delete ref `e2d04331`, `instrument/keyframes"` and
`instrument/timeline"` both **exit 1** — zero importers — so G4's green was taken by deletion of dead
code, never by adopting a promise nothing enforces.

**(4) Families.** Unit d's `MISS-β2 + ESC-KFW2-1 = ONE commit` is whole in `e2d04331`. R-1's five
MUST-CARRY edits ride the move in **one** commit (`a49e4ab1`, exactly six entries: the `git mv`, four
repoints, the docblock), and the KC-30 relocation is a **separate** commit (`34b051eb`) — D-14's
split, honoured. G8's declared three-limb pairing (the two `editor-shell/` corrections **+** the
KF-HA-14 move) is **broken, and the break is DECLARED IN THE COMMIT ITSELF**: `d399da1c`'s message
names the pairing, names the escalation and gives the measured reason
(`scripts/gates/census.mjs:528`, KF.W4 DO-NOT-TOUCH). That is the same treatment Check 1 accepted for
unit c's KF-AV-8 lock — legible from the tree, not only from the record (**MINOR D-3 below**, for the
record's own row cell being silent about it). **No split of meaning.**

**(5) E-3.** ⟨cmd⟩ `git show --stat` over all thirteen value.js commits of this wave: **not one**
touches `docs/tranches/X/keyframes/waves/KF-W8.md`, any sibling `KF-W*.md`, anything under
`docs/tranches/V/megatranche/registry/adjudicated/`, or any `keyframes/conformance/PASS-*` artefact.
The one edit to a prior artefact of this wave is `78e754ff` on `KF-W8-census.md` — **+152 insertions,
0 deletions**, an append of §7; units `a`/`b`'s bytes are unmoved. **E-3 HELD.**

**(6) Mail.** Four paths swept read-only at this seat's clock, classification from each row's **Status
cell**, `INBOX.md` self-excluded. The live `UNREAD` cells are **I-32 · I-33 · I-34**; this seat read
each Routing cell at the bytes: I-32 → *"the X formation mail seat / X-W0.j … and X-EXT-1..6"*; I-33 →
*"the X formation mail seat, which relays each sibling's section to that sibling's lane"*; I-34 →
*"X-W0.j / X-EXT-1, beside I-32"*. **I-35** is `READ + CONSUMED WHOLE` (KF.W6 `.l`). **No row is
addressed to KF.W8; 0 UNREAD in scope.** Repair 1's D-3 cure is confirmed at the rows themselves: the
relief is **ROUTING-based**, and I-33's letter does carry a `## 2 · keyframes.js` section — an inbound
the **X formation mail seat** still owes X·KF, not this wave's to consume.

**(7) The four-verb line** moved lawfully: AUDITED **YES** · SPECIFIED **YES** · IMPLEMENTED
**PARTIAL** (seven of eight units; unit `h` spent zero bytes and is wholly escalated) · VERIFIED
**NO** — ⟨cmd⟩ `grep -c 'Verification' KF-W8.md` → **0**, reproduced; the spec designates no seat, and
this seat stamps none. **No verb asserts an act that did not happen.**

**(8) The §Goal criterion, measured at the bytes by this seat — 2 of 4, and BOTH FALSE conjuncts map
onto a relieved RED gate.** *no demo module reaches around the two-entry exports map* → **FALSE** (2
statements: ESC-c1 · ESC-c2, both KF.W5's / a §Bounds widening — the G1/G2 relief) · *no module lives
above its only consumer* → **FALSE** (G5 = **1**, ESC-R1-3's KF.W7-created test; G6 = **0**, turned) ·
*no barrel or test file exists that nothing loads* → **TRUE** (0 barrels, 158 ≡ 158) · *the colocation
idiom is written down once and every banked colocation row re-derived against it* → **TRUE** (unit
`b`, census §6). **This is why the verdict is honest-RED and not CONFORMANT**: the criterion inherits
exactly the gates whose cure the wave's own §File Bounds forbid, and no conjunct is false for a reason
that has no owner.

**(9) Published figures.** Every figure Repair 1 prints reproduced at this seat's commands except the
four coordinates recorded at **MINOR D-1** below.

### 3 · Defect register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **MINOR** | **ESC-R1-4's four coordinates — and the census §3.3 substrate table they cite — do not reproduce at the settled bytes, because this wave's own commit moved them.** ESC-R1-4 prints `useDragCapture` *"`:215` the call"*, the block *"`:215-245`"* and the grant rows *"`:121-130` · `:219` · `:230` · `:235`"*. At `69095552` those read **`:219`** (the call), and **`:125-134`** (projector) · **`:223`** (ball rect) · **`:234`**/**`:239`** (call sites) — all **+4**, moved by `29b860fa` (the KF-AV-18 attribution cure, net +7 lines in the same file), which landed **before** the escalation was written. The census's §3.3 table is labelled **BINDING** and *"Unit h executes from THIS table"*, so the stale numerals sit in the one artefact a successor is told to execute from. **The escalation's SUBSTANCE is TRUE and this seat verified it independently at the current bytes** — `AnimationVisualizer.vue` imports `useDragCapture` (`:72`), not `useDragScrub`; the `project`-callback landing §3.3 makes binding therefore needs `:72` and the `useDragCapture({…})` block, neither in any §Bounds row; the only in-bounds alternative makes the seam acquire a rect read, and ⟨cmd⟩ `git grep -c 'getBoundingClientRect()' HEAD -- demo/composables/useDragScrub.ts` → **0**, G14's falsifier armed. **Mitigated in the tree**: §Bounds and §3.3 both state the extent **by CONTENT** (*"the projector's opening line through its closing `};`"*), and the close already books *"the §Bounds coordinate column is stale wave-wide"* as a residual. **Does not block** — no gate turns on it and no act misfired. | ⟨cmd⟩ `git grep -n 'useDragCapture\|progressFromPointerX\|getBoundingClientRect()' HEAD -- …/AnimationVisualizer.vue` vs. the same at `e2d04331`, both double-run | **A dated addendum-beside** at this record and at `KF-W8-census.md §3.3` restating the four anchors at `69095552` (`:125-134` · `:223` · `:234` · `:239`, import `:72`, seam call `:219`), and noting that `29b860fa` is what moved them. Prior bytes not edited. |
| **D-2** | **MINOR** | **ESC-R1-6 ("§Scope 9's RibbonBar-side spec input has no bounded home") is contradicted by this same seat's own act two escalations earlier.** Unit `e`'s two rulings were landed **inside `docs/tranches/X/keyframes/waves/KF-W8-census.md`** (value.js `78e754ff`, §7), a §Bounds `create` row — and G13's *"the ruling is in the tree"* went GREEN on exactly that reading. If the census is a lawful home for a ruling it is a lawful home for a spec input, so *"no doc create is bounded for the deliverable"* does not hold as written. **Nothing turns on it**: §Scope 9 carries no gate, and G15 is relieved by the spec's own text (*"This wave contributes the RibbonBar-side spec input and no byte"*) whether or not the input is written. **Does not block.** | ⟨cmd⟩ `git show --stat 78e754ff` → `KF-W8-census.md \| 152 ++++` ; §Bounds' `KF-W8-census.md · KF-W8-CLOSE.md \| create` row ; ESC-R1-6's own sentence | **A dated addendum-beside** either withdrawing ESC-R1-6 and landing §Scope 9's deliverable in the census beside §7, or stating why the census row is unit-`a`-only and unit `e`'s §7 rode a different grant. |
| **D-3** | **MINOR-with-mitigation** | **The Repair-1 table's row 5 does not name the commit-family break it took.** G8's *Authority* clause and the `EditorStartScreen.vue:102` §Bounds row bind the two `editor-shell/` corrections to the **KF-HA-14 move's** commit; the move is ESC-R1-1 and never landed, so the family of three landed as two. The record's cell says only *"both enumerated sites in ONE commit"*. **Mitigation, already in the tree and load-bearing**: `d399da1c`'s own message carries **"DECLARED BREAK OF THE PAIRING"** with the measured reason, so the break is legible from `git log` without the record — the standard Check 1 applied to unit c's KF-AV-8 lock. **G8's GREEN is sound**: the falsifier's same-commit clause binds a correction to *"the move that made it stale"*, and the `editor-shell/` staleness pre-dates this wave; the corrections are true at the bytes with `HeroAurora` where it stands. **Does not block.** | ⟨cmd⟩ `git show d399da1c --format=%B` ; §Gates G8 *Authority*: *"both leg-(i) sites land in **one** commit with the KF-HA-14 move"* | One line at the Repair-1 row and at ESC-R1-1 naming the declared break, so the record matches the commit. When the move lands, `App.vue:148`'s referent needs a second correction — owner: ESC-R1-1's. |
| **D-4** | **INFO** | **KF.W10 is lawfully blocked, on TWO conjuncts, not one.** Its `Opens after` reads *"… X.KF.W2 · W4 · W5 · W6 · W7 · W8 · W9 **IMPLEMENTED**"*. **KF.W8 is PARTIAL** (unit `h` unspent) and **KF.W9 is itself PARTIAL** (6 of 13 gates GREEN, closed honest-RED). Of the conjuncts this wave owns: W0 · W4 · W5 GREEN and W6's scoped G7 conjunct GREEN (W6's R4-1 atomic commit landed — leg (ii) reads 3 exports with `EditorHeader` gone). D-5's partial discharge holds: `KF-W10 §6.D`'s `KF-W8-R-4-STRUCT-PAIR` FOLD-FORWARD row now **has** a committed source (census §7.2). **No other wave names KF.W8 in an `Opens after`.** | ⟨cmd⟩ `grep -m1 '^\*\*Opens after\*\*' KF-W10.md` ; the LEDGER's KF.W9 and KF.W10 rows ; §Gates G7 leg (ii) re-run | No act. Recorded so the successor's blocker is legible from this end. |

### 4 · Honest-RED adjudication (axis 10) — SEVEN gates, each relief cited at the bytes

**G1 · G2 · G3 · G15 — relieved by the SPEC'S OWN TEXT** (Check 1's adjudication, re-derived here, not
inherited):

- **G1 / G2** — the spec says so in its own voice: G1's *Blocked by* is *"KF.W5's ruling — **both**
  clauses are unreachable while zero compliant paths exist"*, and G2's closing line is *"**The gate
  MEASURES; KF.W5 DECIDES.**"* The two survivors are the two escalations. **ESC-c1**
  (`KeyframeTimeline.vue:363`): re-run by this seat — the file is named **8** times in the spec and
  **0** times inside §Bounds (⟨cmd⟩ `awk 'NR>=81 && NR<=139' KF-W8.md \| grep -c 'KeyframeTimeline'`
  → **0**; whole file → **8**), so the cure is out of bounds by measurement. **ESC-c2**
  (`bumpLayoutEpoch`): §Bounds holds `src/animation/index.ts · public.ts · load-engine.ts`
  **read-only (W5 writes)**, and the symbol mutates module-private state, so a demo copy would be the
  masking regression the seat law forbids. **Owners: KF.W5 addendum-beside, or `KF-W10 §6.D`.**
- **G3** — the one surviving body is the demo's; retiring it needs the **package**-surface half, which
  §Bounds holds read-only for W5. The `src/` half — the half this wave could lawfully spend —
  **landed** (3 bodies → 2, one body in `src/`). **Owner: ESC-d1 → KF.W5 addendum-beside or
  `KF-W10 §6.D`.**
- **G15** — the spec names this RED itself: *"**Cannot go green independently** — hard-bundled with
  `kf-ChannelControls` **L-2/C-2** … This wave contributes the RibbonBar-side spec input and **no
  byte**"*, and the falsifier *"a G15 recorded green on a KF.W8 commit is itself the defect"*.
  **Zero KF.W8 bytes on `RibbonBar.vue`** and leg 2 still holds at exactly the two permitted pad
  lines. **Owner: the L-2/C-2 structural settlement.**

**G5 · G7 · G14 — relieved by a MEASURED out-of-bounds cure, each obstacle re-verified at the bytes by
this seat.** The standing law makes a write outside §File Bounds an **ESCALATION**, so a gate whose
only cure lies there is not unspent work; it is a gate the wave may not lawfully turn. **This seat
accepted none of the three on the register's word:**

- **G5** — the survivor is `TimelineTrack.vue:296` → `../TimelineCaret.vue`. The move repoints
  **`test/demo/instrument/timeline-mount-keyboard.test.ts`** (⟨cmd⟩ `git grep -n 'TimelineCaret\|timeline-caret'
  HEAD -- test` → `:28` the import, `:301` the mount, and the rename additionally moves the
  `.timeline-caret` / `.timeline-caret-readout` selectors that file reads at `:309` `:437` `:440`
  `:450`). **§Bounds names that file by path as KF.W7's create** (the DH-3 four-party declaration:
  *"KF.W7 — 4 creates (… `timeline-mount-keyboard.test.ts` …)"*) and gives this wave **no row** for
  it; the nine tracked files it enumerates as READ-ONLY do not include it. *"A unification that
  leaves a test on a deleted module is a broken tree, not a green gate"* — G3's own words, binding
  here. **ESC-R1-3; owner: §Bounds widening by dated addendum-beside.** Agrees with census §6.6
  residual 1, derived independently.
- **G7** — leg (iv) convicts on two files and **both cures are walled by the spec's own bytes**.
  (1) `HeroAurora`: its discharge is the move, and ⟨cmd⟩ `git grep -n 'HeroAurora' HEAD -- scripts` →
  **`scripts/gates/census.mjs:528`**, the literal path, inside a file §Do NOT touch assigns to KF.W4
  (*"every gate script under `scripts/gates/**` (KF.W4)"*); this seat measures **two further**
  unbounded repoint sites the move needs — `test/demo/instrument/aurora-opacity-ceiling.test.ts:62`
  (a KF.W4 create, no §Bounds row) and **`demo/app/App.vue:163-164`**, the dynamic import, which lies
  **outside** the `App.vue (:144)` carve this wave holds. (2) `TypingDots`: externally consumed by
  `typing-dots-engine-seam.test.ts:39` (also a KF.W4 create) while **G7's own falsifier names adding
  that export as a failure mode, by this file's name** — two clauses of the wave's own instrument
  disagree at one file, and the falsifier forbids resolving it by widening. **ESC-R1-1 / ESC-R1-2;
  owners: KF.W4 addendum-beside (roster re-point) + a §Bounds row for the test, and a dated
  addendum-beside at G7 ruling the test-importer question.**
- **G14** — the only projector host this wave bounds is `AnimationVisualizer.vue`, and its cure has no
  in-bounds landing. Verified by this seat: the file's drag lifecycle is **`useDragCapture`** (`:72`
  import, `:219` call), not `useDragScrub`, so the `project`-callback landing the census makes
  **BINDING** requires rewriting both — **neither in any §Bounds row for this file** (`:70-78` ·
  `:79` · `:122-191` · the R5-4 SOURCE row). The in-bounds alternative is either the rival mechanism
  §3.3 forbids or makes the seam acquire a rect read, which **G14's own falsifier fails by name**
  (⟨cmd⟩ seam `getBoundingClientRect()` → **0**, armed and satisfied). The swap is additionally a
  behavioural change (window listeners vs element-scoped capture; `useDragCapture`'s `e.button !== 0`
  guard has no counterpart on the seam), i.e. a grant question and an evaluation, never a seat's
  improvisation. **Zero bytes spent on either file — no half-cure bought.** **ESC-R1-4; owner:
  §Bounds widening by dated addendum-beside, taken with that evaluation.**

**The honest-RED set is `G1 · G2 · G3 · G5 · G7 · G14 · G15` — seven — and the GREEN set is
`G2 c2 · G4 · G6 · G8 · G9 · G10 · G11 · G12 · G13` plus the outside gate `G-W2-2`. 7 + 8 = 15, the
whole §Gates set, so the partition is total and no gate is unadjudicated.** ⟨*Counting rule, stated AT
the receipt, the same rule Repair 1's D-2 cure published: **one unit = one GATE ID**, never a leg or a
clause — G1's two clauses are one gate, G7's four legs are one gate, G15's two legs are one gate. G2
is counted RED because clause 1 is RED, though its clause 2 is the GREEN this wave held.*⟩
**RED-UNATTEMPTED: 0.** **Unrelieved RED: 0.**

### 5 · Successor conjuncts

**KF.W10** is the only wave naming KF.W8 in an `Opens after`. Of its conjuncts this wave bears on:
**X.KF.W8 IMPLEMENTED → NOT MET** (the row is `PARTIAL`; unit `h` unspent), and independently
**X.KF.W9 IMPLEMENTED → NOT MET** (that row is itself PARTIAL). **KF.W10 is therefore lawfully
blocked, and on two conjuncts, not one** — recorded at D-4. Its `KF-W8-R-4-STRUCT-PAIR` FOLD-FORWARD
row does now have a committed source (census §7.2), which is D-5's partial discharge, re-verified
here. This wave's own inbound conjuncts are **GREEN**: KF.W0 · KF.W4 · KF.W5 closed, and KF.W6's
**scoped** conjunct (the R4-1 atomic commit, for G7's measurement only) is landed — leg (ii) reads
**3** exports with `EditorHeader` gone from the barrel and from the directory.

### 6 · SELF-COUNT

Conditions re-run by this seat **16** (15 §Gates + G-W2-2), each by the gate's own literal command,
**16 reproduce · 0 fail** · commits inspected **22** (9 kf repair commits read as full diffs, 5 kf
close commits and 13 value.js commits by `--stat`; `git diff --name-only e2d04331..HEAD` read whole) ·
tree-health harnesses re-run **5**, all five identical to Repair 1's figures · product/test files read
whole **7** (the four creates, `groupShortcuts.ts`, and the two cured SFC/spec diffs) · defects **4**
(0 BLOCKER · 0 CRITICAL · 0 HIGH · 0 MEDIUM · 3 MINOR · 1 INFO; numbered D-1…D-4, no gap) ·
honest-RED gates **7**, GREEN gates **8**, **7 + 8 = 15** · escalations re-verified at the bytes **4
of 7** (ESC-R1-1 · -2 · -3 · -4 — the three gate-bearing ones plus the TypingDots predicate; ESC-R1-7
verified at the producer resolution; ESC-R1-5 and ESC-R1-6 read at §Bounds) · double-runs **16 of 16
`SAME`**. Every figure in this section was produced by a command at the settled bytes by **this**
seat; none is inherited from the close, Check 1, Repair 1 or a unit receipt.

**Status: the row is promoted to `CLOSED 2026-09-17 (honest-RED: G1 · G2 · G3 · G5 · G7 · G14 ·
G15)`.** The ledger's own vocabulary conditions `CLOSED` on *"verify-only close + fresh check
CONFORMANT"*, and this is that check; `IMPLEMENTED` is **not** stamped and the `PARTIAL` reading
stands beside the promotion, exactly as the KF.W9 and X-W3 rows already record it.
