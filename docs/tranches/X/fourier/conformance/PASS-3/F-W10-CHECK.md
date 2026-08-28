# F-W10 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 3)

**Subject**: `docs/tranches/X/fourier/waves/F-W10.md` (403 lines, `status: planned`)
**Corpus authority**: the 66 `fr-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/` — **and nothing else** (R2-6b; not a per-wave carry, not a check file)
**Real carries**: `carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` ONLY (`ls carry/` → exactly 2; no `F-W10-CARRY.md` exists and none is minted)
**Seat**: FRESH adversarial reader, 2026-08-28. **Everything below was re-derived at the bytes by this seat.** No roster, count word, or anchor was inherited from PASS-1 or PASS-2; both registers were read as *claims to test*, never as obligation sets to copy.
**Detector law applied (R2-9 / R2-3a.1)**: every routing token probed in **BOTH** U+002D and U+2013; rows counted in **ANY** format — table rows ⊕ id-headed route-marked bullets ⊕ prose routings walked to their enclosing row id.
**Verdict**: **DEFECTIVE** — 4 of 5 axes HOLD. Quote reality is the strongest of any wave audited in this programme (every one of ~40 cross-spec and corpus quotations byte-matches). The census axis fails: **three strict `NO-WAVE-OWNER` rows escape the drain entirely**, and the loose-candidate class is defined by a predicate that is **false of ten of its sixteen named members**.

---

## §0 Method — three obligation sets, unioned and deduped by `(record, line)`

| set | basis | count (this seat) |
|---|---|---|
| **A · digraph** | every `F.W9/W10` routing identity in the 66 records | **26** |
| **B · by-mechanism** | entrants §2.2 admits with no digraph leg | **5** |
| **C · strict NO-WAVE-OWNER** | row-level lines carrying a strict disposition, owed a terminal home at the §3.3 deadline **this spec declares is itself** | **69** |
| | **A ∪ B ∪ C, deduped** (`FR-AUL-16`, `FR-AH-45` ∈ B∩C) | **98** |

**routedTotal = 98 · bookedCount = 95 · escapedCount = 3.**

---

## §1 AXIS 1 — ID-KEYED CENSUS (**FAIL**)

### §1.1 The digraph anatomy reconciles EXACTLY — the spec's §2.1 is true at the bytes

⟨cmd⟩ this seat, read-only in `registry/adjudicated/`:

- `ls fr-*.md | wc -l` → **66**
- `grep -o 'F\.W9/W10' fr-*.md | wc -l` → **54** · `grep -l … | wc -l` → **25** records
- `grep -o 'F\.W10' fr-*.md | wc -l` → **0** (bare routing) · `grep -o 'F–W10' … | wc -l` → **0** · `grep -o 'F\.W9–W10' … | wc -l` → **0** (en-dash arm ∅, probed so it can never silently stop being ∅)
- `grep -o '.\{0,18\}W10.\{0,10\}' fr-*.md` → **every one of the 54 is `F.W9/W10`**; no other W10 spelling exists in the corpus.

The four-class anatomy at §2.1 was re-derived line-by-line and **closes exactly**:

| class | spec claims | this seat measures | verdict |
|---|---|---|---|
| routing identities | 26 | **26** | ✅ |
| routing-law boilerplate | 14 | **14** | ✅ |
| same-identity restatements (`fr-App:142` · `fr-PaperArticleWindow:186`) | 2 | **2** — both anchors exact | ✅ |
| verdict / adjudication prose | 12 | **12** | ✅ |
| **sum** | **54** | **54** | ✅ |

The "**Seven records yield ZERO re-cut rows**" claim also holds: 25 routed records − 18 records bearing re-cut rows = **7** = VisualizationView · CoefficientsPanel · FrequencyGraph · HarmonicLevelGrid · InfoCard · CanvasOverlayButton · AdminUserList — **the named seven, exactly**. The §2.2 table's 22 rows carry **26 anchors / 26 ids**, one per routing identity, with no id counted twice and no row minted from the 14 boilerplate lines or the 7 boilerplate-only records. **G-F10-6's corpus leg is honestly RED and honestly measured.**

### §1.2 The strict NO-WAVE-OWNER detector reproduces exactly

Every figure at §2.5a / G-F10-7 re-run by this seat, all reproducing:

| probe | spec | measured |
|---|---|---|
| `grep -o 'NO-WAVE-OWNER' fr-*.md \| wc -l` | 167 | **167** |
| `grep 'NO-WAVE-OWNER' fr-*.md \| wc -l` | 165 | **165** |
| `grep -l … \| wc -l` | 56 | **56** |
| `grep -o 'NO–WAVE' fr-*.md \| wc -l` | 0 | **0** |
| arrow-form `(→\|⇒) *\*{0,2}NO-WAVE-OWNER`, boilerplate excluded | 31 | **31** (16 records) |
| bold-terminal-cell `\*\*NO-WAVE-OWNER`, arrow-form excluded | 61 | **61** |
| strict union | 92 | **92** |

Reconciliation counts re-run by section-extraction — `awk … \| grep -c '^\| \*\*'` — all three reproducing: §2.5 → **23** · §2.5a → **36** · §2.5a-ii → **16**. §2.5 and §2.5a share **zero ids** (the two `M-16` and the two `i-5`/`i-1` entries are the explicitly record-qualified homonyms the spec names and never merges), so **59 distinct ids** is arithmetically sound and **75 rows / 75 terminal verbs** is the roster. "SIXTY" is correctly struck (E-13).

### §1.3 **DEFECT — three strict rows escape the drain entirely** (fr-PathPreview)

⟨cmd⟩ `grep -nE '(→|⇒) *\*{0,2}NO-WAVE-OWNER' fr-PathPreview.md` → **:31 · :69 · :70**:

- **PP-CENSUS** (`:31`, L-1 census-integrity half) — *"**MINOR → NO-WAVE-OWNER** (M-25 errata; SS-3/SS-4 must read the registry over `lane-frontend.md:183/:366/:369/:444/:565`…)"*
- **PP-AGGLOM** (`:69`) — *"**INFO → NO-WAVE-OWNER** (M-25 intake strike-list, SS-3/SS-4)."*
- **PP-SEVLAW** (`:70`) — *"**INFO → NO-WAVE-OWNER** (spec-authoring input)."*

All three are **arrow-form strict** — the first of the two shapes the spec's own detector probes, and all three sit inside the 92-line strict set this seat reproduced above.

⟨cmd⟩ against the spec: `grep -c 'PathPreview' F-W10.md` → **0** · `grep -c 'PP-CENSUS' F-W10.md` → **0** · `grep -c 'PP-AGGLOM' F-W10.md` → **0** · `grep -c 'PP-SEVLAW' F-W10.md` → **0** · `grep -c 'PathPreview\|PP-' F-W10.md` → **0**.

They appear in **no section of the file at all** — not §2.5, not §2.5a, not §2.5a-ii, not the loose-candidate class, not §5's exclusions.

**And no other F wave settles them.** ⟨cmd⟩ `grep -n 'PP-CENSUS\|PP-AGGLOM\|PP-SEVLAW' waves/F-W4.md` → F-W4 `:274` routes them *"**→ NO-WAVE-OWNER / SS-3/SS-4 spec authoring** (consumed, not settled here)"* — the only other wave that names them expressly disclaims settlement. **PP-CENSUS is named by no F wave anywhere** (⟨cmd⟩ `grep -rc 'PP-CENSUS' waves/ carry/` → 0 across all eleven specs and both carries).

This is **G-F10-7's own falsifier, satisfied**: *"a roster that homes a subset and calls it zero-left-open."* It falsifies §5's re-stated header (*"What §5 excludes is therefore boilerplate, other waves' work, producer work, and owner acts — and a later seat tests that by enumeration against the 66"*), and it falsifies §4b's X-whole row for COHESION **§3.3** (*"every NO-WAVE-OWNER row terminally homed — **the deadline**"*), which F.W10 is the last F wave to hold.

The mechanism is the third form of the base the wave exists to abolish: R2-6b re-ruled the *operand* to the 66 records, and the repair honoured that ruling for the sixteen rows PASS-2 named — **but derived nothing new from the corpus beyond them**. `fr-PathPreview.md` was in neither check file's set C, so it survived the operand correction untouched.

### §1.4 **DEFECT — the loose-candidate class's predicate is false of ten of its sixteen members**

§2.5a defines the class **by predicate**, and invites re-running it (*"the predicate — not this seat's memory of a check file — is what the next reader enumerates against"*):

> **Predicate**: a row-level line in the 66 records whose disposition token names NO-WAVE-OWNER **in a form weaker than the two strict shapes the detector above probes** (arrow-form · bold-terminal-cell `**NO-WAVE-OWNER`), boilerplate excluded.

Re-run by this seat as membership against the reproduced strict-92 set. **Ten of the sixteen named members are STRICT, not weak:**

| named as "loose" | anchor | bytes at the corpus | strict? |
|---|---|---|---|
| `FR-TT-21` | fr-Tooltip:55 | `**NO-WAVE-OWNER** (SS-3/SS-4 spec authoring…` | **STRICT** |
| `FR-TT-22` | fr-Tooltip:56 | bold-terminal-cell | **STRICT** |
| `FR-USB-34` | fr-UserSlugBar:77 | `**NO-WAVE-OWNER** (epistemic record + regis…` | **STRICT** |
| `FR-USB-37` | fr-UserSlugBar:80 | bold-terminal-cell | **STRICT** |
| `FR-USB-38` | fr-UserSlugBar:81 | bold-terminal-cell | **STRICT** |
| `PAW-56` | fr-PaperArticleWindow:293 | `**NO-WAVE-OWNER locally**` | **STRICT** |
| `FR-FG-23` | fr-FrequencyGraph:61 | `**NO-WAVE-OWNER**.` | **STRICT** |
| `m-4` | fr-CollapsibleSection:61 | `+ **NO-WAVE-OWNER** (the A-3-new re-argument…` | **STRICT** |
| `D-i2` | fr-PaperSearchInput:82 | `**NO-WAVE-OWNER** — SS-3/SS-4 spec-authorin…` | **STRICT** |
| `fr-BasisCanvas L §R5-7` | fr-BasisCanvas:106 | `→ **NO-WAVE-OWNER** (SS-3/SS-4 spec-authoring…` | **STRICT** |
| `FR-IC-11` · `FR-FG-20` · `FR-EQR-7` · `FR-COB-14` · `N-1` · `MISSED-2` | — | weaker forms | loose ✓ |

**Consequence.** Ten rows the file's own detector classifies as **strict** receive only the class-level verb (*"they are **NOT** homed by this drain; they land as CENSUS-INPUT … **as a class**"*) where the strict roster requires a **per-id terminal verb**. The stated escape hatch — *"any row later re-graded to a strict disposition re-enters at its banked id through the §2.5a-ii table"* — does not reach them: they are strict **today, at the bytes, by this file's own probe**, not on some later re-grading.

**Corollary — the predicate does not reproduce the roster in either direction.** The true weak-form row-level residue (strict set removed, boilerplate and verdict prose removed) is **36 lines**, not 16 — including e.g. `fr-EquationPanel:52` (*"NO-WAVE-OWNER · D-16 residue — routings as r1"*), a record F-W10 never names (⟨cmd⟩ `grep -c 'EquationPanel' F-W10.md` → **0**). A later seat re-running the stated predicate therefore gets a **materially different set** from the sixteen named — which is precisely the unfalsifiable-residue failure R2-6b forbade, re-created one level up: the *number* was corrected, the *class definition* was not.

### §1.5 Escape ledger

| escape | anchor | form | homed anywhere? |
|---|---|---|---|
| **PP-CENSUS** | fr-PathPreview:31 | arrow-form strict | **NO** — 0 hits across all 11 F specs + both carries |
| **PP-AGGLOM** | fr-PathPreview:69 | arrow-form strict | **NO** — F-W4:274 "consumed, not settled here" |
| **PP-SEVLAW** | fr-PathPreview:70 | arrow-form strict | **NO** — F-W4:274 "consumed, not settled here" |

**escapedCount = 3.** Every other row of the 98-row union bears a terminal verb, a cut, or a named exclusion.

---

## §2 AXIS 2 — QUOTE REALITY (**HOLD** — the strongest result in the programme)

Every cross-spec and corpus quotation was re-run by this seat as a command. **Zero misquotations. Zero coordinate-less "verbatim" labels.**

| quotation | probe | result |
|---|---|---|
| F.W1 charter, **TWELVE** limbs (×2 sites) | `grep -n "The roster is" waves/F-W1.md` | **BYTE-IDENTICAL** at both sites (`grep -F` of the F-W1 bytes hits F-W10) |
| G-12 shim denominator | `grep -o 'shim \*\*21 cartoon-card sites / 14 files\*\*' F-W0.md` | reproduces |
| G-12 admin-label denominator | ``grep -o '`text-admin-label` \*\*7 / 4 files\*\*' F-W0.md`` | reproduces |
| the three F-W0 gate headings | `grep -h '^### G-1[123] — ' F-W0.md` | all three, prefix-free as E-11 requires |
| FR-NP-32 banked disposition (×2) | `grep -n 'producer dist emitter' fr-NotationPills.md` | 1 hit, exact |
| fr-App C-12 negative record | `grep -n 'NO leaf in this component' fr-App.md` | `:90`, exact |
| D-19 lint-rule sentence | `grep -n 'unlayered-scoped-vs-system' fr-ConvergenceLegend.md` | `:97`, exact |
| carry cross-edge row label | `grep -c 'F.W1 → F.W9 / F.W10' carry/F-W1-CARRY.md` | 1 — cited by path + row label, **no line** |
| **all 16 §2.5a-ii dispositions** | `sed -n 'Np' <record>` ×16 | **16/16 byte-exact**, incl. the C-3 orphan-client tail, fr-BasisSelector:93, fr-VisualizationView:103's two-half split, fr-ContourPreview:64/:72/:74 |
| R-2b splice | `diff <(awk …F-W9.md) <(awk …F-W10.md)` | **EMPTY** — the ruled direction is real at the bytes |
| §2.2 whole-region diff | same, §2.2→§2.3 | **exactly 3 hunks**, all outside table/entrant/checkpoint blocks (E-10 holds) |

**Outward witnesses, all re-measured:** eleven `valuejs-outbound-*.md` packets (BJ ten ⊕ BK's O-20) ✓ · O-20 = 59 lines, `@source` **1**, `FR-NP-32` **1**, `fourier` **10** ✓ · O-17 = 76 lines carrying **U-1..U-11** all eleven arms ✓ · `MetricPill`/`IntersectionObserver`/`latex-paper` **0** across all eleven ✓ · **9** `FOURIER-R*` by the glob ✓ · fourier HEAD `cd26c65` ✓ · porcelain **28** ✓ · **8** e2e specs ✓ · `toHaveScreenshot` **0**, `*-snapshots` **0** ✓ · pin `^0.13.0` at `web/package.json:18` ✓ · `--shadow-cartoon` **1 file / 3 hits** (round-1's "2 files" correctly STRUCK) ✓ · `cartoon-surface` 1 file vs `cartoon-card` 15 ✓ · `text-admin-label` **4 files** ✓ · `admin` in e2e **0** ✓ · `disclosure-content` **0** ✓ · fourier `INBOX.md` **0** ✓ · `/tmp/fourier-r4-files.sha256` **GONE** ✓ · Codex worktree **still registered** ✓ · latex-paper docs hold `tranches/` + `virtual-paper.md`, **no coordination path** ✓.

**E-14 baseline drift, re-verified at both ends**: INBOX `latex-paper` **0 → 1**, `UNREAD` **4 → 5**, `fourier` **6 = 6**. Both readings reproduce; the mechanisms (no latex register; four asks UNROWED) are intact at both ends, exactly as stated.

**E-1's denominator, fully re-enumerated** on `ADOPTION-ASKS.md` rows `:109–:125`: **17 id-rows** ✓ · **11 OPEN** ✓ (1·2·3·5·6·7·inv-22-color·cascade-vjs·cascade-kf·cascade-gui·words-spa) · **6 not-OPEN**, the enumerated six exactly ✓ · **6 targeting value.js, of which 4 OPEN** ✓ · `cascade-gui` correctly excluded as glass-ui-targeted ✓.

**E-5's screenshot correction is right**: `sed -n '54,60p' visual-baseline.spec.ts` — the call opens `:55`, options `:56-58`, closes `:59`. Round-1's `:56-60` was off by one; the correction is exact.

---

## §3 AXIS 3 — M-25 DEPTH (**HOLD**)

Locks, riders and dissents are carried with their mechanisms, not transcribed:

- **FR-NP-32 by id** — 16 occurrences; the `(≡ fr-PaperSidebar M1)` cite-both-never-substitute form is used at every statement of the gate (§2.3, §2.4, §2.5 head row, §4a.2, §4b, G-F10-11, G-F10-12). PASS-1 D6 (the id the producer's own packet carries being absent from the consumer's close-gate) is **cured**.
- **PAW-44 / LAW-3** (5 / 3 hits) — restore-only-WITH-or-AFTER PAW-1 + PAW-30, K-18's see-through-header catastrophe named as the cost of violating it; **LAW-4** (one clearance authority, PAW-47 dependent) carried beside it.
- **MPC-31** and **FR-MSP-6** (2 each) — carried at §4a.6 as same-commit riders and re-declared at §5 as *"riders whose rows land at F.W3/W4 … they appear here only where they sequence"*: cited, not re-booked.
- **Anti-cures preserved**: PAW-1's K-9 `:root` alias limb KILLED with the explicit *"the repair MUST NOT implement the literal snippet"*; ContourPreview 38's two REFUTED flagship cures; FR-AH-30's **REVERSING** `@layer components` remedy (only `@layer glass-overrides` appended after `utilities` works); GAB-29 as **falsifier, not destination**; the "un-harnessable" defence killed at ruling 3e; D-1's 16-count + `:42/:49` anchors killed at register #8.
- **Dissents preserved verbatim and against interest**: FR-AFP-49's blocker-weight family dissent; FR-EMT-11's reader-2 MAJOR with the L-9.1 scope ruling *and* the warning that MINOR ≠ "the debt is small"; FR-USB-16's r2 MINOR *overruled*, recorded as overruled; GAB-13's worker-DU dissent that would make DU right all along; OG-V2 on Codex-authored verbs; the SS-4 trie-vs-KISS guardrail-incumbent dissent; PAW-2's demotion sustained by fresh derivation.
- **The twin law of RULINGS-2 is honoured structurally**: the paired-edit rule ("any change to the shared table, entrant block, or checkpoint block lands in BOTH specs in ONE commit") is stated at §2.2, §2.8 E-3, G-F10-6 and §4a.1 — and the AA-44 `9`→`8` correction (E-5) is **deliberately left unapplied** as a disclosed pending paired edit rather than fixed unilaterally. That is the correct posture, and E-17 names it so no reader mistakes silence for approval.

---

## §4 AXIS 4 — GATES (**HOLD**)

Twelve gates, **every one born RED with a measured witness**; G-F10-12 born honestly **SPLIT** (one half GREEN by a *verified receipt* — O-20 row A-1 under the **live** `BK/coordination/` path — the other RED on `MetricPill`/`IntersectionObserver`/`latex-paper`, all three re-measured **0** by this seat). No gate is a proof-farm script; each names a live witness (L-19).

**Closure operands are row-shape-tolerant (R2-9)**: G-F10-7 states its detector **inline** — shapes (table rows ⊕ id-headed route-marked bullets ⊕ prose routings walked to their enclosing row id) and spellings (**both** U+002D and U+2013, the en-dash arm kept in the probe at ∅). G-F10-6 states its corpus leg with the boilerplate exclusions that stop rows being minted from the 14 law lines or the 7 boilerplate-only records.

**One MINOR defect in a gate cell.** G-F10-7 and §2.5a both carry the band disclosure *"PASS-2's corpus-derived strict roster is 81 row-level lines …; this seat's detector above lands 92 over the same 56 records. The two differ ONLY in where the boilerplate/verdict-prose cut falls."* Both halves are false at the bytes:

1. **The sets cross; they are not nested.** Two of the sixteen declared escapes are **outside** the 92: `fr-PaperSearchDropdown:75` (`L:L-16`) and `fr-FunctionInput:81` (`C §0 row 7`) carry weaker forms. So 92 is not a superset of 81, and the difference is not only "where the boilerplate/verdict-prose cut falls."
2. **"over the same 56 records" is wrong.** ⟨cmd⟩ `cut -d: -f1 /tmp/strict92.txt | sort -u | wc -l` → **44**. The strict-92 spans **44** records; **56** is the count of records containing *any* NO-WAVE-OWNER token. Two denominators are fused into one sentence, inside the gate cell.

Neither error changes a gate's colour, and the direction of (1) is over-inclusion — but a disclosure written expressly to keep a band honest is the wrong place to be imprecise.

---

## §5 AXIS 5 — POSTURE (**HOLD, with one MINOR erratum defect**)

| requirement | finding |
|---|---|
| **F.W1 transaction cited whole, correct limb count** | ✅ **TWELVE**, quoted by ⟨cmd⟩ at **both** sites (§2.7 FR-EQR-3 · §4a.3), cited at the **stable** anchor *"F-W1 §4 step 4"* — never by line. R2-5 applied exactly; "ELEVEN-limb" struck at E-15. PASS-1 D4 (three-limb restatement) cured. |
| **F.W0 pre-gates honoured** | ✅ §2.3 verifies and does not re-rule; §4a.2 sequences them first; G-F10-11 is born RED on the ruling + a parsing dist; §4b's F.W0 row declares *"F.W10 verifies; it does not re-rule"* and routes G-11/G-12/G-13 **by gate id**. |
| **F.W7's ruled posture** | ✅ Not re-litigated. F-W10 names F.W7 exactly once, inside E-16's minute of PASS-1's R-1b directive — an historical citation, not a routing claim. R2-8.1's prohibition (*"No pass-3 seat re-litigates `routedTotal`"*) is respected in both directions: this check does not re-derive it either. |
| **F.W9/W10 splice direction per R-2b / R2-6a** | ✅ **Measured, not asserted.** `diff` of the extracted checkpoint regions → **empty**. F.W9 authors, F.W10 receives; round 1's inverted narration is struck at E-3 with the reason (a reader following it would have overwritten the twin's ruled-in table). The Δ=∅ *leg* is green while the gate stays RED on its corpus leg — and the spec says so explicitly. |
| **SS-4 flags inline, never presumed** | ✅ Seven owner rulings enumerated at §2.3 and re-declared at §4a.13, §4b and §5; OG-F1/OG-F2 and the L-4 escalation flagged with the explicit *"F.W10 CANNOT STAMP TERMINAL DISPOSITION WHILE THE ESCALATION IS UNANSWERED."* |
| **Tree READ-ONLY** | ✅ §1b binds all 66 `fr-*.md` read-only; §5 excludes *"Any edit to `registry/adjudicated/fr-*.md`"*; anti-rename holds by construction (the re-cut is a table in two specs plus an addendum). No `fr-*.md` is touched. |
| **status `planned`, zero VERIFIED** | ✅ `status: planned` in the masthead; four-verb line reads **IMPLEMENTED NO · VERIFIED NO**; §5 excludes *"any status advance beyond `planned`"*; the execution gate stands on the owner's begin-word. |
| **RULINGS-2 faithfully applied** | ✅ on all five F-W10 directives: **R2-6a** (splice received, direction corrected, receipt performed) · **R2-6b** (operand re-ruled to the 66; the sixteen homed by id with terminal verbs; SIXTY→59; §5 header re-stated) · **R2-9** (G-F10-7's detector inline, both dash spellings, three row shapes) · **R2-2** (the eight F-W0 line cites converted to gate ids; the §2.8 erratum minuting the `:114`→`:116` drift written at E-16) · **R2-5** (×2 re-quotes by command). |

**R2-2 compliance is near-total.** Every surviving `<live-sibling>.md:NNN` string in the file sits **inside a §2.8 erratum that is minuting the abolished address** — `F-W0.md:199` (E-11), `F-W5.md:153`/`F-W10.md:114` (E-16), `COHESION.md:129`, `W11.md:319`, `F-W1-CARRY.md:246` (E-17). Quoting an address in order to retire it is lawful and is the record R2-2.3 asks for.

### §5.1 **DEFECT (MINOR) — E-4 asserts a cure the file has not fully performed**

§2.8 **E-4** still publishes live-sibling line addresses — *"`X/waves/W9.md` G24 at **:366** / G33 at **:375** re-resolve exactly"* — and its disposition cell reads *"**Corrected anchors used throughout.**"* But §2.8 **E-17**, four rows below in the same table, lists those exact cites among the breaches it **cured**: *"`X/waves/W9.md:366`/`:375` + `W11.md:319` ×3 — **COHESION and `waves/` are the two live-sibling classes R2-2 names by name**."*

E-4 is therefore an erratum declaring a conversion the file did not complete — **the same shape E-17 itself convicts at E-3** (*"an erratum asserting a cure the file had not performed — the same shape as the defect it was erratum for"*), and the same shape E-11's second minute pays for.

**Mitigating, and stated so the finding is not inflated**: the operative citations do use the stable idiom — §2.4's G24/G33 rows and G-F10-3/G-F10-4 all cite *"X·W9's gate table, the G24/G33 row … by gate id, never by line"*. And both addresses currently resolve (⟨cmd⟩ `sed -n '366p;375p' X/waves/W9.md` → the G24 row and the G33 row respectively). Nothing downstream is stale; the idiom is simply not yet universal inside the errata table.

### §5.2 **DEFECT (INFO) — one un-qualified short id in the loose-16 enumeration**

The loose-candidate enumeration lists a bare **`MISSED-2`**. ⟨cmd⟩ `grep -ln 'MISSED-2' fr-*.md` → **three records**: `fr-ImageUpload` · `fr-HarmonicLevelGrid` · `fr-UserSlugBar`. Meanwhile §2.5a books **`HLG-32 · MISSED-2` (fr-HarmonicLevelGrid:88)** record-qualified and strictly. The one-home/qualify-short-ids law the file applies scrupulously to both `M-16` homonyms, to `i-5`, and to `i-1` is not applied here. (Presentation rider: *"SIXTEEN are enumerated by name"* reaches sixteen only by counting the parenthetical `fr-BasisCanvas L §R5-7`; fifteen are enumerated in the list proper.)

---

## §6 What this pass CONFIRMS the repair rounds cured

Recorded so the defects above are read at their true weight — the file is far stronger than either predecessor:

- **PASS-1 D1/D2** (receipt sweep pointed at a superseded inbox) — **cured**: §1b binds the **live** `BK/coordination/` path, eleven packets measured, O-20 row A-1 read rather than asserted, and the second failure mode is *named* (`relay-sent-never-read`).
- **PASS-1 D3** (denominator sharpened to the wrong number) — **cured at E-1** and re-verified here row-by-row: 17 / 11 OPEN / 6 value-targeted / 4 OPEN.
- **PASS-1 D4** (atomic transaction restated at three of twelve limbs) — **cured**: whole-citation by ⟨cmd⟩ at both sites, extent corrected to TWELVE.
- **PASS-1 D6** (a BLOCKER whose banked id the producer's packet carries while the close-gate does not) — **cured**: `FR-NP-32` now 16 hits, cite-both form everywhere.
- **PASS-2 / R2-6a** (inverted splice narration) — **cured and re-measured**: `diff` empty, direction restored, the rival paragraph deleted.
- **PASS-2 / R2-2 / E-11** (citations re-resolved by coordinate inside a coordinate-moving round) — **cured per-idiom**, including the sharpest self-conviction in the corpus: the cure's own `grep -n` receipt had gone stale within the round and is now pasted prefix-free.
- **PASS-2 / E-13** ("SIXTY" double-counting its own head row while declaring itself binding) — **cured**: 59 / 75 with the arithmetic shown and re-runnable.
- **PASS-2 / R2-6b** (a cure that adopts the convicting register's roster and inherits its blind spot) — **cured at the operand for the sixteen rows PASS-2 named**. §1.3 above is the fourth form of that same base: the *operand* was corrected without a *fresh derivation from the corpus*, so a record neither check file looked at survived the correction whole.

---

## §7 VERDICT

**DEFECTIVE.** Axes 2 (quote reality), 3 (M-25 depth), 4 (gates) and 5 (posture) **HOLD**. Axis 1 (id-keyed census) **FAILS** on two counts:

1. **MAJOR** — three strict `NO-WAVE-OWNER` rows (`PP-CENSUS` · `PP-AGGLOM` · `PP-SEVLAW`, `fr-PathPreview.md:31/:69/:70`) escape the drain entirely and are settled by no F wave. G-F10-7's own falsifier is satisfied; COHESION §3.3's deadline claim is falsified at the last F wave.
2. **MAJOR** — the loose-candidate class is defined by a predicate false of **ten of its sixteen** named members, so ten strict rows receive a class verb where a per-id terminal verb is owed; and the true weak-form residue is 36 lines, so re-running the stated predicate does not reproduce the stated roster in either direction.

Plus **MINOR** — the band disclosure quoted into G-F10-7 is wrong twice (the 81/92 sets cross rather than nest; the strict-92 spans 44 records, not 56); **MINOR** — §2.8 E-4 publishes live-sibling line addresses under a "corrected anchors used throughout" disposition that E-17 claims to have cured; **INFO** — a bare `MISSED-2` in an enumeration that is otherwise scrupulously record-qualified.

**routedTotal = 98 · bookedCount = 95 · escapedCount = 3.**

*Read-only everywhere except this file. No `fr-*.md` opened for write; no product source opened at all; the spec, the twin, the carries, the rulings and the producer trees read only.*
