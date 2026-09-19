SERVED MODEL: claude-opus-5[1m]

# KF.W12 — Authoring-Surface Repair

**Wave**: KF.W12 · Authoring-Surface Repair — the six authoring-surface packets the X·KF census never owned: **CARD-UNIT · OPTIONS-UNIT · KFED-UNIT · EDITOR-UNIT · APPLY-UNIT · AXISLINE-UNIT**.
**Half**: **demo** (keyframes.js `demo/components/instrument/**` + `demo/utils/**` + the one cube-scene file the AXISLINE-UNIT owns). **Sub-tranche**: X·KF. Spec home `docs/tranches/X/keyframes/waves/KF-W12.md` (this file is the **opus author's blind draft** at `waves/drafts/opus/KF-W12.md`, authored under M-23's twice-authored idiom; the agglomerated file at the ratified path is the fold seat's product, never this one).
**Authority**: `docs/tranches/X/COHESION.md` §0/§0d/§1, ratified under `docs/tranches/V/megatranche/SCOPE.md` **M-25**. **Minting authority**: `KF-W4 §Sequencing`, the **R-15 homing block**, KF.W12 packet-roster bullet; roster and routing declaration at `KF-W1 §Cross-edges, edge 9`. **Terminal disposition of record**: `KF-W10 §6.D · SUCCESSOR-FORMATION REGISTER`, row 2 — cited by **STABLE ANCHOR ALONE (LAW C(3))**.
**Status**: **planned**. No product byte is written by this file. Authoring opened no product source for writing — every keyframes.js anchor below was re-resolved **read-only via `git show origin/master:<path>` / `git grep … origin/master`**. Execution awaits the **SS-1/SS-2 authoring block's fold and ratification**; the wave enters no order until then (`EXECUTION-RUNBOOK.md` §4.5).

**Alias law (R-B idiom).** `KF.W12` denotes `X.KF.W12`; a search alias, never a rename. **Second alias, load-bearing**: the six UNIT names — `CARD-UNIT`, `OPTIONS-UNIT`, `KFED-UNIT`, `EDITOR-UNIT`, `APPLY-UNIT`, `AXISLINE-UNIT` — are **the banks' own minted wave-surface names**, minted at kf-KeyframeCardList, kf-ChannelOptions, kf-KeyframesEditor, kf-CSSCodeEditor, kf-KeyframesStringControls and kf-CubeAxisLines respectively. They are **packet names, never wave names**, and this file mints no seventh.

**Ref of record.** keyframes.js `origin/master` **`69095552`**, measured by this seat 2026-09-18. **THE DRIFT IS LOAD-BEARING AND LARGER HERE THAN ANYWHERE**: the six records are banked at `8281638c`; the eleven authored specs at `81a56990`; ⟨cmd⟩ `git rev-list --count 81a56990..origin/master` → **203**. **KF.W8's Structure & Colocation Settle moved almost every file this wave owns** — `CSSCodeEditor.vue`, `KeyframesEditor.vue`, `KeyframeCard.vue`, `ChannelOptions.vue`, `RibbonBar.vue` and `ControlsPaneWrapper.vue` all sit at paths no bank names. Every inherited anchor below is re-resolved at `69095552` and its drift **DECLARED** (KF.W0 §B-12; the **KF-AT-28 re-anchor law**).

**Provenance.** Authored **blind** (M-23 twice-authored: this is the **opus arm**). Rows consumed **by mechanism, deduped by identity, never transcribed** (M-25). Sources: the banked routing blocks in `docs/tranches/V/megatranche/registry/adjudicated/` — **kf-KeyframeCard · kf-KeyframeCardList · kf-ChannelOptions · kf-ChannelControls · kf-ControlsPaneWrapper · kf-EasingSidebar · kf-TimingFunctionPanel · kf-LayerConfigPanel · kf-KeyframesEditor · kf-KeyframesAddDialog · kf-CSSCodeEditor · kf-EditorShell · kf-EditorHeader · kf-EditorStartScreen · kf-KeyframesStringControls · kf-RibbonBar · kf-CubeAxisLines · kf-SpringPhysicsFacet** (18 records); `KF-W4 §Sequencing` R-15; `KF-W10 §6.D` row 2 (the terminal disposition, its three travelling locks and its **ANTI-RE-BOOK** receipt); `execution/B/KF-W7.md` Act 3 (the per-surface verdicts). **No gate exists here without a named live witness (L-19).** Validated at authoring against `WAVE_SPEC.md` and `STYLE.md` (**L-20**).

| verb | state | basis |
|---|---|---|
| AUDITED | **YES** | the 18 adjudicated records above, each ADJUDICATED-not-VERIFIED, each routing its behavioral remainder `NO-WAVE-OWNER` into one of this wave's six UNITs by name |
| SPECIFIED | **NO — this draft is one arm of the authoring, not the spec** | SPECIFIED is stamped by the **fold seat** over the agglomerated file at `waves/KF-W12.md` |
| IMPLEMENTED | NO | gates green + bytes landed in the named execution site stamps this |
| VERIFIED | NO | stamped at the successor sub-tranche's close, never here and never by KF.W10 (**§6.D**) |

**Goal criterion.** This wave succeeds if, after it, **a user can author a keyframe and see what they authored** — the offset readout prints a number, the offset writer commits without throwing, the delete affordance is reachable by pointer *and* keyboard, Apply-CSS applies something, the code editor can be left by Tab, the dropdowns open, and **every control that reads a value writes the same value back in the same units**. A wave that lands sixty hygiene edits and leaves `getClassName()` producing `keyframes-style-X` while the injected stylesheet's selector is `.x` has **failed this goal**: KF-KE-4's chain is a feature that *has never worked*, audited four times by three axes and a reader without one of them noticing, and it is the single row that makes this wave's name honest.

**Execution shape**: **6 seats, 3 phases** — phase 1: 2 parallel (`.a` EDITOR-UNIT ∥ `.b` AXISLINE-UNIT); phase 2: 3 parallel (`.c` CARD-UNIT ∥ `.d` OPTIONS-UNIT ∥ `.e` KFED-UNIT — but see **L-3**: `.c` and `.e` share `KeyframesEditor.vue`'s card seam and are phase-ordered inside the phase, never concurrent on that file); phase 3: 1 serial (`.f` APPLY-UNIT + close). **Peak concurrency 3**, inside the owner's four-workflow cap (§5.1). APPLY-UNIT is last **by the banks' own sequencing**: its cure is constrained by N-8 (`getClassName` and the emitted selector must share ONE `cssIdent`-derived name) and by the EDITOR-UNIT's projection contract, both of which land before it.

---

## §0 Open preconditions (checked at wave-open; NOT close gates)

| # | precondition | state at authoring (measured by this seat, 2026-09-18, at `69095552`) |
|---|---|---|
| **OP-1** | **This spec exists at the ratified path**, folded from the two blind arms and ratified. | **OPEN BY CONSTRUCTION.** `ls docs/tranches/X/keyframes/waves/KF-W12.md` → *No such file*. A MINTED-UNAUTHORED wave cannot open on a draft. |
| **OP-2** | **`G-KFW4-1` GREEN** — the `vue-tsc --noEmit` gate chassis. **R-15 sequences all seventeen packets after it**, and **all six UNITs name it by their own banks**: kf-KeyframeCardList (*"sequenced after the KF.W4 vue-tsc gate — nothing in it is defensible until a `.vue` file can fail a build"*), kf-ChannelOptions, kf-KeyframesEditor, kf-CSSCodeEditor (*"must sequence AFTER the KF.W4 type-gate lands"*), kf-CubeAxisLines. | **LANDED, HONEST-RED AT CLOSE** (LEDGER row KF.W4; G-KFW4-1 among five honest-RED gates). **This is the hardest precondition this wave has**, because every defect it cures lives *in the one surface nothing type-checks* — kf-KeyframeCardList's own words. **HARD.** |
| **OP-3** | **KF.W0 Substrate Settle** — two KFED blockers are *already repaired at the frontier*; **a careless rebase of the in-flight migration re-lands them** (kf-KeyframesEditor's own sequencing note). | **PARTLY DISCHARGED, and the risk is the reverse of the usual one.** This wave must verify **which** frontier repairs exist before spending a cure — a cure written from the bank alone re-introduces a fixed defect. `.e`'s first act is that verification, receipted. **HARD.** |
| **OP-4** | **Write authority named** (census §(c) gap 5; KF-W3 OP-2, UNRESOLVED). | **UNRESOLVED.** Named, not answered. **HARD.** |
| **OP-5** | **KF.W6 Glass Suffusion IMPLEMENTED** — the token settlement and the `kf-` prefix law (KF-KE-30). | **LANDED.** Its consequence is measured at §B.1 row 5: `KeyframeCard.vue`'s focus ring is now `kf-focus-ring` at `:117`, and the register's `KeyframeCard.vue:45` coordinate resolves to a different line. |
| **OP-6** | **KF.W7 Timeline Evaluate CLOSED**, with the **KF-CE-2 parent half** it owns. | **CLOSED with SIX KEEP-BESPOKE / ZERO SWAP** (`execution/B/KF-W7.md` §3). KF-CE-2's parent half (emit-time target resolution; a `:key`d remount or arm-time id capture) was **routed to KF.W7**; `.a` reads that wave's landed bytes before writing the child half, and **does not re-book the parent** (§Excluded E-2). |
| **OP-7** | **The `KF-APP-41` / `C-22` ADOPTION is spent and not re-opened.** | **SPENT.** §6.D row 2's ANTI-RE-BOOK receipt (RULINGS-4 **R4-1**): `KF-APP-41` (the `EditorHeader.vue` delete) is **`ADOPTED-BY-KF.W6`** with its LAW-A census of record (ONE live importer — the `shell/index.ts` barrel re-export — **0** symbol consumers, **0** mounts), and the kf-EditorShell **`C-22` orphan-token limb** is adopted in the same declaration. **No successor packet re-books either row.** `C-22`'s remaining limbs (`D-27` · `RR-2 M7`) **stay NO-WAVE-OWNER and are NOT adopted** — see §Excluded E-1. Verified at the frontier: ⟨cmd⟩ `git ls-tree origin/master -- demo/components/instrument/shell/EditorHeader.vue` → *(no output)* — **the file is gone; the adoption landed.** |
| **OP-8** | **The KFED-UNIT's second-end note is honoured.** | **STANDING.** §6.D row 2: KF.W7 cites *"the R4-8 §6.D register row"* as that end **until the successor spec exists** — *cite it, promise nothing*. This file, once ratified, becomes that end; **this draft is not it.** |

**OP-1, OP-2, OP-3, OP-4 are hard.**

---

## §Scope — the six UNITs, one seat each

| # | UNIT | seat | the bank's own one-line subject |
|---|---|---|---|
| 1 | **CARD-UNIT** | `.c` | *"the keyframe authoring loop made honest"* — offset readout + offset writer + delete affordance + remount discipline + the a11y triad + the ref bookkeeping (kf-KeyframeCardList) |
| 2 | **OPTIONS-UNIT** | `.d` | the one-line capability restorations first, then the persist/representation/authority cluster, the steps cluster, the a11y leg, the hygiene tail — **`completableAlone`-shaped** (kf-ChannelOptions) |
| 3 | **KFED-UNIT** | `.e` | *"the keyframes authoring surface made honest"* — the retiming control, the per-stop start field, **the apply identity**, the card action cluster, the projection/remount engine, the add dialog (kf-KeyframesEditor) |
| 4 | **EDITOR-UNIT** | `.a` | *"the Monaco seam made honest"* — boot, language, a11y, v-model, error posture, themes (kf-CSSCodeEditor) |
| 5 | **APPLY-UNIT** | `.f` | the apply-CSS toggle, the name pipeline, the brush, the teardown (kf-KeyframesStringControls) |
| 6 | **AXISLINE-UNIT** | `.b` | *"the axis-lock reveal made honest"* — every geometric assertion written against the settled `rotate3d(-1,1,0,30deg)` frame (kf-CubeAxisLines) |

**What this wave is not.** Not a re-audit (ids are for life; folds are by reference at the banked id). Not a homing act (**KF.W4 homed all six**). Not the place any glass-producer row is cured — and this wave surfaces more producer rows than any other: the viewport-gated grid, the `steps(1, jump-none)` render throw, the preset seam, the slider readout seam, the keyboard registry's missing `defaultPrevented`/scope, the unlayered scoped styles, the lossy `cn` table. **Every one rides SS-6** (§Sequencing L-4).

---

## §Bounds

### B.1 Frontier re-anchor (performed by this authoring seat, read-only, at `origin/master` `69095552`, 2026-09-18)

**Five inherited anchors needed correction; two of them are path errors that would send a cure to a file that does not exist** — the exact failure mode KF-W3's own re-anchor table was built to catch.

| # | inherited anchor ⟨bank⟩ | frontier truth (this seat's measurement, `69095552`) | disposition |
|---|---|---|---|
| 1 | **KF-KE-4** — *"class added to targets = `getClassName() = options.styleId` = `keyframes-style-${superKey}-${animationId}`"* vs *"`getTmpAnimationName()` strips the `keyframes-style-` prefix and lowercases"* | **HOLDS, and the chain is shorter and starker than banked.** ⟨cmd⟩ `git grep -n "keyframes-style-" origin/master -- demo/` → **exactly two hits, both in `demo/components/instrument/keyframes/composables/useKeyframesState.ts`**: `:16 const keyframesStyleId = \`keyframes-style-${animationUUID}\`;` and `:42 return keyframesStyleId.replace("keyframes-style-", "").toLowerCase();`. The id form is `keyframes-style-${animationUUID}` (one term, not two). **`"keyframes-style-" + X ≠ X.toLowerCase()` unconditionally — the class added and the selector emitted are constructed never-equal.** | **RE-ANCHORED; the defect is unchanged and now reproduces in a two-line `grep`.** This is G-KFW12-3's witness |
| 2 | **KF-KE-2** — the retiming Slider: `:43` writes `frame.start.value = starts![i]` into a deep-frozen selector; `[0,1]` fractions on a `-10..110 step 1` track | **HOLDS; lines moved.** ⟨cmd⟩ `git grep -n "frame.start.value\|:step=" origin/master -- demo/components/instrument/keyframes/KeyframesEditor.vue` → `:76` (the read: `animation.templateFrames.map((frame) => frame.start.value)`), **`:81`** (the write, was `:43`), **`:88`** (`:step="1"`, was `:44`'s neighbourhood). The correct helpers still exist: ⟨cmd⟩ `git grep -n "percentSelector\|selectorPercent" origin/master -- demo/utils/keyframeSelector.ts` → `:44` · `:49`. | **CORRECTED** — three anchors re-pinned; **the cure shape is unchanged** (read via `selectorPercent`, write by whole-selector replacement, domain `0..100`, fractional step, `marks`, per-thumb `aria-valuetext`) |
| 3 | **KF-KE-3** — *"the start field validates through the wrong value.js entry point: `parseCssScalar` instead of `parseKeyframeSelector`"*; frontier anchor `:186` | **HOLDS; line moved.** ⟨cmd⟩ `git grep -n "parseCssScalar" origin/master -- demo/components/instrument/keyframes/KeyframesEditor.vue` → `:240` (import) · **`:303`** (the call). The sibling path's correct entry is live: ⟨cmd⟩ `git grep -n "requireKeyframeSelector" origin/master -- demo/` → `useKeyframeOps.ts:8`/`:173` · `timelineEngine.ts:16`/`:113` · the definition at `demo/utils/keyframeSelector.ts:35`. **Two grammars in one component, still.** | **CORRECTED** |
| 4 | **KF-CE-2** — *"a stale in-flight 200 ms debounced emit … helpers.ts:15-24 (no cancel handle, closure-private timer)"* | **HOLDS; the mechanism is verbatim at a moved coordinate.** ⟨cmd⟩ `git show origin/master:demo/utils/helpers.ts \| sed -n '30,39p'` → `:31 export function debounce<Args extends unknown[]>(` … `:35 let timer: ReturnType<typeof setTimeout> \| undefined;` … returns a bare `(...args) => void` — **no `cancel`, no handle, the timer closure-private**. Consumer: ⟨cmd⟩ `git grep -n "debounce" origin/master -- demo/components/instrument/keyframes/CSSCodeEditor.vue` → `:60` (import) · `:132` (`const debouncedEmit = debounce(`) · `:185` (`debouncedEmit(editor!.getValue())`). | **CORRECTED (path + lines)**; the child-half cure (`replaceContent()` seam: cancel-on-external-write + cancel-on-unmount) is unchanged |
| 5 | **KF-KE-5** — the card's action cluster painted UNDER the opaque code plate; `:11-13` `absolute top-2 right-4` vs the `<pre>` at `:41-45` ending `relative` | **HOLDS — and the file now DOCUMENTS ITS OWN DEFECT.** ⟨cmd⟩ `git show origin/master:demo/.../components/KeyframeCard.vue \| grep -n "absolute\|<pre\|relative"` → `:28 <div class="relative">` · **`:30` the cluster `absolute top-2 right-4` with no z rung** · **`:38-47` an in-file comment stating the mechanism verbatim** (*"is `absolute top-2 right-4` with no z rung, the `<pre>` below is a later z-auto sibling in the same stacking context whose class list still ends `relative`, so CSS 2.2 App. E …"*) · `:113` the `<pre>` · `:117` its class list, **still ending `relative`**. | **RE-ANCHORED, and PROMOTED**: a defect whose own file explains why it is a defect is a **comment-stated invariant** in the MISS-3 sense — G-KFW12-1 asserts both the pixel and the comment |
| 6 | **`.focus-ring` at `KeyframeCard.vue:45`** (RULINGS-4 R4-4's census, quoted at §6.D's KF.W13 row) | **DRIFTED.** ⟨cmd⟩ `git grep -n "kf-focus-ring" origin/master -- demo/components/instrument/keyframes/components/KeyframeCard.vue` → **`:117`**, spelled **`kf-focus-ring`** (the KF-KE-30 prefixed idiom KF.W6 landed), not bare `.focus-ring` at `:45`. | **DECLARED RE-ANCHOR (E-3: RULINGS-4 is NOT amended).** Routed to KF.W13's census as a frontier reading beside the fixed figure (§Cross-edges) |
| 7 | **`:is-open` ×3** (kf-ChannelOptions' one-line capability restorations) | **PARTLY CORRECTED — the ×3 is one file's, and there is a fourth.** ⟨cmd⟩ `git grep -n ":is-open" origin/master -- demo/` → **4 sites**: `ChannelOptions.vue:96` · `:120` · `:479` **(the three)** and **`LayerConfigPanel.vue:11` (the fourth)**. | **CORRECTED**: the restoration is **×3 in ChannelOptions + ×1 in LayerConfigPanel**; LP-11's cure and KF-CO-35's ride together (C-2's own routing), so the fourth is **not** an orphan — it is the LayerConfigPanel limb the bank already homes here |

### B.2 Owned files — demo half (all under `/Users/mkbabb/Programming/keyframes.js/`)

Line counts are `git show origin/master:<path> | wc -l`, measured twice at `69095552`.

| file | L | access | UNIT · why |
|---|---|---|---|
| `demo/components/instrument/keyframes/CSSCodeEditor.vue` | 261 | modify | **EDITOR-UNIT** — the boot/language/a11y/v-model/error-posture/themes decision; `:48`/`:72` the `editor.api` imports, `:132`/`:185` the debounce seam, `:176` `accessibilitySupport: "off"` |
| `demo/utils/helpers.ts` | — | modify (**`debounce` only**) | **EDITOR-UNIT** — `:31-39`, the cancel handle. **A shared util: the change is additive (`.cancel`) and every other consumer is censused before it lands** (LAW A, §B.5) |
| `demo/components/instrument/keyframes/monaco-themes/Dracula.json` · `GitHub.json` | — | modify (**conditional on KF-CE-1's arm**) | **EDITOR-UNIT** — ~96 % inert under the regression; **98 of 100 rules inert** is the corrected count. Touched only if arm (a) (restore contributions) is chosen |
| `demo/components/instrument/keyframes/components/KeyframeCard.vue` | 168 | modify | **CARD-UNIT** — the action-cluster z rung, the `<pre>`'s `relative`, the a11y triad, the ref contract |
| `demo/components/instrument/keyframes/components/KeyframeCardList.vue` | 110 | modify | **CARD-UNIT** — the remount discipline, the one-timer-for-N-cards debounce, the ref bookkeeping |
| `demo/components/instrument/keyframes/KeyframesEditor.vue` | 430 | modify | **KFED-UNIT** (+ the CARD-UNIT's **card seam** — see L-3) — the retiming control `:76`/`:81`/`:88`, the start field `:303`, the projection/remount engine |
| `demo/components/instrument/keyframes/components/KeyframesAddDialog.vue` | 289 | modify | **KFED-UNIT** — the add dialog |
| `demo/components/instrument/keyframes/composables/useKeyframesState.ts` | 61 | modify | **KFED-UNIT ∩ APPLY-UNIT** — `:16`/`:42`, **the apply identity's two lines**. Held by `.e` in phase 2 and read-only to `.f` in phase 3 (**L-5**) |
| `demo/components/instrument/keyframes/composables/useApplyCSS.ts` | 69 | modify | **APPLY-UNIT** — `:15`/`:17`/`:23`/`:32`/`:57` the `styleId`/`getClassName` seam; `isApplied`/`prevPaused` lifted to the identity's altitude |
| `demo/components/instrument/keyframes/composables/useHighlightCSS.ts` | 234 | modify | **KFED-UNIT** — the node ownership/refcount (`:30-33` adopt, `:58-61` unconditional remove) |
| `demo/components/instrument/keyframes/composables/useKeyframeBrushApply.ts` | 46 | modify | **APPLY-UNIT** — the brush, the unwired `clear()` (N-5) |
| `demo/components/instrument/keyframes/composables/useKeyframeOps.ts` | 219 | modify | **KFED-UNIT** — `:173` `requireKeyframeSelector` is the correct entry the start field should ask |
| `demo/components/instrument/keyframes/composables/useKeyframesParsing.ts` · `useKeyframesEditor.ts` | — | modify | **APPLY-UNIT** — the emitted-selector half of the identity (`useKeyframesParsing.ts:26`/`:39`) |
| `demo/components/instrument/keyframes/KeyframesStringControls.vue` | 195 | modify | **APPLY-UNIT** — `:75` `getTmpAnimationName`, the three-closures-over-one-animation seam |
| `demo/components/instrument/transport/channel-controls/ChannelOptions.vue` | 731 | modify | **OPTIONS-UNIT** — `:96`/`:120`/`:479` `:is-open`, the switch `model-value` rewire, the persist/representation/authority cluster, the steps cluster, the a11y leg |
| `demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue` | 124 | modify | **OPTIONS-UNIT** — `:11`'s fourth `:is-open`, LP-1/LP-6/LP-17/LP-9/LP-11/LP-13..18/LP-21..23 + the LP-20 tail |
| `demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue` | 173 | modify | **OPTIONS-UNIT** — KF-TFP-1's `:key`-derived-from-the-handler's-write cycle; the `useEasingPickerSeat` composable |
| `demo/scenes/easing/EasingSidebar.vue` | 238 | modify (**seat rows only**) | **OPTIONS-UNIT** — KF-ES-12's second `EasingPicker` seat. **The easing SCENE is KF.W11's**; this wave touches the *seat composable's* two call sites and nothing else in that file (**L-6**) |
| `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue` · `.css` | 307 · — | modify | **OPTIONS-UNIT** — the D-B1/N-2/C-2 drawer-inset adoption (`:style` on `<DrawerContent>`, **never** the scoped-selector declaration), the `proof:stage-visible` residue |
| `demo/components/instrument/transport/controls-pane/RibbonBar.vue` | 151 | modify | **APPLY-UNIT + EDITOR-UNIT** — RB-6's state/affordance lifetime; M-3/C-8's format half at its bank (KF-CE-9 + KF-CE-37, which already names `RibbonBar.vue:28` as the PRIMARY unguarded path) |
| `demo/components/instrument/shell/EditorShell.vue` · `EditorStartScreen.vue` | 386 · 369 | modify (**narrow**) | **EDITOR-UNIT** — only the rows the bank homes here. **`C-22`'s orphan-token limb is ADOPTED-BY-KF.W6 and is NOT re-booked** (OP-7) |
| `demo/scenes/cube/CubeAxisLines.vue` | 120 | modify | **AXISLINE-UNIT** — the axis-lock reveal; `:63` `width: 1000vw`, `:113` `rotateZ(90deg)`, `:117` `rotateY(90deg)`, `:60-63`'s three raw `180ms` |
| `demo/components/instrument/timeline/CSSPasteDialog.vue` | — | **READ-ONLY WITNESS** | KF.W7/KF.W8 territory; named because the EDITOR-UNIT's error posture must match it, not change it |
| `docs/tranches/X/keyframes/evidence/W12/**` *(in value.js)* | — | create | born-RED baselines, the apply-identity execution receipt, the Monaco contribution census, the axis triptych |
| `docs/tranches/V/coordination/INBOX.md` *(in value.js)* | — | modify-append | **the seven glass-producer relays** this wave surfaces (§Sequencing L-4) |

### B.3 Read-only witness sites (named, never opened for writing by this wave)

- `demo/components/instrument/timeline/KeyframeTimeline.vue` — **KF-CE-2's PARENT half is KF.W7's** (emit-time target resolution; a `:key`d remount or arm-time id capture). KF.W7 is CLOSED; `.a` reads its landed bytes and writes only the child half.
- `demo/components/instrument/transport/channel-controls/ChannelControls.vue` — `:130`'s force-mount once `keyframesWarmed`; the `:key` remount blocker (kf-ChannelControls L-2/C-2) **must be settled before KF.W6-TIMELINE** in the census taxonomy, and is a **witness** to the APPLY-UNIT's three-closures seam, not a target.
- `src/animation/compile/emit/backward/walk.ts:145` (`cssIdent`'s definition) and its re-export sites — **the library half of N-8's cure is KF.W5's** (*publish `cssIdent`*); the demo half (route all three derivations through it) is APPLY-UNIT's and **sequences after the publication** (§Sequencing L-7).
- `demo/scenes/spring/SpringPhysicsFacet.vue` — **SPF-13's decision is KF-CO-47's, which is this wave's**; the *facet's* bytes are **KF.W11's**. This wave decides; KF.W11 spends. Reciprocal edge declared both ways.
- `demo/scenes/cube/CubeTarget.vue` / `CubeTarget.css` — **KF.W11's**. The AXISLINE-UNIT's geometric assertions are written **against** the mount-time `rotate3d(-1,1,0,30deg)` frame those files establish; `.b` reads it and re-derives it, never edits it.

### B.4 Explicitly out of bounds

- **All glass-producer rows → SS-6 BH relay**, never a demo-side hack. This wave surfaces the most of any: the viewport-gated grid · the `steps(1, jump-none)` render throw · the preset seam · the slider readout seam · the keyboard registry's missing `defaultPrevented`/scope (with R-1's LIFO/FIFO law) · unlayered scoped styles · the lossy `cn` table.
- `demo/scenes/**` except `CubeAxisLines.vue` and `EasingSidebar.vue`'s two seat call-sites — **KF.W11's**.
- `demo/app/**`, `demo/components/playback/**`, `demo/components/instrument/transport/TransportDock.vue` — **KF.W13's**.
- `src/**` — the library. `cssIdent`'s publication is **KF.W5's**; the demo half waits on it.
- `demo/components/instrument/shell/EditorHeader.vue` — **it does not exist**; `KF-APP-41` is spent (OP-7).
- value.js `scripts/dev/dev.sh` — **never staged**.

### B.5 LAW A censuses — every delete / repoint / shim act this wave books

**LAW A (RULINGS-3): no delete or repoint is authorized on a line-count.** Four acts are booked; each carries its import-graph or consumer census, run at `69095552` and **re-run at execution before the act is spent**:

1. **`debounce`'s cancel handle** (`demo/utils/helpers.ts:31-39`) — the change is **additive**; the census is every consumer of `debounce` demo-wide, and the receipt states that no consumer's behaviour changes when it does not call `.cancel()`. **An API change to a shared util inside a component wave is the shape that breaks siblings**, so it is censused first and landed alone.
2. **The Monaco contribution decision** (KF-CE-1/KF-CE-4) — **there is no cheap highlighting-only import** (killed register #3). The two honest arms are (a) restore contributions (bytes return, a11y contribs return) or (b) hand-register a Monarch tokenizer + `setLanguageConfiguration` + `tabFocusMode: true` (bytes stay saved; comment-toggle/find/context-menu stay absent **BY DECISION**). **Either way `vendor-monaco` is re-measured**; U.D5's 4.18→2.53 MB is invalid as like-for-like and is not re-cited.
3. **The `:is-open` → `:open` rewire** (4 sites, §B.1 row 7) — the census is the prop's declaration at the installed producer; **a rename that guesses the producer's prop name is a copied producer selector**, so the receipt quotes the `.d.ts`.
4. **The apply identity's cure** — either `getClassName()` returns the emitted selector, or `getTmpAnimationName()` is passed as the class. **The census is every reader of the class token**: the bank's own grep showed *nothing else keys on the class*, and that grep is re-run before either arm is chosen, because **the whole defect is that one derivation was assumed to match another**.

### B.6 Scope receipts (R4-10(1) — a sweep's enumeration source is the SCOPE, never the example list)

- **UNIT count**: 6, enumerated at §Scope, matching §6.D row 2's cargo **member for member** (`CARD-UNIT · OPTIONS-UNIT · KFED-UNIT · EDITOR-UNIT · APPLY-UNIT · AXISLINE-UNIT`). No seventh name occurs in §Scope, §Carry or §Gates.
- **Record count**: 18, enumerated at §Provenance; **none is re-audited**.
- **Owned-file count**: enumerated by path at §B.2; the union is **computable from the table, not from a wildcard** — which matters here because `demo/components/instrument/**` contains KF.W7's and KF.W13's files too.

---

## §Carry — the six UNITs, cargo by banked id (never transcribed, deduped by identity)

**Carriage is not asserted in this file's voice (LAW B).** Every list is the banked routing block's own enumeration, consumed by mechanism.

### C-1 · **CARD-UNIT** (`.c`) — kf-KeyframeCardList · kf-KeyframeCard
The bank's own scope: *"offset readout + offset writer + delete affordance + remount discipline + the a11y triad + the ref bookkeeping"*, spanning `KeyframeCardList.vue` + `KeyframeCard.vue` + **`KeyframesEditor.vue`'s card seam**.
- **The loop is dead three independent ways** — readout (`[object Object]`), writer (a frozen-selector TypeError on the primary control), removal (a mouse-only `<svg>`). **KF-KC-19**: one field, two units — the Slider reads a `0..1` fraction onto a `−10..110` rail and writes `0..110` back; both mutate a `Readonly` in place; `.value` does not exist on the named variant. **Route both seams through the total pair** (same family as KF-KC-1's cure).
- **KC-34 is the UNIT's internal ordering edict and it is a LOCK**: *the highlight path must stop replacing Vue-owned DOM **before** the KC-8/KC-9 keep-mounted repair lands.*
- **The 17 admitted misses** the record names — chief among them **the one-timer-for-N-cards data-loss debounce**, the dead watcher with the false docblock, the dead click zone, the per-keystroke theme rewrite, the awaited PRM-unreachable delete animation.
- **KF-KC-48**: zero test coverage in a suite that tests siblings — **the UNIT's acceptance test, and it gates KF-KC-1.**
- The component is *"the best-shaped 81 lines in the instrument wearing the worst seams in it"*: **nearly every failure is a boundary it cannot police alone**, which is why the cure is one UNIT and not six patches.

### C-2 · **OPTIONS-UNIT** (`.d`) — kf-ChannelOptions · kf-ControlsPaneWrapper · kf-ChannelControls · kf-EasingSidebar · kf-TimingFunctionPanel · kf-LayerConfigPanel
**THE ORDER IS FIXED AND IT IS A TRAVELLING LOCK** (§6.D; kf-ChannelOptions' own words):
1. **the one-line capability restorations first** — `:is-open`→`:open` **×3** (`ChannelOptions.vue:96`/`:120`/`:479`) **+ the fourth at `LayerConfigPanel.vue:11`** (§B.1 row 7) and **the switch `model-value` rewire**;
2. then **the persist/representation/authority cluster** — KF-CO-3/4/11/12;
3. then **the steps cluster** — KF-CO-9/10/13/23/36;
4. then **the a11y leg** — KF-CO-5/21/22/26 + focus management;
5. then **the hygiene tail** — incl. L·N-16/I-1..I-6 and the RR-A inert-declaration census (folded into KF-CO-33).
- **`completableAlone`-shaped**: that packet alone *"restores three dropdowns, a working layer switch, honest field values, un-brickable persistence, and a truthful easing pipeline."* **The order is why**: a persistence cure landed before a capability restoration persists a broken state.
- **LP-1 is the wave's second travelling lock** — *sequenced WITH the KF-CO-1/8 rewires; **write legs are never restored without the render edge***. LP-6/LP-17 (the honesty-coverage pair), LP-9, **LP-11 (with KF-CO-35's cure)**, LP-13/14/15/16/18, LP-21/22/23, the LP-20 hygiene tail.
- **kf-ControlsPaneWrapper D-B1/N-2/C-2** — the BG-11 occlusion's discharge lever **ships in installed glass-ui 7.0.0, unconsumed**, while the file's own `:26` comment asserts it does not exist. **Cure form corrected per MISS-1: `:style` on `<DrawerContent>`, NEVER the scoped-selector declaration.** D-M12's detent budget recomputes in the same edit. **Producer side is DISCHARGED — the relay closes the loop and no producer work remains.**
- **kf-TimingFunctionPanel KF-TFP-1 (BLOCKER)** — the `:key` is derived from the state the handler writes: the first drag off any preset-matched quad remounts `EasingPicker` mid-gesture, kills pointer capture, and teleports the canvas to `ease-out-back`. **Cure = the `useEasingPickerSeat` composable (KF-ES-12) under the KF-ES-4/KF-CO-17 SPLIT-SEAM cure-lock — the one-prop cure is DEAD (register #3, killed three times).**
- **kf-EasingSidebar KF-ES-12** — two hand-maintained `EasingPicker` seats, no shared composable; **neither donor is clean, so the composable must be SPECIFIED, not lifted** (seed, key, live-state echo predicate, container CSS, one parameter for where truth lives). **KF-ES-14** — the authoring motion-preview story must be *designed*, not patched.
- **kf-ChannelControls L-2/C-2** — the `:key` remount destroying authored timeline work; **MUST be settled before any timeline-cluster swap inherits it.**
- **SPF-13's decision is KF-CO-47's and is taken here** (tooltip idiom vs slotted copy); **KF.W11 spends it on the facet's bytes** (§Cross-edges).
- **kf-ControlsPaneWrapper's `proof:stage-visible` residue** rides this surface (KF-W4 §Excluded 19).

### C-3 · **KFED-UNIT** (`.e`) — kf-KeyframesEditor · kf-KeyframesAddDialog
*"The keyframes authoring surface made honest."*
- **KF-KE-2** — the retiming Slider inert, illegible, out of contract (three independent kills). **The ordering constraint is load-bearing for remediation**: *fixing the freeze without the unit creates the 100×-destructive write L-B1 warned of.* Cure: read via `selectorPercent`, write by whole-selector replacement, domain `0..100`, fractional step, `marks`, per-thumb `aria-valuetext` — **with KF-KE-34**.
- **KF-KE-3** — `requireKeyframeSelector` at the field; **the S-5/C-S5 error posture stays** — it is the reference implementation asking the wrong function.
- **KF-KE-4 — the headline.** **Apply-CSS has never applied anything**: the class and the selector are structurally different strings. **One apply identity**: class = selector, or pass `getTmpAnimationName()` as the class; **then re-derive L-M3/C-B2's residue against a working feature.** *(The row is KFED's; its `getClassName` derivation constraint is N-8's and lands with APPLY-UNIT — see L-7.)*
- **KF-KE-5 (BLOCKER)** — the card's action cluster painted under the opaque plate: invisible, pointer-unreachable. **Cure**: a z rung on the cluster **or** drop the `<pre>`'s `relative`; *then D-4's shell cure and the annotation's contrast become live questions again.*
- **KF-KE-6** — lift `isApplied`/`prevPaused`/node ownership **to the identity's altitude — per-animation, refcounted**. The shared identity is *documented as intentional* (`useKeyframeBrushApply.ts:15`); **the defect is the unlifted shadow state, not the shared identity.**
- **the KFED-UNIT hljs layer/re-tokenize pipeline** (KF-KE-24's pipeline half — **the TOKEN decision alone is KF.W6's rider**) and **KF-KE-62 / KF-KC-35's `proof:accent-census` residue** riding their units (KF-W4 §Excluded 18).
- **the add dialog** (`KeyframesAddDialog.vue`) and the projection/remount engine.

### C-4 · **EDITOR-UNIT** (`.a`) — kf-CSSCodeEditor · kf-EditorShell · kf-EditorStartScreen · kf-RibbonBar (format half)
*"The Monaco seam made honest — boot, language, a11y, v-model, error posture, themes."*
- **KF-CE-3 is FIRST IN THE REPAIR ORDER** (the bank's own words) — **WCAG 2.1.2 keyboard trap**: Tab cannot leave the editor, the toggle command is unregistered, `accessibilitySupport: "off"` removes the AT-detected alternative, no Escape handler exists. **`tabFocusMode: true` at create is a contrib-free fix.** *(The a11y half of `5fe2e4cb`, outranking the highlighting half.)*
- **KF-CE-1 + KF-CE-4 are ONE decision** — the regression stripped the ~110-module contribution set, not just the CSS language. **98 of 100** theme rules inert (corrected count). Two honest arms only; §B.5(2) states both and forbids the third.
- **KF-CE-5** — `accessibilitySupport: "off"`, undocumented, un-propped, against monaco's own doc. Live at `CSSCodeEditor.vue:176`.
- **KF-CE-2 child half** — cancel-on-external-write + cancel-on-unmount, **one `replaceContent()` seam**. **The parent half is KF.W7's and is not re-booked** (§Excluded E-2).
- **M-3/C-8's format half** — kf-CSSCodeEditor **KF-CE-9 + KF-CE-37**, which **already names `RibbonBar.vue:28` as the PRIMARY unguarded path**; the isFormatting-latch session-corruption scenario is the banked KF-CE-9 cell verbatim.
- **KF-CE-41's law binds every row here**: *the comment is part of the defect surface* — an editor seam cured with its stale docblock standing is not cured.

### C-5 · **APPLY-UNIT** (`.f`) — kf-KeyframesStringControls · kf-RibbonBar
*"The apply-CSS toggle, the name pipeline, the brush, the teardown."*
- **N-8 is the cure's shape constraint and a LOCK**: `getClassName` and the emitted selector **must share ONE `cssIdent`-derived name — not a second hand-rolled derivation.** The escalation *"the Export artifact is equally invalid"* is **REFUTED** (`walkList` applies `cssIdent` at `backward-walk.ts:131`, so Export emits a valid ident for the same animation).
- **The library half — publish `cssIdent` — is KF.W5's**; the demo half (route all three derivations through it) **sequences after that publication** (L-7).
- **The three-closures-over-one-animation seam**: 2× `KeyframesEditor` (slot copies) + 1× `KeyframesStringControls` (Sweep's force-mounted pane); all three compute the same `keyframesStyleId`; `useHighlightCSS.ts:31-40` **reuses** the id-matched node and `:58-61` **unconditionally removes it** on first unmount — survivors hold a detached reference and their `setContent` writes go nowhere. **The mount-policy row is banked at kf-ControlsPaneWrapper M-4 + MISS-3 — folded, NOT re-booked.**
- **The projection contract is a joint obligation**: any cure for the echo loop (**KF-CE-8**) that does not also define the model→editor re-projection path **leaves the loss live**. APPLY-UNIT settles it *with* EDITOR-UNIT's contract, which is why `.a` is phase 1 and `.f` is phase 3.
- **RB-6** — the Apply-CSS state outlives the only branch that renders its control (`v-if === 'keyframes'`); applied residue (forced pause + injected-but-inert sheet + target classes) persists across tabs with no visible undo. **The state and its affordance get one lifetime.** Compounds banked **N-5** (`clear()` unwired at `useKeyframeBrushApply.ts:29`).
- **The filed "both animate the same target simultaneously" scenario is DEAD at the bank** (L-BL-1: the injected sheet binds nothing) — **the surviving harm is the residue, and only the residue is cured.** *Curing a killed scenario is how a wave manufactures work.*

### C-6 · **AXISLINE-UNIT** (`.b`) — kf-CubeAxisLines
*"The axis-lock reveal made honest."* **32 rows stand (0 BLOCKER · 4 MAJOR · 17 MINOR · 11 INFO).**
- **The frame law**: *every geometric assertion written against the settled `rotate3d(-1,1,0,30deg)` frame*, **frame-stamped per KF-AX-4**. The mount-time attitude lives in **KF.W11's** `useCubeDemo.ts`; `.b` **re-derives it read-only and edits nothing there** (§B.3).
- **#57 — the `.z` axis line is projectively degenerate**: `rotateY(90deg)` puts the stroke in a plane containing the view direction. Re-verified by this seat: ⟨cmd⟩ `git show origin/master:demo/scenes/cube/CubeAxisLines.vue \| grep -n "rotateY\|rotateZ\|1000vw"` → `:63 width: 1000vw;` · `:113 transform: rotateZ(90deg);` · `:117 transform: rotateY(90deg);`. **It also punctures challenge-D §5.3's kill of the 1.4.1 colour-only claim**: the orientation redundancy holds for X-vs-Y and **fails for exactly Z**.
- **#60 / KF-AX-9's token rider** — the three raw `180ms` at `:60-63` hard-code time while the same declarations route the curve through `var(--ease-standard, ease)`; **the unit's one duration-token reach (`duration-panel`) is the wrong register AND dead (#24)**. *(The dark arm, the ladder, the `--z-behind` policy contradiction, the z-contract recut and the namespace audit are **KF.W6's** and are not re-booked.)*
- **KF-AX-1's registry adoption** is the cube packet's latch-family cure (**KF.W11's**); this UNIT neither adopts nor re-books it.
- Discrete rows to **KF.W0** (census/records re-anchor, §6.5 re-scope, F-1 reconciliation, gate-inventory truth) and **KF.W9/SS-13** (nine witnesses, **the Z triptych first — it decides three rows**) are **already routed and are not carried here**.

---

## §Agent Units

| unit | seat | UNIT | writes | closes when |
|---|---|---|---|---|
| `.a` | Fable-worker ∥ Opus-worker → fresh-Fable arbiter (**the Monaco arm is a design decision with a byte budget**) | **EDITOR-UNIT** | `CSSCodeEditor.vue` · `helpers.ts` (`debounce` only) · the two theme JSONs (conditional) · `EditorShell.vue`/`EditorStartScreen.vue` (narrow) · `RibbonBar.vue:28` (format half) | G-KFW12-4 GREEN; **KF-CE-3 landed FIRST**; the KF-CE-1/4 arm **chosen and written down** with `vendor-monaco` re-measured |
| `.b` | Opus solo (geometry + census — mechanical by M-12's rule) | **AXISLINE-UNIT** | `demo/scenes/cube/CubeAxisLines.vue` | G-KFW12-6 GREEN; every assertion **frame-stamped** against the re-derived `rotate3d(-1,1,0,30deg)` |
| `.c` | Fable-worker ∥ Opus-worker → fresh-Fable arbiter | **CARD-UNIT** | `KeyframeCard.vue` · `KeyframeCardList.vue` · `KeyframesEditor.vue`'s **card seam only** | G-KFW12-1 GREEN; **KC-34's edict obeyed at the commit level** (the highlight path lands before the keep-mounted repair) |
| `.d` | Fable-worker ∥ Opus-worker → fresh-Fable arbiter | **OPTIONS-UNIT** | `ChannelOptions.vue` · `LayerConfigPanel.vue` · `TimingFunctionPanel.vue` · `ControlsPaneWrapper.vue`/`.css` · `EasingSidebar.vue` (seat rows) | G-KFW12-2 GREEN; **the five-step order is the commit order**, receipted step by step |
| `.e` | Fable-worker ∥ Opus-worker → fresh-Fable arbiter | **KFED-UNIT** | `KeyframesEditor.vue` · `KeyframesAddDialog.vue` · `useKeyframesState.ts` · `useHighlightCSS.ts` · `useKeyframeOps.ts` | G-KFW12-3 GREEN; **OP-3's frontier verification receipted FIRST** (which blockers are already repaired upstream) |
| `.f` | Opus solo | **APPLY-UNIT** + close | `useApplyCSS.ts` · `useKeyframeBrushApply.ts` · `useKeyframesParsing.ts` · `KeyframesStringControls.vue` · `RibbonBar.vue` (RB-6) | G-KFW12-5 GREEN; **N-8's one-derivation rule proven by execution, not by reading**; the close record written |

**Receipts every seat**: line 1 = `SERVED MODEL: <id>`; ⟨cmd⟩ provenance on every published figure; **self-count law**; dated corrections appended, never rewritten (E-3).

---

## §Gates — six UNIT gates + three cross-cutting, every one **BORN-RED**, every one with its literal command

**Gate law.** No gate exists without a named live witness (L-19). Every command was **run read-only at `69095552` by this authoring seat** and its output is quoted. Commands are portable BSD.

### G-KFW12-1 — the keyframe authoring loop completes · **BORN-RED** *(CARD-UNIT)*
**Statement.** A user can read a card's offset, change it, and delete the card — by pointer **and** by keyboard.
**Falsifier today, three limbs.** (a) the readout prints `[object Object]`; (b) the writer throws a frozen-selector `TypeError` on the primary control; (c) the removal affordance is a mouse-only `<svg>` painted **under** the opaque code plate.
⟨cmd⟩ `git show origin/master:demo/components/instrument/keyframes/components/KeyframeCard.vue | grep -n "absolute\|<pre\|relative"` → `:28 <div class="relative">` · `:30` the cluster, **`absolute top-2 right-4`, no z rung** · `:113` the `<pre>` · `:117` its class list, **ending `relative`** · **`:38-47` the file's own comment stating the mechanism**.
**GREEN requires**: a **mounted vitest** (KF-KC-48 — the UNIT's acceptance test, and **it gates KF-KC-1**) asserting all three limbs, **and** the `:38-47` comment re-written to describe what is there. **RED today: ⟨cmd⟩ `git grep -c "KeyframeCard" origin/master -- test/` → 0.**
**Order lock inside the gate (KC-34)**: the highlight path stops replacing Vue-owned DOM **before** the KC-8/KC-9 keep-mounted repair. A green obtained in the other order is not this gate's green.

### G-KFW12-2 — the options surface restores capability before it persists anything · **BORN-RED** *(OPTIONS-UNIT)*
⟨cmd⟩ `git grep -n ":is-open" origin/master -- demo/` → **4**: `ChannelOptions.vue:96` · `:120` · `:479` · `LayerConfigPanel.vue:11`.
**GREEN requires**: the command returns **0** for `:is-open` and the producer's declared prop name appears instead, **quoted from the installed `.d.ts`** (§B.5(3) — a guessed prop name is a copied producer selector and a HIGH defect); the switch `model-value` rewire lands in the same step; and **the five-step order is visible in the commit sequence** (§Commit plan rows 5–9). **A wave that lands the persistence cluster first fails this gate even if every row is green.**
**Second limb, born-RED**: **KF-TFP-1's cycle is broken** — the `:key` no longer derives from the state its own handler writes. ⟨cmd⟩ `git grep -n "pickerKey\|seedPreset" origin/master -- demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue` names the cycle's live coordinates at execution. **The one-prop cure is DEAD (killed three times) and a seat that re-proposes it has not read the register.**

### G-KFW12-3 — Apply-CSS applies something · **BORN-RED** *(KFED-UNIT; the wave's headline)*
⟨cmd⟩ `git grep -n "keyframes-style-" origin/master -- demo/` → **exactly two hits**: `useKeyframesState.ts:16` (`keyframes-style-${animationUUID}` — the class) and `:42` (`.replace("keyframes-style-", "").toLowerCase()` — the selector's name). **`"keyframes-style-" + X ≠ X.toLowerCase()` unconditionally.**
**GREEN requires** an executed assertion — *not a reading* — that the class added to the target and the selector in the injected stylesheet are **the same string**, under **N-8's one-derivation rule** (L-7). **Three riders assert in the same run**: KF-KE-2 (a `0..100` domain with fractional step commits a retiming without throwing), KF-KE-3 (`requireKeyframeSelector` at `KeyframesEditor.vue:303`'s call site — `from`/`to` accepted, `500%`/`-20%` refused **at the field**), KF-KE-5 (the cluster is hit-testable).
**RED today on all four.**

### G-KFW12-4 — the code editor can be left, and its seam cancels · **BORN-RED** *(EDITOR-UNIT)*
**Limb 1 (FIRST in repair order).** ⟨cmd⟩ `git grep -n "accessibilitySupport\|tabFocusMode" origin/master -- demo/` → **one hit**: `CSSCodeEditor.vue:176 accessibilitySupport: "off",` — **`tabFocusMode` appears nowhere.** WCAG 2.1.2 keyboard trap, live.
**Limb 2.** ⟨cmd⟩ `git show origin/master:demo/utils/helpers.ts | sed -n '30,39p'` → `debounce` returns a bare function over a **closure-private timer with no cancel handle**; ⟨cmd⟩ `git grep -n "debounce" origin/master -- demo/components/instrument/keyframes/CSSCodeEditor.vue` → `:60` · `:132` · `:185`. A selection change therefore lands a stale emit on the **wrong** keyframe and full-replaces `kf.vars`. **Silent data loss.**
**Limb 3.** The KF-CE-1/4 arm is **chosen and written down**, with `vendor-monaco` re-measured (**U.D5's 4.18→2.53 MB is not re-cited as like-for-like**).
**GREEN requires** all three, **and** KF-CE-41's law: every docblock the seam carries is true at the bytes.

### G-KFW12-5 — one name, one lifetime · **BORN-RED** *(APPLY-UNIT)*
**Limb 1 (N-8).** ⟨cmd⟩ `git grep -n "cssIdent" origin/master -- demo/` → **one hit, and it is a comment** (`demo/utils/helpers.ts:10`) — **the demo has no `cssIdent` consumer at all**, so all three derivations are hand-rolled today. GREEN requires the three routed through one published `cssIdent` (**after KF.W5 publishes it** — L-7).
**Limb 2 (RB-6 + N-5).** The applied state and its affordance share one lifetime; `clear()` is wired. ⟨cmd⟩ `git grep -n "clear" origin/master -- demo/components/instrument/keyframes/composables/useKeyframeBrushApply.ts` names the destructure at execution.
**Limb 3 (the three-closures seam).** `useHighlightCSS`'s node is **refcounted**: `:58-61`'s unconditional `.remove()` no longer strands two live survivors.
**Anti-work clause, load-bearing**: the filed *"both animate the same target simultaneously"* scenario is **DEAD** (L-BL-1). **A cure that addresses it has manufactured work and fails this gate's scope check.**

### G-KFW12-6 — every axis assertion is frame-stamped · **BORN-RED** *(AXISLINE-UNIT)*
⟨cmd⟩ `git show origin/master:demo/scenes/cube/CubeAxisLines.vue | grep -n "rotateY\|rotateZ\|1000vw\|180ms"` → `:63 width: 1000vw;` · `:113 rotateZ(90deg)` · `:117 rotateY(90deg)`; the three raw `180ms` at `:60-63`.
**GREEN requires**: (a) the `.z` stroke legible under the settled `rotate3d(-1,1,0,30deg)` frame — **`rotateY(90deg)` out-of-plane under `perspective: 1200px` is the defect, not the style**; (b) **every geometric assertion in the unit carries its frame stamp (KF-AX-4)**; (c) the three `180ms` tokenised or their duration-register decision written down. **The frame is re-derived read-only from KF.W11's files and is never edited here.**

### G-KFW12-7 — zero producer rows cured demo-side · **BORN-RED** *(cross-cutting)*
**GREEN requires**: each of the seven named producer rows (§B.4) appears as an **SS-6 relay row in `INBOX.md`** with its date, and **zero** of them has a demo-side workaround in this wave's diff. **Falsifier**: a scoped-style override, a re-implemented primitive, a copied producer selector, or a local patch of `node_modules` — **each is a HIGH defect** under the standing law. The gate's evidence is the diff, not an assertion.

### G-KFW12-8 — no row homed elsewhere is re-booked here · **BORN-RED** *(cross-cutting; the ANTI-RE-BOOK receipt in gate form)*
⟨cmd⟩ at execution: `grep -c 'KF-APP-41' <this wave's diff>` → **0**; `grep -c 'C-22' <diff>` → **0** for the orphan-token limb.
**GREEN requires**: `KF-APP-41` and the kf-EditorShell `C-22` **orphan-token limb** appear **nowhere** as this wave's work — both are **`ADOPTED-BY-KF.W6` (RULINGS-4 R4-1)**, spent at KF-W6 §Bounds with its LAW-A census of record (ONE live importer, **0** symbol consumers, **0** mounts). **`C-22`'s remaining limbs (`D-27` · `RR-2 M7`) stay NO-WAVE-OWNER and are NOT adopted** — this gate discharges nothing of theirs and books nothing for them.

### G-KFW12-9 — every UNIT's cargo is spent or terminally worded · **BORN-RED** *(close gate)*
**GREEN requires**: every id in §Carry C-1..C-6 reads **LANDED** / **KILLED with rationale** / **carried to the next formation boundary's ledger**, with **zero re-bookings** (folds by reference at the banked id; original ids for life). **`DISCHARGED by KF.W7 SWAP verdict <surface>, <date>` is NOT available to this wave** — KF.W7's discharge set is **EMPTY** (`execution/B/KF-W7.md` §3) and no surface in this wave's bounds was SWAP-ruled.

---

## §Sequencing

### Locks (binding on execution order, inside and around this wave)

- **L-1 · ALL SIX UNITS SEQUENCE AFTER `G-KFW4-1`** (R-15: *"All 17 sequence after G-KFW4-1"*) — and **five of the six banks say so in their own words**. Nothing in this wave is defensible until a `.vue` file can fail a build.
- **L-2 · THE OPTIONS-UNIT'S FIVE-STEP ORDER IS FIXED** — capability restorations → persist/representation/authority → steps → a11y → hygiene. It is a **travelling lock**, not a preference: a persistence cure landed first persists a broken state.
- **L-3 · `KeyframesEditor.vue` IS HELD BY ONE SEAT AT A TIME.** `.e` owns the file; `.c` owns **only its card seam**, and the two are **phase-ordered inside phase 2** (`.e`'s projection/remount engine lands, then `.c`'s seam). Two seats on one file across a shared git index is how a sibling's staged work enters a commit; the ordering is the mechanism and the pathspec is the belt.
- **L-4 · GLASS-PRODUCER ROWS → SS-6, NEVER DEMO-SIDE HACKS.** The seven named rows relay; the demo row is marked blocked-on-relay. G-KFW12-7 measures it in the diff.
- **L-4a · KF-AV-28's STANDING SUPERSESSION RIDER — on any KF.W7-evaluated surface a packet of this wave touches** (§6.D row 2's first travelling lock, carried not cited). The six evaluated surfaces are `KeyframeTimeline / TimelineTrack rail` · `TimelineCaret` · `TimelineHoverPreview` · `SequenceScrubber` · `AnimationVisualizer` · `SpringTarget / SpringTrace idiom arms`. **This wave's bounds intersect none of the six for writing** (`CSSPasteDialog.vue` and `KeyframeTimeline.vue` are read-only witnesses at §B.3), so the rider binds here in its **sweep-input** capacity only — **and the verdict is settled: six KEEP-BESPOKE, ZERO SWAP, discharge set EMPTY** (`execution/B/KF-W7.md` §3). **Any seat that finds itself editing one of the six has left its bounds** and stops (an ESCALATION, per §B.2's writable set), **and no seat of this wave may write `DISCHARGED by KF.W7 SWAP verdict <surface>, <date>` on any row** — the set has no members (G-KFW12-9).
- **L-5 · `useKeyframesState.ts` IS `.e`'s IN PHASE 2 AND READ-ONLY TO `.f` IN PHASE 3** — its two lines (`:16`, `:42`) **are** the apply identity, and the identity's cure is decided at KFED and *routed through one derivation* at APPLY.
- **L-6 · `EasingSidebar.vue` IS SPLIT BY ROW, NOT BY FILE** — this wave touches the **seat composable's** two call sites; **the easing SCENE is KF.W11's**. Neither seat edits the other's rows in that file.
- **L-7 · N-8's ONE-DERIVATION RULE, AND ITS UPSTREAM** — `getClassName` and the emitted selector share **one `cssIdent`-derived name**. The library publication of `cssIdent` is **KF.W5's**; the demo re-route **sequences after it**. Until it lands, APPLY-UNIT may land the *identity* cure (class = selector) but **not** the *derivation* cure — and the receipt says which.
- **L-8 · THE KFED-UNIT SEQUENCES AFTER KF.W0** — *two blockers are already repaired at the frontier; a careless rebase of the in-flight migration re-lands them.* `.e`'s first act is verifying which, receipted (OP-3).
- **L-9 · KC-34's EDICT ORDERS CARD-UNIT INTERNALLY** — the highlight path stops replacing Vue-owned DOM **before** the KC-8/KC-9 keep-mounted repair.
- **L-10 · KF-CE-3 IS FIRST IN EDITOR-UNIT'S REPAIR ORDER** — the keyboard trap outranks the highlighting, by the bank's own ruling on `5fe2e4cb`.
- **L-11 · KF-CE-41's LAW — the comment is part of the defect surface.** It binds every UNIT here, and it is why three gates assert a docblock alongside a byte.

### Cross-edges, declared from this end

| → | subject | form |
|---|---|---|
| **KF.W11** | (a) **SPF-13's decision is taken here** (KF-CO-47, tooltip idiom vs slotted copy) and **spent there** on `SpringPhysicsFacet.vue`; (b) **CubeAxisLines rows #31/#57 are cured here** and were **booked there** by the cube packet; (c) the mount-time `rotate3d(-1,1,0,30deg)` frame is **read from** KF.W11's files and edited by neither | **DECLARED, no reciprocation promised** — KF.W11 is MINTED-UNAUTHORED and this seat promises nothing from an unauthored spec |
| **KF.W13** | the **`.focus-ring` → `kf-focus-ring` drift** at `KeyframeCard.vue` (§B.1 row 6): RULINGS-4's census names `KeyframeCard.vue:45` as one of four `.focus-ring` consumers; **at the frontier it is `kf-focus-ring` at `:117`**. KF.W13 owns that census's other half | **DECLARED**; RULINGS-4 is **not amended** (E-3) |
| **KF.W7** | **consumed, not owed**: KF-CE-2's **parent half** is KF.W7's landed work; the six KEEP-BESPOKE verdicts; the empty discharge set; **§6.D row 2's KFED second-end note** (*cite it, promise nothing*) — which this file, once ratified, discharges by **existing** | **INBOUND ONLY** — KF.W7 is CLOSED |
| **KF.W5** | **`cssIdent`'s publication** — the library half of N-8. **This wave asks; it does not publish** | **ASK, DECLARED** |
| **KF.W6** | **`KF-APP-41` + the `C-22` orphan-token limb are SPENT THERE** (ADOPTED-BY-KF.W6, R4-1). Also **KF-KE-24's TOKEN decision** is KF.W6's rider; the KFED pipeline half is this wave's | **RECEIVED, never re-booked** (G-KFW12-8) |
| **KF.W9 / SS-13** | the visual residue by apotheosis row id — **the Z triptych first (it decides three rows)**; the twelve CARD witnesses; the thirteen TFP witnesses; the nine sidebar witnesses | **DECLARED** |
| **SS-6 (glass BH relay)** | the seven producer rows | **MAIL, per L-4** |

---

## §Excluded — everything not carried, with its reason and its named owner

| excluded | owner · reason |
|---|---|
| **`KF-APP-41`** (the `EditorHeader.vue` delete) **and the kf-EditorShell `C-22` orphan-token limb** | **ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)** — spent with its LAW-A census of record. **No successor packet re-books either** (OP-7, G-KFW12-8). Verified: the file is **not in the tree** |
| **`C-22`'s remaining limbs — `D-27` · `RR-2 M7`** | **NO-WAVE-OWNER, NOT ADOPTED.** §6.D row 2 says so explicitly: *"this note discharges nothing of theirs."* They carry to the next formation boundary's ledger |
| **KF-CE-2's PARENT half** (emit-time target resolution; a `:key`d remount or arm-time id capture) | **KF.W7** — landed. One identity; C-9 is the same defect's milder trigger, **folded, not double-booked** |
| **The `cssIdent` publication** | **KF.W5** — public-surface decision. The demo re-route waits (L-7) |
| **The KF-KE-24 TOKEN decision** | **KF.W6's rider** — the pipeline half is this wave's, the token half is not |
| **Every `demo/scenes/**` file except `CubeAxisLines.vue`** and `EasingSidebar.vue`'s two seat call-sites | **KF.W11** |
| **`demo/app/**`, `demo/components/playback/**`, `TransportDock.vue`, `playback-idiom.css`** | **KF.W13** |
| **The seven glass-producer rows** | **SS-6 BH relay** — relayed, never cured demo-side (G-KFW12-7) |
| **The "both animate the same target simultaneously" scenario (RB-6's filed consequence)** | **KILLED at the bank (L-BL-1)** — the injected sheet binds nothing, so the CSS half cannot animate anything. **Only the residue is cured** |
| **The one-prop cure for KF-TFP-1** | **DEAD — killed three times** (register #3). It trades a blocker for a silent regression |
| **The "cheap highlighting-only import" for KF-CE-1** | **DEAD — killed register #3.** Two honest arms only (§B.5(2)) |
| **Re-auditing any of the 18 records** | **the registry's** — ADJUDICATED; ids for life; folds by reference |
| **Amending RULINGS-4's `.focus-ring` census** | **E-3** — §B.1 row 6 is a frontier reading beside a fixed figure, with its command |

---

## §Commit plan, artefacts, and the L-18 rider

| # | scope | body required | family lock |
|---|---|---|---|
| 1 | `fix(kf/editor): KF-CE-3 — the keyboard trap, tabFocusMode at create` | yes — the WCAG 2.1.2 chain, contrib-free | **FIRST in EDITOR-UNIT** (L-10) |
| 2 | `feat(kf/editor): the KF-CE-1/4 arm, chosen and written down` | yes — the arm, its byte cost re-measured, what stays absent BY DECISION | KF-CE-1 + KF-CE-4 = **one decision** |
| 3 | `fix(kf/editor): the debounce cancel handle + the replaceContent seam` | yes — the LAW A consumer census for `debounce` | additive util change **lands alone** (§B.5(1)) |
| 4 | `fix(kf/axisline): the Z reveal, frame-stamped against rotate3d(-1,1,0,30deg)` | yes — every assertion's frame stamp (KF-AX-4) | — |
| 5 | `fix(kf/options): the one-line capability restorations (4 sites) + the switch rewire` | yes — the producer's prop name **quoted from the installed .d.ts** | **STEP 1 of 5; must not be reordered** (L-2) |
| 6 | `fix(kf/options): persist / representation / authority (KF-CO-3/4/11/12)` | yes | **STEP 2** |
| 7 | `fix(kf/options): the steps cluster (KF-CO-9/10/13/23/36)` | yes | **STEP 3** |
| 8 | `fix(kf/options): the a11y leg + focus management` | yes | **STEP 4** |
| 9 | `chore(kf/options): the hygiene tail + the LP-20 residues` | yes | **STEP 5** |
| 10 | `feat(kf/options): useEasingPickerSeat under the split-seam cure-lock` | yes — why the one-prop cure is dead, third recording | KF-TFP-1 + KF-ES-12 **one composable** |
| 11 | `fix(kf/card): the highlight path stops replacing Vue-owned DOM` | yes | **BEFORE commit 12** (KC-34, L-9) |
| 12 | `fix(kf/card): the keep-mounted repair + the offset pair + the delete affordance` | yes — the total-pair routing for both seams | KC-8/KC-9 **one repair** |
| 13 | `test(kf/card): the UNIT's acceptance test (KF-KC-48) — it gates KF-KC-1` | yes — born-RED → GREEN, with the RED run pasted | — |
| 14 | `fix(kf/kfed): the retiming control + the start field grammar` | yes — **the freeze and the unit fixed in one motion** | **MUST NOT SPLIT** — the freeze without the unit creates the 100×-destructive write |
| 15 | `fix(kf/kfed): the apply identity — class = selector` | yes — the executed assertion, both strings pasted | — |
| 16 | `fix(kf/kfed): the card-cluster z rung + the per-animation shadow state, refcounted` | yes — the `:38-47` comment re-written | KF-KE-5 + KF-KE-6 |
| 17 | `fix(kf/apply): one name via cssIdent (or the identity cure, with its ask declared)` | yes — **which arm, and why**, per L-7 | N-8 |
| 18 | `fix(kf/apply): RB-6 — the applied state and its affordance get one lifetime` | yes — **the killed scenario named as killed** | RB-6 + N-5 |
| 19 | `docs(X·KF W12 close): close record + 7 SS-6 relays + E13 discharge + SS-13 routing` | yes — gate table, commits, **zero SWAP-discharge receipts (the set is empty)** | — |

**Pathspec commits only**, on the commit itself; `scripts/dev/dev.sh` never staged; four tracks share this git index. **Artefacts**: `evidence/W12/**` (born-RED baselines, the apply-identity execution receipt with both strings, the Monaco contribution census, the `vendor-monaco` re-measurement, the Z triptych), the close record at `execution/B/KF-W12.md`, the `LEDGER.md` row advanced by minimal in-place cell replacement.

**L-18 rider.** Passing all nine gates makes X.KF.W12 **IMPLEMENTED**. It never makes it **ACCEPTED**. Per L-18 the implementation must first survive **two challenging gestalt passes**, each a quartet of Opus 5 agents assuming it is wrong, across all three altitudes — total-tranche, wave, feature — reporting defects **and** superlatives with provenance and proof, then adjudicated into an apotheosis by a **singular fresh Fable instance**; any incongruity is addressed and dispatched, never parked (L-18 §5). Reference, not ceremony: for an authoring-surface wave the quartet's most probable finds are **a producer defect cured demo-side** (G-KFW12-7's class), **the OPTIONS order silently re-sequenced so a persistence cure landed first** (L-2's class), **an apply-identity "fix" proven by reading rather than by execution** (the exact failure that let four audits miss KF-KE-4), **a re-booked `KF-APP-41` or `C-22` limb** (G-KFW12-8's class), and **a cure written against the banks' pre-KF.W8 paths** (§B.1's class — five of five anchors moved). Each is already a named falsifier above; the quartet exists to find the ones that are not.
