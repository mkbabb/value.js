# Hardening lane — h-seam-s-state

**Charge**: adversarial re-verification of the T corpus's characterization of **LANDED S STATE** —
the R1–R11 spec-retirement ledger's "what S actually shipped" cells (`T.md §4` == `audit/SYNTHESIS.md
§1.1`) and the wave docs' "amends W4-1/W4-2/W5-2/W6-4/W7-4" claims — against the **actual S commits**
and the **live tree**. The seam of concern: the S waves themselves had recovered/resumed lanes
(S.W5 Lane C died mid-W5-8; the variance pull-back was a mid-gate owner recalibration), so a
retirement ledger authored post-hoc could inherit a stale, pre-recovery picture of what landed.

**Substrate**: `tranche-t @ 10c0fe9`. Product tree (`demo/ src/ api/`) is **byte-identical to
`cc4f4fa`** (`git diff --name-only cc4f4fa..HEAD -- . ':(exclude)docs/**'` = empty) — so every
file:line anchor below is verified against exactly the S-close product state. `../glass-ui`
read-only. No :9000 probe needed (all claims resolved statically against commits + tree).

**Verdict**: **CLEAN on the S-state characterization.** All 11 R-rows and all five named amends are
FAITHFUL to the S commits + live tree; every apparent discrepancy resolved to a documented,
correct choice. `mustFix = 0`, `shouldFix = 1` (a dangling doc cross-ref, overlaps a prior lane —
see F-1), plus 2 NOTEs. This is a clean bill **backed by the evidence trail below**, not by absence
of alarm.

---

## The evidence — every R-row re-verified against commit + tree

Each cited S landing commit exists and, by `git log -S<anchor-string>`, is the sole commit that
**introduced** the anchored code (never modified since):

| R | S landing (cited) | commit verified | live-tree anchor verified | S-state cell verdict |
|---|---|---|---|---|
| R1 | `33ba703` W7-4 color-wheel-legend menu | ✅ `-S entryAccent` → only `33ba703` | `DockViewSelect.vue:41-45` `entryAccent`; **:103-114 dot+icon `entryAccent(entry.id)` on EVERY `v-for` row** (not current-only) — the menu IS a per-row color-wheel legend | FAITHFUL |
| R1 named symbols | — | — | RETIRES set live: `resolveViewAccentTokens`/`PRIMARY_VIEW_SHIFTS`/`PRIMARY_VIEW_IDS` (all in `useViewAccents.ts`/`view-accents.ts`); SURVIVES set live: `resolveViewAccent`/`resolveSealInk` | FAITHFUL |
| R2 | W5-2 rider (no commit; file+DELTA) | — | `PaneHeader.vue:76` = `opacity: 0` at rest + `animation: pane-header-veil` on `--pane-scroll`; `w5a-after/DELTA.md:25` = **exactly** the "W5-2 FORENSICS RIDER" row ("hard edge DEAD at rest… veil earns its surface on the --pane-scroll timeline") | FAITHFUL |
| R3 | `d843ae7` W6-4 corner-break | ✅ `-S hero-blob-anchor` → only `d843ae7` | `ColorPicker.vue:344-375` = the W6-4 comment + `.hero-blob-anchor` with `top: calc(--radius-card − --blob-fp/2)` (center-on-radius-origin), `(R−r)/2R ≈ 33% ≥ 25%`, `--blob-fp: 8rem` <lg hand arm | FAITHFUL |
| R4 | W4-1/W4-2 (file anchors) | — | `ColorSpaceSelector.vue:35` = `size="audacious"` (no weight utility at :37); `ColorComponentDisplay.vue:12` = `w-full` full-span, `:21` = per-cell `${readoutCh}ch`; gate text **"Lab inks ONE line at 1440"** verbatim in `S/PROGRESS.md:107`; **S-21 weight-parity break structurally confirmed** (see F-note) | FAITHFUL |
| R5 | W5-8 webbing (file anchors) | — | `style.css:257,261` = `--foreground 9%` / `--background 12%` hatch; `gamut-ink.ts:29-36` = `WEBBING` const (period 6, 45°, weight 1). SURVIVES "ruling-6 cures stack" = the `6955fca` DPR/token cure (see F-note) | FAITHFUL |
| R6 | `fe30d68` variance pull-back | ✅ diff shows `triad`→`analogous`, `0.82`→`0.7` at `panes/keys.ts:46-47`; prior triad/0.82 landed `3bb7ace` (W6-3) | `keys.ts:46-47` = `harmony: "analogous"`, `colorEnergy: 0.7`; commit comment states `anchor±28°` (matches R6's "analogous±28°") | FAITHFUL |
| R7 | `e43601c`+`a34d20f` W5-6 | ✅ both = "S.W5-6 · extract" / "· mix" | `PaletteCardSkeleton.vue:82` declares `variant?: "shadow"\|"specimen"\|"developing"`; **grep `variant="specimen"` across `demo/` = 0 hits** — every render site uses `developing` or default `shadow`. "specimen register shipped ZERO consumers" is TRUE | FAITHFUL |
| R8 | W5-2/S-20 `bg-card/75` | — | `PaletteCard.vue:19` = `bg-card/75 backdrop-blur-sm`; S.W5-2's alternate ("or the Card tier at W8") is dead because **W8 NOT FIRED** (`S/FINAL.md:103`) | FAITHFUL |
| R9 | `96a12ed` W7-1 rim | ✅ `-S dock-seal` → only `96a12ed` | `Dock.vue:330-338` = `.dock-seal` (grid circle, `border-radius:9999px`) with `border: 1px solid …--accent-view` — the rim IS on the **geometric parent**, not `.dock-seal-wax`; π-review judged it "INTENTIONAL" (`w7-after/DELTA.md:17`, `FINAL.md:45`, `PROGRESS.md:102`); "hairline as continuity carrier" clause real (`S.W7.md:35`) — R9's "+A rim on the WRONG element" confirmed | FAITHFUL |
| R10 | W0-1 seed-rider-1 (file anchor) | — | `App.vue:115` = `<DevMisconfigBanner />` with the seed-rider-1 comment; component exists at `palette-browser/DevMisconfigBanner.vue` | FAITHFUL |
| R11 | GAP-ARM + W6-1 | — | S.W6-1 (`SYNTHESIS.md:325`) = "Cold-boot seed integrity … the first aurora frame" — an entrance item; R11's "W6-1's entrance clause" is faithful | FAITHFUL |

**Amends → real S items** (task-named): W4-1 = "Title-as-component" (`S.W4.md:31`); **W4-2 = "Header
re-composition (S-19): readout spans the full header"** (`S.W4.md:32`) — the readout claim is
verbatim; W5-2 = "Card-grammar unify (S-20)" + the forensics rider (`S.W5.md:42`); W6-4 = blob
corner-break (`S.W6`, S-4); W7-4 = per-view accents (`33ba703`). Also cross-checked but not
task-named: **W5-8 = S-6 webbing** (T-6), **W5-9 = S-13 easing pane v2** (T-22) — both real
(`S/audit/SYNTHESIS.md:304-305`).

**Transcription fidelity**: `T.md §4` R1–R11 diffed against `SYNTHESIS.md §1.1` R1–R11 → **byte-
identical except the two documented cross-ref resolutions** (R7 `(§2.7)`→`(D9; SYNTHESIS §2.7)`,
R8 `(§2.1)`→`(D1; SYNTHESIS §2.1)`). No smuggled drift.

**Three apparent discrepancies chased to ground — all resolved as CORRECT:**
- **R3 shot `t-2002-52`** looked wrong (the MANDATE best-effort map assigns t-2002-52 to T-7
  readout, and AboutPane has no blob) → it is a **documented deliberate re-map**: `plan-audit-2
  §3.1`/F14 + `t-blob-hero.md:24` establish t-2002-52 as the blob straddling the picker/About-card
  seam with its lower-left buried behind the About card. Internally consistent across three
  artefacts. The "burial at the About host" = the bead clipped behind the adjacent card, matching
  T-8's no-clip demand.
- **R5/R6 both cite "ruling 6"** — looked like a cross-wire (R5 for webbing, R6 for variance) →
  S owner-ruling **6** (`FINAL.md:92`) is literally "**Variance recalibration + the webbing
  facility**", a single ruling with two halves: the pull-back (`fe30d68`, R6) AND the webbing
  facility (`6955fca`, R5). The ledger correctly threads one ruling's two halves into two rows.
- **R6 "rulings 3+6"** — ruling 3 = "Aurora strong field + greater C/H variance" (amplify →
  triad/0.82, `FINAL.md:89`); ruling 6 = the pull-back (→ analogous/0.7). Bracket = between the two.
  Exactly R6's "(triad, 0.82) too strong ← target → (analogous, 0.7) too muted".

**Recovered-lane seam (the charge's core worry) — CLEARED**: S.W5 Lane C died mid-W5-8 and the
webbing cure landed only in the **finalization** commit `6955fca` (DPR raster + `WEBBING`/`SECOND_NET`
tokens), *after* the taste-fix `3ed6c75`. R5's SURVIVES cell names exactly the **finalized** state
("the ONE-home facility, the DPR raster, the token architecture") — **not** the stale pre-cure
`3f25abc`/`3ed6c75` picture. The ledger captured the post-recovery truth. Likewise the mid-gate
`fe30d68` recalibration (a "resumed" owner-rider lane) is captured at its landed value, with the
prior `3bb7ace`/W6-3 overshoot correctly attributed as the other bracket pole.

---

## Findings

### F-1 · SHOULDFIX — R7/R8 SURVIVES cells cite a phantom "SYNTHESIS §2.7 / §2.1" subsection (and it originates in the SYNTHESIS source, not just the charter)

**Location**: `T.md §4` R7 + R8 (SURVIVES cells) **and** `audit/SYNTHESIS.md §1.1` R7 + R8
(lines 56–57).

**Evidence**: `SYNTHESIS.md §2` is **D-numbered** (`D1 · THE FOUR-RUNG MATERIAL LADDER` @ :122;
`D9 · THE SHADOW-PALETTE STATE GRAMMAR` @ :214) — there is **no `§2.7` and no `§2.1` subsection**
in SYNTHESIS. The fidelity fold (`2db417e`) resolved the bare `(§2.7)`/`(§2.1)` to `(D9; SYNTHESIS
§2.7)` / `(D1; SYNTHESIS §2.1)`: the **`D9;`/`D1;` prefixes are correct** (they name the right
D-items), but the appended **"SYNTHESIS §2.7"/"SYNTHESIS §2.1" labels are dangling** — they assert
subsections that do not exist. (The "§2.1" the author likely had in mind is the *external* lane
ref `t-aurora-boot §2.1`, `SYNTHESIS.md:155` — not a SYNTHESIS self-section.)

**Impact**: does NOT mischaracterize S state — R7/R8's RETIRES/SURVIVES content is faithful; only
the pointer to where the re-grounding is documented is broken. Low-grade doc-integrity defect.

**Overlap disclosure**: `h-seam-charter` already filed the T.md instance as its 1 SF ("phantom
'SYNTHESIS §2.7/§2.1' cross-refs; the fidelity fold disclosed but didn't cure"). **My marginal
contribution**: the phantom lives in the `SYNTHESIS.md §1.1` **source** too (h-seam-charter
reviewed only `T.md`) — so a cure that touches only `T.md §4` leaves the SYNTHESIS copy stale.

**Proposed amendment**: in **both** `SYNTHESIS.md §1.1` and `T.md §4`, drop the "SYNTHESIS §2.N"
label and keep the D-item only: R7 → "(D9)", R8 → "(D1)"; if an external re-grounding pointer is
wanted, cite the lane by name (e.g. "t-aurora-boot §2.1"), not a SYNTHESIS subsection.

### F-2 · NOTE — Substrate anchor imprecision: `cc4f4fa` is the tranche-s branch tip, not the `tranche-s-close` tag

**Location**: `MANDATE-2026-07-06.md` header — "**Substrate**: master @ `cc4f4fa` (= the S close,
tag `tranche-s-close`)".

**Evidence**: `git rev-parse tranche-s-close` → annotated tag → commit **`4a6b62b`** (the S-close
merge), **not** `cc4f4fa`. `cc4f4fa` (a `docs(S.W9)` commit, 19:01) is actually **later** than the
merge (18:54) and is **not an ancestor** of the tag (`git merge-base --is-ancestor cc4f4fa
5bb2d59` = false). Their **product trees are identical** (`git diff cc4f4fa..5bb2d59 -- demo/ src/
api/` = empty); `cc4f4fa` added docs-only after the merge on the `tranche-s` branch.

**Impact**: **product-immaterial** — every file:line verification against the `tranche-t` tree
(product-identical to both `cc4f4fa` and the tag) is unaffected; no S-state characterization is
harmed. Recorded for precision only.

**Proposed amendment** (optional): phrase as "master @ `cc4f4fa` (the tranche-s branch tip;
product-identical to `tranche-s-close` = merge `4a6b62b`)".

### F-3 · NOTE — R4's "S-21 broken on the weight axis" is sound (recorded so the amend doesn't second-guess it)

**Location**: `T.md §4` R4 "+ a latent BUG (About host inherits weight 700 — S-21 broken)".

**Evidence**: S-21 is the "both hosts get THIS grammar verbatim — zero per-instance overrides"
parity ruling (`S.W4.md:31`). `ColorSpaceSelector`'s trigger carries **no font-weight utility**
(`:37`). In the **picker** host it sits in a plain `<div>` (`ColorPicker.vue:21`) → normal weight;
in the **About** host it sits inside `PaneHeader`'s `<h3 class="pane-header-title font-display
text-heading">` (`PaneHeader.vue:12`), and `.pane-header-title` (`:91`) sets **no** font-weight →
the `<h3>` keeps the UA-default **bold (700)**, which the weightless selector inherits. The two
hosts therefore diverge on the weight axis → S-21 parity genuinely broken. The claim is
structurally faithful; no action needed on the S-state cell.

---

## Scope note

Verified: R1–R11 landed-state cells (commit existence + attribution via `git log -S` + live-tree
anchors + named RETIRES/SURVIVES symbols), the five task-named amends + W5-8/W5-9 against the S
wave item tables, the `T.md §4` ↔ `SYNTHESIS §1.1` transcription diff, and the recovered/resumed
S-lane finalization state (W5-8 `6955fca`, variance `fe30d68`). Not in scope (owned by sibling
lanes): the §1.2 finding→wave map beyond the R-cross-refs; the O-oracle slate; the E-4 fold table;
forward-looking blockers (C4/GAP-ARM). Everything checked returned faithful.
