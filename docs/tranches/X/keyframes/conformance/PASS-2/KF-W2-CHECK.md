# KF-W2 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 2)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W2.md` (353 L, X.KF.W2 · Parse Façade, repaired 2026-08-28)
**Corpus authority**: the **58** `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/` (the sole in-tree carry is `carry/KF-W6-CARRY.md`, 201 rows — confirmed by `ls`: one file)
**Substrate re-checked read-only**: keyframes.js `origin/master` `81a56990736ced5b5edde0b84c527680ac7689b1`; disqualified HEAD `8281638c` consulted only to date drift
**Seat**: FRESH — every count, byte, command and probe re-derived by this seat. PASS-1's register and RULINGS were read, then set aside as claims to be re-tested, never inherited. Zero writes outside this file; zero product source opened for writing.
**Verdict**: **DEFECTIVE** — **62 routed · 47 booked · 15 escaped · 10 defects (6 MAJOR)**.

The repair is real and large: all 19 PASS-1 escapes are adopted by banked id, all ten PASS-1 defects (D-1..D-10) are cured, and the four directives addressed to this wave (**R-1b · R-10 · R-12 · R-16**) are executed, R-10's clause verbatim. What convicts this pass is different work: **two gate witnesses that do not survive execution** (an inert grep, a path that does not exist at the ref), and **a census whose closure claim is measured over 37 of 58 records**.

---

## §0 Method

"Routes to KF-W2" is read at the **terminal disposition**, in any markup — table cells, prose routings, dotted `KF.W2/W3` forms, `cross-ref KF.W2's registry` posture edges, and R1 boundary cells recorded *"so parser waves skip this file"*. That last clause is the rule PASS-1 itself used to count nine tokenless superlatives (its E11–E19) as routed, and the repaired spec adopted all nine; **this seat applies the same rule to the whole 58, not to a 37-record sample.** The `KF.W2` glyph collides with lane-frontend §10's `KF.W2-TABS`; the collision is now declared in the spec (`:7`) and is separated before counting.

Instruments (all read-only): `grep -nE 'KF\.?W2\b'` over the 58 (**70** hit lines / 16 files, reproduced); an `\bR1\b` identity pass (reproduced, **all 58**); a `parse fa[çc]ade|parser (wave|lane|program)` semantic pass; a symbol pass (`parseCssColor|parseCssScalar|parseCssValues?|parseTimingFunction|parseStylesheet|parseKeyframeSelector|serializeCssValue|coerceToSyntax|collect*`); a `posture` pass over the 58; `git cat-file -e` / `git show <rev>:<path>` / `git grep <rev>` byte checks in keyframes.js; and a **node re-execution of the entire F0 matrix** against `node_modules/@mkbabb/value.js/dist/subpaths/css.js` (version re-verified **4.0.0**).

---

## §1 WHAT REPRODUCES — the measurement spine (re-derived, not inherited)

| claim | this seat's independent result |
|---|---|
| `src/animation/compile/parse-facade.ts` **absent** at the ref | `git cat-file -e 81a56990:…` → ABSENT ✓ |
| **11** grammar-entry sites over 9 modules | `adapter.ts:222` · `easing/registry.ts:131` · `emit/format/options.ts:104` · `selector.ts:24` (`parseValueSelector`) · `value/compile.ts:32` · `engine/options.ts:31` · `resolve/browser.ts:162` · `scroll/grammar.ts:77/:85/:109` · `validate.ts:182` — each line read ✓ |
| **10** collector sites over 4 modules | `adapter.ts:205/:241/:341/:374/:377` · `metadata.ts:42/:102` · `scroll/grammar.ts:111/:112` · `validate.ts:186` ✓ **denominator 21 reproduced** |
| census correction: two of the banked thirteen name kf's OWN symbol | `adapter.ts:266` = `export const resolveKeyframes = (` (definition) · `engine/css/animation.ts:15` `import { resolveKeyframes } from "../../compile/adapter"` + `:176` the call ✓ — the correction is **right** |
| `frame/compiler.ts:146` = kf's own `parseKeyframeSelector` | ✓ (`:40` imports it from `../selector`) |
| **27** `src/` files name `@mkbabb/value.js/css`; **15** carry a runtime statement | 27 ✓ ; 12 single-line `import type` + 15 non-type-only ✓ |
| cssom `:28-33` VJ-9 comment · `:214-216` unescaped `new RegExp` | both read verbatim ✓ |
| Tier-C six + the `:341` candidate | `catalog.ts:16` · `view-transition.ts:136`+`:146` · `composition.ts:175` · `format/format.ts:135-144` · `draw-svg.ts:89` · `format/format.ts:341` de-paren ✓ all verbatim |
| Tier-D: 3 serializer copies, 0 exported | `format/format.ts:20` · `css-text.ts:58` · `demo/utils/keyframeSelector.ts:7`; `emit/index.ts` export list read whole — **no keyframe-selector serializer** ✓ |
| `namedSelectorToFraction` is **exported** (`selector.ts:42`), the breach is the `@src/` deep path | ✓ `demo/utils/keyframeSelector.ts:5` = `import { namedSelectorToFraction } from "@src/animation/compile/selector"` — the E-3 correction is right |
| `test/fixtures/keyframes/` = 14 `.css` + `manifest.json` · `test/ingest/` 3 tests · the three named test files | ✓ all |
| `grammar-fuzz.test.ts` docblock *"random VALID @keyframes fragments from MODEL grammars (not raw-string fuzz)"* | ✓ verbatim |
| `GATE-VERDICT.md:42` *"no known consumer feeds the crash shape"* | ✓ live at `:42` |
| OP-2: origin/master `package.json:77` `"@mkbabb/glass-ui": "7.0.0"` devDep vs HEAD `:71` `"6.0.0"` under `optionalDependencies` | ✓ both exact (HEAD also pins value.js `^3.1.0` vs origin/master `4.0.0`) |
| every demo-side census anchor | `CSSCodeEditor.vue:116` · `KeyframeTimeline.vue:239-244/:251-261/:263/:264` · `useTimelineBuild.ts:40-50` (`console.error` at `:48`) · `timelineEngine.ts:11/:13/:15` · `KeyframesEditor.vue:123/:186` · `useKeyframeOps.ts:174` · `keyframeSelector.ts:14-15` · `useSquareTumble.ts:22` · `useSquareDemo.ts:82` · `animationDescriptions.ts:76` ✓ all exact |
| the five library postures | `adapter.ts:219-226` ABSORB · `scroll/grammar.ts:57-63` THROW TypeError · `validate.ts:180-192` SWALLOW → `[]` · `selector.ts:23-35` THROW `AnimationOptionError`/`EMPTY_PARSE` · `value/compile.ts:33-38` THROW TypeError ✓ all read |

**The F0 matrix re-executed cell-for-cell** (node, installed 4.0.0, this seat, 2026-08-28) — **it holds, including both precisions**:

```
"oklch()"      color=THROW  values=THROW  scalar=THROW  timing=ok:false[css_syntax]  kfsel=ok:false[keyframe_selector_invalid]  sheet=ok:false
"calc()"       color=THROW  values=ok:false  scalar=THROW  timing=ok:false  kfsel=ok:false  sheet=ok:false
"steps()"      color=THROW  values=ok:false  scalar=THROW  ...
"var(--x)"     color=ok:false[color_context_required]  values=ok:true  scalar=ok:false[css_syntax]
"color-mix(in srgb, red, blue)"  color=ok:false[css_syntax]  values=ok:true
"oklch(0.7 0.1 200)"  color=ok:true  values=ok:true  scalar=ok:true
parseStylesheet("@keyframes a{from{color:oklch()}}") => THROW      parseStylesheet(42|{}|[]) => ok:true value=[]
parseCssScalar("500%"|"-20%"|"from") => ok:true      parseKeyframeSelector("500%") => ok:false[keyframe_selector_invalid]; ("from") => ok:true
parseTimingFunction(null) => THROW TypeError (reading 'trim')      parseTimingFunction("ease-in-bounce") => ok:false[css_syntax]
```

Every headline the spec builds on this matrix survives an independent execution: the R1 class **is** empty-argument functional notation across five entries; the non-string arm throws everywhere except `parseStylesheet`, which **silently returns `ok:true` with `[]`**; `adapter.ts:219-226`'s ABSORB posture is genuinely unreachable on the class (the nested form throws before returning); `color-mix()` is rejected by the colour entry and accepted by the value entry; and `parseCssScalar("from") → ok:true` refutes the banked "rejects from/to" as an *entry* behaviour. **This is the strongest part of the spec and it is verified, not asserted.** KF-ET-2's quote (`kf-EasingTarget:41`, including the 20-of-28 cure-refutation) and `parseTimingFunction("ease-in-bounce") → FAIL` also reproduce.

**Repair compliance (checked row by row)**: all **19** PASS-1 escapes adopted by banked id — E1 KSM `:142` · E2 DGC C-10 `:143` · E3 SpringTrace D-12 `:212` · E4/E5 KSC C-2/D-6 `:213`/`:214` · E6/E7 SquareScene `:156`/`:154` · E8/E9 KF-ET-2/KF-TFP-20 `:164`/`:165` · E10 CubeScene `:158` · E11–E19 the boundary table `:144-152`; the KSC, SpringTrace, TimelineCaret, SquareScene and EasingTarget quotes all verify **byte-exact** against the bank. D-1..D-10 all cured (fabricated "kf-SquareScene law" struck and the obligation re-founded on a spec-local rule; K-6's reachability guard carried; floor restated at 11 under an enumeration; KF-AV-28 carried verbatim with its one governed row named; phantom ledger struck at `:9`/`:107`/`:332`/`:352`; OP-6 re-declared as an order). R-7a's pair reading (`:306`), R-7b's one sentence (`:317`) and R-15's 17-packet routing (`:311`/`:345`) are present.

---

## §2 ID-KEYED CENSUS — the denominator is not 47

PASS-1 derived **47** routed cells from a **37-record** read; the repaired spec adopts that number as *"the registry's 47 routed cells … 47 accounted, 0 dropped"* and states its AUDITED basis as **37 records** (`:14`). The corpus is **58**. This seat swept all 58 under PASS-1's own routing rule and finds **15 further routed cells** — nine R1-boundary negatives (the exact class PASS-1 counted as E11–E19), five failure-posture cells, one positive-posture cell — plus one tree-side ingress the census omits entirely.

**Routed 62 · booked 47 · escaped 15.**

### 2a · R1-boundary negatives that escape (9) — eight in records never audited, one in an audited record

| # | id ⟨record:line⟩ | banked bytes |
|---|---|---|
| **X1** | **S-9 (RR-2)** ⟨kf-ControlsPaneWrapper:121⟩ | *"this node's keyframes.js consumption is 100% `import type` (`.vue:161-163`; no value.js import at all) — **the parser blast radius has no entry point in this component's import closure**."* |
| **X2** | **C S-A** ⟨kf-EditorHeader:95⟩ | *"proving a negative: **the full import-closure walk that DECLINED an R1 parser-crash claim** and enumerated the chunks through which glass-ui does reach value.js to justify the refusal."* |
| **X3** | **superlative 7** ⟨kf-MatrixEditor:139⟩ | *"The value.js edge is type-only and **R1-clean** *(r1)*: erased `import type` under `verbatimModuleSyntax`; **no parser entered**."* |
| **X4** | **C-negative (upheld)** ⟨kf-PlaybackRibbon:88⟩ | *"the value.js **R1 parser-crash class is NOT reachable** from this component's scrub path (no value.js import; the child's one import is `/math` `clamp`; the seat path is numeric end-to-end)"* |
| **X5** | **superlative 7** ⟨kf-SequencePlayhead:121⟩ | *"`@mkbabb/value.js/math`, declared, 1110 import-free bytes, **parser-crash class unreachable**"* |
| **X6** | **superlative 4** ⟨kf-SequenceScene:119⟩ | *"The value.js edge is the narrowest possible leaf and **R1 is structurally unreachable** — four imports, all `clamp` from `/math`; … no colour string ever enters the engine. Package-enforced, not…"* |
| **X7** | **superlative 7** ⟨kf-SpringHeatmap:101⟩ | *"The narrowest possible value.js surface … `/css`/`/color` untouched, transitive reach verified absent — **the R1 parser-crash class is structurally** [unreachable]"* |
| **X8** | **KF-SST-36 · C-13** ⟨kf-StartingStyleTarget:80⟩ | *"**FOLD BY REFERENCE → banked KF-CB-33** (negative finding upheld AND predictive): **the R1 colour-parser class is unreachable here** (opacity/transform only; `eligible: true` re-executed by this seat)"* — a dependent of the very organ lock the spec carries |
| **X9** | **S-A (C)** ⟨kf-SpringTrace:108⟩ | *"the light/heavy boundary is honoured and **the R1 crash class is provably unreachable** — the closure is value.js-free by construction (sample.ts:16), **proven by enumeration**."* — **in an AUDITED record** |

X1–X8 sit in eight of the twenty-one records the wave never audited (`kf-App.skeleton · kf-ChromeDock · kf-ControlsPaneWrapper · kf-EasingScene · kf-EasingSidebar · kf-EditorHeader · kf-KfPillTabs · kf-MatrixEditor · kf-PlaybackRibbon · kf-RibbonBar · kf-SequenceAxis · kf-SequencePlayhead · kf-SequenceScene · kf-SequenceScrubber · kf-SequenceTarget · kf-SharePopover · kf-SpringHeatmap · kf-SpringScene · kf-SpringTarget · kf-StartingStyleTarget · kf-TransportDock`). Each is indistinguishable in kind from the nine the repair just adopted, and each is exactly what G-W2-5's assertion promises is *"recorded as negatives so no later seat re-probes it."*

### 2b · Failure-posture cells that escape (5) — the registry is short a third time

| # | id ⟨record:line⟩ | banked bytes |
|---|---|---|
| **X10** | **L-15** ⟨kf-TimelineCaret:68⟩ | *"**silent swallow on unparseable input diverges from the cluster's toasting posture** … Recorded as filed, unactioned pending the W7 posture ruling. → KF.W7."* |
| **X11** | **L-11** ⟨kf-KeyframeTimeline:72⟩ | *"`rebuild` is `async` typed/called as `() => void` …; `snapshot` **toasts success before the rebuild can fail** (:31-34); **failures reach only `console.error`**. → KF.W7."* |
| **X12** | **D-15** ⟨kf-KeyframeTimeline:59⟩ | *"empty / single-frame / **rebuild-failure states are unexpressed** … **the one failure reachable BY TYPING is the one that doesn't toast**."* |
| **X13** | **KAD-10** ⟨kf-KeyframesAddDialog:54⟩ | *"MAJOR · **async submit, no busy state**; re-entry re-appends stops … `addKeyframesStringToAnimation` awaits `parseAnimationCSS` and loops `addFrame` … **with no in-flight guard**. → KF.W7."* |
| **X14** | **KF-ET-28** ⟨kf-EasingTarget:70⟩ | *"**value.js's Result API reaches the render path through a throwing adapter with no boundary** … The `?? ""` decoy at :288 guarantees the throw it appears to prevent … → **NO-WAVE-OWNER** (**degrade-don't-detonate posture**; skip-not-throw on missing attribute)."* |

All five sit in **audited** records, and four are named from the consumer's end — `KF-W7.md:288`, **G14**: *"Assertion: one declared failure posture across cluster + dialogs, **registered in KF.W2's posture registry (cross-referenced both ends)**. Carries: C-7 (posture arm…), **L-15 (TimelineCaret)**, **L-11 (KeyframeTimeline)**, **D-15 (KeyframeTimeline)**, R-4 (+ KAD-9, **KAD-10**)."* KAD-10 is the **busy-state half of the very contract the spec quotes from KAD-9** (*"the failure-posture / busy-state contract (KF.W7, joined to KF.W2's registry)"*) — carried in name, dropped in limb (M-25).

### 2c · Positive-posture cell that escapes (1)

| # | id ⟨record:line⟩ | banked bytes |
|---|---|---|
| **X15** | **SUP-3 (L axis)** ⟨kf-ChannelControls:121⟩ | *"`trySetOption` **catches BY ERROR NAME and re-throws everything else** while the store still records the raw string — **the best consumption of a fail-explicit engine API in the repo, against lane-library §7.5's five inconsistent postures**."* |

This is the corpus's **only** cell that measures a live consumer directly against §7.5 — the registry's own authority — and the only banked exemplar of *correct* consumption of a fail-explicit engine API. The spec records one positive exemplar (kf-SpringPhysicsFacet ★ S-7) and misses the one addressed to its own subject.

### 2d · Tree-side ingress omitted from the census of record (1, not a registry cell)

`demo/components/instrument/keyframes/utils/parseAnimationCSS.ts` — the demo's principal CSS→AST adapter, at origin/master:

- `:1-5` runtime import of **`collectAnimationOptions` + `collectStyleRules`** from `@mkbabb/value.js/css`; calls at **`:36`** and **`:41`**;
- `:7` `import { serializeTimingFunction } from "@src/animation/compile/emit/css-text"` — a **deep `@src/` import**, the banked C-12/KF-CE-12 breach class;
- `:32-34` **`throw new TypeError(\`Invalid animation CSS: …\`)`** on a `PARSE_ERROR` diagnostic — a value.js-bearing failure posture, and the one KAD-9/KAD-10 and KF-KE-3's *"fails ~1 s later"* both sit downstream of;
- `:22-24` docblock: *"The engine adapter is the single grammar authority… **this module performs no regex pre-detection or second parse**"* — precisely the comment class this wave's own declared commit-family rule governs.

It appears **nowhere** in `KF-W2.md` — not §Bounds, not the READ-ONLY census-cell list, not §Excluded — while the spec cites `timelineEngine.ts:11`, the line that imports it. Independent demo-side measurement: **6** modules hold runtime value.js grammar/collector entries (`KeyframesEditor.vue`, **`parseAnimationCSS.ts`**, `useSquareDemo.ts`, `useSquareTumble.ts`, `keyframeSelector.ts`, `animationDescriptions.ts`); the spec names five and asserts an unreconciled *"8 demo-side seams"*.

---

## §3 NO INVENTION (M-25 depth) — **PASS, with one dropped limb**

Every substantive cite re-checked at the bytes verifies **EXACT**: KF-APP-56 · KF-CE-12's arm-split · C-7's split lock · R-4's precision correction · KAD-9's cross-ref · KF-KE-3/-54/-46 · KF-KC-53 · LP-24 · MM-37 · CubeTarget #11 · ChannelControls C's L-1 · KF-CB-33's organ lock · C·S-4 · KF-HA-19 · **K-6 at `kf-SquareInstrument.md:24/:100` with its reachability guard now carried** · MISS-β2's three limbs, the 8-integer corruption set and the `→ KF.W8 (publish-or-relocate, joint with banked C-12) · cross-ref KF.W2` routing at `kf-TimelineCaret.md:46` · KSC `:60`/`:63` · SpringTrace `:56` and the packet phrase *"the parser posture (D-12/L-6/C-4 + the filter-cell)"* at `:140` · SquareScene `:44` C-1 / `:53` / `:89` MISS-4 / `:125` / `:132` · CubeScene `:170` · KF-ET-2 `:41` · KF-TFP-20 `:63` · all eleven boundary-table quotes. The fabricated "kf-SquareScene law" is gone and the obligation is re-founded on a spec-local rule that claims no corpus authority — the right cure. **No invention found in this pass.**

The one M-25 miss is a **limb**, not a quote: KAD-9's banked routing names *"the failure-posture / **busy-state** contract"*; the busy-state limb is **KAD-10** ⟨:54⟩ and it is dropped (§2b, X13).

---

## §4 GATES — born-RED with real witnesses (L-19): **FAIL on two of eight**

Six gates hold: **G-W2-1** (witnesses all read), **G-W2-4** (`cssom.ts:214-216` verbatim; the fixture is a real falsifier), **G-W2-5** (the strongest gate in the file — its witness re-executes), **G-W2-6** (both call sites and all five probes reproduce), **G-W2-7** (14 fixtures + manifest verified; `roundTripScrollCSS` at `scroll/grammar.ts:143` verified), **G-W2-8** (correctly conditioned on a named order; the reciprocal really is declared at W8 — see §5). Two do not.

### G-W2-2 — the check command is INERT at the ref of record

The gate's own named check, run verbatim by this seat at `81a56990`:

```
$ git grep -nE "import[^;]*\b(parseStylesheet|parseCssValues|parseCssValue|parseCssScalar|parseTimingFunction|
    parseKeyframeSelector|parseAnimationTimeline|parseAnimationRange|collect(Keyframes|StyleRules|
    AnimationOptions|CustomFunctions|PropertyDescriptors|TimelineOptions))\b" 81a56990 -- src/
    → ZERO HITS
```

Three independent faults, each fatal to the gate:

1. **`-E` has no `\b`.** POSIX ERE does not define `\b`; git grep's `-E` engine matches nothing. The same pattern under `-P` returns hits. **A gate that names 21 sites is witnessed by a command that names none, at the ref the spec pins.**
2. **git grep is line-oriented; six of the ten parse-surface modules use multi-line import blocks.** Even repaired to `-P`, the command names **4** modules — `value/compile.ts:1`, `engine/options.ts:17`, `resolve/browser.ts:3`, `validate.ts:47` — and is blind to `adapter.ts:14`, `easing/registry.ts:15`, `emit/format/options.ts:28`, `selector.ts:6`, `engine/css/metadata.ts:30`, `scroll/grammar.ts:37`. A seat could route the four single-line importers through the façade and the check would read "0 modules" while six runtime grammar importers still stand.
3. **The symbol list re-commits the conflation the spec corrects elsewhere.** `parseKeyframeSelector` is *kf's own* exported wrapper (`selector.ts:23`); `frame/compiler.ts:40` — `import { FRAME_ID_SCALE, parseKeyframeSelector } from "../selector";` — is a single-line import the fixed pattern matches. F1 makes exactly this correction for two of the banked thirteen; the gate does not carry it.

The falsifier as written (*"a second runtime import edge of any listed symbol … reds it"*) therefore cannot fire, and the assertion cannot be turned by evidence.

### G-W2-3 — one witness path does not exist at the ref of record

§Bounds owns `src/animation/resolve/resolve-if.ts` (*modify-carve*, whitespace canonicalisation + `legacyClauses`/LEG-1); G-W2-3's assertion and §Excluded both name it as a re-derivation candidate. At `81a56990`:

```
$ git cat-file -e 81a56990:src/animation/resolve/resolve-if.ts   → ABSENT
$ git cat-file -e 8281638c:src/animation/resolve/resolve-if.ts   → PRESENT   (the DISQUALIFIED head)
$ git grep -n legacyClauses 81a56990 -- src
    src/animation/resolve/conditional.ts:27:  const legacyClauses = (list: CssList): readonly IfClause[] => {
    src/animation/resolve/conditional.ts:52:      return legacyClauses(fn.args[0]);
```

The real file is **`src/animation/resolve/conditional.ts`**. This is the **seventh** member of the drift class the §Bounds table exists to close, and the table missed it while the section asserts *"every left-hand path was re-resolved here, and every right-hand path re-verified present"* and *"a unit dispatched on the stale paths writes nothing and reports success."* The spec's note (*"neither found at the banked lines by this seat's grep"*) records a symptom of a renamed file as a line-anchor miss.

Everything else in the witness set survived: `parse-facade.ts` absent, all Tier-A/B/C/D anchors verbatim, fixtures 14+1, `test/ingest/` 3 tests, the fuzz docblock, `GATE-VERDICT.md:42`, both `package.json` anchors.

---

## §5 E-3 + STATUS — **CLEAN**

- `VERIFIED` appears exactly twice: the verb table (`| VERIFIED | **NO** |`, `:17`) and the census label *"VERIFIED NEGATIVES"* (`:136`). **Zero VERIFIED stamps.**
- `**Status**: **planned**` at `:5`, restated at `:352`; `EXECUTION IS NOT AUTHORIZED BY THIS FILE` at `:19`; `IMPLEMENTED | NO`.
- No execution verb in current voice; every product-facing act is declarative (`create`, `modify`, *"DECLARED, not created by this file"*).
- Opens no product source: the only declared write is the spec; *Do NOT touch* names `scripts/dev/dev.sh` (NEVER), the pinned `GATE-VERDICT.md` (addendum-not-rewrite, epoch rule), value.js `src/**`, and the version pins (OP-5).
- E-3 honoured on every correction (`namedSelectorToFraction` exported · `keyframe_selector_invalid` · `parseCssScalar("from") → ok:true` · the §F-2 falsification · K-6's bank statement) — all recorded **beside** dated records, none rewritten.

---

## §6 POSTURE AXES

| axis | binding? | finding |
|---|---|---|
| **KF.W4 is the DECLARED SEQUENCING HEAD** | YES | **HONOURED.** OP-4 states KF-CE-16 ≡ KF-APP-4 as the sequencing head, scopes it to the demo-side arms with `check:lib` as the `src/` carrier, §Sequencing ¶5 defers the KFED-UNIT call-site edit behind it, and the cross-edge owes W4 the corrected 21/15 denominator. ✓ |
| **KF.W3 GATED, never scheduled** | YES | **HONOURED.** OP-5 *"KF.W3 owns the repin … **KF.W2 MUST NOT REPIN**"*; §Sequencing ¶6 *"No repin"*; cross-edge labelled `(GATED)`; the F0 matrix handed forward as W3's before-table; KSC C-2's reachability arm and kf-AmigaScene's R1 row explicitly left with W3. No W3 act scheduled. ✓ |
| **KF-AV-28 rider present wherever governed rows are cured** | YES | **HONOURED.** §Carry F5 carries R-10's clause **verbatim** (word-for-word against `RULINGS.md:201`), enumerates the one governed row (**L-6/C-4**, timeline cluster), makes G-W2-7's second clause conditional in the gate text itself (`:279`), and names the *not*-governed set so the boundary is checkable. `KF-W7.md:7` carries the lock at the other end. ✓ |
| **Pass-1 rulings addressed to KF-W2 faithfully applied** | YES | **R-1b** ✓ (four adopted by id with locks; the DGC `/math`-is-not-the-parse-surface mechanism named; SquareScene C S-C cited upward as the bank instructs with L-10 riding); **R-10** ✓ verbatim; **R-12** ✓ (phantom struck at `:9`/`:107`/`:332`/`:352`; denominator restated); **R-16** ✓ (OP-6 ORDERED, G-W2-8 arms iff W8 has not preceded — and `KF-W8.md:143`/`:289` really do carry the reciprocal). R-7a's pair reading and R-7b's one sentence also present. **Line anchors drift** — see D-7. |
| **KF.W2-TABS namespace (PASS-1 D-8)** | — | **CURED.** `:7` declares both taxonomies, quotes `KF-W6.md:10`'s binding collapse (verified), and separates the ~25 TABS rows from the 70 hit lines. ✓ |

---

## §7 DEFECT REGISTER

| # | severity | claim | receipt |
|---|---|---|---|
| **D-1** | **MAJOR** | **G-W2-2's check command is inert at the ref of record.** Run verbatim it returns **0 hits** (POSIX `-E` has no `\b`); repaired to `-P` it names **4** of the 10 parse-surface modules because six use multi-line import blocks; and it matches kf's OWN `parseKeyframeSelector` import — the exact conflation F1 corrects for the banked thirteen. The gate cannot be born-RED at 21 and cannot be turned by its own falsifier. | executed: `git grep -nE "import[^;]*\b(...)\b" 81a56990 -- src/` → ZERO; `-P` → `value/compile.ts:1`, `engine/options.ts:17`, `resolve/browser.ts:3`, `validate.ts:47` only; blind to `adapter.ts:14`, `easing/registry.ts:15`, `emit/format/options.ts:28`, `selector.ts:6`, `metadata.ts:30`, `scroll/grammar.ts:37`; false positive at `frame/compiler.ts:40` |
| **D-2** | **MAJOR** | **§Bounds owns a path that does not exist at the ref of record.** `src/animation/resolve/resolve-if.ts` is a HEAD-only artefact; the real module is `resolve/conditional.ts`. It is the seventh drift-class member and the drift table missed it, in the section that declares stale paths load-bearing. | `git cat-file -e 81a56990:src/animation/resolve/resolve-if.ts` → ABSENT; `8281638c:` → PRESENT; `git grep -n legacyClauses 81a56990 -- src` → `resolve/conditional.ts:27,:52`; cited at `KF-W2.md:86`, `:258`, `:347` |
| **D-3** | **MAJOR** | **The posture registry is short a third time.** G-W2-1 asserts *"every banked failure-posture cell in the 37 audited records has exactly one row"* at a floor of 11; ≥5 further banked posture cells in **audited** records exist, four of them named from the consumer's end as registering here. | `kf-TimelineCaret.md:68` (L-15) · `kf-KeyframeTimeline.md:72` (L-11) + `:59` (D-15) · `kf-KeyframesAddDialog.md:54` (KAD-10) · `kf-EasingTarget.md:70` (KF-ET-28); `KF-W7.md:288` G14: *"registered in KF.W2's posture registry … Carries: C-7, L-15, L-11, D-15, R-4 (+ KAD-9, KAD-10)"* |
| **D-4** | **MAJOR** | **The ingress census of record omits the demo's principal CSS→AST adapter.** `parseAnimationCSS.ts` holds two value.js collector entries, a deep `@src/` import, a THROW posture, and an invariant docblock about the mechanism this wave changes — and appears nowhere in the spec, though the spec cites the line that imports it. | `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:1-5,:7,:22-24,:32-34,:36,:41` at `81a56990`; `KF-W2.md:95` cites `timelineEngine.ts:11` (= the import of this module); 0 occurrences of `parseAnimationCSS` in `KF-W2.md` |
| **D-5** | **MAJOR** | **The boundary set is short by nine banked R1 negatives**, so G-W2-5's *"recorded as negatives so no later seat re-probes it"* is false as written; eight sit in records the wave never audited, one in an audited record. | `kf-ControlsPaneWrapper.md:121` · `kf-EditorHeader.md:95` · `kf-MatrixEditor.md:139` · `kf-PlaybackRibbon.md:88` · `kf-SequencePlayhead.md:121` · `kf-SequenceScene.md:119` · `kf-SpringHeatmap.md:101` · `kf-StartingStyleTarget.md:80` · `kf-SpringTrace.md:108` |
| **D-6** | **MAJOR** | **G-W2-2's scope contradicts the spec's own binding consequence.** F1 states KF-KE-54 binds *"the gate guarding the façade **must not be `src/`-scoped**"*; G-W2-2's assertion and check are `src/`-scoped, and the six demo-side runtime grammar/collector modules are covered by no gate in this wave. | `KF-W2.md:187` vs `:253-254` (`-- src/`, *"exactly one module in `src/animation/**`"*); measured demo-side runtime entries: `KeyframesEditor.vue:123`, `parseAnimationCSS.ts:1-5`, `useSquareDemo.ts:4`, `useSquareTumble.ts:2`, `keyframeSelector.ts:2`, `animationDescriptions.ts:128` |
| **D-7** | **MINOR** | **Three cross-spec line anchors asserted as "verified" do not hold**, in a spec whose own drift table convicts stale anchors. Substance survives at all three; the coordinates do not. | `KF-W2.md:236` cites `KF-W7.md:234` for the verdict table — `:234` is a *Runnability* paragraph, the table assertion is `:238`; `:170` cites `KF-W7.md:284` for G14 — `:284` is **G13**, G14 is `:288`; `:285` cites `KF-W8.md:254` for the reciprocal — `:254` is `## Sequencing`, the reciprocal is `:143`/`:289` |
| **D-8** | **MINOR** | **The 37-record AUDITED basis is never reconciled to the 58-record authority.** No §Excluded line states why 21 records carry no routed row, so *"No registry-routed row is unaccounted"* rests on an unstated sample — the mechanism behind D-5. | `KF-W2.md:14` (37 records enumerated) vs 58 files in `registry/adjudicated/`; the 21 unaudited records listed at §2a above |
| **D-9** | **MINOR** | **An unqualified reachability sentence beside a pair-reading lock.** §Sequencing states the `useSquareTumble.ts:22` seam *"throws on `oklch()`/`calc()`"*; only the **empty-args** form throws. | executed: `parseCssColor("calc(1px + 2px)")` → `ok:false [css_syntax]`; `parseCssColor("calc()")` → THROW. `KF-W2.md:301` vs the F0 row and the carried D-27 quote (`parseCssScalar("calc(1px + 2px)")` → ERR) |
| **D-10** | **MINOR** | **The positive-posture register misses the corpus's only cell measured against §7.5** — the registry's own authority — and the only banked exemplar of correct fail-explicit consumption. | `kf-ChannelControls.md:121` SUP-3: *"`trySetOption` catches BY ERROR NAME and re-throws everything else … the best consumption of a fail-explicit engine API in the repo, **against lane-library §7.5's five inconsistent postures**"*; `KF-W2.md:218` records only ★ S-7 |

---

## §8 WHAT SURVIVES

The repair did the hard part. Nineteen escaped registry cells are adopted by banked id with their locks quoted verbatim; a fabricated authority is struck and the obligation honestly re-founded; K-6's measurement is restored with its reachability guard promoted to a first-class datum; the posture floor is restated as an *enumeration* rather than an integer — the correct structural cure for the failure mode this wave twice convicted; the KF-AV-28 rider is carried word-for-word with its single governed row named and G-W2-7's clause actually made conditional; the phantom CARRY is struck at all four sites; and the W2↔W8 circle is broken at the ordered end, with the reciprocal genuinely present in `KF-W8.md`. The measurement spine — 21 sites, 27/15, the six-path drift table, every Tier-A/B/C/D byte, the fixture inventory, the `parse-facade.ts` absence — reproduces exactly at `origin/master 81a56990`, and **the F0 entry-point matrix reproduces cell-for-cell on an independent execution**, including both diagnostic-code precisions and the `parseStylesheet(non-string) → ok:true []` finding. The E-3/status axis is clean; the KF.W4 head, the KF.W3 gate and the KF.W2-TABS disambiguation are all honoured.

**What fails is the same axis as pass 1, one level deeper, plus two witnesses that do not survive execution.** The census closed over 37 of 58 records and calls the result complete; a 58-record sweep finds fifteen more routed cells and one whole demo-side parse module absent from the census of record. And in a wave whose own doctrine is that a phantom coordinate convicts, one gate's check names nothing at the ref it pins, and one owned path does not exist there.

**verdictLocal: DEFECTIVE.**

*Fresh adversarial seat, PASS 2, 2026-08-28. Sole write = this file. No product source opened for writing; every keyframes.js read was `git show`/`git grep` at `origin/master`, and the only execution was a read-only node probe of the installed `@mkbabb/value.js@4.0.0` dist.*
