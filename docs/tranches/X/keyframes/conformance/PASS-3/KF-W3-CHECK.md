# KF-W3 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 3)

**Spec under trial**: `docs/tranches/X/keyframes/waves/KF-W3.md` — **101 473 B, 281 lines**
(pass 1: 57 164 B / 232 · pass 2: 86 041 B / 261).
**Corpus authority**: the **58** `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/`
(`ls kf-*.md | wc -l` → 58). Sole in-tree carry: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`
(199 055 B, 366 lines) — `ls` over `carry/` returns that file only.
**Method**: ID-KEYED CENSUS re-derived from zero. This seat inherited **no** denominator, id list or
verdict from PASS-1/PASS-2; the routed set was rebuilt by independent `grep` over all 58 records in
every markup (bare `KF.W3`, dotted `KF.W2/W3`, the `KF.W3-SHIM` spelling, parser-lane prose
`parser lane|wave|ingress|consumption`, and the `megatranche R1` fold form), each hit then classified
row / header-taxonomy / cross-reference / terminal-manifest **by reading its bytes**, and each
surviving id tested for carriage by `grep -cF` against the spec.
**Seat instruments (read-only)**: `grep`/`sed`/`awk`/`comm` over the 58 records, `COHESION.md`,
`lane-docs.md`, `library-band.md`, `INBOX.md`, `KF-W4.md`, `KF-W10.md`, `package.json`,
`src/css/grammar.ts`; `git show`, `git grep`, `git ls-tree`, `git rev-list` in
`/Users/mkbabb/Programming/keyframes.js` at **`origin/master` `81a56990`**; and **one execution** —
the R-E `EXECUTE-NO-WRITE` probe, run unmodified.
**This file is the only write.** No product source was opened for writing.

**VERDICT: DEFECTIVE** — 2 MAJOR · 3 MINOR · 1 INFO. **Not census-fatal** (escapedCount = 0), but
**two axes fail**: axis 1 (the routed/surplus membership law is self-contradictory, so `routedTotal`
is not auditable) and axis 5's W10 clause (a W10 carry-routed obligation is closed by **omission**,
not carriage). Axes 2, 3 and 4 PASS. Both PASS-2 MAJORs are re-derived as cured.

---

## §0 TREE LAW — the conviction test, run first

**PASS. No witness in this spec is anchored at the disqualified `8281638c`.**
`git rev-parse origin/master` → `81a56990736ced5b5edde0b84c527680ac7689b1`; `HEAD` → `8281638c…`;
`git rev-list --left-right --count origin/master...HEAD` → **`41  1`** (= the spec's *"1 ahead / 41
behind"*, exact).

All five `8281638c` occurrences in the spec are non-witness by inspection:

| line | occurrence | class |
|---|---|---|
| `:15` | *"Local HEAD `8281638c` … is **DISQUALIFIED** as witness substrate"* | disqualification statement |
| `:126` | C-7's citation cap — *"Citable ONLY as `345/12/57 @ 8281638c`"* | citation-form lock (the only lawful form) |
| `:213` | X-1 (Codex B-lineage pinned stale) → **KF.W0** | routing-away |
| `:239` | E-10 restates the X-1 routing | routing-away |
| `:240` | E-11 forbids any other citation form | negative lock |

Every gate RED baseline resolves at `81a56990` or on the value.js tree. **No conviction.**

---

## §1 CENSUS TOTALS

| bucket | count |
|---|---|
| **routedTotal** (distinct registry row-ids routing to this wave, all markups) | **24** |
| **BOOKED** (§Carry fold-identity · §Excluded E-1 disposal · §Excluded E-15 exclusion-with-named-owner) | **24** |
| **ESCAPED** (no row, no fold-identity, no exclusion line) | **0** |

Carriage **24 / 24 = 100 %**. Plus **10 surplus** ids booked outside the routed arithmetic
(X-16 · X-17 + the eight-row surplus sub-line), all present on the page.

**Independently derived denominator — 19 canonical + 5 SHIM.** Re-enumerated by this seat from the
bytes, never inherited:

`kf-AmigaScene:150` · `kf-App:111` · `kf-CopyButton:81` · `kf-CSSCodeEditor:46/:134` ·
`kf-KeyframeCardList:122` · `kf-KeyframeTimeline:48/:112` · `kf-KeyframesStringControls:63` ·
`kf-StartingStyleTarget:80/:139` · `kf-KeyframeCard:101` · `kf-EasingTarget:77` ·
`kf-CubeAxisLines:108` · `kf-EditorShell:77` · `kf-KeyframesEditor:99` · `kf-TimelineTrack:18/:130` ·
`kf-ChannelOptions:126/:155` · `kf-DemoGlobalChrome:77` · `kf-ChannelControls:126` ·
`kf-CubeTarget:76` · `kf-SquareScene:132` — **19**.
SHIM rows: `kf-ChannelControls:79` · `kf-AnimationControlsGroup:74` · `kf-KfPillTabs:58` ·
`kf-KfPillTabs:70` · `kf-DemoGlobalChrome:70` — **5**. **19 + 5 = 24.**

**SHIM cardinality independently re-derived (spec C-6 / E-1 = "5 rows across 4 records").**
`grep -n 'KF\.W3-SHIM' kf-*.md` → **12 hits in 5 records**. Subtract the **5** header-taxonomy
sentences (`kf-AnimationControlsGroup:17` · `kf-ChannelControls:17` · `kf-ControlsPaneWrapper:6` ·
`kf-DemoGlobalChrome:17` · `kf-KfPillTabs:19`), the **1** in-row cross-reference-to-a-law
(`kf-AnimationControlsGroup:39`) and the **1** terminal-manifest restatement (`kf-KfPillTabs:122`):
12 − 7 = **5 rows**, in **4** records (kf-KfPillTabs books two). `kf-ControlsPaneWrapper` carries the
spelling **only** in its `:6` header and books no shim row. **The spec's round-2 D-03 repair is
CONFIRMED by independent measurement.**

---

## §2 BOOKED — id for id (24)

**§2.A §Carry fold-identities (9)** — the spec's own arithmetic `1 + 4 + 3 + 1 = 9` closes and is
verified id for id:

| # | record : line | row id | spec site |
|---|---|---|---|
| B-01 | `kf-AmigaScene.md:150` | S+2 / superlative 6 | §Carry **C-1** ownership cell, verbatim |
| B-02 | `kf-CSSCodeEditor.md:46, :134` | KF-CE-12 · C-7 | C-1 rider **(a)**; §B.3 row 6; G-KF3-7 falsifier |
| B-03 | `kf-KeyframeTimeline.md:48, :112` | C-7 | C-1 rider **(b)**; §B.3 row 8; E-5 + L-9 |
| B-04 | `kf-KeyframeCardList.md:122` | Axis C · S-C | C-1 rider **(d)** |
| B-05 | `kf-KeyframesStringControls.md:63` | C-2 | C-1 rider **(c)**; §B.3 row 7; G-KF3-4 falsifier; E-5 + E-14 |
| B-06 | `kf-CopyButton.md:81` | KF-CB-33 · C-14 | §Carry **C-2** whole, EE-01/DP2-02 + two-channel edict |
| B-07 | `kf-StartingStyleTarget.md:80, :139` | KF-SST-36 · C-13 | C-2 provenance, *"Not re-booked"* preserved |
| B-08 | `kf-KeyframeCard.md:101` | KF-KC-53 · C-7 | C-2 provenance |
| B-09 | `kf-EasingTarget.md:77` | KF-ET-32 (KF.W3 leg) | §Carry **C-3**, METHOD-BINDING → G-KF3-7 predicate |

**§2.B §Excluded E-1 — the SHIM taxonomy disposal (5)**, riders intact (kf-ACG L-5's
evidence-correction; kf-KfPillTabs L:D-8's `ChannelControls.vue:230` repoint lock;
kf-DemoGlobalChrome M-L3's **NO-WAVE-OWNER** terminal-disposition correction). Squaring re-checked:
`KF-W6-CARRY.md` carries `F-5` (11), `KF.W3-SHIM` (2) — the family lands. **No orphaning.**

**§2.C §Excluded E-15 — exclusions-with-named-owner, owner KF.W2 (10 routed + 10 surplus)**
X-06 `kf-App:111` · X-07 `kf-EditorShell:77` · X-08 `kf-CubeAxisLines:108` · X-09 `kf-KeyframesEditor:99` ·
X-10 `kf-TimelineTrack:18/:130` · X-11 `kf-ChannelOptions:126/:155` · X-12 `kf-ChannelControls:126` ·
X-13 `kf-CubeTarget:76` · X-14 `kf-DemoGlobalChrome:77` · X-15 `kf-SquareScene:132`.
Surplus: X-16 `kf-KeyboardShortcutsModal:78` · X-17 `kf-SpringTrace:56` + the eight-row sub-line
(kf-CSSPasteDialog C-4 · kf-LayerConfigPanel LP-24 · kf-KeyframesAddDialog C's K-5 · kf-OrbitalDrag #3 ·
kf-SpringPhysicsFacet ★S-7 · kf-TimelineHoverPreview S+3/S-d · kf-AnimatedText C-10 · kf-SpringTrace S-A).

**Verbatim fidelity spot-check at the bank (M-25, axis 3)** — kf-CSSPasteDialog `:76`,
kf-AnimatedText `:105`, kf-SpringTrace `:108`, kf-OrbitalDrag `:132`: **all byte-faithful**,
including S-A's full *"the adopting spec must state this trade"* obligation clause and #3's
*"while a sibling scene took the exposed edge"* corroboration clause. No paraphrase, no severity
re-grade, every *do-not-re-file* lock intact.

---

## §3 AXES

| axis | result |
|---|---|
| **1 · ID-KEYED CENSUS** | **FAIL (MAJOR)** — carriage is complete (0 escapes) but the routed/surplus **membership law contradicts itself**; `routedTotal` cannot be audited. See **D-1**. |
| **2 · AUTHORITY REALITY** | **PASS** with two MINOR precision defects (**D-3**, **D-4**). Every cross-spec receipt resolves; three basenames resolve only off tree-root. |
| **3 · M-25 DEPTH** (locks/riders/dissents) | **PASS** on locks and riders; **one adverse dissent uncarried** (**D-2**), one verbatim-claim overstated (**D-6**). |
| **4 · GATES BORN-RED, REAL WITNESSES AT THE FRONTIER** | **PASS — unqualified.** Every anchor re-measured; the probe **executed**. See §4. |
| **5 · POSTURE** | **FAIL (MAJOR)** on the W10-carriage clause (**D-2**). W4-head, npm-run-check composition, gated-unscheduled, KF-AV-28 and O-numbering all **PASS**. See §5. |

---

## §4 GATES — every witness re-measured at `81a56990` (axis 4: PASS)

**Library half — all anchors HOLD exactly.**
`css-text.ts` `:17 export const reverseAnimationShorthand = (` · `:41 export const serializeCssValue = (value: CssValue): string => {` ·
`:43`/`:48` recursive self-calls · `:54 if (!serialized.ok) throw new TypeError("Value returned an unserializable CSS color.");` ·
`:56` fork end · in-file callers `:66` (declaration serialize) `:83` (`initial-value` emit) `:89` (parameter default) — **the `:41-56` span and the five use sites are exact.**
`emit/format/options.ts` `:10` `:20` `:81` `:104 parseTimingFunction(timingSource)` `:121 return reverseAnimationShorthand(cssOptions);` — **path correction CONFIRMED** (`emit/format-options.ts` does not exist).
`emit/backward/backward.ts` `:20` *"value.js's OWN"* · `:46` static-import prose · echoes `:252`/`:285` — **path correction CONFIRMED**.
`emit/index.ts:53 export { cssIdent } from "./backward";` — holds (but see **D-3**).
`package.json` **`:70 "@mkbabb/value.js": "4.0.0"`** and **`:77 "@mkbabb/glass-ui": "7.0.0",`** — both exact; the §B.1 `:69→:70` correction is right.

**The boot-evaluated easing fence — the spec's most consequential correction: CONFIRMED WHOLE.**
`git ls-tree` over `src/animation/compile/easing/` → **`index.ts` · `option.ts` · `registry.ts`
only**; **no `easing-registry.ts` exists**, so all three inherited anchors were genuinely dead.
At `registry.ts`: `:4 bezierPresets,` · `DIRECT_NAMES` `:18-28` carrying `:26 "smoothStep3",` and
`:27 "easeInBounce",` · `registryNames` `:30-34` with `:31 ...Object.keys(bezierPresets),` ·
`timingFunctionEntries` `:37-48`, a **module top-level `const`** whose `:40` is `registryNames.map(`
and whose `:43-46` is `throw new Error(\`value.js rejected its own easing ${JSON.stringify(name)}: …\`)` ·
`:131 const parsed = parseTimingFunction(timingFunction);`.
**Boot-evaluation confirmed by structure, not by assertion.** This also *corrects* the inherited
`library-band.md` framing (*"removals are a `loadAnimationEngine()` boot crash"*) to a module-load
throw — the spec states the correction and is right.
Blast radius exact: `TimingFunctionPanel.vue` `:52/:97/:98/:127` · `EasingSidebar.vue` `:77/:112/:155`.

**Demo half — the six-hit grep reproduced exactly.**
`git grep -n "parseCssColor\|parseCssScalar\|parseCssValues" 81a56990 -- demo/` → **6 hits = 3 imports
+ 3 calls**: `KeyframesEditor.vue:123` (import) `:186` (call) · `useSquareDemo.ts:4` (import) `:82`
(call) · `useSquareTumble.ts:2` (import) `:22` (call). The census's five-site §4.6 roster is
**measurably wrong in two of five**, as the spec says.
`useSquareTumble.ts` `:17 if (value) hues[index] = value;` · `:21-25` with
**`:23 if (!parsed.ok) throw new TypeError(\`Invalid square palette color: ${css}\`);`** — the
C-4/C-5 pair reading is anchored on real bytes.
`keyframeSelector.ts` `:1-5` import block, `:2 parseKeyframeSelector,`, `requireKeyframeSelector`
`:14-21` with the throw opening at **`:18`** — kf-authored, not a value.js throw. Live callers
`useKeyframeOps.ts:174` · `timelineEngine.ts:83`; `test/demo/instrument/value4-editor-boundary.test.ts:28`
asserts the throw. **All exact.**
`animationDescriptions.ts` `:76 const parsed = parseTimingFunction(value);` / `:128` import — the
**channel-(ii) site mis-filed in the colour/scalar roster** is real; KF-CB-33's prediction firing a
second time is a measured fact.
`CSSCodeEditor.vue`: `:114 const debouncedEmit = debounce(` and `:116 modelValue.value = value;` —
the banked `:116` anchor **does** land inside the debounce block, not the ingress. The spec's
UNRESOLVED verdict is correct.
`KeyframesStringControls.vue:123-125` = `onMounted(async () => { await updateCSSAnimationKeyframesStringFromAnimation(); });`
— sole mount writer, **no `try`**. Exact.

**G-KF3-2 — RED BASELINE EXECUTED, NOT ASSERTED.** This seat ran the R-E probe unmodified:

```
RED  parseCssColor  102/172 throw   RED  parseCssScalar 102/172 throw
RED  parseCssValue   60/172 throw   RED  parseCssValues  60/172 throw
ok   parseKeyframeSelector · parseStylesheet · parseTimingFunction
ok   parseAnimationTimeline · parseAnimationRange        (0/172 each)
TOTAL 324 throws / 1548 calls · DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')
```

**324 / 1548 · 4-of-9 RED · one failure mode** — the spec's figures are exact to the digit, and the
single mode matches `src/css/grammar.ts:181` (`splitTopLevel(slash[0]!.replace(/,/g, " "), "space")`,
re-read on the value.js tree). Probe size **3476 B**, confirmed.

**G-KF3-3 arm (c) — the roster command RE-EXECUTED, and it returns exactly the enumerated paths.**
Running the spec's own derivation at `81a56990` returns **12** files, identical to the spec's list:
`test/compile/{compile-roundtrip,interp-slot,structural-emit,valuejs-contract}.test.ts` ·
`test/engine/{color-fidelity,computed-resolution,interpolate-anything}.test.ts` ·
`test/group/structural-composition.test.ts` ·
`test/resolve/{emerging-css-resolve-fn,emerging-css-resolve-now,emerging-css-resolve-p2,value4-immutable-resolve}.test.ts`.
The two by-name exclusions are real files (`test/compile/selector-value4.test.ts`,
`test/engine/nan-frame.test.ts`), as is arm (a)'s `test/compile/roundtrip-fidelity.test.ts`.
**The round-2 D-01 strike is fully discharged: the roster is derived, re-executable, and correct.**
Fixture corpus confirmed: **14 `.css` + `manifest.json`**, all 14 names as listed.
`compile-roundtrip.test.ts:424-428` holds, self-describing *"Authored GATE-FIRST: confirmed RED on
the UNCURED tree BEFORE any cure."* (`:428`).

**G-KF3-1 — RED baseline exact, and the round-2 D-04 off-by-one repair is CORRECT.**
`RELEASE-CONDITION.md` → *No such file* · `RELEASE-PACKET.md` → *No such file* ·
`package.json "version": "4.0.0"` · `grep -c 'RC-P' INBOX.md` → **0** ·
`grep -rn 'RC-P' docs/tranches/X/fourier/` → **0** over **eleven** wave specs
(`ls docs/tranches/X/fourier/waves/` → `F-W0 … F-W10`, count **11** — *"eleven"* is right, *"ten"* was not) ·
`docs/tranches/X/keyframes/evidence/` → *No such file or directory*. **All six conjuncts FALSE.**

**G-KF3-6 — every figure resolves.** `lane-docs.md:373` books O-11 §D2 verbatim, incl.
*"`max|Δ| = 0.192` on `ease-out-circ`"*, *"the `approximated: boolean` discriminant was proposed and
DECLINED"* and the cell **"DECLARED; no keyframes acknowledgement on record"**. The two further
deltas resolve at `lane-docs.md:256` (`ease-in-expo` **6.930e-2**, `ease-in-circ` **4.489e-2**,
`ease-out-circ` **1.923e-1** → 0.192). `library-band.md`'s FENCE clause corroborates the
addition-widens / removal-throws pair.

**G-KF3-8 / G-KF3-9 floors — witnesses exact.**
`test/orchestration/orchestration-api.test.ts:142-148`: `:145 expect(cssTwinFor("easeOutCubic")).toBeUndefined();`
**and** `:146 expect(cssTwinFor("bounceInEase")).toBeUndefined();` under the single `:143-144`
comment calling **both** *"real registry curves"*, with `:147`'s `not-a-real-easing` proving in-file
that the assertion cannot distinguish. The round-1 widening to **two** names is correct.
Frontier registry carries `"easeInBounce"` (`registry.ts:27`), **not** `bounceInEase` — so the
comment is false at the frontier. Phantom trail standing: `src/animation/easing.ts:44` and
`src/animation/waapi/eligibility.ts:169` both still name `bounceInEase`;
`demo/components/CopyButton.vue:42 timingFunction: "easeInBounce",` is the one-word repair.
`ci.yml:53-55` = `demo-correctness` gated `if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'`;
merge job (`:28` *library gates*) runs `:42 npm run check:lib` = `tsc --noEmit -p tsconfig.lib.json`.
**`demo/` is never typechecked on the merge path — exact.**

---

## §5 POSTURE (axis 5)

| clause | result |
|---|---|
| **W3 gated-unscheduled** | **PASS.** §-head *"(GATED, never scheduled)"*; Status **planned**; opening condition stated verbatim and **by predicate name**; L-1 forbids scheduling. `KF-W10.md:22` independently carves W3 out **by name** and `:418` books it *"Gate-keyed PLAW-BIND, never scheduled. W10 stamps §B-15's verb and stops."* Both ends agree. |
| **W4 head honored** | **PASS.** E-3/E-4 route the easing-name commit and the gate chassis to KF.W4; L-3 orders W4 before the repin; G-KF3-9 declares the floor and states *"This wave may NOT author that gate."* KF.W4's cross-edge legs (1)(2)(3) match KF-W4.md's own §Gates. |
| **npm-run-check re-cut COMPOSES with the live scripts** | **PASS — verified by composition.** Live at `81a56990`: `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure`; `check:lib` = `tsc --noEmit -p tsconfig.lib.json`. KF-W4 G-KFW4-1 redefines `check` = `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure` — **conjuncts 2 and 3 are byte-identical to the live script; only conjunct 1 is swapped.** Because the merge job runs `check:lib` and **not** `check`, redefining `check` alone would not close the hole — and KF-W4 says so, requiring *"**and** the CI merge job step"* (*"THE COMPOSITION IS THE POINT"*). W3's G-KF3-9 names exactly that gap. **The two specs compose without contradiction.** |
| **KF-AV-28 present where governed** | **PASS.** Named **by id** at §Sequencing **L-9**, §Excluded **E-5**, and the KF.W7 cross-edge. All three banked anchors resolve — `kf-AnimationVisualizer.md:35`, `kf-PlaybackRibbon.md:36`, `kf-SequenceScrubber.md:36` each contain the literal `KF-AV-28` (verified line by line); the id occurs in exactly those 3 of 58 records. Governed rows enumerated (KeyframeTimeline C-7's `console.error` posture; its L-6/C-4 parser/emitter). *(Wording defect only — **D-6**.)* |
| **O-21 (not O-20) at W1's mint sites** | **PASS for this wave — no misuse possible.** W3's O-references are exactly `O-11` ×9, `O-8` ×2, `O-1` ×1; **it mints no O-row**. §B.2 appends only *discharge* rows for the existing O-11 §B / §D2 legs. INBOX's live ceiling is **O-20** (2026-08-28, glass BK batch) with **no O-21 in existence** — so the next mint is O-21, and W3 neither claims nor collides with it. |
| **W10's carry-routed obligations closed by carriage, not omission** | **FAIL — see D-2.** Two of the three members of W10's named R1-framing triple are carried; **KF-HA-19 is absent by bytes.** |

---

## §6 DEFECTS

### D-1 · MAJOR · The routed/surplus membership law contradicts itself; `routedTotal` is not auditable

§Excluded **E-15**'s surplus sub-line states the discriminator verbatim:

> *"all ten surplus records return **0** on `KF.W3`, `KF.W2/W3` and parser-lane prose alike — **which
> is exactly what makes them surplus** and what keeps `routedTotal` at **24**."*

Measured at the bank by this seat, 2026-08-28 — **`kf-CubeTarget.md` returns 0 on every one of those
same markups**: `KF.W3` **0** · `KF.W2/W3` **0** · `parser lane` **0** · `parser wave` **0** ·
`parser ingress` **0** · `parser consumption` **0** · `megatranche R1` **0**. Yet its challenge-C S-1
row is booked as **X-13, a ROUTED id inside the 24**.

Symmetrically **X-12**: `kf-ChannelControls.md` has 2 `KF.W3` hits, but both belong to *other* rows —
`:17` (header taxonomy) and `:79` (the SHIM row already counted among the 5). The X-12 row at `:126`
carries **no wave token**; its markup is *"Identity guard: corroborates the banked value.js R1 row;
nothing re-booked"* — structurally identical to kf-LayerConfigPanel LP-24's *"folded by reference onto
the banked R1 identity"*, which the spec books as **surplus**.

The spec anticipates half of this, conceding X-12/X-13 route *"by the banked value.js-R1 identity /
negative-proof form alone, carrying no wave token in the row itself."* But that fallback criterion is
satisfied **at equal or greater density by the surplus rows** — bare `R1` occurrence counts:
kf-LayerConfigPanel **6** · kf-KeyframesAddDialog **5** · kf-CSSPasteDialog **4** · kf-SpringTrace **3** ·
kf-SpringPhysicsFacet **3** vs **kf-CubeTarget 1**.

**So the criterion that admits X-13 admits the eight surplus rows, and the criterion that excludes the
surplus rows excludes X-13.** Under a strict-markup reading `routedTotal = 22` and §Carry's
`9 + 5 + 10 = 24` fails to close; under the inclusive reading it is 32 and the same equation fails
the other way. Only the spec's unstated hand-partition yields 24.

**Not census-fatal**: every ambiguous id is on the page under one heading or the other, so nothing
escapes and carriage stays 24/24. But this is the spec's own law, applied to itself — *"a class booked
at the wrong cardinality cannot be checked for closure, and that law binds this spec's own bookkeeping
first"* (C-6) — and G-KF3-7's completeness claim rests on the denominator it defeats. The cure is one
sentence: state the admission rule as *"any banked row whose payload is a value.js-R1 reachability
finding"* and let the routed/surplus split be **owner-derived**, not markup-derived, with the
arithmetic restated in the same motion (E-15 discipline (v) already provides the mechanism).

*Receipt*: `grep -ci` over `kf-CubeTarget.md` for the six routing markups → all **0**;
`grep -n 'KF\.W3' kf-ChannelControls.md` → `:17`, `:79` only; `grep -oc 'R1'` per record as above.

### D-2 · MAJOR · W10's declared R1-framing carry is closed by omission: KF-HA-19 absent by bytes

`KF-W10.md:419` books, as a §6.C-I declared-not-owned carry:

> *"**KF-HA-19 / KF-APP-56 / kf-EditorShell C-19** — the R1-framing reconciliation | value.js
> megatranche parser-band/STATE surface; **KF.W2/KF.W3 own the class in-repo.** **Declared (§6.C-I) so
> the carry is not lost**; booked nowhere here."*

`:398` restates it, naming KF-HA-19's payload explicitly. KF.W3 receives **two** of that triple —
X-06 (KF-APP-56) and X-07 (kf-EditorShell C-19) — and on the third returns
**`grep -c 'KF-HA-19\|HeroAurora' KF-W3.md` → 0**.

The missing member is the one **adverse to this wave's headline**. `kf-HeroAurora.md:66`:

> *"The **"R1 = live `parseCssColor('oklch()')` shipping crash" framing does NOT reproduce** against
> this repo's pinned value.js 4.0.0 css subpath (ok on all oklch forms; diagnostics-not-throws on
> `var()`/`color-mix`) — **three independent executions**"* · disposition **NO-WAVE-OWNER**.

and `:101`: *"Axis C proved a negative properly and **against interest** — its §4.1 killed its own
repo's standing R1 framing with executions, flagged the contradiction explicitly, and both readers
re-ran it rather than inheriting it."*

This spec is otherwise scrupulous about adverse record: E-14 preserves four dissents, and C-4
preserves reader-B's overruled confirm *"so no seat re-spends the budget."* **E-14 is the line built
to receive KF-HA-19, and it is the one dissent E-14 does not hold** — while C-1 books R1 **BLOCKER**
and E-12/C-5 lean on X-07's *"RR-2 reproduced R1 live against the installed 4.0.0"* as the licence for
the born-RED. The corpus holds a thrice-executed contradiction of that licence, handed forward by name
from W10, and the spec is silent.

**Scope of the charge, stated precisely.** KF-HA-19 returns **0** on every routing markup and its
banked verb is NO-WAVE-OWNER, so it is correctly **not** a member of the routed 24 —
`escapedCount` is unaffected. The failure is axis-5 carriage and axis-3 dissent-preservation, not
census escape. **And the baseline itself survives**: this seat executed the probe unmodified and got
`324 throws / 1548 calls`, one failure mode, 4-of-9 RED — G-KF3-2 stands. What is missing is the
*carriage of the contradiction*, which is exactly what E-14 exists for and what W10 asked for.
The cure is one E-14 clause naming KF-HA-19, its NO-WAVE-OWNER verb, and the reconciliation's home
(megatranche parser-band / STATE).

*Receipt*: `KF-W10.md:398,:419`; `kf-HeroAurora.md:66,:101,:125`;
`grep -c 'KF-HA-19\|HeroAurora' KF-W3.md` → 0; probe transcript in §4.

### D-3 · MINOR · `cssIdent` exclusivity claim is false at the frontier — two re-export sites, not one

The KF.W5 cross-edge asserts *"`cssIdent` is re-exported **only** at `compile/emit/index.ts:53`
(confirmed: `export { cssIdent } from "./backward";`)"*, and §B.2 marks that file `modify` for *"the
re-export surface after the fork deletion"*.

Measured — `git grep -n cssIdent 81a56990 -- src/` returns **two** re-export sites:
`src/animation/compile/emit/index.ts:53 export { cssIdent } from "./backward";` **and**
`src/animation/compile/emit/backward/index.ts:29 export { cssIdent } from "./walk";`
(definition `backward/walk.ts:145`; further consumers `view-transition.ts:47/:305/:330/:333`).

The ask's **conclusion survives** — neither site is `public.ts` or `load-engine.ts`, and neither of
those files carries `cssIdent`, so `kfEngine()`/`loadAnimationEngine()` still cannot reach it. But the
quantifier is wrong, and an executing seat that re-routes *"the one re-export site"* leaves
`backward/index.ts:29` standing. §B.1's own law makes an exclusivity quantifier part of the anchor it
is attached to, and §B.1 marked this line *"confirmed"* on its existence alone.

### D-4 · MINOR · Three §B.1-governed anchors are pathless and resolve only off tree-root

The scroll row asserts *"publicly exported (`public.ts:109`, `load-engine.ts:40/:95`)"*. Measured:
**`src/public.ts` and `src/load-engine.ts` do not exist at `81a56990`.** The real paths are
`src/animation/public.ts:109` (`roundTripScrollCSS,`) and `src/animation/load-engine.ts:40`
(`roundTripScrollCSS,`) / `:95` (`roundTripScrollCSS: typeof roundTripScrollCSS;`) — **all three line
anchors hold at the corrected paths.** Same class: `types.ts:195` (KF.W4 cross-edge, KF-CB-29) is
`src/animation/constants/types.ts:195` = `| string` — confirmed, but there are four `types.ts` files
in the tree and the citation does not say which.

These resolve, so no gate breaks. But §B.1 is the table that found *"three dead paths"* and calls path
errors *"load-bearing … a cure sent to a file that does not exist"* — and it leaves three basenames
unpinned inside its own discharge. `scroll/grammar.ts` was pinned in the same sentence; its two
co-cited exports were not.

### D-5 · MINOR · The replacement provenance figure "424" is unlocatable

R-12 rightly struck the CARRY-keyed completeness claim, and substitutes:
*"**"424" was the literal `KF.W6` token count, never a row count**."* Measured by this seat:

| corpus | `KF.W6` tokens | `KF.W6` lines |
|---|---|---|
| `KF-W6-CARRY.md` | **11** | 11 |
| all 58 registry records | **435** | 432 |

**No corpus yields 424**, and the literal string `424` appears **0** times in the carry file. The
companion figures split: *"201 rows"* is **CONFIRMED** (`grep -c '^- '` → **201**, matching the
carry's bullet-row form); *"54 records"* is **not** — the carry names **63** distinct `kf-Xxx`
identifiers, of which **39** intersect the 58 real registry records (`comm -12`).

A struck unverifiable number replaced by a differently unverifiable number repeats the shape R-12
convicted. The cure is to drop the reconstruction and state only what is measurable: the carry is
`KF-W6-CARRY.md`, 199 055 B, **201 bullet rows**, and it is a **KF.W6** ledger — which already
discharges the whole point (there is no KF-W3 CARRY).

### D-6 · INFO · L-9 claims verbatim carry of KF-AV-28 and delivers a faithful paraphrase

L-9 says *"**Carried by id, never paraphrased**"*; the KF.W7 cross-edge says *"the rider is named by
id, **because paraphrase is not carry**"*; E-5 says *"§Sequencing L-9, **carried verbatim**."*

The banked rider (`kf-AnimationVisualizer.md:35`, mirrored at `kf-PlaybackRibbon.md:36` and
`kf-SequenceScrubber.md:36`) reads:

> *"A standing sequencing rider on every NO-WAVE-OWNER row below: **KF.W7's S-9 evaluation (KF-AV-28)
> may supersede any behavioral cure here** — if the evaluate verdict is "swap", the bespoke rows
> discharge with the component."*

L-9 renders it as *"…may supersede any behavioral cure **on a NO-WAVE-OWNER row banked under an
evaluated surface**; a **per-surface SWAP verdict** discharges the bespoke rows banked under that
surface with the component."* Substantively faithful and correctly scoped (the expansion is drawn
from the rider's own preceding clause) — but it is a **restatement, not a quotation**, in a spec that
quotes E-15's rows byte-for-byte and states the no-paraphrase rule three times. Either quote it or
soften the claim to *"carried by id"*, which is what is actually done and is what axis 5 requires.

---

## §7 PASS-2 CARRY-FORWARD (re-derived, not inherited)

Both PASS-2 MAJORs are **independently re-derived as CURED** at this pass:
**D-01** (the *"15 parser-facing modules"* strike) — arm (c)'s roster is now derived by a command this
seat **re-executed**, returning exactly the 12 enumerated paths; the two added fail arms are present.
**D-02/R2-11** (the eight surplus negatives) — all eight are on the page with byte-faithful quotes,
their locks intact, and the arithmetic stated separately.
**D-03** (SHIM record cardinality 6→5→**4 records / 5 rows**) and **D-04** (fourier ten→**eleven**
waves) are both **confirmed correct by independent measurement** (§1, §4).

New at this pass: **D-1** and **D-2** are findings PASS-1 and PASS-2 did not raise. D-1 is a
consequence of R2-11's own surplus sub-line — the very repair that cured D-02 introduced the
membership law that D-1 shows to be self-contradictory. D-2 is a cross-spec carriage gap visible only
by reading **KF-W10.md** against the bank, which neither prior pass did.

---

*Seat: fresh L-18/L-20 adversarial, PASS 3, 2026-08-28. Frontier `81a56990`. One execution (R-E probe,
unmodified). No product source opened for writing. This file is the only write.*
