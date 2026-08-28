# KF-W3 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 4)

**Spec under trial**: `docs/tranches/X/keyframes/waves/KF-W3.md` — **138 765 B, 358 lines**
(pass 1: 57 164 B / 232 · pass 2: 86 041 B / 261 · pass 3: 101 473 B / 281).
**Corpus authority**: the **58** `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/`
(`ls kf-*.md | wc -l` → 58). Sole in-tree carry: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`
(`ls carry/` returns that file only).
**Method — the inherited nine-block partition is RETIRED.** This seat's census is derived **BY RECORD**
from the 58 records' own bytes: a per-record `grep -c` sweep over every routing markup the spec's law
names (`KF\.W3` · `KF\.W2/W3` · `KF\.W3-SHIM` · `parser lane|parser wave|parser ingress|parser
consumption` · `megatranche R1`), then **every hit read** and classified row / header-taxonomy /
cross-reference / superlative-prose / terminal-manifest, then a **second, independent sweep by payload**
(`\bR1\b`, `parseCss(Color|Scalar|Values)`, `parseTimingFunction`) over all 58 to catch rows the markup
sweep cannot see. No denominator, id list or verdict was inherited from PASS-1/2/3.
**Seat instruments (read-only)**: `grep`/`sed`/`git grep`/`git ls-tree`/`git show` over the 58 records
and over keyframes.js at **`origin/master` `81a56990`**; `COHESION.md`, `lane-docs.md`, `INBOX.md`,
`KF-W10.md`, value.js `package.json`. **Three executions**: the R-E probe run unmodified; the census-1b
packed-surface enumeration; the E-14.5 reconciliation transcript.
**This file is the only write.** No product source was opened for writing.

**VERDICT: DEFECTIVE** — 2 MAJOR · 3 MINOR · 1 INFO. **Not census-fatal** (`escapedCount = 0`; carriage
of the routed 24 is complete and id-for-id verifiable). Axes 2, 3, 4 **PASS unqualified** — every
anchor, every census, every RED baseline reproduced exactly. Axis 1 fails on the *stated* membership
command; axis 5 passes with one undeclared seam. **All six PASS-3 defects (D-1..D-6) are independently
re-derived as CURED.**

---

## §0 TREE LAW

**PASS.** `git rev-parse origin/master` → `81a56990736ced5b5edde0b84c527680ac7689b1`. Every witness in
the spec resolves there. The five `8281638c` occurrences remain non-witness by inspection
(disqualification statement `:15`; C-7's citation cap `:179`; X-1 routing-away `:297`; E-10; E-11's
negative lock). No gate RED baseline is anchored at the disqualified ref. **No conviction.**

---

## §1 CENSUS TOTALS — derived by record, from zero

| bucket | count |
|---|---|
| **routedTotal** (distinct registry row-ids routing to this wave) | **24** |
| **BOOKED** (§Carry fold-identity · §Excluded E-1 disposal · §Excluded E-15 exclusion-with-named-owner) | **24** |
| **ESCAPED** (no row, no fold-identity, no exclusion line) | **0** |

Carriage **24 / 24 = 100 %**.

**Record-level sweep, all 58, this seat 2026-08-28.** Records returning ≥ 1 hit on any routing markup:
**26**. `KF\.W3` → 14 · `KF\.W2/W3` → 7 · parser-lane prose → 17 · `megatranche R1` → 8; union 26.
Of the 26, **21 are booked or named** in the spec and **5 are not** (see **D-2**). Adding
`kf-CubeTarget` — 0 on every markup, routed by the instrument clause — the routed census touches
**22 records**.

**Routed ids re-enumerated id-for-id (19 canonical + 5 SHIM = 24).**
`kf-AmigaScene:150` · `kf-CSSCodeEditor:46/:134` · `kf-KeyframeTimeline:48/:112` ·
`kf-KeyframeCardList:122` · `kf-KeyframesStringControls:62-63` · `kf-CopyButton:81` ·
`kf-StartingStyleTarget:80/:139` · `kf-KeyframeCard:101` · `kf-EasingTarget:77` · `kf-App:111` ·
`kf-EditorShell:77` · `kf-CubeAxisLines:108` · `kf-KeyframesEditor:99` · `kf-TimelineTrack:18/:130` ·
`kf-ChannelOptions:126/:155` · `kf-ChannelControls:126` · `kf-CubeTarget:76` ·
`kf-DemoGlobalChrome:77` · `kf-SquareScene:132` — **19**.
SHIM rows: `kf-ChannelControls:79` · `kf-AnimationControlsGroup:74` · `kf-KfPillTabs:58` ·
`kf-KfPillTabs:70` · `kf-DemoGlobalChrome:70` — **5**. **19 + 5 = 24.**

**The two-clause law re-tested member by member.** (R-i) markup-routed: every one of the 22 claimed
members' records returns ≥ 1 hit — verified individually (9 fold records ✓ · 4 SHIM records ✓ ·
X-06 kf-App `KF.W2/W3`=1 · X-07 kf-EditorShell=1 · X-08 kf-CubeAxisLines=1 · X-09 kf-KeyframesEditor=1 ·
X-10 kf-TimelineTrack=2 · X-11 kf-ChannelOptions parser-lane=2 · X-14 kf-DemoGlobalChrome `KF.W3`=2 ·
X-15 kf-SquareScene parser-lane=1/megaR1=2). (R-ii) instrument-routed: **X-12** and **X-13** both
measure **0 on all six markups** — re-confirmed — and both banked payloads are, on their bytes,
findings about *this map's instrument* (`kf-ChannelControls.md:126` re-runs §B.3's roster grep;
`kf-CubeTarget.md:76` rules the method by which absence is proved). **The PASS-3 D-1 self-contradiction
is genuinely dissolved**: the criterion that admits X-13 is no longer the criterion that excludes the
surplus, and the eight surplus records re-measure **0 on every markup** exactly as claimed.
**22 + 2 = 24 holds.**

**Surplus, re-measured**: all ten surplus ids (X-16, X-17 + the eight sub-line rows) return 0 on every
markup **and** carry no instrument finding — each is a finding about its own component's exposure. The
spec's distinction is checkable line by line and it checks out.

---

## §2 AXES

| axis | result |
|---|---|
| **1 · ID-KEYED CENSUS** | **FAIL (MAJOR ×2)** — carriage of the routed 24 is complete and verifiable (0 escapes), but the **payload admission rule is applied to 20 ids and withheld from ≥ 6 banked negatives of identical shape** (**D-1**), and the **(R-i) command as stated returns 26 records, not 21** (**D-2**). |
| **2 · ANCHOR + SUBJECT-IDENTITY** | **PASS — unqualified.** Every anchor re-measured at `81a56990` resolves *and* its target names its subject. All five B.5 censuses reproduce exactly. One stale sibling-spec line pair, hedged (**D-6**). |
| **3 · M-25 DEPTH** | **PASS — unqualified.** KF-AV-28 verbatim + labelled restatement; C-5 both conjuncts; C-4's kill-of-a-confirm; KF-HA-19 carried *and executed*. |
| **4 · GATES BORN-RED, REACHABLE GREEN, LAW A, LAW B** | **PASS.** Probe executed. Both previously-unpassable oracles re-cut to reachable. Five import-graph censuses, all reproduced. LAW B honoured throughout. Two precision defects (**D-4**, **D-5**). |
| **5 · POSTURE** | **PASS with one undeclared seam (D-3).** W4 head · W3 gated · KF-AV-28 · O-21 · the W10 KF-HA-19 edge substantively fulfilled. |

---

## §3 AXIS 2 — every anchor re-measured at `81a56990` (PASS, unqualified)

**Library half.** `css-text.ts` `:17 export const reverseAnimationShorthand = (` · `:41 export const
serializeCssValue = (value: CssValue): string => {` · `:43`/`:48` recursive · `:54` the throw · in-file
callers `:66 :83 :89` — **exact**.
`emit/format/options.ts`: the import block opens `:19`, carries `reverseAnimationShorthand` at **`:20`**,
and **closes at `:23` with `} from "../css-text";`** — the round-3 SUBJECT-IDENTITY correction is
**confirmed to the byte**. `:10` docstring · `:81` *"the published 0.12.0 inverse"* · `:104`
`parseTimingFunction(timingSource)` · `:121` the call — all exact.
`emit/backward/backward.ts` `:20 :46 :252 :285` exact. `emit/index.ts:53` exact.
`package.json` `:70 "@mkbabb/value.js": "4.0.0"` · `:77 "@mkbabb/glass-ui": "7.0.0"` — exact.
`src/animation/constants/types.ts`: `:192-196` = `TimingFunction | Easing | TimingFunctionNames |
string | undefined`; **`:195` is `| string`** and the tree carries exactly the **four** `types.ts` the
spec enumerates — the round-3 D-4 path pin is **correct**.
`src/animation/public.ts:109` and `src/animation/load-engine.ts:40` are `roundTripScrollCSS,`;
`:95` is `roundTripScrollCSS: typeof roundTripScrollCSS;`; `git ls-tree -- src/public.ts
src/load-engine.ts` returns **nothing**. `scroll/grammar.ts` doc `:137-142`, `export function
roundTripScrollCSS` at `:143`. **All corrected paths hold.**
The **boot-evaluated fence**: easing tree = `index.ts` · `option.ts` · `registry.ts` only, **no
`easing-registry.ts`**; `DIRECT_NAMES` `:18-28` with `:26 "smoothStep3",` `:27 "easeInBounce",`;
`registryNames` `:30-34` with `:31 ...Object.keys(bezierPresets),`; `timingFunctionEntries` a
**module-top-level `const`** `:37-48`, `registryNames.map(` at `:40`, `throw new Error(...)` `:43-46`;
`parseTimingFunction` at `:131`. **Boot-evaluation confirmed by structure.**
`bezierPresets` blast radius re-derived: `registry.ts:4/:31` · `TimingFunctionPanel.vue:52/:97/:98/:127`
· `EasingSidebar.vue:77/:112/:155` — the spec's list is **exhaustive and exact**.

**Demo half.** `git grep -n "parseCssColor\|parseCssScalar\|parseCssValues" 81a56990 -- demo/` → **six
hits, three imports + three calls**, identical to the spec's roster.
`useSquareTumble.ts:17 if (value) hues[index] = value;` · `:21` `asColor` · `:22` the call ·
`:23 if (!parsed.ok) throw new TypeError(...)` — exact, and the C-4/C-5 pair reading rests on real bytes.
`keyframeSelector.ts:15` the call, `requireKeyframeSelector` `:14-21`, throw opening `:18`; callers
`useKeyframeOps.ts:174` · `timelineEngine.ts:83`; `value4-editor-boundary.test.ts:28` asserts the throw.
`animationDescriptions.ts:76`/`:128` — the channel-(ii) site mis-filed in the colour/scalar roster is
real. `CSSCodeEditor.vue:114 const debouncedEmit = debounce(` / `:116 modelValue.value = value;` — the
banked anchor **does** land inside the debounce block; the UNRESOLVED verdict is correct.
`KeyframesStringControls.vue:123-125` — sole mount writer, no `try`, exact.
`orchestration-api.test.ts` `:142` `it("BITE: …")` · `:143-144` the false comment · `:145 easeOutCubic`
· `:146 bounceInEase` · `:147 not-a-real-easing` — the two-name widening is exact.
`demo/components/CopyButton.vue:42 timingFunction: "easeInBounce",` exact.
`ci.yml`: `gates` job `:42 run: npm run check:lib`; `demo-correctness` `:53-55` with the
`schedule || workflow_dispatch` guard. Live scripts: `check` = `tsc --noEmit && tsc --noEmit -p
tsconfig.test.json && npm run proof:structure`; `check:lib` = `tsc --noEmit -p tsconfig.lib.json`.
**`demo/` is never typechecked on the merge path — exact.**
Fixtures: **14 `.css` + `manifest.json`**, all 14 names as listed.

**Bank anchors.** Every §Carry, E-1, E-15 and surplus-sub-line citation was opened at its cited line and
its target **names its subject**: kf-App:111 (KF-APP-56) · kf-EditorShell:77 (C-19) · kf-CubeAxisLines:108 ·
kf-KeyframesEditor:99 · kf-TimelineTrack:18/:130 · kf-ChannelOptions:126/:155 · kf-ChannelControls:126 ·
kf-CubeTarget:76 · kf-DemoGlobalChrome:77 · kf-SquareScene:132 · kf-KeyboardShortcutsModal:78 ·
kf-SpringTrace:56/:108 · kf-CSSPasteDialog:76 · kf-LayerConfigPanel:79/:98 · kf-KeyframesAddDialog:91 ·
kf-OrbitalDrag:132 · kf-SpringPhysicsFacet:107 · kf-TimelineHoverPreview:112 · kf-AnimatedText:105 ·
kf-AmigaScene:150 · kf-CSSCodeEditor:46/:134 · kf-KeyframeTimeline:48/:112 · kf-KeyframeCardList:122 ·
kf-CopyButton:81 · kf-StartingStyleTarget:80/:139 · kf-KeyframeCard:101 · kf-EasingTarget:77 ·
kf-SquareInstrument:24/:100 · kf-SquareScene:53/:125 · kf-HeroAurora:66/:101/:125. **Zero misses.**
(`kf-KeyframesStringControls:63` is C-2's verification body; its row header is `:62` — the subject
resolves.)

---

## §4 AXIS 4 — gates, LAW A, LAW B (PASS)

**G-KF3-2 — RED BASELINE EXECUTED, NOT ASSERTED.** This seat ran `r1-published-totality.mjs`
(3 476 B, unmodified):

```
RED  parseCssColor  102/172   RED  parseCssScalar 102/172
RED  parseCssValue   60/172   RED  parseCssValues  60/172
ok   parseKeyframeSelector · parseStylesheet · parseTimingFunction
ok   parseAnimationTimeline · parseAnimationRange     (0/172 each)
TOTAL 324 throws / 1548 calls · DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')
```

**Exact to the digit**, one mode, matching `src/css/grammar.ts:181`.

**G-KF3-1 — RED, all six conjuncts FALSE.** `package.json "version": "4.0.0"` ·
`RELEASE-CONDITION.md`/`RELEASE-PACKET.md` *No such file* · `grep -c 'RC-P' INBOX.md` → **0** ·
`grep -rn 'RC-P' docs/tranches/X/fourier/` → **0** over **eleven** `F-W0…F-W10` specs (the round-2
off-by-one repair is correct) · `docs/tranches/X/keyframes/evidence/` absent.

**G-KF3-3 — the arm-(c) roster command RE-EXECUTED** at `81a56990` returns **exactly the 12 enumerated
paths**, no more, no fewer. The two by-name exclusions and `roundtrip-fidelity.test.ts` /
`frame-compiler.test.ts` all exist.

**LAW A — all five import-graph censuses reproduced exactly.**
**Census 1**: `serializeCssValue` → **14 importing modules**, 8 `src/` + 1 `demo/` + 5 `test/`, every
path and line as written; the `demo/` alias-root consumer `timelineEngine.ts:17` (`@src/…/css-text`,
called `:88`) is real and is invisible to any `src/`-scoped grep — the clause earns its keep. All five
`test/` importers are members of arm (c)'s roster.
**Census 1b — EXECUTED by this seat against `node_modules/@mkbabb/value.js@4.0.0`**:
`color 23 · value 1 · css 19 · easing 16 · math 9 · transform 9 · quantize 2` = **79 exports**, and
`serializeCssValue`/`reverseAnimationShorthand` are on **none**; the `./css` `serialize*` surface is
exactly `serializeCssColor` · `serializeTimelineOptions`. **The routing target genuinely does not
exist at the pinned coordinate** — so G-KF3-4's re-cut (publication as a *conjunct* plus a declared
X-W9 ask) converts an oracle that could never pass into one that can fail for its intended reason.
This is the correct cure of the class G-KF3-1 was convicted of.
**Census 2**: one implementation (`css-text.ts:17`), one live import specifier (`options.ts:20` ←
`../css-text`), call `:121`; prose at `backward.ts:20/:46/:252/:285`, `options.ts:10/:81`,
`index.ts:232`, `compile-roundtrip.test.ts:23`. **Zero modules import the symbol from
`@mkbabb/value.js`.** The SUBJECT-IDENTITY finding is real and correctly stated. (See **D-4**.)
**Census 3**: `cssIdent` — **two** re-export sites (`emit/index.ts:53`, `emit/backward/index.ts:29`),
definition `walk.ts:145`, consumers `view-transition.ts:47/:305/:330/:333` + in-file `walk.ts:89/:110/
:131`, comments `backward.ts:157` / `walk.ts:9`; **0** under `demo/`, `test/`, `scripts/`. Exact.
**Census 4**: the shim is a one-line re-export; **exactly one live import**,
`test/demo/state/no-shadow-playback-authority.test.ts:21`; `AnimationControlsGroup.vue:137` and
`test/demo/instrument/useAnimationGroupPlayback.test.ts:5` import the **real** module — not shim
consumers. R3-1 reproduced independently.
**Census 5**: the long-tail spelling returns **zero** imports; the sole consumer
`ChannelControls.vue:230` is reachable only as `../composables/useKfPillTabs`. Repoint target
`KfPillTabs/useKfPillTabs.ts:37` present; `git ls-tree` returns `AnimationControlsGroup/` and
`KfPillTabs/` — the lowercase spellings in `R2-06-demo-target-tree.md:126/:127` do not exist. **Every
clause of both carrier censuses is true at the frontier.**

**G-KF3-6 — every figure resolves.** `lane-docs.md:373` books O-11 §D2 verbatim including
*"`max|Δ| = 0.192` on `ease-out-circ`"*, the DECLINED discriminant, and the cell **"DECLARED; no
keyframes acknowledgement on record"**; `:256` carries `1.923e-1` / `6.930e-2` / `4.489e-2`.

**LAW B — honoured.** Carriage is never claimed in the spec's voice: §Provenance, §Carry, C-6, E-15 and
the arithmetic paragraph each route the closure claim to `PASS-3/KF-W3-CHECK.md` §1/§2 **with its
defects named**, and state the re-point rule. No self-voiced closure claim was found anywhere.

---

## §5 AXIS 3 — M-25 depth (PASS, unqualified)

**KF-AV-28 — the PASS-3 D-6 cure verified against all three records' bytes.** `kf-AnimationVisualizer.md:35`
is quoted **verbatim, byte for byte**; the restatement is *labelled as a restatement*; and the spec's
new claim that the two siblings are **not** byte-mirrors is **true and precisely characterised**:
`kf-PlaybackRibbon.md:36` does add the C-axis §7 caution (*"this ribbon is the NON-bespoke case (it
consumes the real `Slider`) and carries BLOCKERs anyway, so 'swap onto the primitive' is never
sufficient as a cure"*), and `kf-SequenceScrubber.md:36` does apply it narrowly (*"the KF.W7
ScrubberTimeline evaluation gates the component-shape rows"*). The id occurs in exactly **3 of 58**
records.

**C-5 — both reachability conjuncts carried verbatim.** `kf-SquareScene.md:53` confirms the restored
second conjunct word for word, including *"and via any `--rainbow-*` re-author in a syntax value.js
4.0.0 rejects (the megatranche R1 identity)"*; `:125` confirms the *annotated, never re-booked* lock.

**C-4 — the kill and its dissent intact.** `kf-SquareInstrument.md:24/:100` carry *"DEAD BY EXECUTION,
reproduced by this seat"*, *"Safe regardless of cascade order"* and reader-B's overruled confirm.

**E-14.5 — the PASS-3 D-2 cure exceeds its directive, and this seat re-executed it.** KF-HA-19's bank
bytes (`kf-HeroAurora.md:66`), its superlative (`:101`) and its relay (`:125`) are all present and
faithful, its NO-WAVE-OWNER verb untouched, its home unmoved. Beyond the directive, the spec pastes a
reconciliation transcript — **reproduced here line for line against the pinned artifact**:

```
parseCssColor("oklch()")                       THROW TypeError: …(reading 'replace')
parseCssColor("oklch(0.7 0.1 200)")            ok=true
parseCssColor("oklch(70% 0.1 200 / 50%)")      ok=true
parseCssColor("rgb()"/"lab()"/"color()"/"foo()")  THROW (same single mode)
parseCssColor("var(--x)")                      ok=false
parseCssColor("color-mix(in srgb, red, blue)") ok=false
```

Both records are true and they do not conflict, exactly as the spec argues. **This is the strongest
single repair in the file**: a declared carry closed by omission at PASS 3 is now closed by bytes *and*
by execution.

---

## §6 AXIS 5 — posture

| clause | result |
|---|---|
| **W3 gated-unscheduled** | **PASS.** §-head *"(GATED, never scheduled)"*; Status **planned**; the opening condition verbatim and by predicate name; L-1 forbids scheduling. `KF-W10.md:22` independently carves W3 out **by name**. Both ends agree. |
| **W4 head honored** | **PASS.** E-3/E-4 route the easing commit and the gate chassis to KF.W4; L-3 orders W4 before the repin; G-KF3-9 states *"This wave may NOT author that gate."* The KF.W4 cross-edge's three legs each carry a measured anchor (`orchestration-api.test.ts:142-148` · `TimingFunctionNames` · `types.ts:195`). |
| **KF-AV-28 present where governed** | **PASS.** Named by id at L-9, E-5 and the KF.W7 cross-edge; governed rows enumerated; verbatim + labelled restatement (§5). |
| **O-21 (not O-20)** | **PASS.** W3's O-references are `O-11` ×9, `O-8` ×2, `O-1` ×1 — **it mints no O-row**. INBOX's live ceiling is **O-20** with no O-21 in existence. No claim, no collision. |
| **W10 five-edge table — edge W3 fulfilled at source** | **PASS on substance, FAIL on declaration.** `KF-W10.md`'s inbound table row 2 asks for KF-HA-19 *"booked by bytes beside its two carried siblings on the dissent-preservation surface, with its bank anchor"* — **E-14.5 delivers exactly that**, and W10's §6.C-I triple-cite is now resolvable. But the reciprocal edge is **absent from §Cross-edges** — see **D-3**. |

---

## §7 DEFECTS

### D-1 · MAJOR · The payload admission rule is applied to twenty ids and withheld from at least six banked negatives of identical shape

E-15's replacement law admits a row to G-KF3-7's denominator **iff its banked payload is a value.js-R1
reachability, containment or posture finding**, *"read off the row's bytes, never off a token count"*,
and the sub-line's own indictment of the round-2 text is: *"an admission rule applied to three rows and
withheld from eight of the same shape **is** that failure, wearing a table."*

Applied to the corpus by this seat — a payload sweep over all 58 records, independent of markup — **at
least six banked R1 findings of exactly the admitted shape appear nowhere in the spec**:

| record · line | banked bytes | shape it duplicates |
|---|---|---|
| `kf-MbabbMenu.md:93` (**MM-37**) | *"the value.js R1 `parseCssColor` class is in the bundle graph via `/dock` but on no reachable path: dock.js imports only the numeric guards (`n`,`t`), never the `i` wrapper; both readers re-traced byte-for-byte, concordant \| INFO — **exposure-not-reachability, ≡ the census R1 line**"*; `:131` *"MM-37 ≡ the census R1-exposure line"* | the **root-node** shape of X-06 — an entry/bundle-graph negative, and the only one in the corpus that separates *exposure* from *reachability* by name |
| `kf-SequenceScene.md:119` | *"The value.js edge is the narrowest possible leaf and **R1 is structurally unreachable** — four imports, all `clamp` from `/math`; the 4.0.0 exports map has no root entry; no colour string ever enters the engine. Package-enforced, not discipline-enforced."* | X-14's `/math`-is-not-the-parse-surface shape, and ★S-7's |
| `kf-SpringHeatmap.md:101` | *"**The narrowest possible value.js surface** — one pure function (`clamp`) by exact subpath … `/css`/`/color` untouched, transitive reach verified absent — **the R1 parser-crash class is structurally unreachable from this component**."* | **verbatim the ★S-7 shape** the sub-line books |
| `kf-MatrixEditor.md:139` | *"**The value.js edge is type-only and R1-clean** *(r1)*: erased `import type` under `verbatimModuleSyntax`; no parser entered."* | **verbatim the S+3/S-d shape** (*"one erased `import type`"*) |
| `kf-EditorHeader.md:95` | *"**C S-A — proving a negative**: the full import-closure walk that **DECLINED an R1 parser-crash claim** and enumerated the chunks through which glass-ui does reach value.js to justify the refusal."* | X-13's *prove-absence-with-structure* method shape |
| `kf-AnimationVisualizer.md:124` (**SUP-7**) | *"the value.js edge is textbook (`:46` `clamp` from `/math`): **parser-free subpath (no R1 crash class in this call graph)** …"* | ★S-7 / X-14 |

Each is a banked negative; each is a superlative- or roster-register entry, which is **precisely** the
register the sub-line already admits from (★S-7, #3, S+3/S-d, C-10, S-A are all superlatives). Each
measures **0** on every routing markup, so none is a *routed* escape and `routedTotal` is untouched —
they belong on the **surplus** side, exactly where the eight sit. `grep -c` in `KF-W3.md`: **MM-37 → 0 ·
SequenceScene → 0 · SpringHeatmap → 0 · MatrixEditor → 0 · EditorHeader → 0**; `AnimationVisualizer`
returns 1, but only as the KF-AV-28 anchor at `:35` — SUP-7 is unbooked.

The denominator is therefore stated at **twenty** when the spec's own rule yields **≥ twenty-six**, and
G-KF3-7's completeness law — *"a map that omits its own negatives cannot know what completeness is, and
cannot be audited for it"* — is the sentence this defect falsifies. This is the D-02/R2-11 defect
recurring one register wider: the cure enlarged the admitted set without enlarging the **sweep** that
finds it. The fix is mechanical and is the same one that cured D-02: run the payload sweep over all 58
records rather than over the records the markup sweep already surfaced, and restate the arithmetic in
the same motion (discipline (v) already provides the mechanism).

*Receipt*: payload sweep `grep -n '\bR1\b' kf-*.md` over all 58 → 41 records; subtract the 22 the
routed/surplus tables touch and the records whose R1 mentions are header taxonomy or method prose; the
six above survive by reading. Bank bytes quoted at their cited lines, each verified by `sed -n`.

### D-2 · MAJOR · (R-i) is a per-record command used as a row-level rule; run as stated it returns 26 records, not 21 — so "no hand-partition anywhere" over-claims

E-15's law reads: *"**(R-i) MARKUP-ROUTED** — **the row's own record** returns ≥ 1 hit on the routing
markups … run per record against the 58 records"*, and the arithmetic paragraph concludes that
`routedTotal` is *"now **derived, not partitioned**"* and *"auditable by two stated commands and one
enumeration, **with no hand-partition anywhere**."*

Two measured facts defeat that last clause.

**(a) The command over-returns by five records.** Run as written over all 58, the union of markup-positive
records is **26**. Twenty-one are booked or named in the spec. **Five are not, and are absent from it
entirely**: `kf-EasingSidebar:32` · `kf-EasingScene:33` · `kf-TimingFunctionPanel:34` (each a
**header routing-law taxonomy sentence** naming *"W3 Parser Consumption (GATED)"*) and
`kf-EditorStartScreen:113` · `kf-TypingDots:89` (each a **superlative-register sentence** —
*"Given the parser lane's R1 is a live shipping crash, checking the boundary string on the demo's
most-viewed component was the correct spend of a read-only budget"*). Discarding them is correct **by
reading** — none is an adjudicated row routing here — but *reading* is the step the clause claims to
have eliminated. The spec already knows this failure mode: C-6 subtracts five header-taxonomy sentences
and two non-row citations from the SHIM count **by reading**, and says so. (R-i) does the same work and
does not say so.

**(b) The predicate cannot resolve rows inside a hit record.** `kf-KeyframeTimeline` returns **5**
markup hits and carries many rows; only **C-7** routes. `kf-ChannelControls` returns 2 `KF.W3` hits,
both belonging to rows *other* than X-12. A record-level ≥ 1 test is satisfied identically by every row
in the record, so it can **confirm** a claimed member but can never **enumerate** the members — which is
what "derived, not partitioned" asserts.

The members are individually checkable and **all 22 pass the predicate** (verified one by one, §1), so
this is not a re-run of PASS-3's self-contradiction: the law is now *consistent*. It is the
**self-description** that is false. And the gap it leaves is not academic — it is the exact aperture
**D-1**'s six negatives fall through, since the sweep that would find them is the reading step the law
declares unnecessary. The cure is one clause: state (R-i) as *payload-admissible **and** markup-positive,
the payload test read off the row's bytes*, and drop *"no hand-partition anywhere"* for *"no
**undeclared** partition."*

*Receipt*: per-record `grep -c` over the five markups across all 58 → 26 records with ≥ 1 hit;
`grep -c 'EasingSidebar\|EasingScene\|EditorStartScreen\|TypingDots\|TimingFunctionPanel'` in
`KF-W3.md` → 0 · 0 · 0 · 0 · 2 (both `TimingFunctionPanel` hits are the `bezierPresets` blast-radius
anchors at §B.3 tail and G-KF3-6, not a row booking); `grep -c 'KF\.W3' kf-KeyframeTimeline.md` → 5.

### D-3 · MINOR · The KF.W10 seam is undeclared from this end, in a spec that quotes the both-ends law

§Cross-edges opens by quoting COHESION §2 — *"cross-repo edges are declared **FROM BOTH ENDS** in the
spec files — the X·V W4-D2 lesson, now law"* — and then lists **thirteen** edges. **None is KF.W10.**

Yet three live dependencies on W10 exist in this file: the verb table `:27` names **KF.W10** as the
wave that stamps this wave's **VERIFIED**; **E-14.5** receives a *declared, named* pass-through carry
from `KF-W10.md` §6.C-I; and `KF-W10.md`'s own **INBOUND-DEPENDENCY TABLE** now names *"W3 §Excluded
E-14's KF-HA-19 line"* as one of the five edges it needs declared **at the source wave** so that OP-4
and its terminal table are fulfillable by construction. W10 declares the edge; W3 discharges its
content at E-14.5 and never declares it back.

The `COHESION §0b / §0c` row is not this edge — it is an ownership row, and it explicitly says the
KF.W10 gap *"is routed, not re-declared here."* The substance is fulfilled; the declaration is missing
from the one table whose stated purpose is to hold it. One row cures it.

*Receipt*: `sed -n '266,281p' KF-W3.md` → 13 edge rows, no KF.W10; `grep -n 'KF\.W10\|KF-W10' KF-W3.md`
→ `:27`, `:41`, `:178`, `:280`, `:302` — no cross-edge row; `KF-W10.md:436` (inbound table row 2).

### D-4 · MINOR · G-KF3-5's green binds six prose sites; §B.2 and census 2 enumerate eight

Census 2 enumerates the prose surface as **eight** sites — `backward/backward.ts:20 :46 :252 :285` ·
`format/options.ts:10 :81` · `src/animation/index.ts:232` · `test/compile/compile-roundtrip.test.ts:23`
— and §B.2's `backward/backward.ts` row puts `:252`/`:285` **into the carve** (*"echoes `:252`/`:285`"*,
joined *"for the same reason"* under KF-CE-41). G-KF3-5 then states its baseline as *"four prose sites
plus two comments"*, its green as *"all **six** prose sites read true"* / *"the **six** prose sites are
corrected"*, and its falsifier as *"a green obtained under discharge (b) while **any of the six** sites
still names value.js as the provider fails."*

Measured, the exclusion is defensible on the merits — `:252` (*"// projection + the animation shorthand
(reverseAnimationShorthand)."*) and `:285` (*"// express). `reverseAnimationShorthand` already emits
`options.delay`; the"*) name no provider — but the spec never says so, and the operative consequence is
that the **bounds surface (8) and the gate denominator (6) disagree by two** inside one file. The
catch-all green (*"zero sentences naming a provider the packed surface does not carry"*) saves the gate;
the numbered clause is what an executing seat will read. Either state why `:252`/`:285` are outside the
six, or drop the count and keep the predicate.

### D-5 · MINOR · `emit/index.ts` holds `modify` access whose only named act is declared out of the wave

§B.2's row grants `src/animation/compile/emit/index.ts` **modify**, reason: *"the re-export surface
after the fork deletion"* — then spends the rest of the cell on the `cssIdent` quantifier correction
and closes *"**this wave re-routes neither**: the ask is DECLARED to KF.W5, not cured here."*

Measured at `81a56990`, the barrel's export surface is `compileToCSS` · `DEFAULT_DELTA_E_EPSILON` ·
`DEFAULT_DENSIFY_STOPS` · `compileChild` · `CSSKeyframesToString`/`CSSKeyframesToStrings`/
`formatCSSKeyframeString`/`declaredKeyframeBodyFor` · `serializeEasing` · `cssIdent` ·
`colorUnitToOklabCSS` · `isColorUnit` (+ types). **It re-exports neither `serializeCssValue` nor
`reverseAnimationShorthand`** — so *"the re-export surface after the fork deletion"* names no change
the fork deletion forces, and the one act that would touch the file is declared to KF.W5.

A `modify` row with no act is the mirror of the defect §B.2 exists to prevent (a cure sent where no cure
is owed), and it widens the write surface a gated wave declares. Either name the concrete edit (e.g. the
`:26` *"HEAVY (value.js-bearing)"* docstring, if the retirement changes it) or move the file to §B.3's
read-only witnesses.

### D-6 · INFO · The KF-W10 line anchors in E-14.5 have gone stale

E-14.5 cites `KF-W10.md` **§6.C-I** *("`:398`/`:419` at this writing")*. Measured today, §6.C-I is at
**`:465`** and the triple row at **`:486`**; `:398` and `:419` carry unrelated §B content (an
acceptance clause and a §B-13 charter-carry note). KF-W10 was itself repaired at round 3 and the lines
moved beneath the citation.

No charge attaches to the substance: the **section id resolves**, the quoted bytes are present at
`:465`/`:486`, and the spec's own R2-7 idiom (*"the banked id is the anchor; record line numbers ride
parenthetically, non-load-bearing"*) plus the *"at this writing"* hedge are exactly the mechanism that
absorbs this. Recorded so the next re-point is cheap.

---

## §8 PASS-3 CARRY-FORWARD — all six re-derived as CURED

| PASS-3 | status at PASS 4 | evidence |
|---|---|---|
| **D-1** (membership law self-contradictory) | **CURED** | The two-clause law is consistent; X-12/X-13's instrument payloads verified at their bytes; all ten surplus re-measured 0; 22 + 2 = 24 reproduces. *(Its successor defects D-1/D-2 above are new findings against the cure, not a re-raise.)* |
| **D-2** (KF-HA-19 closed by omission) | **CURED, and exceeded** | E-14.5 books it by bytes with verb, home and severity untouched, **and** pastes a reconciliation this seat reproduced line for line. |
| **D-3** (`cssIdent` exclusivity false) | **CURED** | Census 3 measured: two re-export sites, quantifier corrected at both the §B.2 row and the KF.W5 cross-edge; the ask's conclusion preserved with its own 0-hit receipt. |
| **D-4** (three pathless anchors) | **CURED** | `src/animation/public.ts:109`, `src/animation/load-engine.ts:40/:95`, `src/animation/constants/types.ts:195` all pinned and all holding; the four-`types.ts` ambiguity named and resolved. |
| **D-5** (the unlocatable "424") | **CURED** | The reconstruction is struck; what replaces it is stated **only beside the command that reproduces it** (199 055 B · 201 bullet rows), the pattern-dependence of the identifier count is declared rather than reconciled by assertion, and none of it is load-bearing. |
| **D-6** (L-9 verbatim over-claim) | **CURED** | Rider quoted verbatim; restatement labelled; the two siblings' non-mirror status measured and characterised correctly (§5). |

**New at this pass**: **D-1** and **D-2** — two faces of one gap. Neither prior pass ran a payload sweep
independent of the markup sweep, which is the only instrument that surfaces them.

---

*Seat: fresh L-18/L-20 adversarial, PASS 4, 2026-08-28. Frontier `81a56990`. Three executions (R-E
probe unmodified · census-1b packed-surface enumeration · the E-14.5 reconciliation). Census derived by
record from the 58 adjudicated bank files; no partition inherited. No product source opened for
writing. This file is the only write.*
