# KF-W2 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 4)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W2.md` — **707 L** (was 522 at pass 3), X.KF.W2 · Parse Façade, repaired **three** times (rounds 1, 2, 3, all 2026-08-28).
**Corpus authority**: the **58** `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` — re-enumerated by this seat (`ls kf-*.md | wc -l` → **58**; `wc -l` total 8,656 L). **The inherited nine-block partition is RETIRED**: this census derives from the records themselves, record by record, by reading. Sole in-tree carry: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (`ls` → one file, 366 L).
**TREE LAW / substrate**: every keyframes.js witness re-verified at **`origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`** via `git show` / `git grep` / `git ls-tree` (read-only). Measured this seat: `HEAD 8281638c` (dirty worktree), `origin/master 81a56990` — `8281638c` used **only** as declared historical context, never as witness substrate. Zero product-source writes. The only execution was a read-only `node` probe of the installed `@mkbabb/value.js` dist (version re-verified **4.0.0**).
**Seat**: FRESH. PASS-1/2/3 registers and all three RULINGS files were treated as claims to be re-tested. No denominator, no escape list, no witness reading is inherited.
**Verdict**: **DEFECTIVE** — **77 routed · 70 booked · 7 escaped · 17 defects (9 MAJOR)**.

The round-3 repair is substantial and most of it survives hostile re-derivation intact — every LAW-A census, the whole R3-4 subject-identity sweep, the F0 matrix, the G-W2-2 two-command witness and all 60+ record anchors reproduce **exactly**. What convicts pass 4 is a different class from pass 3's: **not the instrument, but the freshness of the cross-spec quotations and the internal consistency of the numbers the repair itself moved.** The file's single sharpest defect is that it quotes, as a live receipt "verified at their bytes this round", the exact sentence a sibling's own round-3 seat **struck** in the same repair round.

---

## §0 Method

Routing is read at the **practised** rule this file adopted as written at round 3: *any banked cell in the registry's declared subject matter* (value.js parse/serialize entry ingresses with an executed or traced outcome · failure postures over a value.js-bearing path · positive postures over a value.js Result/parse result · R1 boundary negatives · parse-seam fidelity). Token forms are corroboration only — this seat honours the file's own D-1 cure and never establishes an exclusion by grep.

Instruments, all executed by this seat:

| instrument | result |
|---|---|
| `ls kf-*.md \| wc -l` | **58** |
| every `⟨record:line⟩` anchor in the spec, resolved + subject-checked | **60 of 60 resolve; 60 of 60 mention their subject** ✓ |
| R3-4 SUBJECT-IDENTITY sweep, all 16 members re-run at `81a56990` | **16 of 16 return the row's stated lines** ✓ |
| LAW-A censuses A-1 … A-5, re-derived | **5 of 5 reproduce byte-for-byte** ✓ |
| F0 matrix, node against installed 4.0.0 | **re-executed cell-for-cell; every cell reproduces** ✓ |
| G-W2-2 witness (i) + (ii) | **29 / 27 · 25 specifiers over 13 modules** — module-for-module identical ✓ |
| cross-spec receipts (W3 · W4 · W5 · W6 · W7 · W8 · W9 · W10) | **7 of 8 resolve; the W10 receipt is STALE AND STRUCK** (D-1) |

---

## §1 WHAT REPRODUCES — and it is the great majority of the file

### 1a · Witnesses at the frontier

**G-W2-2 (i)/(ii)** — `git grep -n 'from "@mkbabb/value.js/css"' 81a56990 -- src/ | wc -l` → **29**; `-l | wc -l` → **27**. The perl whole-import-block reader, run verbatim, returns **25 runtime specifiers over 13 modules**, module for module and count for count: `scroll/grammar` 6 · `adapter` 6 · `validate` 2 · `engine/css/metadata` 2 · `resolve/function` 1 · `resolve/browser` 1 · `engine/options` 1 · `value/compile` 1 · `selector` 1 · `frame/interp-slot` 1 · `emit/format/options` 1 · `emit/css-text` 1 · `easing/registry` 1. ✓

**The three faults G-W2-2 kills are real and reproduce**: `-E` with `\b` → **0 hits** (POSIX ERE defines no `\b`); `-P` → **5 hits / 5 files**, of which `frame/compiler.ts:40` is `import { FRAME_ID_SCALE, parseKeyframeSelector } from "../selector"` — kf's own symbol, structurally excluded by the specifier anchor. ✓

**G-W2-2b (demo arm)** — 7 files name the subpath, one type-only, **8 runtime specifiers over 6 modules**, the six exactly as enumerated. ✓

**LAW-A A-1 (`selectorText`)** — the census is right and the correction is right: copy 3's consumers are **three** — `useKeyframeOps.ts:9` (call `:111`) · `timelineEngine.ts:15` (call `:38`) · `test/demo/instrument/value4-editor-boundary.test.ts:5` (assertion `:26`). Copy 1 `format/format.ts:20`, consumers `:132/:201/:280/:313` — the bank's four, exact. The named false positive is real: `test/engine/nan-frame.test.ts:39` declares its own local `selectorText` from no import. ✓

**LAW-A A-2 (`formatCSSKeyframeString`)** — the refutation stands: declaration `format/format.ts:136`, re-exported at `emit/format/index.ts:25` · `emit/index.ts:47` · `compile/index.ts:51` · **`public.ts:170`**, declared on the lazy engine surface at `load-engine.ts:54`/`:109`, consumed at `KeyframeCardList.vue:60`. The re-cut from *delete the symbol* to *delete the regex body* is correct and load-bearing. ✓

**LAW-A A-3 / A-4 / A-5** — `CQ_UNIT_RE`: declaration `:136`, consumers `:202`/`:207`, zero barrels, zero pins ✓. `coerceToSyntax`: `resolve/function.ts:2` specifier + `:19` sole call; two test hits are comments ✓. `test/` arm: **10 specifier lines / 10 files**, `scripts/` **0** ✓ — including `test/compile/valuejs-contract.test.ts:1`, a file this wave modifies.

**R3-4 SUBJECT-IDENTITY sweep, all sixteen re-run** — every member returns its row's stated lines exactly, including the two readings the spec records rather than smooths (`validate.ts` `keyframesNames` also at `:219`; `frame/compiler.ts:38` a comment). **Zero mis-filed rows.** ✓

**Verbatim §Bounds anchors, spot-read whole**: `cssom.ts:214-216` the unescaped `new RegExp(\`\\\\banimation(?:-name)?\\\\s*:[^;}]*\\\\b${name}\\\\b\`)` ✓ · `cssom.ts:28-33` the VJ-9 TRIPWIRE ✓ (466 L ✓) · `catalog.ts:16` ✓ · `view-transition.ts:136`/`:146` ✓ · `composition.ts:175` ✓ · `format/format.ts:341` de-paren ✓ · `draw-svg.ts:89` ✓ · `scroll/grammar.ts:57-63` THROW ✓ · `adapter.ts:219-226` ABSORB ✓ · `validate.ts:180-192` SWALLOW ✓ · `selector.ts:23-35` with `EMPTY_PARSE` **exactly at `:33`** ✓ · `value/compile.ts:31-38` with `parseAuthoredValue`'s `typeof value === "string"` guard **exactly at `:31`** ✓ · `css-text.ts:54` throw / `:58` `serializeSelector` / `:75` consumer ✓ · fixtures **14 `.css` + `manifest.json`**, names exact ✓.

**`parseAnimationCSS.ts`** read whole at the frontier: **58 L** ✓, `:1-5` collectors ✓, `:7` deep `@src/` ✓, `:32-34` THROW ✓, `:22-24` docblock verbatim ✓, calls `:36`/`:41` ✓.

**OP-4 / W3 / W4 / KF-AV-28**: `git show 81a56990:package.json` → `check = tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure`, `check:lib = tsc --noEmit -p tsconfig.lib.json`, `lint = depcruise src` — **no vue-tsc** ✓ exact. `KF-W3.md:1` = *"# KF.W3 — Parser Consumption (GATED, never scheduled)"* ✓, and `RC-P` is W3's ratified predicate at `:9`/`:11` verbatim ✓. `KF-W4.md:198` G-KFW4-1's re-cut `check` **composes** with the live script ✓. The KF-AV-28 rider's three bank anchors (`kf-AnimationVisualizer.md:35` · `kf-PlaybackRibbon.md:36` · `kf-SequenceScrubber.md:36`) all resolve **and all three lines state the rider** — subject-identity clean ✓.

**Cross-spec receipts that hold**: `KF-W6`'s head-matter Taxonomy paragraph at `:18` verbatim (and W6 itself now carries the dated `KF-W4 §11 ¶1` phantom correction, exactly as this file's §0 promises) ✓ · `KF-W6 §Carry`'s KF-HA-13 row at `:344` byte-exact ✓ · `KF-W7 §Gates · G14`'s consumers at `:193`/`:220`/`:221`/`:222` ✓ · `KF-W8 §Rows` MISS-β2 at `:173` *"the publication act, and it PRECEDES KF.W2"* ✓ and `KF-W8 §Sequencing`'s reciprocal at `:361` *"arms if-and-only-if KF.W8 has not preceded"* ✓ · `kf-TimelineCaret.md:46` *"publish-or-relocate, joint with banked C-12"* ✓ · `KF-W5 §Carry Arm B row B-15 · KF-CO-48` at `:284` ✓ and `KF-W5 §Gates · G-OPTSET` at `:339` ✓ · `KF-W9 §H`'s escalation-trigger register at `:205` with **KF-ES-3** armed and the PROVISIONAL lock verbatim ✓.

### 1b · The F0 matrix, independently re-executed

Every cell reproduces against `node_modules/@mkbabb/value.js/dist/subpaths/css.js` (version re-verified **4.0.0**): the five-entry escape on empty-argument colour notation; `parseCssColor("steps()")`/`("calc()")` **THROW** and `("steps(2, end)")` → `ok:false [css_syntax]` (the round-3 mirror half and its well-formed control — both correct); `parseCssValues("color-mix(…)")` → **ok:true** against `parseCssColor` → `ok:false [css_syntax]`; `parseCssScalar("from"|"to")` → **ok:true** (the precision correction stands); `parseKeyframeSelector` codes **`keyframe_selector_invalid`** against `parseTimingFunction`'s `css_syntax`; every entry THROWs on non-string; `parseStylesheet(42|{}|[])` → **`ok:true` with `[]`**; the nested `@keyframes a{from{color:oklch()}}` → **THROW**. The ABSORB-unreachable mechanism finding is sound.

### 1c · M-25 depth in the carried rows

Every banked quotation spot-checked verifies at its anchor, including all nine X1–X9 negatives, all five posture rows 12–16, X15, ★ S-7, K-6's reachability guard at `kf-SquareInstrument:24`/`:100`, D-27/L-7/C-9 with its identity lock, C-2's ruling-12 kill at `kf-SpringTarget:30`/`:93`, KC-2 + the frozen-boundary datum at `kf-KeyframeCardList:34`/`:101`, KF-HA-13 at `:55`, SUP-D at `kf-RibbonBar:109`, S-5/C-S5 at `kf-KeyframesEditor:147`, KF-CB-1 at `kf-CopyButton:40` with its three qualifiers. **No invention found; no lock dropped in the rows that are carried.** The defects below are about rows that are *not* carried, quotations of *siblings* rather than of the bank, and numbers the repair moved.

---

## §2 ID-KEYED CENSUS — 77 routed · 70 booked · 7 escaped

**Booked**: 28 (authoring) + 19 (round 1) + 15 (X1–X15) + 8 (Y1–Y8) = **70**. Of these, **42 are enumerated by banked id in the file** and **28 are not** (D-4).

### 2a · The seven escapes

| # | id ⟨record:line⟩ | banked bytes | why it is in this register's subject |
|---|---|---|---|
| **Z1** | **KF-KE-2 · L-B1 + D-2(read) + C-M3** ⟨kf-KeyframesEditor:41⟩ — **appears ZERO times in the spec** | *"(i) `:43` writes `frame.start.value = starts![i]` into a **value.js deep-frozen selector** → `TypeError` at i=0, loop aborts, `:45` never runs — **and the user sees nothing**: Vue wraps template handlers in `callWithAsyncErrorHandling` … (iii) The declared domain offers **20 points value.js rejects at parse** (`keyframe_selector_invalid, expected:["0%..100%"]` — probes)"* | The frozen-write kill **banked at the record that owns the seam Y2 names** (`KeyframesEditor.vue:40-47`), plus an **executed `parseKeyframeSelector` measurement** that is the *quantified* form of the exact entry-point mismatch **G-W2-6** publishes. Either it folds to KC-2 — and M-25 requires the fold be stated by id — or it is an escape. The file states neither, and books KC-2 from the *other* record |
| **Z2** | **N-9 (RR-B net-new)** ⟨kf-KeyframeTimeline:82⟩ **→ KF.W7** | *"dead surfaces and **a round-trip fidelity gap**: … `TimelineKeyframe.easing?` never written/read and **`importCSSToTimeline` drops per-stop `animation-timing-function`**"* | A banked **round-trip fidelity** cell at the demo's CSS→timeline import path, in an AUDITED record from which the file books four cells, while **G-W2-7 is the round-trip regression net**. The same defect is routed from a second record — `kf-ChannelOptions:154`, *"the `parseAnimationCSS.ts` per-stop timing-function drop (R3-forwarded, **lane-library §4.6 seam**)"* — and booked at **`KF-W5 §Carry Arm B · B-16`** with an **OPEN LOCUS**: *"if the declaration is a **demo module of the same name**, the row is a demo row"*. This wave holds the measurement that settles it (its own 58-line census cell) and delivers nothing; worse, it cites that module's docblock as the tree's own single-grammar-authority invariant with no qualifier |
| **Z3** | **KF-KC-17 · L-7** ⟨kf-KeyframeCard:59⟩ **NO-WAVE-OWNER** | *"the keydown pass-through injects U+00A0 into CSS and bypasses the card's only model channel … the next real keystroke hands **4×NBSP (not CSS whitespace) to `parseAnimationCSS`** via ops:111"* | The corpus's **only banked instance of a non-CSS character reaching the grammar adapter** — G-W2-5's literal ingress-census subject, and precisely the malformed-corpus datum the fuzz-extension clause exists for. The file books this record **only** as the verified negative KF-KC-53 |
| **Z4** | **kf-EasingScene superlative 11** ⟨kf-EasingScene:135⟩ | *"Reader-1's find, ADOPTED — **`timingCurveUtils`' single `requireEasing` funnel** over the **Result API** (three named helpers, source-tagged throws; glass-ui's bundle converged on the identical shape independently) — with the banked KF-ET-28 posture note (**the funnel throws where the render path needed degrade**)"* | A banked posture over **value.js's Result API** — positive in shape, defective in the render path — in the record this file adopted **Y1** from. F3's positive block was completed at round 3 on the reasoning that the *parse-result* exemplars sat outside it; a single named funnel over the Result API is that block's subject and it is still outside |
| **Z5** | **kf-EasingTarget superlative 12** ⟨kf-EasingTarget:119⟩ | *"`easing("step-start"/"step-end"/"steps"/"cubic-bezier")` all return **`easing_name_unknown` from value.js 4.0.0 (probed)**; `timingCurveUtils.ts:43-44`'s two lines are what keep three of 28 specimens from **taking the scene down at render**"* | An **executed value.js easing-entry measurement against real kf inputs, in the same record as KF-ET-2**, with a load-bearing guard. It also refutes, from inside its own record, the F0 claim that KF-ET-2 is *"the census's **only** executed measurement of a value.js easing entry"* (D-5) |
| **Z6** | **kf-ChannelOptions ruling 3** ⟨kf-ChannelOptions:105⟩ | *"L·M-5's step-start sub-claim — self-falsified in place (§9.0), re-probed by both RRs, adopted. **`parseTimingFunction("step-start"/"step-end")` → kind `steps`**"* | An executed measurement of **the same entry KF-ET-2 uses**, in a record from which this file already books two cells (C·S-4 at F0, KF-CO-48 at F3 row 18). The record was never out of reach |
| **Z7** | **kf-ChannelOptions ruling 5** ⟨kf-ChannelOptions:215⟩ | *"Transcript correction, conclusion intact: **`parseCssScalar("500m")` returns `{number, 500, unit:"m"}`** (not a keyword payload); it still throws — `tryParseTime` accepts only `s`/`ms`. **Recorded so no repair chases a phantom parser behaviour**"* | An executed `parseCssScalar` **payload-shape** correction with an explicit do-not-chase-a-phantom lock — the identical class to this file's own F1 precision correction (*"`parseCssScalar` **accepts** `from`/`to`"*), and directly load-bearing on the entry-point contract G-W2-6 publishes |

### 2b · Where the escapes sit

**Six of the seven sit in AUDITED records** (kf-KeyframesEditor, kf-KeyframeTimeline, kf-KeyframeCard, kf-EasingTarget, kf-ChannelOptions ×2); the seventh (kf-EasingScene) sits in a record the file **adopted a cell from this very round**. Sampling explains none of it. Neither does the instrument — round 3's cure worked: no escape here hides behind a token count. The mechanism this round is different and is stated at D-2/D-3: **the round-3 seat read the records it was directed to (the eight named by PASS-3) and did not re-read the records it was already in.** Four of the seven escapes are in records from which the file books between two and four cells each.

---

## §3 THE DEFECT REGISTER

### D-1 · MAJOR — the KF-W10 receipt quotes, as verified-this-round, the exact sentence KF-W10's own round-3 seat STRUCK

Three sites in this file route KF-HA-13's relay limb to a departed vehicle:

- §Carry F0 (Y3): *"**Cross-cited at both consuming ends, verified at their bytes this round** … the relay limb is booked at **`KF-W10 §6.C-H`** (*"kf-HeroAurora's relay packet (…) rides the **same ONE batched letter**"*)"*
- the Y1–Y8 lands table: *"relay limb on the **BH relay** (W10 §6.C-H's **batched letter**)"*
- §Excluded's BH-relay block: *"KF-HA-13's relay limb rides **`KF-W10 §6.C-H`**'s *"same ONE batched letter"*"*

Measured at KF-W10's current bytes this seat: `grep -c 'same ONE batched letter' KF-W10.md` → **1**, and that single occurrence is inside the sentence that **kills it**:

> `KF-W10.md` §6.C-H, *"Which letter — measured, not assumed."* — *"Rounds 1–2 wrote **"the same ONE batched letter"** … **Re-measured this seat**: that vehicle has **sailed**. … `INBOX.md:95` — **O-20 SENT 2026-08-28**; the letter on disk (11,466 B) returns `grep -conE 'KF-HA|aurora|…'` → **0**. … **§B-1, §B-4, OD-V5 and all five KF-HA rows did not.** Their vehicle of record is therefore the **SUCCESSOR SS-6 batch** … so no row cites a departed letter as its evidence coordinate."*

W10's live text reads *"rides **one batched letter** with them"*, and its §2b.1 (iii) states the correction a second time: *"the five KF-HA relay rows) ride the SUCCESSOR batch, because **O-20 has already departed without them**"*. So this file (i) mis-quotes W10 (**not byte-exact**), (ii) carries the **struck** framing, (iii) **drops the M-25 qualifier** that is the whole content of W10's round-3 repair, and (iv) asserts it *"verified at their bytes this round"* — a verification claim that cannot have been performed. **This is the O-21 posture axis reaching this wave**: a spec that cites a departed letter as a live coordinate is exactly what R2-1's mint law and W10's PASS-3 D-6 exist to prevent.

**Cure**: re-point all three sites to the **successor SS-6 batch (COHESION §4a's re-opened accretion register)**, quote W10's live sentence, and carry the O-20 departure as the qualifier.

### D-2 · MAJOR — a pasted LAW-B-corollary command output is TRIMMED; the command does not reproduce its own paste

G-W2-6's frozen-parse clause pastes, under *"the measurement rides beside the sentence it makes true"*:

```
$ git grep -n 'isFrozen\|Object.freeze' 81a56990 -- src/ test/
  test/resolve/value4-immutable-resolve.test.ts:43  expect(Object.isFrozen(resolved)).toBe(true);
  test/resolve/value4-immutable-resolve.test.ts:67  expect(Object.isFrozen(resolved)).toBe(true);
  …
```

Re-run verbatim by this seat at `81a56990`, the command returns **three** assertions, not two:

```
test/resolve/value4-immutable-resolve.test.ts:43:        expect(Object.isFrozen(resolved)).toBe(true);
test/resolve/value4-immutable-resolve.test.ts:67:        expect(Object.isFrozen(resolved)).toBe(true);
test/resolve/value4-immutable-resolve.test.ts:84:        expect(Object.isFrozen(resolved)).toBe(true);
```

The prose repeats the truncation — *"`Object.isFrozen(resolved) === true` at `:43` and `:67`"* — and G-W2-6's falsifier names the same two. A pasted output that omits a matching line is the LAW-A/LAW-B failure mode one level in: the census is derived, then edited. **This is the only pasted output in the file that fails to reproduce**, which is what makes it worth a MAJOR rather than a footnote — every other census in the file survives re-derivation exactly.

### D-3 · MAJOR — §Excluded re-asserts, as fact, the lexical importer number §Carry F1 retired; and §Cross-edges ships it to KF.W4 as "the corrected denominator"

§Carry F1's round-2 re-measurement table is unambiguous:

| quantity | value |
|---|--:|
| statements not lexically beginning `import type` | **15** — *"the round-1 figure — retained, and declared **non-operative**"* |
| files with ≥1 runtime (value-position) specifier | **13** |

§Excluded then writes: *"27 `src/` files name the subpath at origin/master (this seat's count); **only 15 carry a runtime statement** and only 10 touch the parse surface."* That sentence is false by the file's own measurement — the 15 includes `resolve/element-resolve.ts:24` and `engine/css/animation.ts:11-14`, both inline-`type` with **no runtime edge**, which F1 names explicitly. And §Cross-edges compounds it: *"**Owed to KF.W4**: the corrected **21-site / 15-importer** denominator, so the graph gate is authored against a real number."* The wave hands a sibling, as its deliverable, the number it has itself declared non-operative — in the one clause whose stated purpose is that W4's graph gate be *"authored against a real number."* Re-measured this seat: **13** runtime importer modules, 25 runtime specifiers.

### D-4 · MAJOR — "70 accounted by id" rests on an unenumerated 28

The verb table and §Provenance both assert **"70 accounted by id"**. Enumerated by banked id in the file: the **19** of round 1 (parenthesised: R-1b's four, the KSC pair, the nine negatives, the two easing cells, the CubeScene residual, the SquareScene annotation), the **15** of round 2 (**X1–X15**, tabled), the **8** of round 3 (**Y1–Y8**, tabled) — **42**. The base **28 "carried at authoring" is enumerated nowhere**: it carries no parenthetical, no table, no id list, at any of the four rounds. It is a figure inherited from the drafting seat across three repairs, in a file whose entire round-3 finding is that *"a register measured over a sample may not be published as a closure claim"* and whose §Excluded rule now reads *"a record leaves this register only on a stated reading of its cells."* The same discipline is owed to the cells that **enter**. Until the 28 are listed, 40% of the routed denominator is un-auditable and the next pass cannot falsify it by construction.

### D-5 · MAJOR — the "only executed measurement of a value.js easing entry" claim is refuted twice, once by this file's own round-3 adoption

§Carry F0's KF-ET-2 cell asserts: *"**This is the census's only executed measurement of a value.js *easing* entry against real kf inputs**, and it is the empirical form of KF-CB-33's warning."*

Two refutations, both at the corpus bytes:

1. **This file's own row 17 (Y1), adopted this round**, quotes the ruled mechanism: *"`steppedEase(1,'jump-none') → **step_count_invalid**` (**value.js is spec-correct** — CSS requires ≥2 for jump-none)"* ⟨kf-EasingScene:29⟩ — an executed measurement of a value.js easing entry against a real kf input (the demo seeds `steps: 1` at `EasingSidebar :106-110`).
2. **kf-EasingTarget's own superlative 12** ⟨`:119`, escape **Z5**⟩: *"`easing("step-start"/"step-end"/"steps"/"cubic-bezier")` all return `easing_name_unknown` from value.js 4.0.0 (**probed**)"* — in the same record as KF-ET-2, four lines of measurement.

A superlative left standing beside an adoption that contradicts it is the round-2 failure (KAD-10 named-then-dropped) inverted: the row was added and the sentence it falsifies was not re-read.

### D-6 · MAJOR — the BH-relay deliverable attributes to the F0 matrix a measurement the F0 matrix does not contain

§Excluded's BH-relay block states the wave's owed contribution: *"**What this wave owes the relay is the census datum both asks turn on** — **the F0 matrix's executed reading that value.js is spec-correct at both seams** (`step_count_invalid` is CSS-conformant; `color-mix()` returns a Result, not a throw), so the producer-side question is *how a Result is unwrapped*, never *whether the parser is wrong*."*

Re-executed cell-for-cell by this seat, the F0 matrix contains **no `steppedEase` probe, no `steps(1, jump-none)` input row, and no `step_count_invalid` reading**. Its inputs are `oklch()`/`rgb()`/`calc()`/`steps()`/`steps(2, end)`/`color-mix(…)`/`var(--x)`/`oklch(0.7 0.1 200)` and the non-string arm; its entries are `parseCssColor`/`parseCssValues`/`parseCssScalar`/`parseTimingFunction`/`parseKeyframeSelector`/`parseStylesheet`. `grep -c steppedEase KF-W2.md` → **1**, inside the Y1 quotation. The `step_count_invalid` reading is **kf-EasingScene's adjudicating seat's** banked measurement, not this wave's. Half the deliverable is real (`color-mix()` → `ok:false [css_syntax]`, re-verified); the other half is a witness this wave does not hold, offered to a producer relay as its own. The cure is one line — attribute the `steppedEase` reading to KF-ES-3's bank and, if the wave wants it as its own, run it (it is one node call against the installed dist).

### D-7 · MAJOR — ESCAPE Z1: `KF-KE-2` is absent from the file entirely

See §2a. `grep -c 'KF-KE-2' KF-W2.md` → **0** (`KF-KE-3`, `KF-KE-46`, `KF-KE-54` are all present). The file books **KC-2** ⟨kf-KeyframeCardList⟩ as Y2 and cites `KeyframesEditor.vue:40-47` as its seam, while the id banked **at kf-KeyframesEditor for that same write** — with a third limb that is an executed `parseKeyframeSelector` probe over the field's declared domain — is neither adopted nor declared as a fold. M-25 dedupes **by identity, stated**; an unstated dedupe is indistinguishable from a drop.

### D-8 · MAJOR — ESCAPE Z2: the round-trip fidelity gap at the demo's grammar adapter, cited affirmatively and un-qualified

See §2a. Compounding: §Bounds's census cell presents `parseAnimationCSS.ts` as the virtue — *"the **single-grammar-authority invariant already stated in the tree**, and the demo-side statement of exactly what this wave publishes on the `src/` side"* — quoting its `:22-24` docblock. The bank routes, from a record this file carries two cells from, *"the `parseAnimationCSS.ts` per-stop timing-function **drop**"* ⟨kf-ChannelOptions:154⟩, and `KF-W5 §Carry Arm B · B-16` books it with an **undecided locus** whose demo arm this wave's own 58-line read resolves. Citing a module's invariant comment as a model while the bank records that module dropping a parsed sub-value is an M-25 qualifier drop against a cell used **affirmatively** — the direction this file's own §Carry F2 rule (comments beside changed mechanisms) exists to police.

### D-9 · MAJOR — ESCAPE Z3: the corpus's only non-CSS-character ingress into the grammar adapter is unbooked

See §2a. G-W2-5's third clause turns on the fuzz corpus being *"extended to the malformed class"* because `grammar-fuzz.test.ts` *"generates random **VALID** @keyframes fragments from MODEL grammars"* and is *"**structurally incapable** of producing `oklch()`"*. `KF-KC-17`'s U+00A0 is the corpus's one banked, traced, in-tree instance of a malformed character crossing into `parseAnimationCSS` — the second member of the malformed class the gate is being built for — and the record contributes only its negative.

### D-10 · MINOR — ESCAPE Z4: the Result-API funnel exemplar

See §2a. F3's positive block was completed this round on the argument that X15 measures an **engine API** while the register's subject is a **parse result**. `requireEasing` ⟨kf-EasingScene:135⟩ is a *single named funnel over the Result API* with *source-tagged throws*, carrying the banked KF-ET-28 note that *"the funnel throws where the render path needed degrade"* — simultaneously the positive shape and the negative consequence, in the record Y1 came from.

### D-11 · MINOR — ESCAPES Z5 · Z6 · Z7: three executed value.js entry measurements in records the file already carries

See §2a. All three are *executed* readings of value.js entries against real kf inputs — the method this file elevates (S-C2, C's S★-3, its own F0) — and each sits in a record from which the file books one or more cells. Z7 additionally carries a do-not-re-probe lock in the bank's own words (*"Recorded so no repair chases a phantom parser behaviour"*), which is exactly the lock class G-W2-5's negative register exists to preserve.

### D-12 · MINOR — the phantom `KF-W4 §Rows` survives inside the round-3 ledger that struck it

F3 row 17 corrects the anchor loudly: *"'KF-W4 §Rows' names no heading, and KF-W4 carries TWO numbered tables whose `row 8` both resolve … The one meant here is the CARRY table's."* The file's own round-3 ledger, item (ii), then writes: *"**Y1 KF-ES-3** (F3 row 17; … cross-cited to `KF-W9 §H`'s escalation-trigger register and **`KF-W4 §Rows` row 8's** cure-lock fold)."* Verified this seat: KF-W4's headings are `§0 · §Bounds · §Carry · §Gates · §Sequencing · §Excluded · §Cadence`; `grep -n '^## ' KF-W4.md` returns no `§Rows`. The correction did not sweep its own summary.

### D-13 · MINOR — the frozen-site count is off by one against the file's own pasted list

G-W2-6: *"**kf's own resolve lane PRESERVES it at 22 sites** (`resolve/core.ts`, `conditional.ts`, `browser.ts`, `function.ts`, `frame/interp-slot.ts:291`)"*. The pasted line list immediately above it is `core.ts` 6 + `conditional.ts` 9 + `browser.ts` 4 + `function.ts` 3 + `interp-slot.ts` 1 = **23**. Re-run counts confirm: `git grep -c 'isFrozen\|Object.freeze' 81a56990 -- src/` → `interp-slot 1 · browser 4 · conditional 9 · core 6 · function 3` = **23 lines** (more, if `Object.freeze` *calls* are counted, since `core.ts:15` and `function.ts:40` each carry two). The number stated is smaller than the paste under either reading.

### D-14 · MINOR — G-W2-2b is not born-RED; its assertion is TRUE at the substrate

*Assertion*: *"the demo-side set is **CENSUSED AND FROZEN at six modules / eight runtime specifiers**, and no demo module gains a new runtime grammar/collector edge while this wave is open."* Re-measured this seat at `81a56990`: 7 files name the subpath, one type-only, **6 runtime modules / 8 runtime specifiers** — the assertion holds today. The stated RED ground is *"covered by no gate in this wave until this round"*, which is a fact about the spec, not the tree; and *"this wave opens no demo call site"*, so nothing this wave does can move it. The clause can only red if a **third party** adds an import while the wave is open. Under L-19 that is a **monitor**, not a born-RED gate, and the §Gates header's *"Nine … all born-RED"* over-counts.

### D-15 · MINOR — G-W2-8's measurable arm is declared un-armable

*"The count-gate (3 → 1) **arms if-and-only-if W8 has not preceded**, which **under the declared order it will have**."* Under OP-6's own ruling (KF.W8 precedes, RULINGS R-16, reciprocated at `KF-W8.md:173`/`:361` — both verified), the gate's only measurable assertion never arms; what remains is a contract statement with no count. The spec reasons its way here honestly and the ordering fix was right, but the consequence is unstated: **eight gates carry an armed assertion, not nine.**

### D-16 · MINOR — the Tier-C anchor for `formatCSSKeyframeString` and its own LAW-A census disagree by one line

§Bounds and G-W2-3's witness pin the member at **`:135-144`**; census A-2 pins the declaration at **`:136`** (`export function formatCSSKeyframeString(keyframe: string) {`). At the frontier `:135` is blank. Trivial in itself, and named only because this is the **one member whose row was re-cut on that census** — the row that now says *"what dies is the REGEX BODY (`:135-144`), not the export"*, where the exact span is the instruction.

### D-17 · MINOR — LAW B is honoured at the struck sentences and slips at the denominator

The seven LAW-B conversions are real and correct (each cites `PASS-3/KF-W2-CHECK.md` by path and date **and states what it found, defects included** — the hardest half of the law, done). But §Provenance still says, in the file's own voice, *"the routed denominator is the registry's — **70 routed cells accounted by id as of repair round 3**"*, and the Goal criterion says *"the integer is the registry's **floor**"* before citing. A routed-total is a completeness claim about a set the file is the enumeration of — the same class as the sentences that were struck. It is a MINOR rather than a MAJOR only because the citation to the check artifact sits beside it in both places.

---

## §4 AXIS VERDICTS

| axis | verdict | ground |
|---|---|---|
| **(1) ID-KEYED CENSUS by record** | **DEFECTIVE** | 77 routed · 70 booked · **7 escaped** (D-7 … D-11); and **28 of the 70 are enumerated nowhere** (D-4). Six of seven escapes are in AUDITED records; four are in records the file books multiple cells from |
| **(2) ANCHOR + SUBJECT-IDENTITY** | **DEFECTIVE** | **All 60 record anchors resolve and mention their subject; the full R3-4 sweep reproduces 16/16.** The failure is at the **sibling-spec** layer: the KF-W10 receipt quotes a struck sentence and claims fresh verification (D-1); `KF-W4 §Rows` survives in the ledger (D-12) |
| **(3) M-25 depth** | **DEFECTIVE** | Carried rows are excellent — every lock, rider, dissent, cure-shape lock and grade verified. Dropped: W10's vehicle correction (D-1), KF-KE-2's identity (D-7), the `parseAnimationCSS` drop beside its own affirmative citation (D-8), and a superlative left standing against its own new adoption (D-5) |
| **(4) GATES / LAW A / LAW B** | **DEFECTIVE** | **LAW A is the strongest work in the file — 5/5 censuses reproduce byte-for-byte and two genuinely refute prior prose.** Against that: one trimmed paste (D-2), one gate born-GREEN (D-14), one gate's arm declared un-armable (D-15), and an internal denominator contradiction that reaches a sibling's gate (D-3) |
| **(5) POSTURE** | **DEFECTIVE** | W4 head honoured and its `check` re-cut **composes** ✓ · W3 gated-unscheduled ✓ · KF-AV-28 carried with all three bank anchors subject-verified and its one governed row correctly enumerated ✓ · W10-seam five-edge table: **vacuous here** (owners are W0/W3/W7/W9/W10) ✓ · **O-21: FAILS** — the file cites a letter measured as **departed** as a live relay coordinate at three sites (D-1) |

---

## §5 WHAT PASS 5 SHOULD MEASURE

1. **Enumerate the 28.** The routed denominator is 40% un-auditable until they are listed by banked id (D-4). Until then no census claim over this file can be falsified from the outside.
2. **Re-read the records the file is already inside.** Round 3 cured the *instrument*; the residue is *re-entry*. Four of seven escapes sit in records the file books two-to-four cells from. The next sweep should be **record-major, not directive-major**: for each of the 58, read every cell and dispose of it, including in records already partly adopted.
3. **Re-verify every cross-spec quotation at the sibling's CURRENT bytes**, not at its round-N bytes. D-1 is the whole argument: sibling specs are being repaired concurrently, and a quotation of a sentence a sibling struck in the *same round* is worse than a stale line number — it re-imports an error the constellation had already cured.
4. **Check every pasted command output by re-running it**, not by reading it. D-2 was invisible to three passes because the paste *looked* like a census.

---

*Authored fresh, 2026-08-28. Nothing inherited: every count, byte, command output and quotation above was derived by this seat. keyframes.js read-only at `origin/master 81a56990` via `git show`/`git grep`/`git ls-tree`; the sole execution was a read-only node probe of the installed `@mkbabb/value.js@4.0.0` dist. No product source opened for writing; this file is the only file written.*
