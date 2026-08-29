# X·F CONFORMANCE PASS 5 — UNION ADJUDICATION (census-freeze verdict)

**Seat**: union adjudication, 2026-08-29. **Inputs**: the 11 PASS-5 check files in this directory (all read; all 11 locally DEFECTIVE) · `PASS-4/UNION.md` (P4-1..P4-12) + `PASS-4/RULINGS-4.md` + `PASS-4/CLOSE-CERT-2.md` · `waves/F-W0..F-W10.md` (settled bytes) · `conformance/CENSUS-CANONICAL.md` (the census of record) · the 66 `fr-*.md`. Toolchain: `bash` with `PATH=/usr/bin:/bin:/usr/sbin:/sbin`, BSD `/usr/bin/grep`/`sed`/`awk`/`shasum` throughout — never the interactive shell's ugrep. This file is the seat's only write.

**FIRST ACT — THE HASH GATE: PASSED.** ⟨cmd⟩ `shasum -a 256 waves/F-W*.md conformance/CENSUS-CANONICAL.md` re-run this seat, all twelve digests **byte-identical** to `PASS-4/CLOSE-CERT-2.md` §8's frozen table (F-W0 `282f0c12…` · F-W1 `a1302689…` · F-W2 `578dba1f…` · F-W3 `a89c3386…` · F-W4 `39e1a60b…` · F-W5 `132c0319…` · F-W6 `c8c6d1d7…` · F-W7 `5cc3346d…` · F-W8 `1e3698ad…` · F-W9 `e9a9c301…` · F-W10 `bb58dc40…` · CENSUS `a450b8e9…`). **The census freeze HOLDS; the round stands and is adjudicated on its merits.** (Distinguish this from the R4-8.3 pin tables *inside* the specs, which are stale — §6 P5-6. The freeze is clean; the specs' internal fingerprints of each other are not.)

**VERDICT: DEFECTIVE — NOT CONFORMANT.** The round's one genuine, program-wide achievement is real and is recorded first: **R4-10 landed whole.** `CENSUS-CANONICAL.md` is the sole roster operand in all eleven specs (no rival detector, no self-derived denominator survives as an operand anywhere — CLOSE-CERT-2 Class E re-confirmed by every pass-5 seat); pass 4's manufactured atomiser tier is DISSOLVED; the denominators are canonical everywhere. And then: **the roster is not closed (28 escapes, every sampled one re-verified absent), fabrication is not zero (11, every one re-run and sustained this seat), the portable-command law is breached at five waves, the F-W4 round-4 sweep transcript is false at both founding receipts, and eight of RULINGS-4's ten families have verified unapplied sites.** 11/11 waves locally DEFECTIVE; **132 seat rows (115 against the specs · 17 against the canonical/RULINGS-4) fold → 18 union defects: 3 BLOCKER · 6 HIGH · 5 MEDIUM · 4 LOW.**

Severity normalization: F-W1's MAJOR/MINOR/INFO scale maps MAJOR→HIGH, MINOR→MEDIUM-or-LOW by content; F-W8's two MEDIUM-HIGH rows are carried at MEDIUM weight in the fold and their substance rides P5-5/P5-8.

---

## §0 ADJUDICATIONS OF THE CHECKS THEMSELVES

This seat re-ran **eleven** of the checks' convictions at the bytes before sustaining anything — one or more per wave, chosen for load: F-W0's PP-GATE/PP-DEAD canonical lines (corroborated independently by the F-W3 seat's own receipts) · F-W1's `S-4` escape (sole hit = line 516, inside the pasted canonical-roster block — outside it, ∅) and the `D-14 · D-15 · D-17` booking at `:322` against three canonical **UNROUTED** homes and `FR-IC-17`'s **TERMINAL (∅)** home · F-W2's `:334` eight-id list under the word "six" · F-W3's published F-W4 pin `9a6cf2b11fc6` (at `:783`) against live `39e1a60b3fc9` · **both F-W4 BLOCKER receipts** (`git show ce2622d1:…F-W4.md` → `1 · 0 · 0`, not the published `1 · 0 · 3`; the PAW loop over settled bytes → `7 · 3 · 3 · 7`, not §Y.2(3)'s republished `4 · 3 · 3 · 7`) · F-W4's `FR-AH-27` booking at `:321` ("expanded, `-19 · -23 · -25 · -26 · -27 …`") against canonical home **F.W1** · F-W5's `$V` (never assigned anywhere; `$X` prose-declared at `:36`, never in-block) · F-W6's `FR-EMT-20` **BOOKED — §2.7** against canonical home **F.W5** · F-W7's bare-`docs/` operand (exit 2 from every declared base; resolves only at the repo root, which §0(B) does not name) · F-W8's `C-28` (canonical's sole `C-28` row is fr-AnimationControls **GLASS-RELAY**, `:455`; no fr-CanvasControlsDock `C-28` row exists, yet §6a row 40 carries it in the identity column of G15's LHS) · F-W10's `grep -cF 'ExportModal' waves/F-W10.md` → **0**.

**Eleven of eleven reproduce. No check conviction is overturned this pass.** All 11 local DEFECTIVE verdicts are SUSTAINED. Three graded observations:

1. **F-W6 `FR-EMT-20` (sustained HIGH, with the mitigation recorded).** The booking was *ordered by* round-3's own ruling (R3-7.1) before the canonical existed; R4-10 postdates and governs, so the conviction stands — but the cure is a one-line conversion (BOOKED→CITED to F-W5's E10 family), not a substantive error. Same posture for `AA-10` and `B-2`.
2. **F-W8 `C-28` (sustained HIGH).** Row 40's own cell says "F.W8 … does **not** book C-28" — yet the id occupies a row of the forty-identity table G15's closure stamp rests on, and the canonical has no such row to match it. Fabrication at the roster level per R4-10's letter regardless of the cell's disclaimer.
3. **F-W7's minted-ids row and F-W9's D-11 pin disclosure are carried as RECORDED, not convicted** — both file themselves that way and this seat concurs.

---

## §1 AXIS 1 — THE ROSTER (task item 1)

Per-wave, from the checks, spot-re-derived where load-bearing:

| wave | roster (canonical) | booked | cited | **escaped** | local verdict |
|---|---|---|---|---|---|
| F-W0 | 56 (canonical understates by 1 — PP-GATE, §6 P5-9) | 56 | 30 | 0 | DEFECTIVE |
| F-W1 | 362 | 302 | 36 | **24** | DEFECTIVE |
| F-W2 | 31 | 31 | 27 | 0 | DEFECTIVE |
| F-W3 | 926 | 926 | 0 | 0 | DEFECTIVE |
| F-W4 | 1014 | 1011 | 0 | **3** | DEFECTIVE |
| F-W5 | 118 (28 ⊕ band 90) | 117 | 1 | 0 | DEFECTIVE |
| F-W6 | 0 record-side | — | — | 0 | DEFECTIVE |
| F-W7 | 0 (∅ preserved) | — | — | 0 | DEFECTIVE |
| F-W8 | 90 (band, duty at F-W5; coverage re-proof here) | 65 | 24 | 0 program-level (its 1 = `m-15`, booked at F-W5 §C2) | DEFECTIVE |
| F-W9 | 17 | 17 | 0 | 0 | DEFECTIVE |
| F-W10 | 60 (four NWO packet rosters; canonical operand is **65** if C1 lands — §6 P5-9) | 57 | 2 | **1** | DEFECTIVE |

**Arithmetic closes**: wave-side homes 56+362+31+926+1014+28+90+17 = **2524**, ⊕ the F-W10 NWO drain **60** = 2584 auditable rows; packets/terminal/unrouted (GLASS-RELAY 22 · SS-\* 166 · TERMINAL 1190 · UNROUTED 307 ⊕ NWO 60) complete the canonical's **4269**. (RULINGS-4's own `SS-* 178` summary line is off by 12 — filed at F-W10 C5, carried here so no seat quotes it as a denominator.)

**ESCAPES = 28** under R4-10's own definition ("an id absent from both booking and citation is *that wave's* escape"): **F-W1's 24** (named at its check §1.4 — 11 of them greened only by RULINGS-namespace homonyms or another record's same-token row; sampled and re-verified this seat at `S-4` and `fr-MobileFloatingToc F-1/i-4`) ⊕ **F-W4's 3** (`fr-EquationResult K-10` · `fr-FrequencyGraph R-7` · `fr-GalleryView R-5` — all three record-qualified probes → 0) ⊕ **F-W10's 1** (`fr-ExportModal L-16` — the record named **zero** times in the spec; the "60 present · 0 missing" receipt was a bare `grep -qF` on a 4-char token that a six-record homonym greens). One of the 28 (`fr-EquationView vue-tsc`) is an escape only because the canonical minted a non-identity from a prose head — it converts to a canonical amendment, not a booking. **THE ROSTER IS NOT CLOSED.**

---

## §2 AXIS 2 — FABRICATION (task item 2): **11, NOT ZERO — every one re-run this seat**

| # | wave | id | canonical home | spec act | re-run |
|---|---|---|---|---|---|
| 1 | F-W1 | `fr-InfoCard FR-IC-17` | **TERMINAL (∅)** (`:3496`) | BOOKED §2·R1a; §2·R2a.1 re-denominates around it | ✓ |
| 2–4 | F-W1 | `fr-PaperSearch D-14 · D-15 · D-17` | **UNROUTED** ×3 | BOOKED `:322` "Three token limbs of the F.W1 re-ink" | ✓ |
| 5 | F-W4 | `fr-AppHeader FR-AH-27` | **F.W1** <sub>legs F.W4</sub> (`:601`) | BOOKED in (f)2's expansion `:321` | ✓ |
| 6–8 | F-W6 | `FR-EMT-20` · `AA-10` · `B-2` | **F.W5** · **F.W4** · **F.W3** | BOOKED §2.7 / §2.5 / §2.3 (B-2 at BLOCKER weight) | ✓ (FR-EMT-20 direct; others per check receipts) |
| 9 | F-W8 | `fr-CanvasControlsDock C-28` | **no such row** (sole C-28 = GLASS-RELAY, another record) | rostered §6a row 40, G15's LHS | ✓ |
| 10 | F-W10 | `FR-TT-1` | **F.W4** | §2.2 re-cut table cuts it to F.W10 (disclosed by its own §2.5b) | per check |
| 11 | F-W10 | `PAW-50` | **F.W9** | §2.2's `⟨re-cut⟩ → F.W4` divergence, omitted from the "three divergences" enumeration | per check |

Down from pass 4's 12, and the *character* changed: none of the eleven is a phantom identity — all are real canonical ids booked at the wrong wave (or, for C-28, a real record token promoted to a roster row the canonical never minted). Cures are mechanical (BOOKED→CITED-to-holder; strike the C-28 row; disclose the two §2.2 divergences). **But the class is not zero, and zero is the bar.**

---

## §3 AXIS 3 — PORTABLE COMMANDS PROGRAM-WIDE (task item 3): **FAIL at five waves**

Verified this seat at one site per wave minimum: **F-W9** — 44 inline ⟨cmd⟩s take operands that do not resolve from the repo-root cwd its own §2.0 base block declares binding · **F-W2** — 68 of 82 distinct ⟨cmd⟩s carry no literal absolute path under §5's universal claiming all do; a FOURTH undeclared base in use at 9 · **F-W5** — `$V`/`$X` consumed at six ⟨cmd⟩ sites, `$V` never assigned anywhere, two of the six being born-RED gate witnesses (one printing a message indistinguishable from its published paste *for the wrong reason*) · **F-W7** — three receipts exit 2 at every declared base (re-run: bare `docs/` resolves only from the repo root, which §0(B) omits) · **F-W4** — §6's `grep -rl 'D-m13' waves/ ../carry/` exits 2 at every base on the ladder. R4-2.3/2.4/2.5 are breached in the round that re-published them. F-W9's 23 gates, F-W3, F-W8 and F-W10 are otherwise `-P`-free, lookaround-free, in-bounds — the *engine* law held; the *base* law did not.

---

## §4 AXIS 4 — THE PASS-4 REGISTER, INDIVIDUALLY (task item 4)

| P4 id | pass-5 status |
|---|---|
| P4-1 partition open / manufactured tier | **MECHANISM CLOSED** — the atomiser tier is dissolved by R4-10's canonical adoption; **successor class OPEN**: 28 wave-duty escapes (§1). |
| P4-2 fabrication 12 / cert false | **OPEN at 11** (§2); CLOSE-CERT-2's per-wave "CLEAN" rows are themselves falsified at F-W3 (the `9a6cf2b11fc6` pin), F-W7 (Class A "182 · 0" vs three no-base receipts) and F-W8 (G15's dead probe) — the certificate class recurs a second consecutive round. |
| P4-3 unrunnable machinery, six waves | **OPEN, moved again** — now the base/variable form at five waves (§3); the `-P`/bounds form IS cured (zero live sites program-wide; F-W3's one lookaround sits in a struck-history cell). |
| P4-4 check-file operands | **MOSTLY CLOSED**; residue at F-W0 §1 (PASS-1 check as ⟨cmd⟩ operand, twice) — cleared by CLOSE-CERT-2 on a narrowing R4-3's text does not contain; re-convicted. |
| P4-5 restricted detectors | **OPEN in successor form**: sound commands answering the wrong question — F-W10's `grep -qF` escape test, F-W8's bare-token 90/90 sweep, F-W1's §6·R4a probe that is structurally incapable of failing. |
| P4-6 cure-manufactured defects | **OPEN**: F-W10's escape test was minted *inside* the cure that names the class; F-W9 D-1's residue was minted by round 4's own repair; F-W2 B11 is the third generation of one fabricated quotation at one paragraph. |
| P4-7 irreconcilable denominators | **CLOSED** — denominators canonical at all eleven; residue transfers to the canonical's own filed defects (P5-9). |
| P4-8 leg/rider drops | **OPEN, inverted**: legs now BOOKED as rows (F-W1 ≥11 · F-W6 · F-W8 §6a's 17-of-40) rather than dropped. |
| P4-9 verbatim-label drift | **OPEN, 6th generation** (F-W2 G15 · F-W6 ×7 · F-W8 ×2 · F-W7's find-paste). |
| P4-10 seam staleness | **OPEN as pin-staleness**: ~21 stale R4-8.3 pins across six specs, two "moved: no" rows false, zero purge-seat re-pin (R4-8.2 undischarged); every quoted span still reproduces per the seats' re-walks. |
| P4-11 count-word hygiene | **OPEN, ≥10 verified sites** (P5-8). |
| P4-12 anchor/address residue | **OPEN, reduced** (F-W2 §2b's 3-of-6; F-W4's §0/§Y omissions; M-25 row-number locks). |

**Score: 2 closed (P4-1's mechanism, P4-7) · 1 mostly closed (P4-4) · 9 open or moved.** The task's shorthand: manufactured tier **dissolved** ✓ · denominators **canonical** ✓ · the six unrunnable gates — the ruled *sites* cured, the *class* reborn at five waves ✗.

---

## §5 AXIS 5 — RULINGS-4 EXECUTED (task item 5): **8 of 10 families carry verified unapplied sites**

Executed whole: **R4-5** (F.W5 28 vs band 90 held distinct everywhere) · **R4-10's adoption arm** (sole census operand, all eleven — the round's achievement). Unapplied or breached at verified sites: **R4-1** (F-W9 D-2's receipt-not-its-command at a matching hash; F-W3 §7's two-member universal false at write; F-W5 `:266` receipt with no ⟨cmd⟩) · **R4-2** (§3, five waves) · **R4-3** (F-W0 §1; F-W1's five in-body pointers into struck §6·R1; F-W1 G20's claim surface excluding round 4's own work) · **R4-6** (legs booked at non-holders, three waves) · **R4-7** (.1 at F-W2/F-W6/F-W8; .3 at ≥10 sites) · **R4-8** (.2 no purge sha-cert; .3 pins stale ×~21) · **R4-9** (.1 — F-W4's §Y false at its founding receipts, both BLOCKERs) · **R4-10's duty arms** (28 escapes · 11 fabrications · cite-the-holder breached). **rulingsUnapplied = 8.**

---

## §6 THE UNION DEFECT REGISTER (ONE ranked register, deduped — task item 6)

### BLOCKER

| id | claim | provenance |
|---|---|---|
| **P5-1** | **THE ROSTER IS NOT CLOSED: 28 wave-duty escapes** — F-W1 **24** (11 greened only by ruling-namespace homonyms; the R-n collision class undisarmed; six canonical records never named in the spec body) · F-W4 **3** (`K-10` · `R-7` · `R-5`, the last a live cross-namespace homonym with the program's own short-id-law ruling) · F-W10 **1** (`fr-ExportModal L-16`, hidden by a `grep -qF` the file's own convicted class predicts). Sampled members re-verified absent this seat. | F-W1 §1.4; F-W4 esc ×3; F-W10 D-1; §1 |
| **P5-2** | **FABRICATION NOT ZERO: 11** real canonical ids booked at waves the canonical does not home them (register at §2, all re-run). The tier is cure-shaped (BOOKED→CITED conversions) but R4-10's zero-bar is unmet a fifth consecutive pass. | §2; 11/11 re-run |
| **P5-3** | **F-W4's §Y — the section R4-9.1 created to make the round-4 sweep auditable — is false at both founding receipts**: the `git show` operand is the wrong round's commit (`ce2622d1` → `1 · 0 · 0`, published `1 · 0 · 3`, true at `fffb9685`), and §Y.2(3) republishes `4 · 3 · 3 · 7` which §2.I of the same file already struck (live: `7 · 3 · 3 · 7`). The transcript a successor re-runs under the two-key rule fails on first contact. Both verified this seat. | F-W4 BLOCKER ×2; §0 |

### HIGH

| id | claim | provenance |
|---|---|---|
| **P5-4** | **Portable-command law (R4-2.3/.4/.5) breached at FIVE waves** — 44 + 68 + 6 + 3 + 1 ⟨cmd⟩ sites that cannot run as published from their own declared bases; two are born-RED gate witnesses, one a phantom that reproduces for the wrong reason. | §3 |
| **P5-5** | **Dead and false receipts inside gate cells and mastheads**: F-W2 B11's fabricated quotation (third generation at one paragraph) + §2b's anchor-authority receipt printing 3 of 6 outputs; F-W8 G15's probe that cannot produce its published second hit (true fact, dead receipt — over bytes CLOSE-CERT-2 certified "CLEAN, 0 convictions"); F-W9 D-2's set-membership receipt not produced by its command at a MATCHING hash ("a hash proves the bytes did not move; it does not prove the paste was produced by the command"); F-W3 §7's "NOTHING ELSE" enumeration false at write (three members, two pasted). | F-W2 H2/H3; F-W8 H2; F-W9 D-2; F-W3 M |
| **P5-6** | **The R4-8.3 pin regime is stale program-wide and no R4-8.2 purge certificate exists**: ~21 stale sibling pins across F-W1 (3/6) · F-W2 (4/8, one "moved: no" false) · F-W3 (the F-W4 pin, contradicting CLOSE-CERT-2 §8 at the certified settle) · F-W6 (5/8) · F-W7 (5/10, one "no" false) · F-W9 (3, one unmarked); F-W1's hash list also omits F-W10 while quoting it twice. Mitigation, verified by the seats: **every quoted span pinned to a moved file still reproduces** — the mechanism worked, the instrument lies. | 6 checks; F-W3 H verified this seat |
| **P5-7** | **Elsewhere-held ids BOOKED against R4-6/R4-10's cite-the-holder duty**: F-W1 ≥11 legs-as-rows (while the same round CITED two identical legs correctly); F-W6's three bookings (+18 band rows observed-for-ruling, since R4-10 gives F-W6 no booking operand at all); F-W8 §6a's 17-of-40 rows outside its own declared roster of record; F-W0's shed of PP-GATE into the SS-3/SS-4 frontier on an unreceipted editorial gloss. | F-W1; F-W6; F-W8; F-W0 |
| **P5-8** | **Count-words contradict their adjacent lists at ≥10 sites (R4-7.3, the round's own installed law)**: F-W2 §7 "six" over an eight-id enumeration ⊕ a differently-composed six at G11; F-W4's "(7)" crosswalk over a nine-member population + `FM-18` enumerated nowhere against the BANDS clause; F-W5's "FOUR identities, not three" naming three; F-W7's "four negatives" against the canonical's five, in the round that announced the word retired; F-W8's "13 cross-edges" over 14 rows; F-W9's five/seven-vs-8 on G-F9-21's face (fourth consecutive round) + "ELEVEN spans" matching neither 10 nor 13 + "46" for 45; F-W10's `88`-vs-89 at the clause headed "binding on this file against itself". | 7 checks |
| **P5-9** | **THE CANONICAL ITSELF carries ≥14 distinct filed defects across 8 independent seats** (three corroborated twice): the alias-column drop for table-form registers that minted the `C-3`/`L-9` re-bookings and orphaned `FR-AFP-40`/`-69`; PROSE-TOKEN CAPTURE homing five rows at waves their own arrows negate (F-W10 C1, corroborated by F-W7's FR-TT-22 filing); `PP-GATE` UNROUTED against a sole-F.W0 banked line and `PP-DEAD` TERMINAL against a live F.W3+F.W0 routing (two seats); fr-ConvergencePlot's triple-booked `D-2`; fr-ContourPreview's stripped (a)/(b) disambiguators; fr-ImageUpload `D:M-3` homed on a token inside a negation; the manufactured identity `vue-tsc`; `BC-20`/`M-β2` alias-absorbed citations; `C:C-23` homed off "F.W5-W8 = no rows."; the `FM-17..FM-19` multiplicity inside the backtick span; `R2-7`/PAW-50 one-finding-twice. **A canonical amendment round is owed BEFORE pass 6** — F-W10's denominator (60 vs 65), F-W0's roster (56 vs 57), one F-W1 escape, and the F.W2/UNROUTED totals all turn on these rows, and every mechanical differ downstream inherits them. Plus RULINGS-4's own `SS-* 178` line (off by 12; the canonical is right). | F-W0 ×3; F-W1 ×2; F-W2 ×3; F-W6; F-W7 ×3; F-W8; F-W9 D-10; F-W10 C1/C2/C5 |

### MEDIUM

| id | claim | provenance |
|---|---|---|
| P5-10 | Verbatim/emphasis/truncation drift, sixth generation: F-W2 G15's added bold on the load-bearing `0.192` span (rendered plain at three sibling sites) + the fr-EasingPicker bold-boundary shift; F-W6's four unmarked `-o` overruns + "all seven reproduce" false at three cells + two undisclosed mid-line truncations; F-W8's masthead cell truncated under a *verbatim* label + fr-App's emphasis stripped inside a labeled span. | F-W2; F-W6; F-W8 |
| P5-11 | Homonym/collider rosters under-declared — the escape-hiding mechanism itself: F-W1's ~15-pair unresolved tail + the R-n ruling-namespace class; F-W5's five undeclared colliders (its own line 111 names the mechanism: "it escaped *because* this roster under-declared"); F-W6's `M-9`/`M-10` outside R-5's eight; F-W8's `m-7`/`m-15` absent from its conviction-built roster; F-W10's `L-16` — the one six-record homonym without a guard, and the one that hid its escape. | 5 checks |
| P5-12 | The F-W0 cluster: PASS-1 check file as ⟨cmd⟩ operand at §1 (R4-3, re-convicted past CLOSE-CERT-2's unwarranted narrowing); the spec holding PP-DEAD's falsifier in its own §3 row 15 while §3b declares the id terminal, §0's disagree-or-amend clause unexercised; the FR-COB-24 exhaustiveness gap. | F-W0 |
| P5-13 | Claim surfaces pointed away from the round that wrote them: F-W1 G20 excludes §2·R4/§6·R4 from the tested claim; F-W6's FW6-G17 retains the corpus-derived four-spelling detector as a co-equal falsifier against R4-10's bar (the machinery that produced its FR-EMT-20 booking); F-W9's G-F9-21 GREEN indeterminate by the un-enumerated P-9. | F-W1; F-W6; F-W9 D-3 |
| P5-14 | Landing/keying errors short of fabrication: F-W5 §2c's mis-keyed landings (`i-7`→B1 vs E13; `K-13`→F7) + the FR-GV-7 two-clause citation loop with no external holder; F-W6's four transcript landings the canonical contradicts; F-W4's FR-CP- prefix naming two records with no partitioning probe + §Y.3's six-of-eight `-P` site list; F-W9 D-5's PAW-50 double-count. | F-W5; F-W6; F-W4; F-W9 |

### LOW

| id | claim | provenance |
|---|---|---|
| P5-15 | M-25 lock-depth gaps: F-W0 §6a locks 5/7 keyed to row numbers; F-W2 §6a's B5 without `M-β1`; F-W9's `38`/`27` as identities at five seat-local sites, two ordering locks; F-W7's two locks heading on the alias `C-25`. | 4 checks |
| P5-16 | Dead-regex self-receipts: F-W2's `\|` under `-E` (a literal pipe — the published ∅ produced by an unmatchable pattern, twice); the table-cell escaping idiom still unresolved from CLOSE-CERT-2 §7 item 1. | F-W2 ×2 |
| P5-17 | Residual-address enumerations short at their own recently-added sections: F-W4 §0's six-site declaration vs seven (§Y unswept) and §Y.3's mis-address of L163; F-W9 D-9's two-of-three enumeration. | F-W4; F-W9 |
| P5-18 | Disclosed history/legibility residue, filed for the record: F-W3's PCRE lookaround inside the ⌧ struck-history cell (exempt in substance, convictable on sight by R4-2.5's letter — one parenthetical closes it); F-W3 §2's compound-head `/` colliding with the canonical's alias semantics; F-W7's four minted measurement-ids (recorded, not convicted); F-W7's G-F7-5 AGAINST-branch with no discharging act while §9 asserts closure. | F-W3 ×2; F-W7 ×2 |

---

## §7 CENSUS SUMMARY + VERDICT

| metric | pass 3 | pass 4 | **pass 5** |
|---|---|---|---|
| hash gate | — | frozen at CLOSE-CERT-2 §8 | **CLEAN — all 12 match** |
| roster escapes | 149 (partition) | 76 (manufactured tier) | **28** (wave-duty, canonical-derived — first honest denominator) |
| fabrication | 7 | 12 | **11** (all real ids, wrong wave — no phantoms) |
| double-homed | 3 | 0 | 0 (held) |
| rulings unapplied | 9 of 10 (R3) | — | **8 of 10 families** (R4) |
| union register | — | 12 (2B·4H·4M·2L) | **18 (3B·6H·5M·4L)** from 132 seat rows |

**VERDICT: DEFECTIVE — NOT CONFORMANT.** The bar was: zero BLOCKER/CRITICAL/HIGH · hashes clean · roster closed · fabrication zero · tail MINOR-or-below. Achieved: hashes clean (the freeze held — the first pass in the program where the settle and its certificate agree to the byte), the canonical as sole operand everywhere, denominators canonical, double-home still zero, the manufactured tier gone, and — worth naming — **fabrication's character changed from invention to misfiling**, which is a cure-shaped tier. Not achieved: three BLOCKERs and six HIGHs stand; 28 escapes; 11 fabrications; the attestation layer (CLOSE-CERT-2's per-wave CLEANs, the specs' pin tables, F-W4's §Y) is false at its own instruments for the third consecutive round even where the underlying facts hold.

**Shape of repair round 5, owed by the evidence**: (1) **the canonical amendment lands FIRST** (P5-9's ≥14 rows, by dated §0.3-style notes, an operand-level act under R4-3) — it moves four denominators and moots part of P5-1/P5-2; (2) the 28 escapes booked or cited by name, record-qualified, with the R-n/L-16-class homonyms guarded (P5-11 is the same fix); (3) the 11 fabrications converted BOOKED→CITED-to-holder (one strike: C-28); (4) F-W4 §Y re-cut from the correct commit by a seat that did not author it; (5) the five waves' ⟨cmd⟩ bases assigned in-block per R4-2.3 — an edit to ~120 sites that changes no finding; (6) a purge seat that runs LAST, re-pins every R4-8.3 table at the true settle, and issues the R4-8.2 certificate — **no certificate issues until its own claims are re-run by its successor**, the rule pass 4 wrote and pass 5 proves again. The bank held, the freeze held, the twin held, the drain held, the double-home law held; **the rosters, the receipts, and the attestations did not.**
