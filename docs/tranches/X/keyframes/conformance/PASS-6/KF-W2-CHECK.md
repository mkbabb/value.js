# KF-W2 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 6)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W2.md` — **1,000 L / 346,265 B** (was 874 L / 286,177 B at pass 5), X.KF.W2 · Parse Façade, repaired **five** times (rounds 1–5) plus two RECONCILE passes. Live sha256 measured this seat: **`5f3656e32363e49d4fed431facc32c7a458f45d20dc6a69f427b9d0aa2bd11a4`**.
**Corpus authority**: the **58** `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` — re-enumerated by this seat (`ls kf-*.md | wc -l` → **58**; `wc -l` total **8,656 L**). Census derived **record by record, by reading**. Sole in-tree carry: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (`ls carry/` → one file, **366 L**).
**TREE LAW / substrate**: every keyframes.js witness re-verified at **`origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`** via `git show` / `git grep` / `git ls-tree` / `git cat-file` (read-only). Measured this seat: `HEAD 8281638c`, **252 dirty paths** — never used as witness substrate. Zero product-source writes; this file is the only file written.
**Seat**: FRESH. PASS-1..PASS-5 registers, all five RULINGS files, `PASS-4/CLOSE-CERT.md` and `PASS-5/CLOSE-CERT-2.md` were treated as claims to be re-tested. No denominator, no escape list, no witness reading, no certification is inherited.
**Verdict**: **DEFECTIVE** — **92 routed · 86 accounted (77 booked by banked id + 9 dispositioned without a row) · 6 escaped · 13 defects (4 MAJOR)**.

Round 5 is the strongest repair in this file's history and the first whose central instrument is **provable rather than asserted**: LAW E's write-last construction reproduces, all eleven closing hashes match live bytes, every re-run census returns its stated output, and the two convicted "FINAL BYTES" stamps are struck with their substance preserved. What convicts pass 6 is not a new class — it is the **scope of the round-5 cure**. The ENGAGED-RECORD DISPOSITION TABLE, minted to close the structural hole behind five of pass 5's nine escapes, states a counting rule that enumerates **48 records** and then writes **7 rows**; and every escape below sits in the 41-record remainder, or inside one of the seven rows that stopped short of its own record.

---

## §0 Method

Routing is read at the **practised** rule this file has carried since round 3: *any banked cell in the registry's declared subject matter* — value.js parse/serialize entry ingresses with an executed or traced outcome · failure postures over a value.js-bearing path · positive postures over a value.js Result/parse result · **R1 boundary negatives** · **parse-seam fidelity**. Token forms corroborate and never establish. The sweep was **record-major**, all 58, with the 49 records the file cites by id-anchor re-read for *remaining* cells — which is where every escape below is.

**Accounting convention, stated because pass 5's and this pass's denominators are not the same shape.** A routed cell is **BOOKED** when it lands as this file's §Carry defines a landing: *a gate, a bounds item, a census cell, a named cure with its locks, or an §Excluded line with a named owner*. Round 5 booked **no new row** and instead **dispositioned** its nine escapes — five into §Bounds' corpus-side arm, one into §Excluded's KF-CO-10 clause, one into §Excluded's kf-EasingSidebar re-write, one as G-W2-5's cited refuting datum (`K-11`), one as A-1/G-W2-6's cited bank of record (`KF-KC-1`). **All nine now have a stated landing and are counted as accounted**, which is why this register reads **86 accounted** where pass 5 read **77 booked**. The by-id total is unmoved at **77**, exactly as the round-5 shadow ledger's arithmetic invariant requires.

Instruments, all executed by this seat:

| instrument | result |
|---|---|
| `ls kf-*.md \| wc -l` · `wc -l` total | **58** · **8,656 L** ✓ |
| `shasum -a 256 waves/KF-W*.md` vs `PASS-5/CLOSE-CERT-2.md` §9's closing block | **11 of 11 hashes MATCH live bytes** ✓ — LAW E(1) write-last is a *construction*, verified, not an assertion |
| spec mtimes vs cert mtime | eleven specs **15:17:38–15:18:37**, cert **15:24:27** — cert written last ✓ |
| G-W2-2 witness **(i)** `git grep -n 'from "@mkbabb/value.js/css"' 81a56990 -- src/ \| wc -l` | **29** ✓ |
| G-W2-2 witness **(ii)** `… -l \| wc -l` | **27** ✓ |
| G-W2-2 command (ii) — the per-file whole-import-block runtime read, re-executed verbatim | **25 runtime specifiers over 13 modules** ✓ byte-exact |
| G-W2-2b demo arm, same command re-aimed | **8 runtime specifiers over 6 modules**, 7 files ✓ |
| A-5 `test/` arm · `scripts/` arm | **10 specifier lines / 10 files** · **0** ✓ |
| A-2 `git grep -n '\bformatCSSKeyframeString\b' 81a56990` | decl **`:136`** · four barrels (`emit/format/index:25` · `emit/index:47` · `compile/index:51` · **`public.ts:170`**) · lazy surface `load-engine:54`/`:109` · demo `KeyframeCardList.vue:60` ✓ |
| A-2 frontier body read `awk 'NR>=134 && NR<=148 {printf "%d\| %s\n", NR, $0}'` | **`:136` signature · `:137` `let s = keyframe` … `:146` `return s;` · `:147` brace** — **the round-5 span `:137-146` is CORRECT and the round-4 `:136-144` was destructive; the D-3 cure HOLDS** ✓ |
| A-3 `CQ_UNIT_RE` · A-4 `coerceToSyntax` | `:136`/`:202`/`:207` ✓ · `function.ts:2`+`:19`, two test **comment** hits `:11`/`:178` ✓ |
| A-1 alias root · relative spelling · symbol resolve | **5 live imports** ✓ · **2 test spellings + exactly 4 docs-prose hits** ✓ · three copy-3 consumers + the `nan-frame.test.ts:39` local false positive ✓ |
| G-W2-6 frozen census `git grep -n 'isFrozen\|Object.freeze' 81a56990 -- src/ test/` | **3 test assertions `:43`/`:67`/`:84`** ✓ · **23 `src/` lines** (interp-slot 1 · browser 4 · conditional 9 · core 6 · function 3) ✓ |
| OP-4 · frontier `package.json` | `check`/`check:lib`/`lint` byte-exact, **`grep -c vue-tsc` → 0** ✓ |
| G-W2-7 · `git ls-tree 81a56990 test/fixtures/keyframes/` | **14 `.css` + `manifest.json`** ✓ · `test/ingest/` **3 files** ✓ |
| stage-1 sibling anchors at CURRENT bytes | W3 `:1` ✓ · W4 `G-KFW4-1` `:206`, `G-KFW4-14` `:239` ✓ · W5 `B-15` `:352`, `B-16` `:353`, `B-12` `:349`, `G-OPTSET` `:409` ✓ · W6 Taxonomy `:37`, `KF-HA-13` `:440` ✓ |
| stage-2 forward quotations (W8) at CURRENT bytes | **3 of 3 fragments return 1** ✓ |
| W9 `§H` · W10 `§6.C-H` / `§6.D` / `§6.C-B` / `O-21` | §H = *"Wave-law rows"* `:204`, register `:210` ✓ · W10 `O-21` `:67`/`:533` ✓ |
| COHESION `sed -n '116p;129p'` | §4a heading + the **O-20 DISPATCHED 2026-08-28** row, verbatim ✓ |
| the new round-5 landings (D-6's cure) | `KF-W3 §Carry` row **`C-3`** (KF-ET-32, W3 leg) at `:205` ✓ · `KF-W5 §Carry Arm B` row **`B-12`** (KF-ET-32, registry arm) at `:349` ✓ — **both exist; the read reason is TRUE** |
| F6 base · X/Y/Z id presence | **28 numbered rows** ✓ · X1–X9 ✓ · X10–X14 present as `*(=Xn)*` at F3 `:542-546` ✓ · X15 ✓ · Y1–Y8 ✓ · Z1–Z7 ✓ — **77 of 77 enumerated by id** |
| records cited by id-anchor `grep -oE '⟨kf-[A-Za-z.]+'` | **49 distinct records** — **this is the number that convicts §Excluded's new table (D-1)** |

---

## §1 WHAT REPRODUCES — and round 5's central cure is real

### 1a · The hash-proven close is the first verification claim in this program that cannot be faked

Pass 4's certificate was falsified by its own author 22 s later; pass 5's D-7 convicted two stamps as unperformable by construction. **LAW E's answer reproduces exactly.** `shasum -a 256 waves/KF-W*.md` against `CLOSE-CERT-2.md` §9's closing block returns **eleven of eleven identical hashes at the live bytes**, KF-W2's among them (`5f3656e3…11a4`), and the cert's mtime (**15:24:27**) is later than every spec's. The mechanism that produced nine of the program's sixteen drift-tail rows — *a seat stamping clocks it cannot keep* — is retired and replaced by something a fresh seat can re-derive in one command. **This is the strongest single structural repair in the X·KF corpus and it should be said first.**

### 1b · The D-3 span cure is correct, and the direction matters

Pass 5 convicted `:136-144` for swallowing the `export function` signature. The round-5 re-cut states the span **by content** — first line `let s = keyframe`, last line `return s;` — with an executable falsifier. Read at the frontier by this seat, the body is exactly `:137-146` with `:136` and `:147` surviving. Every **live** spelling in the file is now `:137-146` (drift table `:90` · §Bounds owned row `:119` · §Disjointness `:284` · G-W2-3 witness `:702` · G-W2-3 re-cut `:704`); the surviving `136-144` strings are all narrative or strikethrough. **The act is cured. Only its receipt's arithmetic is not (D-6).**

### 1c · The censuses, the gates and the sibling seam

Every LAW-A census reproduces byte-for-byte, including the two whose figures pass 5 checked and this seat re-derived independently: G-W2-2 command (ii) returns **25 runtime specifiers over 13 modules** and the demo arm **8 over 6**, exactly as printed. The frozen census returns three assertions and 23 `src/` lines under the file's own stated counting rule. OP-4 is byte-exact with zero `vue-tsc`. Every stage-1 anchor resolves at the siblings' **current** bytes, and the two round-5 landings the D-6 cure invented — `KF-W3 §Carry · C-3` and `KF-W5 §Carry Arm B · B-12` — **both exist and both carry `KF-ET-32`'s legs as described**. The three W8 forward fragments each return 1. `COHESION §4a` reproduces at `:116`/`:129`. **The drift class is dead at this file.**

### 1d · The round-5 dispositions are honest work

The five corpus-side census entries (§Bounds), the KF-CO-10 clause, the kf-EasingSidebar re-write on the narrow ground, `K-11` as a cited refuting datum with its do-not-re-derive lock, and `KF-KC-1` as the contract's shape half — all are present, all quote their banks faithfully, and **none inflates the floor**. The arithmetic invariants the shadow ledger published as testable hold: **F3 floor 19 ✓ · F6 base 28 ✓ · booked total 77 ✓ · 8 born-RED + 1 MONITOR ✓**. Where the ruling and the check differed (D-1's exclusion-vs-booking, D-5's cite-vs-book), the file states the difference at the cell rather than smoothing it — which is the correct posture and is recorded here as such.

---

## §2 ID-KEYED CENSUS — 92 routed · 86 accounted · 6 escaped

**Accounted**: 28 (F6) + 19 (round 1) + 15 (X1–X15) + 8 (Y1–Y8) + 7 (Z1–Z7) = **77 booked by banked id**, all 77 verified present by id this seat; **+ 9 dispositioned without a row** at round 5 (KF-ET-32 · S-B · C-3⟨TFP⟩ · KF-TFP-18 · kf-TypingDots ruling 9 · KF-ES-13 · KF-CO-10 · K-11 · KF-KC-1) = **86**. **Routed** = 86 + the six below = **92**.

### 2a · The six escapes

| # | id ⟨record:line⟩ | occurrences in `KF-W2.md` | why it is in this register's subject |
|---|---|--:|---|
| **E1** | **KF-ET-1 · D-M-1 = C-1 = L·D-2** ⟨kf-EasingTarget:37⟩ **BLOCKER (unanimous)** | **3 — all naming it as *another* row's lock home; ZERO dispositioning it** | *"17 of 28 tiles copy a curve with Δ > 0 against the one painted … **10 via `cubicBezierToString`'s `toFixed(2)` alone** — 15 of 23 quads round, each by exactly 0.005"*, and the rider verbatim: *"**Rider letters → KF.W5: value.js needs a lossless timing-function serializer twin for `parseTimingFunction`**, and `easing()`'s analytic-first resolution order documented in the `.d.ts` (cross-referenced to the V·π parser-proof round-trip concern)."* An executed value.js **serializer-precision** measurement plus a **value.js entry-point-contract ask at the exact seam G-W2-6 publishes** — and **the row `KF-ET-2`'s cure-lock locks**, where KF-ET-2 is a cell this file books at F0 (D-2) |
| **E2** | **kf-KeyframesEditor ruling 9** ⟨kf-KeyframesEditor:153⟩ | **0** | *"**The engine's selector guard (`frame-compiler.ts:135-168`)** (reader-2's addition, adopted) — **fail-explicit, total, correctly frozen; what makes KF-KE-2 a consumer defect, not a library one.**"* A positive posture over a value.js-bearing parse path **at a module this file's §Bounds owns** (`frame/compiler.ts`, modify-carve), and **the bank's stated qualifier on F3 row 19** — the row this file books (D-3) |
| **E3** | **KF-KE-58 · C-m7** ⟨kf-KeyframesEditor:103⟩ | **0 here and 0 in all eleven X·KF specs** | *"three async engine calls **opt out of the closure's own `withErrorToastAsync` contract** (`:45`, `:210`, `:280`); no `app.config.errorHandler`. Reachability honestly UNPROVEN; **the asymmetry is the row.** … → **KFED-UNIT**."* An **absence-of-posture over an engine-bearing path** — the literal shape of F3 **row 10** (kf-KeyframesStringControls `C-2`, *"absence-of-posture → NO-WAVE-OWNER"*), in the record this file books five cells from (D-4) |
| **E4** | **kf-KeyframesEditor ruling 8** ⟨kf-KeyframesEditor:152⟩ | **0** | *"**`parseAnimationCSS`'s kept invariant + `withErrorToastAsync`** (reader-2's addition, adopted) — **one grammar authority, no regex pre-detection, structured diagnostics converted to typed errors, Retry actions**; why KF-KE-58 is an asymmetry rather than a missing posture."* The bank's own **concurring reading** of the very docblock §Bounds cites as the census's model — the exact relation the file entered `S-B` under one round earlier (D-8) |
| **E5** | **KF-AV-8 · L·M-5 = C-3 (+ C-16)** ⟨kf-AnimationVisualizer:49⟩ | **0** | *"the lone deep `@src` import … **the target module is value.js-bearing, parser-touching, and side-effectful at module eval** … `browser.ts` imports `@mkbabb/value.js/{value,css}` and installs the module-eval `window.resize` listener."* A demo-side **graph-entry qualifier on a value.js parse-surface module** — the same class as `KF-ET-32`'s *link-not-call*, which this file entered at round 5 — folding by reference to `KF-CE-12`, an id §Excluded routes by name (D-9) |
| **E6** | **kf-EasingScene SUP-2** ⟨kf-EasingScene:131⟩ | **0** | *"the value.js consumption is the model the glass-ui consumption is not: **subpath-only, real named exports, exact-pinned 4.0.0, reproducible under `npm ci`** — the precise inverse of F-1 in the same tree."* Probably **out** of subject by this file's own kf-EditorStartScreen rule (*"a correct-consumption positive over a subpath edge is not a posture"*) — **but kf-EasingScene has no engaged row to say so**, which is D-1 in one cell (D-10) |

### 2b · Where the escapes sit, and the mechanism

**All six sit in records this file books cells from** — kf-EasingTarget ×3 booked · kf-KeyframesEditor ×5 booked · kf-AnimationVisualizer ×2 booked · kf-EasingScene ×2 booked. **Three of the four host records carry no remainder disposition at all**, and the fourth (kf-EasingTarget) *does* carry one — which is the sharper fact, because that row disposes `KF-ET-32` and silently drops `KF-ET-1`, the id the file itself leans on twenty lines away.

**The mechanism is neither instrument (round 3), nor basis (round 2), nor re-entry-as-such (round 4), nor the repair's own sentences (round 5). It is SCOPE.** Round 5 named the missing thing precisely — *"the missing thing was never a cell; it was a **relation**, and the fourth one is now named"* — wrote a counting rule that enumerates **48 records**, and applied it to **7**. The relation exists; the sweep does not. **Pass 5's own §5 said it in advance**: *"Until each of the 58 carries a stated per-cell disposition … the sixth recurrence is a matter of which record the next seat happens to re-open."* This seat re-opened kf-KeyframesEditor and kf-AnimationVisualizer.

---

## §3 THE DEFECT REGISTER

### D-1 · MAJOR — the ENGAGED-RECORD DISPOSITION TABLE's own counting rule enumerates 48 records; the table has 7 rows

§Excluded's new table (`:886`→) opens with the receipt R5-11 requires, verbatim:

> *Counting rule, stated AT the receipt (R5-11): the unit is a RECORD, not a cell; **a record enters this table iff (i) this file books ≥1 cell from it or cites ≥1 of its ids, AND (ii) it carries no row in the ten-record read-reason table above.** Command: for each candidate, `grep -c '<record-stem>' KF-W2.md` > 0 ∧ absent from the table above.* **Seven records; seven rows.**

Measured this seat, by the rule's own clauses:

```
$ grep -oE '⟨kf-[A-Za-z.]+' KF-W2.md | sed 's/⟨//' | sort -u | wc -l
      49          ← records cited by banked-id anchor (clause (i), read strictly)
   of which kf-EasingSidebar is the ONE that also carries a ten-record read reason
$ 49 - 1 = 48     ← records satisfying (i) ∧ (ii)
$ table rows      = 7
$ shortfall       = 41
```

The rule's own weaker clause (`grep -c '<record-stem>' KF-W2.md > 0`) returns **58**, i.e. **48 by construction** after clause (ii). Either reading returns 48; neither returns 7. **The seven rows are pass 5's escape-host list (its D-15 named five; round 5 added kf-TypingDots and kf-KeyframeCard), presented under a rule that describes a set seven times larger.**

**Why this is the pass's headline and not an accounting nit.** (i) It is the **structural hole the table was minted to close**, and the file says so in its own voice: *"a partly-adopted record needs its remaining cells dispositioned as much as an untouched one does."* (ii) It **fires G-W2-1's own falsifier**, added at round 4 and restated at round 5: *"the gate reds if any record is dispositioned at the RECORD level rather than cell by cell"* — 41 records are dispositioned at no level at all. (iii) It is the shape of **every escape in §2a**: three of the four host records are in the 41. (iv) It is an **R5-11 breach at the one receipt R5-11 was written for** — a stated counting rule whose enumeration its own figure contradicts, which is the class R2-5 first convicted (*"a gate whose named command does not produce its stated reading is not a gate"*).

**Cure**: either sweep the table to its stated scope (48 rows, one line each — most will read *"no remaining cell in this register's subject matter"*, as kf-EditorStartScreen's and kf-LayerConfigPanel's already do), or **re-cut the counting rule to the set actually swept and say so** — *"the seven records pass 5 identified as escape hosts; the remaining 41 are swept at pass 6 / at wave-open"* — with the outstanding count named. A receipt may under-deliver; it may not under-deliver behind a rule that says otherwise.

### D-2 · MAJOR — ESCAPE E1: the file books `KF-ET-2`, carries its cure-lock verbatim, and never names the row that lock locks

§Carry F0 books **KF-ET-2** ⟨kf-EasingTarget:41⟩ as the easing-organ census cell and carries its cure-lock in full — *"the corpus-unanimous cure (`delete literal; bind demo.cssValue`) is **REFUTED as a discharge of C-2 and adjudicated harmful** … 20 of 28 specimens on invalid CSS"* — and closes *"the component cure stays NO-WAVE-OWNER, **one spec with KF-ET-1**."*

**`KF-ET-1` is the row that lock is a lock ON**, and it is this register's subject twice over. Read at the record's own bytes ⟨`:37`⟩:

- **an executed value.js serializer measurement**: *"17 of 28 tiles copy a curve with Δ > 0 against the one painted (max 0.158 end-to-end, `ease-in-out-circ`; 7 via registry order + rounding, **10 via `cubicBezierToString`'s `toFixed(2)` alone** — 15 of 23 quads round, each by exactly 0.005, 10× the sidebar's own `quadEq` tolerance)"*;
- **a value.js entry-point-contract ask at the seam G-W2-6 publishes**: *"**Rider letters → KF.W5: value.js needs a lossless timing-function serializer twin for `parseTimingFunction`**, and `easing()`'s analytic-first resolution order documented in the `.d.ts` (cross-referenced to the **V·π parser-proof round-trip concern**)."*

Occurrences of `KF-ET-1` in `KF-W2.md`: **3**, at `:279` (KF-TFP-18's disposition — *"its grade and its cure-lock live at `KF-ET-1`"*), `:433` (inside KF-ET-2's paragraph), `:895` (the kf-TimingFunctionPanel engaged row). **Every one names it as another cell's landing surface; none states its relation to this register.** Meanwhile the kf-EasingTarget engaged row lists KF-ET-2 · KF-ET-28 · Z5 as taken and dispositions exactly one remaining cell — `KF-ET-32`.

**Three facts make this MAJOR rather than a missed row.** (i) **It is pass-5 D-6 recurring at the sibling id in the SAME record, one round on** — D-6 convicted the absence of a read reason for `KF-ET-32`; round 5 wrote one, naming its two landed legs by id (`KF-W3 §Carry · C-3`, `KF-W5 §Carry Arm B · B-12` — both verified present by this seat), and did not perform the identical act for the id sitting four lines above it in the same record. (ii) **The landing exists and is nameable**: `KF-W5 §Carry Arm B` row **`B-22 · KF-ET-1` (rider letters only)** carries the serializer-twin ask verbatim, re-read by this seat at W5's current bytes — so the cure is a one-clause anchor-only cite, exactly the form `KF-ET-32` got. (iii) **It is this file's own Y7 lesson**, stated in its own words: *"A lock carried without its instance is M-25's letter over its fact."* Round 3 booked `KF-CB-1` because `KF-CB-33`'s organ lock was carried without its instance. Round 5 quotes `KF-ET-2`'s cure-lock and drops the instance the lock names.

**Cure**: add `KF-ET-1` to the kf-EasingTarget engaged row with a stated relation — *read, not booked; the serializer-precision measurement is an input to `G-W2-7`'s fidelity net (the same argument that adopted Z2 and entered KF-TFP-18); the actionable rider is landed at `KF-W5 §Carry Arm B · B-22` (rider letters only), anchor-only; the row itself is NO-WAVE-OWNER, cure-locked by `KF-ET-2`, which this file books* — and state at F0 that KF-ET-2's lock is a lock **on KF-ET-1**.

### D-3 · MAJOR — ESCAPE E2: the bank's qualifier that makes F3 row 19 a *consumer* defect is not carried

§Carry F3 **row 19** books **`KF-KE-2 · L-B1 + D-2(read) + C-M3`** ⟨kf-KeyframesEditor:41⟩ as *"a `value.js Result → TypeError → no user-visible failure` posture"*, quoting the write into *"a value.js deep-frozen selector"* and Vue's `callWithAsyncErrorHandling` swallow.

The same record's ruling 9 ⟨`:153`⟩, verbatim and unquoted anywhere in this file: *"**The engine's selector guard (`frame-compiler.ts:135-168`)** (reader-2's addition, adopted) — **fail-explicit, total, correctly frozen; what makes KF-KE-2 a consumer defect, not a library one.**"* Occurrences of `frame-compiler` in `KF-W2.md`: **0**. Occurrences of the phrase `consumer defect`: **0**.

**It is load-bearing in three directions and this file needs it in all three.** (i) **M-25 depth** — it is the bank's own qualifier on the row this file books, and the file's standing rule is that the fold, the lock and the qualifier travel with the row (the discipline round 5 restored at Y2's `L-13` clause). Without it, row 19 reads as a library posture in a registry whose entire subject is where library and consumer meet. (ii) **It is a positive posture over a parse path at a module this wave OWNS** — `src/animation/compile/frame/compiler.ts` is a §Bounds `modify-carve` row (*"`:146` calls kf's own `parseKeyframeSelector` — the façade's first natural consumer"*), and its guard is *"fail-explicit, total, correctly frozen"*: the shape the façade is being built to generalise, measured at the exact module the façade's first consumer lives in. F3's positive block holds five reference rows and none of them is in `src/`. (iii) **It corroborates G-W2-6's frozen-parse clause from the library side** — *correctly frozen* is the same invariant `value4-immutable-resolve.test.ts` pins at `:43`/`:67`/`:84`.

**Cure**: carry ruling 9 as F3's sixth positive reference row (outside the count, per the block's own discipline), or — minimally — attach its clause to row 19 so the posture is stated as the consumer-side defect the bank ruled it to be.

### D-4 · MAJOR — ESCAPE E3: `KF-KE-58` is an absence-of-posture over an engine-bearing path with zero landing anywhere in X·KF

⟨kf-KeyframesEditor `:103`⟩, verbatim: *"**KF-KE-58 · C-m7** — three async engine calls **opt out of the closure's own `withErrorToastAsync` contract** (`:45`, `:210`, `:280`); no `app.config.errorHandler`. Reachability honestly UNPROVEN; **the asymmetry is the row.** KF-KE-4 raises the stakes note adopted: with Apply inert, an unhandled rejection here can be a user's only signal. → **KFED-UNIT**."*

Measured this seat: `grep -c 'KF-KE-58' KF-W2.md` → **0**, and `for f in KF-W*.md; do grep -c 'KF-KE-58' $f; done` → **0 across all eleven specs**. It is a banked cell with **no home in the authored eleven**.

**It is squarely this registry's subject, by this registry's own precedent.** F3 **row 10** books kf-KeyframesStringControls `C-2` on exactly this shape — *"the pane's only content-production path is **unguarded** over a throwing, value.js-bearing serializer … **only the mount path is bare**"* — with the bank's disposition *"absence-of-posture → **NO-WAVE-OWNER**; reachability → KF.W3"*, i.e. **an unproven reachability does not disqualify an absence-of-posture row; it splits it.** KF-KE-58 has the identical structure (`withErrorToastAsync` is the house idiom this file books as positive row **★ S-7**; the three calls are engine calls that reach the grammar through `loadAnimationEngine`), in the record this file books **five** cells from, and its own bank names it in the same breath as ruling 8's `parseAnimationCSS` invariant.

**Cure**: book it as F3 **row 20** at the bank's disposition (KFED-UNIT, reachability UNPROVEN carried verbatim, no cure moved) and move the floor **19 → 20**; or state a read reason at kf-KeyframesEditor's engaged row that distinguishes it from row 10 — but the distinction must be written, because on the face of the two rows there is none.

### D-5 · MAJOR — the D-8 cure's own pastes print output their commands cannot produce, and one elides two matching lines

The round-5 D-8 cure exists because *"an integer that is an **INSTRUCTION** and not a citation is **re-derived, never smoothed**"*, and it installs a binding convention with three pasted derivations at `:147-158`. Re-run at the frontier by this seat:

1. **`awk 'NR>=12 && NR<=16'` emits no line numbers.** Both pasted blocks print `12| `, ` 2| ` prefixes their stated commands do not produce. The file's own working idiom sits **nineteen lines below** at census A-2: `awk 'NR>=134 && NR<=148 {printf "%d| %s\n", NR, $0}'` — which does produce them, and which this seat re-ran successfully.
2. **The second paste is TRIMMED.** Stated: `git show 81a56990:test/demo/instrument/value4-editor-boundary.test.ts | awk 'NR>=2 && NR<=6'` → three lines shown (`2`, `5`, `6`). The command returns **five**; `:3` (`    requireKeyframeSelector,`) and `:4` (`    selectorPercent,`) are dropped without an elision mark.
3. **The third names an unrunnable path**: `git show 81a56990:demo/…/composables/useKeyframeOps.ts` — the `…` is not a path.

**This is pass-4 D-2's convicted class recurring inside the round-5 cure**, and the file itself installed the rule it breaks: *"every pasted command in this file is re-run at write time, and its output is **transcribed, never summarised**."* It also arms G-W2-6's own falsifier one clause over (*"fails if any pasted census in this clause is not reproduced by re-running its own command"*) — narrowly out of that clause's scope, and identical in kind. **The substance survives**: the specifier/symbol convention is correct, the coordinates `timelineEngine.ts:16` (symbol `:15`) and `value4-editor-boundary.test.ts:6` (symbol `:5`) are exact, and the third consumer's assertion at `:26` is verbatim. What fails is the derivation's reproducibility — in the cure whose whole subject is that an instruction must be re-derivable.

**Cure**: re-run all three with the A-2 `printf` idiom, transcribe whole, and spell the third path.

### D-6 · MINOR — the A-2 site receipt's post-condition is refuted by its own stated command

The round-5 site receipt states its counting rule at the receipt, correctly, and then states a result: *"Run at repair round 5 against the pre-repair bytes: **8 lines · 9 occurrences** … **All nine are re-cut to `:137-146` at repair round 5 except the round-4 ledger's own occurrence**, which is preserved as the dated predecessor spelling under E-3 and is marked there."*

Run at the **closing** bytes with the receipt's own command:

```
$ perl -ne '$c=()=/136-144/g; $t+=$c; END{print $t+0}' KF-W2.md   → 9 occurrences
$ grep -c '136-144' KF-W2.md                                      → 6 lines
```

The receipt's post-condition implies **1**. Nine survive, at `:164` (×3, the A-2 strike block), `:189` (the receipt's own quoted command), `:191` (the SHADOW row), `:962` (×2, the round-4 ledger — the one the exception names), `:968`, `:992`. **The substance is cured** — every *live* spelling is `:137-146` (14 occurrences over 13 lines) and no seat can execute the destructive span. What is wrong is the receipt: eight of the nine survivors are round-5's own new sentences *about* the old spelling, and the receipt counted only the sites it re-cut.

**Cure**: state the post-condition in the units the rule declares — *"live spellings: 0 of 9 remain; narrative/strike occurrences: 8 minted this round, 1 retained under E-3"* — or count sites rather than occurrences and say so.

### D-7 · MINOR — the shadow ledger's own falsifier command contradicts the row it certifies

LAW F(2) act **2** closes: *"citing/terminus waves notified = **none** — the struck superlative was **never cited outside this gate** (`grep -n 'only banked instance' KF-W2.md` **is the check**)."*

Run at the closing bytes: **3 lines** — `:728` (inside G-W2-5, the strike note), `:970` (the repair-round-5 ledger), `:991` (the shadow ledger row itself). **Two of the three are outside the gate**, both minted by the same round that published the check. The claim about the *pre-strike* file is true; the check as written measures the *post-strike* file and returns a figure the sentence beside it denies. Same class as D-6, and the same cure: a check must name the bytes it is run against.

### D-8 · MINOR — ESCAPE E4: the bank's concurring reading of `parseAnimationCSS`'s invariant is unread while the tree's comment is the census's model

§Bounds' census cell quotes the **tree** docblock — *"The engine adapter is the single grammar authority … this module performs no regex pre-detection or second parse"* — as *"the single-grammar-authority invariant already stated in the tree"*, and round 4 attached **Z2** as its standing round-trip qualifier. The **bank's own reading of the same thing** is unread: ⟨kf-KeyframesEditor `:152`⟩ *"**`parseAnimationCSS`'s kept invariant + `withErrorToastAsync`** (reader-2's addition, adopted) — one grammar authority, no regex pre-detection, **structured diagnostics converted to typed errors, Retry actions**; why KF-KE-58 is an asymmetry rather than a missing posture."* Occurrences: **0**.

The relation is one this file already names and used one round ago: `S-B` was entered into the corpus-side arm precisely because *"A-2 is stronger with it than without it — without it the Tier-C re-cut rests on one seat's graph read, and with it two independent readings concur."* The affirmative cite at §Bounds rests on one seat's read of a comment; the bank read the same module and **agrees, with a limb the comment does not carry** (diagnostics → typed errors + Retry), which is the diagnostic-surface fact G-W2-6's contract owes. It also names **KF-KE-58** (D-4) as its own consequence.

### D-9 · MINOR — ESCAPE E5: `KF-AV-8`'s *value.js-bearing, parser-touching* qualifier folds into an excluded id that never names it

⟨kf-AnimationVisualizer `:49`⟩: *"**KF-AV-8 · L·M-5 = C-3 (+ C-16)** — the lone deep `@src` import breaches the demo's own written law … and **the target module is value.js-bearing, parser-touching, and side-effectful at module eval.** Proof re-run: … `browser.ts` imports `@mkbabb/value.js/{value,css}` and installs the module-eval `window.resize` listener … → **fold by reference to KF-CE-12** … → **KF.W8**; the depcruise-over-demo gate arm → **KF.W4**."* Occurrences in `KF-W2.md`: **0** (landed at `KF-W8.md` ×11 and `KF-W4.md` ×2, verified).

§Excluded excludes *"KF-CE-12's body — the `@src/animation/resolve/browser` deep import … **KF.W8's**; the depcruise gate arm is **KF.W4's**"*, so the **fold target** is dispositioned by id. The **folding id is not**, and its qualifier is the one that matters here: a demo-side module whose deep-import target is *parser-touching and side-effectful at module eval* is a **graph-entry fact about a value.js parse-surface module** — the same class as `KF-ET-32`'s *link-not-call*, which round 5 entered into the corpus-side arm as a qualifier on G-W2-2's census. This is the `L-13` shape D-16 cured at Y2: a banked id that a booking consumed, named nowhere, so a later seat reading a zero-occurrence id cannot tell a fold from a drop.

### D-10 · MINOR — ESCAPE E6: kf-EasingScene's `SUP-2` is very likely out of subject, and nothing in the file says so

⟨kf-EasingScene `:131`⟩ **SUP-2**: *"the value.js consumption is the model the glass-ui consumption is not: **subpath-only, real named exports, exact-pinned 4.0.0, reproducible under `npm ci`** — the precise inverse of F-1 in the same tree."* Occurrences: **0**.

By this file's **own** rule — written at round 5 in kf-EditorStartScreen's engaged row — *"a correct-consumption positive over a subpath edge is not a posture, not an ingress and not a boundary negative … this file does not book exemplars into a floor"* — SUP-2 is correctly **out**. It is filed here anyway because **kf-EasingScene has no engaged row**, so the rule that disqualifies it is stated for one record and not for the record it applies to. This is D-1 measured in a single cell, and it is the cheapest possible demonstration that the 41-record gap is a live liability rather than a formality: the file already knows the answer and has nowhere to write it.

### D-11 · MINOR — the POSTURE axis: `COHESION §0d` exists, is this repo's own bytes, and is not cited

§Sequencing records the three minted successors: *"**KF.W11 · KF.W12 · KF.W13 are MINTED-UNAUTHORED** (RULINGS-4 **R4-8**, arm (a) — the mints stand); their cargo, travelling locks and minting citations are registered at **`KF-W10 §6.D · SUCCESSOR-FORMATION REGISTER`**. **Anchor-only under LAW C(3)** — KF.W10 writes last and no prose of its is quoted here."* Measured: `grep -c '§6.D' KF-W2.md` → **4**; `grep -c '§0d' KF-W2.md` → **0**.

`docs/tranches/X/COHESION.md` **§0d** ⟨`:185`, read verbatim this seat⟩ — *"**ADDENDUM 2026-08-28 (later still) — THE MINTED-UNAUTHORED SUCCESSOR WAVES, DECLARED AT THE BOUNDARY**"* — carries exactly the fact, in this repo, measurable by this seat: *"**KF.W11 · KF.W12 · KF.W13 — MINTED … UNAUTHORED; cargo = the 17-packet partition 9+6+2 with the six travelling locks; authoring seat = the SS-1/SS-2 authoring block** … The successor register of record is `keyframes/waves/KF-W10.md §6.D`; **mechanism F (minted-wave roster census diffed against authored specs ∪ the register) is adopted program-wide — a mint with neither is a hard escape on sight.**"*

**This is the pass-4 D-1 cure applied at one site and not the other.** That cure's whole content was: *where a stage-2 fact is load-bearing here, its evidence is re-sourced to an artifact this seat can measure* — and it was performed exactly, for the relay vehicle, against `COHESION §4a` at `:116`/`:129`. The minted-successor fact has the same shape, the same repo-local authority one section away, and rests instead on a sibling that writes last and may be quoted only by anchor. A seat reading this cell today cannot verify the mints without opening a file the law forbids it to quote.

**Cure**: cite `COHESION §0d` beside the `KF-W10 §6.D` anchor, and carry mechanism F's sentence — a mint with neither a spec nor a register row is a hard escape on sight — which is a falsifier this wave's routing to three unauthored waves should be carrying anyway.

### D-12 · MINOR — three round-4 "FINAL BYTES" stamps were retained; their coordinates are now stale and their words are false

D-7 struck the two stamps that were unperformable **by construction** (W5, W8) and retained three (W6, W3, W4) as *"dated round-4 records under E-3, not live claims"*, on the test that *"each sibling's round-4 write preceded this file's."* Measured at the siblings' **current** bytes:

| retained stamp asserts | measured now |
|---|---|
| `grep -n 'Taxonomy (binding' KF-W6.md` → **`:35`** | **`:37`** |
| `grep -n 'KF-HA-13' KF-W6.md` → **`:398`, `:406`** | **`:440`** (one hit; `:432` is KF-HA-3) |
| `sed -n '1p' KF-W3.md` → the gated heading | **identical** ✓ |
| `grep -n 'G-KFW4-1\b' KF-W4.md` → gate at **`:205`** | **`:206`** |

**Every anchor holds** (the §-heading, the row id, the gate id), which is exactly why the retention costs nothing operationally — and is exactly why the stamps could have been converted rather than kept. The cell still reads *"RE-VERIFIED AT KF-W6's **FINAL BYTES**"* about a file written twice since. Round 5 struck two sentences of that form for saying something unperformable and kept three saying the same word about siblings it knew would move.

**Cure**: convert the three to the honest form D-7 already drafted — *"re-verified after the last per-wave write; the anchors hold and no coordinate is re-issued"* — and let `CLOSE-CERT-2.md` §9's hash table, which reproduces, be the only stamp in the program.

### D-13 · MINOR — kf-EditorHeader hosts the round's program-wide BLOCKER restoration and has no disposition here

This file books **X2 · `C S-A`** ⟨kf-EditorHeader:95⟩ — *"proving a negative: **the full import-closure walk that DECLINED an R1 parser-crash claim**"* — as the corpus's method exemplar for a declined R1 claim. kf-EditorHeader appears in **neither** §Excluded's ten-record read-reason table **nor** the seven-row engaged table.

It is named because its remainder is not empty and is not quiet: **`EH-4` · `EH-5` · `EH-8`** were dropped at round 4 on a hosting premise and **RESTORED LIVE at KF-W6 repair round 5 under RULINGS-5 R5-1 (BLOCKER)** — verified at `KF-W6.md:455-462`, *"three rows, three anchors, all in SURVIVING §Bounds files"*, with R5-1's own shadow entry as LAW F's first ledger row. Those three are a11y/sizing rows and are **correctly KF.W6's, not this register's** — which is precisely the one sentence this file owes and does not write. **A record that hosted the round's BLOCKER, and from which this register books its R1 method exemplar, should not be the record whose remainder is inferable only by a reader who opens KF-W6.** D-1 with a named consequence.

---

## §4 AXIS VERDICTS

| axis | verdict | ground |
|---|---|---|
| **(1) ID-KEYED CENSUS by record** | **DEFECTIVE** | 92 routed · 86 accounted (77 by banked id + 9 dispositioned) · **6 escaped**. **The by-id enumeration is complete and verified**: F6 = 28 rows, X1–X15, Y1–Y8, Z1–Z7 all present, 77 of 77 falsifiable by construction. What fails is **scope**: §Excluded's new disposition table states a rule enumerating **48** records and writes **7** (D-1), leaving 41 with no stated relation; all six escapes sit in records the file books cells from, three of them in the 41, and the fourth inside a table row that disposes one cell of its record and drops another (D-2) |
| **(2) RECEIPT REALITY** | **HOLD-WITH-RESIDUAL** | **The drift class is dead and the cure is provable.** All eleven `CLOSE-CERT-2.md` §9 closing hashes **match live bytes**, the cert is written last by mtime, every stage-1 anchor resolves at current bytes (W3 `:1` · W4 `:206`/`:239` · W5 `:349`/`:352`/`:353`/`:409` · W6 `:37`/`:440`), all three W8 forward fragments return 1, `COHESION §4a` reproduces at `:116`/`:129`, and the two new round-5 landings (`KF-W3 · C-3`, `KF-W5 · B-12`) both exist. Residuals: the D-8 cure's three pastes do not reproduce as written and one is trimmed (D-5); three retained "FINAL BYTES" stamps carry now-stale coordinates (D-12) |
| **(3) M-25 DEPTH + MECHANISM S** | **DEFECTIVE (depth) / HOLD (shadow)** | **The shadow ledger's arithmetic invariants all hold** — floor 19 ✓, base 28 ✓, booked 77 ✓, 8 born-RED + 1 MONITOR ✓ — and its five acts each carry a per-row anchor at its own record, with the terminus re-sweep verifiable. Every carried lock, rider, dissent and cure-shape lock spot-checked verifies at its anchor, and Y2's restored fold clause is exact. Against that: **three carried rows lost a limb** — KF-ET-2's cure-lock is carried without the row it locks (D-2), F3 row 19 without the bank's *consumer-defect* qualifier (D-3), and `KF-AV-8`'s fold is unnamed at an id §Excluded routes by name (D-9). Two ledger self-checks return figures their own sentences deny (D-6, D-7) |
| **(4) GATES** | **DEFECTIVE** | Every gate has a reachable GREEN and a live witness re-executed here: G-W2-2's two commands return **29/27** and **25 over 13**; G-W2-2b's **8 over 6**; G-W2-3's span is re-cut correctly by content; G-W2-6's frozen census returns **three** assertions and **23** lines and its GREEN *"passes the moment the façade returns what the library already returns"*; G-W2-7's **14 + manifest** verify; OP-4 byte-exact with `vue-tsc` **0**; G-W2-8's count arm honestly homed at KF.W8. Operands are corpus-derived and landing surfaces are lawful **except** `KF-ET-1`, which the file uses as a landing surface for `KF-TFP-18` without giving it a bounds row of its own (D-2). **G-W2-1 reds by its own falsifier** — *"the gate reds if any record is dispositioned at the RECORD level rather than cell by cell"* — on 41 records (D-1), and its floor is refutable at **row 20** by `KF-KE-58` (D-4) |
| **(5) POSTURE** | **HOLD-WITH-RESIDUAL** | **W4 head honoured** — OP-4's `check`/`check:lib`/`lint` byte-exact at the frontier, `vue-tsc` **0**, `G-KFW4-1` live at `KF-W4.md:206` composing with the frontier script ✓ · **W3 gated-unscheduled** — `KF-W3.md:1` = *"# KF.W3 — Parser Consumption (GATED, never scheduled)"*, `RC-P` named as a predicate, no version literal at any of the three sites ✓ · **O-21 CURED** — the pass-5 D-13 finding is fully repaired: `O-21` appears **6** times, named by id at all four sites, anchors `KF-W10 §6.C-B`/`§6.D` (verified `:67`, `:533`) and `KF-W1 §Sequencing`/`§Carry C-10`, anchor-only, with the O-20 departure carried as the standing qualifier ✓ · **§6.D successor register cited** ✓ ⟨4 sites⟩ · **`COHESION §4a` cited and reproducing** ✓ — but **`COHESION §0d` is NOT cited** (D-11), so the minted-successor fact rests solely on the sibling that writes last · **EH-4/5/8**: restored live at `KF-W6.md:455-462` under R5-1 with true anchors, correctly not this register's — and kf-EditorHeader carries no disposition here to say so (D-13) |

---

## §5 WHAT PASS 7 SHOULD MEASURE

1. **Sweep the disposition table to its own stated scope before reading anything else.** D-1 is the pass, and the instrument is one line: `grep -oE '⟨kf-[A-Za-z.]+' KF-W2.md | sort -u | wc -l` → **49**, minus the one that also carries a ten-record read reason → **48**, against the table's **7**. Every escape in §2a is in the gap. Until the 48 are swept, the seventh recurrence is again a matter of which record the next seat opens.
2. **For every id this file names as ANOTHER cell's landing surface, check that the named id has a landing of its own.** D-2 is that check failing once: `KF-TFP-18` is forwarded to `KF-ET-1`'s lock, and `KF-ET-1` has no row, no census entry and no read reason. Grep the file for *"the grade and the cure-lock live at"*, *"the row is at"*, *"folds to"*, *"booked at"* — and resolve each target.
3. **Read the RULINGS of every record the file books a posture from, not only its roster rows.** Two of this pass's six escapes (E2, E4) are numbered **rulings**, not `KF-XX-n` ids, in a record the file books five roster cells from. A register that greps for id-shaped strings will not see them.
4. **Re-run every pasted command with its own text and diff the output.** D-5 is pass-4 D-2 recurring inside the round-5 cure. The test that catches it: paste the command into a shell verbatim, including the path; if it does not run, or if its output has fewer lines than the file prints, the receipt is not a receipt.
5. **Run every self-check the shadow ledger names, at the closing bytes.** D-6 and D-7 are both ledger sentences refuted by the commands the ledger itself nominates. A falsifier printed beside a claim must be run *after* the edit that the claim describes.
6. **Prefer this repo's bytes to a stage-2 anchor wherever both exist.** D-11: `COHESION §0d` sits one section from the `§4a` register this file already cites correctly, and carries the minted-successor fact plus mechanism F's falsifier. The pass-4 D-1 cure was a general rule and was applied as a single instance.
7. **The hash table works — use it.** `shasum -a 256 waves/KF-W*.md` against `CLOSE-CERT-2.md` §9 is an eleven-way verification a fresh seat can complete in one command, and it reproduced here. Re-run it first at pass 7; if a spec's hash has moved without a new cert, the round's close is void before any content is read.

---

*Authored fresh, 2026-08-29. Nothing inherited: every count, byte, hash, command output and quotation above was derived by this seat. keyframes.js read-only at `origin/master 81a56990` via `git show`/`git grep`/`git ls-tree`/`git cat-file`; the 58 records, the sole carry, the eleven sibling specs, `COHESION.md` and `PASS-5/CLOSE-CERT-2.md` read at their current bytes. No product source opened for writing; no spec edited; this file is the only file written.*
