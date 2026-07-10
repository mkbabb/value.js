# T HARDENING · lane h-precepts

**Charge**: adversarial hardening of the PRECEPTS + LESSONS layer — `T.md §8` (the PP-1..16 /
PR-1..8 slate + process laws) and `T.md §9` (S §13 carried whole + the T-development additions
12-18) against the standing law (CLAUDE.md conventions · `S.md §13` · `S/FINAL.md §7` S-execution
lessons · the memory-encoded rules). Three tests: **complete** (no standing precept/lesson
dropped), **non-contradictory** (no precept contradicts another or the wave mechanics), and
**enforceable** (each precept NAMES its mechanism, not just its wish).

**Method**: diffed `T.md §8` against its source `t-precepts-recap.md §E`; diffed `T.md §9` against
`S.md §13` (11 lessons, read verbatim) and `S/FINAL.md §7` (the 6 S-execution additions); mapped
every precept to its enforcement mechanism (a wave gate, an O-1..O-25 oracle, the PP-8 sweep, the
foreign-tree fence, or "review"); walked each CLAUDE.md convention for slate coverage.

**Verdict**: the slate TRANSCRIPTION is faithful (T.md §8 one-liners byte-match `t-precepts-recap
§E`; the 11 S §13 lessons carry with zero drop). The defects are ENFORCEABILITY and TRACEABILITY,
not transcription: one product precept (PR-7 preserve-animations) rides the single largest
structural move with **no mechanism at all** — a pure wish on the wave where its risk peaks; the §9
lesson roll silently omits the entire `S/FINAL §7` S-execution tier by name (integration-row
certification — a lesson the charge names — survives ONLY as precept PP-9, never as a §9 lesson);
PP-5's absolute "never a gate" (lane-doc) collides with §7's EXPECTED-RED carve-out; the H1
cascade-correctness invariant is absent from both the slate and the api-coloc guard-list.

**Severity tally**: **MUSTFIX 1 · SHOULDFIX 3 · NOTE 5**.

---

## MUSTFIX

### HP-1 — PR-7 (preserve-animations) NAMES NO MECHANISM, and it rides E-1 (the largest move) — a pure wish where its risk peaks

**Corpus location**: `T.md §8` precept ledger line 462 (`| PR-7 | Preserve animations —
move/tokenize, never delete | product |`); binding text `t-precepts-recap.md §B PR-7` lines
256-264 ("**E-1 (colocation) must honor PR-7** — moving a component moves its scoped keyframes
WITH it, never drops them"); the O-slate `SYNTHESIS §6.1` O-1..O-25 (lines 495-524); the W1 gate
`T.md §3.1` line 252.

**The defect**. The charge's literal test is *"each precept ENFORCEABLE (names its mechanism, not
just its wish)."* PR-7 names only a wish. Its binding is an **instruction** ("move scoped keyframes
WITH the component, never drop them"), not a **check**. I walked the entire O-1..O-25 slate: there
is **no animation/keyframe-preservation oracle** (`grep -niE "keyframe|preserv.*animation"` over
SYNTHESIS + T.md + T.W1.md returns only the `../keyframes.js` foreign-tree fence and W4-1's
shrink-keyframe re-lock — neither guards keyframe survival). The W1 gate is "MOVE-MAP committed;
suites + e2e green; **O-23 bundle-diff flat ±2% per named chunk**." None of those catches a dropped
scoped `@keyframes`: no unit test asserts a polish animation exists, smoke e2e asserts no keyframe
inventory, and a single dropped scoped keyframe is far under the O-23 ±2% gzip threshold. The PP-8
per-wave sweep is caps + legacy-grep + as-any ledger — it does not enumerate animations.

**Why load-bearing**. E-1 (W1) is a **mechanical mass file-move across ~every demo directory** —
the exact operation the memory rule was minted to guard against (`memory/feedback_preserve_animations.md`
+ MEMORY.md: *"Custom CSS animations must never be removed, only moved or tokenized"* — a
**recurring owner grievance**, not a hypothetical). PR-7 is thus the one precept whose failure mode
is a **silent owner-grievance regression** landing green on the codemod wave, and it is the one
precept in the slate with zero enforcement anywhere in the corpus.

**Failure scenario**: W1-demo's color-domain codemod / feature-move drops a component's scoped
`@keyframes` (or its `animation:` declaration) at the new home; suites + e2e + O-23 all pass; the
wave closes green; the animation the owner explicitly protected is gone, caught only if an owner
eyeball re-probes at W8 — the precise "wave-green ≠ repo-green" (PP-8) disease PR-7 was supposed to
be immune to.

**Proposed amendment**: give PR-7 a mechanism on W1 — a **keyframe/animation census gate** in the
W1 gate row and the PP-8 sweep: *"grep the pre-move set of `@keyframes` names + scoped
`animation`/`animation-name` identities; assert each survives at a new home post-codemod (byte-set
preserved, moves allowed, deletions RED)."* Cheap, mechanical, and the natural companion to the
existing MOVE-MAP. Until PR-7 names such a check its ledger row is a wish, failing the charge test.

---

## SHOULDFIX

### HP-2 — §9's lesson roll omits the entire `S/FINAL §7` S-execution tier by name; the integration-row-certification LESSON survives ONLY as precept PP-9

**Corpus location**: `T.md §9` lines 469-500 — the section declares its scope as *"S §13
unamended + the T-development additions"* (the 11 S §13 lessons at 469-475, then additions 12-18 at
477-500). Standing law omitted: `S/FINAL.md §7` (read this session) enumerates **six** S-EXECUTION
additions distinct from S §13: (1) integration-row cert, (2) lane-death recovery proven ×4, (3) the
gate judges the recalibrated bar, (4) shared-tree multi-workflow discipline (single-writer
intra-round ordering · hunk isolation · lane worktrees), (5) the cap sweep in EVERY wave gate, (6)
π/harness waits must hard-fail.

**The defect**. The charge explicitly names *"the integration-row certification lesson"* as a
T-dev addition to verify present. It **is** present — but only as precept **PP-9** (`T.md §8` line
448), never as a §9 lesson. The asymmetry is structural: `wave-green ≠ repo-green` is doubly
encoded (S §13 lesson 2 in §9 **and** PP-8) because its origin is S §13; integration-row cert,
recalibrated-bar, and harness-waits originate at `S/FINAL §7.1/§7.3/§7.6` — **not** S §13 — so
§9's "S §13 unamended" roll skips them, and additions 12-18 do not include them either. Result:
PP-9, PP-13, and PP-15 (plus PP-8's *elevation* clause) live in the corpus ONLY as precept IDs; the
`S/FINAL §7` lesson tier — arguably the most battle-tested, minted by S's own execution — has **no
named home in §9**. `S/FINAL §7` lesson 4 (shared-tree discipline) survives only as the `§3.2`
single-writer mechanic. No LAW is lost (all six map to a precept or a §3.2 clause), but a reader
auditing "did T drop any standing lesson?" cannot trace the middle tier from §9.

**Failure scenario**: a future zero-drop audit reads §9 as "S §13 (11) + T-dev (7) = the lesson
corpus," misses that the standing corpus is S §13 (11) + `S/FINAL §7` (6) + T-dev (7), and cannot
confirm integration-row cert / recalibrated-bar / harness-waits carried — the six hardest-won
lessons look dropped because they are silently folded into precept IDs.

**Proposed amendment**: add one bridging clause to `T.md §9`, e.g. *"The six `S/FINAL §7`
S-execution additions carry forward as standing precepts — integration-row cert → PP-9,
recalibrated-bar → PP-13, lane-death-recovery → PP-14, cap-sweep-every-wave → PP-8, harness-waits →
PP-15, shared-tree discipline → the §3.2 single-writer laws."* Restores the trace without
re-litigating.

### HP-3 — PP-5 as-written is ABSOLUTE ("NO wave gate ever reads the books table") but §7 carves an EXPECTED-RED exception; the precept and the operative rule contradict

**Corpus location**: precept text `t-precepts-recap.md §A PP-5` lines 68-69 (*"NO wave gate ever
reads the books table"*), which `T.md §8` line 435-436 makes binding ("binding as written there").
The operative rule: `T.md §7` header lines 362-363 — *"Books, never gates (PP-5) — no wave gate
reads this table **except the named EXPECTED-RED rows, which carry their packet cites in the gate
itself**"*; instantiated at `T.md §7.2` line 403 (O-16 R1 EXPECTED-RED, keyed to PKT-1) and read by
the W5 gate `T.md §3.1` line 256 (*"R1 row honest EXPECTED-RED w/ PKT-1 cite"*).

**The defect**. PP-5's canonical statement is unqualified — "NO wave gate ever." §7 (and the W5
gate) explicitly DO surface a books-table row (the O-16 R1 EXPECTED-RED) inside a wave gate. The
reconciliation is sound in spirit (an EXPECTED-RED **records** a red that does not **block** close;
the book still isn't a pass/fail gate), but the precept-as-written and the operative rule are in
textual contradiction, and T.md §8 tells the dispatcher the precept is "binding as written there"
(the absolute lane-doc form). A dispatcher applying PP-5 literally would flag the O-16 R1 gate row
as a PP-5 violation.

**Failure scenario**: a W5 dispatcher, holding PP-5's absolute form, strikes the EXPECTED-RED R1
row from the gate as "a book leaking into a gate," and the honest-red-with-packet-cite discipline
(the whole point of the EXPECTED-RED mechanism) is lost — or, conversely, a reviewer certifies the
gate as PP-5-compliant while it visibly reads a books row, with no encoded reconciliation.

**Proposed amendment**: qualify PP-5's statement to match §7 — *"no wave gate READS the books table
as a pass/fail; the named EXPECTED-RED rows appear in gates as honest-red records carrying their
packet cite, and never block close."* Or add a one-line pointer from the PP-5 row to §7 as the
governing exception.

### HP-4 — the H1 cascade-correctness invariant (withTransaction) — a bolded CLAUDE.md convention — is absent from the precept slate AND from the api-coloc "L boundary laws" carry-list

**Corpus location**: `T.md §8` slate (PP-1..16 / PR-1..8) — no cascade/transaction precept;
`SYNTHESIS §5.2` lines 456-465 enumerates which api laws "hold verbatim" across the W1-api move
(*"typed ApiError; routes→services; repositories-via-the-DI-seam"*) but **omits** cascade-correctness.
Standing law: `CLAUDE.md:112` — *"**Cascade-correctness** — the H1 invariant requires every
cross-collection write site in `api/` wrapped in `services.withTransaction(...)` with `session`
threaded through"* (a bolded convention with a dedicated reference doc, `docs/tranches/H/audit/api-withTransaction-coverage.md`).

**The defect**. PR-1 lifts the api ≤350 LoC cap from the SAME CLAUDE.md api paragraph, so the slate
demonstrably curates from that region — yet the H1 cascade invariant (the one that guards data
integrity across a mass api file-move) is not carried as a precept, and the SYNTHESIS §5.2
guard-list that names the surviving L laws does not name it either (it is a tranche-H invariant, not
an L law, so "the L boundary laws hold verbatim" does not cover it). W1-api is a "MOVE + REGROUP,
never a rewrite" of every service module; the ONLY guard the corpus names against a broken
`session`-thread is "api 224-class suite green" (`T.md §3.1` line 252) — relying on the suite alone
is the exact wave-green≠repo-green / integration-row-cert (PP-8/PP-9) risk class, applied to the one
invariant that protects against silent partial writes.

**Failure scenario**: a W1-api re-home splits a cross-collection write off its `withTransaction`
wrapper (or drops the `session` thread) while regrouping modules; if the 224-class suite lacks a
transaction-atomicity assertion for that path, the move lands green and a cascade write is no longer
atomic — a data-integrity regression with no named precept or gate to catch it.

**Proposed amendment**: either add a slate row (*"PR-x · Cascade-correctness — every cross-collection
api write stays wrapped in `withTransaction` with `session` threaded; the H.W1 coverage doc is the
ledger; the W1-api move re-verifies it"*) OR add cascade-correctness explicitly to the SYNTHESIS §5.2
"L boundary laws hold verbatim" list and to the W1-api gate row, so the guard is NAMED, not left to
suite luck.

---

## NOTES

### HP-N1 — the §8 compact ledger states every precept as a WISH; mechanisms are scattered by-reference

`T.md §8`'s table (lines 438-464) is one-liner form ("No workarounds…", "No fallbacks…"). The
enforcement mechanisms live elsewhere and must be assembled: the *Per-wave standing gates* bullet
(lines 427-432, mechanisms for PP-8/PI-1/tripwire/PP-11/§3.2), the O-slate (PR-1→cap sweep,
PR-3/PR-5→O-7/O-18 census, PR-4→O-9, PR-6→regenerable grep, PR-8→O-23), and the lane doc's "how it
binds T" prose ("binding as written there"). Most precepts DO resolve to a mechanism this way;
`PP-1` (no-workarounds), `PP-2` (no-fallbacks), and `PR-7` (→ HP-1) resolve only to "review at
W8." That is acceptable for PP-1/PP-2 (inherently taste-gated) but the ledger's wish-form means the
charge's "names its mechanism" test is met by-reference, not on the row. A one-line header on the
§8 table — *"the mechanism for each row is the O-slate + the per-wave standing gates below; taste
rows (PP-1/PP-2/PR-7) certify at W8"* — would make the enforcement legible at the ledger.

### HP-N2 — PR-5 ("one ink for type; never to type") is stated ABSOLUTELY but Q5's live alternative would breach it

`T.md §8` PR-5 (line 460) and its binding (`t-precepts-recap §B PR-5`, *"hue-variation… never to
type"*) are unqualified. But Q5's live alternative (`T.md §12` line 517) is the letterform-ramp
(`background-clip:text`) which puts hue ON type; the corpus handles this correctly at Q5 ("encode
as a sanctioned exception if picked") — but the PR-5 row itself carries no "one sanctioned Q5
exception possible" caveat, so a reader treating PR-5 as absolute and a reader holding the Q5
alternative see contradictory laws. A parenthetical on PR-5 (*"one Q5-scoped exception may be
ratified — the Palettes letterform-ramp"*) closes it. Non-blocking: the exception mechanism exists,
only the cross-reference is missing.

### HP-N3 — §9's additions 12-18 are charter-original, but the provenance footer says the charter "transcribes" the SYNTHESIS

The T SYNTHESIS has **no lessons section** (`grep -c lesson` = 0; §9 is DISSENTS). So `T.md §9`'s
T-development additions 12-18 are distilled from the mandate + plan-audits + S record, NOT
transcribed from the SYNTHESIS — consistent with T.md's own intro ("this charter **distills and
transcribes** it", line 27) but looser than the provenance footer ("this charter transcribes
`audit/SYNTHESIS.md`", lines 533-534). The additions do carry inline cites (lesson 12→R9/W7-1,
14→§6, 16→the +1 mislabel, 18→R11), so they remain traceable. Minor: soften the footer to "distills
and transcribes" for §9, or note §9's additions are charter-original.

### HP-N4 — PP-8/PP-9 are minted as T precepts but the CLAUDE.md-conventions fold (t-precepts-recap F-2/F-3 cure) is not booked in a T row

`t-precepts-recap F-2` (lines 376-390) states PP-8/PP-9 "live only in the S tranche record… The T
charter's §Precepts is the place they become standing" and the cure direction adds "a later
doc-truth pass folds it into CLAUDE.md conventions." The first half is honored (they ARE in `T.md
§8`). The second half is not booked: `T.W9`'s doc rewrites (`T.md §3.1` line 260) scope
*demo/api* CLAUDE.md, not the root CLAUDE.md conventions where PP-8/PP-9 would permanently land.
Non-blocking (T is development-only; whether tranche-scoped process precepts belong in permanent
CLAUDE.md is a judgment), but if the intent is to make them standing beyond T, the fold has no home.

### HP-N5 — §8 calls the ledger "verbatim" but drops the provenance column

`T.md §8` line 436 introduces the table as *"The §E compact ledger, **verbatim**"*. The one-liners
(ID/Precept/Kind) byte-match `t-precepts-recap §E` — but §E is a **four-column** table (ID · Precept
· Kind · **Provenance**); T.md §8 drops the Provenance column. Defensible ("the full text +
provenance is the lane doc"), but "verbatim" over-claims. Say "the §E compact ledger (provenance
column elided; see the lane doc)".

---

*Provenance: `T.md §8/§9` + `t-precepts-recap.md §A–§F` diffed against `S.md §13` (11 lessons,
verbatim), `S/FINAL.md §7` (6 S-execution additions, verbatim), `CLAUDE.md` conventions, and the
memory feedback files. O-1..O-25 (`SYNTHESIS §6.1`) walked for each precept's mechanism. No
duplicate of h-mandate-trace H-1 (the T-8 z-order re-cut, a §4/lesson-15 application defect) or
h-books-folds (routing) — this lane audits the precept/lesson LAYER's completeness, internal
consistency, and enforceability. Reports only; the amend pass owns the fold.*
</content>
</invoke>
