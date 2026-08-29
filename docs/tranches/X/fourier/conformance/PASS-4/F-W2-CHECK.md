# PASS-4 · F-W2 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, pass 4)

**Seat**: fresh, 2026-08-29. **No roster inherited.** Every id, figure and quotation below was re-derived this
seat from the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` + `library-band.md`, from the
live value.js / fourier / glass-ui trees, and from the landed bytes of the sibling specs. PASS-1/2/3 registers,
RULINGS-3 and the PASS-3 CLOSE-CERT were read **only** to establish whether a finding is new, repeat or cured —
no operand, no number and no quotation below is taken from any of them.

**Target**: `docs/tranches/X/fourier/waves/F-W2.md` (419 lines, repair round 4 — the RULINGS-3 / fabrication-purge round).
**Real carries in tree**: `carry/F-W1-CARRY.md`, `carry/F-W4-CARRY.md` — ⟨cmd⟩ `ls docs/tranches/X/fourier/carry/`.
No `F-W2-CARRY.md`. ✓ (R-3 holds, fourth pass running.)

**VERDICT: DEFECTIVE.** Routed **58** · booked **54** · excluded-with-reason **3** · **escaped 1** ·
10 defects (3 high, 4 medium, 3 low).

---

## 0. What reproduced — the round-4 repairs, verified

Round 4's seven named cures and its two structural changes were each re-run at the bytes. **The overwhelming
majority land, and every one of PASS-3's ten defects is addressed at the site PASS-3 named.** This is stated
first because the defects below are new ones, not repeats of the cured set.

| PASS-3 defect | round-4 cure | this seat's re-run |
|---|---|---|
| **D-1** detector position-restricted | second-position arm added; PP-REDGATE + item 7 + C-6 homed at §7/§8c | ⟨cmd⟩ `grep -noE '[FW][.·–-]?W?[0-9]+[/–-]W2' fr-*.md` → 5 hits, all `fr-PathPreview.md` (`:50`×2 · `:80` · `:107` · `:114`) — all three ids now carried ✓ (but see D4-5 for the *stated* operand) |
| **D-2** `C·S-2` not byte-matching its ⟨cmd⟩ | re-quoted whole | ⟨cmd⟩ `sed -n '138p' fr-MorphShapePreview.md` → `3. **C·S-2 — … — carried.** Preserve verbatim through F.W2.` — the words now match ✓ (emphasis does not; D4-7) |
| **D-3** four PNGs outside bounds, path unresolvable | create ×4 rows at `docs/tranches/V/megatranche/audit/probes/app-wave/` | ⟨cmd⟩ `ls docs/…/app-wave/` → `BORN-RED-2026-07-27.json`, `app-shell-truth-probe.mjs` (dir live) · `ls /Users/mkbabb/Programming/value.js/audit` → *No such file* ✓ both halves restated truthfully |
| **D-4** two `…`-elided gate commands | G4's `sed` and G8's `node -p` completed | both re-run literally this seat: literal opens `:3`/closes `:7`; 80 keys ✓ |
| **D-5** `:294-297` vs `:295-296` self-contradiction | receipt range and span stated separately for all three soft-wrapped quotations | ⟨cmd⟩ `sed -n '294,297p' library-band.md` → `:294` heading, `:295-296` the words, `:297` the vizcolor leg ✓ · `sed -n '114,117p'` → *Booking* closes `:115` ✓ (RD-8's `:128` note off by one — D4-10) |
| **D-6** bold on RD-8's law the bank does not set | emphasis struck | ⟨cmd⟩ `sed -n '124,128p' library-band.md` → one italic span, no bold; F1 now carries none ✓ |
| **D-7** "sixteen against the real export" | TEN (export) ⊕ SIX (F.W2's own) separated at D3/G11/§7 | ⟨cmd⟩ `sed -n '317p' F-W5.md` → the `F.W5 → F.W2` row enumerates exactly **ten** ✓; none dropped ✓ |
| **D-8** A6's lower-cased `The` | conformed | ⟨cmd⟩ `sed -n '46p' fr-FourierMorphSvg.md` → capital **T** ✓ (bold span differs; D4-7) |
| **D-9** `fr-GalleryInfiniteGrid C-6` unbooked/unexcluded | §7 row + §8c row 57 | ⟨cmd⟩ `sed -n '48p' fr-GalleryInfiniteGrid.md` reproduces the quoted cell ✓ |
| **D-10** D2's unmarked elision | `, 0 component imports …` restored | ⟨cmd⟩ `sed -n '303p' fr-PaperArticleWindow.md` → matches ✓ |

**The tree and export-surface figures — 22 receipts re-run from scratch, all reproduce:**
`hexToRgba` **5 sites / 3 files** (`golden-shimmer.ts:55`,`:58` · `epicycles.ts:258`,`:283` · `BasisCanvas.vue:261`) ·
`hexToRgb` **zero call sites** outside `colors.ts:111` (G17) · `colors.ts` = **117** lines · amber **1 + 8 = 9** ·
`spectrumColor` **4 declarations** (`transforms.ts:3` · `harmonics.ts:81` · `FrequencyGraph.vue:42` ·
`shared/CoefficientsSpectrum.vue:47`) · `equation/convergence/` = **two** SFCs · `basis-display.ts` literal opens
`:3` closes `:7` · **one** hand-rolled `lerp` at `useCurveTransition.ts:85` with `ConvergencePlot.vue:11` importing it ·
`resolveVizColors()` never assigns `.golden` (`colors.ts:83` = `STATIC.golden`) · `DIRECT_EASINGS` **19** at
**`:94-114`** · `easing():Result` at `src/easing.ts:166` · `./easing` exports **16**, `bezierPresets` **30** ·
value.js exports **7 subpaths**, `exports['.']` → **undefined** · glass-ui 4.0.0 exports **80**, `./dom` **true**,
`./package.json` **false** · `easingNames|timingFunctions` **0** · `sampleColorRamp|mixColorsN` **0** ·
`colorUnit2|color2` **0** · `parseCssColor` at `src/subpaths/css.ts:47` · G13 grep **1 line**, `-o` → **2** ·
G16 `easing('ease-in-out').value === easing('ease-in-out').value` → **false** · `facility-19.md` and
`RULINGS-F.W2.md` both **absent** · `.gitignore:34` → `*.png`.

**Sibling-spec anchors — re-resolved at their targets:** `grep -o 'The roster is ELEVEN' F-W1.md` → **no output** ·
`grep -o 'The roster is TWELVE' F-W1.md` → the phrase ✓ · `grep -o 'PP-REDGATE ambient declaration' F-W1.md` → the
phrase ✓ · `grep -o 'exports zero-cells (P-9)' F-W5.md` → the act cell ✓, and `zero-cells` occurs on exactly the two
rows named (F-W5 `:317` in §4, `:340` in §5) ✓ · `grep -o 'F.W0 additionally owns the pre-gate (G-4) + relay item 0'
F-W0.md` → the sentence ✓ · `grep -o 'NO-WAVE-OWNER (producer emitter)' F-W0.md` → **no output** (the round-3 strike
is correct) ✓ · `grep -n '^### G-1[0-9]' F-W0.md` → `G-11`/`G-12`/`G-13` headings verbatim as quoted ✓ ·
`grep -n 'SUBSTRATE-LEDGER' F-W0.md` → the `:85` create row ✓ · `grep -n 'THE F.W0 RE-HOME IS PERFORMED HERE' F-W0.md`
→ carry row 1 (`:129`) ✓ · `grep -n 'EASING RE-POINT VERIFIED BY EXECUTION' F-W1.md` → the `G12` row ✓ ·
F-W1 §2's `WU-K` and `WU-R` headings resolve ✓.

**Corpus quotations byte-checked at their own ⟨cmd⟩** — reproduce: `fr-AdminAuditLog.md:57` (with its emphasis) ·
`fr-HarmonicLevelGrid.md:113` · `fr-EquationPanel.md:23` · `fr-MorphPhaseConfig.md:46` · `fr-EasingPicker.md:52` ·
`fr-CollapsibleSection.md:27` · `fr-CanvasControlsDock.md:96` · `fr-Tooltip.md:56` · `fr-UserSlugBar.md:81` ·
`fr-PaperSearch.md:57` · `fr-PaperSearchInput.md:107` · `fr-PaperArticleWindow.md:303` · `fr-NotationPills.md:35`
(**canonical FR-NP-32 form, R3-8 satisfied**) · `fr-ContourPreview.md:34`/`:47`/`:55` · `fr-GalleryFeaturedCarousel.md:39` ·
`fr-GalleryInfiniteGrid.md:48`/`:49` · `fr-PathPreview.md:50`/`:80`/`:107`/`:114` (**all four, whole**) ·
`library-band.md:115-116`, `:124-127`, `:295-296`.

**M-25 depth — the anti-over-booking arm is CLEAN.** `PAW-44`/`LAW-3`, `MPC-31`, `FR-MSP-6` are **correctly absent**
from F-W2 (⟨cmd⟩ `grep -c` each against `F-W2.md` → 0/0/0/0; `fr-MorphPhaseConfig` carries **zero** literal `F.W2`
lines; `fr-PaperArticleWindow` carries exactly one, `:303` K-24; `fr-MorphShapePreview` exactly one, `:138` C·S-2).
`FR-NP-32` is cited by id at its banked bytes and by F-W0's carry row + `G-4`. MPC-2 is carried verbatim and
contested without pre-emption; CENSUS-MC narrows G10's premise rather than defending it; the anti-cures (the "one
import edge" KILL, derive-from-`VIZ_COLORS` KILL, tokenisation-is-not-the-cure, the theming-arm KILL, the
absolutization kill) all carry their killing authority.

**Posture — otherwise CLEAN.** Status `planned` ✓ · `VERIFIED` **NO**, and the only two `VERIFIED` tokens in the
file are the State cell and F-W1's quoted `G12` gate name — **zero stamps** ✓ · F.W1's transaction cited whole at
**F-W1 §4 step 4** + **§4 cross-edge 1** with the correct **TWELVE**, never restated ✓ · SS-4's owner-gated `G4`
flagged inline at F1/§6b/§7 and not pre-empted ✓ · fourier tree READ-ONLY in every witness ✓ (the four new create
rows are value.js-tree PNGs) ✓ · 8 of 8 cross-edges declared ✓ · **W7 zero-row posture is CORRECT** — `F.W7` occurs
in the corpus only at `fr-Tooltip.md:10`/`:32`, and fr-Tooltip's sole F.W2 row is `:56` FR-TT-22, so no F.W2-routed
row owes an F.W7 edge ✓ · no check file is any gate's operand; the PASS-N registers are named as PRIOR RUNS ✓.

---

## 1. ID-KEYED CENSUS — fresh enumeration under the four-axis / §X.1-v4 reading

**Detector, stated before it is run.** SHAPES = table rows whose terminal cell routes ⊕ id-headed route-marked
bullets ⊕ prose routings walked back to their enclosing banked row id. SPELLINGS = `F`,`.`,`·`,`-`,`–` and the
zero-separator form. POSITIONS = a member matches written first or second. EXPANSION = every slash/range form
expanded to its member set at every position. RECORD-QUALIFICATION = the booking test is the `(record, id)` pair.

**Token enumeration (the exhaustive form, run before any per-arm probe)** ⟨cmd⟩
`grep -hoE 'F[.·–-]?W[0-9]+([/–-]W?[0-9]+)*' fr-*.md library-band.md | sort | uniq -c | sort -rn` →
`F.W4` 1128 · `F.W3/W4` 1010 · `F.W1` 839 · `F.W3` 246 · `F.W0` 153 · `F.W5-W8` 120 · `F.W5–W8` 72 · **`F.W2` 68** ·
`F.W9/W10` 54 · `F.W5` 53 · **`F.W1/W2` 5** · `F.W7` 2 · `F.W0/W1` 2 · `F.W1/W3` 1.
**No range form contains W2** (the two band spellings are `W5–W8`); **no zero-separator or spaced form exists**
(⟨cmd⟩ `grep -cE 'FW2|F W2' fr-*.md library-band.md` → no matches); **`library-band.md` carries zero literal `F.W2`**
(⟨cmd⟩ `grep -c 'F\.W2' library-band.md` → 0), so its W.L5 routings are non-literal exactly as F-W2 states.
First-position arm: **25 records / 57 lines / 68 occurrences**. Second-position arm: **`fr-PathPreview.md` only**.
Union **26 records**. The six further records that contain the bare token `W2` are other tranches' waves —
`B.W2` (fr-CoefficientsPanel `:40` · fr-ContourEditorCanvas `:116` · fr-FrequencyGraph `:66`), `A.W2`
(fr-SvgFilters `:54`), `A.W3.d`/`AW.W26` (fr-CollapsibleSection · fr-GalleryAdminBanner) — correctly excluded.

**Every one of the 57 first-position lines was walked to its enclosing banked row id and matched against §8a/§8c
id-for-id.** Fifty-three resolve to a booked or excluded id; four are record preambles (`Routes:` taxonomy lines at
fr-ContourPreview `:30` · fr-ConvergencePlot `:42` · fr-ConvergenceLegend `:42` · fr-EquationView `:41`) and six are
ADJUDICATED/VERDICT summaries whose F.W2 clauses restate rows already booked. **One does not.**

### 1a. Booked — 54 of 54 in §8a land

All 54 rows re-resolved against the corpus. **Every one is real, correctly record-qualified, and correctly homed.**
No id is fabricated; no id is double-booked (row 31's `fr-GalleryInfiniteGrid FR-GIG-17 (= C-18 of that record)` is
correctly distinguished from row 49's `fr-AnimationControls C-18`); the ten members of F-W5's real P-9 export are
all carried at D1/D3/D4 with **none dropped** (⟨cmd⟩ `sed -n '317p' F-W5.md`); the §3 ledger head (29) and §8b's
enumeration agree. The twelve `⟳` rows all cite rather than re-book, which is right under FR-GIG-5 / R-5.

### 1b. Excluded-with-reason — 3, all sound

`fr-PathPreview PP-REDGATE` (`:50`, re-affirmed `:80`) · `fr-PathPreview` roster item 7 (`:107`, tally `:114`) ·
`fr-GalleryInfiniteGrid C-6` (`:48`). All four quotations reproduce byte-for-byte; both homes (F.W1 inside the
atomic transaction; B4's wave-lock) are correctly named. **This half of round 4 is right.**

### 1c. ESCAPED — 1

| # | id | corpus receipt | why it is an escape |
|---|---|---|---|
| **E4-1** | `fr-EquationView C·D-16` | ⟨cmd⟩ `sed -n '74p' fr-EquationView.md` → *"**C·D-16** (four of five `--viz-*` tokens resolve to `#888888` at the installed pin; `VIZ_COLORS.amber` survives only by the unrelated D.W4.d WCAG override; `:65`'s `\|\| VIZ_COLORS.golden` unreachable dead code) → **fr-BasisCanvas D-1/BC-1/C-1** (BLOCKER, → F.W1) via the fr-App B-1 fold — **booking only the two increments: the CENSUS CONTRADICTION (CENSUS:187-189 books F.W2 as "declared 3-line hex residual"; the deleted surface is colors.ts:22-117 with live wrong output on 4 of 5 tokens — needs a colour-token witness)** and the consumer arm…"* | ⟨cmd⟩ `grep -c 'D-16' F-W2.md` → **0**. A first-position literal `F.W2` line, in a record F-W2 opens **twelve** times (⟨cmd⟩ `grep -c 'fr-EquationView' F-W2.md` → 12) and books six ids from. §7 row 1 excludes the *identity* (fr-BasisCanvas D-1/BC-1/C-1) and never this **id** — and the id's first booked increment is a contradiction **of F.W2's own charter**, whose named remedy ("needs a colour-token witness") is G11's subject and whose named surface (`colors.ts:22-117`, the 3-line hex residual) is B8's. Excluded-without-reason does not count as carried (G19) |

**Escape arithmetic**: routed **58** = 54 booked ⊕ 3 excluded-with-reason ⊕ **1 escaped**. Carried share 98.3%.

**This is the SAME class round 4 cured one record away and did not sweep.** §8c's own note reads: *"row 57 escaped
although the operand found it… Widening a detector cures the first class and cannot touch the second."* The seat
that wrote that sentence widened the detector, homed the one booking miss PASS-3 handed it, and did not re-walk
the 57 lines its own detector returns. `C·D-16` is on one of them.

---

## 2. Defects

### D4-1 · HIGH · Census escape: `fr-EquationView C·D-16`, a booked increment about F.W2's own charter, is neither booked nor excluded

**Claim.** §8's roster (54) and §8c's exclusions (3) sum to a routed set of 57 that omits `fr-EquationView C·D-16`.

**Receipt.** ⟨cmd⟩ `sed -n '74p' fr-EquationView.md` (above). ⟨cmd⟩ `grep -c 'D-16' F-W2.md` → **0**; the string
`CENSUS CONTRADICTION` occurs nowhere under `docs/tranches/X/fourier/`. ⟨cmd⟩ `grep -c 'fr-EquationView' F-W2.md` → **12**.

**Law convicted.** G19's FAIL clause — *"excluded-with-reason counts as carried; excluded-without-reason does not"* —
and §8c's own two-class distinction, which names precisely this failure mode and then leaves an instance of it standing.

**Why it is load-bearing, not clerical.** The increment states that the CENSUS books F.W2 as a *"declared 3-line hex
residual"* while the surface F.W2 deletes is `colors.ts:22-117` with live wrong output on four of five tokens. That is
a live contest against **B8** (the wave's central act) and **G6** (the residual's validation arm), and the bank
prescribes the remedy F.W2 already owes under **G11** (*"needs a colour-token witness"*). Cheapest cure: one §7 line —
*"C·D-16 — the F.W1-homed identity's census-contradiction increment; F.W2 answers it at G11's colour-value census and
B8's residual, no second booking"* — which under G19 counts as carried.

### D4-2 · HIGH · §X.1-v4 was consumed from the reading F-W3 explicitly STRUCK, and B5's conclusion is refuted by the partition's own holder table

**Claim.** Round 4's masthead: *"**§X.1-v4 is consumed fresh from F-W3's landed bytes** (the twin partition published
FIRST this round per R3-1a) at every row where F.W2 hands to the twins — §6b's F.W3/W4 edge and B5."* On that warrant
§6b(3) states *"v4's own probe reports its two homes as **this file and F-W3**, and F-W3's is a record-qualified
citation"*, and B5 concludes *"**B5 is consequently the identity's ONLY booking**… the execution half **owes a named
holder** at the twins and F.W2 does not supply one."*

**Receipt.** F-W3 §X.1-v4 item 2 carries a purge-seat correction that says the opposite, at both halves:
⟨cmd⟩ the probe as F-W3 now prints it → **`M-β1 -> F-W2.md · F-W3.md · F-W4.md`** — three files, not two — and the
struck note reads *"As banked, the three rows read `F-W3.md · F-W5.md · F-W7.md · F-W8.md` / **`F-W2.md · F-W3.md`** /
`F-W3.md`… **That clause is FALSE at the settled bytes and is struck**"*. **F-W2 quotes the struck reading.**
And §X.1-v4 item 5's holder table assigns the identity: *"**F.W4** — the criterion's negatives… `fr-BasisCanvas`
(20 ⊕ `BC-20`/`M-β1`/`M-β3`)… **F.W3 CITES, F.W4 BOOKS.**"* Live: ⟨cmd⟩ `grep -c -- 'M-β1' F-W4.md` → **6**, and
`F-W4.md:241` books it by name — *"**colour-source divergence**: **`M-β1`** — `spectrumColor` exists **four times**…"* —
under a section that states at `:244` *"the fourth line, consumed as v4 settled them"*.

**Law convicted.** R3-1a/R3-1b (the twin sequencing: v4 publishes, the consumer reads *it*), R3-3.8 (a struck receipt
may not be re-banked), and the round's own headline. **The one clause round 4 stakes on reading F-W3 fresh is the one
clause it did not read fresh** — it took item 2's phrase *"cited at F.W3, booked nowhere"* (which is v4's description
of the state at publication) and missed both the correction three sentences earlier and the holder assignment two
sections later. B5's *"owes a named holder"* is false: the holder is F.W4, named by v4 and landed by F-W4.

### D4-3 · HIGH · B11's banked FR-NP-9 quotation has NO ⟨cmd⟩ that returns it; the one printed beside it returns a different row, and the string itself drifts

**Claim.** B11 renders the banked FR-NP-9 finding as *"proven with value.js's own dist, the very declared-and-bypassed
dependency this row books."* under §3's masthead rule that every corpus quotation carries the ⟨cmd⟩ that reproduced it.
B11's provenance bracket reads ⟨`fr-NotationPills FR-NP-9 = C·D-4 ∘ L·L-4` ⟨cmd⟩ `sed -n '35p' fr-NotationPills.md`…⟩,
and §3's manifest lists that same `sed -n '35p'` as B11's receipt.

**Receipt.** ⟨cmd⟩ `grep -c "proven with value.js's own dist, the very declared-and-bypassed dependency this row books"
fr-NotationPills.md` → **0**. The bank, ⟨cmd⟩ `sed -n '47p' fr-NotationPills.md`, reads
*"(nine of nine channels, proven with value.js's own dist **—** the very declared-and-bypassed dependency this row books)"* —
an **em dash where F-W2 writes a comma**, and no terminal period (the clause closes a parenthetical). Meanwhile
⟨cmd⟩ `sed -n '35p' fr-NotationPills.md` returns **FR-NP-32's** row (*"FR-NP-32 ★NEW · reader-1 M1… NO-WAVE-OWNER
(producer dist emitter) + glass-ui BH relay at the TOP of the FR-COB-28 packet; F.W1 SEQUENCING GATE"*), a different
id on a different subject. **FR-NP-9's real coordinate, `:47`, is named nowhere in F-W2.**

**Law convicted.** R2-1-LAW.1/.2 and R3-3.9's purge mandate (*"EVERY ⟨cmd⟩ receipt in all 11 specs is RE-RUN against
the settled bytes… a label without a ⟨cmd⟩ either gains one or loses the label"*). This is D-2's exact class — a
quotation whose printed command returns other bytes — surviving the round convened to sweep it, on the row that
supplies **G11's strongest argument** (*"the wave's strongest argument for a colour-VALUE census"*) and whose banked
NEVER-clause (K-8) F-W2 elevates to a wave-wide cure-shape lock at §6a.

### D4-4 · MEDIUM · §6a's `vaul-vue` SITE SET — the round-4 "classification that survives F-W1's next edit" is already short by one

**Claim.** §6a converts the banned count to a set: *"⟨cmd⟩ `grep -o 'vaul-vue' F-W1.md` returns the token, and its
SITE SET — the classification that survives F-W1's next edit — is **§2 WU-L's FR-EQC-7 row · §3's `G13` … · §4 step 2 ·
§4 step 4 · §4's cross-edge 1 · §2·R1's placement note · §2·R2's placement note · §E-3·R2's dated errata row**"* —
eight sites.

**Receipt.** ⟨cmd⟩ `grep -n 'vaul-vue' F-W1.md` → **nine** lines: `:172` `:259` `:274` `:276` `:294` `:309` `:353`
**`:396`** `:491`. ⟨cmd⟩ `sed -n '396p' F-W1.md` → *"**Placement note (binding, not stylistic — §2·R1/§2·R2's
discipline, re-applied a third time).**…"*, and ⟨cmd⟩ `sed -n '1,396p' F-W1.md | grep -n '^#\{2,3\} ' | tail -1` →
`394: ## §2·R3 — Repair-round-3 adoptions`. **§2·R3's placement note is a ninth site and is not in the set.**

**Law convicted.** R3-3.10, whose whole purpose is that the sibling receipt survive the sibling's edits. Round 3
corrected this receipt six→eight; round 4 changed its *form* and kept it stale — and the missing site landed in
F-W1 at repair round 3, i.e. **before** F-W2's round-4 seat claimed to have re-read F-W1. A set that is wrong is
not more durable than a count that is wrong; it is only harder to falsify.

### D4-5 · MEDIUM · G19's stated inline detector returns 32 records, not the 26 the gate reports

**Claim.** G19 states the four-axis detector INLINE (R2-9's requirement) and gives the position axis as
*"the probe is `(F[.·–-]?W[0-9]+[/–-])?F?[.·–-]?W2` in both dash spellings, run as two arms"*, then reports
*"union **26 records**"*; §8's Instrument paragraph repeats the 26.

**Receipt.** ⟨cmd⟩ `grep -lE '(F[.·–-]?W[0-9]+[/–-])?F?[.·–-]?W2' fr-*.md | wc -l` → **32**. Every component of the
stated regex is optional except `W2`, so it degenerates to a bare-`W2` probe and sweeps six records that route to no
F-wave at all: `fr-CoefficientsPanel` (`B.W2.c`) · `fr-ContourEditorCanvas` (`B.W2`) · `fr-FrequencyGraph` (`B.W2.c`) ·
`fr-SvgFilters` (`A.W2`) · `fr-CollapsibleSection` (`A.W3.d`) · `fr-GalleryAdminBanner` (`AW.W26`). The **26** comes
from two other, narrower commands printed in the same cell.

**Law convicted.** R2-9's closing clause as G19 itself restates it — *"A shape-, spelling- or position-restricted
operand is DEFECTIVE at authoring whatever its result"* — read for its purpose: the operand a seat can run must be
the operand that produced the banked roster. Here it is not, and the failure runs the other way (over-breadth
without record-qualification), so a seat running the stated probe gets six spurious records and no warning.
Cheapest cure: print the two arms as the operand and drop the fused regex, or anchor it `(F[.·–-]?W[0-9]+[/–-])?F[.·–-]?W2`.

### D4-6 · MEDIUM · An undeclared command base `$V` survives the round that declared the bases file-wide

**Claim.** §5: *"**COMMAND BASES, DECLARED ONCE AND FILE-WIDE**… The bases, **binding on every ⟨cmd⟩ in this file**:
`$W` … `$K` … `$F` … **Everything else is literal and runs from `/Users/mkbabb/Programming/value.js`**."*

**Receipt.** ⟨cmd⟩ `grep -oE '\$[A-Z]' F-W2.md | sort | uniq -c` → `2 $F` · `2 $K` · **`1 $V`** · `3 $W`. The `$V` is
in **A2**, on the very command round 4 singles out as its load-bearing completion: *"⟨cmd⟩ `node -e "import('./dist/subpaths/easing.js')…"` **(cwd `$V`)** → `exports: 16` · `bezierPresets keys: 30`… **the command is completed to a
literal, runnable form by the purge seat** — rounds 1–3 banked it `…`-elided, which is the R3-9.1 unrunnable-machinery
class, and it re-ran EXACT once written out."* No line of the file defines `$V`.

**Law convicted.** R3-9.1 (every gate/receipt executable as written) and §5's own "binding on every ⟨cmd⟩". The
command does run from the value.js root — but that is the reader's inference, not the file's statement, and the
file's statement is that a base token means what §5 declares. A fourth base that §5 does not declare is the
elision defect wearing a variable name.

### D4-7 · MEDIUM · The emphasis-drift class D-6 convicted is cured at RD-8 alone and survives at six banked quotations

**Claim.** F1 records the cure: *"**EMPHASIS STRUCK**… Added emphasis is a rendering the cited file does not carry"* —
and the round asserts the seven cures were *"each cured at every site that states it"*.

**Receipt** (each `sed` re-run this seat; in every case the bank's emphasis and F-W2's differ):
- ⟨cmd⟩ `sed -n '58p' fr-EasingCurvePreview.md` — the bank sets **no** emphasis inside CENSUS-MC's cell. F-W2 bolds
  *"the value.js-specifier half of the scheduled migration is NOT blocked on the uplift"* at **three** sites (A6's
  table row, R-iii's second bullet, G10's cell) and additionally bolds *"exception `timingFunctions` holds"* at G10.
- ⟨cmd⟩ `sed -n '89p' fr-EasingPicker.md` — bank: *"the F.W1 "5 sites / 6 symbols" costing double-counts"*, no bold.
  A6 bolds **double-counts** and re-punctuates the inner quotation from `"…"` to `'…'`.
- ⟨cmd⟩ `sed -n '77p' fr-PaperSearchDropdown.md` — bank bolds only *"**F.W5-W8 = no rows.**"*; D3 also bolds
  *"zero value.js/keyframes/canvas/WebGL/API contact"*.
- ⟨cmd⟩ `sed -n '120p' fr-AnimationControls.md` — bank bolds only *"**NO-WAVE-OWNER**"*; D4 renders the whole clause
  *"NO-WAVE-OWNER observation; the colors.ts deletion identity stays with census W.L5."* bold **and** italic.
- ⟨cmd⟩ `sed -n '46p' fr-FourierMorphSvg.md` — bank bolds the whole span *"**The one unbanked arm, booked as a rider
  on that F.W1 ticket (reader-2 missed #5, INFO)**"* and the rider *"**the F.W1 rewrite must be verified by execution,
  not typecheck.**"*; A2/A6 bold **only** the word `The` (the D-8 correction marker, left inside the quotation) and
  drop the rider's bold.
- ⟨cmd⟩ `sed -n '138p' fr-MorphShapePreview.md` — the D-2 re-quote drops the bank's bold span
  *"**C·S-2 — … — carried.**"* entirely, at the clause the spec three times calls a PRESERVATION obligation.

**Law convicted.** R2-1-LAW.2 as F1 itself states it, and R3-3.9's program-wide byte-check of *every* verbatim/banked
label. Round 4 fixed the instance PASS-3 named and left the class, which is the exact failure round 3 was convicted
of ("cured eight receipts one at a time and left the shape that generates them").

### D4-8 · LOW · §5's absolute *"no `…` survives anywhere in this file"* is false at its own bytes

**Receipt.** ⟨cmd⟩ `grep -c '…' F-W2.md` → **24**. The receipt printed to certify the absolute —
⟨cmd⟩ `grep -oE '…/[a-zA-Z@]' F-W2.md` → no output — is true, and is narrower than the sentence it certifies by
the whole difference between "no elided path" and "no ellipsis". A banked absence-claim about the citing file is
the same structural hazard R3-3.10 removed for counts: it is falsified by the file's own next quotation.

### D4-9 · LOW · The amber "ten" F-W2 corrects is the BANK's word, and the divergence is never named as a banked divergence

**Receipt.** ⟨cmd⟩ `sed -n '55p' fr-ContourPreview.md` — row 22's ADJUDICATED disposition cell reads
*"→ **F.W2** (mint `--contour-stroke` once, **cure ten sites** with row 1)"* while the same row's description reads
*"an inline presentation attribute at **9 sites** / 2 files / five alphas"*. F-W2 corrects to nine at B3 and §6a as
*"corrected from 'ten' at repair round 2"* — a formulation that reads as a fold-seat slip. The measurement is right
(⟨cmd⟩ `grep -c 'hsl(40' …ContourPreview.vue …ContourEditorCanvas.vue` → `1 + 8 = 9`), but the corrected figure is a
**banked** one, and F-W2's own idiom elsewhere (A2's `parseCSSColor` transcription note, B6's RETIRED-BY-DELETION
correction, G15's provenance) is to name a bank-vs-tree divergence explicitly rather than absorb it.

### D4-10 · LOW · Two anchor/tally notes are off by one, one of them the record's own arithmetic

**Receipt (a).** F1: *"a RECEIPT RANGE, one line wider than the law text's own span `:124-127`… the italic closes on
`:127`; **`:128` is the following `counts` sentence**"*. ⟨cmd⟩ `sed -n '124,128p' library-band.md` → `:127` reads
*"completeness bidirectional (no unlisted import, no listed symbol without a consumer).* `counts`"* — **the `counts`
sentence begins on `:127`**, not `:128`. The span claim is right; the parenthetical that justifies it is not.
**Receipt (b).** ⟨cmd⟩ `sed -n '137p' fr-ContourPreview.md` — the record's ADJUDICATED tally reads *"…fifteen of
forty-two rows route to F.W4, three to F.W1…, **two to F.W2**…"* while **three** of its rows carry terminal
`ADJUDICATED → **F.W2**` cells (`:34` row 1 · `:47` row 14 · `:55` row 22), all three booked at §8a 7–9. The
bookings are right (terminal cells govern), but F-W2 makes a point of using `fr-PathPreview.md:114`'s tally as
*"the arithmetic proof the pair is two rows"* and leaves the one record tally that contradicts its own bookings
unmentioned — the asymmetry is what the M-25 method exists to forbid.

---

## 3. Axis verdicts

| axis | verdict | note |
|---|---|---|
| **1 · ID-keyed census (§X.1-v4 twin partition)** | **DEFECTIVE** | 58 routed / 54 booked / 3 excluded-with-reason / **1 escaped** (D4-1). The three round-4 exclusions are sound and their four PathPreview quotations byte-match. No fabricated id, no double-booking, no export-member drop. But the §X.1-v4 consumption reads a STRUCK probe and states a "no named holder" conclusion the partition's own holder table and F-W4's landed booking refute (D4-2) |
| **2 · RECEIPT REALITY** | **DEFECTIVE** | **38 ⟨cmd⟩ receipts re-run this seat; 33 reproduce exactly.** Five do not: B11's FR-NP-9 quotation has no receipt returning it and the one printed returns another row, with the string drifted (D4-3, HIGH) · §6a's `vaul-vue` site set is 8 against a live 9 (D4-4) · G19's stated regex returns 32 against a banked 26 (D4-5) · six banked quotations carry emphasis the bank does not set or drop emphasis it does (D4-7) · §5's ellipsis absolute is false at its own bytes (D4-8). Every tree, export-surface and probe figure reproduces without exception |
| **3 · M-25 depth** | **CLEAN** | FR-NP-32 canonical at its banked bytes (R3-8 ✓) and re-homed by F-W0 carry row 1 + `G-4`; PAW-44/LAW-3, MPC-31, FR-MSP-6 correctly **not** booked, each verified against its record's F.W2-line set; MPC-2 carried verbatim and contested without pre-emption; CENSUS-MC narrows G10 rather than defending it; the twin law is stated correctly even where its consumption is stale (D4-2 is a reading defect, not an anti-rename breach — B5 still books one identity and cedes execution); anti-cures all carry their killing authority; same-commit riders sized at the re-measured five/nine |
| **4 · GATES** | **DEFECTIVE (minor)** | 20 gates, all born RED, every RED state reproduced this seat (G1/G3 probes live; G5/G6/G13/G16/G17/G20 re-measured RED directly; G12's path now resolves and its four artefacts are inside §2a). **No gate takes a check file as its operand** — G19's LHS is the 66 records and the PASS-N registers are named as prior runs ✓ (R3-4 satisfied). G4's and G8's elided commands are completed and both re-ran ✓. Defects: the inline detector as stated does not produce the roster it reports (D4-5); an undeclared base `$V` (D4-6); §5's ellipsis absolute (D4-8) |
| **5 · POSTURE** | **CLEAN** | F.W1's transaction whole at **F-W1 §4 step 4** + **§4 cross-edge 1**, TWELVE, never restated ✓ · **W7 zero-row posture correct by enumeration** (`F.W7` appears twice in the corpus, both in fr-Tooltip, whose only F.W2 row is FR-TT-22) ✓ · SS-4 flags inline, FN-5/owner-gated `G4` named and not pre-empted ✓ · fourier tree READ-ONLY in every witness ✓ · status `planned`, `VERIFIED` **NO**, zero stamps ✓ · 8 of 8 cross-edges declared ✓ · RULINGS-3's three directives to F-W2 all applied — R3-5.1 landed (with D4-5's operand caveat), R3-9.1 landed except `$V`, the R3-3.9 purge share landed at the ten named sites and not as a class (D4-3, D4-7) |

**Local verdict: DEFECTIVE.** One census escape of exactly the class §8c's own closing paragraph describes and does
not sweep; one twin hand-off consumed from the reading its publisher struck, whose conclusion the publisher's holder
table refutes; one banked quotation with no receipt that returns it. The rest of F-W2 — every tree figure, every
export-surface number, every gate state, every sibling anchor, the whole posture and the entire anti-over-booking
arm — reproduces at the bytes, and the ten PASS-3 defects are all addressed where PASS-3 named them.
