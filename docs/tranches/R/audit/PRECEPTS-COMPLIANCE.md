# Precepts Compliance Certification — Tranche R corpus

**Certifier verdict: CLEAN — fully pursuant.** Every one of the 24 MUST rows in
`PRECEPTS-CHECKLIST.md` verifies against the amended text of every in-scope corpus
file. The three compliance lanes (C1-charter / C2-truth-waves / C3-design-close)
landed all their declared fixes; each is confirmed present in the working tree.
A diff-sense pass against the ratification commit `8169956`
(`git diff 8169956 -- docs/tranches/R`: +390 / −50) confirms every edit is FORM only
— no ratified substance and no `file:line` anchor was altered. The 50 deleted lines
are all line-level rewrites (item retitles `### 1 ·` → `### R.W1.1 ·`, goal/completion
splits, gloss insertions); every anchor in a deleted line reappears intact in its
replacement.

Method: read the precepts working tree (the two UNCOMMITTED edits — `SPEC.md`
π-before/after + compare-at-close, and `LESSONS-LEARNED.md` single-snapshot-π entry —
are the latest intent and were verified against, plus commits `f27627e` paired
goal+completion and `a59c60d` explication/anti-jargon, the two that postdate corpus
authoring and are the likeliest gaps). Then every MUST + STYLE row checked against
`R.md`, `PROGRESS.md`, `waves/R.W0-W2` + `W3/W4/W6/W7`, and both letters.

Scope: writable `docs/tranches/R/**` only. `docs/precepts/` read-only. Historical
audit docs (pass1, pass2, DEVELOPMENT-FIDELITY.md, RATIFICATION-2026-07-03.md) are
records, not compliance targets — excluded.

---

## MUST-row × file matrix

Legend: ✓ satisfied · n/a not applicable to that file · — row is not file-scoped.
"gov" = governed and satisfied at that file. Files: R = R.md · P = PROGRESS.md ·
W0..W7 = the seven wave docs · Lg = letters (GLASSUI-RELAY + KF-VALUEJS).

| Row | R | P | W0 | W1 | W2 | W3 | W4 | W6 | W7 | Lg | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 paired goal+completion @ every unit | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | PASS |
| M2 10-item Plan Shape in order | ✓ | — | — | — | — | — | — | — | — | — | PASS |
| M3 number AND name; no bare W<N> | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| M4 wave-spec required sections | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | PASS |
| M5 agent units named + paired | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | PASS |
| M6 gates close on artefacts | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | PASS |
| M7 six-agent ceiling; disjoint bounds | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | PASS |
| M8 substrate with same-wave consumer | ✓ | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | PASS |
| M9 brittleness window declared | ✓ | — | — | ✓ | — | — | — | — | — | — | PASS |
| M10 DEGRADED close named restoration | ✓ | — | — | — | — | — | — | — | — | — | PASS (none ship DEGRADED) |
| M11 zero-deferral; exact successor | ✓ | ✓ | — | — | — | — | — | — | ✓ | ✓ | PASS |
| M12 goal reconciled at close | ✓ | — | — | — | — | ✓ | ✓ | — | ✓ | — | PASS |
| M13 wire before retire + spot-verify | — | ✓ | ✓ | — | ✓ | — | ✓ | — | — | — | PASS |
| M14 π lane paired, binding | — | — | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | PASS |
| M15 ι integrity sweep close step | — | — | ✓ | — | — | — | — | — | ✓ | — | PASS |
| M16 cross-repo coordination artefact | ✓ | ✓ | — | — | — | — | — | ✓ | — | ✓ | PASS |
| M17 dev-resolution follows contract-v2 | ✓ | — | ✓ | ✓ | — | — | — | — | — | ✓ | PASS |
| M18 no proof:* grep gates; no bloat | ✓ | — | — | ✓ | ✓ | — | — | ✓ | ✓ | — | PASS |
| M19 research challenged before synth | ✓ | ✓ | — | — | — | — | — | — | — | — | PASS |
| M20 no shadow exec; retro plan-folder | ✓ | — | ✓ | — | — | — | — | — | — | — | PASS |
| M21 wave-close discipline (cadence) | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | PASS |
| M22 scope-reveal governs dilation | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | PASS |
| M23 close-honesty checklist pre-close | ✓ | — | — | — | — | — | — | — | ✓ | — | PASS |
| M24 every item explicates WHAT+WHY | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| S1 prose voice / no banned words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| S2 no AI-writing signs | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| S3 cross-ref by what it IS | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| S4 meta-terms glossed first use | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| S5 no duplicated shared precepts | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |

---

## The two postdating precepts (called out by STATE as likeliest gaps)

**`f27627e` — paired goal criterion + completion criterion at every unit level (M1/M12).**
- Tranche level: `R.md` carries `**Goal criterion.**` + `**Completion criterion.**`;
  the completion criterion now folds "FINAL.md also reconciles each wave's goal
  criterion … gates-pass with goal-unmet closes `complete_with_misses`."
- Wave level: every wave doc carries `§Goal criterion` + `§Completion criterion`.
- Sub-wave level: R.W0.1, R.W1.1–.7, R.W2.1–.6 each carry the four-bullet
  Goal/Mechanism/Files/Sub-gate block. The single-agent design/close waves
  (R.W3/W4/W6/W7) declare in their State `Agents` line that the wave §Goal/§Completion
  pair IS the unit-level Goal/Sub-gate pair; R.W3 and R.W4 completion criteria carry
  the explicit `complete_with_misses` clause.
- Close: R.W7 item 6 folds the per-wave goal-criterion reconciliation into FINAL.md.

**`a59c60d` — explication discipline + abrogate meta-jargon (M24/S3/S4).**
- M24: R.md §10 ledger carries the routing-index note ("each ID's WHAT + WHY … lives
  in the owning wave doc's item table"); wave item tables carry WHAT + Why columns.
- S3: the §10 W4 row glossed "(the card/shell/pane-bearing U-rows)"; R.W7 "(the
  never-fired-first-wire carry, catalogued as CH-14a + audit-carry A5)"; the KF letter
  KF-2 "(the parse-that `^1.0.0` cut the re-pin waits on)".
- S4: triumvirate, book/BOOK, π lane, ι, PRM, rAF, JND, kf, kC glossed at first use
  across the waves and both letters.

**Working-tree SPEC.md / LESSONS-LEARNED.md (M14 π before/after + compare-at-close).**
Verified against the UNCOMMITTED submodule edits (the latest intent):
- R.W3 / R.W4 §Verification artefacts name the paired `{baseline,close}` archive +
  per-page `DELTA.md`, ≥3 viewports light+dark, animation-timing samples, contrast
  measurement, and the WebGL/canvas present/positioned (DOM-rect + non-empty-pixel)
  assertion — the exact disappearing-blob regression class the LESSONS-LEARNED entry
  catalogues.
- R.W6 authors the backend/doc-only π skip justification in-spec.
- R.W7 item 6 folds the π compare-at-close reconciliation ("any unintended delta
  resolved, not noted, before close") — matching the working-tree SPEC.md close edit
  verbatim in intent.

---

## Violations found / fixed by this certifier

**None.** No mechanical straggler survived the three lanes. Spot scans returned clean:
- Banned-word scan (S1: delve/tapestry/robust/leverage/pivotal/showcase/landscape/
  intricate/realm/underscore/testament/seamless) across all in-scope files → zero hits.
- Bare-`W<N>` scan (M3) → remaining hits are DAG-edge shorthand ("W4 → W7 directly"),
  range notation ("N.W10–W18"), and work-order IDs ("W0-1") — none is a standalone
  named-wave reference; the load-bearing ones were named by C1/C3.
- Ratified anchors present: `GAMUT_ALPHA = 1.0` (R.md, PROGRESS, R.W1); hero-lab KILLED
  (R.md §2/§10/§12, PROGRESS, R.W2.6, R.W3 hand-off, R.W4 hand-off, R.W7); X2 in-W7
  (R.md §3/§12, PROGRESS, R.W7 item 2 + gate); `App.vue:115`, `deploy-pages.yml:11-13`,
  the KF-1 5-file table, the retro-tag table — all intact.

## Substance-vs-precept tensions recorded

**None.** The precepts govern FORM; no compliance edit needed to touch ratified
substance to satisfy a MUST row, and none did. The design waves R.W3/R.W4 carry many
lane items under a single serial agent unit; the C3 disposition — treat the wave as one
agent unit whose §Goal/§Completion is the unit pair, with the lane tables as M24
item-level WHAT/WHY carriers — is the correct reading of M1/M5 for a single-dispatch
Fable design lane and introduces no tension with the six-agent-ceiling family (M7).

---

*Certified in the amended text (lesson-4 discipline), diff-sensed against `8169956`.*
