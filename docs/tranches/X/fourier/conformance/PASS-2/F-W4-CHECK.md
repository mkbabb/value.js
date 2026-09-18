# F-W4-CHECK — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 2)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W4.md` (251 lines, 142,775 B — grown from PASS-1's 208/107,419 by the repair)
**Corpus authority**: the 66 `fr-*.md` at `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/`
**In-tree carries admitted**: `X/fourier/carry/F-W1-CARRY.md` (247) · `X/fourier/carry/F-W4-CARRY.md` (559). `ls X/fourier/carry/` = exactly these two. **F-W4 cites only F-W4-CARRY as its carry. Clean on R-3.**
**Seat posture**: FRESH. Every number below is this seat's own measurement over the live bytes. PASS-1's register was read AFTER the independent census was computed, and is cited only where this seat's result agrees or disagrees with it. Nothing inherited.
**Ordering**: `UTF8_BYTEWISE_CODEPOINT`. **Probes**: static reads only; `/Users/mkbabb/Programming/fourier-analysis` was read, never written.

---

## §0 — CENSUS DETECTOR LAW, as this seat applied it

Routing tokens were enumerated mechanically across all 66 records with **both** hyphen and en-dash spellings admitted:

```
regex: F\.W\s?\d+(?:\s?[-–/]\s?W?\d+)*
result: F.W4 1128 · F.W3/W4 1010 · F.W1 839 · F.W3 246 · F.W0 153 ·
        F.W5-W8 120 (U+002D) · F.W5–W8 72 (U+2013) · F.W2 68 · F.W9/W10 54 ·
        F.W5 53 · F.W1/W2 5 · F.W0/W1 2 · F.W7 2 · F.W1/W3 1
```

**Finding (detector)**: the en-dash form exists in this corpus **only** on the `F.W5–W8` span (72 occ / 24 records) — R-6's ruled class. **No `F.W3–W4` or `F.W4` variant uses U+2013**; the F.W4 routing surface is hyphen-and-slash only. The en-dash leg of the detector law therefore returns ∅ *for this wave* — a measured negative, not an unexamined one.

**Two directions are measurable and both were run:**

- **(A) the literal-`F.W4` direction** — adjudicated row heads whose terminal disposition cell/sentence carries the token `F.W4`. **1,011 row heads across 54 records.** (PASS-1 reported 963 on the same construction; the 48-row delta is this seat's extractor additionally admitting ruled-disagreement/identity-guard/killed-register heads, which are dispositioned below rather than silently dropped.)
- **(B) the dual `F.W3/W4` direction** — 898 further row heads carry only the dual token. These are **not** F.W4's alone; F.W3 owns the shadow-retirement half. The binding operand for this direction is **F-W3's own `§X.1` handover table**, which enumerates 58 dual-routed ids and states, in F-W3's bytes: *"These lines are **CITATIONS, NOT BOOKINGS** (R-2's one-home law): the **rows are held by the adopting wave named in column 3**"* — and column 3 reads **F.W4** for all 58.

**Census denominator used**: (A) 1,011 + (B) 58 = **1,069 routed**.

---

## §A — TOTALS

| quantity | value |
|---|---|
| routed row heads, literal-`F.W4` direction (54 records) | **1,011** |
| routed rows handed to F.W4 by `F-W3.md §X.1` (dual-route, F-W3's own declaration) | **58** |
| **routedTotal** | **1,069** |
| **BOOKED** (a §2 row · a spine member · a named fold · a §3 decision · a §4 gate · a §1 bounds item · a §5 cross-edge · a §6 exclusion-with-reason · or dispositioned to another wave at its record) | **1,052** |
| **ESCAPED** | **17** |

### CARRY→SPEC closure (leg (a) of the spec's own gate)

`F-W4-CARRY.md §Rows` = **421** bullet-ids — re-counted by this seat, the spec's headline figure is **exact**. The carry→spec direction reproduces PASS-1's result and is **CLEAN**. As the repaired gate itself now concedes, that leg *"is therefore incapable of seeing the wave's actual defect."*

### What the repair genuinely closed

All 26 hard escapes, 3 carry drops and 24 unnamed folds that PASS-1 convicted were re-tested **by id, at the bytes**, and every one now resolves:

`FR-EQR-18/-20/-22/-23/-28` ✔ · `★MF-4/-5/-6` ✔ · `INFO-3` ✔ · `FM-4 FM-5 FM-6 FM-7 FM-8 FM-9 FM-10 FM-11 FM-13 FM-14 FM-15` ✔ (band + FM-14's F.W3/W4 split named) · `FR-USB-18` F.W4 leg ✔ · `FR-IC-17` ✔ (as §6.5, adopting wave F.W1, no leaf grown — exactly R-2a) · `M-ZM` ✔ · `I-3` ✔ (with the `:248` extension) · `I-4` ✔ · `CP-33` ✔ · `FR-AH-24` ✔ · `SS-C-7` ✔ · `FR-USB-19` ✔ · `GCM-24/-44/-45/-46/-49` ✔ · `PAW-9/-13/-14/-19/-21/-23/-24/-55/-57` + annex `PAW-7/-11/-15` ✔ · the 24 fold identities ✔ (§6.4 re-denominated to 36 and internally consistent: 12+12+7+4+1 = 36).

**The registry→spec direction, as re-measured for the literal-`F.W4` set, is 1,009 / 1,011.**

---

## §B — ESCAPES, ID-FOR-ID (17)

### B.1 · The dual-route handover F-W3 declares and F-W4 does not hold (15) — **the wave's surviving defect**

`F-W3.md §X.1` books 58 rows to F.W4 by name. **Fifteen of them have ZERO bytes in `F-W4.md`.** Byte receipt (`grep -oE "\bID\b" F-W4.md | wc -l`, all → 0):

| # | banked id (F-W3 §X.1 column 1) | trigger (F-W3's own cell) | bytes in F-W4.md |
|---|---|---|---|
| 1 | `fr-GalleryCardModal GCM-6` | contingency-noted on the F.W1 target (free only if the target becomes 8.0.0) | **0** |
| 2 | `fr-GalleryCardModal GCM-12` | empty state or `v-if` | **0** |
| 3 | `fr-GalleryCardModal GCM-28` | dies inside GCM-30's dedup | **0** |
| 4 | `fr-GalleryCardModal GCM-30` | dies with GCM-52's wrapper deletion | **0** |
| 5 | `fr-GalleryCardModal GCM-31` | GLASS-RELAY (producer: teach `cn` its own aliases) + site cure | **0** |
| 6 | `fr-GalleryCardModal GCM-35` | → F.W3/W4 (D-26) | **0** |
| 7 | `fr-GalleryCardModal GCM-36` | → F.W3/W4 (D-27) | **0** |
| 8 | `fr-GalleryCardModal GCM-37` | → F.W3/W4 hygiene (D-28/C-17) | **0** |
| 9 | `fr-GalleryCardModal GCM-38` | → F.W3/W4 (D-29) | **0** |
| 10 | `fr-GalleryCardModal GCM-48` | delete; kills GCM-30 (D-31/D-32/L-15) | **0** |
| 11 | `fr-PaperArticleWindow PAW-6` | cure CONSTRAINED by K-17 — no whole-figure boolean is correct for f20 | **0** |
| 12 | `fr-PaperArticleWindow PAW-18` | one computed per figure in the PAW-3 extraction | **0** |
| 13 | `fr-PaperArticleWindow PAW-26` | distinguish the two nulls; keep the type | **0** |
| 14 | `fr-PaperArticleWindow PAW-29` | width variants ride the PAW-12 generator | **0** |
| 15 | `fr-CanvasControlsDock L-18` | fold by reference → `fr-BasisCanvas BC-10/C-9` (banked MAJOR, F.W3/W4 there) | **0** |

Each of the fifteen appears in `F-W3.md` **only** inside §X.1 — i.e. only as the citation F-W3 itself declares is *not* a booking. **Neither wave holds them.** This is the same defect class PASS-1 convicted (D-3/D-4), one level up: the repair closed the direction it was told to close (`F.W4` literal) and left the direction the routing token spells `F.W3/W4`.

⊘ **The repaired gate is written to catch this and does not.** `G-F4-CARRY-CLOSURE` leg (b) says: *"keep those whose terminal disposition routes to **F.W4**"*. A `**F.W3/W4**` disposition routes to F.W4. Read as written, leg (b) is RED on these fifteen; read as executed (literal-token match), it is blind to them — which is exactly the CENSUS DETECTOR LAW failure the program named, transposed from spelling-of-a-dash to spelling-of-a-slash.

**Indicative magnitude beyond §X.1** (recorded, not convicted — F.W3's census owns most of it): of the 898 dual-only rows, **146 have no byte in `F-W4.md` and 129 have no byte in `F-W4.md` ∪ `F-W3.md`**. This seat does not convict on that figure — the record-local id spellings of the records F.W4 barely touches (fr-BasisCanvas, fr-ImageUpload, fr-PaperSearchDropdown, fr-FrequencyGraph) make a mechanical prefix map unreliable there, and F.W3, not F.W4, is the adopting wave for most. It is published so the next seat sizes the class rather than re-discovering it.

### B.2 · Registry→spec escapes in the literal-`F.W4` direction (2)

| # | id / coordinate | terminal disposition (bytes) | receipt |
|---|---|---|---|
| 16 | `fr-PaperSidebar.md:51` — **`D-M4 extended`** (MAJOR, in the *Adjudicated defect roster*) | `Light-arm ramp failures are **4 stops, not 3** — 4.36/4.48/4.33/**3.58** — and the worst (stop 11, appendix B, live at 13/13) was missing from the axis's own verdict table … \| **F.W4** (fourier-side overrides in oklch) + **glass-ui BH relay** (rebaseline ask …)` | `grep -c 'D-M4' F-W4.md` → **1**, and that one hit is `EV-D·D-M4` (fr-EquationView), a different record. **The cure lands** — the substance is carried at §2.I under `PV-★MF-10 (= PS L-10)` (*"four failing light-arm stops of record incl. LIVE stop 11"*) and in `G-F4-CONTRAST-FLOOR` (`PV ★MF-10 3.58–4.48`) — **the identity does not.** This is precisely the class R-2c restored for `SS-C-7` / `FR-USB-19` / `FR-AH-24`: M-25 requires ONE row citing ALL witnesses, and `PS D-M4 extended` is an uncited witness on a row the spec already books. |
| 17 | `fr-ContourPreview.md:76` — **the id-less roster row `\| — \| D:m-6 \|`** (MINOR; the record says *"(Counted in the 20 MINOR.)"*) | `Previews the path, not the editing surface: showImageOverlay changes the editor and not the thing labelled "Preview"; takes only points. … ADJUDICATED → **F.W4** (accept "shape only" + re-word the deck, or pass the toggle through — SS-3 decides)` | `grep -c 'shape only' F-W4.md` → **0**; `grep -c 'showImageOverlay' F-W4.md` → **0**. §2.K books the ContourPreview numbered scheme **25 of 25** (rows 2·5·6·7·8·9·10·11·12·16·17·18·19·20·21·25·26·28·32·33·34·35·36·40→`CP-ROW-40`·42 — this seat re-derived the routed set from the record and every numbered F.W4 row resolves). This is the **26th** F.W4-routed roster row in that record and the only one the `\| N \| → CP-N` expander cannot see, because the record wrote `—` where the number goes. Not booked; not excluded. |

### B.3 · FALSE-ESCAPE REGISTER (dismissed at the bytes — recorded so pass 3 does not re-file them)

This seat's first mechanical diff returned 27 candidates. Twenty-five died on inspection:

- **`FR-AH-39` `-40` `-41` `-42`** — booked by §2.F's dotted elision `… · -36 · **-39..-43** · -46 …` (2 occurrences of the range token). A naive matcher that does not expand `-N..-M` against the run's live prefix manufactures four escapes here.
- **`CP-40`** — booked as **`CP-ROW-40`** (4 occurrences), the spec's own spelling of the record's row 40; `CP-33`'s named fold points at it.
- **fr-ConvergenceLegend `D-16 residue`** — booked inside §2.G's FR-CL MINOR run (`… D-14/D-L8 · **D-16** · C-12 …`).
- **fr-ConvergencePlot `L-M1` / `L-M2` / `L §5.1` / `L §5.3`** — booked as `FR-CP-LM1(+C-20)`, `FR-CP-LM2 ⊕ M-L1`, `FR-CP-§5.1`, `§5.3` (the spec normalises `L-M1`→`LM1`; the identity is traceable, the spelling drifts).
- **fr-ExportModal `*(fold)*` (N-16 instance)** — booked as `EXM-N-16-instance` at SP-15 and §6.4(a).
- **`RIDER on GM-M3`** / **`RIDER on GM-13`** — both carried inside their host rows (*"pane-scrollbar + **focus-scroll drag rider (→ SS-13)**"*; *"**single-loop cure keyed `` `${i}-${entry.slug}` `` closes GM-F2**"*).
- **`MPC-7 cure-completeness rider`** — booked twice (SP-11 and §2.K's *"the title's-voice completeness rider (SP-11)"*).
- **fr-MorphShapePreview `PRM residue`** — booked as `MSP PRM-residue` (SP-4) and in §2.K's MSP run.
- **`PS C-M1(b)`** — booked by `PS-C-M1(a)(b)/D-M1/D-M6/D-M8`. **`PS D-B3(a)(b)(c)`** — booked by `PS-D-B2/D-B3/D-M3`. **`PS M5`** — booked by `PS-M4 ⊕ M5 ⊕ L-3 …`.
- **fr-PaperView "Census F.W4 exhaustiveness row"** — an identity-guard line, not a defect row; its authority `CENSUS-2026-08-03.md:362` is cited at §0 and in `G-F4-CENSUS-CELLS`.
- **`SS-C-7 identity`** (ruled-disagreement head) — the id is now carried on `AC-C-2` per R-2c. **`SS-C-1 booking`** — routes `→ F.W5`, correctly outside F.W4's denominator. **`R2-LC missed row`** (startLoop unguarded on `scrubbing`) — its roster head is `MISS-SCRUB`, booked at §2.D inside `AC-C-2` (*"four doors ⇢ MISS-SCRUB same predicate"*).
- **HLG `C-10 and C-13 — left dispositionless`** and **`r2-LC's HLG-1 severity label`** — ruled-disagreement / label-correction cells, not roster rows; their substance rides `HLG-30 → FMD-22's narrowing` (§6.4(b)) and `HLG-1 → FMD-1` respectively. **`KILL-3`** — a killed-claims register row.
- **`FR-GFC-14`** — routes `→ **F.W3/W4** with FR-GFC-5` (dual, held at F.W3's end); the §2.J run `FR-GFC-12 ⊕ -13 ⊕ -15 …` correctly omits it. **`CP-14`** — routes `→ **F.W2**`. Neither is an F.W4 escape.

---

## §C — AXIS 2 · AUTHORITY REALITY (every citation re-resolved at the bytes)

### C.1 — VERIFIED EXACT

| citation in F-W4 | this seat's read | verdict |
|---|---|---|
| `docs/tranches/V/megatranche/formation/fourier/CENSUS-2026-08-03.md:193-195` | `5. **F.W4 · frontend audit saturated** — per-component D/L/C audit on the uplifted tree … the `BasisCanvas`↔`FourierField` convergence study; reduced-motion clock gating; dead-dep + vestigial-shadcn scrub; a unit-test floor (vitest) decision.` | **EXACT** — and the R-10.5 re-rooting is real: the file exists at that path (PASS-1's phantom D-7 is CURED, and the addendum ⟨R-10.5⟩ discloses the correction rather than silently rewriting it — E-3 clean) |
| same file `:362` | `\| **F.W4** \| R3-10 (all 6 dynamic-`:is` sites budgeted) · R5-7 … · X-2 (9-record route model) · X-9 (publish ONE member-scope law before any percentage) \|` | **EXACT** — the exhaustiveness row §0 and `G-F4-CENSUS-CELLS` both quote |
| `docs/tranches/V/megatranche/audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md` | file exists at the re-rooted path | **EXISTS** |
| `F-W1.md:276` (×2, the R-4b citation) | `4. **The atomic transaction (ONE change, G6):** producer bump … + 162-attribute Button rewrite … + lucide rename … + G10 disclosure deletions + FR-EQC-7 vaul-vue manifest gate + G13 manifest/lock moves + PP-REDGATE ambient declaration + FR-CP-13's gap decision + ExportModal M-γ deletion + GCM-22 `p-0` retirement + the pencil-boil floor per G14. **The roster is ELEVEN limbs and stays eleven — it is the extent every sibling spec cites (R-4b)** …` | **EXACT**, and F-W1 itself names R-4b as the reason. PASS-1's D-1 is CURED |
| `F-W1.md:294` | `FR-EQC-7's vaul-vue gate lands INSIDE the F.W1 transaction, not before.` | **EXACT** |
| `F-W1.md:224` (ESC-1) | `\| **ESC-1** \| Target tag: 7.0.0 (census) vs 8.0.0 (producer's shipped reality). …` | **EXACT** |
| `F-W1.md:247` (G1 = the RE-PIN act) | `\| **G1** \| **RE-PIN (OWNER-GATED, ESC-1).** This spec's target-TAG + ADOPTED-COMMIT-HASH cell is filled …` | **EXACT**, incl. "target TAG **and** ADOPTED COMMIT HASH" |
| `fr-EditorControlsDock.md:97` (INFO-3) | row head `**INFO-3**`; `dock/index.d.ts:2-3`; terminal `**F.W4** — the separator cure should take the whole family, not the hairline alone.` | **EXACT** — the spec's quoted banked terminal is byte-identical |
| `fr-FourierMorphSvg.md:39` (the FM band) | `\| **FM-4..FM-16** \| 13 MINOR \| As ruled in r1 (chip contrast demoted-with-rationale · always-inline color style · no proportion contract (px cell re-stated per FM-21) · fallback-less `var()` · 4-site primitive bypass …) All re-affirmed where this corpus touched them; no regrades. **F.W4** (FM-14 → F.W3/W4).` | **EXACT** — the spec's "Band content **verbatim from the record**" is verbatim, and the FM-14 parenthetical split is real |
| `fr-AppHeader.md:82` (FR-AH-24 · L-14) | terminal `**F.W1 fold** (identity = census §4; `./easing` ships at 7.0.0) — the colocation re-export can die in F.W4 independently`; and the `useFourierMorph:29` re-export correction (`EASING_PRESETS`/`EASING_PRESET_NAMES` + two types, **not** `getEasingFn`) | **EXACT** |
| `fr-UserSlugBar.md:58` (FR-USB-18) | `No in-flight state or busy affordance on logout (`:62-65`, `:103-111` no `:disabled`) … **→ F.W4 + F.W1** (`loading` prop).` | **EXACT** |
| `fr-InfoCard.md:49` (FR-IC-17) | `**FR-IC-17 · INFO, DISCHARGED-BY-UPLIFT**` | **EXACT** |
| `fr-PaperView.md:110/:111/:112` (★MF-4/-5/-6) | ★MF-4 U+2131 ℱ in the sole `<h1>` (`:356`) + 4 siblings · ★MF-5 iOS auto-zoom, `.ios` guard never activates · ★MF-6 `.sidebar-link` transitions `font-weight` (`:229-233`) | **EXACT** ×3 |
| `fr-NotationPills.md:35` (FR-NP-32) | `**FR-NP-32 ★NEW · … BLOCKER — NO-WAVE-OWNER (producer dist emitter) + glass-ui BH relay at the TOP of the FR-COB-28 packet; F.W1 SEQUENCING GATE.**` | **EXACT** — R-8's canonical form `FR-NP-32 (≡ fr-PaperSidebar M1)` is at §5.1(1). PASS-1's D-8 is CURED |
| `fr-ContourPreview.md:66` (CP-33) | line 66 is the `\| 33 \|` row, `ADJUDICATED → **F.W4** (row 40's extraction)` | **EXACT** |
| `carry/F-W4-CARRY.md:176` (SS-C-7 on AC-C-2) | `- **AC-C-2** ⟨AnimationControls C-2; corroborated fr-SpeedSelect SS-C-7⟩ MAJOR — …` | **EXACT** |
| live-tree witness `.ios` class (PV ★MF-5) | `grep -rn '\.ios\b' web/src` → **0** | **EXACT** |

### C.2 — CONVICTED: the R-9.1 G-11/G-12 coordinates are DRIFTED (4 citations)

The spec asserts, four times, that F.W0 publishes its anchor and denominator tables at named coordinates:

- §0 *corrected denominators*: `⟨**R-9.1**: this list is a **QUOTATION of F.W0's G-12 corrected-denominator table** … (`F-W0.md:204`) …⟩`
- §0 *evidence standard / D-19*: `⟨**R-9.1**: … F.W0's G-11 ONE corrected anchor table (`F-W0.md:199`, landing in `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md`)⟩`
- `G-F4-ANCHORS` gate cell: `F.W0 publishes ONE corrected anchor table (`F-W0.md:199` → `…SUBSTRATE-LEDGER.md`)`
- §5.1(1): `F.W0's **G-11** (ONE corrected anchor table, `F-W0.md:199`) and **G-12** (corrected denominators, `:204`)`

**At the bytes, this session:**

```
F-W0.md:199  →  (blank line)
F-W0.md:204  →  **Owning rows**: 18, 17, 19.      ← G-9's cell, not G-12
F-W0.md:211  →  ### G-11 — ONE corrected anchor table published; every later wave quotes it
F-W0.md:216  →  ### G-12 — ONE corrected-denominator table published; superseded figures FORBIDDEN downstream
```

The **authorities are real** — G-11 and G-12 exist, say what F-W4 says they say, and land in `SUBSTRATE-LEDGER.md` (`F-W0.md:65` declares the create). The **addresses are not**: all four are off by twelve lines, one onto a blank line and one onto a sibling gate's cell. The coordinates came from `RULINGS.md` R-9 (which measured a pre-repair F-W0, since grown to 365 lines); the ruling's own binding-force clause says *"a repair seat that finds a ruling's coordinate stale **re-measures** and applies the ruling's LAW to the live bytes"* — the re-measure was not performed. Under the check's standing rule (*a fabricated or drifted quote convicts*), **this convicts**.

⊘ Not a fabrication: nothing here is invented, and the substance is faithful. It is a stale address on a real authority, repeated four times, in the exact cell whose purpose is *"divergence from that table is a defect against G-11."*

### C.3 — LOW: "verbatim" that is not verbatim

§2.C restores FR-AUL-41's cohort as: `**Cohort: FR-AFP-34 · FR-USB-19 · fr-PaperView D/m-17**, per `carry/F-W4-CARRY.md:162` **verbatim**`.
The carry at `:162` reads: `**Cohort: FR-AFP-34, FR-USB-19, D/m-17.**` — comma-separated, and `D/m-17` **unqualified**. The record-qualification the spec adds is *correct* (R-5's short-id law) and the ids are right; the word **verbatim** is false at the bytes. Cure is one word: *"per `…:162`, record-qualified."*

### C.4 — LOW: the PIN-LAW coordinate

§0 PIN LAW: `F.W1 is pinned **`4→7(→8, G1-gated)`** and *opens after … **ESC-1** ruled (**G1**)* (`F-W1.md:7`; …)`. The **"Opens after"** clause is at `F-W1.md:7` ✔. The **pin string** `4→7(→8, G1-gated)` is at `F-W1.md:5` (the `**Name**` line). One sentence, two artefacts, one coordinate — the reader who greps `:7` for the pin does not find it.

---

## §D — AXIS 3 · NO INVENTION / M-25 DEPTH

**Anti-rename**: this seat found **zero invented ids**. Every id in the spec resolves to a banked registry row or a carry row; every R-2a/R-2c adoption resolves at its cited registry coordinate (§C.1). The FM band's *"Band content verbatim from the record"* is verbatim; the ⊘ disclaimer that *"the record publishes NO per-id mechanism key … the id↔mechanism binding is re-derived at wave-open — booked as a named residue, never presumed here"* is the honest posture and matches `fr-FourierMorphSvg.md:39`'s bytes.

**Locks, carried where their rows land:**

| lock | required | found | verdict |
|---|---|---|---|
| **FR-NP-32 by id** | the corrupt-dist BLOCKER cited by its own id, not only under `fr-PaperSidebar M1` | §5.1(1) `**FR-NP-32 (≡ fr-PaperSidebar M1)**` ⟨R-8 addendum, with the BLOCKER grade and the O-20 packet named⟩ + §2.H (`fresh-build repro BLOCKED behind FR-NP-32`); 3 occurrences of the id, 1 of M1 — cite-both, never substitute | **CARRIED, R-8 discharged** (PASS-1's D-8 cured) |
| **PAW-44 / LAW-3** | verbatim sequencing; the design dissent stays OPEN | §3 D4 (`⊘ LAW-3 verbatim: `overflow-x: clip` is the candidate cheap cure BUT restoration lands WITH-OR-AFTER PAW-1's header-background cure + PAW-30's bleed handling, NEVER before`) + §2.I + §5.1(3); `LAW-3/LAW-4 valid under EITHER outcome`; PAW-47/PAW-54 named as dependents | **CARRIED ×3, verbatim, dissent OPEN** |
| **MPC-31 one-cut** | verbatim; witness at a non-boot state | SP-3 (`MPC-31 (see §5 ONE-CUT)`) · §2.K (`⊘ MPC-31 ONE-CUT LAW (MPC-3 ⊕ MPC-10 ⊕ MPC-13 ⊕ MPC-8 ⊕ MPC-22 as ONE cut … MPC-8's re-domain is the WITNESSABILITY PRECONDITION; acceptance witness at a NON-BOOT state; MPC-13's typecheck flip lands WITH the token cure`) · §5.1(2)(3) · §6.1 kills the rename-only cure | **CARRIED ×4** |
| **FR-MSP-6 two-channel** | the plate-only cure is VOID | §0a (`MorphPhaseConfig plate-only D-2 cure KILLED — see FR-MSP-6 lock (K-13)`) · §2.K (`the plate measures 1.117–1.205:1; the 16.21:1 is a TEXT fact; **no ticket ships the regression under a green-looking edit**`) · §5.1(3) · §6.1 | **CARRIED ×4** |
| **same-commit riders** | the repair-arms-the-defect class held inseparable | §5.1(3) carries 25 rider locks incl. `PSM-1 ⇢ PSM-13 + PSM-4 + PSM-12`, `ECD-B-2 ⊕ CCD-M-2 cured together (or the focusable-summary cure MANUFACTURES the BLOCKER)`, `AA-8 before AA-1`, `HLG-41 before/with the colour cure`, `FR-AH-8's cancellation WITH-OR-BEFORE DMT M-1's watcher`, `M-10's RNG rider with every L-B1/L-B2 cure`; each also restated at its row | **CARRIED** |
| **F.W3's four anti-cures** | not contradicted | (1) `@layer` wrap → §0a/SP-6 (`only `@layer glass-overrides` appended after `utilities` works`) + §6.1 · (2) the D-2 tint-plate/FR-MSP-6 void-cure → §0a + §2.K + §6.1 · (3) the ariaLabel forward → `grep -c ariaLabel F-W4.md` = **0**; SP-7 prescribes the opposite (*"a description is never a name"*) and §5.2 routes the naming leg to F.W3 · (4) the token-swap leaving the compounding press intact → SP-6 `FV-8 (⊘ press COMPOUNDS the token, corrected mechanism)` | **NO CONTRADICTION on all four** |
| **F.W4 preamble** | binding before any count | §0: BS-1..BS-4 · loop-source provenance · disclosure-state gate · corrected denominators · repair-unit sizing · evidence standard/D-19 · **PIN LAW** (new at repair) · strike-at-agglomeration; `no percentage publishes before this`; §5.1(1) `F.W4 quotes NO census percentage until these land` | **PRESENT, load-bearing** |
| **§0a NEGATIVE ROSTER** | proven negatives cited, not re-derived; gated | §0a, **22 rows**, each with a witness id; enforced by `G-F4-NEG-ROSTER`; restated at §6.2 (7 non-rows) | **PRESENT, gated** |

**Dissents carried (sampled ×10, all found)**: `FR-EQR DISSENT-1` (§0, with the ESCALATE trigger) · `AA-3` w2 MAJOR · `AC-D-2` LC BLOCKER · `FR-AH-5` reader-2 BLOCKER · `FR-AFP-5` reader-α BLOCKER · `FR-AUL-33`/`-35` LC MAJOR · `GV-L-5` demoted with both readers' MAJOR in dissent · `MPC-12` reader-2 MAJOR (§6.4(c), *"second recording"*) · `HLG-9`'s D-8 grading amended by HLG-37 · D1/D2 minorities (§3).

---

## §E — AXIS 4 · GATES (17 gates, all born-RED; every witness re-derived against the live trees)

| gate | witness claim | this seat's verification |
|---|---|---|
| `G-F4-VITEST` | `web/` scripts are exactly `dev/build/preview/test:e2e/test:e2e:ui`; no vitest/jest; zero `*.test.ts`/`*.spec.ts` under `src` | scripts = **exactly those five** ✔ · `grep -c 'vitest\|jest' web/package.json` = **0** ✔ · `find web/src -name '*.test.ts' -o -name '*.spec.ts'` = **0** ✔ |
| `G-F4-NO-UNUSED` | tsconfig has 13 compilerOptions keys, no `noUnusedLocals`; no ESLint config in `web/` | **13** keys ✔ · `noUnusedLocals` **absent** ✔ · `ls web/ \| grep -i eslint` = **0** ✔ |
| `G-F4-ADMIN-AXE` | `grep -rln "admin" web/e2e/` → zero files | reproduced: **0** ✔ |
| `G-F4-A11Y-ROUTE` | axe drives `/visualize` + `/v/{slug}` ONLY — 7 `checkA11y` sites; `AxeBuilder` ×2 | **exactly 7 invocations** (`visualization-ux.spec.ts:114/:146/:163/:201` + `visualization-crud.spec.ts:529/:636/:659`; the other 5 grep hits are the two local helper definitions and three prose comments) ✔ · `new AxeBuilder` = **2** ✔ |
| `G-F4-OCCLUSION` | `App.vue:24/:26` force `scrollWidth − clientWidth = 0`; `DELTA.md:9-11` books 21/21 GREEN | `:24` = `h-dvh flex flex-col … overflow-hidden` ✔ · `:26` = `<main class="flex-1 min-h-0 flex flex-col overflow-y-auto">` ✔ · `DELTA.md:9-11` = `**occlusion gate: 21/21 GREEN** (zero horizontal overflow on every page × viewport)` ✔ |
| `G-F4-DEAD-DEP` | `search/index.ts` zero consumers; `CanvasOverlayButton.vue` zero consumers (delete AFTER restoration) | both files exist at the named paths ✔ |
| `G-F4-VUE-TSC-CLEAN` | `npm run build` already runs `vue-tsc -b` | `build` = `vue-tsc -b && vite build` ✔ |
| `G-F4-CENSUS-CELLS` | `raw-findings.json:1393` · `lane-frontend.md:617` | `:1393` = the no-`prefers-reduced-motion` grep cell ✔ · `lane-frontend.md:617` = `\| JS gate \| `paper/PaperView.vue:176` \| `window.matchMedia?.(…)` — smooth-scroll opt-out \|` ✔ (file at `docs/tranches/V/megatranche/formation/fourier/lane-frontend.md`) |
| `G-F4-DECISIONS` | `DECISIONS-F.W4.md` — "None exist today" | `find docs -name 'DECISIONS-F*'` = **0** ✔ correctly declared to-be-created with its path |
| `G-F4-CARRY-CLOSURE` | 421 rows in the CARRY; leg (b) RED | **421** §Rows bullets ✔; leg (b) is genuinely RED — and, per §B.1, **still RED after the repair for the dual-routed class** |
| `G-F4-ZERO-CONSOLE` | F.W1's atomicity gates; the ELEVEN-limb roster cited whole | the R-4b sentence appears **×2** (§5.1(2) and the gate cell) with the `F-W1.md:276` + `:294` citations verified ✔; `vaul-vue` now appears ×3 (PASS-1 measured 0) ✔ |
| `G-F4-KATEX-QUIET` | `strict` defaults `"warn"`; `\html*` calls `reportNonstrict("htmlExtension")` before the trust check | self-labelled *"confirmed by execution in node"* — an execution receipt, not a shipped proof-script. Not re-run; **no contrivance surface** ✔ |
| `G-F4-ANCHORS` | quotation of F.W0's G-11 | the gate's LAW is right and R-9.1-conformant; **its coordinate is wrong** — see §C.2 |
| `G-F4-CONTRAST-FLOOR` · `G-F4-PRM-CLOCK` · `G-F4-DERIVER` · `G-F4-CONV-STUDY` · `G-F4-NEG-ROSTER` | measurement/derivation instruments, stated as to-be-built with today's RED named | every witness traces to a banked row; **15** thrice-derived ratio pairs in the contrast floor, each id-resolvable ✔ |

**L-19 (proof-scripts presumed contrivance)**: **no gate ships a bespoke proof script.** The two closest — `G-F4-CARRY-CLOSURE` (an id set-difference) and `G-F4-CONTRAST-FLOOR` (a re-derivation harness) — are a doc-conformance instrument and a measurement instrument, both born-RED with their RED state named today. **No convictable contrivance.**

⊘ **LOW · pathless gate witnesses**: `G-F4-CENSUS-CELLS` names `raw-findings.json:1393` / `:2968` and `DELTA.md:9-11` by **bare filename**. The fourier tree holds **two** `raw-findings.json` (`docs/audits/runs/2026-06-16-M-deep-audit/` and `…/2026-06-17-M-critique-audit/`); the content verifies in the 06-16 file. Against R-3(3) — *"Every gate witness names a path that exists"* — the address is ambiguous even though the witness is real.

---

## §F — AXIS 5 · ATOMICITY + POSTURE

| axis | finding |
|---|---|
| **F.W1 ONE atomic land-or-lose transaction — cited, not restated** | **PASS (PASS-1's D-1 CURED).** Both former three-limb enumerations are replaced by the R-4b sentence verbatim: `▲ F.W1 is ONE atomic land-or-lose transaction — **the ELEVEN-limb roster chartered at `F-W1.md:276`, incl. the FR-EQC-7 vaul-vue manifest gate INSIDE per `:294` — cited whole, never restated here**` at §5.1(2) **and** inside `G-F4-ZERO-CONSOLE`, each carrying `⟨R-4b; the prior three-limb enumeration is struck at both of this spec's sites⟩`. `grep -c 'vaul-vue'` = 3 (was 0). The RE-PIN act (G1) and the P0 CSS-class census (G5) are explicitly named as **F.W1's and nowhere here as F.W4 work**. |
| **F.W1 pin presumption / unruled escalation** | **PASS (PASS-1's D-2 CURED).** §0's new **PIN LAW** tags all eight 8.0.0-dependent cure shapes `⊘ ESC-1/G1` **and gives each its 7.0.0-branch fallback**: SP-7's `LabeledSelect` · SP-9's `size`-props death (SS-D-01/SS-L-04) · SP-9's MPC-32 bare-track · §2.D's SS-D-03 single register · §2.J's GAB `loading` posture · §2.J's GAB `compact` formatter · §2.K's MPC-32 floor · §5.1(2)'s `LabeledSelect`. `ESC-1` ×16, `G1-GATED` ×9 (was 0/0). The law is stated as a *shape* constraint — *"a cure whose SHAPE depends on an unruled escalation is unauthorable as written"* — which is the correct altitude. |
| **F.W0 pre-gates precede everything** | **PASS.** §5.1(1) `F.W0 FIRST` enumerates the substrate pre-gates (FR-NP-32 ≡ M1 · dirty worktree GAB-13 · F8-REACH-01/02 · FM-19 assets · G-F4-NO-UNUSED enablement · FR-AH-33 manifest hygiene · FR-NP-2 · EP-C/m-6) and binds `**F.W4 quotes NO census percentage until these land.**` §0 marks `⟨FR-NP-2, F.W0-owned, binding here⟩`. |
| **F.W0's published-once tables are quoted, not re-performed** | **PASS in law, DEFECTIVE in address.** The R-9.1 quotation posture is adopted verbatim in four cells (*"divergence from that table is a defect against G-11, not a rival act"*, *"F.W4 does not re-perform the re-resolution as its own act"*, and the five anchor kills published as F.W4's **contributions** to F.W0's table). Only the coordinates are stale — §C.2. |
| **SS-4 owner flags INLINE, never presumed** | **PASS, exemplary.** §5.2 →F.W5–W8: `⊘ **SS-4 FLAGS its owner rulings INLINE (trie-vs-KISS et al.) and NAMES the TA-4 value-side atomdiff restoration as prerequisite or re-scopes explicitly.**` §3 D9: `PS-L-4 (+M6) — **OWNER-GATED**, escalated at F.W1 … ⊘ F.W4 EXECUTES the collapse … ONLY after the ruling. **Unauthorable unruled.**` §3 preamble: *"A cluster that depends on a decision does not open until it is ruled"* (→ `G-F4-DECISIONS`). |
| **fourier tree READ-ONLY** | **PASS.** Three assertions (header · §1 `tree READ-ONLY at this stage` · footer). This seat's own probes of `/Users/mkbabb/Programming/fourier-analysis` were reads only; nothing was written anywhere outside this file. |
| **status `planned` · zero VERIFIED** | **PASS.** `grep -c 'VERIFIED'` = **0**. `**Status: planned**` (header) · `(all `planned`)` (§2) · `All `planned`.` (§3) · `all born-RED` (§4) · the footer's execution-gate restatement. No execution verb in the current voice. |
| **Glass-producer rows never become frontend hacks** | **PASS.** §5.1(6) states the law; §5.2's GLASS-RELAY edge routes ~25 producer asks to the standing BH inbox (SS-6). |
| **Rulings addressed to F-W4 — spot-check** | **R-2a** adopt GCM ×5 ✔ · PAW ×9(+3) ✔ · FM band ×11 ✔ · FR-EQR ×5 ✔ · ★MF ×3 ✔ · INFO-3 ✔ · CP-33 ✔ · M-ZM ✔ · I-3 ✔ · I-4 ✔ · FR-IC-17 → **F.W1** with no leaf grown here ✔ (§6.5, exactly the ruling's shape) · **R-2c** FR-USB-18 F.W4 leg ✔ · 3 carry drops restored ✔ · registry→spec direction added to `G-F4-CARRY-CLOSURE` ✔ · **R-4b** both sites ✔ · **R-4 sibling** 8.0.0 gated ×8 by name ✔ · **R-8** ✔ · **R-9.1** law ✔ / address ✘ · **R-10.5** both authority paths rooted and tree-verified ✔. **All seven directives applied; one applied with a stale coordinate.** |
| **§6 register arithmetic** | **PASS.** §6.1 = 19 dead cure shapes (counted 19) · §6.2 = 7 (counted 7) · §6.3 = 7 (counted 7) · §6.4 = 36 (12+12+7+4+1 = 36) · §6.5 = 1. PASS-1's D-5 (`(12)` against ≥36) is CURED, with the inconsistency disclosed in the addendum rather than papered over. |

---

## §G — DEFECT REGISTER (ranked)

- **D-1 · HIGH · Census (the dual-route handover is homeless).** `F-W3.md §X.1` books 58 dual-routed rows to F.W4 by banked id and states *"the rows are held by the adopting wave named in column 3"*; **15 have zero bytes in `F-W4.md`**: `GCM-6 · GCM-12 · GCM-28 · GCM-30 · GCM-31 · GCM-35 · GCM-36 · GCM-37 · GCM-38 · GCM-48 · PAW-6 · PAW-18 · PAW-26 · PAW-29 · fr-CanvasControlsDock L-18`. Receipt: `for t in GCM-6 … L-18; do grep -oE "\b$t\b" F-W4.md | wc -l; done` → **0 ×15**, against one §X.1 citation each in `F-W3.md`. Neither wave holds them.
- **D-2 · HIGH · Gate blindness (the closure gate still cannot see the direction it was repaired to see).** `G-F4-CARRY-CLOSURE` leg (b) is written *"keep those whose terminal disposition routes to **F.W4**"*; the corpus spells that routing **`F.W4` (1,128 occ) AND `F.W3/W4` (1,010 occ)**. The repair measured the first spelling only — which is why D-1 survives a gate authored to kill exactly this class. The fix is one clause: leg (b)'s token set must be `{F.W4, F.W3/W4}` with both dash spellings, mirroring R-6's ruled en-dash idiom.
- **D-3 · HIGH · Authority (drifted coordinates on a real authority, ×4).** `F-W0.md:199` is a **blank line** and `:204` is `**Owning rows**: 18, 17, 19.` (G-9's cell); F.W0's G-11 and G-12 headings live at `:211` and `:216`. F-W4 cites `:199` three times and `:204` once, in the cells whose whole purpose is *"divergence from that table is a defect against G-11."* The coordinates were inherited from `RULINGS.md` R-9 without the re-measure that ruling's own binding-force clause requires.
- **D-4 · MEDIUM · Census escape (identity, not cure).** `fr-PaperSidebar.md:51` **`D-M4 extended`** (MAJOR, terminal `F.W4 … + glass-ui BH relay`) has zero bytes in the spec; its substance rides `PV-★MF-10 (= PS L-10)` and `G-F4-CONTRAST-FLOOR`. Same class R-2c restored for `SS-C-7`/`FR-USB-19`/`FR-AH-24`: M-25 requires ONE row citing ALL witnesses.
- **D-5 · MEDIUM · Census escape (the id-less roster row).** `fr-ContourPreview.md:76` `\| — \| D:m-6 \| MINOR \| … ADJUDICATED → **F.W4** (accept "shape only" + re-word the deck …)` — the 26th F.W4-routed roster row in a record whose 25 numbered rows are booked 25/25. Receipts: `grep -c 'shape only' F-W4.md` → 0; `grep -c 'showImageOverlay' F-W4.md` → 0.
- **D-6 · LOW · "verbatim" overclaim.** §2.C's FR-AUL-41 cohort is labelled *"per `carry/F-W4-CARRY.md:162` verbatim"*; the carry's bytes are `**Cohort: FR-AFP-34, FR-USB-19, D/m-17.**` (commas; `D/m-17` unqualified). The added record-qualification is correct under R-5 — the word "verbatim" is not.
- **D-7 · LOW · PIN-LAW coordinate.** §0 anchors the pin string `4→7(→8, G1-gated)` and the "opens after ESC-1 (G1)" clause to a single `F-W1.md:7`; the pin string is at `F-W1.md:5`.
- **D-8 · LOW · Pathless gate witnesses.** `G-F4-CENSUS-CELLS` cites `raw-findings.json:1393`/`:2968` and `DELTA.md:9-11` by bare filename; two `raw-findings.json` exist in the fourier tree. Content verifies; the address does not discriminate.

---

## §H — WHAT THE REPAIR GOT RIGHT (recorded so pass 3 does not regress it)

The repair is substantial and honest. All 53 PASS-1 escapes resolve **by their banked ids**, with anti-rename discipline stated at each site (`M-ZM` *joins* SP-6 rather than adding an edit; `I-4`'s id is named at BS-1 and books no cure; `CP-33` is a named fold onto an already-booked target; `FR-IC-17` is cited to its adopting wave and grows no leaf). The FM band is restored **as a band**, with the ⊘ admission that the record publishes no per-id mechanism key — a refusal to invent that is worth more than the eleven ids. R-4b, R-4-sibling, R-8 and R-10.5 are discharged completely and verifiably: the eleven-limb transaction is cited whole and never restated, all eight 8.0.0 assertions are ESC-1/G1-gated **with 7.0.0 fallbacks**, `FR-NP-32 (≡ fr-PaperSidebar M1)` is the canonical form, and both phantom authority paths now resolve at the tree with the correction disclosed as an addendum (E-3), not a silent rewrite. Every one of 17 gates carries a witness this seat independently reproduced against the live trees — **zero phantom scripts, zero fabricated counts** (the five-script / 13-key / 7-checkA11y / 2-AxeBuilder / 421-row / 0-eslint / 0-admin figures are exact to the byte). §6's four registers are internally consistent and correctly re-denominated. The locks (PAW-44/LAW-3, MPC-31, FR-MSP-6, the 25 same-commit riders, the 22-row negative roster) are carried where their rows land, not merely cited.

**What remains is one thing said twice**: the wave's closure gate was repaired to run in the registry→spec direction, and then run against only half the corpus's spelling of its own routing token. Fifteen rows that F.W3 publicly hands to F.W4 sit in neither file.

---

**VERDICT (local): DEFECTIVE.** 1,069 routed · 1,052 booked · **17 escaped** · 8 defects (3 HIGH · 2 MEDIUM · 3 LOW).

**Minimum repair for pass 3**: (a) book or exclude-with-reason the 15 `F-W3 §X.1` rows F.W3 declares F.W4 holds (10 GCM · 4 PAW · CCD L-18); (b) widen `G-F4-CARRY-CLOSURE` leg (b)'s token set to `{F.W4, F.W3/W4}` in both dash spellings and re-run it — the gate, not the seat, should have caught (a); (c) re-anchor the four R-9.1 citations to `F-W0.md:211` (G-11) / `:216` (G-12); (d) restore `PS D-M4 extended` as a cited witness on `PV-★MF-10 (= PS L-10)`; (e) home `fr-ContourPreview.md:76`'s id-less `D:m-6` row (booking or §6 line); (f) strike "verbatim" at §2.C, re-point the pin string to `F-W1.md:5`, and path-qualify the census-cell witnesses.

*Read-only everywhere except this file.*
