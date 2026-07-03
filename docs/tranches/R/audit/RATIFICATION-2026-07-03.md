# Ratification Certification — Tranche R (2026-07-03)

**Certifier**: ratification-certifier pass · **Date**: 2026-07-03 · **Verdict**: **CLEAN — CERTIFIED**
**Scope**: verify the owner ratification of 2026-07-03 is encoded corpus-wide in the R
tranche working tree (edits not yet committed). No structural defects; no mechanical fixes
required.

---

## §0 — Verbatim owner intent (as ratified)

> "hero lab is to be deleted. no ncsu alias. for all other items, fold and use your best
> judgment given our no workarounds discipline."

Encoded verbatim at `R.md:28` / `R.md:300` and quoted in the §12 ratification preamble.

---

## §1 — Outcomes table (the 8 ratified rows)

| Q | Question | OUTCOME (2026-07-03) | Encoded at |
|---|---|---|---|
| **Q1 — FLIPPED** | hero-lab placement | **KILLED ENTIRELY, not slipped.** `waves/R.W5.md` deleted; `docs/frontend-design/hero-lab.md` deleted (was untracked); W0-1 → `color-picker.md`-only; app artifacts fold into R.W2 as a deletion item; R.W2 gate drops `build:hero-lab` (gh-pages only); DAG W4 → W7 directly; W5 numbering gap kept as the record; picker does NOT absorb hero-lab scope (interpolation-path signature dies; gradient pane covers interpolation). | R.md §12 (:319), §3 slate (:179,:182,:184), DAG (:186-195); R.W2 item 6 + §Hard gate; R.W0 W0-1; PROGRESS |
| **Q2 — FLIPPED** | NCSU-alias retirement (X2) | **RETIRED as R.W7 in-wave work** — maintainer-on-host, in-repo maintainership (not a standing action, not an external wait); the W7 §Hard gate includes it. | R.md §12 (:320), R.W7 §2 (:30-32) + §Hard gate (:57), PROGRESS |
| **Q4 — RATIFIED** | Pin policy | Keep `file:` deps deliberately; record in CLAUDE.md at **W0-12**. | R.md §12 (:321), R.W0 |
| **Q7 — RATIFIED** | Gamut α | **`GAMUT_ALPHA = 1.0`** (the genuine cure); α=0.35 recorded as the rejected gate-strict alternative; two-option table collapsed to a decision record. | R.md §12 (:322), R.W1 item 1 (:26-34) |
| **Q8 — RATIFIED** | `uSatColor[]` escalation | **Hard-ask posture** in the relay letter (unconditional — flip-contingency removed). | R.md §12 (:323), GLASSUI-RELAY GAP-1 (:10-14) |
| **Q10 — RATIFIED** | Parse-Lab | **Fused into ColorInput** (zero new library exports). | R.md §12 (:324), R.W4 E4 |
| **Q11 — RATIFIED** | Overlay lens | **display-p3 with keyed override.** | R.md §12 (:325), R.W3 B5 |
| **Q12 — RATIFIED** | Easing riders | **Both riders** — R-3 preset tightening rides R.W1; R-4 steps mode allowed. | R.md §12 (:326), R.W1 item 4 + R.W4 D6 |

The 4 pre-ratification rows (Q3/Q5/Q6/Q9) stand as previously closed (R.md §12 closed-rows table).

---

## §2 — Certification checks

- **(a) All 8 Q rows encoded, two flips explicit + dated** — PASS. R.md §12 carries Q1/Q2 as
  `— FLIPPED` with dated (2026-07-03) owner-order provenance; the six others as `— RATIFIED`.
- **(b) Deletions + no live hero-lab** — PASS. `git status`: `waves/R.W5.md` shows `D`;
  `docs/frontend-design/` holds `color-picker.md` only (hero-lab.md rm'd). Every surviving
  `hero-lab` hit under `docs/tranches/R/**/*.md` is one of: a kill/provenance record
  (R.md §12, R.W0, R.W7, PROGRESS), the R.W2 deletion item, an R.W2 Tabs-drift diagnostic
  (PROGRESS:85, R.md:87, R.W2:34 — historical LINK-phase fact), or `audit/pass1|pass2` +
  `DEVELOPMENT-FIDELITY.md` evidence (intentionally untouched historical record). No live wave
  item treats hero-lab as work.
- **(c) R.W2 deletion item + gate** — PASS. Item 6 (`R.W2.md:68-78`) deletes `demo/hero-lab/`
  tree, the `vite.config.ts:202-229` mode branch, and `package.json:72/74`
  (`dev:hero-lab`/`build:hero-lab`); grep-verified zero e2e/CI/scripts refs; verified live at
  `e80b359`. §Hard gate (:82-84) is gh-pages-only with `build:hero-lab` dropped + an
  "artifacts gone" clause.
- **(d) R.W7 X2 in-wave + in-gate** — PASS. §2 (`R.W7.md:30-32`) frames X2 as in-wave
  maintainer-on-host; §Hard gate (:57) lists "X2 fired: the NCSU alias is retired"; :66 notes
  X2 is explicitly NOT a book. Removed from a standing-action posture.
- **(e) R.W1 GAMUT_ALPHA=1.0 as decided** — PASS. Item 1 (`R.W1.md:26-34`) is a DECISION
  RECORD: `GAMUT_ALPHA = 1.0` at `gamut.ts:242` (+ docstrings `:5-6`/`:246`); α=0.35 recorded
  as the rejected gate-strict alternative.
- **(f) DAG + PROGRESS consistent** — PASS. R.md DAG (:189-191) routes W4 → W7 directly with no
  W5 edge; the W5 gap note (:194-195) says "Do not renumber." PROGRESS Mode/board: dispatch
  gate CLOSED, all waves DISPATCHABLE, rounds W0 → W1∥W2∥W6 → W3 → W4 → W7; R.W5 row struck
  (KILLED).

---

## §3 — Fixes applied

None. The amender's encoding was complete and internally consistent; no mechanical misses were
found. Working-tree edits remain uncommitted per the amender charter (R.W0's W0-1 commits
`color-picker.md`).

## §4 — Certification

The 2026-07-03 owner ratification is **faithfully and completely encoded** across R.md,
PROGRESS.md, the wave docs, and the glass-ui relay letter. The two flips (Q1 hero-lab kill, Q2
NCSU-alias in-wave) are explicit, dated, and consistent everywhere they bind. **CERTIFIED.**
