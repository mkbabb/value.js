# KF-W3 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 5)

**Spec under trial**: `docs/tranches/X/keyframes/waves/KF-W3.md` — **168 078 B, 409 lines**, mtime **2026-08-28 16:56:52**
(pass 1: 57 164 B / 232 · pass 2: 86 041 B / 261 · pass 3: 101 473 B / 281 · pass 4: 138 765 B / 358).
**Corpus authority**: the **58** `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/`
(`ls kf-*.md | wc -l` → 58, re-run this seat). Sole in-tree carry: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`.
**Method — BY RECORD, from zero.** No denominator, id list, partition or verdict was inherited from
PASS-1/2/3/4. This seat ran the spec's own stated commands against the corpus and the frontier, then
read every hit. Where a figure is printed in the spec beside a command, **that command was re-executed
here** and the outputs compared digit for digit — including the commands the spec labels *"re-run at
write time"*, which is where this pass's principal finding lives.
**Seat instruments (read-only)**: `grep`/`sed`/`stat`/`comm` over the 58 records and the eleven wave
specs; `git grep`/`git show`/`git ls-tree` over keyframes.js at **`origin/master` `81a56990`**;
`node` against the pinned `node_modules/@mkbabb/value.js@4.0.0` packed artifact.
**Four executions**: the R-E probe unmodified · the census-1b packed-surface enumeration · the E-14.5
reconciliation transcript · the G-KF3-3 arm-(c) roster re-derivation.
**This file is the only write.** No product source was opened for writing.

**VERDICT: DEFECTIVE** — 2 MAJOR · 2 MINOR · 1 INFO. **Not census-fatal** (`escapedCount = 0`; carriage
of the routed 24 is complete and id-for-id verifiable, re-derived here without inheritance). **Axis 1
PASSES for the first time in five passes.** Axes 3, 4, 5 **PASS unqualified** — every census, every RED
baseline, every M-25 carriage and the whole W11/12/13 posture reproduce exactly. **Axis 2 fails**: one
of the spec's own write-time receipts is falsified at the spec's own bytes (**D-1**), and the round-4
RECONCILE certification that was supposed to kill the drift class is itself falsified at the bytes by a
post-certification sibling write (**D-2**). **All six PASS-4 defects (D-1..D-6) are independently
re-derived as CURED.**

---

## §0 TREE LAW

**PASS.** `git rev-parse origin/master` → `81a56990736ced5b5edde0b84c527680ac7689b1`, exact. Local HEAD
`8281638c0ac4ac8c54a67a018ca5bf6a9117174f` with a dirty worktree — **DISQUALIFIED** as witness substrate
and cited by this spec only in its lawful historical forms (§Header ref-of-record; C-7's `345/12/57 @
8281638c` citation cap; E-10's X-1 routing-away). Every gate-load-bearing anchor below was resolved at
`81a56990` via `git show`/`git grep`, never by opening a working-tree file. **No conviction.**

---

## §1 CENSUS TOTALS — derived by record, from zero

| bucket | count |
|---|---|
| **routedTotal** (distinct registry row-ids routing to this wave) | **24** |
| **BOOKED** (§Carry fold-identity · §Excluded E-1 disposal · §Excluded E-15 exclusion-with-named-owner) | **24** |
| **ESCAPED** (no row, no fold-identity, no exclusion line) | **0** |

Carriage **24 / 24 = 100 %**.

**The four census figures the spec prints all reproduce exactly at this seat, 2026-08-28:**

```
ls kf-*.md | wc -l                                                  → 58
markup union, case-INSENSITIVE, 5 markups                           → 26
markup union, case-SENSITIVE                                        → 23
payload sweep  grep -l '\bR1\b' kf-*.md | wc -l                     → 41
```

**The three-record case delta is exactly what the spec names** — `comm -13` over the two unions returns
`kf-EasingScene` · `kf-EasingSidebar` · `kf-TimingFunctionPanel`, the three header-taxonomy sentences
spelling *"W3 **Parser Consumption** (GATED)"* whose capitals a case-sensitive grep misses. The law's
declaration that **the wider (26) reading is the one it takes** is therefore both stated and honoured —
the round-4 cure of PASS-4 D-2's clause (a) is real.

**Routed ids re-enumerated id-for-id (19 canonical + 5 SHIM = 24), every anchor opened.**
`kf-AmigaScene:150` · `kf-CSSCodeEditor:46/:134` · `kf-KeyframeTimeline:48` · `kf-KeyframeCardList:122` ·
`kf-KeyframesStringControls:62-63` · `kf-CopyButton:81` · `kf-StartingStyleTarget:80/:139` ·
`kf-KeyframeCard:101` · `kf-EasingTarget:77` · `kf-App:111` · `kf-EditorShell:77` ·
`kf-CubeAxisLines:108` · `kf-KeyframesEditor:99` · `kf-TimelineTrack:18/:130` ·
`kf-ChannelOptions:126/:155` · `kf-ChannelControls:126` · `kf-CubeTarget:76` ·
`kf-DemoGlobalChrome:77` · `kf-SquareScene:132` — **19**.
SHIM rows: `kf-ChannelControls:79` · `kf-AnimationControlsGroup:74` · `kf-KfPillTabs:58` ·
`kf-KfPillTabs:70` · `kf-DemoGlobalChrome:70` — **5**. **19 + 5 = 24.**

**The SHIM cardinality re-derived independently.** `grep -n 'KF\.W3-SHIM' kf-*.md` → **12 hits in 5
records**; subtract the five header-taxonomy sentences (`kf-AnimationControlsGroup:17` ·
`kf-ChannelControls:17` · `kf-ControlsPaneWrapper:6` · `kf-DemoGlobalChrome:17` · `kf-KfPillTabs:19`),
the one in-row cross-reference to the law (`kf-AnimationControlsGroup:39`) and the one terminal-manifest
restatement (`kf-KfPillTabs:122`) → **12 − 7 = 5 rows across 4 records**. `kf-ControlsPaneWrapper` books
no shim row at all, exactly as C-6 and E-1 state. **The round-2 D-03 repair holds under independent
re-derivation.**

**X-08's quote chased to its bytes.** `kf-CubeAxisLines.md:108` opens on an unrelated `F-1 → KF-CE-32`
clause, so the anchor was read whole: the line does carry ***"C·§4's R1 negative → megatranche R1"
(KF.W2/W3)*** verbatim, mid-line. Anchor and quotation both hold.

**Escape hunt, run independently of the spec's tables.** `grep -n 'KF\.W3' kf-*.md`, minus `-SHIM`,
minus header-taxonomy, returns **13 lines across 8 records**. Eleven are the booked rows above. The two
that are not — `kf-KeyframesStringControls:161` (a *"RETIRED from prior residue"* budget register) and
`:174` (the record's terminal adjudication manifest) — are **non-row lines inside an already-booked
record**, the same class C-6 subtracts by reading and declares it subtracts. **Neither is an adjudicated
row routing here. ESCAPED = 0, confirmed by construction rather than by trusting the spec's arithmetic.**

**The E-15 arithmetic closes, counted by command.** Main table `^| **X-nn**` rows → **12**; sub-line I
table → **8**; sub-line II table → **6**. **12 + 8 + 6 = 26** ids booked at E-15, plus `KF-HA-19` at
E-14.5 → **denominator 27**, against RULINGS-4's ruled floor of ≥ 26. The map's resolution re-adds:
21 UNREACHABLE (6 routed + X-16 + 8 + 6) · 3 REACHABLE (X-07 · X-09 · X-11) · 1 REACHABLE-but-correct
(X-15) · 1 posture (X-17) · 1 DECLINED-FRAMING (KF-HA-19) = **27**. Both arithmetics close.

---

## §2 AXES

| axis | result |
|---|---|
| **1 · ID-KEYED CENSUS** | **PASS — for the first time in five passes.** 24 routed / 24 booked / 0 escaped, re-derived by record. The two-clause membership law is consistent *and* honest about its reading step; the five discards are named; the six sub-line-II negatives are on the page. PASS-4 D-1 and D-2 are both genuinely cured. |
| **2 · RECEIPT REALITY** | **FAIL (MAJOR ×2).** Every *frontier* anchor holds exactly and every *cross-wave* anchor resolves (§3). But a write-time receipt inside the membership law is falsified at the spec's own bytes (**D-1**), and the round-4 CLOSE-CERT that certifies the drift class dead is itself falsified by a post-certification write to `KF-W10.md` (**D-2**). |
| **3 · M-25 DEPTH + LAW-A CENSUSES** | **PASS — unqualified.** All five LAW-A censuses, census 1b, the R-E probe, the E-14.5 reconciliation and the G-KF3-3 roster reproduce exactly. KF-AV-28 verbatim + labelled restatement, 3-of-58. |
| **4 · GATES** | **PASS.** Seven close gates born-RED with executed baselines; both previously-unpassable oracles reachable by declared inbound ask; LAW B honoured at the gates. |
| **5 · POSTURE** | **PASS.** W4 head · W3 gated · O-21 clean · the W11/12/13 disposition present and coherent at both ends · W10's greens re-conditioned on artifacts that exist. |

---

## §3 AXIS 2 — anchors (PASS) and receipts (FAIL)

### 3.1 Frontier anchors — every one re-measured at `81a56990`, all hold

`css-text.ts` `:17 export const reverseAnimationShorthand = (` · `:41 export const serializeCssValue =
(value: CssValue): string => {` · `:54 if (!serialized.ok) throw new TypeError("Value returned an
unserializable CSS color.");` — **exact**.
`package.json` `:70 "@mkbabb/value.js": "4.0.0"` · `:77 "@mkbabb/glass-ui": "7.0.0",` — **exact**.
`src/animation/constants/types.ts` `:193-196` = `Easing` · `TimingFunctionNames` · **`string`** ·
`undefined`; **`:195` is `| string`** — the round-3 D-4 path pin holds.
`easing/registry.ts` `:26 "smoothStep3",` · `:27 "easeInBounce",` · `:31 ...Object.keys(bezierPresets),`
· `:131 const parsed = parseTimingFunction(timingFunction);` — **exact**; and `git ls-tree` over
`src/animation/compile/easing/` returns **`index.ts` · `option.ts` · `registry.ts` only — no
`easing-registry.ts`**, confirming §B.1's *"ALL THREE DEAD"* row.
`demo/components/CopyButton.vue:42 timingFunction: "easeInBounce",` — **exact**.
`format/options.ts` **`:80`** reads *"K.W10 CC-1 — the per-child `animation` SHORTHAND emit via
value.js's"* — **the D-4 partition's load-bearing justification, confirmed to the byte**: `:81`'s
sentence does open at `:80` with *"via value.js's"*, which is what makes `:81` PROVIDER-NAMING.

### 3.2 Cross-wave receipts — the discipline is exemplary, and it is what saves this file

The spec's §B.6 LAW-C bullet claims *"this file cites no sibling spec's line numbers and quotes no
sibling spec's prose anywhere."* **Re-measured**: `grep -o 'KF-W[0-9]*\.md[:0-9]*' KF-W3.md` returns
**six occurrences, all `KF-W3.md`** — self-references only. **The claim is true.** All three forward
references are anchor-only per LAW C(3) and **all three resolve at `KF-W10.md`'s CURRENT bytes**:
`§6.C-I` (live at `:539`, and the inbound row at `:501`), `§6.D · SUCCESSOR-FORMATION REGISTER` (live at
`:543`), and the reciprocal — `KF-W10.md:501` names ***"KF-W3 §Excluded, `E-14.5`"*** as inbound row 2.
**The seam is two-ended and both ends agree.**
`grep -c 'KF-HA-19' KF-W3.md` → **10** and `grep -o … | wc -l` → **15**, exactly the figures the spec's
own anti-drift note predicts for its final stage-1 bytes and exactly what CLOSE-CERT §6 measured.

**This is the finding**: W3's forward receipts survive **because they carry no bytes and no numbers**.
The one class of receipt it does carry with a number — a receipt over its *own* bytes — is false
(**D-1**), and the instrument built to catch drift never looked there (**D-2**).

---

## §4 AXIS 3 — M-25 depth and the LAW-A censuses (PASS, unqualified)

**Census 1 · `serializeCssValue`.** Re-run at `81a56990`: **14 importing modules** — `src/` **8**
(`emit/densify.ts:13` · `emit/entry.ts:37` · `emit/format/format.ts:1` · `frame/interp-slot.ts:19` ·
`engine/css/metadata.ts:33` · `resolve/browser.ts:4` · `resolve/conditional.ts:2` ·
`resolve/function.ts:6`) · `demo/` **1** (`timelineEngine.ts:17`, `@src/…/css-text`, called `:88` — the
alias-root consumer invisible to any `src/`-scoped grep) · `test/` **5**. Plus the five in-file uses
(`:43 :48` recursive · `:66 :83 :89` callers). **Exact, path for path.**

**Census 1b · the routing target, EXECUTED.** Against `node_modules/@mkbabb/value.js` → `4.0.0`:
`color 23 · value 1 · css 19 · easing 16 · math 9 · transform 9 · quantize 2` = **79 exports**, and
`serializeCssValue`/`reverseAnimationShorthand` are on **none**. **The routing target genuinely does not
exist at the pinned coordinate** — G-KF3-4's re-cut into a declared inbound ask is the correct cure.

**Census 2 · `reverseAnimationShorthand`.** One implementation (`css-text.ts:17`), **exactly one live
import specifier** (`format/options.ts:20` ← `../css-text`), call `:121`; everything else prose at
`backward.ts:20 :46 :252 :285` · `options.ts:10 :81` · `index.ts:232` ·
`compile-roundtrip.test.ts:23` — **eight prose sites, exact**. The **5 provider-naming / 3
provider-silent** partition is verified at the bytes (§3.1, `:80`). **The D-4 cure is sound: the gate
states no numeral and points at the enumeration.**

**Census 3 · `cssIdent`.** Two re-export sites — `emit/index.ts:53` (`from "./backward"`) **and**
`emit/backward/index.ts:29` (`from "./walk"`) — definition `walk.ts:145`. **Exact; the round-3
quantifier correction holds.**

**The D-5 relocation rests on a re-run command, not on prose.**
`git show origin/master:src/animation/compile/emit/index.ts | grep -nE
'serializeCssValue|reverseAnimationShorthand|css-text'` → **no output, exit 1**, this seat. The barrel
re-exports neither forked symbol, so neither delete forces an edit there; the struck `modify` row and
its relocation to §B.3 as a read-only witness are **measured, not asserted**.

**G-KF3-2 — RED BASELINE EXECUTED.** `node r1-published-totality.mjs` (3 476 B, unmodified):

```
RED  parseCssColor  102/172   RED  parseCssScalar 102/172
RED  parseCssValue   60/172   RED  parseCssValues  60/172
ok   parseKeyframeSelector · parseStylesheet · parseTimingFunction
ok   parseAnimationTimeline · parseAnimationRange     (0/172 each)
TOTAL 324 throws / 1548 calls · DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')
```

**Exact to the digit**, one mode, matching `src/css/grammar.ts:181`.

**G-KF3-3 arm (c) — the roster command RE-DERIVED**, returns **exactly the 12 enumerated paths**, no
more, no fewer. The two by-name exclusions hold.

**E-14.5's reconciliation — re-executed against the packed artifact, line for line:**

```
parseCssColor("oklch()")                       THROW TypeError: …(reading 'replace')
parseCssColor("oklch(0.7 0.1 200)")            ok=true
parseCssColor("oklch(70% 0.1 200 / 50%)")      ok=true
parseCssColor("rgb()"/"lab()"/"color()"/"foo()")  THROW (same single mode)
parseCssColor("var(--x)")                      ok=false
parseCssColor("color-mix(in srgb, red, blue)") ok=false
```

**Reproduces exactly.** Both records are true and they do not conflict, precisely as the spec argues.

**KF-AV-28 — verbatim carriage verified.** `kf-AnimationVisualizer.md:35` carries the rider's canonical
bytes; the spec's L-9 quotation is a byte-faithful substring, and its restatement is *labelled* as one.
The id occurs in exactly **3 of 58** records. **C-5's both conjuncts** verified at `kf-SquareScene.md:53`
(the five in-frame throw sites) and `:125` (the *annotated, never re-booked* lock).

**The six sub-line-II negatives — every claim tested.** All six banked quotations verify at their cited
lines (`kf-MbabbMenu:93` · `kf-SequenceScene:119` · `kf-SpringHeatmap:101` · `kf-MatrixEditor:139` ·
`kf-EditorHeader:95` · `kf-AnimationVisualizer:124`), and **all six measure 0 on all five routing
markups**, per record, this seat — so `routedTotal` is genuinely untouched and the surplus classification
is correct. **PASS-4 D-1 is cured at the corpus, not at the example list.**

---

## §5 AXIS 4 — gates (PASS)

**G-KF3-1 — RED, all six conjuncts FALSE, re-measured**: `package.json` → `4.0.0` ·
`RELEASE-CONDITION.md`/`RELEASE-PACKET.md` → *No such file* · `grep -c 'RC-P' INBOX.md` → **0** ·
`grep -rn 'RC-P' docs/tranches/X/fourier/` → **0** over **eleven** specs (`F-W0 … F-W10` — the round-2
off-by-one repair confirmed) · `docs/tranches/X/keyframes/evidence/` → *No such file*.
**G-KF3-2 / G-KF3-3** — executed above.
**G-KF3-4 / G-KF3-5** — both previously-unpassable oracles are reachable: each names its unpublished
symbol as a **declared conjunct** carried on the X-W9 cross-edge (measured absent at 4.0.0 by census 1b),
so each can now fail for its intended reason. G-KF3-5 additionally offers discharge (b), which is wholly
in-grant. **No gate re-derives its own oracle (C-7 clause d).**
**G-KF3-6** — `lane-docs.md:373`'s *"DECLARED; no keyframes acknowledgement on record"* is the live RED.
**G-KF3-8 / G-KF3-9** — correctly re-classed FLOOR, numbers retained for citation stability.
**LAW B at the gates — honoured.** G-KF3-7's completeness is routed to the conformance artifact, not
claimed; E-15's carriage sentence likewise. *(One split-citation defect, **D-3**, sits at §Carry/C-6.)*

---

## §6 AXIS 5 — posture (PASS)

| clause | result |
|---|---|
| **W3 gated-unscheduled** | **PASS.** §-head *"(GATED, never scheduled)"*; Status **planned**; opening condition verbatim and by predicate name; L-1 forbids scheduling. |
| **W4 head honored** | **PASS.** E-3/E-4 route the easing commit and the gate chassis to KF.W4; L-3 orders W4 before the repin; G-KF3-9 states *"This wave may NOT author that gate."* |
| **O-21** | **PASS.** W3's O-references measured: `O-11` ×9, `O-8` ×1 — **it mints no O-row**. INBOX's live ceiling is **O-20**, `grep -c 'O-21'` → **0**. W1 declares O-21 (×9) and W10 consumes it (×6); W3 makes no claim and there is no collision. |
| **KF.W11/12/13 per RULINGS-4 R4-8** | **PASS — present and coherent at both ends.** W3's **E-8** records them **MINTED and UNAUTHORED**, gives their terminal disposition as `KF-W10 §6.D` **anchor-only under LAW C(3)**, and *"cites a register row and promises nothing."* At the far end `KF-W10.md:543` carries **§6.D · SUCCESSOR-FORMATION REGISTER** with all three rows, the **9 + 6 + 2** cargo partition, the travelling locks, the minting citations and the verb **MINTED-UNAUTHORED**. `ls waves/` confirms no spec exists at any of the three coordinates. |
| **W10's greens conditioned on artifacts that exist** | **PASS.** G-2's right hand is re-conditioned to *"the union of AUTHORED X·KF wave bounds ∪ §6.D's cargo enumeration"* (`:240`, `:368`); R-A's scope is honest (*"The three minted-unauthored successor formations take no verb from this close"*, `:41`/`:564`); OP-5 is a re-measure-at-open. **The close stamps nothing it never named.** |

---

## §7 DEFECTS

### D-1 · MAJOR · The membership law's write-time receipt is falsified at the spec's own bytes — and it is wrong in all five positions

E-15's (R-i) reading step closes with this sentence:

> *"**None of the five is an adjudicated row routing to any wave**, so all five fail clause (1) and none
> is a census escape; `grep -c` in this spec returns **0 · 0 · 2 · 0 · 0** for the five names, and both
> `TimingFunctionPanel` hits are the `bezierPresets` blast-radius anchors (§B.3 tail · G-KF3-6), not a
> row booking — **measured at write time**."*

Re-run at this file's final bytes, this seat:

| name | asserted | measured | where the hits are |
|---|--:|--:|---|
| `EasingSidebar` | **0** | **3** | `:105` §B.3 tail · `:242` G-KF3-6 · `:346` E-15's own sentence |
| `EasingScene` | **0** | **1** | `:346` |
| `TimingFunctionPanel` | **2** | **3** | `:105` · `:242` · `:346` |
| `EditorStartScreen` | **0** | **1** | `:346` |
| `TypingDots` | **0** | **1** | `:346` |

**Every one of the five positions is wrong**, and the mechanism is that the figures are PASS-4 D-2's
*pre-repair* readings (`0·0·0·0·2`, merely permuted into the new name order) presented under the label
*"measured at write time"* — when the very repair that added the sentence put all five names into the
file and made every zero impossible.

Two things make this worse than a stale transcript. **(a)** The claim *"**both** `TimingFunctionPanel`
hits are the `bezierPresets` blast-radius anchors"* is false at the count (there are three) and
**incomplete at the class**: `EasingSidebar` carries the *identical* two blast-radius citations, because
§B.3's own tail names them in one breath — *"`TimingFunctionPanel.vue:52/:97/:98/:127`,
`EasingSidebar.vue:77/:112/:155`"* — and G-KF3-6 repeats the pair. The receipt credits one member of a
pair the spec itself writes as a pair, and reports the other as absent. **(b)** This is **LAW D(3)'s
numeric arm** (*"every figure printed beside a pasted command is produced by re-running the command at
write time"*) failing inside the one clause **PASS-4 D-2 was raised and cured to make honest** — the
clause whose entire purpose is to declare the reading step rather than deny it.

The substance survives: none of the five is a row booking, all five hits are the spec's own citations,
and `routedTotal` is untouched. **The receipt does not.** The cure is one re-run: state `3 · 1 · 3 · 1 ·
1`, name `:346` as the self-reference each count now includes, and extend the blast-radius note to the
`EasingSidebar`/`TimingFunctionPanel` pair §B.3 already writes as one.

*Receipt*: `for n in EasingSidebar EasingScene TimingFunctionPanel EditorStartScreen TypingDots; do
grep -c "$n" KF-W3.md; done` → `3 1 3 1 1`; `grep -n` for each resolves the sites listed above;
`sed -n '105p;242p'` confirms both blast-radius sentences name both `.vue` files.

### D-2 · MAJOR · The round-4 CLOSE-CERT is falsified at the bytes — `KF-W10.md` wrote 22 seconds AFTER the certification that proves nobody wrote after it

`PASS-4/CLOSE-CERT.md` §1 is titled ***"THE MTIME TABLE — proof this seat wrote last"*** and certifies
row 6 as `KF-W10.md` **17:31:54 / 209,902 B**, concluding *"this seat's first edit was at 17:30:52, a
**nine-minute clear margin**."* §9(1) re-certifies it: *"It ran **AFTER the last per-wave write**."*

Measured at the tree, this seat:

```
CLOSE-CERT.md   2026-08-28 17:37:59   27,004 B
KF-W10.md       2026-08-28 17:38:21  209,923 B     ← +22 s, +21 B over the certified size

find waves -name '*.md' -newer conformance/PASS-4/CLOSE-CERT.md
  → 17:38:21  209923  waves/KF-W10.md        (the ONLY one)
```

**LAW C(4)(i) is not satisfied.** The reconcile seat did not write last; the file it certified as final
moved after the certification, and `KF-W10.md` is the *one* spec that did. RULINGS-4 §END makes this
certification the round's closing condition — *"**The round does not close without it**; the pass-5 union
seat audits it as its first act"* — so the artifact standing between round 4 and bankability is
measurably wrong about its own central claim.

**W3's own exposure is nil, and the reason is worth recording.** All three of this spec's forward
receipts are **anchor-only under LAW C(3)** — no bytes, no line numbers — and this seat re-resolved all
three at W10's *current* bytes (§3.2): `§6.C-I`, `§6.D` and the inbound-table reciprocal at `:501` all
hold. **The stable-anchor idiom absorbed a drift the certification did not see.** That is the idiom
working; it is not the instrument working. Recorded here because the pass-5 union seat is directed to
audit `CLOSE-CERT.md` against the bytes first, and this is what the bytes say.

*Receipt*: `stat -f '%Sm %z %N' -t '%H:%M:%S'` over `waves/*.md` and `PASS-4/CLOSE-CERT.md`;
`find waves -name '*.md' -newer PASS-4/CLOSE-CERT.md` returns exactly one path.

### D-3 · MINOR · LAW B's carriage citation names two different artifacts of record for one claim, in one file

The round-4 re-point of the closure citation landed at three sites and not at three others.
`grep -on 'PASS-[0-9]/KF-W3-CHECK\.md'`:

- **re-pointed** — §Provenance `:20` (both, predecessor named) · G-KF3-7 `:248` (both) · E-15's
  arithmetic `:405` (both, *"the freshest artifact and the one this round repairs against"*).
- **not re-pointed** — §Carry `:191` **×2**, including the operative sentence *"Carriage itself is **not
  claimed in this file's voice** (LAW B): it is measured at `PASS-3/KF-W3-CHECK.md` §1/§2"*; and C-6
  `:200` for the SHIM cardinality.

So the identical claim — **24 routed · 24 booked · 0 escaped** — is sourced to `PASS-3` at §Carry and to
`PASS-4` at E-15, one hundred lines apart. Worse, §Carry justifies its choice by calling PASS-3 *"the
freshest artifact that derives it from the 58 records' bytes **without inheriting any prior pass's
denominator**"* — a superlative `PASS-4/KF-W3-CHECK.md` falsifies at its own head (*"No denominator, id
list or verdict was inherited from PASS-1/2/3"*). Both figures are identical and both cites carry
explicit pass prefixes, so no reader is misled about the number; but the file's own standing rule is
*"when a later pass supersedes this one the citation is re-pointed"*, and it was applied to the instances
a ruling named rather than to the scope. **R4-10(1) binds exactly this**: *the sweep's enumeration source
is the SCOPE, never the example list.* One re-point of three sites cures it.

### D-4 · MINOR · The round-1 correction survives uncured at a second site — C-4/C-5 are still cited as sources of the nine

§Carry `:191` states the fold-identity arithmetic id for id — C-1's row + 4 riders, C-2's 3, C-3's 1 =
**1 + 4 + 3 + 1 = 9** — and then records the repair that produced it:

> *"**C-4 (K-6) and C-5 (D-27/L-7/C-9) are carried rows that are NOT members of the routed 19**
> (corrected at repair round 1: **the earlier parenthetical listed them inside the nine and the
> arithmetic did not close**)."*

§Provenance `:20` still reads ***"**9** carried as fold-identities (§Carry **C-1..C-5** riders)"*** — the
same parenthetical range, naming C-4 and C-5 as sources of the nine, four rounds after the correction.
The arithmetic itself (`9 + 5 + 10 = 24`) is stated correctly at both sites and nothing downstream moves,
so this is a provenance-range error, not a count error. But it is the *identical* instance-not-scope class
as D-3 and as R4-10(1)'s fourth-consecutive-partial finding, and it is the one place a reader
reconstructing the nine from §Provenance alone would build them from the wrong five rows.

*Receipt*: `sed -n '20p' KF-W3.md | grep -oE 'carried as fold-identities \([^)]*\)'` → `(§Carry C-1..C-5
riders)`; `sed -n '191p'` carries the round-1 correction verbatim.

### D-5 · INFO · A quotation labelled *verbatim* carries added markdown that LAW D(1) says must be byte-diffed

E-14.5 books KF-HA-19 *"in the bank's words (`kf-HeroAurora.md:66`, **verbatim**)"*. The source line
reads *"…diagnostics-not-throws on var()/color-mix) — three independent executions"*; the spec renders it
*"…diagnostics-not-throws on `var()`/`color-mix`) — **three independent executions**"* — backticks and
bold added, no word altered, no elision. LAW D(1) requires a *verbatim* label to be byte-diffed at write
time, and this quotation is not byte-identical.

**No charge attaches to the substance** — the words, the order and the meaning are exact, and the
emphasis-added idiom is used throughout the corpus for readability. Recorded so the next LAW-D sweep
rules the idiom once, explicitly (e.g. *"emphasis markup added; words unaltered"*), rather than leaving
every quotation in the program formally non-compliant with a law it otherwise satisfies.

---

## §8 PASS-4 CARRY-FORWARD — all six re-derived as CURED

| PASS-4 | status at PASS 5 | evidence |
|---|---|---|
| **D-1** (payload rule withheld from ≥6 banked negatives) | **CURED at the corpus** | E-15 sub-line II books all six; every banked quotation verified at its line; all six measure **0** on all five markups, per record, this seat; the sweep is now declared as *all 58, independent of markup*, with `58`/`41` reproduced exactly. |
| **D-2** ((R-i)'s self-description false) | **CURED** | (R-i) is restated as *payload-admissible **∧** markup-positive*; *"no hand-partition anywhere"* is **struck** for *"no UNDECLARED partition"*; the five discards are named; the case rule is declared and the **wider (26) reading taken** — `comm -13` confirms the three-record delta exactly. *(Its transcript is D-1 above — a new finding against the cure, not a re-raise.)* |
| **D-3** (KF.W10 seam undeclared) | **CURED, and two-ended** | The `→ KF.W10` cross-edge row exists at `:302`, anchor-only, both legs verbed; `KF-W10.md:501` names *"KF-W3 §Excluded, `E-14.5`"* as inbound row 2. Both ends agree. |
| **D-4** (six-vs-eight) | **CURED** | §B.5 census 2 carries the **eight-site enumeration with its counting rule** and the **5 provider-naming / 3 provider-silent** partition; `options.ts:80`'s *"via value.js's"* opener verified at the frontier; **the gate states no numeral and points at the enumeration**. |
| **D-5** (`emit/index.ts`'s no-act `modify`) | **CURED** | The row is **struck** from §B.2 and relocated to §B.3 as a named read-only witness, on a command re-run at write time and reproduced here (`grep -nE …` → no output, exit 1). |
| **D-6** (stale KF-W10 line anchors) | **CURED** | `:398`/`:419` are gone; E-14.5 carries `KF-W10 §6.C-I` as a bare anchor and states that the measured replacements are *deliberately* not written in, per LAW C(3). The anchor resolves at W10's current bytes. |

**New at this pass**: **D-1** and **D-2** — both in the receipt layer, and both invisible to round 4's
own instrument. CLOSE-CERT §8 named *"the short transcript"* as the residual class for pass 5 and named
three seats it had fired at; it fired a fourth time, at the one seat CLOSE-CERT swept and cleared —
because that sweep's declared scope is **same-round cross-wave** receipts, and D-1 is a receipt a spec
takes over **its own** bytes. **The drift class is not dead; it moved inside the file.**

---

*Seat: fresh L-18/L-20 adversarial, PASS 5, 2026-08-28. Frontier `81a56990`, re-verified. Four
executions (R-E probe unmodified · census-1b packed surface · the E-14.5 reconciliation · the G-KF3-3
roster). Census derived by record from the 58 adjudicated bank files; no partition, denominator or
verdict inherited from any prior pass. No product source opened for writing. This file is the only write.*
