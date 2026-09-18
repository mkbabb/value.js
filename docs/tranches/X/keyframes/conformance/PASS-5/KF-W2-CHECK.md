# KF-W2 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 5)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W2.md` — **874 L / 286,177 B** (was 707 L at pass 4), X.KF.W2 · Parse Façade, repaired **four** times (rounds 1–4, all 2026-08-28) plus a RECONCILE-seat receipt pass. Local mtime measured this seat: **2026-08-28 17:30:52**.
**Corpus authority**: the **58** `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` — re-enumerated by this seat (`ls kf-*.md | wc -l` → **58**; `wc -l` total **8,656 L**). Census derived **record by record, by reading**, per the round-4 rule this spec now carries (*adoption from a record does not discharge the record*). Sole in-tree carry: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (`ls carry/` → one file, **366 L**).
**TREE LAW / substrate**: every keyframes.js witness re-verified at **`origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`** (committed 2026-07-18 00:36:24 −0400) via `git show` / `git grep` / `git ls-tree` (read-only). Measured this seat: `HEAD 8281638c` with a dirty worktree — **never used as witness substrate**. Zero product-source writes; this file is the only file written.
**Seat**: FRESH. PASS-1/2/3/4 registers, all four RULINGS files and `PASS-4/CLOSE-CERT.md` were treated as claims to be re-tested. No denominator, no escape list, no witness reading, no reconcile certification is inherited.
**Verdict**: **DEFECTIVE** — **86 routed · 77 booked · 9 escaped · 16 defects (7 MAJOR)**.

The round-4 repair is the strongest single round this file has had, and **almost all of its instrument work survives hostile re-derivation byte-for-byte**. What convicts pass 5 is a **fifth form of the same recurrence**, and it is neither basis, nor instrument, nor re-entry: it is **the repair's own new sentences**. The round that struck one superlative (pass-4 D-5) and one mis-attributed provenance (pass-4 D-6) **minted a fresh superlative and a fresh provenance claim**, each refuted by a record the file was already inside; and the one coordinate the round moved *because the span is the instruction* was moved into the load-bearing direction.

---

## §0 Method

Routing is read at the **practised** rule this file adopted at round 3 and re-affirmed at round 4: *any banked cell in the registry's declared subject matter* — value.js parse/serialize entry ingresses with an executed or traced outcome · failure postures over a value.js-bearing path · positive postures over a value.js Result/parse result · **R1 boundary negatives** · **parse-seam fidelity**. Token forms corroborate and never establish (§Excluded's D-1 rule). The sweep was **record-major**, all 58, including every record the file already books cells from — which is where eight of the nine escapes are.

**Instrument note (recorded because it changed this seat's findings).** BSD `grep -E` on this machine silently returns **0** for the form `(^|[^A-Za-z0-9-])ID([^A-Za-z0-9-]|$)` — anchors inside an alternation group — while both half-patterns match 11–17 lines. An id census built on that form is a **false-negative generator**. Every id count below was therefore re-derived with `perl -ne '… /(?<![A-Za-z0-9-])\QID\E(?![A-Za-z0-9-])/g …'`. This is flagged for the next seat: two of this pass's nine escapes were initially mis-scored in *both* directions by the grep form before the perl re-run.

Instruments, all executed by this seat:

| instrument | result |
|---|---|
| `ls kf-*.md \| wc -l` · `wc -l` total | **58** · **8,656 L** ✓ |
| LAW-A censuses **A-1 … A-5**, re-derived from their own pasted commands | **5 of 5 reproduce** — with one internal convention split at A-1 (D-8) |
| G-W2-2 witness **(i)** `git grep -n 'from "@mkbabb/value.js/css"' 81a56990 -- src/ \| wc -l` | **29** ✓ |
| G-W2-2 witness **(ii)** `… -l \| wc -l` | **27** ✓ |
| G-W2-2b demo arm `git grep -l '@mkbabb/value.js/css' 81a56990 -- demo/` | **7 files** ✓ |
| G-W2-6 frozen-parse census `git grep -n 'isFrozen\|Object.freeze' 81a56990 -- src/ test/` | **3 test assertions `:43`/`:67`/`:84`** ✓ · **23 `src/` lines** (interp-slot 1 · browser 4 · conditional 9 · core 6 · function 3) ✓ |
| `git grep -n 'export function formatCSSKeyframeString' 81a56990 -- src/` + `sed -n '130,150p'` | decl **`:136`**, body **`:137-146`**, brace **`:147`** — and this convicts the round-4 span cure (D-3) |
| A-3 `CQ_UNIT_RE` · A-4 `coerceToSyntax` | `:136` / `:202` / `:207` ✓ · `function.ts:2` + `:19`, two test hits comments at `:11`/`:178` ✓ |
| A-1 alias root · relative spelling | **5 live imports** ✓ · **2 test spellings + exactly 4 docs-prose hits** ✓ |
| OP-4 · frontier `package.json` `check`/`check:lib`/`lint` | byte-exact, **`grep -c vue-tsc` → 0** ✓ |
| F6 base-28 enumeration (the pass-4 D-4 cure) | **28 numbered rows** present ✓ |
| X1–X15 · Y1–Y8 · Z1–Z7 id presence | **15 / 8 / 7, all present** ✓ |
| stage-1 sibling receipts (W3 · W4 · W5 · W6) at **current** bytes | **4 of 4 anchors hold**; W6 Taxonomy `:35`, KF-HA-13 `:398`/`:406`; W4 `G-KFW4-1` `:205`; W5 `B-16` `:66 :293 :339 :395 :430`, `G-OPTSET` `:395` ✓ |
| stage-2 forward quotations (W8) at **current** bytes | **3 of 3 fragments return 1** ✓ |
| COHESION §4a re-point (`sed -n '116p;129p'`) | **§4a `:116`, O-20 dispatch row `:129`** — exact ✓ |
| sibling mtimes vs. this file's (`stat`) | **W5 17:32:57 · W8 17:34:06 > KF-W2 17:30:52** → two "FINAL BYTES" stamps unperformable (D-7) |

---

## §1 WHAT REPRODUCES — and it is the overwhelming majority

### 1a · The LAW-A censuses

**A-1** — `@utils/keyframeSelector` alias root → **5 live imports**, exactly as pasted (`useKeyframeOps:9` · `useTimelineBuild:8` · `useTimelineOps:7` · `snapshotCapture:3` · `timelineEngine:16`); the relative spelling adds **2 test files + exactly 4 docs-prose hits** (`U/AGENTIC-HANDOFF…:205` · `V/audit/R1-03…:122/:148/:292`), and the prose/paste partition of consumer-vs-prose is correct ✓. The **substance is right**: `selectorText` at copy 3 has **three** consumers, and the third is a live boundary test (`expect(selectorText(named)).toBe("entry 50%")`, read at the frontier). The named false positive is real: `test/engine/nan-frame.test.ts:39` declares its own local `selectorText` ✓. What fails is one line-number convention (D-8).

**A-2** — declaration `emit/format/format.ts:136` ✓ (path resolved at the frontier as `src/animation/compile/emit/format/format.ts`); the refutation of the deletion is sound and load-bearing — the symbol *is* re-exported and *is* consumed, so "delete" was correctly re-cut to "re-implement in place". It is the **span** that is now wrong, and wrongly (D-3).

**A-3** — `CQ_UNIT_RE`: declaration `view-transition.ts:136`, consumers `:202`/`:207`, zero barrels ✓ byte-exact. **A-4** — `coerceToSyntax`: `resolve/function.ts:2` specifier + `:19` sole call; both `test/resolve/emerging-css-resolve-fn.test.ts` hits (`:11`, `:178`) are comments ✓ byte-exact. **A-5** — the `test/` arm and the empty `scripts/` arm reproduce ✓.

### 1b · The gate witnesses and the corrected numerics

**G-W2-2 (i)/(ii)** reproduce exactly at **29 specifier lines / 27 files**. **G-W2-2b** returns **7** demo files ✓. **The pass-4 D-2 cure holds**: the frozen census returns **three** test assertions (`:43`, `:67`, `:84`), not two, and the `src/` count is **23 lines** under the file's stated counting rule (*the unit is a matching LINE, not a call*) — `core.ts:15` and `function.ts:40` each carry two calls on one line, exactly as the file says. **The pass-4 D-13 cure holds at 23.**

**OP-4** is byte-exact: `check = tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure`, `check:lib = tsc --noEmit -p tsconfig.lib.json`, `lint = depcruise src`, and **`vue-tsc` appears zero times** in the frontier `package.json` — so `G-KFW4-1`'s re-cut genuinely composes with the live script rather than replacing it.

### 1c · The pass-4 D-4 cure is real and this register exercises it

**F6 · THE BASE 28, ENUMERATED BY BANKED ID** exists and carries **28 numbered rows**, a four-clause counting rule stated *at* the enumeration, and an explicit granularity disclosure for the multi-id folds. With the round-1 **19** parenthesised at `:34`, **X1–X15**, **Y1–Y8** and **Z1–Z7** all present by id, the claim *"77 of 77 routed cells are enumerated in this file"* is **TRUE as measured**, where round 3 stood at 42 of 70. **This is the strongest structural repair in the X·KF corpus, and it is what makes §2 below possible**: the denominator is falsifiable by construction for the first time, and this register falsifies it.

### 1d · The sibling seam — the drift class is nearly dead

**Stage-1, at the siblings' CURRENT bytes, every anchor holds and every stale coordinate was retired rather than re-issued.** The reconcile seat's own insertions are exemplary where they ran: the W6 cell records *"`:18` → `:35`, `:336`/`:344` → `:398`/`:406` … BOTH ANCHORS HOLD; all three coordinates are STALE and are retired, not re-issued"* — and I reproduce every one of those numbers. The W4 cell states *"`:198` is not a hit at all at the final bytes"* and the gate is at **`:205`** — reproduced. The W5 cell catches the sharpest form of the hazard in its own body: the retired `G-OPTSET` coordinate **`:339` now resolves to the B-16 ROW** — a dead coordinate that still returns *a different* row. I re-ran it: `grep -n 'B-16' KF-W5.md` → `:66 :293 :339 :395 :430`, `G-OPTSET` → `:395`. Exact.

**Stage-2** forward quotations re-run at W8's current bytes: `'the publication act, and it'` → **1** · `'PRECEDES KF.W2'` → **1** · `'arms if-and-only-if KF.W8 has not preceded'` → **1** ✓. **The pass-4 D-1 conviction is genuinely cured**: `sed -n '116p;129p' COHESION.md` returns §4a's heading and the O-20 dispatch row verbatim, the departed vehicle is carried *as departed* at all three sites, and no letter is cited as live.

### 1e · M-25 depth in the carried rows

Every carried lock, rider, dissent and cure-shape lock I spot-checked verifies at its anchor. Z1's fold is **stated by id** at `:398` — *"the write at `KeyframesEditor.vue:40-47` is banked twice, in two records, under two ids"* — which is the pass-4 D-7 cure performed exactly as ordered. Y2 quotes KC-2 and its library datum at `kf-KeyframeCardList:34`/`:101` byte-faithfully. K-6's reachability guard, KF-KC-53's negative, KF-AV-28's three bank anchors, the KF-ET-28 and Z7 do-not-re-probe locks all hold. **No invention was found in any row that is carried.** The defects below concern rows that are **not** carried, and sentences the round-4 repair itself wrote.

---

## §2 ID-KEYED CENSUS — 86 routed · 77 booked · 9 escaped

**Booked**: 28 (F6, authoring) + 19 (round 1) + 15 (X1–X15) + 8 (Y1–Y8) + 7 (Z1–Z7) = **77**, and **77 of 77 are enumerated by banked id** — verified by id presence, not by trusting the arithmetic. **Routed** = 77 + the nine below = **86**.

### 2a · The nine escapes

| # | id ⟨record:line⟩ | occurrences in `KF-W2.md` | why it is in this register's subject |
|---|---|--:|---|
| **E1** | **KF-ES-13 · L-i2 (RAISED, ruled table)** ⟨kf-EasingSidebar:51, ruled at `:25`⟩ **MAJOR, GLASS-OWNED** | **0** | *"`steps(1, jump-none)` is ONE Select pick away from the `step-start`/`step-end` seed and **throws inside the vendor's RENDER**, with no error boundary on this surface … **MAJOR, GLASS-OWNED** → BH relay letter."* Ruled at `:25` with the measurement inline: *"My probes: **`steppedEase(1,"jump-none")` → `step_count_invalid`**; all other 1-count terms ok."* A **failure posture over a value.js-bearing path** carrying an **executed value.js easing-entry measurement** — two of this register's declared subjects, in one record, twice. The file excludes the record on the read reason *"No parse entry, no failure posture."* |
| **E2** | **K-11** ⟨kf-KeyframesAddDialog:107⟩ | **0** | *"**K-11 · L-9's BLOCKER (nbsp corrupts parse)** … **Re-verified correct against the tree and recorded so nobody re-derives them**: **value.js `/\s/` matches U+00A0 (submit path safe)** … the R1 throw class is not on this path."* An executed value.js grammar datum with an explicit do-not-re-derive lock, in a record the file books **three** cells from — and it refutes the superlative round 4 minted (D-2) |
| **E3** | **KF-ET-32 · C-18 + C-20 + C-12/D-21 + C-13** ⟨kf-EasingTarget:77⟩ | **0** | *"the 41.6 KB `/css` module (**exporting `parseCssColor`**) **enters the static graph** for two frozen tables (**link, not call — N1 keeps this component clean on the R1 map, a KF.W3 scoping input**)"*, plus *"no synchronous name→fn surface: **KF.W5 letter**"*. An **R1 boundary negative** (a routed class by the file's own rule, and the class it books KF-KC-53 / KF-APP-56 / C-19 / LP-24 under) **over the exact import edge G-W2-2 censuses**, in the record the file books KF-ET-2 **and** Z5 from — **§Excluded states no read reason for this record at all** (D-6) |
| **E4** | **KF-CO-10 · L·M-10 = C·M-7 + RR-A's third alias** ⟨kf-ChannelOptions:62⟩ | **4** (cited, never booked) | *"all THREE 'Steps' family entries are **silent aliases for `steps(100, jump-start)`**; `parseTimingFunction` **collapses the keywords**…"* — **parse-seam fidelity** at the very entry Z6 measures, in the record the file books four cells from. Z6 disposes of it to *"§Excluded's per-cell rule"*, **which does not exist** (D-4) |
| **E5** | **KF-KC-1 · D-1 = L-1 = C-1** ⟨kf-KeyframeCard:40⟩ | **0** | *"Chain re-derived whole: **value.js `types.ts:42-44` (plain Readonly union, no toString) ← `grammar.ts:409/:415` (bare literals)** → kf `types.ts:64-67` → … `.toString()` … **The canonical renderer `selectorText` is shipped, tested green (`value4-editor-boundary.test.ts`), and bypassed.**"* A **value.js parse-result type shape traced into the render** — the *shape* half of the entry-point contract whose *freeze* half the file books as Y2 — and the record that already banks A-1's "discovery" (D-5) |
| **E6** | **kf-TypingDots ruling 9 (L's S-3, sustained SCOPED)** ⟨kf-TypingDots:92⟩ | **0** | *"the **value.js clamp near-miss** nobody asked it to find (**unclamped, `steppedEase` at t=1 overshoots to 4/3**…), is **exact at `easing.js:239`**."* An executed value.js easing-entry numeric finding with a dist coordinate, in the record the file books **C's S★-3** from and cites twice as its own method precedent |
| **E7** | **S-B (axis C)** ⟨kf-KeyframeCardList:96⟩ | **0** | *"the engine-purity comment that survives its own audit: **`formatCSSKeyframeString` really is a value.js-free three-regex trim exported only on the heavy surface**; both halves verified, the routing conclusion correct…"* — the bank's own **verified** reading of the exact symbol census **A-2** re-cut G-W2-3 on, in a record the file books two cells from |
| **E8** | **KF-TFP-18** ⟨kf-TimingFunctionPanel:61⟩ | **0** | *"a **2-dp-LOSSY css twin** at a WAAPI compositor-delegation site … the persisted literal (2 dp) and `controlPoints` (3 dp) **disagree in localStorage and re-diverge on reload**"*, against *"the vendor's discarded **`reparseOk`-verified** `v.css`/`v.fn`"*. A **serialize → precision-loss → re-parse divergence** over value.js's `cubicBezierToString` — *parse-seam fidelity*, the register's fourth declared subject — while **G-W2-7 is this wave's round-trip regression net** |
| **E9** | **C-3 (MAJOR, + L-5's `css` half + D-15's no-css premise share)** ⟨kf-TimingFunctionPanel:79⟩ | **0** | *"**KILLED AT THE PRODUCT BASELINE**, re-proved by this seat's own `git show`: the frontier's panel builds `{ fn: cubicBezierEasing(...pts), **css: cubicBezierToString(...pts)** }` … So `firstTF.css !== undefined` on **every arm** of the shipping path."* A **verified negative over a value.js serialize path** — the same census class the file books C-19, KF-APP-56 and LP-24 under — and the killed twin of E8, in a record with no §Excluded read reason |

### 2b · Where the escapes sit, and the mechanism

**Eight of the nine sit in records this file books cells from** (kf-KeyframesAddDialog ×3 · kf-ChannelOptions ×4 · kf-KeyframeCard ×2 · kf-EasingTarget ×2 · kf-TypingDots ×1 · kf-KeyframeCardList ×2 · kf-TimingFunctionPanel ×1 ×2); the ninth (kf-EasingSidebar) is a record the file **excludes on a stated read reason that is false at the record's own bytes**. So neither sampling (round 2), nor instrument (round 3), nor re-entry-as-such (round 4) is the mechanism this round — the round-4 rule *"a record already partly adopted is re-read WHOLE"* was **declared and not performed**, and its own gate falsifier (*"the gate reds if any record is dispositioned at the RECORD level rather than cell by cell"*) fires on eight of nine.

**The sharper mechanism, and it is new**: three of the nine are refutations of sentences **round 4 itself wrote** — E2 refutes G-W2-5's new *"only banked instance"* superlative, E5 refutes A-1's new provenance claim, E4 is disposed of by a §Excluded clause the round never wrote. **The repair is now generating the class it is repairing.**

---

## §3 THE DEFECT REGISTER

### D-1 · MAJOR — the corpus's second `steps(1, jump-none)` record is excluded on a read reason the record falsifies, while this wave runs its measurement

§Excluded's read-reason table closes **kf-EasingSidebar** with, verbatim at `KF-W2.md`: *"five mentions, all **instrument or type**: this seat's `easing("smooth-step-3")` probe against the installed dist (a *measurement*, not an ingress), and **KF-ES-22 · C-9 = L-m2**, two inert cross-vendor `JumpTerm` casts … **No parse entry, no failure posture.**"*

The record's own bytes, measured this seat:

- ⟨`:51`⟩ **`KF-ES-13 · L-i2` RAISED (ruled table)**, **MAJOR, GLASS-OWNED** — *"`steps(1, jump-none)` is ONE Select pick away from the `step-start`/`step-end` seed and **throws inside the vendor's RENDER**, with no error boundary on this surface … → **BH relay letter**; consumer riders booked here: the `steps: 1` seeds are what make it one pick, and the file mounts no `onErrorCaptured`."*
- ⟨`:25`⟩ the ruling that raised it, measurement inline — *"My probes: **`steppedEase(1,"jump-none")` → `step_count_invalid`**; all other 1-count terms ok. My source read: `seedFor("step-start")` seeds `{steps: 1, term: "jump-start"}` (**EasingSidebar.vue:107-109**) … the picker's RENDER throws before `onPickerChange` can run."*

That is a failure posture over a value.js-bearing path **and** an executed value.js easing-entry measurement — both declared subjects — in one record, twice. **The exclusion sentence is false as written.**

**Three compounding facts make this the pass's headline rather than a missed row.** (i) The file **quotes this record's own seed anchor** inside Y1 (*"the demo seeds `steps: 1` … (`EasingSidebar :106-110`)"*). (ii) The file **names the row's id**: `grep -c 'L-i2'` → **1**, inside the `KF-W9 §H` trigger quotation *"decides L-i2's ordering"*. (iii) The §Sequencing BH-relay block **runs the row's own measurement** at write time and hands it to the producer relay as this wave's contribution. **A register that executes a row's measurement, quotes its record's bytes and names its id — then excludes the record for holding no posture — has not missed a row; its exclusion instrument has failed in a fourth new way.**

**Cure**: book `KF-ES-13 · L-i2` as **F3 row 20** at the bank's disposition (MAJOR, GLASS-OWNED, BH relay, consumer riders intact, no cure moved), fold-cross-cite to **Y1/KF-ES-3** by id per Z1's own precedent, correct the read reason, and move the floor **19 → 20**.

### D-2 · MAJOR — round 4 minted a new superlative at G-W2-5, and a record the file books three cells from refutes both halves of it

G-W2-5's third clause, second member (the R4-9.1 Z3 booking) reads, verbatim at `:660`: KF-KC-17 is *"**the corpus's only banked instance of a NON-CSS CHARACTER crossing into the grammar adapter**"*, grounded on the mechanism *"this one is **a character outside the CSS whitespace set entirely**"*, and concluding *"**the malformed corpus must cover malformed SYNTAX and non-CSS CHARACTERS**, or the class is half-covered by construction."*

**kf-KeyframesAddDialog `K-11`** ⟨`:107`⟩, in the killed-claims register, verbatim: *"**K-11 · L-9's BLOCKER (nbsp corrupts parse)** + the corpus's own K-1..K-5 (both readers). **Re-verified correct against the tree and recorded so nobody re-derives them**: **value.js `/\s/` matches U+00A0 (submit path safe)** … the R1 throw class is not on this path."*

**Both halves of the new sentence fail.** **(a) "Only"** — this is a second banked NBSP-into-parse cell, and a *ruled* one. **(b) The mechanism** — the clause's whole argument is that NBSP sits *outside* the CSS whitespace set; the bank records the opposite **at the parser itself**: value.js's `/\s/` **matches** U+00A0, which is precisely why K-11 rules the submit path *safe*. The malformed-corpus extension is therefore designed against a premise the corpus already measured false, and the fixture's expected outcome for the character arm is unstated because of it.

The record is one this file books **three** cells from (K-5 at F6 #12 · KAD-9 at F3 row 7 · KAD-10 at X13/F3 row 15) — so the re-entry rule this round installed is the rule that would have caught it. **This is pass-4 D-5 repeated one round on, in the opposite direction**: pass 4 struck a superlative that had gone stale; pass 5 finds one minted *in the same round as the adoption that refutes it*.

**Cure**: book **K-11** beside Z5–Z7 with its do-not-re-derive lock verbatim; re-cut the clause to what is true — *KF-KC-17 is the corpus's banked instance of a non-CSS character reaching `parseAnimationCSS` **through a bypassed model channel*** — and state the K-11 datum as the **expected-outcome fact** the fixture must encode.

### D-3 · MAJOR — the pass-4 D-16 span cure moved the error into the load-bearing direction: `:136-144` names the declaration the row says survives

Pass 4's D-16 convicted `:135-144` because census A-2 pins the declaration at `:136` and `:135` is blank. The round-4 cure re-cut the span to **`:136-144`** and declared it changed *"at all seven sites"*, with the stakes stated in the file's own words: *"**this is the one member whose row was re-cut ON this census, and the span IS the instruction**"*.

Read at the frontier by this seat (`git show 81a56990:src/animation/compile/emit/format/format.ts | sed -n '130,150p'`):

```
136: export function formatCSSKeyframeString(keyframe: string) {
137:     let s = keyframe
138:         .replace(/^[^{]*{/, "")
139:         .replace(/^  /gm, "")
140:         .replace(/}\s*$/, "");
141:
142:     s = s.trim();
143:
144:     s = s.replace(/^  /, "");
145:
146:     return s;
147: }
```

The census's **own pasted re-run says the same thing** — *"the body running `:137-146` with the closing brace at `:147`"*. So the corrected span:

1. **includes `:136`** — `export function formatCSSKeyframeString(keyframe: string) {`, the exact line the row it annotates declares survives: *"what dies is **the regex body** (`:136-144`), **not the export** — the symbol survives, its signature survives, its six re-export/engine-surface sites are untouched, and `KeyframeCardList.vue:60` keeps working"*; and
2. **excludes `:146`** (`return s;`), a body line.

A seat executing *"delete `:136-144`"* deletes the signature and orphans `return s; }` — a syntax error that takes `public.ts:170` and the lazy engine surface with it, **which is precisely the outcome A-2 was written to prevent**. The round-3 spelling was harmlessly off by a blank line; the round-4 cure is harmfully off by the one line that must not move. The lawful spans are **`:137-140` + `:144`** (the regex chain — what "the regex body" means) or **`:137-146`** (the function body). Sub-finding, same class: the cure claims *"seven sites"* while `grep -c '136-144' KF-W2.md` → **8**.

### D-4 · MAJOR — `KF-CO-10` is declared excluded by a §Excluded clause that does not exist, and the cell is in the subject matter

Z6's row (§Carry F0, `:394`) carries the bank's rider and then disposes of it: *"the keywords' true fate is the worse **KF-CO-10**"* — **KF-CO-10 is not routed here (§Excluded's per-cell rule)** and this census takes the measurement only."*

Measured this seat: `KF-CO-10` occurs **4** times in `KF-W2.md`, **all inside §Carry** (the KF-TFP-20 rider and Z6's sentence). **§Excluded (`:776`→) contains no KF-CO-10 line at all**; its only KF-CO bullets name **KF-CO-1 / KF-CO-8** and **KF-CO-33**. And that KF-CO-1/-8 bullet's own round-3 cure exists *because* the blanket it replaced was *"a token instrument wearing an exclusion's clothes"* — the file struck a KF-CO blanket for over-reaching and now leans on a KF-CO exclusion that was never written.

The cell qualifies: ⟨kf-ChannelOptions:62⟩ *"all THREE 'Steps' family entries are **silent aliases for `steps(100, jump-start)`**; `parseTimingFunction` **collapses the keywords**…"* — parse-seam fidelity at the same entry Z6 measures, in the record this file books four cells from. **Z6 measures the parser's answer and routes the consequence of that answer to a clause that isn't there.**

**Cure**: book KF-CO-10 (its cure stays at its bank's owner) or write its read reason in §Excluded, per this file's own rule that *"a record leaves this register only on a stated reading of its cells."* Citing a non-existent self-clause is the fabricated-authority class (round-1 D-1) turned inward.

### D-5 · MAJOR — A-1's "the bank was short by one" novelty is banked in a record this file is already inside

Census **A-1**, §Carry **F4** and **G-W2-8** all present the third `selectorText` consumer as a LAW-A discovery against the bank: *"**THE PREVIOUS CENSUS WAS SHORT BY ONE, and the shortfall is a test that pins the symbol's behaviour**"*; *"§Carry F4 and G-W2-8 previously read … **two** — sourced from the bank"*; *"the third is a live boundary test that would go red the moment copy 3 is repointed, and it is **the pin that makes the 3 → 1 collapse falsifiable rather than silent**."*

**kf-KeyframeCard `KF-KC-1 · D-1 = L-1 = C-1`** ⟨`:40`⟩ banks it: *"The canonical renderer `selectorText` is shipped, **tested green (`value4-editor-boundary.test.ts`)**, and bypassed."*

The **census is correct** — three consumers, verified at the frontier, and the test is a behaviour pin. The **provenance claim is not**: the corpus already named that test as `selectorText`'s green pin, in a record this file books **KF-KC-53** (F6 #13) and **KF-KC-17** (G-W2-5) from. "Sourced from the bank" is true of the *count*; the *fact* was banked and unread. This matters beyond credit, because **KF-KC-1 is itself unbooked** (occurrences: **0**) and is a register-subject cell: it traces **value.js's own parse-result type shape** — *"value.js `types.ts:42-44` (plain Readonly union, no toString) ← `grammar.ts:409/:415` (bare literals)"* — through kf's types to `[object Object]` at the render, which is the *shape* half of exactly the contract G-W2-6 publishes, the *freeze* half of which the file did adopt as Y2.

**Cure**: attribute the pin to `KF-KC-1`'s bank (one clause), keep the census, and book **KF-KC-1** into G-W2-6's contract beside Y2 — the frozen envelope and the un-`toString`-able payload are two clauses of one entry-point contract.

### D-6 · MAJOR — ESCAPE E3: an R1-boundary negative over the exact import edge G-W2-2 censuses, in a record with no read reason anywhere in the file

⟨kf-EasingTarget:77⟩ **KF-ET-32 · C-18 + C-20 + C-12/D-21 + C-13 — the consumption-surface bundle**: *"the 41.6 KB `/css` module (**exporting `parseCssColor`**) **enters the static graph** for two frozen tables (**link, not call — N1 keeps this component clean on the R1 map, a KF.W3 scoping input**); the sole keyframes.js import is an erased type and the wrong library's … no synchronous name→fn surface: **KF.W5 letter**."* Occurrences in `KF-W2.md`: **0**.

Three reasons this is MAJOR rather than a missed MINOR. (i) **It is an R1 boundary negative** — a class this file's own routing rule names as routed, and the class under which it books KF-KC-53, KF-APP-56, C-19 and LP-24 as census cells. (ii) **Its subject is G-W2-2's subject**: the gate's entire witness is a census of which modules take a `@mkbabb/value.js/css` edge; a banked reading that distinguishes a **link-only graph entry from a call** is a qualifier on that census, not a neighbouring topic. (iii) **It is addressed to a sibling this wave owes** — *"a KF.W3 scoping input"* — while W3 is the gated wave whose scope this file's §Cross-edges undertakes to supply.

Compounding: **§Excluded states no read reason for kf-EasingTarget at all** (nor for kf-TimingFunctionPanel, kf-KeyframeCardList, kf-EditorStartScreen or kf-LayerConfigPanel), though the file books cells from every one of them. The round-4 rule and §Excluded's own *"a record leaves this register only on a stated reading of its cells"* both require the disposition to exist; for these five records it does not.

### D-7 · MAJOR — two "RE-VERIFIED AT … FINAL BYTES" stamps name substrates the reconcile seat itself superseded

LAW C(4) minted the RECONCILE seat to end the same-round-sibling-drift class. Its insertions in this file assert verification **at the siblings' final bytes**. Measured this seat by `stat`, against `PASS-4/CLOSE-CERT.md` §1's own write-order table:

| file | mtime measured | what `KF-W2.md` asserts |
|---|---|---|
| `KF-W2.md` | **17:30:52** | — (the citing file's last write; CLOSE-CERT records it as the seat's **first** write) |
| `KF-W5.md` | **17:32:57** | §0 row: *"RE-VERIFIED AT **KF-W5's FINAL BYTES**"* |
| `KF-W8.md` | **17:34:06** | G-W2-8 / §0: *"the RECONCILE seat re-verifies them at **W8's final bytes**"* |

Both siblings were written **after** this file's last write, by the **same** seat. So *"final bytes"* is false at both sites. The W6 and W4 stamps are clean by the same test (16:59:25 and 16:59:44, both before 17:30:52), which is what isolates the failure to the seat's **own write ordering** rather than to the law.

**Stated at its true strength, because that is what pass 4 asked for**: the substance survives. I re-ran all three W8 fragments and every W5 coordinate — **all hold**, and the W5 cell even catches the dead-`:339`-resolves-to-a-different-row hazard in its own body. This is a **stamp** failure, not a content failure. But it is pass-4 D-1's convicted clause (iv) — *a verification claim that cannot have been performed at the named substrate* — recurring **inside the instrument built to prevent it**, and LAW C(4) has no ordering rule over the reconcile seat's own writes.

**Cure**: give the reconcile seat's writes the same ordering discipline its subjects had (or a second pass over any spec it wrote before a sibling it later touched); here, re-stamp both cells at the true final mtimes, or convert them to what they honestly are — *"re-verified after the last per-wave write; the anchors hold and no coordinate is re-issued."*

### D-8 · MINOR — census A-1 prints two line-number conventions for one import, and the consumer-set sentence uses the one its own command does not return

A-1's pasted block returns, correctly: `test/demo/instrument/timeline-undo.test.ts:6 · test/demo/instrument/value4-editor-boundary.test.ts:6`, and the alias-root line `timelineEngine.ts:16`. The prose sentence directly beneath it — the one G-W2-8's 3 → 1 collapse rests on — reads: *"Consumer set of `selectorText` at copy 3 = **THREE** … `useKeyframeOps.ts:9` (call `:111`) · **`timelineEngine.ts:15`** (call `:38`) · **`value4-editor-boundary.test.ts:5`** (assertion `:26`)"*, and closes *"Both files are re-cut accordingly."*

Read at the frontier: both files use a **multi-line** import, so `selectorText` is the *symbol* line (`timelineEngine.ts:15`, `value4-editor-boundary.test.ts:5`) while the *specifier* line is `:16` and `:6`. `useKeyframeOps.ts:9` is single-line, so the two conventions coincide there — which is exactly why the split is invisible. Every other census in this file (A-1's own paste, A-2, A-4, A-5, G-W2-2) counts **specifier lines**. So the census's two halves disagree by one line on two of three consumers, and the sentence that is handed forward as *"a true consumer set"* for **KF.W8** to re-cut against prints coordinates its own pasted command does not return. Same class as D-3, one severity down: an integer that is an **instruction** rather than a citation.

**Cure**: state the convention once (specifier line, with the symbol line in parentheses where they differ), and re-cut the two coordinates.

### D-9 · MINOR — ESCAPE E9: the killed twin of E8, a verified negative over a value.js serialize path

⟨kf-TimingFunctionPanel:79⟩ **C-3**: *"KILLED AT THE PRODUCT BASELINE, re-proved by this seat's own `git show`: the frontier's panel builds `{ fn: cubicBezierEasing(...pts), **css: cubicBezierToString(...pts)** }` with the EE-02 rationale comment, AND — the leg neither reader closed — the parent's synchronously-winning overwrite ALSO carries the twin … So `firstTF.css !== undefined` on **every arm** of the shipping path."* A verified negative over a value.js serializer, banked with its re-proof — the same census class the file books C-19, KF-APP-56 and LP-24 under, and the *positive* counterpart of E8's precision-loss finding in the same record.

### D-10 · MINOR — ESCAPE E6: the corpus's other executed `steppedEase` reading

⟨kf-TypingDots:92⟩ ruling 9: *"the value.js clamp near-miss nobody asked it to find (**unclamped, `steppedEase` at t=1 overshoots to 4/3** and the PRM rest would blank the dots), is **exact at `easing.js:239`**."* An executed value.js easing-entry numeric finding with a dist coordinate, in the record this file books **C's S★-3** from and cites twice as the method precedent for its own F0. The wave executes `steppedEase` twice this round and books none of the corpus's other readings of it.

### D-11 · MINOR — ESCAPE E7: the bank's own verified reading of A-2's subject

⟨kf-KeyframeCardList:96⟩ **S-B (axis C)**: *"the engine-purity comment that survives its own audit: `formatCSSKeyframeString` really is a **value.js-free three-regex trim exported only on the heavy surface**; both halves verified, the routing conclusion correct even though the accessor choice was not (KC-16)."* Same symbol, same export-surface question, verified at the bank, in a record this file books two cells from. A-2 is right and is *stronger* with S-B beside it; dropping it leaves the re-cut resting on one seat's graph read where two independent readings agree.

### D-12 · MINOR — ESCAPE E8: a round-trip fidelity cell, unbooked, while G-W2-7 is the round-trip net

⟨kf-TimingFunctionPanel:61⟩ **KF-TFP-18**: a **2-dp-lossy `css` twin** written by both writers at a WAAPI compositor-delegation site, desynchronising the store's two representations of one curve — *"the persisted literal (2 dp) and `controlPoints` (3 dp) **disagree in localStorage and re-diverge on reload**"* — against *"the vendor's discarded **`reparseOk`-verified** `v.css`/`v.fn`"*. `cubicBezierToString` is value.js's. Its grade lives at KF-ET-1 and its cure is not this wave's — but *parse-seam fidelity* is this register's fourth declared subject and **G-W2-7 is this wave's round-trip regression net**, which is exactly the argument the file used to adopt Z2.

### D-13 · MINOR — the O-21 posture: the vehicle is re-pointed to a register, not to the id the constellation minted for it

The pass-4 D-1 cure is real and sourced correctly: `sed -n '116p;129p' COHESION.md` reproduces §4a's heading and the O-20 dispatch row exactly, and the departure qualifier is carried at all three sites. But the successor vehicle **has an id** — `KF-W10 §6.C-B` and `§6.D` name **KF.W1's outbound row `O-21`**, minted at round 4 as the measured ledger maximum O-20 + 1. Measured here: **`O-21` occurs 0 times in `KF-W2.md`**. The spec convicted for citing a departed letter re-points to *the table the letter will be assembled from* rather than to the row minted for precisely this hand-off — the same discipline, one step short, and a later seat reading this cell still cannot name the vehicle.

### D-14 · MINOR — G-W2-1's assertion sentence is still a completeness certificate in gate voice

LAW B's conversions are thorough and largely exemplary. Against that, the gate's own *Assertion* line still reads: *"**the registry enumerates the banked failure-posture cells of the 58-record corpus**, one row each, in one place."* The definite article is the claim LAW B bans — the set is one this file is itself the enumeration of — and it does work the *floor* framing beside it does not need. MINOR only because the carriage clause sits directly beneath it and because the falsifier list is honest enough that **this pass's D-1 reds the gate by its own construction**.

### D-15 · MINOR — five engaged records carry no §Excluded read reason

Named separately from D-6 because it is a **structural** gap rather than a single missed cell. `kf-EasingTarget` · `kf-TimingFunctionPanel` · `kf-KeyframeCardList` · `kf-EditorStartScreen` · `kf-LayerConfigPanel` are each engaged by the file (cells booked, or ids cited) and none appears in §Excluded's read-reason table. Under the file's own rule — *"a record leaves this register only on a stated reading of its cells"* — a partly-adopted record needs its remaining cells dispositioned as much as an untouched one does. Four of this pass's nine escapes (E3, E7, E8, E9) sit in three of these five.

### D-16 · MINOR — Y2 trims the bank clause that names what KC-2 fused

Y2 quotes KC-2's headline from `:34` byte-faithfully **from *"the offset Slider is dead"* onward**, and carries an explicit anti-rename lock. The bank's row opens *"**KC-2 · corpus-missed (reader-DU M-1; fuses L-13; kills L-13(b)/C-D-3(b))** — the offset Slider is dead…"*. The fusion clause is dropped. **This is why `L-13` scores 0 occurrences and is nonetheless NOT an escape** — it is fused at the bank into the id the file books, and I record the reasoning so the next seat does not re-book it. But M-25 asks for the fold to travel with the row, and here the id that survived is carried while the ids it consumed are not named.

---

## §4 AXIS VERDICTS

| axis | verdict | ground |
|---|---|---|
| **(1) ID-KEYED CENSUS by record** | **DEFECTIVE** | 86 routed · 77 booked · **9 escaped**. **The round-4 structural win is real and verified — 77 of 77 booked cells are enumerated by id (F6 = 28 rows, X1–X15, Y1–Y8, Z1–Z7 all present), and the denominator is falsifiable for the first time; this register falsifies it by construction, which is the outcome pass-4 D-4 was cured for.** Eight of nine escapes sit in records the file books cells from; the ninth sits behind a **false read reason** (D-1); five engaged records carry no read reason at all (D-15) |
| **(2) RECEIPT REALITY** | **DEFECTIVE (narrowly)** | **The drift class is nearly dead.** All four stage-1 sibling anchors hold at current bytes (W6 `:35`/`:398`/`:406` · W4 `:205` · W5 `:66 :293 :339 :395 :430` + `G-OPTSET :395` · W3 `:1`); all three W8 forward fragments return 1; COHESION §4a reproduces at `:116`/`:129`; **every stale coordinate was retired rather than re-issued**, and the W5 cell catches the dead-coordinate-resolves-to-a-different-row hazard inside its own body. What fails is one layer up: **two "FINAL BYTES" stamps name substrates the RECONCILE seat itself superseded** (D-7) — substance true, verification claim unperformable |
| **(3) M-25 DEPTH + LAW-A CENSUSES AT THE FRONTIER** | **HOLD (censuses) / DEFECTIVE (depth)** | **Every re-run pasted command returns its stated output**: A-1's 5 alias imports + 2 test spellings + 4 prose hits · A-3 `:136`/`:202`/`:207` · A-4 `:2`/`:19` + two comment hits · G-W2-2 **29/27** · G-W2-2b **7** · the three-assertion frozen paste `:43`/`:67`/`:84` · the 23-line `src/` count (1+4+9+6+3) · OP-4 byte-exact with **zero** `vue-tsc`. **This is the strongest instrument work in the X·KF corpus.** Against it: one internal convention split inside A-1 (D-8), and depth fails at rows the file does not carry (D-1, D-2, D-6, D-9…D-12) and at one provenance claim the bank refutes (D-5) |
| **(4) GATES** | **DEFECTIVE** | Gate arithmetic is now honest — **eight born-RED + one declared MONITOR** (G-W2-2b, whose assertion is true at the substrate and which no act of this wave can move), G-W2-8's count arm homed at KF.W8 rather than asserted — and every gate has a reachable green and a live witness; no closure is self-voiced except as noted. Against that: **G-W2-5 carries a superlative the corpus refutes (D-2)**, **G-W2-3's re-cut span is unexecutable and destroys the export it was written to protect (D-3)**, **G-W2-2's census is missing a banked qualifier on its own edge (D-6)**, **G-W2-1 reds by its own falsifier on D-1's twentieth posture**, and one assertion sentence is still a self-voiced certificate (D-14) |
| **(5) POSTURE** | **HOLD-WITH-RESIDUAL** | **W4 head honoured** — OP-4's `check`/`check:lib`/`lint` byte-exact at the frontier, `vue-tsc` count **0**, and `G-KFW4-1` at `KF-W4.md:205` composing with the live script ✓ · **W3 gated-unscheduled** — `KF-W3.md:1` = *"# KF.W3 — Parser Consumption (GATED, never scheduled)"*, `RC-P` named as a predicate, no version literal ✓ · **W11/W12/W13 present and coherent** — MINTED-UNAUTHORED per **RULINGS-4 R4-8** arm (a) *"REGISTERED SUCCESSOR FORMATIONS; the mints stand"*, register live at `KF-W10 §6.D:543` with the three rows at `:558-560` (9 · 6 · 2 packets) ✓ · **W10's greens conditioned on artifacts that exist** — the relay re-point rests on `COHESION §4a`, which resolves ✓ · **O-21: PARTIAL** — the departed O-20 is correctly qualified and never cited as live, but the minted successor row `O-21` appears **zero** times (D-13) |

---

## §5 WHAT PASS 6 SHOULD MEASURE

1. **Test the repair's own new sentences first.** Three of nine escapes and two MAJORs are refutations of clauses **round 4 wrote**. The instrument: for every superlative, novelty and provenance claim minted this round, re-read the records the file already books from *before* checking anything else. `only` · `first` · `the corpus's` · `named here so` · `short by one` are the trigger phrases.
2. **Re-derive every span and every coordinate that is an instruction, not a citation.** D-3 is a cure that moved an error into the load-bearing direction because the seat corrected the *disagreement* rather than the *act*; D-8 is the same shape at the consumer set. Where a row says "the span IS the instruction", read the frontier lines and check the span against the sentence it serves, **in both directions**.
3. **Write the per-record disposition table.** D-15 is the structural form of every escape in this register: five engaged records have no §Excluded read reason, and four escapes live in three of them. Until each of the 58 carries a stated per-cell disposition — adopted / bank-source-for-a-lock / excluded-on-a-read-reason — the sixth recurrence is a matter of which record the next seat happens to re-open.
4. **Audit the RECONCILE seat as a writer, not as a certificate.** Its own writes are unordered relative to each other; `CLOSE-CERT.md §1`'s mtime table is the evidence and it is already in the tree. Any "final bytes" stamp in a file the seat wrote *before* it wrote the sibling is stale by construction (D-7).
5. **Grep the file's self-citations.** D-4 is a clause citing a §Excluded rule that was never written. For every *"X is not routed here (§Y)"*, resolve §Y and read it.
6. **Do not build an id census on `grep -E` alternation-with-anchors on this machine.** See §0. It returns 0 for ids that occur seventeen times. Use `perl` lookaround, or two half-patterns intersected.

---

*Authored fresh, 2026-08-28. Nothing inherited: every count, byte, command output, mtime and quotation above was derived by this seat. keyframes.js read-only at `origin/master 81a56990` via `git show`/`git grep`/`git ls-tree`; the 58 records, the sole carry and the eleven sibling specs read at their current bytes. No product source opened for writing; no spec edited; this file is the only file written.*
