SERVED MODEL: claude-opus-5[1m]

# X.KF.W8 — THE RE-BASELINED CENSUS (unit a)

**Authority**: `docs/tranches/X/keyframes/waves/KF-W8.md` §Units row `a` · §Goal criterion · §Scope 1 ·
§Carry D-19 rows 1–12 · §Carry LAW A CENSUS A-1…A-10 · G14 limb 3. **Created by**: unit `a`, seat 1 of
the KF.W8 execution, 2026-09-18. **§Bounds authority for this file**: the `KF-W8-census.md` **create**
row.

**What this file is.** The spec's every load-bearing figure was measured at `origin/master 81a56990`
in August. That ref is **seven waves stale**. This census re-derives each figure at the *execution*
substrate, prints the command that produces it beside its output, and sets each reading beside the
spec's dated one. **E-3 governs throughout: the spec's readings are RECORDED as its dated readings and
are never struck.** Where a figure moved, this file says so, says by how much, and names the wave that
moved it where that is measurable. **Every downstream number in KF.W8 binds to this artefact**, and
**G14's host enumeration is this file's and binds that gate** (spec G14 limb 3: *"Which lines are
projectors … is unit a's enumeration — the gate binds to that enumeration, never to `11`"*).

---

## §0 · THE SUBSTRATE

```
⟨cmd⟩ cd /Users/mkbabb/Programming/keyframes.js && git rev-parse HEAD origin/master master
1fa98a5d8fa53cd6b408b3094195b9f8c12ab32f
1fa98a5d8fa53cd6b408b3094195b9f8c12ab32f
1fa98a5d8fa53cd6b408b3094195b9f8c12ab32f
```

**`master == origin/master == HEAD == 1fa98a5d`.** Not the spec's `81a56990`. Between the two refs the
Track-B execution landed **KF.W0 · KF.W1 · KF.W2 · KF.W4 · KF.W5 · KF.W6 · KF.W7**, every one of which
wrote demo or test bytes this census measures. The local `8281638c` the spec's provenance disqualifies
is not this substrate either — the §B-12 reset made the sacred checkout the execution substrate
(COHESION §0j.C · KF-WRITE (b)), and `master` now *is* `origin/master`.

```
⟨cmd⟩ git status --porcelain            (/Users/mkbabb/Programming/keyframes.js)
?? docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md
?? docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md
                                        → 2 rows, both untracked, neither in any KF.W8 writable set
```

**Crash-recovery (STANDING LAW).** `git status --porcelain` was run in both repos before any act. The
kf worktree carries the two untracked letters above and nothing else. The value.js worktree carries 15
rows, **none** of them `docs/tranches/X/keyframes/waves/KF-W8-census.md` — this file did not exist
before this seat wrote it (`ls` → *No such file or directory*). **Nothing inherited, nothing stashed,
nothing outside the writable set touched.**

**WRITE-THEN-MEASURE.** Every figure below was produced twice from the settled bytes. A consolidated
double-run harness is pasted at §4; **every published figure came back identical on both runs** and no
figure in this file is transcribed from the spec, from the wave record, or from a prior pass.

---

## §1 · D-19, RE-DERIVED ROW BY ROW AT `1fa98a5d`

The spec's cell is quoted as its **dated reading at `81a56990`**; this seat's reading is measured. The
`consequence` column states what survives, what moved, and who moved it.

### D-19-1 — `convertPixelsToCh` + `debounce`

```
⟨cmd⟩ git grep -nE 'debounce|convertPixelsToCh' HEAD -- demo/utils/helpers.ts
HEAD:demo/utils/helpers.ts:15:/** Trailing-edge debounce; each call resets the timer. */
HEAD:demo/utils/helpers.ts:16:export function debounce<Args extends unknown[]>(
HEAD:demo/utils/helpers.ts:28:export const convertPixelsToCh = (pixels: number, element: HTMLElement): number =>

⟨cmd⟩ git show HEAD:src/animation/resolve/browser.ts | sed -n '1,4p'
import { isLayoutTrackingUnit } from "@mkbabb/value.js/value";
import type { CssValue } from "@mkbabb/value.js/value";
import { parseCssScalar, requireParsed } from "../compile/parse-facade";
import { serializeCssValue } from "../compile/emit/css-text";

⟨cmd⟩ git grep -n 'addEventListener("resize"' HEAD -- src/animation/resolve/browser.ts
HEAD:src/animation/resolve/browser.ts:23:    window.addEventListener("resize", bumpLayoutEpoch, { passive: true });
```

**UNMOVED, in every particular.** `debounce:16` · `convertPixelsToCh:28` are demo-owned at exactly the
spec's coordinates; `helpers.ts:9` is still the single surviving reach; `browser.ts:1-2` still bear
`@mkbabb/value.js/value` and `:23` still installs the module-eval resize listener. **The mechanism
SURVIVES, indirected — grade unchanged.** The call sites are `CSSCodeEditor.vue:58`/`:60`,
`useKeyframeOps.ts:4`, `useKeyframesParsing.ts:1`, `useKeyframesState.ts:1`, all `@utils/helpers`
(the spec's CARRY coordinates `CSSCodeEditor:40/:42` remain stale, as D-19-1 already found).

### D-19-2 — the in-tree witness naming this wave

```
⟨cmd⟩ git show HEAD:demo/utils/helpers.ts | sed -n '1,8p'
/**
 * Demo-owned helpers, re-homed from the library's internal substrate at the
 * Glass-7 consume (V.W2). The library's encapsulation sweep (V.W6) measured
 * these dead on the src tree and deleted them; the consumed demo is their
 * real owner and holds them here rather than reaching into library
 * internals (the CT-04 defect class — the remaining deep-import retirement
 * belongs to the folded-forward demo settlement wave).
 */
```

**UNMOVED at `:1-8`, byte-identical to the spec's quotation.** The live witness naming this wave
survives; **G1 may still cite it.**

### D-19-3 — KF-KE-15's closure figure

```
⟨cmd⟩ git grep -n 'from "@src/' HEAD -- demo/components/instrument/keyframes
HEAD:…/keyframes/composables/useKeyframeOps.ts:1:import { reverseCSSTime } from "@src/animation/compile/emit/css-text";
HEAD:…/keyframes/utils/parseAnimationCSS.ts:7:import { serializeTimingFunction } from "@src/animation/compile/emit/css-text";
                                                                          → 2 (run 1 = run 2)
```

**The `keyframes/` directory figure is UNMOVED at 2** — the spec's correction of the banked
`6 / 8 / 1` holds, and `internal/helpers` is still reached from `timeline/`, not `keyframes/`.

**The wave-wide denominator MOVED.** G1 clause 1's set is **8 statements / 7 files / 4 library
modules**, where the spec read **7 / 6 / 4**:

```
⟨cmd⟩ git grep -n 'from "@src/' HEAD -- demo
HEAD:demo/components/instrument/keyframes/composables/useKeyframeOps.ts:1   reverseCSSTime          → compile/emit/css-text
HEAD:demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:7      serializeTimingFunction → compile/emit/css-text
HEAD:demo/components/instrument/timeline/KeyframeTimeline.vue:363           serializeCssValue       → compile/emit/css-text   ← THE EIGHTH
HEAD:demo/components/instrument/timeline/utils/timelineEngine.ts:1          camelCaseToHyphen       → internal/helpers
HEAD:demo/components/instrument/timeline/utils/timelineEngine.ts:16         serializeCssValue       → compile/emit/css-text
HEAD:demo/components/playback/AnimationVisualizer.vue:65                    bumpLayoutEpoch         → resolve/browser
HEAD:demo/utils/helpers.ts:9                                                convertToPixels         → resolve/browser
HEAD:demo/utils/keyframeSelector.ts:5                                       namedSelectorToFraction → compile/selector
                                                    → 8 statements / 7 files (run 1 = run 2)
```

**The eighth statement — `KeyframeTimeline.vue:363` — did not exist at `81a56990` and appears in no
§Bounds row of this spec.** The reached-module set is unchanged at four. Recorded here as the census's
finding; the disposition is **unit c's**, and this seat books no act against it.

### D-19-4 — KF-AV-8's build-break

```
⟨cmd⟩ git grep -nE 'bumpLayoutEpoch|@mkbabb/value.js' HEAD -- demo/components/playback/AnimationVisualizer.vue
HEAD:…/AnimationVisualizer.vue:65:import { bumpLayoutEpoch } from "@src/animation/resolve/browser";
HEAD:…/AnimationVisualizer.vue:66:import { clamp } from "@mkbabb/value.js/math";
HEAD:…/AnimationVisualizer.vue:99:useResizeObserver(containerEl, () => bumpLayoutEpoch());
```

**IDENTITIES UNMOVED, COORDINATES MOVED +20.** The deep import is `:65` (spec `:45`); the genuine
`clamp` import is `:66` (spec `:46`); the WIRE — KF-AV-9's re-anchored subject — is **`:99`** (spec
`:79`), with its `useResizeObserver` import at `:64`. The "uncommitted repair" is still committed; the
build-break remains a local-HEAD fact only. **Every KF-AV-* coordinate in §Bounds is +20 at this
substrate**; the §Bounds rows are anchored by subject (R4-5(a)/R5-4 state their extents by content),
so the grants resolve — but **no seat may execute from the spec's coordinate column**, which is the
PASS-6 D-1 defect one substrate on.

### D-19-5 — the structural census (`src/` single-child + stutters)

```
⟨cmd⟩ git ls-tree --name-only HEAD -- src/
src/animation                                                          → ONE child (run 1 = run 2)

⟨cmd⟩ git ls-tree -r --name-only HEAD -- src | awk -F/ '{f=$NF;sub(/\.ts$/,"",f);if(f==$(NF-1))print}'
src/animation/compile/emit/backward/backward.ts
src/animation/compile/emit/format/format.ts
src/animation/group/group.ts
src/animation/orchestration/sequence/sequence.ts
src/animation/orchestration/split-text/split-text.ts
src/animation/orchestration/timeline/timeline.ts
src/animation/orchestration/view-transition/view-transition.ts
src/animation/physics/spring/solver/solver.ts
                                                                       → 8 (run 1 = run 2)
```

**UNMOVED — single-child CONFIRMED, stutters 8 = 8, path for path.** The banked `16` remains
UNREPRODUCED (no command was ever recorded for it — L-9), exactly as the spec found. **G13 cites 8
with this command, never the bare number.** KF.W5's `G-STRUCT` leg-2 rename programme left the eight
untouched, which is what makes R-4's paired decline still a live ruling rather than a moot one.

### D-19-6 — the home-hero trio

```
⟨cmd⟩ git grep -nF 'HeroAurora.vue"' HEAD -- demo test
HEAD:demo/app/App.vue:164:    () => import("@components/instrument/shell/HeroAurora.vue"),
HEAD:test/demo/instrument/aurora-opacity-ceiling.test.ts:62:    await import("@components/instrument/shell/HeroAurora.vue");
                                                                       → 2 (run 1 = run 2)

⟨cmd⟩ git grep -nF 'HeroAurora' HEAD -- demo/app/App.vue
HEAD:demo/app/App.vue:59:             down. The subtlety bound lives in HeroAurora          (prose)
HEAD:demo/app/App.vue:62:            <HeroAurora />                                        (template mount)
HEAD:demo/app/App.vue:163:const HeroAurora = defineAsyncComponent(
```

**THE CONCLUSION STANDS; THE BASIS MOVED TWICE.** U.B5's trio is still a duo and `HeroAurora`'s home
is still `demo/app/`'s neighbourhood — but (i) `App.vue`'s import is now **`defineAsyncComponent`**
at `:163-164`, not the static `:147` the spec measured, and (ii) a **second** consumer exists:
`test/demo/instrument/aurora-opacity-ceiling.test.ts:62`, a **KF.W4 create**, likewise dynamic. See
**A-8** for the full consumer set and the `scripts/gates/census.mjs` finding that rides it.

### D-19-7 — m-4, "the directory named for the component doesn't contain it"

```
⟨cmd⟩ git ls-tree -r --name-only HEAD -- demo/components/instrument/transport/controls-pane
demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.css
demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue
demo/components/instrument/transport/controls-pane/RibbonBar.vue
```

**UNMOVED — it still does not reproduce as worded.** The directory contains its namesake plus
`RibbonBar.vue`. **MEASURED-DIVERGENT stands**: unit h re-derives m-4 against the ratified idiom before
any directory settle; not dropped, not executed on a stale mechanism.

### D-19-8 — the test denominators

```
⟨cmd⟩ git ls-tree -r --name-only HEAD -- test | grep -c '\.test\.ts$'            → 152
⟨cmd⟩ git ls-tree -r --name-only HEAD -- test/demo | grep -c '\.test\.ts$'       → 35
⟨cmd⟩ git ls-tree -r --name-only HEAD -- test/demo/instrument | grep -c '\.test\.ts$'  → 16
⟨cmd⟩ git ls-tree -r --name-only HEAD -- bench | grep '\.test\.ts$'
bench/d3-changed-keys.measure.test.ts
bench/sync-step.measure.test.ts                                                  → 2
                                                            (each figure: run 1 = run 2)
```

**ALL THREE DENOMINATORS MOVED, materially**: **130 → 152** tracked `test/**/*.test.ts`, **27 → 35**
under `test/demo/`, **9 → 16** under `test/demo/instrument/`. The two `bench/` orphans are unmoved and
remain G9's RED members by identity. **The `9` in §Bounds' enumerated-by-name row is a ROSTER, not a
count**, and the roster has grown by seven:

```
⟨cmd⟩ git ls-tree -r --name-only HEAD -- test/demo/instrument
KfPillTabs.test.ts  ios-text-entry.test.ts  kf-toolbar-keyboard.test.ts  resize-tracks.test.ts
timeline-undo.test.ts  transport-play-actuation.test.ts  useAnimationGroupPlayback.test.ts
useThrottledReadout.test.ts  value4-editor-boundary.test.ts                    ← the spec's NINE
aurora-opacity-ceiling.test.ts  typing-dots-engine-seam.test.ts                ← KF.W4 creates
highlight-css-roundtrip.test.ts                                               ← KF.W5 create
sequence-scrubber-mount.test.ts  timeline-hover-preview.test.ts
timeline-mount-keyboard.test.ts  timeline-mount-projection.test.ts             ← KF.W7 creates
                                                                       → 16 (9 + 7)
```

**The DH-3 four-party declaration is TRUE at this substrate and now visible in the tree**: all seven
new files are exactly the creates DH-3 attributes to KF.W4 (2), KF.W5 (1) and KF.W7 (4). **The nine
read-only files are unmoved and all nine are present.** The case-count `1 051` was never re-derived and
is cited by no gate — unchanged.

### D-19-9 — the up-import denominator

```
⟨cmd⟩ git grep -nE 'from "\.\./[A-Z][A-Za-z]*\.vue"' HEAD -- demo
HEAD:demo/components/instrument/keyframes/components/KeyframeCardList.vue:46:import KeyframeCard from "../KeyframeCard.vue";
HEAD:demo/components/instrument/timeline/components/TimelineTrack.vue:296:import TimelineCaret from "../TimelineCaret.vue";
                                                                       → 2 (run 1 = run 2)

⟨cmd⟩ git ls-tree -r --name-only HEAD -- demo | grep -i 'KfPillTabs'    → exit 1 (the file is gone)
```

**RED AT 2, NOT 3 — and the missing member is accounted for, not lost.** The fold seat's third site
(`ChannelControls.vue:229 → ../KfPillTabs.vue`) **died with its component**: `KfPillTabs.vue` no longer
exists in the tree, deleted in **KF.W6's S-1 / KPT-SUP-4 family** — the migration is narrated in
`test/demo/instrument/KfPillTabs.test.ts:1-15`, which KF.W6 rewrote onto glass-ui 7.0.0's published
`useSelectionGroup` rather than deleting. **D-19-9's warning is therefore DISCHARGED, not ignored**:
G5 may go green on two sites because the third is gone, not because a seat looked away. The two
survivors are exactly unit f's, both bounded (`KeyframeCardList.vue` · `TimelineTrack.vue`), with
coordinates moved `:31 → :46` and `:116 → :296`.

### D-19-10 — AnimatedText's importer basis

```
⟨cmd⟩ git grep -nF 'AnimatedText' HEAD -- demo test
HEAD:…/shell/EditorStartScreen.vue:29:  … the per-CHAR wave (AnimatedText, T.D10) + the        (prose)
HEAD:…/shell/EditorStartScreen.vue:66:            <AnimatedText text="Select an animation" />    (template)
HEAD:…/shell/EditorStartScreen.vue:137:import AnimatedText from "./AnimatedText.vue";           ← THE ONE IMPORT
HEAD:…/shell/TypingDots.vue:4:  (the old AnimatedText `.dot-fade` was ONE span fading as a     (prose)
HEAD:…/shell/TypingDots.vue:93:// glyph wave runs on `--wave-cycle: 3600ms` (`AnimatedText.vue`'s own root  (prose)
HEAD:demo/styles/font-roles.json:21: … AnimatedText's two private class strings …              (prose/JSON note)
```

**THE FOLD SEAT'S CORRECTION HOLDS AND SHARPENS.** Still **one importer**, still shell-local, now at
`:137` (spec `:62`). `TypingDots.vue` mentions it in **two** comments (`:4` and `:93`) — both prose,
neither an import, exactly as D-19-10 ruled of `:4` alone. **AnimatedText STAYS in `shell/`** under
KF.W8-I; moving it would manufacture the up-import G5 forbids. §Bounds' `AnimatedText.vue | stays` row
is re-confirmed at this substrate.

### D-19-11 — the G14 host list

```
⟨cmd⟩ git grep -c 'getBoundingClientRect()' HEAD -- demo        → 11 files   (run 1 = run 2)
⟨cmd⟩ git grep -n 'getBoundingClientRect()' HEAD -- demo | wc -l → 13 lines   (run 1 = run 2)
⟨cmd⟩ git grep -c 'getBoundingClientRect' HEAD -- demo/composables/useDragScrub.ts → exit 1 (ZERO)
```

**MOVED 11 lines / 10 files → 13 lines / 11 files.** `useDragScrub` still measures **zero** — it
receives geometry, so the gate's own falsifier clause on the seam is unbroken. **The enumeration,
which is the binding artefact, is §3 of this file**, where the two new lines are named, classified and
dispositioned. The fold seat's finding that `useDragScrub` has zero rect reads survives unchanged.

### D-19-12 — the barrel family

```
⟨cmd⟩ git ls-tree -r --name-only HEAD -- demo/components | grep 'index\.ts$'
demo/components/instrument/keyframes/index.ts
demo/components/instrument/shell/index.ts
demo/components/instrument/timeline/index.ts                           → 3 (run 1 = run 2)

⟨cmd⟩ git cat-file -e HEAD:demo/components/instrument/index.ts            → fatal: does not exist
⟨cmd⟩ git cat-file -e HEAD:demo/components/instrument/transport/index.ts  → fatal: does not exist
```

**THE FIVE-SITE FAMILY IS TWO LIVE SITES AT THIS SUBSTRATE.** The spec's repair-round-1 correction —
*"the family is FIVE sites"* — was true at `81a56990`. Site by site, at `1fa98a5d`:

| family site | state at `1fa98a5d` | disposition |
|---|---|---|
| `instrument/index.ts` — **the umbrella**, whose `:24-27` were the four `export *` lines | **ABSENT** | deleted by a predecessor wave; the four `export *` lines it hosted are gone with it. **G4 clause 4 is GREEN BEFORE THIS WAVE SPENDS A BYTE** |
| `instrument/transport/index.ts` (14 L) | **ABSENT** | same; **G4 clause 1 GREEN-BEFORE-CURE** |
| `instrument/shell/index.ts` | **PRESENT — 3 exports** (`EditorShell` · `EditorStartScreen` · `SharePopover`) | **NO ACCESS** — §Bounds struck this row at repair round 4 (R4-5(c)); **KF.W6 is the barrel's sole write owner and has already cut it** (the `EditorHeader` line struck in its R4-1 atomic commit). Not this wave's byte |
| `instrument/keyframes/index.ts` — **and KF-CE-40's member export inside it** | **PRESENT — 3 members**, `KeyframesEditor:7` · `KeyframesStringControls:8-10` · **`CSSCodeEditor:11` = KF-CE-40** | **LIVE, in bounds, unit e's** |
| `instrument/timeline/index.ts` | **PRESENT — 2 members**, `KeyframeTimeline:6` + `export type { TimelineKeyframe }:8` | **LIVE, in bounds, unit e's** |

**KF-CE-40 is not a fifth file — it is line `:11` of the second site**, re-derived here from the
registry: `kf-CSSCodeEditor.md:76` (*"the barrel's lazy `CSSCodeEditor` export is dead code … both
consumers import statically"*) and `:101` (*"D-5 / L-M5's `keyframes/index.ts:11` sub-citation"*). Both
statements reproduce at this substrate — the two consumers are `KeyframesStringControls.vue:57` and
`KeyframeTimeline.vue:357`, **both static SFC imports** (A-2). **The one ruling therefore still has
five sites to speak to, and exactly TWO files to act on**, which is the reading G4's four clauses
already carry (2 RED / 2 GREEN-BEFORE-CURE). **The two NO-WAVE-OWNER banked ids (M-L3 · L-16-RESCOPED
+ RR-2 M4) keep their owners and are not annexed here.**

---

## §2 · LAW A CENSUS — RE-DERIVED FROM THE IMPORT GRAPH AT `1fa98a5d`

**Nothing below is inherited** from `KF-W6-CARRY.md`, from the spec's own text, from the wave record,
or from a prior pass. Each census is (1) a **specifier** sweep over every path-tail and alias-root
spelling that reaches the module ∪ (2) a **symbol** sweep whose every hit is resolved to its own import
specifier and compared against the module's path. **Prose, template, gate-script and patch-artifact
hits are recorded as non-import context and never counted as consumers.**

| # | act (owner unit) | module `M` @ path `P` | (1) specifier census @ `1fa98a5d` | (2) symbol census, resolved | consumer set | vs spec |
|---|---|---|---|---|---|---|
| **A-1** | delete-or-gate (e · G4) | `demo/components/instrument/index.ts` | `git cat-file -e HEAD:…/instrument/index.ts` → **fatal: does not exist** · `git grep -nE 'from "[^"]*(@components/)?instrument"' HEAD -- demo test src scripts` → **exit 1** | **module absent — no symbol to sweep** | **MOOT — the module is gone** | 0 → **MOOT** |
| **A-2** | delete-or-gate (e · G4) | `demo/components/instrument/keyframes/index.ts` | `git grep -nE 'from "[^"]*instrument/keyframes"' HEAD -- .` → **exit 1** · relative `"./keyframes"`/`"../keyframes"` sweep → **exit 1**. **The umbrella's `export * from "./keyframes"` is GONE with the umbrella**, so the barrel now has *no* inbound reference at all | `KeyframesEditor` → `SpringPhysicsFacet.vue:145` imports **the SFC** · `KeyframesStringControls` → `ChromeDock.vue:267` + `ChannelControls.vue:206`, both **the SFC** · `CSSCodeEditor` (**KF-CE-40**) → `KeyframesStringControls.vue:57` + `KeyframeTimeline.vue:357`, both **the SFC**, both **static** | **0** | 0 → **0** ✅ |
| **A-3** | delete-or-gate (e · G4) | `demo/components/instrument/timeline/index.ts` | `git grep -nE 'from "[^"]*instrument/timeline"' HEAD -- .` → **exit 1** · relative sweep → **exit 1**; the umbrella ref is gone. ⟨LAW A(2) resolution, the W6 failure class — **still live**: the `test/**` hits on `orchestration/timeline` resolve to `src/animation/orchestration/timeline`, a library sibling with the same basename, **not** a consumer of `P`⟩ | `KeyframeTimeline` → `ChannelControls.vue:207` hand-wraps `import("../../timeline/KeyframeTimeline.vue")` — **the SFC** · `TimelineKeyframe` → **9 consumers, ALL importing `timelineTypes`** (`KeyframeTimeline.vue:373` · `TimelineHoverPreview.vue:194` · `TimelineTrack.vue:300` · `useTimelineBuild.ts:6` · `useTimelineOps.ts:3` · `snapshotCapture.ts:2` · `timelineEngine.ts:9` · `timeline-hover-preview.test.ts:14` · `timeline-undo.test.ts:5`) — **the type's real home, never the barrel** | **0** | 0 → **0** ✅ (the type's consumer count 8 → 9) |
| **A-4** | delete-or-gate (e · G4) | `demo/components/instrument/transport/index.ts` | `git cat-file -e` → **fatal: does not exist** · `git grep -c 'instrument/transport"' HEAD -- demo test` → **exit 1** | **module absent** | **MOOT — the module is gone** | 0 → **MOOT** |
| **A-5** | move + repoint (f · G6 · R-1) | `demo/components/CopyButton.vue` | `git grep -nF 'CopyButton.vue"' HEAD -- .` → **4 live imports**, all `@components/CopyButton.vue`: `KeyframeCard.vue:133` · `KeyframesEditor.vue:233` · `EasingTarget.vue:181` · `StartingStyleTarget.vue:150`. **Non-import context** (never counted): `docs/tranches/V/audit/harness/w1-rehearsed.patch:69` | symbol `CopyButton` adds template uses (`KeyframeCard.vue:62` · `KeyframesEditor.vue:178` · `EasingTarget.vue:43` · `StartingStyleTarget.vue:118`) and **prose** (`useToolbarKeyboard.ts:25` = R-1's docblock target · `KeyframesEditor.vue:391` · `EditorShell.vue:165` · `TypingDots.vue:28` · `EasingTarget.css:83` · `EasingTarget.vue:18`) | **4 — exactly the four R-1 names** | 4 → **4** ✅ *(all four coordinates moved; §Bounds' four one-line carve rows are re-anchored at §5)* |
| **A-6** | move (f · G5 · KC-30) | `…/instrument/keyframes/KeyframeCard.vue` | `git grep -nF 'KeyframeCard.vue"' HEAD -- .` → **1**: `keyframes/components/KeyframeCardList.vue:46` (`"../KeyframeCard.vue"`) | `KeyframeCardList.vue` template + prose at `KeyframesEditor.vue:146` and `CSSPasteDialog.vue:148` (both **prose**, not imports) | **1** — the up-import G5 convicts; the move discharges it | 1 → **1** ✅ (`:31 → :46`) |
| **A-7** | move + rename (f · G5 · N-11/m-7) | `…/instrument/timeline/TimelineCaret.vue` | `git grep -nF 'TimelineCaret.vue"' HEAD -- .` → **2**: `timeline/components/TimelineTrack.vue:296` (`"../TimelineCaret.vue"`) · **`test/demo/instrument/timeline-mount-keyboard.test.ts:28`** (`"@components/instrument/timeline/TimelineCaret.vue"`) | `TimelineTrack.vue:276` template · `timeline-mount-keyboard.test.ts:301` `h(TimelineCaret, …)` · prose at `TimelineCaret.vue:270` and `LayerConfigPanel.vue:48` | **2** | **1 → 2 · MOVED** ⚠ |
| **A-8** | move (f · KF-AT-26(c)/KF-HA-14) | `…/instrument/shell/HeroAurora.vue` | `git grep -nF 'HeroAurora.vue"' HEAD -- .` → **2 module-graph consumers, BOTH DYNAMIC**: `demo/app/App.vue:164` `defineAsyncComponent(() => import(…))` · **`test/demo/instrument/aurora-opacity-ceiling.test.ts:62`** `await import(…)`. **Non-import context**: `w1-rehearsed.patch:26` (patch artifact) · **`scripts/gates/census.mjs:528`** (a **path STRING** in `EMBEDDED_SITES`, not an import) | `App.vue:62` mount + `:59` prose · `ChromeDock.vue:212` prose · `HeroAurora.vue:177` self-reference | **2** | **1 → 2 · MOVED** ⚠ |
| **A-9** | serializer unification (d · G3 · MISS-β2) | `demo/utils/keyframeSelector.ts` | `git grep -nF 'utils/keyframeSelector' HEAD -- .` → **12 live consumers**, enumerated at §2.1. **Non-import context: 4 docs-prose lines** under `docs/tranches/{U,V}/` (`AGENTIC-HANDOFF-2026-07-16.md:205` · `R1-03-worktree-transaction.md:122`/`:148`/`:292`) | `selectorText` resolves to `P` at `useKeyframeOps.ts:111` · `TimelineHoverPreview.vue:224` · `useTimelineBuild.ts:315`/`:321`/`:327` · `timelineTypes.ts:55` · `value4-editor-boundary.test.ts:26` ✅. **Two homonyms that are NOT consumers of `P`** (R3-4 subject-identity, **both re-confirmed**): `src/animation/compile/emit/format/format.ts:20` (private, used `:176`/`:275`/`:355`/`:388`) and `test/engine/nan-frame.test.ts:39` (test-local over `ReturnType<typeof parseKeyframeSelector>`) | **12** | **7 → 12 · MOVED** ⚠ |
| **A-10** | deep-import extirpation + repoint (c · G1/G2) | the four reached library modules `src/animation/{resolve/browser, internal/helpers, compile/emit/css-text, compile/selector}` | per-module `git grep -nE 'from "[^"]*<M>"' HEAD -- .`, enumerated at §2.2 | the **demo half** is exactly **G1 clause 1's EIGHT statements**, independently re-derived from the module end; the two enumerations agree line for line | **8 demo consumers** (was 7), plus the named non-member `test/demo/instrument/resize-tracks.test.ts:41` reaching `resolve/browser` by a **relative** spelling | **7 → 8 · MOVED** ⚠ |

### §2.1 · A-9's twelve, with their §Bounds status

```
⟨cmd⟩ git grep -nF 'utils/keyframeSelector' HEAD -- demo test          → 12 (run 1 = run 2)
```

| # | consumer | binding | bounded by KF-W8 §Bounds? |
|---|---|---|---|
| 1 | `…/keyframes/composables/useKeyframeOps.ts:9` | `requireKeyframeSelector, selectorText` | ✅ the `:1 + :9` carve row (spec `:9`, HEAD `:9`) |
| 2 | `…/timeline/composables/useTimelineBuild.ts:7` | `selectorText` | ✅ the minted one-line row (spec `:8`, HEAD **`:7`**) |
| 3 | `…/timeline/composables/useTimelineOps.ts:7` | `percentSelector` | ✅ the minted one-line row (`:7` = `:7`) |
| 4 | `…/timeline/utils/snapshotCapture.ts:3` | `percentSelector` | ✅ the minted one-line row (`:3` = `:3`) |
| 5 | `…/timeline/utils/timelineEngine.ts:15` | `} from "@utils/keyframeSelector";` | ✅ the deep-import row's `:16` carve (spec `:16`, HEAD **`:15`**) |
| 6 | `test/demo/instrument/timeline-undo.test.ts:6` | `percentSelector` | ✅ **declared exception** (R5-3(2)) |
| 7 | `test/demo/instrument/value4-editor-boundary.test.ts:6` | `} from "…/keyframeSelector";` | ✅ **declared exception** (R5-3(2)) |
| 8 | `…/timeline/components/TimelineHoverPreview.vue:192` | `selectorText` | ❌ **UNBOUNDED** — KF.W7 edit |
| 9 | `…/timeline/timelineTypes.ts:2` | `selectorText` | ❌ **UNBOUNDED** — KF.W7 edit |
| 10 | `test/demo/instrument/timeline-hover-preview.test.ts:18` | `} from "…/keyframeSelector";` | ❌ **UNBOUNDED** — KF.W7 create |
| 11 | `test/demo/instrument/timeline-mount-keyboard.test.ts:34` | `percentSelector` | ❌ **UNBOUNDED** — KF.W7 create |
| 12 | `test/demo/instrument/timeline-mount-projection.test.ts:35` | `percentSelector` | ❌ **UNBOUNDED** — KF.W7 create |

**Seven bounded, five unbounded.** G3's own binding sentence — *"a 'one body' landing that leaves any
of the seven on a deleted module is a broken tree, not a green gate"* — now reads over **twelve**.
Recorded, not decided: the disposition is **unit d's**, and the wave record already books it as that
unit's escalation. **This census adds two facts the wave record's F-5 did not carry**: consumers 2 and
5 sit at coordinates **one line above** their §Bounds grants (`:7` where the row says `:8`, `:15` where
the row says `:16`), so a seat executing from the coordinate column would carve the wrong line in two
of the five files it *is* lawfully bounded for.

### §2.2 · A-10, per module, at `1fa98a5d`

```
⟨cmd⟩ git grep -nE 'from "[^"]*resolve/browser"' HEAD -- .
  demo:    AnimationVisualizer.vue:65 · utils/helpers.ts:9                       → 2 demo
  library: src/animation/compile/frame/interp-slot.ts:18                         → 1  (spec: 1) ✅
  tests:   test/compile/interp-slot.test.ts:12 · test/engine/computed-resolution.test.ts:36
           · test/demo/instrument/resize-tracks.test.ts:41   ← RELATIVE spelling  → 3  (spec: 3) ✅

⟨cmd⟩ git grep -nE 'from "[^"]*internal/helpers"' HEAD -- .
  demo:    timelineEngine.ts:1                                                   → 1
  library: compile/emit/densify.ts:8 · easing-serialize.ts:7 · entry.ts:40
           · format/format.ts:4 · compile/frame/compiler.ts:15
           · engine/play-lifecycle/frame.ts:16                                   → 6  (spec: 6) ✅

⟨cmd⟩ git grep -nE 'from "[^"]*compile/emit/css-text"' HEAD -- .
  demo:    useKeyframeOps.ts:1 · parseAnimationCSS.ts:7 · KeyframeTimeline.vue:363
           · timelineEngine.ts:16                                                → 4  (spec: 3) ⚠
  library: engine/css/metadata.ts:35 · resolve/browser.ts:4 · resolve/conditional.ts:2
           · resolve/function.ts:6                                               → 4  (spec: 4) ✅
  tests:   structural-emit.test.ts:10 · emerging-css-resolve-fn.test.ts:31
           · emerging-css-resolve-now.test.ts:23 · emerging-css-resolve-p2.test.ts:26
           · value4-immutable-resolve.test.ts:9                                  → 5  (spec: 5) ✅

⟨cmd⟩ git grep -nE 'from "[^"]*compile/selector"' HEAD -- .
  demo:    utils/keyframeSelector.ts:5                                           → 1
  library: engine/css/animation.ts:29                                            → 1  (spec: 1) ✅
  tests:   selector-value4.test.ts:6 · nan-frame.test.ts:24                      → 2  (spec: 2) ✅
```

**The library half reproduces EXACTLY — every one of the spec's repair-round-4 figures, including the
corrected `3 → 4` on `compile/emit/css-text`, holds at this substrate.** Only the **demo** half moved,
by the one statement D-19-3 names (`KeyframeTimeline.vue:363`). **The named non-member survives and is
re-anchored**: `test/demo/instrument/resize-tracks.test.ts` still reaches `resolve/browser` by a
relative spelling that G1 clause 1's `@src/`-scoped, `demo/`-pathed command cannot see — now at
**`:41`** (spec `:31`). **No seat may read a green G1 as closing the reach class repo-wide.**

### §2.3 · What the re-derived census changed

**A-1 and A-4 are MOOT** — both barrels were deleted by a predecessor wave, which is why G4's clauses 1
and 4 are GREEN before this wave spends a byte. **A-2 and A-3 are STRONGER than the spec recorded**:
their consumer set was `0` by two sweeps *plus* an umbrella `export *` reference; the umbrella is gone,
so the two barrels now have **no inbound reference of any kind**. **A-5 and A-6 reproduce exactly.**
**A-7, A-8, A-9 and A-10 each gained consumers**, and in three of the four the new consumers are
predecessor-wave creates with no §Bounds row in this spec:

- **A-7 gained `timeline-mount-keyboard.test.ts:28`** (KF.W7 create) — a move+rename of
  `TimelineCaret.vue` must repoint **two** files, and the second is **outside this wave's grants**. The
  spec's §Bounds move row cites *"A-7 — 1"*; at this substrate the act repoints 2. **Unit f's, to carry
  or escalate.**
- **A-8 gained `aurora-opacity-ceiling.test.ts:62`** (KF.W4 create) and — separately — its one
  pre-existing consumer became a **dynamic** import. **And the move has a third obligation the spec
  never saw**: `scripts/gates/census.mjs:528` carries the literal path
  `"demo/components/instrument/shell/HeroAurora.vue"` inside `EMBEDDED_SITES`, *"The eight enumerated
  citation targets (X.KF.W4 §Bounds, Citation targets)"*. **`scripts/gates/**` is DO-NOT-TOUCH in this
  spec's own §Bounds** (*"each is another owner's row … every gate script under `scripts/gates/**`
  (KF.W4)"*). **A `git mv` of `HeroAurora.vue` therefore breaks a KF.W4-owned gate script that this
  wave may not repair.** Recorded here with its owner named; **unit f's, to escalate — never to widen.**
- **A-9 gained five** (§2.1).
- **A-10 gained one** (§2.2) — the eighth `@src/` statement, unbounded.

**Per LAW B this paragraph states what the censuses found, including what they found against this
wave's own bounds.** No act is taken here and no grant is widened by this file.

---

## §3 · G14's HOST ENUMERATION — **BINDING** (spec G14 limb 3 + its falsifier)

G14's own text hands this enumeration to unit a and binds the gate to it: *"Which lines are
**projectors** (rect → 0..1 progress) rather than bare rect reads is unit a's enumeration — the gate
binds to that enumeration, never to `11`."* Its falsifier: *"It also fails if unit a's enumeration
omits any of the **10** measured host files rather than enumerating and dispositioning it."*

**All 13 measured lines across all 11 measured files are enumerated below. None is omitted. Every
out-of-bounds host carries its owner.**

```
⟨cmd⟩ git grep -n 'getBoundingClientRect()' HEAD -- demo      → 13 lines (run 1 = run 2)
⟨cmd⟩ git grep -c 'getBoundingClientRect()' HEAD -- demo      → 11 files (run 1 = run 2)
```

### §3.1 · The classification, line by line

**Rule, stated at the receipt**: *a line is a **PROJECTOR** iff the rect it reads is consumed to
produce a normalized position — a 0..1 ratio or an affine remap of one (percent, NDC, a scaled unit).
A line is a **BARE RECT READ** iff its rect is consumed as absolute geometry (a pixel offset, a height,
a centre) with no normalization. A line that is not executable code is neither and is recorded as
**NON-CODE**.* One line = one `getBoundingClientRect()` occurrence.

| # | file : line | class | the evidence, read at the bytes | in this wave's bounds? |
|---|---|---|---|---|
| 1 | `instrument/shell/HeroAurora.vue:189` | **NON-CODE** | a `//` comment inside the **KF-APP-49 decline note**: *"the published composable reads `getBoundingClientRect()` per pointer event (read at the installed dist) — the very pattern the guard above forbids"*. **There is no rect read in this file.** | file bounded **`move` only** (A-8); **no body byte is writable** |
| 2 | `instrument/timeline/components/TimelineTrack.vue:456` | **PROJECTOR** | `posPercent = ((event.clientX − rect.left − borderLeft) / width) * 100` — a border-corrected pointer→percent map (the "ONE BOX FOR BOTH MAPS" cure) | **NO** |
| 3 | `instrument/timeline/components/TimelineTrack.vue:670` | **PROJECTOR** | `panTo(clamp((event.clientX − rect.left) / rect.width, 0, 1) * 100, 0.5)` inside `panFromPointer`, whose own docblock calls it *"the same projection"* | **NO** |
| 4 | `instrument/timeline/composables/useZoomPan.ts:91` | **PROJECTOR** | `const anchor = (event.clientX − rect.left) / rect.width` → `setZoomAround(…, anchor)` | **NO** |
| 5 | `instrument/transport/TransportDock/useMenubarMeasure.ts:13` | **BARE RECT READ** | `Math.ceil(host.getBoundingClientRect().height)` → a CSS custom property. Height only; nothing is normalized | **NO** |
| 6 | `playback/AnimationVisualizer.vue:124` | **PROJECTOR** | inside `progressFromPointerX` (opens **`:121`**, closes **`:130`** `};`): `const x = clamp(clientX − rect.left − ballW/2 − grabOffset, 0, maxX); return x / maxX;` — **a 0..1 progress, the archetype the gate names** | **YES — the SOURCE row; unit h** |
| 7 | `playback/AnimationVisualizer.vue:219` | **BARE RECT READ** | `const ballRect = ball.getBoundingClientRect(); grabOffset = e.clientX − (ballRect.left + ballRect.width/2);` — an absolute pixel offset inside `useDragCapture`'s `onStart`. **The gate's falsifier forbids curing by moving this line** | **YES — named in the SOURCE row** |
| 8 | `scenes/amiga/useSphereSpin.ts:81` | **PROJECTOR** | `toNDC`: `ndc.x = ((clientX − rect.left)/rect.width)*2 − 1; ndc.y = −((clientY − rect.top)/rect.height)*2 + 1` — a rect-ratio affinely remapped to NDC | **NO** |
| 9 | `scenes/sequence/SequenceScrubber.vue:92` | **PROJECTOR — SEAM-SEATED** | the body of `useDragScrub({ project: (e) => … clamp((e.clientX − rect.left)/rect.width, 0, 1) })`. It **is** the seam's `project` contract, not a hand-roll beside it | **NO** |
| 10 | `scenes/sequence/SequenceTarget.vue:215` | **PROJECTOR — SEAM-SEATED** | `useDragScrub({ project: … const ratio = clamp((e.clientX − rect.left)/rect.width, 0, 1); return ratio * demo.STAGGER_MAX; })` | **NO** |
| 11 | `scenes/spring/SpringHeatmap.vue:234` | **PROJECTOR — HAND-ROLLED** | `navigateFromPointer`: `fx = clamp((clientX − rect.left)/rect.width, 0, 1)`, `fy` likewise — a plain function, **not** on the seam | **NO** |
| 12 | `scenes/spring/SpringTarget.vue:238` | **PROJECTOR — SEAM-SEATED** | `useDragScrub({ project: (e) => (e.clientX − rect.left)/rect.width })` | **NO** |
| 13 | `scenes/square/SquareScene.vue:245` | **BARE RECT READ** | `homeX = br.left + br.width/2 − springX.value * travel` — an absolute home-centre in px; no ratio is formed | **NO** |

### §3.2 · The arithmetic, stated under the rule above so it reproduces

- **13 lines / 11 files** measured (the raw grep).
- **1 line is NON-CODE** (`HeroAurora.vue:189`, prose) → **12 executable rect reads / 10 files**.
- Of the twelve: **9 PROJECTORS · 3 BARE RECT READS** (`useMenubarMeasure.ts:13` ·
  `AnimationVisualizer.vue:219` · `SquareScene.vue:245`).
- Of the nine projectors: **3 are SEAM-SEATED** — they are `useDragScrub`'s own `project` callbacks
  (`SequenceScrubber.vue:92` · `SequenceTarget.vue:215` · `SpringTarget.vue:238`) — and **6 are
  HAND-ROLLED** (`TimelineTrack.vue:456` · `TimelineTrack.vue:670` · `useZoomPan.ts:91` ·
  `AnimationVisualizer.vue:124` · `useSphereSpin.ts:81` · `SpringHeatmap.vue:234`).
- Of the six hand-rolled projectors, **exactly ONE is inside this wave's bounds**:
  **`AnimationVisualizer.vue:124`**.
- `useDragScrub.ts` itself: **ZERO** (`git grep -c 'getBoundingClientRect' HEAD --
  demo/composables/useDragScrub.ts` → exit 1). The falsifier's *"or if `useDragScrub` … acquires one"*
  clause is armed and currently satisfied.

### §3.3 · **GREEN, as this enumeration defines it**

**G14 goes green when `demo/components/playback/AnimationVisualizer.vue` carries zero hand-rolled
rect-ratio projectors — i.e. when the projector whose body spans `:121-130` is consolidated into the
`useDragScrub.ts` seam and both call sites (`:230`, `:235`) are repointed — with the ball rect read at
`:219` left as a rect read, and the ten out-of-bounds hosts enumerated and dispositioned at §3.4.**

**Anchors this gate's cure turns on, re-derived and double-run** (the spec's coordinates are its dated
readings at `81a56990`; every one is **+20** at this substrate):

```
⟨cmd⟩ git grep -n 'progressFromPointerX' HEAD -- demo test          (run 1 = run 2)
HEAD:demo/components/playback/AnimationVisualizer.vue:121:const progressFromPointerX = (clientX: number): number => {
HEAD:demo/components/playback/AnimationVisualizer.vue:230:        const p = progressFromPointerX(e.clientX);
HEAD:demo/components/playback/AnimationVisualizer.vue:235:        const p = progressFromPointerX(e.clientX);
                                        → the symbol occurs in ONE file; no external consumer
⟨cmd⟩ git show HEAD:…/AnimationVisualizer.vue | sed -n '121p;130p'
const progressFromPointerX = (clientX: number): number => {
};
```

| the SOURCE row's coordinate | spec (`81a56990`) | **this substrate (`1fa98a5d`)** |
|---|---|---|
| projector, whole body | `:101-110` | **`:121-130`** |
| the rect read inside it | `:104` | **`:124`** |
| the ball rect read | `:199` | **`:219`** |
| call site 1 | `:210` | **`:230`** |
| call site 2 | `:215` | **`:235`** |

**The §Bounds SOURCE row states its extent by CONTENT** — *"the projector's opening line through its
closing `};` … so an executing seat cannot leave four lines of a deleted function behind"* — so the
grant resolves at these bytes. **The numeral column does not**, and PASS-6 D-1 convicted exactly that
substitution. **Unit h executes from THIS table, never from the spec's coordinate column.**

**The RIDER binds unchanged**: the gate counts **projection math only**; a consolidation that erases
the `aria-hidden` charter or forces `role=slider` onto the decorative twin is a regression, not a cure.

**One charter observation, recorded not decided.** D-19-11's framing is *"the seam owns projection,
callers own rect reads."* At these bytes `useDragScrub.ts`'s own docblock says the opposite in its own
voice — *"each scene now supplies ONLY its `project` (rect-ratio for the rails; nearest-point-on-path
for MotionPath) … `project` is pure (the scene's geometry); `onScrub` applies the projected value."*
**The seam owns the drag LIFECYCLE and the select-suppression token; projection is the caller's by the
seam's published contract**, which is why three scene hosts hold a rect-ratio inside a `project`
callback and are not defects. Unit h's consolidation must therefore land
`AnimationVisualizer.vue`'s projector **as a `project` callback on the seam** — the shape its three
in-tree siblings already take — and not by inventing a rival mechanism inside `useDragScrub.ts`.
**This is a reading of the bytes handed to unit h; this seat rules nothing.**

### §3.4 · **THE OUT-OF-BOUNDS HOSTS — ENUMERATED WITH THEIR OWNERS, NONE DROPPED**

**Ten host files carry a measured line and lie outside this wave's write bounds.** (The spec's limb 3
is headed *"THE EIGHT OUT-OF-BOUNDS HOSTS"* and then enumerates **nine** — `useMenubarMeasure.ts`,
`useZoomPan.ts`, `TimelineTrack.vue` and the six scene hosts. **E-3: the spec's numeral is RECORDED as
its dated reading and is not struck**; the enumeration beside it was right and is what this seat
carries forward. At this substrate the set is that nine **plus `HeroAurora.vue`**, whose line is prose.)

| # | host | lines | class | **owner / disposition** |
|---|---|---|---|---|
| 1 | `instrument/transport/TransportDock/useMenubarMeasure.ts` | `:13` | bare rect read | **TD-1 / TD-2 — NO-WAVE-OWNER + BH rider. DO-NOT-TOUCH.** Enumerated here with its owner named, never dropped; **it can be enumerated, not edited** |
| 2 | `instrument/timeline/composables/useZoomPan.ts` | `:91` | projector, hand-rolled | the **W7-named `instrument/timeline/` cluster**. No act booked here |
| 3 | `instrument/timeline/components/TimelineTrack.vue` | `:456`, `:670` | **2** projectors, hand-rolled | same cluster. **This wave carves `:296` for the up-import repoint ONLY — a different subject; its two rect lines are not this wave's.** ⚠ **the line count MOVED 1 → 2 at this substrate** |
| 4 | `scenes/amiga/useSphereSpin.ts` | `:81` | projector, hand-rolled | the **amiga scene-repair packet** — §Sequencing declares the scene edge NEGATIVE here; **RULINGS-4 R4-8 records it as inbound cargo at `KF-W10 §6.D · SUCCESSOR-FORMATION REGISTER`** (cited anchor-only) |
| 5 | `scenes/sequence/SequenceScrubber.vue` | `:92` | projector, **seam-seated** | the **sequence scene-repair packet**, same register |
| 6 | `scenes/sequence/SequenceTarget.vue` | `:215` | projector, **seam-seated** | the **sequence packet**, same register |
| 7 | `scenes/spring/SpringHeatmap.vue` | `:234` | projector, hand-rolled | the **spring packet**, same register. *(The one genuinely hand-rolled scene projector not already on the seam — recorded for the successor formation, promised nothing here.)* |
| 8 | `scenes/spring/SpringTarget.vue` | `:238` | projector, **seam-seated** | the **spring packet**, same register |
| 9 | `scenes/square/SquareScene.vue` | `:245` | bare rect read | the **square packet**, same register |
| 10 | `instrument/shell/HeroAurora.vue` | `:189` | **NON-CODE (prose)** | **NEW at this substrate.** The file is bounded for a **pure `move`** (unit f, A-8) and **no body byte is granted**; a `git mv` carries the comment unchanged, so the occurrence neither appears nor disappears by this wave's act. **No cure is owed and none is promised.** Its owner for any *content* act is the KF-APP-49 decline record, not this wave |

**This wave promises nothing on the ten and books no act against any of them.** `demo/scenes/**` is
otherwise untouched by KF.W8 (the four `CopyButton` repoints at `EasingTarget.vue:181` and
`StartingStyleTarget.vue:150` are import specifiers, not rect lines).

---

## §4 · THE DOUBLE-RUN HARNESS

Every published figure, re-derived twice from the settled bytes in one pass. **`SAME` on all sixteen.**

```
⟨cmd⟩ run(){ a=$(eval "$1"); b=$(eval "$1"); [ "$a" = "$b" ] && echo "SAME | $2 = $a" || echo "DIFF!! $2"; }
SAME | HEAD = 1fa98a5d8fa53cd6b408b3094195b9f8c12ab32f
SAME | src children = 1                    SAME | stutters = 8
SAME | deep-import files = 7               SAME | deep-import statements = 8
SAME | rect lines = 13                     SAME | rect files = 11
SAME | up-imports = 2                      SAME | test files = 152
SAME | test/demo = 35                      SAME | test/demo/instrument = 16
SAME | demo/components barrels = 3         SAME | A-9 consumers = 12
SAME | A-5 consumers = 4                   SAME | A-7 consumers = 2
SAME | A-8 consumers = 2
```

---

## §5 · WHAT BINDS DOWNSTREAM

**The spec's §Bounds coordinate column is stale wave-wide; its grants resolve only by SUBJECT.** Every
carve row whose extent is stated by content (R4-5(a), R5-3, R5-4, R5-5, the D-11 `:57-67` re-cut)
survives; every row read as a bare numeral would carve the wrong line. The re-anchoring, for the rows
whose coordinates this census measured:

| §Bounds row | spec | **`1fa98a5d`** | consumer |
|---|---|---|---|
| deep-import · `useKeyframeOps.ts` | `:1` + `:9` | `:1` + `:9` — **unmoved** | c, d |
| deep-import · `parseAnimationCSS.ts` | `:7` | `:7` — **unmoved** | c |
| deep-import · `timelineEngine.ts` | `:1` / `:16` / `:17` | `:1` / **`:15`** / **`:16`** | c, d |
| deep-import · `AnimationVisualizer.vue` | `:45` | **`:65`** | c |
| KF-AV-18 prose sweep | `:70-78` | **`:90-97`** (4 attribution lines `:90`·`:92`·`:96`·`:97`; `:66` is the true `clamp` import and is NOT in the subject) | f |
| KF-AV-9 · THE WIRE | `:79` | **`:99`** (`useResizeObserver` import at `:64`) | h |
| KF-AV-26 · inertia block | `:122-191` | opens **`:142`** (`// ── Inertia / momentum on release (engine-driven) ───`) | h |
| KF-AV-24 · the projector, ball read, call sites | `:101-110` / `:199` / `:210` / `:215` | **`:121-130`** / **`:219`** / **`:230`** / **`:235`** | h |
| `useTimelineBuild.ts` | `:8` | **`:7`** | d |
| `useTimelineOps.ts` | `:7` | `:7` — **unmoved** | d |
| `snapshotCapture.ts` | `:3` | `:3` — **unmoved** | d |
| R-1 · `KeyframeCard.vue` CopyButton import | `:59` | **`:133`** | f |
| R-1 · `KeyframesEditor.vue` | `:116` | **`:233`** | f |
| R-1 · `EasingTarget.vue` | `:143` | **`:181`** | f |
| R-1 · `StartingStyleTarget.vue` | `:87` | **`:150`** | f |
| R-1 · `useToolbarKeyboard.ts` docblock | `:25-27` | `:25` — **unmoved** (the CopyButton prose line) | f |
| G8 leg (i) · `App.vue` | `:144` | **`:148`** | f |
| G8 leg (i) · `EditorStartScreen.vue` | `:102` | **`:235`** | f |
| R-10 · `groupedShortcuts` | `:57-67` | **`:308-318`** (`:308 const groupedShortcuts = computed(() => {` … `:318 });`) | g |
| G5 · `KeyframeCardList.vue` | `:31` | **`:46`** | f |
| G5 · `TimelineTrack.vue` | `:116` | **`:296`** | f |
| KF-AV-18 · `resize-tracks.test.ts` relative reach | `:31` | **`:41`** | c (enumerated, not annexed) |

**The four figures every downstream unit binds to:**

1. **G1 clause 1 = 8 statements / 7 files / 4 library modules** (spec: 7 / 6 / 4). The eighth,
   `KeyframeTimeline.vue:363`, is **unbounded**.
2. **G5's denominator = 2**, not 3 — the third member died with `KfPillTabs.vue` in KF.W6's S-1 family.
3. **G13's stutter count = 8**, single-child CONFIRMED — both unmoved.
4. **G14's enumeration = §3**: 13 lines / 11 files raw; 12 executable / 10 files; 9 projectors / 3 bare
   reads; **1 hand-rolled projector in bounds** (`AnimationVisualizer.vue:124`, body `:121-130`); ten
   out-of-bounds hosts enumerated with owners at §3.4.

**Four consumer sets moved and each is a unit's to carry or escalate, never to widen**: A-7 (1 → 2,
the second unbounded) · A-8 (1 → 2, plus the DO-NOT-TOUCH `scripts/gates/census.mjs:528` path string) ·
A-9 (7 → 12, five unbounded) · A-10's demo half (7 → 8, the eighth unbounded).

**This file takes no act, widens no grant, and rules nothing.** It measures.
