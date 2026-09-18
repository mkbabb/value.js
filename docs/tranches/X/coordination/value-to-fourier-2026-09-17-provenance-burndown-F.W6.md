SERVED MODEL: claude-opus-5[1m]

# F.W6 — THE PROVENANCE BURN-DOWN, COMMISSIONED

**From**: value.js · X·F Track C · wave **F.W6** (*provenance defect burn-down, library/server half*),
unit `i` (the close unit), `claude-opus-5[1m]`
**To**: `fourier-analysis` — the E13 seat at `docs/tranches/F/coordination/INBOX.md` (COHESION §0k.1)
**Date**: 2026-09-17 (the wave's sitting; this seat's wall clock reads 2026-09-18 — spelled, never
back-dated, per the wave record's divergence **D-5**)
**Vehicle authority**: `F-W6.md` **§1 bounds row 4** — *"CREATE — the commissioned-ask letter (**the only
vehicle by which the fourier side receives this burn-down**). `DD` resolves at execution, never
back-dated"*
**Evidence spine**: `docs/tranches/X/fourier/waves/F-W6/burn-register.md` — **one row per burned
identity**, id · gate · commissioned act · stating clause · fourier-side landing evidence. This letter
**names** the asks; the register **holds** them with their witnesses. Where the two differ, the register
is authoritative and this letter is the defect.

---

## §0 What this letter is — and the two things it is not

**Execution shape, quoted from the spec (§4)**: *"each burn unit's product act is a **commissioned ask**
in the bounds #4 letter plus its burn-register row; the fourier edits land in fourier's own sub-session
(COMMISSION §2) after the begin-word. **Nothing in this wave opens product source in either repo.**"*

1. **ZERO FOURIER BYTES MOVED.** `/Users/mkbabb/Programming/fourier-analysis` is **READ-ONLY, always**
   (spec §1's NOT-in-bounds row; §4's last cross-edge). Every witness in the register is a **read** —
   `grep`, `sed`, `ls`, `git -C … status` — which is what D-19 MEASURE-AT-OPEN requires and what the
   read-only law permits. Measured at this seat's clock: ⟨cmd⟩ `git -C ../fourier-analysis rev-parse
   --short=8 HEAD` → **`3bac3d52`** · ⟨cmd⟩ `git -C ../fourier-analysis status --porcelain | wc -l` →
   **0** — unmoved from the wave's open, across all nine units.
2. **NOT A CONFORMANCE VERDICT.** Every gate below is **RED with the commissioned act installed**, which
   is spec §3's **split verdict** in its own words: *"a gate closes for F.W6 when the commissioned act is
   authored with its evidence row in the burn register; it goes GREEN only when the named landing occurs.
   **F.W6 never claims a GREEN it did not execute.**"* The landings are **yours**, in your sub-session,
   and this letter is what makes them askable.
3. **NOT A RE-RULING.** Nine owner rulings (`R1`–`R9` ⊕ `OG-F1`/`OG-F2`) were RULED at value.js
   `COHESION.md` **§0j.D**; F.W6 **consumes** them and re-decides none (FW6-G18).

---

## §1 THE TWO STANDING PROHIBITIONS — carried **verbatim**, because a cure that violates either is worse than the defect

### §1.1 The TRIPWIRE — `moon.json` / `sun.json`

Spec §4 lock 7, **verbatim** — ⟨cmd⟩ `/usr/bin/grep -oE '\*\*TRIPWIRE\*\*: DO-NOT-REGENERATE.{0,95}' waves/F-W6.md` (the bound is cut to the clause boundary, so the paste **is** the output):

> **TRIPWIRE**: DO-NOT-REGENERATE `moon.json` / `sun.json` on `master`; track the seam (G2c) before any geometry act.

And the gate's own face, `FW6-G15`, **verbatim** — ⟨cmd⟩ `/usr/bin/grep -oE 'DO-NOT-REGENERATE on .master. — a regeneration attempt.{0,110}' waves/F-W6.md`:

> DO-NOT-REGENERATE on `master` — a regeneration attempt is a gate FAILURE, not a pass, and revives
> L-B1 + L-B2/C-2 at BLOCKER.** Track the seam (G2c) before anything

⟨**cut disclosed**: the window ends mid-clause at *"before anything"*; ⟨cmd⟩ `/usr/bin/grep -oE 'Track the
seam \(G2c\) before anything.{0,60}' waves/F-W6.md` shows the cell continues *"… else | **F.W6 / build
lane** …"*, i.e. into the gate's **owner** cell. Nothing past the window is quoted and nothing inside it
is elided; the `**` markers are the file's own, the paste closing mid-emphasis exactly as the instrument
prints it.⟩

▲ **Read this as a prohibition on the *instrument*, not on the *artifact*.** The regenerator is
untracked and broken — ⟨cmd⟩ `git -C $F check-ignore -v scripts/precompute_svg_fourier.py` → resolves to
`.gitignore:53:scripts/*`; ⟨cmd⟩ `/usr/bin/grep -rn "def order_contours" $F --include='*.py' | wc -l` →
**0**, i.e. the script imports a symbol **no module defines**. Running it is not a pass.

### §1.2 The **M-10 innerPoly anti-cure rider**, carried verbatim from the frozen corpus

⟨cmd⟩ `/usr/bin/sed -n '96p' $G/fr-FourierShapeExtractor.md` (base `$G` = the 66 frozen
`registry/adjudicated/fr-*.md`; the corpus is immutable by decree, so a line coordinate is the one address
form that cannot stale):

> **M-10 bound in, seat-verified by read of the RNG interleave: `innerPoly`'s six per-iteration draws are
> entangled with `outerPoly`'s stream — any "cure" that skips the innerPoly work re-rolls the canonical
> sun.**

**Binding**: `innerPoly` is computed-and-discarded **WASTE whose removal is NOT a cure** — deleting the
six per-iteration draws re-rolls the canonical sun geometry **silently**. The rider **travels with every
`L-B1` / `L-B2` act** in this letter. The seam-cure arm is F.W4's; what travels into F.W6 is **the
prohibition**.

---

## §2 THE COMMISSIONED ASKS — by gate id and clause id

Clause ids are `J-diff-shape-v2.md`'s (the contract F.W5 authored and value.js co-signed at **O-22**);
gate ids are `F-W6.md` §3's. Each row's **full** ask, with its witness and its locks, is the
correspondingly-keyed row of `burn-register.md` §1 — **cited, never restated here**, so no seat can land a
paraphrase and believe itself conformant.

### §2.1 The PATCH / chain one-cut — **ONE COMMIT, ONE CUT** (register §1.b)

| gate | clause | identity | the ask, named |
|---|---|---|---|
| **FW6-G1** | **E2** / F.W5 **G3** | `F-α` | execute ***deepen-or-retire*** on the depth/parent/root quadruple — **one of the two named branches, never a third**: **(i) DEEPEN** (walk the parent before the version write) **or (ii) RETIRE** (the quadruple leaves the model). ▲ **Disposition UNRULED — flagged inline, never presumed** |
| **FW6-G2** | **E7** | `F-β` | on **every atom-touching PATCH**: (1) recompute `set_hash` from `enumerate_atoms(doc)` over the **post-write** document and persist it; (2) **write the version row** through the existing `_write_root_version` path (or its deepened successor, per F-α's ruled branch) |
| **FW6-G3** | **E7** | `F-β` (atom 5) | `palette_slug` becomes **clearable** — lift the remix arm's **existing** tri-state idiom (`model_fields_set`: omit inherits · null clears · slug rebinds). **KISS: lift, do not invent** |
| **FW6-G4** | **E7** (rider) | `fr-SpeedSelect` **SS-C-1** (write leg) | make the PATCH field set **equal** the atom set — extend `VisualizationUpdate` ⊕ `VisualizationPatch` with the missing atoms and route them through the very recompute + version write F-β commissions — **or** state **each divergence per-atom with its reason** |

▲ **ONE-CUT LAW (spec §4 lock 3)**: **F-β ⊕ SS-C-1 land in ONE change** — *"else the second reverts the
first's invariant"*. ▲ **SS-C-1's READ leg is NOT commissioned here**: it is banked at `fr-GalleryCardModal
GCM-1` → F.W4 + rider, and **re-merging the halves re-books GCM-1**.

### §2.2 The privacy limb — **ONE CUT** (register §1.c)

| gate | clause | identity | the ask, named |
|---|---|---|---|
| **FW6-G5** | **C5** / F.W5 **G6** | `F-γ` | gate **EVERY hop** of the `fork_of` walk and collapse each non-public ancestor to value.js's shipped discriminated-union member **`{kind: "unavailable", ordinal}`** — **ADOPTION, NOT DESIGN** (the counter-example is already in your tree at `forks.ts:167-179`). **The cycle-guard and the ≤50 cap survive the cure** |
| **FW6-G11** | **C1** ⊕ **C2** | `fr-AdminFlaggedPanel` **FR-AFP-4** ‡ (⊕ `fr-GalleryDraftsSection F-4` ⊕ `m-15` ⊕ `fr-GalleryCardModal GCM-52`; `fr-ImageUpload` row 26 cited) | execute **C2**'s image-remediation contract **AS ONE UNIT**: (i) a delete/quarantine verb over the **asset**, not only over the entity that references it; (ii) a visibility gate on the blob **AND** the thumbnail **AND the overlay**; (iii) the janitor predicate stops rewarding anonymous fetching; (iv) the thumbnail URL is versioned |

▲ **ONE-CUT LAW (spec §4 lock 3)**: **F-γ ⊕ FR-AFP-4 are one privacy limb** — *"a redacted breadcrumb over
a world-readable image is not a cure"*. ▲ **`F-4` (WHO can fetch) and `m-15` (WHAT they see) are
cross-referenced and NEVER merged.** ▲ **The deployment auth-proxy question is UNPROVEN (SS-13) — the gate
may not close by assuming a proxy.**

### §2.3 Counters, identity, idempotency, lineage (register §1.d)

| gate | clause | identity | the ask, named |
|---|---|---|---|
| **FW6-G6** | **E6** | `fr-GalleryView` **FR-GV-12** (= MISS-LC-1) ⊕ **FR-GV-24** ⊕ `fr-VisualizationView` **VV-R2-A** cited | execute **E6** — **one of its TWO named branches, never a third**: **(i) SAFE READ + EXPLICIT VERB** (`GET /{slug}` stops writing; the increment moves to an explicit verb) **or (ii)** the mutating-GET policy is **stated** against RFC 9110 §9.2.1. ▲ **FR-GV-24 LOCK: the repair test may NOT assert a re-open increment** |
| **FW6-G7** | **E5** | `fr-GalleryDraftsSection` **B-2** ‡ *(canonical home **F.W3**; **CITED to F-W3**, REST-17 — record-qualified: `fr-EquationView B-2` is a DISTINCT banked identity)* | **server-side dedupe on the CREATE path**: the create path replays, **or** `content_hash` becomes a unique index. ▲ **K12: closed STATICALLY — SS-13 spends no probe** |
| *(no gate — evidence read by **FW6-G17**)* | **E4** ⊙ **R8** | `R-5` / `G5` born-visibility ⊕ `E4` lineage (⊕ `fr-GalleryCardModal GCM-1`'s server arm) | under **F-SS4REST R8 — REMIX + BORN-PRIVATE** the **SHAPE conjunct is already met** on your side (`VisualizationRemix.visibility: Visibility = "draft"`); what F.W6 commissions is the **EVIDENCE conjunct** (a remix-child born-visibility test) **and the LINEAGE slot** (`fork_of` recorded on the remix path) |
| *(no gate, no act)* | **D2** / **G10** ⊙ **R4** | `fr-GalleryFeaturedCarousel` **FR-GFC-3** ⊙ | ▲ **RULED `REMOVE the affordance` (F-SS4REST R4)** → §2.9's own branch, *"If DELETE: F.W4's."* **F.W6 books NO server act.** The row is entered **RULED-AND-ROUTED** so FW6-G17's reverse direction resolves the id to a wave rather than to silence. **The `aria-pressed` + re-click guard display arm is F.W3/W4's regardless** |

### §2.4 The moderation band — **ADMITTED, not retired** (register §1.e)

▲ **THE ADMISSION GATE IS RULED.** `FR-AFP-1 = D3` ⊙ / **FW6-G11's D3 conjunct** → **F-PRODRET
(R3 ≡ D3 ≡ G11): PRODUCER**, as a **port of value.js's `POST /:slug/flag`** — and **homed at F.W8.**

> ⚑ **R3's PORT IS HOMED AT F.W8, EXPLICITLY, AND F.W6 DOES NOT SHIP IT.** Spec §2.4's branch text
> *"If PRODUCER: F.W6 ships the flag-write operation with value.js's `POST /:slug/flag` as reference
> implementation"* is **superseded ON THE HOMING ONLY** — the branch is live, its address moved. **Do not
> read this letter as commissioning the flag-write operation.** It is F.W8's act by the ruling's own
> homing; F.W6 commissions the band's **other** server rows, below, and enters `FR-AFP-1` as
> **ADMITTED-and-ROUTED** so the id resolves to a wave.

| gate | clause | identity | the ask, named |
|---|---|---|---|
| **FW6-G8** | **D6** ⊙ **R6** | `fr-AdminFlaggedPanel` **FR-AFP-66** (⊕ **FR-AFP-9** dialog-truth arm ⊕ **FR-GV-34** member-site rider — *one identity, two call sites, NOT re-booked*) | **THREE CONJUNCTS, exactly FW6-G8's GREEN, none severable**: (1) a **`content_hash`-keyed cascade at the grace hard-delete**, lifting the existing shape rather than inventing a second; (2) **the docstring corrected** (it names a cascade owner that contains zero flags code); (3) **a test covering the entity-keyed path** (the existing orphan-flag test exercises only the reporter-keyed stale-user cascade). ▲ **R6 = KEEP the arm**; the truthful-copy arm is F.W3/W4's |
| *(rides FW6-G8's one-cut commit)* | **D7** | `fr-AdminFlaggedPanel` **FR-AFP-33** | **server, two halves, one act**: **bound the `$push` with `$slice`** (the page renders a window, not a history) **and scope the aggregate** (`$match` the group to the page's content hashes). ▲ **ONE-CUT LAW (§4 lock 3): FR-AFP-66 ⊕ FR-AFP-33 land together** — *"cascade without bound leaves the cost; bound without cascade leaves the growth"*. ▲ **The client collapse arm is F.W1/W3's** |
| *(no gate — evidence read by **FW6-G17**; settlement **gates the F.W8 port**)* | **D5** / **D4** | `fr-AdminFlaggedPanel` **FR-AFP-7** (⊕ **FR-AFP-8** identity arm CITED) | **the server half ONLY**: **flag identity moves to the ENTITY, or the dismiss scopes to the slug — and the contract STATES WHICH**, because the two choices produce different wire shapes and **the F.W8 port must be written against the settled one**. ▲ **FR-AFP-8's one-token `item.slug` label is F.W3/W4's** |
| **FW6-G12** | **A4** ⊕ **D17** ⊙ **R7** | `fr-AdminFlaggedPanel` **FR-AFP-36** (⊕ the **D17** serializer clause; ⊕ **FR-AFP-71** ⊙, whose codegen half is now admissible) | **ONE act, three inseparable limbs**: **ONE generated/checked shape** (**R7 = CODEGEN** — twins derived from one source; v2 A4 limb 3 records it as *"an amendment stated in the open"*, not a silent reversal) ⊕ **the three dead server models deleted** ⊕ **ONE serializer** (the flagged listing's hand-built `json.dumps(…, default=str)` and the audit route's Pydantic ISO are **one router, one concept, two dialects**). ▲ **K9 LOCK: the five `?? item.slug` fallbacks STAY — defensive, not dead.** ▲ **FR-AUL-17's shared client formatter is banked → F.W3; do NOT re-book** |
| **FW6-G10** | **D8** | `fr-GalleryView` **FR-GV-9** (= C·M-8) (⊕ **FR-AFP-10** ⊕ **FR-AFP-70**; ⊕ `fr-GalleryFeaturedCarousel` FR-GFC-20's server arm) | **the server STATES THE TRANSITION**: the `$set` is **conditioned on the current tier** (the filter carries the state it claims to leave, so unfeature cannot silently erase `saved`) · **every verb gains its inverse** · **the flagged listing carries the tier predicate FR-AFP-10 assumes**. ▲ **β's 428-escalation cure stays KILLED** |

### §2.5 The audit actor — the FIELD and the SEAM, one act (register §1.f)

| gate | clause | identity | the ask, named |
|---|---|---|---|
| **FW6-G9** | **E18** ⊕ **D16** | `fr-AdminAuditLog` **AA-5** server arm ⟨**AA-10** is **CITED to F.W4** and booked nowhere here — canonical home F.W4, REST-16⟩ | **one act, two limbs that do not separate**: **(1) THE FIELD** — `AuditEntry` gains an **`actor` field of its own**; the system actor becomes a **value** of it (`system:janitor`), never a sentinel smuggled through `ip_hash`. **(2) THE SEAM** — **both** writers populate it; the second writer that bypasses the logging helper entirely is brought onto the seam. ▲ **S-8 METHOD LAW: a `grep "log_audit("` is structurally blind to an inlined writer (K-6 killed that method) — enumerate the surface.** ▲ **AA-23: no regex-action cure** (killed at its register; the host row is **held at F.W5**, cited at §2.11d H-11). ▲ **The display legend is F.W4's** |

### §2.6 Contour, cache identity, canonical geometry (register §1.g)

| gate | clause | identity | the ask, named |
|---|---|---|---|
| **FW6-G13** | **E13** | `fr-ContourSettings` **B-4 = C-1** ‡ (∘ **i-7** INFO-weight fold; ⊕ **m-18**, a LEG held at F-W3) | make `extraction_cache_key` a **function of the consumed set** rather than a hand-maintained literal, so **E13**'s rule — *"an operation's cache identity must be a superset of the request fields it consumes"* — **holds by construction**. ▲ **The named fixture is `contour_hash` INSTABILITY across an ML-threshold change.** ▲ **m-18's `* 0.6` coupling MUST NOT be preserved by the cure** |
| **FW6-G14** | **E14** ⊕ **E17** | `fr-ContourSettings` **M-13** ‡ (⊕ `fr-BasisSelector` **M-14** — *"two triggers, ONE cure"*, the record's own words ⊕ `fr-ContourEditorCanvas` **C-2** the image-bounds arm ⊕ `fr-ContourPreview` row 28) | **two limbs, one seam**: **(i) E14** — **extraction cannot overwrite a `source="editor"` asset** (either the editor-saved contour carries the provenance the compute path keys on, **or** the compute path recognises `source="editor"` and refuses); **(ii) E17** — **`image_bounds` is derived on POST or backfilled on write**, never written `None` and read as truth. ▲ **The client orchestrator move (L-2) is F.W3/W4's and is NOT credited here** |
| **FW6-G15** ⟨**stays RED by design**⟩ | **§G G1c–G10c** | `fr-FourierShapeExtractor` **L-B1** (⊕ **L-B2 / C-2** the seam, one identity ⊕ **L-B3** ⊕ **L-M3 / C-6** ⊕ **L-M5/C-5 ⊕ C-15** ⊕ **C-7** ⊕ **L-m3 / C-10 ⊕ L-m5**) | **ORDERED, because the order is v2's ruling and not a preference**: **(1) G2c** — track the seam first (fix the import to the symbol that exists, reconcile the point/harmonic counts, prefer the tracked in-process idiom); **(2) G5c** — the diagnostics row; **(3)** the artifact **only** once its true source is named or it is re-authored **WITH** that diagnostics row. ▲▲ **§1.1's TRIPWIRE and §1.2's M-10 rider BOTH bind this row.** A regeneration attempt is a **gate FAILURE**, not a pass |

### §2.7 The liveness strikes — E10's ONE disposition (register §1.h; **the wave's one ungated unit**)

| gate | clause | identity | the ask, named |
|---|---|---|---|
| *(none — evidence read by **FW6-G17**)* | **B4** / **E10** | `fr-PathPreview` **PP-DEADSEAM** (= C-12) (⊕ `fr-BasisCanvas` **M-β4** ⊕ `fr-EquationView` **L·m-6** ⊕ `fr-GalleryMarquee` **GM-M4**) | **ONE DISPOSITION, STATED BEFORE ANY FIELD IS TOUCHED, and the SERVER strikes only.** Under **E10** — ⟨cmd⟩ `/usr/bin/grep -o 'This contract states ONE disposition for produced-and-unconsumed .\{0,60\}' J-diff-shape-v2.md` → *"This contract states ONE disposition for produced-and-unconsumed response fields** — *retire*,"* ⟨the paste **is** the command's output; it opens and closes where the instrument does⟩ — dispose the family **as a set**, never as three ad-hoc deletions: the `preview_path` writes and the produced-and-unconsumed projections answer to one stated rule |
| *(none)* | **E10** | `fr-EquationModeToggle` **FR-EMT-20** — **CITED to F.W5, booked nowhere here** (canonical homes it at F.W5 with no band leg; REST-15) | **THE SAME CUT, never a second one.** `reconstructed_points` is the **same field** `PP-DEADSEAM` already names, so this row commissions **nothing separately** |

▲ **THE E16/G7 HOLD IS DISCHARGED BY A RULING, NOT WAIVED.** **F-TRIE (R2 ≡ E16 ≡ G7 ≡ G-F7-1): NO TRIE**
— whole-snapshot duplication is the **recorded shipped behaviour** and `atomdiff.py:12-14`'s anti-tree
KISS guardrail is **the incumbent**. Spec §4 lock 8 (*"No projection strike that is really a compression
decision until G7/E16 rules"*) is therefore **satisfied**, and **no trie is designed here** — F.W7's
compression design stays excluded (spec §5).

---

## §3 THE OWNER RULINGS THIS WAVE CONSUMED — so you read the asks against the same nine

All nine were ruled at value.js `COHESION.md` **§0j.D**; **F.W6 consumes and never re-rules** (FW6-G18).

| id | the ruling | consequence in this letter |
|---|---|---|
| **R1** (TA-4 / E3 / G4) | **RE-SCOPE value.js out of the diff clause** — a one-sided §6 verdict | the routing receipt records TA-4 as **RULED RE-SCOPE**, never as a restoration ask; §4's TA-4 ask below is the **contract** act, not a value.js one |
| **R2** (trie / E16 / G7) | **NO TRIE** | §2.7's hold discharged; no compression design here |
| **R3** (producer-or-retire / D3 / G11) | **PRODUCER**, as a **port**, **homed at F.W8** | §2.4's banner — **F.W6 does not ship the flag-write operation** |
| **R4** (like verb / D2 / G10) | **REMOVE the affordance** | §2.3's last row — no server act; the affordance is F.W4's |
| **R5** (off-state `[]` / M-9 / D12) | **STOP MINTING** the off-state `[]` | carried on the **cited** row `fr-BasisSelector M-9` (spec §2.11 row 7); **no F.W6 booking** |
| **R6** (hard-delete arm / FR-AFP-9 / D6) | **KEEP** the arm; copy made truthful about irreversibility | §2.4 FW6-G8 — the cascade is a **build**, not a deletion |
| **R7** (codegen / FR-AFP-71 / A4) | **CODEGEN** — twins derived from one source | §2.4 FW6-G12's ⊙ lifted; one generated/checked shape is admissible |
| **R8** (born visibility / E4) | **REMIX + BORN-PRIVATE** | §2.3 — the fourier half's evidence + lineage conjuncts; the value half routes OUT |
| **R9** (dead session subsystem / FR-USB-23 / C3) | **DELETE** (zero external call sites) | ⊙ **travels with `FR-USB-23` to F.W8** — F.W6 neither wires nor deletes it |
| **OG-F1 / OG-F2** | OG-F1 **FREEZE-WITH-ADOPTION**; OG-F2 **CODEX-ERA-SPECIFIC** | consumed at unit `a`; G-11 narrows to drift-correction, GAB-13 discharges to a disclosure line |

---

## §4 THE VALUE-SIDE ROUTING — four obligations leaving, and the ONE contract act they imply

`docs/tranches/X/fourier/waves/F-W6/value-side-routing-receipt.md` is the artefact (**FW6-G16**). Its
substance, in one table, so this letter stands alone:

| id | routed to | authority that HOLDS it | disposition |
|---|---|---|---|
| **V-α** | the **value.js API row** | **lane-crud §2's R-2 row** — *"**value.js defect V-α — revert writes no version row but still increments the counter.**"* ⟨`lane-crud.md` `shasum` = **`3bcc387cbb2a`**, a character-match to the spec's immutable pin — **unmoved**⟩ | routed; **NOT itemized in F-W5 §4's edge row** — measured: `/usr/bin/sed -n '405p' F-W5.md \| /usr/bin/grep -c 'V-α'` → **0**. **No list membership is manufactured**, and the round-1 *"F.W5 §6c"* leg stays struck (`grep -l '§6c' F-W5.md` → **no output, exit 1**) |
| **V-β** | the **value.js API row** | **F-W5 §4's `F.W5 → value.js API row` edge row** — *"V-β compound version `_id` + the two-histories test (G2)"* | routed; the cure is the compound per-entity `_id` **plus** the two-histories test that does not exist today |
| **V-γ** | the **value.js API row** | the same edge row — *"V-γ attribution (`userSlug` null ⇒ no version row, E18)"* | routed; **composes with E18 — `AA-10` and `V-γ` are the two halves of one R-7 clause with two burn seats**, and the `AA-10` half is **CITED to F.W4** here, booked nowhere |
| **TA-4** ⊙ | the **value.js API row** | the same edge row — *"TA-4 per G4's ruling"* | ▲ **RULED RE-SCOPE (`F-SS4REST R1`)** — `atomdiff.ts` stays wholly excised; **this letter asks for NO restoration** |

⚑ **THE ONE ASK THAT FOLLOWS, and it is yours, not value.js's.** R1's RE-SCOPE is *"a one-sided §6
verdict, **stated explicitly**"*. **`J-diff-shape-v2.md` §6 is owned by F.W5 (`F-W5.md` §1a) and is outside
F.W6's §1 bounds**, so F.W6 commissions rather than writes: **re-author §6 to the one-sided verdict the
ruling names, explicitly.** With that landed, the spec's standing hedge — *"any cross-repo diff assertion
this burn-down makes is **UNFALSIFIABLE until G4 closes**"* — is **retired by the ruling**, which is the
honest retirement; value.js has no `/diff` surface to reach, **by decree**, so the assertion is not
unfalsifiable but **inapplicable on this side**.

⌧ **Zero value-tree bytes moved**, at the fold, at the wave's open and at this close — ⟨cmd⟩
`git diff --stat -- api/src src | wc -l` → **0** · ⟨cmd⟩ `git status --porcelain -- api/src src | wc -l` →
**0**, double-run. **FW6-G16 fails if any byte moves**, and none did.

---

## §5 CROSS-EDGES — **this end declared; the reciprocal REQUESTED, never written from here**

`COHESION.md` is **bounds-excluded** — F.W6 declares its half of each edge and **does not write the
spine** (spec §1: *"root-authored at the boundary … it does not write the spine"*). Each row below is
**this end**; the sentence owed in the named file is the **ask**.

| edge | this end, declared | reciprocal REQUESTED |
|---|---|---|
| **F.W0** | **DEPENDS — HARD.** Every anchor and denominator this wave cites is an input to / quotation of **F-W0 §4 G-11** (anchor table) and **§4 G-12** (denominator table) in `SUBSTRATE-LEDGER.md` — **cited by gate id, never by line**. **F.W6 re-performs no re-resolution as its own**; divergence from those tables is a defect against G-11, not a rival act. **Measured discharge**: the born-RED witness (`cd26c653`, **28** dirty paths) **no longer reproduces** — `3bac3d52`, **0** dirty — which is what F.W0 was for. **G-13's corollary honoured: producer-side evidence carries the producer COMMIT HASH, never the version string** | a line in `F-W0.md` recording F.W6 among the waves that quote G-11/G-12 rather than re-derive |
| **F.W5** | **DEPENDS — HARD; F.W5 STATES, F.W6 BURNS.** The contract set (`J-diff-shape-v2.md` **71 clauses** · `operation-register.md` · `OWNER-RULINGS-F.W5.md` **9 rulings**) is consumed **by clause id**; **F.W6 authors no clause and reverses no ruling.** Every id F.W6 burns resolves in v2 — `E2 · E7 · E10 · E13 · E14 · E17 · E18 · D5 · D6 · D12 · D16 · D17 · E4 · G1c · G5c · G10c`, each `grep -c` → 1 | **§6's one-sided re-authoring under R1** (§4 above) · a reciprocal on the `F.W5 → F.W6` edge row acknowledging the burn-down landed as commissioned asks |
| **F.W1** | **NO GATING either way, one exception**: **G11's producer-or-retire PRECEDES F.W1's sizing.** It is now **RULED** (`F-PRODRET`, PRODUCER-as-port at F.W8), so the precedence is **satisfied, not pending**. **F.W1's atomicity and the FR-GIG-5 non-credit lock are untouched — F.W6 claims no F.W1 credit** | a line recording that G11's precedence is discharged by ruling |
| **F.W3 / F.W4** | **F.W6 EMITS client/display arms — one home, two citations.** Emitted and **NOT claimed**: `AA-10`'s sentinel-aware branch + legend ⟨canonical **F.W4**, cited not booked⟩ · `AA-5`/`AA-24` display taxonomy · `AA-6` placeholder honesty · `FR-AFP-8`'s one-token `item.slug` label · `FR-AFP-9`/`FR-GV-34` truthful copy · `FR-AFP-33`'s client collapse · `FR-AFP-70`'s reflect-and-disable interim · `FR-AFP-59`'s tier render · `VV-R2-A`'s publish→`store.setVisibility` · **`VV-R2-B`'s single wiring unit** (never scattered) · `GCM-1`/`GCM-25`'s `/v/` routing repair · **`L-2`'s orchestrator move** (REQUIRED; urgency rider at the data-loss class) · the like verb's `aria-pressed` + re-click guard · `FR-GV-13`'s `?owner=me` control · **`FR-AUL-17`'s shared formatter (banked → F.W3; do NOT re-book)** | acknowledgement that these arrive as **emissions**, and that F.W6 is credited for **none** of them (the FR-GIG-5 mirror, standing bar) |
| **F.W7** | **F.W6 must NOT pre-empt — and now does not need to.** `G7`/`E16` is **RULED NO TRIE**; F.W6 carries the documented default (**whole-snapshot duplication is the recorded shipped behaviour**; `atomdiff.py:12-14` is the incumbent guardrail) and designs no compression. ▲ **F.W7's routing census is a measured ∅ and that ∅ is a FINDING, not a gap** — corroborated at the canonical's §4.1. **F.W6 asserts nothing against it and adds no row to it** | a line recording that the E10 strikes landed under a ruling, not under F.W7's design |
| **F.W8** | **F.W6 BURNS SERVER DEFECTS; F.W8 WIRES CLIENTS + RUNS CONFORMANCE.** Not F.W6's, declared so no re-cut drifts a row into two homes: `FR-GV-8` · `FR-GV-27` · `FR-GFC-4` · `FR-USB-15` · ⊙ **`FR-USB-23`** · `FR-USB-24` · `D1`'s per-operation dispositions. ⚑ **R3's PORT IS F.W8's ACT** (§2.4's banner), and **`FR-AFP-7`'s settlement gates it** — the port must be written against the settled wire shape. ⊙ **`FR-USB-23` CARRIES ITS OWNER GATE ACROSS THE ROUTING**: ruling **R9** = DELETE; the gate **travels with the row**, so no wave reading only this letter wires or deletes an unruled subsystem. ▲ **K-1: cite 45/30/13, never 30 alone or zero.** ▲ **C4's one-controller lock binds any retry change** | acknowledgement of the port's homing and of `FR-AFP-7`'s gating; a reciprocal on the F.W6 → F.W8 edge |
| **F.W9 / F.W10** | **F.W6 EMITS coverage obligations.** A burn-down with no probe repeats the defect `FR-AUL-13` convicts. Emitted: **`AA-44`** ⟨canonical home **F.W9** — a **distinct** banked identity from `FR-AFP-49` and `FR-AUL-16`, REST-27⟩ · **`FR-AFP-49`** ⟨canonical **F.W9**⟩ · `FR-AFP-66`'s orphan-flag test exercising only the reporter-keyed path · **G2**'s absent same-content-palette history test · **G5**'s per-side create-visibility tests | acknowledgement that each commissioned act's **fixture** is F.W9/W10's to run, and that the three identities stay **distinct** |
| **the value.js API row** (CO-SIGNER) | **F.W6 ROUTES, never burns** — §4 above, in full, with both authorities and V-α's measured non-membership | **the reciprocal edge is REQUESTED from that end, not written here** |
| **SS-4** | **F.W6 IS SS-4's burn half.** All nine rulings were **FLAGGED INLINE** by ruling id and are now RULED at §0j.D; **SS-4's standing edict on TA-4 is discharged in the RE-SCOPE branch, explicitly** (§4). Two registry-integrity carries travel: **`GCM-10`'s "MF-9" companion cite resolves to nothing repo-wide and is STRUCK unless SS-4 resolves it** — ▲ *striking a dangling cite is not disposing of the identity*; `GCM-10`'s routed server cure is **carried as a named fold** at §2.4's `FR-AFP-36 ⊕ GCM-55` row ⟨canonical home **F.W3**⟩ — and **the challenge-row-census vs roster-census diff is commended as a standing gate** | SS-4's resolution or confirmation of the `MF-9` strike |
| **glass-ui BH relay (SS-6)** | **DECLARED EMPTY.** F.W6 carries **ZERO** producer rows — declared so that (a) no glass-producer row is smuggled in as a server cure and (b) no server cure is discharged as a frontend hack. **Any producer-shaped finding leaves as a letter to the standing glass-ui BH inbox**, never as an edit; glass-ui is **READ-ONLY always** | none owed |
| **X·parse-that** | **FORBIDDEN EDGE.** Direct parse-that→fourier routing is forbidden; anything parser-shaped routes through the megatranche, never across | none owed |
| **SS-13 / live-probe lane** | **F.W6 DEFERS MAGNITUDE ONLY** — never used to close a gate: `VV-R2-A`'s observable phantom view · `FR-AFP-4`'s deployment auth-proxy question ⟨**UNPROVEN — the gate may not close by assuming a proxy**⟩ · `FR-AFP-33`'s aggregate cost · `M-14`'s end-to-end contour-loss reproduction · `B-4`'s `contour_hash` instability across an ML-threshold change · **`L-B1`'s "what `moon.json` WAS generated from" — UNDETERMINED**. **Probe parsimony binds** | none owed; recorded so no gate is closed on a deferred magnitude |
| **`/Users/mkbabb/Programming/fourier-analysis`** | **READ-ONLY, ALWAYS. Zero fourier bytes.** Immutable beside the spec (E-1/E-3): `lane-crud.md`, `INTAKE-ADJUDICATION-2026-08-03.md`, all 66 `fr-*.md`, `J-diff-shape.md` v1 (v2 supersedes **by reference** and never patches it) | none owed |

---

## §6 THE THREE ASKS BACK

1. **Row this letter** in `fourier-analysis/docs/tranches/F/coordination/INBOX.md` (COHESION §0k.1),
   as O-22 was asked to be rowed.
2. **Reply by gate id and clause id** — `FW6-G1`…`FW6-G15`, `E2`/`E5`/`E6`/`E7`/`E10`/`E13`/`E14`/`E17`/`E18`/`C1`/`C2`/`C5`/`D5`/`D6`/`D7`/`D8`/`D16`/`D17`/`A4`/`E4`/`§G` — **never by line**. Line cites into
   live siblings are a defect from R2-2 forward; the stable addresses are gate ids and clause ids.
3. **Land the acts in your sub-session (COMMISSION §2) and report the landing evidence**, which is the
   column the register left *pending*. **Each gate goes GREEN only when its named landing occurs** — until
   then the RED is honest and stays published as such.

▲ **And one ask that is a refusal, stated plainly**: if any act above cannot be landed as specified, do
**not** substitute a near-cure — a `try/except` around the defect, a skipped test, an allowlist, a
regenerated artifact. **Return the reason.** This wave's whole method is that a gate argued green over an
unruled question, or a cure that is really a client arm, or a set-difference declared empty without
running both directions, is worse than the RED it replaces.

---

**Provenance.** Value.js `tranche-u`, this wave's commits `7f2d6baa` → this letter's. Fourier read at
**`3bac3d52`**, **0 dirty**, unmoved across all nine units. Census of record
`CENSUS-CANONICAL.md` @ **`f44362757458`** (character-match to the spec's frozen pin). Register:
`docs/tranches/X/fourier/waves/F-W6/burn-register.md`. Routing receipt:
`docs/tranches/X/fourier/waves/F-W6/value-side-routing-receipt.md`. Wave record:
`docs/tranches/X/execution/C/F-W6.md`.
