# T — PROGRESS

**Status board.** T is **DEVELOPED + HARDENED — AWAITING THE §12 OWNER RATIFICATION (the 19-row
slate: Q1–Q18 with Q11a/Q11b — CHANGED-AT-HARDENING from Q1–Q17)**. The
governing specification is `audit/SYNTHESIS.md` **AS-AMENDED (pass-2, `2a38c11`; hardening pass
2026-07-09 — `audit/hardening/VERDICT.md`, SOUND-WITH-AMENDMENTS, all 34 MUSTFIX folded)**; the charter
(`T.md`) transcribes it; `MANDATE-2026-07-06.md §0` + addenda §0.1–§0.4 are VERBATIM LAW over
everything. "This is NOT an implementation phase. Tranche development only." The owner's
verbatim rulings will be encoded in `audit/RATIFICATION-<date>.md` whose §0 wins over the whole
corpus (the S precedent, `S/audit/RATIFICATION-2026-07-05.md`).

**DISPATCH GATE: CLOSED.** No wave dispatches until every `T.md §12` row (the 19-row slate,
Q1–Q18 incl. Q3b/Q11a/Q11b) is ruled.
At ratification: the gate opens per the §3 DAG (each wave gated on its DAG deps only), and the
**GLASSUI-T-ASKS letter dispatches immediately (W0-1, the Q7 default)** — the dispatcher
re-stamps the verified glass-ui HEAD (the letter carries the literal `<RE-STAMP AT DISPATCH>`
placeholder), P9 named FIRST (W-1/W-2 are OPEN but LAST).

**Substrate (verified at corpus authoring):**
- Branch `tranche-t` @ `2a38c11`; source tree byte-identical to master `cc4f4fa` (tag
  `tranche-s-close`) — the whole T delta is docs-only (re-verified by t-plan-audit-1/2 +
  t-deferred-census). value.js **3.1.0** on the registry (`latest`).
- Siblings (read-only): glass-ui `file:`-dep on `tranche/BG` (labelled 4.2.0 → the joint BG/BH
  **5.0.0**; fleet-census stamp `19ddbd71`, corpus-completion observation `6605e1dd` 2026-07-09
  — the producer moves daily; the consumed dist is a gitignored local build, G-CUR-1) ·
  keyframes.js @ `5addc4a` · CI stays pinned to `tranche/BG` (R.W7 `102b37b`) until the 5.0.0
  master landing · parse-that 2.0.1 · fourier: nothing new on T's account.
- Suites at synthesis: vitest 2158/68 files green · playwright 38/39 + 1 known contention-class
  flake (gradient drag) · api 224/37 + tsc 0. Lighthouse run of record `28836873580`: LCP
  5563ms / TBT 5618ms — HONESTLY RED (disposition = Q14).

---

## Round structure (T.md §3; dispatches only post-ratification)

```
round 0:  T.W0 substrate · oracle floor · packet dispatch
round 1:  T.W1 colocation grand restructure (W1-demo ∥ W1-api ∥ W1-src — single-writer trees)
round 2:  T.W2 boot overture + living field ∥ T.W3 material ladder · neutrals · ink
round 3:  T.W4 the picker recomposition (the C1 knot — ONE wave, forced order)
round 4:  T.W5 motion liquid ∥ T.W6 surfaces & shell
round 5:  T.W8 E-7 hardening/critique
close:    T.W9
T.W7 (the 5.0.0 ADOPT) — trigger-gated on the glass-ui BG/BH joint cut; FLOATS into whatever
round is current when it fires; NOT on the critical path (PP-5: books never gates).
```

Intra-round laws (binding, `T.md §3.2`): W1's three lanes are disjoint single-writer trees
(W1-demo migration order churn-minimizing; W1-src dogfood-keystone FIRST, L1 brand LAST) ·
W2 ∥ W3 disjoint surfaces (boot chain vs materials; W2-5 after W2-1 per C4) · W4 forced order
(W4-1 → W4-2 → W4-5 → W4-4+W4-7) · W6's single-writer map total over all 8 items · PP-8 sweep +
PI-1 Lighthouse delta in EVERY wave gate · the §6.2 CSS tripwire REDS W3/W4/W5 at >120 KiB gz ·
PP-11 wave-open re-anchoring against the W1 MOVE-MAP.

---

## Wave status

Per-wave item tables, gates, dispatch, and evidence packets: the wave docs (`waves/T.W*.md`)
author on their own corpus lanes; until each lands, **SYNTHESIS §3 is the wave spec of record**.

| Wave | Title | Doc | Round | Status | Publishes |
|---|---|---|---|---|---|
| **T.W0** | SUBSTRATE · ORACLE FLOOR · PACKET DISPATCH (W0-1..W0-6) | `waves/T.W0.md` | 0 | **PENDING-RATIFICATION** | — |
| **T.W1** | THE COLOCATION GRAND RESTRUCTURE (W1-demo · W1-api · W1-src) | `waves/T.W1.md` | 1 | **PENDING-RATIFICATION** (sequencing = Q1) | Q15 promotions = expected semver-MINOR additions |
| **T.W2** | THE BOOT OVERTURE + THE LIVING FIELD (W2-1..W2-5) | `waves/T.W2.md` | 2 | **PENDING-RATIFICATION** (Q2 landing point) | — |
| **T.W3** | THE MATERIAL LADDER · NEUTRALS · INK (W3-1..W3-5) | `waves/T.W3.md` | 2 | **PENDING-RATIFICATION** (Q4/Q9 rungs) | — |
| **T.W4** | THE PICKER RECOMPOSITION (the C1 knot, forced order) | `waves/T.W4.md` | 3 | **PENDING-RATIFICATION** (Q3/Q11) | — |
| **T.W5** | MOTION LIQUID (T-14; PI-5 two-tranche split) | `waves/T.W5.md` | 4 | **PENDING-RATIFICATION** (Tranche B strictly PKT-3-gated) | — |
| **T.W6** | SURFACES & SHELL (W6-1..W6-8) | `waves/T.W6.md` | 4 | **PENDING-RATIFICATION** (Q5/Q12) | — |
| **T.W7** | THE ADOPT EVENT (= S.W8 handed intact) | `waves/T.W7.md` | trigger | **PENDING-RATIFICATION + TRIGGER NOT FIRED** (glass-ui registry 4.2.0, no v5 tag at authoring) | — |
| **T.W8** | E-7 THE HARDENING/CRITIQUE WAVE (depth = Q6) | `waves/T.W8.md` | 5 | **PENDING-RATIFICATION** | — |
| **T.W9** | CLOSE (the S close machinery inherited) | `waves/T.W9.md` | close | **PENDING-RATIFICATION** | — |

---

## BOOKS (books, never gates — the full routing table with triggers + dispositions is `T.md §7`)

Inherited from S (`S/FINAL.md §5`, re-routed — CHRONIC rows flagged in `T.md §5`): glass-ui
5.0.0 adopt (→ W7) · CI un-pin + L17 `Blob` rename (→ W7) · GAP-ARM (P1 + **W2-1 demo half,
NOT producer-gated**) · GAP-L2 (P1, sized by the T-26 bracket) · GAP-L5 (P6 + W4-5/W2-4) ·
PRM-expand (KF note) · L20+RP-2 (P9 + W7, land TOGETHER) · the L2..L16 open set (re-asked BY
NAME, P1/P3/P7; **L8 = 5th booking, ESCALATED**) · S-3 letter-rail FIRED (→ P5 MANDATED) ·
**X1** prod-api deploy + **X2** NCSU alias (maintainer residuals, W9 + O-25) · the L1
Normalized/Display brand (→ W1-src LAST) · `Color.try()` PARK · S.H3 Pratt KEEP-DORMANT ·
dup-`useDark`/PI-DRIFT-1 (W1-demo cargo) · TA-4 api-hygiene (W1-api, Q8) · `usePaletteStore`
DORMANT · `proof:*` carry (→ W0-2, Q13) · doc-truth DOC-1..13 (W0-4 + W9) · oracle-floor
F3/F4 (→ W0-5, MUST precede W2) · the FN-7/kf-resolveEasing/CH/R8/R cross-repo set (W9
recheck). T-minted books (interim→producer swap set + watches): `T.md §7.2`.

---

## Cross-repo dispatch points

| Event | When | Status |
|---|---|---|
| **GLASSUI-T-ASKS letter** (packets P1–P10; P9 = the W-1/W-2 freeze-window payload, named FIRST; PKT-1 dist-clobber = the motion P0; hard-seam map in-letter) | **at T ratification (W0-1, Q7 default)** — the W-3 behavior packets unblock T's own waves via the file:-pin; W-1/W-2 are OPEN but the LAST window. The dispatcher **re-stamps the verified glass-ui HEAD at dispatch** (`<RE-STAMP AT DISPATCH>` placeholder in the letter; authoring stamps `19ddbd71`/`6605e1dd` — the producer moves daily) | **AUTHORED, dispatch-gated on ratification** — `letters/GLASSUI-T-ASKS.md` |
| **KF note** (PRM-expand re-cite, `managed-play.ts:48-59`, re-verified UNCHANGED 2026-07-07) | with the W0-1 dispatch — routed to the keyframes inbox, never the glass-ui letter (the consolidation law) | **AUTHORED** — carried in `letters/GLASSUI-T-ASKS.md §KF` |
| parse-that / fourier | — | nothing new on T's account |

---

## Event log

| Date | Event |
|---|---|
| 2026-07-06 | **THE OWNER MANDATE** — the owner probed the live S build on :9000 the evening of the S close and delivered ~24 findings with 21 screenshots + the colocation grand edict; encoded verbatim at `MANDATE-2026-07-06.md` (`5fc8329`), then four addenda: T-25 boot/aurora quality (`da799f2`) · E-7 hardening stage (`d4e435f`) · T-26 bracket-close + T-27 gray/slow/jittery (`f700d80`) · T-28 dot outline + T-29 clipped pseudo-dropdown (`53336eb`). Development-only, ratification-gated |
| 2026-07-06→07 | **The 36-lane audit fleet** completed against the live tree (`audit/lanes/`, 37 lane docs, 37 commits `8a0b16e`..`b7526e5`; t-plan-audit-2 completed at `4196b50`): every owner finding root-caused (shot-map +1 mislabel caught by three lanes independently); the owner-overrule set classed A/B/C/D; the E-4 deferred census; the colocation program (demo/api/src); the packet SHAPE census; the oracle-gap audit; the mobile/a11y/perf/doc-truth sweeps |
| 2026-07-07 | **SYNTHESIS authored** (`0b960dc`): the converged specification — finding→item map (T-1..T-29 + fleet), spec-retirement ledger R1–R11, the 10-move design doctrine, the 10-wave DAG (colocation-first Q1 default), the P1–P10+KF packet series with freeze windows, the E-1 program + §5.4 totality, the O-1..O-25 oracle slate + carried budgets, the E-4 fold table, the Q1–Q17 ratification table |
| 2026-07-07 | **SYNTHESIS pass-2** (`2a38c11`): 3-critic amendments folded — both mustFixes (W1-src dts gate additive-only per Q15; the W6 single-writer map made total) + 11 shouldFixes (the owner-word re-cut ledger: T-5 glass→WELL rides Q4, T-2 1.5→×φ rides Q11, Q5 leads owner-verbatim; §5.4 E-1 totality; per-wave CSS tripwire; W4-7 rest-floor re-judge) + §9 dissents (Q10 no-change). **This is the spec of record** |
| 2026-07-09 | **T corpus authored**: `T.md` charter (the mandate binding, the doctrine, the wave DAG + single-writer laws, the R1–R11 retirement ledger, the BOOKS routing, the process laws, **§12 = the Q1–Q17 ratification table transcribed VERBATIM**) + this board + `letters/GLASSUI-T-ASKS.md` (P1–P10 + the KF note, freeze-window-bound, re-stamp-disciplined). PP-14 exercised: a prior corpus lane died on a session limit leaving an untracked `T.md` partial — audited row-by-row against the spec (Q-table verbatim-diffed, R-ledger verbatim-diffed, routing digest re-checked against SYNTHESIS §1.2), found faithful, completed. **Status: DEVELOPMENT COMPLETE at the corpus level — wave docs author on their own lanes; the dispatch gate stays CLOSED awaiting the `T.md §12` owner ratification (Q1–Q17)** |
| 2026-07-09 | **The wave corpus landed** (`9d0d6b1` W0–W4 + `9b221f9` W5–W9): all ten wave docs authored on the S-template grammar, SYNTHESIS-as-amended transcribed. The corpus is now WHOLE — charter + board + letter + 10 wave docs; the dispatch gate stays CLOSED |
| 2026-07-09 | **Fidelity critic passed** — score **97**, mustFix **none**, one shouldFix FOLDED: `T.md §4`'s header softened to "transcribed with cross-refs resolved" and the R7/R8 cells now carry their SYNTHESIS sources (`D9; SYNTHESIS §2.7` · `D1; SYNTHESIS §2.1`) — both resolutions verified CORRECT against SYNTHESIS §2's D-labels (D9 = the shadow-palette MOTION axis, D1 = material-ladder rung-1), so the transcription delta is self-documenting. Nothing rejected → no §13 dissents owed |
| 2026-07-09 | **THE HARDENING PASS (the owner's interruption charge answered)** — a **31-lane adversarial fleet** (`audit/hardening/h-*.md`: 4 seam-audit · 5 evidence · 5 wave-pair · 4 refinement-design · 3 execution-readiness · mandate-trace/owner-words/q-table/precepts/packets/books/dag/oracle-slate/overrule-ledger/corpus-diff/gaps/budget/recovery) + the **VERDICT synthesis** (`audit/hardening/VERDICT.md`): ruling **SOUND-WITH-AMENDMENTS** — the six session-limit walls did NOT corrupt the corpus's substance (product tree byte-identical to S-close; the recovered artefacts verify claim-by-claim; the measured design corpus reproduces to the digit; §12 was byte-verbatim; 23/23 books; 13/13 pass-2 amendments present); the interruption damage proper = 3 committed tool-XML seams (incl. one the hardening fleet itself shipped), 1 frozen-substrate claim, phantom cross-refs, and 3-way count drift — all mapped. **34 consolidated MUSTFIX + ≈90 SHOULDFIX + the Q-table delta + 11 gap dispositions.** |
| 2026-07-09 | **THE AMEND PASS (this fold)** — every VERDICT §2 MUSTFIX folded in place (AMENDED-AT-HARDENING) across SYNTHESIS/T.md/waves/letter/lanes in 6 path-scoped commits; **the §12 slate goes 17 → 19 rows** (Q11→Q11a/Q11b — the owner's own "1.5×" number unbundled; Q5's DEFAULT re-cut owner-verbatim-first; NEW **Q3b** blob-z; NEW **Q18** C3-law + neutral-family; Q15 5→7; + 2 annexes + annotations — CHANGED-AT-HARDENING-marked); **the §Recovery rider** (PP-14/PP-15 operationalized) lands as standing wave law in `T.md §8` + a per-type §Recovery section in all 10 wave docs + the standing tool-artefact grep; the 3 XML seams stripped; the census/packet/evidence corrections landed (M-27/28/33 etc.); accepted §3 SHOULDFIXes folded; VERDICT §5's six dissents recorded as notes on their lanes; `err.log` deleted (G-12). **The ratification STOP is now safe to put to the owner: the package spec + sanctioned probe environment ride the §12 preamble.** |
