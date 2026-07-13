# h-synthesis-corpus-diff — SYNTHESIS §1/§2/§3 ↔ wave-docs + T.md transcription-drift hardening

**Lane**: h-synthesis-corpus-diff (T HARDENING fleet). **Product under audit**: the SYNTHESIS
(as-amended pass-2, `2a38c11`) §1/§2/§3 vs the 10 wave docs (`waves/T.W0..W9.md`) + the charter
(`T.md`), with the mandate (`MANDATE-2026-07-06.md §0–§4`) as the verbatim-law root.
**Method**: full read of SYNTHESIS §1.0–§8, T.md §0–§12, all 10 wave docs, the letter, the
mandate; targeted greps for numeric/token drift, dangling cross-refs, dropped/invented items,
and the pass-2 amendment set. **Commit**: `2db417e+` (branch `tranche-t`).

**Headline**: the corpus is unusually faithful. All 10 SYNTHESIS §3 wave items are present in
their wave docs (zero drops); the finding→wave map, the R1–R11 retirement ledger, the class
census, the D1–D10 doctrine set, the ×φ landings (41.89→67.78 / 25.89→41.89 / 33.77→54.64), the
T-26 Q2 values, the R5 netting band (22/28/45/65/1.25px), the O-19 floors (59/45 per 255), and
every budget/suite number (JS 347.9, CSS 86.5/120, LHCI `28836873580` LCP 5563 / TBT 5618,
vitest 2158/68, api 224/37) all match between SYNTHESIS and T.md. **All 13 substantive
AMENDED-AT-PASS-2 amendments are reflected in the corpus** (verified one-by-one — see §Appendix).
The drift that survives is confined to cross-reference hygiene and label precision. **0 MUSTFIX ·
2 SHOULDFIX · 3 NOTE.**

---

## SF-1 (SHOULDFIX) — T.md §3 DAG is labelled "(SYNTHESIS §3, verbatim)" but is NOT verbatim; the SYNTHESIS arrow itself places the floating W7 in the critical path

**Evidence.**
- SYNTHESIS §3 (`SYNTHESIS.md:235`): `**The DAG**: W0 → W1 → { W2 · W3 } → W4 → { W5 · W6 } →
  W7(trigger-gated, floats) → W8 → W9.`
- T.md §3 (`T.md:219`) claims `**The DAG** (SYNTHESIS §3, verbatim):` and then renders
  (`T.md:222`): `T.W0 → T.W1 → { T.W2 · T.W3 } → T.W4 → { T.W5 · T.W6 } → T.W8 → T.W9` — **W7
  removed from the linear chain** and demoted to a separate descriptive line ("FLOATS into
  whatever round is current…").

Two distinct defects intersect here:
1. **The "verbatim" claim is falsified.** The arrow string differs (W7 is present in the
   SYNTHESIS chain, absent in the T.md chain). Every other "verbatim" claim in the corpus is
   scrupulously true; this one is not.
2. **The SYNTHESIS arrow is the actually-wrong one.** SYNTHESIS draws `{W5·W6} → W7 → W8`, which
   reads as *W8 depends on W7*. But W7 is trigger-gated and may never fire in T's window, and
   SYNTHESIS's own prose says "W8 runs only after every design wave closes" (W7 is not a design
   wave) and "its non-firing inside T's window is not a miss". So the SYNTHESIS arrow puts a
   floating, possibly-never-firing wave on the critical path — internally loose. T.md's rendering
   is the *correct* semantics; it just mislabels the correction as a transcription.

The actual dependency semantics are consistent everywhere else (every wave doc's "Opens after"
clause is right: W8 opens after W2–W6 all close; W7 floats), so no wave will be mis-sequenced —
hence SHOULDFIX, not MUSTFIX. But the corpus disagrees with itself on the DAG *shape*, under a
false "verbatim" banner.

**Corpus location**: `T.md:219,222` · `audit/SYNTHESIS.md:235`.
**Proposed amendment**: (a) pull W7 out of the SYNTHESIS §3 arrow so the string reads
`… → { W5 · W6 } → W8 → W9` with W7 named as a floating trigger-wave on its own line (matching
T.md and the wave-doc "Opens after" clauses); and (b) relabel the T.md §3 line as
"(SYNTHESIS §3, with W7 pulled out of the linear chain to reflect its floating status)" — or, once
(a) lands, restore the plain "verbatim". Do not keep "verbatim" over a string the corpus visibly
alters.

---

## SF-2 (SHOULDFIX) — dangling `§2.x` cross-refs: SYNTHESIS §2 is labelled D1–D10 (no numbered subsections), but §1.1 / §1.2 / §8 point at non-existent `§2.1 / §2.3 / §2.7`; T.md carries the danglers forward

**Evidence.** SYNTHESIS §2 uses the labels **D1..D10** (`SYNTHESIS.md` §2, confirmed: no
`### §2.1`-style subsections exist). Yet four load-bearing cross-refs point at numbered
subsections that do not exist:
- `SYNTHESIS.md:56` (§1.1 **R7** SURVIVES col): "the loading-lie cure — re-cut on the MOTION axis
  **(§2.7)**" — should be **D9** (the shadow-palette MOTION-axis grammar).
- `SYNTHESIS.md:57` (§1.1 **R8** SURVIVES col): "re-grounded at the picker's `resting`+cartoon
  rung **(§2.1)**" — should be **D1** (the four-rung ladder).
- `SYNTHESIS.md:99` (§1.2 **T-25** gate shape): "the perceptibility gates **(§2.3)**" — should be
  **D4** (the living field; the perceptibility gates are defined there).
- `SYNTHESIS.md:573` (§8 **Q2** DEFAULT): "the **§2.3**/t-aurora spec" — should be **D4**.

The numbering is not even linear (§2.1→D1, §2.3→D4, §2.7→D9), which is the tell of an earlier
`§2.N`-numbered doctrine section that was re-labelled D1–D10 without updating its inbound refs.

T.md **partially** repaired this and then re-introduced it: `T.md:306` (R7) now reads
"(D9; **SYNTHESIS §2.7**)" and `T.md:307` (R8) "(D1; **SYNTHESIS §2.1**)" — the correct D-label
was added but the dangling "SYNTHESIS §2.x" tail was kept (now it points a reader at a
subsection of the *other* document that also does not exist). `T.md:514` (Q2) still carries the
bare "§2.3" unresolved.

**Corpus location**: `SYNTHESIS.md:56,57,99,573` · `T.md:306,307,514`.
**Proposed amendment**: replace every `§2.N` doctrine cross-ref with its D-label —
§2.1→D1, §2.3→D4, §2.7→D9 — at all seven sites, and drop the residual "SYNTHESIS §2.7"/"§2.1"
tails T.md added (the D-label alone is the resolvable anchor). (The three `t-aurora-boot §2.1/§2.2`
refs at `SYNTHESIS.md:100,155,164` are *lane* refs, correctly formed — leave them.)

---

## N-1 (NOTE) — "the KF letter" (SYNTHESIS §3 W0-1 / §4) vs "the KF note" (the letter / T.md / W7); the W0-1 gate wording "never folded into the glass-ui **letter**" is imprecise

**Evidence.** SYNTHESIS names the keyframes ask as a standalone **letter**: §3 W0-1
(`SYNTHESIS.md:269`) "GLASSUI-T-ASKS (P1–P10) + **the KF letter**"; §4 table (`:402`) "**KF |
keyframes letter**". The realised artefact is a **§KF note-section inside `GLASSUI-T-ASKS.md`**
(`letters/GLASSUI-T-ASKS.md:63`, titled "the keyframes note — a SEPARATE dispatch to the
keyframes.js inbox"). T.md §7.1 (`T.md:374`) and W7 (`T.W7.md:13`) correctly call it "the KF
note (in the T letter)". So the SYNTHESIS's "separate letter" language does not match the
artefact (which is a note-section, dispatched separately to a different inbox).

Compounding: the W0-1 hard gate #1 (`T.W0.md:100`) says the KF letter is "never folded into the
glass-ui **letter**" — but the §KF note **is** physically in `GLASSUI-T-ASKS.md`, the glass-ui
letter *file*. The precise, non-contradictory word is **packet** (which SYNTHESIS §4 `:410` and
the letter itself `:30` both use: "PRM-expand routes to keyframes, never the glass-ui **packet**").
The intent is sound and consistent (KF dispatches separately to the keyframes inbox); only the
noun drifts between "letter"/"note" and "letter"/"packet".

**Corpus location**: `SYNTHESIS.md:269,402` · `T.W0.md:100` · (correct usage: `T.md:374`,
`T.W7.md:13`, `letters/GLASSUI-T-ASKS.md:63`).
**Proposed amendment**: in SYNTHESIS §3 W0-1 and §4, rename "the KF letter"/"keyframes letter" →
"the KF note (a separate keyframes-inbox dispatch, carried in the §KF section of the letter)"; and
change W0-1 gate #1's "never folded into the glass-ui **letter**" → "…the glass-ui **packet
series** (P1–P10)". Aligns the four sites to the artefact + the consolidation law's own noun.

---

## N-2 (NOTE) — status-line convention seam: W0–W4 say "PENDING — DEVELOPMENT ONLY"; W5–W9 say "AUTHORED — development only; the dispatch gate is CLOSED"

**Evidence.** Two clearly-distinct status templates split the wave set exactly at the W4/W5
boundary:
- `T.W0..W4.md`: `**Status**: PENDING — DEVELOPMENT ONLY; waves dispatch only post-ratification
  (E-6).`
- `T.W5..W9.md`: `**Status**: AUTHORED — development only; the dispatch gate is CLOSED until the
  T.md §12 owner ratification (E-6). Post-ratification: PENDING, gated on …`

Both describe the same pre-ratification state, so no content is wrong — but a two-word split at a
clean wave boundary is a fingerprint of two authoring batches (W0–W4 in one pass, W5–W9 in
another), which is precisely the kind of session-seam the owner flagged. Worth harmonising so a
reader does not infer a status difference where none exists.

**Corpus location**: `T.W0.md:20`, `T.W1.md:23`, `T.W2.md:24`, `T.W3.md:22`, `T.W4.md:25`
(PENDING) vs `T.W5.md:19`, `T.W6.md:19`, `T.W7.md:25`, `T.W8.md:22`, `T.W9.md:21` (AUTHORED).
**Proposed amendment**: adopt one status vocabulary across all 10 — the W5–W9 form
("AUTHORED … dispatch gate CLOSED … Post-ratification: PENDING, gated on <predecessor>") is the
richer and more accurate one; back-port it to W0–W4.

---

## N-3 (NOTE) — SYNTHESIS §3 T.W5's "R1–R5/R9–R11" Tranche-A enumeration omits R8 by number; the wave doc correctly de-references it to "R1–R5 / R8 / R9–R11"

**Evidence.** SYNTHESIS §3 T.W5 (`SYNTHESIS.md:326-328`): "Tranche A = retune rows
**R1–R5/R9–R11** + the card cartoon adoption + skeleton→content settle; Tranche B = R6/R7". Read
by number alone, R8 is unassigned. T.W5 (`T.W5.md:43-47`) correctly resolves the prose
("skeleton→content settle" ≡ retune-table row **R8**, Tr.=A) and states Tranche A =
"**R1–R5 / R8 / R9–R11**". This is a *faithful and improving* de-reference (the wave doc is
right; R8 must land in Tranche A, since only R6/R7 are Tranche B) — flagged only so a future
amend reconciles the source: SYNTHESIS's own enumeration is looser than its wave doc.

**Corpus location**: `SYNTHESIS.md:326-328` (source) · `T.W5.md:43-47` (correct resolution).
**Proposed amendment**: change SYNTHESIS §3 T.W5 to "Tranche A = retune rows **R1–R5 / R8 /
R9–R11**" so the numbered set is complete without relying on the prose alias.

---

## Already covered by a sibling lane (not re-filed)

- **SYNTHESIS §3 T.W7 "alpha-checker + `.underline-tabs` MARKER" vs the wave doc's "A6
  `backdrop-filter:none` MARKER"** (`SYNTHESIS.md:358` vs `T.W7.md:71`): `alpha-checker` is the
  legacy-sweep-lane name for the F7 marker (`t-legacy-sweep.md:323` "alpha-checker `backdrop-filter`
  MARKER"), i.e. `alpha-checker ≡ A6/F7`, so the rename is faithful. This exact drift is already
  reported at **`hardening/h-wave-w6-w7.md` NOTE-9** — not re-counted here.

---

## What was checked and found CLEAN (the audit trail)

- **Zero dropped items**: every SYNTHESIS §3 wave item (W0-1..6 · W1-{demo,api,src} · W2-1..5 ·
  W3-1..5 · W4-1..7 · W5 R1–R11 · W6-1..8 · W7 walk · W8 · W9) appears in its wave doc.
- **Finding→wave map**: SYNTHESIS §1.2 (T-1..T-29) ≡ T.md §1 routing digest, row-by-row (incl.
  the joint-packet parentheticals +P1/+P3/+P5/+P6/+P7/+P10). No T-# double-assigned to conflicting
  waves; the intentional splits (T-23 material→W3-4 / geometry→W4-7; T-13 shadow→W3-2 /
  material→W3-1) are consistent in both directions.
- **R1–R11 retirement ledger + class census**: byte-identical between SYNTHESIS §1.1 and T.md §4
  (only the R7/R8 D-label additions of SF-2, and R7's "(D9; SYNTHESIS §2.7)" cross-ref).
- **D1–D10 doctrine**: all ten present in T.md §2, near-verbatim to SYNTHESIS §2.
- **Fleet finds** (MOB-1/2 · CC-1 · A11Y-F1..F4 · LEG-1..9 · PI-1..6 · DOC-1..13): all present in
  T.md §1 digest.
- **Numeric fidelity**: ×φ landings, T-26 Q2 composition, R5 netting band, O-19 floors, all §6.2
  budgets + suite counts + the LHCI run-of-record — consistent across SYNTHESIS ↔ T.md ↔ the
  wave docs.
- **Shot-map corrections** (SYNTHESIS §1.0): T.md §1 (`:76-81`) reproduces the corrected +1-shift
  map faithfully.
- **One-line thesis** "(SYNTHESIS, verbatim)" (`T.md:9`): the italicised sentence — the only span
  the verbatim claim covers — is verbatim; the trailing paraphrase is outside the claim. CLEAN.

---

## Appendix — the 13 substantive AMENDED-AT-PASS-2 amendments, each verified reflected

| # | SYNTHESIS site | Amendment | Reflected in corpus |
|---|---|---|---|
| 1 | §2 D2 (`:139`) | ×φ = owner-word re-cut, ratified via Q11, never assumed | T.md §2 D2 `:123`; W4-1 `:58` |
| 2 | §2 D5 (`:177`) | console WELL = re-cut of "little glass card", via Q4 | T.md §2 D5 `:159`; W4-4 `:61` |
| 3 | §3 W0-4 (`:272`) | docs-truth F5: `docs/colors/`, `assets/docs` = 11 pages | T.W0 `:43`; W0 gate #4 `:105` |
| 4 | §3 W1-src (`:283`) | Q15 promotions = semver-MINOR additions ("byte-stable" retracted) | T.W1 `:44`; T.md §3.1 `:252` |
| 5 | §3 W4-7 (`:323`) | rest-floor re-judged; W3-4 calibrated parallel to the boot fix | T.W4 W4-7 `:64` |
| 6 | §3.2 W6 map (`:334`) | W6 single-writer map total over 8 items (W6-1 was unassigned) | T.md §3.2 `:282`; T.W6 `:5,41` |
| 7 | §4 P7 (`:398`) | `.underline-tabs` MARKER STAYS until the `underline` variant/migration | letter P7 `:58`; T.md §7.2 `:405` |
| 8 | §4 P9 (`:400`) | `/easing` 17th-subpath GAP-3 verify-watch rides P9-J3 | letter P9 `:60`; T.md §7.2 `:406` |
| 9 | §5.4 (`:481`) | E-1 totality proof (§5.4) | T.W1 `:74`; T.md §5.4 pointer |
| 10 | §6.2 (`:528`) | per-wave CSS TRIPWIRE (delta ledger advisory-only) | T.md §6 `:349`; W3/W4/W5 gates |
| 11 | §8 Q4 (`:575`) | sliders console = rung-2 WELL, owner re-cut | T.md §12 Q4 `:516` |
| 12 | §8 Q5 (`:576`) | Palettes form: package LEADS with owner letterform reading | T.md §12 Q5 `:517`; W6-4 `:56` |
| 13 | §8 Q11 (`:582`) | ratifying Q11 ratifies ×φ | T.md §12 Q11 `:523` |

(The 2 further AMENDED-AT-PASS-2 tokens in SYNTHESIS — `:17`, `:598` — are meta-references to the
pass, not amendments.) **All 13 substantive amendments are present in the corpus; none dropped.**
