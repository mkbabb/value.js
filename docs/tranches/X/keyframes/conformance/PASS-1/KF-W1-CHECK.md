# KF-W1 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 1)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W1.md` (48,834 B, 254 L, committed `acff6265`, born 2026-08-28 11:44:07)
**Corpus authority**: the **58** `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → **58**)
**Seat**: fresh adversarial checker, `claude-opus-5[1m]`. Every receipt below was re-executed by this seat this session; nothing is inherited from the spec.
**Method**: the X·P terminal method — ID-KEYED CENSUS by exhaustive routing-target extraction, not by sampling.

**VERDICT: DEFECTIVE** — census CLEAN (0 escapes, 0 inventions, gate witnesses byte-exact), but **three MAJOR** defects in the born-RED tally, the reciprocity measurement, and an unreceipted load-bearing count.

---

## §0 Headline

The spec's central empirical claim — **C-14 `KF-MAIL-∅`: "Zero adjudicated registry rows target this wave"** — is **TRUE and independently re-derived here**. The corpus routes **zero** rows to census-taxonomy `KF.W1` (Mail Cure). Every gate witness this seat could execute (11 of 12) reproduces **byte-exact**. The §5a drift table reproduces **exactly** at `keyframes-v-exec` `81a56990`, row for row.

What fails is not the census. It is (1) the **born-RED count**, which is eleven on paper and **ten** at wave-open; (2) the **reciprocity measurement**, which enumerates four siblings and misses the one that declares a *hard blocking* dependency on this wave (`KF-W10`); and (3) a **load-bearing cardinality — "the 16 NO-WAVE-OWNER packets" — that no document in the tree states**, and which two siblings contradict with 15 and 14.

---

## §1 The routing-target vocabulary — exhaustive extraction (the census's ground)

An ID-keyed census over ~2,000 adjudicated rows is only sound if the *target* alphabet is closed first. Four independent extractions, all run over all 58 records this session:

**(a) Every wave-token in the corpus.** `grep -noE 'KF\.W[0-9]+[A-Za-z-]*' kf-*.md | awk -F: '{print $3}' | sort | uniq -c | sort -rn`

```
424 KF.W6   262 KF.W9   252 KF.W0   188 KF.W7   153 KF.W4    62 KF.W5    48 KF.W8
 48 KF.W2-TABS   30 KF.W4-PROSE   23 KF.W2   18 KF.W1-DEP   15 KF.W10   13 KF.W3
 12 KF.W3-SHIM    8 KF.W6-TIMELINE   7 KF.W7-TOKENS   3 KF.W5-PARTIALS
  2 KF.W6-adjacent  1 KF.W7-may-supersede  1 KF.W6-reshell-may-absorb
  1 KF.W3-gated     1 KF.W0-class
```

**Bare `KF.W1` does not appear. Not once, in any record.** The alphabet's 22 members contain `KF.W1-DEP` (18) and `KF.W10` (15) and no `KF.W1`.

**(b) Every arrow-routing.** `grep -ohE '→ \*\*[^*]+\*\*' kf-*.md | sort | uniq -c | sort -rn` → the terminal-disposition alphabet:
`NO-WAVE-OWNER` 219 · `KFED-UNIT` 51 · `KF.W6` 44 · `EDITOR-UNIT` 39 · `KF.W9` 37 · `CARD-UNIT` 30 · `KF.W4` 15 · `KF.W8` 11 · `KF.W5` 11 · `glass-ui BH relay` 9 · `KF.W0 §B-12` 5 · `KF.W7` 4 · `KF.W0` 4 · `OPTIONS-UNIT` 2 · `GLASS-OWNED` 2 · `GLASS-OWNED — BH relay` 2 · `BH relay letter` 2 · the `fold to …` forms. **`KF.W1` absent.**

**(c) Bare `W1` word-boundary sweep.** `grep -nE '(^|[^0-9A-Za-z.-])W1([^0-9A-Za-z-]|$)' kf-*.md` → **14 hits**, all accounted for:
- **7** are the routing-law preamble naming the census taxonomy *"W0 Substrate Settle · **W1 Mail Cure** · W2 Parse Façade…"* — a *declaration of the wave sketch*, not a row routing (`kf-CopyButton:36` · `kf-EasingScene:33` · `kf-EasingSidebar:32` · `kf-EasingTarget:33` · `kf-KeyframeCard:36` · `kf-KeyframesEditor:36` · `kf-TimingFunctionPanel:34`).
- **6** are keyframes' **own** `docs/tranches/V/DISPOSITIONS.md` **"BUILD W1"** — a third, undeclared `W1` namespace (`kf-CopyButton:15`/`:40` for EE-01; `kf-KeyframesEditor:10`/`:40`/`:51`/`:140` for FE-3 and EE-03). **All three route to `KF.W0`**, explicitly — *"→ **FOLD to EE-01 + KF.W0**"*, *"→ **FOLD to FE-3 + KF.W0**"*, *"→ **FOLD to EE-03 + KF.W0**"*. Nothing escapes; the *declaration* is missing (defect D-5).
- **1** is `kf-KeyframesEditor:10`'s substrate disclosure ("FE-3's BUILD-W1 evidently executed upstream").

**(d) Subject-matter sweep** — the mail wave's payload, in case a row routes by mechanism rather than by number. Searched across all 58: `O-8\b` · `O-11\b` · `I-26` · `mail cure` · `INBOX\.md` · `coordination/` · `addendum` · `amend, do not re-send` · `VALUEJS-INBOUND` · `parser-totality` · `library-band-r1` · `sampleBezier` · `D-GAP-6` · `lerpArray` · `parseStylesheet`.
- **`I-26` → 0 hits corpus-wide.** No record cites the mail row.
- **`sampleBezier` / `D-GAP-6` / `lerpArray` / `parseStylesheet` → 0 hits corpus-wide.** The addendum's payload items (b) and (d) have **no registry footprint at all** — they are census/lane-docs objects, exactly as the spec states.
- Every `O-8` / `O-11` hit is the substring `KF-CO-8` / `KF-CO-11` (kf-ChannelOptions, kf-LayerConfigPanel) — the OPTIONS-UNIT switch/clobber rows. **Zero references to the letters.**
- Mail-shaped dispositions that DO exist all route elsewhere and are correctly excluded by the spec: `kf-AnimationVisualizer:143` ("the next value.js/keyframes session with **mail duty** should relay: (a) `useTouchGate` ships a behavior contract with no styling contract … (b) the standard-variant Slider renders no thumb") → **glass-ui BH relay / SS-6** — and KF-W1 cross-edge 7 names *these two items verbatim* as SS-6-riding, never here. `kf-EasingTarget:37` (KF-ET-1's lossless-serializer letter) → **KF.W5**. `kf-CopyButton:77` (KF-CB-29 library letter) → **KF.W4**.

**Alphabet closed. `KF.W1` ∉ the corpus's terminal-disposition vocabulary.**

---

## §2 ID-KEYED CENSUS — id for id

### 2.1 Records carrying a `KF.W1`-form token (5 of 58)

Per-record token counts, re-executed: `for f in kf-*.md; do grep -c 'KF\.W1-DEP' "$f"; grep -oE 'KF\.W1([^0-9A-Za-z-]|$)' "$f" | wc -l; done`

| record | `KF.W1-DEP` | bare `KF.W1` | line anchors |
|---|---|---|---|
| `kf-AnimationControlsGroup.md` | **4** | 0 | `:17` `:28` `:47` `:135` |
| `kf-ChannelControls.md` | **4** | 0 | `:17` `:56` `:142` `:155` |
| `kf-ControlsPaneWrapper.md` | **3** | 0 | `:6` `:60` `:149` |
| `kf-DemoGlobalChrome.md` | **4** | 0 | `:17` `:43` `:44` `:130` |
| `kf-KfPillTabs.md` | **3** | 0 | `:19` `:46` `:122` |
| **the other 53 records** | **0** | **0** | — |
| **TOTAL** | **18** | **0** | |

### 2.2 The routed rows, id for id (the complete set)

Six adjudicated rows carry a `KF.W1`-form target in their **terminal disposition**. Every one is the *same identity* — **census F-1**, the phantom `@mkbabb/glass-ui` dependency.

| # | record | **row id (corpus spelling)** | anchor | terminal disposition (verbatim fragment) | spec treatment | state |
|---|---|---|---|---|---|---|
| R-1 | kf-AnimationControlsGroup | **`F-1 severity at this component`** (D-axis cell) | `:28` | *"**FOLD to census F-1 (KF.W1-DEP) at MAJOR — identity guard, not re-booked**"* + rider `useControlsKeyboardShortcuts.ts:1` sole binding site of all 18 shortcuts | C-13 fold-identity + §8 exclusion row 5 | **BOOKED (exclusion-with-reason)** |
| R-2 | kf-AnimationControlsGroup | **`L-3 / C-1`** | `:47` | *"MAJOR · **FOLD → census F-1 (KF.W1-DEP)**"*; riders `.vue:124`, `.vue:126`, `useControlsKeyboardShortcuts.ts:1` | C-13 (rider named verbatim in the spec) + §8 row 5 | **BOOKED** |
| R-3 | kf-ChannelControls | **`F-1 / L-20 / D-0`** | `:56` | *"MAJOR · **FOLD → census F-1 (KF.W1-DEP). Identity guard — booked once at the census, never per component.**"*; rider `ChannelControls.vue:219` first failing import on clean `npm ci` | C-13 (rider named verbatim) + §8 row 5 | **BOOKED** |
| R-4 | kf-ControlsPaneWrapper | **`B-1 / C-1`** | `:60` | *"**FOLD → census F-1 (KF.W1-DEP), MAJOR at the bank.**"*; rider `.vue:166` sole `/drawer` consumer | C-13 (rider named verbatim) + §8 row 5 | **BOOKED** |
| R-5 | kf-DemoGlobalChrome | **`L-8` (F-1 exposure)** | `:44` | *"**FOLD → census F-1 (KF.W1-DEP) — identity guard, not re-booked.**"*; riders = four toast utility classes; **dissent rider `a59d3a22`** | C-13 (rider AND the `a59d3a22` dissent carried verbatim, routed to KF.W0's re-measurement) + §8 row 5 | **BOOKED** |
| R-6 | kf-KfPillTabs | **`F-1`** | `:46` | *"MAJOR · **FOLD → census F-1 (KF.W1-DEP)**, banked with component riders"*; rider = one class + eight custom properties | C-13 (rider named verbatim) + §8 row 5 | **BOOKED** |

**Riders (not rows, carried anyway):** `kf-ChannelControls:142` (residue item 11, F-1 reproducibility precondition) and `kf-DemoGlobalChrome:43` rider (i) ("sequencing on census **F-1/KF.W1-DEP**", attached to the **S-9** toast-swap row whose disposition is *census-S-9-owned*, not KF.W1). Both are ridden by C-13's fold; neither is a routing.

### 2.3 Rows routed to KF-W1 **proper** (census-taxonomy Mail Cure)

**∅ — the empty set.** Confirmed four ways (§1 (a)–(d)). This seat re-derives the spec's C-14 independently.

The spec's three legs of C-14, re-verified:
- **(i)** *"no `kf-*.md` routes a row to census-taxonomy KF.W1"* — **TRUE** (§1a: bare `KF.W1` = 0 occurrences).
- **(ii)** *"the intake CARRY table's kf targets … none targets KF.W1"* — **TRUE.** `grep -oE 'KF\.W[0-9]+' INTAKE-ADJUDICATION-2026-08-03.md | sort | uniq -c` → `KF.W0 ×1 · KF.W4 ×3 · KF.W5 ×2 · KF.W9 ×2 · KF.W10 ×4`. **Zero `KF.W1`.** §3's grouped blocks re-read at `:139-166`: KF.W0 = `X-1 · B10-9 · B19-10(pin half) · B19-11 · B20-6 · B21-7(3 of 5 pins)` ✓ exact; KF.W5 = `X-4 · B10-21` ✓ exact; KF.W9 = `B18-26` ✓ exact; KF.W10 = `B18-12 · B18-13 · B18-14 · B18-23 + B19-14 + B20-14 · B18-27` ✓ exact. *(KF.W4 transcription slip — defect D-4.)*
- **(iii)** *"none of the 16 NO-WAVE-OWNER packets proposes KF.W1 as a home"* — **the negative is TRUE; the cardinality is UNRECEIPTED** (defect D-3).

### 2.4 Census tally

| quantity | value |
|---|---|
| adjudicated records swept | **58 / 58** |
| records carrying a `KF.W1`-form token | **5** |
| records with zero `KF.W1`-form tokens | **53** |
| rows routed to census-taxonomy **KF.W1 (Mail Cure)** | **0** |
| rows routed to the collided string **`KF.W1-DEP`** | **6** |
| of those, **BOOKED** by the spec (as fold-identity C-13 + §8 exclusion-with-reason) | **6** |
| **ESCAPED** (routed but not carried as row / fold-identity / exclusion) | **0** |
| riders carried without being rows | 2 |

**No escape by bytes. The census is CLEAN.**

---

## §3 NO INVENTION — provenance trace for every carried row (M-25)

Fourteen carry rows, C-1..C-14. Each traced to source this seat re-opened:

| row | claimed source | this seat's verification | verdict |
|---|---|---|---|
| **C-1** I-26 | `INBOX.md:90` | `:90` = *"**ROWED 2026-08-03**: a letter that lands untracked in a frozen checkout is NOT delivered — the path, not the content, was the defect. Cure owed = ONE amendment-addendum … sketched as KF.W1 in the census"* | **EXACT** |
| **C-2** DOCS §6 row 17 | `lane-docs.md:381` | `:381` = *"**O-11 §A2 undercount** … §A3 enumerated only 3 reachable sites and did not name keyframes' `parseStylesheet` call sites … **NEW — the exposure letter is INCOMPLETE.**"* | **EXACT** |
| **C-3** DOCS §6 row 1 | `lane-docs.md:365` | `:365` = *"**Delivery-vehicle decision** … The asked-for decision has been pre-empted by our own ruling; the letter must be closed honestly, not left dangling"* — the spec's quoted lock, **verbatim** | **EXACT** |
| **C-4** DOCS §6 row 11 | `lane-docs.md:375` | `:375` = *"**CONVERGED — the conditional resolves to "not adopted".**"* — **verbatim** | **EXACT** |
| **C-5** SCH-5 | `CENSUS §0` / `lane-docs §0/§6` | drift class confirmed at bytes (§5 below); the 4 renamed paths reproduce | **EXACT** |
| **C-6** SCH-4 | O-11 `:52`, `:82` | `:52` = *"(61 import statements total"* · `:82` = *"across 61 of your sites"* | **EXACT** |
| **C-7** DOCS §6 rows 2–10 + 14 | `lane-docs §6` | `:366` row 2 (`lerpArray` ask + *"cannot reach them until the pin moves"* — the spec's §8 quote, verbatim) · `:378` row 14 (IN-ATLAS-3 `TimingFunction` fence, *"STANDING; verified held"*) | **EXACT** |
| **C-8** DOCS §6 row 16 | `lane-docs.md:380` | `:380` = *"**OPEN on their side.** *Blocked from our side by lane law and by their sacred-checkout rule — value.js must NOT perform it*"* — the HARD NEGATIVE, verbatim | **EXACT** |
| **C-9** `KF-MAIL-PATH` | **minted** | ground = `INBOX.md:13-14`, re-read verbatim: *"`../keyframes.js/docs/tranches/V/coordination/` — the keyframes exchange (their `<SENDER>-INBOUND-*` grammar; the tranche root is NOT a mail path)"* | **minted, grounded** |
| **C-10** `KF-MAIL-LEDGER` | **minted** | ground = `INBOX.md:90` ROWED + `grep -oE '^\| O-[0-9]+' … | tail -1` → **O-19** | **minted, grounded** |
| **C-11** `KF-MAIL-COPY` | **minted** | ground = `find … -name '*parser-totality-exposure*' -o -name '*library-band-r1-widened*'` → **0 hits**; sole copies untracked in the sacred checkout | **minted, grounded** |
| **C-12** `KF-MAIL-MARK` | **minted** | ground = `INBOUND-LEDGER.md` at `81a56990` → 9 rows, no `IN-VALUE-3/4` | **minted, grounded** |
| **C-13** `KF-MAIL-NS` | **minted** | ground = the 18 `KF.W1-DEP` occurrences (§2.1) | **minted, grounded — but incomplete (D-5)** |
| **C-14** `KF-MAIL-∅` | **minted** | ground = §2.3 (i)/(ii) TRUE; (iii) unreceipted (D-3) | **minted, grounded except leg (iii)** |

**Invention count: 0.** Eight rows trace to banked ids (`I-26`, `SCH-4`, `SCH-5`, `DOCS §6` rows 1/2–10/11/14/16/17); six are **declared minted** and each names a ground this seat re-opened at the bytes. No row appears from nowhere.

**M-25 transcription-only check — PASSES.** Cure-shape locks are **carried, not cited**: C-1 *"Amend, do not re-send"* + the ANTI-STALENESS lock; C-2's *"names only the three missed sites — LIB §4.1's 13-site Tier-A inventory is KF.W2's object"*; C-3's HARD NEGATIVE (never re-asked, no cut date); C-7's *"no re-ask, no re-scope, no severity change, no new obligation"* + anti-rename on `K1–K4`/`G-L7a–d`; C-9's SIZING LOCK (two lines, no tooling); C-10's ORDERING lock (void ahead of G-KF1-1); C-11's SEQ-LOCK + verbatim-retention lock; C-12's HARD NON-GATING lock; C-14's L-19 lock. **Sequencing riders carried**: `.a→.b→.c` hard order with the mechanism stated (§7); C-9/C-10 same-motion lock; the LP-1 / MbabbMenu MUST-CARRY / TD-1+TD-2-bundle / kf-SquareScene test-obligation locks restated in transit at cross-edge 9. **Dissents carried**: `kf-DemoGlobalChrome.md:44`'s `a59d3a22` rider is carried *as a dissent* into C-13 with its routing to KF.W0's re-measurement (not resolved, not dropped); C-4's *"Recorded asymmetry (not a dissent)"*; the KF-W0 reciprocity **conflict** recorded rather than silently reconciled (cross-edge 2).

---

## §4 GATES — born-RED audit + L-19 (proof-scripts presumed contrivance)

Twelve gates. §1's tally: *"**Eleven are born-RED** with a named, literal witness; G-KF1-12 is a stay-GREEN INVARIANT."*

Every witness re-executed by this seat, 2026-08-28:

| gate | witness re-executed | result |
|---|---|---|
| **G-KF1-1** | `ls keyframes-v-exec/docs/tranches/V/coordination/` | **9 files + `vnext/`** — ATLAS ×2, GLASS ×2, `INBOUND-LEDGER.md`, SPEEDTEST ×1, VALUEJS-2026-07-17 ×3. **No addendum, no O-8, no O-11.** HEAD `81a56990`. **RED ✓ EXACT** |
| **G-KF1-2** | `git cat-file -e HEAD:src/animation/compile/value-ast.ts` · `…/easing/easing-registry.ts` · `…/emit/backward.ts` | all three **ABSENT** ✓. `git grep -n parseCssScalar HEAD -- src/animation/resolve/browser.ts` → **`:162`** (packet says `:165`) ✓. `git grep -n '"@mkbabb/value.js"' HEAD -- package.json` → **`:70`** (packet says `:69`) ✓. **RED ✓ EXACT** |
| **G-KF1-3** | `git grep -n 'parseStylesheet' HEAD -- src` | call sites **`compile/adapter.ts:222`** · **`scroll/grammar.ts:109`** · **`validate.ts:182`**; imports **`:7`** / **`:37`** / **`:47`** — all six ✓. O-11 `:34` A2 NEW CLASS ✓, `:40` THROW ✓, `:52-63` names 0 of 3 ✓. **RED ✓ EXACT** |
| **G-KF1-4** | `git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' HEAD -- src \| sort \| uniq -c` | `/css` **29** · `/value` **16** · `/color` **7** · `/math` **5** · `/easing` **3** · `/transform` **2** = **62** ✓ *(spec's split reproduces digit for digit)*. **RED ✓ EXACT** |
| **G-KF1-5** | O-8 `:100-102` + `CARRY-CUT-LEDGER.md:186` | `:100-102` = *"**Decision we need from you:** … We will not cut a version into your dependency graph without your answer."* ✓. `:186` = CC-084, *"no emergency 4.0.1 — ruled"* ✓. **RED ✓ EXACT** |
| **G-KF1-6** | `INBOX.md:45` + `library-band.md:205` | `:45` = *"they adopt `sampleBezier` only if a future 4.1 ships it"* ✓. `:205` = *"DECLINE — `sampleBezier`"* ✓. **RED ✓ EXACT** |
| **G-KF1-7** | `INBOX.md:90` + max-O grep | `:90` = *"**ROWED 2026-08-03**"* ✓; max outbound = **O-19** ✓. **RED ✓ EXACT** |
| **G-KF1-8** | `grep -n 'keyframes.js/docs/tranches' INBOX.md` | `:13-14`, verbatim as quoted ✓. Sacred checkout: `git rev-parse --short=8 HEAD` → **`8281638c`** ✓; `git rev-list --left-right --count origin/master...master` → **`41  1`** ✓. **RED ✓ EXACT** |
| **G-KF1-9** | `find … -name '*parser-totality-exposure*' -o -name '*library-band-r1-widened*'` | **0 hits** ✓. Retained set = **7 files, 07-19 ×1 + 07-20 ×6, no 07-21** ✓ — the spec's §9 correction to the CARRY is itself **correct**. **RED ✓ EXACT** |
| **G-KF1-10** | `git show HEAD:…/INBOUND-LEDGER.md \| grep -oE 'IN-[A-Z]+-[0-9]+' \| sort -u` | **9 rows**: IN-ATLAS-1..5, IN-GLASS-1..2, IN-VALUE-1..2 ✓; **no IN-VALUE-3/4** ✓. Silence: newest kf-authored letter in value's tree = `keyframes-inbox-2026-07-18-vnext-*` → **41 days** at 2026-08-28 ✓; O-8 **35** ✓; O-11 **32** ✓. **RED ✓ EXACT** |
| **G-KF1-11** | `test -e …/KF-W1.md` | **FILE EXISTS** (48,834 B, `acff6265`). **NOT RED — see D-2.** |
| **G-KF1-12** | `git status --porcelain \| wc -l` in `/Users/mkbabb/Programming/keyframes.js` | **252** ✓; `EXECUTION-HANDOFF.md:13-18` = *"no mutating git, no npm operations there, ever"* ✓; packet bytes **7,064** / **15,633**, mtimes **Jul 24 16:41** / **Jul 27 12:27** ✓. Correctly labelled INVARIANT, **not** dressed as born-RED — the right treatment. **GREEN-INVARIANT ✓ EXACT** |

**§5a drift table — re-executed row for row at `81a56990`:** row 1 `compile/value/compile.ts:32` = `const parsed = parseCssValues(value);` ✓ · row 2 `browser.ts:162` ✓ · row 3 `easing/registry.ts:36` = *"Stable identities let the serializer distinguish named curves from closures."* ✓ · row 4 `easing-serialize.ts:71-73` = the `timingFunctionEntries.find(…)?.[0]` reverse-map ✓ · row 5 `emit/backward/` holds exactly `backward.ts, color.ts, index.ts, walk.ts` ✓ · row 9 `package.json:70` = `"@mkbabb/value.js": "4.0.0"` ✓ · row 10 `engine/options.ts:31` = `const parsed = parseCssScalar(raw);` ✓ · row 11 `internal/leaves.ts:28` ✓ byte-identical · row 12 `load-engine.ts:65` ✓ byte-identical · row 13 `emit/css-text.ts:41` ✓ byte-identical · row 14 `test/internal/leaves-parity.test.ts` **PRESENT** ✓ (the one row the spec inherited — it holds). Header falsifier `package.json:77` = `"@mkbabb/glass-ui": "7.0.0",` ✓ exact devDep.

**L-19 — proof-script contrivance: PASSES, affirmatively.** No gate is a script. Every witness is a `git grep` / `git cat-file` / `ls` / `find` against a tree that exists. §8 excludes *"Mail tooling — a routing script, a path linter, a delivery cron"* under an explicit `KISS / L-19` reason, and C-9 carries a **SIZING LOCK** (*"two lines plus one sentence of rationale — not a routing subsystem, not a script, not a linter"*). G-KF1-12's relabelling from born-RED to INVARIANT is the exact anti-contrivance move L-19 asks for. **11 of 12 gates are born-RED with a real, executed witness. The twelfth is not (D-2).**

---

## §5 E-3 + STATUS

| check | result |
|---|---|
| Zero `VERIFIED` stamps | **PASS.** `grep -n 'VERIFIED' KF-W1.md` → exactly 2 hits, both **negative**: `:37` *"VERIFIED \| **NO** \| — stamped only at X·KF's close (KF.W10); no wave stamps VERIFIED at its own close"* and `:195` restating the four-verb block as `VERIFIED=NO`. |
| Status planned everywhere | **PASS.** `:5` `**Status**: **planned**`; the only other status mention (`:195`) quotes it. |
| No execution verbs in current voice | **PASS, one blemish.** §3/§4b are scope statements in infinitive/imperative ("Back-fill", "Author", "Deliver", "Repair"), never past-tense-done. All measurements are stamped as *authoring-time* ("re-measured 2026-08-28 by this fold seat"), which is measurement, not execution. The blemish is `:194` *"turned GREEN by this file's landing"* — a present-perfect execution claim about a gate (D-2). |
| Opens no product source | **PASS, emphatically.** `:17` *"This wave opens **no product source in either repo** — not one `src/` file, not one `.vue`."* §4 Bounds: 5 create/modify paths, all `docs/` + `coordination/`; §4 READ-ONLY blocks name every `src/` path as read-only; §8 excludes *"Any product source in either repo"*. `:19` SACRED-CHECKOUT LAW forbids all writes under `keyframes.js/`. |
| Execution-gate declaration | **PASS.** `:17` *"**EXECUTION IS NOT AUTHORIZED BY THIS FILE.**"* |
| §1 twelve conditions ↔ §6 twelve gates | **PASS.** One-to-one, in order. |

---

## §6 POSTURE AXES

| axis | binding here? | finding |
|---|---|---|
| **KF.W4 = DECLARED SEQUENCING HEAD** | **YES** | `KF-W4.md:193` — *"**This wave is the declared sequencing head of X·KF.** No repair packet and no UNIT may open before **G-KFW4-1**"*. KF-W1 claims a **different** headship — *"the DECLARED MAIL HEAD of X·KF"* (`:39`) — grounded in ⟨COHESION §2 `:76`, re-read verbatim: *"**I-26 mail cure (KF.W1) precedes any kf wave consuming O-8/O-11 obligations.**"*⟩ and ⟨census (c)6⟩. **NO CONFLICT**: the two heads are orthogonal (mail-precedence vs. gate-precedence) and KF-W4 itself reciprocates at `:206` — *"**KF.W1 · Mail Cure \| PRECONDITION on anchor citability**"*. **SQUARES.** |
| **KF.W3 GATED via PLAW-BIND, never scheduled** | **YES** | KF-W1 names it *"KF.W3 (Parser Consumption, **GATED**)"* (cross-edge 1) and **schedules nothing**: cross-edge 6 declares X·P a **NON-EDGE** — *"This wave carries no parser schedule … the letter states the ruling (CC-084) and nothing about timing. Direct parse-that→consumer promises are forbidden."* C-3 adds **"No cut date is promised"**; §8 excludes *"A cut date for 4.1"* citing OWNER-GATED PLAW-BIND. Reciprocated at `KF-W3.md:209` — *"**KF.W1 · Mail Cure (O-8/O-11) + E13 \| DEPENDS ON**"*. **SQUARES.** |
| **KF.W7 carries the KF-AV-28 supersession rider** | **weakly** | `KF-W7.md:7` holds the rider as *"the wave's defining lock"* with the PR-CAUTION counter-evidence lock. KF-W1 touches KF.W7 only at cross-edge 9 (**HOMES NONE**) and cross-edge 7 (glass rows ride SS-6 *"from their own waves"*). It asserts nothing about KF.W7's roster and cannot disturb the rider. **NO CONFLICT.** |
| **KF.W6 must square with its 424-row CARRY** | **weakly** | `carry/KF-W6-CARRY.md` (199,055 B) is W6's; KF-W1 references KF.W6 only as a **HOMES-NONE** routing target (cross-edge 9) and in §8's packet exclusion. It books zero W6 rows and makes no CARRY claim. **NO CONFLICT.** |
| **Namespace hygiene (self-imposed, `:11-15`)** | **YES** | Partially fails — see D-5, D-6, D-7. |
| **Reciprocity (self-imposed, `:39` / §9 item 5)** | **YES** | **FAILS — D-1.** |

---

## §7 DEFECT REGISTER

### D-1 · MAJOR — the reciprocity measurement misses `KF-W10`, the one sibling that hard-blocks on this wave

`KF-W1.md:39` claims *"Reciprocity, **measured 2026-08-28 against the authored siblings**"* and enumerates **KF-W4 · KF-W3 · KF-W2** only. §9 item 5 repeats it: *"the CARRY's cross-edges said KF.W2/W3/W4 and KF.W0 'must reciprocate' when authored; all four are now authored."* Cross-edge 1 covers KF.W2/W3/W4 *"and every **future** kf wave"*.

But `KF-W10.md` was **on disk at authoring** (born `11:43:22`, 44 s before KF-W1; committed one commit earlier at `b6e09ed4`, whose message names `W10` among the 7 banked specs) — and it declares **three** explicit dependencies on this wave:

- `KF-W10.md:16` — *"**Opens after**: **X.KF.W0** …, **X.KF.W1** (Mail Cure — the O-8/O-11 amendment-addendum on an exec-visible path) …"*
- `KF-W10.md:50` — *"**OP-3** \| **KF.W1's O-8/O-11 amendment-addendum is exec-visible.** \| **UNLANDED.** … Terminalizing a ledger whose packets were never delivered records a **false close** (G-6 depends on this, not the reverse)."*
- `KF-W10.md:296` — *"**B. → KF.W1 (Mail Cure, SS-2) — W10 depends.** No coordination terminalization (G-6) before the O-8/O-11 amendment-addendum lands on an exec-visible path."*

Measured: `grep -c 'O-8' KF-W10.md` → **8**; `grep -c 'O-11' KF-W10.md` → **3** — real letter citations, not `KF-CO-8` substrings. So KF.W10 is precisely a *"kf wave consuming O-8/O-11 obligations"*, the class COHESION §2 says this wave precedes. **The self-declared MAIL HEAD omits its hardest downstream consumer from both §1's reciprocity paragraph and §7's ten cross-edges.** The set the spec measured (4) is not the set it enumerated as authored (7: W0·W2·W3·W4·W7·W8·W10) — W7, W8 and W10 went unmeasured, and W10 is the one that mattered.

### D-2 · MAJOR — the born-RED count is eleven on paper, **ten** at wave-open (G-KF1-11 is self-satisfying)

`:28` asserts *"**Eleven are born-RED** with a named, literal witness"*. `:193-195` then states G-KF1-11 as *"**born-RED at authoring; turned GREEN by this file's landing**"* with GREEN condition *"`KF-W1.md` exists under the sibling convention"*. Measured: `KF-W1.md` **exists**, 48,834 B, committed `acff6265`. **The gate is GREEN before the wave can ever open** — it can never fail, and no act inside `.a`/`.b`/`.c` can turn it. §4 Bounds compounds this by listing `…/waves/KF-W1.md` as **create** for a file already on disk.

This is the exact contrivance the spec correctly identifies elsewhere: G-KF1-12 was **relabelled** from born-RED to INVARIANT with the reason stated in-line (*"labelling a stay-green guard as born-RED is the contrivance L-19 forbids"*). The identical treatment was owed to G-KF1-11 and not applied. **Correct tally at wave-open: 10 born-RED · 1 already-GREEN self-satisfied · 1 stay-GREEN invariant.**

### D-3 · MAJOR — "the 16 NO-WAVE-OWNER packets" is an unreceipted, load-bearing cardinality contradicted by two siblings

The number **16** appears three times (`:126` C-14 leg (iii), `:219` cross-edge 9, `:236` §8) and carries a **completeness assertion** — *"none of the 16 NO-WAVE-OWNER packets proposes KF.W1 as a home"* — which is one of only three legs proving C-14's ∅-column finding. It is stated with **no receipt** and no source in the tree states it:

- `KF-W0.md:276` enumerates **15**: *cube · sequence · spring · square · dock-menu · transport · CARD-UNIT · OPTIONS-UNIT · KFED-UNIT · APPLY-UNIT · AXISLINE-UNIT · spring-plot · spring-physics-facet · spring-artifact-truth · drag-seam*.
- `KF-W9.md:208` enumerates a **different 14** — adds *amiga* and *EDITOR-UNIT*, drops *transport*-adjacent members. Union of the two ≈ **17**.
- `KF-W10.md:66` books **NWO-TERMINAL-SWEEP** as **BLOCKER-to-close** and records *"the amiga packet + the orientation/a11y cluster remain unclaimed by any existing spec"* — i.e. **the packet set is not closed at all**, so no cardinality is yet true.

The spec's own ANTI-STALENESS lock (C-1) forbids inheriting an unmeasured count: *"no measurement is inherited … every anchor, count and interval is re-measured at authoring"*. It is applied scrupulously to 14 other figures (§9's five authoring-time corrections) and skipped for this one.

### D-4 · MINOR — self-contradicting range in C-14 leg (ii): `B10-17..27` swallows `B10-21`

`:126` gives KF.W4's intake targets as *"**B10-17..27**, B18-19, B21-17"* and, **in the same sentence**, gives KF.W5's as *"X-4, **B10-21**"*. The range spelling therefore routes `B10-21` to two waves at once. The intake's actual text (`INTAKE-ADJUDICATION-2026-08-03.md:144-145`, re-read this seat) is an **explicit enumeration with gaps**: *"B10-17 · B10-18 · B10-19 · B10-20 · **B10-22** · **B10-23** · B10-27 (the four gate-design rules) · B18-19("derivation helpers" half) · B21-17(secondary)"* — B10-21 and B10-24/25/26 are **not** in it. `KF-W0.md:271` transcribes it correctly (*"B10-17/18/19/20/22/23 + B10-27 + B18-19 + B21-17"*); KF-W1 does not.

### D-5 · MINOR — the alias block's exhaustiveness claim is false: a third live `W1` namespace is undeclared

`:11-15` declares the mapping *"once and for all"* and admits exactly two meanings (`X.KF.W1`, `KF.W1-DEP`). A **third** `W1` namespace is live in the same corpus: keyframes' own `docs/tranches/V/DISPOSITIONS.md` **"BUILD W1"**, cited at `kf-CopyButton.md:15` and `:40` (EE-01: *"dispositioned `born V (Value-4 migration regression) → **BUILD W1**` at keyframes `docs/tranches/V/DISPOSITIONS.md:69`"*) and `kf-KeyframesEditor.md:10`, `:40` (FE-3), `:51` and `:140` (EE-03). **Nothing escapes** — all three rows route to `KF.W0` explicitly — but a seat grepping `W1` across the corpus meets six hits the spec's "once and for all" mapping does not cover, in a file whose §2 declares this omission *"the one omission that would corrupt other waves' tables."*

### D-6 · MINOR — alias-block citation covers 13 of 18 `KF.W1-DEP` anchors

`:11` cites `kf-AnimationControlsGroup:17/:28/:47` · `kf-ChannelControls:17/:56/:142` · `kf-ControlsPaneWrapper:6/:60` · `kf-DemoGlobalChrome:17/:43/:44` · `kf-KfPillTabs:19/:46`. Measured total = **18**. The five uncited are each record's ADJUDICATED-summary line: `kf-AnimationControlsGroup:135` · `kf-ChannelControls:155` · `kf-ControlsPaneWrapper:149` · `kf-DemoGlobalChrome:130` · `kf-KfPillTabs:122` — every one of which *also* names `KF.W1-DEP` as an owning fold. The **record set (5) is correct** and no row escapes; the anchor census is 72% complete in a block whose whole purpose is anchor completeness.

### D-7 · INFO — C-14 leg (i)'s phrasing is literally falsifiable

*"the only `KF.W1` hits are the five `KF.W1-DEP` folds"*. A literal `grep 'KF\.W1'` returns **33** hits: 18 `KF.W1-DEP` **plus 15 `KF.W10`** (across `kf-AnimatedText`, `kf-EditorStartScreen`, `kf-HeroAurora`, `kf-App`, and others) — `KF.W10` contains `KF.W1` as a substring. The substance (zero rows route to `KF.W1`) is **TRUE**; the sentence as written would fail the grep it invites.

### D-8 · INFO — the KF-W2 cohesion mark is raised without measuring its own condition

`:39`, cross-edge 1 and §9 item 5 raise a **cohesion mark** for COHESION §3.1 because *"KF-W2 carries no KF.W1 edge"*, qualified as *"owed from KF.W2's end **if** it cites any O-8/O-11 obligation"*. Measured this seat: `grep -n 'O-8' KF-W2.md` → **1 hit, and it is `KF-CO-8`**; `grep -c 'O-11' KF-W2.md` → **0**. KF-W2 cites **no** O-8/O-11 obligation, so the conditional is FALSE and the mark discharges on one grep the spec did not run. (Symmetrically, `KF-W7.md` and `KF-W8.md` also carry no KF.W1 edge and also cite no letter — the spec singles out W2 alone.)

---

## §8 What holds — recorded so the defects are read at their true weight

- The **∅-column finding is real and independently re-derived**. This seat closed the routing alphabet four ways and found zero KF.W1 rows. C-14's `LOCK (L-19): a wave with no registry rows gets no manufactured ones` is honoured — the spec books **no invented row, no invented gate, no invented bounds item**.
- **Eleven of twelve gate witnesses reproduce byte-exact**, including every one on the sibling tree (`81a56990`) and every one on the sacred checkout (`8281638c`, `41 1`, 252 dirty, 7,064 B / 15,633 B).
- The **§5a drift table reproduces row for row**, including the ABSENT/EXACT split (9 drifted, 5 exact) and the `:165→:162`, `:69→:70`, `:70-71→:71-73` corrections.
- **Every quoted lock is verbatim** at its lane-docs anchor (`:365` `:366` `:375` `:378` `:380` `:381`), and every dissent is carried rather than resolved.
- The **§9 authoring-time corrections are themselves correct** — the retained set really is 7 files with no 07-21, and 41/35/32 days are the true intervals at 2026-08-28.
- **G-KF1-12's relabelling is exemplary anti-contrivance practice.** D-2 is the failure to apply the seat's own best move a second time.

**Local verdict: DEFECTIVE — 3 MAJOR · 3 MINOR · 2 INFO. Census CLEAN (6 routed / 6 booked / 0 escaped). No inventions. Cure for all eight is editorial and lands inside this file.**
