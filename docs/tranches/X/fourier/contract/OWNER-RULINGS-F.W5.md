SERVED MODEL: claude-fable-5-1

# OWNER-RULINGS-F.W5 — the inline ruling block SS-4 requires (R1…R9), the dissent register, and the G22 minute

**What this is.** `F-W5.md` §2a lists nine owner rulings the shared-provenance contract could not be
authored without, and COHESION §0/§1 **SS-4** requires them **flagged inline** — a ruling the contract
consumes must be readable beside the contract, by ruling id, in the owner's own words. This file is
that block. It **rules nothing**: every ruling below was taken by the owner at **`docs/tranches/X/COHESION.md`
§0j.D** under the 2026-09-17 begin-word, and this file **quotes** each one from those bytes with its
ruling id, names the v2 clause that lands it, and preserves §2b's dissent register **unresolved**.
It also carries the **G22 minute** — the strike of the dangling `MF-9` cite — because that strike is
an adjudication of the contract's provenance and the ruling block is where the contract's
adjudications live.

**Authority**: `docs/tranches/X/fourier/waves/F-W5.md` §2a · §2b · §3 G22 · §6 (the spec, IMMUTABLE,
E-3) · `docs/tranches/X/COHESION.md` §0j.D (the rulings, IMMUTABLE) · the contract
`contract/J-diff-shape-v2.md` (units b · c · d, 2026-09-17). **Seat**: F.W5 unit *e*, the fresh
adjudicator (§1c) — it authored none of v2's, the register's or the spec's bytes.

**Bases** (assigned in the block that consumes them, R4-2.3): every ⟨cmd⟩ below runs from the value.js
repo root; `R=docs/tranches/V/megatranche/registry/adjudicated` · `X=docs/tranches/X/fourier`.
Normalised matching, where a sentence wraps across source lines, is v2 §0.6's own instrument —
⟨cmd⟩ `/usr/bin/tr '\n' ' ' < <file> | /usr/bin/tr -s ' ' | /usr/bin/grep -c -F '<sentence>'`.

---

## §1 — The nine rulings, quoted by id (SS-4's inline block)

Every quotation in the **ruling, verbatim** column was re-run against `COHESION.md` under the
normalised instrument at this seat, 2026-09-17, and returned **1** (double-run, nine of nine). The
**§2a row** column is the spec's own framing; the **honest default** column records whether the owner
took the default the spec named, so a later reader can see at a glance which rulings *moved* the
contract.

| # | §2a row (spec `F-W5.md:249-257`) | ruling id | ruling, verbatim (`COHESION.md` §0j.D) | honest default taken? | lands at |
|---|---|---|---|---|---|
| **R1** | **TA-4** — restore `atomdiff.ts` + `atomDiff`, or re-scope value.js out of the diff clause (G4/E3); *"none may be assumed"* | **F-SS4REST R1** | *"**RE-SCOPE value.js out of the diff clause** (a one-sided §6 verdict, stated explicitly) — `atomdiff.ts` is wholly excised from value.js and restoring it is value-side authoring that would couple value.js's release train to the fourier contract (the §0i.1 logic)."* | the spec named no default; the owner chose **re-scope** | v2 **§E3** (v1 §6 re-authored in full, block-quoted; verdict spelling `N/A — RE-SCOPED (F-SS4REST R1)`) ⊕ **§H VO-0** (the explicit non-obligation) — gates **G4**, **G18** |
| **R2** | **trie vs KISS** (G7/E16); default *"no trie; whole-snapshot duplication is the recorded shipped behaviour"*; *"Dissent recorded"* | **F-TRIE** (R2 ≡ E16 ≡ G7 ≡ G-F7-1) | *"**NO TRIE**; whole-snapshot duplication is the recorded shipped behaviour (the honest default; `atomdiff.py:12-14` is the guardrail; zero material on either tree). F.W7 unit `b` never opens, `design/R4-variant-storage.md` is never created, G-F7-5 closes vacuously; unit `a`'s census runs."* | **YES** — the default, ruled | v2 **§E16** (dissent recorded, not resolved; see §3 below) — gate **G7** |
| **R3** | **flags producer-or-retire** (G11/D3) — *"this is the admission gate"*; *"PRECEDES F.W1's sizing wherever FR-AFP grades are load-bearing"* | **F-PRODRET** (R3 ≡ D3 ≡ G11) | *"**PRODUCER**, as a **port** of value.js's shipped verb (`POST /:slug/flag`) under the SS-4 contract, homed at **F.W8** (the CRUD union prototype) with F.W5 writing the clause; FR-AFP grades re-derive at the populated surface."* | the spec named no default; the owner chose **producer** | v2 **§D3** (F.W5 writes the clause; the port is F.W8's act) — gate **G11**; the runbook §1.3 back-edge *"F.W5 G11 → F.W1 sizing"* is discharged at unit c's commit `73e35e74` |
| **R4** | **the like verb** (G10/D2) — *"add the operation or remove the affordance; no third option ships"* | **F-SS4REST R4** | *"**REMOVE the affordance** (no dead affordance under `aria-pressed`)."* | the spec named no default; the owner chose **remove** | v2 **§D2** (counter, compound index, sort key and UI arm retire together) — gate **G10** |
| **R5** | **off-state `[]` admission** (M-9, D12) — *"admit it in the contract or stop minting it"* | **F-SS4REST R5** | *"**STOP MINTING** the off-state `[]`; the contract does not admit it (no silent rewrite)."* | the spec named no default; the owner chose **stop minting** | v2 **§D12** (`fr-BasisSelector M-9`'s sentence quoted at record case) |
| **R6** | **hard-delete arm** (FR-AFP-9, D6) — default *"copy stays truthful about restorability"*; *"`?hard=true` has zero callers today"* | **F-SS4REST R6** | *"**KEEP** the hard-delete arm; copy made truthful about irreversibility."* | **YES** — keep, with the copy cured | v2 **§D6** |
| **R7** | **codegen vs hand-typed twins** (FR-AFP-71, A4) — *"inv-16/inv-26 RESTATED"*; *"amendment is permitted; silent reversal is not"* | **F-SS4REST R7** | *"**CODEGEN** — twins derived from one source (inv-16/inv-26 restated; structural invariants over prose)."* | **NO** — the default was *restate*; the owner **amended** inv-26's second limb (hand-typed twins → generated twins), and v2 §A4 names the amendment as an amendment, never a silent reversal | v2 **§A4** (inv-16 restated; inv-26 first limb restated; second limb amended, openly) |
| **R8** | **remix-vs-fork + born visibility** (E4) — *"both defaults ship, opposite"*; *"must not contradict ruling D9"* | **F-SS4REST R8** | *"**REMIX + BORN-PRIVATE** (value.js's shipped verb and its explicit publish act), the F.W5 seat verifying non-contradiction with ruling D9 at the record before authoring."* | the spec named no default; the owner chose **remix + born-private** | v2 **§E4**, with the D9 non-contradiction check written into the clause as three re-runnable tests (unit c, c.3) ⊕ **§H VO-3 / VO-4 / VO-7** — gate **G5** |
| **R9** | **delete-or-wire the dead session subsystem** (FR-USB-23, C3) — default *"delete (zero external call sites)"* | **F-SS4REST R9** | *"**DELETE** the dead session subsystem (zero external call sites)."* | **YES** — delete | v2 **§C3** (scope bounded in the clause: the client capability goes; the server's four `/api/sessions` operations do not) |

**The four ⊙ gates, mapped once.** §0 State says *"Four are ⊙ OWNER-GATED and may not be authored
unruled (G4, G7, G10, G11)."* — **G4 → R1** · **G7 → R2** · **G10 → R4** · **G11 → R3**. All four were
ruled at §0j.D **before** F.W5 opened (record §Open); no unit authored a ⊙ clause unruled, and no unit
presumed a ruling — each clause carries the ruling id and the ruling's words (record, c.2).

**Two further §0j.D rows this contract consumes, cited so nothing rides silently**: **OG-F1**
(FREEZE-WITH-ADOPTION AND WORKTREE-AS-BASELINE — the substrate F.W0 re-grounded, which every
fourier-side witness in v2 is measured against) and **G-15(c)** (FM-19 → *frozen-forever with a
golden-file diff*), the instrument v2 **§G1c** adopts for the canonical-geometry interim posture
(unit d, d.5) — *adopted, not re-opened*.

---

## §2 — Three decisions the spec handed the forming wave, made in F.W5's own voice (not owner rulings)

Listed here so a reader of the ruling block cannot mistake them for §0j.D acts. None is ⊙; each is
recorded at its clause with its reasons and its lock.

| decision | clause | ruled at the seat |
|---|---|---|
| **THE SEAM CHOICE** — `plainLatex()` at F.W4 *or* a separate wire field at F.W5 (*"the forming spec chooses the seam"*, `fr-EquationResult.md:39`) | v2 **§F8** | **THE WIRE FIELD**; F.W5 records **no decline**, so F.W4 does not land `plainLatex()` as the portability cure (unit d, d.5) |
| **the moon's TRUE SOURCE or RE-AUTHOR** (`fr-FourierShapeExtractor.md:51`) | v2 **§G1c** | **RE-AUTHOR, at F.W6, not before**; **DO-NOT-REGENERATE on `master` stands**; interim **FROZEN with a golden-file baseline** (the G-15(c) instrument, adopted) (unit d, d.5) |
| `save_contour`'s authority class and the image GETs' `ANONYMOUS` — the two decisions G8's close names and the register deliberately does not make | v2 **§C1** | `save_contour` → `SESSION-DECLARED` ⊕ the `Idempotency-Key` channel; image GETs → `ANONYMOUS` **retained** for published assets, **withdrawn** for the pre-publication surface, the cache directive bound into the same act (unit c, c.5) |

---

## §3 — Dissent register — PRESERVED, NOT RESOLVED (spec §2b, adopted whole)

The spec's §2b, quoted at its own bytes — ⟨cmd⟩ `/usr/bin/sed -n '261p' $X/waves/F-W5.md` (this seat,
2026-09-17):

> D-L4 (R2 graded MAJOR: twelve untyped edges, no gate) · FR-USB-15 (K1's BLOCKER filing stands as
> recorded dissent; r2's demotion RATIFIED) · FR-AFP-8 (L axis BLOCKER; β's MAJOR sustained under
> K10) · FR-GFC-3 (C axis BLOCKER at two sites) · FR-GFC-1 (two BLOCKER filings, D and C axes) ·
> GAB-17 (axes split MAJOR/MINOR/INFO; MINOR ruled) · F-β/SS-C-1 (C axis BLOCKER; demoted at
> component altitude) · L-B1 and L-B2/C-2 (reader-1 BLOCKER; demoted **with revival conditions** =
> the DO-NOT-REGENERATE tripwire) · R-4 (the trie requirement vs the documented KISS guardrail —
> unresolved).

**Nine dissents. This wave resolves none of them.** Where v2 lands the clause a dissent attaches to,
the clause carries the dissent forward in its own words; this table is the index, and it re-decides
nothing:

| dissent | where v2 carries it | state |
|---|---|---|
| **D-L4** (ConvergenceLegend, twelve untyped edges) | **§B1** — *"D-L4 ruled MINOR on the ConvergenceTimeline L·D-12 precedent — dissent preserved"* | preserved |
| **FR-USB-15** (K1's BLOCKER filing) | **§C3** books the row; **v2 does not restate the dissent there** (⟨cmd⟩ `/usr/bin/awk '/^### /{h=$0} /[Dd]issent/{print h}' $X/contract/J-diff-shape-v2.md` → B1 · D2 · D5 · D11 · E7 · E16 · G1c · G2c — **no C3**), so this register is where it travels | preserved **here** and at the spec's §2b; r2's demotion stands as ratified; not resolved |
| **FR-AFP-8** (L-axis BLOCKER; β's MAJOR) | **§D5** | preserved |
| **FR-GFC-3** (C-axis BLOCKER at two sites) | **§D2** — *"dissent (C axis, BLOCKER at two sites) preserved, not resolved"* | preserved — **and the owner's R4 (REMOVE) does not resolve the dissent; it rules the affordance** |
| **FR-GFC-1** (two BLOCKER filings, D and C axes) | **§D10** — *"Two BLOCKER filings on `FR-GFC-1` (D and C axes) are preserved."* | preserved |
| **GAB-17** (axes split MAJOR/MINOR/INFO) | **§D11** (LEG held at F-W4) | preserved; MINOR ruled at the record, not here |
| **F-β / SS-C-1** (C-axis BLOCKER, demoted at component altitude) | **§E7** — *"Dissent …"* carried at the clause | preserved |
| **L-B1 and L-B2/C-2** (reader-1 BLOCKER, demoted **with revival conditions**) | **§G1c / §G2c** — the revival condition IS the tripwire: *any regeneration attempt revives L-B1 and L-B2/C-2 at BLOCKER* | preserved **as a live tripwire** (gate G16) |
| **R-4** (the trie requirement vs the KISS guardrail) | **§E16** — *"DISSENT RECORDED, NOT RESOLVED"*; the dissent is banked at `F-W10.md` §2.3's `SS-4-PREREQ` row and quoted ONCE in the programme, at `F-W5.md` §4's `F.W5 → F.W7` edge | preserved — **the owner's F-TRIE ruling settles the DESIGN (no trie) and leaves the dissent on the record**, which is what SS-4 asked for (*"owner ruling PRECEDES design"*; the dissent was never a request to re-litigate) |

**One dissent v2 holds open that §2b did not list, disclosed rather than absorbed**: the **glass-ui
Slider docblock** dissent (`fr-GlassTimeline PD-1`, O-20 A-10) — v2 does not carry it (it is F.W3's
render-side row), and the producer's 2026-09-17 answer (glass letter **I-33** §1: the drop claim is
*"FALSE at both pins"*) is routed to F.W3/F.W4 through the X formation mail seat, never through this
contract.

---

## §4 — G22 minute: the dangling `MF-9` cite is STRUCK; the E11 merge is recorded

**The gate** (`F-W5.md` §3 G22): *"GCM-10's cure cites a companion row **"MF-9"** that resolves to
NOTHING in the adjudicated registry … MF-9 resolved or STRUCK before v2 quotes GCM-10's cure (the
strike is the third-iteration halt in §1c); the E11 merge is recorded in v2's clause provenance."*

### §4.1 The measurement, at this seat (2026-09-17), token-bounded, engine `/usr/bin/grep` (BSD)

| probe | ⟨cmd⟩ | reading |
|---|---|---|
| the registry, whole (66 `fr-*.md` ⊕ every other adjudicated record) | `/usr/bin/grep -rnw 'MF-9' "$R"/ \| wc -l` | **1** (double-run: 1 · 1) — `fr-GalleryCardModal.md:56`, the dangling citation inside GCM-10's own cure cell |
| value.js `docs/tranches/**`, every file | `/usr/bin/grep -rlw 'MF-9' docs/tranches \| wc -l` | **18 files** — and **every one is a spec, check, ruling or record line ABOUT the dangling cite** (`F-W5.md` G22 · `F-W6.md` row 45 / §2.5 · `F-W8.md` §3 / §5b · the PASS-1…PASS-5 check files · this wave's record · v2 §A3's LOCK); **not one is a row `MF-9` names** |
| the fourier tree's `docs/` | `/usr/bin/grep -rlw 'MF-9' $F/docs \| wc -l` | **0** |
| the `MF-` id family, registry-wide | `/usr/bin/grep -rhoE '\bMF-[0-9]+\b' "$R"/ \| sort \| uniq -c` | **twelve heads, all in ONE record** — `fr-PaperView.md` (`★MF-1` … `★MF-13`, the seat's DU/LC *missed-finding* rows at `:52-54`, `:109-114`, `:133-135`); **the family numbers 1–13 and SKIPS 9**: ⟨cmd⟩ `/usr/bin/grep -ow 'MF-[0-9]*' "$R"/fr-PaperView.md \| sort -u` → `MF-1 MF-2 MF-3 MF-4 MF-5 MF-6 MF-7 MF-8 MF-10 MF-11 MF-12 MF-13` — **no `MF-9`** |
| the cited row's own words | `/usr/bin/sed -n '56p' "$R"/fr-GalleryCardModal.md` | *"**→ F.W3/W4** (guard) + **F.W5-W8** (a `tier` field with a default on the model — the serialization-bypass family, with MF-9)"* |

### §4.2 The adjudication

**Resolution was attempted and is not available at the bytes.** The only `MF-` family in the corpus is
`fr-PaperView`'s — the paper-reader component's missed-finding rows (focus indicators, ARIA, glyphs,
`will-change`, katex types) — none of which concerns a `tier` default, a serializer bypass or the
gallery modal, and that family's own numbering skips 9. A cite that resolves to a **gap in a different
component's numbering** has two candidate readings — a never-banked thirteenth PaperView row, or a
mis-keyed pointer at the sibling serialization-bypass row **GCM-55** (`fr-GalleryCardModal.md:111`,
which v2 already folds with GCM-10 as *one family*) — and choosing between them would be **inventing a
row** (R4-10's fabrication clause: *no wave derives a roster from any source*, and no wave may mint an
identity a record never banked). The spec forecloses the guess in its own §1c: *"MF-9 failing to
resolve (then it is **struck**, and v2 quotes GCM-10's cure without it)."* F-W6 §2.5 reached the same
verdict independently (*"the cite resolves to nothing repo-wide — STRUCK unless SS-4 resolves it; no
cure is quoted through it"*).

**RULING (adjudicator seat, F.W5 unit e, 2026-09-17): `MF-9` is STRUCK as a citation.** The strike
is of **the cite only, never the row**: `GCM-10 · D-07/L-5/C-3` keeps its banked spelling, its cure
(*"a `tier` field with a default on the model"*) and its family (GCM-10 ⊕ GCM-55, the serialization-
bypass family). The registry byte is **not edited** (E-1/E-3: the record is evidence; this minute is
the addendum beside it).

**Effect on v2, verified at the bytes.** v2 **§A3** quotes the GCM-10 cure **without `MF-9`** —
⟨cmd⟩ `/usr/bin/grep -n 'MF-9' $X/contract/J-diff-shape-v2.md` → exactly the two lines of §A3's
**G22 sequencing LOCK** (`:299-300`, *"The `GCM-10` cure is quoted in this contract only after MF-9
is resolved or STRUCK (unit e). If MF-9 is struck, the cure is quoted without it and the strike is
recorded in the clause provenance"*) and **no occurrence inside any DISPOSITION or cure sentence**
(double-run). The LOCK's condition is now met; **this §4 is the provenance record it names** — v2's
own bytes are not in unit e's writable set (§1a/§1c), so the strike is recorded here, beside the
contract, and cited from the relay letter (E-3: addenda-beside, never a patch).

### §4.3 The E11 merge — the gate's second item, already recorded in v2's provenance

⟨cmd⟩ `/usr/bin/sed -n '1933,1937p' $X/contract/J-diff-shape-v2.md` → *"**DISPOSITION — the merge,
recorded here as the clause's own provenance (G22's second item).** **`RESOLVER` (D-10 · L-4 · C-D-4) ⊕
`L/M-3` (EasingPicker) are ONE identity, MERGED — and BOTH IDS ARE PRESERVED.** … the merge is the
cure and **neither id is retired**"*. The finding the gate names — *fr-EasingPicker booked its
easing-domain server half as "new" when RESOLVER already carried the same cure* — is stated in the
clause with the kill it carries (`L/M-3` KILLS `C/i-1`, seat-verified at
`visualization.py:129/:189/:244/:283`). **Verified, not re-authored.** One reading is added here for
the census: `L/M-3` is canonically **held at F.W4** with an `F.W5-W8` leg and `RESOLVER` is **not a
canonical head** (it is `fr-EasingCurvePreview`'s body id inside its `R6-8` row); E11 therefore books
**no canonical F.W5 row** and none of the 116 lands there — which is what §2c's landing table says
(`fr-EasingPicker MISSED-E → E12`, nothing → E11).

**G22: RED → GREEN** at this seat. Both items are discharged; the third-iteration halt was not
approached (one resolution attempt, one strike, recorded once).

---

## §5 — Receipts

- Line 1 of this file: `SERVED MODEL: claude-fable-5-1`. Seat opened 2026-09-17 ~18:00 EDT on
  `tranche-u` at HEAD `4cd00ad0` (unit d's record commit `c75030ef` ⊕ one X·P row landed after it).
- Every §0j.D quotation in §1 returns **1** under the normalised instrument, nine of nine, double-run.
- §2b's bytes re-run: ⟨cmd⟩ `/usr/bin/sed -n '261p' $X/waves/F-W5.md \| /usr/bin/grep -c 'R-4 (the trie requirement'` → **1**.
- This file writes **zero bytes** outside itself; the spec, COHESION, the registry, the canonical, v2
  and the register are unedited by this seat.
