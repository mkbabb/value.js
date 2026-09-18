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
