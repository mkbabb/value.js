# X·F CONFORMANCE PASS 5 — F-W4 CHECK (L-18/L-20, FRESH seat)

**Subject**: `../../waves/F-W4.md` · **Census operand (sole)**: `../CENSUS-CANONICAL.md` §2 → `F.W4` · **Rulings applied**: `../PASS-4/RULINGS-4.md` (R4-1…R4-10) · **Cert read with its erratum**: `../PASS-4/CLOSE-CERT-2.md` · **Seat**: fresh, 2026-08-29, no prior pass authored by this seat. **Toolchain**: `/usr/bin/grep` → `grep (BSD grep, GNU compatible) 2.6.0-FreeBSD`; `grep -P` exits 2 (*"invalid option -- P"*); `.{n,m}` rejected above 255 (*"maximum repetition exceeds 255"*) — both walls hit live by this seat, so every ⟨cmd⟩ below is `-E`/`-F`/two-stage.

**Bases, declared once (R4-2.4)**: `$W` = `docs/tranches/X/fourier/waves` · `$C` = `docs/tranches/X/fourier/conformance` · `$R` = `docs/tranches/V/megatranche/registry/adjudicated` · `$P` = `/Users/mkbabb/Programming/fourier-analysis`. Every command names the base it runs from.

**VERDICT: DEFECTIVE** — 12 defects (2 BLOCKER · 3 HIGH · 5 MEDIUM · 2 LOW). Census axis PASSES on presence and FAILS on record-qualification: **1014 roster rows · 1011 booked · 0 cited-to-holder · 3 escaped.** Receipt axis: ~30 samples re-run, **27 reproduce byte-true, 3 do not** — and all three sit inside the round-4 repair apparatus itself.

---

## §1 CENSUS AXIS — the canonical roster, mechanically

`$C`: `awk 'NR>=4933 && NR<4990' CENSUS-CANONICAL.md | /usr/bin/grep -Ec '^- \*\*fr-'` → **54** records; the same slice's backtick spans sum to **1014**, and the per-record declared counts sum to **1014** — declared = enumerated at every one of the 54 rows (zero mismatches). The spec's masthead figure (§2.X.2, *"F.W4 = 1014 rows across 54 records"*) is therefore true against the operand, and its hash pin holds:

⟨cmd⟩ `$W`: `shasum -a 256 ../conformance/CENSUS-CANONICAL.md ../conformance/PASS-4/RULINGS-4.md F-W3.md` → `a450b8e9f80e…` · `c899cdc2baad…` · `a89c3386f3f8…` — **all three first-12 match the pin published at §2.X.2**. The operand has not moved since quote time (R4-8.3 satisfied).

**Presence.** A permissive boundary probe (leading boundary admits a `-` so the record-prefix idiom cannot read as a miss; trailing boundary non-alnum) over all 1014 returns **981 hits / 33 no-bare-hit**. All 33 resolve under the idioms §2.X.2(f) declares and are not escapes:

| class | ids | idiom |
|---|---|---|
| `FR-AH-25/-28/-32/-34/-35/-36/-39/-40/-41/-42/-46/-48/-51/-52/-54` (15) | (f)2 SUFFIX-ELISION | `FR-AH-19 · -23 · -25 · … · -39..-43 · …` |
| `L·m-2/-3/-5/-7/-11/-12/-13` (7) | (f)3 PREFIXED CONTINUATION | `EV-L·m-1 ⊕ m-2 ⊕ …` |
| `FR-GFC-13/-16/-17/-18/-19/-25` (6) | (f)2 | `FR-GFC-12 ⊕ -13 ⊕ …` |
| `FR-USB-20/-28/-29/-31` (4) | (f)2 | `FR-USB-17..-20 ⊕ -28 ⊕ …` |
| `FM-17..FM-19 (3 ids)` (1) | canonical BAND spelling | booked as `FM-17..FM-19` (×3 in spec) |

⊘ **So no roster id is token-absent.** The census failure is one level in: **presence is not booking** where the token is a homonym.

**Record-qualification (axis (iv) / M-25 depth).** 91 of the roster's ids are homonyms across ≥2 records **inside F.W4 alone**, covering **328 of the 1014 rows**; 23 of those ids (49 rows) carry **zero** record-prefixed spelling anywhere in the spec. Auditing the register-class tail of that set at the bytes yields **three canonical F.W4 rows with no record-qualified booking of any kind** — D5-4 below. These are not in §2.X.2(b)'s 72; they are in the **913 the spec asserts were "held before this round, are unchanged, and are reachable under the idioms declared at (f)"**, which is the clause they falsify.

**Disposition tally**: booked **1011** · cited-to-holder **0** (the spec's citations — `PAW-4`→F.W3, `GM-6`→F.W1, the six §B.2 residues, the nine fr-EasingPicker prefix-axis heads — are all correctly OFF the 1014) · escaped **3** · fabrication **1 unenumerated** (D5-5).

---

## §2 SPOT-AUDIT OF THE CANONICAL — 5 records against `$R` bytes (errors here file against the canonical)

| # | record | canonical claim | bytes | verdict |
|---|---|---|---|---|
| 1 | `fr-FourierMorphSvg` | 33 rows; 8 at F.W4; `FM-2`→F.W1; `FM-17..FM-19` band=3 | §1 table enumerates exactly 33; record `:37` banks `FM-2 · D-2` at F.W1, `:40` `FM-17..FM-19 | 3 INFO`, `:54-56` FM-22/23/24 | **CLEAN** |
| 2 | `fr-Tooltip FR-TT-1` | `F.W4` · `F.W3` · `F.W9/W10` → **F.W4** legs F.W3, F.W9/W10 | `:26` *"**→ F.W4** (naming legs, all 17) **+ F.W3** … BLOCKER at any F.W9/W10 axe close-gate"* | **CLEAN — verbatim** |
| 3 | `fr-SvgFilters L-5` | `F.W4` | `:56` *"**→ F.W4 (method amendment)**"* | **CLEAN** |
| 4 | `fr-GalleryView R-5` | `F.W4` | `:24` *"…rides that row's **F.W4** cure — at MINOR"* | **CLEAN** |
| 5 | `fr-CoefficientsPanel R-7` | `F.W4` | `:24` *"a **product decision the forming F.W4 spec owns**"* | **CLEAN** |

⟨cmd⟩ `$R`: `/usr/bin/grep -n 'FR-TT-1' fr-Tooltip.md`, `… 'L-5' fr-SvgFilters.md`, `… fr-GalleryView.md`, `… fr-CoefficientsPanel.md` — all four reproduce. **The canonical carries one presentational defect only (D5-12); its routings are sound on this sample.**

---

## §3 RECEIPT REALITY — ~30 ⟨cmd⟩ re-run on the pinned toolchain

**Reproduce byte-true (27).** `$W`: `-ohE 'F-W[0-9]+\.md:[0-9]+' F-W4.md | sort -u` → the three dead addresses, no fourth · `'^### G-11'`/`'^### G-12' F-W0.md` · `-o '^\*\*Name\*\*.*G1-gated)' F-W1.md` · `-o 'ESC-1 ruled (G1)' F-W1.md` · `-o 'The roster is [A-Z]* limbs and stays [a-z]*' F-W1.md` → `TWELVE/twelve` · the §2.X.2 shasum triple · `-oE "\bBC-10\b" F-W4.md | wc -l` → **12** · the GCM ten-token loop → `5 3 5 12 3 3 3 3 4 5` · `-c 'showImageOverlay'`/`'shape only'` → `1`/`1` · the `Equation|Gallery` structural probe → two words · the `.a–.e Files` probe → **no output** · the four-name `Files` probe → **five lines, `EqCoefficientsPanel` ×2, in the printed order** (R4-1.5's cure landed exactly, and the §Y.1 row for it is true) · `git show ce2622d1:…| -Ec '(^|[^A-Za-z0-9-])SS-C-1([^A-Za-z0-9-]|$)'` → **0** · the `281a420a` L-26 pair → **0 / 3** and over the carry **0 / 2** · `-cF '**L-4 · C-10' fr-ContourEditorCanvas.md` → **1**. `$R`: `MG-λ` → **two** lines `:95`/`:140` · `D·D-5 + C·C-5` → `:56` · `C-28` → **three** lines `:45`/`:102`/`:150` · `FM-4..FM-16` → `:39` · `export-truth work item, with BC-3/D-11/D-22/D-24/D-25/BC-12/BC-22` · `-oh 'F\.W4' fr-*.md | wc -l` → **1128** / `-l` → **56**; `F\.W3/W4` → **1010** / **55**; both dash spans → **0**/**0** · `carry/F-W4-CARRY.md` cohort → `Cohort: FR-AFP-34, FR-USB-19, D/m-17.`. `$P`: `-rln "admin" web/e2e/` → **zero files** · `checkA11y` call sites → **7** (+2 definitions) and `new AxeBuilder` → **2** · `find web/src -name 'BasisCanvas.vue' -o -name 'ContourEditorCanvas.vue'` → both paths.

⊘ **The `-P` class is genuinely dead**: no live ⟨cmd⟩ in the spec uses it, and the round-3 population it claims to have re-cut is exact — ⟨cmd⟩ repo root: `git show fffb9685:docs/tranches/X/fourier/waves/F-W4.md | /usr/bin/grep -o 'grep -[a-z]*P' | wc -l` → **7**, matching §Y.1's `7` ⟨occurrence count, not `-c`: the same population is **5** lines, and the two figures must not be confused⟩. R4-2's headline cure LANDED.

**Do not reproduce (3).** D5-1, D5-2, D5-3 below. All three are in machinery round 4 authored.

---

## §4 GATES

Canonical-operand hygiene **PASSES**: `../conformance/CENSUS-CANONICAL.md` is the only census operand in the file; no check file, no pass index, no §-arithmetic is used as a denominator; §2.X.1's borrowed `~146` is struck at its site. Witnesses are live and reachable-RED — `G-F4-ADMIN-AXE` (zero admin e2e files), `G-F4-A11Y-ROUTE` (7 checkA11y sites, AxeBuilder ×2), `G-F4-OCCLUSION`/`G-F4-CENSUS-CELLS` (both `find` receipts resolve, paths path-qualified per check D-8) all re-run GREEN-as-RED at this seat. Commands are portable at every gate **except** the §6 register command convicted at D5-3. The one substantive gate defect is citational: **`G-F4-CONV-STUDY` rests on `FR-CP-LB3`** — a spelling §2.X.2(a) of the same file convicts as a rename and declares un-citable — **with no banked `L-B3` beside it** (D5-10).

## §5 POSTURE

| item | reading | status |
|---|---|---|
| F.W1 transaction whole | §5.1(2) + `G-F4-ZERO-CONSOLE` cite the **TWELVE-limb** roster whole, never restated; both receipts reproduce | **HOLD** |
| W7 ∅ closed | `/usr/bin/grep -o 'F\.W7' F-W4.md \| wc -l` → **0**; canonical §4.1 gives F.W7 zero record-side rows — nothing routes here and nothing is claimed | **HOLD** |
| SS-4 flags | §5.2 →F.W5–W8 flags owner rulings INLINE and names the TA-4 value-side atomdiff prerequisite; 27 `SS-4` sites | **HOLD** |
| tree READ-ONLY | declared ×3 (`:3`, §1 head, closing line); no product-source write anywhere | **HOLD** |
| status `planned` | §2 head, §3 close, closing gate all `planned` | **HOLD** |
| zero VERIFIED | `/usr/bin/grep -cE '(^|[^A-Za-z])VERIFIED' F-W4.md` → **0** | **HOLD** |
| RULINGS-4 applied | R4-1.5 ✔ (five-line paste) · R4-2 ✔ (7/7 `-P` re-cut) · R4-3 ✔ (canonical-only operands) · R4-6.2/6.3 ✔ (two F.W1 legs booked with verbs) · R4-6.5 ✔ (`FR-EQR-14` booked) · R4-7.3 ✔ at the named `"23"` site · R4-9.1 ✔ (§Y created) · **R4-1.9/R4-7.1 partial** (D5-8, D5-9, D5-10, D5-11) · **R4-2.4 breached once** (D5-3) · **R4-10 breached** (D5-4, D5-5) | **PARTIAL** |

---

## §6 DEFECTS

### D5-1 · BLOCKER — §Y's founding receipt cannot produce its own third output; the operand commit is the wrong round
§Y (L418) publishes, as the warrant for the section's existence: `git show ce2622d1:docs/tranches/X/fourier/waves/F-W4.md > /tmp/fw4-r2.md; /usr/bin/grep -ci 'errata' /tmp/fw4-r2.md` → **1** · `/usr/bin/grep -c 'receipts run' /tmp/fw4-r2.md` → **0** · `/usr/bin/grep -c 'PURGE-SEAT' /tmp/fw4-r2.md` → **3**.
⟨cmd⟩ repo root, this seat: `git show ce2622d1:docs/tranches/X/fourier/waves/F-W4.md > /tmp/a.md; /usr/bin/grep -ci 'errata' /tmp/a.md; /usr/bin/grep -c 'receipts run' /tmp/a.md; /usr/bin/grep -c 'PURGE-SEAT' /tmp/a.md` → **1 · 0 · 0**. Same three over `fffb9685` → **1 · 0 · 3**.
`ce2622d1` is *"repair r2 complete … + L-20 pass 3"*; `fffb9685` is the round-3 settle. The published `3` is fffb9685's figure pasted beside a ce2622d1 command — R2-1-LAW 1 ("the pasted output IS the command's output"), breached in the section R4-9.1 created to make the sweep auditable, and breached against the wrong round of the file it is auditing.
**Cure**: re-point the operand to `fffb9685` and re-run all three, or keep `ce2622d1` and publish `1 · 0 · 0` with the round re-named. The prose *"asserted a purge sweep three times inline"* survives only over the commit that holds three.

### D5-2 · BLOCKER — §Y.2(3) republishes a figure the same file's §2.I already corrected, and it is false on re-run
§Y.2 item 3: *"**§2.I's `PAW-6/-18/-26/-29` re-run pairing.** Correct: `4 · 3 · 3 · 7` reproduces over the settled bytes."*
§2.I (L140) of the same file: *"round 4 banked `4 · 3 · 3 · 7`; the loop re-run on the pinned toolchain at the pass-4 settle returns **`7 · 3 · 3 · 7`** — the FIRST member of the loop's token list is **7**, not 4."*
⟨cmd⟩ `$W`: `for t in PAW-6 PAW-18 PAW-26 PAW-29; do /usr/bin/grep -oE "\b$t\b" F-W4.md | wc -l; done` → **7 · 3 · 3 · 7**.
The transcript row asserts "reproduces" for a figure its own file struck and the toolchain refuses. Under R4-4's two-key rule the transcript is exactly what a successor re-runs; this row fails on first contact.
**Cure**: `4 · 3 · 3 · 7` → `7 · 3 · 3 · 7`, and the row's verb changes from *Correct* to *corrected-in-round-4*.

### D5-3 · HIGH — an unrunnable ⟨cmd⟩: no base resolves both operands (R4-2.4, convictable on sight by R4-2.5)
§6 fold register (L409): *"⟨cmd⟩ this seat, 2026-08-29, `/usr/bin/grep -rl 'D-m13' waves/ ../carry/` → **∅** before this write."*
⟨cmd⟩ from `docs/tranches/X/fourier`: `/usr/bin/grep -rl 'D-m13' waves/ ../carry/` → `grep: ../carry/: No such file or directory` · prints `waves/F-W4.md` · **exit 2**.
⟨cmd⟩ from `docs/tranches/X/fourier/waves`: same command → `grep: waves/: No such file or directory` · **exit 2**.
⟨cmd⟩ `ls -d docs/tranches/X/carry` → *No such file or directory*. **There is no base at which both operands resolve**; the command exits 2 everywhere, i.e. the same failure mode as the `-P` class R4-2 was written to abolish, published inside the round-4 repair. Secondarily, at the only base where operand 1 resolves the output is `waves/F-W4.md`, not `∅`, so the "before this write" pairing has no published after-figure (R3-3.8's pairing idiom, which this file honours at five other sites).
**Cure**: one base — `/usr/bin/grep -rl 'D-m13' . ../carry/` from `waves/`, re-run, both halves of the pairing pasted.

### D5-4 · HIGH — three canonical F.W4 rows have no record-qualified booking (escapes)
R4-10: *"An id absent from both booking and citation is that wave's escape."* §2.X.2(g): the 913 remainder *"are unchanged, and are reachable under the idioms declared at (f)"*. Three are not.

1. **`fr-EquationResult K-10`** — canonical `| K-10 | — | F.W4 | **F.W4** |` in the fr-EquationResult block; §2 roster line lists it as the 24th. ⟨cmd⟩ `$W`: `/usr/bin/grep -Ec '(EquationResult|FR-EQR|EQR-)[^|]{0,60}K-10' F-W4.md` → **0**; `/usr/bin/grep -Ec 'K-10[^|]{0,60}(EquationResult|FR-EQR)' F-W4.md` → **0**. All four `K-10` tokens in the spec are foreign: `FR-CL K-10` (L26), an fr-AnimationControls disclaimer (L106), `fr-CL K-10` (L364), an `AA-1` sub-arm (L397). The record's substance IS carried — the `c654824e` vs `cd26c65` provenance kill at L26/L364 is fr-EquationResult K-10's own content — **without its banked identity**, which is §6.4's *"a fold whose source id is unwritten is a silent drop wearing a cure's clothes"* at the exact record §2.X.1(C) declares the criterion sends **whole**.
2. **`fr-FrequencyGraph R-7`** — canonical `| R-7 | — | F.W4 | **F.W4** |`. ⟨cmd⟩ `$W`: `/usr/bin/grep -oE 'FR-FG-[0-9A-Za-z-]+' F-W4.md | sort -u` → `FR-FG-12 · FR-FG-13 · FR-FG-21 · FR-FG-22 · FR-FG-C-8` — **no `R-7`**, and the file's only two `R-7`-bearing tokens are `FR-CP-R-7` (fr-CoefficientsPanel's, correctly booked).
3. **`fr-GalleryView R-5`** — canonical `| R-5 | — | F.W4 | **F.W4** |`. ⟨cmd⟩ `$W`: `/usr/bin/grep -Ec '(GalleryView|GV-|FR-GV)[^|]{0,60}R-5' F-W4.md` → **0**. Every `R-5` in the spec is the programme's own short-id-law ruling (*"R-5: a bare token is not an identity"*, L103/L112/L137/L144) — a live cross-namespace homonym that the spec cites four times while the record row it collides with goes unbooked.

**Structural note**: 23 homonym ids (49 roster rows) carry zero record-prefixed spelling anywhere in the spec, so this three is a **floor, not a total**. Leg (b) of `G-F4-CARRY-CLOSURE` must run record-qualified over that 49 before any close.

### D5-5 · HIGH — a booked id the canonical does not home here, and the promised fabrication class is empty
§2.X.2 duty: *"an id booked here that the canonical does not home here is this wave's fabrication. Both classes are enumerated below rather than asserted away."* §2.X.2(f)2 then declares the `fr-AppHeader` chain and prints its expansion, which includes **`-27`**.
⟨cmd⟩ `$C`: `/usr/bin/grep -n 'FR-AH-27' CENSUS-CANONICAL.md` → `:601 | \`FR-AH-27\` | \`D-m1\` · \`L-11\` · \`C-8\` · \`C-9\` | \`F.W1\` · \`F.W4\` | **F.W1** <sub>legs: F.W4</sub>` and `:4790 - **fr-AppHeader** (6): … \`FR-AH-27\` …` — the **F.W1** roster. `FR-AH-27` is absent from the F.W4 roster's 47.
So the spec books, under its own declared expansion, a row the canonical homes at F.W1; the fabrication class is never enumerated (it is not stated as empty either — it simply does not appear); and R4-6's leg law — *"each books as ONE row at the wave that holds the host id"*, verb spelled — is applied to `fr-SpeedSelect D-03` and `GM-6` at (d) but not to this leg. §2.X.2(g)'s `29 + 72 + 913 = 1014` cannot absorb it.
**Cure**: either drop `-27` from the chain and cite it at F.W1, or book it at (d) as a third explicit leg row with its verb — and enumerate the fabrication class, even at zero.

### D5-6 · MEDIUM — the rename crosswalk is short by two; its count word disagrees with the spec's own population (R4-7.3)
§2.X.2(a): *"`fr-ConvergencePlot` — the `FR-CP-LMn` spelling drops the banked hyphen **(7)**"*, crosswalking `L-B3 · L-M1 · L-M2 · L-M3 · L-M5 · L-M7 · L-M8`.
⟨cmd⟩ `$W`: `/usr/bin/grep -oE 'FR-CP-L[A-Z][0-9]+' F-W4.md | sort -u` → `FR-CP-LB2 · FR-CP-LB3 · FR-CP-LM1 · FR-CP-LM2 · FR-CP-LM3 · FR-CP-LM4 · FR-CP-LM5 · FR-CP-LM7 · FR-CP-LM8` — **nine**. `FR-CP-LB2` (×2) and `FR-CP-LM4` are the identical hyphen-drop shape, and `L-B2`/`L-M4` are canonical fr-ConvergencePlot **F.W4 rows**, so the two un-crosswalked renames sit on live roster rows. The bare `L-B2` bytes the file does hold (L94/L183/L377, *"M-10's RNG rider with every L-B1/L-B2 cure"*) are unqualified and cannot discharge them — the record banks no `L-B1`.
**Cure**: crosswalk nine, retire the numeral to the enumeration.

### D5-7 · MEDIUM — the record-prefix idiom qualifies to the wrong record: `FR-CP-` is fr-CoefficientsPanel's BANKED prefix
§2.X.2(f)1: *"The prefix is what makes axis (iv) satisfiable — it is the record qualification, written into the token."*
⟨cmd⟩ `$C`: `sed -n '935,1009p' CENSUS-CANONICAL.md | /usr/bin/grep -c '^| \`FR-CP-'` → **45** — the fr-CoefficientsPanel block banks `FR-CP-1 … FR-CP-27` and beyond; ⟨cmd⟩ `$R`: `/usr/bin/grep -o 'FR-CP-' fr-CoefficientsPanel.md | wc -l` → **92** occurrences, against the same over `fr-ConvergencePlot.md` → **3** (cross-references only; that record banks `RD-*`, `SC-*`, `L-M*`, `L-B*`).
F-W4.md nonetheless mints `FR-CP-LM1`, `FR-CP-LB3`, `FR-CP-D1`, `FR-CP-D9`, `FR-CP-C7`, `FR-CP-§5.1` for **fr-ConvergencePlot** while carrying genuine fr-CoefficientsPanel `FR-CP-13`, `FR-CP-16`, `FR-CP-R-7` in the same file. One prefix, two records — the qualification names the wrong one, and a boundary-exact probe over `FR-CP-*` cannot partition them. This is the deeper half of the defect (a) cures at the hyphen only.
**Cure**: fr-ConvergencePlot's local prefix is not `FR-CP-` (it is already spelled `FR-CP` for the other record); re-cut to the banked bare ids with a distinct local alias, or drop the prefix and record-qualify in words.

### D5-8 · MEDIUM — the BANDS clause is false at its own bytes: `FM-18` is enumerated nowhere
§2.X.2(f): *"`FM-4..FM-16` and `FM-17..FM-19` are ONE canonical row each and **their members are enumerated at §2.F and §2.X.2(b) so no member is lost to the shorthand**."*
⟨cmd⟩ `$W`: `/usr/bin/grep -c 'FM-18' F-W4.md` → **0**. `FM-17` and `FM-19` appear (1 and 3), the band spelling `FM-17..FM-19` appears 3×, `FM-18` never. Canonical §1 marks the row `band = 3 ids`, so the member exists and is unenumerated.
**Cure**: enumerate the three, or strike the "no member is lost" clause and say the band is carried whole.

### D5-9 · MEDIUM — §Y.3's residual-`-P` site list is incomplete and mis-addressed, by its own stated rule
§Y.3 enumerates six sites — *"§0's PURGE-SEAT FIX · §2.X's re-written toolchain minute · §2.X.1's `SS-C-1` re-cut · §2.X.1's born-RED re-cut preamble · §4's predicate-hygiene clause · this declaration"* — and closes *"a site that spells the dead flag joins this list, or the list is wrong."*
⟨cmd⟩ `$W`: `/usr/bin/grep -nE 'grep -[a-z]*P|-coP|-ohP|\`-P\`' F-W4.md | cut -d: -f1 | sort -un` → **L9 · L163 · L209 · L218 · L351 · L424 · L437 · L441** — **eight** sites. `L424` (§Y.1's own table row) and `L437` (§Y.2 item 1) are unlisted, and **`L163` sits in §2.J**, not §2.X.1 — the spec's own §2.X.1 bullet says *"`SS-C-1` — **BOOKED at §2.J**"*, so the declaration mis-addresses the site it names.
**Cure**: eight sites, addressed to their sections.

### D5-10 · MEDIUM — "restored beside every label" is false at the cure sites (M-25 depth)
§2.X.2(a), fr-ConvergenceTimeline: *"**The banked pair-spellings are restored beside every label**; the labels stay so the cure text does not fracture."*
⟨cmd⟩ `$W`: `/usr/bin/grep -noE 'CT-D[0-9]+[a-z]?' F-W4.md | cut -d: -f1 | sort -un` → **L81 · L82 · L84 · L122 · L297**. Only **L297** (the crosswalk itself) and **L84** (`FR-CT-D5b/C-5`, which carries its own R2-3d.4 note naming `fr-ConvergenceTimeline D·D-5 + C·C-5`) hold a banked spelling. At L82 the cure cells read `FR-CT-D3/C-2/D-1` and `FR-CT-D4/C-3/D-3` bare; L81 `FR-CT-D4b⊕D-9` bare; L122 `CT-D14` bare — no `L·D-3`, `L·D-4`, `L·D-14` beside any of them.
Same shape one record over: `G-F4-CONV-STUDY` (§4, L366) rests twice on **`FR-CP-LB3`**, and §2.0's SP-16/SP-18 on `FR-CP-LM1`/`FR-CP-LM8`, with no banked `L-B3`/`L-M1`/`L-M8` beside them — **a gate whose witness is a spelling the same spec convicts as un-citable**. Locks at §5.1(3) are otherwise sound (record-prefixed throughout).
**Cure**: the alias rides the head at every cure and gate site, not only in the crosswalk table.

### D5-11 · LOW — §0's residual-address declaration omits its §Y site
§0: *"every occurrence sits inside a STRUCK-address erratum at its own cure site (**§0 ×3, `G-F4-ANCHORS`, §5.1(1)**) or inside this declaration."*
⟨cmd⟩ `$W`: `/usr/bin/grep -nE 'F-W0\.md:199|F-W0\.md:204|F-W1\.md:7' F-W4.md | cut -d: -f1 | sort -un` → **L9 · L24 · L26 · L27 · L364 · L375 · L441**. L441 (§Y.3's closing sentence, *"Same idiom, same warrant, as §0's residual-address declaration for `F-W0.md:199`/`:204`/`F-W1.md:7`"*) is a seventh occurrence outside the enumeration. Same class as D5-9, one level smaller: §Y was added in round 4 and §0's declaration was not re-swept.

### D5-12 · LOW — filed against the CANONICAL, not the spec: the F.W4 band row is not greppable as an id
`$C` §2 spells the row `` `FM-17..FM-19 (3 ids)` `` — the parenthetical sits **inside** the backtick span, so a boundary-exact probe over the roster's own spelling matches nothing in any wave file, and any mechanical differ must special-case it. Consequently the F.W4 headline **1014 rows expands to 1016 ids**. §1 discloses the arithmetic (`band = 3 ids`); §2 does not, and §2 is the operand R4-10 makes binding.
**Cure (canonical-side)**: `` `FM-17..FM-19` `` with the multiplicity in a `<sub>` outside the span, as §1 already does.

---

## §7 WHAT THIS CHECK DOES NOT CLAIM

It is a **check**, never an operand (R3-4). Its escape figure (3) is a floor derived from the register-class tail of a 49-row homonym set, not an exhaustive record-qualified diff of 1014 — that diff is `G-F4-CARRY-CLOSURE` leg (b)'s to run at wave-open, record-qualified, and its transcript is the proof. Every figure above is re-runnable from the command printed beside it, from the base named beside it, on the pinned BSD toolchain. Per R4-4's two-key rule this file certifies nothing it authored: **no cure of D5-1…D5-12 lands until a seat that did not write this check re-runs its receipts.**

*— end of PASS-5 F-W4-CHECK. Tree untouched; `/Users/mkbabb/Programming/fourier-analysis` read-only; this file is the sole write.*
