# Arm A — Color Program Compliance Audit (Codex V-next formation)

Lens: COLOR PROGRAM COMPLIANCE — L1 §3, packet P2 (the 14-row restore ledger), E-C13,
priority-order + mode (restore vs net-new), SCI-1 inheritance, tombstones, WPT/§13 gate
infra, zero-alloc mandate. Snapshot root: `…/apotheosis/snapshot-vnext` (frozen 2026-07-19
21:29). Grading is symmetric: CORRECT work is recorded with the same rigor as the wrongs.

Codex color band = V-waves V12–V22 (model V12; Color4 V13; Color5/6 V14; ΔE+CSS gamut V15;
cusp/Halley V15P; Into kernels V16A; bulk/SoA V16B; mix/color-mix V17; ramps V18R; OKHSL
V18H; OKHSV V18V; HDR V19; contrast V20; gradients V21; image V22). Color law in
PARSER-CSS-COLOR.md §"Color contract"; zero-alloc law FORMATION.md:124-125 +
PARSER-CSS-COLOR.md:647-648.

---

## VERDICT SUMMARY

The formation's color program is **substantially compliant and, on several axes, more
spec-accurate than the edict itself** — but it **dilutes the P2 *decided* restore** on four
concrete, load-bearing points (V15P prune-eligibility of a decided-restore engine; raytrace
role inversion; the OKHSL/OKHSV cusp-math DAG gap; the total absence of SCI-1/W56/4.1.x and
the R-RAMP kf-scar deletion). Net: the CSS-conformance *refinement* is CORRECT; the treatment
of the *analytical engine restore* and the *decided-Into vehicle* is PARTIAL/MISSING.

---

## THE CRUX — V15 / V15P: honors or dilutes the P2 decided path? → PARTIAL (P1)

The task flags the formation's language: "one consistently selected CSS Color 4-permitted
gamut policy; non-CSS cusp/Halley decided separately." Provenance: the formation's own Sol
adjudicator raised **V-F05** (`reviews/V-ADJUDICATION.md:22`) — "gamut-mapping law was stale"
— citing CSS Color 4 §14.2 (Local-MINDE / EdgeSeeker / Ray Trace, consistent selection
required, EdgeSeeker pseudocode incomplete) and amended V15, moving cusp/Halley to V15P.

**Where it HONORS (CORRECT):**
- §14.2 grounding is *real*: the current ED genuinely permits three algorithms and demands one
  consistently-used selection (`waves/P-V.md:96`, `DISPOSITIONS.md:29`). The edict's premise
  that "analytical Ottosson cusp+Halley … (§13-conformant)" (E-P2.2-R-GAMUT) is itself
  imprecise — cusp+Halley is an analytical *accelerator*, not a CSS-spec-named algorithm.
  Barring it from a `css-*` conformance name (`PARSER-CSS-COLOR.md:644`, V15 exclusions,
  V15P) is spec-correct, not dilution.
- EdgeSeeker `refused-at-evaluate` while its pseudocode is incomplete (V15) is exemplary
  honest refusal.
- The ΔE-OK JND clip criterion the edict names for §13 survives: V15 carries "reference/
  metamorphic/JND evidence" and Local-MINDE is deltaEOK-JND based.

**Where it DILUTES (the P1 breach):** the P2 ledger and L1 §3 present the restore path as
**DECIDED, "not bench-contested"** (E-L1-S3.2; E-L1-S5.1 "dispositions are INPUT"). The
owner-decided analytical cusp+Halley engine (part of the single-commit v4 extinction the owner
ordered *restored*) is converted by V15P into a **terminal KEEP-or-PRUNE** with a full
`owner-precut` **deletion annex** (`waves/P-V.md:97`, `DISPOSITIONS.md:30`). A decided-restore
row becoming prune-eligible **re-opens a decided row** — the P2 ledger nowhere authorizes
pruning cusp/Halley. Correct move would have been "restore as an explicitly non-CSS policy +
worth documentation," not a coin-flip that can delete it.

## RAYTRACE ROLE INVERSION → WRONG/PARTIAL (P1) — E-P2.2-R-GAMUT

The edict fixes **raytrace as the TEST-SIDE exact boundary oracle** ("raytrace as the
TEST-SIDE exact oracle"; E-P2.2-R-GAMUT: "raytrace confined to test/"). The formation uses
"Ray Trace" **only as a production CSS challenger candidate** (V15; `PARSER-CSS-COLOR.md:91,93,
641`; `DISPOSITIONS.md:29`). Grep confirms **no test-side raytrace oracle anywhere**, and the
value.js target `src/color/` tree (`PARSER-CSS-COLOR.md:452-468`) contains **no `raytrace.ts`
and no `boundary.ts`** — the pre-v4 exact-oracle apparatus (raytrace.ts 137L + boundary.ts
604L) has no restore home in source or test. The exact-boundary oracle the edict mandated as
the accuracy backstop is gone.

## OKHSL/OKHSV CUSP-MATH DAG GAP → PARTIAL (P1) — E-P2.2-R-OKHSL

Edict R-OKHSL: restore OKHSL/OKHSV, **"reuse P2's cusp math"** (E-P2.2-R-OKHSL compliance: "no
duplicate cusp implementation"). In the formation the cusp math lives in **V15P** (cusp/Halley
KEEP/PRUNE), but **V18H/V18V depend on V12, V16A only** (`waves/P-V.md:102-103`) — *not* on
V15P. OKHSL/OKHSV are mathematically *defined via the OKLab gamut cusp*. A V15P **PRUNE** thus
either strands OKHSL/OKHSV or forces a **duplicate cusp implementation** — exactly what the
edict forbids. The shared-math dependency the edict mandated is un-wired.

---

## R-INTO / SCI-1 — the decided vehicle is ABSENT → MISSING (P1) — E-P5.1, E-P2.2-R-INTO

- **SCI-1, W56, "4.1.x" all grep to ZERO across the snapshot.** E-P5.1 ("SCI-1 = DECIDED
  SHIP-4.1.x (D54); vehicle W56; R-INTO extends it; NOTHING re-opens it") and E-P2.2-R-INTO
  ("RIDES the W56 4.1.x vehicle, never forks it") are neither honored nor tombstoned. The
  formation ships a single value **5.0.0** at C10; the decided 4.1.x interim vehicle is
  **silently dropped** with no reconciliation — a silent-drop-class omission of a DECIDED row.
- **R-INTO scope diluted:** V16A restores caller-owned-output `Into` kernels for
  **convert/difference/selected-gamut** only, and **explicitly excludes mix/ramp** ("No claim
  for … mix/ramp"; `waves/P-V.md:98`). mix/ramp `Into` is punted to **V16B, itself
  KEEP/PRUNE** (`waves/P-V.md:99`). So zero-alloc out-param paths for **mix and ramp — critical
  color ops under E-C13** — are not guaranteed; a V16B PRUNE removes them. The edict's named
  hot paths **`mapColorToGamutInto` / `safeAccentColor`** grep to ZERO (not carried).

## R-RAMP kf-scar deletion — MISSING (P1) — E-P2.2-R-RAMP, E-P2.1

Edict: kf backward-emit re-adopts value's ramp and **deletes the two named scars**
(`compile/emit/backward/color.ts:120-124` hand-rolled oklab Euclidean ΔE; `backward.ts:30-32`
stale `sampleColorRamp`/`deltaEOK` docstrings). **No K-band wave or coordination dispatch
references these scars or a kf ramp re-adoption** (grep: none; K-band dispositions
`DISPOSITIONS.md:43-60` cover animation zones only). The value-side ramp is restored (V18R) but
the paired kf consume-spec + scar deletion is absent.

## R-BOUNDARY — MISSING (P2) — E-P2.2-R-BOUNDARY

Boundary samplers, gated on the W53 perceived-space-plate rebuild, have **no conditional row
and no `boundary.ts` in the target tree**; "W53" grep = ZERO. Iff-pulled, so P2, but the
gated-conditional the edict required does not exist.

---

## CORRECT — recorded with rigor

- **R-DELTAE (CORRECT):** deltaEOK/2000/ITP restored as **three independent numeric contracts**
  (`PARSER-CSS-COLOR.md:646`, V15) + JND evidence. Matches the edict's three-function restore.
- **Shared interpolation engine (CORRECT) — E-P2.2-R-MIX/R-RAMP:** interpolation, premult, hue
  fix-up, gradients, `color-mix()`, and N-stop ramps **share one semantic implementation**
  (`PARSER-CSS-COLOR.md:650`; V17 the sole engine, V18R/V21 consume it) — the "no duplicate
  math" mandate is met.
- **Zero-alloc realism (CORRECT — grades WELL vs E-C13):** FORMATION.md:124-125 +
  PARSER-CSS-COLOR.md:647-648 mirror the packet law verbatim ("no blanket zero-allocation …
  selected warmed kernels carry explicit allocation budgets"). V16A's gate — "only 'no observed
  V8 heap allocation at named warmed boundary'," DCE/deopt/escape-analysis-aware — is
  SOTA-honest. This correctly reads E-C13 as "robust zero-alloc for critical ops," not a
  dishonest universal claim.
- **WPT/§13 gate infra (CORRECT — E-L1-S3.2):** V01 `standards-lock.json` carries "WPT
  path/META projection"; V15 carries reference/metamorphic/JND vectors; conformance vectors
  are named new gate infrastructure.
- **Tombstone/capability-diff threaded through color (CORRECT — E-L1-S7.2/E-P2.1):** V03
  "R-PARSER capability diff/tombstones"; V12 "semantic losses have tombstones or restored
  vectors"; V30 `api-capability-diff.json` + `tombstones.json`.
- **Grammar restores present (CORRECT):** color-mix (V17+V14 routing), relative-color `from`
  (V14), contrast-color + WCAG/APCA (V20), full Color 4/5/6 (V13/V14). R-MIX/R-RELATIVE/
  R-CONTRAST landed.
- **spring() (CORRECT on solver axis):** correctly identified as non-CSS and tombstoned
  (`DISPOSITIONS.md:28`, V25); kf solver ownership preserved (K10 emits bounded `linear()`) —
  honors K F6.6. (Minor: decided by spec-fiat, not the mandated open-ownership row citing
  K F6.6 — P2.)
- **Priority order (mostly CORRECT):** dep chain V12→V15(ΔE)→V16A(gamut kernel)→V17(mix)→
  V18R(ramp) reproduces R-DELTAE→R-GAMUT→R-INTO→R-RAMP.

## Minor notes (P2)

- **R-HDR:** V19 *implements* the HDR/ICtCp/Jz/Rec.2100 inventory rather than leaving it an
  owner-decision — defensible because **E-C12 (full July-2026 CSS spec incl. experimental)**
  supersedes the standalone owner-decision, but the resolution is not explicitly cited as
  "R-HDR resolved by C12."
- **By-name restore accounting weak:** `sampleColorRamp`/`mixColorsN`/`deltaEOK`/
  `mapColorToGamutInto` grep to ZERO — domain-module naming (difference/ramp/into.ts) is used
  under the C11 name-strip law; the capability-diff gate should catch renames, but by-name
  tombstone accounting for the restored surface is thin.
- **R-DELTAE folded into V15** (with gamut selection) rather than a standalone prerequisite
  wave — acceptable fold, minor deviation from the stated standalone priority row.
