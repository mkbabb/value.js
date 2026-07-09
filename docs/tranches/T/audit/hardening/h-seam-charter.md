# Hardening lane h-seam-charter — the completed-from-partial T.md charter, seam-audited against its sources of record

**Lane charge**: T.md was COMPLETED FROM AN UNTRACKED PARTIAL (the charter lane died mid-write on
a session wall; a second lane audited-and-kept it — PP-14, `PROGRESS.md` 2026-07-09 row). This lane
independently diffs every T.md section against its declared source of record, hunting drift the
self-audit missed. Adversarial posture: a clean bill requires evidence, not absence of alarm.

**Method**: byte- and word-level diffs (scratch-scripted, not eyeballed) of §12↔SYNTHESIS §8,
§4↔SYNTHESIS §1.1, §3↔SYNTHESIS §3, §7↔SYNTHESIS §7 + `S/FINAL.md §5`, §8↔`t-precepts-recap §E`,
§9↔`S.md §13`; plus §1 routing-digest↔SYNTHESIS §1.2, §2 doctrine↔SYNTHESIS §2, §3.1 oracle
assignments↔SYNTHESIS §6.1, §6 budgets↔SYNTHESIS §6.2, §1 edict index↔`MANDATE §2`, and the
substrate HEAD-stamps live-verified. HEAD at audit: `12cb302`.

---

## Verdict

The completed charter is **HIGH-FIDELITY**. Every load-bearing table transcribes its source with
zero dropped content; the two documented deltas (the §4 R7/R8 cross-ref resolution) are correct;
all 23 inherited S books map into §7 with zero drops; the 17-Q ratification table is **byte-identical**
to SYNTHESIS §8. The suspect seam left exactly **one** actionable residue — a phantom cross-ref the
fidelity fold disclosed but did not fully cure — plus process/numbering NOTES. **0 MUSTFIX · 1 SHOULDFIX.**

**What was verified faithful (evidence-backed clearance, not silence):**
- **§12 vs SYNTHESIS §8**: 17 Q-rows + header row **byte-identical** (`diff` clean). The self-audit's
  "Q-table verbatim-diffed" claim holds.
- **§4 R1–R11 vs SYNTHESIS §1.1**: identical modulo the documented R7/R8 resolution (see F1) and a
  benign class-census prose expansion ("§6 exists to fix it" → "the §6 oracle slate exists to fix it").
- **§7.1 books vs SYNTHESIS §7 + `S/FINAL.md §5`**: all 23 S-close books present, **zero drops**;
  differences are cosmetic expansions ("maintainer"→"maintainer-on-host/-VPN", "park"→"PARK",
  "KF letter"→"KF note (in the T letter)"). **§7.2 T-minted books** are charter-authored (no §7.2 in
  SYNTHESIS) — every one of the 13 rows traces to a real SYNTHESIS §3/§4 booked-swap source (W3-1
  `--well-bg`, W4-4 seal-recipe/P5, W6-3 regex-drive/P7, R1 EXPECTED-RED/PKT-1, Tranche B/PKT-3,
  underline-tabs MARKER, /easing GAP-3/P9-J3, etc.). No fabricated book.
- **§8 precept slate vs `t-precepts-recap §E`**: PP-1..PP-16 + PR-1..PR-8 one-line text **exact**;
  only additions are "(NEW, S-minted)" on PP-8/9 and the dropped provenance column (a "compact" quick-ref).
- **§9 lessons vs `S.md §13`**: the 11-lesson condensation is faithful (S §13 confirmed = exactly 11,
  #11 = "Breaking changes are fine: always → cut the major"); T-development additions 12–18 are
  charter-authored and consistent with §1.0/§1.1/§6.1/§9-dissents.
- **§1 routing digest vs SYNTHESIS §1.2**: all 29 T-# rows + the fleet-find digest (MOB/CC/A11Y/LEG/PI/DOC)
  match; T-9→"W6-6+W1-api+W9(X1)", T-23→"W3-4→W4-7(+P3)", etc. all correct.
- **§2 doctrine D1–D10 vs SYNTHESIS §2**: D2–D9 identical; D1 differs only by inlining T-24's
  sanctioned-exception list (matches §1.2 T-24's row) and D10 by a line-wrap — plus the systematic
  "§X"→"SYNTHESIS §X" disambiguation (see F1, the pattern that produced the phantom ref).
- **§3.1 wave-slate oracle assignments vs SYNTHESIS §6.1**: no dropped gate — every wave's O-slate
  (W2: O-1..6/O-24; W3: O-7/9/11/18; W4: O-10/11/12; W5: O-16; W6: O-13..22; W7: O-8) matches the
  SYNTHESIS Wave column. **§3.2 single-writer laws** ("VERBATIM"): each law verbatim-lifted from its
  SYNTHESIS location (W1-demo migration order, W4 C1-knot forced order, W6 total map, PI-6 barrels).
- **§6 budget numbers vs SYNTHESIS §6.2**: JS 347.9/≤280, CSS 86.5/≤120/33.5, Lighthouse
  `28836873580` LCP 5563ms/TBT 5618ms, vitest 2158/68, playwright 38/39+1 flake, api 224/37+tsc 0 — **exact**.
- **§1 edict index E-1..E-7 vs `MANDATE §2`**: faithful condensation; E-7→T.W8 correct.
- **Substrate**: glass-ui HEAD-stamp `6605e1dd` (`tranche/BG`) **live-verified accurate** (T.md's
  "stood at `6605e1dd` at corpus completion" is true today).

---

## F1 — [SHOULDFIX] §4 R7/R8 cite phantom "SYNTHESIS §2.7"/"§2.1" headings that do not exist; the source SYNTHESIS §1.1 carries the dangling refs

**Corpus location**: `T.md:306` (R7) + `T.md:307` (R8); root at `audit/SYNTHESIS.md:56` (R7) +
`:57` (R8).

**Evidence.** T.md §4 R7 ends `…the loading-lie cure — re-cut on the MOTION axis (D9; SYNTHESIS §2.7)`
and R8 ends `…re-grounded at the picker's resting+cartoon rung (D1; SYNTHESIS §2.1)`. But
**SYNTHESIS §2 ("THE DESIGN DOCTRINE") is D-numbered D1..D10 — it has NO §2.n sub-headings**
(verified: `grep '^### §2\.'` → none). So "SYNTHESIS §2.7" and "SYNTHESIS §2.1" point at
headings that do not exist. The D-anchors themselves are **content-correct** (D9 = the shadow-palette
MOTION-axis grammar; D1 = the four-rung ladder / picker resting+cartoon rung), so the meaning is
recoverable — but the citation asserts a phantom location and lends it false "SYNTHESIS §…" authority.

**How the seam produced this.** The commit that "resolved" the cross-refs (`2db417e`) *knew* the
target was a D-label — its own message reads "**Both resolutions re-verified correct (SYNTHESIS §2
uses D-labels, not §2.n)**" — yet it still rendered "SYNTHESIS §2.7". The systematic
"§X"→"SYNTHESIS §X" disambiguation the charter applies correctly elsewhere (D1 exception list →
"SYNTHESIS §1.2"; D10 → "SYNTHESIS §5") was applied blindly to two section numbers the author
themselves acknowledged are not real. The root is upstream: **SYNTHESIS §1.1 R7/R8 themselves cite
bare `(§2.7)`/`(§2.1)`** — two dangling internal cross-refs in the spec of record.

**Proposed amendment** (the amend pass owns folding): correct the source first —
`SYNTHESIS §1.1` R7 → `…MOTION axis (D9)`, R8 → `…cartoon rung (D1)`; then `T.md §4` R7/R8
simplify to `(D9)` / `(D1)`. That makes T.md §4 byte-verbatim to a corrected source and removes
the phantom heading. (Alternatively, if provenance of the original phrasing must be kept, write
`(D9 — SYNTHESIS §1.1's "§2.7" resolves to the D9 block)` so no reader treats "§2.7" as a locatable
heading.)

---

## F2 — [NOTE] The PP-14 self-audit claimed the R-ledger was "verbatim-diffed, found faithful" — but the partial had already silently substituted §2.7→D9 / §2.1→D1

**Corpus location**: `PROGRESS.md:108` ("R-ledger verbatim-diffed … found faithful, completed").

**Evidence.** At PP-14 completion (`a3b35cf`) T.md §4 R7/R8 already read `(D9)`/`(D1)` while
SYNTHESIS §1.1 read `(§2.7)`/`(§2.1)` — a substitution a **strict byte-diff would flag** (and one
DID flag it a commit later, at `2db417e`, whose message says "a strict verbatim-diff no longer flags
a silent delta"). So the completion-time "verbatim-diffed, found faithful" claim over-stated the
rigor actually applied — the byte-diff either was not run or was run loosely on the R-ledger. This is
precisely the *suspect-seam* the owner flagged: a completed-from-partial artefact whose self-audit
asserted a verbatim check it did not fully perform.

**Mitigant (why NOTE, not SHOULDFIX):** the process self-corrected one commit later — the fidelity
fold caught and disclosed the delta. No corpus content is wrong as a result; only the self-audit's
description of its own rigor was inflated. **Proposed amendment**: none required beyond F1's cure;
carry as a lesson (the "verbatim-diffed" claim in a lane journal must name the tool/commit that ran
the diff, per PP-11/PP-12 discipline).

---

## F3 — [NOTE] §3 labels its DAG "(SYNTHESIS §3, verbatim)" but re-renders it — W7 is pulled out of SYNTHESIS's inline arrow-chain

**Corpus location**: `T.md:219` (the "verbatim" claim) + the block `T.md:221-226`; source
`audit/SYNTHESIS.md:235`.

**Evidence.** SYNTHESIS §3's DAG is one line:
`W0 → W1 → { W2 · W3 } → W4 → { W5 · W6 } → W7(trigger-gated, floats) → W8 → W9`.
T.md renders it as `T.W0 → … → { T.W5 · T.W6 } → T.W8 → T.W9` with **W7 lifted out of the chain**
into a separate floating paragraph. This is **not verbatim**. It is content-equivalent — and
arguably *more* correct: SYNTHESIS's inline `{W5·W6} → W7 → W8` mis-suggests W8 gates on the
trigger-gated (non-critical-path) W7, whereas T.md correctly draws W8 directly after {W5·W6}. It
also follows the S.md house-style precedent (`S.md §3.1` puts the trigger-gated S.W8 on its own
line in the block). But the inline "verbatim" label overclaims in a corpus where "verbatim" is a
load-bearing term of art (§12 genuinely is byte-verbatim; MANDATE §0 is VERBATIM LAW).

**Proposed amendment**: relabel `T.md:219` "(distilled from SYNTHESIS §3)" — OR correct
`SYNTHESIS:235`'s inline chain to float W7 (`{ W5 · W6 } → W8 → W9`, with W7 annotated separately),
so the two documents agree and the "verbatim" claim becomes true.

---

## F4 — [NOTE] §10 and §11 are absent — T.md jumps §1..§9 → §12; the gap is unexplained

**Corpus location**: `T.md` section headers (§9 at `:467`, next is §12 at `:504`).

**Evidence.** The charter runs §1–§9 then jumps to §12 (the ratification table). Nothing
cross-references a §10 or §11 (`grep '§1[01]'` → none), so there is no dangling pointer — the
charter is internally consistent. The `§12`/`§13` labels are inherited idioms from `S.md`
(S.md §12 = Q-table, §13 = lessons); the "§12 ratification gate" phrase is load-bearing corpus-wide
(`T.md:31`, `:62`; `PROGRESS.md:3,10`), so a renumber §12→§10 would be *destructive*. What the
partial's completion did was renumber lessons **from S's §13 to §9** (moving them *before* the
ratification table) while keeping the ratification table at §12 — leaving §10/§11 as silent gaps.
The self-audit did not flag the discontinuity.

**Proposed amendment**: add a one-line note at the §9→§12 boundary — e.g. "*(§10/§11 intentionally
reserved; the ratification table keeps the corpus-wide '§12 gate' number per the S.md precedent.)*"
— so a reader does not suspect a dropped section.

---

## F5 — [NOTE] §7.1 "GLASSUI-S-ASKS L2..L16 open set" range literally spans L4, which `S/FINAL.md §5` records as CURED

**Corpus location**: `T.md:376` (`GLASSUI-S-ASKS L2..L16 open set`); cf. `S/FINAL.md:112`.

**Evidence.** `S/FINAL.md §5` enumerates the open set as **L2·L3·L5·L6·L7·L8·L9·L10·L11·L12·L13·L14·L15·L16**
and states "**CURED by producer: L1, L4, L18**". The range shorthand "L2..L16" literally includes
L4 (cured) and reads as 15 items where the truth is 14. **This is faithful to SYNTHESIS §7** (which
uses the identical "L2..L16 open set" compression) — so it is *not* a charter-completion drift; the
per-item truth lives in `t-glassui-current`. Flagged only because the range notation is imprecise at
the boundary the owner will read.

**Proposed amendment** (optional, low priority): annotate "L2..L16 open set (L4 cured; exact
membership per `t-glassui-current`)" in both SYNTHESIS §7 and T.md §7.1, or leave as-is given the
detail table is one hop away.

---

## F6 — [NOTE · out-of-lane] keyframes substrate stamp `5addc4a` is stale vs live `cf9b268`

**Corpus location**: `T.md:23` + `SYNTHESIS.md:10` (both cite `../keyframes.js @ 5addc4a`).

**Evidence.** Live `../keyframes.js` HEAD is `cf9b268` ("T close" — the sibling repo's own tranche).
Both the charter AND its source of record cite `5addc4a`, so **this is not a charter-vs-source
fidelity defect** — the charter faithfully matches SYNTHESIS. It is producer-drift, covered by the
re-stamp discipline (`<RE-STAMP AT DISPATCH>`) and owned by the `t-glassui-current`/`-forward` lanes,
not this seam. Recorded for completeness; no charter amendment owed. (The glass-ui stamp `6605e1dd`,
by contrast, IS accurate live.)

---

*Provenance: all diffs scripted (scratch files retained during audit); section/line anchors are
against `T.md` @ `9d0d6b1`-era content (unchanged at HEAD `12cb302`) and `audit/SYNTHESIS.md`
(pass-2, `2a38c11`). Zero product-code or corpus edits made by this lane — findings only.*
